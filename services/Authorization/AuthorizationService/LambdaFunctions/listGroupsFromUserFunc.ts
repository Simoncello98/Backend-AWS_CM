/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { User } from "../../../../shared/Models/User";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";


export const listGroupsFromUser: APIGatewayProxyHandler = async (event, _context) => {
    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

    //Deserialize 
    let requestedUser: User = deserialize(requestBody, User);

    if (!requestedUser.enoughInfoForReadOrDelete()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedUser.getReadAndDeleteExpectedBody());
    }

    let cognito = new CognitoIdentityServiceProvider({ signatureVersion: 'v4' });
    
    let params = AuthorizationServiceUtils.getCognitoParamsByUser(requestedUser.Email);

    try {
        const data = await cognito.adminListGroupsForUser(params).promise();
        return Utils.getUniqueInstance().getDataResponse(data);
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }
};
