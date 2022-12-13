"use strict";
/*
    Created by Simone Scionti
*/
exports.__esModule = true;
exports.CampusXCompanyServiceUtils = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var CampusXCompany_1 = require("../../../../shared/Models/RelationshipsRecordModels/CampusXCompany");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var CampusXCompanyServiceUtils = /** @class */ (function () {
    function CampusXCompanyServiceUtils() {
    }
    CampusXCompanyServiceUtils.getPrimaryKey = function (campusName, companyName) {
        var keys = {
            PK: "#CAMPUS<" + campusName + ">",
            SK: "#COMPANY<" + companyName + ">"
        };
        return keys;
    };
    CampusXCompanyServiceUtils.paramsToCreateCampusXCompany = function (newCampusXCompany) {
        var keys = this.getPrimaryKey(newCampusXCompany.CampusName, newCampusXCompany.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newCampusXCompany, keys),
            ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToOverwriteDeletedCampusXCompany = function (newCampusXCompany) {
        var keys = this.getPrimaryKey(newCampusXCompany.CampusName, newCampusXCompany.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newCampusXCompany, keys)
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToDeleteCampusXCompany = function (campusXCompanyToDelete) {
        var keys = this.getPrimaryKey(campusXCompanyToDelete.CampusName, campusXCompanyToDelete.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyAttributes),
            Key: keys,
            ReturnValues: "ALL_OLD"
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToUpdateCampusXCompany = function (campusXCompanyToUpdate) {
        var keys = this.getPrimaryKey(campusXCompanyToUpdate.CampusName, campusXCompanyToUpdate.CompanyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Key: keys,
            UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(campusXCompanyToUpdate),
            ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(campusXCompanyToUpdate),
            ReturnValues: "UPDATED_NEW",
            ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToGetCampusXCompany = function (campusName, companyName) {
        var keys = this.getPrimaryKey(campusName, companyName);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyAttributes),
            Key: keys
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsForQueryForCampusCompanies = function (campusName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyAttributes),
            FilterExpression: "#rs = :rs",
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#sk": "SK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#CAMPUS<" + campusName + ">",
                ":sk": "#COMPANY",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsForQueryForCompanyParentCampuses = function (companyName, entityStatus) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI1",
            FilterExpression: "#rs = :rs",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "GSI1PK",
                "#sk": "PK",
                "#rs": "RelationshipStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#COMPANY<" + companyName + ">",
                ":sk": "#CAMPUS",
                ":rs": entityStatus
            }
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsForQueryForCompanyParentCampusesWithoutRelationshipStatus = function (companyName) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI1",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.campusXCompanyAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "GSI1PK",
                "#sk": "PK"
            },
            ExpressionAttributeValues: {
                ":pk": "#COMPANY<" + companyName + ">",
                ":sk": "#CAMPUS"
            }
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToUpdateSingleTransactRecord = function (item) {
        var keys = this.getPrimaryKey(item.CampusName, item.CompanyName);
        var params = {
            Update: {
                TableName: Resources_1.Resources.IP_TABLE,
                Key: keys,
                UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(item),
                ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(item),
                ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
            }
        };
        return params;
    };
    CampusXCompanyServiceUtils.paramsToPutTransactWrite = function (itemsToTransact) {
        var params = {
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            TransactItems: itemsToTransact
        };
        return params;
    };
    CampusXCompanyServiceUtils.campusXCompanyAttributes = typescript_json_serializer_1.deserialize({}, CampusXCompany_1.CampusXCompany);
    return CampusXCompanyServiceUtils;
}());
exports.CampusXCompanyServiceUtils = CampusXCompanyServiceUtils;
