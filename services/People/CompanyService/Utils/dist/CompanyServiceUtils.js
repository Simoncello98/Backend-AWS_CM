"use strict";
/*
    Created By Simone Scionti
*/
exports.__esModule = true;
exports.CompanyServiceUtils = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var Company_1 = require("../../../../shared/Models/Company");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var CompanyServiceUtils = /** @class */ (function () {
    function CompanyServiceUtils() {
    }
    CompanyServiceUtils.getPrimaryKey = function (companyName) {
        var keys = {
            PK: "#COMPANY<" + companyName + ">",
            SK: "#COMPANY_INFO<" + companyName + ">"
        };
        return keys;
    };
    CompanyServiceUtils.paramsToCreateCompany = function (newCompany) {
        var keys = this.getPrimaryKey(newCompany.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newCompany, keys),
            ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
        };
        return params;
    };
    CompanyServiceUtils.paramsToOverwriteDeletedCompany = function (newCompany) {
        var keys = this.getPrimaryKey(newCompany.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newCompany, keys)
        };
        return params;
    };
    CompanyServiceUtils.paramsToDeleteCompany = function (companyToDelete) {
        var keys = this.getPrimaryKey(companyToDelete.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.companyAttributes),
            Key: keys,
            ReturnValues: "ALL_OLD"
        };
        return params;
    };
    CompanyServiceUtils.paramsToGetCompany = function (companyName) {
        var keys = this.getPrimaryKey(companyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.companyAttributes),
            Key: keys
        };
        return params;
    };
    CompanyServiceUtils.paramsToUpdateCompany = function (companyToUpdate) {
        var keys = this.getPrimaryKey(companyToUpdate.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Key: keys,
            UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(companyToUpdate),
            ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(companyToUpdate),
            ReturnValues: "UPDATED_NEW",
            ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
        };
        return params;
    };
    CompanyServiceUtils.parmasToGetURL = function (key, expirationTime) {
        if (expirationTime === void 0) { expirationTime = 180; }
        var params = {
            Bucket: Resources_1.Resources.S3_BUCKET,
            Key: key,
            Expires: expirationTime
        };
        return params;
    };
    CompanyServiceUtils.parmasToPutS3BucketKey = function (key, contentType, body) {
        var params = {
            Bucket: Resources_1.Resources.S3_BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType
        };
        return params;
    };
    CompanyServiceUtils.companyAttributes = typescript_json_serializer_1.deserialize({}, Company_1.Company);
    return CompanyServiceUtils;
}());
exports.CompanyServiceUtils = CompanyServiceUtils;
