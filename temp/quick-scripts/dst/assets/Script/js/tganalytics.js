
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/js/tganalytics.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '081caz5+mtBt7l5CWiNlBAD', 'tganalytics');
// Script/js/tganalytics.js

"use strict";

var _excluded = ["type"],
    _excluded2 = ["type"];

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var telegramAnalytics = function () {
  "use strict";

  var t = i;

  function n() {
    var t = ["disconnection", "fhZRz", "99096yfWvli", "transaction-signing-failed", "LCtWz", "REFUND_ISSUED", "https://tganalytics.xyz/", "3hZQQWC", "connection-started", "https://staging.tganalytics.xyz/", "xOHBj", "WALLET_CONNECT_ERROR", "LafId", "purchase-success", "clBue", "695429NdeeQO", "ADDITIONAL_TASK_EVENT", "WALLET_DISCONNECT", "connection-restoring-completed", "uRQAW", "gkSCf", "vFApP", "jnXTg", "INIT", "connection-restoring-started", "pbPNw", "purchase-init", "TGA-Batch-Requests", "WEYWl", "MuzUd", "WALLET_CONNECT_STARTED", "SUBSCRIPTION_STARTED", "bGees", "refund-issued", "transaction-sent-for-signature", "778040qAgwvU", "423290TRagmr", "connection-restoring-error", "transaction-signed", "foHek", "BVPjK", "subscription-renewed", "ziKuJ", "Wvctj", "PURCHASE_SUCCESS", "CUSTOM_EVENT", "WALLET_CONNECT_SUCCESS", "99442NMrOax", "1360920UrSzGA", "PURCHASE_FAILED", "dbnyl", "HaCid", "register-invoice", "fdvQa", "27yeWRQS", "PURCHASE_CANCELLED", "custom-event", "connection-error", "wVqan", "TRANSACTION_SIGNED", "app-hide", "XgbpX", "mmAJh", "SUBSCRIPTION_CANCELLED", "472956TVlcqE", "PURCHASE_INIT", "SUBSCRIPTION_RENEWED", "eIPrj", "TRANSACTION_SENT_FOR_SIGNATURE", "subscription-cancelled"];
    return (n = function n() {
      return t;
    })();
  }

  !function (t) {
    var n = i,
        e = t();

    for (;;) {
      try {
        if (173237 === -parseInt(n(167)) / 1 + parseInt(n(156)) / 2 + -parseInt(n(197)) / 3 * (parseInt(n(155)) / 4) + parseInt(n(168)) / 5 + -parseInt(n(184)) / 6 + parseInt(n(135)) / 7 + parseInt(n(192)) / 8 * (-parseInt(n(174)) / 9)) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(n);
  var e = t(196),
      r = t(129),
      s = t(147);

  function i(t, e) {
    var r = n();
    return (i = function i(t, n) {
      return r[t -= 129];
    })(t, e);
  }

  var o = function (n) {
    var e = t,
        r = {
      BVPjK: "app-init",
      mmAJh: e(180),
      NAxHK: e(165),
      vFApP: e(176),
      ziKuJ: e(198),
      HaCid: e(166),
      dbnyl: "connection-completed",
      foHek: e(177),
      fdvQa: "CONNECTION_RESTORING_SUCCESS",
      wVqan: e(138),
      eIPrj: "CONNECTION_RESTORING_ERROR",
      pbPNw: e(188),
      uRQAW: e(193),
      PadWn: e(137),
      fhZRz: e(190),
      bGees: e(185),
      xOHBj: e(146),
      MuzUd: e(164),
      clBue: e(169),
      jnXTg: "purchase-failed",
      WEYWl: e(175),
      LQqqr: "purchase-cancelled",
      XgbpX: e(195),
      LCtWz: e(153),
      gkSCf: e(151),
      DueqO: e(186),
      RGfmP: e(161),
      LafId: e(183),
      fydrq: "INVOICE_REGISTERED",
      Wvctj: e(172)
    };
    return n[e(143)] = r[e(160)], n.HIDE = r[e(182)], n[r.NAxHK] = r[e(141)], n[e(150)] = r[e(162)], n[r[e(171)]] = r[e(170)], n[e(131)] = r[e(159)], n.CONNECTION_RESTORING_STARTED = e(144), n[r[e(173)]] = r[e(178)], n[r[e(187)]] = e(157), n[r[e(145)]] = e(154), n[e(179)] = e(158), n.TRANSACTION_SIGNING_FAILED = r[e(139)], n[r.PadWn] = r[e(191)], n[e(136)] = e(136), n[r[e(152)]] = r[e(130)], n[r[e(149)]] = e(133), n[r[e(134)]] = r[e(142)], n[r[e(148)]] = r.LQqqr, n[r[e(181)]] = r[e(194)], n[r[e(140)]] = "subscription-started", n[r.DueqO] = r.RGfmP, n[r[e(132)]] = e(189), n[r.fydrq] = r[e(163)], n;
  }(o || {});

  var a = c;

  function c(t, n) {
    var e = u();
    return (c = function c(t, n) {
      return e[t -= 370];
    })(t, n);
  }

  function u() {
    var t = ["log", "161BtAidg", "map", "analyticsController", "vDQov", "tQBNa", "WALLET_CONNECT_STARTED", "800810puDmeo", "init", "TRANSACTION_SIGNING_FAILED", "684002YBuoip", "tonConnectSdkEvents", "detail", "2xASElu", "sdkScope", " listener", "WALLET_CONNECT_ERROR", "type", "14166cwcleE", "Attach ", "7875560QLDtNF", "TRANSACTION_SENT_FOR_SIGNATURE", "tonConnectUiEvents", "events", "uiScope", "365NlpFCh", " received", "collectEvent", "CUSTOM_EVENT", "542824CKOBge", "ton-connect-", "658083bEKFWU", "WALLET_DISCONNECT", "CONNECTION_RESTORING_ERROR", "32684qvGyFI", "CONNECTION_RESTORING_SUCCESS", "90eXyZDE"];
    return (u = function u() {
      return t;
    })();
  }

  !function (t) {
    var n = c,
        e = t();

    for (;;) {
      try {
        if (359144 === -parseInt(n(377)) / 1 + -parseInt(n(380)) / 2 * (-parseInt(n(398)) / 3) + parseInt(n(401)) / 4 * (-parseInt(n(392)) / 5) + -parseInt(n(385)) / 6 * (parseInt(n(405)) / 7) + parseInt(n(396)) / 8 * (parseInt(n(403)) / 9) + parseInt(n(374)) / 10 + parseInt(n(387)) / 11) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(u);

  var p = /*#__PURE__*/function (_a, _a2) {
    function p(t) {
      var n = c,
          e = {
        vDQov: "ton-connect-ui-",
        tQBNa: n(397)
      };
      this[n(378)] = [o[n(395)], o.WALLET_CONNECT_SUCCESS, o[n(383)], o[n(402)], o[n(400)], o[n(388)], o.TRANSACTION_SIGNED, o.TRANSACTION_SIGNING_FAILED, o[n(399)]], this.tonConnectUiEvents = [o[n(373)], o[n(383)], o[n(376)]], this[n(391)] = e[n(371)], this[n(381)] = e[n(372)], this[n(370)] = t;
    }

    var _proto = p.prototype;

    _proto[_a] = function () {
      var _this = this;

      var t = a;

      var _loop = function _loop() {
        var n = _step.value;
        console.log(t(386) + n + t(382)), window.addEventListener(n, function (e) {
          var r = t;
          console[r(404)]("event " + n + r(393), e[r(379)]);

          var _e$r = e[r(379)],
              s = _e$r.type,
              i = _objectWithoutPropertiesLoose(_e$r, _excluded);

          _this[r(370)][r(394)](e.detail[r(384)], _extends({}, i));
        });
      };

      for (var _iterator = _createForOfIteratorHelperLoose(this[t(390)]), _step; !(_step = _iterator()).done;) {
        _loop();
      }
    };

    _createClass(p, [{
      key: _a2,
      get: function get() {
        var _this2 = this;

        var t = a;
        return [].concat(this[t(389)][t(406)](function (n) {
          return "" + _this2[t(391)] + n;
        }), this[t(378)][t(406)](function (n) {
          return "" + _this2[t(381)] + n;
        }));
      }
    }]);

    return p;
  }(a(375), a(390));

  var h = f;

  function f(t, n) {
    var e = d();
    return (f = function f(t, n) {
      return e[t -= 500];
    })(t, n);
  }

  !function (t) {
    var n = f,
        e = t();

    for (;;) {
      try {
        if (155559 === parseInt(n(518)) / 1 + -parseInt(n(503)) / 2 * (parseInt(n(506)) / 3) + -parseInt(n(502)) / 4 + -parseInt(n(517)) / 5 * (-parseInt(n(514)) / 6) + parseInt(n(515)) / 7 + -parseInt(n(528)) / 8 + parseInt(n(507)) / 9) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(d);

  var l = /*#__PURE__*/function (_h) {
    function l(t) {
      var _this3 = this;

      var n = f,
          e = {
        crvxa: function crvxa(t, n) {
          return t === n;
        },
        LpJjy: function LpJjy(t, n) {
          return t === n;
        },
        TXXmU: "hidden",
        xAcvm: function xAcvm(t, n) {
          return t !== n;
        },
        BRWSZ: n(523)
      };
      this.documentEvents = {
        visibilitychange: function visibilitychange() {
          var t = n;
          if (e[t(511)](t(513), t(504))) _0x360508[t(525)](_0x363435, _0x3579ec);else if (e[t(519)](document[t(508)], e[t(526)])) if (e[t(520)](t(512), e[t(524)])) _this3[t(530)][t(516)](o[t(500)], void 0);else {
            var _n = {
              PKhpG: t(510)
            };
            _this3[t(521)] = {
              visibilitychange: function visibilitychange() {
                var e = t;
                _0x346889[e(508)] === _n[e(501)] && _this3[e(530)].collectEvent(_0x211b63[e(500)], void 0);
              }
            }, _this3.analyticsController = _0x4c112d;
          }
        }
      }, this[n(530)] = t;
    }

    var _proto2 = l.prototype;

    _proto2[_h] = function () {
      var t = h,
          n = {
        wHzRo: function wHzRo(t, n) {
          return t === n;
        },
        dLyiJ: t(510),
        DtsDl: t(522)
      };

      for (var _iterator2 = _createForOfIteratorHelperLoose(Object[t(527)](this[t(521)])), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
            _e = _step2$value[0],
            _r = _step2$value[1];
        t(522) === n.DtsDl ? document[t(525)](_e, _r) : n[t(529)](_0x111705.visibilityState, n[t(505)]) && this[t(530)][t(516)](_0x2c296c[t(500)], void 0);
      }
    };

    return l;
  }(h(509));

  function d() {
    var t = ["HIDE", "PKhpG", "693440NEBVQM", "20wiERny", "RGJgi", "dLyiJ", "78567wPGCAc", "3107709uTmLmN", "visibilityState", "init", "hidden", "crvxa", "KCFcs", "SNvPO", "6246UEJwGP", "1303890KBMzYl", "collectEvent", "85FvLLuC", "43855HyHhjX", "LpJjy", "xAcvm", "documentEvents", "wxtDz", "UAnzG", "BRWSZ", "addEventListener", "TXXmU", "entries", "18512xsKJbn", "wHzRo", "analyticsController"];
    return (d = function d() {
      return t;
    })();
  }

  function I() {
    var t = ["collectTappsEvent", "351dPZjWP", "795JWcVaL", "4777080WctBCg", "9308970soDqEo", "telegramAppsCenterEvents", "init", "Attach ", "log", "4546212sxuakN", "4YzkRnp", "2267109GdOVyB", "ADDITIONAL_TASK_EVENT", "16092rcvypr", "analyticsController", "type", "addEventListener", " received", "event ", "detail", "132984GBLnXN", "221746pVfNeZ"];
    return (I = function I() {
      return t;
    })();
  }

  var m = v;

  function v(t, n) {
    var e = I();
    return (v = function v(t, n) {
      return e[t -= 240];
    })(t, n);
  }

  !function (t) {
    var n = v,
        e = t();

    for (;;) {
      try {
        if (466498 === -parseInt(n(248)) / 1 * (-parseInt(n(259)) / 2) + -parseInt(n(260)) / 3 + -parseInt(n(240)) / 4 * (-parseInt(n(251)) / 5) + -parseInt(n(258)) / 6 + -parseInt(n(252)) / 7 + parseInt(n(247)) / 8 * (parseInt(n(250)) / 9) + parseInt(n(253)) / 10) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(I);

  var g = /*#__PURE__*/function (_m) {
    function g(t) {
      var n = v;
      this[n(254)] = [o[n(261)]], this[n(241)] = t;
    }

    var _proto3 = g.prototype;

    _proto3[_m] = function () {
      var _this4 = this;

      var t = m;

      var _loop2 = function _loop2() {
        var n = _step3.value;
        console[t(257)](t(256) + n + " listener"), window[t(243)](n, function (e) {
          var r = t;
          console[r(257)](r(245) + n + r(244), e[r(246)]);

          var _e$detail = e.detail,
              s = _e$detail.type,
              i = _objectWithoutPropertiesLoose(_e$detail, _excluded2);

          _this4[r(241)][r(249)](e[r(246)][r(242)], _extends({}, i));
        });
      };

      for (var _iterator3 = _createForOfIteratorHelperLoose(this.telegramAppsCenterEvents), _step3; !(_step3 = _iterator3()).done;) {
        _loop2();
      }
    };

    return g;
  }(m(255));

  var E = _;

  function y() {
    var t = ["undefined", "8508384bPReeq", "collectEvent", "15oVEcrP", "50184LNyIXW", "293772VRYtES", "webApp", "init", "wYNyO", "Telegram", "318YudlTU", "analyticsController", "openInvoice", "startsWith", "slice", "WebApp", "call", "PURCHASE_INIT", "1375801goMSgq", "682374fQmOLl", "1427370ycIuEC", "HhDcu", "OcpqO", "split"];
    return (y = function y() {
      return t;
    })();
  }

  function _(t, n) {
    var e = y();
    return (_ = function _(t, n) {
      return e[t -= 145];
    })(t, n);
  }

  !function (t) {
    var n = _,
        e = t();

    for (;;) {
      try {
        if (419696 === parseInt(n(146)) / 1 + -parseInt(n(161)) / 2 + -parseInt(n(162)) / 3 + -parseInt(n(147)) / 4 + -parseInt(n(145)) / 5 * (parseInt(n(152)) / 6) + parseInt(n(160)) / 7 + parseInt(n(167)) / 8) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(y);

  var S = /*#__PURE__*/function (_E) {
    function S(t) {
      var n;
      var e = _,
          r = {
        cORqM: function cORqM(t, n) {
          return t !== n;
        },
        HhDcu: e(166)
      };
      this[e(148)] = r.cORqM(typeof window, r[e(163)]) && (null == (n = null == window ? void 0 : window[e(151)]) ? void 0 : n[e(157)]) ? window[e(151)][e(157)] : null, this[e(153)] = t;
    }

    var _proto4 = S.prototype;

    _proto4[_E] = function () {
      var _this5 = this;

      var t;
      var n = E,
          e = {
        pUpEZ: n(166),
        OcpqO: n(150)
      };

      if (this[n(148)] && (null == (t = this[n(148)]) ? void 0 : t[n(154)])) {
        var _t2 = this[n(148)][n(154)];

        this[n(148)][n(154)] = function (r, s) {
          var i;
          var a = n;

          if (e[a(164)] == e[a(164)]) {
            var _n2 = r[a(165)]("/").pop() || "";

            return _n2[a(155)]("$") && (_n2 = _n2[a(156)](1)), _this5[a(153)][a(168)](o[a(159)], {
              slug: _n2
            }), _t2[a(158)](_this5.webApp, r, s);
          }

          _this5[a(148)] = typeof _0x22108d !== e.pUpEZ && (null == (i = null == _0x9e953d ? void 0 : _0x9e953d[a(151)]) ? void 0 : i[a(157)]) ? _0x23954d[a(151)][a(157)] : null, _this5[a(153)] = _0x42b8e4;
        };
      }
    };

    return S;
  }(E(149));

  function b() {
    var t = ["TelegramGameProxy", "JMQYT", "handlePlatformListener", "call", "lmySf", "parse", "handleEvents", "SgnFb", "oJalz", "lWvGz", "1413402VzsFdc", "slug", "eventStatusMap", "7483986hqQGPd", "ygDxF", "dtTiZ", "9555GqpWPV", "1946273tvUlOC", "PURCHASE_CANCELLED", "analyticsController", "WebView", "yktGU", "CGnfk", "TelegramGameProxy_receiveEvent", "ZyvPO", "init", "PURCHASE_SUCCESS", "Telegram", "EiJJf", "3023590ehOJjU", "692QWAqDa", "collectEvent", "6447020ASyrtf", "status", "receiveEvent", "11078376SxpHTA", "addEventListener", "12jcOAuH"];
    return (b = function b() {
      return t;
    })();
  }

  function w(t, n) {
    var e = b();
    return (w = function w(t, n) {
      return e[t -= 409];
    })(t, n);
  }

  var T = w;
  !function (t) {
    var n = w,
        e = t();

    for (;;) {
      try {
        if (833627 === parseInt(n(437)) / 1 + -parseInt(n(418)) / 2 + parseInt(n(443)) / 3 * (-parseInt(n(419)) / 4) + -parseInt(n(421)) / 5 + -parseInt(n(426)) / 6 * (-parseInt(n(444)) / 7) + parseInt(n(424)) / 8 + parseInt(n(440)) / 9) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(b);

  var N = /*#__PURE__*/function (_T, _T2, _T3) {
    function N(t) {
      var n = w;
      this[n(439)] = {
        paid: o[n(415)],
        cancelled: o[n(445)],
        failed: o.PURCHASE_FAILED
      }, this[n(446)] = t;
    }

    var _proto5 = N.prototype;

    _proto5[_T] = function () {
      var _this6 = this;

      var t = T,
          n = {
        CGnfk: t(410)
      };
      window[t(425)]("message", function (_ref) {
        var e = _ref.data;
        var r = t;
        if (n.CGnfk === n[r(411)]) try {
          var _JSON$r = JSON[r(432)](e),
              _t3 = _JSON$r.eventType,
              _n3 = _JSON$r.eventData;

          _this6.handleEvents(_t3, _n3);
        } catch (s) {} else {
          var _x3b209c$r = _0x3b209c[r(432)](_0x5111d6),
              _t4 = _x3b209c$r.eventType,
              _n4 = _x3b209c$r.eventData;

          _this6.handleEvents(_t4, _n4);
        }
      }), this[t(429)](window[t(427)]), this[t(429)](window[t(416)][t(409)]), this[t(429)](window[t(412)]);
    };

    _proto5[_T2] = function (t) {
      var n = T,
          e = {
        oJalz: function oJalz(t, n) {
          return t !== n;
        },
        lmySf: "odrHn",
        EiJJf: function EiJJf(t, n) {
          return t === n;
        },
        dtTiZ: n(428),
        lWvGz: n(434)
      };
      if (!t) return;
      var r;
      (null == t ? void 0 : t[n(423)]) ? r = t[n(423)] : e[n(417)](e[n(442)], e[n(436)]) ? this[n(446)][n(420)](this[n(439)][_0xede2e1.status], {
        slug: _0x2a36b9[n(438)]
      }) : (r = t, t = window);
      var s = this;

      t[n(423)] = function (i, o) {
        var a = n;
        return e[a(435)](e[a(431)], e.lmySf) ? void 0 : (s[a(433)](i, o), r[a(430)](t, i, o));
      };
    };

    _proto5[_T3] = function (t, n) {
      var e = T,
          r = {
        ygDxF: function ygDxF(t, n) {
          return t === n;
        },
        ZyvPO: "invoice_closed"
      };
      r[e(441)](t, r[e(413)]) && this[e(439)][n[e(422)]] && this[e(446)][e(420)](this[e(439)][n.status], {
        slug: n[e(438)]
      });
    };

    return N;
  }(T(414), T(429), T(433));

  var O = A;

  function A(t, n) {
    var e = x();
    return (A = function A(t, n) {
      return e[t -= 438];
    })(t, n);
  }

  !function (t) {
    for (var n = A, e = t();;) {
      try {
        if (145249 === parseInt(n(465)) / 1 + parseInt(n(449)) / 2 + parseInt(n(442)) / 3 * (-parseInt(n(472)) / 4) + -parseInt(n(448)) / 5 * (parseInt(n(445)) / 6) + parseInt(n(458)) / 7 * (-parseInt(n(469)) / 8) + -parseInt(n(460)) / 9 + parseInt(n(440)) / 10 * (parseInt(n(454)) / 11)) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(x);

  var C = /*#__PURE__*/function (_O, _O2, _O3) {
    function C(t) {
      for (var n = A, e = {
        hpJZS: n(451)
      }.hpJZS[n(453)]("|"), r = 0;;) {
        switch (e[r++]) {
          case "0":
            this.tappsObserver = new g(this);
            continue;

          case "1":
            this[n(446)] = new N(this);
            continue;

          case "2":
            this[n(459)] = new l(this);
            continue;

          case "3":
            this[n(450)] = t;
            continue;

          case "4":
            this[n(452)] = new S(this);
            continue;

          case "5":
            this[n(444)] = new p(this);
            continue;
        }

        break;
      }
    }

    var _proto6 = C.prototype;
    _proto6[_O] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var t, n;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              t = O, n = {
                ZHcnt: function ZHcnt(t, n) {
                  return t === n;
                },
                LsWuE: t(455),
                mkbLZ: t(443)
              };
              this.documentObserver[t(464)](), this[t(444)][t(464)](), this[t(452)][t(464)](), this[t(446)][t(464)](), this[t(462)][t(464)]();
              _context.prev = 2;

              if (!n[t(456)](n[t(439)], n[t(439)])) {
                _context.next = 11;
                break;
              }

              _context.next = 6;
              return fetch((n.ZHcnt(this[t(450)][t(441)], t(466)) ? r : e) + n[t(447)], {
                signal: AbortSignal[t(457)](2e3)
              });

            case 6:
              _context.next = 8;
              return _context.sent.json();

            case 8:
              this.eventsThreshold = _context.sent;
              _context.next = 12;
              break;

            case 11:
              this[t(450)][t(471)](_0x2b72ed, _0x30a450)["catch"](function (t) {
                return _0x3362b8.error(t);
              });

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](2);
              this[t(463)] = {
                "app-hide": 3
              };

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 14]]);
    }));

    _proto6.recordEvent = function recordEvent(t, n) {
      var e = O;
      this[e(450)][e(471)](t, n)[e(461)](function (t) {
        return console[e(467)](t);
      });
    };

    _proto6[_O2] = function (t, n) {
      var e = O,
          r = {
        YcdzS: function YcdzS(t, n) {
          return t === n;
        }
      };
      r[e(470)](this[e(463)][t], 0) || (this.appModule[e(438)](t, n), this[e(463)][t] && (r.YcdzS("cRfTe", "dKsqZ") ? this[e(463)] = {
        "app-hide": 3
      } : this[e(463)][t]--));
    };

    _proto6[_O3] = function (t, n) {
      var e = O;
      this[e(450)][e(468)](t, n);
    };

    return C;
  }(O(464), O(438), O(468));

  function x() {
    var t = ["39108vOpHCt", "collectEvent", "LsWuE", "3861680zrzcSO", "env", "24cXtPFg", "events/threshold", "tonConnectObserver", "614274kHrmvt", "webViewObserver", "mkbLZ", "5sRjBeC", "479126YuuAQz", "appModule", "3|2|5|4|1|0", "webAppObserver", "split", "11KbMoil", "HRrBc", "ZHcnt", "timeout", "7ooLqso", "documentObserver", "1623159XHBeYP", "catch", "tappsObserver", "eventsThreshold", "init", "41052kLTnnw", "STG", "error", "collectTappsEvent", "1284704vaXwBL", "YcdzS", "recordEvent"];
    return (x = function x() {
      return t;
    })();
  }

  function R(t, n) {
    var e = P();
    return (R = function R(t, n) {
      return e[t -= 361];
    })(t, n);
  }

  !function (t) {
    var n = R,
        e = t();

    for (;;) {
      try {
        if (744752 === parseInt(n(375)) / 1 + parseInt(n(367)) / 2 * (parseInt(n(370)) / 3) + parseInt(n(373)) / 4 + parseInt(n(374)) / 5 + -parseInt(n(376)) / 6 * (-parseInt(n(366)) / 7) + -parseInt(n(365)) / 8 * (parseInt(n(362)) / 9) + -parseInt(n(364)) / 10) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(P);

  var U = function U(t) {
    throw new Error(t);
  };

  function P() {
    var t = ["35241380TZagEJ", "5161696NxtsZO", "104412MOObcb", "2081826JHSPcl", "Token is not provided.", "Telegram User data is not provided.", "3HYLQSz", "drsni", "uTzaa", "2264340rmjsEy", "5163190UrNtCi", "976774dvKuqg", "522QSvQwg", "ckIeu", "USER_DATA_IS_NOT_PROVIDED", "9zJudaY", "TOKEN_IS_NOT_PROVIDED"];
    return (P = function P() {
      return t;
    })();
  }

  var D = function (t) {
    var n = R,
        e = {
      drsni: n(363),
      uTzaa: n(361),
      ckIeu: n(369)
    };
    return t[e[n(371)]] = n(368), t[e[n(372)]] = e[n(377)], t;
  }(D || {});

  function k(t, n) {
    var e = L();
    return (k = function k(t, n) {
      return e[t -= 411];
    })(t, n);
  }

  function L() {
    var t = ["4025136cZsigH", "20uUrdCC", "11682gQpfXt", "553PexRvp", "563238woqjuK", "8558970beQRIl", "gzip", "1213365OALmFQ", "30522DuBBiV", "blob", "139IKYawL", "stringify", "10212037uEwXIK", "40iZxlnZ"];
    return (L = function L() {
      return t;
    })();
  }

  function B(_x) {
    return _B.apply(this, arguments);
  }

  function _B() {
    _B = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(t) {
      var n, e;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              n = k, e = new Blob([JSON[n(413)](t)]).stream().pipeThrough(new CompressionStream(n(422)));
              _context11.next = 3;
              return new Response(e)[n(411)]();

            case 3:
              return _context11.abrupt("return", _context11.sent);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));
    return _B.apply(this, arguments);
  }

  !function (t) {
    var n = k,
        e = t();

    for (;;) {
      try {
        if (700045 === -parseInt(n(412)) / 1 * (-parseInt(n(418)) / 2) + -parseInt(n(416)) / 3 + -parseInt(n(417)) / 4 * (-parseInt(n(423)) / 5) + parseInt(n(424)) / 6 * (parseInt(n(419)) / 7) + parseInt(n(415)) / 8 * (-parseInt(n(420)) / 9) + parseInt(n(421)) / 10 + -parseInt(n(414)) / 11) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(L);
  var V = W;

  function G() {
    var t = ["taskSolution", "eTdic", "LWUyo", "recordEvents", "RUsxX", "STG", "30960XgurOv", "QNkCV", "827092qGiRDy", "djTzV", "irkRr", "assembleEventSession", "assign", "appModule", "SNhdf", "responseToParams", "init", "recordEvent", "13RAzurJ", "getApiToken", "status", "uUoNa", "IGsJv", "TAQhp", "1059534kdhqWm", "RmcMh", "Content", "env", "custom_data", "364252uodAMl", "clone", "Content-Encoding", "Uumxw", "Jkech", "kOpsp", "solveTask", "hvVco", "BktVQ", "oGVKY", "GlSzY", "jiuRo", "cOjzP", "then", "POST", "setNewArgs", "BACKEND_URL", "stringify", "SbcET", "2151736yQGvNJ", "application/json", "events", "595047sXBqdx", "270965zRBTun", "generateHeaders", "WTGLn"];
    return (G = function G() {
      return t;
    })();
  }

  function W(t, n) {
    var e = G();
    return (W = function W(t, n) {
      return e[t -= 141];
    })(t, n);
  }

  !function (t) {
    var n = W,
        e = t();

    for (;;) {
      try {
        if (109059 === -parseInt(n(160)) / 1 * (-parseInt(n(148)) / 2) + parseInt(n(193)) / 3 + parseInt(n(171)) / 4 + -parseInt(n(194)) / 5 + -parseInt(n(166)) / 6 + parseInt(n(150)) / 7 + -parseInt(n(190)) / 8) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(G);

  var z = /*#__PURE__*/function (_V, _V2, _V3) {
    function z(t) {
      var _this7 = this;

      var n = W,
          s = {
        uUoNa: function uUoNa(t, n) {
          return t === n;
        },
        GlSzY: function GlSzY(t, n) {
          return t(n);
        },
        RmcMh: n(168),
        Uumxw: n(173),
        hvVco: "gzip",
        IGsJv: n(191),
        QoidQ: function QoidQ(t, n) {
          return t(n);
        },
        vdFAJ: function vdFAJ(t, n) {
          return t !== n;
        },
        AQbDp: n(151),
        xbhBd: n(147),
        kOpsp: function kOpsp(t, n) {
          return t === n;
        },
        irkRr: n(144)
      };
      this.BACKEND_URL = e, this.responseToParams = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(t) {
          var e, r, _t5;

          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  e = n, r = t[e(172)]();

                  if (!(s[e(163)](s[e(181)](String, r[e(162)])[0], "2") || s[e(163)](r.status, 429))) {
                    _context2.next = 6;
                    break;
                  }

                  _context2.next = 4;
                  return r.json();

                case 4:
                  _t5 = _context2.sent;

                  _this7[e(155)][e(186)](_t5[s[e(167)]]);

                case 6:
                  return _context2.abrupt("return", t);

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }(), this[n(195)] = function (t) {
        var e = n;

        if (s.vdFAJ(s.AQbDp, e(175))) {
          _this7[e(155)].solveTask();

          var _n5 = {};

          if (_this7[e(155)][e(142)]) {
            if (s.uUoNa(e(149), e(156))) {
              _this7[e(155)][e(177)]();

              var _t6 = {};
              return _this7[e(155)][e(142)] && (_t6[s.RmcMh] = _this7.appModule[e(142)]), _0x64e779 && (_t6[s[e(174)]] = s[e(178)]), _extends({
                "TGA-Auth-Token": _this7.appModule[e(161)](),
                "Content-Type": s.IGsJv
              }, _t6);
            }

            _n5[e(168)] = _this7.appModule[e(142)];
          }

          return t && (_n5[e(173)] = s[e(178)]), _extends({
            "TGA-Auth-Token": _this7[e(155)].getApiToken(),
            "Content-Type": s[e(164)]
          }, _n5);
        }

        s.QoidQ(_0x2e5b7b, _0x2f6b3b.TOKEN_IS_NOT_PROVIDED);
      }, this[n(155)] = t, s[n(163)](this.appModule[n(169)], s.xbhBd) && (s[n(176)](n(144), s[n(152)]) ? this[n(187)] = r : _0x863666 = _0x2712bb[n(154)](_0x2f8be7[n(170)], _0x4b276c)), !this[n(155)][n(161)]() && s[n(181)](U, D.TOKEN_IS_NOT_PROVIDED);
    }

    var _proto7 = z.prototype;

    _proto7[_V] = function () {};

    _proto7[_V2] = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(t, n) {
        var e, r;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (n === void 0) {
                  n = !0;
                }

                e = V, r = {
                  lbxsj: function lbxsj(t, n, e) {
                    return t(n, e);
                  },
                  BktVQ: function BktVQ(t, n) {
                    return t + n;
                  },
                  XSYve: function XSYve(t, n) {
                    return t(n);
                  }
                };
                _context3.t0 = r;
                _context3.t1 = fetch;
                _context3.t2 = r[e(179)](this[e(187)], e(192));
                _context3.t3 = e(185);
                _context3.t4 = this[e(195)](n);

                if (!n) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 10;
                return r.XSYve(B, t);

              case 10:
                _context3.t5 = _context3.sent;
                _context3.next = 14;
                break;

              case 13:
                _context3.t5 = JSON[e(188)](t);

              case 14:
                _context3.t6 = _context3.t5;
                _context3.t7 = {
                  method: _context3.t3,
                  headers: _context3.t4,
                  body: _context3.t6
                };
                _context3.t8 = e(184);
                _context3.next = 19;
                return _context3.t0.lbxsj.call(_context3.t0, _context3.t1, _context3.t2, _context3.t7)[_context3.t8](this[e(157)], this.responseToParams);

              case 19:
                return _context3.abrupt("return", _context3.sent);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3, _x4) {
        return _ref4.apply(this, arguments);
      };
    }();

    _proto7[_V3] = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(t, n, e, r) {
        var s, i, o;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (r === void 0) {
                  r = !0;
                }

                s = V, i = {
                  SbcET: "gzip",
                  TAQhp: "Content",
                  WTGLn: function WTGLn(t, n) {
                    return t !== n;
                  },
                  oGVKY: s(182),
                  eTdic: "cOjzP",
                  JYNqv: function JYNqv(t, n, e) {
                    return t(n, e);
                  },
                  bsnjJ: function bsnjJ(t, n) {
                    return t + n;
                  },
                  RUsxX: s(185),
                  xhsCy: function xhsCy(t, n) {
                    return t(n);
                  }
                };
                (null == n ? void 0 : n[s(170)]) && (i[s(141)](i[s(180)], i.oGVKY) ? _0x53a328[s(173)] = i[s(189)] : e ? s(183) === i[s(143)] ? e = Object.assign(n[s(170)], e) : _0x2b842c[i[s(165)]] = this[s(155)].taskSolution : e = n[s(170)]);
                o = _extends({}, n, {
                  event_name: t,
                  custom_data: e
                }, this[s(155)][s(153)]());
                _context4.t0 = i;
                _context4.t1 = fetch;
                _context4.t2 = i.bsnjJ(this[s(187)], s(192));
                _context4.t3 = i[s(146)];
                _context4.t4 = this.generateHeaders(!0);

                if (!r) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 12;
                return i.xhsCy(B, o);

              case 12:
                _context4.t5 = _context4.sent;
                _context4.next = 16;
                break;

              case 15:
                _context4.t5 = JSON[s(188)](o);

              case 16:
                _context4.t6 = _context4.t5;
                _context4.t7 = {
                  method: _context4.t3,
                  headers: _context4.t4,
                  body: _context4.t6
                };
                _context4.t8 = s(184);
                _context4.next = 21;
                return _context4.t0.JYNqv.call(_context4.t0, _context4.t1, _context4.t2, _context4.t7)[_context4.t8](this[s(157)], this.responseToParams);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x5, _x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }();

    return z;
  }(V(158), V(145), V(159));

  var M = /*#__PURE__*/function (_Error) {
    _inheritsLoose(M, _Error);

    function M(t, n, e) {
      var _this8;

      _this8 = _Error.call(this, n, {
        cause: e
      }) || this, _this8.type = t, Object.setPrototypeOf(_assertThisInitialized(_this8), M.prototype);
      return _this8;
    }

    return M;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function Q(t, n, e) {
    return new M(t, n, e);
  }

  var H = "ERR_PARSE";

  function q() {
    return Q("ERR_UNEXPECTED_TYPE", "Value has unexpected type");
  }

  var J = /*#__PURE__*/function () {
    function J(t, n, e) {
      this.parser = t, this.isOptional = n, this.type = e;
    }

    var _proto8 = J.prototype;

    _proto8.parse = function parse(t) {
      if (!this.isOptional || void 0 !== t) try {
        return this.parser(t);
      } catch (n) {
        throw Q(H, "Unable to parse value" + (this.type ? " as " + this.type : ""), n);
      }
    };

    _proto8.optional = function optional() {
      return this.isOptional = !0, this;
    };

    return J;
  }();

  function F(t, n) {
    return function () {
      return new J(t, !1, n);
    };
  }

  var Y = F(function (t) {
    if ("boolean" == typeof t) return t;
    var n = String(t);
    if ("1" === n || "true" === n) return !0;
    if ("0" === n || "false" === n) return !1;
    throw q();
  }, "boolean");

  function X(t, n) {
    var e = {};

    for (var _s in t) {
      var _i = t[_s];
      if (!_i) continue;

      var _o = void 0,
          _a3 = void 0;

      if ("function" == typeof _i || "parse" in _i) _o = _s, _a3 = "function" == typeof _i ? _i : _i.parse.bind(_i);else {
        var _t7 = _i.type;
        _o = _i.from || _s, _a3 = "function" == typeof _t7 ? _t7 : _t7.parse.bind(_t7);
      }

      try {
        var _t8 = _a3(n(_o));

        void 0 !== _t8 && (e[_s] = _t8);
      } catch (r) {
        throw Q(H, "Unable to parse field \"" + _s + "\"", r);
      }
    }

    return e;
  }

  function K(t) {
    var n = t;
    if ("string" == typeof n && (n = JSON.parse(n)), "object" != typeof n || null === n || Array.isArray(n)) throw q();
    return n;
  }

  function j(t, n) {
    return new J(function (n) {
      var e = K(n);
      return X(t, function (t) {
        return e[t];
      });
    }, !1, n);
  }

  var Z = F(function (t) {
    if ("number" == typeof t) return t;

    if ("string" == typeof t) {
      var _n6 = Number(t);

      if (!Number.isNaN(_n6)) return _n6;
    }

    throw q();
  }, "number"),
      $ = F(function (t) {
    if ("string" == typeof t || "number" == typeof t) return t.toString();
    throw q();
  }, "string");
  j({
    req_id: $(),
    result: function result(t) {
      return t;
    },
    error: $().optional()
  });
  var tt = F(function (t) {
    return t instanceof Date ? t : new Date(1e3 * Z().parse(t));
  }, "Date");

  function nt(t, n) {
    return new J(function (n) {
      if ("string" != typeof n && !(n instanceof URLSearchParams)) throw q();
      var e = "string" == typeof n ? new URLSearchParams(n) : n;
      return X(t, function (t) {
        var n = e.get(t);
        return null === n ? void 0 : n;
      });
    }, !1, n);
  }

  var et = j({
    id: Z(),
    type: $(),
    title: $(),
    photoUrl: {
      type: $().optional(),
      from: "photo_url"
    },
    username: $().optional()
  }, "Chat").optional(),
      rt = j({
    addedToAttachmentMenu: {
      type: Y().optional(),
      from: "added_to_attachment_menu"
    },
    allowsWriteToPm: {
      type: Y().optional(),
      from: "allows_write_to_pm"
    },
    firstName: {
      type: $(),
      from: "first_name"
    },
    id: Z(),
    isBot: {
      type: Y().optional(),
      from: "is_bot"
    },
    isPremium: {
      type: Y().optional(),
      from: "is_premium"
    },
    languageCode: {
      type: $().optional(),
      from: "language_code"
    },
    lastName: {
      type: $().optional(),
      from: "last_name"
    },
    photoUrl: {
      type: $().optional(),
      from: "photo_url"
    },
    username: $().optional()
  }, "User").optional();
  var st = F(function (t) {
    return function (t) {
      var n = t.replace(/\s/g, "").toLowerCase();
      if (function (t) {
        return /^#[\da-f]{6}$/i.test(t);
      }(n)) return n;

      if (function (t) {
        return /^#[\da-f]{3}$/i.test(t);
      }(n)) {
        var _t9 = "#";

        for (var _e2 = 0; _e2 < 3; _e2 += 1) {
          _t9 += n[1 + _e2].repeat(2);
        }

        return _t9;
      }

      var e = n.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || n.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
      if (!e) throw new Error("Value \"" + t + "\" does not satisfy any of known RGB formats.");
      return e.slice(1).reduce(function (t, n) {
        var e = parseInt(n, 10).toString(16);
        return t + (1 === e.length ? "0" : "") + e;
      }, "#");
    }($().parse(t));
  }, "rgb");

  function it(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return "_" + t.toLowerCase();
    });
  }

  var ot = F(function (t) {
    var n = st().optional();
    return Object.entries(K(t)).reduce(function (t, _ref6) {
      var e = _ref6[0],
          r = _ref6[1];
      return t[function (t) {
        return t.replace(/_[a-z]/g, function (t) {
          return t[1].toUpperCase();
        });
      }(e)] = n.parse(r), t;
    }, {});
  }, "ThemeParams");

  function at(t) {
    return nt({
      botInline: {
        type: Y().optional(),
        from: "tgWebAppBotInline"
      },
      initData: {
        type: nt({
          authDate: {
            type: tt(),
            from: "auth_date"
          },
          canSendAfter: {
            type: Z().optional(),
            from: "can_send_after"
          },
          chat: et,
          chatInstance: {
            type: $().optional(),
            from: "chat_instance"
          },
          chatType: {
            type: $().optional(),
            from: "chat_type"
          },
          hash: $(),
          queryId: {
            type: $().optional(),
            from: "query_id"
          },
          receiver: rt,
          startParam: {
            type: $().optional(),
            from: "start_param"
          },
          user: rt
        }, "InitData").optional(),
        from: "tgWebAppData"
      },
      initDataRaw: {
        type: $().optional(),
        from: "tgWebAppData"
      },
      platform: {
        type: $(),
        from: "tgWebAppPlatform"
      },
      showSettings: {
        type: Y().optional(),
        from: "tgWebAppShowSettings"
      },
      startParam: {
        type: $().optional(),
        from: "tgWebAppStartParam"
      },
      themeParams: {
        type: ot(),
        from: "tgWebAppThemeParams"
      },
      version: {
        type: $(),
        from: "tgWebAppVersion"
      }
    }).parse(t);
  }

  function ct(t) {
    return at(t.replace(/^[^?#]*[?#]/, "").replace(/[?#]/g, "&"));
  }

  function ut() {
    return ct(window.location.href);
  }

  function pt() {
    var t = performance.getEntriesByType("navigation")[0];
    if (!t) throw new Error("Unable to get first navigation entry.");
    return ct(t.name);
  }

  function ht(t) {
    return "telegram-apps/" + t.replace(/[A-Z]/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  function ft() {
    return at(function (t) {
      var n = sessionStorage.getItem(ht(t));

      try {
        return n ? JSON.parse(n) : void 0;
      } catch (_unused) {}
    }("launchParams") || "");
  }

  function lt(t) {
    var n = t.initDataRaw,
        e = t.themeParams,
        r = t.platform,
        s = t.version,
        i = t.showSettings,
        o = t.startParam,
        a = t.botInline,
        c = new URLSearchParams();
    return c.set("tgWebAppPlatform", r), c.set("tgWebAppThemeParams", function (t) {
      return JSON.stringify(Object.fromEntries(Object.entries(t).map(function (_ref7) {
        var t = _ref7[0],
            n = _ref7[1];
        return [it(t), n];
      })));
    }(e)), c.set("tgWebAppVersion", s), n && c.set("tgWebAppData", n), o && c.set("tgWebAppStartParam", o), "boolean" == typeof i && c.set("tgWebAppShowSettings", i ? "1" : "0"), "boolean" == typeof a && c.set("tgWebAppBotInline", a ? "1" : "0"), c.toString();
  }

  function dt(t) {
    !function (t, n) {
      sessionStorage.setItem(ht(t), JSON.stringify(n));
    }("launchParams", lt(t));
  }

  function It() {
    var t = [];

    for (var _i2 = 0, _arr = [ut, pt, ft]; _i2 < _arr.length; _i2++) {
      var _e3 = _arr[_i2];

      try {
        var _t10 = _e3();

        return dt(_t10), _t10;
      } catch (n) {
        t.push(n instanceof Error ? n.message : JSON.stringify(n));
      }
    }

    throw new Error(["Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?\n", "📖 Refer to docs for more information:", "https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment\n", "Collected errors:", t.map(function (t) {
      return "\u2014 " + t;
    })].join("\n"));
  }

  function mt() {
    var t = ["length", "floor", "BTMUl", "12650MiADnV", "528805MwQsic", "lpbWf", "slice", "5672569XPDgVJ", "yVCuM", "16wQNNaA", "2113644QIIGIP", "3713769RDhegt", "6858260udJzmh", "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", "vUtbH", "4455198fubYPY", "toString", "charCodeAt", "nrRFj", "4XrsvEk", "NAsrt", "replace", "wFSXd", "4Cycsid"];
    return (mt = function mt() {
      return t;
    })();
  }

  function vt(t, n) {
    var e = mt();
    return (vt = function vt(t, n) {
      return e[t -= 272];
    })(t, n);
  }

  function gt(t) {
    var n = vt,
        e = {
      vUtbH: function vUtbH(t, n) {
        return t + n;
      },
      uTiyK: function uTiyK(t, n) {
        return t << n;
      },
      YKgUH: function YKgUH(t, n) {
        return t | n;
      },
      lpbWf: function lpbWf(t, n) {
        return t % n;
      },
      wFSXd: function wFSXd(t, n) {
        return t + n;
      },
      afDcF: function afDcF(t, n) {
        return t / n;
      },
      yVCuM: function yVCuM(t, n) {
        return t == n;
      },
      nrRFj: function nrRFj(t, n) {
        return t | n;
      },
      wcSMm: function wcSMm(t, n) {
        return t & n;
      },
      NAsrt: n(273),
      BTMUl: function BTMUl(t, n) {
        return t(n);
      },
      hjdqU: function hjdqU(t, n) {
        return t < n;
      }
    };
    var r = e[n(280)],
        s = new Date().getTime();
    var i = t + s;
    var o = e[n(286)](function (t) {
      var r = n;
      var s = 0;

      for (var _n7 = 0; _n7 < t[r(284)]; _n7++) {
        var _i3 = t[r(277)](_n7);

        s = e[r(274)](e.uTiyK(s, 5) - s, _i3), s |= 0;
      }

      return s;
    }, i)[n(276)](16);

    for (; e.hjdqU(o.length, 32);) {
      o += o;
    }

    o = o[n(290)](0, 32);
    var a = 0;
    return r[n(281)](/[xy]/g, function (t) {
      var r = n,
          i = e.YKgUH(e[r(289)](e[r(282)](s, parseInt(o[a], 16)), 16), 0);
      return s = Math[r(285)](e.afDcF(s, 16)), a++, (e[r(292)](t, "x") ? i : e[r(278)](e.wcSMm(i, 3), 8))[r(276)](16);
    });
  }

  !function (t) {
    var n = vt,
        e = t();

    for (;;) {
      try {
        if (959836 === -parseInt(n(288)) / 1 + parseInt(n(279)) / 2 * (parseInt(n(294)) / 3) + -parseInt(n(283)) / 4 * (-parseInt(n(272)) / 5) + parseInt(n(275)) / 6 + parseInt(n(291)) / 7 * (-parseInt(n(293)) / 8) + -parseInt(n(295)) / 9 + -parseInt(n(287)) / 10) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(mt);
  var Et = yt;

  function yt(t, n) {
    var e = _t();

    return (yt = function yt(t, n) {
      return e[t -= 158];
    })(t, n);
  }

  function _t() {
    var t = ["photoUrl", "lastName", "199792oExWSq", "firstName", "getAppName", "119150zuuTDi", "USER_DATA_IS_NOT_PROVIDED", "isBot", "webAppStartParam", "uwlFY", "startParam", "235948swprkt", "1686180GGkNhg", "svRwo", "sessionId", "getUserData", "getUserId", "48vNzueD", "username", "isPremium", "446057oYdDfX", "assembleEventSession", "nJLdI", "217vekpJW", "6cHatdx", "userData", "platform", "tbIVr", "getSessionId", "27RUkzYz", "rtumL", "languageCode", "YgIFc", "userId", "getUserLocale", "getWebAppStartParam", "1149753ipOCXm", "initData", "getUserIsPremium", "init", "user", "27zpBvNG", "appModule", "2265545YtBria", "getPlatform"];
    return (_t = function _t() {
      return t;
    })();
  }

  !function (t) {
    var n = yt,
        e = t();

    for (;;) {
      try {
        if (434098 === -parseInt(n(174)) / 1 + -parseInt(n(159)) / 2 + parseInt(n(183)) / 3 * (parseInt(n(165)) / 4) + -parseInt(n(197)) / 5 * (parseInt(n(178)) / 6) + parseInt(n(177)) / 7 * (parseInt(n(201)) / 8) + parseInt(n(195)) / 9 * (parseInt(n(166)) / 10) + -parseInt(n(190)) / 11 * (parseInt(n(171)) / 12)) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(_t);

  var St = /*#__PURE__*/function (_Et, _Et2, _Et3, _Et4, _Et5, _Et6, _Et7, _Et8) {
    function St(t) {
      this[yt(196)] = t;
    }

    var _proto9 = St.prototype;

    _proto9[_Et] = function () {
      var t;
      var n = Et,
          e = {
        MQuXw: function MQuXw(t) {
          return t();
        },
        rtumL: function rtumL(t, n) {
          return t === n;
        },
        uwlFY: n(186),
        PljGl: n(176),
        tbIVr: function tbIVr(t, n) {
          return t(n);
        }
      },
          r = e.MQuXw(It),
          s = r[n(191)],
          i = null == (t = r[n(191)]) ? void 0 : t[n(194)];
      !i && (e[n(184)](e[n(163)], e.PljGl) ? this[n(196)] = _0x437f4d : e[n(181)](U, D[n(160)])), this[n(179)] = {
        id: i.id,
        is_premium: i[n(173)],
        first_name: i[n(202)],
        is_bot: i[n(161)],
        last_name: i[n(200)],
        language_code: i[n(185)],
        photo_url: i[n(199)],
        username: i[n(172)]
      }, this[n(187)] = i.id, this.userLocale = i[n(185)], this[n(162)] = s[n(164)], this[n(180)] = r[n(180)], this[n(168)] = e[n(181)](gt, String(this[n(170)]()));
    };

    _proto9[_Et2] = function () {
      return this[Et(168)];
    };

    _proto9[_Et3] = function () {
      return this[Et(187)];
    };

    _proto9.getWebAppStartParam = function getWebAppStartParam() {
      return this[Et(162)];
    };

    _proto9[_Et4] = function () {
      return this.platform;
    };

    _proto9[_Et5] = function () {
      return this.userLocale;
    };

    _proto9[_Et6] = function () {
      return this[Et(179)];
    };

    _proto9[_Et7] = function () {
      var t = Et,
          n = this.getUserData();
      return {
        svRwo: function svRwo(t, n) {
          return t(n);
        }
      }[t(167)](Boolean, null == n ? void 0 : n.is_premium);
    };

    _proto9[_Et8] = function () {
      var t = Et;
      return {
        session_id: this[t(182)](),
        user_id: this.getUserId(),
        app_name: this.appModule[t(158)](),
        is_premium: this[t(192)](),
        platform: this[t(198)](),
        locale: this[t(188)](),
        start_param: this[t(189)](),
        client_timestamp: (n = String, e = Date.now(), n(e))
      };
      var n, e;
    };

    return St;
  }(Et(193), Et(182), Et(170), Et(198), Et(188), Et(169), Et(192), Et(175));

  var bt = Tt;

  function wt() {
    var t = ["includes", "getBatch", "addToStorage", "parse", "4666225fXafgr", "stringify", "key", "localStorage", "ckDJC", "26ZUnGuf", "findIndex", "getItem", "null", "560168zInAhi", "1866432GNieIb", "39316cdEQLm", "OyNbp", "yVcdR", "191862uoSgpX", "154KVjCuY", "sessionStorage", "cCUeD", "setItem", "push", "72872SpeiQZ", "5260473yZuJzO"];
    return (wt = function wt() {
      return t;
    })();
  }

  function Tt(t, n) {
    var e = wt();
    return (Tt = function Tt(t, n) {
      return e[t -= 169];
    })(t, n);
  }

  !function (t) {
    var n = Tt,
        e = t();

    for (;;) {
      try {
        if (552117 === -parseInt(n(180)) / 1 * (parseInt(n(186)) / 2) + parseInt(n(185)) / 3 + -parseInt(n(184)) / 4 + parseInt(n(175)) / 5 + parseInt(n(189)) / 6 + parseInt(n(190)) / 7 * (parseInt(n(169)) / 8) + -parseInt(n(170)) / 9) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(wt);

  var Nt = /*#__PURE__*/function (_bt, _bt2) {
    function Nt(t) {
      var n = Tt;
      this[n(191)] = window[n(191)], this[n(178)] = window[n(178)], this[n(177)] = t;
    }

    var _proto10 = Nt.prototype;

    _proto10.getBatch = function getBatch() {
      var t = Tt,
          n = {
        OyNbp: t(183),
        yVcdR: function yVcdR(t, n) {
          return t !== n;
        },
        cCUeD: t(179)
      };
      return [null, n[t(187)]].includes(this[t(191)][t(182)](this[t(177)])) && [null, n[t(187)]][t(171)](this[t(178)][t(182)](this[t(177)])) ? this[t(193)]([]) : n[t(188)](n[t(192)], t(179)) ? this[t(193)](_0x20797a[t(174)](this[t(178)].getItem(this[t(177)]))) : this[t(193)](JSON[t(174)](this.localStorage[t(182)](this[t(177)]))), this.setItem([].concat(JSON[t(174)](this[t(191)][t(182)](this[t(177)])), JSON[t(174)](this[t(178)][t(182)](this[t(177)]))).filter(function (n, e, r) {
        return r[t(181)](function (e) {
          return JSON[t(176)](e) === JSON[t(176)](n);
        }) === e;
      })), JSON[t(174)](this[t(191)][t(182)](this[t(177)]));
    };

    _proto10[_bt] = function (t, n) {
      var e = bt,
          r = this[e(172)]();
      r[e(194)](_extends({
        event_name: t
      }, n)), this.setItem(r);
    };

    _proto10[_bt2] = function (t) {
      var n = bt;
      this[n(178)][n(193)](this[n(177)], JSON[n(176)](t)), this[n(191)][n(193)](this[n(177)], JSON[n(176)](t));
    };

    return Nt;
  }(bt(173), bt(193));

  var Ot = At;

  function At(t, n) {
    var e = xt();
    return (At = function At(t, n) {
      return e[t -= 397];
    })(t, n);
  }

  !function (t) {
    var n = At,
        e = t();

    for (;;) {
      try {
        if (885619 === -parseInt(n(449)) / 1 + parseInt(n(412)) / 2 + parseInt(n(483)) / 3 * (-parseInt(n(445)) / 4) + -parseInt(n(422)) / 5 + parseInt(n(467)) / 6 + -parseInt(n(406)) / 7 + parseInt(n(472)) / 8) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(xt);

  var Ct = /*#__PURE__*/function (_Ot, _Ot2, _Ot3, _Ot4, _Ot5) {
    function Ct(t) {
      var n = At,
          e = {
        omVeX: n(421),
        ItrBC: function ItrBC(t, n) {
          return t + n;
        },
        dcSoE: function dcSoE(t, n) {
          return t + n;
        }
      },
          r = e[n(486)][n(433)]("|");
      var i = 0;

      for (;;) {
        switch (r[i++]) {
          case "0":
            this[n(440)] = new Nt(e.ItrBC(e.dcSoE(this[n(456)], "-"), this.appModule[n(484)]()));
            continue;

          case "1":
            this[n(488)] = t;
            continue;

          case "2":
            this[n(401)] = 0;
            continue;

          case "3":
            this[n(398)] = 2e3;
            continue;

          case "4":
            this[n(451)] = null;
            continue;

          case "5":
            this.backoff = 1;
            continue;

          case "6":
            this[n(456)] = s;
            continue;
        }

        break;
      }
    }

    var _proto11 = Ct.prototype;

    _proto11.init = function init() {
      var _this9 = this;

      var t = At,
          n = {
        Lqeoz: function Lqeoz(t, n) {
          return t(n);
        },
        FpfLs: function FpfLs(t, n) {
          return t == n;
        },
        UBott: "complete",
        mBbkR: function mBbkR(t, n) {
          return t === n;
        },
        eeamv: t(399),
        DDKXF: function DDKXF(t, n) {
          return t === n;
        },
        hNyrR: t(417),
        dQBKQ: "oHVmC"
      };

      if (n[t(477)](document.readyState, t(452))) {
        if (n[t(443)](n[t(437)], n[t(420)])) return this.startBatching(), void n.Lqeoz(_0x2cd785, _0x2d9d24);
        this[t(415)]();
      } else document[t(441)] = function () {
        var e = t;

        if (n[e(464)](document[e(458)], n[e(473)])) {
          if (!n.mBbkR(n[e(431)], n[e(431)])) return void _this9[e(481)]();

          _this9[e(415)]();
        }
      };
    };

    _proto11[_Ot] = function () {
      var _this10 = this;

      var t = Ot,
          n = {
        UdlzG: function UdlzG(t, n) {
          return t(n);
        },
        maGdc: function maGdc(t, n) {
          return t >= n;
        },
        ZoYBO: function ZoYBO(t, n) {
          return t(n);
        },
        RdQKi: t(480)
      };
      var e = 0;
      if (this[t(488)][t(405)](), this[t(488)][t(462)](o.INIT), void 0 !== this.appModule.taskSolution) this[t(481)]();else if (n[t(446)] === t(480)) {
        var _r2 = setInterval(function () {
          var s = t;
          if (void 0 !== _this10[s(488)][s(408)]) _this10.startBatching(), n[s(465)](clearInterval, _r2);else {
            if (n[s(463)](e++, 3)) return _this10[s(481)](), void n[s(416)](clearInterval, _r2);

            _this10[s(488)].solveTask();
          }
        }, 1e3);
      } else _0x41d663.addEventListener("load", _0x55f34e);
    };

    _proto11[_Ot2] = function () {
      var t = Ot,
          n = {
        gjnqC: function gjnqC(t, n) {
          return t == n;
        },
        XjPDG: t(452),
        KtsTE: function KtsTE(t, n) {
          return t === n;
        },
        dmQEq: "bUtWR",
        pQqdO: t(397)
      };
      null !== this[t(451)] && (n[t(487)](n[t(454)], n[t(482)]) ? n.gjnqC(_0x1a779b[t(458)], n.XjPDG) && this.startBatchingWithInterval() : (clearInterval(this[t(451)]), this[t(451)] = null));
    };

    _proto11[_Ot3] = function (t, n) {
      var _this11 = this;

      var e = Ot,
          r = {
        cHmiH: function cHmiH(t, n) {
          return t === n;
        },
        FjDUg: e(452),
        qnZSf: function qnZSf(t) {
          return t();
        },
        yVoMu: function yVoMu(t, n, e) {
          return t(n, e);
        }
      };
      if (r.cHmiH(document[e(458)], "complete")) this[e(440)][e(436)](t, n);else {
        var _s2 = function _s2() {
          _this11[e(440)].addToStorage(t, n);
        };

        r[e(468)](setTimeout, function () {
          var t = e;
          r.cHmiH(document[t(458)], r[t(400)]) ? r[t(419)](_s2) : window.addEventListener("load", _s2);
        }, 0);
      }
    };

    _proto11[_Ot4] = function () {
      var _this12 = this;

      var t = Ot,
          n = {
        dvHhi: function dvHhi(t, n) {
          return t === n;
        },
        UZaqe: function UZaqe(t, n) {
          return t === n;
        },
        HkHVA: "gPWhO"
      };
      this[t(488)].solveTask(), n[t(402)](this.intervalId, null) && (n[t(434)](n[t(424)], n[t(424)]) ? this.intervalId = window.setInterval(function () {
        return _this12.processQueue();
      }, this[t(398)]) : this[t(475)](_0x3e5de4[t(459)](0, 20)));
    };

    _proto11[_Ot5] = function () {
      var t = Ot,
          n = this[t(440)][t(450)]();
      0 !== n[t(455)] && window[t(439)][t(447)] && this[t(475)](n[t(459)](0, 20));
    };

    _proto11.sendBatch = function sendBatch(t) {
      var _this13 = this;

      var n = Ot,
          e = {
        IjFYO: function IjFYO(t, n) {
          return t + n;
        },
        EYTtC: function EYTtC(t, n) {
          return t == n;
        },
        LRDvz: "complete",
        TiYzN: function TiYzN(t, n) {
          return t !== n;
        },
        ElVuo: function ElVuo(t, n) {
          return t(n);
        },
        ZXHMW: n(432),
        FqTjO: function FqTjO(t, n) {
          return t === n;
        },
        lPQVg: n(411),
        JlGOR: function JlGOR(t, n) {
          return t === n;
        },
        PMnxd: "YjNHh",
        bwPJs: n(409),
        COROU: n(453),
        QDExU: function QDExU(t, n) {
          return t < n;
        },
        vQVwl: "203",
        fEULn: function fEULn(t, n) {
          return t > n;
        },
        QwYlu: n(413),
        eGPiw: n(444)
      };
      this.stopBatching(), this[n(488)][n(489)](t)[n(403)](function (r) {
        var s = n,
            i = {
          YZpPz: function YZpPz(t, n) {
            return e.EYTtC(t, n);
          },
          qkxiz: e[s(461)],
          Ragin: function Ragin(t, n) {
            return e.TiYzN(t, n);
          },
          MRpSK: function MRpSK(t, n) {
            return e[s(428)](t, n);
          }
        };
        if (e[s(429)](e[s(471)], e.ZXHMW)) _this13[s(440)].addToStorage(_0x16d086, _0x6471c4);else {
          if (e.FqTjO(e.ElVuo(String, r.status), s(426))) {
            if (e[s(429)](s(427), e[s(442)])) return void _this13.startBatching();
            {
              var _t11 = {
                qsReC: function qsReC(t, n) {
                  return i[s(407)](t, n);
                },
                zalhZ: i.qkxiz
              };

              _0xe25c0f[s(441)] = function () {
                var n = s;
                _t11[n(485)](_0x269819[n(458)], _t11.zalhZ) && _this13.startBatchingWithInterval();
              };
            }
          }

          if (e[s(430)](e[s(428)](String, r[s(490)])[0], "4")) {
            if (!e[s(429)](s(460), e[s(423)])) return;
            i.Ragin(_this13[s(451)], null) && (i[s(448)](_0x19714c, _this13[s(451)]), _this13.intervalId = null);
          }

          if ("5" === String(r[s(490)])[0]) {
            if (e[s(429)](e[s(438)], e.COROU)) return void (e[s(404)](_this13[s(469)], 5) && (_this13[s(469)]++, _this13[s(398)] = 2.71 * _this13[s(398)], _this13[s(481)]()));

            _this13[s(440)][s(436)](_0x438ca1, _0x2b80f7);
          }

          if (_this13[s(469)] = 1, _this13[s(398)] = 2e3, e[s(430)](String(r[s(490)]), e[s(474)])) {
            if (_this13[s(401)]++, _this13[s(488)][s(408)] = void 0, !e.fEULn(_this13[s(401)], 3)) return _this13[s(488)].solveTask(), void _this13[s(481)]();
            if (!e[s(429)](e[s(457)], e[s(457)])) return void _this13.startBatching();
            _this13[s(469)] = 1, _this13[s(451)] = null, _this13[s(398)] = 2e3, _this13[s(401)] = 0, _this13[s(456)] = _0x12a166, _this13[s(488)] = _0x4926dd, _this13[s(440)] = new _0x4acd30(e.IjFYO(e[s(414)](_this13[s(456)], "-"), _this13.appModule[s(484)]()));
          }

          _this13.taskRetry = 0, _this13.storage[s(476)](_this13[s(440)][s(450)]()[s(466)](function (n) {
            return !t[s(435)](function (t) {
              return JSON[s(470)](n) === JSON[s(470)](t);
            });
          })), _this13[s(481)]();
        }
      }, function (t) {
        var r = n;
        if (e[r(418)] != e[r(418)]) return _this13[r(488)][r(405)](), void _this13.startBatching();
        console[r(478)](t), _this13[r(481)]();
      });
    };

    return Ct;
  }(Ot(415), Ot(425), Ot(479), Ot(481), Ot(410));

  function xt() {
    var t = ["UpiKG", "eGPiw", "qnZSf", "dQBKQ", "5|4|3|2|6|1|0", "7940870pxnDaw", "PMnxd", "HkHVA", "stopBatching", "429", "yiprr", "ElVuo", "TiYzN", "JlGOR", "eeamv", "Uwyio", "split", "UZaqe", "some", "addToStorage", "hNyrR", "bwPJs", "navigator", "storage", "onreadystatechange", "lPQVg", "DDKXF", "qQDkV", "10712mWOnso", "RdQKi", "onLine", "MRpSK", "946047McwFXA", "getBatch", "intervalId", "complete", "UFoqT", "dmQEq", "length", "BATCH_KEY", "QwYlu", "readyState", "slice", "YjNHh", "LRDvz", "collectEvent", "maGdc", "FpfLs", "UdlzG", "filter", "8346636MuiItV", "yVoMu", "backoff", "stringify", "ZXHMW", "6827296mOFhXm", "UBott", "vQVwl", "sendBatch", "setItem", "mBbkR", "log", "collect", "XWspJ", "startBatching", "pQqdO", "42ofuNJO", "getApiToken", "qsReC", "omVeX", "KtsTE", "appModule", "recordEvents", "status", "mtPYb", "batchInterval", "YxTPU", "FjDUg", "taskRetry", "dvHhi", "then", "QDExU", "solveTask", "760690lfcRby", "YZpPz", "taskSolution", "kBWXS", "processQueue", "nqYzt", "2642968eMGyoZ", "wSZTk", "IjFYO", "startBatchingWithInterval", "ZoYBO"];
    return (xt = function xt() {
      return t;
    })();
  }

  function Rt(t, n) {
    var e = Ut();
    return (Rt = function Rt(t, n) {
      return e[t -= 382];
    })(t, n);
  }

  function Ut() {
    var t = ["508884EytUxP", "pNViZ", "rZwzU", "init", "taskParams", "data", "75Nshbnc", "YnspN", "bXbaP", "gwGwO", "text", "ufWNc", "TXQgv", "appModule", "VLLVW", "kuBbl", "taskSolution", "createObjectURL", "worker", "BESMK", "22102LgKgHF", "onmessage", "dcemb", "973356YdHceZ", "sOoAC", "40044HvYOiC", "850uVCjSR", "IlCVp", "setNewArgs", "ImNxV", "2142aSWVRJ", "postMessage", "GMLgL", "10760nmJCPK", "PIZWC", "c3e068ebf11840ed3fc311a6f2df80b20fa05d25", "UBtCU", "107343kAwEbQ", "then", "aee7c93a9ae7930fb19732325d2c560c53849aa7", "oNcMI", "qBPDo", "qemly", "7324IXhVNK", "blob", "solveTask"];
    return (Ut = function Ut() {
      return t;
    })();
  }

  var Pt = Rt;
  !function (t) {
    for (var n = Rt, e = t();;) {
      try {
        if (262548 === parseInt(n(424)) / 1 + parseInt(n(383)) / 2 + -parseInt(n(427)) / 3 + -parseInt(n(401)) / 4 * (-parseInt(n(410)) / 5) + -parseInt(n(404)) / 6 + -parseInt(n(388)) / 7 * (parseInt(n(391)) / 8) + parseInt(n(395)) / 9 * (parseInt(n(384)) / 10)) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(Ut);

  var Dt = /*#__PURE__*/function (_Pt, _Pt2) {
    function Dt(t) {
      this[Rt(417)] = t;
    }

    var _proto12 = Dt.prototype;
    _proto12[_Pt] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var _this14 = this;

      var t, n;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              t = Pt, n = {
                EfWrc: "LvxDY",
                IlCVp: t(398),
                qBPDo: function qBPDo(t, n) {
                  return t + n;
                },
                gwGwO: t(397),
                sOoAC: t(390),
                iVcOU: "CEpEj",
                rZwzU: function rZwzU(t) {
                  return t();
                },
                VLLVW: function VLLVW(t, n) {
                  return t !== n;
                },
                pNViZ: t(392),
                ufWNc: function ufWNc(t, n) {
                  return t(n);
                },
                TOuSH: function TOuSH(t, n) {
                  return t + n;
                },
                kuBbl: t(393)
              };
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(r, s) {
                  var i, o;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          i = t, o = {
                            ImNxV: n[i(382)],
                            BESMK: n.iVcOU,
                            oVADi: function oVADi(t, n) {
                              return t(n);
                            },
                            YnspN: function YnspN(t) {
                              return n[i(406)](t);
                            }
                          };
                          _context7.prev = 1;

                          if (!n[i(418)](n[i(405)], i(392))) {
                            _context7.next = 6;
                            break;
                          }

                          _this14[i(417)].taskSolution = _0x5757c2[i(409)];
                          _context7.next = 8;
                          break;

                        case 6:
                          _context7.next = 8;
                          return n[i(415)](fetch, n.TOuSH(e, n[i(419)]))[i(396)]( /*#__PURE__*/function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(t) {
                              var s, a;
                              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                                while (1) {
                                  switch (_context6.prev = _context6.next) {
                                    case 0:
                                      s = i, a = {
                                        dcemb: function dcemb(t, n) {
                                          return t !== n;
                                        }
                                      };

                                      if (!(n.EfWrc !== n[s(385)])) {
                                        _context6.next = 14;
                                        break;
                                      }

                                      _context6.t0 = Worker;
                                      _context6.t1 = URL;
                                      _context6.t2 = s(421);
                                      _context6.next = 7;
                                      return t[s(402)]();

                                    case 7:
                                      _context6.t3 = _context6.sent;
                                      _context6.t4 = _context6.t1[_context6.t2].call(_context6.t1, _context6.t3);
                                      _this14.worker = new _context6.t0(_context6.t4);
                                      _context6.next = 12;
                                      return fetch(n[s(399)](e, n[s(413)]))[s(396)]( /*#__PURE__*/function () {
                                        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(t) {
                                          var n;
                                          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                                            while (1) {
                                              switch (_context5.prev = _context5.next) {
                                                case 0:
                                                  n = s;

                                                  if (!(o[n(387)] !== o[n(423)])) {
                                                    _context5.next = 12;
                                                    break;
                                                  }

                                                  _context5.t0 = o;
                                                  _context5.t1 = String;
                                                  _context5.next = 6;
                                                  return t[n(414)]();

                                                case 6:
                                                  _context5.t2 = _context5.sent;
                                                  _this14.appModule[n(408)] = _context5.t0.oVADi.call(_context5.t0, _context5.t1, _context5.t2);

                                                  _this14[n(422)][n(425)] = function (t) {
                                                    var e = n;
                                                    _this14.appModule[e(420)] = t.data;
                                                  };

                                                  o[n(411)](r);
                                                  _context5.next = 13;
                                                  break;

                                                case 12:
                                                  a[n(426)](_this14[n(422)], void 0) && _this14[n(422)][n(389)](_this14.appModule[n(408)]);

                                                case 13:
                                                case "end":
                                                  return _context5.stop();
                                              }
                                            }
                                          }, _callee5);
                                        }));

                                        return function (_x12) {
                                          return _ref11.apply(this, arguments);
                                        };
                                      }());

                                    case 12:
                                      _context6.next = 15;
                                      break;

                                    case 14:
                                      _this14[s(417)][s(408)] = _0x55ecd5, _this14[s(403)]();

                                    case 15:
                                    case "end":
                                      return _context6.stop();
                                  }
                                }
                              }, _callee6);
                            }));

                            return function (_x11) {
                              return _ref10.apply(this, arguments);
                            };
                          }());

                        case 8:
                          _context7.next = 13;
                          break;

                        case 10:
                          _context7.prev = 10;
                          _context7.t0 = _context7["catch"](1);
                          s(_context7.t0);

                        case 13:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7, null, [[1, 10]]);
                }));

                return function (_x9, _x10) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    _proto12[_Pt2] = function (t) {
      var n = Pt;
      this.appModule[n(408)] = t, this[n(403)]();
    };

    _proto12.solveTask = function solveTask() {
      var t = Pt,
          n = {
        qemly: function qemly(t, n) {
          return t(n);
        },
        bXbaP: function bXbaP(t, n) {
          return t !== n;
        },
        UBtCU: t(416)
      };
      n[t(412)](this.worker, void 0) && (n[t(394)] == n[t(394)] ? this.worker[t(389)](this[t(417)][t(408)]) : n[t(400)](_0xa791fa, _0x127171));
    };

    return Dt;
  }(Pt(407), Pt(386));

  var kt = Lt;

  function Lt(t, n) {
    var e = Bt();
    return (Lt = function Lt(t, n) {
      return e[t -= 444];
    })(t, n);
  }

  function Bt() {
    var t = ["solveTask", "apiToken", "batchService", "5181624Vviiyg", "init", "collectEvent", "networkController", "then", "recordEvent", "3565568ltagEs", "sessionController", "recordEvents", "appName", "split", "61788gDAkTg", "5234616aimxOP", "assembleEventSession", "collect", "Ujlgc", "2548763ZXtNlu", "getUserData", "registerInvoice", "collectTappsEvent", "humanProofService", "analyticsController", "267304BilHKL", "getApiToken", "setNewArgs", "getAppName", "4594215mUrXbN", "env", "38nzLxHl"];
    return (Bt = function Bt() {
      return t;
    })();
  }

  !function (t) {
    for (var n = Lt, e = t();;) {
      try {
        if (476817 === parseInt(n(453)) / 1 + parseInt(n(459)) / 2 * (-parseInt(n(474)) / 3) + -parseInt(n(469)) / 4 + parseInt(n(457)) / 5 + parseInt(n(463)) / 6 + parseInt(n(447)) / 7 + -parseInt(n(475)) / 8) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(Bt);

  var Vt = /*#__PURE__*/function (_kt, _kt2, _kt3, _kt4, _kt5, _kt6, _kt7) {
    function Vt(t, n, e) {
      for (var r = Lt, s = {
        Ujlgc: "6|2|4|5|3|0|7|1"
      }[r(446)][r(473)]("|"), i = 0;;) {
        switch (s[i++]) {
          case "0":
            this.networkController = new z(this);
            continue;

          case "1":
            this.batchService = new Ct(this);
            continue;

          case "2":
            this[r(461)] = t;
            continue;

          case "3":
            this[r(470)] = new St(this);
            continue;

          case "4":
            this[r(472)] = n;
            continue;

          case "5":
            this.humanProofService = new Dt(this);
            continue;

          case "6":
            this[r(458)] = e;
            continue;

          case "7":
            this.analyticsController = new C(this);
            continue;
        }

        break;
      }
    }

    var _proto13 = Vt.prototype;

    _proto13.init = /*#__PURE__*/function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var _this15 = this;

        var t;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                t = Lt;
                this.sessionController[t(464)]();
                _context9.next = 4;
                return this[t(452)][t(464)]();

              case 4:
                _context9.next = 6;
                return this[t(451)][t(464)]()[t(467)](function () {
                  _this15[t(460)]();
                })["catch"](function (t) {
                  return console.error(t);
                });

              case 6:
                this[t(466)][t(464)]();
                this[t(462)].init();

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    _proto13[_kt] = function () {
      var t = kt;
      return this.sessionController[t(444)]();
    };

    _proto13.recordEvent = function recordEvent(t, n, e) {
      var r = kt;
      return this[r(466)][r(468)](t, n, e);
    };

    _proto13.recordEvents = function recordEvents(t) {
      var n = kt;
      return this[n(466)][n(471)](t);
    };

    _proto13[_kt2] = function (t, n) {
      var e = kt;
      this[e(462)][e(445)](t, _extends({}, n, this[e(444)]()));
    };

    _proto13[_kt3] = function (t) {
      var n = kt;
      this[n(462)][n(445)](o.INVOICE_REGISTERED, _extends({}, t, this[n(444)]()));
    };

    _proto13[_kt4] = function (t, n) {
      var e = kt;
      this[e(462)].collect(t, _extends({}, this.sessionController[e(444)](), {
        custom_data: _extends({
          userData: _extends({}, this[e(470)][e(448)]())
        }, n)
      }));
    };

    _proto13[_kt5] = function () {
      return this[kt(461)];
    };

    _proto13[_kt6] = function () {
      return this[kt(472)];
    };

    _proto13.solveTask = function solveTask() {
      var t = kt;
      this.humanProofService[t(460)]();
    };

    _proto13[_kt7] = function (t) {
      this[kt(451)].setNewArgs(t);
    };

    return Vt;
  }(kt(444), kt(465), kt(449), kt(450), kt(454), kt(456), kt(455));

  function Gt(t, n) {
    var e = Wt();
    return (Gt = function Gt(t, n) {
      return e[t -= 251];
    })(t, n);
  }

  function Wt() {
    var t = ["isArray", "krRcg", "7RbivPq", "13417330ogOPvv", "AdKcy", "zzZtf", "string", "hErzM", "number", "XmMkH", "1154166bscRWg", "UbDFY", "ezuFz", '" must be a number if provided', "mMZqe", "prices", "EBlkL", "OpFlr", "XsHYy", "UTAtr", "snkoj", "uaUSE", '" must be a boolean if provided', "description", "UohgT", "QcXbi", "4362993nLHLPD", "is_flexible", "ZJucF", "hYCVE", "length", "subscription_period", "AEGfZ", "2348388VsvsrD", "send_phone_number_to_provider", "OhCyU", "label", "payload", "5043944wzbuam", "need_email", "yGMXO", "need_name", "Payload is required", "NoXnZ", "1885850naKkhD", "tPKMv", "sgPBG", "Hfqmr", 'Each price must have a "label" string', "suggested_tip_amounts", "OTrYW", "wilVv", "TFIQb", "title", 'Each price must have a positive "amount" number', "amount", 'Field "suggested_tip_amounts" must be an array if provided', "send_email_to_provider", "tbKHS", "photo_size", "need_phone_number", "DwmQQ", "nxeFK", "photo_width", "444317FjxRre", "CqqKh", "boolean", "Mkrts", "5QDVRGy", "photo_height", "BGndP", "3SQMgay", "KYfEh", "DxkFQ", 'Field "'];
    return (Wt = function Wt() {
      return t;
    })();
  }

  !function (t) {
    var n = Gt,
        e = t();

    for (;;) {
      try {
        if (675025 === -parseInt(n(319)) / 1 + parseInt(n(299)) / 2 * (-parseInt(n(251)) / 3) + -parseInt(n(288)) / 4 + parseInt(n(323)) / 5 * (parseInt(n(265)) / 6) + -parseInt(n(257)) / 7 * (-parseInt(n(293)) / 8) + parseInt(n(281)) / 9 + parseInt(n(258)) / 10) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(Wt);
  var zt = Qt;

  function Mt() {
    var t = ["675838senmiz", "331854TbioXu", "init", "2078025WlAeIc", "6063930pOSseF", "8316LyEsRu", "9HsDucT", "3406528ziZEMA", "24RCUEtG", "2273463FAubBK", "PROD", "2322eqrILK"];
    return (Mt = function Mt() {
      return t;
    })();
  }

  function Qt(t, n) {
    var e = Mt();
    return (Qt = function Qt(t, n) {
      return e[t -= 435];
    })(t, n);
  }

  var Ht;
  !function (t) {
    var n = Qt,
        e = t();

    for (;;) {
      try {
        if (826084 === -parseInt(n(443)) / 1 + parseInt(n(442)) / 2 * (-parseInt(n(436)) / 3) + parseInt(n(437)) / 4 + parseInt(n(445)) / 5 + -parseInt(n(441)) / 6 * (parseInt(n(435)) / 7) + -parseInt(n(438)) / 8 * (-parseInt(n(439)) / 9) + parseInt(n(446)) / 10) break;
        e.push(e.shift());
      } catch (r) {
        e.push(e.shift());
      }
    }
  }(Mt);
  return {
    init: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref12) {
        var t, n, _ref12$env, e, r, s;

        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                t = _ref12.token, n = _ref12.appName, _ref12$env = _ref12.env, e = _ref12$env === void 0 ? zt(440) : _ref12$env;
                r = zt, s = new Vt(t, n, e);

                Ht = function Ht(t) {
                  (function (t) {
                    var n = Gt,
                        e = {
                      Mkrts: function Mkrts(t, n) {
                        return t !== n;
                      },
                      ZJucF: function ZJucF(t, n) {
                        return t <= n;
                      },
                      UTAtr: n(309),
                      UbDFY: function UbDFY(t, n) {
                        return t in n;
                      },
                      wilVv: n(297),
                      AEGfZ: n(311),
                      krRcg: "number",
                      DxkFQ: 'All values in "suggested_tip_amounts" must be numbers',
                      NoXnZ: "slug",
                      XmMkH: n(308),
                      dquaS: n(278),
                      ezuFz: n(292),
                      hYCVE: "currency",
                      yGMXO: n(261),
                      OhCyU: n(317),
                      ARSUc: n(313),
                      UohgT: function UohgT(t, n) {
                        return t !== n;
                      },
                      TFIQb: "tzVwN",
                      Hfqmr: n(301),
                      hErzM: function hErzM(t, n) {
                        return t !== n;
                      },
                      snkoj: 'Each price must have a "label" string',
                      AdKcy: "max_tip_amount",
                      zSwVR: n(318),
                      QcXbi: n(324),
                      pXhXK: function pXhXK(t, n) {
                        return t in n;
                      },
                      BGndP: function BGndP(t, n) {
                        return t === n;
                      },
                      IfMSO: n(316),
                      yvlJM: n(300),
                      XsHYy: function XsHYy(t, n) {
                        return t !== n;
                      },
                      OpFlr: n(269),
                      uaUSE: n(294),
                      zzZtf: n(289),
                      CqqKh: n(312),
                      KYfEh: function KYfEh(t, n) {
                        return t !== n;
                      },
                      wKbsN: n(321),
                      EBlkL: function EBlkL(t, n) {
                        return t !== n;
                      },
                      aUFii: "UsKOw",
                      FQhON: n(305)
                    };
                    if (!t) throw new Error(e[n(306)]);
                    var r = [e[n(298)], e[n(264)], e.dquaS, e[n(267)], e[n(284)]];

                    for (var _i4 = 0, _r3 = r; _i4 < _r3.length; _i4++) {
                      var _o2 = _r3[_i4];
                      if (!t[_o2] || e[n(322)](typeof t[_o2], e[n(295)])) throw new Error(n(254) + _o2 + '" is required and must be a string');
                    }

                    if (!Array[n(255)](t[n(270)]) || 0 === t[n(270)][n(285)]) {
                      if (e[n(290)] !== e.ARSUc) throw new Error('Field "prices" must be a non-empty array');
                      if (!_0x83c7ee[n(291)] || typeof _0x5509e6[n(291)] !== n(261)) throw new _0x20824a(n(303));
                      if (e.Mkrts(typeof _0x142cb7.amount, n(263)) || e.ZJucF(_0x37ce90[n(310)], 0)) throw new _0x3cc094(e[n(274)]);
                    }

                    for (var _iterator4 = _createForOfIteratorHelperLoose(t[n(270)]), _step4; !(_step4 = _iterator4()).done;) {
                      var _o5 = _step4.value;

                      if (e.UohgT(e[n(307)], e[n(302)])) {
                        if (!_o5.label || e[n(262)](typeof _o5[n(291)], e[n(295)])) throw new Error(e[n(275)]);
                        if (e[n(279)](typeof _o5[n(310)], e[n(256)]) || e[n(283)](_o5[n(310)], 0)) throw new Error(e.UTAtr);
                      } else if (e[n(266)](_0x1e7e1a, _0x545c2c) && "number" != typeof _0x1aba0f[_0x329ee7]) throw new _0x2ba2ef(n(254) + _0x3a16f9 + '" must be a number if provided');
                    }

                    var s = [n(286), e[n(259)], n(314), e.zSwVR, e[n(280)]];

                    for (var _i5 = 0, _s3 = s; _i5 < _s3.length; _i5++) {
                      var _o3 = _s3[_i5];
                      if (_o3 in t && typeof t[_o3] !== e[n(256)]) throw new Error(n(254) + _o3 + n(268));
                    }

                    if (e.pXhXK("suggested_tip_amounts", t)) {
                      if (!Array[n(255)](t[n(304)])) throw e[n(325)](e.IfMSO, e.yvlJM) ? new _0x5a03fd(e.wilVv) : new Error(e[n(287)]);

                      for (var _iterator5 = _createForOfIteratorHelperLoose(t.suggested_tip_amounts), _step5; !(_step5 = _iterator5()).done;) {
                        var _r4 = _step5.value;
                        if (e[n(273)](typeof _r4, e.krRcg)) throw e.BGndP(e[n(272)], "vYNfp") ? new _0x358604(e[n(287)]) : new Error(e.DxkFQ);
                      }
                    }

                    var i = [n(296), n(315), e[n(276)], "need_shipping_address", e[n(260)], e[n(320)], n(282)];

                    for (var _i7 = 0, _i6 = i; _i7 < _i6.length; _i7++) {
                      var _o4 = _i6[_i7];

                      if (e.pXhXK(_o4, t) && e[n(252)](typeof t[_o4], e.wKbsN)) {
                        if (e[n(271)](e.aUFii, e.FQhON)) throw new Error(n(254) + _o4 + n(277));
                        if (!_0x42e4c5[n(255)](_0x5caf9a.suggested_tip_amounts)) throw new _0x110595(n(311));

                        for (var _iterator6 = _createForOfIteratorHelperLoose(_0x21d3ab.suggested_tip_amounts), _step6; !(_step6 = _iterator6()).done;) {
                          var _t12 = _step6.value;
                          if (e[n(322)](typeof _t12, e[n(256)])) throw new _0x4171a9(e[n(253)]);
                        }
                      }
                    }
                  })(t), s.registerInvoice(t);
                };

                _context10.next = 5;
                return s[r(444)]();

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function init(_x13) {
        return _init2.apply(this, arguments);
      }

      return init;
    }(),
    registerInvoice: function registerInvoice(t) {
      return Ht(t);
    }
  };
}();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxqc1xcdGdhbmFseXRpY3MuanMiXSwibmFtZXMiOlsidGVsZWdyYW1BbmFseXRpY3MiLCJ0IiwiaSIsIm4iLCJlIiwicGFyc2VJbnQiLCJwdXNoIiwic2hpZnQiLCJyIiwicyIsIm8iLCJCVlBqSyIsIm1tQUpoIiwiTkF4SEsiLCJ2RkFwUCIsInppS3VKIiwiSGFDaWQiLCJkYm55bCIsImZvSGVrIiwiZmR2UWEiLCJ3VnFhbiIsImVJUHJqIiwicGJQTnciLCJ1UlFBVyIsIlBhZFduIiwiZmhaUnoiLCJiR2VlcyIsInhPSEJqIiwiTXV6VWQiLCJjbEJ1ZSIsImpuWFRnIiwiV0VZV2wiLCJMUXFxciIsIlhnYnBYIiwiTEN0V3oiLCJna1NDZiIsIkR1ZXFPIiwiUkdmbVAiLCJMYWZJZCIsImZ5ZHJxIiwiV3ZjdGoiLCJISURFIiwiQ09OTkVDVElPTl9SRVNUT1JJTkdfU1RBUlRFRCIsIlRSQU5TQUNUSU9OX1NJR05JTkdfRkFJTEVEIiwiYSIsImMiLCJ1IiwicCIsInZEUW92IiwidFFCTmEiLCJXQUxMRVRfQ09OTkVDVF9TVUNDRVNTIiwiVFJBTlNBQ1RJT05fU0lHTkVEIiwidG9uQ29ubmVjdFVpRXZlbnRzIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0eXBlIiwiZGV0YWlsIiwiaCIsImYiLCJkIiwibCIsImNydnhhIiwiTHBKankiLCJUWFhtVSIsInhBY3ZtIiwiQlJXU1oiLCJkb2N1bWVudEV2ZW50cyIsInZpc2liaWxpdHljaGFuZ2UiLCJfMHgzNjA1MDgiLCJfMHgzNjM0MzUiLCJfMHgzNTc5ZWMiLCJkb2N1bWVudCIsIlBLaHBHIiwiXzB4MzQ2ODg5IiwiY29sbGVjdEV2ZW50IiwiXzB4MjExYjYzIiwiYW5hbHl0aWNzQ29udHJvbGxlciIsIl8weDRjMTEyZCIsIndIelJvIiwiZEx5aUoiLCJEdHNEbCIsIk9iamVjdCIsIl8weDExMTcwNSIsInZpc2liaWxpdHlTdGF0ZSIsIl8weDJjMjk2YyIsIkkiLCJtIiwidiIsImciLCJ0ZWxlZ3JhbUFwcHNDZW50ZXJFdmVudHMiLCJFIiwiXyIsInkiLCJTIiwiY09ScU0iLCJIaERjdSIsInBVcEVaIiwiT2NwcU8iLCJwb3AiLCJzbHVnIiwid2ViQXBwIiwiXzB4MjIxMDhkIiwiXzB4OWU5NTNkIiwiXzB4MjM5NTRkIiwiXzB4NDJiOGU0IiwiYiIsInciLCJUIiwiTiIsInBhaWQiLCJjYW5jZWxsZWQiLCJmYWlsZWQiLCJQVVJDSEFTRV9GQUlMRUQiLCJDR25mayIsImRhdGEiLCJKU09OIiwiZXZlbnRUeXBlIiwiZXZlbnREYXRhIiwiaGFuZGxlRXZlbnRzIiwiXzB4M2IyMDljIiwiXzB4NTExMWQ2Iiwib0phbHoiLCJsbXlTZiIsIkVpSkpmIiwiZHRUaVoiLCJsV3ZHeiIsIl8weGVkZTJlMSIsInN0YXR1cyIsIl8weDJhMzZiOSIsInlnRHhGIiwiWnl2UE8iLCJPIiwiQSIsIngiLCJDIiwiaHBKWlMiLCJ0YXBwc09ic2VydmVyIiwiWkhjbnQiLCJMc1d1RSIsIm1rYkxaIiwiZG9jdW1lbnRPYnNlcnZlciIsImZldGNoIiwic2lnbmFsIiwiQWJvcnRTaWduYWwiLCJqc29uIiwiZXZlbnRzVGhyZXNob2xkIiwiXzB4MmI3MmVkIiwiXzB4MzBhNDUwIiwiXzB4MzM2MmI4IiwiZXJyb3IiLCJyZWNvcmRFdmVudCIsIlljZHpTIiwiYXBwTW9kdWxlIiwiUiIsIlAiLCJVIiwiRXJyb3IiLCJEIiwiZHJzbmkiLCJ1VHphYSIsImNrSWV1IiwiayIsIkwiLCJCIiwiQmxvYiIsInN0cmVhbSIsInBpcGVUaHJvdWdoIiwiQ29tcHJlc3Npb25TdHJlYW0iLCJSZXNwb25zZSIsIlYiLCJXIiwiRyIsInoiLCJ1VW9OYSIsIkdsU3pZIiwiUm1jTWgiLCJVdW14dyIsImh2VmNvIiwiSUdzSnYiLCJRb2lkUSIsInZkRkFKIiwiQVFiRHAiLCJ4YmhCZCIsImtPcHNwIiwiaXJrUnIiLCJCQUNLRU5EX1VSTCIsInJlc3BvbnNlVG9QYXJhbXMiLCJTdHJpbmciLCJzb2x2ZVRhc2siLCJfMHg2NGU3NzkiLCJnZXRBcGlUb2tlbiIsIl8weDJlNWI3YiIsIl8weDJmNmIzYiIsIlRPS0VOX0lTX05PVF9QUk9WSURFRCIsIl8weDg2MzY2NiIsIl8weDI3MTJiYiIsIl8weDJmOGJlNyIsIl8weDRiMjc2YyIsImxieHNqIiwiQmt0VlEiLCJYU1l2ZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiU2JjRVQiLCJUQVFocCIsIldUR0xuIiwib0dWS1kiLCJlVGRpYyIsIkpZTnF2IiwiYnNuakoiLCJSVXN4WCIsInhoc0N5IiwiXzB4NTNhMzI4IiwiYXNzaWduIiwiXzB4MmI4NDJjIiwidGFza1NvbHV0aW9uIiwiZXZlbnRfbmFtZSIsImN1c3RvbV9kYXRhIiwiZ2VuZXJhdGVIZWFkZXJzIiwiTSIsImNhdXNlIiwic2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJRIiwiSCIsInEiLCJKIiwicGFyc2VyIiwiaXNPcHRpb25hbCIsInBhcnNlIiwib3B0aW9uYWwiLCJGIiwiWSIsIlgiLCJiaW5kIiwiZnJvbSIsIksiLCJBcnJheSIsImlzQXJyYXkiLCJqIiwiWiIsIk51bWJlciIsImlzTmFOIiwiJCIsInRvU3RyaW5nIiwicmVxX2lkIiwicmVzdWx0IiwidHQiLCJEYXRlIiwibnQiLCJVUkxTZWFyY2hQYXJhbXMiLCJnZXQiLCJldCIsImlkIiwidGl0bGUiLCJwaG90b1VybCIsInVzZXJuYW1lIiwicnQiLCJhZGRlZFRvQXR0YWNobWVudE1lbnUiLCJhbGxvd3NXcml0ZVRvUG0iLCJmaXJzdE5hbWUiLCJpc0JvdCIsImlzUHJlbWl1bSIsImxhbmd1YWdlQ29kZSIsImxhc3ROYW1lIiwic3QiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJ0ZXN0IiwicmVwZWF0IiwibWF0Y2giLCJzbGljZSIsInJlZHVjZSIsImxlbmd0aCIsIml0Iiwib3QiLCJlbnRyaWVzIiwidG9VcHBlckNhc2UiLCJhdCIsImJvdElubGluZSIsImluaXREYXRhIiwiYXV0aERhdGUiLCJjYW5TZW5kQWZ0ZXIiLCJjaGF0IiwiY2hhdEluc3RhbmNlIiwiY2hhdFR5cGUiLCJoYXNoIiwicXVlcnlJZCIsInJlY2VpdmVyIiwic3RhcnRQYXJhbSIsInVzZXIiLCJpbml0RGF0YVJhdyIsInBsYXRmb3JtIiwic2hvd1NldHRpbmdzIiwidGhlbWVQYXJhbXMiLCJ2ZXJzaW9uIiwiY3QiLCJ1dCIsImxvY2F0aW9uIiwiaHJlZiIsInB0IiwicGVyZm9ybWFuY2UiLCJnZXRFbnRyaWVzQnlUeXBlIiwibmFtZSIsImh0IiwiZnQiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJsdCIsInNldCIsInN0cmluZ2lmeSIsImZyb21FbnRyaWVzIiwibWFwIiwiZHQiLCJzZXRJdGVtIiwiSXQiLCJtZXNzYWdlIiwiam9pbiIsIm10IiwidnQiLCJndCIsInZVdGJIIiwidVRpeUsiLCJZS2dVSCIsImxwYldmIiwid0ZTWGQiLCJhZkRjRiIsInlWQ3VNIiwibnJSRmoiLCJ3Y1NNbSIsIk5Bc3J0IiwiQlRNVWwiLCJoamRxVSIsImdldFRpbWUiLCJNYXRoIiwiRXQiLCJ5dCIsIl90IiwiU3QiLCJNUXVYdyIsInJ0dW1MIiwidXdsRlkiLCJQbGpHbCIsInRiSVZyIiwiXzB4NDM3ZjRkIiwiaXNfcHJlbWl1bSIsImZpcnN0X25hbWUiLCJpc19ib3QiLCJsYXN0X25hbWUiLCJsYW5ndWFnZV9jb2RlIiwicGhvdG9fdXJsIiwidXNlckxvY2FsZSIsImdldFdlYkFwcFN0YXJ0UGFyYW0iLCJnZXRVc2VyRGF0YSIsInN2UndvIiwiQm9vbGVhbiIsInNlc3Npb25faWQiLCJ1c2VyX2lkIiwiZ2V0VXNlcklkIiwiYXBwX25hbWUiLCJsb2NhbGUiLCJzdGFydF9wYXJhbSIsImNsaWVudF90aW1lc3RhbXAiLCJub3ciLCJidCIsIlR0Iiwid3QiLCJOdCIsImdldEJhdGNoIiwiT3lOYnAiLCJ5VmNkUiIsImNDVWVEIiwiaW5jbHVkZXMiLCJfMHgyMDc5N2EiLCJsb2NhbFN0b3JhZ2UiLCJmaWx0ZXIiLCJPdCIsIkF0IiwieHQiLCJDdCIsIm9tVmVYIiwiSXRyQkMiLCJkY1NvRSIsImJhY2tvZmYiLCJpbml0IiwiTHFlb3oiLCJGcGZMcyIsIlVCb3R0IiwibUJia1IiLCJlZWFtdiIsIkRES1hGIiwiaE55clIiLCJkUUJLUSIsInJlYWR5U3RhdGUiLCJzdGFydEJhdGNoaW5nIiwiXzB4MmNkNzg1IiwiXzB4MmQ5ZDI0IiwiVWRsekciLCJtYUdkYyIsIlpvWUJPIiwiUmRRS2kiLCJJTklUIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiXzB4NDFkNjYzIiwiXzB4NTVmMzRlIiwiZ2pucUMiLCJYalBERyIsIkt0c1RFIiwiZG1RRXEiLCJwUXFkTyIsIl8weDFhNzc5YiIsInN0YXJ0QmF0Y2hpbmdXaXRoSW50ZXJ2YWwiLCJjSG1pSCIsIkZqRFVnIiwicW5aU2YiLCJ5Vm9NdSIsImFkZFRvU3RvcmFnZSIsInNldFRpbWVvdXQiLCJkdkhoaSIsIlVaYXFlIiwiSGtIVkEiLCJpbnRlcnZhbElkIiwicHJvY2Vzc1F1ZXVlIiwiXzB4M2U1ZGU0Iiwic2VuZEJhdGNoIiwiSWpGWU8iLCJFWVR0QyIsIkxSRHZ6IiwiVGlZek4iLCJFbFZ1byIsIlpYSE1XIiwiRnFUak8iLCJsUFFWZyIsIkpsR09SIiwiUE1ueGQiLCJid1BKcyIsIkNPUk9VIiwiUURFeFUiLCJ2UVZ3bCIsImZFVUxuIiwiUXdZbHUiLCJlR1BpdyIsInN0b3BCYXRjaGluZyIsIllacFB6IiwicWt4aXoiLCJSYWdpbiIsIk1ScFNLIiwiXzB4MTZkMDg2IiwiXzB4NjQ3MWM0IiwicXNSZUMiLCJ6YWxoWiIsIl8weGUyNWMwZiIsIl8weDI2OTgxOSIsIl8weDE5NzE0YyIsIl8weDQzOGNhMSIsIl8weDJiODBmNyIsIl8weDEyYTE2NiIsIl8weDQ5MjZkZCIsIl8weDRhY2QzMCIsInRhc2tSZXRyeSIsInN0b3JhZ2UiLCJSdCIsIlV0IiwiUHQiLCJEdCIsIkVmV3JjIiwiSWxDVnAiLCJxQlBEbyIsImd3R3dPIiwic09vQUMiLCJpVmNPVSIsInJad3pVIiwiVkxMVlciLCJwTlZpWiIsInVmV05jIiwiVE91U0giLCJrdUJibCIsIlByb21pc2UiLCJJbU54ViIsIkJFU01LIiwib1ZBRGkiLCJZbnNwTiIsIl8weDU3NTdjMiIsImRjZW1iIiwiV29ya2VyIiwiVVJMIiwid29ya2VyIiwiXzB4NTVlY2Q1IiwicWVtbHkiLCJiWGJhUCIsIlVCdENVIiwiXzB4YTc5MWZhIiwiXzB4MTI3MTcxIiwia3QiLCJMdCIsIkJ0IiwiVnQiLCJVamxnYyIsIm5ldHdvcmtDb250cm9sbGVyIiwiYmF0Y2hTZXJ2aWNlIiwiaHVtYW5Qcm9vZlNlcnZpY2UiLCJzZXNzaW9uQ29udHJvbGxlciIsInJlY29yZEV2ZW50cyIsIklOVk9JQ0VfUkVHSVNURVJFRCIsImNvbGxlY3QiLCJ1c2VyRGF0YSIsInNldE5ld0FyZ3MiLCJHdCIsIld0IiwienQiLCJRdCIsIk10IiwiSHQiLCJ0b2tlbiIsImFwcE5hbWUiLCJlbnYiLCJNa3J0cyIsIlpKdWNGIiwiVVRBdHIiLCJVYkRGWSIsIndpbFZ2IiwiQUVHZloiLCJrclJjZyIsIkR4a0ZRIiwiTm9YbloiLCJYbU1rSCIsImRxdWFTIiwiZXp1RnoiLCJoWUNWRSIsInlHTVhPIiwiT2hDeVUiLCJBUlNVYyIsIlVvaGdUIiwiVEZJUWIiLCJIZnFtciIsImhFcnpNIiwic25rb2oiLCJBZEtjeSIsInpTd1ZSIiwiUWNYYmkiLCJwWGhYSyIsIkJHbmRQIiwiSWZNU08iLCJ5dmxKTSIsIlhzSFl5IiwiT3BGbHIiLCJ1YVVTRSIsInp6WnRmIiwiQ3FxS2giLCJLWWZFaCIsIndLYnNOIiwiRUJsa0wiLCJhVUZpaSIsIkZRaE9OIiwiXzB4ODNjN2VlIiwiXzB4NTUwOWU2IiwiXzB4MjA4MjRhIiwiXzB4MTQyY2I3IiwiYW1vdW50IiwiXzB4MzdjZTkwIiwiXzB4M2NjMDk0IiwibGFiZWwiLCJfMHgxZTdlMWEiLCJfMHg1NDVjMmMiLCJfMHgxYWJhMGYiLCJfMHgzMjllZTciLCJfMHgyYmEyZWYiLCJfMHgzYTE2ZjkiLCJfMHg1YTAzZmQiLCJzdWdnZXN0ZWRfdGlwX2Ftb3VudHMiLCJfMHgzNTg2MDQiLCJfMHg0MmU0YzUiLCJfMHg1Y2FmOWEiLCJfMHgxMTA1OTUiLCJfMHgyMWQzYWIiLCJfMHg0MTcxYTkiLCJyZWdpc3Rlckludm9pY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxpQkFBaUIsR0FBRyxZQUFZO0VBQ25DOztFQUNBLElBQU1DLENBQUMsR0FBR0MsQ0FBVjs7RUFFQSxTQUFTQyxDQUFULEdBQWE7SUFDWixJQUFNRixDQUFDLEdBQUcsQ0FBQyxlQUFELEVBQWtCLE9BQWxCLEVBQTJCLGFBQTNCLEVBQTBDLDRCQUExQyxFQUF3RSxPQUF4RSxFQUFpRixlQUFqRixFQUFrRywwQkFBbEcsRUFBOEgsU0FBOUgsRUFBeUksb0JBQXpJLEVBQStKLGtDQUEvSixFQUFtTSxPQUFuTSxFQUE0TSxzQkFBNU0sRUFBb08sT0FBcE8sRUFBNk8sa0JBQTdPLEVBQWlRLE9BQWpRLEVBQTBRLGNBQTFRLEVBQTBSLHVCQUExUixFQUFtVCxtQkFBblQsRUFBd1UsZ0NBQXhVLEVBQTBXLE9BQTFXLEVBQW1YLE9BQW5YLEVBQTRYLE9BQTVYLEVBQXFZLE9BQXJZLEVBQThZLE1BQTlZLEVBQXNaLDhCQUF0WixFQUFzYixPQUF0YixFQUErYixlQUEvYixFQUFnZCxvQkFBaGQsRUFBc2UsT0FBdGUsRUFBK2UsT0FBL2UsRUFBd2Ysd0JBQXhmLEVBQWtoQixzQkFBbGhCLEVBQTBpQixPQUExaUIsRUFBbWpCLGVBQW5qQixFQUFva0IsZ0NBQXBrQixFQUFzbUIsY0FBdG1CLEVBQXNuQixjQUF0bkIsRUFBc29CLDRCQUF0b0IsRUFBb3FCLG9CQUFwcUIsRUFBMHJCLE9BQTFyQixFQUFtc0IsT0FBbnNCLEVBQTRzQixzQkFBNXNCLEVBQW91QixPQUFwdUIsRUFBNnVCLE9BQTd1QixFQUFzdkIsa0JBQXR2QixFQUEwd0IsY0FBMXdCLEVBQTB4Qix3QkFBMXhCLEVBQW96QixhQUFwekIsRUFBbTBCLGVBQW4w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Q0FBbEIsQ0E1RlA7Z0JBNkZBLENBckdJOztnQkFBQTtnQkFBQSxPQXFHSVEsQ0FBQyxDQUFDRCxDQUFDLENBQUMsR0FBRCxDQUFGLENBQUQsRUFyR0o7O2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBLENBQUY7O01BQUE7UUFBQTtNQUFBOztNQUFBO0lBQUEsR0FERTtJQXdHTjRqQixlQUFlLEVBQUUseUJBQUFua0IsQ0FBQztNQUFBLE9BQUltZ0IsRUFBRSxDQUFDbmdCLENBQUQsQ0FBTjtJQUFBO0VBeEdaLENBQVA7QUEwR0EsQ0FqMUR1QixFQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRlbGVncmFtQW5hbHl0aWNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdGNvbnN0IHQgPSBpO1xyXG5cclxuXHRmdW5jdGlvbiBuKCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcImRpc2Nvbm5lY3Rpb25cIiwgXCJmaFpSelwiLCBcIjk5MDk2eWZXdmxpXCIsIFwidHJhbnNhY3Rpb24tc2lnbmluZy1mYWlsZWRcIiwgXCJMQ3RXelwiLCBcIlJFRlVORF9JU1NVRURcIiwgXCJodHRwczovL3RnYW5hbHl0aWNzLnh5ei9cIiwgXCIzaFpRUVdDXCIsIFwiY29ubmVjdGlvbi1zdGFydGVkXCIsIFwiaHR0cHM6Ly9zdGFnaW5nLnRnYW5hbHl0aWNzLnh5ei9cIiwgXCJ4T0hCalwiLCBcIldBTExFVF9DT05ORUNUX0VSUk9SXCIsIFwiTGFmSWRcIiwgXCJwdXJjaGFzZS1zdWNjZXNzXCIsIFwiY2xCdWVcIiwgXCI2OTU0MjlOZGVlUU9cIiwgXCJBRERJVElPTkFMX1RBU0tfRVZFTlRcIiwgXCJXQUxMRVRfRElTQ09OTkVDVFwiLCBcImNvbm5lY3Rpb24tcmVzdG9yaW5nLWNvbXBsZXRlZFwiLCBcInVSUUFXXCIsIFwiZ2tTQ2ZcIiwgXCJ2RkFwUFwiLCBcImpuWFRnXCIsIFwiSU5JVFwiLCBcImNvbm5lY3Rpb24tcmVzdG9yaW5nLXN0YXJ0ZWRcIiwgXCJwYlBOd1wiLCBcInB1cmNoYXNlLWluaXRcIiwgXCJUR0EtQmF0Y2gtUmVxdWVzdHNcIiwgXCJXRVlXbFwiLCBcIk11elVkXCIsIFwiV0FMTEVUX0NPTk5FQ1RfU1RBUlRFRFwiLCBcIlNVQlNDUklQVElPTl9TVEFSVEVEXCIsIFwiYkdlZXNcIiwgXCJyZWZ1bmQtaXNzdWVkXCIsIFwidHJhbnNhY3Rpb24tc2VudC1mb3Itc2lnbmF0dXJlXCIsIFwiNzc4MDQwcUFnd3ZVXCIsIFwiNDIzMjkwVFJhZ21yXCIsIFwiY29ubmVjdGlvbi1yZXN0b3JpbmctZXJyb3JcIiwgXCJ0cmFuc2FjdGlvbi1zaWduZWRcIiwgXCJmb0hla1wiLCBcIkJWUGpLXCIsIFwic3Vic2NyaXB0aW9uLXJlbmV3ZWRcIiwgXCJ6aUt1SlwiLCBcIld2Y3RqXCIsIFwiUFVSQ0hBU0VfU1VDQ0VTU1wiLCBcIkNVU1RPTV9FVkVOVFwiLCBcIldBTExFVF9DT05ORUNUX1NVQ0NFU1NcIiwgXCI5OTQ0Mk5Nck9heFwiLCBcIjEzNjA5MjBVclN6R0FcIiwgXCJQVVJDSEFTRV9GQUlMRURcIiwgXCJkYm55bFwiLCBcIkhhQ2lkXCIsIFwicmVnaXN0ZXItaW52b2ljZVwiLCBcImZkdlFhXCIsIFwiMjd5ZVdSUVNcIiwgXCJQVVJDSEFTRV9DQU5DRUxMRURcIiwgXCJjdXN0b20tZXZlbnRcIiwgXCJjb25uZWN0aW9uLWVycm9yXCIsIFwid1ZxYW5cIiwgXCJUUkFOU0FDVElPTl9TSUdORURcIiwgXCJhcHAtaGlkZVwiLCBcIlhnYnBYXCIsIFwibW1BSmhcIiwgXCJTVUJTQ1JJUFRJT05fQ0FOQ0VMTEVEXCIsIFwiNDcyOTU2VFZsY3FFXCIsIFwiUFVSQ0hBU0VfSU5JVFwiLCBcIlNVQlNDUklQVElPTl9SRU5FV0VEXCIsIFwiZUlQcmpcIiwgXCJUUkFOU0FDVElPTl9TRU5UX0ZPUl9TSUdOQVRVUkVcIiwgXCJzdWJzY3JpcHRpb24tY2FuY2VsbGVkXCJdO1xyXG5cdFx0cmV0dXJuIChuID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IGksXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDE3MzIzNyA9PT0gLXBhcnNlSW50KG4oMTY3KSkgLyAxICsgcGFyc2VJbnQobigxNTYpKSAvIDIgKyAtcGFyc2VJbnQobigxOTcpKSAvIDMgKiAocGFyc2VJbnQobigxNTUpKSAvIDQpICsgcGFyc2VJbnQobigxNjgpKSAvIDUgKyAtcGFyc2VJbnQobigxODQpKSAvIDYgKyBwYXJzZUludChuKDEzNSkpIC8gNyArIHBhcnNlSW50KG4oMTkyKSkgLyA4ICogKC1wYXJzZUludChuKDE3NCkpIC8gOSkpIGJyZWFrO1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fVxyXG5cdH0obik7XHJcblx0Y29uc3QgZSA9IHQoMTk2KSxcclxuXHRcdHIgPSB0KDEyOSksXHJcblx0XHRzID0gdCgxNDcpO1xyXG5cclxuXHRmdW5jdGlvbiBpKHQsIGUpIHtcclxuXHRcdGNvbnN0IHIgPSBuKCk7XHJcblx0XHRyZXR1cm4gKGkgPSBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRyZXR1cm4gclt0IC09IDEyOV1cclxuXHRcdH0pKHQsIGUpXHJcblx0fVxyXG5cdHZhciBvID0gKG4gPT4ge1xyXG5cdFx0Y29uc3QgZSA9IHQsXHJcblx0XHRcdHIgPSB7XHJcblx0XHRcdFx0QlZQaks6IFwiYXBwLWluaXRcIixcclxuXHRcdFx0XHRtbUFKaDogZSgxODApLFxyXG5cdFx0XHRcdE5BeEhLOiBlKDE2NSksXHJcblx0XHRcdFx0dkZBcFA6IGUoMTc2KSxcclxuXHRcdFx0XHR6aUt1SjogZSgxOTgpLFxyXG5cdFx0XHRcdEhhQ2lkOiBlKDE2NiksXHJcblx0XHRcdFx0ZGJueWw6IFwiY29ubmVjdGlvbi1jb21wbGV0ZWRcIixcclxuXHRcdFx0XHRmb0hlazogZSgxNzcpLFxyXG5cdFx0XHRcdGZkdlFhOiBcIkNPTk5FQ1RJT05fUkVTVE9SSU5HX1NVQ0NFU1NcIixcclxuXHRcdFx0XHR3VnFhbjogZSgxMzgpLFxyXG5cdFx0XHRcdGVJUHJqOiBcIkNPTk5FQ1RJT05fUkVTVE9SSU5HX0VSUk9SXCIsXHJcblx0XHRcdFx0cGJQTnc6IGUoMTg4KSxcclxuXHRcdFx0XHR1UlFBVzogZSgxOTMpLFxyXG5cdFx0XHRcdFBhZFduOiBlKDEzNyksXHJcblx0XHRcdFx0ZmhaUno6IGUoMTkwKSxcclxuXHRcdFx0XHRiR2VlczogZSgxODUpLFxyXG5cdFx0XHRcdHhPSEJqOiBlKDE0NiksXHJcblx0XHRcdFx0TXV6VWQ6IGUoMTY0KSxcclxuXHRcdFx0XHRjbEJ1ZTogZSgxNjkpLFxyXG5cdFx0XHRcdGpuWFRnOiBcInB1cmNoYXNlLWZhaWxlZFwiLFxyXG5cdFx0XHRcdFdFWVdsOiBlKDE3NSksXHJcblx0XHRcdFx0TFFxcXI6IFwicHVyY2hhc2UtY2FuY2VsbGVkXCIsXHJcblx0XHRcdFx0WGdicFg6IGUoMTk1KSxcclxuXHRcdFx0XHRMQ3RXejogZSgxNTMpLFxyXG5cdFx0XHRcdGdrU0NmOiBlKDE1MSksXHJcblx0XHRcdFx0RHVlcU86IGUoMTg2KSxcclxuXHRcdFx0XHRSR2ZtUDogZSgxNjEpLFxyXG5cdFx0XHRcdExhZklkOiBlKDE4MyksXHJcblx0XHRcdFx0ZnlkcnE6IFwiSU5WT0lDRV9SRUdJU1RFUkVEXCIsXHJcblx0XHRcdFx0V3ZjdGo6IGUoMTcyKVxyXG5cdFx0XHR9O1xyXG5cdFx0cmV0dXJuIG5bZSgxNDMpXSA9IHJbZSgxNjApXSwgbi5ISURFID0gcltlKDE4MildLCBuW3IuTkF4SEtdID0gcltlKDE0MSldLCBuW2UoMTUwKV0gPSByW2UoMTYyKV0sIG5bcltlKDE3MSldXSA9IHJbZSgxNzApXSwgbltlKDEzMSldID0gcltlKDE1OSldLCBuLkNPTk5FQ1RJT05fUkVTVE9SSU5HX1NUQVJURUQgPSBlKDE0NCksIG5bcltlKDE3MyldXSA9IHJbZSgxNzgpXSwgbltyW2UoMTg3KV1dID0gZSgxNTcpLCBuW3JbZSgxNDUpXV0gPSBlKDE1NCksIG5bZSgxNzkpXSA9IGUoMTU4KSwgbi5UUkFOU0FDVElPTl9TSUdOSU5HX0ZBSUxFRCA9IHJbZSgxMzkpXSwgbltyLlBhZFduXSA9IHJbZSgxOTEpXSwgbltlKDEzNildID0gZSgxMzYpLCBuW3JbZSgxNTIpXV0gPSByW2UoMTMwKV0sIG5bcltlKDE0OSldXSA9IGUoMTMzKSwgbltyW2UoMTM0KV1dID0gcltlKDE0MildLCBuW3JbZSgxNDgpXV0gPSByLkxRcXFyLCBuW3JbZSgxODEpXV0gPSByW2UoMTk0KV0sIG5bcltlKDE0MCldXSA9IFwic3Vic2NyaXB0aW9uLXN0YXJ0ZWRcIiwgbltyLkR1ZXFPXSA9IHIuUkdmbVAsIG5bcltlKDEzMildXSA9IGUoMTg5KSwgbltyLmZ5ZHJxXSA9IHJbZSgxNjMpXSwgblxyXG5cdH0pKG8gfHwge30pO1xyXG5cdGNvbnN0IGEgPSBjO1xyXG5cclxuXHRmdW5jdGlvbiBjKHQsIG4pIHtcclxuXHRcdGNvbnN0IGUgPSB1KCk7XHJcblx0XHRyZXR1cm4gKGMgPSBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRyZXR1cm4gZVt0IC09IDM3MF1cclxuXHRcdH0pKHQsIG4pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB1KCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcImxvZ1wiLCBcIjE2MUJ0QWlkZ1wiLCBcIm1hcFwiLCBcImFuYWx5dGljc0NvbnRyb2xsZXJcIiwgXCJ2RFFvdlwiLCBcInRRQk5hXCIsIFwiV0FMTEVUX0NPTk5FQ1RfU1RBUlRFRFwiLCBcIjgwMDgxMHB1RG1lb1wiLCBcImluaXRcIiwgXCJUUkFOU0FDVElPTl9TSUdOSU5HX0ZBSUxFRFwiLCBcIjY4NDAwMllCdW9pcFwiLCBcInRvbkNvbm5lY3RTZGtFdmVudHNcIiwgXCJkZXRhaWxcIiwgXCIyeEFTRWx1XCIsIFwic2RrU2NvcGVcIiwgXCIgbGlzdGVuZXJcIiwgXCJXQUxMRVRfQ09OTkVDVF9FUlJPUlwiLCBcInR5cGVcIiwgXCIxNDE2NmN3Y2xlRVwiLCBcIkF0dGFjaCBcIiwgXCI3ODc1NTYwUUxEdE5GXCIsIFwiVFJBTlNBQ1RJT05fU0VOVF9GT1JfU0lHTkFUVVJFXCIsIFwidG9uQ29ubmVjdFVpRXZlbnRzXCIsIFwiZXZlbnRzXCIsIFwidWlTY29wZVwiLCBcIjM2NU5scEZDaFwiLCBcIiByZWNlaXZlZFwiLCBcImNvbGxlY3RFdmVudFwiLCBcIkNVU1RPTV9FVkVOVFwiLCBcIjU0MjgyNENLT0JnZVwiLCBcInRvbi1jb25uZWN0LVwiLCBcIjY1ODA4M2JFS0ZXVVwiLCBcIldBTExFVF9ESVNDT05ORUNUXCIsIFwiQ09OTkVDVElPTl9SRVNUT1JJTkdfRVJST1JcIiwgXCIzMjY4NHF2R3lGSVwiLCBcIkNPTk5FQ1RJT05fUkVTVE9SSU5HX1NVQ0NFU1NcIiwgXCI5MGVYeVpERVwiXTtcclxuXHRcdHJldHVybiAodSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9ICEgZnVuY3Rpb24gKHQpIHtcclxuXHRcdGNvbnN0IG4gPSBjLFxyXG5cdFx0XHRlID0gdCgpO1xyXG5cdFx0Zm9yICg7IDspIHRyeSB7XHJcblx0XHRcdGlmICgzNTkxNDQgPT09IC1wYXJzZUludChuKDM3NykpIC8gMSArIC1wYXJzZUludChuKDM4MCkpIC8gMiAqICgtcGFyc2VJbnQobigzOTgpKSAvIDMpICsgcGFyc2VJbnQobig0MDEpKSAvIDQgKiAoLXBhcnNlSW50KG4oMzkyKSkgLyA1KSArIC1wYXJzZUludChuKDM4NSkpIC8gNiAqIChwYXJzZUludChuKDQwNSkpIC8gNykgKyBwYXJzZUludChuKDM5NikpIC8gOCAqIChwYXJzZUludChuKDQwMykpIC8gOSkgKyBwYXJzZUludChuKDM3NCkpIC8gMTAgKyBwYXJzZUludChuKDM4NykpIC8gMTEpIGJyZWFrO1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fVxyXG5cdH0odSk7XHJcblx0Y2xhc3MgcCB7XHJcblx0XHRjb25zdHJ1Y3Rvcih0KSB7XHJcblx0XHRcdGNvbnN0IG4gPSBjLFxyXG5cdFx0XHRcdGUgPSB7XHJcblx0XHRcdFx0XHR2RFFvdjogXCJ0b24tY29ubmVjdC11aS1cIixcclxuXHRcdFx0XHRcdHRRQk5hOiBuKDM5NylcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR0aGlzW24oMzc4KV0gPSBbb1tuKDM5NSldLCBvLldBTExFVF9DT05ORUNUX1NVQ0NFU1MsIG9bbigzODMpXSwgb1tuKDQwMildLCBvW24oNDAwKV0sIG9bbigzODgpXSwgby5UUkFOU0FDVElPTl9TSUdORUQsIG8uVFJBTlNBQ1RJT05fU0lHTklOR19GQUlMRUQsIG9bbigzOTkpXV0sIHRoaXMudG9uQ29ubmVjdFVpRXZlbnRzID0gW29bbigzNzMpXSwgb1tuKDM4MyldLCBvW24oMzc2KV1dLCB0aGlzW24oMzkxKV0gPSBlW24oMzcxKV0sIHRoaXNbbigzODEpXSA9IGVbbigzNzIpXSwgdGhpc1tuKDM3MCldID0gdFxyXG5cdFx0fSBbYSgzNzUpXSgpIHtcclxuXHRcdFx0Y29uc3QgdCA9IGE7XHJcblx0XHRcdGZvciAobGV0IG4gb2YgdGhpc1t0KDM5MCldKSBjb25zb2xlLmxvZyh0KDM4NikgKyBuICsgdCgzODIpKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIobiwgKGUgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHIgPSB0O1xyXG5cdFx0XHRcdGNvbnNvbGVbcig0MDQpXShcImV2ZW50IFwiICsgbiArIHIoMzkzKSwgZVtyKDM3OSldKTtcclxuXHRcdFx0XHRjb25zdCB7XHJcblx0XHRcdFx0XHR0eXBlOiBzLFxyXG5cdFx0XHRcdFx0Li4uaVxyXG5cdFx0XHRcdH0gPSBlW3IoMzc5KV07XHJcblx0XHRcdFx0dGhpc1tyKDM3MCldW3IoMzk0KV0oZS5kZXRhaWxbcigzODQpXSwge1xyXG5cdFx0XHRcdFx0Li4uaVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pKVxyXG5cdFx0fVxyXG5cdFx0Z2V0IFthKDM5MCldKCkge1xyXG5cdFx0XHRjb25zdCB0ID0gYTtcclxuXHRcdFx0cmV0dXJuIFsuLi50aGlzW3QoMzg5KV1bdCg0MDYpXSgobiA9PiBcIlwiICsgdGhpc1t0KDM5MSldICsgbikpLCAuLi50aGlzW3QoMzc4KV1bdCg0MDYpXSgobiA9PiBcIlwiICsgdGhpc1t0KDM4MSldICsgbikpXVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zdCBoID0gZjtcclxuXHJcblx0ZnVuY3Rpb24gZih0LCBuKSB7XHJcblx0XHRjb25zdCBlID0gZCgpO1xyXG5cdFx0cmV0dXJuIChmID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSA1MDBdXHJcblx0XHR9KSh0LCBuKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IGYsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDE1NTU1OSA9PT0gcGFyc2VJbnQobig1MTgpKSAvIDEgKyAtcGFyc2VJbnQobig1MDMpKSAvIDIgKiAocGFyc2VJbnQobig1MDYpKSAvIDMpICsgLXBhcnNlSW50KG4oNTAyKSkgLyA0ICsgLXBhcnNlSW50KG4oNTE3KSkgLyA1ICogKC1wYXJzZUludChuKDUxNCkpIC8gNikgKyBwYXJzZUludChuKDUxNSkpIC8gNyArIC1wYXJzZUludChuKDUyOCkpIC8gOCArIHBhcnNlSW50KG4oNTA3KSkgLyA5KSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KGQpO1xyXG5cdGNsYXNzIGwge1xyXG5cdFx0Y29uc3RydWN0b3IodCkge1xyXG5cdFx0XHRjb25zdCBuID0gZixcclxuXHRcdFx0XHRlID0ge1xyXG5cdFx0XHRcdFx0Y3J2eGE6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0THBKank6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0VFhYbVU6IFwiaGlkZGVuXCIsXHJcblx0XHRcdFx0XHR4QWN2bTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRCUldTWjogbig1MjMpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0dGhpcy5kb2N1bWVudEV2ZW50cyA9IHtcclxuXHRcdFx0XHR2aXNpYmlsaXR5Y2hhbmdlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB0ID0gbjtcclxuXHRcdFx0XHRcdGlmIChlW3QoNTExKV0odCg1MTMpLCB0KDUwNCkpKSBfMHgzNjA1MDhbdCg1MjUpXShfMHgzNjM0MzUsIF8weDM1NzllYyk7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChlW3QoNTE5KV0oZG9jdW1lbnRbdCg1MDgpXSwgZVt0KDUyNildKSlcclxuXHRcdFx0XHRcdFx0aWYgKGVbdCg1MjApXSh0KDUxMiksIGVbdCg1MjQpXSkpIHRoaXNbdCg1MzApXVt0KDUxNildKG9bdCg1MDApXSwgdm9pZCAwKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgbiA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdFBLaHBHOiB0KDUxMClcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdHRoaXNbdCg1MjEpXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdHZpc2liaWxpdHljaGFuZ2U6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZSA9IHQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF8weDM0Njg4OVtlKDUwOCldID09PSBuW2UoNTAxKV0gJiYgdGhpc1tlKDUzMCldLmNvbGxlY3RFdmVudChfMHgyMTFiNjNbZSg1MDApXSwgdm9pZCAwKVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuYW5hbHl0aWNzQ29udHJvbGxlciA9IF8weDRjMTEyZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzW24oNTMwKV0gPSB0XHJcblx0XHR9IFtoKDUwOSldKCkge1xyXG5cdFx0XHRjb25zdCB0ID0gaCxcclxuXHRcdFx0XHRuID0ge1xyXG5cdFx0XHRcdFx0d0h6Um86IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZEx5aUo6IHQoNTEwKSxcclxuXHRcdFx0XHRcdER0c0RsOiB0KDUyMilcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRmb3IgKGxldCBbZSwgcl0gb2YgT2JqZWN0W3QoNTI3KV0odGhpc1t0KDUyMSldKSkgdCg1MjIpID09PSBuLkR0c0RsID8gZG9jdW1lbnRbdCg1MjUpXShlLCByKSA6IG5bdCg1MjkpXShfMHgxMTE3MDUudmlzaWJpbGl0eVN0YXRlLCBuW3QoNTA1KV0pICYmIHRoaXNbdCg1MzApXVt0KDUxNildKF8weDJjMjk2Y1t0KDUwMCldLCB2b2lkIDApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcIkhJREVcIiwgXCJQS2hwR1wiLCBcIjY5MzQ0ME5FQlZRTVwiLCBcIjIwd2lFUm55XCIsIFwiUkdKZ2lcIiwgXCJkTHlpSlwiLCBcIjc4NTY3d1BHQ0FjXCIsIFwiMzEwNzcwOXVUbUxtTlwiLCBcInZpc2liaWxpdHlTdGF0ZVwiLCBcImluaXRcIiwgXCJoaWRkZW5cIiwgXCJjcnZ4YVwiLCBcIktDRmNzXCIsIFwiU052UE9cIiwgXCI2MjQ2VUVKd0dQXCIsIFwiMTMwMzg5MEtCTXpZbFwiLCBcImNvbGxlY3RFdmVudFwiLCBcIjg1RnZMTHVDXCIsIFwiNDM4NTVIeUhoalhcIiwgXCJMcEpqeVwiLCBcInhBY3ZtXCIsIFwiZG9jdW1lbnRFdmVudHNcIiwgXCJ3eHREelwiLCBcIlVBbnpHXCIsIFwiQlJXU1pcIiwgXCJhZGRFdmVudExpc3RlbmVyXCIsIFwiVFhYbVVcIiwgXCJlbnRyaWVzXCIsIFwiMTg1MTJ4c0tKYm5cIiwgXCJ3SHpSb1wiLCBcImFuYWx5dGljc0NvbnRyb2xsZXJcIl07XHJcblx0XHRyZXR1cm4gKGQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0XHJcblx0XHR9KSgpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBJKCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcImNvbGxlY3RUYXBwc0V2ZW50XCIsIFwiMzUxZFBaaldQXCIsIFwiNzk1SldjVmFMXCIsIFwiNDc3NzA4MFdjdEJDZ1wiLCBcIjkzMDg5NzBzb0RxRW9cIiwgXCJ0ZWxlZ3JhbUFwcHNDZW50ZXJFdmVudHNcIiwgXCJpbml0XCIsIFwiQXR0YWNoIFwiLCBcImxvZ1wiLCBcIjQ1NDYyMTJzeHVha05cIiwgXCI0WXprUm5wXCIsIFwiMjI2NzEwOUdkT1Z5QlwiLCBcIkFERElUSU9OQUxfVEFTS19FVkVOVFwiLCBcIjE2MDkycmN2eXByXCIsIFwiYW5hbHl0aWNzQ29udHJvbGxlclwiLCBcInR5cGVcIiwgXCJhZGRFdmVudExpc3RlbmVyXCIsIFwiIHJlY2VpdmVkXCIsIFwiZXZlbnQgXCIsIFwiZGV0YWlsXCIsIFwiMTMyOTg0R0JMblhOXCIsIFwiMjIxNzQ2cFZmTmVaXCJdO1xyXG5cdFx0cmV0dXJuIChJID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH1cclxuXHRjb25zdCBtID0gdjtcclxuXHJcblx0ZnVuY3Rpb24gdih0LCBuKSB7XHJcblx0XHRjb25zdCBlID0gSSgpO1xyXG5cdFx0cmV0dXJuICh2ID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSAyNDBdXHJcblx0XHR9KSh0LCBuKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IHYsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDQ2NjQ5OCA9PT0gLXBhcnNlSW50KG4oMjQ4KSkgLyAxICogKC1wYXJzZUludChuKDI1OSkpIC8gMikgKyAtcGFyc2VJbnQobigyNjApKSAvIDMgKyAtcGFyc2VJbnQobigyNDApKSAvIDQgKiAoLXBhcnNlSW50KG4oMjUxKSkgLyA1KSArIC1wYXJzZUludChuKDI1OCkpIC8gNiArIC1wYXJzZUludChuKDI1MikpIC8gNyArIHBhcnNlSW50KG4oMjQ3KSkgLyA4ICogKHBhcnNlSW50KG4oMjUwKSkgLyA5KSArIHBhcnNlSW50KG4oMjUzKSkgLyAxMCkgYnJlYWs7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9IGNhdGNoIChyKSB7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9XHJcblx0fShJKTtcclxuXHRjbGFzcyBnIHtcclxuXHRcdGNvbnN0cnVjdG9yKHQpIHtcclxuXHRcdFx0Y29uc3QgbiA9IHY7XHJcblx0XHRcdHRoaXNbbigyNTQpXSA9IFtvW24oMjYxKV1dLCB0aGlzW24oMjQxKV0gPSB0XHJcblx0XHR9IFttKDI1NSldKCkge1xyXG5cdFx0XHRjb25zdCB0ID0gbTtcclxuXHRcdFx0Zm9yIChsZXQgbiBvZiB0aGlzLnRlbGVncmFtQXBwc0NlbnRlckV2ZW50cykgY29uc29sZVt0KDI1NyldKHQoMjU2KSArIG4gKyBcIiBsaXN0ZW5lclwiKSwgd2luZG93W3QoMjQzKV0obiwgKGUgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHIgPSB0O1xyXG5cdFx0XHRcdGNvbnNvbGVbcigyNTcpXShyKDI0NSkgKyBuICsgcigyNDQpLCBlW3IoMjQ2KV0pO1xyXG5cdFx0XHRcdGNvbnN0IHtcclxuXHRcdFx0XHRcdHR5cGU6IHMsXHJcblx0XHRcdFx0XHQuLi5pXHJcblx0XHRcdFx0fSA9IGUuZGV0YWlsO1xyXG5cdFx0XHRcdHRoaXNbcigyNDEpXVtyKDI0OSldKGVbcigyNDYpXVtyKDI0MildLCB7XHJcblx0XHRcdFx0XHQuLi5pXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnN0IEUgPSBfO1xyXG5cclxuXHRmdW5jdGlvbiB5KCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcInVuZGVmaW5lZFwiLCBcIjg1MDgzODRiUFJlZXFcIiwgXCJjb2xsZWN0RXZlbnRcIiwgXCIxNW9WRWNyUFwiLCBcIjUwMTg0TE55SVhXXCIsIFwiMjkzNzcyVlJZdEVTXCIsIFwid2ViQXBwXCIsIFwiaW5pdFwiLCBcIndZTnlPXCIsIFwiVGVsZWdyYW1cIiwgXCIzMThZdWRsVFVcIiwgXCJhbmFseXRpY3NDb250cm9sbGVyXCIsIFwib3Blbkludm9pY2VcIiwgXCJzdGFydHNXaXRoXCIsIFwic2xpY2VcIiwgXCJXZWJBcHBcIiwgXCJjYWxsXCIsIFwiUFVSQ0hBU0VfSU5JVFwiLCBcIjEzNzU4MDFnb01TZ3FcIiwgXCI2ODIzNzRmUW1PTGxcIiwgXCIxNDI3MzcweWNJdUVDXCIsIFwiSGhEY3VcIiwgXCJPY3BxT1wiLCBcInNwbGl0XCJdO1xyXG5cdFx0cmV0dXJuICh5ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gXyh0LCBuKSB7XHJcblx0XHRjb25zdCBlID0geSgpO1xyXG5cdFx0cmV0dXJuIChfID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSAxNDVdXHJcblx0XHR9KSh0LCBuKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IF8sXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDQxOTY5NiA9PT0gcGFyc2VJbnQobigxNDYpKSAvIDEgKyAtcGFyc2VJbnQobigxNjEpKSAvIDIgKyAtcGFyc2VJbnQobigxNjIpKSAvIDMgKyAtcGFyc2VJbnQobigxNDcpKSAvIDQgKyAtcGFyc2VJbnQobigxNDUpKSAvIDUgKiAocGFyc2VJbnQobigxNTIpKSAvIDYpICsgcGFyc2VJbnQobigxNjApKSAvIDcgKyBwYXJzZUludChuKDE2NykpIC8gOCkgYnJlYWs7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9IGNhdGNoIChyKSB7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9XHJcblx0fSh5KTtcclxuXHRjbGFzcyBTIHtcclxuXHRcdGNvbnN0cnVjdG9yKHQpIHtcclxuXHRcdFx0dmFyIG47XHJcblx0XHRcdGNvbnN0IGUgPSBfLFxyXG5cdFx0XHRcdHIgPSB7XHJcblx0XHRcdFx0XHRjT1JxTTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRIaERjdTogZSgxNjYpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0dGhpc1tlKDE0OCldID0gci5jT1JxTSh0eXBlb2Ygd2luZG93LCByW2UoMTYzKV0pICYmIChudWxsID09IChuID0gbnVsbCA9PSB3aW5kb3cgPyB2b2lkIDAgOiB3aW5kb3dbZSgxNTEpXSkgPyB2b2lkIDAgOiBuW2UoMTU3KV0pID8gd2luZG93W2UoMTUxKV1bZSgxNTcpXSA6IG51bGwsIHRoaXNbZSgxNTMpXSA9IHRcclxuXHRcdH0gW0UoMTQ5KV0oKSB7XHJcblx0XHRcdHZhciB0O1xyXG5cdFx0XHRjb25zdCBuID0gRSxcclxuXHRcdFx0XHRlID0ge1xyXG5cdFx0XHRcdFx0cFVwRVo6IG4oMTY2KSxcclxuXHRcdFx0XHRcdE9jcHFPOiBuKDE1MClcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRpZiAodGhpc1tuKDE0OCldICYmIChudWxsID09ICh0ID0gdGhpc1tuKDE0OCldKSA/IHZvaWQgMCA6IHRbbigxNTQpXSkpIHtcclxuXHRcdFx0XHRjb25zdCB0ID0gdGhpc1tuKDE0OCldW24oMTU0KV07XHJcblx0XHRcdFx0dGhpc1tuKDE0OCldW24oMTU0KV0gPSAociwgcykgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGk7XHJcblx0XHRcdFx0XHRjb25zdCBhID0gbjtcclxuXHRcdFx0XHRcdGlmIChlW2EoMTY0KV0gPT0gZVthKDE2NCldKSB7XHJcblx0XHRcdFx0XHRcdGxldCBuID0gclthKDE2NSldKFwiL1wiKVxyXG5cdFx0XHRcdFx0XHRcdC5wb3AoKSB8fCBcIlwiO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gblthKDE1NSldKFwiJFwiKSAmJiAobiA9IG5bYSgxNTYpXSgxKSksIHRoaXNbYSgxNTMpXVthKDE2OCldKG9bYSgxNTkpXSwge1xyXG5cdFx0XHRcdFx0XHRcdHNsdWc6IG5cclxuXHRcdFx0XHRcdFx0fSksIHRbYSgxNTgpXSh0aGlzLndlYkFwcCwgciwgcylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXNbYSgxNDgpXSA9IHR5cGVvZiBfMHgyMjEwOGQgIT09IGUucFVwRVogJiYgKG51bGwgPT0gKGkgPSBudWxsID09IF8weDllOTUzZCA/IHZvaWQgMCA6IF8weDllOTUzZFthKDE1MSldKSA/IHZvaWQgMCA6IGlbYSgxNTcpXSkgPyBfMHgyMzk1NGRbYSgxNTEpXVthKDE1NyldIDogbnVsbCwgdGhpc1thKDE1MyldID0gXzB4NDJiOGU0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcIlRlbGVncmFtR2FtZVByb3h5XCIsIFwiSk1RWVRcIiwgXCJoYW5kbGVQbGF0Zm9ybUxpc3RlbmVyXCIsIFwiY2FsbFwiLCBcImxteVNmXCIsIFwicGFyc2VcIiwgXCJoYW5kbGVFdmVudHNcIiwgXCJTZ25GYlwiLCBcIm9KYWx6XCIsIFwibFd2R3pcIiwgXCIxNDEzNDAyVnpzRmRjXCIsIFwic2x1Z1wiLCBcImV2ZW50U3RhdHVzTWFwXCIsIFwiNzQ4Mzk4NmhxUUdQZFwiLCBcInlnRHhGXCIsIFwiZHRUaVpcIiwgXCI5NTU1R3FwV1BWXCIsIFwiMTk0NjI3M3R2VWxPQ1wiLCBcIlBVUkNIQVNFX0NBTkNFTExFRFwiLCBcImFuYWx5dGljc0NvbnRyb2xsZXJcIiwgXCJXZWJWaWV3XCIsIFwieWt0R1VcIiwgXCJDR25ma1wiLCBcIlRlbGVncmFtR2FtZVByb3h5X3JlY2VpdmVFdmVudFwiLCBcIlp5dlBPXCIsIFwiaW5pdFwiLCBcIlBVUkNIQVNFX1NVQ0NFU1NcIiwgXCJUZWxlZ3JhbVwiLCBcIkVpSkpmXCIsIFwiMzAyMzU5MGVoT0pqVVwiLCBcIjY5MlFXQXFEYVwiLCBcImNvbGxlY3RFdmVudFwiLCBcIjY0NDcwMjBBU3lydGZcIiwgXCJzdGF0dXNcIiwgXCJyZWNlaXZlRXZlbnRcIiwgXCIxMTA3ODM3NlN4cEhUQVwiLCBcImFkZEV2ZW50TGlzdGVuZXJcIiwgXCIxMmpjT0F1SFwiXTtcclxuXHRcdHJldHVybiAoYiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHcodCwgbikge1xyXG5cdFx0Y29uc3QgZSA9IGIoKTtcclxuXHRcdHJldHVybiAodyA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gNDA5XVxyXG5cdFx0fSkodCwgbilcclxuXHR9XHJcblx0Y29uc3QgVCA9IHc7XHJcblx0ISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IHcsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDgzMzYyNyA9PT0gcGFyc2VJbnQobig0MzcpKSAvIDEgKyAtcGFyc2VJbnQobig0MTgpKSAvIDIgKyBwYXJzZUludChuKDQ0MykpIC8gMyAqICgtcGFyc2VJbnQobig0MTkpKSAvIDQpICsgLXBhcnNlSW50KG4oNDIxKSkgLyA1ICsgLXBhcnNlSW50KG4oNDI2KSkgLyA2ICogKC1wYXJzZUludChuKDQ0NCkpIC8gNykgKyBwYXJzZUludChuKDQyNCkpIC8gOCArIHBhcnNlSW50KG4oNDQwKSkgLyA5KSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KGIpO1xyXG5cdGNsYXNzIE4ge1xyXG5cdFx0Y29uc3RydWN0b3IodCkge1xyXG5cdFx0XHRjb25zdCBuID0gdztcclxuXHRcdFx0dGhpc1tuKDQzOSldID0ge1xyXG5cdFx0XHRcdHBhaWQ6IG9bbig0MTUpXSxcclxuXHRcdFx0XHRjYW5jZWxsZWQ6IG9bbig0NDUpXSxcclxuXHRcdFx0XHRmYWlsZWQ6IG8uUFVSQ0hBU0VfRkFJTEVEXHJcblx0XHRcdH0sIHRoaXNbbig0NDYpXSA9IHRcclxuXHRcdH0gW1QoNDE0KV0oKSB7XHJcblx0XHRcdGNvbnN0IHQgPSBULFxyXG5cdFx0XHRcdG4gPSB7XHJcblx0XHRcdFx0XHRDR25mazogdCg0MTApXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0d2luZG93W3QoNDI1KV0oXCJtZXNzYWdlXCIsICgoe1xyXG5cdFx0XHRcdGRhdGE6IGVcclxuXHRcdFx0fSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHIgPSB0O1xyXG5cdFx0XHRcdGlmIChuLkNHbmZrID09PSBuW3IoNDExKV0pIHRyeSB7XHJcblx0XHRcdFx0XHRjb25zdCB7XHJcblx0XHRcdFx0XHRcdGV2ZW50VHlwZTogdCxcclxuXHRcdFx0XHRcdFx0ZXZlbnREYXRhOiBuXHJcblx0XHRcdFx0XHR9ID0gSlNPTltyKDQzMildKGUpO1xyXG5cdFx0XHRcdFx0dGhpcy5oYW5kbGVFdmVudHModCwgbilcclxuXHRcdFx0XHR9IGNhdGNoIChzKSB7IH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zdCB7XHJcblx0XHRcdFx0XHRcdGV2ZW50VHlwZTogdCxcclxuXHRcdFx0XHRcdFx0ZXZlbnREYXRhOiBuXHJcblx0XHRcdFx0XHR9ID0gXzB4M2IyMDljW3IoNDMyKV0oXzB4NTExMWQ2KTtcclxuXHRcdFx0XHRcdHRoaXMuaGFuZGxlRXZlbnRzKHQsIG4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSksIHRoaXNbdCg0MjkpXSh3aW5kb3dbdCg0MjcpXSksIHRoaXNbdCg0MjkpXSh3aW5kb3dbdCg0MTYpXVt0KDQwOSldKSwgdGhpc1t0KDQyOSldKHdpbmRvd1t0KDQxMildKVxyXG5cdFx0fSBbVCg0MjkpXSh0KSB7XHJcblx0XHRcdGNvbnN0IG4gPSBULFxyXG5cdFx0XHRcdGUgPSB7XHJcblx0XHRcdFx0XHRvSmFsejogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRsbXlTZjogXCJvZHJIblwiLFxyXG5cdFx0XHRcdFx0RWlKSmY6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZHRUaVo6IG4oNDI4KSxcclxuXHRcdFx0XHRcdGxXdkd6OiBuKDQzNClcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRpZiAoIXQpIHJldHVybjtcclxuXHRcdFx0bGV0IHI7XHJcblx0XHRcdChudWxsID09IHQgPyB2b2lkIDAgOiB0W24oNDIzKV0pID8gciA9IHRbbig0MjMpXSA6IGVbbig0MTcpXShlW24oNDQyKV0sIGVbbig0MzYpXSkgPyB0aGlzW24oNDQ2KV1bbig0MjApXSh0aGlzW24oNDM5KV1bXzB4ZWRlMmUxLnN0YXR1c10sIHtcclxuXHRcdFx0XHRzbHVnOiBfMHgyYTM2Yjlbbig0MzgpXVxyXG5cdFx0XHR9KSA6IChyID0gdCwgdCA9IHdpbmRvdyk7XHJcblx0XHRcdGNvbnN0IHMgPSB0aGlzO1xyXG5cdFx0XHR0W24oNDIzKV0gPSAoaSwgbykgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGEgPSBuO1xyXG5cdFx0XHRcdHJldHVybiBlW2EoNDM1KV0oZVthKDQzMSldLCBlLmxteVNmKSA/IHZvaWQgMCA6IChzW2EoNDMzKV0oaSwgbyksIHJbYSg0MzApXSh0LCBpLCBvKSlcclxuXHRcdFx0fVxyXG5cdFx0fSBbVCg0MzMpXSh0LCBuKSB7XHJcblx0XHRcdGNvbnN0IGUgPSBULFxyXG5cdFx0XHRcdHIgPSB7XHJcblx0XHRcdFx0XHR5Z0R4RjogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRaeXZQTzogXCJpbnZvaWNlX2Nsb3NlZFwiXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0cltlKDQ0MSldKHQsIHJbZSg0MTMpXSkgJiYgdGhpc1tlKDQzOSldW25bZSg0MjIpXV0gJiYgdGhpc1tlKDQ0NildW2UoNDIwKV0odGhpc1tlKDQzOSldW24uc3RhdHVzXSwge1xyXG5cdFx0XHRcdHNsdWc6IG5bZSg0MzgpXVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgTyA9IEE7XHJcblxyXG5cdGZ1bmN0aW9uIEEodCwgbikge1xyXG5cdFx0dmFyIGUgPSB4KCk7XHJcblx0XHRyZXR1cm4gKEEgPSBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRyZXR1cm4gZVt0IC09IDQzOF1cclxuXHRcdH0pKHQsIG4pXHJcblx0fSAhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRmb3IgKHZhciBuID0gQSwgZSA9IHQoKTsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDE0NTI0OSA9PT0gcGFyc2VJbnQobig0NjUpKSAvIDEgKyBwYXJzZUludChuKDQ0OSkpIC8gMiArIHBhcnNlSW50KG4oNDQyKSkgLyAzICogKC1wYXJzZUludChuKDQ3MikpIC8gNCkgKyAtcGFyc2VJbnQobig0NDgpKSAvIDUgKiAocGFyc2VJbnQobig0NDUpKSAvIDYpICsgcGFyc2VJbnQobig0NTgpKSAvIDcgKiAoLXBhcnNlSW50KG4oNDY5KSkgLyA4KSArIC1wYXJzZUludChuKDQ2MCkpIC8gOSArIHBhcnNlSW50KG4oNDQwKSkgLyAxMCAqIChwYXJzZUludChuKDQ1NCkpIC8gMTEpKSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KHgpO1xyXG5cdGNsYXNzIEMge1xyXG5cdFx0Y29uc3RydWN0b3IodCkge1xyXG5cdFx0XHRmb3IgKHZhciBuID0gQSwgZSA9IHtcclxuXHRcdFx0XHRocEpaUzogbig0NTEpXHJcblx0XHRcdH0uaHBKWlNbbig0NTMpXShcInxcIiksIHIgPSAwOyA7KSB7XHJcblx0XHRcdFx0c3dpdGNoIChlW3IrK10pIHtcclxuXHRcdFx0XHRcdGNhc2UgXCIwXCI6XHJcblx0XHRcdFx0XHRcdHRoaXMudGFwcHNPYnNlcnZlciA9IG5ldyBnKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCIxXCI6XHJcblx0XHRcdFx0XHRcdHRoaXNbbig0NDYpXSA9IG5ldyBOKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCIyXCI6XHJcblx0XHRcdFx0XHRcdHRoaXNbbig0NTkpXSA9IG5ldyBsKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCIzXCI6XHJcblx0XHRcdFx0XHRcdHRoaXNbbig0NTApXSA9IHQ7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjRcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tuKDQ1MildID0gbmV3IFModGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjVcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tuKDQ0NCldID0gbmV3IHAodGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGFzeW5jIFtPKDQ2NCldKCkge1xyXG5cdFx0XHR2YXIgdCA9IE8sXHJcblx0XHRcdFx0biA9IHtcclxuXHRcdFx0XHRcdFpIY250OiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCA9PT0gblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdExzV3VFOiB0KDQ1NSksXHJcblx0XHRcdFx0XHRta2JMWjogdCg0NDMpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0dGhpcy5kb2N1bWVudE9ic2VydmVyW3QoNDY0KV0oKSwgdGhpc1t0KDQ0NCldW3QoNDY0KV0oKSwgdGhpc1t0KDQ1MildW3QoNDY0KV0oKSwgdGhpc1t0KDQ0NildW3QoNDY0KV0oKSwgdGhpc1t0KDQ2MildW3QoNDY0KV0oKTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRuW3QoNDU2KV0oblt0KDQzOSldLCBuW3QoNDM5KV0pID8gdGhpcy5ldmVudHNUaHJlc2hvbGQgPSBhd2FpdCAoYXdhaXQgZmV0Y2goKG4uWkhjbnQodGhpc1t0KDQ1MCldW3QoNDQxKV0sIHQoNDY2KSkgPyByIDogZSkgKyBuW3QoNDQ3KV0sIHtcclxuXHRcdFx0XHRcdHNpZ25hbDogQWJvcnRTaWduYWxbdCg0NTcpXSgyZTMpXHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdFx0XHQuanNvbigpIDogdGhpc1t0KDQ1MCldW3QoNDcxKV0oXzB4MmI3MmVkLCBfMHgzMGE0NTApXHJcblx0XHRcdFx0XHRcdC5jYXRjaCgodCA9PiBfMHgzMzYyYjguZXJyb3IodCkpKVxyXG5cdFx0XHR9IGNhdGNoIChzKSB7XHJcblx0XHRcdFx0dGhpc1t0KDQ2MyldID0ge1xyXG5cdFx0XHRcdFx0XCJhcHAtaGlkZVwiOiAzXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZWNvcmRFdmVudCh0LCBuKSB7XHJcblx0XHRcdHZhciBlID0gTztcclxuXHRcdFx0dGhpc1tlKDQ1MCldW2UoNDcxKV0odCwgbilbZSg0NjEpXSgodCA9PiBjb25zb2xlW2UoNDY3KV0odCkpKVxyXG5cdFx0fSBbTyg0MzgpXSh0LCBuKSB7XHJcblx0XHRcdHZhciBlID0gTyxcclxuXHRcdFx0XHRyID0ge1xyXG5cdFx0XHRcdFx0WWNkelM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0cltlKDQ3MCldKHRoaXNbZSg0NjMpXVt0XSwgMCkgfHwgKHRoaXMuYXBwTW9kdWxlW2UoNDM4KV0odCwgbiksIHRoaXNbZSg0NjMpXVt0XSAmJiAoci5ZY2R6UyhcImNSZlRlXCIsIFwiZEtzcVpcIikgPyB0aGlzW2UoNDYzKV0gPSB7XHJcblx0XHRcdFx0XCJhcHAtaGlkZVwiOiAzXHJcblx0XHRcdH0gOiB0aGlzW2UoNDYzKV1bdF0tLSkpXHJcblx0XHR9IFtPKDQ2OCldKHQsIG4pIHtcclxuXHRcdFx0dmFyIGUgPSBPO1xyXG5cdFx0XHR0aGlzW2UoNDUwKV1bZSg0NjgpXSh0LCBuKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24geCgpIHtcclxuXHRcdHZhciB0ID0gW1wiMzkxMDh2T3BIQ3RcIiwgXCJjb2xsZWN0RXZlbnRcIiwgXCJMc1d1RVwiLCBcIjM4NjE2ODB6cnpjU09cIiwgXCJlbnZcIiwgXCIyNGNYdFBGZ1wiLCBcImV2ZW50cy90aHJlc2hvbGRcIiwgXCJ0b25Db25uZWN0T2JzZXJ2ZXJcIiwgXCI2MTQyNzRrSHJtdnRcIiwgXCJ3ZWJWaWV3T2JzZXJ2ZXJcIiwgXCJta2JMWlwiLCBcIjVzUmpCZUNcIiwgXCI0NzkxMjZZdXVBUXpcIiwgXCJhcHBNb2R1bGVcIiwgXCIzfDJ8NXw0fDF8MFwiLCBcIndlYkFwcE9ic2VydmVyXCIsIFwic3BsaXRcIiwgXCIxMUtiTW9pbFwiLCBcIkhSckJjXCIsIFwiWkhjbnRcIiwgXCJ0aW1lb3V0XCIsIFwiN29vTHFzb1wiLCBcImRvY3VtZW50T2JzZXJ2ZXJcIiwgXCIxNjIzMTU5WEhCZVlQXCIsIFwiY2F0Y2hcIiwgXCJ0YXBwc09ic2VydmVyXCIsIFwiZXZlbnRzVGhyZXNob2xkXCIsIFwiaW5pdFwiLCBcIjQxMDUya0xUbm53XCIsIFwiU1RHXCIsIFwiZXJyb3JcIiwgXCJjb2xsZWN0VGFwcHNFdmVudFwiLCBcIjEyODQ3MDR2YVh3QkxcIiwgXCJZY2R6U1wiLCBcInJlY29yZEV2ZW50XCJdO1xyXG5cdFx0cmV0dXJuICh4ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gUih0LCBuKSB7XHJcblx0XHRjb25zdCBlID0gUCgpO1xyXG5cdFx0cmV0dXJuIChSID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSAzNjFdXHJcblx0XHR9KSh0LCBuKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IFIsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDc0NDc1MiA9PT0gcGFyc2VJbnQobigzNzUpKSAvIDEgKyBwYXJzZUludChuKDM2NykpIC8gMiAqIChwYXJzZUludChuKDM3MCkpIC8gMykgKyBwYXJzZUludChuKDM3MykpIC8gNCArIHBhcnNlSW50KG4oMzc0KSkgLyA1ICsgLXBhcnNlSW50KG4oMzc2KSkgLyA2ICogKC1wYXJzZUludChuKDM2NikpIC8gNykgKyAtcGFyc2VJbnQobigzNjUpKSAvIDggKiAocGFyc2VJbnQobigzNjIpKSAvIDkpICsgLXBhcnNlSW50KG4oMzY0KSkgLyAxMCkgYnJlYWs7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9IGNhdGNoIChyKSB7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9XHJcblx0fShQKTtcclxuXHRjb25zdCBVID0gdCA9PiB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IodClcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiBQKCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcIjM1MjQxMzgwVFphZ0VKXCIsIFwiNTE2MTY5Nk54dHNaT1wiLCBcIjEwNDQxMk1PT2JjYlwiLCBcIjIwODE4MjZKSFNQY2xcIiwgXCJUb2tlbiBpcyBub3QgcHJvdmlkZWQuXCIsIFwiVGVsZWdyYW0gVXNlciBkYXRhIGlzIG5vdCBwcm92aWRlZC5cIiwgXCIzSFlMUVN6XCIsIFwiZHJzbmlcIiwgXCJ1VHphYVwiLCBcIjIyNjQzNDBybWpzRXlcIiwgXCI1MTYzMTkwVXJOdENpXCIsIFwiOTc2Nzc0ZHZLdXFnXCIsIFwiNTIyUVN2UXdnXCIsIFwiY2tJZXVcIiwgXCJVU0VSX0RBVEFfSVNfTk9UX1BST1ZJREVEXCIsIFwiOXpKdWRhWVwiLCBcIlRPS0VOX0lTX05PVF9QUk9WSURFRFwiXTtcclxuXHRcdHJldHVybiAoUCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblx0dmFyIEQgPSAodCA9PiB7XHJcblx0XHRjb25zdCBuID0gUixcclxuXHRcdFx0ZSA9IHtcclxuXHRcdFx0XHRkcnNuaTogbigzNjMpLFxyXG5cdFx0XHRcdHVUemFhOiBuKDM2MSksXHJcblx0XHRcdFx0Y2tJZXU6IG4oMzY5KVxyXG5cdFx0XHR9O1xyXG5cdFx0cmV0dXJuIHRbZVtuKDM3MSldXSA9IG4oMzY4KSwgdFtlW24oMzcyKV1dID0gZVtuKDM3NyldLCB0XHJcblx0fSkoRCB8fCB7fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGsodCwgbikge1xyXG5cdFx0Y29uc3QgZSA9IEwoKTtcclxuXHRcdHJldHVybiAoayA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gNDExXVxyXG5cdFx0fSkodCwgbilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIEwoKSB7XHJcblx0XHRjb25zdCB0ID0gW1wiNDAyNTEzNmNac2lnSFwiLCBcIjIwdVVyZENDXCIsIFwiMTE2ODJnUXBmWHRcIiwgXCI1NTNQZXhSdnBcIiwgXCI1NjMyMzh3b3FqdUtcIiwgXCI4NTU4OTcwYmVRUklsXCIsIFwiZ3ppcFwiLCBcIjEyMTMzNjVPQUxtRlFcIiwgXCIzMDUyMkR1QkJpVlwiLCBcImJsb2JcIiwgXCIxMzlJS1lhd0xcIiwgXCJzdHJpbmdpZnlcIiwgXCIxMDIxMjAzN3VFd1hJS1wiLCBcIjQwaVp4bG5aXCJdO1xyXG5cdFx0cmV0dXJuIChMID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH1cclxuXHRhc3luYyBmdW5jdGlvbiBCKHQpIHtcclxuXHRcdGNvbnN0IG4gPSBrLFxyXG5cdFx0XHRlID0gbmV3IEJsb2IoW0pTT05bbig0MTMpXSh0KV0pXHJcblx0XHRcdFx0LnN0cmVhbSgpXHJcblx0XHRcdFx0LnBpcGVUaHJvdWdoKG5ldyBDb21wcmVzc2lvblN0cmVhbShuKDQyMikpKTtcclxuXHRcdHJldHVybiBhd2FpdCBuZXcgUmVzcG9uc2UoZSlbbig0MTEpXSgpXHJcblx0fSAhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRjb25zdCBuID0gayxcclxuXHRcdFx0ZSA9IHQoKTtcclxuXHRcdGZvciAoOyA7KSB0cnkge1xyXG5cdFx0XHRpZiAoNzAwMDQ1ID09PSAtcGFyc2VJbnQobig0MTIpKSAvIDEgKiAoLXBhcnNlSW50KG4oNDE4KSkgLyAyKSArIC1wYXJzZUludChuKDQxNikpIC8gMyArIC1wYXJzZUludChuKDQxNykpIC8gNCAqICgtcGFyc2VJbnQobig0MjMpKSAvIDUpICsgcGFyc2VJbnQobig0MjQpKSAvIDYgKiAocGFyc2VJbnQobig0MTkpKSAvIDcpICsgcGFyc2VJbnQobig0MTUpKSAvIDggKiAoLXBhcnNlSW50KG4oNDIwKSkgLyA5KSArIHBhcnNlSW50KG4oNDIxKSkgLyAxMCArIC1wYXJzZUludChuKDQxNCkpIC8gMTEpIGJyZWFrO1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fVxyXG5cdH0oTCk7XHJcblx0Y29uc3QgViA9IFc7XHJcblxyXG5cdGZ1bmN0aW9uIEcoKSB7XHJcblx0XHRjb25zdCB0ID0gW1widGFza1NvbHV0aW9uXCIsIFwiZVRkaWNcIiwgXCJMV1V5b1wiLCBcInJlY29yZEV2ZW50c1wiLCBcIlJVc3hYXCIsIFwiU1RHXCIsIFwiMzA5NjBYZ3VyT3ZcIiwgXCJRTmtDVlwiLCBcIjgyNzA5MnFHaVJEeVwiLCBcImRqVHpWXCIsIFwiaXJrUnJcIiwgXCJhc3NlbWJsZUV2ZW50U2Vzc2lvblwiLCBcImFzc2lnblwiLCBcImFwcE1vZHVsZVwiLCBcIlNOaGRmXCIsIFwicmVzcG9uc2VUb1BhcmFtc1wiLCBcImluaXRcIiwgXCJyZWNvcmRFdmVudFwiLCBcIjEzUkF6dXJKXCIsIFwiZ2V0QXBpVG9rZW5cIiwgXCJzdGF0dXNcIiwgXCJ1VW9OYVwiLCBcIklHc0p2XCIsIFwiVEFRaHBcIiwgXCIxMDU5NTM0a2RocVdtXCIsIFwiUm1jTWhcIiwgXCJDb250ZW50XCIsIFwiZW52XCIsIFwiY3VzdG9tX2RhdGFcIiwgXCIzNjQyNTJ1b2RBTWxcIiwgXCJjbG9uZVwiLCBcIkNvbnRlbnQtRW5jb2RpbmdcIiwgXCJVdW14d1wiLCBcIkprZWNoXCIsIFwia09wc3BcIiwgXCJzb2x2ZVRhc2tcIiwgXCJodlZjb1wiLCBcIkJrdFZRXCIsIFwib0dWS1lcIiwgXCJHbFN6WVwiLCBcImppdVJvXCIsIFwiY09qelBcIiwgXCJ0aGVuXCIsIFwiUE9TVFwiLCBcInNldE5ld0FyZ3NcIiwgXCJCQUNLRU5EX1VSTFwiLCBcInN0cmluZ2lmeVwiLCBcIlNiY0VUXCIsIFwiMjE1MTczNnlRR3ZOSlwiLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJldmVudHNcIiwgXCI1OTUwNDdzWEJxZHhcIiwgXCIyNzA5NjV6UkJUdW5cIiwgXCJnZW5lcmF0ZUhlYWRlcnNcIiwgXCJXVEdMblwiXTtcclxuXHRcdHJldHVybiAoRyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIFcodCwgbikge1xyXG5cdFx0Y29uc3QgZSA9IEcoKTtcclxuXHRcdHJldHVybiAoVyA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gMTQxXVxyXG5cdFx0fSkodCwgbilcclxuXHR9ICEgZnVuY3Rpb24gKHQpIHtcclxuXHRcdGNvbnN0IG4gPSBXLFxyXG5cdFx0XHRlID0gdCgpO1xyXG5cdFx0Zm9yICg7IDspIHRyeSB7XHJcblx0XHRcdGlmICgxMDkwNTkgPT09IC1wYXJzZUludChuKDE2MCkpIC8gMSAqICgtcGFyc2VJbnQobigxNDgpKSAvIDIpICsgcGFyc2VJbnQobigxOTMpKSAvIDMgKyBwYXJzZUludChuKDE3MSkpIC8gNCArIC1wYXJzZUludChuKDE5NCkpIC8gNSArIC1wYXJzZUludChuKDE2NikpIC8gNiArIHBhcnNlSW50KG4oMTUwKSkgLyA3ICsgLXBhcnNlSW50KG4oMTkwKSkgLyA4KSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KEcpO1xyXG5cdGNsYXNzIHoge1xyXG5cdFx0Y29uc3RydWN0b3IodCkge1xyXG5cdFx0XHRjb25zdCBuID0gVyxcclxuXHRcdFx0XHRzID0ge1xyXG5cdFx0XHRcdFx0dVVvTmE6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0R2xTelk6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4pXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Um1jTWg6IG4oMTY4KSxcclxuXHRcdFx0XHRcdFV1bXh3OiBuKDE3MyksXHJcblx0XHRcdFx0XHRodlZjbzogXCJnemlwXCIsXHJcblx0XHRcdFx0XHRJR3NKdjogbigxOTEpLFxyXG5cdFx0XHRcdFx0UW9pZFE6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4pXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dmRGQUo6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0QVFiRHA6IG4oMTUxKSxcclxuXHRcdFx0XHRcdHhiaEJkOiBuKDE0NyksXHJcblx0XHRcdFx0XHRrT3BzcDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRpcmtScjogbigxNDQpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0dGhpcy5CQUNLRU5EX1VSTCA9IGUsIHRoaXMucmVzcG9uc2VUb1BhcmFtcyA9IGFzeW5jIHQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGUgPSBuLFxyXG5cdFx0XHRcdFx0ciA9IHRbZSgxNzIpXSgpO1xyXG5cdFx0XHRcdGlmIChzW2UoMTYzKV0oc1tlKDE4MSldKFN0cmluZywgcltlKDE2MildKVswXSwgXCIyXCIpIHx8IHNbZSgxNjMpXShyLnN0YXR1cywgNDI5KSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdCA9IGF3YWl0IHIuanNvbigpO1xyXG5cdFx0XHRcdFx0dGhpc1tlKDE1NSldW2UoMTg2KV0odFtzW2UoMTY3KV1dKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdFxyXG5cdFx0XHR9LCB0aGlzW24oMTk1KV0gPSB0ID0+IHtcclxuXHRcdFx0XHRjb25zdCBlID0gbjtcclxuXHRcdFx0XHRpZiAocy52ZEZBSihzLkFRYkRwLCBlKDE3NSkpKSB7XHJcblx0XHRcdFx0XHR0aGlzW2UoMTU1KV0uc29sdmVUYXNrKCk7XHJcblx0XHRcdFx0XHRjb25zdCBuID0ge307XHJcblx0XHRcdFx0XHRpZiAodGhpc1tlKDE1NSldW2UoMTQyKV0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKHMudVVvTmEoZSgxNDkpLCBlKDE1NikpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpc1tlKDE1NSldW2UoMTc3KV0oKTtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ID0ge307XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbZSgxNTUpXVtlKDE0MildICYmICh0W3MuUm1jTWhdID0gdGhpcy5hcHBNb2R1bGVbZSgxNDIpXSksIF8weDY0ZTc3OSAmJiAodFtzW2UoMTc0KV1dID0gc1tlKDE3OCldKSwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJUR0EtQXV0aC1Ub2tlblwiOiB0aGlzLmFwcE1vZHVsZVtlKDE2MSldKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBzLklHc0p2LFxyXG5cdFx0XHRcdFx0XHRcdFx0Li4udFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRuW2UoMTY4KV0gPSB0aGlzLmFwcE1vZHVsZVtlKDE0MildXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdCAmJiAobltlKDE3MyldID0gc1tlKDE3OCldKSwge1xyXG5cdFx0XHRcdFx0XHRcIlRHQS1BdXRoLVRva2VuXCI6IHRoaXNbZSgxNTUpXS5nZXRBcGlUb2tlbigpLFxyXG5cdFx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBzW2UoMTY0KV0sXHJcblx0XHRcdFx0XHRcdC4uLm5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cy5Rb2lkUShfMHgyZTViN2IsIF8weDJmNmIzYi5UT0tFTl9JU19OT1RfUFJPVklERUQpXHJcblx0XHRcdH0sIHRoaXNbbigxNTUpXSA9IHQsIHNbbigxNjMpXSh0aGlzLmFwcE1vZHVsZVtuKDE2OSldLCBzLnhiaEJkKSAmJiAoc1tuKDE3NildKG4oMTQ0KSwgc1tuKDE1MildKSA/IHRoaXNbbigxODcpXSA9IHIgOiBfMHg4NjM2NjYgPSBfMHgyNzEyYmJbbigxNTQpXShfMHgyZjhiZTdbbigxNzApXSwgXzB4NGIyNzZjKSksICF0aGlzW24oMTU1KV1bbigxNjEpXSgpICYmIHNbbigxODEpXShVLCBELlRPS0VOX0lTX05PVF9QUk9WSURFRClcclxuXHRcdH0gW1YoMTU4KV0oKSB7IH1cclxuXHRcdGFzeW5jIFtWKDE0NSldKHQsIG4gPSAhMCkge1xyXG5cdFx0XHRjb25zdCBlID0gVixcclxuXHRcdFx0XHRyID0ge1xyXG5cdFx0XHRcdFx0bGJ4c2o6IGZ1bmN0aW9uICh0LCBuLCBlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4sIGUpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Qmt0VlE6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICsgblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFhTWXZlOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdHJldHVybiBhd2FpdCByLmxieHNqKGZldGNoLCByW2UoMTc5KV0odGhpc1tlKDE4NyldLCBlKDE5MikpLCB7XHJcblx0XHRcdFx0bWV0aG9kOiBlKDE4NSksXHJcblx0XHRcdFx0aGVhZGVyczogdGhpc1tlKDE5NSldKG4pLFxyXG5cdFx0XHRcdGJvZHk6IG4gPyBhd2FpdCByLlhTWXZlKEIsIHQpIDogSlNPTltlKDE4OCldKHQpXHJcblx0XHRcdH0pW2UoMTg0KV0odGhpc1tlKDE1NyldLCB0aGlzLnJlc3BvbnNlVG9QYXJhbXMpXHJcblx0XHR9XHJcblx0XHRhc3luYyBbVigxNTkpXSh0LCBuLCBlLCByID0gITApIHtcclxuXHRcdFx0Y29uc3QgcyA9IFYsXHJcblx0XHRcdFx0aSA9IHtcclxuXHRcdFx0XHRcdFNiY0VUOiBcImd6aXBcIixcclxuXHRcdFx0XHRcdFRBUWhwOiBcIkNvbnRlbnRcIixcclxuXHRcdFx0XHRcdFdUR0xuOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCAhPT0gblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9HVktZOiBzKDE4MiksXHJcblx0XHRcdFx0XHRlVGRpYzogXCJjT2p6UFwiLFxyXG5cdFx0XHRcdFx0SllOcXY6IGZ1bmN0aW9uICh0LCBuLCBlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4sIGUpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YnNuako6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICsgblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFJVc3hYOiBzKDE4NSksXHJcblx0XHRcdFx0XHR4aHNDeTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQobilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHQobnVsbCA9PSBuID8gdm9pZCAwIDogbltzKDE3MCldKSAmJiAoaVtzKDE0MSldKGlbcygxODApXSwgaS5vR1ZLWSkgPyBfMHg1M2EzMjhbcygxNzMpXSA9IGlbcygxODkpXSA6IGUgPyBzKDE4MykgPT09IGlbcygxNDMpXSA/IGUgPSBPYmplY3QuYXNzaWduKG5bcygxNzApXSwgZSkgOiBfMHgyYjg0MmNbaVtzKDE2NSldXSA9IHRoaXNbcygxNTUpXS50YXNrU29sdXRpb24gOiBlID0gbltzKDE3MCldKTtcclxuXHRcdFx0Y29uc3QgbyA9IHtcclxuXHRcdFx0XHQuLi5uLFxyXG5cdFx0XHRcdGV2ZW50X25hbWU6IHQsXHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IGUsXHJcblx0XHRcdFx0Li4udGhpc1tzKDE1NSldW3MoMTUzKV0oKVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRhd2FpdCBpLkpZTnF2KGZldGNoLCBpLmJzbmpKKHRoaXNbcygxODcpXSwgcygxOTIpKSwge1xyXG5cdFx0XHRcdG1ldGhvZDogaVtzKDE0NildLFxyXG5cdFx0XHRcdGhlYWRlcnM6IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCEwKSxcclxuXHRcdFx0XHRib2R5OiByID8gYXdhaXQgaS54aHNDeShCLCBvKSA6IEpTT05bcygxODgpXShvKVxyXG5cdFx0XHR9KVtzKDE4NCldKHRoaXNbcygxNTcpXSwgdGhpcy5yZXNwb25zZVRvUGFyYW1zKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjbGFzcyBNIGV4dGVuZHMgRXJyb3Ige1xyXG5cdFx0Y29uc3RydWN0b3IodCwgbiwgZSkge1xyXG5cdFx0XHRzdXBlcihuLCB7XHJcblx0XHRcdFx0Y2F1c2U6IGVcclxuXHRcdFx0fSksIHRoaXMudHlwZSA9IHQsIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBNLnByb3RvdHlwZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIFEodCwgbiwgZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBNKHQsIG4sIGUpXHJcblx0fVxyXG5cdGNvbnN0IEggPSBcIkVSUl9QQVJTRVwiO1xyXG5cclxuXHRmdW5jdGlvbiBxKCkge1xyXG5cdFx0cmV0dXJuIFEoXCJFUlJfVU5FWFBFQ1RFRF9UWVBFXCIsIFwiVmFsdWUgaGFzIHVuZXhwZWN0ZWQgdHlwZVwiKVxyXG5cdH1cclxuXHRjbGFzcyBKIHtcclxuXHRcdGNvbnN0cnVjdG9yKHQsIG4sIGUpIHtcclxuXHRcdFx0dGhpcy5wYXJzZXIgPSB0LCB0aGlzLmlzT3B0aW9uYWwgPSBuLCB0aGlzLnR5cGUgPSBlXHJcblx0XHR9XHJcblx0XHRwYXJzZSh0KSB7XHJcblx0XHRcdGlmICghdGhpcy5pc09wdGlvbmFsIHx8IHZvaWQgMCAhPT0gdCkgdHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXJzZXIodClcclxuXHRcdFx0fSBjYXRjaCAobikge1xyXG5cdFx0XHRcdHRocm93IFEoSCwgXCJVbmFibGUgdG8gcGFyc2UgdmFsdWVcIiArICh0aGlzLnR5cGUgPyBgIGFzICR7dGhpcy50eXBlfWAgOiBcIlwiKSwgbilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0b3B0aW9uYWwoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmlzT3B0aW9uYWwgPSAhMCwgdGhpc1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gRih0LCBuKSB7XHJcblx0XHRyZXR1cm4gKCkgPT4gbmV3IEoodCwgITEsIG4pXHJcblx0fVxyXG5cdGNvbnN0IFkgPSBGKCh0ID0+IHtcclxuXHRcdGlmIChcImJvb2xlYW5cIiA9PSB0eXBlb2YgdCkgcmV0dXJuIHQ7XHJcblx0XHRjb25zdCBuID0gU3RyaW5nKHQpO1xyXG5cdFx0aWYgKFwiMVwiID09PSBuIHx8IFwidHJ1ZVwiID09PSBuKSByZXR1cm4gITA7XHJcblx0XHRpZiAoXCIwXCIgPT09IG4gfHwgXCJmYWxzZVwiID09PSBuKSByZXR1cm4gITE7XHJcblx0XHR0aHJvdyBxKClcclxuXHR9KSwgXCJib29sZWFuXCIpO1xyXG5cclxuXHRmdW5jdGlvbiBYKHQsIG4pIHtcclxuXHRcdGNvbnN0IGUgPSB7fTtcclxuXHRcdGZvciAoY29uc3QgcyBpbiB0KSB7XHJcblx0XHRcdGNvbnN0IGkgPSB0W3NdO1xyXG5cdFx0XHRpZiAoIWkpIGNvbnRpbnVlO1xyXG5cdFx0XHRsZXQgbywgYTtcclxuXHRcdFx0aWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaSB8fCBcInBhcnNlXCIgaW4gaSkgbyA9IHMsIGEgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGkgPyBpIDogaS5wYXJzZS5iaW5kKGkpO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zdCB7XHJcblx0XHRcdFx0XHR0eXBlOiB0XHJcblx0XHRcdFx0fSA9IGk7XHJcblx0XHRcdFx0byA9IGkuZnJvbSB8fCBzLCBhID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0ID8gdCA6IHQucGFyc2UuYmluZCh0KVxyXG5cdFx0XHR9XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgdCA9IGEobihvKSk7XHJcblx0XHRcdFx0dm9pZCAwICE9PSB0ICYmIChlW3NdID0gdClcclxuXHRcdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRcdHRocm93IFEoSCwgYFVuYWJsZSB0byBwYXJzZSBmaWVsZCBcIiR7c31cImAsIHIpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBLKHQpIHtcclxuXHRcdGxldCBuID0gdDtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBuICYmIChuID0gSlNPTi5wYXJzZShuKSksIFwib2JqZWN0XCIgIT0gdHlwZW9mIG4gfHwgbnVsbCA9PT0gbiB8fCBBcnJheS5pc0FycmF5KG4pKSB0aHJvdyBxKCk7XHJcblx0XHRyZXR1cm4gblxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaih0LCBuKSB7XHJcblx0XHRyZXR1cm4gbmV3IEooKG4gPT4ge1xyXG5cdFx0XHRjb25zdCBlID0gSyhuKTtcclxuXHRcdFx0cmV0dXJuIFgodCwgKHQgPT4gZVt0XSkpXHJcblx0XHR9KSwgITEsIG4pXHJcblx0fVxyXG5cdGNvbnN0IFogPSBGKCh0ID0+IHtcclxuXHRcdGlmIChcIm51bWJlclwiID09IHR5cGVvZiB0KSByZXR1cm4gdDtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiB0KSB7XHJcblx0XHRcdGNvbnN0IG4gPSBOdW1iZXIodCk7XHJcblx0XHRcdGlmICghTnVtYmVyLmlzTmFOKG4pKSByZXR1cm4gblxyXG5cdFx0fVxyXG5cdFx0dGhyb3cgcSgpXHJcblx0fSksIFwibnVtYmVyXCIpLFxyXG5cdFx0JCA9IEYoKHQgPT4ge1xyXG5cdFx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgdCB8fCBcIm51bWJlclwiID09IHR5cGVvZiB0KSByZXR1cm4gdC50b1N0cmluZygpO1xyXG5cdFx0XHR0aHJvdyBxKClcclxuXHRcdH0pLCBcInN0cmluZ1wiKTtcclxuXHRqKHtcclxuXHRcdHJlcV9pZDogJCgpLFxyXG5cdFx0cmVzdWx0OiB0ID0+IHQsXHJcblx0XHRlcnJvcjogJCgpXHJcblx0XHRcdC5vcHRpb25hbCgpXHJcblx0fSk7XHJcblx0Y29uc3QgdHQgPSBGKCh0ID0+IHQgaW5zdGFuY2VvZiBEYXRlID8gdCA6IG5ldyBEYXRlKDFlMyAqIFooKVxyXG5cdFx0LnBhcnNlKHQpKSksIFwiRGF0ZVwiKTtcclxuXHJcblx0ZnVuY3Rpb24gbnQodCwgbikge1xyXG5cdFx0cmV0dXJuIG5ldyBKKChuID0+IHtcclxuXHRcdFx0aWYgKFwic3RyaW5nXCIgIT0gdHlwZW9mIG4gJiYgIShuIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSkgdGhyb3cgcSgpO1xyXG5cdFx0XHRjb25zdCBlID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgbiA/IG5ldyBVUkxTZWFyY2hQYXJhbXMobikgOiBuO1xyXG5cdFx0XHRyZXR1cm4gWCh0LCAodCA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbiA9IGUuZ2V0KHQpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsID09PSBuID8gdm9pZCAwIDogblxyXG5cdFx0XHR9KSlcclxuXHRcdH0pLCAhMSwgbilcclxuXHR9XHJcblx0Y29uc3QgZXQgPSBqKHtcclxuXHRcdGlkOiBaKCksXHJcblx0XHR0eXBlOiAkKCksXHJcblx0XHR0aXRsZTogJCgpLFxyXG5cdFx0cGhvdG9Vcmw6IHtcclxuXHRcdFx0dHlwZTogJCgpXHJcblx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdGZyb206IFwicGhvdG9fdXJsXCJcclxuXHRcdH0sXHJcblx0XHR1c2VybmFtZTogJCgpXHJcblx0XHRcdC5vcHRpb25hbCgpXHJcblx0fSwgXCJDaGF0XCIpXHJcblx0XHQub3B0aW9uYWwoKSxcclxuXHRcdHJ0ID0gaih7XHJcblx0XHRcdGFkZGVkVG9BdHRhY2htZW50TWVudToge1xyXG5cdFx0XHRcdHR5cGU6IFkoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJhZGRlZF90b19hdHRhY2htZW50X21lbnVcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRhbGxvd3NXcml0ZVRvUG06IHtcclxuXHRcdFx0XHR0eXBlOiBZKClcclxuXHRcdFx0XHRcdC5vcHRpb25hbCgpLFxyXG5cdFx0XHRcdGZyb206IFwiYWxsb3dzX3dyaXRlX3RvX3BtXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0Zmlyc3ROYW1lOiB7XHJcblx0XHRcdFx0dHlwZTogJCgpLFxyXG5cdFx0XHRcdGZyb206IFwiZmlyc3RfbmFtZVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGlkOiBaKCksXHJcblx0XHRcdGlzQm90OiB7XHJcblx0XHRcdFx0dHlwZTogWSgpXHJcblx0XHRcdFx0XHQub3B0aW9uYWwoKSxcclxuXHRcdFx0XHRmcm9tOiBcImlzX2JvdFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzUHJlbWl1bToge1xyXG5cdFx0XHRcdHR5cGU6IFkoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJpc19wcmVtaXVtXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0bGFuZ3VhZ2VDb2RlOiB7XHJcblx0XHRcdFx0dHlwZTogJCgpXHJcblx0XHRcdFx0XHQub3B0aW9uYWwoKSxcclxuXHRcdFx0XHRmcm9tOiBcImxhbmd1YWdlX2NvZGVcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsYXN0TmFtZToge1xyXG5cdFx0XHRcdHR5cGU6ICQoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJsYXN0X25hbWVcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwaG90b1VybDoge1xyXG5cdFx0XHRcdHR5cGU6ICQoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJwaG90b191cmxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR1c2VybmFtZTogJCgpXHJcblx0XHRcdFx0Lm9wdGlvbmFsKClcclxuXHRcdH0sIFwiVXNlclwiKVxyXG5cdFx0XHQub3B0aW9uYWwoKTtcclxuXHRjb25zdCBzdCA9IEYoKHQgPT4gZnVuY3Rpb24gKHQpIHtcclxuXHRcdGNvbnN0IG4gPSB0LnJlcGxhY2UoL1xccy9nLCBcIlwiKVxyXG5cdFx0XHQudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmIChmdW5jdGlvbiAodCkge1xyXG5cdFx0XHRyZXR1cm4gL14jW1xcZGEtZl17Nn0kL2kudGVzdCh0KVxyXG5cdFx0fShuKSkgcmV0dXJuIG47XHJcblx0XHRpZiAoZnVuY3Rpb24gKHQpIHtcclxuXHRcdFx0cmV0dXJuIC9eI1tcXGRhLWZdezN9JC9pLnRlc3QodClcclxuXHRcdH0obikpIHtcclxuXHRcdFx0bGV0IHQgPSBcIiNcIjtcclxuXHRcdFx0Zm9yIChsZXQgZSA9IDA7IGUgPCAzOyBlICs9IDEpIHQgKz0gblsxICsgZV0ucmVwZWF0KDIpO1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZSA9IG4ubWF0Y2goL15yZ2JcXCgoXFxkezEsM30pLChcXGR7MSwzfSksKFxcZHsxLDN9KVxcKSQvKSB8fCBuLm1hdGNoKC9ecmdiYVxcKChcXGR7MSwzfSksKFxcZHsxLDN9KSwoXFxkezEsM30pLFxcZHsxLDN9XFwpJC8pO1xyXG5cdFx0aWYgKCFlKSB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIFwiJHt0fVwiIGRvZXMgbm90IHNhdGlzZnkgYW55IG9mIGtub3duIFJHQiBmb3JtYXRzLmApO1xyXG5cdFx0cmV0dXJuIGUuc2xpY2UoMSlcclxuXHRcdFx0LnJlZHVjZSgoKHQsIG4pID0+IHtcclxuXHRcdFx0XHRjb25zdCBlID0gcGFyc2VJbnQobiwgMTApXHJcblx0XHRcdFx0XHQudG9TdHJpbmcoMTYpO1xyXG5cdFx0XHRcdHJldHVybiB0ICsgKDEgPT09IGUubGVuZ3RoID8gXCIwXCIgOiBcIlwiKSArIGVcclxuXHRcdFx0fSksIFwiI1wiKVxyXG5cdH0oJCgpXHJcblx0XHQucGFyc2UodCkpKSwgXCJyZ2JcIik7XHJcblxyXG5cdGZ1bmN0aW9uIGl0KHQpIHtcclxuXHRcdHJldHVybiB0LnJlcGxhY2UoL1tBLVpdL2csICh0ID0+IGBfJHt0LnRvTG93ZXJDYXNlKCl9YCkpXHJcblx0fVxyXG5cdGNvbnN0IG90ID0gRigodCA9PiB7XHJcblx0XHRjb25zdCBuID0gc3QoKVxyXG5cdFx0XHQub3B0aW9uYWwoKTtcclxuXHRcdHJldHVybiBPYmplY3QuZW50cmllcyhLKHQpKVxyXG5cdFx0XHQucmVkdWNlKCgodCwgW2UsIHJdKSA9PiAodFtmdW5jdGlvbiAodCkge1xyXG5cdFx0XHRcdHJldHVybiB0LnJlcGxhY2UoL19bYS16XS9nLCAodCA9PiB0WzFdLnRvVXBwZXJDYXNlKCkpKVxyXG5cdFx0XHR9KGUpXSA9IG4ucGFyc2UociksIHQpKSwge30pXHJcblx0fSksIFwiVGhlbWVQYXJhbXNcIik7XHJcblxyXG5cdGZ1bmN0aW9uIGF0KHQpIHtcclxuXHRcdHJldHVybiBudCh7XHJcblx0XHRcdGJvdElubGluZToge1xyXG5cdFx0XHRcdHR5cGU6IFkoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJ0Z1dlYkFwcEJvdElubGluZVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGluaXREYXRhOiB7XHJcblx0XHRcdFx0dHlwZTogbnQoe1xyXG5cdFx0XHRcdFx0YXV0aERhdGU6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogdHQoKSxcclxuXHRcdFx0XHRcdFx0ZnJvbTogXCJhdXRoX2RhdGVcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNhblNlbmRBZnRlcjoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBaKClcclxuXHRcdFx0XHRcdFx0XHQub3B0aW9uYWwoKSxcclxuXHRcdFx0XHRcdFx0ZnJvbTogXCJjYW5fc2VuZF9hZnRlclwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2hhdDogZXQsXHJcblx0XHRcdFx0XHRjaGF0SW5zdGFuY2U6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJCgpXHJcblx0XHRcdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0XHRcdGZyb206IFwiY2hhdF9pbnN0YW5jZVwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2hhdFR5cGU6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogJCgpXHJcblx0XHRcdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0XHRcdGZyb206IFwiY2hhdF90eXBlXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRoYXNoOiAkKCksXHJcblx0XHRcdFx0XHRxdWVyeUlkOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICQoKVxyXG5cdFx0XHRcdFx0XHRcdC5vcHRpb25hbCgpLFxyXG5cdFx0XHRcdFx0XHRmcm9tOiBcInF1ZXJ5X2lkXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRyZWNlaXZlcjogcnQsXHJcblx0XHRcdFx0XHRzdGFydFBhcmFtOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6ICQoKVxyXG5cdFx0XHRcdFx0XHRcdC5vcHRpb25hbCgpLFxyXG5cdFx0XHRcdFx0XHRmcm9tOiBcInN0YXJ0X3BhcmFtXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR1c2VyOiBydFxyXG5cdFx0XHRcdH0sIFwiSW5pdERhdGFcIilcclxuXHRcdFx0XHRcdC5vcHRpb25hbCgpLFxyXG5cdFx0XHRcdGZyb206IFwidGdXZWJBcHBEYXRhXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdERhdGFSYXc6IHtcclxuXHRcdFx0XHR0eXBlOiAkKClcclxuXHRcdFx0XHRcdC5vcHRpb25hbCgpLFxyXG5cdFx0XHRcdGZyb206IFwidGdXZWJBcHBEYXRhXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0cGxhdGZvcm06IHtcclxuXHRcdFx0XHR0eXBlOiAkKCksXHJcblx0XHRcdFx0ZnJvbTogXCJ0Z1dlYkFwcFBsYXRmb3JtXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c2hvd1NldHRpbmdzOiB7XHJcblx0XHRcdFx0dHlwZTogWSgpXHJcblx0XHRcdFx0XHQub3B0aW9uYWwoKSxcclxuXHRcdFx0XHRmcm9tOiBcInRnV2ViQXBwU2hvd1NldHRpbmdzXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c3RhcnRQYXJhbToge1xyXG5cdFx0XHRcdHR5cGU6ICQoKVxyXG5cdFx0XHRcdFx0Lm9wdGlvbmFsKCksXHJcblx0XHRcdFx0ZnJvbTogXCJ0Z1dlYkFwcFN0YXJ0UGFyYW1cIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aGVtZVBhcmFtczoge1xyXG5cdFx0XHRcdHR5cGU6IG90KCksXHJcblx0XHRcdFx0ZnJvbTogXCJ0Z1dlYkFwcFRoZW1lUGFyYW1zXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dmVyc2lvbjoge1xyXG5cdFx0XHRcdHR5cGU6ICQoKSxcclxuXHRcdFx0XHRmcm9tOiBcInRnV2ViQXBwVmVyc2lvblwiXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcdC5wYXJzZSh0KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY3QodCkge1xyXG5cdFx0cmV0dXJuIGF0KHQucmVwbGFjZSgvXltePyNdKls/I10vLCBcIlwiKVxyXG5cdFx0XHQucmVwbGFjZSgvWz8jXS9nLCBcIiZcIikpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB1dCgpIHtcclxuXHRcdHJldHVybiBjdCh3aW5kb3cubG9jYXRpb24uaHJlZilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHB0KCkge1xyXG5cdFx0Y29uc3QgdCA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJuYXZpZ2F0aW9uXCIpWzBdO1xyXG5cdFx0aWYgKCF0KSB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZ2V0IGZpcnN0IG5hdmlnYXRpb24gZW50cnkuXCIpO1xyXG5cdFx0cmV0dXJuIGN0KHQubmFtZSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGh0KHQpIHtcclxuXHRcdHJldHVybiBgdGVsZWdyYW0tYXBwcy8ke3QucmVwbGFjZSgvW0EtWl0vZywgKHQgPT4gYC0ke3QudG9Mb3dlckNhc2UoKX1gKSl9YFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZnQoKSB7XHJcblx0XHRyZXR1cm4gYXQoZnVuY3Rpb24gKHQpIHtcclxuXHRcdFx0Y29uc3QgbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oaHQodCkpO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuID8gSlNPTi5wYXJzZShuKSA6IHZvaWQgMFxyXG5cdFx0XHR9IGNhdGNoIHsgfVxyXG5cdFx0fShcImxhdW5jaFBhcmFtc1wiKSB8fCBcIlwiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbHQodCkge1xyXG5cdFx0Y29uc3Qge1xyXG5cdFx0XHRpbml0RGF0YVJhdzogbixcclxuXHRcdFx0dGhlbWVQYXJhbXM6IGUsXHJcblx0XHRcdHBsYXRmb3JtOiByLFxyXG5cdFx0XHR2ZXJzaW9uOiBzLFxyXG5cdFx0XHRzaG93U2V0dGluZ3M6IGksXHJcblx0XHRcdHN0YXJ0UGFyYW06IG8sXHJcblx0XHRcdGJvdElubGluZTogYVxyXG5cdFx0fSA9IHQsIGMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zO1xyXG5cdFx0cmV0dXJuIGMuc2V0KFwidGdXZWJBcHBQbGF0Zm9ybVwiLCByKSwgYy5zZXQoXCJ0Z1dlYkFwcFRoZW1lUGFyYW1zXCIsIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXModClcclxuXHRcdFx0XHQubWFwKCgoW3QsIG5dKSA9PiBbaXQodCksIG5dKSkpKVxyXG5cdFx0fShlKSksIGMuc2V0KFwidGdXZWJBcHBWZXJzaW9uXCIsIHMpLCBuICYmIGMuc2V0KFwidGdXZWJBcHBEYXRhXCIsIG4pLCBvICYmIGMuc2V0KFwidGdXZWJBcHBTdGFydFBhcmFtXCIsIG8pLCBcImJvb2xlYW5cIiA9PSB0eXBlb2YgaSAmJiBjLnNldChcInRnV2ViQXBwU2hvd1NldHRpbmdzXCIsIGkgPyBcIjFcIiA6IFwiMFwiKSwgXCJib29sZWFuXCIgPT0gdHlwZW9mIGEgJiYgYy5zZXQoXCJ0Z1dlYkFwcEJvdElubGluZVwiLCBhID8gXCIxXCIgOiBcIjBcIiksIGMudG9TdHJpbmcoKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZHQodCkge1xyXG5cdFx0ISBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGh0KHQpLCBKU09OLnN0cmluZ2lmeShuKSlcclxuXHRcdH0oXCJsYXVuY2hQYXJhbXNcIiwgbHQodCkpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBJdCgpIHtcclxuXHRcdGNvbnN0IHQgPSBbXTtcclxuXHRcdGZvciAoY29uc3QgZSBvZiBbdXQsIHB0LCBmdF0pIHRyeSB7XHJcblx0XHRcdGNvbnN0IHQgPSBlKCk7XHJcblx0XHRcdHJldHVybiBkdCh0KSwgdFxyXG5cdFx0fSBjYXRjaCAobikge1xyXG5cdFx0XHR0LnB1c2gobiBpbnN0YW5jZW9mIEVycm9yID8gbi5tZXNzYWdlIDogSlNPTi5zdHJpbmdpZnkobikpXHJcblx0XHR9XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoW1wiVW5hYmxlIHRvIHJldHJpZXZlIGxhdW5jaCBwYXJhbWV0ZXJzIGZyb20gYW55IGtub3duIHNvdXJjZS4gUGVyaGFwcywgeW91IGhhdmUgb3BlbmVkIHlvdXIgYXBwIG91dHNpZGUgVGVsZWdyYW0/XFxuXCIsIFwi8J+TliBSZWZlciB0byBkb2NzIGZvciBtb3JlIGluZm9ybWF0aW9uOlwiLCBcImh0dHBzOi8vZG9jcy50ZWxlZ3JhbS1taW5pLWFwcHMuY29tL3BhY2thZ2VzL3RlbGVncmFtLWFwcHMtc2RrL2Vudmlyb25tZW50XFxuXCIsIFwiQ29sbGVjdGVkIGVycm9yczpcIiwgdC5tYXAoKHQgPT4gYOKAlCAke3R9YCkpXS5qb2luKFwiXFxuXCIpKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbXQoKSB7XHJcblx0XHRjb25zdCB0ID0gW1wibGVuZ3RoXCIsIFwiZmxvb3JcIiwgXCJCVE1VbFwiLCBcIjEyNjUwTWlBRG5WXCIsIFwiNTI4ODA1TXdRc2ljXCIsIFwibHBiV2ZcIiwgXCJzbGljZVwiLCBcIjU2NzI1NjlYUERnVkpcIiwgXCJ5VkN1TVwiLCBcIjE2d1FOTmFBXCIsIFwiMjExMzY0NFFJSUdJUFwiLCBcIjM3MTM3NjlSRGhlZ3RcIiwgXCI2ODU4MjYwdWRKem1oXCIsIFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCIsIFwidlV0YkhcIiwgXCI0NDU1MTk4ZnViWVBZXCIsIFwidG9TdHJpbmdcIiwgXCJjaGFyQ29kZUF0XCIsIFwibnJSRmpcIiwgXCI0WHJzdkVrXCIsIFwiTkFzcnRcIiwgXCJyZXBsYWNlXCIsIFwid0ZTWGRcIiwgXCI0Q3ljc2lkXCJdO1xyXG5cdFx0cmV0dXJuIChtdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHZ0KHQsIG4pIHtcclxuXHRcdGNvbnN0IGUgPSBtdCgpO1xyXG5cdFx0cmV0dXJuICh2dCA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gMjcyXVxyXG5cdFx0fSkodCwgbilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGd0KHQpIHtcclxuXHRcdGNvbnN0IG4gPSB2dCxcclxuXHRcdFx0ZSA9IHtcclxuXHRcdFx0XHR2VXRiSDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0ICsgblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dVRpeUs6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdCA8PCBuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRZS2dVSDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0IHwgblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bHBiV2Y6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdCAlIG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHdGU1hkOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHQgKyBuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRhZkRjRjogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0IC8gblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0eVZDdU06IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdCA9PSBuXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRuclJGajogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0IHwgblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0d2NTTW06IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdCAmIG5cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdE5Bc3J0OiBuKDI3MyksXHJcblx0XHRcdFx0QlRNVWw6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGpkcVU6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdCA8IG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRsZXQgciA9IGVbbigyODApXSxcclxuXHRcdFx0cyA9IChuZXcgRGF0ZSlcclxuXHRcdFx0XHQuZ2V0VGltZSgpO1xyXG5cdFx0Y29uc3QgaSA9IHQgKyBzO1xyXG5cdFx0bGV0IG8gPSBlW24oMjg2KV0oKGZ1bmN0aW9uICh0KSB7XHJcblx0XHRcdGNvbnN0IHIgPSBuO1xyXG5cdFx0XHRsZXQgcyA9IDA7XHJcblx0XHRcdGZvciAobGV0IG4gPSAwOyBuIDwgdFtyKDI4NCldOyBuKyspIHtcclxuXHRcdFx0XHRjb25zdCBpID0gdFtyKDI3NyldKG4pO1xyXG5cdFx0XHRcdHMgPSBlW3IoMjc0KV0oZS51VGl5SyhzLCA1KSAtIHMsIGkpLCBzIHw9IDBcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc1xyXG5cdFx0fSksIGkpW24oMjc2KV0oMTYpO1xyXG5cdFx0Zm9yICg7IGUuaGpkcVUoby5sZW5ndGgsIDMyKTspIG8gKz0gbztcclxuXHRcdG8gPSBvW24oMjkwKV0oMCwgMzIpO1xyXG5cdFx0bGV0IGEgPSAwO1xyXG5cdFx0cmV0dXJuIHJbbigyODEpXSgvW3h5XS9nLCAoZnVuY3Rpb24gKHQpIHtcclxuXHRcdFx0Y29uc3QgciA9IG4sXHJcblx0XHRcdFx0aSA9IGUuWUtnVUgoZVtyKDI4OSldKGVbcigyODIpXShzLCBwYXJzZUludChvW2FdLCAxNikpLCAxNiksIDApO1xyXG5cdFx0XHRyZXR1cm4gcyA9IE1hdGhbcigyODUpXShlLmFmRGNGKHMsIDE2KSksIGErKywgKGVbcigyOTIpXSh0LCBcInhcIikgPyBpIDogZVtyKDI3OCldKGUud2NTTW0oaSwgMyksIDgpKVtyKDI3NildKDE2KVxyXG5cdFx0fSkpXHJcblx0fSAhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRjb25zdCBuID0gdnQsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDk1OTgzNiA9PT0gLXBhcnNlSW50KG4oMjg4KSkgLyAxICsgcGFyc2VJbnQobigyNzkpKSAvIDIgKiAocGFyc2VJbnQobigyOTQpKSAvIDMpICsgLXBhcnNlSW50KG4oMjgzKSkgLyA0ICogKC1wYXJzZUludChuKDI3MikpIC8gNSkgKyBwYXJzZUludChuKDI3NSkpIC8gNiArIHBhcnNlSW50KG4oMjkxKSkgLyA3ICogKC1wYXJzZUludChuKDI5MykpIC8gOCkgKyAtcGFyc2VJbnQobigyOTUpKSAvIDkgKyAtcGFyc2VJbnQobigyODcpKSAvIDEwKSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KG10KTtcclxuXHRjb25zdCBFdCA9IHl0O1xyXG5cclxuXHRmdW5jdGlvbiB5dCh0LCBuKSB7XHJcblx0XHRjb25zdCBlID0gX3QoKTtcclxuXHRcdHJldHVybiAoeXQgPSBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRyZXR1cm4gZVt0IC09IDE1OF1cclxuXHRcdH0pKHQsIG4pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfdCgpIHtcclxuXHRcdGNvbnN0IHQgPSBbXCJwaG90b1VybFwiLCBcImxhc3ROYW1lXCIsIFwiMTk5Nzkyb0V4V1NxXCIsIFwiZmlyc3ROYW1lXCIsIFwiZ2V0QXBwTmFtZVwiLCBcIjExOTE1MHp1dVREaVwiLCBcIlVTRVJfREFUQV9JU19OT1RfUFJPVklERURcIiwgXCJpc0JvdFwiLCBcIndlYkFwcFN0YXJ0UGFyYW1cIiwgXCJ1d2xGWVwiLCBcInN0YXJ0UGFyYW1cIiwgXCIyMzU5NDhzd3Bya3RcIiwgXCIxNjg2MTgwR0drTmhnXCIsIFwic3ZSd29cIiwgXCJzZXNzaW9uSWRcIiwgXCJnZXRVc2VyRGF0YVwiLCBcImdldFVzZXJJZFwiLCBcIjQ4dk56dWVEXCIsIFwidXNlcm5hbWVcIiwgXCJpc1ByZW1pdW1cIiwgXCI0NDYwNTdvWWREZlhcIiwgXCJhc3NlbWJsZUV2ZW50U2Vzc2lvblwiLCBcIm5KTGRJXCIsIFwiMjE3dmVrcEpXXCIsIFwiNmNIYXRkeFwiLCBcInVzZXJEYXRhXCIsIFwicGxhdGZvcm1cIiwgXCJ0YklWclwiLCBcImdldFNlc3Npb25JZFwiLCBcIjI3UlVrell6XCIsIFwicnR1bUxcIiwgXCJsYW5ndWFnZUNvZGVcIiwgXCJZZ0lGY1wiLCBcInVzZXJJZFwiLCBcImdldFVzZXJMb2NhbGVcIiwgXCJnZXRXZWJBcHBTdGFydFBhcmFtXCIsIFwiMTE0OTc1M2lwT0NYbVwiLCBcImluaXREYXRhXCIsIFwiZ2V0VXNlcklzUHJlbWl1bVwiLCBcImluaXRcIiwgXCJ1c2VyXCIsIFwiMjd6cEJ2TkdcIiwgXCJhcHBNb2R1bGVcIiwgXCIyMjY1NTQ1WXRCcmlhXCIsIFwiZ2V0UGxhdGZvcm1cIl07XHJcblx0XHRyZXR1cm4gKF90ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IHl0LFxyXG5cdFx0XHRlID0gdCgpO1xyXG5cdFx0Zm9yICg7IDspIHRyeSB7XHJcblx0XHRcdGlmICg0MzQwOTggPT09IC1wYXJzZUludChuKDE3NCkpIC8gMSArIC1wYXJzZUludChuKDE1OSkpIC8gMiArIHBhcnNlSW50KG4oMTgzKSkgLyAzICogKHBhcnNlSW50KG4oMTY1KSkgLyA0KSArIC1wYXJzZUludChuKDE5NykpIC8gNSAqIChwYXJzZUludChuKDE3OCkpIC8gNikgKyBwYXJzZUludChuKDE3NykpIC8gNyAqIChwYXJzZUludChuKDIwMSkpIC8gOCkgKyBwYXJzZUludChuKDE5NSkpIC8gOSAqIChwYXJzZUludChuKDE2NikpIC8gMTApICsgLXBhcnNlSW50KG4oMTkwKSkgLyAxMSAqIChwYXJzZUludChuKDE3MSkpIC8gMTIpKSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KF90KTtcclxuXHRjbGFzcyBTdCB7XHJcblx0XHRjb25zdHJ1Y3Rvcih0KSB7XHJcblx0XHRcdHRoaXNbeXQoMTk2KV0gPSB0XHJcblx0XHR9IFtFdCgxOTMpXSgpIHtcclxuXHRcdFx0dmFyIHQ7XHJcblx0XHRcdGNvbnN0IG4gPSBFdCxcclxuXHRcdFx0XHRlID0ge1xyXG5cdFx0XHRcdFx0TVF1WHc6IGZ1bmN0aW9uICh0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRydHVtTDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR1d2xGWTogbigxODYpLFxyXG5cdFx0XHRcdFx0UGxqR2w6IG4oMTc2KSxcclxuXHRcdFx0XHRcdHRiSVZyOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ciA9IGUuTVF1WHcoSXQpLFxyXG5cdFx0XHRcdHMgPSByW24oMTkxKV0sXHJcblx0XHRcdFx0aSA9IG51bGwgPT0gKHQgPSByW24oMTkxKV0pID8gdm9pZCAwIDogdFtuKDE5NCldO1xyXG5cdFx0XHQhaSAmJiAoZVtuKDE4NCldKGVbbigxNjMpXSwgZS5QbGpHbCkgPyB0aGlzW24oMTk2KV0gPSBfMHg0MzdmNGQgOiBlW24oMTgxKV0oVSwgRFtuKDE2MCldKSksIHRoaXNbbigxNzkpXSA9IHtcclxuXHRcdFx0XHRpZDogaS5pZCxcclxuXHRcdFx0XHRpc19wcmVtaXVtOiBpW24oMTczKV0sXHJcblx0XHRcdFx0Zmlyc3RfbmFtZTogaVtuKDIwMildLFxyXG5cdFx0XHRcdGlzX2JvdDogaVtuKDE2MSldLFxyXG5cdFx0XHRcdGxhc3RfbmFtZTogaVtuKDIwMCldLFxyXG5cdFx0XHRcdGxhbmd1YWdlX2NvZGU6IGlbbigxODUpXSxcclxuXHRcdFx0XHRwaG90b191cmw6IGlbbigxOTkpXSxcclxuXHRcdFx0XHR1c2VybmFtZTogaVtuKDE3MildXHJcblx0XHRcdH0sIHRoaXNbbigxODcpXSA9IGkuaWQsIHRoaXMudXNlckxvY2FsZSA9IGlbbigxODUpXSwgdGhpc1tuKDE2MildID0gc1tuKDE2NCldLCB0aGlzW24oMTgwKV0gPSByW24oMTgwKV0sIHRoaXNbbigxNjgpXSA9IGVbbigxODEpXShndCwgU3RyaW5nKHRoaXNbbigxNzApXSgpKSlcclxuXHRcdH0gW0V0KDE4MildKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpc1tFdCgxNjgpXVxyXG5cdFx0fSBbRXQoMTcwKV0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzW0V0KDE4NyldXHJcblx0XHR9XHJcblx0XHRnZXRXZWJBcHBTdGFydFBhcmFtKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpc1tFdCgxNjIpXVxyXG5cdFx0fSBbRXQoMTk4KV0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnBsYXRmb3JtXHJcblx0XHR9IFtFdCgxODgpXSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudXNlckxvY2FsZVxyXG5cdFx0fSBbRXQoMTY5KV0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzW0V0KDE3OSldXHJcblx0XHR9IFtFdCgxOTIpXSgpIHtcclxuXHRcdFx0Y29uc3QgdCA9IEV0LFxyXG5cdFx0XHRcdG4gPSB0aGlzLmdldFVzZXJEYXRhKCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c3ZSd286IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVt0KDE2NyldKEJvb2xlYW4sIG51bGwgPT0gbiA/IHZvaWQgMCA6IG4uaXNfcHJlbWl1bSlcclxuXHRcdH0gW0V0KDE3NSldKCkge1xyXG5cdFx0XHRjb25zdCB0ID0gRXQ7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2Vzc2lvbl9pZDogdGhpc1t0KDE4MildKCksXHJcblx0XHRcdFx0dXNlcl9pZDogdGhpcy5nZXRVc2VySWQoKSxcclxuXHRcdFx0XHRhcHBfbmFtZTogdGhpcy5hcHBNb2R1bGVbdCgxNTgpXSgpLFxyXG5cdFx0XHRcdGlzX3ByZW1pdW06IHRoaXNbdCgxOTIpXSgpLFxyXG5cdFx0XHRcdHBsYXRmb3JtOiB0aGlzW3QoMTk4KV0oKSxcclxuXHRcdFx0XHRsb2NhbGU6IHRoaXNbdCgxODgpXSgpLFxyXG5cdFx0XHRcdHN0YXJ0X3BhcmFtOiB0aGlzW3QoMTg5KV0oKSxcclxuXHRcdFx0XHRjbGllbnRfdGltZXN0YW1wOiAobiA9IFN0cmluZywgZSA9IERhdGUubm93KCksIG4oZSkpXHJcblx0XHRcdH07XHJcblx0XHRcdHZhciBuLCBlXHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnN0IGJ0ID0gVHQ7XHJcblxyXG5cdGZ1bmN0aW9uIHd0KCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcImluY2x1ZGVzXCIsIFwiZ2V0QmF0Y2hcIiwgXCJhZGRUb1N0b3JhZ2VcIiwgXCJwYXJzZVwiLCBcIjQ2NjYyMjVmWGFmZ3JcIiwgXCJzdHJpbmdpZnlcIiwgXCJrZXlcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJja0RKQ1wiLCBcIjI2WlVuR3VmXCIsIFwiZmluZEluZGV4XCIsIFwiZ2V0SXRlbVwiLCBcIm51bGxcIiwgXCI1NjAxNjh6SW5BaGlcIiwgXCIxODY2NDMyR05pZUliXCIsIFwiMzkzMTZjZEVRTG1cIiwgXCJPeU5icFwiLCBcInlWY2RSXCIsIFwiMTkxODYydW9TZ3BYXCIsIFwiMTU0S1ZqQ3VZXCIsIFwic2Vzc2lvblN0b3JhZ2VcIiwgXCJjQ1VlRFwiLCBcInNldEl0ZW1cIiwgXCJwdXNoXCIsIFwiNzI4NzJTcGVpUVpcIiwgXCI1MjYwNDczeVp1SnpPXCJdO1xyXG5cdFx0cmV0dXJuICh3dCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIFR0KHQsIG4pIHtcclxuXHRcdGNvbnN0IGUgPSB3dCgpO1xyXG5cdFx0cmV0dXJuIChUdCA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gMTY5XVxyXG5cdFx0fSkodCwgbilcclxuXHR9ICEgZnVuY3Rpb24gKHQpIHtcclxuXHRcdGNvbnN0IG4gPSBUdCxcclxuXHRcdFx0ZSA9IHQoKTtcclxuXHRcdGZvciAoOyA7KSB0cnkge1xyXG5cdFx0XHRpZiAoNTUyMTE3ID09PSAtcGFyc2VJbnQobigxODApKSAvIDEgKiAocGFyc2VJbnQobigxODYpKSAvIDIpICsgcGFyc2VJbnQobigxODUpKSAvIDMgKyAtcGFyc2VJbnQobigxODQpKSAvIDQgKyBwYXJzZUludChuKDE3NSkpIC8gNSArIHBhcnNlSW50KG4oMTg5KSkgLyA2ICsgcGFyc2VJbnQobigxOTApKSAvIDcgKiAocGFyc2VJbnQobigxNjkpKSAvIDgpICsgLXBhcnNlSW50KG4oMTcwKSkgLyA5KSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KHd0KTtcclxuXHRjbGFzcyBOdCB7XHJcblx0XHRjb25zdHJ1Y3Rvcih0KSB7XHJcblx0XHRcdGNvbnN0IG4gPSBUdDtcclxuXHRcdFx0dGhpc1tuKDE5MSldID0gd2luZG93W24oMTkxKV0sIHRoaXNbbigxNzgpXSA9IHdpbmRvd1tuKDE3OCldLCB0aGlzW24oMTc3KV0gPSB0XHJcblx0XHR9XHJcblx0XHRnZXRCYXRjaCgpIHtcclxuXHRcdFx0Y29uc3QgdCA9IFR0LFxyXG5cdFx0XHRcdG4gPSB7XHJcblx0XHRcdFx0XHRPeU5icDogdCgxODMpLFxyXG5cdFx0XHRcdFx0eVZjZFI6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y0NVZUQ6IHQoMTc5KVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdHJldHVybiBbbnVsbCwgblt0KDE4NyldXS5pbmNsdWRlcyh0aGlzW3QoMTkxKV1bdCgxODIpXSh0aGlzW3QoMTc3KV0pKSAmJiBbbnVsbCwgblt0KDE4NyldXVt0KDE3MSldKHRoaXNbdCgxNzgpXVt0KDE4MildKHRoaXNbdCgxNzcpXSkpID8gdGhpc1t0KDE5MyldKFtdKSA6IG5bdCgxODgpXShuW3QoMTkyKV0sIHQoMTc5KSkgPyB0aGlzW3QoMTkzKV0oXzB4MjA3OTdhW3QoMTc0KV0odGhpc1t0KDE3OCldLmdldEl0ZW0odGhpc1t0KDE3NyldKSkpIDogdGhpc1t0KDE5MyldKEpTT05bdCgxNzQpXSh0aGlzLmxvY2FsU3RvcmFnZVt0KDE4MildKHRoaXNbdCgxNzcpXSkpKSwgdGhpcy5zZXRJdGVtKFsuLi5KU09OW3QoMTc0KV0odGhpc1t0KDE5MSldW3QoMTgyKV0odGhpc1t0KDE3NyldKSksIC4uLkpTT05bdCgxNzQpXSh0aGlzW3QoMTc4KV1bdCgxODIpXSh0aGlzW3QoMTc3KV0pKV0uZmlsdGVyKCgobiwgZSwgcikgPT4gclt0KDE4MSldKChlID0+IEpTT05bdCgxNzYpXShlKSA9PT0gSlNPTlt0KDE3NildKG4pKSkgPT09IGUpKSksIEpTT05bdCgxNzQpXSh0aGlzW3QoMTkxKV1bdCgxODIpXSh0aGlzW3QoMTc3KV0pKVxyXG5cdFx0fSBbYnQoMTczKV0odCwgbikge1xyXG5cdFx0XHRjb25zdCBlID0gYnQsXHJcblx0XHRcdFx0ciA9IHRoaXNbZSgxNzIpXSgpO1xyXG5cdFx0XHRyW2UoMTk0KV0oe1xyXG5cdFx0XHRcdGV2ZW50X25hbWU6IHQsXHJcblx0XHRcdFx0Li4ublxyXG5cdFx0XHR9KSwgdGhpcy5zZXRJdGVtKHIpXHJcblx0XHR9IFtidCgxOTMpXSh0KSB7XHJcblx0XHRcdGNvbnN0IG4gPSBidDtcclxuXHRcdFx0dGhpc1tuKDE3OCldW24oMTkzKV0odGhpc1tuKDE3NyldLCBKU09OW24oMTc2KV0odCkpLCB0aGlzW24oMTkxKV1bbigxOTMpXSh0aGlzW24oMTc3KV0sIEpTT05bbigxNzYpXSh0KSlcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc3QgT3QgPSBBdDtcclxuXHJcblx0ZnVuY3Rpb24gQXQodCwgbikge1xyXG5cdFx0Y29uc3QgZSA9IHh0KCk7XHJcblx0XHRyZXR1cm4gKEF0ID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSAzOTddXHJcblx0XHR9KSh0LCBuKVxyXG5cdH0gISBmdW5jdGlvbiAodCkge1xyXG5cdFx0Y29uc3QgbiA9IEF0LFxyXG5cdFx0XHRlID0gdCgpO1xyXG5cdFx0Zm9yICg7IDspIHRyeSB7XHJcblx0XHRcdGlmICg4ODU2MTkgPT09IC1wYXJzZUludChuKDQ0OSkpIC8gMSArIHBhcnNlSW50KG4oNDEyKSkgLyAyICsgcGFyc2VJbnQobig0ODMpKSAvIDMgKiAoLXBhcnNlSW50KG4oNDQ1KSkgLyA0KSArIC1wYXJzZUludChuKDQyMikpIC8gNSArIHBhcnNlSW50KG4oNDY3KSkgLyA2ICsgLXBhcnNlSW50KG4oNDA2KSkgLyA3ICsgcGFyc2VJbnQobig0NzIpKSAvIDgpIGJyZWFrO1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fVxyXG5cdH0oeHQpO1xyXG5cdGNsYXNzIEN0IHtcclxuXHRcdGNvbnN0cnVjdG9yKHQpIHtcclxuXHRcdFx0Y29uc3QgbiA9IEF0LFxyXG5cdFx0XHRcdGUgPSB7XHJcblx0XHRcdFx0XHRvbVZlWDogbig0MjEpLFxyXG5cdFx0XHRcdFx0SXRyQkM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICsgblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRjU29FOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCArIG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHIgPSBlW24oNDg2KV1bbig0MzMpXShcInxcIik7XHJcblx0XHRcdGxldCBpID0gMDtcclxuXHRcdFx0Zm9yICg7IDspIHtcclxuXHRcdFx0XHRzd2l0Y2ggKHJbaSsrXSkge1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjBcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tuKDQ0MCldID0gbmV3IE50KGUuSXRyQkMoZS5kY1NvRSh0aGlzW24oNDU2KV0sIFwiLVwiKSwgdGhpcy5hcHBNb2R1bGVbbig0ODQpXSgpKSk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjFcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tuKDQ4OCldID0gdDtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRjYXNlIFwiMlwiOlxyXG5cdFx0XHRcdFx0XHR0aGlzW24oNDAxKV0gPSAwO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCIzXCI6XHJcblx0XHRcdFx0XHRcdHRoaXNbbigzOTgpXSA9IDJlMztcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRjYXNlIFwiNFwiOlxyXG5cdFx0XHRcdFx0XHR0aGlzW24oNDUxKV0gPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCI1XCI6XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFja29mZiA9IDE7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjZcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tuKDQ1NildID0gcztcclxuXHRcdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aW5pdCgpIHtcclxuXHRcdFx0Y29uc3QgdCA9IEF0LFxyXG5cdFx0XHRcdG4gPSB7XHJcblx0XHRcdFx0XHRMcWVvejogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQobilcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRGcGZMczogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT0gblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFVCb3R0OiBcImNvbXBsZXRlXCIsXHJcblx0XHRcdFx0XHRtQmJrUjogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlZWFtdjogdCgzOTkpLFxyXG5cdFx0XHRcdFx0RERLWEY6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0aE55clI6IHQoNDE3KSxcclxuXHRcdFx0XHRcdGRRQktROiBcIm9IVm1DXCJcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRpZiAoblt0KDQ3NyldKGRvY3VtZW50LnJlYWR5U3RhdGUsIHQoNDUyKSkpIHtcclxuXHRcdFx0XHRpZiAoblt0KDQ0MyldKG5bdCg0MzcpXSwgblt0KDQyMCldKSkgcmV0dXJuIHRoaXMuc3RhcnRCYXRjaGluZygpLCB2b2lkIG4uTHFlb3ooXzB4MmNkNzg1LCBfMHgyZDlkMjQpO1xyXG5cdFx0XHRcdHRoaXNbdCg0MTUpXSgpXHJcblx0XHRcdH0gZWxzZSBkb2N1bWVudFt0KDQ0MSldID0gKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGUgPSB0O1xyXG5cdFx0XHRcdGlmIChuW2UoNDY0KV0oZG9jdW1lbnRbZSg0NTgpXSwgbltlKDQ3MyldKSkge1xyXG5cdFx0XHRcdFx0aWYgKCFuLm1CYmtSKG5bZSg0MzEpXSwgbltlKDQzMSldKSkgcmV0dXJuIHZvaWQgdGhpc1tlKDQ4MSldKCk7XHJcblx0XHRcdFx0XHR0aGlzW2UoNDE1KV0oKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBbT3QoNDE1KV0oKSB7XHJcblx0XHRcdGNvbnN0IHQgPSBPdCxcclxuXHRcdFx0XHRuID0ge1xyXG5cdFx0XHRcdFx0VWRsekc6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4pXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bWFHZGM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID49IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRab1lCTzogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQobilcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRSZFFLaTogdCg0ODApXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0bGV0IGUgPSAwO1xyXG5cdFx0XHRpZiAodGhpc1t0KDQ4OCldW3QoNDA1KV0oKSwgdGhpc1t0KDQ4OCldW3QoNDYyKV0oby5JTklUKSwgdm9pZCAwICE9PSB0aGlzLmFwcE1vZHVsZS50YXNrU29sdXRpb24pIHRoaXNbdCg0ODEpXSgpO1xyXG5cdFx0XHRlbHNlIGlmIChuW3QoNDQ2KV0gPT09IHQoNDgwKSkge1xyXG5cdFx0XHRcdGNvbnN0IHIgPSBzZXRJbnRlcnZhbCgoKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgcyA9IHQ7XHJcblx0XHRcdFx0XHRpZiAodm9pZCAwICE9PSB0aGlzW3MoNDg4KV1bcyg0MDgpXSkgdGhpcy5zdGFydEJhdGNoaW5nKCksIG5bcyg0NjUpXShjbGVhckludGVydmFsLCByKTtcclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAobltzKDQ2MyldKGUrKywgMykpIHJldHVybiB0aGlzW3MoNDgxKV0oKSwgdm9pZCBuW3MoNDE2KV0oY2xlYXJJbnRlcnZhbCwgcik7XHJcblx0XHRcdFx0XHRcdHRoaXNbcyg0ODgpXS5zb2x2ZVRhc2soKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLCAxZTMpXHJcblx0XHRcdH0gZWxzZSBfMHg0MWQ2NjMuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgXzB4NTVmMzRlKVxyXG5cdFx0fSBbT3QoNDI1KV0oKSB7XHJcblx0XHRcdGNvbnN0IHQgPSBPdCxcclxuXHRcdFx0XHRuID0ge1xyXG5cdFx0XHRcdFx0Z2pucUM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRYalBERzogdCg0NTIpLFxyXG5cdFx0XHRcdFx0S3RzVEU6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZG1RRXE6IFwiYlV0V1JcIixcclxuXHRcdFx0XHRcdHBRcWRPOiB0KDM5NylcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRudWxsICE9PSB0aGlzW3QoNDUxKV0gJiYgKG5bdCg0ODcpXShuW3QoNDU0KV0sIG5bdCg0ODIpXSkgPyBuLmdqbnFDKF8weDFhNzc5Ylt0KDQ1OCldLCBuLlhqUERHKSAmJiB0aGlzLnN0YXJ0QmF0Y2hpbmdXaXRoSW50ZXJ2YWwoKSA6IChjbGVhckludGVydmFsKHRoaXNbdCg0NTEpXSksIHRoaXNbdCg0NTEpXSA9IG51bGwpKVxyXG5cdFx0fSBbT3QoNDc5KV0odCwgbikge1xyXG5cdFx0XHRjb25zdCBlID0gT3QsXHJcblx0XHRcdFx0ciA9IHtcclxuXHRcdFx0XHRcdGNIbWlIOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCA9PT0gblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdEZqRFVnOiBlKDQ1MiksXHJcblx0XHRcdFx0XHRxblpTZjogZnVuY3Rpb24gKHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQoKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHlWb011OiBmdW5jdGlvbiAodCwgbiwgZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdChuLCBlKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdGlmIChyLmNIbWlIKGRvY3VtZW50W2UoNDU4KV0sIFwiY29tcGxldGVcIikpIHRoaXNbZSg0NDApXVtlKDQzNildKHQsIG4pO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zdCBzID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpc1tlKDQ0MCldLmFkZFRvU3RvcmFnZSh0LCBuKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cltlKDQ2OCldKHNldFRpbWVvdXQsICgoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB0ID0gZTtcclxuXHRcdFx0XHRcdHIuY0htaUgoZG9jdW1lbnRbdCg0NTgpXSwgclt0KDQwMCldKSA/IHJbdCg0MTkpXShzKSA6IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzKVxyXG5cdFx0XHRcdH0pLCAwKVxyXG5cdFx0XHR9XHJcblx0XHR9IFtPdCg0ODEpXSgpIHtcclxuXHRcdFx0Y29uc3QgdCA9IE90LFxyXG5cdFx0XHRcdG4gPSB7XHJcblx0XHRcdFx0XHRkdkhoaTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRVWmFxZTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRIa0hWQTogXCJnUFdoT1wiXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0dGhpc1t0KDQ4OCldLnNvbHZlVGFzaygpLCBuW3QoNDAyKV0odGhpcy5pbnRlcnZhbElkLCBudWxsKSAmJiAoblt0KDQzNCldKG5bdCg0MjQpXSwgblt0KDQyNCldKSA/IHRoaXMuaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKCkgPT4gdGhpcy5wcm9jZXNzUXVldWUoKSksIHRoaXNbdCgzOTgpXSkgOiB0aGlzW3QoNDc1KV0oXzB4M2U1ZGU0W3QoNDU5KV0oMCwgMjApKSlcclxuXHRcdH0gW090KDQxMCldKCkge1xyXG5cdFx0XHRjb25zdCB0ID0gT3QsXHJcblx0XHRcdFx0biA9IHRoaXNbdCg0NDApXVt0KDQ1MCldKCk7XHJcblx0XHRcdDAgIT09IG5bdCg0NTUpXSAmJiB3aW5kb3dbdCg0MzkpXVt0KDQ0NyldICYmIHRoaXNbdCg0NzUpXShuW3QoNDU5KV0oMCwgMjApKVxyXG5cdFx0fVxyXG5cdFx0c2VuZEJhdGNoKHQpIHtcclxuXHRcdFx0Y29uc3QgbiA9IE90LFxyXG5cdFx0XHRcdGUgPSB7XHJcblx0XHRcdFx0XHRJakZZTzogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgKyBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0RVlUdEM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ID09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRMUkR2ejogXCJjb21wbGV0ZVwiLFxyXG5cdFx0XHRcdFx0VGlZek46IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0RWxWdW86IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0KG4pXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0WlhITVc6IG4oNDMyKSxcclxuXHRcdFx0XHRcdEZxVGpPOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCA9PT0gblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGxQUVZnOiBuKDQxMSksXHJcblx0XHRcdFx0XHRKbEdPUjogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRQTW54ZDogXCJZak5IaFwiLFxyXG5cdFx0XHRcdFx0YndQSnM6IG4oNDA5KSxcclxuXHRcdFx0XHRcdENPUk9VOiBuKDQ1MyksXHJcblx0XHRcdFx0XHRRREV4VTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPCBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dlFWd2w6IFwiMjAzXCIsXHJcblx0XHRcdFx0XHRmRVVMbjogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgPiBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0UXdZbHU6IG4oNDEzKSxcclxuXHRcdFx0XHRcdGVHUGl3OiBuKDQ0NClcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnN0b3BCYXRjaGluZygpLCB0aGlzW24oNDg4KV1bbig0ODkpXSh0KVtuKDQwMyldKChyID0+IHtcclxuXHRcdFx0XHRjb25zdCBzID0gbixcclxuXHRcdFx0XHRcdGkgPSB7XHJcblx0XHRcdFx0XHRcdFlacFB6OiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBlLkVZVHRDKHQsIG4pXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHFreGl6OiBlW3MoNDYxKV0sXHJcblx0XHRcdFx0XHRcdFJhZ2luOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBlLlRpWXpOKHQsIG4pXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdE1ScFNLOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBlW3MoNDI4KV0odCwgbilcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRpZiAoZVtzKDQyOSldKGVbcyg0NzEpXSwgZS5aWEhNVykpIHRoaXNbcyg0NDApXS5hZGRUb1N0b3JhZ2UoXzB4MTZkMDg2LCBfMHg2NDcxYzQpO1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKGUuRnFUak8oZS5FbFZ1byhTdHJpbmcsIHIuc3RhdHVzKSwgcyg0MjYpKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZVtzKDQyOSldKHMoNDI3KSwgZVtzKDQ0MildKSkgcmV0dXJuIHZvaWQgdGhpcy5zdGFydEJhdGNoaW5nKCk7IHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0cXNSZUM6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpW3MoNDA3KV0odCwgbilcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHR6YWxoWjogaS5xa3hpelxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XzB4ZTI1YzBmW3MoNDQxKV0gPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBuID0gcztcclxuXHRcdFx0XHRcdFx0XHRcdHRbbig0ODUpXShfMHgyNjk4MTlbbig0NTgpXSwgdC56YWxoWikgJiYgdGhpcy5zdGFydEJhdGNoaW5nV2l0aEludGVydmFsKClcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChlW3MoNDMwKV0oZVtzKDQyOCldKFN0cmluZywgcltzKDQ5MCldKVswXSwgXCI0XCIpKSB7XHJcblx0XHRcdFx0XHRcdGlmICghZVtzKDQyOSldKHMoNDYwKSwgZVtzKDQyMyldKSkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRpLlJhZ2luKHRoaXNbcyg0NTEpXSwgbnVsbCkgJiYgKGlbcyg0NDgpXShfMHgxOTcxNGMsIHRoaXNbcyg0NTEpXSksIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGwpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoXCI1XCIgPT09IFN0cmluZyhyW3MoNDkwKV0pWzBdKSB7XHJcblx0XHRcdFx0XHRcdGlmIChlW3MoNDI5KV0oZVtzKDQzOCldLCBlLkNPUk9VKSkgcmV0dXJuIHZvaWQgKGVbcyg0MDQpXSh0aGlzW3MoNDY5KV0sIDUpICYmICh0aGlzW3MoNDY5KV0rKywgdGhpc1tzKDM5OCldID0gMi43MSAqIHRoaXNbcygzOTgpXSwgdGhpc1tzKDQ4MSldKCkpKTtcclxuXHRcdFx0XHRcdFx0dGhpc1tzKDQ0MCldW3MoNDM2KV0oXzB4NDM4Y2ExLCBfMHgyYjgwZjcpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAodGhpc1tzKDQ2OSldID0gMSwgdGhpc1tzKDM5OCldID0gMmUzLCBlW3MoNDMwKV0oU3RyaW5nKHJbcyg0OTApXSksIGVbcyg0NzQpXSkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXNbcyg0MDEpXSsrLCB0aGlzW3MoNDg4KV1bcyg0MDgpXSA9IHZvaWQgMCwgIWUuZkVVTG4odGhpc1tzKDQwMSldLCAzKSkgcmV0dXJuIHRoaXNbcyg0ODgpXS5zb2x2ZVRhc2soKSwgdm9pZCB0aGlzW3MoNDgxKV0oKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFlW3MoNDI5KV0oZVtzKDQ1NyldLCBlW3MoNDU3KV0pKSByZXR1cm4gdm9pZCB0aGlzLnN0YXJ0QmF0Y2hpbmcoKTtcclxuXHRcdFx0XHRcdFx0dGhpc1tzKDQ2OSldID0gMSwgdGhpc1tzKDQ1MSldID0gbnVsbCwgdGhpc1tzKDM5OCldID0gMmUzLCB0aGlzW3MoNDAxKV0gPSAwLCB0aGlzW3MoNDU2KV0gPSBfMHgxMmExNjYsIHRoaXNbcyg0ODgpXSA9IF8weDQ5MjZkZCwgdGhpc1tzKDQ0MCldID0gbmV3IF8weDRhY2QzMChlLklqRllPKGVbcyg0MTQpXSh0aGlzW3MoNDU2KV0sIFwiLVwiKSwgdGhpcy5hcHBNb2R1bGVbcyg0ODQpXSgpKSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMudGFza1JldHJ5ID0gMCwgdGhpcy5zdG9yYWdlW3MoNDc2KV0odGhpc1tzKDQ0MCldW3MoNDUwKV0oKVtzKDQ2NildKChuID0+ICF0W3MoNDM1KV0oKHQgPT4gSlNPTltzKDQ3MCldKG4pID09PSBKU09OW3MoNDcwKV0odCkpKSkpKSwgdGhpc1tzKDQ4MSldKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLCAodCA9PiB7XHJcblx0XHRcdFx0Y29uc3QgciA9IG47XHJcblx0XHRcdFx0aWYgKGVbcig0MTgpXSAhPSBlW3IoNDE4KV0pIHJldHVybiB0aGlzW3IoNDg4KV1bcig0MDUpXSgpLCB2b2lkIHRoaXMuc3RhcnRCYXRjaGluZygpO1xyXG5cdFx0XHRcdGNvbnNvbGVbcig0NzgpXSh0KSwgdGhpc1tyKDQ4MSldKClcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB4dCgpIHtcclxuXHRcdGNvbnN0IHQgPSBbXCJVcGlLR1wiLCBcImVHUGl3XCIsIFwicW5aU2ZcIiwgXCJkUUJLUVwiLCBcIjV8NHwzfDJ8NnwxfDBcIiwgXCI3OTQwODcwcHhuRGF3XCIsIFwiUE1ueGRcIiwgXCJIa0hWQVwiLCBcInN0b3BCYXRjaGluZ1wiLCBcIjQyOVwiLCBcInlpcHJyXCIsIFwiRWxWdW9cIiwgXCJUaVl6TlwiLCBcIkpsR09SXCIsIFwiZWVhbXZcIiwgXCJVd3lpb1wiLCBcInNwbGl0XCIsIFwiVVphcWVcIiwgXCJzb21lXCIsIFwiYWRkVG9TdG9yYWdlXCIsIFwiaE55clJcIiwgXCJid1BKc1wiLCBcIm5hdmlnYXRvclwiLCBcInN0b3JhZ2VcIiwgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgXCJsUFFWZ1wiLCBcIkRES1hGXCIsIFwicVFEa1ZcIiwgXCIxMDcxMm1XT25zb1wiLCBcIlJkUUtpXCIsIFwib25MaW5lXCIsIFwiTVJwU0tcIiwgXCI5NDYwNDdNY3dGWEFcIiwgXCJnZXRCYXRjaFwiLCBcImludGVydmFsSWRcIiwgXCJjb21wbGV0ZVwiLCBcIlVGb3FUXCIsIFwiZG1RRXFcIiwgXCJsZW5ndGhcIiwgXCJCQVRDSF9LRVlcIiwgXCJRd1lsdVwiLCBcInJlYWR5U3RhdGVcIiwgXCJzbGljZVwiLCBcIllqTkhoXCIsIFwiTFJEdnpcIiwgXCJjb2xsZWN0RXZlbnRcIiwgXCJtYUdkY1wiLCBcIkZwZkxzXCIsIFwiVWRsekdcIiwgXCJmaWx0ZXJcIiwgXCI4MzQ2NjM2TXVpSXRWXCIsIFwieVZvTXVcIiwgXCJiYWNrb2ZmXCIsIFwic3RyaW5naWZ5XCIsIFwiWlhITVdcIiwgXCI2ODI3Mjk2bU9GaFhtXCIsIFwiVUJvdHRcIiwgXCJ2UVZ3bFwiLCBcInNlbmRCYXRjaFwiLCBcInNldEl0ZW1cIiwgXCJtQmJrUlwiLCBcImxvZ1wiLCBcImNvbGxlY3RcIiwgXCJYV3NwSlwiLCBcInN0YXJ0QmF0Y2hpbmdcIiwgXCJwUXFkT1wiLCBcIjQyb2Z1TkpPXCIsIFwiZ2V0QXBpVG9rZW5cIiwgXCJxc1JlQ1wiLCBcIm9tVmVYXCIsIFwiS3RzVEVcIiwgXCJhcHBNb2R1bGVcIiwgXCJyZWNvcmRFdmVudHNcIiwgXCJzdGF0dXNcIiwgXCJtdFBZYlwiLCBcImJhdGNoSW50ZXJ2YWxcIiwgXCJZeFRQVVwiLCBcIkZqRFVnXCIsIFwidGFza1JldHJ5XCIsIFwiZHZIaGlcIiwgXCJ0aGVuXCIsIFwiUURFeFVcIiwgXCJzb2x2ZVRhc2tcIiwgXCI3NjA2OTBsZmNSYnlcIiwgXCJZWnBQelwiLCBcInRhc2tTb2x1dGlvblwiLCBcImtCV1hTXCIsIFwicHJvY2Vzc1F1ZXVlXCIsIFwibnFZenRcIiwgXCIyNjQyOTY4ZU1HeW9aXCIsIFwid1NaVGtcIiwgXCJJakZZT1wiLCBcInN0YXJ0QmF0Y2hpbmdXaXRoSW50ZXJ2YWxcIiwgXCJab1lCT1wiXTtcclxuXHRcdHJldHVybiAoeHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0XHJcblx0XHR9KSgpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBSdCh0LCBuKSB7XHJcblx0XHR2YXIgZSA9IFV0KCk7XHJcblx0XHRyZXR1cm4gKFJ0ID0gZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0cmV0dXJuIGVbdCAtPSAzODJdXHJcblx0XHR9KSh0LCBuKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gVXQoKSB7XHJcblx0XHR2YXIgdCA9IFtcIjUwODg4NEV5dFV4UFwiLCBcInBOVmlaXCIsIFwiclp3elVcIiwgXCJpbml0XCIsIFwidGFza1BhcmFtc1wiLCBcImRhdGFcIiwgXCI3NU5zaGJuY1wiLCBcIlluc3BOXCIsIFwiYlhiYVBcIiwgXCJnd0d3T1wiLCBcInRleHRcIiwgXCJ1ZldOY1wiLCBcIlRYUWd2XCIsIFwiYXBwTW9kdWxlXCIsIFwiVkxMVldcIiwgXCJrdUJibFwiLCBcInRhc2tTb2x1dGlvblwiLCBcImNyZWF0ZU9iamVjdFVSTFwiLCBcIndvcmtlclwiLCBcIkJFU01LXCIsIFwiMjIxMDJMZ0tnSEZcIiwgXCJvbm1lc3NhZ2VcIiwgXCJkY2VtYlwiLCBcIjk3MzM1NllkSGNlWlwiLCBcInNPb0FDXCIsIFwiNDAwNDRIdllPaUNcIiwgXCI4NTB1VkNqU1JcIiwgXCJJbENWcFwiLCBcInNldE5ld0FyZ3NcIiwgXCJJbU54VlwiLCBcIjIxNDJhU1dWUkpcIiwgXCJwb3N0TWVzc2FnZVwiLCBcIkdNTGdMXCIsIFwiMTA3NjBubUpDUEtcIiwgXCJQSVpXQ1wiLCBcImMzZTA2OGViZjExODQwZWQzZmMzMTFhNmYyZGY4MGIyMGZhMDVkMjVcIiwgXCJVQnRDVVwiLCBcIjEwNzM0M2tBd0ViUVwiLCBcInRoZW5cIiwgXCJhZWU3YzkzYTlhZTc5MzBmYjE5NzMyMzI1ZDJjNTYwYzUzODQ5YWE3XCIsIFwib05jTUlcIiwgXCJxQlBEb1wiLCBcInFlbWx5XCIsIFwiNzMyNElYaFZOS1wiLCBcImJsb2JcIiwgXCJzb2x2ZVRhc2tcIl07XHJcblx0XHRyZXR1cm4gKFV0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0fSkoKVxyXG5cdH1cclxuXHR2YXIgUHQgPSBSdDtcclxuXHQhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRmb3IgKHZhciBuID0gUnQsIGUgPSB0KCk7IDspIHRyeSB7XHJcblx0XHRcdGlmICgyNjI1NDggPT09IHBhcnNlSW50KG4oNDI0KSkgLyAxICsgcGFyc2VJbnQobigzODMpKSAvIDIgKyAtcGFyc2VJbnQobig0MjcpKSAvIDMgKyAtcGFyc2VJbnQobig0MDEpKSAvIDQgKiAoLXBhcnNlSW50KG4oNDEwKSkgLyA1KSArIC1wYXJzZUludChuKDQwNCkpIC8gNiArIC1wYXJzZUludChuKDM4OCkpIC8gNyAqIChwYXJzZUludChuKDM5MSkpIC8gOCkgKyBwYXJzZUludChuKDM5NSkpIC8gOSAqIChwYXJzZUludChuKDM4NCkpIC8gMTApKSBicmVhaztcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH0gY2F0Y2ggKHIpIHtcclxuXHRcdFx0ZS5wdXNoKGUuc2hpZnQoKSlcclxuXHRcdH1cclxuXHR9KFV0KTtcclxuXHRjbGFzcyBEdCB7XHJcblx0XHRjb25zdHJ1Y3Rvcih0KSB7XHJcblx0XHRcdHRoaXNbUnQoNDE3KV0gPSB0XHJcblx0XHR9XHJcblx0XHRhc3luYyBbUHQoNDA3KV0oKSB7XHJcblx0XHRcdHZhciB0ID0gUHQsXHJcblx0XHRcdFx0biA9IHtcclxuXHRcdFx0XHRcdEVmV3JjOiBcIkx2eERZXCIsXHJcblx0XHRcdFx0XHRJbENWcDogdCgzOTgpLFxyXG5cdFx0XHRcdFx0cUJQRG86IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICsgblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGd3R3dPOiB0KDM5NyksXHJcblx0XHRcdFx0XHRzT29BQzogdCgzOTApLFxyXG5cdFx0XHRcdFx0aVZjT1U6IFwiQ0VwRWpcIixcclxuXHRcdFx0XHRcdHJad3pVOiBmdW5jdGlvbiAodCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCgpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0VkxMVlc6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0cE5WaVo6IHQoMzkyKSxcclxuXHRcdFx0XHRcdHVmV05jOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFRPdVNIOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdCArIG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRrdUJibDogdCgzOTMpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChhc3luYyAociwgcykgPT4ge1xyXG5cdFx0XHRcdHZhciBpID0gdCxcclxuXHRcdFx0XHRcdG8gPSB7XHJcblx0XHRcdFx0XHRcdEltTnhWOiBuW2koMzgyKV0sXHJcblx0XHRcdFx0XHRcdEJFU01LOiBuLmlWY09VLFxyXG5cdFx0XHRcdFx0XHRvVkFEaTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdChuKVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRZbnNwTjogZnVuY3Rpb24gKHQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbltpKDQwNildKHQpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG5baSg0MTgpXShuW2koNDA1KV0sIGkoMzkyKSkgPyB0aGlzW2koNDE3KV0udGFza1NvbHV0aW9uID0gXzB4NTc1N2MyW2koNDA5KV0gOiBhd2FpdCBuW2koNDE1KV0oZmV0Y2gsIG4uVE91U0goZSwgbltpKDQxOSldKSlbaSgzOTYpXSgoYXN5bmMgdCA9PiB7XHJcblx0XHRcdFx0XHRcdHZhciBzID0gaSxcclxuXHRcdFx0XHRcdFx0XHRhID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGNlbWI6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0bi5FZldyYyAhPT0gbltzKDM4NSldID8gKHRoaXMud29ya2VyID0gbmV3IFdvcmtlcihVUkxbcyg0MjEpXShhd2FpdCB0W3MoNDAyKV0oKSkpLCBhd2FpdCBmZXRjaChuW3MoMzk5KV0oZSwgbltzKDQxMyldKSlbcygzOTYpXSgoYXN5bmMgdCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG4gPSBzO1xyXG5cdFx0XHRcdFx0XHRcdG9bbigzODcpXSAhPT0gb1tuKDQyMyldID8gKHRoaXMuYXBwTW9kdWxlW24oNDA4KV0gPSBvLm9WQURpKFN0cmluZywgYXdhaXQgdFtuKDQxNCldKCkpLCB0aGlzW24oNDIyKV1bbig0MjUpXSA9IHQgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGUgPSBuO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hcHBNb2R1bGVbZSg0MjApXSA9IHQuZGF0YVxyXG5cdFx0XHRcdFx0XHRcdH0sIG9bbig0MTEpXShyKSkgOiBhW24oNDI2KV0odGhpc1tuKDQyMildLCB2b2lkIDApICYmIHRoaXNbbig0MjIpXVtuKDM4OSldKHRoaXMuYXBwTW9kdWxlW24oNDA4KV0pXHJcblx0XHRcdFx0XHRcdH0pKSkgOiAodGhpc1tzKDQxNyldW3MoNDA4KV0gPSBfMHg1NWVjZDUsIHRoaXNbcyg0MDMpXSgpKVxyXG5cdFx0XHRcdFx0fSkpXHJcblx0XHRcdFx0fSBjYXRjaCAoYSkge1xyXG5cdFx0XHRcdFx0cyhhKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpXHJcblx0XHR9IFtQdCgzODYpXSh0KSB7XHJcblx0XHRcdHZhciBuID0gUHQ7XHJcblx0XHRcdHRoaXMuYXBwTW9kdWxlW24oNDA4KV0gPSB0LCB0aGlzW24oNDAzKV0oKVxyXG5cdFx0fVxyXG5cdFx0c29sdmVUYXNrKCkge1xyXG5cdFx0XHR2YXIgdCA9IFB0LFxyXG5cdFx0XHRcdG4gPSB7XHJcblx0XHRcdFx0XHRxZW1seTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQobilcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRiWGJhUDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRVQnRDVTogdCg0MTYpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0blt0KDQxMildKHRoaXMud29ya2VyLCB2b2lkIDApICYmIChuW3QoMzk0KV0gPT0gblt0KDM5NCldID8gdGhpcy53b3JrZXJbdCgzODkpXSh0aGlzW3QoNDE3KV1bdCg0MDgpXSkgOiBuW3QoNDAwKV0oXzB4YTc5MWZhLCBfMHgxMjcxNzEpKVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIga3QgPSBMdDtcclxuXHJcblx0ZnVuY3Rpb24gTHQodCwgbikge1xyXG5cdFx0dmFyIGUgPSBCdCgpO1xyXG5cdFx0cmV0dXJuIChMdCA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gNDQ0XVxyXG5cdFx0fSkodCwgbilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIEJ0KCkge1xyXG5cdFx0dmFyIHQgPSBbXCJzb2x2ZVRhc2tcIiwgXCJhcGlUb2tlblwiLCBcImJhdGNoU2VydmljZVwiLCBcIjUxODE2MjRWdmlpeWdcIiwgXCJpbml0XCIsIFwiY29sbGVjdEV2ZW50XCIsIFwibmV0d29ya0NvbnRyb2xsZXJcIiwgXCJ0aGVuXCIsIFwicmVjb3JkRXZlbnRcIiwgXCIzNTY1NTY4bHRhZ0VzXCIsIFwic2Vzc2lvbkNvbnRyb2xsZXJcIiwgXCJyZWNvcmRFdmVudHNcIiwgXCJhcHBOYW1lXCIsIFwic3BsaXRcIiwgXCI2MTc4OGdEQWtUZ1wiLCBcIjUyMzQ2MTZhaW14T1BcIiwgXCJhc3NlbWJsZUV2ZW50U2Vzc2lvblwiLCBcImNvbGxlY3RcIiwgXCJVamxnY1wiLCBcIjI1NDg3NjNaWHRObHVcIiwgXCJnZXRVc2VyRGF0YVwiLCBcInJlZ2lzdGVySW52b2ljZVwiLCBcImNvbGxlY3RUYXBwc0V2ZW50XCIsIFwiaHVtYW5Qcm9vZlNlcnZpY2VcIiwgXCJhbmFseXRpY3NDb250cm9sbGVyXCIsIFwiMjY3MzA0QmlsSEtMXCIsIFwiZ2V0QXBpVG9rZW5cIiwgXCJzZXROZXdBcmdzXCIsIFwiZ2V0QXBwTmFtZVwiLCBcIjQ1OTQyMTVtVXJYYk5cIiwgXCJlbnZcIiwgXCIzOG56THhIbFwiXTtcclxuXHRcdHJldHVybiAoQnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0XHJcblx0XHR9KSgpXHJcblx0fSAhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRmb3IgKHZhciBuID0gTHQsIGUgPSB0KCk7IDspIHRyeSB7XHJcblx0XHRcdGlmICg0NzY4MTcgPT09IHBhcnNlSW50KG4oNDUzKSkgLyAxICsgcGFyc2VJbnQobig0NTkpKSAvIDIgKiAoLXBhcnNlSW50KG4oNDc0KSkgLyAzKSArIC1wYXJzZUludChuKDQ2OSkpIC8gNCArIHBhcnNlSW50KG4oNDU3KSkgLyA1ICsgcGFyc2VJbnQobig0NjMpKSAvIDYgKyBwYXJzZUludChuKDQ0NykpIC8gNyArIC1wYXJzZUludChuKDQ3NSkpIC8gOCkgYnJlYWs7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9IGNhdGNoIChyKSB7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9XHJcblx0fShCdCk7XHJcblx0Y2xhc3MgVnQge1xyXG5cdFx0Y29uc3RydWN0b3IodCwgbiwgZSkge1xyXG5cdFx0XHRmb3IgKHZhciByID0gTHQsIHMgPSB7XHJcblx0XHRcdFx0VWpsZ2M6IFwiNnwyfDR8NXwzfDB8N3wxXCJcclxuXHRcdFx0fVtyKDQ0NildW3IoNDczKV0oXCJ8XCIpLCBpID0gMDsgOykge1xyXG5cdFx0XHRcdHN3aXRjaCAoc1tpKytdKSB7XHJcblx0XHRcdFx0XHRjYXNlIFwiMFwiOlxyXG5cdFx0XHRcdFx0XHR0aGlzLm5ldHdvcmtDb250cm9sbGVyID0gbmV3IHoodGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjFcIjpcclxuXHRcdFx0XHRcdFx0dGhpcy5iYXRjaFNlcnZpY2UgPSBuZXcgQ3QodGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjJcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tyKDQ2MSldID0gdDtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRjYXNlIFwiM1wiOlxyXG5cdFx0XHRcdFx0XHR0aGlzW3IoNDcwKV0gPSBuZXcgU3QodGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjRcIjpcclxuXHRcdFx0XHRcdFx0dGhpc1tyKDQ3MildID0gbjtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRjYXNlIFwiNVwiOlxyXG5cdFx0XHRcdFx0XHR0aGlzLmh1bWFuUHJvb2ZTZXJ2aWNlID0gbmV3IER0KHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGNhc2UgXCI2XCI6XHJcblx0XHRcdFx0XHRcdHRoaXNbcig0NTgpXSA9IGU7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIjdcIjpcclxuXHRcdFx0XHRcdFx0dGhpcy5hbmFseXRpY3NDb250cm9sbGVyID0gbmV3IEModGhpcyk7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGFzeW5jIGluaXQoKSB7XHJcblx0XHRcdHZhciB0ID0gTHQ7XHJcblx0XHRcdHRoaXMuc2Vzc2lvbkNvbnRyb2xsZXJbdCg0NjQpXSgpLCBhd2FpdCB0aGlzW3QoNDUyKV1bdCg0NjQpXSgpLCBhd2FpdCB0aGlzW3QoNDUxKV1bdCg0NjQpXSgpW3QoNDY3KV0oKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzW3QoNDYwKV0oKVxyXG5cdFx0XHR9KSlcclxuXHRcdFx0XHQuY2F0Y2goKHQgPT4gY29uc29sZS5lcnJvcih0KSkpLCB0aGlzW3QoNDY2KV1bdCg0NjQpXSgpLCB0aGlzW3QoNDYyKV0uaW5pdCgpXHJcblx0XHR9IFtrdCg0NDQpXSgpIHtcclxuXHRcdFx0dmFyIHQgPSBrdDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2Vzc2lvbkNvbnRyb2xsZXJbdCg0NDQpXSgpXHJcblx0XHR9XHJcblx0XHRyZWNvcmRFdmVudCh0LCBuLCBlKSB7XHJcblx0XHRcdHZhciByID0ga3Q7XHJcblx0XHRcdHJldHVybiB0aGlzW3IoNDY2KV1bcig0NjgpXSh0LCBuLCBlKVxyXG5cdFx0fVxyXG5cdFx0cmVjb3JkRXZlbnRzKHQpIHtcclxuXHRcdFx0dmFyIG4gPSBrdDtcclxuXHRcdFx0cmV0dXJuIHRoaXNbbig0NjYpXVtuKDQ3MSldKHQpXHJcblx0XHR9IFtrdCg0NjUpXSh0LCBuKSB7XHJcblx0XHRcdHZhciBlID0ga3Q7XHJcblx0XHRcdHRoaXNbZSg0NjIpXVtlKDQ0NSldKHQsIHtcclxuXHRcdFx0XHQuLi5uLFxyXG5cdFx0XHRcdC4uLnRoaXNbZSg0NDQpXSgpXHJcblx0XHRcdH0pXHJcblx0XHR9IFtrdCg0NDkpXSh0KSB7XHJcblx0XHRcdHZhciBuID0ga3Q7XHJcblx0XHRcdHRoaXNbbig0NjIpXVtuKDQ0NSldKG8uSU5WT0lDRV9SRUdJU1RFUkVELCB7XHJcblx0XHRcdFx0Li4udCxcclxuXHRcdFx0XHQuLi50aGlzW24oNDQ0KV0oKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSBba3QoNDUwKV0odCwgbikge1xyXG5cdFx0XHR2YXIgZSA9IGt0O1xyXG5cdFx0XHR0aGlzW2UoNDYyKV0uY29sbGVjdCh0LCB7XHJcblx0XHRcdFx0Li4udGhpcy5zZXNzaW9uQ29udHJvbGxlcltlKDQ0NCldKCksXHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IHtcclxuXHRcdFx0XHRcdHVzZXJEYXRhOiB7XHJcblx0XHRcdFx0XHRcdC4uLnRoaXNbZSg0NzApXVtlKDQ0OCldKClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQuLi5uXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSBba3QoNDU0KV0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzW2t0KDQ2MSldXHJcblx0XHR9IFtrdCg0NTYpXSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXNba3QoNDcyKV1cclxuXHRcdH1cclxuXHRcdHNvbHZlVGFzaygpIHtcclxuXHRcdFx0dmFyIHQgPSBrdDtcclxuXHRcdFx0dGhpcy5odW1hblByb29mU2VydmljZVt0KDQ2MCldKClcclxuXHRcdH0gW2t0KDQ1NSldKHQpIHtcclxuXHRcdFx0dGhpc1trdCg0NTEpXS5zZXROZXdBcmdzKHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBHdCh0LCBuKSB7XHJcblx0XHRjb25zdCBlID0gV3QoKTtcclxuXHRcdHJldHVybiAoR3QgPSBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRyZXR1cm4gZVt0IC09IDI1MV1cclxuXHRcdH0pKHQsIG4pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBXdCgpIHtcclxuXHRcdGNvbnN0IHQgPSBbXCJpc0FycmF5XCIsIFwia3JSY2dcIiwgXCI3UmJpdlBxXCIsIFwiMTM0MTczMzBvZ09QdnZcIiwgXCJBZEtjeVwiLCBcInp6WnRmXCIsIFwic3RyaW5nXCIsIFwiaEVyek1cIiwgXCJudW1iZXJcIiwgXCJYbU1rSFwiLCBcIjExNTQxNjZic2NSV2dcIiwgXCJVYkRGWVwiLCBcImV6dUZ6XCIsICdcIiBtdXN0IGJlIGEgbnVtYmVyIGlmIHByb3ZpZGVkJywgXCJtTVpxZVwiLCBcInByaWNlc1wiLCBcIkVCbGtMXCIsIFwiT3BGbHJcIiwgXCJYc0hZeVwiLCBcIlVUQXRyXCIsIFwic25rb2pcIiwgXCJ1YVVTRVwiLCAnXCIgbXVzdCBiZSBhIGJvb2xlYW4gaWYgcHJvdmlkZWQnLCBcImRlc2NyaXB0aW9uXCIsIFwiVW9oZ1RcIiwgXCJRY1hiaVwiLCBcIjQzNjI5OTNuTEhMUERcIiwgXCJpc19mbGV4aWJsZVwiLCBcIlpKdWNGXCIsIFwiaFlDVkVcIiwgXCJsZW5ndGhcIiwgXCJzdWJzY3JpcHRpb25fcGVyaW9kXCIsIFwiQUVHZlpcIiwgXCIyMzQ4Mzg4VnN2c3JEXCIsIFwic2VuZF9waG9uZV9udW1iZXJfdG9fcHJvdmlkZXJcIiwgXCJPaEN5VVwiLCBcImxhYmVsXCIsIFwicGF5bG9hZFwiLCBcIjUwNDM5NDR3emJ1YW1cIiwgXCJuZWVkX2VtYWlsXCIsIFwieUdNWE9cIiwgXCJuZWVkX25hbWVcIiwgXCJQYXlsb2FkIGlzIHJlcXVpcmVkXCIsIFwiTm9YblpcIiwgXCIxODg1ODUwbmFLa2hEXCIsIFwidFBLTXZcIiwgXCJzZ1BCR1wiLCBcIkhmcW1yXCIsICdFYWNoIHByaWNlIG11c3QgaGF2ZSBhIFwibGFiZWxcIiBzdHJpbmcnLCBcInN1Z2dlc3RlZF90aXBfYW1vdW50c1wiLCBcIk9UcllXXCIsIFwid2lsVnZcIiwgXCJURklRYlwiLCBcInRpdGxlXCIsICdFYWNoIHByaWNlIG11c3QgaGF2ZSBhIHBvc2l0aXZlIFwiYW1vdW50XCIgbnVtYmVyJywgXCJhbW91bnRcIiwgJ0ZpZWxkIFwic3VnZ2VzdGVkX3RpcF9hbW91bnRzXCIgbXVzdCBiZSBhbiBhcnJheSBpZiBwcm92aWRlZCcsIFwic2VuZF9lbWFpbF90b19wcm92aWRlclwiLCBcInRiS0hTXCIsIFwicGhvdG9fc2l6ZVwiLCBcIm5lZWRfcGhvbmVfbnVtYmVyXCIsIFwiRHdtUVFcIiwgXCJueGVGS1wiLCBcInBob3RvX3dpZHRoXCIsIFwiNDQ0MzE3Rmp4UnJlXCIsIFwiQ3FxS2hcIiwgXCJib29sZWFuXCIsIFwiTWtydHNcIiwgXCI1UURWUkd5XCIsIFwicGhvdG9faGVpZ2h0XCIsIFwiQkduZFBcIiwgXCIzU1FNZ2F5XCIsIFwiS1lmRWhcIiwgXCJEeGtGUVwiLCAnRmllbGQgXCInXTtcclxuXHRcdHJldHVybiAoV3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0XHJcblx0XHR9KSgpXHJcblx0fSAhIGZ1bmN0aW9uICh0KSB7XHJcblx0XHRjb25zdCBuID0gR3QsXHJcblx0XHRcdGUgPSB0KCk7XHJcblx0XHRmb3IgKDsgOykgdHJ5IHtcclxuXHRcdFx0aWYgKDY3NTAyNSA9PT0gLXBhcnNlSW50KG4oMzE5KSkgLyAxICsgcGFyc2VJbnQobigyOTkpKSAvIDIgKiAoLXBhcnNlSW50KG4oMjUxKSkgLyAzKSArIC1wYXJzZUludChuKDI4OCkpIC8gNCArIHBhcnNlSW50KG4oMzIzKSkgLyA1ICogKHBhcnNlSW50KG4oMjY1KSkgLyA2KSArIC1wYXJzZUludChuKDI1NykpIC8gNyAqICgtcGFyc2VJbnQobigyOTMpKSAvIDgpICsgcGFyc2VJbnQobigyODEpKSAvIDkgKyBwYXJzZUludChuKDI1OCkpIC8gMTApIGJyZWFrO1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fSBjYXRjaCAocikge1xyXG5cdFx0XHRlLnB1c2goZS5zaGlmdCgpKVxyXG5cdFx0fVxyXG5cdH0oV3QpO1xyXG5cdGNvbnN0IHp0ID0gUXQ7XHJcblxyXG5cdGZ1bmN0aW9uIE10KCkge1xyXG5cdFx0Y29uc3QgdCA9IFtcIjY3NTgzOHNlbm1pelwiLCBcIjMzMTg1NFRiaW9YdVwiLCBcImluaXRcIiwgXCIyMDc4MDI1V2xBZUljXCIsIFwiNjA2MzkzMHBPU3NlRlwiLCBcIjgzMTZMeUVzUnVcIiwgXCI5SHNEdWNUXCIsIFwiMzQwNjUyOHppWkVNQVwiLCBcIjI0UkNVRXRHXCIsIFwiMjI3MzQ2M0ZBdWJCS1wiLCBcIlBST0RcIiwgXCIyMzIyZXFySUxLXCJdO1xyXG5cdFx0cmV0dXJuIChNdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdH0pKClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIFF0KHQsIG4pIHtcclxuXHRcdGNvbnN0IGUgPSBNdCgpO1xyXG5cdFx0cmV0dXJuIChRdCA9IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdHJldHVybiBlW3QgLT0gNDM1XVxyXG5cdFx0fSkodCwgbilcclxuXHR9XHJcblx0bGV0IEh0O1xyXG5cdCEgZnVuY3Rpb24gKHQpIHtcclxuXHRcdGNvbnN0IG4gPSBRdCxcclxuXHRcdFx0ZSA9IHQoKTtcclxuXHRcdGZvciAoOyA7KSB0cnkge1xyXG5cdFx0XHRpZiAoODI2MDg0ID09PSAtcGFyc2VJbnQobig0NDMpKSAvIDEgKyBwYXJzZUludChuKDQ0MikpIC8gMiAqICgtcGFyc2VJbnQobig0MzYpKSAvIDMpICsgcGFyc2VJbnQobig0MzcpKSAvIDQgKyBwYXJzZUludChuKDQ0NSkpIC8gNSArIC1wYXJzZUludChuKDQ0MSkpIC8gNiAqIChwYXJzZUludChuKDQzNSkpIC8gNykgKyAtcGFyc2VJbnQobig0MzgpKSAvIDggKiAoLXBhcnNlSW50KG4oNDM5KSkgLyA5KSArIHBhcnNlSW50KG4oNDQ2KSkgLyAxMCkgYnJlYWs7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9IGNhdGNoIChyKSB7XHJcblx0XHRcdGUucHVzaChlLnNoaWZ0KCkpXHJcblx0XHR9XHJcblx0fShNdCk7XHJcblx0cmV0dXJuIHtcclxuXHRcdGluaXQ6IGFzeW5jIGZ1bmN0aW9uICh7XHJcblx0XHRcdHRva2VuOiB0LFxyXG5cdFx0XHRhcHBOYW1lOiBuLFxyXG5cdFx0XHRlbnY6IGUgPSB6dCg0NDApXHJcblx0XHR9KSB7XHJcblx0XHRcdGNvbnN0IHIgPSB6dCxcclxuXHRcdFx0XHRzID0gbmV3IFZ0KHQsIG4sIGUpO1xyXG5cdFx0XHRIdCA9IHQgPT4ge1xyXG5cdFx0XHRcdChmdW5jdGlvbiAodCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgbiA9IEd0LFxyXG5cdFx0XHRcdFx0XHRlID0ge1xyXG5cdFx0XHRcdFx0XHRcdE1rcnRzOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFpKdWNGOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHQgPD0gblxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0VVRBdHI6IG4oMzA5KSxcclxuXHRcdFx0XHRcdFx0XHRVYkRGWTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0IGluIG5cclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdHdpbFZ2OiBuKDI5NyksXHJcblx0XHRcdFx0XHRcdFx0QUVHZlo6IG4oMzExKSxcclxuXHRcdFx0XHRcdFx0XHRrclJjZzogXCJudW1iZXJcIixcclxuXHRcdFx0XHRcdFx0XHREeGtGUTogJ0FsbCB2YWx1ZXMgaW4gXCJzdWdnZXN0ZWRfdGlwX2Ftb3VudHNcIiBtdXN0IGJlIG51bWJlcnMnLFxyXG5cdFx0XHRcdFx0XHRcdE5vWG5aOiBcInNsdWdcIixcclxuXHRcdFx0XHRcdFx0XHRYbU1rSDogbigzMDgpLFxyXG5cdFx0XHRcdFx0XHRcdGRxdWFTOiBuKDI3OCksXHJcblx0XHRcdFx0XHRcdFx0ZXp1Rno6IG4oMjkyKSxcclxuXHRcdFx0XHRcdFx0XHRoWUNWRTogXCJjdXJyZW5jeVwiLFxyXG5cdFx0XHRcdFx0XHRcdHlHTVhPOiBuKDI2MSksXHJcblx0XHRcdFx0XHRcdFx0T2hDeVU6IG4oMzE3KSxcclxuXHRcdFx0XHRcdFx0XHRBUlNVYzogbigzMTMpLFxyXG5cdFx0XHRcdFx0XHRcdFVvaGdUOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFRGSVFiOiBcInR6VndOXCIsXHJcblx0XHRcdFx0XHRcdFx0SGZxbXI6IG4oMzAxKSxcclxuXHRcdFx0XHRcdFx0XHRoRXJ6TTogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRzbmtvajogJ0VhY2ggcHJpY2UgbXVzdCBoYXZlIGEgXCJsYWJlbFwiIHN0cmluZycsXHJcblx0XHRcdFx0XHRcdFx0QWRLY3k6IFwibWF4X3RpcF9hbW91bnRcIixcclxuXHRcdFx0XHRcdFx0XHR6U3dWUjogbigzMTgpLFxyXG5cdFx0XHRcdFx0XHRcdFFjWGJpOiBuKDMyNCksXHJcblx0XHRcdFx0XHRcdFx0cFhoWEs6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdCBpbiBuXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRCR25kUDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ID09PSBuXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRJZk1TTzogbigzMTYpLFxyXG5cdFx0XHRcdFx0XHRcdHl2bEpNOiBuKDMwMCksXHJcblx0XHRcdFx0XHRcdFx0WHNIWXk6IGZ1bmN0aW9uICh0LCBuKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdCAhPT0gblxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0T3BGbHI6IG4oMjY5KSxcclxuXHRcdFx0XHRcdFx0XHR1YVVTRTogbigyOTQpLFxyXG5cdFx0XHRcdFx0XHRcdHp6WnRmOiBuKDI4OSksXHJcblx0XHRcdFx0XHRcdFx0Q3FxS2g6IG4oMzEyKSxcclxuXHRcdFx0XHRcdFx0XHRLWWZFaDogZnVuY3Rpb24gKHQsIG4pIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ICE9PSBuXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR3S2JzTjogbigzMjEpLFxyXG5cdFx0XHRcdFx0XHRcdEVCbGtMOiBmdW5jdGlvbiAodCwgbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHQgIT09IG5cclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdGFVRmlpOiBcIlVzS093XCIsXHJcblx0XHRcdFx0XHRcdFx0RlFoT046IG4oMzA1KVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0aWYgKCF0KSB0aHJvdyBuZXcgRXJyb3IoZVtuKDMwNildKTtcclxuXHRcdFx0XHRcdGNvbnN0IHIgPSBbZVtuKDI5OCldLCBlW24oMjY0KV0sIGUuZHF1YVMsIGVbbigyNjcpXSwgZVtuKDI4NCldXTtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgbyBvZiByKVxyXG5cdFx0XHRcdFx0XHRpZiAoIXRbb10gfHwgZVtuKDMyMildKHR5cGVvZiB0W29dLCBlW24oMjk1KV0pKSB0aHJvdyBuZXcgRXJyb3IobigyNTQpICsgbyArICdcIiBpcyByZXF1aXJlZCBhbmQgbXVzdCBiZSBhIHN0cmluZycpO1xyXG5cdFx0XHRcdFx0aWYgKCFBcnJheVtuKDI1NSldKHRbbigyNzApXSkgfHwgMCA9PT0gdFtuKDI3MCldW24oMjg1KV0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKGVbbigyOTApXSAhPT0gZS5BUlNVYykgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBcInByaWNlc1wiIG11c3QgYmUgYSBub24tZW1wdHkgYXJyYXknKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFfMHg4M2M3ZWVbbigyOTEpXSB8fCB0eXBlb2YgXzB4NTUwOWU2W24oMjkxKV0gIT09IG4oMjYxKSkgdGhyb3cgbmV3IF8weDIwODI0YShuKDMwMykpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZS5Na3J0cyh0eXBlb2YgXzB4MTQyY2I3LmFtb3VudCwgbigyNjMpKSB8fCBlLlpKdWNGKF8weDM3Y2U5MFtuKDMxMCldLCAwKSkgdGhyb3cgbmV3IF8weDNjYzA5NChlW24oMjc0KV0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IG8gb2YgdFtuKDI3MCldKVxyXG5cdFx0XHRcdFx0XHRpZiAoZS5Vb2hnVChlW24oMzA3KV0sIGVbbigzMDIpXSkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIW8ubGFiZWwgfHwgZVtuKDI2MildKHR5cGVvZiBvW24oMjkxKV0sIGVbbigyOTUpXSkpIHRocm93IG5ldyBFcnJvcihlW24oMjc1KV0pO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChlW24oMjc5KV0odHlwZW9mIG9bbigzMTApXSwgZVtuKDI1NildKSB8fCBlW24oMjgzKV0ob1tuKDMxMCldLCAwKSkgdGhyb3cgbmV3IEVycm9yKGUuVVRBdHIpXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZVtuKDI2NildKF8weDFlN2UxYSwgXzB4NTQ1YzJjKSAmJiBcIm51bWJlclwiICE9IHR5cGVvZiBfMHgxYWJhMGZbXzB4MzI5ZWU3XSkgdGhyb3cgbmV3IF8weDJiYTJlZihuKDI1NCkgKyBfMHgzYTE2ZjkgKyAnXCIgbXVzdCBiZSBhIG51bWJlciBpZiBwcm92aWRlZCcpO1xyXG5cdFx0XHRcdFx0Y29uc3QgcyA9IFtuKDI4NiksIGVbbigyNTkpXSwgbigzMTQpLCBlLnpTd1ZSLCBlW24oMjgwKV1dO1xyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBvIG9mIHMpXHJcblx0XHRcdFx0XHRcdGlmIChvIGluIHQgJiYgdHlwZW9mIHRbb10gIT09IGVbbigyNTYpXSkgdGhyb3cgbmV3IEVycm9yKG4oMjU0KSArIG8gKyBuKDI2OCkpO1xyXG5cdFx0XHRcdFx0aWYgKGUucFhoWEsoXCJzdWdnZXN0ZWRfdGlwX2Ftb3VudHNcIiwgdCkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFBcnJheVtuKDI1NSldKHRbbigzMDQpXSkpIHRocm93IGVbbigzMjUpXShlLklmTVNPLCBlLnl2bEpNKSA/IG5ldyBfMHg1YTAzZmQoZS53aWxWdikgOiBuZXcgRXJyb3IoZVtuKDI4NyldKTtcclxuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCByIG9mIHQuc3VnZ2VzdGVkX3RpcF9hbW91bnRzKVxyXG5cdFx0XHRcdFx0XHRcdGlmIChlW24oMjczKV0odHlwZW9mIHIsIGUua3JSY2cpKSB0aHJvdyBlLkJHbmRQKGVbbigyNzIpXSwgXCJ2WU5mcFwiKSA/IG5ldyBfMHgzNTg2MDQoZVtuKDI4NyldKSA6IG5ldyBFcnJvcihlLkR4a0ZRKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3QgaSA9IFtuKDI5NiksIG4oMzE1KSwgZVtuKDI3NildLCBcIm5lZWRfc2hpcHBpbmdfYWRkcmVzc1wiLCBlW24oMjYwKV0sIGVbbigzMjApXSwgbigyODIpXTtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgbyBvZiBpKVxyXG5cdFx0XHRcdFx0XHRpZiAoZS5wWGhYSyhvLCB0KSAmJiBlW24oMjUyKV0odHlwZW9mIHRbb10sIGUud0tic04pKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGVbbigyNzEpXShlLmFVRmlpLCBlLkZRaE9OKSkgdGhyb3cgbmV3IEVycm9yKG4oMjU0KSArIG8gKyBuKDI3NykpO1xyXG5cdFx0XHRcdFx0XHRcdGlmICghXzB4NDJlNGM1W24oMjU1KV0oXzB4NWNhZjlhLnN1Z2dlc3RlZF90aXBfYW1vdW50cykpIHRocm93IG5ldyBfMHgxMTA1OTUobigzMTEpKTtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IHQgb2YgXzB4MjFkM2FiLnN1Z2dlc3RlZF90aXBfYW1vdW50cylcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChlW24oMzIyKV0odHlwZW9mIHQsIGVbbigyNTYpXSkpIHRocm93IG5ldyBfMHg0MTcxYTkoZVtuKDI1MyldKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkodCksIHMucmVnaXN0ZXJJbnZvaWNlKHQpXHJcblx0XHRcdH0sIGF3YWl0IHNbcig0NDQpXSgpXHJcblx0XHR9LFxyXG5cdFx0cmVnaXN0ZXJJbnZvaWNlOiB0ID0+IEh0KHQpXHJcblx0fVxyXG59KCk7XHJcbiJdfQ==