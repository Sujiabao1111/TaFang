
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/js/SkeletonExt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8b55sn3MFGfp0E0HAp3+qP', 'SkeletonExt');
// Script/js/SkeletonExt.js

"use strict";

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
  cc.js.mixin(sp.Skeleton.prototype, {
    update: function update(dt) {
      // if (CC_EDITOR) return;
      if (CC_EDITOR) {
        cc.engine._animatingInEditMode = 1;
        cc.engine.animatingInEditMode = 1;
      }

      this.paused = false;
      if (this.paused) return;
      dt *= this.timeScale * sp.timeScale;

      if (this.isAnimationCached()) {
        // Cache mode and has animation queue.
        if (this._isAniComplete) {
          if (this._animationQueue.length === 0 && !this._headAniInfo) {
            var frameCache = this._frameCache;

            if (frameCache && frameCache.isInvalid()) {
              frameCache.updateToFrame();
              var frames = frameCache.frames;
              this._curFrame = frames[frames.length - 1];
            }

            return;
          }

          if (!this._headAniInfo) {
            this._headAniInfo = this._animationQueue.shift();
          }

          this._accTime += dt;

          if (this._accTime > this._headAniInfo.delay) {
            var aniInfo = this._headAniInfo;
            this._headAniInfo = null;
            this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
          }

          return;
        }

        this._updateCache(dt);
      } else {
        this._updateRealtime(dt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxqc1xcU2tlbGV0b25FeHQuanMiXSwibmFtZXMiOlsiY2MiLCJnYW1lIiwib25jZSIsIkVWRU5UX0VOR0lORV9JTklURUQiLCJqcyIsIm1peGluIiwic3AiLCJTa2VsZXRvbiIsInByb3RvdHlwZSIsInVwZGF0ZSIsImR0IiwiQ0NfRURJVE9SIiwiZW5naW5lIiwiX2FuaW1hdGluZ0luRWRpdE1vZGUiLCJhbmltYXRpbmdJbkVkaXRNb2RlIiwicGF1c2VkIiwidGltZVNjYWxlIiwiaXNBbmltYXRpb25DYWNoZWQiLCJfaXNBbmlDb21wbGV0ZSIsIl9hbmltYXRpb25RdWV1ZSIsImxlbmd0aCIsIl9oZWFkQW5pSW5mbyIsImZyYW1lQ2FjaGUiLCJfZnJhbWVDYWNoZSIsImlzSW52YWxpZCIsInVwZGF0ZVRvRnJhbWUiLCJmcmFtZXMiLCJfY3VyRnJhbWUiLCJzaGlmdCIsIl9hY2NUaW1lIiwiZGVsYXkiLCJhbmlJbmZvIiwic2V0QW5pbWF0aW9uIiwiYW5pbWF0aW9uTmFtZSIsImxvb3AiLCJfdXBkYXRlQ2FjaGUiLCJfdXBkYXRlUmVhbHRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRQyxJQUFSLENBQWFGLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRRSxtQkFBckIsRUFBMEMsWUFBWTtFQUVsREgsRUFBRSxDQUFDSSxFQUFILENBQU1DLEtBQU4sQ0FBWUMsRUFBRSxDQUFDQyxRQUFILENBQVlDLFNBQXhCLEVBQW1DO0lBRy9CQyxNQUgrQixrQkFHeEJDLEVBSHdCLEVBR3BCO01BQ1A7TUFFQSxJQUFJQyxTQUFKLEVBQWU7UUFDWFgsRUFBRSxDQUFDWSxNQUFILENBQVVDLG9CQUFWLEdBQWlDLENBQWpDO1FBQ0FiLEVBQUUsQ0FBQ1ksTUFBSCxDQUFVRSxtQkFBVixHQUFnQyxDQUFoQztNQUNIOztNQUVELEtBQUtDLE1BQUwsR0FBYyxLQUFkO01BQ0EsSUFBSSxLQUFLQSxNQUFULEVBQWlCO01BRWpCTCxFQUFFLElBQUksS0FBS00sU0FBTCxHQUFpQlYsRUFBRSxDQUFDVSxTQUExQjs7TUFFQSxJQUFJLEtBQUtDLGlCQUFMLEVBQUosRUFBOEI7UUFFMUI7UUFDQSxJQUFJLEtBQUtDLGNBQVQsRUFBeUI7VUFDckIsSUFBSSxLQUFLQyxlQUFMLENBQXFCQyxNQUFyQixLQUFnQyxDQUFoQyxJQUFxQyxDQUFDLEtBQUtDLFlBQS9DLEVBQTZEO1lBQ3pELElBQUlDLFVBQVUsR0FBRyxLQUFLQyxXQUF0Qjs7WUFDQSxJQUFJRCxVQUFVLElBQUlBLFVBQVUsQ0FBQ0UsU0FBWCxFQUFsQixFQUEwQztjQUN0Q0YsVUFBVSxDQUFDRyxhQUFYO2NBQ0EsSUFBSUMsTUFBTSxHQUFHSixVQUFVLENBQUNJLE1BQXhCO2NBQ0EsS0FBS0MsU0FBTCxHQUFpQkQsTUFBTSxDQUFDQSxNQUFNLENBQUNOLE1BQVAsR0FBZ0IsQ0FBakIsQ0FBdkI7WUFDSDs7WUFDRDtVQUNIOztVQUNELElBQUksQ0FBQyxLQUFLQyxZQUFWLEVBQXdCO1lBQ3BCLEtBQUtBLFlBQUwsR0FBb0IsS0FBS0YsZUFBTCxDQUFxQlMsS0FBckIsRUFBcEI7VUFDSDs7VUFDRCxLQUFLQyxRQUFMLElBQWlCbkIsRUFBakI7O1VBQ0EsSUFBSSxLQUFLbUIsUUFBTCxHQUFnQixLQUFLUixZQUFMLENBQWtCUyxLQUF0QyxFQUE2QztZQUN6QyxJQUFJQyxPQUFPLEdBQUcsS0FBS1YsWUFBbkI7WUFDQSxLQUFLQSxZQUFMLEdBQW9CLElBQXBCO1lBQ0EsS0FBS1csWUFBTCxDQUFrQixDQUFsQixFQUFxQkQsT0FBTyxDQUFDRSxhQUE3QixFQUE0Q0YsT0FBTyxDQUFDRyxJQUFwRDtVQUNIOztVQUNEO1FBQ0g7O1FBRUQsS0FBS0MsWUFBTCxDQUFrQnpCLEVBQWxCO01BQ0gsQ0ExQkQsTUEwQk87UUFDSCxLQUFLMEIsZUFBTCxDQUFxQjFCLEVBQXJCO01BQ0g7SUFDSjtFQTdDOEIsQ0FBbkM7QUFnREgsQ0FsREQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuZ2FtZS5vbmNlKGNjLmdhbWUuRVZFTlRfRU5HSU5FX0lOSVRFRCwgZnVuY3Rpb24gKCkge1xuXG4gICAgY2MuanMubWl4aW4oc3AuU2tlbGV0b24ucHJvdG90eXBlLCB7XG5cblxuICAgICAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgICAgIC8vIGlmIChDQ19FRElUT1IpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGNjLmVuZ2luZS5fYW5pbWF0aW5nSW5FZGl0TW9kZSA9IDE7XG4gICAgICAgICAgICAgICAgY2MuZW5naW5lLmFuaW1hdGluZ0luRWRpdE1vZGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGR0ICo9IHRoaXMudGltZVNjYWxlICogc3AudGltZVNjYWxlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBDYWNoZSBtb2RlIGFuZCBoYXMgYW5pbWF0aW9uIHF1ZXVlLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0FuaUNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25RdWV1ZS5sZW5ndGggPT09IDAgJiYgIXRoaXMuX2hlYWRBbmlJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVDYWNoZSA9IHRoaXMuX2ZyYW1lQ2FjaGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVDYWNoZSAmJiBmcmFtZUNhY2hlLmlzSW52YWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyYW1lcyA9IGZyYW1lQ2FjaGUuZnJhbWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hlYWRBbmlJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkQW5pSW5mbyA9IHRoaXMuX2FuaW1hdGlvblF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSArPSBkdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjY1RpbWUgPiB0aGlzLl9oZWFkQW5pSW5mby5kZWxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaUluZm8gPSB0aGlzLl9oZWFkQW5pSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRBbmlJbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKDAsIGFuaUluZm8uYW5pbWF0aW9uTmFtZSwgYW5pSW5mby5sb29wKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FjaGUoZHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZWFsdGltZShkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG59KVxuIl19