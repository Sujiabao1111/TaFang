cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.js.mixin(dragonBones.ArmatureDisplay.prototype, {
        update (dt) {
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
