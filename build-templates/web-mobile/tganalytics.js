var telegramAnalytics = function() {
	"use strict";
	const t = n;

	function n(t, e) {
		const r = s();
		return (n = function(t, n) {
			return r[t -= 436]
		})(t, e)
	}! function(t) {
		const e = n,
			r = t();
		for (;;) try {
			if (683675 === -parseInt(e(454)) / 1 * (parseInt(e(441)) / 2) + parseInt(e(452)) / 3 + -parseInt(e(479)) / 4 * (-parseInt(e(450)) / 5) + parseInt(e(476)) / 6 * (-parseInt(e(485)) / 7) + -parseInt(e(464)) / 8 + parseInt(e(461)) / 9 * (-parseInt(e(466)) / 10) + -parseInt(e(437)) / 11 * (-parseInt(e(471)) / 12)) break;
			r.push(r.shift())
		} catch (s) {
			r.push(r.shift())
		}
	}(s);
	const e = t(465),
		r = t(462);

	function s() {
		const t = ["hZfde", "WALLET_CONNECT_ERROR", "165588bofxwg", "CONNECTION_RESTORING_SUCCESS", "WALLET_CONNECT_STARTED", "tVNUK", "app-init", "35214EwnEZA", "HIDE", "wPxMs", "4VtIopq", "INIT", "nTAzw", "TRANSACTION_SIGNING_FAILED", "TRANSACTION_SENT_FOR_SIGNATURE", "Ffllo", "819NlMzIE", "iXJyV", "1331yNLusV", "CONNECTION_RESTORING_ERROR", "WALLET_CONNECT_SUCCESS", "dhXzK", "271126bjfDin", "connection-restoring-completed", "connection-started", "disconnection", "custom-event", "CUSTOM_EVENT", "TRANSACTION_SIGNED", "transaction-signed", "eJVTc", "4728095VxSXDF", "rHlPN", "2433867Izxcoj", "qtSRE", "7YslNyi", "EoPGo", "AnoqT", "cSjvC", "transaction-sent-for-signature", "transaction-signing-failed", "WALLET_DISCONNECT", "621801wkZxPL", "TGA-Batch-Requests", "connection-restoring-error", "14992MSotLV", "https://tganalytics.xyz/", "160RpKWYr", "app-hide", "JlgiK"];
		return (s = function() {
			return t
		})()
	}
	var o = (n => {
		const e = t,
			r = {
				dhXzK: e(480),
				TmwmW: e(475),
				tVNUK: e(477),
				Ffllo: e(446),
				qtSRE: e(445),
				wPxMs: e(443),
				nTAzw: e(439),
				EoPGo: e(470),
				AnoqT: "connection-error",
				cSjvC: "CONNECTION_RESTORING_STARTED",
				JlgiK: e(442),
				rHlPN: e(463),
				VWwBT: e(483),
				iXJyV: e(458),
				hZfde: e(448),
				eeLjR: e(482),
				eJVTc: e(460),
				RvOYT: e(444)
			};
		return n[r[e(440)]] = r.TmwmW, n[r[e(474)]] = e(467), n[r[e(484)]] = r[e(453)], n[e(473)] = r[e(478)], n[r[e(481)]] = "connection-completed", n[r[e(455)]] = r[e(456)], n[r[e(457)]] = "connection-restoring-started", n[e(472)] = r[e(468)], n[e(438)] = r[e(451)], n[r.VWwBT] = r[e(436)], n[e(447)] = r[e(469)], n[r.eeLjR] = e(459), n[r[e(449)]] = r.RvOYT, n
	})(o || {});
	const i = c;

	function a() {
		const t = ["detail", "log", "addEventListener", "TRANSACTION_SENT_FOR_SIGNATURE", "uiScope", "CONNECTION_RESTORING_ERROR", "41553690fDbfLX", "457115CVXSyv", "1680162eabwVo", "split", "67056xoPvRx", "TrGye", " received", "405dGjEIO", "event ", "WALLET_DISCONNECT", "analyticsController", "ton-connect-", "545587mfZEhV", "72IhWJre", "tonConnectSdkEvents", "tonConnectUiEvents", "QTZIz", " listener", "WALLET_CONNECT_STARTED", "59572LaDEXb", "map", "WALLET_CONNECT_ERROR", "6344888AfygYl", "icTsy", "TRANSACTION_SIGNING_FAILED", "sdkScope", "57ArNwep", "type", "init"];
		return (a = function() {
			return t
		})()
	}

	function c(t, n) {
		const e = a();
		return (c = function(t, n) {
			return e[t -= 399]
		})(t, n)
	}! function(t) {
		const n = c,
			e = t();
		for (;;) try {
			if (988240 === -parseInt(n(413)) / 1 + -parseInt(n(430)) / 2 * (-parseInt(n(402)) / 3) + -parseInt(n(433)) / 4 + parseInt(n(412)) / 5 + -parseInt(n(424)) / 6 * (parseInt(n(423)) / 7) + -parseInt(n(415)) / 8 * (-parseInt(n(418)) / 9) + parseInt(n(411)) / 10) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(a);
	class u {
		constructor(t) {
			const n = c,
				e = {
					QTZIz: "0|1|4|2|3",
					TrGye: n(422),
					icTsy: "ton-connect-ui-"
				},
				r = e[n(427)][n(414)]("|");
			let s = 0;
			for (;;) {
				switch (r[s++]) {
					case "0":
						this[n(425)] = [o.CUSTOM_EVENT, o.WALLET_CONNECT_SUCCESS, o[n(432)], o.CONNECTION_RESTORING_SUCCESS, o[n(410)], o[n(408)], o.TRANSACTION_SIGNED, o[n(400)], o[n(420)]];
						continue;
					case "1":
						this[n(426)] = [o[n(429)], o[n(432)], o[n(400)]];
						continue;
					case "2":
						this.sdkScope = e[n(416)];
						continue;
					case "3":
						this.analyticsController = t;
						continue;
					case "4":
						this[n(409)] = e[n(399)];
						continue
				}
				break
			}
		} [i(404)]() {
			const t = i;
			for (let n of this.events) console[t(406)]("Attach " + n + t(428)), window[t(407)](n, (e => {
				const r = t;
				console.log(r(419) + n + r(417), e[r(405)]);
				const {
					type: s,
					...o
				} = e[r(405)];
				this[r(421)].collectEvent(e[r(405)][r(403)], {
					...o
				})
			}))
		}
		get events() {
			const t = i;
			return [...this.tonConnectUiEvents[t(431)]((n => "" + this[t(409)] + n)), ...this[t(425)][t(431)]((n => "" + this[t(401)] + n))]
		}
	}

	function p(t, n) {
		const e = f();
		return (p = function(t, n) {
			return e[t -= 317]
		})(t, n)
	}
	const h = p;

	function f() {
		const t = ["visibilityState", "qMXcL", "analyticsController", "xZPWC", "204093SvyhqJ", "159THzudV", "16660589csQraV", "collectEvent", "SEJaO", "38031vDDSBA", "458775wMzlrG", "documentEvents", "ZuNSO", "uzzWg", "HIDE", "uyhXf", "hidden", "28jJhHVQ", "init", "TrmCS", "YyLov", "64kEpNyB", "pRTzj", "addEventListener", "2930bVsYCb", "6874360OQkMyv", "isALP", "wedLE", "2128122ThsKvl", "114OctUPc"];
		return (f = function() {
			return t
		})()
	}! function(t) {
		const n = p,
			e = t();
		for (;;) try {
			if (369750 === parseInt(n(320)) / 1 * (-parseInt(n(339)) / 2) + parseInt(n(343)) / 3 + -parseInt(n(332)) / 4 * (-parseInt(n(325)) / 5) + parseInt(n(344)) / 6 * (-parseInt(n(324)) / 7) + -parseInt(n(336)) / 8 * (-parseInt(n(319)) / 9) + parseInt(n(340)) / 10 + -parseInt(n(321)) / 11) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(f);
	class l {
		constructor(t) {
			const n = p,
				e = {
					ZuNSO: n(331),
					uzzWg: function(t, n) {
						return t !== n
					},
					SEJaO: "trXFw",
					isALP: n(335),
					wedLE: function(t, n) {
						return t === n
					},
					uyhXf: n(334)
				};
			this.documentEvents = {
				visibilitychange: () => {
					const t = n;
					if (e[t(328)](e[t(323)], e[t(341)])) {
						if (document[t(345)] === e[t(327)])
							if (e[t(342)](e[t(330)], e[t(330)])) this[t(317)].collectEvent(o[t(329)], void 0);
							else {
								const n = {
									pRTzj: function(t, n) {
										return t === n
									},
									qMXcL: e[t(327)]
								};
								this[t(326)] = {
									visibilitychange: () => {
										const e = t;
										n[e(337)](_0x471be8[e(345)], n[e(346)]) && this[e(317)][e(322)](_0x3658e5[e(329)], void 0)
									}
								}, this[t(317)] = _0x2239ed
							}
					} else this.analyticsController.collectEvent(_0xf841dc[t(329)], void 0)
				}
			}, this[n(317)] = t
		} [h(333)]() {
			const t = h,
				n = {
					TQMVb: t(331),
					xZPWC: "VBhsD"
				};
			for (let [e, r] of Object.entries(this.documentEvents)) "JBZJL" === n[t(318)] ? _0x9ba1aa[t(345)] === n.TQMVb && this[t(317)][t(322)](_0x214ea3.HIDE, void 0) : document[t(338)](e, r)
		}
	}
	var I = m;
	! function(t) {
		for (var n = m, e = t();;) try {
			if (298489 === parseInt(n(424)) / 1 + parseInt(n(426)) / 2 + -parseInt(n(425)) / 3 + parseInt(n(427)) / 4 * (parseInt(n(422)) / 5) + -parseInt(n(417)) / 6 * (parseInt(n(416)) / 7) + -parseInt(n(420)) / 8 + -parseInt(n(419)) / 9) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(S);
	class d {
		constructor(t) {
			var n = m;
			this[n(415)] = t, this.documentObserver = new l(this), this[n(418)] = new u(this)
		} [I(414)]() {
			var t = I;
			this.documentObserver[t(414)](), this[t(418)][t(414)]()
		} [I(421)](t, n) {
			var e = I;
			this[e(415)].recordEvent(t, n)[e(423)]((t => console.error(t)))
		}
		collectEvent(t, n) {
			this[I(415)].collectEvent(t, n)
		}
	}

	function m(t, n) {
		var e = S();
		return (m = function(t, n) {
			return e[t -= 414]
		})(t, n)
	}

	function S() {
		var t = ["appModule", "571991aleZJX", "12CfUonm", "tonConnectObserver", "1088010OJSyRI", "2232744efRtBL", "recordEvent", "17400mFzgji", "catch", "515308wDgUWn", "694212XPSZol", "1037668GLZLut", "68hUPpOO", "init"];
		return (S = function() {
			return t
		})()
	}! function(t) {
		const n = T,
			e = t();
		for (;;) try {
			if (169105 === parseInt(n(361)) / 1 + parseInt(n(351)) / 2 + -parseInt(n(358)) / 3 * (parseInt(n(354)) / 4) + parseInt(n(363)) / 5 * (-parseInt(n(347)) / 6) + -parseInt(n(355)) / 7 + -parseInt(n(348)) / 8 * (-parseInt(n(360)) / 9) + -parseInt(n(359)) / 10 * (-parseInt(n(356)) / 11)) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(y);
	const g = t => {
		throw new Error(t)
	};

	function y() {
		const t = ["1210fusWoy", "19863HHSNuU", "281064RbBdoa", "loHWJ", "5hddRKX", "634710GSiAbG", "568USsSbs", "Telegram User data is not provided.", "Token is not provided.", "30732gaGQzk", "USER_DATA_IS_NOT_PROVIDED", "ziZhT", "164BRksXP", "1757602DjlgMU", "12221DrPSPO", "TZNxW", "4506psVyBY"];
		return (y = function() {
			return t
		})()
	}

	function T(t, n) {
		const e = y();
		return (T = function(t, n) {
			return e[t -= 347]
		})(t, n)
	}
	var v = (t => {
		const n = T,
			e = {
				ziZhT: "TOKEN_IS_NOT_PROVIDED",
				TZNxW: n(350),
				loHWJ: n(352)
			};
		return t[e[n(353)]] = e[n(357)], t[e[n(362)]] = n(349), t
	})(v || {});

	function E(t, n) {
		const e = N();
		return (E = function(t, n) {
			return e[t -= 263]
		})(t, n)
	}
	const b = E;

	function N() {
		const t = ["qMbAo", "2703003EnQFgA", "Content", "responseToParams", "26qKimmG", "QEHPy", "POST", "clone", "BACKEND_URL", "assign", "2621624RIJDVj", "1255645kFAdbx", "460008Nksadc", "init", "stringify", "events", "application/json", "14536zZlvjD", "Qbmkx", "json", "2465656TrRjCX", "setNewArgs", "bQRBy", "getApiToken", "kBoOT", "zxrTf", "generateHeaders", "custom_data", "then", "6ZTzUCd", "taskSolution", "status", "5981731kfVavW", "appModule", "TOKEN_IS_NOT_PROVIDED", "pfQGl", "recordEvent", "dXCSG", "recordEvents"];
		return (N = function() {
			return t
		})()
	}! function(t) {
		const n = E,
			e = t();
		for (;;) try {
			if (518872 === -parseInt(n(297)) / 1 * (parseInt(n(271)) / 2) + parseInt(n(294)) / 3 + parseInt(n(264)) / 4 + parseInt(n(265)) / 5 * (-parseInt(n(283)) / 6) + -parseInt(n(286)) / 7 + parseInt(n(274)) / 8 + -parseInt(n(266)) / 9) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(N);
	class w {
		constructor(t) {
			const n = E,
				r = {
					dXCSG: function(t, n) {
						return t === n
					},
					cjjOY: function(t, n) {
						return t(n)
					},
					Qbmkx: n(295),
					kBoOT: "application/json",
					iynFK: function(t, n) {
						return t(n)
					}
				};
			this[n(301)] = e, this.responseToParams = async t => {
				const e = n;
				if (!r[e(291)]("Xqxqg", "CZLBU")) {
					const n = t[e(300)]();
					if ("2" === r.cjjOY(String, n[e(285)])[0] || 429 === n[e(285)]) {
						const t = await n[e(273)]();
						this[e(287)][e(275)](t[r[e(272)]])
					}
					return t
				}
				_0x343adb ? _0x1edcfb = _0x3b5a80[e(263)](_0x347c88[e(281)], _0x5bb04e) : _0x401e65 = _0x66a36c[e(281)]
			}, this[n(280)] = () => {
				const t = n;
				return this[t(287)].solveTask(), this[t(287)].taskSolution ? {
					"TGA-Auth-Token": this[t(287)][t(277)](),
					"Content-Type": r[t(278)],
					Content: this[t(287)][t(284)]
				} : {
					"TGA-Auth-Token": this[t(287)][t(277)](),
					"Content-Type": r[t(278)]
				}
			}, this.appModule = t, !this[n(287)][n(277)]() && r.iynFK(g, v[n(288)])
		} [b(267)]() {}
		async [b(292)](t) {
			const n = b,
				e = {
					GExcB: function(t, n) {
						return t + n
					},
					zxrTf: n(269)
				};
			return await fetch(e.GExcB(this[n(301)], e[n(279)]), {
				method: n(299),
				headers: this[n(280)](),
				body: JSON[n(268)](t)
			})[n(282)](this[n(296)], this.responseToParams)
		}
		async [b(290)](t, n, e) {
			const r = b,
				s = {
					rnglW: r(270),
					pfQGl: function(t, n) {
						return t !== n
					},
					bQRBy: "LEGHy",
					JqWcx: r(269),
					QEHPy: r(299)
				};
			if (null == n ? void 0 : n[r(281)]) {
				if (s[r(289)](s[r(276)], s[r(276)])) return {
					"TGA-Auth-Token": this[r(287)][r(277)](),
					"Content-Type": s.rnglW,
					Content: this.appModule.taskSolution
				};
				e ? e = Object[r(263)](n.custom_data, e) : s[r(289)]("qMbAo", r(293)) ? _0xab22fe = _0x13b500[r(263)](_0x340bda[r(281)], _0x4e04cc) : e = n[r(281)]
			}
			await fetch(this[r(301)] + s.JqWcx, {
				method: s[r(298)],
				headers: this[r(280)](),
				body: JSON[r(268)]({
					...n,
					event_name: t,
					custom_data: e,
					...this[r(287)].assembleEventSession()
				})
			})[r(282)](this.responseToParams, this[r(296)])
		}
	}
	class _ extends Error {
		constructor(t, n, e) {
			super(n, {
				cause: e
			}), this.type = t, Object.setPrototypeOf(this, _.prototype)
		}
	}

	function O(t, n, e) {
		return new _(t, n, e)
	}
	const A = "ERR_PARSE";

	function C() {
		return O("ERR_UNEXPECTED_TYPE", "Value has unexpected type")
	}
	class x {
		constructor(t, n, e) {
			this.parser = t, this.isOptional = n, this.type = e
		}
		parse(t) {
			if (!this.isOptional || void 0 !== t) try {
				return this.parser(t)
			} catch (n) {
				throw O(A, "Unable to parse value" + (this.type ? ` as ${this.type}` : ""), n)
			}
		}
		optional() {
			return this.isOptional = !0, this
		}
	}

	function R(t, n) {
		return () => new x(t, !1, n)
	}
	const P = R((t => {
		if ("boolean" == typeof t) return t;
		const n = String(t);
		if ("1" === n || "true" === n) return !0;
		if ("0" === n || "false" === n) return !1;
		throw C()
	}), "boolean");

	function D(t, n) {
		const e = {};
		for (const s in t) {
			const o = t[s];
			if (!o) continue;
			let i, a;
			if ("function" == typeof o || "parse" in o) i = s, a = "function" == typeof o ? o : o.parse.bind(o);
			else {
				const {
					type: t
				} = o;
				i = o.from || s, a = "function" == typeof t ? t : t.parse.bind(t)
			}
			try {
				const t = a(n(i));
				void 0 !== t && (e[s] = t)
			} catch (r) {
				throw O(A, `Unable to parse field "${s}"`, r)
			}
		}
		return e
	}

	function k(t) {
		let n = t;
		if ("string" == typeof n && (n = JSON.parse(n)), "object" != typeof n || null === n || Array.isArray(n)) throw C();
		return n
	}

	function W(t, n) {
		return new x((n => {
			const e = k(n);
			return D(t, (t => e[t]))
		}), !1, n)
	}
	const B = R((t => {
			if ("number" == typeof t) return t;
			if ("string" == typeof t) {
				const n = Number(t);
				if (!Number.isNaN(n)) return n
			}
			throw C()
		}), "number"),
		L = R((t => {
			if ("string" == typeof t || "number" == typeof t) return t.toString();
			throw C()
		}), "string");
	W({
		req_id: L(),
		data: t => null === t ? t : L()
			.optional()
			.parse(t)
	}), W({
		req_id: L(),
		result: t => t,
		error: L()
			.optional()
	}), W({
		height: B(),
		width: t => null == t ? window.innerWidth : B()
			.parse(t),
		is_state_stable: P(),
		is_expanded: P()
	});
	const U = R((t => t instanceof Date ? t : new Date(1e3 * B()
		.parse(t))), "Date");

	function G(t, n) {
		return new x((n => {
			if ("string" != typeof n && !(n instanceof URLSearchParams)) throw C();
			const e = "string" == typeof n ? new URLSearchParams(n) : n;
			return D(t, (t => {
				const n = e.get(t);
				return null === n ? void 0 : n
			}))
		}), !1, n)
	}
	const q = W({
			id: B(),
			type: L(),
			title: L(),
			photoUrl: {
				type: L()
					.optional(),
				from: "photo_url"
			},
			username: L()
				.optional()
		}, "Chat")
		.optional(),
		V = W({
			addedToAttachmentMenu: {
				type: P()
					.optional(),
				from: "added_to_attachment_menu"
			},
			allowsWriteToPm: {
				type: P()
					.optional(),
				from: "allows_write_to_pm"
			},
			firstName: {
				type: L(),
				from: "first_name"
			},
			id: B(),
			isBot: {
				type: P()
					.optional(),
				from: "is_bot"
			},
			isPremium: {
				type: P()
					.optional(),
				from: "is_premium"
			},
			languageCode: {
				type: L()
					.optional(),
				from: "language_code"
			},
			lastName: {
				type: L()
					.optional(),
				from: "last_name"
			},
			photoUrl: {
				type: L()
					.optional(),
				from: "photo_url"
			},
			username: L()
				.optional()
		}, "User")
		.optional();
	const J = R((t => function(t) {
		const n = t.replace(/\s/g, "")
			.toLowerCase();
		if (function(t) {
			return /^#[\da-f]{6}$/i.test(t)
		}(n)) return n;
		if (function(t) {
			return /^#[\da-f]{3}$/i.test(t)
		}(n)) {
			let t = "#";
			for (let e = 0; e < 3; e += 1) t += n[1 + e].repeat(2);
			return t
		}
		const e = n.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || n.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
		if (!e) throw new Error(`Value "${t}" does not satisfy any of known RGB formats.`);
		return e.slice(1)
			.reduce(((t, n) => {
				const e = parseInt(n, 10)
					.toString(16);
				return t + (1 === e.length ? "0" : "") + e
			}), "#")
	}(L()
		.parse(t))), "rgb");

	function Z(t) {
		return t.replace(/[A-Z]/g, (t => `_${t.toLowerCase()}`))
	}
	const z = R((t => {
		const n = J()
			.optional();
		return Object.entries(k(t))
			.reduce(((t, [e, r]) => (t[function(t) {
				return t.replace(/_[a-z]/g, (t => t[1].toUpperCase()))
			}(e)] = n.parse(r), t)), {})
	}), "ThemeParams");

	function K(t) {
		return G({
				botInline: {
					type: P()
						.optional(),
					from: "tgWebAppBotInline"
				},
				initData: {
					type: G({
							authDate: {
								type: U(),
								from: "auth_date"
							},
							canSendAfter: {
								type: B()
									.optional(),
								from: "can_send_after"
							},
							chat: q,
							chatInstance: {
								type: L()
									.optional(),
								from: "chat_instance"
							},
							chatType: {
								type: L()
									.optional(),
								from: "chat_type"
							},
							hash: L(),
							queryId: {
								type: L()
									.optional(),
								from: "query_id"
							},
							receiver: V,
							startParam: {
								type: L()
									.optional(),
								from: "start_param"
							},
							user: V
						}, "InitData")
						.optional(),
					from: "tgWebAppData"
				},
				initDataRaw: {
					type: L()
						.optional(),
					from: "tgWebAppData"
				},
				platform: {
					type: L(),
					from: "tgWebAppPlatform"
				},
				showSettings: {
					type: P()
						.optional(),
					from: "tgWebAppShowSettings"
				},
				startParam: {
					type: L()
						.optional(),
					from: "tgWebAppStartParam"
				},
				themeParams: {
					type: z(),
					from: "tgWebAppThemeParams"
				},
				version: {
					type: L(),
					from: "tgWebAppVersion"
				}
			})
			.parse(t)
	}

	function j(t) {
		return K(t.replace(/^[^?#]*[?#]/, "")
			.replace(/[?#]/g, "&"))
	}

	function Q() {
		return j(window.location.href)
	}

	function M() {
		const t = performance.getEntriesByType("navigation")[0];
		if (!t) throw new Error("Unable to get first navigation entry.");
		return j(t.name)
	}

	function X(t) {
		return `telegram-apps/${t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}`
	}

	function H() {
		return K(function(t) {
			const n = sessionStorage.getItem(X(t));
			try {
				return n ? JSON.parse(n) : void 0
			} catch {}
		}("launchParams") || "")
	}

	function F(t) {
		const {
			initDataRaw: n,
			themeParams: e,
			platform: r,
			version: s,
			showSettings: o,
			startParam: i,
			botInline: a
		} = t, c = new URLSearchParams;
		return c.set("tgWebAppPlatform", r), c.set("tgWebAppThemeParams", function(t) {
			return JSON.stringify(Object.fromEntries(Object.entries(t)
				.map((([t, n]) => [Z(t), n]))))
		}(e)), c.set("tgWebAppVersion", s), n && c.set("tgWebAppData", n), i && c.set("tgWebAppStartParam", i), "boolean" == typeof o && c.set("tgWebAppShowSettings", o ? "1" : "0"), "boolean" == typeof a && c.set("tgWebAppBotInline", a ? "1" : "0"), c.toString()
	}

	function Y(t) {
		! function(t, n) {
			sessionStorage.setItem(X(t), JSON.stringify(n))
		}("launchParams", F(t))
	}

	function $() {
		const t = [];
		for (const e of [Q, M, H]) try {
			const t = e();
			return Y(t), t
		} catch (n) {
			t.push(n instanceof Error ? n.message : JSON.stringify(n))
		}
		throw new Error(["Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?\n", "📖 Refer to docs for more information:", "https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment\n", "Collected errors:", t.map((t => `— ${t}`))].join("\n"))
	}

	function tt(t, n) {
		const e = nt();
		return (tt = function(t, n) {
			return e[t -= 209]
		})(t, n)
	}

	function nt() {
		const t = ["312505lBOddm", "657091AeVMJs", "replace", "wGNwq", "2387hSChTb", "charCodeAt", "2oQmYeE", "1392594venPJI", "1992SIPJRx", "zGwSe", "slice", "length", "2423498Imccgd", "floor", "37130ybtytH", "qxNru", "8mBFPTJ", "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", "icpHD", "zXQws", "hfpih", "GuDAK", "FZeWY", "1648782TGIgRt", "99rDSOZD", "AsReq", "toString"];
		return (nt = function() {
			return t
		})()
	}

	function et(t) {
		const n = tt,
			e = {
				AsReq: function(t, n) {
					return t + n
				},
				zGwSe: function(t, n) {
					return t << n
				},
				hfpih: function(t, n) {
					return t | n
				},
				GuDAK: function(t, n) {
					return t % n
				},
				icpHD: function(t, n, e) {
					return t(n, e)
				},
				KKCCt: function(t, n) {
					return t / n
				},
				qxNru: function(t, n) {
					return t | n
				},
				zXQws: n(219),
				FZeWY: function(t, n) {
					return t(n)
				},
				wGNwq: function(t, n) {
					return t < n
				}
			};
		let r = e[n(221)],
			s = (new Date)
			.getTime();
		const o = e[n(227)](t, s);
		let i = e[n(224)]((function(t) {
			const r = n;
			let s = 0;
			for (let n = 0; n < t[r(213)]; n++) {
				const o = t[r(234)](n);
				s = e[r(227)](e[r(211)](s, 5) - s, o), s |= 0
			}
			return s
		}), o)[n(228)](16);
		for (; e[n(232)](i[n(213)], 32);) i += i;
		i = i[n(212)](0, 32);
		let a = 0;
		return r[n(231)](/[xy]/g, (function(t) {
			const r = n,
				o = e[r(222)](e[r(223)](e[r(227)](s, e[r(220)](parseInt, i[a], 16)), 16), 0);
			return s = Math[r(215)](e.KKCCt(s, 16)), a++, ("x" == t ? o : e[r(217)](3 & o, 8))
				.toString(16)
		}))
	}! function(t) {
		const n = tt,
			e = t();
		for (;;) try {
			if (344170 === -parseInt(n(230)) / 1 * (parseInt(n(235)) / 2) + parseInt(n(225)) / 3 + -parseInt(n(218)) / 4 * (-parseInt(n(229)) / 5) + parseInt(n(209)) / 6 + parseInt(n(233)) / 7 * (-parseInt(n(210)) / 8) + -parseInt(n(226)) / 9 * (parseInt(n(216)) / 10) + parseInt(n(214)) / 11) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(nt);
	const rt = ot;

	function st() {
		const t = ["getAppName", "2CWjiFB", "isBot", "photoUrl", "BJbBs", "userId", "init", "49VmTBln", "getUserId", "sessionId", "786801tCSsXx", "2385476CokRGv", "getUserData", "firstName", "yssHH", "startParam", "now", "4943704QCQvVK", "assembleEventSession", "languageCode", "platform", "initData", "71932DsBZeU", "userLocale", "getPlatform", "2568935teESPm", "getSessionId", "7781400wGbcoB", "appModule", "getUserIsPremium", "getUserLocale", "318372vGJKzQ", "userData", "webAppStartParam", "user", "lastName", "getWebAppStartParam", "isPremium"];
		return (st = function() {
			return t
		})()
	}

	function ot(t, n) {
		const e = st();
		return (ot = function(t, n) {
			return e[t -= 288]
		})(t, n)
	}! function(t) {
		const n = ot,
			e = t();
		for (;;) try {
			if (333226 === parseInt(n(295)) / 1 + -parseInt(n(312)) / 2 * (-parseInt(n(321)) / 3) + parseInt(n(322)) / 4 + parseInt(n(298)) / 5 + -parseInt(n(304)) / 6 * (-parseInt(n(318)) / 7) + -parseInt(n(290)) / 8 + -parseInt(n(300)) / 9) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(st);
	class it {
		constructor(t) {
			this.appModule = t
		} [rt(317)]() {
			var t;
			const n = rt,
				e = {
					vJgPS: function(t) {
						return t()
					},
					HqAnH: function(t, n) {
						return t !== n
					},
					BJbBs: "KDwjI",
					kvKgb: function(t, n) {
						return t(n)
					}
				},
				r = e.vJgPS($),
				s = r.initData,
				o = null == (t = r[n(294)]) ? void 0 : t[n(307)];
			if (!o) {
				if (e.HqAnH(e[n(315)], e.BJbBs)) return this[n(305)];
				g(v.USER_DATA_IS_NOT_PROVIDED)
			}
			this[n(305)] = {
				id: o.id,
				is_premium: o[n(310)],
				first_name: o[n(324)],
				is_bot: o[n(313)],
				last_name: o[n(308)],
				language_code: o[n(292)],
				photo_url: o[n(314)],
				username: o.username
			}, this.userId = o.id, this[n(296)] = o[n(292)], this[n(306)] = s[n(288)], this[n(293)] = r[n(293)], this[n(320)] = e.kvKgb(et, String(this[n(319)]()))
		} [rt(299)]() {
			return this[rt(320)]
		} [rt(319)]() {
			return this[rt(316)]
		} [rt(309)]() {
			return this[rt(306)]
		} [rt(297)]() {
			return this[rt(293)]
		} [rt(303)]() {
			return this[rt(296)]
		} [rt(323)]() {
			return this.userData
		} [rt(302)]() {
			const t = this[rt(323)]();
			return Boolean(null == t ? void 0 : t.is_premium)
		} [rt(291)]() {
			const t = rt;
			return {
				session_id: this[t(299)](),
				user_id: this[t(319)](),
				app_name: this[t(301)][t(311)](),
				is_premium: this[t(302)](),
				platform: this[t(297)](),
				locale: this[t(303)](),
				start_param: this[t(309)](),
				client_timestamp: {
					yssHH: function(t, n) {
						return t(n)
					}
				} [t(325)](String, Date[t(289)]())
			}
		}
	}
	const at = ct;

	function ct(t, n) {
		const e = pt();
		return (ct = function(t, n) {
			return e[t -= 418]
		})(t, n)
	}! function(t) {
		const n = ct,
			e = t();
		for (;;) try {
			if (836407 === parseInt(n(431)) / 1 * (parseInt(n(443)) / 2) + -parseInt(n(432)) / 3 + -parseInt(n(424)) / 4 * (parseInt(n(423)) / 5) + parseInt(n(421)) / 6 * (parseInt(n(444)) / 7) + -parseInt(n(440)) / 8 + parseInt(n(441)) / 9 * (parseInt(n(426)) / 10) + parseInt(n(433)) / 11) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(pt);
	class ut {
		constructor(t) {
			const n = ct;
			this[n(422)] = window.sessionStorage, this[n(428)] = window[n(428)], this[n(438)] = t
		} [at(439)]() {
			const t = at,
				n = {
					QcpWL: "null",
					csIfx: function(t, n) {
						return t === n
					},
					RUtUR: "TykZl",
					uaUtR: t(425)
				};
			return [null, t(420)][t(437)](this[t(422)][t(445)](this[t(438)])) && [null, n[t(427)]][t(437)](this.localStorage[t(445)](this[t(438)])) ? n.csIfx(n[t(430)], n[t(434)]) ? (this.sessionStorage = _0x3790e9[t(422)], this[t(428)] = _0x5216c2[t(428)], this[t(438)] = _0x56e418) : this[t(442)]([]) : this[t(442)](JSON[t(418)](this.localStorage[t(445)](this[t(438)]))), this[t(442)]([...JSON[t(418)](this[t(422)][t(445)](this.key)), ...JSON[t(418)](this[t(428)][t(445)](this.key))][t(419)](((n, e, r) => r[t(435)]((e => JSON[t(436)](e) === JSON[t(436)](n))) === e))), JSON[t(418)](this[t(422)].getItem(this[t(438)]))
		}
		addToStorage(t, n) {
			const e = at,
				r = this[e(439)]();
			r[e(429)]({
				event_name: t,
				...n
			}), this.setItem(r)
		} [at(442)](t) {
			const n = at;
			this[n(428)][n(442)](this[n(438)], JSON[n(436)](t)), this[n(422)][n(442)](this[n(438)], JSON[n(436)](t))
		}
	}

	function pt() {
		const t = ["sessionStorage", "582280fyVesX", "44OlginA", "zEfCK", "11650nCrMQd", "QcpWL", "localStorage", "push", "RUtUR", "757tStnfR", "492942SmNKQj", "4173818WTLmZv", "uaUtR", "findIndex", "stringify", "includes", "key", "getBatch", "11199072nDUvix", "5283LEtgqG", "setItem", "2740lRTuxf", "14drEfvf", "getItem", "parse", "filter", "null", "4743714cNcjXS"];
		return (pt = function() {
			return t
		})()
	}
	const ht = ft;

	function ft(t, n) {
		const e = lt();
		return (ft = function(t, n) {
			return e[t -= 235]
		})(t, n)
	}

	function lt() {
		const t = ["batchInterval", "intervalId", "pmVIa", "8yUhBeN", "gOgZO", "fAhOZ", "lWaBF", "7ghhMAt", "gaYWh", "RxmNe", "cVsWK", "log", "gucSR", "taskRetry", "slice", "addToStorage", "solveTask", "SBeZq", "EbwNC", "4mqanJx", "UZcFa", "onreadystatechange", "2811730Xtlljm", "rxHRf", "QSteB", "FzFYj", "yGewm", "filter", "DdMLN", "appModule", "collect", "3827695HWJCbZ", "ZESjs", "complete", "254343IsUfiV", "gnleM", "Khacv", "zFMeD", "10554520dwgCzo", "init", "tomKT", "onLine", "LrNeH", "recordEvents", "oyqto", "RiEqa", "taskSolution", "processQueue", "stringify", "Cgbqb", "hAdZL", "27KhYUuh", "backoff", "length", "IApoB", "DGSbr", "PINsm", "status", "readyState", "EGlOs", "load", "5|0|2|6|3|4|1", "71718vttSNn", "collectEvent", "SRivh", "then", "SSzSQ", "getApiToken", "stopBatching", "13465419ebrMxG", "startBatching", "jWwFo", "setItem", "460677hVbGCG", "BATCH_KEY", "duSef", "INIT", "nAAfk", "addEventListener", "owGcP", "setInterval", "sendBatch", "sFxiW", "some", "storage"];
		return (lt = function() {
			return t
		})()
	}! function(t) {
		const n = ft,
			e = t();
		for (;;) try {
			if (858560 === -parseInt(n(264)) / 1 * (-parseInt(n(318)) / 2) + parseInt(n(303)) / 3 * (-parseInt(n(249)) / 4) + -parseInt(n(261)) / 5 + parseInt(n(292)) / 6 * (parseInt(n(237)) / 7) + -parseInt(n(268)) / 8 + -parseInt(n(281)) / 9 * (-parseInt(n(252)) / 10) + parseInt(n(299)) / 11) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(lt);
	class It {
		constructor(t) {
			const n = ft,
				e = {
					jWwFo: function(t, n) {
						return t + n
					}
				},
				s = n(291)
				.split("|");
			let o = 0;
			for (;;) {
				switch (s[o++]) {
					case "0":
						this[n(316)] = null;
						continue;
					case "1":
						this.storage = new ut(e.jWwFo(e[n(301)](this[n(304)], "-"), this[n(259)][n(297)]()));
						continue;
					case "2":
						this.batchInterval = 2e3;
						continue;
					case "3":
						this.BATCH_KEY = r;
						continue;
					case "4":
						this[n(259)] = t;
						continue;
					case "5":
						this[n(282)] = 1;
						continue;
					case "6":
						this[n(243)] = 0;
						continue
				}
				break
			}
		} [ht(269)]() {
			const t = ht,
				n = {
					rxHRf: function(t, n) {
						return t === n
					},
					mWElQ: function(t, n) {
						return t == n
					},
					DdMLN: t(263),
					yGewm: function(t, n) {
						return t === n
					}
				};
			n[t(256)](document.readyState, t(263)) ? (this[t(259)][t(246)](), this[t(259)].collectEvent(o[t(306)]), this[t(300)]()) : document[t(251)] = () => {
				const e = t;
				n[e(253)](e(296), e(309)) ? this.storage[e(245)](_0x7155b4, _0x218eb0) : n.mWElQ(document[e(288)], n[e(258)]) && (this.appModule[e(246)](), this[e(259)][e(293)](o[e(306)]), this[e(300)]())
			}
		} [ht(298)]() {
			const t = ht,
				n = {
					PINsm: function(t, n) {
						return t !== n
					},
					gOgZO: function(t, n) {
						return t(n)
					}
				};
			n[t(286)](this.intervalId, null) && (n[t(319)](clearInterval, this[t(316)]), this[t(316)] = null)
		} [ht(260)](t, n) {
			const e = ht,
				r = {
					Cgbqb: function(t, n) {
						return t(n)
					},
					gaYWh: function(t, n) {
						return t === n
					},
					RiEqa: "complete",
					sFxiW: function(t, n) {
						return t === n
					},
					aGHVI: e(240),
					varCR: e(247),
					aFfsR: function(t) {
						return t()
					},
					qDifv: function(t, n, e) {
						return t(n, e)
					}
				};
			if (r[e(312)](document[e(288)], r[e(275)])) this[e(314)][e(245)](t, n);
			else {
				const s = () => {
					this[e(314)].addToStorage(t, n)
				};
				r.qDifv(setTimeout, (() => {
					const t = e;
					r[t(238)](document[t(288)], r[t(275)]) ? r.sFxiW(r.aGHVI, r.varCR) ? (r[t(279)](_0x4df8a4, this[t(316)]), this.intervalId = null) : r.aFfsR(s) : window[t(308)](t(290), s)
				}), 0)
			}
		} [ht(300)]() {
			const t = ht;
			this.appModule[t(246)](), {
				IApoB: function(t, n) {
					return t === n
				}
			} [t(284)](this[t(316)], null) && (this.intervalId = window[t(310)]((() => this[t(277)]()), this[t(315)]))
		} [ht(277)]() {
			const t = ht,
				n = this[t(314)].getBatch();
			({
				lWaBF: function(t, n) {
					return t !== n
				}
			})[t(236)](n[t(283)], 0) && window.navigator[t(271)] && this.sendBatch(n[t(244)](0, 20))
		}
		sendBatch(t) {
			const n = ht,
				e = {
					kQmiy: n(263),
					tomKT: "load",
					pmVIa: function(t, n) {
						return t === n
					},
					SRivh: n(265),
					RxmNe: function(t, n) {
						return t === n
					},
					EGlOs: function(t, n) {
						return t(n)
					},
					FqZiq: "429",
					DGSbr: function(t, n) {
						return t(n)
					},
					EbwNC: function(t, n) {
						return t !== n
					},
					zFMeD: n(266),
					nAAfk: function(t, n) {
						return t < n
					},
					fAhOZ: function(t, n) {
						return t !== n
					},
					QSteB: n(242),
					BEszW: n(250),
					pQYfc: function(t, n) {
						return t * n
					},
					LrNeH: function(t, n) {
						return t(n)
					},
					oyqto: "203",
					duSef: n(255),
					ZESjs: function(t, n) {
						return t > n
					}
				};
			this[n(298)](), this[n(259)][n(273)](t)[n(295)]((r => {
				const s = n;
				if (e.pmVIa(e[s(294)], s(280))) _0x3a6115.readyState == e.kQmiy && (this[s(259)].solveTask(), this[s(259)][s(293)](_0x2a23db[s(306)]), this[s(300)]());
				else {
					if (e[s(239)](e[s(289)](String, r[s(287)]), e.FqZiq)) return void this.startBatching();
					if (e.pmVIa(e[s(285)](String, r[s(287)])[0], "4")) return;
					if (e[s(239)](e[s(285)](String, r[s(287)])[0], "5")) {
						if (!e[s(248)]("Khacv", e[s(267)])) return void(e[s(307)](this[s(282)], 5) && (e[s(235)](e[s(254)], e.BEszW) ? (this[s(282)]++, this[s(315)] = e.pQYfc(this[s(315)], 2.71), this[s(300)]()) : this[s(311)](_0x5b0875.slice(0, 20))));
						_0x3b3fd4[s(308)](e[s(270)], _0xd463ba)
					}
					if (this[s(282)] = 1, this[s(315)] = 2e3, e[s(317)](e[s(272)](String, r[s(287)]), e[s(274)])) {
						if (!e.EbwNC(e[s(305)], e.duSef)) return this[s(243)]++, this[s(259)][s(276)] = void 0, e[s(262)](this[s(243)], 3) || this[s(259)][s(246)](), void this[s(300)]();
						this[s(259)][s(246)](), this[s(259)][s(293)](_0x230b2d.INIT), this[s(300)]()
					}
					this.taskRetry = 0, this[s(314)][s(302)](this.storage.getBatch()[s(257)]((n => !t[s(313)]((t => JSON[s(278)](n) === JSON[s(278)](t)))))), this[s(300)]()
				}
			}), (t => {
				const e = n;
				console[e(241)](t), this[e(300)]()
			}))
		}
	}

	function dt() {
		var t = ["taskSolution", "830nXWWqD", "PpTbL", "2428904PbeqNH", "1845hcYLan", "data", "30CYdepx", "aee7c93a9ae7930fb19732325d2c560c53849aa7", "EnZQv", "then", "appModule", "HDPUa", "QKgun", "createObjectURL", "TPKft", "onmessage", "uUSVw", "eXrOZ", "init", "XXXXT", "solveTask", "6172684lEjFYJ", "blob", "2230umbvfq", "text", "Ttwys", "TBSpl", "c3e068ebf11840ed3fc311a6f2df80b20fa05d25", "taskParams", "setNewArgs", "dXCIN", "956992SujHmC", "8430ghuuaP", "worker", "459452rHQflB", "Knchb", "ZPPzo", "202226AhLWEK"];
		return (dt = function() {
			return t
		})()
	}
	var mt = St;

	function St(t, n) {
		var e = dt();
		return (St = function(t, n) {
			return e[t -= 423]
		})(t, n)
	}! function(t) {
		for (var n = St, e = t();;) try {
			if (631569 === parseInt(n(450)) / 1 + -parseInt(n(456)) / 2 + parseInt(n(425)) / 3 * (parseInt(n(453)) / 4) + -parseInt(n(458)) / 5 * (parseInt(n(451)) / 6) + -parseInt(n(440)) / 7 + -parseInt(n(460)) / 8 + parseInt(n(423)) / 9 * (parseInt(n(442)) / 10)) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(dt);
	class gt {
		constructor(t) {
			this[St(429)] = t
		}
		async [mt(437)]() {
			var t = mt,
				n = {
					tGIbB: function(t, n) {
						return t === n
					},
					XXXXT: t(459),
					zTVLq: t(436),
					prMSb: function(t, n) {
						return t(n)
					},
					dXCIN: function(t) {
						return t()
					},
					OKitg: function(t, n) {
						return t(n)
					},
					HDPUa: function(t, n) {
						return t + n
					},
					TBSpl: function(t, n) {
						return t(n)
					},
					wFrRo: t(446)
				};
			return new Promise((async (r, s) => {
				var o = t;
				try {
					await n[o(445)](fetch, n[o(430)](e, n.wFrRo))[o(428)]((async t => {
						var s = o,
							i = {
								Knchb: function(t, e) {
									return n.tGIbB(t, e)
								},
								QKgun: n[s(438)],
								EnZQv: n.zTVLq,
								TPKft: function(t, e) {
									return n.prMSb(t, e)
								},
								ZPPzo: function(t) {
									return n[s(449)](t)
								}
							};
						this[s(452)] = new Worker(URL[s(432)](await t[s(441)]())), await n.OKitg(fetch, n[s(430)](e, s(426)))
							.then((async t => {
								var n = s,
									e = {
										xQeXq: function(t, n) {
											return i[St(454)](t, n)
										},
										Ttwys: i[n(431)],
										uUSVw: i[n(427)]
									};
								this[n(429)][n(447)] = i[n(433)](String, await t[n(443)]()), this[n(452)][n(434)] = t => {
									var r = n;
									e.xQeXq(e[r(444)], e[r(435)]) ? this[r(429)][r(457)] = _0x55ec56[r(424)] : this[r(429)][r(457)] = t[r(424)]
								}, i[n(455)](r)
							}))
					}))
				} catch (i) {
					s(i)
				}
			}))
		} [mt(448)](t) {
			var n = mt;
			this[n(429)].taskParams = t, this[n(439)]()
		} [mt(439)]() {
			var t = mt;
			this[t(452)].postMessage(this[t(429)][t(447)])
		}
	}
	var yt = vt;

	function Tt() {
		var t = ["networkController", "getAppName", "230040MDRcIZ", "318hypMiU", "7695660UrItrm", "getApiToken", "3056718cnzAvu", "150jKPYzo", "ADmqc", "602889sgoOMw", "humanProofService", "4238848SqeTlz", "setNewArgs", "recordEvent", "apiToken", "2insiaW", "assembleEventSession", "catch", "init", "collectEvent", "appName", "34419zCiqsJ", "vOmSp", "660NAmeXg", "175048ymtcmw", "recordEvents", "batchService", "solveTask", "ugSPB", "33hjENfi", "then", "sessionController", "split"];
		return (Tt = function() {
			return t
		})()
	}

	function vt(t, n) {
		var e = Tt();
		return (vt = function(t, n) {
			return e[t -= 290]
		})(t, n)
	}! function(t) {
		for (var n = vt, e = t();;) try {
			if (862437 === -parseInt(n(295)) / 1 * (-parseInt(n(301)) / 2) + parseInt(n(292)) / 3 + parseInt(n(310)) / 4 * (-parseInt(n(293)) / 5) + -parseInt(n(322)) / 6 * (-parseInt(n(307)) / 7) + parseInt(n(297)) / 8 + -parseInt(n(321)) / 9 * (-parseInt(n(309)) / 10) + -parseInt(n(315)) / 11 * (parseInt(n(290)) / 12)) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(Tt);
	class Et {
		constructor(t, n) {
			for (var e = vt, r = {
				ADmqc: "5|0|6|1|2|3|4"
			} [e(294)][e(318)]("|"), s = 0;;) {
				switch (r[s++]) {
					case "0":
						this.appName = n;
						continue;
					case "1":
						this[e(317)] = new it(this);
						continue;
					case "2":
						this[e(319)] = new w(this);
						continue;
					case "3":
						this.analyticsController = new d(this);
						continue;
					case "4":
						this[e(312)] = new It(this);
						continue;
					case "5":
						this[e(300)] = t;
						continue;
					case "6":
						this[e(296)] = new gt(this);
						continue
				}
				break
			}
		}
		async init() {
			var t = vt,
				n = {
					vOmSp: function(t, n) {
						return t === n
					},
					ugSPB: "BdDwe"
				};
			this[t(317)].init(), this.analyticsController[t(304)](), await this.humanProofService[t(304)]()[t(316)]((() => {
				var e = t;
				n[e(308)](n[e(314)], n[e(314)]), this[e(313)]()
			}))[t(303)]((t => console.error(t))), this[t(319)].init(), this[t(312)].init()
		} [yt(302)]() {
			return this[yt(317)].assembleEventSession()
		} [yt(299)](t, n, e) {
			return this[yt(319)].recordEvent(t, n, e)
		}
		recordEvents(t) {
			var n = yt;
			return this.networkController[n(311)](t)
		} [yt(305)](t, n) {
			var e = yt;
			this[e(312)].collect(t, {
				...n,
				...this[e(302)]()
			})
		} [yt(291)]() {
			return this.apiToken
		} [yt(320)]() {
			return this[yt(306)]
		} [yt(313)]() {
			var t = yt;
			this[t(296)][t(313)]()
		} [yt(298)](t) {
			var n = yt;
			this[n(296)][n(298)](t)
		}
	}! function(t) {
		const n = bt,
			e = t();
		for (;;) try {
			if (266102 === -parseInt(n(387)) / 1 + -parseInt(n(385)) / 2 + parseInt(n(384)) / 3 * (-parseInt(n(392)) / 4) + parseInt(n(391)) / 5 * (-parseInt(n(382)) / 6) + parseInt(n(389)) / 7 + -parseInt(n(390)) / 8 + parseInt(n(388)) / 9 * (parseInt(n(383)) / 10)) break;
			e.push(e.shift())
		} catch (r) {
			e.push(e.shift())
		}
	}(Nt);

	function bt(t, n) {
		const e = Nt();
		return (bt = function(t, n) {
			return e[t -= 382]
		})(t, n)
	}

	function Nt() {
		const t = ["2925KMrVvo", "1886808rYiOZO", "284544VzEPPi", "10bAtqOK", "4RuapXj", "651018McsKwQ", "22650Unehzo", "888303vSdWoF", "353334GnwZdT", "init", "14225AgjOdr"];
		return (Nt = function() {
			return t
		})()
	}
	return {
		init: async function({
			token: t,
			appName: n
		}) {
			const e = bt;
			new Et(t, n)[e(386)]()
		}
	}
}();