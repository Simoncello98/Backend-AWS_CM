"use strict";
/*
  Created by Simone Scionti
*/
exports.__esModule = true;
exports.Resources = void 0;
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.IA_TABLE = process.env.stage == 'test' ? "CMAuthorization-test" : "CMAuthorization";
    Resources.IP_TABLE = process.env.stage == 'test' ? "CMPeople-test" : "CMPeople";
    Resources.IM_TABLE = process.env.stage == 'test' ? "CMMeal-test" : "CMMeal";
    Resources.S3_BUCKET = process.env.stage == 'test' ? "cm-storage-bucket-test" : "cm-storage-bucket";
    Resources.USERPOOL_NAME = process.env.stage == 'test' ? "CM-UserPool-test" : "CM-UserPool";
    Resources.USERPOOL_COGNITO_NAME = process.env.stage == 'test' ? "CM-UserPool-Client-test" : "CM-UserPool-Client";
    Resources.USERPOOL_ID = process.env.stage == 'test' ? "eu-central-1_cUzvIpcuW" : "eu-central-1_cUzvIpcuW";
    //default values
    Resources.DefaultPasswordForNewUsers = "CMPSW123";
    Resources.REGION = "eu-central-1";
    Resources.APIVERSION = "2018-11-29";
    return Resources;
}());
exports.Resources = Resources;
