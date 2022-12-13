/*
  Created by Simone Scionti 

  Not used in production. We use setAsDeleted functions. 
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Company } from "../../../../shared/Models/Company";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CompanyServiceUtils } from "../Utils/CompanyServiceUtils";


export const deleteCompany: APIGatewayProxyHandler = async (event, _context) => {
  
  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);
  
  //Deserialize 
  let companyToDelete: Company = deserialize(requestBody, Company);
  
  if (!companyToDelete.enoughInfoForReadOrDelete()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, companyToDelete.getReadAndDeleteExpectedBody());
  }
  
  //DELETE
  let params = CompanyServiceUtils.paramsToDeleteCompany(companyToDelete);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.delete(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data.Attributes);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};