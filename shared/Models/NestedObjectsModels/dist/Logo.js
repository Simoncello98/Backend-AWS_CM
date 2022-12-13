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
exports.Logo = void 0;
/*
    Created by Simone Scionti
    Describes the logo map in the DB.

*/
var typescript_json_serializer_1 = require("typescript-json-serializer");
var ModelNestedObject_1 = require("../AbstractClasses/ModelNestedObject");
var Logo = /** @class */ (function (_super) {
    __extends(Logo, _super);
    function Logo() {
        var _this = _super.call(this) || this;
        _this.Horizontal = "";
        _this.Vertical = "";
        //if it's empty, the user hasn't to fill the Logo attributes during the campus creation.
        _this.createNecessaryAttributes = [];
        _this.updateOptionalAtLeastOneAttributes = ["Horizontal", "Vertical"];
        return _this;
    }
    Logo.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Logo.prototype, "Horizontal");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], Logo.prototype, "Vertical");
    Logo = __decorate([
        typescript_json_serializer_1.Serializable()
    ], Logo);
    return Logo;
}(ModelNestedObject_1.ModelNestedObject));
exports.Logo = Logo;
