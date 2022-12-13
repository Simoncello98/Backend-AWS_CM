/*
  Created by Simone Scionti
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
exports.createMyVisitorRequest = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var MyVisitorRequest_1 = require("../../../../shared/Models/MyVisitorRequest");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var Resources_1 = require("../../../../shared/Utils/Resources");
var aws_sdk_1 = require("aws-sdk");
var VisitorRequestUtils_1 = require("../Utils/VisitorRequestUtils");
var uuid_1 = require("uuid");
//import { StartDateEnum } from "../../../../shared/Utils/Enums/StartDateEnum";
var RestResultCodes_1 = require("../../../../shared/Utils/Enums/RestResultCodes");
exports.createMyVisitorRequest = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, newVisitorRequest, cognito, hostEmail, keysHost, paramsHost, telephoneNumber, dynamo, data, error_1, visitorWithInfo, hostWithInfo, params, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                newVisitorRequest = typescript_json_serializer_1.deserialize(requestBody, MyVisitorRequest_1.MyVisitorRequest);
                if (!newVisitorRequest.enoughInfoForCreate()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newVisitorRequest.getCreateExpectedBody())];
                }
                cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
                return [4 /*yield*/, Utils_1.Utils.getUniqueInstance().getEmailFromSignature(event.requestContext.identity.cognitoAuthenticationProvider, cognito)];
            case 1:
                hostEmail = _a.sent();
                keysHost = {
                    PK: "#USER<" + hostEmail + ">",
                    SK: "#USER_INFO<" + hostEmail + ">"
                };
                paramsHost = {
                    TableName: Resources_1.Resources.IP_TABLE,
                    ProjectionExpression: "TelephoneNumber",
                    Key: keysHost
                };
                telephoneNumber = "";
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, dynamo.get(paramsHost).promise()];
            case 3:
                data = _a.sent();
                telephoneNumber = data.Item ? data.Item.TelephoneNumber : "";
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, paramsHost)];
            case 5:
                if (telephoneNumber === "" && newVisitorRequest.UserHostTelephoneNumber) {
                    if (!newVisitorRequest.UserHostTelephoneNumber.match(/^\+?(\d\s?)*\d$/g)) {
                        return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { message: "Invalid Userhost Thelephone number!" } }, RestResultCodes_1.ISRestResultCodes.BadRequest)];
                    }
                    else {
                        telephoneNumber = newVisitorRequest.UserHostTelephoneNumber;
                    }
                }
                if (!telephoneNumber) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { hostEmail: hostEmail, message: "TelephoneNumber is empty." } })];
                }
                if (newVisitorRequest.VisitorTelephoneNumber) {
                    if (!newVisitorRequest.VisitorTelephoneNumber.match(/^\+?(\d\s?)*\d$/g)) {
                        return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { message: "Invalid Visitor Thelephone number!" } }, RestResultCodes_1.ISRestResultCodes.BadRequest)];
                    }
                }
                return [4 /*yield*/, VisitorRequestUtils_1.VisitorRequestUtils.getUserInfoNames(newVisitorRequest.VisitorEmail, dynamo)];
            case 6:
                visitorWithInfo = _a.sent();
                if (visitorWithInfo) {
                    newVisitorRequest.VisitorFName = visitorWithInfo.FName;
                    newVisitorRequest.VisitorLName = visitorWithInfo.LName;
                }
                return [4 /*yield*/, VisitorRequestUtils_1.VisitorRequestUtils.getUserInfoNames(newVisitorRequest.UserHostEmail, dynamo)];
            case 7:
                hostWithInfo = _a.sent();
                if (hostWithInfo) {
                    newVisitorRequest.UserHostFName = hostWithInfo.FName;
                    newVisitorRequest.UserHostLName = hostWithInfo.LName;
                }
                //PUT
                newVisitorRequest.autoFillUndefinedImportantAttributes();
                newVisitorRequest.createGSIAttributes();
                newVisitorRequest.VisitorRequestID = uuid_1.v4();
                newVisitorRequest.setHost(hostEmail, telephoneNumber, newVisitorRequest.UserHostCompanyName);
                params = VisitorRequestUtils_1.VisitorRequestUtils.paramsToCreateVisitorRequest(newVisitorRequest);
                _a.label = 8;
            case 8:
                _a.trys.push([8, 10, , 11]);
                return [4 /*yield*/, dynamo.put(params).promise()];
            case 9:
                data = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(data)];
            case 10:
                error_2 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, params)];
            case 11: return [2 /*return*/];
        }
    });
}); };
