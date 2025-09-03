import {AppInfo} from './../Config/AppInfo';
import PlatformFactory from "./../Adapter/PlatformFactory";

const reqEncrypt = function(data, callback){
    //获取签到的
    if(AppInfo.isEncryptData){
        PlatformFactory.Ins.signRequestBody(JSON.stringify(data), (res) => {
            callback({"code" : res});
        })
    } else {
        callback(data);
    }
};

export default reqEncrypt;