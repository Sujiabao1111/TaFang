"use strict";
cc._RF.push(module, '693718gFXhPf5hOACy1WSUS', 'ReqEncrypt');
// Script/server/xmsdk_cocos/Utils/ReqEncrypt.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppInfo_1 = require("./../Config/AppInfo");
var PlatformFactory_1 = require("./../Adapter/PlatformFactory");
var reqEncrypt = function (data, callback) {
    //获取签到的
    if (AppInfo_1.AppInfo.isEncryptData) {
        PlatformFactory_1.default.Ins.signRequestBody(JSON.stringify(data), function (res) {
            callback({ "code": res });
        });
    }
    else {
        callback(data);
    }
};
exports.default = reqEncrypt;

cc._RF.pop();