/*
  Created by Simone Scionti 

  Not used in production, we use setAsDeletedFunctions.
  

*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Campus } from "../../../../shared/Models/Campus";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";


export const deleteCampus: APIGatewayProxyHandler = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

  //Deserialize
  var requestedCampus: Campus = deserialize(requestBody, Campus);

  if (!requestedCampus.enoughInfoForReadOrDelete()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampus.getReadAndDeleteExpectedBody());
  }

  //DELETE
  let params = CampusServiceUtils.paramsToDeleteCampus(requestedCampus);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.delete(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};
