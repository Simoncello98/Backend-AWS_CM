/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { DynamoDB } from "aws-sdk";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";
import { RootNavigationItem } from "../../../../shared/Models/RelationshipsRecordModels/Permissions/RootNavigationItem";
import { ISRestResultCodes } from "../../../../shared/Utils/Enums/RestResultCodes";


export const performToTransactWriteNavig: APIGatewayProxyHandler = async (event, _context) => {
    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);
    
    let dynamo = new DynamoDB.DocumentClient();
    
    let itemsToTransact: any[] = [];

    for (var i = 0; i < Object.keys(requestBody).length; i++) {
        //Deserialize
        let navigationItem: RootNavigationItem = deserialize(requestBody[i], RootNavigationItem);
        if (!navigationItem.enoughInfoForCreate()) {
            return Utils.getUniqueInstance().getValidationErrorResponse(requestBody[i], navigationItem.getCreateExpectedBody());
        }
        navigationItem.autoFillUndefinedImportantAttributes();

        let item = AuthorizationServiceUtils.paramsToPutSingleTransactNavigation(navigationItem);
        itemsToTransact.push(item);

        if (i > 0 && i % 24 == 0) {
            let params = AuthorizationServiceUtils.paramsToPutTransactWrite(itemsToTransact);
            try {
                await dynamo.transactWrite(params).promise();
            } catch (error) {
                return Utils.getUniqueInstance().getErrorResponse(error, params);
            }
            itemsToTransact = [];
        }
    }

    if (itemsToTransact.length > 0) {
        let params = AuthorizationServiceUtils.paramsToPutTransactWrite(itemsToTransact);
        try {
            await dynamo.transactWrite(params).promise();
        } catch (error) {
            return Utils.getUniqueInstance().getErrorResponse(error, params);
        }
    }

    return Utils.getUniqueInstance().getErrorResponse(null, { "NumberOfItems: ": Object.keys(requestBody).length }, ISRestResultCodes.Ok);
};
