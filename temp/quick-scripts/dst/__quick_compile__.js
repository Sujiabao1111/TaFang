
(function () {
var scripts = [{"deps":{"./assets/Script/soundController":10,"./assets/Script/Assist/RandomCtr":188,"./assets/Script/Assist/TextCtr":190,"./assets/Script/Assist/AssistCtr":9,"./assets/Script/CanvasController":39,"./assets/Script/Language/LocalizedLabel":1,"./assets/Script/Language/LocalizedSprite":42,"./assets/Script/Language/LanguageData":40,"./assets/Script/NewBigWheel/NewBigTaskItem":8,"./assets/Script/NewBigWheel/NewBigWheelChou":46,"./assets/Script/NewBigWheel/NewBigWheelController":43,"./assets/Script/NewBigWheel/NewBigWheelMarquee":41,"./assets/Script/NewBigWheel/NewBigWheelPrize":47,"./assets/Script/NewBigWheel/NewBigWheelPrizeAward":45,"./assets/Script/NewBigWheel/BigWheelRuleModal":48,"./assets/Script/TrackMgr/TrackMgr":12,"./assets/Script/TrackMgr/TrackEnum":44,"./assets/Script/base/Singleton":11,"./assets/Script/base/UIManager":50,"./assets/Script/base/baseTs":49,"./assets/Script/base/jsonSingleton":52,"./assets/Script/base/AStart":59,"./assets/Script/common/NameTs":51,"./assets/Script/common/PropConst":53,"./assets/Script/common/faceTs":57,"./assets/Script/common/pageTs":55,"./assets/Script/common/pool":58,"./assets/Script/common/scrollTs":62,"./assets/Script/common/AdPosition":61,"./assets/Script/common/custon/Loading":2,"./assets/Script/common/custon/TimerMgr":56,"./assets/Script/common/custon/Act_Rotate":54,"./assets/Script/controlelr/RewardController":13,"./assets/Script/controlelr/RedController":63,"./assets/Script/data/userData":14,"./assets/Script/effect/ModelFunc":60,"./assets/Script/effect/effect":65,"./assets/Script/effect/GameEffect":64,"./assets/Script/effect/model/EffectToolFrozen":15,"./assets/Script/effect/model/EffectToolShock":68,"./assets/Script/effect/model/EffectToolCls":70,"./assets/Script/effect/turret/turretEffect":3,"./assets/Script/game/bulletBox":66,"./assets/Script/game/game":76,"./assets/Script/game/heavenBox":67,"./assets/Script/game/hpBox":71,"./assets/Script/game/hurtBox":69,"./assets/Script/game/hurtCirtBox":72,"./assets/Script/game/levelBgBox":73,"./assets/Script/game/levelLabelBox":77,"./assets/Script/game/monsterBox":74,"./assets/Script/game/monsterFactory":78,"./assets/Script/game/shadowBox":75,"./assets/Script/game/treasureBox":80,"./assets/Script/game/turretBox":79,"./assets/Script/game/turretFactory":84,"./assets/Script/game/turretHost":81,"./assets/Script/game/bloodBox":83,"./assets/Script/game/levelBox/levelLabelItem":4,"./assets/Script/game/levelBox/levelBgItem":82,"./assets/Script/game/monster/monsterBlood":87,"./assets/Script/game/monster/monsterHp":16,"./assets/Script/game/monster/monsterShadow":85,"./assets/Script/game/monster/monster":89,"./assets/Script/game/place/placeItem":18,"./assets/Script/game/pool/poolBox":17,"./assets/Script/game/shop/shopItem2":20,"./assets/Script/game/shop/shopItem1":86,"./assets/Script/game/tuJian/tuJianItem":22,"./assets/Script/game/turret/turret":88,"./assets/Script/game/turret/turretBullet":91,"./assets/Script/game/turret/turretHurt":19,"./assets/Script/game/turret/turretHurt2":90,"./assets/Script/game/turret/BulletBoom":93,"./assets/Script/heaven/heavenItem":21,"./assets/Script/i18n/en":23,"./assets/Script/i18n/id":92,"./assets/Script/i18n/ru":96,"./assets/Script/i18n/th":95,"./assets/Script/i18n/zh":94,"./assets/Script/i18n/zhHant":97,"./assets/Script/i18n/ar":98,"./assets/Script/js/dragonBonesEditPlay":24,"./assets/Script/js/tganalytics":107,"./assets/Script/js/SkeletonExt":100,"./assets/Script/model/Marquee":26,"./assets/Script/model/ModelTip":99,"./assets/Script/model/NewPlayerTaskModel":101,"./assets/Script/model/SignModel":102,"./assets/Script/model/TipBox":105,"./assets/Script/model/WalletRecord":104,"./assets/Script/model/BtnRandomRed":103,"./assets/Script/onPrizeGet/OnPrizeGet":25,"./assets/Script/pop/gameCoinReward":27,"./assets/Script/pop/gameDetention":109,"./assets/Script/pop/gameEarnPro":108,"./assets/Script/pop/gameEarnings":110,"./assets/Script/pop/gameEnd":106,"./assets/Script/pop/gameGetOtherTurret":112,"./assets/Script/pop/gameGetTurret":113,"./assets/Script/pop/gameGetVideoTurret":111,"./assets/Script/pop/gameGoldWheel":116,"./assets/Script/pop/gameGoldWheelReward":114,"./assets/Script/pop/gameGuide":115,"./assets/Script/pop/gameGuide2":117,"./assets/Script/pop/gameHeavenReward":118,"./assets/Script/pop/gameKingPao":119,"./assets/Script/pop/gameKingPaoProgress":121,"./assets/Script/pop/gameNetworkLost":120,"./assets/Script/pop/gameNewPlayerTask":123,"./assets/Script/pop/gameOffline":122,"./assets/Script/pop/gameOnLinePrize":124,"./assets/Script/pop/gameOnPrizeGetReward":126,"./assets/Script/pop/gamePass":128,"./assets/Script/pop/gamePassReward":129,"./assets/Script/pop/gamePassReward2":125,"./assets/Script/pop/gameProp":127,"./assets/Script/pop/gamePropBox":130,"./assets/Script/pop/gameRandomRedPrize":131,"./assets/Script/pop/gameSavingPot":133,"./assets/Script/pop/gameSet":134,"./assets/Script/pop/gameSign":135,"./assets/Script/pop/gameSignReward":136,"./assets/Script/pop/gameStart":132,"./assets/Script/pop/gameTask":137,"./assets/Script/pop/gameTaskReward":139,"./assets/Script/pop/gameToolGet":138,"./assets/Script/pop/gameTreasure":140,"./assets/Script/pop/gameTuJian":146,"./assets/Script/pop/gameTurretRandomRed":143,"./assets/Script/pop/gameUpgrade":141,"./assets/Script/pop/gameWallet":149,"./assets/Script/pop/gameWalletRecord":145,"./assets/Script/pop/gameAdLoading":148,"./assets/Script/prop/propItem":28,"./assets/Script/prop/PropContent":142,"./assets/Script/server/ServerMgr/Ajax":6,"./assets/Script/server/UrlConst":144,"./assets/Script/server/xmsdk_cocos/mock1":151,"./assets/Script/server/xmsdk_cocos/AD/AdUtil":189,"./assets/Script/server/xmsdk_cocos/AD/AdviewUtil":5,"./assets/Script/server/xmsdk_cocos/AD/AdController":147,"./assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform":191,"./assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory":192,"./assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform":150,"./assets/Script/server/xmsdk_cocos/Adapter/rsa":185,"./assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform":152,"./assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform":29,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge":155,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge":30,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus":7,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig":153,"./assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType":154,"./assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType":156,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType":158,"./assets/Script/server/xmsdk_cocos/Config/AppInfo":31,"./assets/Script/server/xmsdk_cocos/Message/MessageCenter":32,"./assets/Script/server/xmsdk_cocos/Utils/LoadObject":161,"./assets/Script/server/xmsdk_cocos/Utils/Loading":34,"./assets/Script/server/xmsdk_cocos/Utils/PxTransUtils":160,"./assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt":157,"./assets/Script/server/xmsdk_cocos/Utils/Storage":163,"./assets/Script/server/xmsdk_cocos/Utils/ToastObject":162,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad":164,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad2":165,"./assets/Script/server/xmsdk_cocos/Utils/XMToast":168,"./assets/Script/server/xmsdk_cocos/Utils/XMUtils":166,"./assets/Script/server/xmsdk_cocos/Utils/md5":171,"./assets/Script/server/xmsdk_cocos/Utils/Init":167,"./assets/Script/server/xmsdk_cocos/XMSDK":159,"./assets/Script/spine/spineParticle":33,"./assets/Script/task/taskItem":35,"./assets/Script/tg/Global":36,"./assets/Script/tg/HttpClient":175,"./assets/Script/tg/TelegramPlatform":172,"./assets/Script/tg/WalletMgr":170,"./assets/Script/tg/ApiService":178,"./assets/Script/ui/earnProgress":37,"./assets/Script/ui/earningBtn":169,"./assets/Script/ui/savingPotBtn":173,"./assets/Script/ui/taskProgress":176,"./assets/Script/ui/turretBuy":174,"./assets/Script/ui/turretLevel":180,"./assets/Script/ui/turretRecycle":177,"./assets/Script/ui/ui":181,"./assets/Script/ui/autoBtn":182,"./assets/Script/util/Tools":38,"./assets/Script/util/tool":183,"./assets/Script/util/util":186,"./assets/Script/util/TimeTools":184,"./assets/Script/PageManage":179,"./assets/prefab/tool/script/Progress":187,"./assets/prefab/tool/script/autoScroller":194,"./assets/prefab/tool/script/btn":193},"path":"preview-scripts/__qc_index__.js"},{"deps":{"./LanguageData":40},"path":"preview-scripts/assets/Script/Language/LocalizedLabel.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Loading.js"},{"deps":{"../../util/util":186},"path":"preview-scripts/assets/Script/effect/turret/turretEffect.js"},{"deps":{"../../common/NameTs":51},"path":"preview-scripts/assets/Script/game/levelBox/levelLabelItem.js"},{"deps":{"./../Utils/PxTransUtils":160,"../Adapter/PlatformFactory":192,"../Adapter/Type/AdStatus":7,"../../../common/NameTs":51},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js"},{"deps":{"../../util/util":186,"../UrlConst":144,"../xmsdk_cocos/Config/AppInfo":31,"../xmsdk_cocos/Utils/md5":171},"path":"preview-scripts/assets/Script/server/ServerMgr/Ajax.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js"},{"deps":{"../Assist/AssistCtr":9,"../common/AdPosition":61,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js"},{"deps":{"../common/AdPosition":61,"../common/NameTs":51,"../common/PropConst":53,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/AD/AdUtil":189,"../util/util":186},"path":"preview-scripts/assets/Script/Assist/AssistCtr.js"},{"deps":{"./common/NameTs":51,"./util/Tools":38},"path":"preview-scripts/assets/Script/soundController.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/Singleton.js"},{"deps":{"../server/xmsdk_cocos/XMSDK":159},"path":"preview-scripts/assets/Script/TrackMgr/TrackMgr.js"},{"deps":{"../common/faceTs":57,"../util/util":186},"path":"preview-scripts/assets/Script/controlelr/RewardController.js"},{"deps":{},"path":"preview-scripts/assets/Script/data/userData.js"},{"deps":{"../../common/NameTs":51,"../ModelFunc":60},"path":"preview-scripts/assets/Script/effect/model/EffectToolFrozen.js"},{"deps":{"../../common/NameTs":51,"../../util/util":186},"path":"preview-scripts/assets/Script/game/monster/monsterHp.js"},{"deps":{"../../base/baseTs":49,"../../common/faceTs":57,"../../util/util":186},"path":"preview-scripts/assets/Script/game/pool/poolBox.js"},{"deps":{"../../common/NameTs":51,"../../util/Tools":38,"../../util/util":186},"path":"preview-scripts/assets/Script/game/place/placeItem.js"},{"deps":{"../../common/NameTs":51,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt.js"},{"deps":{"../../common/NameTs":51,"../../soundController":10},"path":"preview-scripts/assets/Script/game/shop/shopItem2.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/heaven/heavenItem.js"},{"deps":{"../../base/baseTs":49,"../../common/NameTs":51,"../../util/util":186},"path":"preview-scripts/assets/Script/game/tuJian/tuJianItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/en.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/dragonBonesEditPlay.js"},{"deps":{"../Assist/AssistCtr":9,"../common/NameTs":51,"../common/pageTs":55,"../controlelr/RedController":63,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/Marquee.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameCoinReward.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/prop/propItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js"},{"deps":{},"path":"preview-scripts/assets/Script/spine/spineParticle.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js"},{"deps":{"../Assist/AssistCtr":9,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../Language/LanguageData":40,"../PageManage":179,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/task/taskItem.js"},{"deps":{"../base/Singleton":11},"path":"preview-scripts/assets/Script/tg/Global.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/ui/earnProgress.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/Tools.js"},{"deps":{"./base/baseTs":49,"./base/jsonSingleton":52,"./common/NameTs":51,"./Language/LanguageData":40,"./PageManage":179,"./soundController":10,"./util/Tools":38,"./util/util":186},"path":"preview-scripts/assets/Script/CanvasController.js"},{"deps":{},"path":"preview-scripts/assets/Script/Language/LanguageData.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js"},{"deps":{"./LanguageData":40},"path":"preview-scripts/assets/Script/Language/LocalizedSprite.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186,"./NewBigWheelPrize":47},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js"},{"deps":{},"path":"preview-scripts/assets/Script/TrackMgr/TrackEnum.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js"},{"deps":{"../Assist/AssistCtr":9,"../common/AdPosition":61,"../common/faceTs":57,"../controlelr/RewardController":13,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js"},{"deps":{"../Assist/AssistCtr":9,"../common/AdPosition":61,"../common/NameTs":51,"../controlelr/RewardController":13,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186,"./NewBigWheelPrizeAward":45},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js"},{"deps":{"../soundController":10,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js"},{"deps":{"../PageManage":179},"path":"preview-scripts/assets/Script/base/baseTs.js"},{"deps":{"./Singleton":11},"path":"preview-scripts/assets/Script/base/UIManager.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/NameTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/jsonSingleton.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PropConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Act_Rotate.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pageTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/TimerMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/faceTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pool.js"},{"deps":{"../util/Tools":38},"path":"preview-scripts/assets/Script/base/AStart.js"},{"deps":{},"path":"preview-scripts/assets/Script/effect/ModelFunc.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/AdPosition.js"},{"deps":{"./pool":58},"path":"preview-scripts/assets/Script/common/scrollTs.js"},{"deps":{"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/controlelr/RedController.js"},{"deps":{"../common/NameTs":51,"./ModelFunc":60},"path":"preview-scripts/assets/Script/effect/GameEffect.js"},{"deps":{"../base/baseTs":49,"../common/faceTs":57,"../common/NameTs":51,"../common/pool":58,"../soundController":10,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/effect/effect.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/bulletBox.js"},{"deps":{"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../common/pool":58,"../server/UrlConst":144,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/game/heavenBox.js"},{"deps":{"../../common/NameTs":51,"../ModelFunc":60},"path":"preview-scripts/assets/Script/effect/model/EffectToolShock.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hurtBox.js"},{"deps":{"../../common/NameTs":51,"../ModelFunc":60},"path":"preview-scripts/assets/Script/effect/model/EffectToolCls.js"},{"deps":{"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hpBox.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hurtCirtBox.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/levelBgBox.js"},{"deps":{"../base/AStart":59,"../base/baseTs":49,"../common/faceTs":57,"../common/NameTs":51,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/game/monsterBox.js"},{"deps":{"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/shadowBox.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/faceTs":57,"../common/NameTs":51,"../common/pageTs":55,"../controlelr/RedController":63,"../effect/GameEffect":64,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/game/game.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/levelLabelBox.js"},{"deps":{"../common/faceTs":57,"../common/NameTs":51,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/game/monsterFactory.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/faceTs":57,"../common/NameTs":51,"../Language/LanguageData":40,"../util/util":186,"./turret/turret":88},"path":"preview-scripts/assets/Script/game/turretBox.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/game/treasureBox.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../util/util":186,"./turret/turret":88},"path":"preview-scripts/assets/Script/game/turretHost.js"},{"deps":{"../../common/NameTs":51},"path":"preview-scripts/assets/Script/game/levelBox/levelBgItem.js"},{"deps":{"../common/NameTs":51,"../common/pool":58},"path":"preview-scripts/assets/Script/game/bloodBox.js"},{"deps":{"../common/faceTs":57,"../common/NameTs":51,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/game/turretFactory.js"},{"deps":{"../../common/NameTs":51,"../../util/util":186},"path":"preview-scripts/assets/Script/game/monster/monsterShadow.js"},{"deps":{"../../common/NameTs":51,"../../soundController":10},"path":"preview-scripts/assets/Script/game/shop/shopItem1.js"},{"deps":{"../../common/NameTs":51},"path":"preview-scripts/assets/Script/game/monster/monsterBlood.js"},{"deps":{"../../common/faceTs":57,"../../common/NameTs":51,"../../common/pageTs":55,"../../TrackMgr/TrackMgr":12,"../../util/util":186,"../turretFactory":84},"path":"preview-scripts/assets/Script/game/turret/turret.js"},{"deps":{"../../common/NameTs":51,"../../util/Tools":38,"../../util/util":186,"../monsterFactory":78},"path":"preview-scripts/assets/Script/game/monster/monster.js"},{"deps":{"../../common/NameTs":51,"../../Language/LanguageData":40,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt2.js"},{"deps":{"../../common/faceTs":57,"../../common/NameTs":51,"../../util/Tools":38,"../../util/util":186},"path":"preview-scripts/assets/Script/game/turret/turretBullet.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/id.js"},{"deps":{"../../common/NameTs":51,"../../util/util":186},"path":"preview-scripts/assets/Script/game/turret/BulletBoom.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zh.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/th.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ru.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zhHant.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ar.js"},{"deps":{"../base/baseTs":49},"path":"preview-scripts/assets/Script/model/ModelTip.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/SkeletonExt.js"},{"deps":{"../Assist/AssistCtr":9,"../common/NameTs":51,"../common/pageTs":55,"../PageManage":179,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/model/NewPlayerTaskModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/SignModel.js"},{"deps":{"../Assist/AssistCtr":9,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../util/util":186},"path":"preview-scripts/assets/Script/model/BtnRandomRed.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/WalletRecord.js"},{"deps":{"../common/NameTs":51},"path":"preview-scripts/assets/Script/model/TipBox.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameEnd.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/tganalytics.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameEarnPro.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameDetention.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/tool":183,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameEarnings.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../Language/LanguageData":40,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGetVideoTurret.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../Language/LanguageData":40,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGetOtherTurret.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../Language/LanguageData":40,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGetTurret.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../controlelr/RewardController":13,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGoldWheelReward.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGuide.js"},{"deps":{"../soundController":10,"../common/NameTs":51,"../server/xmsdk_cocos/XMSDK":159,"../server/UrlConst":144,"../util/util":186,"../server/xmsdk_cocos/AD/AdController":147,"../common/AdPosition":61,"../common/faceTs":57,"../base/baseTs":49,"./gameGoldWheelReward":114,"../controlelr/RewardController":13,"../TrackMgr/TrackMgr":12,"../common/pageTs":55,"../controlelr/RedController":63,"../Assist/AssistCtr":9},"path":"preview-scripts/assets/Script/pop/gameGoldWheel.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameGuide2.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameHeavenReward.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../model/Marquee":26,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameKingPao.js"},{"deps":{"../base/baseTs":49,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/pop/gameNetworkLost.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../PageManage":179,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/pop/gameKingPaoProgress.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameOffline.js"},{"deps":{"../../prefab/tool/script/Progress":187,"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/NameTs":51,"../model/NewPlayerTaskModel":101,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameNewPlayerTask.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/xmsdk_cocos/AD/AdController":147,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameOnLinePrize.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gamePassReward2.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js"},{"deps":{"../base/baseTs":49,"../base/jsonSingleton":52,"../common/NameTs":51,"../prop/propItem":28,"../soundController":10},"path":"preview-scripts/assets/Script/pop/gameProp.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gamePass.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gamePassReward.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../prop/propItem":28,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gamePropBox.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameRandomRedPrize.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameStart.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/faceTs":57,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/tool":183,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameSavingPot.js"},{"deps":{"../base/baseTs":49,"../Language/LanguageData":40,"../soundController":10,"../util/Tools":38},"path":"preview-scripts/assets/Script/pop/gameSet.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameSign.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameSignReward.js"},{"deps":{"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../server/UrlConst":144,"../soundController":10,"../task/taskItem":35,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameTask.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../TrackMgr/TrackMgr":12,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameToolGet.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../common/pageTs":55,"../Language/LanguageData":40,"../PageManage":179,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameTaskReward.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameTreasure.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../common/pageTs":55,"../Language/LanguageData":40,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameUpgrade.js"},{"deps":{},"path":"preview-scripts/assets/Script/prop/PropContent.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/NameTs":51,"../Language/LanguageData":40,"../server/xmsdk_cocos/AD/AdController":147,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameTurretRandomRed.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/UrlConst.js"},{"deps":{"../base/baseTs":49,"../model/WalletRecord":104,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10},"path":"preview-scripts/assets/Script/pop/gameWalletRecord.js"},{"deps":{"../base/baseTs":49,"../base/jsonSingleton":52,"../common/NameTs":51,"../common/scrollTs":62,"../game/tuJian/tuJianItem":22,"../soundController":10,"../TrackMgr/TrackMgr":12},"path":"preview-scripts/assets/Script/pop/gameTuJian.js"},{"deps":{"../../../common/NameTs":51,"../../../common/pageTs":55,"../../../util/util":186,"../XMSDK":159,"./AdUtil":189,"./AdviewUtil":5},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51},"path":"preview-scripts/assets/Script/pop/gameAdLoading.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/AdPosition":61,"../common/faceTs":57,"../common/NameTs":51,"../common/pageTs":55,"../common/pool":58,"../Language/LanguageData":40,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/pop/gameWallet.js"},{"deps":{"./rsa":185,"./Type/AdStatus":7,"../Config/AppInfo":31,"../mock1":151,"../Utils/PxTransUtils":160},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/mock1.js"},{"deps":{"./Bridge/AndroidCocosBridge":30,"../Config/AppInfo":31,"../mock1":151},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType.js"},{"deps":{"./../Config/AppInfo":31,"./../Adapter/PlatformFactory":192},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType.js"},{"deps":{"./Config/AppInfo":31,"./Adapter/PlatformFactory":192,"./AD/AdUtil":189,"./AD/AdviewUtil":5,"./Utils/XMLoad":164,"../ServerMgr/Ajax":6,"../../Assist/AssistCtr":9},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js"},{"deps":{"../XMSDK":159},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js"},{"deps":{"./XMLoad":164},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/LoadObject.js"},{"deps":{"./XMToast":168},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ToastObject.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js"},{"deps":{"./LoadObject":161},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js"},{"deps":{"./Loading":34},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMUtils.js"},{"deps":{"../../../common/NameTs":51,"../../../soundController":10,"../Adapter/PlatformFactory":192,"../Config/AppInfo":31},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js"},{"deps":{"./ToastObject":162},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js"},{"deps":{"../common/NameTs":51,"../util/tool":183},"path":"preview-scripts/assets/Script/ui/earningBtn.js"},{"deps":{"../base/Singleton":11},"path":"preview-scripts/assets/Script/tg/WalletMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/md5.js"},{"deps":{"../Assist/AssistCtr":9,"../base/Singleton":11,"../Language/LanguageData":40,"../PageManage":179,"../util/TimeTools":184,"./ApiService":178,"./Global":36},"path":"preview-scripts/assets/Script/tg/TelegramPlatform.js"},{"deps":{"../Assist/AssistCtr":9,"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../server/UrlConst":144,"../soundController":10,"../util/tool":183,"../util/util":186},"path":"preview-scripts/assets/Script/ui/savingPotBtn.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../soundController":10,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/ui/turretBuy.js"},{"deps":{"../Language/LanguageData":40},"path":"preview-scripts/assets/Script/tg/HttpClient.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../common/pageTs":55,"../TrackMgr/TrackMgr":12,"../util/util":186},"path":"preview-scripts/assets/Script/ui/taskProgress.js"},{"deps":{"../base/baseTs":49,"../common/NameTs":51,"../util/util":186},"path":"preview-scripts/assets/Script/ui/turretRecycle.js"},{"deps":{"../Language/LanguageData":40,"./Global":36,"./HttpClient":175,"./WalletMgr":170},"path":"preview-scripts/assets/Script/tg/ApiService.js"},{"deps":{"./common/custon/Loading":2,"./common/faceTs":57,"./common/NameTs":51,"./common/pageTs":55,"./util/util":186},"path":"preview-scripts/assets/Script/PageManage.js"},{"deps":{"../base/baseTs":49,"../util/util":186},"path":"preview-scripts/assets/Script/ui/turretLevel.js"},{"deps":{"../common/faceTs":57,"../common/NameTs":51,"../common/pageTs":55,"../controlelr/RedController":63,"../PageManage":179,"../server/UrlConst":144,"../server/xmsdk_cocos/XMSDK":159,"../soundController":10,"../util/util":186},"path":"preview-scripts/assets/Script/ui/ui.js"},{"deps":{"../Assist/AssistCtr":9,"../common/faceTs":57,"../soundController":10,"../util/Tools":38,"../util/util":186},"path":"preview-scripts/assets/Script/ui/autoBtn.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/tool.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/TimeTools.js"},{"deps":{"buffer":195},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/rsa.js"},{"deps":{"../common/faceTs":57,"../common/NameTs":51,"../base/jsonSingleton":52,"../Assist/TextCtr":190,"../server/xmsdk_cocos/XMSDK":159,"../server/UrlConst":144,"../server/xmsdk_cocos/AD/AdController":147,"../Assist/AssistCtr":9,"./Tools":38},"path":"preview-scripts/assets/Script/util/util.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/Progress.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/RandomCtr.js"},{"deps":{"../../../common/AdPosition":61,"../../../common/NameTs":51,"../Adapter/PlatformFactory":192,"../Adapter/Type/AdStatus":7,"../XMSDK":159},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/TextCtr.js"},{"deps":{"./Bridge/JsBridge":155,"../Config/AppInfo":31,"../mock1":151},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js"},{"deps":{"./PreviewPlatform":150,"./InnerWebPlatform":191,"./AndroidNativePlatform":152},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/btn.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/autoScroller.js"},{"deps":{"base64-js":196,"ieee754":197,"isarray":198},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"}];
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
    