/*
  Created by Simone Scionti
*/
'use strict';

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.uploadUserPhoto = void 0;

var Resources_1 = require("../../../../shared/Utils/Resources");

var aws_sdk_1 = require("aws-sdk");

var uuid_1 = require("uuid");

var Utils_1 = require("../../../../shared/Utils/Utils");

var UserServiceUtils_1 = require("../Utils/UserServiceUtils");

var User_1 = require("../../../../shared/Models/User");

var CreatePhoto_1 = require("../../../../shared/Models/Logo/CreatePhoto");

var typescript_json_serializer_1 = require("typescript-json-serializer");

var MealReservationServiceUtils_1 = require("../../../Meal/MealReservationService/Utils/MealReservationServiceUtils");

var MealReservation_1 = require("../../../../shared/Models/Meal/MealReservation");

exports.uploadUserPhoto = function (event, _context) {
  return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, createPhoto, contentType, errorContentType, bucket, keyPathPrefix, key, s3, url, lengthURL, userToUpdate, buff, paramsPutS3, currentDateTime, paramsUpdateUserPhoto, paramsQueryMealReservation, dynamo, dataUserPhoto, oldUser, paramsDeleteObjectS3, dataMealReservation, mealReservationToUpdate, paramsUpdateMealReservation, error_1, response, error_2, response;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          requestBody = Utils_1.Utils.getUniqueInstance().validateRequestObject(event);
          createPhoto = typescript_json_serializer_1.deserialize(requestBody, CreatePhoto_1.CreatePhoto);

          if (!createPhoto.enoughInfoForReadOrDelete()) {
            return [2
            /*return*/
            , Utils_1.Utils.getUniqueInstance().getValidationErrorResponse(requestBody, createPhoto.getReadAndDeleteExpectedBody())];
          }

          contentType = createPhoto.ContentType.substring(6);
          errorContentType = Utils_1.Utils.getUniqueInstance().checkContentType(contentType);

          if (errorContentType != "") {
            return [2
            /*return*/
            , Utils_1.Utils.getUniqueInstance().getErrorResponse(null, {
              Error: {
                contentType: contentType,
                message: errorContentType
              }
            })];
          }

          bucket = Resources_1.Resources.S3_BUCKET;
          keyPathPrefix = "uploads/logo/users/";
          key = keyPathPrefix + uuid_1.v4() + "." + contentType;
          s3 = new aws_sdk_1.S3({
            signatureVersion: 'v4'
          });
          url = "https://" + bucket + ".s3.amazonaws.com/" + key;
          lengthURL = ("https://" + bucket + ".s3.amazonaws.com/").length;
          userToUpdate = new User_1.User();
          userToUpdate.removeUnplannedValues();
          userToUpdate.Email = createPhoto.Email;
          userToUpdate.UserPhoto = url;
          buff = Buffer.from(createPhoto.Data, 'base64');
          paramsPutS3 = {
            Bucket: bucket,
            Key: key,
            Body: buff,
            ContentType: createPhoto.ContentType
          };
          currentDateTime = Utils_1.Utils.getUniqueInstance().getCurrentDateTime();
          paramsUpdateUserPhoto = UserServiceUtils_1.UserServiceUtils.paramsToUpdateUserPhoto(userToUpdate);
          paramsQueryMealReservation = MealReservationServiceUtils_1.MealReservationServiceUtils.paramsForQueryReservationsByEmailAndDate(createPhoto.Email, currentDateTime);
          dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
          _a.label = 1;

        case 1:
          _a.trys.push([1, 11,, 12]);

          return [4
          /*yield*/
          , s3.putObject(paramsPutS3).promise()];

        case 2:
          _a.sent();

          return [4
          /*yield*/
          , dynamo.update(paramsUpdateUserPhoto).promise()];

        case 3:
          dataUserPhoto = _a.sent();
          if (!(dataUserPhoto && dataUserPhoto.Attributes)) return [3
          /*break*/
          , 5];
          oldUser = typescript_json_serializer_1.deserialize(dataUserPhoto.Attributes, User_1.User);
          if (!(oldUser && oldUser.UserPhoto)) return [3
          /*break*/
          , 5];
          paramsDeleteObjectS3 = {
            Bucket: bucket,
            Key: oldUser.UserPhoto.substring(lengthURL)
          };
          return [4
          /*yield*/
          , s3.deleteObject(paramsDeleteObjectS3).promise()];

        case 4:
          _a.sent();

          _a.label = 5;

        case 5:
          return [4
          /*yield*/
          , dynamo.query(paramsQueryMealReservation).promise()];

        case 6:
          dataMealReservation = _a.sent();
          if (!(dataMealReservation && dataMealReservation.Items && dataMealReservation.Items.length > 0)) return [3
          /*break*/
          , 10];
          mealReservationToUpdate = typescript_json_serializer_1.deserialize(dataMealReservation.Items[0], MealReservation_1.MealReservation);
          mealReservationToUpdate.UserPhoto = url;
          paramsUpdateMealReservation = MealReservationServiceUtils_1.MealReservationServiceUtils.paramsToUpdateMealReservation(mealReservationToUpdate);
          _a.label = 7;

        case 7:
          _a.trys.push([7, 9,, 10]);

          return [4
          /*yield*/
          , dynamo.update(paramsUpdateMealReservation).promise()];

        case 8:
          _a.sent();

          return [3
          /*break*/
          , 10];

        case 9:
          error_1 = _a.sent();
          return [2
          /*return*/
          , Utils_1.Utils.getUniqueInstance().getErrorResponse(error_1, "Error during reservations update")];

        case 10:
          response = {
            Url: url
          };
          return [2
          /*return*/
          , Utils_1.Utils.getUniqueInstance().getDataResponse(response)];

        case 11:
          error_2 = _a.sent();
          response = __assign(__assign({}, paramsPutS3), paramsUpdateUserPhoto);
          return [2
          /*return*/
          , Utils_1.Utils.getUniqueInstance().getErrorResponse(error_2, response)];

        case 12:
          return [2
          /*return*/
          ];
      }
    });
  });
};