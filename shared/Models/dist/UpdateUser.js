"use strict";
/*
  Created by Giuseppe Criscione

    User model class.

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
exports.UpdateUser = void 0;
var typescript_json_serializer_1 = require("typescript-json-serializer");
var UnmutableModel_1 = require("./AbstractClasses/UnmutableModel");
var UpdateUser = /** @class */ (function (_super) {
    __extends(UpdateUser, _super);
    function UpdateUser() {
        var _this = _super.call(this) || this;
        _this.readAndDeleteNecessaryAttributes = ["OldUserEmail", "NewUserEmail", "SendEmail"];
        _this.createNecessaryAttributes = ["OldUserEmail", "NewUserEmail", "SendEmail"];
        _this.readAndDeleteExpectedBody = {
            OldUserEmail: "#String - (required)",
            NewUserEmail: "#String - (required)",
            SendEmail: "#'T' | 'F' - (required)"
        };
        _this.createExpectedBody = {
            OldUserEmail: "#String - (required)",
            NewUserEmail: "#String - (required)",
            SendEmail: "#'T' | 'F' - (required)"
        };
        return _this;
    }
    UpdateUser.prototype.toJson = function (removeUndefined) {
        return typescript_json_serializer_1.serialize(this, removeUndefined);
    };
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], UpdateUser.prototype, "OldUserEmail");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], UpdateUser.prototype, "NewUserEmail");
    __decorate([
        typescript_json_serializer_1.JsonProperty()
    ], UpdateUser.prototype, "SendEmail");
    UpdateUser = __decorate([
        typescript_json_serializer_1.Serializable()
    ], UpdateUser);
    return UpdateUser;
}(UnmutableModel_1.UnmutableModel));
exports.UpdateUser = UpdateUser;
