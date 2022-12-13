/*
  Created by Simone Scionti 
  Return a company specifying its Primary Key. 

*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Company } from "../../../../shared/Models/Company";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CompanyServiceUtils } from "../Utils/CompanyServiceUtils";


export const getCompany: APIGatewayProxyHandler = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

  //Deserialize 
  let requestedCompany: Company = deserialize(requestBody, Company);

  if (!requestedCompany.enoughInfoForReadOrDelete()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCompany.getReadAndDeleteExpectedBody());
  }

  //GET
  let params = CompanyServiceUtils.paramsToGetCompany(requestedCompany.CompanyName);

  var dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.get(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data.Item);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};

