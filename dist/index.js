import { Fragment as e, createContext as t, forwardRef as n, useCallback as r, useContext as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/lib/env.ts
var f = matchMedia("(prefers-reduced-motion: reduce)").matches, p = matchMedia("(pointer: fine)").matches;
//#endregion
//#region src/components/fx/Ambience.tsx
function m() {
	return /* @__PURE__ */ d("div", {
		className: "aurora",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ u("i", {}),
			/* @__PURE__ */ u("i", {}),
			/* @__PURE__ */ u("i", {})
		]
	});
}
function h({ canvasRef: e }) {
	return /* @__PURE__ */ u("canvas", {
		id: "fxA",
		ref: e,
		"aria-hidden": "true"
	});
}
function g({ canvasRef: e }) {
	return /* @__PURE__ */ u("canvas", {
		id: "fxS",
		ref: e,
		"aria-hidden": "true"
	});
}
function _({ spotRef: e }) {
	return /* @__PURE__ */ u("div", {
		className: "spot",
		ref: e,
		"aria-hidden": "true"
	});
}
function v({ dotRef: e, ringRef: t }) {
	return !p || f ? null : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("div", {
		className: "cursor-dot",
		ref: e
	}), /* @__PURE__ */ u("div", {
		className: "cursor-ring",
		ref: t
	})] });
}
function y({ fxA: e, fxS: t, spotRef: n, dotRef: r, ringRef: i }) {
	return /* @__PURE__ */ d(l, { children: [
		/* @__PURE__ */ u(m, {}),
		/* @__PURE__ */ u(h, { canvasRef: e }),
		/* @__PURE__ */ u(_, { spotRef: n }),
		/* @__PURE__ */ u(g, { canvasRef: t }),
		/* @__PURE__ */ u(v, {
			dotRef: r,
			ringRef: i
		})
	] });
}
function b({ fxA: e, fxS: t, spotRef: n, dotRef: r, ringRef: i }) {
	a(() => {
		if (f) return;
		let a = e.current, o = t.current, s = a.getContext("2d"), c = o.getContext("2d"), l = 0, u = 0, d = () => {
			l = innerWidth, u = innerHeight;
			for (let e of [a, o]) e.width = l * 1, e.height = u * 1, e.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
		};
		d(), addEventListener("resize", d);
		let m = {
			x: innerWidth / 2,
			y: innerHeight / 2
		}, h = [() => removeEventListener("resize", d)], g = [
			[
				238,
				235,
				225
			],
			[
				238,
				235,
				225
			],
			[
				43,
				199,
				164
			],
			[
				255,
				99,
				64
			],
			[
				139,
				124,
				246
			]
		], _ = (e) => ({
			x: Math.random() * l,
			y: e ? Math.random() * u : u + 10,
			z: .25 + Math.random() * .75,
			r: .6 + Math.random() * 1.7,
			a: .06 + Math.random() * .26,
			p: Math.random() * Math.PI * 2,
			c: g[Math.random() * g.length | 0]
		}), v = Array.from({ length: 40 }, () => _(!0)), y = [], b = (e) => {
			for (let t = 0; t < 14; t++) {
				let t = Math.random() * Math.PI * 2, n = 1.4 + Math.random() * 4;
				y.push({
					x: e.clientX,
					y: e.clientY,
					vx: Math.cos(t) * n,
					vy: Math.sin(t) * n - 1.4,
					life: 1,
					r: .8 + Math.random() * 1.8,
					c: Math.random() < .6 ? [
						255,
						99,
						64
					] : [
						238,
						235,
						225
					]
				});
			}
		};
		addEventListener("pointerdown", b), h.push(() => removeEventListener("pointerdown", b));
		let x = 0, S = 0, C = performance.now(), w = 0, T = !0, E = (e) => {
			let t = Math.min(50, e - C) / 16.7;
			if (C = e, e - w >= 31) {
				let t = Math.min(100, e - (w || e - 33)) / 16.7;
				w = e;
				let n = (m.x - l / 2) / l, r = (m.y - u / 2) / u;
				s.clearRect(0, 0, l, u);
				for (let e = 0; e < v.length; e++) {
					let i = v[e];
					if (i.y -= (.12 + .3 * i.z) * t, i.p += .012 * t, i.y < -12) {
						v[e] = _(!1);
						continue;
					}
					s.beginPath(), s.arc(i.x + Math.sin(i.p) * 16 * i.z - n * 44 * i.z, i.y - r * 30 * i.z, i.r * i.z + .4, 0, 7), s.fillStyle = `rgba(${i.c[0]},${i.c[1]},${i.c[2]},${(i.a * (.6 + .4 * Math.sin(i.p * 2))).toFixed(3)})`, s.fill();
				}
			}
			if (y.length) {
				T = !1, c.clearRect(0, 0, l, u);
				for (let e = y.length - 1; e >= 0; e--) {
					let n = y[e];
					if (n.x += n.vx * t, n.y += n.vy * t, n.vy += .1 * t, n.vx *= .96, n.vy *= .96, n.life -= .04 * t, n.life <= 0) {
						y.splice(e, 1);
						continue;
					}
					c.beginPath(), c.arc(n.x, n.y, n.r * n.life + .2, 0, 7), c.shadowColor = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},.85)`, c.shadowBlur = 9, c.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${(n.life * .9).toFixed(3)})`, c.fill(), c.shadowBlur = 0;
				}
			} else T || (T = !0, c.clearRect(0, 0, l, u));
			y.length ? x = requestAnimationFrame(E) : S = window.setTimeout(() => {
				x = requestAnimationFrame(E);
			}, 33);
		};
		x = requestAnimationFrame(E);
		let D = () => {
			cancelAnimationFrame(x), clearTimeout(S), document.hidden || (C = performance.now(), x = requestAnimationFrame(E));
		};
		if (document.addEventListener("visibilitychange", D), h.push(() => {
			cancelAnimationFrame(x), clearTimeout(S), document.removeEventListener("visibilitychange", D);
		}), p) {
			let e = n.current, t = r.current, a = i.current;
			document.documentElement.classList.add("no-cursor"), h.push(() => document.documentElement.classList.remove("no-cursor"));
			let o = {
				x: m.x,
				y: m.y
			}, s = {
				x: m.x,
				y: m.y
			}, c = !1, l = !1, u = () => {}, d = (n) => {
				m.x = n.clientX, m.y = n.clientY, c = !0, u(), l || (l = !0, e.style.opacity = "1", t.style.opacity = "1", a.style.opacity = "1");
				let r = n.target, i = !!r?.closest?.("input,textarea,select");
				a.classList.toggle("act", !i && !!r?.closest?.("a,button,.chip,[data-act],[data-kid],[data-go],.y-node,#yardAdd")), a.classList.toggle("txt", i), t.classList.toggle("txt", i);
			};
			addEventListener("pointermove", d, { passive: !0 }), h.push(() => removeEventListener("pointermove", d));
			let f = () => {
				for (let e of document.querySelectorAll(".panel,.stat")) {
					let t = e.getBoundingClientRect(), n = t.height > Math.max(1200, innerHeight * 1.2);
					e.classList.contains("glow-off") !== n && e.classList.toggle("glow-off", n), !n && (m.x < t.left - 200 || m.x > t.right + 200 || m.y < t.top - 200 || m.y > t.bottom + 200 || (e.style.setProperty("--gx", (m.x - t.left).toFixed(1) + "px"), e.style.setProperty("--gy", (m.y - t.top).toFixed(1) + "px")));
				}
			}, p = 0, g = !1, _ = () => {
				if (!c && Math.abs(m.x - o.x) < .3 && Math.abs(m.y - o.y) < .3 && Math.abs(m.x - s.x) < .3 && Math.abs(m.y - s.y) < .3) {
					g = !1;
					return;
				}
				p = requestAnimationFrame(_), t.style.transform = `translate3d(${m.x}px,${m.y}px,0)`, o.x += (m.x - o.x) * .22, o.y += (m.y - o.y) * .22, a.style.transform = `translate3d(${o.x}px,${o.y}px,0)`, s.x += (m.x - s.x) * .055, s.y += (m.y - s.y) * .055, e.style.transform = `translate3d(${s.x}px,${s.y}px,0)`, c &&= (f(), !1);
			};
			u = () => {
				g || (g = !0, p = requestAnimationFrame(_));
			}, u(), h.push(() => cancelAnimationFrame(p));
			let v = null, y = (e) => {
				let t = e.target?.closest?.(".btn");
				if (v && v !== t && (v.style.transform = "", v = null), !t) return;
				v = t;
				let n = t.getBoundingClientRect();
				t.style.transform = `translate(${((e.clientX - n.left - n.width / 2) * .16).toFixed(1)}px,${((e.clientY - n.top - n.height / 2) * .26).toFixed(1)}px)`;
			};
			document.addEventListener("pointermove", y, { passive: !0 });
			let b = () => {
				v &&= (v.style.transform = "", null);
			};
			document.addEventListener("pointerleave", b), window.addEventListener("blur", b), h.push(() => {
				document.removeEventListener("pointermove", y), document.removeEventListener("pointerleave", b), window.removeEventListener("blur", b);
			});
		}
		return () => {
			h.forEach((e) => e());
		};
	}, [
		r,
		e,
		t,
		i,
		n
	]);
}
function x() {
	let e = s(null), t = s(null), n = s(null), r = s(null), i = s(null);
	return b({
		fxA: e,
		fxS: t,
		spotRef: n,
		dotRef: r,
		ringRef: i
	}), /* @__PURE__ */ u(y, {
		fxA: e,
		fxS: t,
		spotRef: n,
		dotRef: r,
		ringRef: i
	});
}
//#endregion
//#region src/components/ui/Badge.tsx
function S({ tone: e, children: t }) {
	return /* @__PURE__ */ u("span", {
		className: `badge ${e}`,
		children: t
	});
}
//#endregion
//#region src/lib/cx.ts
function C(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region src/components/ui/Button.tsx
function w({ variant: e = "default", tiny: t, className: n, ...r }) {
	return /* @__PURE__ */ u("button", {
		className: C("btn", e !== "default" && e, t && "tiny", n),
		...r
	});
}
//#endregion
//#region src/components/ui/Panel.tsx
function T({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("panel", e),
		...t
	});
}
function E({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("panel-h", e),
		...t
	});
}
function D({ children: e, kana: t }) {
	return /* @__PURE__ */ d("div", {
		className: "ttl",
		children: [
			/* @__PURE__ */ u("i", { className: "sq" }),
			e,
			t && /* @__PURE__ */ u("span", {
				className: "kana",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/ui/Spark.tsx
function O({ seed: e }) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n.charCodeAt(0), 16777619) >>> 0;
	let n = [];
	for (let e = 0; e < 14; e++) {
		t = Math.imul(t, 1103515245) + 12345 >>> 0;
		let r = 3 + t % 1e3 / 1e3 * 15;
		n.push(/* @__PURE__ */ u("rect", {
			x: e * 6,
			y: +(18 - r).toFixed(1),
			width: 4,
			height: +r.toFixed(1),
			rx: 1.2,
			opacity: +(.1 + e / 14 * .5).toFixed(2),
			style: { animationDelay: `${e * 35}ms` }
		}, e));
	}
	return /* @__PURE__ */ u("svg", {
		className: "spark",
		viewBox: "0 0 82 18",
		preserveAspectRatio: "none",
		children: n
	});
}
//#endregion
//#region src/components/ui/TiltCard.tsx
function k({ max: e = 9, ripple: t = !0, onClick: n, children: r, ...i }) {
	let a = s(null);
	return /* @__PURE__ */ u("div", {
		ref: a,
		onPointerMove: (t) => {
			if (!p || f || !a.current) return;
			let n = a.current.getBoundingClientRect(), r = (t.clientX - n.left) / n.width - .5, i = (t.clientY - n.top) / n.height - .5;
			a.current.style.transform = `perspective(640px) rotateX(${(-i * e * .78).toFixed(2)}deg) rotateY(${(r * e).toFixed(2)}deg) translateY(-2px)`;
		},
		onPointerOut: (e) => {
			a.current && (e.relatedTarget instanceof Node && a.current.contains(e.relatedTarget) || (a.current.style.transform = ""));
		},
		onClick: (e) => {
			if (t && a.current) {
				let t = a.current.getBoundingClientRect(), n = document.createElement("span");
				n.className = "ripple";
				let r = Math.max(t.width, t.height) * 2.2;
				n.style.width = n.style.height = r + "px", n.style.left = e.clientX - t.left + "px", n.style.top = e.clientY - t.top + "px", a.current.append(n), setTimeout(() => n.remove(), 650);
			}
			n?.(e);
		},
		...i,
		children: r
	});
}
//#endregion
//#region src/components/ui/Card.tsx
function A(e) {
	return /* @__PURE__ */ u(T, { ...e });
}
function j(e) {
	return /* @__PURE__ */ u(E, { ...e });
}
function M({ children: e, kana: t }) {
	return /* @__PURE__ */ u(D, {
		kana: t,
		children: e
	});
}
function N({ label: e, kana: t, value: n, accent: r, sparkSeed: i, className: a, children: o, ...s }) {
	return /* @__PURE__ */ d(k, {
		className: C("stat", r && "accent", a),
		...s,
		children: [
			/* @__PURE__ */ d("div", {
				className: "stat-head",
				children: [/* @__PURE__ */ u("span", { children: e }), t !== void 0 && /* @__PURE__ */ u("span", {
					className: "stat-badge kana",
					children: t
				})]
			}),
			/* @__PURE__ */ u("b", {
				className: "mono",
				children: n
			}),
			o,
			i && /* @__PURE__ */ u(O, { seed: i })
		]
	});
}
//#endregion
//#region src/components/ui/Chip.tsx
function P({ mono: e, className: t, ...n }) {
	return /* @__PURE__ */ u("span", {
		className: C("chip", e && "mono", t),
		...n
	});
}
//#endregion
//#region src/components/ui/DataTable.tsx
function F({ className: e, style: t, ...n }) {
	return /* @__PURE__ */ u("div", {
		className: e,
		style: {
			overflowX: "auto",
			...t
		},
		...n
	});
}
function I({ className: e, ...t }) {
	return /* @__PURE__ */ u("table", {
		className: C("table", e),
		...t
	});
}
function L({ align: e, style: t, ...n }) {
	return /* @__PURE__ */ u("th", {
		style: {
			textAlign: e,
			...t
		},
		...n
	});
}
function R({ align: e, style: t, ...n }) {
	return /* @__PURE__ */ u("td", {
		style: {
			textAlign: e,
			...t
		},
		...n
	});
}
function z({ colSpan: e = 1, children: t }) {
	return /* @__PURE__ */ u("tr", { children: /* @__PURE__ */ u("td", {
		colSpan: e,
		children: t
	}) });
}
//#endregion
//#region src/components/ui/Divider.tsx
function ee({ subtle: e, className: t, ...n }) {
	return /* @__PURE__ */ u("hr", {
		className: C("divider", e && "subtle", t),
		...n
	});
}
//#endregion
//#region src/components/ui/Dropdown.tsx
function te({ values: e, options: t, onChange: n, label: r, emptyLabel: i = "all" }) {
	let [o, l] = c(!1), [f, p] = c(!1), m = s(null), h = () => {
		p(!0), setTimeout(() => {
			l(!1), p(!1);
		}, 160);
	};
	a(() => {
		if (!o) return;
		let e = (e) => {
			m.current?.contains(e.target) || h();
		}, t = (e) => {
			e.key === "Escape" && h();
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [o]);
	let g = (t) => n(e.includes(t) ? e.filter((e) => e !== t) : [...e, t]), _ = e.length === 0 ? i : e.length <= 2 ? e.join(", ") : e.length + " selected";
	return /* @__PURE__ */ d("div", {
		className: "dd" + (o && !f ? " open" : ""),
		ref: m,
		children: [/* @__PURE__ */ d("button", {
			type: "button",
			className: "dd-btn",
			"aria-haspopup": "listbox",
			"aria-expanded": o,
			onClick: () => o ? h() : l(!0),
			children: [
				r && /* @__PURE__ */ u("em", { children: r }),
				/* @__PURE__ */ u("span", { children: _ }),
				/* @__PURE__ */ u("svg", {
					className: "dd-chev",
					viewBox: "0 0 24 24",
					children: /* @__PURE__ */ u("path", { d: "M6 9l6 6 6-6" })
				})
			]
		}), o && /* @__PURE__ */ d("div", {
			className: "dd-menu multi" + (f ? " out" : ""),
			role: "listbox",
			"aria-multiselectable": !0,
			children: [/* @__PURE__ */ d("button", {
				type: "button",
				role: "option",
				"aria-selected": e.length === 0,
				className: "dd-item" + (e.length === 0 ? " sel" : ""),
				onClick: () => n([]),
				children: [/* @__PURE__ */ u("i", { className: "dd-dot" }), /* @__PURE__ */ u("span", { children: i })]
			}), t.map((t, n) => {
				let r = e.includes(t.value);
				return /* @__PURE__ */ d("button", {
					type: "button",
					role: "option",
					"aria-selected": r,
					className: "dd-item" + (r ? " sel" : ""),
					style: { animationDelay: Math.min(n, 8) * 24 + "ms" },
					onClick: () => g(t.value),
					children: [
						/* @__PURE__ */ u("i", { className: "dd-dot" }),
						/* @__PURE__ */ u("span", { children: t.label }),
						t.hint && /* @__PURE__ */ u("em", { children: t.hint })
					]
				}, t.value);
			})]
		})]
	});
}
function B({ value: e, options: t, onChange: n, label: r }) {
	let [i, o] = c(!1), [l, f] = c(!1), p = s(null), m = () => {
		f(!0), setTimeout(() => {
			o(!1), f(!1);
		}, 160);
	};
	a(() => {
		if (!i) return;
		let e = (e) => {
			p.current?.contains(e.target) || m();
		}, t = (e) => {
			e.key === "Escape" && m();
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [i]);
	let h = t.find((t) => t.value === e);
	return /* @__PURE__ */ d("div", {
		className: "dd" + (i && !l ? " open" : ""),
		ref: p,
		children: [/* @__PURE__ */ d("button", {
			type: "button",
			className: "dd-btn",
			"aria-haspopup": "listbox",
			"aria-expanded": i,
			onClick: () => i ? m() : o(!0),
			children: [
				r && /* @__PURE__ */ u("em", { children: r }),
				/* @__PURE__ */ u("span", { children: h?.label ?? e }),
				/* @__PURE__ */ u("svg", {
					className: "dd-chev",
					viewBox: "0 0 24 24",
					children: /* @__PURE__ */ u("path", { d: "M6 9l6 6 6-6" })
				})
			]
		}), i && /* @__PURE__ */ u("div", {
			className: "dd-menu" + (l ? " out" : ""),
			role: "listbox",
			children: t.map((t, r) => /* @__PURE__ */ d("button", {
				type: "button",
				role: "option",
				"aria-selected": t.value === e,
				className: "dd-item" + (t.value === e ? " sel" : ""),
				style: { animationDelay: r * 24 + "ms" },
				onClick: () => {
					n(t.value), m();
				},
				children: [
					/* @__PURE__ */ u("i", { className: "dd-dot" }),
					/* @__PURE__ */ u("span", { children: t.label }),
					t.hint && /* @__PURE__ */ u("em", { children: t.hint })
				]
			}, t.value))
		})]
	});
}
//#endregion
//#region src/components/ui/Empty.tsx
function V({ children: e, kana: t, style: n }) {
	return /* @__PURE__ */ d("div", {
		className: "empty",
		style: n,
		children: [e, t && /* @__PURE__ */ u("span", {
			className: "kana",
			children: t
		})]
	});
}
//#endregion
//#region src/components/ui/Field.tsx
function H({ label: e, children: t }) {
	return /* @__PURE__ */ d("div", {
		className: "field",
		children: [/* @__PURE__ */ u("label", { children: e }), t]
	});
}
var U = n(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ u("input", {
		ref: n,
		className: C("inp", e),
		...t
	});
}), ne = n(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ u("textarea", {
		ref: n,
		className: C("inp", e),
		...t
	});
}), re = n(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ u("select", {
		ref: n,
		className: C("inp", e),
		...t
	});
});
//#endregion
//#region src/components/ui/Kbd.tsx
function ie({ className: e, ...t }) {
	return /* @__PURE__ */ u("kbd", {
		className: C("kbd", e),
		...t
	});
}
//#endregion
//#region src/components/ui/Lamp.tsx
function W({ tone: e = "idle", pulse: t, on: n }) {
	return /* @__PURE__ */ u("span", { className: C("lamp", e !== "idle" && e, t && "pulse", n && "on") });
}
//#endregion
//#region src/components/ui/Layout.tsx
function ae({ rail: e, children: t, className: n, ...r }) {
	return /* @__PURE__ */ d("div", {
		className: C("app", n),
		...r,
		children: [e, t]
	});
}
function oe({ className: e, ...t }) {
	return /* @__PURE__ */ u("main", {
		className: e,
		...t
	});
}
function se({ logs: e, className: t, ...n }) {
	return /* @__PURE__ */ u("div", {
		className: C("views", e && "views-logs", t),
		...n
	});
}
function ce({ active: e = !0, viewId: t, className: n, ...r }) {
	return /* @__PURE__ */ u("section", {
		id: t ? `view-${t}` : void 0,
		className: C("view", e && "active", n),
		...r
	});
}
function le({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("ov-grid", e),
		...t
	});
}
function ue({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("ov-side", e),
		...t
	});
}
function de({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("view-bar", e),
		...t
	});
}
function fe({ className: e, ...t }) {
	return /* @__PURE__ */ u("span", {
		className: C("spacer", e),
		...t
	});
}
function G({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("pad", e),
		...t
	});
}
function K({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("form-row", e),
		...t
	});
}
function pe({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("models-grid", e),
		...t
	});
}
function me({ className: e, ...t }) {
	return /* @__PURE__ */ u("div", {
		className: C("settings-grid", e),
		...t
	});
}
function he({ gap: e = 18, className: t, style: n, ...r }) {
	return /* @__PURE__ */ u("div", {
		className: t,
		style: {
			display: "flex",
			flexDirection: "column",
			gap: e,
			...n
		},
		...r
	});
}
function ge({ gap: e = 10, wrap: t = !0, align: n = "center", justify: r, className: i, style: a, ...o }) {
	return /* @__PURE__ */ u("div", {
		className: i,
		style: {
			display: "flex",
			flexWrap: t ? "wrap" : "nowrap",
			alignItems: n,
			justifyContent: r,
			gap: e,
			...a
		},
		...o
	});
}
function _e({ minColumnWidth: e = "280px", gap: t = 18, align: n = "start", className: r, style: i, ...a }) {
	return /* @__PURE__ */ u("div", {
		className: r,
		style: {
			display: "grid",
			gridTemplateColumns: `repeat(auto-fit, minmax(${e}, 1fr))`,
			gap: t,
			alignItems: n,
			...i
		},
		...a
	});
}
//#endregion
//#region src/components/ui/Modal.tsx
var ve = 0;
function q({ open: e, onClose: t, title: n, kana: r, children: i, footer: o, wide: s }) {
	return a(() => {
		if (!e) return;
		let n = (e) => {
			e.key === "Escape" && t();
		};
		return addEventListener("keydown", n), () => removeEventListener("keydown", n);
	}, [e, t]), a(() => {
		if (e) return ve++, document.body.style.overflow = "hidden", () => {
			--ve === 0 && (document.body.style.overflow = "");
		};
	}, [e]), e ? /* @__PURE__ */ u("div", {
		className: "overlay",
		onClick: (e) => {
			e.target === e.currentTarget && t();
		},
		children: /* @__PURE__ */ d("div", {
			className: "modal" + (s ? " wide" : ""),
			children: [
				/* @__PURE__ */ u(E, { children: /* @__PURE__ */ u(D, {
					kana: r,
					children: n
				}) }),
				/* @__PURE__ */ u("div", {
					className: "modal-b",
					children: i
				}),
				o && /* @__PURE__ */ u("div", {
					className: "modal-f",
					children: o
				})
			]
		})
	}) : null;
}
//#endregion
//#region src/components/ui/Status.tsx
function ye({ mode: e, children: t, className: n, ...r }) {
	let i = t ?? (e === "live" ? "LIVE" : e === "demo" ? "DEMO" : "CONNECTING");
	return /* @__PURE__ */ d("div", {
		className: C("modechip", e === "live" && "live", e === "demo" && "demo", n),
		...r,
		children: [/* @__PURE__ */ u(W, {
			tone: e === "live" ? "ok" : e === "demo" ? "warn" : "idle",
			pulse: e !== "connecting"
		}), /* @__PURE__ */ u("span", { children: i })]
	});
}
function be({ tone: e, children: t }) {
	return /* @__PURE__ */ u(S, {
		tone: e,
		children: t
	});
}
function xe({ active: e }) {
	return /* @__PURE__ */ u("span", {
		className: "sig-post",
		children: [
			"ok",
			"warn",
			"err"
		].map((t) => /* @__PURE__ */ u(W, {
			tone: t,
			on: e === t
		}, t))
	});
}
function Se({ color: e, className: t, style: n, ...r }) {
	return /* @__PURE__ */ u("span", {
		className: C("line-dot", t),
		style: {
			background: e,
			color: e,
			...n
		},
		...r
	});
}
function Ce({ color: e }) {
	return /* @__PURE__ */ u(Se, {
		className: "prov-dot",
		color: e
	});
}
function J({ label: e, children: t, className: n, ...r }) {
	return /* @__PURE__ */ d("div", {
		className: C("kv", n),
		...r,
		children: [/* @__PURE__ */ u("span", { children: e }), /* @__PURE__ */ u("b", { children: t })]
	});
}
function we({ items: e, className: t, ...n }) {
	return /* @__PURE__ */ u("div", {
		className: C("prov-meta", t),
		...n,
		children: e.map((e, t) => /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("dt", { children: e.label }), /* @__PURE__ */ u("dd", { children: e.value })] }, t))
	});
}
//#endregion
//#region src/components/ui/Typography.tsx
function Te({ as: e = "span", className: t, ...n }) {
	return /* @__PURE__ */ u(e, {
		className: C("mono", t),
		...n
	});
}
function Ee({ as: e = "span", className: t, ...n }) {
	return /* @__PURE__ */ u(e, {
		className: C("kana", t),
		...n
	});
}
function Y({ as: e = "span", className: t, ...n }) {
	return /* @__PURE__ */ u(e, {
		className: C("mut", t),
		...n
	});
}
//#endregion
//#region src/components/ui/toast.tsx
var De = t(() => {}), Oe = () => i(De);
function ke({ children: e }) {
	let [t, n] = c([]), i = s(0), a = r((e, t = "ok") => {
		let r = ++i.current;
		n((n) => [...n, {
			id: r,
			msg: e,
			kind: t,
			fading: !1
		}].slice(-6)), setTimeout(() => n((e) => e.map((e) => e.id === r ? {
			...e,
			fading: !0
		} : e)), 3400), setTimeout(() => n((e) => e.filter((e) => e.id !== r)), 3900);
	}, []);
	return /* @__PURE__ */ d(De.Provider, {
		value: a,
		children: [e, /* @__PURE__ */ u("div", {
			className: "toasts",
			children: t.map((e) => /* @__PURE__ */ d("div", {
				className: "toast" + (e.kind === "ok" ? "" : " " + e.kind),
				style: e.fading ? {
					opacity: 0,
					transition: "opacity .4s"
				} : void 0,
				children: [/* @__PURE__ */ u("span", { className: "lamp " + e.kind }), e.msg]
			}, e.id))
		})]
	});
}
//#endregion
//#region src/components/kou/types.ts
var Ae = {
	overview: {
		t: "Overview",
		k: "概況"
	},
	providers: {
		t: "Lines",
		k: "路線"
	},
	keys: {
		t: "API Keys",
		k: "鍵"
	},
	models: {
		t: "Models",
		k: "車両"
	},
	logs: {
		t: "Request Logs",
		k: "記録"
	},
	settings: {
		t: "Settings",
		k: "設定"
	}
}, je = [
	"#8b7cf6",
	"#4f8ef7",
	"#ffb454",
	"#f56fa1",
	"#9ad24f"
];
function X(e, t = 0) {
	let n = `${e.provider || ""} ${e.name || ""} ${e.id || ""}`.toLowerCase();
	return /claude|anthropic/.test(n) ? "var(--claude)" : /codex|openai|gpt/.test(n) ? "var(--codex)" : /gemini|google/.test(n) ? "#7aa2ff" : je[t % je.length];
}
function Me(e) {
	let t = (e.name || e.provider || "??").replace(/[^a-zA-Z0-9 ]/g, " ").trim(), n = t.split(/\s+/);
	return (n.length > 1 ? n[0][0] + n[1][0] : t.slice(0, 2)).toUpperCase();
}
function Z(e) {
	let t = (e || "").toLowerCase();
	return /claude|anthropic/.test(t) ? "var(--claude)" : /codex|gpt|o\d|openai/.test(t) ? "var(--codex)" : "#8b7cf6";
}
//#endregion
//#region src/components/kou/views.tsx
function Ne(e) {
	if (!e) return "—";
	let t = (Date.now() - new Date(e).getTime()) / 1e3;
	return t < 0 ? "soon" : t < 60 ? Math.floor(t) + "s ago" : t < 3600 ? Math.floor(t / 60) + "m ago" : t < 86400 ? Math.floor(t / 3600) + "h ago" : Math.floor(t / 86400) + "d ago";
}
function Pe(e, t = !1) {
	let n = (e) => String(e).padStart(2, "0");
	return t ? n(e.getUTCHours()) + ":" + n(e.getUTCMinutes()) : n(e.getHours()) + ":" + n(e.getMinutes()) + ":" + n(e.getSeconds());
}
function Fe(e) {
	return e.enabled ? e.rate_limited_until && new Date(e.rate_limited_until) > /* @__PURE__ */ new Date() ? ["warn", "LIMITED"] : e.circuit_open_until && new Date(e.circuit_open_until) > /* @__PURE__ */ new Date() ? ["err", "TRIPPED"] : e.last_error ? ["warn", "ERR·SEEN"] : ["ok", "READY"] : ["off", "OFF"];
}
var Ie = [
	{
		view: "overview",
		label: "Overview",
		kana: "概況",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [
				/* @__PURE__ */ u("circle", {
					cx: "5",
					cy: "12",
					r: "2"
				}),
				/* @__PURE__ */ u("circle", {
					cx: "19",
					cy: "6",
					r: "2"
				}),
				/* @__PURE__ */ u("circle", {
					cx: "19",
					cy: "18",
					r: "2"
				}),
				/* @__PURE__ */ u("path", { d: "M7 12h4m0 0c4 0 4-6 6-6m-6 6c4 0 4 6 6 6" })
			]
		})
	},
	{
		view: "providers",
		label: "Lines",
		kana: "路線",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [
				/* @__PURE__ */ u("path", { d: "M4 7h16M4 17h16" }),
				/* @__PURE__ */ u("circle", {
					cx: "9",
					cy: "7",
					r: "2"
				}),
				/* @__PURE__ */ u("circle", {
					cx: "15",
					cy: "17",
					r: "2"
				})
			]
		})
	},
	{
		view: "keys",
		label: "API Keys",
		kana: "鍵",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ u("circle", {
				cx: "8",
				cy: "14",
				r: "4"
			}), /* @__PURE__ */ u("path", { d: "M11 11l8-8m-3 1l2 2m-5 1l2 2" })]
		})
	},
	{
		view: "models",
		label: "Models",
		kana: "車両",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ u("rect", {
				x: "3",
				y: "9",
				width: "18",
				height: "7",
				rx: "2"
			}), /* @__PURE__ */ u("path", { d: "M7 16v2m10-2v2M6 12.5h.01M10 12.5h8" })]
		})
	},
	{
		view: "logs",
		label: "Logs",
		kana: "記録",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ u("path", { d: "M6 3h12v18H6z" }), /* @__PURE__ */ u("path", { d: "M9.5 7.5h5.5M9.5 11h5.5M9.5 14.5h3" })]
		})
	},
	{
		view: "settings",
		label: "Settings",
		kana: "設定",
		icon: /* @__PURE__ */ d("svg", {
			viewBox: "0 0 24 24",
			children: [
				/* @__PURE__ */ u("path", { d: "M4 8h10m4 0h2M4 16h2m4 0h10" }),
				/* @__PURE__ */ u("circle", {
					cx: "16",
					cy: "8",
					r: "2"
				}),
				/* @__PURE__ */ u("circle", {
					cx: "8",
					cy: "16",
					r: "2"
				})
			]
		})
	}
], Le = {
	connecting: {
		tone: "idle",
		text: "BOOT…"
	},
	live: {
		tone: "ok",
		text: "ON LINE"
	},
	demo: {
		tone: "warn",
		text: "DEMO"
	}
};
function Re({ view: e, mode: t, onNavigate: n, version: r = "kou v0.1" }) {
	let i = Le[t];
	return /* @__PURE__ */ d("aside", {
		className: "rail",
		children: [
			/* @__PURE__ */ d("div", {
				className: "brand",
				children: [/* @__PURE__ */ u("div", {
					className: "hanko",
					children: "光"
				}), /* @__PURE__ */ d("div", {
					className: "brand-t",
					children: [/* @__PURE__ */ u("b", { children: "KOU" }), /* @__PURE__ */ u("span", { children: "ROUTER" })]
				})]
			}),
			/* @__PURE__ */ d("nav", { children: [/* @__PURE__ */ u("span", {
				className: "nav-cap",
				children: "DISPATCH · 運行"
			}), Ie.map((t) => /* @__PURE__ */ d("a", {
				href: "#" + t.view,
				className: e === t.view ? "active" : void 0,
				onClick: (e) => {
					e.preventDefault(), n(t.view);
				},
				children: [
					t.icon,
					/* @__PURE__ */ u("span", { children: t.label }),
					/* @__PURE__ */ u("i", { children: t.kana })
				]
			}, t.view))] }),
			/* @__PURE__ */ d("div", {
				className: "rail-foot",
				children: [
					/* @__PURE__ */ u(W, {
						tone: i.tone === "idle" ? "idle" : i.tone,
						pulse: !0
					}),
					/* @__PURE__ */ u(Te, { children: i.text }),
					/* @__PURE__ */ u("span", {
						className: "ver",
						children: r
					})
				]
			})
		]
	});
}
function ze() {
	let [e, t] = c(() => /* @__PURE__ */ new Date());
	return a(() => {
		let e = setInterval(() => t(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(e);
	}, []), e;
}
function Be({ view: e, mode: t, showAuthButton: n, onSignOut: r }) {
	let i = ze(), a = Ae[e];
	return /* @__PURE__ */ d("header", {
		className: "top",
		children: [/* @__PURE__ */ d("div", {
			className: "crumb",
			children: [/* @__PURE__ */ u("h1", { children: a.t }), /* @__PURE__ */ u(Ee, { children: a.k })]
		}), /* @__PURE__ */ d("div", {
			className: "top-right",
			children: [
				/* @__PURE__ */ u(ye, { mode: t }),
				/* @__PURE__ */ d("div", {
					className: "clock mono",
					children: [/* @__PURE__ */ u("span", { children: Pe(i) }), /* @__PURE__ */ d("em", { children: ["UTC ", Pe(i, !0)] })]
				}),
				n && /* @__PURE__ */ u(w, {
					onClick: r,
					children: "SIGN OUT"
				})
			]
		})]
	});
}
function Ve({ error: e, onSubmit: t }) {
	let [n, r] = c(""), i = () => {
		t(n);
	};
	return /* @__PURE__ */ u("div", {
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 90,
			display: "grid",
			placeItems: "center"
		},
		children: /* @__PURE__ */ d(A, {
			style: {
				width: "min(340px, 86vw)",
				padding: "26px 24px"
			},
			children: [
				/* @__PURE__ */ u(Y, {
					as: "p",
					style: {
						fontSize: "11px",
						letterSpacing: ".35em",
						margin: "0 0 2px"
					},
					children: "改札 KOU-ROUTER"
				}),
				/* @__PURE__ */ u("h1", {
					style: {
						fontSize: "15px",
						letterSpacing: ".18em",
						margin: "0 0 16px"
					},
					children: "TICKET GATE"
				}),
				/* @__PURE__ */ u(H, {
					label: "ADMIN PASSWORD",
					children: /* @__PURE__ */ u(U, {
						type: "password",
						autoFocus: !0,
						autoComplete: "current-password",
						value: n,
						onChange: (e) => r(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && i();
						}
					})
				}),
				/* @__PURE__ */ u(w, {
					variant: "primary",
					style: {
						width: "100%",
						marginTop: 12
					},
					onClick: i,
					children: "ENTER"
				}),
				/* @__PURE__ */ u("p", {
					style: {
						minHeight: 18,
						margin: "10px 0 0",
						fontSize: "12px",
						color: "var(--shu, #ff4f30)"
					},
					children: e
				})
			]
		})
	});
}
function He({ e, animate: t }) {
	return /* @__PURE__ */ d("div", {
		className: "board-r" + (t ? " in" : ""),
		children: [
			/* @__PURE__ */ u("span", {
				className: "t",
				children: e.time
			}),
			/* @__PURE__ */ u("span", {
				className: "m",
				children: e.model
			}),
			/* @__PURE__ */ d("span", {
				className: "ln",
				children: [/* @__PURE__ */ u("i", { style: { background: e.color } }), e.line]
			}),
			/* @__PURE__ */ u("span", {
				className: "st " + e.status,
				children: e.status === "ok" ? "OK" : e.status === "warn" ? "LIM" : "ERR"
			}),
			/* @__PURE__ */ u("span", {
				className: "lat",
				children: e.lat ?? "—"
			})
		]
	});
}
function Ue({ rows: e, mode: t, animate: n }) {
	return /* @__PURE__ */ d(A, { children: [/* @__PURE__ */ d(j, { children: [/* @__PURE__ */ u(M, {
		kana: "発車標",
		children: "DEPARTURES"
	}), /* @__PURE__ */ u(Y, {
		className: "mono",
		style: {
			marginLeft: "auto",
			fontSize: 10,
			letterSpacing: ".14em"
		},
		children: t === "demo" ? "synthetic traffic" : t === "live" ? "account telemetry" : ""
	})] }), /* @__PURE__ */ d("div", {
		className: "board mono",
		children: [/* @__PURE__ */ d("div", {
			className: "board-r head",
			children: [
				/* @__PURE__ */ u("span", {
					className: "t",
					children: "TIME"
				}),
				/* @__PURE__ */ u("span", {
					className: "m",
					children: "MODEL"
				}),
				/* @__PURE__ */ u("span", {
					className: "ln",
					children: "LINE"
				}),
				/* @__PURE__ */ u("span", {
					className: "st",
					children: "STATUS"
				}),
				/* @__PURE__ */ u("span", {
					className: "lat",
					children: "LAT"
				})
			]
		}), e.length ? e.map((e) => /* @__PURE__ */ u(He, {
			e,
			animate: n
		}, e.id)) : /* @__PURE__ */ u(V, {
			kana: "待機中",
			children: "AWAITING TRAFFIC"
		})]
	})] });
}
function We({ url: e, onCopy: t }) {
	return /* @__PURE__ */ d(A, { children: [
		/* @__PURE__ */ d(j, { children: [/* @__PURE__ */ u(M, {
			kana: "入口",
			children: "INGRESS"
		}), /* @__PURE__ */ u(Y, {
			className: "mono",
			style: {
				marginLeft: "auto",
				fontSize: 10,
				letterSpacing: ".14em"
			},
			children: "click = copy"
		})] }),
		/* @__PURE__ */ u("div", {
			className: "chips",
			style: { paddingBottom: 6 },
			children: /* @__PURE__ */ u(P, {
				mono: !0,
				className: "ingress-url",
				onClick: t,
				children: e
			})
		}),
		/* @__PURE__ */ u("p", {
			className: "mut",
			style: {
				margin: 0,
				padding: "0 18px 14px",
				fontSize: 11.5
			},
			children: "chat · completions · responses · messages · embeddings · images · audio · moderations · rerank · search — все под одним base URL"
		})
	] });
}
function Ge({ rows: e }) {
	return /* @__PURE__ */ d(A, { children: [/* @__PURE__ */ u(j, { children: /* @__PURE__ */ u(M, {
		kana: "信号",
		children: "SIGNALS"
	}) }), /* @__PURE__ */ d("div", {
		id: "signals",
		children: [e.length === 0 && /* @__PURE__ */ u(V, {
			kana: "路線なし",
			children: "NO LINES CONNECTED"
		}), e.map((e) => /* @__PURE__ */ d("div", {
			className: "sig",
			children: [
				/* @__PURE__ */ u(xe, { active: e.signal.s }),
				/* @__PURE__ */ d("span", {
					className: "sig-name",
					children: [/* @__PURE__ */ u(Se, { color: e.color }), e.name]
				}),
				/* @__PURE__ */ u("span", {
					className: "sig-note mono" + (e.signal.s === "warn" ? " warn" : e.signal.s === "err" ? " err" : ""),
					children: e.signal.note
				})
			]
		}, e.id))]
	})] });
}
function Ke(e, t = 900) {
	let [n, r] = c(0), i = s(!1);
	return a(() => {
		if (e == null) return;
		if (f || i.current || e <= 0) {
			i.current = !0, r(e);
			return;
		}
		i.current = !0;
		let n = performance.now(), a = 0, o = (i) => {
			let s = Math.min(1, (i - n) / t);
			r(Math.round(e * (1 - (1 - s) ** 3))), s < 1 && (a = requestAnimationFrame(o));
		};
		return a = requestAnimationFrame(o), () => cancelAnimationFrame(a);
	}, [e, t]), e == null ? null : n;
}
function qe({ tile: e, onNavigate: t }) {
	let n = Ke(e.value);
	return /* @__PURE__ */ u(N, {
		label: e.label,
		kana: e.kana,
		value: n ?? "—",
		accent: e.accent,
		sparkSeed: e.label + ":" + (e.value ?? "—"),
		"data-go": e.go,
		onClick: () => setTimeout(() => t(e.go), f ? 0 : 160)
	});
}
function Je({ tiles: e, onNavigate: t }) {
	return /* @__PURE__ */ u("div", {
		className: "stats",
		id: "stats",
		children: e.map((e) => /* @__PURE__ */ u(qe, {
			tile: e,
			onNavigate: t
		}, e.label))
	});
}
var Ye = [
	"/v1/messages",
	"/v1/chat/completions",
	"/v1/responses"
];
function Xe({ providers: t, accounts: n, authed: r, demo: i, mode: p, onNavigate: m, onFlashProvider: h, onAddLine: g, getSignal: _ }) {
	let v = s(null), [y, b] = c(null), { H: x, W: S, coreX: C, coreY: w, nodeX: T, cliYs: E, provYs: D, ghostY: O } = o(() => {
		let e = Math.max(t.length, 1) + 1, n = Math.max(300, 120 + e * 64), r = n / 2;
		return {
			H: n,
			W: 1200,
			coreX: 520,
			coreY: r,
			nodeX: 905,
			cliYs: Ye.map((e, t) => r + (t - 1) * 58),
			provYs: t.map((t, n) => r + (n - (e - 1) / 2) * 64),
			ghostY: r + (e - 1 - (e - 1) / 2) * 64
		};
	}, [t]), k = (e) => `M 60 ${e} C 240 ${e}, 300 ${w}, ${C - 46} ${w}`, N = (e) => `M ${C + 46} ${w} C ${C + 200} ${w}, ${C + 230} ${e}, ${T - 34} ${e}`;
	a(() => {
		if (f) return;
		let e = v.current;
		if (!e) return;
		let n = [], r = (t, r, i, a) => {
			let o = +(a + Math.random() * 1.6).toFixed(2), s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			s.setAttribute("r", String(i)), s.setAttribute("fill", r), s.setAttribute("opacity", ".9");
			let c = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
			c.setAttribute("dur", o + "s"), c.setAttribute("repeatCount", "1"), c.setAttribute("fill", "freeze"), c.setAttribute("begin", "indefinite");
			let l = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
			return l.setAttribute("href", "#" + t), c.append(l), s.append(c), e.append(s), c.beginElement(), n.push(window.setTimeout(() => s.remove(), o * 1e3 + 80)), o;
		}, i = t.map((e, t) => ({
			p: e,
			i: t
		})).filter((e) => e.p.enabled !== !1);
		return Ye.forEach((t, a) => {
			let o = () => {
				if (!e.isConnected) return;
				let t = r("cli-" + a, "rgba(238,235,225,.65)", 2.4, 2.2);
				if (i.length) {
					let a = i[Math.random() * i.length | 0];
					n.push(window.setTimeout(() => {
						e.isConnected && r("trk-" + a.i, X(a.p, a.i), 3, 2.6);
					}, t * 1e3 + 140));
				}
				n.push(window.setTimeout(o, 1100 + Math.random() * 2600));
			};
			n.push(window.setTimeout(o, Math.random() * 1800));
		}), () => n.forEach(clearTimeout);
	}, [t, p]);
	let P = o(() => {
		let e = t.map(_);
		return e.some((e) => e.s === "err") ? {
			cls: "err",
			text: "SERVICE DISRUPTION · 運転見合わせ"
		} : e.some((e) => e.s === "warn") ? {
			cls: "warn",
			text: "MINOR DELAYS · 遅延あり"
		} : {
			cls: "",
			text: "ALL LINES OPERATIONAL · 全線運転"
		};
	}, [t, _]);
	return /* @__PURE__ */ d(A, {
		className: "hero",
		children: [
			/* @__PURE__ */ d(j, { children: [/* @__PURE__ */ u(M, {
				kana: "配線盤",
				children: "SWITCHYARD"
			}), /* @__PURE__ */ d("div", {
				className: "hero-live",
				children: [/* @__PURE__ */ u("span", { className: "lamp ok pulse" }), /* @__PURE__ */ u("span", { children: p === "live" ? "LIVE FLOW" : p === "demo" ? "DEMO FLOW" : "—" })]
			})] }),
			/* @__PURE__ */ u("div", {
				id: "yard",
				children: /* @__PURE__ */ d("svg", {
					ref: v,
					viewBox: `0 0 ${S} ${x}`,
					xmlns: "http://www.w3.org/2000/svg",
					className: y == null ? void 0 : "focused",
					children: [
						/* @__PURE__ */ d("defs", { children: [
							/* @__PURE__ */ d("linearGradient", {
								id: "hankoGrad",
								x1: "0",
								y1: "0",
								x2: "1",
								y2: "1",
								children: [/* @__PURE__ */ u("stop", {
									offset: "0",
									stopColor: "#ff5a36"
								}), /* @__PURE__ */ u("stop", {
									offset: "1",
									stopColor: "#cf3517"
								})]
							}),
							/* @__PURE__ */ d("filter", {
								id: "fGlow",
								filterUnits: "userSpaceOnUse",
								x: -24,
								y: -24,
								width: S + 48,
								height: x + 48,
								children: [/* @__PURE__ */ u("feGaussianBlur", {
									stdDeviation: "3.5",
									result: "b"
								}), /* @__PURE__ */ d("feMerge", { children: [/* @__PURE__ */ u("feMergeNode", { in: "b" }), /* @__PURE__ */ u("feMergeNode", { in: "SourceGraphic" })] })]
							}),
							/* @__PURE__ */ u("filter", {
								id: "fBlur",
								filterUnits: "userSpaceOnUse",
								x: -24,
								y: -24,
								width: S + 48,
								height: x + 48,
								children: /* @__PURE__ */ u("feGaussianBlur", { stdDeviation: "3" })
							}),
							t.map((e, t) => e.enabled !== !1 && /* @__PURE__ */ d("linearGradient", {
								id: `tg-${t}`,
								gradientUnits: "userSpaceOnUse",
								x1: C + 46,
								y1: w,
								x2: T - 34,
								y2: D[t],
								children: [
									/* @__PURE__ */ u("stop", {
										offset: "0",
										style: {
											stopColor: X(e, t),
											stopOpacity: .08
										}
									}),
									/* @__PURE__ */ u("stop", {
										offset: ".55",
										style: {
											stopColor: X(e, t),
											stopOpacity: .3
										}
									}),
									/* @__PURE__ */ u("stop", {
										offset: "1",
										style: {
											stopColor: X(e, t),
											stopOpacity: .95
										}
									})
								]
							}, e.id))
						] }),
						Ye.map((t, n) => /* @__PURE__ */ d(e, { children: [
							/* @__PURE__ */ u("path", {
								id: `cli-${n}`,
								d: k(E[n]),
								fill: "none",
								stroke: "var(--line-2)",
								strokeWidth: 2,
								opacity: .55
							}),
							/* @__PURE__ */ u("path", {
								d: k(E[n]),
								pathLength: 100,
								fill: "none",
								stroke: "rgba(238,235,225,.4)",
								strokeWidth: 1,
								strokeDasharray: "2 8",
								opacity: .12
							}),
							/* @__PURE__ */ u("circle", {
								cx: 60,
								cy: E[n],
								r: 4,
								fill: "var(--ink)",
								stroke: "var(--faint)",
								strokeWidth: 1.5
							}),
							/* @__PURE__ */ u("text", {
								className: "y-label",
								x: 74,
								y: E[n] - 9,
								children: t
							})
						] }, t)),
						/* @__PURE__ */ u("text", {
							className: "y-core-cap",
							x: 60,
							y: E[0] - 38,
							children: "CLIENTS 入口"
						}),
						t.map((t, n) => {
							let r = D[n], i = X(t, n), a = N(r), o = y === n;
							return /* @__PURE__ */ d(e, { children: [/* @__PURE__ */ u("path", {
								d: a,
								fill: "none",
								stroke: "var(--line-2)",
								strokeWidth: 4,
								opacity: .32
							}), t.enabled === !1 ? /* @__PURE__ */ u("path", {
								id: `trk-${n}`,
								className: "y-trk",
								d: a,
								fill: "none",
								stroke: i,
								strokeWidth: 1.6,
								opacity: .22
							}) : /* @__PURE__ */ d(l, { children: [
								/* @__PURE__ */ u("path", {
									id: `glo-${n}`,
									className: "y-glo" + (o ? " lit" : ""),
									d: a,
									fill: "none",
									stroke: `url(#tg-${n})`,
									strokeWidth: 5,
									filter: "url(#fBlur)",
									opacity: .55
								}),
								/* @__PURE__ */ u("path", {
									id: `trk-${n}`,
									className: "y-trk" + (o ? " lit" : ""),
									d: a,
									fill: "none",
									stroke: `url(#tg-${n})`,
									strokeWidth: 1.6
								}),
								/* @__PURE__ */ u("path", {
									className: "y-flow",
									d: a,
									pathLength: 100,
									fill: "none",
									stroke: i,
									strokeWidth: 1.4,
									strokeDasharray: "2 8",
									opacity: .22
								})
							] })] }, t.id);
						}),
						/* @__PURE__ */ d("g", { children: [
							/* @__PURE__ */ u("g", {
								className: "y-orbit",
								children: /* @__PURE__ */ u("circle", {
									cx: C,
									cy: w,
									r: 70,
									fill: "none",
									stroke: "var(--line-2)",
									strokeWidth: 1,
									strokeDasharray: "2 10",
									opacity: .7
								})
							}),
							/* @__PURE__ */ u("circle", {
								cx: C,
								cy: w,
								r: 56,
								fill: "none",
								stroke: "var(--line-2)",
								strokeWidth: 1,
								opacity: .6
							}),
							/* @__PURE__ */ u("circle", {
								cx: C,
								cy: w,
								r: 62,
								fill: "none",
								stroke: "var(--shu)",
								strokeWidth: 1,
								opacity: .16
							}),
							/* @__PURE__ */ u("rect", {
								x: C - 34,
								y: w - 34,
								width: 68,
								height: 68,
								rx: 14,
								fill: "url(#hankoGrad)",
								transform: `rotate(-4 ${C} ${w})`,
								stroke: "rgba(255,255,255,.22)",
								strokeWidth: 1
							}),
							/* @__PURE__ */ u("text", {
								className: "y-core-glyph",
								x: C,
								y: w + 11,
								textAnchor: "middle",
								transform: `rotate(-4 ${C} ${w})`,
								children: "光"
							}),
							/* @__PURE__ */ u("text", {
								className: "y-core-cap",
								x: C,
								y: w + 62,
								textAnchor: "middle",
								children: "KOU CORE"
							})
						] }),
						t.map((e, t) => {
							let a = D[t], o = X(e, t), s = n[e.id] || [], c = s.filter((e) => e.enabled).length, l = e.rate_limited_until && new Date(e.rate_limited_until) > /* @__PURE__ */ new Date(), f = e.enabled === !1 ? "var(--faint)" : l ? "var(--warn)" : "var(--ok)", p = r || i ? `${c || s.length || 0} ACCOUNT${(c || s.length) === 1 ? "" : "S"}` : (e.provider || "").toUpperCase();
							return /* @__PURE__ */ d("g", {
								className: "y-node",
								opacity: e.enabled === !1 ? .45 : 1,
								onMouseEnter: () => b(t),
								onMouseLeave: () => b((e) => e === t ? null : e),
								onClick: () => {
									m("providers"), h(e.id);
								},
								children: [
									/* @__PURE__ */ u("circle", {
										cx: T,
										cy: a,
										r: 25,
										fill: "var(--ink-2)",
										stroke: o,
										strokeWidth: 2
									}),
									/* @__PURE__ */ u("circle", {
										cx: T,
										cy: a,
										r: 30,
										fill: "none",
										stroke: o,
										strokeWidth: 1,
										opacity: .22
									}),
									/* @__PURE__ */ u("text", {
										className: "y-node-code",
										x: T,
										y: a + 4.5,
										textAnchor: "middle",
										children: Me(e)
									}),
									/* @__PURE__ */ u("circle", {
										cx: T + 19,
										cy: a - 18,
										r: 4,
										fill: f
									}),
									/* @__PURE__ */ u("text", {
										className: "y-label-lg",
										x: T + 44,
										y: a - 2,
										children: e.name || e.provider
									}),
									/* @__PURE__ */ u("text", {
										className: "y-sub",
										x: T + 44,
										y: a + 14,
										children: p
									})
								]
							}, e.id);
						}),
						/* @__PURE__ */ u("path", {
							d: `M ${C + 46} ${w} C ${C + 200} ${w}, ${C + 230} ${O}, ${T - 34} ${O}`,
							fill: "none",
							stroke: "var(--line-2)",
							strokeWidth: 1.4,
							strokeDasharray: "3 6",
							opacity: .55
						}),
						/* @__PURE__ */ d("g", {
							id: "yardAdd",
							className: "y-node",
							onClick: g,
							children: [
								/* @__PURE__ */ u("circle", {
									cx: T,
									cy: O,
									r: 25,
									fill: "transparent",
									stroke: "var(--faint)",
									strokeWidth: 1.4,
									strokeDasharray: "4 5"
								}),
								/* @__PURE__ */ u("text", {
									className: "y-node-code",
									x: T,
									y: O + 5,
									textAnchor: "middle",
									fill: "var(--faint)",
									children: "+"
								}),
								/* @__PURE__ */ u("text", {
									className: "y-sub",
									x: T + 44,
									y: O + 4,
									children: "ADD LINE · 新路線"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ d("div", {
				className: "hero-ticker mono",
				children: [/* @__PURE__ */ u("span", { children: "KOU CORE · EAST GATE" }), /* @__PURE__ */ u("span", {
					id: "tickerRight",
					className: P.cls,
					children: P.text
				})]
			})
		]
	});
}
function Ze() {
	return /* @__PURE__ */ u(x, {});
}
function Qe({ account: e, onAction: t }) {
	let [n, r] = Fe(e);
	return /* @__PURE__ */ d("div", {
		className: "acc-row",
		children: [
			/* @__PURE__ */ u("span", { className: "lamp" + (n === "off" ? "" : " " + n) }),
			/* @__PURE__ */ d("div", {
				className: "who",
				children: [/* @__PURE__ */ u("b", { children: e.label || e.remote_email || "#" + String(e.id).slice(0, 8) }), e.label && e.remote_email ? /* @__PURE__ */ u("span", { children: e.remote_email }) : null]
			}),
			/* @__PURE__ */ d("span", {
				className: "mono",
				children: [
					(e.auth_mode || "").toUpperCase(),
					" · P",
					e.priority ?? 0
				]
			}),
			/* @__PURE__ */ d("span", {
				className: "mono",
				children: [
					r,
					" · ",
					Ne(e.last_used_at),
					e.proxy_url ? " · proxy" : ""
				]
			}),
			/* @__PURE__ */ d("div", {
				className: "acc-actions",
				children: [
					e.auth_mode === "oauth" && /* @__PURE__ */ u(w, {
						tiny: !0,
						"data-act": !0,
						onClick: () => t("refresh", e),
						children: "REFRESH"
					}),
					/* @__PURE__ */ u(w, {
						tiny: !0,
						"data-act": !0,
						onClick: () => t(e.enabled ? "disable" : "enable", e),
						children: e.enabled ? "HOLD" : "RELEASE"
					}),
					/* @__PURE__ */ u(w, {
						tiny: !0,
						"data-act": !0,
						onClick: () => t("proxy", e),
						children: "PROXY"
					}),
					/* @__PURE__ */ u(w, {
						tiny: !0,
						variant: "danger",
						"data-act": !0,
						onClick: () => t("delete", e),
						children: "DEL"
					})
				]
			})
		]
	});
}
function $e({ provider: e, index: t, accounts: n, authed: r, demo: i, flash: o, signal: c, onConnect: l, onAction: f }) {
	let p = s(null), m = X(e, t);
	return a(() => {
		o && p.current?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}, [o]), /* @__PURE__ */ u("div", {
		ref: p,
		children: /* @__PURE__ */ d(A, {
			className: "prov-card" + (o ? " flash" : ""),
			"data-pid": e.id,
			children: [
				/* @__PURE__ */ d("div", {
					className: "prov-head",
					children: [
						/* @__PURE__ */ u(Ce, { color: m }),
						/* @__PURE__ */ u("span", {
							className: "prov-name",
							children: e.name || e.provider
						}),
						/* @__PURE__ */ u(P, {
							mono: !0,
							children: e.provider
						}),
						/* @__PURE__ */ u(be, {
							tone: e.enabled === !1 ? "off" : c.s === "warn" ? "warn" : "on",
							children: e.enabled === !1 ? "CLOSED" : c.s === "warn" ? "DELAYS" : "IN SERVICE"
						}),
						/* @__PURE__ */ u("span", {
							className: "prov-url",
							style: { marginLeft: "auto" },
							children: e.base_url || ""
						})
					]
				}),
				/* @__PURE__ */ u(we, { items: [
					{
						label: "PREFIX",
						value: e.model_prefix || "—"
					},
					{
						label: "PRIORITY",
						value: e.priority ?? "—"
					},
					{
						label: "DEFAULT MODEL",
						value: e.default_model || "—"
					},
					{
						label: "SIGNAL",
						value: c.note
					}
				] }),
				/* @__PURE__ */ d("div", {
					className: "acc-zone",
					children: [/* @__PURE__ */ d("div", {
						className: "acc-head",
						children: ["ACCOUNTS · 口座", r || i ? /* @__PURE__ */ u(w, {
							tiny: !0,
							variant: "primary",
							"data-act": !0,
							onClick: () => l(e.id),
							children: "+ CONNECT"
						}) : /* @__PURE__ */ u("span", {
							style: { marginLeft: "auto" },
							children: "sign in to manage"
						})]
					}), (r || i) && (n.length ? n.map((e) => /* @__PURE__ */ u(Qe, {
						account: e,
						onAction: f
					}, e.id)) : /* @__PURE__ */ u(V, {
						kana: "口座なし",
						style: { padding: 18 },
						children: "NO ACCOUNTS"
					}))]
				})
			]
		})
	});
}
function et({ providers: e, accounts: t, authed: n, demo: r, flashProviderId: i, onImportPreset: a, onConnect: o, onAccountAction: s, getSignal: c }) {
	return /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d(de, { children: [
		/* @__PURE__ */ u(Y, { children: "Provider connections and their authenticated accounts." }),
		/* @__PURE__ */ u(fe, {}),
		/* @__PURE__ */ u(w, {
			variant: "primary",
			onClick: a,
			children: "+ IMPORT PRESET"
		})
	] }), /* @__PURE__ */ d(he, { children: [e.length === 0 && /* @__PURE__ */ u(A, { children: /* @__PURE__ */ u(V, {
		kana: "路線を追加してください",
		children: "NO PROVIDER LINES YET — IMPORT A PRESET"
	}) }), e.map((e, a) => /* @__PURE__ */ u($e, {
		provider: e,
		index: a,
		accounts: t[e.id] || [],
		authed: n,
		demo: r,
		flash: i === e.id,
		signal: c(e),
		onConnect: o,
		onAction: s
	}, e.id))] })] });
}
function tt({ open: e, selected: t, available: n, name: r, prefix: i, onPresetChange: a, onNameChange: o, onPrefixChange: s, onClose: c, onImport: f }) {
	return /* @__PURE__ */ d(q, {
		open: e,
		onClose: c,
		title: "IMPORT LINE",
		kana: "路線追加",
		footer: /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u(w, {
			onClick: c,
			children: "CANCEL"
		}), /* @__PURE__ */ u(w, {
			variant: "primary",
			disabled: !t,
			onClick: f,
			children: "IMPORT"
		})] }),
		children: [
			/* @__PURE__ */ u(H, {
				label: "PRESET",
				children: /* @__PURE__ */ u(B, {
					value: t,
					onChange: a,
					options: n.map((e) => ({
						value: e.id,
						label: e.display_name,
						hint: e.base_url
					}))
				})
			}),
			/* @__PURE__ */ u(H, {
				label: "NAME (optional)",
				children: /* @__PURE__ */ u(U, {
					placeholder: "My Claude",
					value: r,
					onChange: (e) => o(e.target.value)
				})
			}),
			/* @__PURE__ */ u(H, {
				label: "MODEL PREFIX (optional)",
				children: /* @__PURE__ */ u(U, {
					placeholder: "claude",
					value: i,
					onChange: (e) => s(e.target.value)
				})
			})
		]
	});
}
function nt({ open: e, authMode: t, label: n, redirect: r, defaultRedirect: i, proxy: a, code: o, apiKey: s, sessionActive: c, onAuthModeChange: f, onLabelChange: p, onRedirectChange: m, onProxyChange: h, onCodeChange: g, onApiKeyChange: _, onClose: v, onSubmit: y }) {
	return /* @__PURE__ */ d(q, {
		open: e,
		onClose: v,
		title: "CONNECT ACCOUNT",
		kana: "口座接続",
		footer: /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u(w, {
			onClick: v,
			children: "CANCEL"
		}), /* @__PURE__ */ u(w, {
			variant: "primary",
			onClick: y,
			children: t === "oauth" ? c ? "COMPLETE" : "START" : "SAVE"
		})] }),
		children: [
			/* @__PURE__ */ u(H, {
				label: "MODE",
				children: /* @__PURE__ */ u(B, {
					value: t,
					onChange: (e) => f(e),
					options: [{
						value: "oauth",
						label: "OAuth"
					}, {
						value: "api_key",
						label: "API key"
					}]
				})
			}),
			/* @__PURE__ */ u(H, {
				label: "LABEL",
				children: /* @__PURE__ */ u(U, {
					placeholder: "main",
					value: n,
					onChange: (e) => p(e.target.value)
				})
			}),
			t === "oauth" ? /* @__PURE__ */ d(l, { children: [
				/* @__PURE__ */ u(H, {
					label: "REDIRECT URI",
					children: /* @__PURE__ */ u(U, {
						value: r ?? i,
						onChange: (e) => m(e.target.value)
					})
				}),
				/* @__PURE__ */ u(H, {
					label: "PROXY FOR OAUTH (optional)",
					children: /* @__PURE__ */ u(U, {
						placeholder: "socks5://…",
						value: a,
						onChange: (e) => h(e.target.value)
					})
				}),
				c && /* @__PURE__ */ u(H, {
					label: "PASTE CODE (code or code#state)",
					children: /* @__PURE__ */ u(U, {
						placeholder: "ac_…",
						value: o,
						onChange: (e) => g(e.target.value)
					})
				})
			] }) : /* @__PURE__ */ u(H, {
				label: "API KEY",
				children: /* @__PURE__ */ u(U, {
					placeholder: "sk-…",
					value: s,
					onChange: (e) => _(e.target.value)
				})
			})
		]
	});
}
function rt({ keys: e, authed: t, name: n, selectedModels: r, modelOptions: i, newKey: a, onNameChange: o, onSelectedModelsChange: s, onCreate: c, onRevoke: f, onCloseNewKey: p, onCopyNewKey: m }) {
	return /* @__PURE__ */ d(l, { children: [
		/* @__PURE__ */ d(A, { children: [/* @__PURE__ */ u(j, { children: /* @__PURE__ */ u(M, {
			kana: "発行",
			children: "ISSUE KEY"
		}) }), /* @__PURE__ */ d(K, { children: [
			/* @__PURE__ */ u(H, {
				label: "NAME",
				children: /* @__PURE__ */ u(U, {
					placeholder: "my-app",
					value: n,
					onChange: (e) => o(e.target.value)
				})
			}),
			/* @__PURE__ */ u(H, {
				label: "ALLOWED MODELS",
				children: /* @__PURE__ */ u(te, {
					values: r,
					onChange: s,
					emptyLabel: "* all models",
					options: i
				})
			}),
			/* @__PURE__ */ u(w, {
				variant: "primary",
				onClick: c,
				children: "CREATE"
			})
		] })] }),
		/* @__PURE__ */ d(A, { children: [/* @__PURE__ */ u(j, { children: /* @__PURE__ */ u(M, {
			kana: "鍵一覧",
			children: "ACTIVE KEYS"
		}) }), /* @__PURE__ */ u(F, { children: /* @__PURE__ */ u(I, { children: /* @__PURE__ */ u("tbody", { children: t ? e.length === 0 ? /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
			kana: "鍵なし",
			children: "NO KEYS ISSUED"
		}) }) : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d("tr", { children: [
			/* @__PURE__ */ u(L, {}),
			/* @__PURE__ */ u(L, { children: "NAME" }),
			/* @__PURE__ */ u(L, { children: "PREFIX" }),
			/* @__PURE__ */ u(L, { children: "MODELS" }),
			/* @__PURE__ */ u(L, { children: "USAGE" }),
			/* @__PURE__ */ u(L, { children: "LAST USED" }),
			/* @__PURE__ */ u(L, { children: "ISSUED" }),
			/* @__PURE__ */ u(L, {})
		] }), e.map((e) => /* @__PURE__ */ d("tr", { children: [
			/* @__PURE__ */ u(R, { children: /* @__PURE__ */ u(W, { tone: e.is_active === !1 ? "idle" : "ok" }) }),
			/* @__PURE__ */ u(R, { children: /* @__PURE__ */ u("b", { children: e.name }) }),
			/* @__PURE__ */ d(R, {
				className: "mono",
				children: [e.key_prefix, "…"]
			}),
			/* @__PURE__ */ u(R, {
				className: "mono",
				children: (e.allowed_models || ["*"]).join(", ")
			}),
			/* @__PURE__ */ u(R, {
				className: "mono",
				children: e.usage_count ?? 0
			}),
			/* @__PURE__ */ u(R, {
				className: "mono",
				children: Ne(e.last_used_at)
			}),
			/* @__PURE__ */ u(R, {
				className: "mono",
				children: e.created_at ? new Date(e.created_at).toLocaleDateString() : "—"
			}),
			/* @__PURE__ */ u(R, {
				align: "right",
				children: /* @__PURE__ */ u(w, {
					tiny: !0,
					variant: "danger",
					"data-kid": e.id,
					onClick: () => f(e),
					children: "REVOKE"
				})
			})
		] }, e.id))] }) : /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
			kana: "要認証",
			children: "SIGN IN TO MANAGE KEYS"
		}) }) }) }) })] }),
		/* @__PURE__ */ d(q, {
			open: a !== null,
			onClose: p,
			title: "KEY ISSUED",
			kana: "発行済",
			footer: /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u(w, {
				variant: "primary",
				onClick: m,
				children: "COPY"
			}), /* @__PURE__ */ u(w, {
				onClick: p,
				children: "DONE"
			})] }),
			children: [/* @__PURE__ */ u(Y, {
				as: "p",
				style: { fontSize: "12.5px" },
				children: "Copy it now — it is shown only once."
			}), /* @__PURE__ */ u("div", {
				className: "keybox",
				children: a
			})]
		})
	] });
}
function it({ models: e, aliases: t, alias: n, target: r, onAliasChange: i, onTargetChange: a, onAddAlias: o }) {
	return /* @__PURE__ */ d(pe, { children: [/* @__PURE__ */ d(A, { children: [/* @__PURE__ */ d(j, { children: [/* @__PURE__ */ u(M, {
		kana: "車両一覧",
		children: "ROLLING STOCK"
	}), /* @__PURE__ */ d(Y, {
		className: "mono",
		style: {
			marginLeft: "auto",
			fontSize: 10
		},
		children: [e.length, " UNITS"]
	})] }), /* @__PURE__ */ d("div", { children: [e.length === 0 && /* @__PURE__ */ u(V, {
		kana: "車両なし",
		children: "NO MODELS VISIBLE"
	}), e.map((e) => /* @__PURE__ */ d("div", {
		className: "model-li",
		children: [
			/* @__PURE__ */ u("i", { style: { background: Z(e.id) } }),
			e.id,
			/* @__PURE__ */ u("span", { children: e.owned_by || "" })
		]
	}, e.id))] })] }), /* @__PURE__ */ d(A, { children: [
		/* @__PURE__ */ u(j, { children: /* @__PURE__ */ u(M, {
			kana: "別名",
			children: "ALIASES"
		}) }),
		/* @__PURE__ */ d(K, { children: [
			/* @__PURE__ */ u(H, {
				label: "ALIAS",
				children: /* @__PURE__ */ u(U, {
					placeholder: "fast",
					value: n,
					onChange: (e) => i(e.target.value)
				})
			}),
			/* @__PURE__ */ u(H, {
				label: "TARGET",
				children: /* @__PURE__ */ u(U, {
					placeholder: "claude-haiku-4-5",
					value: r,
					onChange: (e) => a(e.target.value)
				})
			}),
			/* @__PURE__ */ u(w, {
				variant: "primary",
				onClick: o,
				children: "MAP"
			})
		] }),
		/* @__PURE__ */ u(F, { children: /* @__PURE__ */ u(I, { children: /* @__PURE__ */ u("tbody", { children: t.length === 0 ? /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
			kana: "別名なし",
			children: "NO ALIASES"
		}) }) : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d("tr", { children: [
			/* @__PURE__ */ u(L, { children: "ALIAS" }),
			/* @__PURE__ */ u(L, {}),
			/* @__PURE__ */ u(L, { children: "TARGET" })
		] }), t.map((e) => /* @__PURE__ */ d("tr", { children: [
			/* @__PURE__ */ u(R, {
				className: "mono",
				style: { color: "var(--shu)" },
				children: e.alias
			}),
			/* @__PURE__ */ u(R, {
				className: "mut mono",
				align: "center",
				children: "→"
			}),
			/* @__PURE__ */ u(R, {
				className: "mono",
				children: e.target
			})
		] }, e.alias))] }) }) }) })
	] })] });
}
var at = 100, ot = {
	"chat.completions": "OPENAI-CHAT",
	completions: "OPENAI-LEGACY",
	messages: "ANTHROPIC",
	responses: "OPENAI-RESPONSES",
	"ollama.chat": "OLLAMA"
}, st = (e) => ot[e] ?? e.replace(".", "-").toUpperCase(), ct = (e) => (e.includes("/") ? e.slice(e.indexOf("/") + 1) : e) || "—";
function Q(e) {
	return e < 400 ? "ok" : e === 429 ? "warn" : "err";
}
function lt(e) {
	return e < 1e3 ? e + "ms" : (e / 1e3).toFixed(1) + "s";
}
function $(e) {
	return e == null ? "—" : e.toLocaleString("en-US").replace(/,/g, " ");
}
function ut(e) {
	return !e.output_tokens || e.duration_ms <= 0 ? null : e.output_tokens / (e.duration_ms / 1e3);
}
function dt(e) {
	if (!e) return "—";
	let t = e;
	try {
		t = JSON.stringify(JSON.parse(e), null, 2);
	} catch {}
	return t.length > 4e4 ? t.slice(0, 4e4) + `\n… truncated (${t.length.toLocaleString()} chars)` : t;
}
function ft({ logs: t, providers: n, authed: r, detail: i, onRefresh: s, onClean: f, onOpenLog: p, onCloseDetail: m }) {
	let [h, g] = c(""), [_, v] = c("all"), [y, b] = c("all"), [x, S] = c(at), C = (e) => {
		if (!e) return "—";
		if (e.startsWith("unresolved:")) return "unresolved";
		let t = n.find((t) => t.id === e);
		return t ? t.name || t.provider : e.slice(0, 8);
	}, T = (e) => {
		let t = n.findIndex((t) => t.id === e);
		return t >= 0 ? X(n[t], t) : "var(--faint)";
	}, E = o(() => (t ?? []).filter((e) => !(_ === "ok" && e.status >= 400 || _ === "err" && e.status < 400 || y !== "all" && e.provider_id !== y || h.trim() && ![
		e.requested_model,
		e.resolved_model,
		e.endpoint,
		e.account_label,
		e.api_key_name,
		C(e.provider_id),
		String(e.status),
		e.id
	].join(" ").toLowerCase().includes(h.trim().toLowerCase()))), [
		t,
		_,
		y,
		h,
		n
	]);
	a(() => {
		S(at);
	}, [
		h,
		_,
		y
	]);
	let D = o(() => E.slice(0, x), [E, x]), O = t?.length ?? 0, k = (t ?? []).filter((e) => e.status < 400).length, N = o(() => i ? [...new Set([...i.upstream_requests.map((e) => e.sequence_no), ...i.upstream_responses.map((e) => e.sequence_no)])].sort((e, t) => e - t).map((e) => ({
		seq: e,
		req: i.upstream_requests.find((t) => t.sequence_no === e),
		resp: i.upstream_responses.find((t) => t.sequence_no === e)
	})) : [], [i]), P = i?.log, ee = P ? ut(P) : null;
	return /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d(A, { children: [
		/* @__PURE__ */ d(j, { children: [
			/* @__PURE__ */ u(M, {
				kana: "運行記録",
				children: "REQUEST LOG"
			}),
			/* @__PURE__ */ d("div", {
				className: "logs-stats mono",
				children: [
					/* @__PURE__ */ d("span", {
						className: "chip",
						children: [O, " total"]
					}),
					/* @__PURE__ */ d("span", {
						className: "chip lg-ok",
						children: [k, " ok"]
					}),
					/* @__PURE__ */ d("span", {
						className: "chip lg-err",
						children: [O - k, " err"]
					}),
					/* @__PURE__ */ d("span", {
						className: "chip",
						children: [E.length, " shown"]
					})
				]
			}),
			/* @__PURE__ */ u(w, {
				tiny: !0,
				onClick: s,
				children: "REFRESH"
			}),
			/* @__PURE__ */ u(w, {
				tiny: !0,
				variant: "danger",
				onClick: f,
				children: "CLEAN HISTORY"
			})
		] }),
		/* @__PURE__ */ d("div", {
			className: "logs-bar",
			children: [
				/* @__PURE__ */ u(U, {
					placeholder: "search models, providers, accounts, keys…",
					value: h,
					onChange: (e) => g(e.target.value),
					style: { maxWidth: 280 }
				}),
				/* @__PURE__ */ u(B, {
					label: "STATUS",
					value: _,
					onChange: (e) => v(e),
					options: [
						{
							value: "all",
							label: "all statuses"
						},
						{
							value: "ok",
							label: "success",
							hint: "2xx"
						},
						{
							value: "err",
							label: "errors",
							hint: "4xx·5xx"
						}
					]
				}),
				/* @__PURE__ */ u(B, {
					label: "LINE",
					value: y,
					onChange: b,
					options: [{
						value: "all",
						label: "all providers"
					}, ...n.map((e) => ({
						value: e.id,
						label: e.name || e.provider
					}))]
				})
			]
		}),
		/* @__PURE__ */ u(F, { children: /* @__PURE__ */ u(I, {
			className: "logs-table",
			children: /* @__PURE__ */ u("tbody", { children: r ? t === null ? /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
				kana: "読込中",
				children: "LOADING…"
			}) }) : E.length === 0 ? /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
				kana: "記録なし",
				children: "NO REQUESTS RECORDED"
			}) }) : /* @__PURE__ */ d(l, { children: [
				/* @__PURE__ */ d("tr", { children: [
					/* @__PURE__ */ u(L, { children: "STATUS" }),
					/* @__PURE__ */ u(L, { children: "MODEL" }),
					/* @__PURE__ */ u(L, { children: "REQUESTED" }),
					/* @__PURE__ */ u(L, { children: "PROVIDER" }),
					/* @__PURE__ */ u(L, { children: "PROTOCOL" }),
					/* @__PURE__ */ u(L, { children: "ACCOUNT" }),
					/* @__PURE__ */ u(L, { children: "API KEY" }),
					/* @__PURE__ */ u(L, {
						align: "right",
						children: "TOKENS"
					}),
					/* @__PURE__ */ u(L, {
						align: "right",
						children: "TPS"
					}),
					/* @__PURE__ */ u(L, {
						align: "right",
						children: "DURATION"
					}),
					/* @__PURE__ */ u(L, {
						align: "right",
						children: "TIME"
					})
				] }),
				D.map((e) => {
					let t = ut(e);
					return /* @__PURE__ */ d("tr", {
						className: "lg-row",
						onClick: () => p(e),
						title: e.error ?? e.id,
						children: [
							/* @__PURE__ */ u(R, { children: /* @__PURE__ */ u("span", {
								className: "lg-st " + Q(e.status),
								children: e.status
							}) }),
							/* @__PURE__ */ u(R, {
								className: "mono",
								style: { color: Z(e.resolved_model) },
								children: ct(e.resolved_model)
							}),
							/* @__PURE__ */ u(R, {
								className: "mono mut",
								children: e.requested_model || "—"
							}),
							/* @__PURE__ */ u(R, { children: e.provider_id ? /* @__PURE__ */ u("span", {
								className: "lg-prov mono",
								style: { "--pc": T(e.provider_id) },
								children: C(e.provider_id).toUpperCase()
							}) : "—" }),
							/* @__PURE__ */ d(R, { children: [/* @__PURE__ */ u("span", {
								className: "chip lg-proto",
								children: st(e.endpoint)
							}), e.is_stream && /* @__PURE__ */ u("span", {
								className: "chip lg-sse",
								children: "SSE"
							})] }),
							/* @__PURE__ */ u(R, {
								className: "mono mut lg-trunc",
								children: e.account_label ?? "—"
							}),
							/* @__PURE__ */ u(R, {
								className: "mono mut lg-trunc",
								children: e.api_key_name ?? "—"
							}),
							/* @__PURE__ */ d(R, {
								className: "mono lg-tokens",
								align: "right",
								children: [
									/* @__PURE__ */ d("i", {
										className: "ti",
										children: ["TI: ", $(e.input_tokens)]
									}),
									/* @__PURE__ */ u("span", {
										className: "mut",
										children: " | "
									}),
									/* @__PURE__ */ d("i", {
										className: "to",
										children: ["TO: ", $(e.output_tokens)]
									})
								]
							}),
							/* @__PURE__ */ u(R, {
								className: "mono",
								align: "right",
								children: t === null ? /* @__PURE__ */ u("span", {
									className: "mut",
									children: "—"
								}) : /* @__PURE__ */ u("span", {
									className: "lg-tps" + (t >= 10 ? " hi" : ""),
									children: t.toFixed(1)
								})
							}),
							/* @__PURE__ */ u(R, {
								className: "mono mut",
								align: "right",
								children: lt(e.duration_ms)
							}),
							/* @__PURE__ */ u(R, {
								className: "mono mut",
								align: "right",
								children: Pe(new Date(e.created_at))
							})
						]
					}, e.id);
				}),
				E.length > x && /* @__PURE__ */ u("tr", { children: /* @__PURE__ */ u(R, {
					colSpan: 11,
					align: "center",
					style: { padding: "12px" },
					children: /* @__PURE__ */ d(w, {
						tiny: !0,
						onClick: () => S((e) => e + 2 * at),
						children: [
							"SHOW MORE (",
							E.length - x,
							" hidden)"
						]
					})
				}) })
			] }) : /* @__PURE__ */ u(z, { children: /* @__PURE__ */ u(V, {
				kana: "要認証",
				children: "SIGN IN TO VIEW LOGS"
			}) }) })
		}) })
	] }), /* @__PURE__ */ u(q, {
		open: i !== null,
		onClose: m,
		title: "REQUEST PIPELINE",
		kana: "経路",
		wide: !0,
		footer: /* @__PURE__ */ u(w, {
			onClick: m,
			children: "CLOSE"
		}),
		children: P && /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ d("div", {
			className: "lg-sum mono",
			children: [
				/* @__PURE__ */ u("span", {
					className: "lg-st " + Q(P.status),
					children: P.status
				}),
				/* @__PURE__ */ u("span", {
					className: "chip lg-proto",
					children: st(P.endpoint)
				}),
				P.is_stream && /* @__PURE__ */ u("span", {
					className: "chip lg-sse",
					children: "SSE"
				}),
				/* @__PURE__ */ u("span", {
					className: "chip",
					style: { color: Z(P.resolved_model) },
					children: ct(P.resolved_model)
				}),
				P.provider_id && /* @__PURE__ */ u("span", {
					className: "chip",
					children: C(P.provider_id)
				}),
				P.account_label && /* @__PURE__ */ u("span", {
					className: "chip",
					children: P.account_label
				}),
				P.api_key_name && /* @__PURE__ */ d("span", {
					className: "chip",
					children: ["key: ", P.api_key_name]
				}),
				/* @__PURE__ */ u("span", {
					className: "chip",
					children: lt(P.duration_ms)
				}),
				/* @__PURE__ */ d("span", {
					className: "chip lg-tokens",
					children: [
						/* @__PURE__ */ d("i", {
							className: "ti",
							children: ["TI: ", $(P.input_tokens)]
						}),
						" · ",
						/* @__PURE__ */ d("i", {
							className: "to",
							children: ["TO: ", $(P.output_tokens)]
						})
					]
				}),
				ee !== null && /* @__PURE__ */ d("span", {
					className: "chip",
					children: [ee.toFixed(1), " t/s"]
				}),
				P.cost_usd != null && /* @__PURE__ */ d("span", {
					className: "chip",
					children: ["$", P.cost_usd.toFixed(4)]
				}),
				/* @__PURE__ */ d("span", {
					className: "chip mut",
					children: [
						P.attempts,
						" attempt",
						P.attempts === 1 ? "" : "s"
					]
				})
			]
		}), /* @__PURE__ */ d("div", {
			className: "lg-pipe",
			children: [
				/* @__PURE__ */ d("div", {
					className: "lg-step",
					children: [/* @__PURE__ */ d("div", {
						className: "lg-step-h",
						children: [
							/* @__PURE__ */ u("b", { children: "CLIENT → ROUTER" }),
							/* @__PURE__ */ u("span", {
								className: "chip lg-proto",
								children: st(P.endpoint)
							}),
							/* @__PURE__ */ u("span", {
								className: "mut mono",
								children: P.requested_model || "—"
							})
						]
					}), /* @__PURE__ */ u("pre", {
						className: "lg-json",
						children: dt(P.client_body)
					})]
				}),
				N.map((t) => /* @__PURE__ */ d(e, { children: [t.req && /* @__PURE__ */ d("div", {
					className: "lg-step",
					children: [/* @__PURE__ */ d("div", {
						className: "lg-step-h",
						children: [
							/* @__PURE__ */ d("b", { children: ["ROUTER → ", C(t.req.provider_id).toUpperCase()] }),
							/* @__PURE__ */ u("span", {
								className: "chip",
								children: ct(t.req.model)
							}),
							N.length > 1 && /* @__PURE__ */ d("span", {
								className: "mut",
								children: ["attempt ", t.seq]
							})
						]
					}), /* @__PURE__ */ u("pre", {
						className: "lg-json",
						children: dt(t.req.raw_body)
					})]
				}), t.resp && /* @__PURE__ */ d("div", {
					className: "lg-step resp" + (t.resp.upstream_status >= 400 ? " bad" : ""),
					children: [/* @__PURE__ */ d("div", {
						className: "lg-step-h",
						children: [
							/* @__PURE__ */ d("b", { children: [C(t.resp.provider_id).toUpperCase(), " → ROUTER"] }),
							/* @__PURE__ */ u("span", {
								className: "lg-st " + Q(t.resp.upstream_status),
								children: t.resp.upstream_status
							}),
							N.length > 1 && /* @__PURE__ */ d("span", {
								className: "mut",
								children: ["attempt ", t.seq]
							})
						]
					}), /* @__PURE__ */ u("pre", {
						className: "lg-json",
						children: dt(t.resp.raw_body)
					})]
				})] }, t.seq)),
				N.length === 0 && !P.error && /* @__PURE__ */ d("div", {
					className: "lg-step resp",
					children: [/* @__PURE__ */ u("div", {
						className: "lg-step-h",
						children: /* @__PURE__ */ u("b", { children: "ROUTER → UPSTREAM" })
					}), /* @__PURE__ */ u("pre", {
						className: "lg-json",
						children: "no upstream attempts recorded for this request"
					})]
				}),
				P.error && /* @__PURE__ */ d("div", {
					className: "lg-step bad",
					children: [/* @__PURE__ */ d("div", {
						className: "lg-step-h",
						children: [/* @__PURE__ */ u("b", { children: "ROUTER → CLIENT" }), /* @__PURE__ */ u("span", {
							className: "lg-st " + Q(P.status),
							children: P.status
						})]
					}), /* @__PURE__ */ u("pre", {
						className: "lg-json lg-errtext",
						children: P.error
					})]
				})
			]
		})] })
	})] });
}
function pt({ demo: e, authed: t, authStatus: n, settingsJson: r, onSettingsJsonChange: i, onSave: a, onSignOut: o }) {
	return /* @__PURE__ */ d(me, { children: [/* @__PURE__ */ d(A, { children: [/* @__PURE__ */ u(j, { children: /* @__PURE__ */ u(M, {
		kana: "改札",
		children: "GUARD"
	}) }), e ? /* @__PURE__ */ d(G, { children: [
		/* @__PURE__ */ u(J, {
			label: "MODE",
			children: "demo — guard preview"
		}),
		/* @__PURE__ */ u(J, {
			label: "AUTH",
			children: "enabled"
		}),
		/* @__PURE__ */ u(J, {
			label: "SESSION",
			children: "admin"
		})
	] }) : n ? /* @__PURE__ */ d(G, { children: [
		/* @__PURE__ */ u(J, {
			label: "AUTH REQUIRED",
			children: n.auth_required ? "yes" : "no"
		}),
		/* @__PURE__ */ u(J, {
			label: "SETUP COMPLETE",
			children: n.setup_complete ? "yes" : "no"
		}),
		/* @__PURE__ */ u(J, {
			label: "SESSION",
			children: t ? "authenticated" : "anonymous"
		}),
		/* @__PURE__ */ u("div", {
			style: {
				display: "flex",
				gap: 8,
				marginTop: 4
			},
			children: t && n.auth_required && /* @__PURE__ */ u(w, {
				onClick: o,
				children: "SIGN OUT"
			})
		}),
		/* @__PURE__ */ u(Y, {
			as: "p",
			style: {
				fontSize: "12px",
				marginTop: 8
			},
			children: "The admin password is set in the CLI on first run, or via KOU_ROUTER_ADMIN_PASSWORD in non-interactive environments."
		})
	] }) : /* @__PURE__ */ u(G, { children: /* @__PURE__ */ u(J, {
		label: "STATUS",
		children: "unreachable"
	}) })] }), /* @__PURE__ */ d(A, { children: [/* @__PURE__ */ d(j, { children: [/* @__PURE__ */ u(M, {
		kana: "設定",
		children: "ROUTER SETTINGS"
	}), /* @__PURE__ */ u(w, {
		tiny: !0,
		variant: "primary",
		style: { marginLeft: "auto" },
		onClick: a,
		children: "SAVE"
	})] }), /* @__PURE__ */ u(G, { children: /* @__PURE__ */ u(ne, {
		className: "mono",
		spellCheck: !1,
		placeholder: "{ }",
		value: r,
		onChange: (e) => i(e.target.value)
	}) })] })] });
}
//#endregion
export { x as Ambience, ae as AppShell, m as AuroraBackground, S as Badge, w as Button, A as Card, j as CardHeader, M as CardTitle, P as Chip, v as CustomCursor, I as DataTable, we as DefinitionList, ee as Divider, B as Dropdown, h as EmberCanvas, V as Empty, p as FINE, H as Field, K as FormRow, ge as Inline, U as Input, Ae as KOU_VIEW_META, Ee as KanaText, ie as Kbd, J as KeyValue, Ze as KouAmbience, nt as KouConnectAccountModal, Ue as KouDeparturesBoard, y as KouFxLayers, Ve as KouGateScreen, tt as KouImportLineModal, We as KouIngressChips, rt as KouKeysView, ft as KouLogsView, it as KouModelsView, et as KouProvidersView, Re as KouRail, pt as KouSettingsView, Ge as KouSignals, Je as KouStatsStrip, Xe as KouSwitchyard, Be as KouTopBar, W as Lamp, Se as LineDot, oe as MainPane, N as MetricCard, q as Modal, ye as ModeChip, pe as ModelsGrid, Te as MonoText, te as MultiDropdown, Y as MutedText, le as OverviewGrid, G as Pad, T as Panel, E as PanelHeader, D as PanelTitle, _ as PointerSpotlight, Ce as ProviderDot, f as REDUCED, _e as ResponsiveGrid, re as Select, me as SettingsGrid, ue as SideStack, xe as SignalPost, fe as Spacer, O as Spark, g as SparkCanvas, he as Stack, be as StatusBadge, R as TableCell, z as TableEmptyRow, L as TableHeadCell, F as TableScroll, ne as TextArea, k as TiltCard, ke as ToastProvider, de as Toolbar, ce as ViewSection, se as Views, C as cx, Me as lineCode, X as lineColor, Z as modelColor, b as useKouAmbience, Oe as useToast };
