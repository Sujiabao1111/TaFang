
(function () {
var scripts = [{"deps":{"./assets/Script/Language/LocalizedSprite":1,"./assets/Script/common/custon/Loading":2,"./assets/Script/effect/model/EffectToolFrozen":3,"./assets/Script/game/levelBox/levelLabelItem":4,"./assets/Script/server/xmsdk_cocos/AD/AdviewUtil":5,"./assets/Script/server/ServerMgr/Ajax":6,"./assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform":7,"./assets/Script/soundController":8,"./assets/Script/Assist/RandomCtr":9,"./assets/Script/NewBigWheel/NewBigWheelMarquee":10,"./assets/Script/TrackMgr/TrackMgr":11,"./assets/Script/base/Singleton":12,"./assets/Script/controlelr/RedController":13,"./assets/Script/data/userData":14,"./assets/Script/effect/turret/turretEffect":15,"./assets/Script/game/monster/monsterHp":16,"./assets/Script/game/pool/poolBox":17,"./assets/Script/game/place/placeItem":18,"./assets/Script/game/shop/shopItem1":19,"./assets/Script/game/turret/turret":20,"./assets/Script/game/tuJian/tuJianItem":21,"./assets/Script/i18n/en":22,"./assets/Script/heaven/heavenItem":23,"./assets/Script/model/NewPlayerTaskModel":24,"./assets/Script/js/dragonBonesEditPlay":25,"./assets/Script/onPrizeGet/OnPrizeGet":26,"./assets/Script/pop/gameCoinReward":27,"./assets/Script/prop/propItem":28,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge":29,"./assets/Script/server/xmsdk_cocos/Config/AppInfo":30,"./assets/Script/server/xmsdk_cocos/Message/MessageCenter":31,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus":32,"./assets/Script/server/xmsdk_cocos/Utils/LoadObject":33,"./assets/Script/spine/spineParticle":34,"./assets/Script/task/taskItem":35,"./assets/Script/tg/TelegramPlatform":36,"./assets/Script/ui/earnProgress":37,"./assets/Script/util/Tools":38,"./assets/Script/CanvasController":39,"./assets/Script/Language/LanguageData":40,"./assets/Script/NewBigWheel/NewBigTaskItem":41,"./assets/Script/NewBigWheel/NewBigWheelPrizeAward":42,"./assets/Script/NewBigWheel/NewBigWheelChou":43,"./assets/Script/base/UIManager":44,"./assets/Script/NewBigWheel/NewBigWheelPrize":45,"./assets/Script/NewBigWheel/BigWheelRuleModal":46,"./assets/Script/TrackMgr/TrackEnum":47,"./assets/Script/NewBigWheel/NewBigWheelController":48,"./assets/Script/common/NameTs":49,"./assets/Script/base/AStart":50,"./assets/Script/base/jsonSingleton":51,"./assets/Script/base/baseTs":52,"./assets/Script/common/faceTs":53,"./assets/Script/common/pageTs":54,"./assets/Script/controlelr/RewardController":55,"./assets/Script/common/PropConst":56,"./assets/Script/common/custon/TimerMgr":57,"./assets/Script/common/custon/Act_Rotate":58,"./assets/Script/common/pool":59,"./assets/Script/common/AdPosition":60,"./assets/Script/common/scrollTs":61,"./assets/Script/effect/ModelFunc":62,"./assets/Script/effect/GameEffect":63,"./assets/Script/game/bulletBox":64,"./assets/Script/game/hurtBox":65,"./assets/Script/effect/effect":66,"./assets/Script/effect/model/EffectToolShock":67,"./assets/Script/effect/model/EffectToolCls":68,"./assets/Script/game/game":69,"./assets/Script/game/hpBox":70,"./assets/Script/game/hurtCirtBox":71,"./assets/Script/game/levelBgBox":72,"./assets/Script/game/heavenBox":73,"./assets/Script/game/levelLabelBox":74,"./assets/Script/game/monsterBox":75,"./assets/Script/game/treasureBox":76,"./assets/Script/game/shadowBox":77,"./assets/Script/game/levelBox/levelBgItem":78,"./assets/Script/game/turretHost":79,"./assets/Script/game/monsterFactory":80,"./assets/Script/game/turretFactory":81,"./assets/Script/game/bloodBox":82,"./assets/Script/game/turretBox":83,"./assets/Script/game/monster/monsterBlood":84,"./assets/Script/game/shop/shopItem2":85,"./assets/Script/game/turret/BulletBoom":86,"./assets/Script/game/turret/turretHurt":87,"./assets/Script/game/monster/monsterShadow":88,"./assets/Script/game/monster/monster":89,"./assets/Script/i18n/id":90,"./assets/Script/game/turret/turretBullet":91,"./assets/Script/game/turret/turretHurt2":92,"./assets/Script/i18n/ru":93,"./assets/Script/i18n/zh":94,"./assets/Script/i18n/th":95,"./assets/Script/js/SkeletonExt":96,"./assets/Script/i18n/zhHant":97,"./assets/Script/model/Marquee":98,"./assets/Script/i18n/ar":99,"./assets/Script/model/ModelTip":100,"./assets/Script/model/SignModel":101,"./assets/Script/model/WalletRecord":102,"./assets/Script/pop/gameDetention":103,"./assets/Script/js/tganalytics":104,"./assets/Script/model/TipBox":105,"./assets/Script/model/BtnRandomRed":106,"./assets/Script/pop/gameEnd":107,"./assets/Script/pop/gameEarnPro":108,"./assets/Script/pop/gameGetOtherTurret":109,"./assets/Script/pop/gameEarnings":110,"./assets/Script/pop/gameGuide":111,"./assets/Script/pop/gameGetVideoTurret":112,"./assets/Script/pop/gameGoldWheel":113,"./assets/Script/pop/gameGoldWheelReward":114,"./assets/Script/pop/gameGetTurret":115,"./assets/Script/pop/gameKingPao":116,"./assets/Script/pop/gameHeavenReward":117,"./assets/Script/pop/gameKingPaoProgress":118,"./assets/Script/pop/gameGuide2":119,"./assets/Script/pop/gameNewPlayerTask":120,"./assets/Script/pop/gameNetworkLost":121,"./assets/Script/pop/gameOffline":122,"./assets/Script/pop/gameOnLinePrize":123,"./assets/Script/pop/gamePass":124,"./assets/Script/pop/gamePassReward":125,"./assets/Script/pop/gameOnPrizeGetReward":126,"./assets/Script/pop/gamePropBox":127,"./assets/Script/pop/gameProp":128,"./assets/Script/pop/gamePassReward2":129,"./assets/Script/pop/gameSavingPot":130,"./assets/Script/pop/gameSet":131,"./assets/Script/pop/gameSign":132,"./assets/Script/pop/gameRandomRedPrize":133,"./assets/Script/pop/gameSignReward":134,"./assets/Script/pop/gameStart":135,"./assets/Script/pop/gameToolGet":136,"./assets/Script/pop/gameTaskReward":137,"./assets/Script/pop/gameTuJian":138,"./assets/Script/pop/gameTask":139,"./assets/Script/pop/gameTreasure":140,"./assets/Script/pop/gameTurretRandomRed":141,"./assets/Script/pop/gameWallet":142,"./assets/Script/pop/gameUpgrade":143,"./assets/Script/server/xmsdk_cocos/AD/AdController":144,"./assets/Script/server/xmsdk_cocos/mock1":145,"./assets/Script/pop/gameWalletRecord":146,"./assets/Script/pop/gameAdLoading":147,"./assets/Script/prop/PropContent":148,"./assets/Script/server/UrlConst":149,"./assets/Script/server/xmsdk_cocos/AD/AdUtil":150,"./assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform":151,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge":152,"./assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory":153,"./assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform":154,"./assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform":155,"./assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType":156,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig":157,"./assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt":158,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType":159,"./assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType":160,"./assets/Script/server/xmsdk_cocos/XMSDK":161,"./assets/Script/server/xmsdk_cocos/Utils/Loading":162,"./assets/Script/server/xmsdk_cocos/Utils/Storage":163,"./assets/Script/server/xmsdk_cocos/Utils/PxTransUtils":164,"./assets/Script/server/xmsdk_cocos/Utils/ToastObject":165,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad2":166,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad":167,"./assets/Script/server/xmsdk_cocos/Utils/XMToast":168,"./assets/Script/server/xmsdk_cocos/Utils/md5":169,"./assets/Script/tg/Global":170,"./assets/Script/server/xmsdk_cocos/Utils/Init":171,"./assets/Script/tg/HttpClient":172,"./assets/Script/server/xmsdk_cocos/Utils/XMUtils":173,"./assets/Script/tg/WalletMgr":174,"./assets/Script/ui/taskProgress":175,"./assets/Script/ui/turretBuy":176,"./assets/Script/ui/savingPotBtn":177,"./assets/Script/ui/earningBtn":178,"./assets/Script/ui/turretRecycle":179,"./assets/Script/ui/ui":180,"./assets/Script/ui/autoBtn":181,"./assets/Script/PageManage":182,"./assets/Script/util/TimeTools":183,"./assets/Script/ui/turretLevel":184,"./assets/Script/tg/ApiService":185,"./assets/Script/util/tool":186,"./assets/Script/util/util":188,"./assets/prefab/tool/script/Progress":189,"./assets/Script/Assist/TextCtr":190,"./assets/Script/Assist/AssistCtr":191,"./assets/Script/Language/LocalizedLabel":192,"./assets/prefab/tool/script/autoScroller":193,"./assets/prefab/tool/script/btn":194,"./assets/Script/server/xmsdk_cocos/Adapter/rsa":187},"path":"preview-scripts/__qc_index__.js"},{"deps":{"./LanguageData":40},"path":"preview-scripts/assets/Script/Language/LocalizedSprite.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Loading.js"},{"deps":{"../../common/NameTs":49,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolFrozen.js"},{"deps":{"../../common/NameTs":49},"path":"preview-scripts/assets/Script/game/levelBox/levelLabelItem.js"},{"deps":{"./../Utils/PxTransUtils":164,"../Adapter/PlatformFactory":153,"../Adapter/Type/AdStatus":32,"../../../common/NameTs":49},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js"},{"deps":{"../../util/util":188,"../UrlConst":149,"../xmsdk_cocos/Config/AppInfo":30,"../xmsdk_cocos/Utils/md5":169},"path":"preview-scripts/assets/Script/server/ServerMgr/Ajax.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform.js"},{"deps":{"./common/NameTs":49,"./util/Tools":38},"path":"preview-scripts/assets/Script/soundController.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/RandomCtr.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js"},{"deps":{"../server/xmsdk_cocos/XMSDK":161},"path":"preview-scripts/assets/Script/TrackMgr/TrackMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/Singleton.js"},{"deps":{"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/controlelr/RedController.js"},{"deps":{},"path":"preview-scripts/assets/Script/data/userData.js"},{"deps":{"../../util/util":188},"path":"preview-scripts/assets/Script/effect/turret/turretEffect.js"},{"deps":{"../../common/NameTs":49,"../../util/util":188},"path":"preview-scripts/assets/Script/game/monster/monsterHp.js"},{"deps":{"../../base/baseTs":52,"../../common/faceTs":53,"../../util/util":188},"path":"preview-scripts/assets/Script/game/pool/poolBox.js"},{"deps":{"../../common/NameTs":49,"../../util/Tools":38,"../../util/util":188},"path":"preview-scripts/assets/Script/game/place/placeItem.js"},{"deps":{"../../common/NameTs":49,"../../soundController":8},"path":"preview-scripts/assets/Script/game/shop/shopItem1.js"},{"deps":{"../../common/faceTs":53,"../../common/NameTs":49,"../../common/pageTs":54,"../../TrackMgr/TrackMgr":11,"../../util/util":188,"../turretFactory":81},"path":"preview-scripts/assets/Script/game/turret/turret.js"},{"deps":{"../../base/baseTs":52,"../../common/NameTs":49,"../../util/util":188},"path":"preview-scripts/assets/Script/game/tuJian/tuJianItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/en.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/heaven/heavenItem.js"},{"deps":{"../Assist/AssistCtr":191,"../common/NameTs":49,"../common/pageTs":54,"../PageManage":182,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/model/NewPlayerTaskModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/dragonBonesEditPlay.js"},{"deps":{"../Assist/AssistCtr":191,"../common/NameTs":49,"../common/pageTs":54,"../controlelr/RedController":13,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameCoinReward.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/prop/propItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js"},{"deps":{"./XMLoad":167},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/LoadObject.js"},{"deps":{},"path":"preview-scripts/assets/Script/spine/spineParticle.js"},{"deps":{"../Assist/AssistCtr":191,"../common/NameTs":49,"../common/pageTs":54,"../Language/LanguageData":40,"../PageManage":182,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/task/taskItem.js"},{"deps":{"../Assist/AssistCtr":191,"../base/Singleton":12,"../Language/LanguageData":40,"../PageManage":182,"../util/TimeTools":183,"./ApiService":185,"./Global":170},"path":"preview-scripts/assets/Script/tg/TelegramPlatform.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/ui/earnProgress.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/Tools.js"},{"deps":{"./base/baseTs":52,"./base/jsonSingleton":51,"./common/NameTs":49,"./Language/LanguageData":40,"./PageManage":182,"./soundController":8,"./util/Tools":38,"./util/util":188},"path":"preview-scripts/assets/Script/CanvasController.js"},{"deps":{},"path":"preview-scripts/assets/Script/Language/LanguageData.js"},{"deps":{"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js"},{"deps":{"../common/faceTs":53,"../controlelr/RewardController":55,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js"},{"deps":{"./Singleton":12},"path":"preview-scripts/assets/Script/base/UIManager.js"},{"deps":{"../common/NameTs":49,"../controlelr/RewardController":55,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188,"./NewBigWheelPrizeAward":42},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js"},{"deps":{"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js"},{"deps":{},"path":"preview-scripts/assets/Script/TrackMgr/TrackEnum.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188,"./NewBigWheelPrize":45},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/NameTs.js"},{"deps":{"../util/Tools":38},"path":"preview-scripts/assets/Script/base/AStart.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/jsonSingleton.js"},{"deps":{"../PageManage":182},"path":"preview-scripts/assets/Script/base/baseTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/faceTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pageTs.js"},{"deps":{"../common/faceTs":53,"../util/util":188},"path":"preview-scripts/assets/Script/controlelr/RewardController.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PropConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/TimerMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Act_Rotate.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pool.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/AdPosition.js"},{"deps":{"./pool":59},"path":"preview-scripts/assets/Script/common/scrollTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/effect/ModelFunc.js"},{"deps":{"../common/NameTs":49,"./ModelFunc":62},"path":"preview-scripts/assets/Script/effect/GameEffect.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/bulletBox.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/hurtBox.js"},{"deps":{"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../common/pool":59,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/effect/effect.js"},{"deps":{"../../common/NameTs":49,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolShock.js"},{"deps":{"../../common/NameTs":49,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolCls.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../common/pageTs":54,"../controlelr/RedController":13,"../effect/GameEffect":63,"../Language/LanguageData":40,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/game/game.js"},{"deps":{"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/hpBox.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/hurtCirtBox.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/levelBgBox.js"},{"deps":{"../common/faceTs":53,"../common/NameTs":49,"../common/pool":59,"../server/UrlConst":149,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/game/heavenBox.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/levelLabelBox.js"},{"deps":{"../base/AStart":50,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/game/monsterBox.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/game/treasureBox.js"},{"deps":{"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/shadowBox.js"},{"deps":{"../../common/NameTs":49},"path":"preview-scripts/assets/Script/game/levelBox/levelBgItem.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../util/util":188,"./turret/turret":20},"path":"preview-scripts/assets/Script/game/turretHost.js"},{"deps":{"../common/faceTs":53,"../common/NameTs":49,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/game/monsterFactory.js"},{"deps":{"../common/faceTs":53,"../common/NameTs":49,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/game/turretFactory.js"},{"deps":{"../common/NameTs":49,"../common/pool":59},"path":"preview-scripts/assets/Script/game/bloodBox.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../Language/LanguageData":40,"../util/util":188,"./turret/turret":20},"path":"preview-scripts/assets/Script/game/turretBox.js"},{"deps":{"../../common/NameTs":49},"path":"preview-scripts/assets/Script/game/monster/monsterBlood.js"},{"deps":{"../../common/NameTs":49,"../../soundController":8},"path":"preview-scripts/assets/Script/game/shop/shopItem2.js"},{"deps":{"../../common/NameTs":49,"../../util/util":188},"path":"preview-scripts/assets/Script/game/turret/BulletBoom.js"},{"deps":{"../../common/NameTs":49,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt.js"},{"deps":{"../../common/NameTs":49,"../../util/util":188},"path":"preview-scripts/assets/Script/game/monster/monsterShadow.js"},{"deps":{"../../common/NameTs":49,"../../util/Tools":38,"../../util/util":188,"../monsterFactory":80},"path":"preview-scripts/assets/Script/game/monster/monster.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/id.js"},{"deps":{"../../common/faceTs":53,"../../common/NameTs":49,"../../util/Tools":38,"../../util/util":188},"path":"preview-scripts/assets/Script/game/turret/turretBullet.js"},{"deps":{"../../common/NameTs":49,"../../Language/LanguageData":40,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt2.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ru.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zh.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/th.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/SkeletonExt.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zhHant.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/Marquee.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ar.js"},{"deps":{"../base/baseTs":52},"path":"preview-scripts/assets/Script/model/ModelTip.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/SignModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/WalletRecord.js"},{"deps":{"../base/baseTs":52,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameDetention.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/tganalytics.js"},{"deps":{"../common/NameTs":49},"path":"preview-scripts/assets/Script/model/TipBox.js"},{"deps":{"../Assist/AssistCtr":191,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../util/util":188},"path":"preview-scripts/assets/Script/model/BtnRandomRed.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameEnd.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameEarnPro.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../Language/LanguageData":40,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGetOtherTurret.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/tool":186,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameEarnings.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGuide.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../Language/LanguageData":40,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGetVideoTurret.js"},{"deps":{"../soundController":8,"../common/NameTs":49,"../server/xmsdk_cocos/XMSDK":161,"../server/UrlConst":149,"../util/util":188,"../common/faceTs":53,"../base/baseTs":52,"./gameGoldWheelReward":114,"../controlelr/RewardController":55,"../TrackMgr/TrackMgr":11,"../common/pageTs":54,"../controlelr/RedController":13,"../Assist/AssistCtr":191},"path":"preview-scripts/assets/Script/pop/gameGoldWheel.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../controlelr/RewardController":55,"../Language/LanguageData":40,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGoldWheelReward.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../Language/LanguageData":40,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGetTurret.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../model/Marquee":98,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameKingPao.js"},{"deps":{"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameHeavenReward.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../PageManage":182,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameKingPaoProgress.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameGuide2.js"},{"deps":{"../../prefab/tool/script/Progress":189,"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../model/NewPlayerTaskModel":24,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameNewPlayerTask.js"},{"deps":{"../base/baseTs":52,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameNetworkLost.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameOffline.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameOnLinePrize.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../Language/LanguageData":40,"../server/UrlConst":149,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gamePass.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/xmsdk_cocos/AD/AdController":144,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gamePassReward.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../prop/propItem":28,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gamePropBox.js"},{"deps":{"../base/baseTs":52,"../base/jsonSingleton":51,"../common/NameTs":49,"../prop/propItem":28,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameProp.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../Language/LanguageData":40,"../server/UrlConst":149,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gamePassReward2.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/tool":186,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameSavingPot.js"},{"deps":{"../base/baseTs":52,"../Language/LanguageData":40,"../soundController":8,"../util/Tools":38},"path":"preview-scripts/assets/Script/pop/gameSet.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameSign.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameRandomRedPrize.js"},{"deps":{"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../Language/LanguageData":40,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameSignReward.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameStart.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../TrackMgr/TrackMgr":11,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameToolGet.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../common/pageTs":54,"../Language/LanguageData":40,"../PageManage":182,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameTaskReward.js"},{"deps":{"../base/baseTs":52,"../base/jsonSingleton":51,"../common/NameTs":49,"../common/scrollTs":61,"../game/tuJian/tuJianItem":21,"../soundController":8,"../TrackMgr/TrackMgr":11},"path":"preview-scripts/assets/Script/pop/gameTuJian.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../task/taskItem":35,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameTask.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../server/UrlConst":149,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameTreasure.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameTurretRandomRed.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/faceTs":53,"../common/NameTs":49,"../common/pool":59,"../Language/LanguageData":40,"../soundController":8,"../tg/ApiService":185,"../tg/Global":170,"../tg/WalletMgr":174,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameWallet.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/pop/gameUpgrade.js"},{"deps":{"../../../common/NameTs":49,"../../../common/pageTs":54,"../../../util/util":188,"../XMSDK":161,"./AdUtil":150,"./AdviewUtil":5},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/mock1.js"},{"deps":{"../base/baseTs":52,"../model/WalletRecord":102,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8},"path":"preview-scripts/assets/Script/pop/gameWalletRecord.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49},"path":"preview-scripts/assets/Script/pop/gameAdLoading.js"},{"deps":{},"path":"preview-scripts/assets/Script/prop/PropContent.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/UrlConst.js"},{"deps":{"../../../common/AdPosition":60,"../../../common/NameTs":49,"../Adapter/PlatformFactory":153,"../Adapter/Type/AdStatus":32,"../XMSDK":161},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js"},{"deps":{"./Bridge/JsBridge":152,"../Config/AppInfo":30,"../mock1":145},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js"},{"deps":{"./PreviewPlatform":155,"./InnerWebPlatform":151,"./AndroidNativePlatform":154},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js"},{"deps":{"./Bridge/AndroidCocosBridge":29,"../Config/AppInfo":30,"../mock1":145},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js"},{"deps":{"./rsa":187,"./Type/AdStatus":32,"../Config/AppInfo":30,"../mock1":145,"../Utils/PxTransUtils":164},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig.js"},{"deps":{"./../Config/AppInfo":30,"./../Adapter/PlatformFactory":153},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType.js"},{"deps":{"./Config/AppInfo":30,"./Adapter/PlatformFactory":153,"./AD/AdUtil":150,"./AD/AdviewUtil":5,"./Utils/XMLoad":167,"../ServerMgr/Ajax":6,"../../Assist/AssistCtr":191},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js"},{"deps":{"../XMSDK":161},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js"},{"deps":{"./XMToast":168},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ToastObject.js"},{"deps":{"./Loading":162},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js"},{"deps":{"./LoadObject":33},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js"},{"deps":{"./ToastObject":165},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/md5.js"},{"deps":{"../base/Singleton":12},"path":"preview-scripts/assets/Script/tg/Global.js"},{"deps":{"../../../common/NameTs":49,"../../../soundController":8,"../Adapter/PlatformFactory":153,"../Config/AppInfo":30},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js"},{"deps":{"../Language/LanguageData":40},"path":"preview-scripts/assets/Script/tg/HttpClient.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMUtils.js"},{"deps":{"../base/Singleton":12},"path":"preview-scripts/assets/Script/tg/WalletMgr.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../TrackMgr/TrackMgr":11,"../util/util":188},"path":"preview-scripts/assets/Script/ui/taskProgress.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/ui/turretBuy.js"},{"deps":{"../Assist/AssistCtr":191,"../base/baseTs":52,"../common/NameTs":49,"../common/pageTs":54,"../server/UrlConst":149,"../soundController":8,"../util/tool":186,"../util/util":188},"path":"preview-scripts/assets/Script/ui/savingPotBtn.js"},{"deps":{"../common/NameTs":49,"../util/tool":186},"path":"preview-scripts/assets/Script/ui/earningBtn.js"},{"deps":{"../base/baseTs":52,"../common/NameTs":49,"../util/util":188},"path":"preview-scripts/assets/Script/ui/turretRecycle.js"},{"deps":{"../common/faceTs":53,"../common/NameTs":49,"../common/pageTs":54,"../controlelr/RedController":13,"../PageManage":182,"../server/UrlConst":149,"../server/xmsdk_cocos/XMSDK":161,"../soundController":8,"../util/util":188},"path":"preview-scripts/assets/Script/ui/ui.js"},{"deps":{"../Assist/AssistCtr":191,"../common/faceTs":53,"../soundController":8,"../util/Tools":38,"../util/util":188},"path":"preview-scripts/assets/Script/ui/autoBtn.js"},{"deps":{"./common/custon/Loading":2,"./common/faceTs":53,"./common/NameTs":49,"./common/pageTs":54,"./util/util":188},"path":"preview-scripts/assets/Script/PageManage.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/TimeTools.js"},{"deps":{"../base/baseTs":52,"../util/util":188},"path":"preview-scripts/assets/Script/ui/turretLevel.js"},{"deps":{"../Assist/AssistCtr":191,"../Language/LanguageData":40,"./Global":170,"./HttpClient":172,"./WalletMgr":174},"path":"preview-scripts/assets/Script/tg/ApiService.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/tool.js"},{"deps":{"buffer":195},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/rsa.js"},{"deps":{"../common/faceTs":53,"../common/NameTs":49,"../base/jsonSingleton":51,"../Assist/TextCtr":190,"../server/xmsdk_cocos/XMSDK":161,"../server/UrlConst":149,"../server/xmsdk_cocos/AD/AdController":144,"../Assist/AssistCtr":191,"./Tools":38},"path":"preview-scripts/assets/Script/util/util.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/Progress.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/TextCtr.js"},{"deps":{"../common/NameTs":49,"../common/PropConst":56,"../server/xmsdk_cocos/AD/AdUtil":150},"path":"preview-scripts/assets/Script/Assist/AssistCtr.js"},{"deps":{"./LanguageData":40},"path":"preview-scripts/assets/Script/Language/LocalizedLabel.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/autoScroller.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/btn.js"},{"deps":{"base64-js":196,"ieee754":197,"isarray":198},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"}];
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
    