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
exports.CampusXCompanyXStartDate = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var UnmutableModel_1 = require("../AbstractClasses/UnmutableModel");
var CampusXCompanyXStartDate = /** @class */ (function (_super) {
    __extends(CampusXCompanyXStartDate, _super);
    function CampusXCompanyXStartDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readAndDeleteNecessaryAttributes = ["CampusName", "CompanyName", "StartDate"];
        _this.readAndDeleteExpectedBody = {
            CampusName: "#String",
            CompanyName: "#String",
            StartDate: "#String"
        };
        return _this;
    }
    CampusXCompanyXStartDate.prototype.autoFillUndefinedImportantAttributes = function () {
    };
    CampusXCompanyXStartDate.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], CampusXCompanyXStartDate.prototype, "CampusName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], CampusXCompanyXStartDate.prototype, "CompanyName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], CampusXCompanyXStartDate.prototype, "StartDate");
    CampusXCompanyXStartDate = __decorate([
        typescript_json_serializer_1.Serializable()
    ], CampusXCompanyXStartDate);
    return CampusXCompanyXStartDate;
}(UnmutableModel_1.UnmutableModel));
exports.CampusXCompanyXStartDate = CampusXCompanyXStartDate;
