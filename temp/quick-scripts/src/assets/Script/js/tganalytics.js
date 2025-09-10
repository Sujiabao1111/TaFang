"use strict";
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