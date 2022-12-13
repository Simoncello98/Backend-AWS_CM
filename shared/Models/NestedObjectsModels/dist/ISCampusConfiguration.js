"use strict";
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
exports.ISCampusConfiguration = void 0;
/*
  Created by Simone Scionti
  Descrtibe the configuration of a Company in a Campus.
*/
var typescript_json_serializer_1 = require("typescript-json-serializer");
var ModelNestedObject_1 = require("../AbstractClasses/ModelNestedObject");
var ISCampusConfiguration = /** @class */ (function (_super) {
    __extends(ISCampusConfiguration, _super);
    function ISCampusConfiguration() {
        var _this = _super.call(this) || this;
        //if it's empty, the user hasn't to fill the IPConfiguration during the campus creation.
        _this.createNecessaryAttributes = [];
        //uncomment next line if you want to force the user to fill all data to create a campus. 
        //createNecessaryAttributes = ["MealActive" , "IsBookingActive" , "IsBuildingAutomationActive"]; 
        _this.updateOptionalAtLeastOneAttributes = ["MealActive", "IsBookingActive", "IsBuildingAutomationActive"];
        return _this;
    }
    ISCampusConfiguration.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    ISCampusConfiguration.prototype.autoFillWithUndefinedImportantAttributes = function () {
        if (this.MealActive == undefined || this.MealActive == null)
            this.MealActive = false;
        if (this.IsBookingActive == undefined || this.IsBookingActive == null)
            this.IsBookingActive = false;
        if (this.IsBuildingAutomationActive == undefined || this.IsBuildingAutomationActive == null)
            this.IsBuildingAutomationActive = false;
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], ISCampusConfiguration.prototype, "MealActive");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], ISCampusConfiguration.prototype, "IsBookingActive");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], ISCampusConfiguration.prototype, "IsBuildingAutomationActive");
    ISCampusConfiguration = __decorate([
        typescript_json_serializer_1.Serializable()
    ], ISCampusConfiguration);
    return ISCampusConfiguration;
}(ModelNestedObject_1.ModelNestedObject));
exports.ISCampusConfiguration = ISCampusConfiguration;
