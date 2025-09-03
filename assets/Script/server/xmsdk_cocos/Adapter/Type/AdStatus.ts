enum FeedAdStatus {
    //广告加载成功了
    LOAD_SUCCESS = 1,

    //加载失败了
    LOAD_FAIL = 2,

    //广告点击了
    ON_CLICK = 3,

    //广告展示
    ON_SHOW = 4,

    //广告关闭了
    ON_CLOSE = 6,

    //高度确认了
    CONFIRM_HEIGHT = 9,
}

enum VideoAdStatus {
    //广告加载成功了
    LOAD_SUCCESS = 1,

    //加载失败了
    LOAD_FAIL = 2,

    //广告点击了
    ON_CLICK = 3,

    //广告展示
    ON_SHOW = 4,

    //展示失败
    SHOW_FAIL = 5,

    //广告关闭了
    ON_CLOSE = 6,

    //视频播放完成
    ON_VIDEO_FINISH = 7,

    //可以获取奖励了
    ON_REWARD_FINISH = 9,

}

export {FeedAdStatus, VideoAdStatus}