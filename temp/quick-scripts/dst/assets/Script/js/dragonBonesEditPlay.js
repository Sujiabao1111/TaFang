
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/js/dragonBonesEditPlay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxqc1xcZHJhZ29uQm9uZXNFZGl0UGxheS5qcyJdLCJuYW1lcyI6WyJjYyIsImdhbWUiLCJvbmNlIiwiRVZFTlRfRU5HSU5FX0lOSVRFRCIsImpzIiwibWl4aW4iLCJkcmFnb25Cb25lcyIsIkFybWF0dXJlRGlzcGxheSIsInByb3RvdHlwZSIsInVwZGF0ZSIsImR0IiwiQ0NfRURJVE9SIiwiZW5naW5lIiwiX2FuaW1hdGluZ0luRWRpdE1vZGUiLCJhbmltYXRpbmdJbkVkaXRNb2RlIiwicGF1c2VkIiwidGltZVNjYWxlIiwiX2FybWF0dXJlIiwiYWR2YW5jZVRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRQyxJQUFSLENBQWFGLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRRSxtQkFBckIsRUFBMEMsWUFBWTtFQUNsREgsRUFBRSxDQUFDSSxFQUFILENBQU1DLEtBQU4sQ0FBWUMsV0FBVyxDQUFDQyxlQUFaLENBQTRCQyxTQUF4QyxFQUFtRDtJQUMvQ0MsTUFEK0Msa0JBQ3ZDQyxFQUR1QyxFQUNuQztNQUNSLElBQUlDLFNBQUosRUFBZTtRQUNYWCxFQUFFLENBQUNZLE1BQUgsQ0FBVUMsb0JBQVYsR0FBaUMsQ0FBakM7UUFDQWIsRUFBRSxDQUFDWSxNQUFILENBQVVFLG1CQUFWLEdBQWdDLENBQWhDO01BQ0g7O01BRUQsSUFBSSxLQUFLQyxNQUFULEVBQWlCO01BRWpCTCxFQUFFLElBQUksS0FBS00sU0FBWDs7TUFFQSxJQUFJLEtBQUtDLFNBQVQsRUFBb0I7UUFDaEIsS0FBS0EsU0FBTCxDQUFlQyxXQUFmLENBQTJCUixFQUEzQjtNQUNIO0lBQ0o7RUFkOEMsQ0FBbkQ7QUFnQkgsQ0FqQkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLmdhbWUub25jZShjYy5nYW1lLkVWRU5UX0VOR0lORV9JTklURUQsIGZ1bmN0aW9uICgpIHtcbiAgICBjYy5qcy5taXhpbihkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkucHJvdG90eXBlLCB7XG4gICAgICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBjYy5lbmdpbmUuX2FuaW1hdGluZ0luRWRpdE1vZGUgPSAxO1xuICAgICAgICAgICAgICAgIGNjLmVuZ2luZS5hbmltYXRpbmdJbkVkaXRNb2RlID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGR0ICo9IHRoaXMudGltZVNjYWxlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hZHZhbmNlVGltZShkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIl19