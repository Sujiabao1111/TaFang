
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/data/userData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7fd0b6m27RCuIfZz/Gazr1B', 'userData');
// Script/data/userData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData = /** @class */ (function () {
    function UserData() {
        //哪个格子出现了空地宝箱
        this.emptyBoxNo = -1;
    }
    return UserData;
}());
exports.default = UserData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxkYXRhXFx1c2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0lBQUE7UUFzQ0ksYUFBYTtRQUNiLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztJQTJDNUIsQ0FBQztJQUFELGVBQUM7QUFBRCxDQWxGQSxBQWtGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBjdXN0b21zSW5mbywgSGVhdmVuUG9vbEluZm8sIFBvb2xJbmZvLCBwcm9wSW5mbywgVHJlYXN1cmVJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9mYWNlVHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckRhdGEge1xuXG4gICAgLy/msaDloZjmlbDmja5cbiAgICBwb29sOiBQb29sSW5mb1tdO1xuXG4gICAgLy/ph5HluIFcbiAgICBjb2luOiBudW1iZXI7XG5cbiAgICAvL+e6ouWMheaVsOaNrlxuICAgIGhvbmdiYW86IG51bWJlcjtcblxuICAgIC8v5YWz5Y2hXG4gICAgY3VzdG9tczogY3VzdG9tc0luZm9cblxuICAgIC8v55Sf5Lqn5LqG5aSa5bCR5LiqXG4gICAgcHJvZHVjdDogbnVtYmVyXG5cbiAgICAvL+W9k+WJjeacgOmrmOeCruWhlOeahOetiee6p1xuICAgIHR1cnJldExldmVsOiBudW1iZXJcblxuICAgIC8v6YGT5YW3XG4gICAgcHJvcDogcHJvcEluZm9bXVxuXG4gICAgLy/ph5HluIHmjaLkurrmsJHluIHmsYfnjodcbiAgICBleGNoYW5nZVJhdGU6IG51bWJlclxuXG4gICAgLy/mmK/lkKbmmK/mlrDnlKjmiLdcbiAgICBuZXdVc2VyOiBib29sZWFuXG5cbiAgICAvL+WQiOaIkOWkmuWwkeasoVxuICAgIGNvbXBvdW5kVGltZXM6IG51bWJlclxuXG4gICAgLy/mlrDmiYvlvJXlr7zmmK/lkKbov4fkuoZcbiAgICBub3ZpY2VHdWlkZTogbnVtYmVyXG4gICAgLy/otK3kubDkuoblpJrlsJHmrKFcbiAgICBidXlDb3VudDogbnVtYmVyXG4gICAgLy/otK3kubDkuoblpJrlsJHmrKFcbiAgICBoZWF2ZW5Qb29sOiBIZWF2ZW5Qb29sSW5mb1tdXG4gICAgLy/lk6rkuKrmoLzlrZDlh7rnjrDkuobnqbrlnLDlrp3nrrFcbiAgICBlbXB0eUJveE5vOiBudW1iZXIgPSAtMTtcblxuICAgIC8v5bey57uP5Ye6546w5LqG55qE5a6d566xXG4gICAgaGF2ZVRyZWFzdXJlOiBudW1iZXJbXVxuXG4gICAgLy/mnJ/pl7Tojrflj5bnmoTph5HluIHmlbDvvIjnrb7liLDvvIlcbiAgICB0ZXJtQ29pbjogbnVtYmVyXG5cbiAgICAvL+iOt+WPluemu+e6v+mHkeW4gVxuICAgIG9mZmxpbmVJbmNvbWU6IHtcbiAgICAgICAgbXVsdGlwbGVSZXdhcmQ6IG51bWJlciwgLy/nv7vlgI3nmoRcbiAgICAgICAgcmV3YXJkOiBudW1iZXIgLy/ljZXlgI3nmoRcbiAgICB9XG4gICAgLy/niYjmnKxcbiAgICB2ZXJzaW9uOiBudW1iZXJcbiAgICAvL+eCruWhlOiOt+WPluasoeaVsFxuICAgIEdldFR1cnJldE51bTogbnVtYmVyXG4gICAgLy/ojrflj5blvZPlpKnml7bpl7RcbiAgICBHZXREYXlUaW1lOiBudW1iZXJcbiAgICAvL+aYr+WQpummluasoeeCueWHu1xuICAgIGF1dG9Qcm9wOiBudW1iZXJcbiAgICAvL+epuumZjeeCruWhlFxuICAgIGFpcmJvcm5lQ291bnQ6IG51bWJlclxuICAgIC8v5ZCI5oiQ5qyh5pWwXG4gICAgc3ludGhlc2lzX3RpbWVzOiBudW1iZXJcbiAgICAvL+WQiOaIkOasoeaVsFxuICAgIHN5bnRoZXNpc19BbGw6IG51bWJlclxuICAgIC8v6Kej6ZSB5pe26Ze0XG4gICAgdW5sb2NraW5nX3RpbWU6IG51bWJlclxuICAgIC8v6YGT5YW36K+m57uG6KGoXG4gICAgcHJvcENvbmZpZzogYW55XG4gICAgLy/mirXlvqHmrKHmlbBcbiAgICByZXNpc3RBdHRhY2tUaW1lczogbnVtYmVyXG4gICAgLy/mnKzlnLDlrZjlgqjlkIjmiJDmrKHmlbBcbiAgICBsb2NhbENvbXBvdW5kVGltZTogbnVtYmVyXG5cbiAgICAvL+aKveaUtumbhuavj+asoei/m+WFpeeahOaXtumXtFxuICAgIGRheUVudGVyU2lnbk51bTogbnVtYmVyXG4gICAgLy/ph5HluIHovaznm5jmrKHmlbBcbiAgICBnb2xkV2hlZWxDb3VudDogbnVtYmVyXG5cbiAgICAvKirlrZjpkrHnvZAqL1xuICAgIHNhdmluZ1BvdE51bTogbnVtYmVyXG59XG4iXX0=