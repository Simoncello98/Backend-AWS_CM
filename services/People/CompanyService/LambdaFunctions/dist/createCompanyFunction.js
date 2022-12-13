/*
  Created by Simone Scionti

  Create a company instance, with all the attributes of Company info.

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
exports.createCompany = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var Company_1 = require("../../../../shared/Models/Company");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var aws_sdk_1 = require("aws-sdk");
var CompanyServiceUtils_1 = require("../Utils/CompanyServiceUtils");
var EntityStatus_1 = require("../../../../shared/Utils/Statics/EntityStatus");
var Validator_1 = require("../../../../shared/Utils/Validator");
var RestResultCodes_1 = require("../../../../shared/Utils/Enums/RestResultCodes");
exports.createCompany = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, newCompany, dynamo, paramsGetRelationship, flagDeleted, data, record, error_1, errorResponseValidate, params, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                newCompany = typescript_json_serializer_1.deserialize(requestBody, Company_1.Company);
                if (!newCompany.enoughInfoForCreate() || newCompany.CompanyName === "*") {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newCompany.getCreateExpectedBody())];
                }
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                paramsGetRelationship = CompanyServiceUtils_1.CompanyServiceUtils.paramsToGetCompany(newCompany.CompanyName);
                flagDeleted = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamo.get(paramsGetRelationship).promise()];
            case 2:
                data = _a.sent();
                if (data.Item) {
                    record = typescript_json_serializer_1.deserialize(data.Item, Company_1.Company);
                    flagDeleted = record.CompanyStatus === EntityStatus_1.EntityStatus.DELETED;
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, paramsGetRelationship)];
            case 4:
                //PUT
                newCompany.autoFillUndefinedImportantAttributes();
                errorResponseValidate = Validator_1.ISValidator.getUniqueInstance().isValidVATNumber(newCompany.VATNumber);
                if (errorResponseValidate.Error == "") {
                    newCompany.VATNumber = errorResponseValidate.VATNumber;
                }
                else {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, errorResponseValidate.Error, RestResultCodes_1.ISRestResultCodes.BadRequest)];
                }
                params = flagDeleted ? CompanyServiceUtils_1.CompanyServiceUtils.paramsToOverwriteDeletedCompany(newCompany) : CompanyServiceUtils_1.CompanyServiceUtils.paramsToCreateCompany(newCompany);
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, dynamo.put(params).promise()];
            case 6:
                data = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(data)];
            case 7:
                error_2 = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, params)];
            case 8: return [2 /*return*/];
        }
    });
}); };
