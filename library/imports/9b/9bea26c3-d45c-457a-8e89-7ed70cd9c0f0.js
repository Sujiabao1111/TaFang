"use strict";
cc._RF.push(module, '9bea2bD1FxFeo6JftcM2cDw', 'dragonBonesEditPlay');
// Script/js/dragonBonesEditPlay.js

"use strict";

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
  cc.js.mixin(dragonBones.ArmatureDisplay.prototype, {
    update: function update(dt) {
      if (CC_EDITOR) {
        cc.engine._animatingInEditMode = 1;
        cc.engine.animatingInEditMode = 1;
      }

      if (this.paused) return;
      dt *= this.timeScale;

      if (this._armature) {
        this._armature.advanceTime(dt);
      }
    }
  });
});

cc._RF.pop();