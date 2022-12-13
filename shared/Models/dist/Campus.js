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
exports.Campus = void 0;
/*
  Created by Simone Scionti

  Campus model class
*/
var typescript_json_serializer_1 = require("typescript-json-serializer");
var CampusConfiguration_1 = require("./NestedObjectsModels/CampusConfiguration");
var Model_1 = require("./AbstractClasses/Model");
var EntityStatus_1 = require("../Utils/Statics/EntityStatus");
var Campus = /** @class */ (function (_super) {
    __extends(Campus, _super);
    function Campus() {
        var _this = _super.call(this) || this;
        _this.updateOptionalAtLeastOneAttributes = ["ISCampusConfiguration", "WebsiteURL", "Address", "Theme", "Logo", "CampusStatus"];
        _this.readAndDeleteNecessaryAttributes = ["CampusName"];
        _this.updateNecessaryAttributes = ["CampusName"];
        _this.createNecessaryAttributes = ["CampusName"]; //ISCampusConfiguration is not a necessary Attribute because we can create a Campus without any config, and add the config trough update later.
        _this.readAndDeleteExpectedBody = {
            CampusName: "#String"
        };
        _this.updateExpectedBody = {
            CampusName: "#String",
            ISCampusConfiguration: "#ISCampusConfiguration - [Optional childs]",
            Address: "#String - (optional)",
            WebsiteURL: "#String - (optional)",
            Theme: "#String - (optional) - (autofill: Blue)",
            Logo: "#String - (optional)",
            CampusStatus: "#String - (optional)(PossibleValues[ Active - Deleted ]) - (autofill: Active)"
        };
        _this.createExpectedBody = {
            CampusName: "#String",
            ISCampusConfiguration: "#ISCampusConfiguration - (optional) (only true values)",
            Address: "#String - (optional)",
            WebsiteURL: "#String - (optional)",
            Theme: "#String - (optional) - (autofill: Blue)",
            Logo: "#String - (optional)"
        };
        return _this;
    }
    Campus.prototype.autoFillUndefinedImportantAttributes = function () {
        if (!this.Logo)
            this.Logo = "";
        if (this.ISCampusConfiguration === undefined || this.ISCampusConfiguration === null) {
            this.ISCampusConfiguration = new CampusConfiguration_1.CampusConfiguration();
            this.ISCampusConfiguration.autoFillWithUndefinedImportantAttributes();
        }
        if (!this.Theme)
            this.Theme = "Blue";
        this.CampusStatus = EntityStatus_1.EntityStatus.ACTIVE;
    };
    Campus.prototype.removeUnplannedValues = function () {
        this.CampusName = undefined;
        this.ISCampusConfiguration = undefined;
        this.Address = undefined;
        this.WebsiteURL = undefined;
        this.Theme = undefined;
        this.Logo = undefined;
        this.CampusStatus = undefined;
    };
    Campus.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "CampusName");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "ISCampusConfiguration");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "Address");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "WebsiteURL");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "Theme");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "Logo");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "CampusStatus");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Campus.prototype, "PlantsId");
    Campus = __decorate([
        typescript_json_serializer_1.Serializable()
    ], Campus);
    return Campus;
}(Model_1.Model));
exports.Campus = Campus;
