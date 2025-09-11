
(function () {
var scripts = [{"deps":{"./assets/Script/NewBigWheel/NewBigTaskItem":1,"./assets/Script/common/custon/Loading":2,"./assets/Script/effect/model/EffectToolShock":3,"./assets/Script/game/levelBox/levelLabelItem":4,"./assets/Script/server/xmsdk_cocos/AD/AdviewUtil":5,"./assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform":6,"./assets/Script/soundController":7,"./assets/Script/Language/LanguageData":8,"./assets/Script/TrackMgr/TrackEnum":9,"./assets/Script/base/baseTs":10,"./assets/Script/controlelr/RewardController":11,"./assets/Script/data/userData":12,"./assets/Script/effect/turret/turretEffect":13,"./assets/Script/game/monster/monsterShadow":14,"./assets/Script/game/place/placeItem":15,"./assets/Script/game/shop/shopItem1":16,"./assets/Script/game/pool/poolBox":17,"./assets/Script/heaven/heavenItem":18,"./assets/Script/game/tuJian/tuJianItem":19,"./assets/Script/game/turret/turret":20,"./assets/Script/i18n/id":21,"./assets/Script/js/dragonBonesEditPlay":22,"./assets/Script/model/Marquee":23,"./assets/Script/onPrizeGet/OnPrizeGet":24,"./assets/Script/pop/gameCoinReward":25,"./assets/Script/prop/propItem":26,"./assets/Script/server/ServerMgr/Ajax":27,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge":28,"./assets/Script/server/xmsdk_cocos/mock1":29,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus":30,"./assets/Script/server/xmsdk_cocos/Config/AppInfo":31,"./assets/Script/server/xmsdk_cocos/Utils/LoadObject":32,"./assets/Script/server/xmsdk_cocos/Message/MessageCenter":33,"./assets/Script/task/taskItem":34,"./assets/Script/tg/HttpClient":35,"./assets/Script/spine/spineParticle":36,"./assets/Script/ui/earnProgress":37,"./assets/Script/util/Tools":38,"./assets/Script/CanvasController":39,"./assets/Script/NewBigWheel/NewBigWheelPrizeAward":40,"./assets/Script/Language/LocalizedSprite":41,"./assets/Script/NewBigWheel/NewBigWheelPrize":42,"./assets/Script/NewBigWheel/NewBigWheelController":43,"./assets/Script/NewBigWheel/NewBigWheelChou":44,"./assets/Script/NewBigWheel/NewBigWheelMarquee":45,"./assets/Script/NewBigWheel/BigWheelRuleModal":46,"./assets/Script/TrackMgr/TrackMgr":47,"./assets/Script/base/jsonSingleton":48,"./assets/Script/base/Singleton":49,"./assets/Script/common/faceTs":50,"./assets/Script/base/UIManager":51,"./assets/Script/common/NameTs":52,"./assets/Script/base/AStart":53,"./assets/Script/common/PropConst":54,"./assets/Script/common/pageTs":55,"./assets/Script/common/custon/Act_Rotate":56,"./assets/Script/common/AdPosition":57,"./assets/Script/common/pool":58,"./assets/Script/common/scrollTs":59,"./assets/Script/common/custon/TimerMgr":60,"./assets/Script/controlelr/RedController":61,"./assets/Script/effect/ModelFunc":62,"./assets/Script/effect/effect":63,"./assets/Script/game/bulletBox":64,"./assets/Script/effect/model/EffectToolFrozen":65,"./assets/Script/effect/GameEffect":66,"./assets/Script/game/heavenBox":67,"./assets/Script/game/hpBox":68,"./assets/Script/effect/model/EffectToolCls":69,"./assets/Script/game/hurtCirtBox":70,"./assets/Script/game/hurtBox":71,"./assets/Script/game/levelBgBox":72,"./assets/Script/game/levelLabelBox":73,"./assets/Script/game/monsterBox":74,"./assets/Script/game/game":75,"./assets/Script/game/turretBox":76,"./assets/Script/game/treasureBox":77,"./assets/Script/game/monsterFactory":78,"./assets/Script/game/shadowBox":79,"./assets/Script/game/turretFactory":80,"./assets/Script/game/levelBox/levelBgItem":81,"./assets/Script/game/monster/monsterBlood":82,"./assets/Script/game/bloodBox":83,"./assets/Script/game/turretHost":84,"./assets/Script/game/monster/monsterHp":85,"./assets/Script/game/shop/shopItem2":86,"./assets/Script/game/monster/monster":87,"./assets/Script/game/turret/turretHurt":88,"./assets/Script/game/turret/BulletBoom":89,"./assets/Script/game/turret/turretBullet":90,"./assets/Script/i18n/en":91,"./assets/Script/i18n/th":92,"./assets/Script/game/turret/turretHurt2":93,"./assets/Script/i18n/ru":94,"./assets/Script/i18n/zhHant":95,"./assets/Script/i18n/ar":96,"./assets/Script/i18n/zh":97,"./assets/Script/model/ModelTip":98,"./assets/Script/js/SkeletonExt":99,"./assets/Script/model/TipBox":100,"./assets/Script/model/NewPlayerTaskModel":101,"./assets/Script/model/WalletRecord":102,"./assets/Script/model/SignModel":103,"./assets/Script/model/BtnRandomRed":104,"./assets/Script/pop/gameDetention":105,"./assets/Script/pop/gameEnd":106,"./assets/Script/pop/gameGetTurret":107,"./assets/Script/pop/gameEarnings":108,"./assets/Script/pop/gameGetOtherTurret":109,"./assets/Script/pop/gameGetVideoTurret":110,"./assets/Script/pop/gameHeavenReward":111,"./assets/Script/pop/gameGuide":112,"./assets/Script/pop/gameGoldWheelReward":113,"./assets/Script/js/tganalytics":114,"./assets/Script/pop/gameEarnPro":115,"./assets/Script/pop/gameKingPaoProgress":116,"./assets/Script/pop/gameGoldWheel":117,"./assets/Script/pop/gameGuide2":118,"./assets/Script/pop/gameNetworkLost":119,"./assets/Script/pop/gameOffline":120,"./assets/Script/pop/gameOnLinePrize":121,"./assets/Script/pop/gameNewPlayerTask":122,"./assets/Script/pop/gamePass":123,"./assets/Script/pop/gameKingPao":124,"./assets/Script/pop/gamePassReward2":125,"./assets/Script/pop/gameOnPrizeGetReward":126,"./assets/Script/pop/gamePassReward":127,"./assets/Script/pop/gameSet":128,"./assets/Script/pop/gameProp":129,"./assets/Script/pop/gamePropBox":130,"./assets/Script/pop/gameSavingPot":131,"./assets/Script/pop/gameRandomRedPrize":132,"./assets/Script/pop/gameSignReward":133,"./assets/Script/pop/gameStart":134,"./assets/Script/pop/gameTask":135,"./assets/Script/pop/gameTreasure":136,"./assets/Script/pop/gameTuJian":137,"./assets/Script/pop/gameTurretRandomRed":138,"./assets/Script/pop/gameTaskReward":139,"./assets/Script/pop/gameToolGet":140,"./assets/Script/pop/gameWallet":141,"./assets/Script/pop/gameSign":142,"./assets/Script/server/UrlConst":143,"./assets/Script/pop/gameUpgrade":144,"./assets/Script/pop/gameWalletRecord":145,"./assets/Script/pop/gameAdLoading":146,"./assets/Script/prop/PropContent":147,"./assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory":148,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge":149,"./assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform":150,"./assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt":151,"./assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType":152,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType":153,"./assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform":154,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig":155,"./assets/Script/server/xmsdk_cocos/Utils/ToastObject":156,"./assets/Script/server/xmsdk_cocos/Utils/PxTransUtils":157,"./assets/Script/server/xmsdk_cocos/Utils/Loading":158,"./assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType":159,"./assets/Script/server/xmsdk_cocos/Utils/XMToast":160,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad":161,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad2":162,"./assets/Script/server/xmsdk_cocos/Utils/XMUtils":163,"./assets/Script/server/xmsdk_cocos/XMSDK":164,"./assets/Script/server/xmsdk_cocos/Utils/Storage":165,"./assets/Script/server/xmsdk_cocos/Utils/md5":166,"./assets/Script/server/xmsdk_cocos/Utils/Init":167,"./assets/Script/tg/WalletMgr":168,"./assets/Script/tg/TelegramPlatform":169,"./assets/Script/ui/taskProgress":170,"./assets/Script/tg/Global":171,"./assets/Script/ui/turretBuy":172,"./assets/Script/ui/earningBtn":173,"./assets/Script/ui/savingPotBtn":174,"./assets/Script/ui/turretLevel":175,"./assets/Script/tg/ApiService":176,"./assets/Script/util/tool":177,"./assets/Script/ui/autoBtn":178,"./assets/Script/ui/turretRecycle":179,"./assets/Script/PageManage":180,"./assets/Script/util/TimeTools":181,"./assets/Script/ui/ui":182,"./assets/Script/util/util":183,"./assets/Script/Assist/TextCtr":185,"./assets/prefab/tool/script/Progress":186,"./assets/Script/Language/LocalizedLabel":187,"./assets/Script/Assist/AssistCtr":188,"./assets/Script/Assist/RandomCtr":189,"./assets/Script/server/xmsdk_cocos/AD/AdUtil":190,"./assets/Script/server/xmsdk_cocos/AD/AdController":191,"./assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform":192,"./assets/prefab/tool/script/autoScroller":193,"./assets/prefab/tool/script/btn":194,"./assets/Script/server/xmsdk_cocos/Adapter/rsa":184},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Loading.js"},{"deps":{"../../common/NameTs":52,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolShock.js"},{"deps":{"../../common/NameTs":52},"path":"preview-scripts/assets/Script/game/levelBox/levelLabelItem.js"},{"deps":{"./../Utils/PxTransUtils":157,"../Adapter/PlatformFactory":148,"../Adapter/Type/AdStatus":30,"../../../common/NameTs":52},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform.js"},{"deps":{"./common/NameTs":52,"./util/Tools":38},"path":"preview-scripts/assets/Script/soundController.js"},{"deps":{},"path":"preview-scripts/assets/Script/Language/LanguageData.js"},{"deps":{},"path":"preview-scripts/assets/Script/TrackMgr/TrackEnum.js"},{"deps":{"../PageManage":180},"path":"preview-scripts/assets/Script/base/baseTs.js"},{"deps":{"../common/faceTs":50,"../util/util":183},"path":"preview-scripts/assets/Script/controlelr/RewardController.js"},{"deps":{},"path":"preview-scripts/assets/Script/data/userData.js"},{"deps":{"../../util/util":183},"path":"preview-scripts/assets/Script/effect/turret/turretEffect.js"},{"deps":{"../../common/NameTs":52,"../../util/util":183},"path":"preview-scripts/assets/Script/game/monster/monsterShadow.js"},{"deps":{"../../common/NameTs":52,"../../util/Tools":38,"../../util/util":183},"path":"preview-scripts/assets/Script/game/place/placeItem.js"},{"deps":{"../../common/NameTs":52,"../../soundController":7},"path":"preview-scripts/assets/Script/game/shop/shopItem1.js"},{"deps":{"../../base/baseTs":10,"../../common/faceTs":50,"../../util/util":183},"path":"preview-scripts/assets/Script/game/pool/poolBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/heaven/heavenItem.js"},{"deps":{"../../base/baseTs":10,"../../common/NameTs":52,"../../util/util":183},"path":"preview-scripts/assets/Script/game/tuJian/tuJianItem.js"},{"deps":{"../../common/faceTs":50,"../../common/NameTs":52,"../../common/pageTs":55,"../../TrackMgr/TrackMgr":47,"../../util/util":183,"../turretFactory":80},"path":"preview-scripts/assets/Script/game/turret/turret.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/id.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/dragonBonesEditPlay.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/Marquee.js"},{"deps":{"../Assist/AssistCtr":188,"../common/NameTs":52,"../common/pageTs":55,"../controlelr/RedController":61,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../soundController":7},"path":"preview-scripts/assets/Script/pop/gameCoinReward.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/prop/propItem.js"},{"deps":{"../../util/util":183,"../UrlConst":143,"../xmsdk_cocos/Config/AppInfo":31,"../xmsdk_cocos/Utils/md5":166},"path":"preview-scripts/assets/Script/server/ServerMgr/Ajax.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/mock1.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js"},{"deps":{"./XMLoad":161},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/LoadObject.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js"},{"deps":{"../Assist/AssistCtr":188,"../common/NameTs":52,"../common/pageTs":55,"../Language/LanguageData":8,"../PageManage":180,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/task/taskItem.js"},{"deps":{"../Language/LanguageData":8},"path":"preview-scripts/assets/Script/tg/HttpClient.js"},{"deps":{},"path":"preview-scripts/assets/Script/spine/spineParticle.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/ui/earnProgress.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/Tools.js"},{"deps":{"./base/baseTs":10,"./base/jsonSingleton":48,"./common/NameTs":52,"./Language/LanguageData":8,"./PageManage":180,"./soundController":7,"./util/Tools":38,"./util/util":183},"path":"preview-scripts/assets/Script/CanvasController.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js"},{"deps":{"./LanguageData":8},"path":"preview-scripts/assets/Script/Language/LocalizedSprite.js"},{"deps":{"../common/NameTs":52,"../controlelr/RewardController":11,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183,"./NewBigWheelPrizeAward":40},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183,"./NewBigWheelPrize":42},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js"},{"deps":{"../common/faceTs":50,"../controlelr/RewardController":11,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js"},{"deps":{"../soundController":7,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js"},{"deps":{"../server/xmsdk_cocos/XMSDK":164},"path":"preview-scripts/assets/Script/TrackMgr/TrackMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/jsonSingleton.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/Singleton.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/faceTs.js"},{"deps":{"./Singleton":49},"path":"preview-scripts/assets/Script/base/UIManager.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/NameTs.js"},{"deps":{"../util/Tools":38},"path":"preview-scripts/assets/Script/base/AStart.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PropConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pageTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/Act_Rotate.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/AdPosition.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pool.js"},{"deps":{"./pool":58},"path":"preview-scripts/assets/Script/common/scrollTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/custon/TimerMgr.js"},{"deps":{"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/controlelr/RedController.js"},{"deps":{},"path":"preview-scripts/assets/Script/effect/ModelFunc.js"},{"deps":{"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../common/pool":58,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/effect/effect.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/bulletBox.js"},{"deps":{"../../common/NameTs":52,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolFrozen.js"},{"deps":{"../common/NameTs":52,"./ModelFunc":62},"path":"preview-scripts/assets/Script/effect/GameEffect.js"},{"deps":{"../common/faceTs":50,"../common/NameTs":52,"../common/pool":58,"../server/UrlConst":143,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/game/heavenBox.js"},{"deps":{"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hpBox.js"},{"deps":{"../../common/NameTs":52,"../ModelFunc":62},"path":"preview-scripts/assets/Script/effect/model/EffectToolCls.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hurtCirtBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/hurtBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/levelBgBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/levelLabelBox.js"},{"deps":{"../base/AStart":53,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/game/monsterBox.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../common/pageTs":55,"../controlelr/RedController":61,"../effect/GameEffect":66,"../Language/LanguageData":8,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/game/game.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../Language/LanguageData":8,"../util/util":183,"./turret/turret":20},"path":"preview-scripts/assets/Script/game/turretBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/game/treasureBox.js"},{"deps":{"../common/faceTs":50,"../common/NameTs":52,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/game/monsterFactory.js"},{"deps":{"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/shadowBox.js"},{"deps":{"../common/faceTs":50,"../common/NameTs":52,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/game/turretFactory.js"},{"deps":{"../../common/NameTs":52},"path":"preview-scripts/assets/Script/game/levelBox/levelBgItem.js"},{"deps":{"../../common/NameTs":52},"path":"preview-scripts/assets/Script/game/monster/monsterBlood.js"},{"deps":{"../common/NameTs":52,"../common/pool":58},"path":"preview-scripts/assets/Script/game/bloodBox.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../util/util":183,"./turret/turret":20},"path":"preview-scripts/assets/Script/game/turretHost.js"},{"deps":{"../../common/NameTs":52,"../../util/util":183},"path":"preview-scripts/assets/Script/game/monster/monsterHp.js"},{"deps":{"../../common/NameTs":52,"../../soundController":7},"path":"preview-scripts/assets/Script/game/shop/shopItem2.js"},{"deps":{"../../common/NameTs":52,"../../util/Tools":38,"../../util/util":183,"../monsterFactory":78},"path":"preview-scripts/assets/Script/game/monster/monster.js"},{"deps":{"../../common/NameTs":52,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt.js"},{"deps":{"../../common/NameTs":52,"../../util/util":183},"path":"preview-scripts/assets/Script/game/turret/BulletBoom.js"},{"deps":{"../../common/faceTs":50,"../../common/NameTs":52,"../../util/Tools":38,"../../util/util":183},"path":"preview-scripts/assets/Script/game/turret/turretBullet.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/en.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/th.js"},{"deps":{"../../common/NameTs":52,"../../Language/LanguageData":8,"../../util/Tools":38},"path":"preview-scripts/assets/Script/game/turret/turretHurt2.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ru.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zhHant.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/ar.js"},{"deps":{},"path":"preview-scripts/assets/Script/i18n/zh.js"},{"deps":{"../base/baseTs":10},"path":"preview-scripts/assets/Script/model/ModelTip.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/SkeletonExt.js"},{"deps":{"../common/NameTs":52},"path":"preview-scripts/assets/Script/model/TipBox.js"},{"deps":{"../Assist/AssistCtr":188,"../common/NameTs":52,"../common/pageTs":55,"../PageManage":180,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/model/NewPlayerTaskModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/WalletRecord.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/SignModel.js"},{"deps":{"../Assist/AssistCtr":188,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../util/util":183},"path":"preview-scripts/assets/Script/model/BtnRandomRed.js"},{"deps":{"../base/baseTs":10,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameDetention.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameEnd.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../Language/LanguageData":8,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGetTurret.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/tool":177,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameEarnings.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../Language/LanguageData":8,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGetOtherTurret.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../Language/LanguageData":8,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGetVideoTurret.js"},{"deps":{"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameHeavenReward.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGuide.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../controlelr/RewardController":11,"../Language/LanguageData":8,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGoldWheelReward.js"},{"deps":{},"path":"preview-scripts/assets/Script/js/tganalytics.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameEarnPro.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../PageManage":180,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/pop/gameKingPaoProgress.js"},{"deps":{"../soundController":7,"../common/NameTs":52,"../server/xmsdk_cocos/XMSDK":164,"../server/UrlConst":143,"../util/util":183,"../common/faceTs":50,"../base/baseTs":10,"./gameGoldWheelReward":113,"../controlelr/RewardController":11,"../TrackMgr/TrackMgr":47,"../common/pageTs":55,"../controlelr/RedController":61,"../Assist/AssistCtr":188},"path":"preview-scripts/assets/Script/pop/gameGoldWheel.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameGuide2.js"},{"deps":{"../base/baseTs":10,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/pop/gameNetworkLost.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameOffline.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameOnLinePrize.js"},{"deps":{"../../prefab/tool/script/Progress":186,"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../model/NewPlayerTaskModel":101,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameNewPlayerTask.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../Language/LanguageData":8,"../server/UrlConst":143,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gamePass.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../model/Marquee":23,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameKingPao.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../Language/LanguageData":8,"../server/UrlConst":143,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gamePassReward2.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/xmsdk_cocos/AD/AdController":191,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gamePassReward.js"},{"deps":{"../base/baseTs":10,"../Language/LanguageData":8,"../soundController":7,"../util/Tools":38},"path":"preview-scripts/assets/Script/pop/gameSet.js"},{"deps":{"../base/baseTs":10,"../base/jsonSingleton":48,"../common/NameTs":52,"../prop/propItem":26,"../soundController":7},"path":"preview-scripts/assets/Script/pop/gameProp.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../prop/propItem":26,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gamePropBox.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/tool":177,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameSavingPot.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameRandomRedPrize.js"},{"deps":{"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../Language/LanguageData":8,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameSignReward.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameStart.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../task/taskItem":34,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameTask.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameTreasure.js"},{"deps":{"../base/baseTs":10,"../base/jsonSingleton":48,"../common/NameTs":52,"../common/scrollTs":59,"../game/tuJian/tuJianItem":19,"../soundController":7,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/pop/gameTuJian.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameTurretRandomRed.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../common/pageTs":55,"../Language/LanguageData":8,"../PageManage":180,"../server/UrlConst":143,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameTaskReward.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../server/UrlConst":143,"../TrackMgr/TrackMgr":47,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameToolGet.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/faceTs":50,"../common/NameTs":52,"../common/pool":58,"../Language/LanguageData":8,"../soundController":7,"../tg/ApiService":176,"../tg/Global":171,"../tg/WalletMgr":168,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameWallet.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../soundController":7,"../TrackMgr/TrackMgr":47},"path":"preview-scripts/assets/Script/pop/gameSign.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/UrlConst.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/pop/gameUpgrade.js"},{"deps":{"../base/baseTs":10,"../model/WalletRecord":102,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7},"path":"preview-scripts/assets/Script/pop/gameWalletRecord.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52},"path":"preview-scripts/assets/Script/pop/gameAdLoading.js"},{"deps":{},"path":"preview-scripts/assets/Script/prop/PropContent.js"},{"deps":{"./PreviewPlatform":154,"./InnerWebPlatform":192,"./AndroidNativePlatform":150},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js"},{"deps":{"./Bridge/AndroidCocosBridge":28,"../Config/AppInfo":31,"../mock1":29},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js"},{"deps":{"./../Config/AppInfo":31,"./../Adapter/PlatformFactory":148},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType.js"},{"deps":{"./rsa":184,"./Type/AdStatus":30,"../Config/AppInfo":31,"../mock1":29,"../Utils/PxTransUtils":157},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig.js"},{"deps":{"./XMToast":160},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ToastObject.js"},{"deps":{"../XMSDK":164},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType.js"},{"deps":{"./ToastObject":156},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js"},{"deps":{"./LoadObject":32},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js"},{"deps":{"./Loading":158},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMUtils.js"},{"deps":{"./Config/AppInfo":31,"./Adapter/PlatformFactory":148,"./AD/AdUtil":190,"./AD/AdviewUtil":5,"./Utils/XMLoad":161,"../ServerMgr/Ajax":27,"../../Assist/AssistCtr":188},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/md5.js"},{"deps":{"../../../common/NameTs":52,"../../../soundController":7,"../Adapter/PlatformFactory":148,"../Config/AppInfo":31},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js"},{"deps":{"../base/Singleton":49},"path":"preview-scripts/assets/Script/tg/WalletMgr.js"},{"deps":{"../Assist/AssistCtr":188,"../base/Singleton":49,"../Language/LanguageData":8,"../PageManage":180,"../util/TimeTools":181,"./ApiService":176,"./Global":171},"path":"preview-scripts/assets/Script/tg/TelegramPlatform.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../TrackMgr/TrackMgr":47,"../util/util":183},"path":"preview-scripts/assets/Script/ui/taskProgress.js"},{"deps":{"../base/Singleton":49},"path":"preview-scripts/assets/Script/tg/Global.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/ui/turretBuy.js"},{"deps":{"../common/NameTs":52,"../util/tool":177},"path":"preview-scripts/assets/Script/ui/earningBtn.js"},{"deps":{"../Assist/AssistCtr":188,"../base/baseTs":10,"../common/NameTs":52,"../common/pageTs":55,"../server/UrlConst":143,"../soundController":7,"../util/tool":177,"../util/util":183},"path":"preview-scripts/assets/Script/ui/savingPotBtn.js"},{"deps":{"../base/baseTs":10,"../util/util":183},"path":"preview-scripts/assets/Script/ui/turretLevel.js"},{"deps":{"../Assist/AssistCtr":188,"../Language/LanguageData":8,"./Global":171,"./HttpClient":35,"./WalletMgr":168},"path":"preview-scripts/assets/Script/tg/ApiService.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/tool.js"},{"deps":{"../Assist/AssistCtr":188,"../common/faceTs":50,"../soundController":7,"../util/Tools":38,"../util/util":183},"path":"preview-scripts/assets/Script/ui/autoBtn.js"},{"deps":{"../base/baseTs":10,"../common/NameTs":52,"../util/util":183},"path":"preview-scripts/assets/Script/ui/turretRecycle.js"},{"deps":{"./common/custon/Loading":2,"./common/faceTs":50,"./common/NameTs":52,"./common/pageTs":55,"./util/util":183},"path":"preview-scripts/assets/Script/PageManage.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/TimeTools.js"},{"deps":{"../common/faceTs":50,"../common/NameTs":52,"../common/pageTs":55,"../controlelr/RedController":61,"../PageManage":180,"../server/UrlConst":143,"../server/xmsdk_cocos/XMSDK":164,"../soundController":7,"../util/util":183},"path":"preview-scripts/assets/Script/ui/ui.js"},{"deps":{"../common/faceTs":50,"../common/NameTs":52,"../base/jsonSingleton":48,"../Assist/TextCtr":185,"../server/xmsdk_cocos/XMSDK":164,"../server/UrlConst":143,"../server/xmsdk_cocos/AD/AdController":191,"../Assist/AssistCtr":188,"./Tools":38},"path":"preview-scripts/assets/Script/util/util.js"},{"deps":{"buffer":195},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/rsa.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/TextCtr.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/Progress.js"},{"deps":{"./LanguageData":8},"path":"preview-scripts/assets/Script/Language/LocalizedLabel.js"},{"deps":{"../common/NameTs":52,"../common/PropConst":54,"../server/xmsdk_cocos/AD/AdUtil":190},"path":"preview-scripts/assets/Script/Assist/AssistCtr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/RandomCtr.js"},{"deps":{"../../../common/AdPosition":57,"../../../common/NameTs":52,"../Adapter/PlatformFactory":148,"../Adapter/Type/AdStatus":30,"../XMSDK":164},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js"},{"deps":{"../../../common/NameTs":52,"../../../common/pageTs":55,"../../../util/util":183,"../XMSDK":164,"./AdUtil":190,"./AdviewUtil":5},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js"},{"deps":{"./Bridge/JsBridge":149,"../Config/AppInfo":31,"../mock1":29},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/autoScroller.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/btn.js"},{"deps":{"base64-js":196,"ieee754":197,"isarray":198},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"}];
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
    