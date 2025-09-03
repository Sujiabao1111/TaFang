"use strict";
cc._RF.push(module, '143dbDpUYJE+4l4zMgJ3BV5', 'gameProp');
// Script/pop/gameProp.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseTs_1 = require("../base/baseTs");
var jsonSingleton_1 = require("../base/jsonSingleton");
var NameTs_1 = require("../common/NameTs");
var propItem_1 = require("../prop/propItem");
var soundController_1 = require("../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameProp = /** @class */ (function (_super) {
    __extends(gameProp, _super);
    function gameProp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layOutContent = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    /**初始化 */
    gameProp.prototype.init = function () {
        var _this = this;
        /**道具 */
        var propData = jsonSingleton_1.default.singleton.getJson(NameTs_1.default.propData);
        this.loadAny("prefab/prop/propItem", cc.Prefab, function (pre) {
            _this.propPre = pre;
            if (propData) {
                propData.forEach(function (value) {
                    var item = cc.instantiate(pre);
                    item.setParent(_this.layOutContent);
                    var itemTs = item.getComponent(propItem_1.default);
                    if (itemTs)
                        itemTs.init && itemTs.init(value);
                });
            }
        });
    };
    gameProp.prototype.start = function () {
    };
    /**关闭 */
    gameProp.prototype.closeBtn = function () {
        soundController_1.default.singleton.clickAudio();
        this.propPre = null;
        this.closePage();
    };
    __decorate([
        property({ type: cc.Node, displayName: "layout框" })
    ], gameProp.prototype, "layOutContent", void 0);
    gameProp = __decorate([
        ccclass
    ], gameProp);
    return gameProp;
}(baseTs_1.default));
exports.default = gameProp;

cc._RF.pop();