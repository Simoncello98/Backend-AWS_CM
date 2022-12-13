"use strict";
/*
    Created by Simone Scionti

*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VisitorRequest = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var Utils_1 = require("../Utils/Utils");
var Model_1 = require("./AbstractClasses/Model");
var VisitorRequestStatus_1 = require("../Utils/Enums/VisitorRequestStatus");
var VisitorRequest = /** @class */ (function (_super) {
    __extends(VisitorRequest, _super);
    function VisitorRequest() {
        var _this = _super.call(this) || this;
        _this.readAndDeleteNecessaryAttributes = ["CampusName", "VisitorEmail", "VisitorRequestID"];
        _this.updateOptionalAtLeastOneAttributes = ["VisitorTelephoneNumber", "UserHostEmail", "UserHostTelephoneNumber", "UserHostCompanyName", "EstimatedDateOfArrival", "EstimatedReleaseDate", "VisitorRequestStatus", "GSI2SK", "VisitorFName", "VisitorLName"];
        _this.updateNecessaryAttributes = ["CampusName", "VisitorEmail", "VisitorRequestID"];
        _this.createNecessaryAttributes = ["CampusName", "VisitorEmail", "UserHostEmail", "UserHostCompanyName", "UserHostTelephoneNumber", "EstimatedDateOfArrival", "EstimatedReleaseDate"];
        _this.readAndDeleteExpectedBody = {
            CampusName: "#String",
            VisitorEmail: "#String",
            VisitorRequestID: "#String"
        };
        _this.updateExpectedBody = {
            CampusName: "#String - (required)",
            VisitorEmail: "#String - (required)",
            VisitorRequestID: "#String - (required)",
            VisitorTelephoneNumber: "#String - (optional)",
            EstimatedDateOfArrival: "#String - (optional)",
            EstimatedReleaseDate: "#String - (optional)",
            UserHostEmail: "#String - (optional)",
            UserHostTelephoneNumber: "#String - (optional)",
            UserHostCompanyName: "#String - (optional)",
            VisitorRequestStatus: "#String - (optional)(PossibleValues[ALL, PENDING, ACEPTED, DENIED]) - (autofill: PENDING)"
        };
        _this.createExpectedBody = {
            CampusName: "#String - (required)",
            VisitorEmail: "#String - (required)",
            UserHostEmail: "#String - (required)",
            UserHostCompanyName: "#String - (required)",
            UserHostTelephoneNumber: "#String - (required)",
            EstimatedDateOfArrival: "#String - (required)",
            EstimatedReleaseDate: "#String - (required)",
            VisitorTelephoneNumber: "#String - (optional)",
            VisitorRequestStatus: "#String - (optional)(PossibleValues[ALL, PENDING, ACEPTED, DENIED]) - (autofill: PENDING)"
        };
        return _this;
    }
    VisitorRequest.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    VisitorRequest.prototype.autoFillUndefinedImportantAttributes = function () {
        this.RequestTimestamp = Utils_1.Utils.getUniqueInstance().getCurrentDateTime();
        /*if (!this.EstimatedReleaseDate || !Utils.getUniqueInstance().isValidDate(this.EstimatedReleaseDate)) {
            this.EstimatedReleaseDate = Utils.getUniqueInstance().getCurrentDateTime().substr(0, 10) + "T23:59:59.999"
        }*/
        if (!this.VisitorRequestStatus)
            this.VisitorRequestStatus = VisitorRequestStatus_1.VisitorRequestStatus.PENDING;
        if (!this.VisitorFName)
            this.VisitorFName = "";
        if (!this.VisitorLName)
            this.VisitorLName = "";
    };
    VisitorRequest.prototype.createGSIAttributes = function () {
        this.GSI2PK = "#VISITOR#CAMPUS<" + this.CampusName + ">";
        this.GSI2SK = "#" + this.VisitorRequestStatus + "#VISITOR<" + this.VisitorEmail + ">";
    };
    VisitorRequest.prototype.expireVisitorRequest = function () {
        this.EstimatedReleaseDate = Utils_1.Utils.getUniqueInstance().getCurrentDateTime();
        this.VisitorRequestStatus = VisitorRequestStatus_1.VisitorRequestStatus.EXPIRED;
        this.GSI2SK = "#" + VisitorRequestStatus_1.VisitorRequestStatus.EXPIRED + "#VISITOR<" + this.VisitorEmail + ">";
    };
    VisitorRequest.prototype.changeVisitorStatus = function (status) {
        this.VisitorRequestStatus = status;
        this.GSI2SK = "#" + status + "#VISITOR<" + this.VisitorEmail + ">";
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "CampusName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorEmail");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorRequestID");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "UserHostEmail");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "UserHostTelephoneNumber");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "UserHostCompanyName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorTelephoneNumber");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "EstimatedDateOfArrival");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "EstimatedReleaseDate");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "RequestTimestamp");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorRequestStatus");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorFName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "VisitorLName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "UserHostFName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "UserHostLName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "GSI2PK");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], VisitorRequest.prototype, "GSI2SK");
    VisitorRequest = __decorate([
        typescript_json_serializer_1.Serializable()
    ], VisitorRequest);
    return VisitorRequest;
}(Model_1.Model));
exports.VisitorRequest = VisitorRequest;
