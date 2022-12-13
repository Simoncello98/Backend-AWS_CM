/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { RootNavigationItem } from "../../../../shared/Models/RelationshipsRecordModels/Permissions/RootNavigationItem";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";


export const createTREOPermissionRoute: APIGatewayProxyHandler = async (event, _context) => {
    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

    //Deserialize
    let newNavigation: RootNavigationItem = deserialize(requestBody, RootNavigationItem);

    if (!newNavigation.enoughInfoForCreate()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newNavigation.getCreateExpectedBody());
    }

    newNavigation.autoFillUndefinedImportantAttributes();

    //CREATE
    let dynamo = new DynamoDB.DocumentClient();

    let params = AuthorizationServiceUtils.paramsToCreateNavigation(newNavigation);

    try {
        const data = await dynamo.put(params).promise();
        return Utils.getUniqueInstance().getDataResponse(data);
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }
};
