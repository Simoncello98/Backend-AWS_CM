/*
  Created by Simone Scionti

  provides a service for flag The Campus_info record as deleted.
  Use a transaction to flag also all CampusXCompany and CampusXCompanyXUser info records as deleted.

*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { Campus } from "../../../../shared/Models/Campus";
import { deserialize } from "typescript-json-serializer";
import { CampusConsistentUpdateManager } from "../shared/CampusConsistentUpdateManager";
import { EntityStatus } from "../../../../shared/Utils/Statics/EntityStatus";

export const setCampusAsDeleted: APIGatewayProxyHandler = async (event, _context) => {
  
  const requestBody = Utils.getUniqueInstance().validateRequestObject(event);
  
  //Deserialize
  var requestedCampus: Campus = deserialize(requestBody, Campus);
  
  if (!requestedCampus.isPKDefined()) {
    return Utils.getUniqueInstance().getValidationErrorResponse(requestBody, requestedCampus.getReadAndDeleteExpectedBody());
  }
  
  //UPDATE
  requestedCampus.CampusStatus = EntityStatus.DELETED;
  
  let rels = await CampusConsistentUpdateManager.getUniqueInstance().getRels(requestedCampus);

  let updateSchema = {
    CampusStatus: "RelationshipStatus"
  }

  let updateObjects = CampusConsistentUpdateManager.getUniqueInstance().getUpdateObjects(rels, requestedCampus, updateSchema);

  let data = await CampusConsistentUpdateManager.getUniqueInstance().transactUpdateRels(updateObjects);

  return Utils.getUniqueInstance().getDataResponse(data);
};
