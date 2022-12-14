/*
  Created by Simone Scionti 

  update the user and all the relationships record using a transaction.
*/

'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { deserialize } from "typescript-json-serializer";
import { User } from "../../../../shared/Models/User";
import { UserConsistentUpdateManager } from "../shared/UserConsistentUpdateManagerClass";
import { DynamoDB, CognitoIdentityServiceProvider } from "aws-sdk";
import { CampusXCompanyXUser } from "../../../../shared/Models/RelationshipsRecordModels/CampusXCompanyXUser";
import { CampusXCompanyXUserServiceUtils } from "../../CampusXCompanyXUserService/Utils/CampusXCompanyXUserServiceUtils";
import { ISRestResultCodes } from "../../../../shared/Utils/Enums/RestResultCodes";


export const updateMyCompUsersAndRels: APIGatewayProxyHandler = async (event, _context) => {

    const requestBody = Utils.getUniqueInstance().validateRequestObject(event);

    //Deserialize Relationship
    let requestedCampusXCompanyXUser: CampusXCompanyXUser = deserialize(requestBody, CampusXCompanyXUser);
    if (!requestedCampusXCompanyXUser.isPKDefined()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampusXCompanyXUser.getUpdateExpectedBody());
    }

    //Deserialize User 
    let requestedUser: User = deserialize(requestBody, User);
    if (!requestedUser.isPKDefined()) {
        return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedUser.getUpdateExpectedBody());
    }

    if (!requestedUser.enoughInfoForUpdate()) {
        return Utils.getUniqueInstance().getNothingToDoErrorResponse(requestBody, requestedUser.getUpdateExpectedBody());
    }

    //Get CompanyAdmin's Email
    let cognito = new CognitoIdentityServiceProvider();
    let emailCompanyAdminFromSignature = await Utils.getUniqueInstance().getEmailFromSignature(event.requestContext.identity.cognitoAuthenticationProvider, cognito);

    //List of Companies associated to CompanyAdmin's Email
    let dynamo = new DynamoDB.DocumentClient();
    let companiesAdminItems = await Utils.getUniqueInstance().getMyListOfCompanies(emailCompanyAdminFromSignature, requestedCampusXCompanyXUser.CampusName, dynamo);

    //Check if CompanyName (admin) == CompanyName (user)
    var flag: boolean = false;
    var companyMatch: string = "";
    for (var i = 0; i < companiesAdminItems.length; i++) {
        if (companiesAdminItems[i].CompanyName === requestedCampusXCompanyXUser.CompanyName) {
            flag = true;
            companyMatch = companiesAdminItems[i].CompanyName;
            i = companiesAdminItems.length;
        }
    }

    if (!flag) {
        return Utils.getUniqueInstance().getErrorResponse(null, { message: "You don't have permission to edit other users." });
    }


    //GET - Check if the user belongs to the company
    let params = CampusXCompanyXUserServiceUtils.paramsToGetEmailFromCampusXCompanyXUser(requestedCampusXCompanyXUser.CampusName, companyMatch, requestedCampusXCompanyXUser.Email);

    try {
        const data = await dynamo.get(params).promise();
        flag = data.Item ? true : false;
    } catch (error) {
        return Utils.getUniqueInstance().getErrorResponse(error, params);
    }

    if (!flag) {
        return Utils.getUniqueInstance().getErrorResponse(null, { message: "You don't have permission to edit other users." });
    }

    if (requestedUser.TelephoneNumber) {
        if (!requestedUser.TelephoneNumber.match(/^\+?(\d\s?)*\d$/g)) {
          return Utils.getUniqueInstance().getErrorResponse(null, { Error: { message: "Invalid Thelephone number!" } }, ISRestResultCodes.BadRequest)
        }
      }

    //Critical attributes
    delete requestedUser.FName;
    delete requestedUser.LName;
    delete requestedUser.IsVisitor;
    delete requestedUser.UserStatus;
    delete requestedUser.CardID;
    delete requestedUser.LicenseNumber;
    delete requestedUser.SocialNumber;
    delete requestedUser.PlaceOfResidence;
    delete requestedUser.PlaceOfBirth;
    delete requestedUser.DateOfBirth;
    delete requestedUser.SignedRegulations;
    delete requestedUser.UserPhoto;
    delete requestedUser.DCCExpirationDate;


    //UPDATE
    let rels = await UserConsistentUpdateManager.getUniqueInstance().getRels(requestedUser);
    //no schema defined because both models has same Update properties names(except Relationship status but it does not matter).
    //NB. IF YOU WANT TO CHANGE THE USERSTATUS IN A CONSISTENCE WAY, YOU NEED TO SPECIFY THE UPDATESCHEMA PARAMETER.
    let updateObjects = UserConsistentUpdateManager.getUniqueInstance().getUpdateObjects(rels, requestedUser, false);
    let data = await UserConsistentUpdateManager.getUniqueInstance().transactUpdateRels(updateObjects);
    return Utils.getUniqueInstance().getDataResponse(data);
};

