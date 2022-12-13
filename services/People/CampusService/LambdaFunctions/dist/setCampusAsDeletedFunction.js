/*
  Created by Simone Scionti

  provides a service for flag The Campus_info record as deleted.
  Use a transaction to flag also all CampusXCompany and CampusXCompanyXUser info records as deleted.

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
exports.setCampusAsDeleted = void 0;
var Utils_1 = require("../../../../shared/Utils/Utils");
var Campus_1 = require("../../../../shared/Models/Campus");
var typescript_json_serializer_1 = require("typescript-json-serializer");
var CampusConsistentUpdateManager_1 = require("../shared/CampusConsistentUpdateManager");
var EntityStatus_1 = require("../../../../shared/Utils/Statics/EntityStatus");
exports.setCampusAsDeleted = function (event, _context) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, requestedCampus, rels, updateSchema, updateObjects, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
                requestedCampus = typescript_json_serializer_1.deserialize(requestBody, Campus_1.Campus);
                if (!requestedCampus.isPKDefined()) {
                    return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampus.getReadAndDeleteExpectedBody())];
                }
                //UPDATE
                requestedCampus.CampusStatus = EntityStatus_1.EntityStatus.DELETED;
                return [4 /*yield*/, CampusConsistentUpdateManager_1.CampusConsistentUpdateManager.getUniqueInstance().getRels(requestedCampus)];
            case 1:
                rels = _a.sent();
                updateSchema = {
                    CampusStatus: "RelationshipStatus"
                };
                updateObjects = CampusConsistentUpdateManager_1.CampusConsistentUpdateManager.getUniqueInstance().getUpdateObjects(rels, requestedCampus, updateSchema);
                return [4 /*yield*/, CampusConsistentUpdateManager_1.CampusConsistentUpdateManager.getUniqueInstance().transactUpdateRels(updateObjects)];
            case 2:
                data = _a.sent();
                return [2 /*return*/, Utils_1.Utils.getUniqueInstance().getDataResponse(data)];
        }
    });
}); };
