/*
  Created by Simone Scionti 
  update a Campus info record. 



*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Campus } from "../../../../shared/Models/Campus";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";


export const updateCampus: APIGatewayProxyHandler = async (event, _context) => {
  
  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);
  
  //Deserialize
  var requestedCampus: Campus = deserialize(requestBody, Campus);
  
  if (!requestedCampus.isPKDefined()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampus.getUpdateExpectedBody());
  }
  
  if (!requestedCampus.enoughInfoForUpdate()) {
    return Utils.getUniqueInstance().getNothingToDoErrorResponse(requestBody, requestedCampus.getUpdateExpectedBody());
  }

  //UPDATE
  let params = CampusServiceUtils.paramsToUpdateCampus(requestedCampus);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.update(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};
