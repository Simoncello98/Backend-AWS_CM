/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { AuthorizedFunctionalities } from "../../../../shared/Models/RelationshipsRecordModels/Permissions/AuthorizedFunctionalities";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";


export const createPermissionFunc: APIGatewayProxyHandler = async (event, _context) => {
    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

    //Deserialize
    let newFunctionality: AuthorizedFunctionalities = deserialize(requestBody, AuthorizedFunctionalities);

    if (!newFunctionality.enoughInfoForCreate()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newFunctionality.getCreateExpectedBody());
    }

    newFunctionality.APIMethod = newFunctionality.APIMethod.toUpperCase();

    //CREATE
    let dynamo = new DynamoDB.DocumentClient();
    let params = AuthorizationServiceUtils.paramsToCreateFunctionality(newFunctionality);

    try {
        const data = await dynamo.put(params).promise();
        return Utils.getUniqueInstance().getDataResponse(data);
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }
};
