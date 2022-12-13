/*
  Created by Simone Scionti
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { DynamoDB, CognitoIdentityServiceProvider } from "aws-sdk";
import AWS = require("aws-sdk");
import { PromiseResult } from "aws-sdk/lib/request";
import { AuthorizationServiceUtils } from "../Utils/AuthorizationServiceUtils";


export const getAuthorizedComponents: APIGatewayProxyHandler = async (event, _context) => {

    let dynamo = new DynamoDB.DocumentClient();
    let cognito = new CognitoIdentityServiceProvider({ signatureVersion: 'v4' });
    let groupName = await Utils.getUniqueInstance().getGroupFromSignature(event.requestContext.identity.cognitoAuthenticationProvider, cognito);
    console.log("group: " + groupName);

    let dynamoParamsForNavigation = AuthorizationServiceUtils.paramsToGetNavigation(groupName, "TREO");
    let dynamoParamsForAPIs = AuthorizationServiceUtils.paramsForQueryByGroupName(groupName);

    console.log("paramsNav: " + dynamoParamsForNavigation);
    //GET
    console.log("paramsApis: " + dynamoParamsForAPIs);
    
    let dynamoDataGroups: PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>;
    try {
        dynamoDataGroups = await dynamo.get(dynamoParamsForNavigation).promise();
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, dynamoParamsForNavigation);
    }

    console.log("nav res: " + dynamoDataGroups);
    let dynamoDataAPIs: PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>;
    try {
        dynamoDataAPIs = await dynamo.query(dynamoParamsForAPIs).promise();
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, dynamoParamsForAPIs);
    }

    console.log("apis res: " + dynamoDataAPIs);
    let navigationObject = dynamoDataGroups.Item ? dynamoDataGroups.Item.NavigationItems : {};

    console.log("navigation object  res: " + navigationObject);

    //Response
    const response = {
        Homepage: dynamoDataGroups.Item ? dynamoDataGroups.Item.Homepage : "",
        Navigation: navigationObject,
        Functionalities: dynamoDataAPIs.Items ? dynamoDataAPIs.Items : {}
    }
    return Utils.getUniqueInstance().getDataResponse(response);
}