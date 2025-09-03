
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxUeXBlXFxBZFN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFLLFlBa0JKO0FBbEJELFdBQUssWUFBWTtJQUNiLFNBQVM7SUFDVCwrREFBZ0IsQ0FBQTtJQUVoQixPQUFPO0lBQ1AseURBQWEsQ0FBQTtJQUViLE9BQU87SUFDUCx1REFBWSxDQUFBO0lBRVosTUFBTTtJQUNOLHFEQUFXLENBQUE7SUFFWCxPQUFPO0lBQ1AsdURBQVksQ0FBQTtJQUVaLE9BQU87SUFDUCxtRUFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBbEJJLFlBQVksS0FBWixZQUFZLFFBa0JoQjtBQTZCTyxvQ0FBWTtBQTNCcEIsSUFBSyxhQXlCSjtBQXpCRCxXQUFLLGFBQWE7SUFDZCxTQUFTO0lBQ1QsaUVBQWdCLENBQUE7SUFFaEIsT0FBTztJQUNQLDJEQUFhLENBQUE7SUFFYixPQUFPO0lBQ1AseURBQVksQ0FBQTtJQUVaLE1BQU07SUFDTix1REFBVyxDQUFBO0lBRVgsTUFBTTtJQUNOLDJEQUFhLENBQUE7SUFFYixPQUFPO0lBQ1AseURBQVksQ0FBQTtJQUVaLFFBQVE7SUFDUix1RUFBbUIsQ0FBQTtJQUVuQixTQUFTO0lBQ1QseUVBQW9CLENBQUE7QUFFeEIsQ0FBQyxFQXpCSSxhQUFhLEtBQWIsYUFBYSxRQXlCakI7QUFFcUIsc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJlbnVtIEZlZWRBZFN0YXR1cyB7XG4gICAgLy/lub/lkYrliqDovb3miJDlip/kuoZcbiAgICBMT0FEX1NVQ0NFU1MgPSAxLFxuXG4gICAgLy/liqDovb3lpLHotKXkuoZcbiAgICBMT0FEX0ZBSUwgPSAyLFxuXG4gICAgLy/lub/lkYrngrnlh7vkuoZcbiAgICBPTl9DTElDSyA9IDMsXG5cbiAgICAvL+W5v+WRiuWxleekulxuICAgIE9OX1NIT1cgPSA0LFxuXG4gICAgLy/lub/lkYrlhbPpl63kuoZcbiAgICBPTl9DTE9TRSA9IDYsXG5cbiAgICAvL+mrmOW6puehruiupOS6hlxuICAgIENPTkZJUk1fSEVJR0hUID0gOSxcbn1cblxuZW51bSBWaWRlb0FkU3RhdHVzIHtcbiAgICAvL+W5v+WRiuWKoOi9veaIkOWKn+S6hlxuICAgIExPQURfU1VDQ0VTUyA9IDEsXG5cbiAgICAvL+WKoOi9veWksei0peS6hlxuICAgIExPQURfRkFJTCA9IDIsXG5cbiAgICAvL+W5v+WRiueCueWHu+S6hlxuICAgIE9OX0NMSUNLID0gMyxcblxuICAgIC8v5bm/5ZGK5bGV56S6XG4gICAgT05fU0hPVyA9IDQsXG5cbiAgICAvL+WxleekuuWksei0pVxuICAgIFNIT1dfRkFJTCA9IDUsXG5cbiAgICAvL+W5v+WRiuWFs+mXreS6hlxuICAgIE9OX0NMT1NFID0gNixcblxuICAgIC8v6KeG6aKR5pKt5pS+5a6M5oiQXG4gICAgT05fVklERU9fRklOSVNIID0gNyxcblxuICAgIC8v5Y+v5Lul6I635Y+W5aWW5Yqx5LqGXG4gICAgT05fUkVXQVJEX0ZJTklTSCA9IDksXG5cbn1cblxuZXhwb3J0IHtGZWVkQWRTdGF0dXMsIFZpZGVvQWRTdGF0dXN9Il19