
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37d02GAettK6JSEnqjijIk5', 'JsBridge');
// Script/server/xmsdk_cocos/Adapter/Bridge/JsBridge.js

"use strict";

function getJsBridge() {
  return {
    call: function call(method, args, cb) {
      var ret = '';

      if (typeof args == 'function') {
        cb = args;
        args = {};
      }

      if (typeof cb == 'function') {
        window.dscb = window.dscb || 0;
        var cbName = 'dscb' + window.dscb++;
        window[cbName] = cb;
        args['_dscbstub'] = cbName;
      }

      args = JSON.stringify(args || {});

      if (window._dswk) {
        ret = prompt(window._dswk + method, args);
      } else {
        if (typeof _dsbridge == 'function') {
          ret = _dsbridge(method, args);
        } else if (window._dsbridge) {
          ret = _dsbridge.call(method, args);
        } else {
          console.log('找不到_dsbridge');
          callBrowser(method, args);
        }
      }

      return ret;
    },
    register: function register(name, fun) {
      window._dsf = window._dsf || {};

      if (typeof name == "object") {
        Object.assign(window._dsf, name);
      } else {
        window._dsf[name] = fun;
      }
    },
    page: function page(title, url) {
      this.call('launch', {
        param: 'vipgift://com.xmiles.vipgift/web/CommonWebViewActivity?withHead=true&title=' + title + '&htmlUrl=' + encodeURIComponent(url)
      });
    }
  };
}

;

function callBrowser(method, args) {
  if (method == 'launch') {
    var object = JSON.parse(args);
    var param = object.param;
    var html = getParameterByName(param, 'htmlUrl');
    location.href = html;
  }
}

;

function getParameterByName(url, name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
  return results == null ? "" : decodeURIComponent(results[1]);
}

;
module.exports = getJsBridge();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxCcmlkZ2VcXEpzQnJpZGdlLmpzIl0sIm5hbWVzIjpbImdldEpzQnJpZGdlIiwiY2FsbCIsIm1ldGhvZCIsImFyZ3MiLCJjYiIsInJldCIsIndpbmRvdyIsImRzY2IiLCJjYk5hbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiX2Rzd2siLCJwcm9tcHQiLCJfZHNicmlkZ2UiLCJjb25zb2xlIiwibG9nIiwiY2FsbEJyb3dzZXIiLCJyZWdpc3RlciIsIm5hbWUiLCJmdW4iLCJfZHNmIiwiT2JqZWN0IiwiYXNzaWduIiwicGFnZSIsInRpdGxlIiwidXJsIiwicGFyYW0iLCJlbmNvZGVVUklDb21wb25lbnQiLCJvYmplY3QiLCJwYXJzZSIsImh0bWwiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJyZXN1bHRzIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsV0FBVCxHQUF1QjtBQUNuQixTQUFPO0FBQ0hDLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCQyxJQUFsQixFQUF3QkMsRUFBeEIsRUFBNEI7QUFDOUIsVUFBSUMsR0FBRyxHQUFHLEVBQVY7O0FBQ0EsVUFBSSxPQUFPRixJQUFQLElBQWUsVUFBbkIsRUFBK0I7QUFDM0JDLFFBQUFBLEVBQUUsR0FBR0QsSUFBTDtBQUNBQSxRQUFBQSxJQUFJLEdBQUcsRUFBUDtBQUNIOztBQUNELFVBQUksT0FBT0MsRUFBUCxJQUFhLFVBQWpCLEVBQTZCO0FBQ3pCRSxRQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBY0QsTUFBTSxDQUFDQyxJQUFQLElBQWUsQ0FBN0I7QUFDQSxZQUFJQyxNQUFNLEdBQUcsU0FBU0YsTUFBTSxDQUFDQyxJQUFQLEVB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Q0g7O0FBQUE7QUFFREcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekMsV0FBVyxFQUE1QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0SnNCcmlkZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FsbDogZnVuY3Rpb24gKG1ldGhvZCwgYXJncywgY2IpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2IgPSBhcmdzO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kc2NiID0gd2luZG93LmRzY2IgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgY2JOYW1lID0gJ2RzY2InICsgd2luZG93LmRzY2IrKztcbiAgICAgICAgICAgICAgICB3aW5kb3dbY2JOYW1lXSA9IGNiO1xuICAgICAgICAgICAgICAgIGFyZ3NbJ19kc2Nic3R1YiddID0gY2JOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJncyA9IEpTT04uc3RyaW5naWZ5KGFyZ3MgfHwge30pXG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cuX2Rzd2spIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcm9tcHQod2luZG93Ll9kc3drICsgbWV0aG9kLCBhcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfZHNicmlkZ2UgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBfZHNicmlkZ2UobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5fZHNicmlkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gX2RzYnJpZGdlLmNhbGwobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5om+5LiN5YiwX2RzYnJpZGdlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxCcm93c2VyKG1ldGhvZCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIChuYW1lLCBmdW4pIHtcbiAgICAgICAgICAgIHdpbmRvdy5fZHNmID0gd2luZG93Ll9kc2YgfHwge307XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24od2luZG93Ll9kc2YsIG5hbWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5fZHNmW25hbWVdID0gZnVuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwYWdlOiBmdW5jdGlvbiAodGl0bGUsIHVybCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsKCdsYXVuY2gnLCB7XG4gICAgICAgICAgICAgICAgcGFyYW06ICd2aXBnaWZ0Oi8vY29tLnhtaWxlcy52aXBnaWZ0L3dlYi9Db21tb25XZWJWaWV3QWN0aXZpdHk/d2l0aEhlYWQ9dHJ1ZSZ0aXRsZT0nICsgdGl0bGUgKyAnJmh0bWxVcmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNhbGxCcm93c2VyKG1ldGhvZCwgYXJncykge1xuICAgIGlmIChtZXRob2QgPT0gJ2xhdW5jaCcpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gSlNPTi5wYXJzZShhcmdzKTtcbiAgICAgICAgY29uc3QgcGFyYW0gPSBvYmplY3QucGFyYW07XG4gICAgICAgIGNvbnN0IGh0bWwgPSBnZXRQYXJhbWV0ZXJCeU5hbWUocGFyYW0sICdodG1sVXJsJyk7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBodG1sO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckJ5TmFtZSh1cmwsIG5hbWUpIHtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiKSxcbiAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcbiAgICByZXR1cm4gcmVzdWx0cyA9PSBudWxsID8gXCJcIiA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SnNCcmlkZ2UoKTsiXX0=