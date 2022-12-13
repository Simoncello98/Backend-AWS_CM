/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { DynamoDBKeySchemaInterface } from "../../../../shared/Utils/Interfaces/DynamoDBKeySchemaInterface";
import { Resources } from "../../../../shared/Utils/Resources";
import { DynamoDB } from "aws-sdk";
import { AuthorizedFunctionalities } from "../../../../shared/Models/RelationshipsRecordModels/Permissions/AuthorizedFunctionalities";
import { v4 as uuidv4 } from "uuid";

var dynamo = new DynamoDB.DocumentClient();

export const createPermModule: APIGatewayProxyHandler = async (event, _context) => {
    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

    //Deserialize json in User model and take the instance. 
    var newPermission: AuthorizedFunctionalities = deserialize(requestBody, AuthorizedFunctionalities);

    if (!newPermission.enoughInfoForCreate()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newPermission.getCreateExpectedBody());
    }

    newPermission.APIMethod = newPermission.APIMethod.toUpperCase();

    const keys: DynamoDBKeySchemaInterface = {
        PK: "#MODULE#GROUP<" + newPermission.GroupName + ">",
        SK: uuidv4()
    }

    const params = {
        TableName: Resources.IP_TABLE,
        Item: Utils.getUniqueInstance().getNewItemToInsert(newPermission, keys)
    };

    try {
        const data = await dynamo.put(params).promise();
        return Utils.getUniqueInstance().getDataResponse(data);
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }
};
