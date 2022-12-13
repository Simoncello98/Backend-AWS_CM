/*
  Created by Simone Scionti 
    manager for consistent update of campus service.


*/

import { ConsistentUpdateManager } from "../../../../shared/SupportClasses/AbstractClasses/ConsistentUpdateManagerClass";
import { Utils } from "../../../../shared/Utils/Utils";
import { DynamoDBKeySchemaInterface } from "../../../../shared/Utils/Interfaces/DynamoDBKeySchemaInterface";
import { CampusXCompanyXUser } from "../../../../shared/Models/RelationshipsRecordModels/CampusXCompanyXUser";
import { deserialize } from "typescript-json-serializer";
import { CampusXCompany } from "../../../../shared/Models/RelationshipsRecordModels/CampusXCompany";
import { Model } from "../../../../shared/Models/AbstractClasses/Model";
import { Campus } from "../../../../shared/Models/Campus";
import { Resources } from "../../../../shared/Utils/Resources";

/*

TODO:
I can do better because i can query only for CampusXCompanyXUser records and : 
-If i have no results so i need to query for CampusXCompany Records 
- I f i have results i can use the couple (CampusName-CompanyName) to refer to CampusXCompany records. 

The problem is if i don't have any user inside a company, i will not refer the CampusXCompany record and i'll leave the db inconsistent.
*/
export class CampusConsistentUpdateManager extends ConsistentUpdateManager {
    public static getUniqueInstance() {
        if (!CampusConsistentUpdateManager.obj) CampusConsistentUpdateManager.obj = new CampusConsistentUpdateManager();
        return this.obj;
    }

    public async getRels(item: Campus): Promise<any> {
        //CAMPUSXCOMPANY records
        const CampusXCompanyParams = {
            TableName: Resources.IP_TABLE,
            ProjectionExpression: "CampusName,CompanyName",
            KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
            ExpressionAttributeNames: {
                "#pk": "PK",
                "#sk": "SK",
            },
            ExpressionAttributeValues: {
                ":pk": "#CAMPUS<" + item.CampusName + ">",
                ":sk": "#COMPANY"
            }
        };
        //USERXCOMPANY records
        const CampusXCompanyXUserParams = {
            TableName: Resources.IP_TABLE,
            ProjectionExpression: "Email,CampusName,CompanyName",
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "PK"
            },
            ExpressionAttributeValues: {
                ":pk": "#USER#X#CAMPUS<" + item.CampusName + ">"
            }
        };
        //transactions don't support query operation, but to find all relationships record I need to query.. so i need to do two queries.
        const campusXCompanyRels = await this.dynamo.query(CampusXCompanyParams).promise();
        const campusXCompanyXUserRels = await this.dynamo.query(CampusXCompanyXUserParams).promise();
        let campXcompItems: Array<any> = campusXCompanyRels.Items;
        let campXcompXuserItems: Array<any> = campusXCompanyXUserRels.Items;

        //concat in one array 
        let allRels = campXcompXuserItems.concat(campXcompItems);
        return allRels;
    }

    public getUpdateObjects(rels: any[], item: Campus, updateSchema: any): any[] {
        let updateObjects: any[] = [];
        //put all rerlationships objects to update
        for (let rel of rels) {
            let relkeys: DynamoDBKeySchemaInterface;
            //try to deserialize in the most specific model.
            let currentRelationship: Model;
            let relationship: CampusXCompanyXUser = deserialize(rel, CampusXCompanyXUser);
            if (relationship.isPKDefined()) {//check if i have all pk defined. If not, it was a CampusXCompany record, so we don't have Email.
                //uses a function that put all the updatable new parameters in the instance.
                currentRelationship = relationship;
                if (updateSchema == false) Utils.getUniqueInstance().recursivelySetUpdatedKeysForSameSchema(item, relationship);
                else Utils.getUniqueInstance().recursivelySetUpdatedKeysForSchema(updateSchema, item, relationship);
                relkeys = {
                    PK: "#USER#X#CAMPUS<" + relationship.CampusName + ">",
                    SK: "#USER<" + relationship.Email + ">#COMPANY<" + relationship.CompanyName + ">"
                }
            }
            else {
                let relationship: CampusXCompany = deserialize(rel, CampusXCompany);
                currentRelationship = relationship;
                if (updateSchema == false) Utils.getUniqueInstance().recursivelySetUpdatedKeysForSameSchema(item, relationship);
                else Utils.getUniqueInstance().recursivelySetUpdatedKeysForSchema(updateSchema, item, relationship);
                relkeys = {
                    PK: "#CAMPUS<" + relationship.CampusName + ">",
                    SK: "#COMPANY<" + relationship.CompanyName + ">"
                }
            }

            const objParams = {
                Update: {
                    TableName: Resources.IP_TABLE,
                    Key: relkeys,
                    UpdateExpression: Utils.getUniqueInstance().getUpdateExpression(currentRelationship),
                    ExpressionAttributeValues: Utils.getUniqueInstance().getExpressionAttributeValues(currentRelationship)
                }
            };
            if (Object.keys(objParams.Update.ExpressionAttributeValues).length != 0) updateObjects.push(objParams);
        }

        //put the company info record to update
        const campusKeys: DynamoDBKeySchemaInterface = {
            'PK': "#CAMPUS",
            'SK': "#CAMPUS_INFO<" + item.CampusName + ">"
        }
        const userParams = {
            Update: {
                TableName: Resources.IP_TABLE,
                Key: campusKeys,
                UpdateExpression: Utils.getUniqueInstance().getUpdateExpression(item),
                ExpressionAttributeValues: Utils.getUniqueInstance().getExpressionAttributeValues(item)
            }
        };
        updateObjects.push(userParams);
        return updateObjects;
    }

}