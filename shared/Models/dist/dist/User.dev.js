"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.User = void 0;

var typescript_json_serializer_1 = require("typescript-json-serializer");

var EntityStatus_1 = require("../Utils/Statics/EntityStatus");

var Model_1 = require("./AbstractClasses/Model");

var User =
/** @class */
function (_super) {
  __extends(User, _super);

  function User() {
    var _this = _super.call(this) || this;

    _this.IsVisitor = false; //optional - (default: false)
    //@JsonProperty() public AdminInCampuses : string[]; // The other solution is to set an attr in the campus info, with the ID of the Admins, but we need to handle the deletion of user in that case.

    _this.updateOptionalAtLeastOneAttributes = ["FName", "LName", "CardID", "LicenseNumber", "SocialNumber", "PlaceOfResidence", "PlaceOfBirth", "DateOfBirth", "UserStatus", "UserPhoto", "TelephoneNumber", "IsVisitor", "SignedRegulations", "CognitoGroupName", "DCCExpirationDate"];
    _this.readAndDeleteNecessaryAttributes = ["Email"];
    _this.updateNecessaryAttributes = ["Email"];
    _this.createNecessaryAttributes = [
    /*"Email",*/
    "FName", "LName", "CognitoClientID", "PlaceOfBirth", "DateOfBirth"];
    _this.readAndDeleteExpectedBody = {
      Email: "#String - (required)"
    }; //TODO: If i allow to update FName and LName i need to update them also in all the relationships records of the user.

    _this.updateExpectedBody = {
      Email: "#String - (required)",
      FName: "#String - (optional)",
      LName: "#String - (optional)",
      CognitoClientID: "#String - (optional)",
      CognitoGroupName: "#String - (optional)",
      CardID: "#String - (optional)",
      DateOfBirth: "#String - (optional)",
      SocialNumber: "#String - (optional)",
      LicenseNumber: "#String - (optional)",
      PlaceOfResidence: "#String - (optional)",
      PlaceOfBirth: "#String - (optional)",
      UserPhoto: "#String - (optional)",
      UserStatus: "#String - (optional)(PossibleValues[ Active - Deleted ]) - (autofill: Active)",
      TelephoneNumber: "#String - (optional)",
      IsVisitor: "#Boolean - (optional) - (autofill: false)",
      SignedRegulations: "#String[] - (optional)",
      DCCExpirationDate: "#String - (optional)"
    };
    _this.createExpectedBody = {
      Email: "#String - (required)",
      FName: "#String - (required)",
      LName: "#String - (required)",
      CognitoClientID: "#String - (required)",
      PlaceOfBirth: "#String - (required)",
      DateOfBirth: "#String - (required)",
      CognitoGroupName: "#String - (optional)",
      CardID: "#String - (optional)",
      SocialNumber: "#String - (optional)",
      LicenseNumber: "#String - (optional)",
      PlaceOfResidence: "#String - (optional)",
      TelephoneNumber: "#String - (optional)",
      SignedRegulations: "#String[] - (optional)",
      DCCExpirationDate: "#String - (optional)" //UserStatus : "#String - (optional)(PossibleValues[ Active - Deleted ]) - (autofill: Active)"

    };
    return _this;
  }

  User.prototype.toJson = function (removeUndefined) {
    return typescript_json_serializer_1.serialize(this, removeUndefined);
  };

  User.prototype.removeCognitoParams = function () {
    this.CognitoClientID = undefined;
    this.TemporaryPassword = undefined;
  };

  User.prototype.autoFillUndefinedImportantAttributes = function () {
    if (!this.UserPhoto) this.UserPhoto = "";
    if (this.IsVisitor === undefined || this.IsVisitor === null) this.IsVisitor = false;
    if (!this.SocialNumber) this.SocialNumber = "";
    if (!this.TelephoneNumber) this.TelephoneNumber = "";
    if (!this.PlaceOfBirth) this.PlaceOfBirth = "";
    if (!this.DateOfBirth) this.DateOfBirth = "";
    if (!this.CardID) this.CardID = "";
    if (!this.DCCExpirationDate) this.DCCExpirationDate = "";
    this.UserStatus = EntityStatus_1.EntityStatus.ACTIVE;
    this.TemporaryPassword = this.generateTemporaryPassword();
    if (!this.CreationTimestamp) this.CreationTimestamp = new Date().toISOString();
  };

  User.prototype.generateTemporaryPassword = function () {
    return "CMPSW123"; //TODO: generate a random password with a Maiusc char and a number ( minimum 8 chars).
    //TODO: use this function just when the "from email" is correctly set in the aws console.

    var Mchars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var mchars = "abcdefghiklmnopqrstuvwxyz";
    var string_length = 10;
    var randomstring = '';
    var charCount = 0;
    var numCount = 0;

    for (var i = 0; i < string_length - 1; i++) {
      // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
      if (Math.floor(Math.random() * 2) == 0 && numCount < 3 || charCount >= 5) {
        var rnum_1 = Math.floor(Math.random() * 10);
        randomstring += rnum_1;
        numCount += 1;
      } else {
        // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
        var rnum_2 = Math.floor(Math.random() * Mchars.length);
        randomstring += Mchars.substring(rnum_2, rnum_2 + 1);
        charCount += 1;
      }
    }

    var rnum = Math.floor(Math.random() * mchars.length);
    randomstring += mchars.substring(rnum, rnum + 1); //return "CMPSW123";

    return randomstring;
  };

  User.prototype.autoFillUndefinedImportantAttributesForVisitors = function () {
    this.autoFillUndefinedImportantAttributes();
    this.IsVisitor = true;
  };

  User.prototype.removeUnplannedValues = function () {
    delete this.Email;
    delete this.FName;
    delete this.LName;
    delete this.CardID;
    delete this.LicenseNumber;
    delete this.SocialNumber;
    delete this.PlaceOfResidence;
    delete this.PlaceOfBirth;
    delete this.DateOfBirth;
    delete this.UserStatus;
    delete this.UserPhoto;
    delete this.TelephoneNumber;
    delete this.IsVisitor;
    delete this.CognitoClientID;
    delete this.TemporaryPassword;
    delete this.CognitoGroupName;
    delete this.SignedRegulations;
    delete this.DCCExpirationDate;
    delete this.CreationTimestamp;
  };

  User.prototype.autoFillEmailWithStandardDomain = function () {
    if (this.FName && this.LName) {
      var fname = this.FName.toLowerCase().substring(0, 15);
      var lname = this.LName.toLowerCase().substring(0, 15);
      fname = fname.replace(/è|é|ê|ë/g, "e").replace(/ò|ô|õ|ö/g, "o").replace(/à|â|ã|ä|å/g, "a").replace(/ò|ô|õ|ö/g, "o").replace(/ì|î|ï/g, "i").replace(/ù|û|ü/g, "u").replace(/'|\s/g, "");
      lname = lname.replace(/è|é|ê|ë/g, "e").replace(/ò|ô|õ|ö/g, "o").replace(/à|â|ã|ä|å/g, "a").replace(/ò|ô|õ|ö/g, "o").replace(/ì|î|ï/g, "i").replace(/ù|û|ü/g, "u").replace(/'|\s/g, "");
      var max = 99;
      var min = 10;
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      this.Email = fname + "." + lname + "." + number + "@cm.com";
      return false; // ok
    }

    return true; // error
  };

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "Email");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "FName");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "LName");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "CardID");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "LicenseNumber");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "SocialNumber");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "PlaceOfResidence");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "PlaceOfBirth");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "DateOfBirth");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "UserStatus");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "UserPhoto");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "TelephoneNumber");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "IsVisitor");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "SignedRegulations");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "DCCExpirationDate");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "CognitoClientID");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "TemporaryPassword");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "CognitoGroupName");

  __decorate([typescript_json_serializer_1.JsonProperty()], User.prototype, "CreationTimestamp");

  User = __decorate([typescript_json_serializer_1.Serializable()], User);
  return User;
}(Model_1.Model);

exports.User = User;