/*
  Created by Simone Scionti 

  get All deleted campuses in the system.
*/
'use strict';

import { APIGatewayProxyHandler } from "aws-lambda";
import { Utils } from "../../../../shared/Utils/Utils";
import { EntityStatus } from "../../../../shared/Utils/Statics/EntityStatus";
import { DynamoDB } from "aws-sdk";
import { CampusServiceUtils } from "../Utils/CampusServiceUtils";


export const getAllDeletedCampuses: APIGatewayProxyHandler = async () => {
  
  //QUERY
  let params = CampusServiceUtils.paramsForQueryForAllRecordsWithStatus(EntityStatus.DELETED);

  let dynamo = new DynamoDB.DocumentClient();

  try {
    const data = await dynamo.query(params).promise();
    return Utils.getUniqueInstance().getDataResponse(data.Items);
  } catch (error) {
    return Utils.getUniqueInstance().getErrorResponse(error, params);
  }
};