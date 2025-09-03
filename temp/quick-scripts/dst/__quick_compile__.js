
(function () {
var scripts = [{"deps":{"./assets/Script/common/NameTs":1,"./assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform":6,"./assets/Script/data/userData":9,"./assets/Script/prop/PropContent":21,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge":22,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig":23,"./assets/Script/server/xmsdk_cocos/Message/MessageCenter":26,"./assets/Script/spine/spineParticle":27,"./assets/Script/common/AdPosition":31,"./assets/Script/common/faceTs":32,"./assets/Script/common/pageTs":33,"./assets/Script/effect/ModelFunc":36,"./assets/Script/common/pool":38,"./assets/Script/common/PropConst":39,"./assets/Script/model/SignModel":67,"./assets/Script/model/WalletRecord":71,"./assets/Script/model/Marquee":72,"./assets/Script/server/xmsdk_cocos/mock1":114,"./assets/Script/server/UrlConst":116,"./assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType":123,"./assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge":124,"./assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType":126,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType":127,"./assets/Script/server/xmsdk_cocos/Utils/Loading":128,"./assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus":129,"./assets/Script/server/xmsdk_cocos/Utils/Storage":131,"./assets/Script/server/xmsdk_cocos/Utils/XMUtils":138,"./assets/Script/server/xmsdk_cocos/Utils/md5":143,"./assets/Script/Assist/RandomCtr":150,"./assets/Script/TrackMgr/TrackEnum":152,"./assets/Script/util/tool":154,"./assets/prefab/tool/script/autoScroller":155,"./assets/Script/Assist/TextCtr":156,"./assets/Script/NewBigWheel/NewBigWheelPrizeAward":160,"./assets/Script/NewBigWheel/NewBigWheelMarquee":163,"./assets/Script/base/jsonSingleton":165,"./assets/prefab/tool/script/Progress":167,"./assets/prefab/tool/script/btn":168,"./assets/Script/PageManage":7,"./assets/Script/controlelr/RewardController":8,"./assets/Script/effect/model/EffectToolFrozen":2,"./assets/Script/game/levelBox/levelBgItem":3,"./assets/Script/heaven/heavenItem":15,"./assets/Script/soundController":70,"./assets/Script/model/BtnRandomRed":18,"./assets/Script/pop/gameDetention":19,"./assets/Script/CanvasController":110,"./assets/Script/onPrizeGet/OnPrizeGet":20,"./assets/Script/server/ServerMgr/Ajax":5,"./assets/Script/ui/turretLevel":29,"./assets/Script/task/taskItem":28,"./assets/Script/util/util":30,"./assets/Script/effect/GameEffect":34,"./assets/Script/common/scrollTs":37,"./assets/Script/controlelr/RedController":35,"./assets/Script/effect/effect":40,"./assets/Script/game/game":42,"./assets/Script/game/bloodBox":44,"./assets/Script/game/heavenBox":45,"./assets/Script/game/hpBox":46,"./assets/Script/game/hurtBox":47,"./assets/Script/game/levelBgBox":48,"./assets/Script/game/shadowBox":50,"./assets/Script/game/monsterBox":49,"./assets/Script/game/levelLabelBox":51,"./assets/Script/game/hurtCirtBox":52,"./assets/Script/game/monsterFactory":53,"./assets/Script/game/turretBox":54,"./assets/Script/game/treasureBox":55,"./assets/Script/game/turretFactory":56,"./assets/Script/game/bulletBox":57,"./assets/Script/game/monster/monsterBlood":11,"./assets/Script/effect/turret/turretEffect":10,"./assets/Script/game/turretHost":59,"./assets/Script/game/place/placeItem":12,"./assets/Script/game/pool/poolBox":13,"./assets/Script/game/turret/turretBullet":14,"./assets/Script/game/shop/shopItem2":16,"./assets/Script/model/NewPlayerTaskModel":65,"./assets/Script/game/tuJian/tuJianItem":17,"./assets/Script/model/ModelTip":73,"./assets/Script/pop/gameAdLoading":74,"./assets/Script/pop/gameEarnings":75,"./assets/Script/pop/gameEnd":76,"./assets/Script/pop/gameGetOtherTurret":77,"./assets/Script/pop/gameEarnPro":78,"./assets/Script/pop/gameGetVideoTurret":79,"./assets/Script/pop/gameGetTurret":80,"./assets/Script/pop/gameGoldWheelReward":81,"./assets/Script/pop/gameGuide2":82,"./assets/Script/pop/gameKingPao":83,"./assets/Script/pop/gameHeavenReward":84,"./assets/Script/pop/gameKingPaoProgress":85,"./assets/Script/pop/gameOnLinePrize":86,"./assets/Script/pop/gameNetworkLost":87,"./assets/Script/pop/gameGuide":88,"./assets/Script/pop/gameNewPlayerTask":89,"./assets/Script/pop/gamePassReward":90,"./assets/Script/pop/gameOnPrizeGetReward":91,"./assets/Script/pop/gameGoldWheel":92,"./assets/Script/pop/gamePass":93,"./assets/Script/pop/gameOffline":94,"./assets/Script/pop/gamePassReward2":95,"./assets/Script/pop/gameProp":96,"./assets/Script/pop/gamePropBox":97,"./assets/Script/pop/gameSavingPot":98,"./assets/Script/pop/gameRandomRedPrize":99,"./assets/Script/pop/gameSet":100,"./assets/Script/pop/gameStart":101,"./assets/Script/pop/gameSignReward":102,"./assets/Script/pop/gameSign":103,"./assets/Script/pop/gameTask":104,"./assets/Script/pop/gameToolGet":105,"./assets/Script/pop/gameTaskReward":106,"./assets/Script/pop/gameTurretRandomRed":107,"./assets/Script/pop/gameTreasure":108,"./assets/Script/pop/gameWalletRecord":109,"./assets/Script/pop/gameUpgrade":111,"./assets/Script/pop/gameTuJian":112,"./assets/Script/pop/gameCoinReward":113,"./assets/Script/pop/gameWallet":115,"./assets/Script/prop/propItem":117,"./assets/Script/server/xmsdk_cocos/AD/AdviewUtil":4,"./assets/Script/ui/earnProgress":139,"./assets/Script/ui/earningBtn":140,"./assets/Script/ui/savingPotBtn":144,"./assets/Script/ui/turretBuy":145,"./assets/Script/ui/autoBtn":146,"./assets/Script/ui/turretRecycle":147,"./assets/Script/ui/taskProgress":148,"./assets/Script/ui/ui":149,"./assets/Script/effect/model/EffectToolShock":41,"./assets/Script/effect/model/EffectToolCls":43,"./assets/Script/game/levelBox/levelLabelItem":58,"./assets/Script/game/monster/monsterShadow":60,"./assets/Script/game/monster/monsterHp":61,"./assets/Script/game/monster/monster":62,"./assets/Script/game/shop/shopItem1":63,"./assets/Script/game/turret/turretHurt":64,"./assets/Script/game/turret/turret":66,"./assets/Script/game/turret/turretHurt2":69,"./assets/Script/game/turret/BulletBoom":68,"./assets/Script/server/xmsdk_cocos/Utils/Init":24,"./assets/Script/server/xmsdk_cocos/Config/AppInfo":25,"./assets/Script/server/xmsdk_cocos/XMSDK":142,"./assets/Script/NewBigWheel/BigWheelRuleModal":151,"./assets/Script/base/baseTs":153,"./assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory":118,"./assets/Script/server/xmsdk_cocos/AD/AdUtil":119,"./assets/Script/server/xmsdk_cocos/AD/AdController":120,"./assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform":122,"./assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform":121,"./assets/Script/server/xmsdk_cocos/Utils/PxTransUtils":130,"./assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform":125,"./assets/Script/server/xmsdk_cocos/Utils/ToastObject":132,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad2":133,"./assets/Script/server/xmsdk_cocos/Utils/XMLoad":134,"./assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt":135,"./assets/Script/server/xmsdk_cocos/Utils/LoadObject":136,"./assets/Script/server/xmsdk_cocos/Utils/XMToast":137,"./assets/Script/Assist/AssistCtr":157,"./assets/Script/NewBigWheel/NewBigWheelPrize":158,"./assets/Script/TrackMgr/TrackMgr":161,"./assets/Script/NewBigWheel/NewBigTaskItem":159,"./assets/Script/NewBigWheel/NewBigWheelController":162,"./assets/Script/NewBigWheel/NewBigWheelChou":164,"./assets/Script/base/AStart":166,"./assets/Script/server/xmsdk_cocos/Adapter/rsa":141},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/NameTs.js"},{"deps":{"../../common/NameTs":1,"../ModelFunc":36},"path":"preview-scripts/assets/Script/effect/model/EffectToolFrozen.js"},{"deps":{"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/levelBox/levelBgItem.js"},{"deps":{"./../Utils/PxTransUtils":130,"../Adapter/Type/AdStatus":129,"../../../common/NameTs":1,"../Adapter/PlatformFactory":118},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdviewUtil.js"},{"deps":{"../../util/util":30,"../UrlConst":116,"../xmsdk_cocos/Utils/md5":143,"../xmsdk_cocos/Config/AppInfo":25},"path":"preview-scripts/assets/Script/server/ServerMgr/Ajax.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Base/IPlatform.js"},{"deps":{"./common/NameTs":1,"./util/util":30,"./common/faceTs":32,"./common/pageTs":33},"path":"preview-scripts/assets/Script/PageManage.js"},{"deps":{"../util/util":30,"../common/faceTs":32},"path":"preview-scripts/assets/Script/controlelr/RewardController.js"},{"deps":{},"path":"preview-scripts/assets/Script/data/userData.js"},{"deps":{"../../util/util":30},"path":"preview-scripts/assets/Script/effect/turret/turretEffect.js"},{"deps":{"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/monster/monsterBlood.js"},{"deps":{"../../util/tool":154,"../../util/util":30,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/place/placeItem.js"},{"deps":{"../../base/baseTs":153,"../../util/util":30,"../../common/faceTs":32},"path":"preview-scripts/assets/Script/game/pool/poolBox.js"},{"deps":{"../../util/util":30,"../../common/faceTs":32,"../../common/NameTs":1,"../../util/tool":154},"path":"preview-scripts/assets/Script/game/turret/turretBullet.js"},{"deps":{"../common/pageTs":33,"../base/baseTs":153,"../TrackMgr/TrackMgr":161,"../util/util":30,"../common/NameTs":1,"../soundController":70},"path":"preview-scripts/assets/Script/heaven/heavenItem.js"},{"deps":{"../../soundController":70,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/shop/shopItem2.js"},{"deps":{"../../base/baseTs":153,"../../common/NameTs":1,"../../util/util":30,"../../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/game/tuJian/tuJianItem.js"},{"deps":{"../Assist/AssistCtr":157,"../common/pageTs":33,"../common/NameTs":1,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/model/BtnRandomRed.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../server/xmsdk_cocos/AD/AdController":120,"../TrackMgr/TrackMgr":161,"../server/xmsdk_cocos/XMSDK":142,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameDetention.js"},{"deps":{"../Assist/AssistCtr":157,"../common/pageTs":33,"../common/NameTs":1,"../util/util":30,"../TrackMgr/TrackMgr":161,"../controlelr/RedController":35,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142},"path":"preview-scripts/assets/Script/onPrizeGet/OnPrizeGet.js"},{"deps":{},"path":"preview-scripts/assets/Script/prop/PropContent.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/AndroidCocosBridge.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdViewConfig.js"},{"deps":{"../../../common/NameTs":1,"../../../soundController":70,"../Config/AppInfo":25,"../Adapter/PlatformFactory":118},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Init.js"},{"deps":{"../Utils/md5":143},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Config/AppInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Message/MessageCenter.js"},{"deps":{},"path":"preview-scripts/assets/Script/spine/spineParticle.js"},{"deps":{"../Assist/AssistCtr":157,"../common/NameTs":1,"../PageManage":7,"../server/xmsdk_cocos/AD/AdController":120,"../common/AdPosition":31,"../common/pageTs":33,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../soundController":70,"../util/util":30},"path":"preview-scripts/assets/Script/task/taskItem.js"},{"deps":{"../base/baseTs":153,"../util/util":30},"path":"preview-scripts/assets/Script/ui/turretLevel.js"},{"deps":{"../common/NameTs":1,"../common/faceTs":32,"../base/jsonSingleton":165,"./tool":154,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../Assist/TextCtr":156,"../server/xmsdk_cocos/AD/AdController":120,"../Assist/AssistCtr":157,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/util/util.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/AdPosition.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/faceTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pageTs.js"},{"deps":{"../common/NameTs":1,"./ModelFunc":36},"path":"preview-scripts/assets/Script/effect/GameEffect.js"},{"deps":{"../server/UrlConst":116,"../util/util":30,"../TrackMgr/TrackMgr":161,"../server/xmsdk_cocos/XMSDK":142},"path":"preview-scripts/assets/Script/controlelr/RedController.js"},{"deps":{},"path":"preview-scripts/assets/Script/effect/ModelFunc.js"},{"deps":{"./pool":38},"path":"preview-scripts/assets/Script/common/scrollTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/pool.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PropConst.js"},{"deps":{"../common/faceTs":32,"../base/baseTs":153,"../common/pool":38,"../util/tool":154,"../soundController":70,"../common/NameTs":1,"../util/util":30},"path":"preview-scripts/assets/Script/effect/effect.js"},{"deps":{"../ModelFunc":36,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/effect/model/EffectToolShock.js"},{"deps":{"../Assist/AssistCtr":157,"../common/NameTs":1,"../effect/GameEffect":34,"../common/faceTs":32,"../base/baseTs":153,"../server/UrlConst":116,"../controlelr/RedController":35,"../common/pageTs":33,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/game/game.js"},{"deps":{"../ModelFunc":36,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/effect/model/EffectToolCls.js"},{"deps":{"../common/NameTs":1,"../common/pool":38},"path":"preview-scripts/assets/Script/game/bloodBox.js"},{"deps":{"../common/AdPosition":31,"../common/faceTs":32,"../TrackMgr/TrackMgr":161,"../common/NameTs":1,"../common/pool":38,"../server/UrlConst":116,"../util/util":30},"path":"preview-scripts/assets/Script/game/heavenBox.js"},{"deps":{"../common/NameTs":1,"../common/pool":38},"path":"preview-scripts/assets/Script/game/hpBox.js"},{"deps":{"../common/NameTs":1,"../base/baseTs":153,"../common/pool":38},"path":"preview-scripts/assets/Script/game/hurtBox.js"},{"deps":{"../common/NameTs":1,"../base/baseTs":153,"../common/pool":38},"path":"preview-scripts/assets/Script/game/levelBgBox.js"},{"deps":{"../common/faceTs":32,"../base/baseTs":153,"../TrackMgr/TrackMgr":161,"../base/AStart":166,"../common/NameTs":1,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/game/monsterBox.js"},{"deps":{"../common/pool":38,"../common/NameTs":1},"path":"preview-scripts/assets/Script/game/shadowBox.js"},{"deps":{"../base/baseTs":153,"../common/NameTs":1,"../common/pool":38},"path":"preview-scripts/assets/Script/game/levelLabelBox.js"},{"deps":{"../base/baseTs":153,"../common/pool":38,"../common/NameTs":1},"path":"preview-scripts/assets/Script/game/hurtCirtBox.js"},{"deps":{"../soundController":70,"../common/faceTs":32,"../util/util":30,"../common/NameTs":1},"path":"preview-scripts/assets/Script/game/monsterFactory.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../util/util":30,"../common/NameTs":1,"../TrackMgr/TrackMgr":161,"./turret/turret":66,"../common/faceTs":32},"path":"preview-scripts/assets/Script/game/turretBox.js"},{"deps":{"../base/baseTs":153,"../soundController":70,"../common/NameTs":1,"../common/pageTs":33,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/game/treasureBox.js"},{"deps":{"../util/tool":154,"../common/NameTs":1,"../common/faceTs":32,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/game/turretFactory.js"},{"deps":{"../common/pool":38,"../base/baseTs":153,"../common/NameTs":1},"path":"preview-scripts/assets/Script/game/bulletBox.js"},{"deps":{"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/levelBox/levelLabelItem.js"},{"deps":{"../base/baseTs":153,"../common/NameTs":1,"../common/pageTs":33,"../util/util":30,"./turret/turret":66},"path":"preview-scripts/assets/Script/game/turretHost.js"},{"deps":{"../../util/util":30,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/monster/monsterShadow.js"},{"deps":{"../../common/NameTs":1,"../../util/util":30},"path":"preview-scripts/assets/Script/game/monster/monsterHp.js"},{"deps":{"../../common/NameTs":1,"../monsterFactory":53,"../../util/util":30,"../../util/tool":154},"path":"preview-scripts/assets/Script/game/monster/monster.js"},{"deps":{"../../soundController":70,"../../common/NameTs":1},"path":"preview-scripts/assets/Script/game/shop/shopItem1.js"},{"deps":{"../../common/NameTs":1,"../../util/tool":154},"path":"preview-scripts/assets/Script/game/turret/turretHurt.js"},{"deps":{"../Assist/AssistCtr":157,"../server/UrlConst":116,"../common/NameTs":1,"../TrackMgr/TrackMgr":161,"../common/pageTs":33,"../PageManage":7,"../server/xmsdk_cocos/XMSDK":142},"path":"preview-scripts/assets/Script/model/NewPlayerTaskModel.js"},{"deps":{"../../common/faceTs":32,"../../common/pageTs":33,"../../common/NameTs":1,"../../TrackMgr/TrackMgr":161,"../turretFactory":56,"../../util/util":30},"path":"preview-scripts/assets/Script/game/turret/turret.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/SignModel.js"},{"deps":{"../../common/NameTs":1,"../../util/util":30},"path":"preview-scripts/assets/Script/game/turret/BulletBoom.js"},{"deps":{"../../common/NameTs":1,"../../util/tool":154},"path":"preview-scripts/assets/Script/game/turret/turretHurt2.js"},{"deps":{"./common/NameTs":1,"./util/util":30},"path":"preview-scripts/assets/Script/soundController.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/WalletRecord.js"},{"deps":{},"path":"preview-scripts/assets/Script/model/Marquee.js"},{"deps":{"../base/baseTs":153},"path":"preview-scripts/assets/Script/model/ModelTip.js"},{"deps":{"../common/NameTs":1,"../base/baseTs":153},"path":"preview-scripts/assets/Script/pop/gameAdLoading.js"},{"deps":{"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/NameTs":1,"../server/UrlConst":116,"../soundController":70,"../TrackMgr/TrackMgr":161,"../server/xmsdk_cocos/AD/AdController":120,"../common/AdPosition":31,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameEarnings.js"},{"deps":{"../base/baseTs":153,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../util/util":30,"../common/AdPosition":31,"../common/NameTs":1,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameEnd.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../soundController":70,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameGetOtherTurret.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../Assist/AssistCtr":157,"../server/UrlConst":116,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../util/util":30,"../soundController":70,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameEarnPro.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../Assist/AssistCtr":157,"../common/faceTs":32,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameGetVideoTurret.js"},{"deps":{"../Assist/AssistCtr":157,"../common/AdPosition":31,"../common/NameTs":1,"../base/baseTs":153,"../server/xmsdk_cocos/AD/AdController":120,"../common/pageTs":33,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameGetTurret.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../server/UrlConst":116,"../controlelr/RewardController":8,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../server/xmsdk_cocos/XMSDK":142,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameGoldWheelReward.js"},{"deps":{"../server/UrlConst":116,"../base/baseTs":153,"../common/NameTs":1,"../soundController":70,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameGuide2.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/NameTs":1,"../model/Marquee":72,"../common/pageTs":33,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161,"../server/UrlConst":116,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameKingPao.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../Assist/AssistCtr":157,"../server/UrlConst":116,"../common/NameTs":1,"../common/faceTs":32,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameHeavenReward.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../PageManage":7,"../common/AdPosition":31,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../common/pageTs":33,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameKingPaoProgress.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/NameTs":1,"../common/AdPosition":31,"../server/xmsdk_cocos/AD/AdController":120,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameOnLinePrize.js"},{"deps":{"../base/baseTs":153,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameNetworkLost.js"},{"deps":{"../base/baseTs":153,"../soundController":70,"../server/xmsdk_cocos/XMSDK":142,"../common/NameTs":1,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameGuide.js"},{"deps":{"../../prefab/tool/script/Progress":167,"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/NameTs":1,"../model/NewPlayerTaskModel":65,"../server/xmsdk_cocos/XMSDK":142,"../server/UrlConst":116,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameNewPlayerTask.js"},{"deps":{"../common/AdPosition":31,"../base/baseTs":153,"../server/xmsdk_cocos/AD/AdController":120,"../common/pageTs":33,"../common/NameTs":1,"../TrackMgr/TrackMgr":161,"../soundController":70,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gamePassReward.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../server/UrlConst":116,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameOnPrizeGetReward.js"},{"deps":{"../soundController":70,"../common/NameTs":1,"../server/xmsdk_cocos/XMSDK":142,"../server/UrlConst":116,"../server/xmsdk_cocos/AD/AdController":120,"../util/util":30,"../common/faceTs":32,"../common/AdPosition":31,"../base/baseTs":153,"../TrackMgr/TrackMgr":161,"../controlelr/RewardController":8,"./gameGoldWheelReward":81,"../common/pageTs":33,"../Assist/AssistCtr":157,"../controlelr/RedController":35},"path":"preview-scripts/assets/Script/pop/gameGoldWheel.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../common/NameTs":1,"../common/pageTs":33,"../server/UrlConst":116,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gamePass.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../server/xmsdk_cocos/AD/AdController":120,"../server/UrlConst":116,"../common/NameTs":1,"../soundController":70,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameOffline.js"},{"deps":{"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/AdPosition":31,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../util/util":30,"../util/tool":154},"path":"preview-scripts/assets/Script/pop/gamePassReward2.js"},{"deps":{"../base/baseTs":153,"../base/jsonSingleton":165,"../common/NameTs":1,"../prop/propItem":117,"../soundController":70},"path":"preview-scripts/assets/Script/pop/gameProp.js"},{"deps":{"../util/util":30,"../base/baseTs":153,"../common/NameTs":1,"../prop/propItem":117},"path":"preview-scripts/assets/Script/pop/gamePropBox.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/NameTs":1,"../server/UrlConst":116,"../common/faceTs":32,"../common/pageTs":33,"../soundController":70,"../util/tool":154,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameSavingPot.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../server/UrlConst":116,"../common/AdPosition":31,"../common/NameTs":1,"../util/util":30,"../server/xmsdk_cocos/XMSDK":142,"../server/xmsdk_cocos/AD/AdController":120,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameRandomRedPrize.js"},{"deps":{"../base/baseTs":153,"../server/xmsdk_cocos/XMSDK":142,"../server/xmsdk_cocos/Config/AppInfo":25,"../TrackMgr/TrackMgr":161,"../util/util":30,"../soundController":70},"path":"preview-scripts/assets/Script/pop/gameSet.js"},{"deps":{"../base/baseTs":153,"../util/util":30,"../common/NameTs":1},"path":"preview-scripts/assets/Script/pop/gameStart.js"},{"deps":{"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/NameTs":1,"../common/faceTs":32,"../common/AdPosition":31,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../TrackMgr/TrackMgr":161,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameSignReward.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../common/NameTs":1,"../soundController":70,"../common/pageTs":33,"../server/xmsdk_cocos/AD/AdController":120,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameSign.js"},{"deps":{"../common/AdPosition":31,"../soundController":70,"../common/NameTs":1,"../base/baseTs":153,"../server/UrlConst":116,"../task/taskItem":28,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameTask.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../common/NameTs":1,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../server/xmsdk_cocos/AD/AdController":120,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameToolGet.js"},{"deps":{"../common/AdPosition":31,"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/faceTs":32,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../PageManage":7,"../common/pageTs":33,"../server/UrlConst":116,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameTaskReward.js"},{"deps":{"../Assist/AssistCtr":157,"../common/NameTs":1,"../TrackMgr/TrackMgr":161,"../base/baseTs":153,"../common/AdPosition":31,"../util/util":30,"../server/xmsdk_cocos/AD/AdController":120},"path":"preview-scripts/assets/Script/pop/gameTurretRandomRed.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../common/faceTs":32,"../server/xmsdk_cocos/AD/AdController":120,"../common/NameTs":1,"../soundController":70,"../TrackMgr/TrackMgr":161,"../server/UrlConst":116,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameTreasure.js"},{"deps":{"../base/baseTs":153,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../model/WalletRecord":71},"path":"preview-scripts/assets/Script/pop/gameWalletRecord.js"},{"deps":{"./base/baseTs":153,"./common/faceTs":32,"./base/jsonSingleton":165,"./model/ModelTip":73,"./common/NameTs":1,"./PageManage":7,"./server/xmsdk_cocos/XMSDK":142,"./soundController":70,"./util/util":30,"./server/UrlConst":116},"path":"preview-scripts/assets/Script/CanvasController.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../server/xmsdk_cocos/AD/AdController":120,"../common/pageTs":33,"../common/NameTs":1,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameUpgrade.js"},{"deps":{"../base/baseTs":153,"../Assist/AssistCtr":157,"../common/NameTs":1,"../base/jsonSingleton":165,"../common/pageTs":33,"../common/scrollTs":37,"../game/tuJian/tuJianItem":17,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameTuJian.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../soundController":70,"../util/util":30},"path":"preview-scripts/assets/Script/pop/gameCoinReward.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/mock1.js"},{"deps":{"../base/baseTs":153,"../common/AdPosition":31,"../Assist/AssistCtr":157,"../common/faceTs":32,"../common/pageTs":33,"../common/NameTs":1,"../common/pool":38,"../server/xmsdk_cocos/AD/AdController":120,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/pop/gameWallet.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/UrlConst.js"},{"deps":{"../Assist/AssistCtr":157,"../common/NameTs":1,"../server/UrlConst":116,"../base/baseTs":153,"../common/pageTs":33,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../TrackMgr/TrackMgr":161,"../util/tool":154,"../util/util":30},"path":"preview-scripts/assets/Script/prop/propItem.js"},{"deps":{"./InnerWebPlatform":125,"./PreviewPlatform":121,"./AndroidNativePlatform":122},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js"},{"deps":{"../../../common/AdPosition":31,"../../../common/NameTs":1,"../Adapter/PlatformFactory":118,"../XMSDK":142,"../Adapter/Type/AdStatus":129},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdUtil.js"},{"deps":{"../../../common/NameTs":1,"../../../util/util":30,"../XMSDK":142,"../../../common/pageTs":33,"./AdviewUtil":4,"./AdUtil":119},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/AD/AdController.js"},{"deps":{"../Config/AppInfo":25,"./Type/AdStatus":129,"./rsa":141,"../mock1":114,"../Utils/PxTransUtils":130},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PreviewPlatform.js"},{"deps":{"./Bridge/AndroidCocosBridge":22,"../Config/AppInfo":25,"../mock1":114},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/AndroidNativePlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/CommonSettingType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js"},{"deps":{"../Config/AppInfo":25,"../mock1":114,"./Bridge/JsBridge":124},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/InnerWebPlatform.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/LaunchSdkPageType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdConfigType.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Type/AdStatus.js"},{"deps":{"../XMSDK":142},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/PxTransUtils.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js"},{"deps":{"./XMToast":137},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ToastObject.js"},{"deps":{"./Loading":128},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad2.js"},{"deps":{"./LoadObject":136},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMLoad.js"},{"deps":{"./../Config/AppInfo":25,"./../Adapter/PlatformFactory":118},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/ReqEncrypt.js"},{"deps":{"./XMLoad":134},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/LoadObject.js"},{"deps":{"./ToastObject":132},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMToast.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/XMUtils.js"},{"deps":{"../common/NameTs":1,"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/pageTs":33,"../soundController":70,"../server/UrlConst":116,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/ui/earnProgress.js"},{"deps":{"../util/tool":154,"../common/NameTs":1},"path":"preview-scripts/assets/Script/ui/earningBtn.js"},{"deps":{"buffer":169},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/rsa.js"},{"deps":{"./Adapter/PlatformFactory":118,"./Config/AppInfo":25,"./AD/AdUtil":119,"../../Assist/AssistCtr":157,"./AD/AdviewUtil":4,"./Utils/XMLoad":134,"../ServerMgr/Ajax":5},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/XMSDK.js"},{"deps":{},"path":"preview-scripts/assets/Script/server/xmsdk_cocos/Utils/md5.js"},{"deps":{"../Assist/AssistCtr":157,"../server/UrlConst":116,"../common/pageTs":33,"../base/baseTs":153,"../util/util":30,"../soundController":70,"../util/tool":154,"../common/NameTs":1},"path":"preview-scripts/assets/Script/ui/savingPotBtn.js"},{"deps":{"../common/pageTs":33,"../base/baseTs":153,"../TrackMgr/TrackMgr":161,"../common/NameTs":1,"../util/tool":154,"../soundController":70,"../util/util":30},"path":"preview-scripts/assets/Script/ui/turretBuy.js"},{"deps":{"../Assist/AssistCtr":157,"../common/AdPosition":31,"../common/faceTs":32,"../common/NameTs":1,"../soundController":70,"../server/xmsdk_cocos/AD/AdController":120,"../server/UrlConst":116,"../util/tool":154,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/ui/autoBtn.js"},{"deps":{"../base/baseTs":153,"../util/util":30,"../common/NameTs":1},"path":"preview-scripts/assets/Script/ui/turretRecycle.js"},{"deps":{"../base/baseTs":153,"../common/pageTs":33,"../util/util":30,"../common/NameTs":1,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/ui/taskProgress.js"},{"deps":{"../common/faceTs":32,"../common/pageTs":33,"../common/NameTs":1,"../PageManage":7,"../controlelr/RedController":35,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/ui/ui.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/RandomCtr.js"},{"deps":{"../TrackMgr/TrackMgr":161,"../soundController":70},"path":"preview-scripts/assets/Script/NewBigWheel/BigWheelRuleModal.js"},{"deps":{},"path":"preview-scripts/assets/Script/TrackMgr/TrackEnum.js"},{"deps":{"../PageManage":7},"path":"preview-scripts/assets/Script/base/baseTs.js"},{"deps":{},"path":"preview-scripts/assets/Script/util/tool.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/autoScroller.js"},{"deps":{},"path":"preview-scripts/assets/Script/Assist/TextCtr.js"},{"deps":{"../common/AdPosition":31,"../common/NameTs":1,"../server/xmsdk_cocos/AD/AdController":120,"../common/PropConst":39,"../server/xmsdk_cocos/AD/AdUtil":119,"../server/xmsdk_cocos/Config/AppInfo":25,"../util/util":30},"path":"preview-scripts/assets/Script/Assist/AssistCtr.js"},{"deps":{"../Assist/AssistCtr":157,"../common/NameTs":1,"../common/AdPosition":31,"../server/xmsdk_cocos/AD/AdController":120,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../controlelr/RewardController":8,"../util/util":30,"./NewBigWheelPrizeAward":160,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrize.js"},{"deps":{"../Assist/AssistCtr":157,"../server/UrlConst":116,"../server/xmsdk_cocos/AD/AdController":120,"../server/xmsdk_cocos/XMSDK":142,"../common/AdPosition":31,"../soundController":70,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelPrizeAward.js"},{"deps":{"../server/xmsdk_cocos/XMSDK":142},"path":"preview-scripts/assets/Script/TrackMgr/TrackMgr.js"},{"deps":{"../Assist/AssistCtr":157,"../base/baseTs":153,"../common/AdPosition":31,"../server/xmsdk_cocos/XMSDK":142,"../soundController":70,"../server/UrlConst":116,"../server/xmsdk_cocos/AD/AdController":120,"../TrackMgr/TrackMgr":161,"./NewBigWheelPrize":158,"../util/util":30},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelController.js"},{"deps":{},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelMarquee.js"},{"deps":{"../Assist/AssistCtr":157,"../controlelr/RewardController":8,"../common/faceTs":32,"../server/xmsdk_cocos/AD/AdController":120,"../common/AdPosition":31,"../server/UrlConst":116,"../server/xmsdk_cocos/XMSDK":142,"../util/util":30,"../TrackMgr/TrackMgr":161},"path":"preview-scripts/assets/Script/NewBigWheel/NewBigWheelChou.js"},{"deps":{},"path":"preview-scripts/assets/Script/base/jsonSingleton.js"},{"deps":{"../util/tool":154},"path":"preview-scripts/assets/Script/base/AStart.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/Progress.js"},{"deps":{},"path":"preview-scripts/assets/prefab/tool/script/btn.js"},{"deps":{"isarray":170,"base64-js":171,"ieee754":172},"path":"preview-scripts/__node_modules/buffer/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/buffer/node_modules/isarray/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/base64-js/index.js"},{"deps":{},"path":"preview-scripts/__node_modules/ieee754/index.js"}];
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
    