/*
  Created by Simone Scionti

*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { Campus } from "../../../../shared/Models/Campus";
import { DynamoDB } from "aws-sdk";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";


export const getAllCampusRegulations: APIGatewayProxyHandler = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

  //Deserialize
  var requestedCampus: Campus = deserialize(requestBody, Campus);

  if (!requestedCampus.enoughInfoForReadOrDelete()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampus.getReadAndDeleteExpectedBody());
  }

  //GET
  let params = CampusServiceUtils.paramsForQueryForAllCampusRegulations(requestedCampus.CampusName);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.query(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data.Items);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};
