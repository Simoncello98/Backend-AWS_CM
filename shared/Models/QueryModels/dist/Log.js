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
exports.Log = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var StartDateEnum_1 = require("../../Utils/Enums/StartDateEnum");
var Utils_1 = require("../../Utils/Utils");
var UnmutableModel_1 = require("../AbstractClasses/UnmutableModel");
var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readAndDeleteNecessaryAttributes = ["StartDate"];
        _this.readAndDeleteExpectedBody = {
            StartDate: "#String",
            LimitRecords: "#String (optional)"
        };
        _this.createExpectedBody = {};
        return _this;
    }
    Log.prototype.autoFillUndefinedImportantAttributes = function (startDate) {
        if (startDate === void 0) { startDate = StartDateEnum_1.StartDateEnum.ThisMonth; }
        if (!this.StartDate || !Utils_1.Utils.getUniqueInstance().isValidDate(this.StartDate)) {
            this.StartDate = Utils_1.Utils.getUniqueInstance().getCurrentDateTime().substr(0, startDate);
        }
        /* if(!this.LimitRecords || this.LimitRecords === null || this.LimitRecords <= 0) {
             this.LimitRecords = 25
         }*/
    };
    Log.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Log.prototype, "StartDate");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Log.prototype, "LimitRecords");
    Log = __decorate([
        typescript_json_serializer_1.Serializable()
    ], Log);
    return Log;
}(UnmutableModel_1.UnmutableModel));
exports.Log = Log;
