"use strict";
/*
    Created by Simone Scionti
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.VisitorRequestUtils = void 0;
var VisitorRequest_1 = require("../../../../shared/Models/VisitorRequest");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Utils_1 = require("../../../../shared/Utils/Utils");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var User_1 = require("../../../../shared/Models/User");
var UserServiceUtils_1 = require("../../UserService/Utils/UserServiceUtils");
var VisitorRequestStatus_1 = require("../../../../shared/Utils/Enums/VisitorRequestStatus");
var VisitorRequestUtils = /** @class */ (function () {
    function VisitorRequestUtils() {
    }
    VisitorRequestUtils.getPrimaryKey = function (campusName, visitorEmail, idRequest) {
        var keys = {
            PK: "#VISITOR#CAMPUS<" + campusName + ">",
            SK: "#VISITOR<" + visitorEmail + ">#ID<" + idRequest + ">"
        };
        return keys;
    };
    VisitorRequestUtils.paramsToCreateVisitorRequest = function (newVisitorRequest) {
        var keys = this.getPrimaryKey(newVisitorRequest.CampusName, newVisitorRequest.VisitorEmail, newVisitorRequest.VisitorRequestID);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newVisitorRequest, keys),
            ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
        };
        return params;
    };
    VisitorRequestUtils.paramsToGetVisitorRequest = function (campusName, visitorEmail, idRequest) {
        var keys = this.getPrimaryKey(campusName, visitorEmail, idRequest);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            Key: keys
        };
        return params;
    };
    VisitorRequestUtils.paramsToQueryByVisitor = function (campusName, visitorEmail) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#sk": "SK"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                ":sk": "#VISITOR<" + visitorEmail + ">"
            }
        };
        return params;
    };
    VisitorRequestUtils.paramsToUpdateVisitorRequest = function (visitorRequestToUpdate) {
        var keys = this.getPrimaryKey(visitorRequestToUpdate.CampusName, visitorRequestToUpdate.VisitorEmail, visitorRequestToUpdate.VisitorRequestID);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            Key: keys,
            UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(visitorRequestToUpdate),
            ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(visitorRequestToUpdate),
            ReturnValues: "UPDATED_NEW",
            ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
        };
        return params;
    };
    VisitorRequestUtils.paramsToDeleteVisitorRequest = function (visitorRequestToDelete) {
        var keys = this.getPrimaryKey(visitorRequestToDelete.CampusName, visitorRequestToDelete.VisitorEmail, visitorRequestToDelete.VisitorRequestID);
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            Key: keys,
            ReturnValues: "ALL_OLD"
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampusAndHostEmail = function (campusName, hostEmail) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#host": "UserHostEmail"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                ":host": hostEmail
            },
            FilterExpression: "#host = :host"
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampusHostEmailAndStatus = function (campusName, hostEmail, status) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI2",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "GSI2PK",
                "#sk": "GSI2SK",
                "#host": "UserHostEmail"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                ":sk": "#" + status,
                ":host": hostEmail
            },
            FilterExpression: "#host = :host"
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampus = function (campusName) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">"
            }
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampusAndStatus = function (campusName, status) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI2",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "GSI2PK",
                "#sk": "GSI2SK"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                ":sk": "#" + status
            }
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryForExpectedVisitorsByCampus = function (campusName) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#status": "VisitorRequestStatus"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">"
            },
            FilterExpression: "#status = " + VisitorRequestStatus_1.VisitorRequestStatus.ACCEPTED + "or #status = " + VisitorRequestStatus_1.VisitorRequestStatus.PENDING
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampusStatusStartDateAndLimitRecords = function (campusName, status, today) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            IndexName: "GSI2",
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "GSI2PK",
                "#sk": "GSI2SK",
                //"#DateOfArrival": "EstimatedDateOfArrival",
                "#DateOfRelease": "EstimatedReleaseDate"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                ":sk": "#" + status,
                //":startDate": startDate + "T23:59:59.999",
                ":endDate": today + "T00:00:00.000"
            },
            //FilterExpression: "#DateOfArrival <= :startDate and #DateOfRelease >= :endDate",
            FilterExpression: "#DateOfRelease >= :endDate"
        };
        return params;
    };
    VisitorRequestUtils.paramsForQueryByCampusAllStatusStartDateAndLimitRecords = function (campusName, today) {
        var params = {
            TableName: Resources_1.Resources.IP_TABLE,
            ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.visitorAttributes),
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK",
                //"#DateOfArrival": "EstimatedDateOfArrival",
                "#DateOfRelease": "EstimatedReleaseDate"
            },
            ExpressionAttributeValues: {
                ":pk": "#VISITOR#CAMPUS<" + campusName + ">",
                //":startDate": startDate + "T23:59:59.999",
                ":endDate": today
            },
            //FilterExpression: "#DateOfArrival <= :startDate and #DateOfRelease >= :endDate",
            FilterExpression: "#DateOfRelease >= :endDate"
        };
        return params;
    };
    //get the user with just the pk defined and returns a user with FName and LName taken from the db.
    VisitorRequestUtils.getUserInfoNames = function (fromEmail, dynamo) {
        return __awaiter(this, void 0, Promise, function () {
            var params, data, existingUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = UserServiceUtils_1.UserServiceUtils.paramsToGetUser(fromEmail);
                        return [4 /*yield*/, dynamo.get(params).promise()];
                    case 1:
                        data = _a.sent();
                        existingUser = typescript_json_serializer_1.deserialize(data.Item, User_1.User);
                        return [2 /*return*/, existingUser];
                }
            });
        });
    };
    VisitorRequestUtils.visitorAttributes = typescript_json_serializer_1.deserialize({}, VisitorRequest_1.VisitorRequest);
    return VisitorRequestUtils;
}());
exports.VisitorRequestUtils = VisitorRequestUtils;
