"use strict";
cc._RF.push(module, 'ba13duip7RHKqrTplvFUvAC', 'gamePropBox');
// Script/pop/gamePropBox.ts

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
var NameTs_1 = require("../common/NameTs");
var propItem_1 = require("../prop/propItem");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePropBox = /** @class */ (function (_super) {
    __extends(gamePropBox, _super);
    function gamePropBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layOutContent = null;
        _this.ScrollView = null;
        _this.propData = new Map();
        return _this;
        // update (dt) {}
    }
    gamePropBox.prototype.onLoad = function () {
        var _this = this;
        /**道具 */
        // let propData = jsonSingleton.singleton.getJson(NameTs.propData);
        this.loadAny("prefab/prop/propItem2", cc.Prefab, function (pre) {
            if (util_1.default && util_1.default.propData) {
                util_1.default.propData.forEach(function (value) {
                    var item = cc.instantiate(pre);
                    item.setParent(_this.layOutContent);
                    var itemTs = item.getComponent(propItem_1.default);
                    if (itemTs)
                        itemTs.init && itemTs.init(value);
                    _this.propData.set("prop_" + value.propIssueDetailList[0].propsId, item);
                });
            }
            cc.game.emit(NameTs_1.default.Game_PropItem_Update);
            _this.ScrollView.scrollToPercentHorizontal(.05, .2);
        });
        cc.game.on(NameTs_1.default.Game_PropItem_Update, function () {
            _this.checkUpDateProp();
        }, this);
    };
    gamePropBox.prototype.start = function () {
    };
    gamePropBox.prototype.onEnable = function () {
    };
    /**
     *
     */
    gamePropBox.prototype.checkUpDateProp = function () {
        var num = 0; //道具大于0的有几个
        for (var i = 0; i < util_1.default.userData.prop.length; i++) {
            var item = this.propData.get("prop_" + util_1.default.userData.prop[i].type);
            console.log(util_1.default.userData.prop[i].num, 'util.userData.prop[i].num');
            if (item) {
                item.active = util_1.default.userData.prop[i].num > 0;
            }
            if (util_1.default.userData.prop[i].num > 0) {
                num++;
            }
        }
        if (num == 1) {
            this.node.width = 120;
        }
        else if (num == 2) {
            this.node.width = 200;
        }
        else {
            this.node.width = 255;
        }
        this.node.height = num == 0 ? 0 : 90;
    };
    __decorate([
        property({ type: cc.Node, displayName: "layout框" })
    ], gamePropBox.prototype, "layOutContent", void 0);
    __decorate([
        property({ type: cc.ScrollView, displayName: "滚动条" })
    ], gamePropBox.prototype, "ScrollView", void 0);
    gamePropBox = __decorate([
        ccclass
    ], gamePropBox);
    return gamePropBox;
}(baseTs_1.default));
exports.default = gamePropBox;

cc._RF.pop();