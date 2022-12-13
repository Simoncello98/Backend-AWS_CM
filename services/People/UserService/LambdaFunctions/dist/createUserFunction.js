/*
  Created by Simone Scionti
*/
'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createUser = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var User_1 = require("../../../../shared/Models/User");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var aws_sdk_1 = require("aws-sdk");
var UserServiceUtils_1 = require("../Utils/UserServiceUtils");
var CognitoGroupsName_1 = require("../../../../shared/Utils/Enums/CognitoGroupsName");
var EntityStatus_1 = require("../../../../shared/Utils/Statics/EntityStatus");
var AuthorizationServiceUtils_1 = require("../../../Authorization/AuthorizationService/Utils/AuthorizationServiceUtils");
var RestResultCodes_1 = require("../../../../shared/Utils/Enums/RestResultCodes");
var Resources_1 = require("../../../../shared/Utils/Resources");
exports.createUser = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, newUser, paramsForCreateUserInCognito, temporaryPasswordFilled, error, errorValidate, dynamo, cognito, paramsDisabledUser, flagDeleted, dataDisabledUser, paramsCognitoIdentityGetUser, error_1, cognitoAssociateGroupParams, params, data, cognitoCreateUserData, cognitoAssociateGroupData, result, error_2, mergedParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                newUser = typescript_json_serializer_1.deserialize(requestBody, User_1.User);
                if (newUser.Email && newUser.Email.length > 0)
                    newUser.Email.toLowerCase().replace(/\s/g, '');
                if (!newUser.enoughInfoForCreate()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newUser.getCreateExpectedBody())];
                }
                //Validate
                if (newUser.SocialNumber) {
                    newUser.SocialNumber = newUser.SocialNumber.toUpperCase();
                }
                //if user does not exist in dynamo
                //PUT in dynamo a new user
                newUser.autoFillUndefinedImportantAttributes();
                temporaryPasswordFilled = "";
                if (newUser.Email) {
                    paramsForCreateUserInCognito = UserServiceUtils_1.UserServiceUtils.getCognitoParams(newUser.Email, newUser.TemporaryPassword);
                }
                else {
                    error = newUser.autoFillEmailWithStandardDomain();
                    if (error) {
                        return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { Message: "An error occurred when try to fill standard email." } }, RestResultCodes_1.ISRestResultCodes.BadRequest)];
                    }
                    temporaryPasswordFilled = Resources_1.Resources.DefaultPasswordForNewUsers;
                    paramsForCreateUserInCognito = UserServiceUtils_1.UserServiceUtils.getCognitoParamsWithoutSendingTheEmail(newUser.Email, temporaryPasswordFilled);
                }
                errorValidate = UserServiceUtils_1.UserServiceUtils.validateImportantAttributes(newUser.Email, newUser.SocialNumber);
                if (errorValidate != null) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: errorValidate })];
                }
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
                paramsDisabledUser = UserServiceUtils_1.UserServiceUtils.paramsToGetUser(newUser.Email);
                flagDeleted = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, dynamo.get(paramsDisabledUser).promise()];
            case 2:
                dataDisabledUser = _a.sent();
                paramsCognitoIdentityGetUser = AuthorizationServiceUtils_1.AuthorizationServiceUtils.getCognitoParamsByUser(newUser.Email);
                if (!dataDisabledUser.Item) return [3 /*break*/, 4];
                return [4 /*yield*/, cognito.adminEnableUser(paramsCognitoIdentityGetUser).promise()];
            case 3:
                _a.sent();
                flagDeleted = dataDisabledUser.Item.UserStatus === EntityStatus_1.EntityStatus.DELETED;
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, { paramsDisabledUser: paramsDisabledUser })];
            case 6:
                newUser.autoFillUndefinedImportantAttributes();
                if (newUser.TelephoneNumber) {
                    if (!newUser.TelephoneNumber.match(/^\+?(\d\s?)*\d$/g)) {
                        return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { message: "Invalid Thelephone number!" } }, RestResultCodes_1.ISRestResultCodes.BadRequest)];
                    }
                }
                cognitoAssociateGroupParams = UserServiceUtils_1.UserServiceUtils.paramsForAssociateUserToGroupParams(newUser.Email, CognitoGroupsName_1.CognitoGroupsName.EMPLOYEE);
                newUser.CognitoGroupName = CognitoGroupsName_1.CognitoGroupsName.EMPLOYEE;
                newUser.removeCognitoParams();
                params = flagDeleted ? UserServiceUtils_1.UserServiceUtils.paramsToOverwriteDeletedUser(newUser) : UserServiceUtils_1.UserServiceUtils.paramsToCreateUser(newUser);
                _a.label = 7;
            case 7:
                _a.trys.push([7, 11, , 12]);
                return [4 /*yield*/, dynamo.put(params).promise()];
            case 8:
                data = _a.sent();
                return [4 /*yield*/, cognito.adminCreateUser(paramsForCreateUserInCognito).promise()];
            case 9:
                cognitoCreateUserData = _a.sent();
                return [4 /*yield*/, cognito.adminAddUserToGroup(cognitoAssociateGroupParams).promise()];
            case 10:
                cognitoAssociateGroupData = _a.sent();
                result = __assign(__assign(__assign(__assign({}, cognitoCreateUserData), cognitoAssociateGroupData), data), { Email: newUser.Email, Password: temporaryPasswordFilled // returns default temporary password if necessary else empty string
                 });
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(result)];
            case 11:
                error_2 = _a.sent();
                mergedParams = __assign(__assign(__assign({}, paramsForCreateUserInCognito), cognitoAssociateGroupParams), params);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, mergedParams)];
            case 12: return [2 /*return*/];
        }
    });
}); };
