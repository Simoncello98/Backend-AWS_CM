/*
  Created by Simone Scionti 

  Update the Company_INFO record in the DB. 

  -- It might be useful to do an utility to recover deleted relationships and eccetera that allows the admin to select what to recover to Active.
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Company } from "../../../../shared/Models/Company";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CompanyServiceUtils } from "../Utils/CompanyServiceUtils";


export const updateCompany: APIGatewayProxyHandler = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

  //Deserialize 
  let companyToUpdate: Company = deserialize(requestBody, Company);

  if (!companyToUpdate.isPKDefined()) { //if not is PK defined
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, companyToUpdate.getUpdateExpectedBody());
  }

  if (!companyToUpdate.enoughInfoForUpdate()) {
    return Utils.getUniqueInstance().getNothingToDoErrorResponse(requestBody, companyToUpdate.getUpdateExpectedBody());
  }

  //UPDATE
  let params = CompanyServiceUtils.paramsToUpdateCompany(companyToUpdate);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.update(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};

