
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Storage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ec05Z5x1pK37/Ye9eTbni2', 'Storage');
// Script/server/xmsdk_cocos/Utils/Storage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var Storage;
(function (Storage) {
    /**
     * 判断是否符合执行条件
     * @param {*} key 缓存key
     * @param {*} needKey 是否必须传key
     */
    function isEnabled(key, needKey) {
        if (typeof window === 'object' && localStorage && (!needKey || key && typeof key === 'string')) {
            return true;
        }
    }
    Storage.isEnabled = isEnabled;
    /**
     * 过期时间格式话
     * @param {*} expires 过期时间 "2019-1-14 21:38:00"【具体时间】 || (1 | "1" | "1d")【天】 || "1h"【小时】 || "1m"【分钟】 || "1s"【秒】 || "0n"【自然日】
     */
    function formatExpires(expires) {
        var date = new Date(), unit = 86400000; //天
        if (typeof expires === 'string') {
            var time = parseFloat(expires);
            if (expires.includes('n') && time != null && time >= 0) {
                //自然日
                date.setTime(date.getTime() + unit * time);
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
                expires = date.getTime();
            }
            else if (/^\w+$/.test(expires) && time != null && time > 0) {
                //天/时/分/秒
                if (expires.includes('h')) {
                    unit = 3600000; //时
                }
                else if (expires.includes('m')) {
                    unit = 60000; //分
                }
                else if (expires.includes('s')) {
                    unit = 1000; //秒
                }
                date.setTime(date.getTime() + unit * parseFloat(expires));
                expires = date.getTime();
            }
            else {
                //时间格式字符串
                var arr = expires.trim().split(/\D+/g);
                if (arr.length >= 3 && !isNaN(arr[0]) && !isNaN(arr[1]) && !isNaN(arr[2])) {
                    date = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]), parseInt(arr[3]) || 23, parseInt(arr[4]) || 59, parseInt(arr[5]) || 59);
                    expires = date.getTime();
                }
                else {
                    expires = 0;
                }
            }
        }
        else if (typeof expires === 'number' && expires > 0) {
            expires = date.getTime() + expires;
        }
        else {
            expires = 0;
        }
        return expires;
    }
    Storage.formatExpires = formatExpires;
    /**
     * 设置缓存，可设置过期时间
     * @param {*} key 缓存key
     * @param {*} data 缓存数据
     * @param {expires, success, fail} extra
     *  expires "2019-1-14 21:38:00"【具体时间】 || (1 | "1" | "1d")【天】 || "1h"【小时】 || "1m"【分钟】 || "1s"【秒】 || "0n"【自然日】
     */
    function set(key, data, extra) {
        if (typeof extra !== 'object') {
            extra = {};
        }
        var expires = extra.expires, resetData = extra.resetData;
        if (!Storage.isEnabled(key, true) && data !== undefined) {
            return false;
        }
        if (expires) {
            expires = Storage.formatExpires(expires);
            if (expires) {
                var dataobj = {
                    operateTime: Date.now(),
                    expires: expires,
                    data: data,
                };
                resetData && (dataobj.resetData = resetData);
                localStorage.setItem(key, JSON.stringify(dataobj));
                // Log.log('设置，过期时间:', new Date(expires));
            }
            else {
                return false;
            }
        }
        else {
            var dataobj = {
                operateTime: Date.now(),
                data: data
            };
            localStorage.setItem(key, JSON.stringify(dataobj));
        }
        return true;
    }
    Storage.set = set;
    /**
     * 获取缓存
     * @param {*} key 缓存key
     */
    function get(key) {
        if (!Storage.isEnabled(key, true)) {
            return;
        }
        var data, storageData = localStorage.getItem(key);
        if (typeof storageData === 'string') {
            try {
                data = JSON.parse(storageData);
            }
            catch (err) {
            }
        }
        if (data && data.expires && Date.now() > data.expires) {
            if (data.resetData) {
                data = data.resetData;
                Storage.set(key, data, {});
                // Log.log('获取，已过期时间:', new Date(data.expires));
            }
            else {
                Storage.remove(key);
                // Log.log('获取，已过期时间:', new Date(data.expires));
                data = undefined;
            }
        }
        else if (data && data.operateTime) {
            data = data.data;
        }
        else {
            data = typeof storageData === 'string' ? JSON.parse(storageData) : storageData;
        }
        return data;
    }
    Storage.get = get;
    /**
     * 获取所有缓存
     */
    function getAll() {
        var results = [];
        var keys = Storage.getkeys();
        if (keys) {
            keys.forEach(function (key) {
                results.push({
                    key: key,
                    data: Storage.get(key)
                });
            });
        }
        return results;
    }
    Storage.getAll = getAll;
    /**
     * 获取所有缓存key
     */
    function getkeys() {
        var i = 0, keys = [];
        while (localStorage.key(i)) {
            keys.push(localStorage.key(i));
            i++;
        }
        return keys;
    }
    Storage.getkeys = getkeys;
    /**
     * 移除缓存
     * @param {*} key 缓存key
     */
    function remove(key) {
        if (!Storage.isEnabled(key, true)) {
            return;
        }
        var Key = localStorage.key;
        localStorage.removeItem(key);
        localStorage.key = Key;
    }
    Storage.remove = remove;
    /**
     * 清除过期缓存
     * @param {*} isExpires 执行清除过期缓存
     */
    function clear(isExpires) {
        if (!Storage.isEnabled()) {
            return;
        }
        if (isExpires) {
            var keys = Storage.getkeys();
            if (keys) {
                keys.forEach(function (key) {
                    Storage.get(key);
                });
            }
        }
        else {
            localStorage.clear();
        }
    }
    Storage.clear = clear;
    // 获取缓存（适用用于记录当日次数的缓存）
    function getStorageTimes(keyName) {
        // Storage.clear(true);
        var times = Storage.get(keyName);
        if (times === null || !times) {
            return 0;
        }
        else {
            return times;
        }
    }
    Storage.getStorageTimes = getStorageTimes;
    // 设置次数（适用用于记录当日次数的缓存）
    function setStorageTimes(keyName, value, extra) {
        if (value === void 0) { value = 1; }
        var times = +Storage.getStorageTimes(keyName) + value;
        Storage.set(keyName, times, extra);
    }
    Storage.setStorageTimes = setStorageTimes;
})(Storage = exports.Storage || (exports.Storage = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcU3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxJQUFjLE9BQU8sQ0FnT3BCO0FBaE9ELFdBQWMsT0FBTztJQUNqQjs7OztPQUlHO0lBQ0gsU0FBZ0IsU0FBUyxDQUFDLEdBQVksRUFBRSxPQUFpQjtRQUNyRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUU7WUFDNUYsT0FBTyxJQUFJLENBQUE7U0FDZDtJQUNMLENBQUM7SUFKZSxpQkFBUyxZQUl4QixDQUFBO0lBRUQ7OztPQUdHO0lBQ0gsU0FBZ0IsYUFBYSxDQUFDLE9BQXdCO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLEVBQ2pCLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHO1FBRXhCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNwRCxLQUFLO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ2hGLE9BQU8sR0FB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QWU7UUFDM0MsdUJBQXVCO1FBQ3ZCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQVJlLHVCQUFlLGtCQVE5QixDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLFNBQWdCLGVBQWUsQ0FBQyxPQUFlLEVBQUUsS0FBUyxFQUFFLEtBQU07UUFBakIsc0JBQUEsRUFBQSxTQUFTO1FBQ3RELElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFIZSx1QkFBZSxrQkFHOUIsQ0FBQTtBQUNMLENBQUMsRUFoT2EsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBZ09wQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIERhdGFvYmogPSB7XG4gICAgb3BlcmF0ZVRpbWU6IGFueSxcbiAgICBleHBpcmVzPzogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGRhdGE6IGFueSxcbiAgICByZXNldERhdGE/OiBhbnlcbn1cblxuZXhwb3J0IG1vZHVsZSBTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKiDliKTmlq3mmK/lkKbnrKblkIjmiafooYzmnaHku7ZcbiAgICAgKiBAcGFyYW0geyp9IGtleSDnvJPlrZhrZXlcbiAgICAgKiBAcGFyYW0geyp9IG5lZWRLZXkg5piv5ZCm5b+F6aG75Lyga2V5XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzRW5hYmxlZChrZXk/OiBzdHJpbmcsIG5lZWRLZXk/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiBsb2NhbFN0b3JhZ2UgJiYgKCFuZWVkS2V5IHx8IGtleSAmJiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov4fmnJ/ml7bpl7TmoLzlvI/or51cbiAgICAgKiBAcGFyYW0geyp9IGV4cGlyZXMg6L+H5pyf5pe26Ze0IFwiMjAxOS0xLTE0IDIxOjM4OjAwXCLjgJDlhbfkvZPml7bpl7TjgJEgfHwgKDEgfCBcIjFcIiB8IFwiMWRcIinjgJDlpKnjgJEgfHwgXCIxaFwi44CQ5bCP5pe244CRIHx8IFwiMW1cIuOAkOWIhumSn+OAkSB8fCBcIjFzXCLjgJDnp5LjgJEgfHwgXCIwblwi44CQ6Ieq54S25pel44CRXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEV4cGlyZXMoZXhwaXJlczogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHVuaXQgPSA4NjQwMDAwMDsgLy/lpKlcblxuICAgICAgICBpZiAodHlwZW9mIGV4cGlyZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gcGFyc2VGbG9hdChleHBpcmVzKTtcbiAgICAgICAgICAgIGlmIChleHBpcmVzLmluY2x1ZGVzKCduJykgJiYgdGltZSAhPSBudWxsICYmIHRpbWUgPj0gMCkge1xuICAgICAgICAgICAgICAgIC8v6Ieq54S25pelXG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgdW5pdCAqIHRpbWUpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIDIzLCA1OSwgNTkpXG4gICAgICAgICAgICAgICAgZXhwaXJlcyA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgvXlxcdyskLy50ZXN0KGV4cGlyZXMpICYmIHRpbWUgIT0gbnVsbCAmJiB0aW1lID4gMCkge1xuICAgICAgICAgICAgICAgIC8v5aSpL+aXti/liIYv56eSXG4gICAgICAgICAgICAgICAgaWYgKGV4cGlyZXMuaW5jbHVkZXMoJ2gnKSkge1xuICAgICAgICAgICAgICAgICAgICB1bml0ID0gMzYwMDAwMDsgLy/ml7ZcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4cGlyZXMuaW5jbHVkZXMoJ20nKSkge1xuICAgICAgICAgICAgICAgICAgICB1bml0ID0gNjAwMDA7IC8v5YiGXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleHBpcmVzLmluY2x1ZGVzKCdzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdCA9IDEwMDA7IC8v56eSXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIHVuaXQgKiBwYXJzZUZsb2F0KGV4cGlyZXMpKTtcbiAgICAgICAgICAgICAgICBleHBpcmVzID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5pe26Ze05qC85byP5a2X56ym5LiyXG4gICAgICAgICAgICAgICAgbGV0IGFycjogYW55ID0gZXhwaXJlcy50cmltKCkuc3BsaXQoL1xcRCsvZyk7XG4gICAgICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPj0gMyAmJiAhaXNOYU4oYXJyWzBdKSAmJiAhaXNOYU4oYXJyWzFdKSAmJiAhaXNOYU4oYXJyWzJdKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQoYXJyWzBdKSwgcGFyc2VJbnQoYXJyWzFdKSAtIDEsIHBhcnNlSW50KGFyclsyXSksIHBhcnNlSW50KGFyclszXSkgfHwgMjMsIHBhcnNlSW50KGFycls0XSkgfHwgNTksIHBhcnNlSW50KGFycls1XSkgfHwgNTkpO1xuICAgICAgICAgICAgICAgICAgICBleHBpcmVzID0gZGF0ZS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleHBpcmVzID0gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwaXJlcyA9PT0gJ251bWJlcicgJiYgZXhwaXJlcyA+IDApIHtcbiAgICAgICAgICAgIGV4cGlyZXMgPSBkYXRlLmdldFRpbWUoKSArIGV4cGlyZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHBpcmVzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBleHBpcmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rue8k+WtmO+8jOWPr+iuvue9rui/h+acn+aXtumXtFxuICAgICAqIEBwYXJhbSB7Kn0ga2V5IOe8k+WtmGtleVxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSDnvJPlrZjmlbDmja5cbiAgICAgKiBAcGFyYW0ge2V4cGlyZXMsIHN1Y2Nlc3MsIGZhaWx9IGV4dHJhXG4gICAgICogIGV4cGlyZXMgXCIyMDE5LTEtMTQgMjE6Mzg6MDBcIuOAkOWFt+S9k+aXtumXtOOAkSB8fCAoMSB8IFwiMVwiIHwgXCIxZFwiKeOAkOWkqeOAkSB8fCBcIjFoXCLjgJDlsI/ml7bjgJEgfHwgXCIxbVwi44CQ5YiG6ZKf44CRIHx8IFwiMXNcIuOAkOenkuOAkSB8fCBcIjBuXCLjgJDoh6rnhLbml6XjgJFcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0KGtleTogc3RyaW5nLCBkYXRhOiBhbnksIGV4dHJhPzogeyBleHBpcmVzPzogbnVtYmVyIHwgc3RyaW5nOyByZXNldERhdGE/OiBhbnk7IH0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRyYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGV4dHJhID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB7IGV4cGlyZXMsIHJlc2V0RGF0YSB9ID0gZXh0cmE7XG5cbiAgICAgICAgaWYgKCFTdG9yYWdlLmlzRW5hYmxlZChrZXksIHRydWUpICYmIGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXhwaXJlcykge1xuICAgICAgICAgICAgZXhwaXJlcyA9IFN0b3JhZ2UuZm9ybWF0RXhwaXJlcyhleHBpcmVzKTtcblxuICAgICAgICAgICAgaWYgKGV4cGlyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhb2JqOiBEYXRhb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRlVGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlcyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzZXREYXRhICYmIChkYXRhb2JqLnJlc2V0RGF0YSA9IHJlc2V0RGF0YSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhb2JqKSk7XG4gICAgICAgICAgICAgICAgLy8gTG9nLmxvZygn6K6+572u77yM6L+H5pyf5pe26Ze0OicsIG5ldyBEYXRlKGV4cGlyZXMpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhb2JqOiBEYXRhb2JqID0ge1xuICAgICAgICAgICAgICAgIG9wZXJhdGVUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YW9iaikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W57yT5a2YXG4gICAgICogQHBhcmFtIHsqfSBrZXkg57yT5a2Ya2V5XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldChrZXk6IHN0cmluZykge1xuICAgICAgICBpZiAoIVN0b3JhZ2UuaXNFbmFibGVkKGtleSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGE6IERhdGFvYmosIHN0b3JhZ2VEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAodHlwZW9mIHN0b3JhZ2VEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShzdG9yYWdlRGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5leHBpcmVzICYmIERhdGUubm93KCkgPiBkYXRhLmV4cGlyZXMpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc2V0RGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlc2V0RGF0YTtcbiAgICAgICAgICAgICAgICBTdG9yYWdlLnNldChrZXksIGRhdGEsIHt9KTtcbiAgICAgICAgICAgICAgICAvLyBMb2cubG9nKCfojrflj5bvvIzlt7Lov4fmnJ/ml7bpl7Q6JywgbmV3IERhdGUoZGF0YS5leHBpcmVzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2UucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgLy8gTG9nLmxvZygn6I635Y+W77yM5bey6L+H5pyf5pe26Ze0OicsIG5ldyBEYXRlKGRhdGEuZXhwaXJlcykpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm9wZXJhdGVUaW1lKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHR5cGVvZiBzdG9yYWdlRGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHN0b3JhZ2VEYXRhKSA6IHN0b3JhZ2VEYXRhOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaJgOaciee8k+WtmFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRBbGwoKSB7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIGNvbnN0IGtleXMgPSBTdG9yYWdlLmdldGtleXMoKTtcbiAgICAgICAgaWYoa2V5cyl7XG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBTdG9yYWdlLmdldChrZXkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pOyAgICBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmiYDmnInnvJPlrZhrZXlcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0a2V5cygpIHtcbiAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAga2V5cyA9IFtdO1xuXG4gICAgICAgIHdoaWxlIChsb2NhbFN0b3JhZ2Uua2V5KGkpKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2gobG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vpmaTnvJPlrZhcbiAgICAgKiBAcGFyYW0geyp9IGtleSDnvJPlrZhrZXlcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGtleTogYW55KSB7XG4gICAgICAgIGlmICghU3RvcmFnZS5pc0VuYWJsZWQoa2V5LCB0cnVlKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBLZXkgPSBsb2NhbFN0b3JhZ2Uua2V5O1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uua2V5ID0gS2V5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4hemZpOi/h+acn+e8k+WtmFxuICAgICAqIEBwYXJhbSB7Kn0gaXNFeHBpcmVzIOaJp+ihjOa4hemZpOi/h+acn+e8k+WtmFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjbGVhcihpc0V4cGlyZXM6IGFueSkge1xuICAgICAgICBpZiAoIVN0b3JhZ2UuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRXhwaXJlcykge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IFN0b3JhZ2UuZ2V0a2V5cygpO1xuICAgICAgICAgICAgaWYoa2V5cyl7XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBTdG9yYWdlLmdldChrZXkpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOiOt+WPlue8k+WtmO+8iOmAgueUqOeUqOS6juiusOW9leW9k+aXpeasoeaVsOeahOe8k+WtmO+8iVxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yYWdlVGltZXMoa2V5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIFN0b3JhZ2UuY2xlYXIodHJ1ZSk7XG4gICAgICAgIGNvbnN0IHRpbWVzID0gU3RvcmFnZS5nZXQoa2V5TmFtZSk7XG4gICAgICAgIGlmICh0aW1lcyA9PT0gbnVsbCB8fCAhdGltZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g6K6+572u5qyh5pWw77yI6YCC55So55So5LqO6K6w5b2V5b2T5pel5qyh5pWw55qE57yT5a2Y77yJXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldFN0b3JhZ2VUaW1lcyhrZXlOYW1lOiBzdHJpbmcsIHZhbHVlID0gMSwgZXh0cmE/KSB7XG4gICAgICAgIGxldCB0aW1lcyA9ICtTdG9yYWdlLmdldFN0b3JhZ2VUaW1lcyhrZXlOYW1lKSArIHZhbHVlO1xuICAgICAgICBTdG9yYWdlLnNldChrZXlOYW1lLCB0aW1lcywgZXh0cmEpO1xuICAgIH1cbn0iXX0=