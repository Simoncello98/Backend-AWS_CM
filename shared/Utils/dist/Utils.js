"use strict";
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
exports.Utils = void 0;
var RestResultCodes_1 = require("./Enums/RestResultCodes");
var Resources_1 = require("./Resources");
var EntityStatus_1 = require("./Statics/EntityStatus");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getUniqueInstance = function () {
        if (!Utils.obj)
            Utils.obj = new Utils();
        return this.obj;
    };
    Utils.prototype.getDataResponse = function (data) {
        var response = this.getResponse(RestResultCodes_1.ISRestResultCodes.Ok, {});
        if ((typeof data) === "object") {
            response.statusCode = RestResultCodes_1.ISRestResultCodes.Ok;
            var dataResponse = data;
            if (dataResponse.errorType != undefined)
                response.body = dataResponse.errorMessage;
            else
                response.body = JSON.stringify(data);
        }
        else
            response.statusCode = RestResultCodes_1.ISRestResultCodes.NotFound;
        return response;
    };
    /** Used to reply with an error message to the client */
    Utils.prototype.getErrorResponse = function (errorBody, params, errorCode) {
        if (errorCode === void 0) { errorCode = RestResultCodes_1.ISRestResultCodes.Error; }
        var response = this.getResponse(errorCode, {});
        response.statusCode = errorCode;
        var trace = {};
        Error.captureStackTrace(trace);
        response.body = JSON.stringify({
            Error: errorBody.toString(),
            Params: params,
            Trace: trace.stack
        });
        return response;
    };
    Utils.prototype.getValidationErrorResponse = function (requestBody, expectedBody) {
        var body = {
            Error: {
                Reason: "ValidationException",
                expectedRequestBody: expectedBody,
                receivedRequestBody: requestBody
            }
        };
        return this.getResponse(RestResultCodes_1.ISRestResultCodes.BadRequest, body);
    };
    Utils.prototype.getNothingToDoErrorResponse = function (requestBody, expectedBody) {
        var body = {
            Error: {
                Reason: "Nothing to do",
                Description: "At least one of optional values has to be included in the update request body",
                expectedRequestBody: expectedBody,
                receivedRequestBody: requestBody
            }
        };
        return this.getResponse(RestResultCodes_1.ISRestResultCodes.BadRequest, body);
    };
    Utils.prototype.getResponse = function (statusCode, body) {
        var response = {};
        response.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            //TODO you probably need to add : "Access-Control-Allow-Credentials" : true
        };
        response.statusCode = statusCode;
        response.body = JSON.stringify(body);
        return response;
    };
    //TODO: pass also a requestType parameters for security reasons. 
    //Example: if in an update(PUT) operation the client passes alla parameters trough queryStringParameters right now it converts all parameters in the body so it works(but it's not good).
    Utils.prototype.validateRequestObject = function (event) {
        if (!event)
            return {};
        var bodyString = "";
        if (!event.body && !event.queryStringParameters) { //lambda direct calls and step functions payload has no body and no queryStringParameters.
            if (typeof event == "string")
                bodyString = event; //step functions
            else if (typeof event == "object")
                bodyString = JSON.stringify(event); //lambda direct call has object payload.
            else
                return {}; //nothing received.
        }
        else if (event.body != undefined)
            bodyString = event.body;
        else if (event.queryStringParameters != undefined)
            bodyString = this.getObjectStringFromDictionary(event.queryStringParameters);
        var bodyRequest;
        try {
            bodyRequest = JSON.parse(bodyString);
        }
        catch (_a) {
            return {};
        }
        return bodyRequest;
    };
    /*we don't need any recursive function because it's used just for read data,
    and for each model the Primary Key is defined in the top level object*/
    Utils.prototype.getObjectStringFromDictionary = function (dict) {
        var obj = {};
        for (var key in dict) {
            var value = dict[key];
            obj[key] = value;
        }
        return JSON.stringify(obj);
    };
    Utils.prototype.getNewItemToInsert = function (newObj, keys) {
        var item = newObj.toJson(true); //remove undefined properties
        Object.assign(item, keys);
        return item;
    };
    Utils.prototype.getUpdateExpression = function (item) {
        return this.recursivelyGetUpdateExpression(item, "", "", "set ");
    };
    Utils.prototype.recursivelyGetUpdateExpression = function (item, parentPath, parentValuePath, expression) {
        var sourceKeysArray = item.updateOptionalAtLeastOneAttributes;
        for (var index in sourceKeysArray) {
            var key = sourceKeysArray[index];
            var value = item[key];
            if (typeof (value) != "object" || Array.isArray(value)) { //this object attributes - base recursive case
                if (value != undefined && value != null) {
                    if (expression != "set ")
                        expression += " , ";
                    if (parentPath != "")
                        expression += parentPath + "." + key + " = :" + parentValuePath + key; //nested child attribute
                    else
                        expression += key + " = :" + key; //top level object attribute
                }
            }
            else if (value !== null) { //nested child
                var currentParentPath = parentPath;
                var currentParentValuePath = parentValuePath;
                if (parentPath == "")
                    parentPath += key; //first child , it doesn't need any dot
                else
                    parentPath += "." + key; //build the path with dot notation to write to the correct attribute of the map object in the database.
                parentValuePath = parentValuePath + key;
                var nestedObjectExpression = this.recursivelyGetUpdateExpression(item[key], parentValuePath, parentPath, expression);
                parentPath = currentParentPath;
                parentValuePath = currentParentValuePath;
                expression = nestedObjectExpression;
            }
        }
        return expression;
    };
    Utils.prototype.getExpressionAttributeValues = function (item) {
        return this.recursivelyGetExpressionAttributeValues(item, "");
    };
    Utils.prototype.recursivelyGetExpressionAttributeValues = function (item, parentPath) {
        var obj = {};
        var sourceKeysArray = item.updateOptionalAtLeastOneAttributes;
        for (var index in sourceKeysArray) {
            var key = sourceKeysArray[index];
            var value = item[key];
            if (typeof (value) != "object" || Array.isArray(value)) { //this object attributes - base recursive case
                if (value != undefined && value != null) {
                    var expressionKey = ":" + parentPath + key;
                    obj[expressionKey] = value;
                }
            }
            else if (value != null) { //nested child
                var currentPath = parentPath;
                parentPath += key;
                var nestedObjectAttributeValues = this.recursivelyGetExpressionAttributeValues(item[key], parentPath);
                parentPath = currentPath;
                Object.assign(obj, nestedObjectAttributeValues); //append into the obj the attribute-values found in the nested obj.
            }
        }
        //console.log("Values:");
        //console.log(JSON.stringify(obj));
        return obj;
    };
    Utils.prototype.getAllJsonAttributesProjectionExpression = function (item) {
        var expression = "";
        var keys = Object.keys(item.toJson(false));
        var i = 0;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!key.startsWith("GSI")) {
                if (i != keys.length - 1) {
                    expression += key + ",";
                    i++;
                }
                else {
                    expression += key;
                }
            }
            else {
                i++;
            }
        }
        if (expression.endsWith(",")) {
            expression = expression.substr(0, expression.length - 1);
        }
        return expression;
    };
    //TODO:  test the function updating a nested object. it should work.
    //we need to have the same dependent keys in base model and dependentModel.
    //it could be a model or a nestedObject so use the interface ModelNecessaryQueryInfoInterface
    //TODO: check value != null
    Utils.prototype.recursivelySetUpdatedKeysForSameSchema = function (actualBaseItem, itemToUpdate) {
        var sourceKeysArray = actualBaseItem.updateOptionalAtLeastOneAttributes;
        for (var index in sourceKeysArray) {
            var key = sourceKeysArray[index];
            var value = actualBaseItem[key]; //value of the updatable key 
            //this if is inverted because if we found a defined attribute in the top level object, we can say that at least one is defined and don't check in nested childs. 
            if ((typeof (value) != "object" && value != undefined) || Array.isArray(value)) { //this object attributes - base recursive case
                //change prop in the objToUpdate
                itemToUpdate[key] = value;
            }
            else if (value != undefined) { //nested child object
                this.recursivelySetUpdatedKeysForSameSchema(actualBaseItem[key], itemToUpdate[key]);
            }
        }
    };
    //TODO: test the function deleting some in the nested object ( if its possible ). it works for top level object for sure
    //TODO: check value != null
    Utils.prototype.recursivelySetUpdatedKeysForSchema = function (schema, actualBaseItem, itemToUpdate) {
        for (var baseItemKey in schema) {
            var itemToUpdateKey = schema[baseItemKey];
            var baseValue = actualBaseItem[baseItemKey];
            //this if is inverted because if we found a defined attribute in the top level object, we can say that at least one is defined and don't check in nested childs. 
            if ((typeof (baseValue) != "object" && baseValue != undefined) || Array.isArray(baseValue)) { //this object attributes - base recursive case
                //change prop in the objToUpdate
                itemToUpdate[itemToUpdateKey] = baseValue;
            }
            else if (baseValue != undefined) { //nested child object
                this.recursivelySetUpdatedKeysForSameSchema(actualBaseItem[baseValue], itemToUpdate[itemToUpdateKey]);
            }
        }
    };
    Utils.prototype.getCurrentDateTime = function () {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        return localISOTime;
    };
    Utils.prototype.isValidDate = function (stringDate) {
        var parsedDate = Date.parse(stringDate);
        if (isNaN(stringDate) && !isNaN(parsedDate)) {
            return true;
        }
        return false;
    };
    Utils.prototype.getEmailFromSignature = function (cognitoAuthenticationProvider, cognito) {
        return __awaiter(this, void 0, Promise, function () {
            var sub, cognitoParams, cognitoData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sub = cognitoAuthenticationProvider.split(':')[2];
                        cognitoParams = {
                            UserPoolId: Resources_1.Resources.USERPOOL_ID,
                            Username: sub
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cognito.adminGetUser(cognitoParams).promise()];
                    case 2:
                        cognitoData = _a.sent();
                        return [2 /*return*/, cognitoData.UserAttributes.find(function (item) { return item.Name == "email"; }).Value];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, "" + error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.getGroupFromSignature = function (cognitoAuthenticationProvider, cognito) {
        return __awaiter(this, void 0, Promise, function () {
            var sub, cognitoParams, cognitoData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sub = cognitoAuthenticationProvider.split(':')[2];
                        cognitoParams = {
                            UserPoolId: Resources_1.Resources.USERPOOL_ID,
                            Username: sub
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cognito.adminListGroupsForUser(cognitoParams).promise()];
                    case 2:
                        cognitoData = _a.sent();
                        return [2 /*return*/, cognitoData.Groups[0].GroupName];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, "" + error_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.getMyListOfCompanies = function (companyEmailAdmin, campusName, dynamo) {
        return __awaiter(this, void 0, Promise, function () {
            var companiesAdminParams, companiesAdminData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companiesAdminParams = {
                            TableName: Resources_1.Resources.IP_TABLE,
                            IndexName: "GSI2",
                            FilterExpression: "#campusName = :campusName and #companyRole = :companyRole and #rs = :rs",
                            ProjectionExpression: "CompanyName",
                            KeyConditionExpression: "#pk = :pk",
                            ExpressionAttributeNames: {
                                "#pk": "GSI2PK",
                                "#rs": "RelationshipStatus",
                                "#companyRole": "CompanyRole",
                                "#campusName": "CampusName"
                            },
                            ExpressionAttributeValues: {
                                ":pk": "#CAMPUS#X#COMPANY#X#USER<" + companyEmailAdmin + ">",
                                ":rs": EntityStatus_1.EntityStatus.ACTIVE,
                                ":companyRole": "Admin",
                                ":campusName": campusName
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dynamo.query(companiesAdminParams).promise()];
                    case 2:
                        companiesAdminData = _a.sent();
                        return [2 /*return*/, companiesAdminData.Items];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.getMyListOfCompaniesForEmployee = function (companyEmailAdmin, campusName, dynamo) {
        return __awaiter(this, void 0, Promise, function () {
            var companiesAdminParams, companiesAdminData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companiesAdminParams = {
                            TableName: Resources_1.Resources.IP_TABLE,
                            IndexName: "GSI2",
                            FilterExpression: "#campusName = :campusName and #rs = :rs",
                            ProjectionExpression: "CompanyName",
                            KeyConditionExpression: "#pk = :pk",
                            ExpressionAttributeNames: {
                                "#pk": "GSI2PK",
                                "#rs": "RelationshipStatus",
                                "#campusName": "CampusName"
                            },
                            ExpressionAttributeValues: {
                                ":pk": "#CAMPUS#X#COMPANY#X#USER<" + companyEmailAdmin + ">",
                                ":rs": EntityStatus_1.EntityStatus.ACTIVE,
                                ":campusName": campusName
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dynamo.query(companiesAdminParams).promise()];
                    case 2:
                        companiesAdminData = _a.sent();
                        return [2 /*return*/, companiesAdminData.Items];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.emptyBucket = function (prefix, s3) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketName, paramsToDelete, paramsToListObjects, listObjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bucketName = Resources_1.Resources.S3_BUCKET;
                        paramsToDelete = {
                            Bucket: bucketName,
                            Delete: {
                                Objects: []
                            }
                        };
                        paramsToListObjects = {
                            Bucket: bucketName,
                            Prefix: prefix
                        };
                        return [4 /*yield*/, s3.listObjectsV2(paramsToListObjects).promise()];
                    case 1:
                        listObjects = _a.sent();
                        if (listObjects.Contents.length === 0) {
                            return [2 /*return*/];
                        }
                        listObjects.Contents.forEach(function (_a) {
                            var Key = _a.Key;
                            paramsToDelete.Delete.Objects.push({ Key: Key });
                        });
                        return [4 /*yield*/, s3.deleteObjects(paramsToDelete).promise()];
                    case 2:
                        _a.sent();
                        if (!listObjects.IsTruncated) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.emptyBucket(prefix, s3)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.checkContentType = function (contentType) {
        if (contentType === "png" || contentType === "jpg" || contentType === "jpeg") {
            return "";
        }
        return "Unsupported Media Type";
    };
    Utils.prototype.generateTemporaryPassword = function () {
        return "CMPSW123";
    };
    Utils.obj = null;
    return Utils;
}());
exports.Utils = Utils;
