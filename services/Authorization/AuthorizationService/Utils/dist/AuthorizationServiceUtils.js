"use strict";
/*
    Created By Simone Scionti
*/
exports.__esModule = true;
exports.AuthorizationServiceUtils = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var AuthorizedFunctionalities_1 = require("../../../../shared/Models/RelationshipsRecordModels/Permissions/AuthorizedFunctionalities");
var RootNavigationItem_1 = require("../../../../shared/Models/RelationshipsRecordModels/Permissions/RootNavigationItem");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var AuthorizationServiceUtils = /** @class */ (function () {
    function AuthorizationServiceUtils() {
    }
    AuthorizationServiceUtils.getPrimaryKeyFunctionality = function (groupName, apiMethod, apiPath) {
        var keys = {
            PK: "#FUNCTIONALITY#GROUP<" + groupName + ">",
            SK: "#METHOD<" + apiMethod + ">#PATH<" + apiPath + ">"
        };
        return keys;
    };
    AuthorizationServiceUtils.getPrimaryKeyNavigation = function (groupName, navigationTemplate) {
        var keys = {
            PK: "#NAVIGATION#GROUP<" + groupName + ">",
            SK: "#TEMPLATE<" + navigationTemplate + ">"
        };
        return keys;
    };
    AuthorizationServiceUtils.paramsToCreateFunctionality = function (newFunctionality) {
        var keys = this.getPrimaryKeyFunctionality(newFunctionality.GroupName, newFunctionality.APIMethod, newFunctionality.APIPath);
        var params = {
            TableName: Resources_1.Resources.IA_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newFunctionality, keys)
        };
        return params;
    };
    AuthorizationServiceUtils.paramsToCreateNavigation = function (newNavigation) {
        var keys = this.getPrimaryKeyNavigation(newNavigation.GroupName, newNavigation.NavigationTemplate);
        var params = {
            TableName: Resources_1.Resources.IA_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newNavigation, keys)
        };
        return params;
    };
    AuthorizationServiceUtils.paramsToGetNavigation = function (groupName, navigationTemplate) {
        var keys = this.getPrimaryKeyNavigation(groupName, navigationTemplate);
        var params = {
            TableName: Resources_1.Resources.IA_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.navigationAttributes),
            Key: keys
        };
        return params;
    };
    AuthorizationServiceUtils.getCognitoParamsByUserAndGroup = function (email, groupName) {
        var params = {
            UserPoolId: Resources_1.Resources.USERPOOL_ID,
            GroupName: groupName,
            Username: email
        };
        return params;
    };
    AuthorizationServiceUtils.getCognitoParamsByUser = function (email) {
        var params = {
            UserPoolId: Resources_1.Resources.USERPOOL_ID,
            Username: email
        };
        return params;
    };
    AuthorizationServiceUtils.getCognitoParamsByCognitoClientID = function () {
        var params = {
            UserPoolId: Resources_1.Resources.USERPOOL_ID
        };
        return params;
    };
    AuthorizationServiceUtils.paramsToPutSingleTransactFunctionality = function (newFunctionality) {
        var keys = this.getPrimaryKeyFunctionality(newFunctionality.GroupName, newFunctionality.APIMethod, newFunctionality.APIPath);
        var params = {
            Put: {
                TableName: Resources_1.Resources.IA_TABLE,
                Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newFunctionality, keys)
            }
        };
        return params;
    };
    AuthorizationServiceUtils.paramsToPutSingleTransactNavigation = function (newNavigation) {
        var keys = this.getPrimaryKeyNavigation(newNavigation.GroupName, newNavigation.NavigationTemplate);
        var params = {
            Put: {
                TableName: Resources_1.Resources.IA_TABLE,
                Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newNavigation, keys)
            }
        };
        return params;
    };
    AuthorizationServiceUtils.paramsToPutTransactWrite = function (itemsToTransact) {
        var params = {
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            TransactItems: itemsToTransact
        };
        return params;
    };
    AuthorizationServiceUtils.paramsForQueryByGroupName = function (groupName) {
        var params = {
            TableName: Resources_1.Resources.IA_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.functionalityAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK"
            },
            ExpressionAttributeValues: {
                ":pk": "#FUNCTIONALITY#GROUP<" + groupName + ">"
            }
        };
        return params;
    };
    AuthorizationServiceUtils.functionalityAttributes = typescript_json_serializer_1.deserialize({}, AuthorizedFunctionalities_1.AuthorizedFunctionalities);
    AuthorizationServiceUtils.navigationAttributes = typescript_json_serializer_1.deserialize({}, RootNavigationItem_1.RootNavigationItem);
    return AuthorizationServiceUtils;
}());
exports.AuthorizationServiceUtils = AuthorizationServiceUtils;
