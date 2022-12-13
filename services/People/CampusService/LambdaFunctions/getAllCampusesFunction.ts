/*
  Created by Simone Scionti 

  get all campuses in the system.

*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { DynamoDB } from "aws-sdk";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";
import { EntityStatus } from "../../../../shared/Utils/Statics/EntityStatus";


export const getAllCampuses: APIGatewayProxyHandler = async (_event, _context) => {

  //QUERY
  let params = CampusServiceUtils.paramsForQueryForAllRecordsWithStatus(EntityStatus.ACTIVE);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.query(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data.Items);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};