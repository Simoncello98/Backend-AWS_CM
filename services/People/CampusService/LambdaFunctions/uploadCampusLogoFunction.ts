/*
  Created by Simone Scionti
*/

'use strict';

import { DynamoDB, S3 } from 'aws-sdk';
import { v4 as uuidv4 } from "uuid";
import { CreateLogo } from "../../../../shared/Models/Logo/CreateLogo";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";
import { Resources } from '../../../../shared/Utils/Resources';
import { Campus } from '../../../../shared/Models/Campus';


export const uploadCampusLogo = async (event, _context) => {

  const requestBody = Utils.getUniqueInstance().validateRequestObject(event)

  //Deserialize
  var newLogo: CreateLogo = deserialize(requestBody, CreateLogo)

  if (!newLogo.enoughInfoForReadOrDelete()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, newLogo.getReadAndDeleteExpectedBody());
  }

  newLogo.autoFillUndefinedImportantAttributes();

  //Check ContentType
  let contentType = newLogo.ContentType.substring(6);
  let errorContentType = Utils.getUniqueInstance().checkContentType(contentType);
  if (errorContentType != "") {
    return Utils.getUniqueInstance().getErrorResponse(null, { Error: { contentType: contentType, message: errorContentType } });
  }

  //Build the request for S3
  let keyPathPrefix = "uploads/logo/campuses/";
  let key = keyPathPrefix + uuidv4() + "." + contentType;
  let url: string = "https://" + Resources.S3_BUCKET + ".s3.amazonaws.com/" + key;

  //Delete if it exist
  // await Utils.getUniqueInstance().emptyBucket(keyPathPrefix + newLogo.OrganizationName + "/", s3);

  let campusToUpdate = new Campus();
  campusToUpdate.removeUnplannedValues();
  campusToUpdate.CampusName = newLogo.OrganizationName;
  campusToUpdate.Logo = url;

  let buff = Buffer.from(newLogo.Data, 'base64');

  //Create a new object.
  let paramsPutS3 = CampusServiceUtils.paramsToPutS3BucketKey(key, newLogo.ContentType, buff);
  let paramsUpdateDynamo = CampusServiceUtils.paramsToUpdateCampus(campusToUpdate);

  let s3 = new S3({ signatureVersion: 'v4' });
  let dynamo = new DynamoDB.DocumentClient();

  try {
    await s3.putObject(paramsPutS3).promise();
    await dynamo.update(paramsUpdateDynamo).promise();
    let responseData = {
      Url: url
    };
    return Utils.getUniqueInstance().getDataResponse(responseData);
  } catch (error) {
    let response = {
      ...paramsPutS3,
      ...paramsUpdateDynamo
    }
    return Utils.getUniqueInstance().getErrorResponse(error, response);
  }
}