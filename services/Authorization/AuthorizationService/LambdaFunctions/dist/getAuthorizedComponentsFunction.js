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
exports.getAuthorizedComponents = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var aws_sdk_1 = require("aws-sdk");
var AuthorizationServiceUtils_1 = require("../Utils/AuthorizationServiceUtils");
exports.getAuthorizedComponents = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var dynamo, cognito, groupName, dynamoParamsForNavigation, dynamoParamsForAPIs, dynamoDataGroups, error_1, dynamoDataAPIs, error_2, navigationObject, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                cognito = new aws_sdk_1.CognitoIdentityServiceProvider({ signatureVersion: 'v4' });
                return [4 /*yield*/, Utils_1.Utils.getUniqueInstance().getGroupFromSignature(event.requestContext.identity.cognitoAuthenticationProvider, cognito)];
            case 1:
                groupName = _a.sent();
                console.log("group: " + groupName);
                dynamoParamsForNavigation = AuthorizationServiceUtils_1.AuthorizationServiceUtils.paramsToGetNavigation(groupName, "TREO");
                dynamoParamsForAPIs = AuthorizationServiceUtils_1.AuthorizationServiceUtils.paramsForQueryByGroupName(groupName);
                console.log("paramsNav: " + dynamoParamsForNavigation);
                //GET
                console.log("paramsApis: " + dynamoParamsForAPIs);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, dynamo.get(dynamoParamsForNavigation).promise()];
            case 3:
                dynamoDataGroups = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, dynamoParamsForNavigation)];
            case 5:
                console.log("nav res: " + dynamoDataGroups);
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, dynamo.query(dynamoParamsForAPIs).promise()];
            case 7:
                dynamoDataAPIs = _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, dynamoParamsForAPIs)];
            case 9:
                console.log("apis res: " + dynamoDataAPIs);
                navigationObject = dynamoDataGroups.Item ? dynamoDataGroups.Item.NavigationItems : {};
                console.log("navigation object  res: " + navigationObject);
                response = {
                    Homepage: dynamoDataGroups.Item ? dynamoDataGroups.Item.Homepage : "",
                    Navigation: navigationObject,
                    Functionalities: dynamoDataAPIs.Items ? dynamoDataAPIs.Items : {}
                };
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(response)];
        }
    });
}); };
