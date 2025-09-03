
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/base/AStart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '155d2MZN1lGoIi7287T/CDx', 'AStart');
// Script/base/AStart.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tool_1 = require("../util/tool");
var Point = /** @class */ (function () {
    function Point() {
        this.x = 0;
        this.y = 0;
        this.G = 0; //G值 开始点 到当前点的移动量
        this.H = 0; //H值　当前点移动目的地的移动量估算值
        this.father = null;
    }
    Point.prototype.Console = function () {
        console.log("x:" + this.x + " and y:" + this.y);
    };
    Point.prototype.Init = function (x, y, father) {
        this.x = x;
        this.y = y;
        this.father = father;
    };
    return Point;
}());
var AStar = /** @class */ (function () {
    function AStar() {
        /**地图存放二维数组*/
        this.map = [];
        /**行数*/
        this.rowCount = 0;
        /**列数*/
        this.colCount = 0;
        /**出发点*/
        this.startPoint = new Point();
        /**终点*/
        this.endPoint = new Point();
        /**存放Opint类的open数组*/
        this.openList = [];
        /**存在Opint类的close数组*/
        this.closeList = [];
    }
    /**最终行走路线 */
    /**初始化
     * @param map 二维数组
     * @param rowCount 行数
     * @param colCount 列数
    */
    AStar.prototype.init = function (map, rowCount, colCount) {
        this.map = this.changeMap(map);
        this.rowCount = rowCount;
        this.colCount = colCount;
    };
    /**
     * 转变成该寻路方法的地图二维数组
     * 以前 0 空 1炮塔位置 2开始点 3结束点 4 道路
     * 现在0 空（道路）　1 开始点　2 结束点　3 障碍物
     * @param map 二维数组
     */
    AStar.prototype.changeMap = function (map) {
        var newMap = tool_1.default.deepClone(map);
        for (var i = 0; i < newMap.length; i++) {
            for (var j = 0; j < newMap[i].length; j++) {
                var item = newMap[i][j];
                if (item == 0 || item == 1) {
                    newMap[i][j] = 3;
                }
                else if (item == 2) {
                    newMap[i][j] = 1;
                    this.startPoint.x = i;
                    this.startPoint.y = j;
                }
                else if (item == 3) {
                    newMap[i][j] = 2;
                    this.endPoint.x = i;
                    this.endPoint.y = j;
                }
                else if (item == 4) {
                    newMap[i][j] = 0;
                }
            }
        }
        return newMap;
    };
    /**
     *
     * @param x
     * @param y
     */
    AStar.prototype.IsBar = function (x, y) {
        if (this.map[x][y] == 3) {
            return true;
        }
        else {
            return false;
        }
    };
    /**当前坐标是否在OpenList*/
    AStar.prototype.IsInOpenList = function (x, y) {
        for (var i = 0; i < this.openList.length; i++) {
            if (this.openList[i].x == x && this.openList[i].y == y) {
                return true;
            }
        }
        return false;
    };
    /**当前坐标是否在CloseList*/
    AStar.prototype.IsInCloseList = function (x, y) {
        for (var i = 0; i < this.closeList.length; i++) {
            if (this.closeList[i].x == x && this.closeList[i].y == y) {
                return true;
            }
        }
        return false;
    };
    /**计算G值;(p是Point类)*/
    AStar.prototype.GetG = function (p) {
        if (p.father == null) {
            return 0;
        }
        return p.father.G + 1;
    };
    /**计算H值*/
    AStar.prototype.GetH = function (p, pb) {
        return Math.abs(p.x - pb.x) + Math.abs(p.y - pb.y);
    };
    /**添加当前点的上下左右相邻的方格到Open列表中*/
    AStar.prototype.AddNeiToOpenList = function (curPoint) {
        for (var x = curPoint.x - 1; x <= curPoint.x + 1; x++) {
            for (var y = curPoint.y - 1; y <= curPoint.y + 1; y++) {
                //排除自身以及超出下标的点
                if ((x >= 0 && x < this.colCount && y >= 0 && y < this.rowCount) && !(curPoint.x == x && curPoint.y == y)) {
                    //排除斜对角
                    if (Math.abs(x - curPoint.x) + Math.abs(y - curPoint.y) == 1) {
                        //不是障碍物且不在关闭列表中
                        if (this.IsBar(x, y) == false && this.IsInCloseList(x, y) == false) {
                            //不存在Open列表
                            if (this.IsInOpenList(x, y) == false) {
                                var point = new Point();
                                point.x = x;
                                point.y = y;
                                point.father = curPoint;
                                point.G = this.GetG(point);
                                point.H = this.GetH(point, this.endPoint);
                                this.openList.push(point);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * 在openlist集合中获取G+H为最小的Point点
     */
    AStar.prototype.GetMinFFromOpenList = function () {
        var minPoint = null;
        var index = 0;
        for (var i = 0; i < this.openList.length; i++) {
            if (minPoint == null || minPoint.G + minPoint.H >= this.openList[i].G + this.openList[i].H) {
                minPoint = this.openList[i];
                index = i;
            }
        }
        return {
            minPoint: minPoint,
            index: index
        };
    };
    /**
     *
     * @param x
     * @param y
     */
    AStar.prototype.GetPointFromOpenList = function (x, y) {
        for (var i = 0; i < this.openList.length; i++) {
            if (this.openList[i].x == x && this.openList[i].y == y) {
                return this.openList[i];
            }
        }
        return null;
    };
    /**
     * 开始寻找节点并返寻走路线 如果有返回数组，没有就返回null
     * @param call 回调
     */
    AStar.prototype.FindPoint = function (call) {
        console.log(this);
        this.openList.push(this.startPoint);
        while (this.IsInOpenList(this.endPoint.x, this.endPoint.y) == false || this.openList.length == 0) {
            var data = this.GetMinFFromOpenList();
            var curPoint = data.minPoint;
            var index = data.index;
            if (curPoint == null) {
                call && call(null);
                return null;
            }
            this.openList.splice(index, 1);
            this.closeList.push(curPoint);
            this.AddNeiToOpenList(curPoint);
        }
        var p = this.GetPointFromOpenList(this.endPoint.x, this.endPoint.y);
        while (p.father != null) {
            p = p.father;
            this.map[p.x][p.y] = 4;
        }
        //把终结点也设置成4
        this.map[this.endPoint.x][this.endPoint.y] = 4;
        //添加结束点
        this.closeList.push(this.endPoint);
        call && call(this.closeList);
    };
    return AStar;
}());
exports.default = AStar;
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxBU3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFFaEM7SUFBQTtRQUNJLE1BQUMsR0FBQyxDQUFDLENBQUM7UUFDSixNQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLGlCQUFpQjtRQUNyQixNQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsb0JBQW9CO1FBQ3hCLFdBQU0sR0FBQyxJQUFJLENBQUM7SUFTaEIsQ0FBQztJQVJHLHVCQUFPLEdBQVA7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELG9CQUFJLEdBQUosVUFBSyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU07UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQUlEO0lBQUE7UUFFSSxhQUFhO1FBQ2IsUUFBRyxHQUFZLEVBQUUsQ0FBQztRQUNsQixPQUFPO1FBQ1AsYUFBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixPQUFPO1FBQ1AsYUFBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixRQUFRO1FBQ1IsZUFBVSxHQUFTLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0IsT0FBTztRQUNQLGFBQVEsR0FBUyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzdCLG9CQUFvQjtRQUNwQixhQUFRLEdBQUssRUFBRSxDQUFDO1FBQ2hCLHFCQUFxQjtRQUNyQixjQUFTLEdBQUssRUFBRSxDQUFDO0lBcUxyQixDQUFDO0lBcExHLFlB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WCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFFN0MsT0FBTztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBR0wsWUFBQztBQUFELENBcE1BLEFBb01DLElBQUE7O0FBQUEsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcblxuY2xhc3MgUG9pbnQge1xuICAgIHg9MDtcbiAgICB5PTA7XG4gICAgRz0wOy8vR+WAvCDlvIDlp4vngrkg5Yiw5b2T5YmN54K555qE56e75Yqo6YePXG4gICAgSD0wOy8vSOWAvOOAgOW9k+WJjeeCueenu+WKqOebrueahOWcsOeahOenu+WKqOmHj+S8sOeul+WAvFxuICAgIGZhdGhlcj1udWxsO1xuICAgIENvbnNvbGUoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ4OlwiK3RoaXMueCtcIiBhbmQgeTpcIit0aGlzLnkpO1xuICAgIH1cbiAgICBJbml0KHgseSxmYXRoZXIpe1xuICAgICAgICB0aGlzLng9eDtcbiAgICAgICAgdGhpcy55PXk7XG4gICAgICAgIHRoaXMuZmF0aGVyPWZhdGhlcjtcbiAgICB9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBU3RhcntcblxuICAgIC8qKuWcsOWbvuWtmOaUvuS6jOe7tOaVsOe7hCovXG4gICAgbWFwOm51bWJlcltdW109W107XG4gICAgLyoq6KGM5pWwKi9cbiAgICByb3dDb3VudDpudW1iZXI9MDtcbiAgICAvKirliJfmlbAqL1xuICAgIGNvbENvdW50Om51bWJlcj0wO1xuICAgIC8qKuWHuuWPkeeCuSovXG4gICAgc3RhcnRQb2ludDpQb2ludCA9IG5ldyBQb2ludCgpO1xuICAgIC8qKue7iOeCuSovXG4gICAgZW5kUG9pbnQ6UG9pbnQgPSBuZXcgUG9pbnQoKTtcbiAgICAvKirlrZjmlL5PcGludOexu+eahG9wZW7mlbDnu4QqL1xuICAgIG9wZW5MaXN0OmFueT1bXTtcbiAgICAvKirlrZjlnKhPcGludOexu+eahGNsb3Nl5pWw57uEKi9cbiAgICBjbG9zZUxpc3Q6YW55PVtdO1xuICAgIC8qKuacgOe7iOihjOi1sOi3r+e6vyAqL1xuXG5cbiAgICAvKirliJ3lp4vljJYgXG4gICAgICogQHBhcmFtIG1hcCDkuoznu7TmlbDnu4RcbiAgICAgKiBAcGFyYW0gcm93Q291bnQg6KGM5pWwXG4gICAgICogQHBhcmFtIGNvbENvdW50IOWIl+aVsFxuICAgICovXG4gICAgaW5pdChtYXA6bnVtYmVyW11bXSxyb3dDb3VudDpudW1iZXIsY29sQ291bnQ6bnVtYmVyKXtcbiAgICAgICB0aGlzLm1hcCA9IHRoaXMuY2hhbmdlTWFwKG1hcCk7XG4gICAgICAgdGhpcy5yb3dDb3VudCA9IHJvd0NvdW50O1xuICAgICAgIHRoaXMuY29sQ291bnQgPSBjb2xDb3VudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDovazlj5jmiJDor6Xlr7vot6/mlrnms5XnmoTlnLDlm77kuoznu7TmlbDnu4QgXG4gICAgICog5Lul5YmNIDAg56m6IDHngq7loZTkvY3nva4gMuW8gOWni+eCuSAz57uT5p2f54K5IDQg6YGT6LevXG4gICAgICog546w5ZyoMCDnqbrvvIjpgZPot6/vvInjgIAxIOW8gOWni+eCueOAgDIg57uT5p2f54K544CAMyDpmpznoo3nialcbiAgICAgKiBAcGFyYW0gbWFwIOS6jOe7tOaVsOe7hFxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlTWFwKG1hcDpudW1iZXJbXVtdKXtcblxuICAgICAgICBsZXQgbmV3TWFwOm51bWJlcltdW10gPSB0b29sLmRlZXBDbG9uZShtYXApO1xuICAgICAgICBcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPG5ld01hcC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7ajxuZXdNYXBbaV0ubGVuZ3RoO2orKyl7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXdNYXBbaV1bal07XG4gICAgICAgICAgICAgICAgaWYoaXRlbT09MHx8aXRlbT09MSl7XG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXT0zO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW09PTIpe1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXBbaV1bal09MTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50LnggPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnQueSA9IGo7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaXRlbT09Myl7XG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXT0yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFBvaW50LnggPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFBvaW50LnkgPSBqO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW09PTQpe1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXBbaV1bal09MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld01hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geCBcbiAgICAgKiBAcGFyYW0geSBcbiAgICAgKi9cblxuICAgIHByaXZhdGUgSXNCYXIoeCx5KXtcbiAgICAgICAgaWYodGhpcy5tYXBbeF1beV09PTMpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKirlvZPliY3lnZDmoIfmmK/lkKblnKhPcGVuTGlzdCovXG4gICAgcHJpdmF0ZSBJc0luT3Blbkxpc3QoeCx5KXtcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5vcGVuTGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm9wZW5MaXN0W2ldLng9PXgmJnRoaXMub3Blbkxpc3RbaV0ueT09eSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKuW9k+WJjeWdkOagh+aYr+WQpuWcqENsb3NlTGlzdCovXG4gICAgcHJpdmF0ZSBJc0luQ2xvc2VMaXN0KHgseSl7XG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5jbG9zZUxpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0aGlzLmNsb3NlTGlzdFtpXS54PT14JiZ0aGlzLmNsb3NlTGlzdFtpXS55PT15KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoq6K6h566XR+WAvDsocOaYr1BvaW5057G7KSovXG4gICAgcHJpdmF0ZSBHZXRHKHApe1xuICAgICAgICBpZihwLmZhdGhlcj09bnVsbCl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcC5mYXRoZXIuRysxO1xuICAgIH1cbiAgICAvKirorqHnrpdI5YC8Ki9cbiAgICBwcml2YXRlIEdldEgocCxwYil7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhwLngtcGIueCkrTWF0aC5hYnMocC55LXBiLnkpO1xuICAgIH1cbiAgICAvKirmt7vliqDlvZPliY3ngrnnmoTkuIrkuIvlt6blj7Pnm7jpgrvnmoTmlrnmoLzliLBPcGVu5YiX6KGo5LitKi9cbiAgICBwcml2YXRlIEFkZE5laVRvT3Blbkxpc3QoY3VyUG9pbnQpe1xuICAgICAgICBmb3IodmFyIHg9Y3VyUG9pbnQueC0xO3g8PWN1clBvaW50LngrMTt4Kyspe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeT1jdXJQb2ludC55LTE7eTw9Y3VyUG9pbnQueSsxO3krKyl7XG4gICAgICAgICAgICAgICAgICAgIC8v5o6S6Zmk6Ieq6Lqr5Lul5Y+K6LaF5Ye65LiL5qCH55qE54K5XG4gICAgICAgICAgICAgICAgICAgIGlmKCh4Pj0wJiZ4PHRoaXMuY29sQ291bnQmJnk+PTAmJnk8dGhpcy5yb3dDb3VudCkmJiEoY3VyUG9pbnQueD09eCYmY3VyUG9pbnQueT09eSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/mjpLpmaTmlpzlr7nop5JcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKHgtY3VyUG9pbnQueCkrTWF0aC5hYnMoeS1jdXJQb2ludC55KT09MSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuI3mmK/pmpznoo3niankuJTkuI3lnKjlhbPpl63liJfooajkuK1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLklzQmFyKHgseSk9PWZhbHNlJiZ0aGlzLklzSW5DbG9zZUxpc3QoeCx5KT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqE9wZW7liJfooahcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5Jc0luT3Blbkxpc3QoeCx5KT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50PW5ldyBQb2ludCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQueD14O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQueT15O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQuZmF0aGVyPWN1clBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQuRz10aGlzLkdldEcocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQuSD10aGlzLkdldEgocG9pbnQsdGhpcy5lbmRQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5MaXN0LnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWcqG9wZW5saXN06ZuG5ZCI5Lit6I635Y+WRytI5Li65pyA5bCP55qEUG9pbnTngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIEdldE1pbkZGcm9tT3Blbkxpc3QoKXtcbiAgICAgICAgdmFyIG1pblBvaW50PW51bGw7XG4gICAgICAgIHZhciBpbmRleD0wO1xuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMub3Blbkxpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZihtaW5Qb2ludD09bnVsbHx8bWluUG9pbnQuRyttaW5Qb2ludC5IPj10aGlzLm9wZW5MaXN0W2ldLkcrdGhpcy5vcGVuTGlzdFtpXS5IKXtcbiAgICAgICAgICAgICAgICBtaW5Qb2ludD10aGlzLm9wZW5MaXN0W2ldO1xuICAgICAgICAgICAgICAgIGluZGV4PWk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgbWluUG9pbnQ6bWluUG9pbnQsXG4gICAgICAgICAgICBpbmRleDppbmRleFxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB4IFxuICAgICAqIEBwYXJhbSB5IFxuICAgICAqL1xuICAgIHByaXZhdGUgR2V0UG9pbnRGcm9tT3Blbkxpc3QoeCx5KXtcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLm9wZW5MaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgaWYodGhpcy5vcGVuTGlzdFtpXS54PT14JiZ0aGlzLm9wZW5MaXN0W2ldLnk9PXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5MaXN0W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW8gOWni+Wvu+aJvuiKgueCueW5tui/lOWvu+i1sOi3r+e6vyDlpoLmnpzmnInov5Tlm57mlbDnu4TvvIzmsqHmnInlsLHov5Tlm55udWxsXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXG4gICAgICovXG4gICAgRmluZFBvaW50KGNhbGw6RnVuY3Rpb24pe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5vcGVuTGlzdC5wdXNoKHRoaXMuc3RhcnRQb2ludCk7XG4gICAgICAgIHdoaWxlKHRoaXMuSXNJbk9wZW5MaXN0KHRoaXMuZW5kUG9pbnQueCx0aGlzLmVuZFBvaW50LnkpPT1mYWxzZXx8dGhpcy5vcGVuTGlzdC5sZW5ndGg9PTApe1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLkdldE1pbkZGcm9tT3Blbkxpc3QoKTtcbiAgICAgICAgICAgIHZhciBjdXJQb2ludD1kYXRhLm1pblBvaW50O1xuICAgICAgICAgICAgdmFyIGluZGV4PWRhdGEuaW5kZXg7XG4gICAgICAgICAgICBpZihjdXJQb2ludD09bnVsbCl7XG4gICAgICAgICAgICAgICAgY2FsbCYmY2FsbChudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUxpc3QucHVzaChjdXJQb2ludCk7XG4gICAgICAgICAgICB0aGlzLkFkZE5laVRvT3Blbkxpc3QoY3VyUG9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwPXRoaXMuR2V0UG9pbnRGcm9tT3Blbkxpc3QodGhpcy5lbmRQb2ludC54LHRoaXMuZW5kUG9pbnQueSk7XG4gICAgICAgIHdoaWxlKHAuZmF0aGVyIT1udWxsKXtcbiAgICAgICAgICAgIHA9IHAuZmF0aGVyO1xuICAgICAgICAgICAgdGhpcy5tYXBbcC54XVtwLnldPTQ7XG4gICAgICAgIH1cbiAgICAgICAgLy/miornu4jnu5PngrnkuZ/orr7nva7miJA0XG4gICAgICAgIHRoaXMubWFwW3RoaXMuZW5kUG9pbnQueF1bdGhpcy5lbmRQb2ludC55XT00O1xuXG4gICAgICAgIC8v5re75Yqg57uT5p2f54K5XG4gICAgICAgIHRoaXMuY2xvc2VMaXN0LnB1c2godGhpcy5lbmRQb2ludCk7XG4gICAgICAgIGNhbGwmJmNhbGwodGhpcy5jbG9zZUxpc3QpO1xuICAgIH1cblxuICAgXG59O1xuIl19