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
exports.uploadCompanyLogo = void 0;
var aws_sdk_1 = require("aws-sdk");
var uuid_1 = require("uuid");
var CreateLogo_1 = require("../../../../shared/Models/Logo/CreateLogo");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var Utils_1 = require("../../../../shared/Utils/Utils");
var CompanyServiceUtils_1 = require("../Utils/CompanyServiceUtils");
var Resources_1 = require("../../../../shared/Utils/Resources");
var Company_1 = require("../../../../shared/Models/Company");
var CampusXCompanyServiceUtils_1 = require("../../CampusXCompanyService/Utils/CampusXCompanyServiceUtils");
var CampusXCompany_1 = require("../../../../shared/Models/RelationshipsRecordModels/CampusXCompany");
exports.uploadCompanyLogo = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, newLogo, contentType, errorContentType, keyPathPrefix, key, url, companyToUpdate, buff, paramsPutS3, paramsUpdateDynamo, s3, dynamo, paramsGetAllRelationships, dataRelationships, paramsUpdateCompanyRelationships, i, item, paramsUpdateTransact, paramsForTransact, responseData, error_1, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                newLogo = typescript_json_serializer_1.deserialize(requestBody, CreateLogo_1.CreateLogo);
                if (!newLogo.enoughInfoForReadOrDelete()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newLogo.getReadAndDeleteExpectedBody())];
                }
                newLogo.autoFillUndefinedImportantAttributes();
                contentType = newLogo.ContentType.substring(6);
                errorContentType = Utils_1.Utils.getUniqueInstance().checkContentType(contentType);
                if (errorContentType != "") {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(null, { Error: { contentType: contentType, message: errorContentType } })];
                }
                keyPathPrefix = "uploads/logo/companies/";
                key = keyPathPrefix + uuid_1.v4() + "." + contentType;
                url = "https://" + Resources_1.Resources.S3_BUCKET + ".s3.amazonaws.com/" + key;
                companyToUpdate = new Company_1.Company();
                companyToUpdate.removeUnplannedValues();
                companyToUpdate.CompanyName = newLogo.OrganizationName;
                companyToUpdate.Logo = url;
                buff = Buffer.from(newLogo.Data, 'base64');
                paramsPutS3 = CompanyServiceUtils_1.CompanyServiceUtils.parmasToPutS3BucketKey(key, newLogo.ContentType, buff);
                paramsUpdateDynamo = CompanyServiceUtils_1.CompanyServiceUtils.paramsToUpdateCompany(companyToUpdate);
                s3 = new aws_sdk_1.S3({ signatureVersion: 'v4' });
                dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, s3.putObject(paramsPutS3).promise()];
            case 2:
                _a.sent();
                return [4 /*yield*/, dynamo.update(paramsUpdateDynamo).promise()];
            case 3:
                _a.sent();
                paramsGetAllRelationships = CampusXCompanyServiceUtils_1.CampusXCompanyServiceUtils.paramsForQueryForCompanyParentCampusesWithoutRelationshipStatus(companyToUpdate.CompanyName);
                return [4 /*yield*/, dynamo.query(paramsGetAllRelationships).promise()];
            case 4:
                dataRelationships = _a.sent();
                if (!(dataRelationships.Items.length > 0)) return [3 /*break*/, 6];
                paramsUpdateCompanyRelationships = [];
                for (i = 0; i < dataRelationships.Items.length; i++) {
                    item = typescript_json_serializer_1.deserialize(dataRelationships.Items[i], CampusXCompany_1.CampusXCompany);
                    item.CompanyLogo = url;
                    paramsUpdateTransact = CampusXCompanyServiceUtils_1.CampusXCompanyServiceUtils.paramsToUpdateSingleTransactRecord(item);
                    paramsUpdateCompanyRelationships.push(paramsUpdateTransact);
                }
                paramsForTransact = CampusXCompanyServiceUtils_1.CampusXCompanyServiceUtils.paramsToPutTransactWrite(paramsUpdateCompanyRelationships);
                return [4 /*yield*/, dynamo.transactWrite(paramsForTransact).promise()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                responseData = {
                    Url: url
                };
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(responseData)];
            case 7:
                error_1 = _a.sent();
                response = __assign(__assign({}, paramsPutS3), paramsUpdateDynamo);
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, response)];
            case 8: return [2 /*return*/];
        }
    });
}); };
