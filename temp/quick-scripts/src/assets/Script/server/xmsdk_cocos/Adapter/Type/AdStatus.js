"use strict";
cc._RF.push(module, '2c7eb6m6v1B5IZEv8wqGzp8', 'AdStatus');
// Script/server/xmsdk_cocos/Adapter/Type/AdStatus.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoAdStatus = exports.FeedAdStatus = void 0;
var FeedAdStatus;
(function (FeedAdStatus) {
    //广告加载成功了
    FeedAdStatus[FeedAdStatus["LOAD_SUCCESS"] = 1] = "LOAD_SUCCESS";
    //加载失败了
    FeedAdStatus[FeedAdStatus["LOAD_FAIL"] = 2] = "LOAD_FAIL";
    //广告点击了
    FeedAdStatus[FeedAdStatus["ON_CLICK"] = 3] = "ON_CLICK";
    //广告展示
    FeedAdStatus[FeedAdStatus["ON_SHOW"] = 4] = "ON_SHOW";
    //广告关闭了
    FeedAdStatus[FeedAdStatus["ON_CLOSE"] = 6] = "ON_CLOSE";
    //高度确认了
    FeedAdStatus[FeedAdStatus["CONFIRM_HEIGHT"] = 9] = "CONFIRM_HEIGHT";
})(FeedAdStatus || (FeedAdStatus = {}));
exports.FeedAdStatus = FeedAdStatus;
var VideoAdStatus;
(function (VideoAdStatus) {
    //广告加载成功了
    VideoAdStatus[VideoAdStatus["LOAD_SUCCESS"] = 1] = "LOAD_SUCCESS";
    //加载失败了
    VideoAdStatus[VideoAdStatus["LOAD_FAIL"] = 2] = "LOAD_FAIL";
    //广告点击了
    VideoAdStatus[VideoAdStatus["ON_CLICK"] = 3] = "ON_CLICK";
    //广告展示
    VideoAdStatus[VideoAdStatus["ON_SHOW"] = 4] = "ON_SHOW";
    //展示失败
    VideoAdStatus[VideoAdStatus["SHOW_FAIL"] = 5] = "SHOW_FAIL";
    //广告关闭了
    VideoAdStatus[VideoAdStatus["ON_CLOSE"] = 6] = "ON_CLOSE";
    //视频播放完成
    VideoAdStatus[VideoAdStatus["ON_VIDEO_FINISH"] = 7] = "ON_VIDEO_FINISH";
    //可以获取奖励了
    VideoAdStatus[VideoAdStatus["ON_REWARD_FINISH"] = 9] = "ON_REWARD_FINISH";
})(VideoAdStatus || (VideoAdStatus = {}));
exports.VideoAdStatus = VideoAdStatus;

cc._RF.pop();