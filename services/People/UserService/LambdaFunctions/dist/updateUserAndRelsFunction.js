/*
  Created by Simone Scionti

  update the user and all the relationships record using a transaction.
*/
'use strict';
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
exports.updateUserAndRels = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var User_1 = require("../../../../shared/Models/User");
var UserConsistentUpdateManagerClass_1 = require("../shared/UserConsistentUpdateManagerClass");
var aws_sdk_1 = require("aws-sdk");
var UserServiceUtils_1 = require("../Utils/UserServiceUtils");
var AuthorizationServiceUtils_1 = require("../../../Authorization/AuthorizationService/Utils/AuthorizationServiceUtils");
var ISRestResultCodes_1 = require("../../../../shared/Utils/Enums/ISRestResultCodes");
exports.updateUserAndRels = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, userData, params, dynamo, cognito, currentUserData, userToUpdate, paramsRemoveUserFromGroup, error_1, paramsAddUserToGroup, error_2, error_3, rels, updateObjects, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                userData = typescript_json_serializer_1.deserialize(requestBody, User_1.User);
                if (!userData.isPKDefined()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, userData.getUpdateExpectedBody())];
                }
                params = UserServiceUtils_1.UserServiceUtils.paramsToGetUser(userData.Email);
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
                if (!userData.CognitoGroupName) return [3 /*break*/, 12];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, dynamo.get(params).promise()];
            case 2:
                currentUserData = _a.sent();
                userToUpdate = typescript_json_serializer_1.deserialize(currentUserData.Item, User_1.User);
                if (!((userToUpdate === null || userToUpdate === void 0 ? void 0 : userToUpdate.CognitoGroupName) && (userToUpdate === null || userToUpdate === void 0 ? void 0 : userToUpdate.CognitoGroupName) != userData.CognitoGroupName)) return [3 /*break*/, 6];
                paramsRemoveUserFromGroup = AuthorizationServiceUtils_1.AuthorizationServiceUtils.getCognitoParamsByUserAndGroup(userToUpdate.Email, userToUpdate.CognitoGroupName);
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, cognito.adminRemoveUserFromGroup(paramsRemoveUserFromGroup).promise()];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, paramsRemoveUserFromGroup)];
            case 6:
                paramsAddUserToGroup = UserServiceUtils_1.UserServiceUtils.paramsForAssociateUserToGroupParams(userToUpdate.Email, userData.CognitoGroupName);
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, cognito.adminAddUserToGroup(paramsAddUserToGroup).promise()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, paramsAddUserToGroup)];
            case 10: return [3 /*break*/, 12];
            case 11:
                error_3 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_3, params)];
            case 12:
                //UPDATE
                if (!userData.enoughInfoForUpdate()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getNothingToDoErrorResponse(requestBody, userData.getUpdateExpectedBody())];
                }
                if (userData.TelephoneNumber) {
                    if (!userData.TelephoneNumber.match(/^\+?(\d\s?)*\d$/g)) {
                        return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { message: "Invalid Thelephone number!" } }, ISRestResultCodes_1.ISRestResultCodes.BadRequest)];
                    }
                }
                return [4 /*yield*/, UserConsistentUpdateManagerClass_1.UserConsistentUpdateManager.getUniqueInstance().getRels(userData)];
            case 13:
                rels = _a.sent();
                updateObjects = UserConsistentUpdateManagerClass_1.UserConsistentUpdateManager.getUniqueInstance().getUpdateObjects(rels, userData, false);
                return [4 /*yield*/, UserConsistentUpdateManagerClass_1.UserConsistentUpdateManager.getUniqueInstance().transactUpdateRels(updateObjects)];
            case 14:
                data = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(data)];
        }
    });
}); };
