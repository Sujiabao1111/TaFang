
(function () {
var scripts = [{"deps":{"./assets/Script/soundController":8,"./assets/Script/Assist/RandomCtr":188,"./assets/Script/Assist/TextCtr":2,"./assets/Script/Assist/AssistCtr":43,"./assets/Script/CanvasController":42,"./assets/Script/Language/LocalizedLabel":187,"./assets/Script/Language/LocalizedSprite":44,"./assets/Script/Language/LanguageData":9,"./assets/Script/NewBigWheel/NewBigTaskItem":45,"./assets/Script/NewBigWheel/NewBigWheelChou":10,"./assets/Script/NewBigWheel/NewBigWheelController":46,"./assets/Script/NewBigWheel/NewBigWheelMarquee":47,"./assets/Script/NewBigWheel/NewBigWheelPrize":49,"./assets/Script/NewBigWheel/NewBigWheelPrizeAward":52,"./assets/Script/NewBigWheel/BigWheelRuleModal":50,"./assets/Script/TrackMgr/TrackMgr":11,"./assets/Script/TrackMgr/TrackEnum":48,"./assets/Script/base/Singleton":12,"./assets/Script/base/UIManager":53,"./assets/Script/base/baseTs":51,"./assets/Script/base/jsonSingleton":55,"./assets/Script/base/AStart":54,"./assets/Script/common/NameTs":56,"./assets/Script/common/PropConst":57,"./assets/Script/common/faceTs":58,"./assets/Script/common/pageTs":59,"./assets/Script/common/pool":60,"./assets/Script/common/scrollTs":67,"./assets/Script/common/AdPosition":61,"./assets/Script/common/custon/Loading":3,"./assets/Script/common/custon/TimerMgr":62,"./assets/Script/common/custon/Act_Rotate":65,"./assets/Script/controlelr/RewardController":13,"./assets/Script/controlelr/RedController":70,"./assets/Script/data/userData":14,"./assets/Script/effect/ModelFunc":63,"./assets/Script/effect/effect":69,"./assets/Script/effect/GameEffect":66,"./assets/Script/effect/model/EffectToolFrozen":4,"./assets/Script/effect/model/EffectToolShock":64,"./assets/Script/effect/model/EffectToolCls":68,"./assets/Script/effect/turret/turretEffect":15,"./assets/Script/game/bulletBox":71,"./assets/Script/game/game":78,"./assets/Script/game/heavenBox":75,"./assets/Script/game/hpBox":74,"./assets/Script/game/hurtBox":76,"./assets/Script/game/hurtCirtBox":73,"./assets/Script/game/levelBgBox":72,"./assets/Script/game/levelLabelBox":77,"./assets/Script/game/monsterBox":79,"./assets/Script/game/monsterFactory":84,"./assets/Script/game/shadowBox":81,"./assets/Script/game/treasureBox":80,"./assets/Script/game/turretBox":88,"./assets/Script/game/turretFactory":89,"./assets/Script/game/turretHost":82,"./assets/Script/game/bloodBox":87,"./assets/Script/game/levelBox/levelLabelItem":6,"./assets/Script/game/levelBox/levelBgItem":83,"./assets/Script/game/monster/monsterBlood":16,"./assets/Script/game/monster/monsterHp":86,"./assets/Script/game/monster/monsterShadow":92,"./assets/Script/game/monster/monster":85,"./assets/Script/game/place/placeItem":20,"./assets/Script/game/pool/poolBox":17,"./assets/Script/game/shop/shopItem2":21,"./assets/Script/game/shop/shopItem1":90,"./assets/Script/game/tuJian/tuJianItem":19,"./assets/Script/game/turret/turret":94,"./assets/Script/game/turret/turretBullet":97,"./assets/Script/game/turret/turretHurt":23,"./assets/Script/game/turret/turretHurt2":93,"./assets/Script/game/turret/BulletBoom":100,"./assets/Script/heaven/heavenItem":18,"./assets/Script/i18n/en":22,"./assets/Script/i18n/id":91,"./assets/Script/i18n/ru":96,"./assets/Script/i18n/th":98,"./assets/Script/i18n/zh":95,"./assets/Script/i18n/zhHant":99,"./assets/Script/i18n/ar":102,"./assets/Script/js/dragonBonesEditPlay":24,"./assets/Script/js/tganalytics":112,"./assets/Script/js/SkeletonExt":101,"./assets/Script/model/Marquee":105,"./assets/Script/model/ModelTip":103,"./assets/Script/model/NewPlayerTaskModel":25,"./assets/Script/model/SignModel":104,"./assets/Script/model/TipBox":108,"./assets/Script/model/WalletRecord":109,"./assets/Script/model/BtnRandomRed":107,"./assets/Script/onPrizeGet/OnPrizeGet":26,"./assets/Script/pop/gameCoinReward":27,"./assets/Script/pop/gameDetention":110,"./assets/Script/pop/gameEarnPro":106,"./assets/Script/pop/gameEarnings":111,"./assets/Script/pop/gameEnd":114,"./assets/Script/pop/gameGetOtherTurret":115,"./assets/Script/pop/gameGetTurret":116,"./assets/Script/pop/gameGetVideoTurret":117,"./assets/Script/pop/gameGoldWheel":120,"./assets/Script/pop/gameGoldWheelReward":113,"./assets/Script/pop/gameGuide":122,"./assets/Script/pop/gameGuide2":119,"./assets/Script/pop/gameHeavenReward":118,"./assets/Script/pop/gameKingPao":127,"./assets/Script/pop/gameKingPaoProgress":123,"./assets/Script/pop/gameNetworkLost":121,"./assets/Script/pop/gameNewPlayerTask":125,"./assets/Script/pop/gameOffline":124,"./assets/Script/pop/gameOnLinePrize":126,"./assets/Script/pop/gameOnPrizeGetReward":128,"./assets/Script/pop/gamePassReward":196,"./assets/Script/pop/gameProp":134,"./assets/Script/pop/gamePropBox":130,"./assets/Script/pop/gameRandomRedPrize":133,"./assets/Script/pop/gameSavingPot":129,"./assets/Script/pop/gameSet":132,"./assets/Script/pop/gameSign":135,"./assets/Script/pop/gameSignReward":139,"./assets/Script/pop/gameStart":131,"./assets/Script/pop/gameTask":137,"./assets/Script/pop/gameTaskReward":141,"./assets/Script/pop/gameToolGet":145,"./assets/Script/pop/gameTreasure":138,"./assets/Script/pop/gameTuJian":142,"./assets/Script/pop/gameTurretRandomRed":136,"./assets/Script/pop/gameUpgrade":143,"./assets/Script/pop/gameWallet":146,"./assets/Script/pop/gameWalletRecord":140,"./assets/Script/pop/gameAdLoading":148,"./assets/Script/prop/propItem":28,"./assets/Script/prop/PropContent":147,"./assets/Script/server/ServerMgr/Ajax":29,"./assets/Script/server/UrlConst":144,"./assets/Script/server/xmsdk_cocos/mock1":31,"./assets/Script/server/xmsdk_cocos/AD/AdUtil":189,"./assets/Script/server/xmsdk_cocos/AD/AdviewUtil":30,"./assets/Script/server/xmsdk_cocos/AD/AdController":152,"./assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform":149,"./assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory":32,"./assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform":150,"./assets/Script/server/xmsdk_cocos/Adapter/rsa":181,"./assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform":153,"./assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform":34,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge":33,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge":160,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus":7,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig":151,"./assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType":158,"./assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType":154,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType":156,"./assets/Script/server/xmsdk_cocos/Config/AppInfo":35,"./assets/Script/server/xmsdk_cocos/Message/MessageCenter":37,"./assets/Script/server/xmsdk_cocos/Utils/LoadObject":155,"./assets/Script/server/xmsdk_cocos/Utils/Loading":36,"./assets/Script/server/xmsdk_cocos/Utils/PxTransUtils":157,"./assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt":162,"./assets/Script/server/xmsdk_cocos/Utils/Storage":165,"./assets/Script/server/xmsdk_cocos/Utils/ToastObject":163,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad":161,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad2":164,"./assets/Script/server/xmsdk_cocos/Utils/XMToast":167,"./assets/Script/server/xmsdk_cocos/Utils/XMUtils":168,"./assets/Script/server/xmsdk_cocos/Utils/md5":166,"./assets/Script/server/xmsdk_cocos/Utils/Init":169,"./assets/Script/server/xmsdk_cocos/XMSDK":159,"./assets/Script/spine/spineParticle":38,"./assets/Script/task/taskItem":39,"./assets/Script/tg/Global":170,"./assets/Script/tg/HttpClient":41,"./assets/Script/tg/TelegramPlatform":171,"./assets/Script/tg/WalletMgr":173,"./assets/Script/tg/ApiService":183,"./assets/Script/ui/earnProgress":40,"./assets/Script/ui/earningBtn":172,"./assets/Script/ui/savingPotBtn":175,"./assets/Script/ui/taskProgress":177,"./assets/Script/ui/turretBuy":178,"./assets/Script/ui/turretLevel":176,"./assets/Script/ui/turretRecycle":182,"./assets/Script/ui/ui":184,"./assets/Script/ui/autoBtn":185,"./assets/Script/util/Tools":174,"./assets/Script/util/tool":179,"./assets/Script/util/util":5,"./assets/Script/util/TimeTools":1,"./assets/Script/PageManage":180,"./assets/prefab/tool/script/Progress":191,"./assets/prefab/tool/script/autoScroller":186,"./assets/prefab/tool/script/btn":190},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/TimeTools.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/TextCtr.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Loading.js"},{"deps":{"../../common/NameTs":56,"../ModelFunc":63},"path":"preview-scripts/assets/Script/effect/model/EffectToolFrozen.js"},{"deps":{"../common/faceTs":58,"../common/NameTs":56,"../base/jsonSingleton":55,"../Assist/TextCtr":2,"../server/xmsdk_cocos/XMSDK":159,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":152,"../Assist/AssistCtr":43,"./Tools":174},"path":"preview-scripts/assets/Script/util/util.js"},{"deps":{"../../common/NameTs":56},"path":"preview-scripts/assets/Script/game/levelBox/levelLabelItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js"},{"deps":{"./common/NameTs":56,"./util/Tools":174},"path":"preview-scripts/assets/Script/soundController.js"},{"deps":{},"path":"preview-scripts/assets/Script/Language/LanguageData.js"},{"deps":{"../common/faceTs":58,"../controlelr/RewardController":13,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js"},{"deps":{"../server/xmsdk_cocos/XMSDK":159},"path":"preview-scripts/assets/Script/TrackMgr/TrackMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/Singleton.js"},{"deps":{"../common/faceTs":58,"../util/util":5},"path":"preview-scripts/assets/Script/controlelr/RewardController.js"},{"deps":{},"path":"preview-scripts/assets/Script/data/userData.js"},{"deps":{"../../util/util":5},"path":"preview-scripts/assets/Script/effect/turret/turretEffect.js"},{"deps":{"../../common/NameTs":56},"path":"preview-scripts/assets/Script/game/monster/monsterBlood.js"},{"deps":{"../../base/baseTs":51,"../../common/faceTs":58,"../../util/util":5},"path":"preview-scripts/assets/Script/game/pool/poolBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/heaven/heavenItem.js"},{"deps":{"../../base/baseTs":51,"../../common/NameTs":56,"../../util/util":5},"path":"preview-scripts/assets/Script/game/tuJian/tuJianItem.js"},{"deps":{"../../common/NameTs":56,"../../util/Tools":174,"../../util/util":5},"path":"preview-scripts/assets/Script/game/place/placeItem.js"},{"deps":{"../../common/NameTs":56,"../../soundController":8},"path":"preview-scripts/assets/Script/game/shop/shopItem2.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/en.js"},{"deps":{"../../common/NameTs":56,"../../util/Tools":174},"path":"preview-scripts/assets/Script/game/turret/turretHurt.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/dragonBonesEditPlay.js"},{"deps":{"../Assist/AssistCtr":43,"../common/NameTs":56,"../common/pageTs":59,"../PageManage":180,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/model/NewPlayerTaskModel.js"},{"deps":{"../Assist/AssistCtr":43,"../common/NameTs":56,"../common/pageTs":59,"../controlelr/RedController":70,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameCoinReward.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/prop/propItem.js"},{"deps":{"../../util/util":5,"../UrlConst":144,"../xmsdk_cocos/Config/AppInfo":35,"../xmsdk_cocos/Utils/md5":166},"path":"preview-scripts/assets/Script/server/ServerMgr/Ajax.js"},{"deps":{"./../Utils/PxTransUtils":157,"../Adapter/PlatformFactory":32,"../Adapter/Type/AdStatus":7,"../../../common/NameTs":56},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/mock1.js"},{"deps":{"./PreviewPlatform":150,"./InnerWebPlatform":149,"./AndroidNativePlatform":153},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js"},{"deps":{},"path":"preview-scripts/assets/Script/spine/spineParticle.js"},{"deps":{"../Assist/AssistCtr":43,"../common/NameTs":56,"../common/pageTs":59,"../Language/LanguageData":9,"../PageManage":180,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/task/taskItem.js"},{"deps":{"../soundController":8,"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/pageTs":59,"../common/NameTs":56,"../server/UrlConst":144,"../util/util":5},"path":"preview-scripts/assets/Script/ui/earnProgress.js"},{"deps":{"../Language/LanguageData":9},"path":"preview-scripts/assets/Script/tg/HttpClient.js"},{"deps":{"./base/baseTs":51,"./base/jsonSingleton":55,"./common/NameTs":56,"./Language/LanguageData":9,"./PageManage":180,"./soundController":8,"./util/Tools":174,"./util/util":5},"path":"preview-scripts/assets/Script/CanvasController.js"},{"deps":{"../common/NameTs":56,"../common/PropConst":57,"../server/xmsdk_cocos/AD/AdUtil":189},"path":"preview-scripts/assets/Script/Assist/AssistCtr.js"},{"deps":{"./LanguageData":9},"path":"preview-scripts/assets/Script/Language/LocalizedSprite.js"},{"deps":{"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5,"./NewBigWheelPrize":49},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js"},{"deps":{},"path":"preview-scripts/assets/Script/TrackMgr/TrackEnum.js"},{"deps":{"../common/NameTs":56,"../controlelr/RewardController":13,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5,"./NewBigWheelPrizeAward":52},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js"},{"deps":{"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js"},{"deps":{"../PageManage":180},"path":"preview-scripts/assets/Script/base/baseTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js"},{"deps":{"./Singleton":12},"path":"preview-scripts/assets/Script/base/UIManager.js"},{"deps":{"../util/Tools":174},"path":"preview-scripts/assets/Script/base/AStart.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/jsonSingleton.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/NameTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PropConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/faceTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pageTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pool.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/AdPosition.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/TimerMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/effect/ModelFunc.js"},{"deps":{"../../common/NameTs":56,"../ModelFunc":63},"path":"preview-scripts/assets/Script/effect/model/EffectToolShock.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Act_Rotate.js"},{"deps":{"../common/NameTs":56,"./ModelFunc":63},"path":"preview-scripts/assets/Script/effect/GameEffect.js"},{"deps":{"./pool":60},"path":"preview-scripts/assets/Script/common/scrollTs.js"},{"deps":{"../../common/NameTs":56,"../ModelFunc":63},"path":"preview-scripts/assets/Script/effect/model/EffectToolCls.js"},{"deps":{"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../common/pool":60,"../soundController":8,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/effect/effect.js"},{"deps":{"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/controlelr/RedController.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/bulletBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/levelBgBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/hurtCirtBox.js"},{"deps":{"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/hpBox.js"},{"deps":{"../common/faceTs":58,"../common/NameTs":56,"../common/pool":60,"../server/UrlConst":144,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/game/heavenBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/hurtBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/levelLabelBox.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../common/pageTs":59,"../controlelr/RedController":70,"../effect/GameEffect":66,"../Language/LanguageData":9,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/game/game.js"},{"deps":{"../base/AStart":54,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../TrackMgr/TrackMgr":11,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/game/monsterBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../server/UrlConst":144,"../soundController":8,"../util/util":5},"path":"preview-scripts/assets/Script/game/treasureBox.js"},{"deps":{"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/shadowBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../util/util":5,"./turret/turret":94},"path":"preview-scripts/assets/Script/game/turretHost.js"},{"deps":{"../../common/NameTs":56},"path":"preview-scripts/assets/Script/game/levelBox/levelBgItem.js"},{"deps":{"../soundController":8,"../common/NameTs":56,"../common/faceTs":58,"../util/util":5},"path":"preview-scripts/assets/Script/game/monsterFactory.js"},{"deps":{"../../common/NameTs":56,"../../util/Tools":174,"../../util/util":5,"../monsterFactory":84},"path":"preview-scripts/assets/Script/game/monster/monster.js"},{"deps":{"../../common/NameTs":56,"../../util/util":5},"path":"preview-scripts/assets/Script/game/monster/monsterHp.js"},{"deps":{"../common/NameTs":56,"../common/pool":60},"path":"preview-scripts/assets/Script/game/bloodBox.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../Language/LanguageData":9,"../util/util":5,"./turret/turret":94},"path":"preview-scripts/assets/Script/game/turretBox.js"},{"deps":{"../common/faceTs":58,"../common/NameTs":56,"../TrackMgr/TrackMgr":11,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/game/turretFactory.js"},{"deps":{"../../common/NameTs":56,"../../soundController":8},"path":"preview-scripts/assets/Script/game/shop/shopItem1.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/id.js"},{"deps":{"../../common/NameTs":56,"../../util/util":5},"path":"preview-scripts/assets/Script/game/monster/monsterShadow.js"},{"deps":{"../../common/NameTs":56,"../../Language/LanguageData":9,"../../util/Tools":174},"path":"preview-scripts/assets/Script/game/turret/turretHurt2.js"},{"deps":{"../../common/faceTs":58,"../../common/NameTs":56,"../../common/pageTs":59,"../../TrackMgr/TrackMgr":11,"../../util/util":5,"../turretFactory":89},"path":"preview-scripts/assets/Script/game/turret/turret.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zh.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ru.js"},{"deps":{"../../common/faceTs":58,"../../common/NameTs":56,"../../util/Tools":174,"../../util/util":5},"path":"preview-scripts/assets/Script/game/turret/turretBullet.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/th.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zhHant.js"},{"deps":{"../../common/NameTs":56,"../../util/util":5},"path":"preview-scripts/assets/Script/game/turret/BulletBoom.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/SkeletonExt.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ar.js"},{"deps":{"../base/baseTs":51},"path":"preview-scripts/assets/Script/model/ModelTip.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/SignModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/Marquee.js"},{"deps":{"../soundController":8,"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameEarnPro.js"},{"deps":{"../Assist/AssistCtr":43,"../common/NameTs":56,"../common/pageTs":59,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../util/util":5},"path":"preview-scripts/assets/Script/model/BtnRandomRed.js"},{"deps":{"../common/NameTs":56},"path":"preview-scripts/assets/Script/model/TipBox.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/WalletRecord.js"},{"deps":{"../base/baseTs":51,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameDetention.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/tool":179,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameEarnings.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/tganalytics.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../controlelr/RewardController":13,"../Language/LanguageData":9,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGoldWheelReward.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameEnd.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../Language/LanguageData":9,"../soundController":8,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGetOtherTurret.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../Language/LanguageData":9,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGetTurret.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../Language/LanguageData":9,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGetVideoTurret.js"},{"deps":{"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameHeavenReward.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGuide2.js"},{"deps":{"../soundController":8,"../common/NameTs":56,"../server/xmsdk_cocos/XMSDK":159,"../server/UrlConst":144,"../util/util":5,"../common/faceTs":58,"../base/baseTs":51,"./gameGoldWheelReward":113,"../controlelr/RewardController":13,"../TrackMgr/TrackMgr":11,"../common/pageTs":59,"../controlelr/RedController":70,"../Assist/AssistCtr":43},"path":"preview-scripts/assets/Script/pop/gameGoldWheel.js"},{"deps":{"../base/baseTs":51,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameNetworkLost.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameGuide.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../PageManage":180,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameKingPaoProgress.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameOffline.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../model/NewPlayerTaskModel":25,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5,"../../prefab/tool/script/Progress":191},"path":"preview-scripts/assets/Script/pop/gameNewPlayerTask.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameOnLinePrize.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../model/Marquee":105,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameKingPao.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../common/pageTs":59,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/tool":179,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameSavingPot.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../prop/propItem":28,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gamePropBox.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameStart.js"},{"deps":{"../base/baseTs":51,"../Language/LanguageData":9,"../soundController":8,"../util/Tools":174},"path":"preview-scripts/assets/Script/pop/gameSet.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameRandomRedPrize.js"},{"deps":{"../base/baseTs":51,"../base/jsonSingleton":55,"../common/NameTs":56,"../prop/propItem":28,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameProp.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameSign.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameTurretRandomRed.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../soundController":8,"../task/taskItem":39,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameTask.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameTreasure.js"},{"deps":{"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../Language/LanguageData":9,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameSignReward.js"},{"deps":{"../base/baseTs":51,"../model/WalletRecord":109,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameWalletRecord.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../common/pageTs":59,"../Language/LanguageData":9,"../PageManage":180,"../server/UrlConst":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameTaskReward.js"},{"deps":{"../base/baseTs":51,"../base/jsonSingleton":55,"../common/NameTs":56,"../common/scrollTs":67,"../game/tuJian/tuJianItem":19,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameTuJian.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameUpgrade.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/UrlConst.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../server/UrlConst":144,"../TrackMgr/TrackMgr":11,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameToolGet.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/faceTs":58,"../common/NameTs":56,"../common/pool":60,"../Language/LanguageData":9,"../soundController":8,"../tg/ApiService":183,"../tg/Global":170,"../tg/WalletMgr":173,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/pop/gameWallet.js"},{"deps":{},"path":"preview-scripts/assets/Script/prop/PropContent.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56},"path":"preview-scripts/assets/Script/pop/gameAdLoading.js"},{"deps":{"./Bridge/JsBridge":33,"../Config/AppInfo":35,"../mock1":31},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js"},{"deps":{"./rsa":181,"./Type/AdStatus":7,"../Config/AppInfo":35,"../mock1":31,"../Utils/PxTransUtils":157},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig.js"},{"deps":{"../../../common/NameTs":56,"../../../common/pageTs":59,"../../../util/util":5,"../XMSDK":159,"./AdUtil":189,"./AdviewUtil":30},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js"},{"deps":{"./Bridge/AndroidCocosBridge":160,"../Config/AppInfo":35,"../mock1":31},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType.js"},{"deps":{"./XMLoad":161},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/LoadObject.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType.js"},{"deps":{"../XMSDK":159},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType.js"},{"deps":{"./Config/AppInfo":35,"./Adapter/PlatformFactory":32,"./AD/AdUtil":189,"./AD/AdviewUtil":30,"./Utils/XMLoad":161,"../ServerMgr/Ajax":29,"../../Assist/AssistCtr":43},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js"},{"deps":{"./LoadObject":155},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js"},{"deps":{"./../Config/AppInfo":35,"./../Adapter/PlatformFactory":32},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js"},{"deps":{"./XMToast":167},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ToastObject.js"},{"deps":{"./Loading":36},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/md5.js"},{"deps":{"./ToastObject":163},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMUtils.js"},{"deps":{"../../../common/NameTs":56,"../../../soundController":8,"../Adapter/PlatformFactory":32,"../Config/AppInfo":35},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js"},{"deps":{"../base/Singleton":12},"path":"preview-scripts/assets/Script/tg/Global.js"},{"deps":{"../Assist/AssistCtr":43,"../base/Singleton":12,"../Language/LanguageData":9,"../PageManage":180,"../util/TimeTools":1,"./ApiService":183,"./Global":170},"path":"preview-scripts/assets/Script/tg/TelegramPlatform.js"},{"deps":{"../common/NameTs":56,"../util/tool":179},"path":"preview-scripts/assets/Script/ui/earningBtn.js"},{"deps":{"../base/Singleton":12},"path":"preview-scripts/assets/Script/tg/WalletMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/Tools.js"},{"deps":{"../Assist/AssistCtr":43,"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../server/UrlConst":144,"../soundController":8,"../util/tool":179,"../util/util":5},"path":"preview-scripts/assets/Script/ui/savingPotBtn.js"},{"deps":{"../base/baseTs":51,"../util/util":5},"path":"preview-scripts/assets/Script/ui/turretLevel.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../TrackMgr/TrackMgr":11,"../util/util":5},"path":"preview-scripts/assets/Script/ui/taskProgress.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../common/pageTs":59,"../soundController":8,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/ui/turretBuy.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/tool.js"},{"deps":{"./common/custon/Loading":3,"./common/faceTs":58,"./common/NameTs":56,"./common/pageTs":59,"./util/util":5},"path":"preview-scripts/assets/Script/PageManage.js"},{"deps":{"buffer":192},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/rsa.js"},{"deps":{"../base/baseTs":51,"../common/NameTs":56,"../util/util":5},"path":"preview-scripts/assets/Script/ui/turretRecycle.js"},{"deps":{"../Assist/AssistCtr":43,"../Language/LanguageData":9,"./Global":170,"./HttpClient":41,"./WalletMgr":173},"path":"preview-scripts/assets/Script/tg/ApiService.js"},{"deps":{"../common/faceTs":58,"../common/NameTs":56,"../common/pageTs":59,"../controlelr/RedController":70,"../PageManage":180,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":8,"../util/util":5},"path":"preview-scripts/assets/Script/ui/ui.js"},{"deps":{"../Assist/AssistCtr":43,"../common/faceTs":58,"../soundController":8,"../util/Tools":174,"../util/util":5},"path":"preview-scripts/assets/Script/ui/autoBtn.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/autoScroller.js"},{"deps":{"./LanguageData":9},"path":"preview-scripts/assets/Script/Language/LocalizedLabel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/RandomCtr.js"},{"deps":{"../../../common/AdPosition":61,"../../../common/NameTs":56,"../Adapter/PlatformFactory":32,"../Adapter/Type/AdStatus":7,"../XMSDK":159},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/btn.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/Progress.js"},{"deps":{"base64-js":194,"ieee754":193,"isarray":195},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{"../soundController":8,"../base/baseTs":51,"../common/NameTs":56,"../Language/LanguageData":9,"../server/UrlConst":144,"../util/util":5,"../util/Tools":174},"path":"preview-scripts/assets/Script/pop/gamePassReward.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    