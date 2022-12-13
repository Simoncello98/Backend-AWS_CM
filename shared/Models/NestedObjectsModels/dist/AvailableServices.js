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
exports.AvailableServices = void 0;
/*
  Created by Simone Scionti
    Describe the AvailableService nested object model for the service of a company in a campus.

*/
var typescript_json_serializer_1 = require("typescript-json-serializer");
var ModelNestedObject_1 = require("../AbstractClasses/ModelNestedObject");
var AvailableServices = /** @class */ (function (_super) {
    __extends(AvailableServices, _super);
    function AvailableServices() {
        var _this = _super.call(this) || this;
        //if it's empty, the user hasn't to fill the AvailableServices during the campus creation.
        _this.createNecessaryAttributes = [];
        _this.updateOptionalAtLeastOneAttributes = ["MealAvailable", "IsGymAvailable", "IsRoomsBookingAvailable"];
        return _this;
    }
    AvailableServices.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    AvailableServices.prototype.autoFillWithUndefinedImportantAttributes = function () {
        if (this.MealAvailable == undefined || this.MealAvailable == null)
            this.MealAvailable = false;
        if (this.IsGymAvailable == undefined || this.IsGymAvailable == null)
            this.IsGymAvailable = false;
        if (this.IsRoomsBookingAvailable == undefined || this.IsRoomsBookingAvailable == null)
            this.IsRoomsBookingAvailable = false;
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], AvailableServices.prototype, "MealAvailable");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], AvailableServices.prototype, "IsGymAvailable");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], AvailableServices.prototype, "IsRoomsBookingAvailable");
    AvailableServices = __decorate([
        typescript_json_serializer_1.Serializable()
    ], AvailableServices);
    return AvailableServices;
}(ModelNestedObject_1.ModelNestedObject));
exports.AvailableServices = AvailableServices;
