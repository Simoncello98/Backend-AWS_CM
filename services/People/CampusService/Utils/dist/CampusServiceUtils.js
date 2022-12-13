"use strict";
/*
    Created By Simone Scionti
*/
exports.__esModule = true;
exports.CampusServiceUtils = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var Campus_1 = require("../../../../shared/Models/Campus");
var CampusRegulations_1 = require("../../../../shared/Models/CampusRegulations");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var CampusServiceUtils = /** @class */ (function () {
    function CampusServiceUtils() {
    }
    CampusServiceUtils.getPrimaryKey = function (campusName) {
        var keys = {
            PK: "#CAMPUS",
            SK: "#CAMPUS_INFO<" + campusName + ">"
        };
        return keys;
    };
    CampusServiceUtils.getCampusRegulationsPrimaryKey = function (campusName, regulationTitle) {
        var keys = {
            PK: "#REGULATIONS#CAMPUS<" + campusName + ">",
            SK: "#TITLE<" + regulationTitle + ">"
        };
        return keys;
    };
    CampusServiceUtils.paramsToCreateCampus = function (campus) {
        var keys = this.getPrimaryKey(campus.CampusName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(campus, keys),
            ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
        };
        return params;
    };
    CampusServiceUtils.paramsToOverwriteDeletedCampus = function (campus) {
        var keys = this.getPrimaryKey(campus.CampusName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(campus, keys)
        };
        return params;
    };
    CampusServiceUtils.paramsToDeleteCampus = function (campus) {
        var keys = this.getPrimaryKey(campus.CampusName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(campus),
            Key: keys,
            ReturnValues: "ALL_OLD"
        };
        return params;
    };
    CampusServiceUtils.paramsToGetCampus = function (campusName) {
        var keys = this.getPrimaryKey(campusName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusAttributes),
            Key: keys
        };
        return params;
    };
    CampusServiceUtils.paramsToUpdateCampus = function (campus) {
        var keys = this.getPrimaryKey(campus.CampusName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Key: keys,
            UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(campus),
            ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(campus),
            ReturnValues: "UPDATED_NEW",
            ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
        };
        return params;
    };
    CampusServiceUtils.paramsForQueryForAllRecordsWithStatus = function (entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#rs": "CampusStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#CAMPUS",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusServiceUtils.paramsForQueryForAllCampusRegulations = function (campusName) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusRegulationsAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK"
            },
            ExpressionAttributeValues: {
                ":pk": "#REGULATIONS#CAMPUS<" + campusName + ">"
            }
        };
        return params;
    };
    CampusServiceUtils.paramsToGetURL = function (key, expirationTime) {
        if (expirationTime === void 0) { expirationTime = 180; }
        var params = {
            Bucket: Resources_1.Resources.S3_BUCKET,
            Key: key,
            Expires: expirationTime
        };
        return params;
    };
    CampusServiceUtils.paramsToPutS3BucketKey = function (key, contentType, body) {
        var params = {
            Bucket: Resources_1.Resources.S3_BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType
        };
        return params;
    };
    CampusServiceUtils.campusAttributes = typescript_json_serializer_1.deserialize({}, Campus_1.Campus);
    CampusServiceUtils.campusRegulationsAttributes = typescript_json_serializer_1.deserialize({}, CampusRegulations_1.CampusRegulations);
    return CampusServiceUtils;
}());
exports.CampusServiceUtils = CampusServiceUtils;
