/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";


export const listCognitoGroups: APIGatewayProxyHandler = async (_event, _context) => {

    let cognito = new CognitoIdentityServiceProvider({ signatureVersion: 'v4' });

    let params = AuthorizationServiceUtils.getCognitoParamsByCognitoClientID();

    let listGroupsName: any[] = [];

    try {
        const data = await cognito.listGroups(params).promise();

        for(let group of data.Groups) {
            listGroupsName.push({CognitoGroupName: group.GroupName});
        }

        return Utils.getUniqueInstance().getDataResponse(listGroupsName);
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }
};
