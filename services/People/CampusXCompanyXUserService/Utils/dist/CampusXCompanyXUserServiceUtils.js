"use strict";
/*
Created by Simone Scionti
*/
exports.__esModule = true;
exports.CampusXCompanyXUserServiceUtils = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var CampusXCompanyXUser_1 = require("../../../../shared/Models/RelationshipsRecordModels/CampusXCompanyXUser");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var CampusXCompanyXUserServiceUtils = /** @class */ (function () {
    function CampusXCompanyXUserServiceUtils() {
    }
    CampusXCompanyXUserServiceUtils.getPrimaryKey = function (campusName, companyName, email) {
        var keys = {
            PK: "#USER#X#CAMPUS<" + campusName + ">",
            SK: "#USER<" + email + ">#COMPANY<" + companyName + ">"
        };
        return keys;
    };
    CampusXCompanyXUserServiceUtils.paramsToCreateCampusXCompanyXUser = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(campusXCompanyXUser, keys),
            ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToOverwriteDeletedCampusXCompanyXUser = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(campusXCompanyXUser, keys)
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToUpdateCampusXCompanyXUser = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Key: keys,
            UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(campusXCompanyXUser),
            ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(campusXCompanyXUser),
            ReturnValues: "UPDATED_NEW",
            ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToDeleteCampusXCompanyXUser = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(campusXCompanyXUser),
            Key: keys,
            ReturnValues: "ALL_OLD"
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToGetCampusXCompanyXUser = function (campusName, companyName, email) {
        var keys = this.getPrimaryKey(campusName, companyName, email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            Key: keys
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToGetEmailFromCampusXCompanyXUser = function (campusName, companyName, email) {
        var keys = this.getPrimaryKey(campusName, companyName, email);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: "Email",
            Key: keys
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampus = function (campusName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusUsers = function (campusName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#visitor = :visitor and #rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#rs": "RelationshipStatus",
                "#visitor": "IsVisitor"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":rs": entityStatus,
                ":visitor": false
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusUsersByCompany = function (campusName, companyName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#company = :company and #visitor = :visitor and #rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#rs": "RelationshipStatus",
                "#visitor": "IsVisitor",
                "#company": "CompanyName"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":rs": entityStatus,
                ":visitor": false,
                ":company": companyName
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusVisitors = function (campusName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#visitor = :visitor and #rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#rs": "RelationshipStatus",
                "#visitor": "IsVisitor"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":rs": entityStatus,
                ":visitor": true
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusAndEmail = function (campusName, email) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk) ",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#sk": "SK"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":sk": "#USER<" + email + ">"
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusAndEmailWithStatus = function (campusName, email, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk) ",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#sk": "SK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + campusName + ">",
                ":sk": "#USER<" + email + ">",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCampusAndCompany = function (campusName, companyName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI1",
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk and #sk = :sk ",
            ExpressionAttributeNames: {
                "#pk": "GSI1PK",
                "#sk": "PK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#COMPANY<" + companyName + ">",
                ":sk": "#USER#X#CAMPUS<" + campusName + ">",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByCompany = function (companyName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI1",
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "GSI1PK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#COMPANY<" + companyName + ">",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsForQueryByEmail = function (email, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI2",
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk) ",
            ExpressionAttributeNames: {
                "#pk": "GSI2PK",
                "#sk": "GSI2SK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#CAMPUS#X#COMPANY#X#USER<" + email + ">",
                ":sk": "#CAMPUS",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToDeleteSingleTransactRelationship = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            Delete: {
                TableName: Resources_1.Resources.IP_TABLE,
                ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyXUserAttributes),
                Key: keys,
                ReturnValues: "ALL_OLD"
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToUpdateSingleTransactRelationship = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            Update: {
                TableName: Resources_1.Resources.IP_TABLE,
                Key: keys,
                UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(campusXCompanyXUser),
                ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(campusXCompanyXUser),
                ReturnValues: "ALL_OLD"
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.paramsToPutSingleTransactRelationship = function (campusXCompanyXUser) {
        var keys = this.getPrimaryKey(campusXCompanyXUser.CampusName, campusXCompanyXUser.CompanyName, campusXCompanyXUser.Email);
        var params = {
            Put: {
                TableName: Resources_1.Resources.IP_TABLE,
                Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(campusXCompanyXUser, keys)
            }
        };
        return params;
    };
    CampusXCompanyXUserServiceUtils.campusXCompanyXUserAttributes = typescript_json_serializer_1.deserialize({}, CampusXCompanyXUser_1.CampusXCompanyXUser);
    return CampusXCompanyXUserServiceUtils;
}());
exports.CampusXCompanyXUserServiceUtils = CampusXCompanyXUserServiceUtils;
