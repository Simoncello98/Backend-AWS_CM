/*
  Created by Giuseppe Criscione
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
exports.forceChangeEmail = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var aws_sdk_1 = require("aws-sdk");
var UserServiceUtils_1 = require("../Utils/UserServiceUtils");
var EntityStatus_1 = require("../../../../shared/Utils/Statics/EntityStatus");
var UpdateUser_1 = require("../../../../shared/Models/UpdateUser");
var User_1 = require("../../../../shared/Models/User");
var CampusXCompanyXUserServiceUtils_1 = require("../../CampusXCompanyXUserService/Utils/CampusXCompanyXUserServiceUtils");
var CampusXCompanyXUser_1 = require("../../../../shared/Models/RelationshipsRecordModels/CampusXCompanyXUser");
var Resources_1 = require("../../../../shared/Utils/Resources");
var BadgeServiceUtils_1 = require("../../../ISBuilding/BadgeService/Utils/BadgeServiceUtils");
var Badge_1 = require("../../../../shared/Models/Badge");
var MQTTTopics_1 = require("../../../../shared/Utils/Statics/MQTTTopics");
var LogsXBadgeXDeviceServiceUtils_1 = require("../../../ISBuilding/LogsXBadgeXDeviceService/Utils/LogsXBadgeXDeviceServiceUtils");
var LogsXBadgeXDevice_1 = require("../../../../shared/Models/RelationshipsRecordModels/LogsXBadgeXDevice");
var StartDateEnum_1 = require("../../../../shared/Utils/Enums/StartDateEnum");
var ActionCRUDLog_1 = require("../../../../shared/Utils/Enums/ActionCRUDLog");
var BadgeLog_1 = require("../../../../shared/Models/BadgeLog");
var BadgeLogServiceUtils_1 = require("../../../ISBuilding/BadgeLogService/Utils/BadgeLogServiceUtils");
var MealReservationServiceUtils_1 = require("../../../Meal/MealReservationService/Utils/MealReservationServiceUtils");
var MealReservation_1 = require("../../../../shared/Models/Meal/MealReservation");
var ISValidator_1 = require("../../../../shared/Utils/ISValidator");
exports.forceChangeEmail = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, dynamo, cognito, iotData, CampusName, startDate, callerEmail, error_1, requestedUpdateUser, resultValidateEmail, createBadgeToTransact, deleteBadgeToTransact, temporaryPasswordFilled, paramForGetOldUser, dataGetOldUser, deleteItemsToTransact, createItemsToTransact, userSerialIDMap, oldUser, paramsForDeleteOldUser, newUser, paramForCreateNewUser, paramForUserCompanyRelationship, dataGetOldRelationship, i, oldRelationship, newRelationship, pramsForDeleteOldRelationship, paramsForDeleteBadge, dataOldBadges, _i, _a, x, badge, newBadge, error_2, paramForCreateRelationship, error_3, paramForTransact, error_4, cognitoParams, cognitoGroupParams, error_5, response, _b, createBadgeToTransact_1, badge, newBadgeParam, newBadgeLog, badgeLogParams, obj, iotParams, error_6, mergedParams, params, createLogsToTransact, data, logsToDelete, logsToCreate, _c, _d, x, logToDelete, logToCreate, _e, logsToCreate_1, log, paramForTransactCreate, error_7, error_8, mealParams, data, oldReservation, newReservation, mealParamsToDelete, mealParamsToCreate, error_9, response, error_10, _f, deleteBadgeToTransact_1, badge, deleteBadgeParam, newBadgeLog, badgeLogParams, obj, iotParams, error_11, mergedParams, paramForTransactDelete, error_12, paramsCognitoDeleteUser, error_13, response, error_14;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
                iotData = new aws_sdk_1.IotData({ endpoint: Resources_1.Resources.IOTCoreEndpoint });
                CampusName = "";
                startDate = Utils_1.Utils.getUniqueInstance().getCurrentDateTime().substring(0, StartDateEnum_1.StartDateEnum.Today);
                callerEmail = "";
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Utils_1.Utils.getUniqueInstance().getEmailFromSignature(event.requestContext.identity.cognitoAuthenticationProvider, cognito)];
            case 2:
                callerEmail = _g.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, { Error: { Message: "Signature error" } })];
            case 4:
                requestedUpdateUser = typescript_json_serializer_1.deserialize(requestBody, UpdateUser_1.UpdateUser);
                requestedUpdateUser.NewUserEmail = requestedUpdateUser.NewUserEmail.toLowerCase().replace(/\s/g, '');
                resultValidateEmail = ISValidator_1.ISValidator.getUniqueInstance().isValidEmail(requestedUpdateUser.NewUserEmail);
                if (resultValidateEmail) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: resultValidateEmail })];
                }
                if (!requestedUpdateUser.enoughInfoForCreate()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedUpdateUser.getCreateExpectedBody())];
                }
                createBadgeToTransact = [];
                deleteBadgeToTransact = [];
                temporaryPasswordFilled = requestedUpdateUser.SendEmail === "T"
                    ? ""
                    : Resources_1.Resources.DefaultPasswordForNewUsers;
                paramForGetOldUser = UserServiceUtils_1.UserServiceUtils.paramsToGetUser(requestedUpdateUser.OldUserEmail);
                _g.label = 5;
            case 5:
                _g.trys.push([5, 67, , 68]);
                console.log("version 1.2.0");
                console.log("Get old user");
                return [4 /*yield*/, dynamo.get(paramForGetOldUser).promise()];
            case 6:
                dataGetOldUser = _g.sent();
                if (!dataGetOldUser.Item) return [3 /*break*/, 66];
                deleteItemsToTransact = [];
                createItemsToTransact = [];
                userSerialIDMap = new Map();
                oldUser = typescript_json_serializer_1.deserialize(dataGetOldUser.Item, User_1.User);
                oldUser.UserStatus = EntityStatus_1.EntityStatus.DELETED;
                paramsForDeleteOldUser = UserServiceUtils_1.UserServiceUtils.paramsToUpdateSingleTransactUser(oldUser);
                deleteItemsToTransact.push(paramsForDeleteOldUser);
                newUser = typescript_json_serializer_1.deserialize(dataGetOldUser.Item, User_1.User);
                newUser.Email = requestedUpdateUser.NewUserEmail;
                newUser.autoFillUndefinedImportantAttributes();
                newUser.removeCognitoParams();
                paramForCreateNewUser = UserServiceUtils_1.UserServiceUtils.paramsToPutSingleTransactUser(newUser);
                createItemsToTransact.push(paramForCreateNewUser);
                paramForUserCompanyRelationship = CampusXCompanyXUserServiceUtils_1.CampusXCompanyXUserServiceUtils.paramsForQueryByEmail(requestedUpdateUser.OldUserEmail, EntityStatus_1.EntityStatus.ACTIVE);
                _g.label = 7;
            case 7:
                _g.trys.push([7, 16, , 17]);
                console.log("Get old relationships");
                return [4 /*yield*/, dynamo.query(paramForUserCompanyRelationship).promise()];
            case 8:
                dataGetOldRelationship = _g.sent();
                if (!dataGetOldRelationship.Items) return [3 /*break*/, 15];
                i = 0;
                _g.label = 9;
            case 9:
                if (!(i < dataGetOldRelationship.Items.length)) return [3 /*break*/, 15];
                oldRelationship = typescript_json_serializer_1.deserialize(dataGetOldRelationship.Items[i], CampusXCompanyXUser_1.CampusXCompanyXUser);
                oldRelationship.autoFillUndefinedImportantAttributes();
                oldRelationship.createGSIAttributes();
                newRelationship = typescript_json_serializer_1.deserialize(dataGetOldRelationship.Items[i], CampusXCompanyXUser_1.CampusXCompanyXUser);
                newRelationship.autoFillUndefinedImportantAttributes();
                newRelationship.createGSIAttributes();
                oldRelationship.RelationshipStatus = EntityStatus_1.EntityStatus.DELETED;
                pramsForDeleteOldRelationship = CampusXCompanyXUserServiceUtils_1.CampusXCompanyXUserServiceUtils.paramsToUpdateSingleTransactRelationship(oldRelationship);
                deleteItemsToTransact.push(pramsForDeleteOldRelationship);
                userSerialIDMap.set(oldRelationship.CompanyName, oldRelationship.UserSerialID);
                CampusName = oldRelationship.CampusName;
                paramsForDeleteBadge = BadgeServiceUtils_1.BadgeServiceUtils.paramsForQueryByCampusEmailAndCompany(oldRelationship.CampusName, oldRelationship.Email, oldRelationship.CompanyName);
                _g.label = 10;
            case 10:
                _g.trys.push([10, 12, , 13]);
                console.log("Get old badge(s) for relation");
                return [4 /*yield*/, dynamo.query(paramsForDeleteBadge).promise()];
            case 11:
                dataOldBadges = _g.sent();
                if (dataOldBadges.Items) {
                    for (_i = 0, _a = dataOldBadges.Items; _i < _a.length; _i++) {
                        x = _a[_i];
                        badge = typescript_json_serializer_1.deserialize(x, Badge_1.Badge);
                        deleteBadgeToTransact.push(badge);
                        newBadge = typescript_json_serializer_1.deserialize(x, Badge_1.Badge);
                        newBadge.Email = requestedUpdateUser.NewUserEmail;
                        newBadge.removeUnplannedAttributesWithoutGSI();
                        newBadge.createGSIAttributes();
                        createBadgeToTransact.push(newBadge);
                    }
                }
                return [3 /*break*/, 13];
            case 12:
                error_2 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, paramsForDeleteBadge)];
            case 13:
                newRelationship.Email = requestedUpdateUser.NewUserEmail;
                newRelationship.createGSIAttributes();
                newRelationship.autoFillUndefinedImportantAttributes(); //it fills for instance : CompanyRole = Common.
                paramForCreateRelationship = CampusXCompanyXUserServiceUtils_1.CampusXCompanyXUserServiceUtils.paramsToPutSingleTransactRelationship(newRelationship);
                createItemsToTransact.push(paramForCreateRelationship);
                _g.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 9];
            case 15: return [3 /*break*/, 17];
            case 16:
                error_3 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_3, paramForUserCompanyRelationship)];
            case 17:
                paramForTransact = UserServiceUtils_1.UserServiceUtils.paramsToPutTransactWrite(createItemsToTransact);
                _g.label = 18;
            case 18:
                _g.trys.push([18, 20, , 21]);
                console.log("CREATE Transact items");
                return [4 /*yield*/, dynamo.transactWrite(paramForTransact).promise()];
            case 19:
                _g.sent();
                return [3 /*break*/, 21];
            case 20:
                error_4 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_4, paramForTransact)];
            case 21:
                cognitoParams = (requestedUpdateUser.SendEmail === "T")
                    ? UserServiceUtils_1.UserServiceUtils.getCognitoParams(requestedUpdateUser.NewUserEmail, Utils_1.Utils.getUniqueInstance().generateTemporaryPassword())
                    : UserServiceUtils_1.UserServiceUtils.getCognitoParamsWithoutSendingTheEmail(requestedUpdateUser.NewUserEmail, temporaryPasswordFilled);
                cognitoGroupParams = UserServiceUtils_1.UserServiceUtils.paramsForAssociateUserToGroupParams(newUser.Email, newUser.CognitoGroupName);
                _g.label = 22;
            case 22:
                _g.trys.push([22, 25, , 26]);
                console.log("Create user on Cognito");
                return [4 /*yield*/, cognito.adminCreateUser(cognitoParams).promise()];
            case 23:
                _g.sent();
                return [4 /*yield*/, cognito.adminAddUserToGroup(cognitoGroupParams).promise()];
            case 24:
                _g.sent();
                return [3 /*break*/, 26];
            case 25:
                error_5 = _g.sent();
                response = __assign(__assign({}, cognitoParams), cognitoGroupParams);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_5, response)];
            case 26:
                _b = 0, createBadgeToTransact_1 = createBadgeToTransact;
                _g.label = 27;
            case 27:
                if (!(_b < createBadgeToTransact_1.length)) return [3 /*break*/, 34];
                badge = createBadgeToTransact_1[_b];
                badge.removeUnplannedAttributesWithoutGSI();
                newBadgeParam = BadgeServiceUtils_1.BadgeServiceUtils.paramsToCreateBadge(badge);
                newBadgeLog = typescript_json_serializer_1.deserialize(badge, BadgeLog_1.BadgeLog);
                newBadgeLog.Admin = callerEmail;
                newBadgeLog.performToCreateNewLog(ActionCRUDLog_1.ActionCRUDLog.CREATED);
                badgeLogParams = BadgeLogServiceUtils_1.BadgeLogServiceUtils.paramsToCreateBadgeLog(newBadgeLog);
                obj = __assign(__assign({}, badge.toJson(true)), { UserSerialID: userSerialIDMap.get(badge.CompanyName), Action: "Update" });
                iotParams = {
                    topic: badge.CampusName.toLowerCase() + MQTTTopics_1.MQTTTopics.BADGE,
                    payload: JSON.stringify(obj)
                };
                _g.label = 28;
            case 28:
                _g.trys.push([28, 32, , 33]);
                console.log("Create badge");
                return [4 /*yield*/, dynamo.put(newBadgeParam).promise()];
            case 29:
                _g.sent();
                return [4 /*yield*/, dynamo.put(badgeLogParams).promise()];
            case 30:
                _g.sent();
                return [4 /*yield*/, iotData.publish(iotParams).promise()];
            case 31:
                _g.sent();
                return [3 /*break*/, 33];
            case 32:
                error_6 = _g.sent();
                mergedParams = __assign(__assign({}, newBadgeParam), iotParams);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_6, mergedParams)];
            case 33:
                _b++;
                return [3 /*break*/, 27];
            case 34:
                params = LogsXBadgeXDeviceServiceUtils_1.LogsXBadgeXDeviceServiceUtils.paramsForQueryPresencesByUser(CampusName, oldUser.Email, startDate);
                createLogsToTransact = [];
                _g.label = 35;
            case 35:
                _g.trys.push([35, 41, , 42]);
                return [4 /*yield*/, dynamo.query(params).promise()];
            case 36:
                data = _g.sent();
                logsToDelete = [];
                logsToCreate = [];
                for (_c = 0, _d = data.Items; _c < _d.length; _c++) {
                    x = _d[_c];
                    logToDelete = typescript_json_serializer_1.deserialize(x, LogsXBadgeXDevice_1.LogsXBadgeXDevice);
                    logsToDelete.push(logToDelete);
                    logToCreate = typescript_json_serializer_1.deserialize(x, LogsXBadgeXDevice_1.LogsXBadgeXDevice);
                    logToCreate.Email = newUser.Email;
                    logToCreate.autoFillUndefinedImportantAttributes();
                    logToCreate.createGSIAttributes();
                    logsToCreate.push(logToCreate);
                }
                for (_e = 0, logsToCreate_1 = logsToCreate; _e < logsToCreate_1.length; _e++) {
                    log = logsToCreate_1[_e];
                    createLogsToTransact.push(LogsXBadgeXDeviceServiceUtils_1.LogsXBadgeXDeviceServiceUtils.paramsToPutSingleTransactRelationship(log));
                }
                if (!(createLogsToTransact.length > 0)) return [3 /*break*/, 40];
                paramForTransactCreate = LogsXBadgeXDeviceServiceUtils_1.LogsXBadgeXDeviceServiceUtils.paramsToPutTransactWrite(createLogsToTransact);
                _g.label = 37;
            case 37:
                _g.trys.push([37, 39, , 40]);
                console.log("CREATE Transact Badge(s)");
                return [4 /*yield*/, dynamo.transactWrite(paramForTransactCreate).promise()];
            case 38:
                _g.sent();
                return [3 /*break*/, 40];
            case 39:
                error_7 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_7, paramForTransactCreate)];
            case 40: return [3 /*break*/, 42];
            case 41:
                error_8 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_8, params)];
            case 42:
                mealParams = MealReservationServiceUtils_1.MealReservationServiceUtils.paramsToGetMealReservation(CampusName, oldUser.Email, startDate);
                _g.label = 43;
            case 43:
                _g.trys.push([43, 50, , 51]);
                return [4 /*yield*/, dynamo.get(mealParams).promise()];
            case 44:
                data = _g.sent();
                if (!data.Item) return [3 /*break*/, 49];
                oldReservation = typescript_json_serializer_1.deserialize(data.Item, MealReservation_1.MealReservation);
                newReservation = typescript_json_serializer_1.deserialize(data.Item, MealReservation_1.MealReservation);
                newReservation.Email = newUser.Email;
                mealParamsToDelete = MealReservationServiceUtils_1.MealReservationServiceUtils.paramsToDeleteMealReservation(oldReservation);
                mealParamsToCreate = MealReservationServiceUtils_1.MealReservationServiceUtils.paramsToCreateMealReservation(newReservation);
                _g.label = 45;
            case 45:
                _g.trys.push([45, 48, , 49]);
                return [4 /*yield*/, dynamo["delete"](mealParamsToDelete).promise()];
            case 46:
                _g.sent();
                return [4 /*yield*/, dynamo.put(mealParamsToCreate).promise()];
            case 47:
                _g.sent();
                return [3 /*break*/, 49];
            case 48:
                error_9 = _g.sent();
                response = __assign(__assign({}, mealParamsToDelete), mealParamsToCreate);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_9, response)];
            case 49: return [3 /*break*/, 51];
            case 50:
                error_10 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_10, mealParams)];
            case 51:
                _f = 0, deleteBadgeToTransact_1 = deleteBadgeToTransact;
                _g.label = 52;
            case 52:
                if (!(_f < deleteBadgeToTransact_1.length)) return [3 /*break*/, 58];
                badge = deleteBadgeToTransact_1[_f];
                deleteBadgeParam = BadgeServiceUtils_1.BadgeServiceUtils.paramsToDeleteBadge(badge);
                newBadgeLog = typescript_json_serializer_1.deserialize(badge, BadgeLog_1.BadgeLog);
                newBadgeLog.Admin = callerEmail;
                newBadgeLog.performToCreateNewLog(ActionCRUDLog_1.ActionCRUDLog.DELETED);
                badgeLogParams = BadgeLogServiceUtils_1.BadgeLogServiceUtils.paramsToCreateBadgeLog(newBadgeLog);
                obj = __assign(__assign({}, badge.toJson(true)), { Action: "Delete" });
                iotParams = {
                    topic: badge.CampusName.toLowerCase() + MQTTTopics_1.MQTTTopics.BADGE,
                    payload: JSON.stringify(obj)
                };
                _g.label = 53;
            case 53:
                _g.trys.push([53, 56, , 57]);
                return [4 /*yield*/, dynamo["delete"](deleteBadgeParam).promise()];
            case 54:
                _g.sent();
                return [4 /*yield*/, dynamo.put(badgeLogParams).promise()];
            case 55:
                _g.sent();
                return [3 /*break*/, 57];
            case 56:
                error_11 = _g.sent();
                mergedParams = __assign(__assign({}, deleteBadgeParam), iotParams);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_11, mergedParams)];
            case 57:
                _f++;
                return [3 /*break*/, 52];
            case 58:
                paramForTransactDelete = UserServiceUtils_1.UserServiceUtils.paramsToPutTransactWrite(deleteItemsToTransact);
                _g.label = 59;
            case 59:
                _g.trys.push([59, 61, , 62]);
                console.log("DELETE Transact items");
                return [4 /*yield*/, dynamo.transactWrite(paramForTransactDelete).promise()];
            case 60:
                _g.sent();
                return [3 /*break*/, 62];
            case 61:
                error_12 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_12, paramForTransactDelete)];
            case 62:
                paramsCognitoDeleteUser = UserServiceUtils_1.UserServiceUtils.paramsForDeleteCognitoUserParams(oldUser.Email);
                _g.label = 63;
            case 63:
                _g.trys.push([63, 65, , 66]);
                console.log("Delete user on Cognito");
                return [4 /*yield*/, cognito.adminDeleteUser(paramsCognitoDeleteUser).promise()];
            case 64:
                _g.sent();
                return [3 /*break*/, 66];
            case 65:
                error_13 = _g.sent();
                response = __assign({}, paramsCognitoDeleteUser);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_13, response)];
            case 66: return [3 /*break*/, 68];
            case 67:
                error_14 = _g.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_14, paramForGetOldUser)];
            case 68: return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse({ Message: "OK", Password: temporaryPasswordFilled })];
        }
    });
}); };
