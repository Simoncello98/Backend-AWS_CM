/*
  Created by Simone Scionti 

  Create a company instance, with all the attributes of Company info.

*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Company } from "../../../../shared/Models/Company";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { CompanyServiceUtils } from "../Utils/CompanyServiceUtils";
import { EntityStatus } from "../../../../shared/Utils/Statics/EntityStatus";
import { ISValidator } from "../../../../shared/Utils/Validator";
import { ISRestResultCodes } from "../../../../shared/Utils/Enums/RestResultCodes";


export const createCompany: APIGatewayProxyHandler = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

  //Deserialize 
  let newCompany: Company = deserialize(requestBody, Company);

  if (!newCompany.enoughInfoForCreate() || newCompany.CompanyName === "*") {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newCompany.getCreateExpectedBody());
  }

  let dynamo = new DynamoDB.DocumentClient();

  let paramsGetRelationship = CompanyServiceUtils.paramsToGetCompany(newCompany.CompanyName);
  let flagDeleted: boolean = false;
  try {
    const data = await dynamo.get(paramsGetRelationship).promise();
    if (data.Item) {
      let record = deserialize(data.Item, Company);
      flagDeleted = record.CompanyStatus === EntityStatus.DELETED;
    }
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, paramsGetRelationship);
  }

  //PUT
  newCompany.autoFillUndefinedImportantAttributes();

  //Validate
  let errorResponseValidate = ISValidator.getUniqueInstance().isValidVATNumber(newCompany.VATNumber);
  if (errorResponseValidate.Error == "") {
    newCompany.VATNumber = errorResponseValidate.VATNumber;
  } else {
    return Utils.getUniqueInstance().getErrorResponse(null, errorResponseValidate.Error, ISRestResultCodes.BadRequest);
  }

  let params = flagDeleted ? CompanyServiceUtils.paramsToOverwriteDeletedCompany(newCompany) : CompanyServiceUtils.paramsToCreateCompany(newCompany);

  try {
    const data = await dynamo.put(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }

};