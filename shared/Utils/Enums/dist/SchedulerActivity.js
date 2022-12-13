"use strict";
/*
  Created by Simone Scionti
*/
exports.__esModule = true;
exports.ActivityTask = exports.ActivityStatus = void 0;
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus["ACTIVE"] = "ACTIVE";
    ActivityStatus["INACTIVE"] = "INACTIVE";
})(ActivityStatus = exports.ActivityStatus || (exports.ActivityStatus = {}));
var ActivityTask;
(function (ActivityTask) {
    ActivityTask["SET_VALUE"] = "SET VALUE";
    ActivityTask["TURN_OFF"] = "TURN OFF";
    ActivityTask["TURN_ON"] = "TURN ON";
})(ActivityTask = exports.ActivityTask || (exports.ActivityTask = {}));
