"use strict";
/*
    Created by Simone Scionti
*/

exports.__esModule = true;
exports.UserServiceUtils = void 0;

var typescript_json_serializer_1 = require("typescript-json-serializer");

var User_1 = require("../../../../shared/Models/User");

var Resources_1 = require("../../../../shared/Utils/Resources");

var Utils_1 = require("../../../../shared/Utils/Utils");

var Validator_1 = require("../../../../shared/Utils/Validator");

var UserServiceUtils =
/** @class */
function () {
  function UserServiceUtils() {}

  UserServiceUtils.getPrimaryKey = function (email) {
    var keys = {
      PK: "#USER<" + email + ">",
      SK: "#USER_INFO<" + email + ">"
    };
    return keys;
  };

  UserServiceUtils.paramsToCreateUser = function (user) {
    var keys = this.getPrimaryKey(user.Email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(user, keys),
      ConditionExpression: "attribute_not_exists(PK) and attribute_not_exists(SK)"
    };
    return params;
  };

  UserServiceUtils.paramsToOverwriteDeletedUser = function (user) {
    var keys = this.getPrimaryKey(user.Email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(user, keys)
    };
    return params;
  };

  UserServiceUtils.paramsToDeleteUser = function (user) {
    var keys = this.getPrimaryKey(user.Email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.userAttributes),
      Key: keys,
      ReturnValues: "ALL_OLD"
    };
    return params;
  };

  UserServiceUtils.paramsToUpdateUser = function (user) {
    var keys = this.getPrimaryKey(user.Email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      Key: keys,
      UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(user),
      ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(user),
      ReturnValues: "UPDATED_NEW",
      ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
    };
    return params;
  };

  UserServiceUtils.paramsToUpdateUserPhoto = function (user) {
    var keys = this.getPrimaryKey(user.Email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      Key: keys,
      UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(user),
      ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(user),
      ReturnValues: "UPDATED_OLD",
      ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
    };
    return params;
  };

  UserServiceUtils.paramsToGetUser = function (email) {
    var keys = this.getPrimaryKey(email);
    var params = {
      TableName: Resources_1.Resources.IP_TABLE,
      ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.userAttributes),
      Key: keys
    };
    return params;
  };

  UserServiceUtils.getCognitoParams = function (email, temporaryPassword) {
    var cognitoParams = {
      UserPoolId: Resources_1.Resources.USERPOOL_ID,
      Username: email,
      TemporaryPassword: temporaryPassword,
      UserAttributes: [{
        Name: "email_verified",
        Value: "True"
      }, {
        Name: "email",
        Value: email
      }]
    };
    return cognitoParams;
  };

  UserServiceUtils.getCognitoParamsWithoutSendingTheEmail = function (email, temporaryPassword) {
    var cognitoParams = {
      UserPoolId: Resources_1.Resources.USERPOOL_ID,
      Username: email,
      TemporaryPassword: temporaryPassword,
      UserAttributes: [{
        Name: "email_verified",
        Value: "True"
      }, {
        Name: "email",
        Value: email
      }],
      MessageAction: "SUPPRESS"
    };
    return cognitoParams;
  };

  UserServiceUtils.paramsForDeleteCognitoUserParams = function (email) {
    var params = {
      UserPoolId: Resources_1.Resources.USERPOOL_ID,
      Username: email
    };
    return params;
  };

  UserServiceUtils.paramsForAssociateUserToGroupParams = function (email, groupName) {
    var params = {
      UserPoolId: Resources_1.Resources.USERPOOL_ID,
      GroupName: groupName,
      Username: email
    };
    return params;
  };

  UserServiceUtils.validateImportantAttributes = function (email, socialNumber) {
    //Validate email
    var resultValidateEmail = Validator_1.ISValidator.getUniqueInstance().isValidEmail(email);

    if (resultValidateEmail) {
      return {
        message: resultValidateEmail
      };
    } //Validate SocialNumber


    if (socialNumber) {
      if (socialNumber.length != 16) {
        return {
          message: "Thi social number is invalid! Insert a Social number with 16 character"
        };
      }

      if (!Validator_1.ISValidator.getUniqueInstance().isValidSocialNumber(socialNumber)) {
        return {
          message: "Thi social number is invalid!"
        };
      }
    }

    return null;
  };

  UserServiceUtils.paramsToDeleteSingleTransactUser = function (newUser) {
    var keys = this.getPrimaryKey(newUser.Email);
    var params = {
      Delete: {
        TableName: Resources_1.Resources.IP_TABLE,
        ProjectionExpression: Utils_1.Utils.getUniqueInstance().getAllJsonAttributesProjectionExpression(this.userAttributes),
        Key: keys,
        ReturnValues: "ALL_OLD"
      }
    };
    return params;
  };

  UserServiceUtils.paramsToUpdateSingleTransactUser = function (newUser) {
    var keys = this.getPrimaryKey(newUser.Email);
    var params = {
      Update: {
        TableName: Resources_1.Resources.IP_TABLE,
        Key: keys,
        UpdateExpression: Utils_1.Utils.getUniqueInstance().getUpdateExpression(newUser),
        ExpressionAttributeValues: Utils_1.Utils.getUniqueInstance().getExpressionAttributeValues(newUser),
        ReturnValues: "ALL_OLD"
      }
    };
    return params;
  };

  UserServiceUtils.paramsToPutSingleTransactUser = function (newUser) {
    var keys = this.getPrimaryKey(newUser.Email);
    var params = {
      Put: {
        TableName: Resources_1.Resources.IP_TABLE,
        Item: Utils_1.Utils.getUniqueInstance().getNewItemToInsert(newUser, keys)
      }
    };
    return params;
  };

  UserServiceUtils.paramsToPutTransactWrite = function (itemsToTransact) {
    var params = {
      ReturnConsumedCapacity: "TOTAL",
      ReturnItemCollectionMetrics: "SIZE",
      TransactItems: itemsToTransact
    };
    return params;
  };

  UserServiceUtils.userAttributes = typescript_json_serializer_1.deserialize({}, User_1.User);
  return UserServiceUtils;
}();

exports.UserServiceUtils = UserServiceUtils;