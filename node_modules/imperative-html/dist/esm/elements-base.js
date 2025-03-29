var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
export function applyElementArgs(element, args) {
    var e_1, _a, e_2, _b, e_3, _c;
    try {
        for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
            var arg = args_1_1.value;
            if (arg instanceof Node) {
                element.appendChild(arg);
            }
            else if (typeof arg === "string") {
                element.appendChild(document.createTextNode(arg));
            }
            else if (typeof arg === "function") {
                applyElementArgs(element, [arg()]);
            }
            else if (Array.isArray(arg)) {
                applyElementArgs(element, arg);
            }
            else if (arg && typeof Symbol !== "undefined" && typeof arg[Symbol.iterator] === "function") {
                applyElementArgs(element, __spread(arg));
            }
            else if (arg && arg.constructor === Object && element instanceof Element) {
                try {
                    for (var _d = (e_2 = void 0, __values(Object.keys(arg))), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var key = _e.value;
                        var value = arg[key];
                        if (key === "class") {
                            if (typeof value === "string") {
                                element.setAttribute("class", value);
                            }
                            else if (Array.isArray(arg) || (value && typeof Symbol !== "undefined" && typeof value[Symbol.iterator] === "function")) {
                                element.setAttribute("class", __spread(value).join(" "));
                            }
                            else {
                                console.warn("Invalid " + key + " value \"" + value + "\" on " + element.tagName + " element.");
                            }
                        }
                        else if (key === "style") {
                            if (value && value.constructor === Object) {
                                try {
                                    for (var _f = (e_3 = void 0, __values(Object.keys(value))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var styleKey = _g.value;
                                        if (styleKey in element.style) {
                                            element.style[styleKey] = value[styleKey];
                                        }
                                        else {
                                            element.style.setProperty(styleKey, value[styleKey]);
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                            else {
                                element.setAttribute(key, value);
                            }
                        }
                        else if (typeof (value) === "function") {
                            element[key] = value;
                        }
                        else if (typeof (value) === "boolean") {
                            if (value)
                                element.setAttribute(key, "");
                            else
                                element.removeAttribute(key);
                        }
                        else {
                            element.setAttribute(key, value);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                element.appendChild(document.createTextNode(arg));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return element;
}
export var svgNS = "http://www.w3.org/2000/svg";
export function parseHTML() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return document.createRange().createContextualFragment(args.join());
}
export function parseSVG() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var fragment = document.createDocumentFragment();
    var svgParser = new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\">" + args.join() + "</svg>", "image/svg+xml").documentElement;
    while (svgParser.firstChild !== null) {
        document.importNode(svgParser.firstChild, true);
        fragment.appendChild(svgParser.firstChild);
    }
    return fragment;
}
export function replaceScriptWith() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var currentScript = document.currentScript;
    if (currentScript == null) {
        if (document.readyState === "loading") {
            var scripts = document.getElementsByTagName("script");
            currentScript = scripts[scripts.length - 1];
        }
        if (currentScript == null) {
            console.warn("Couldn't replace script because no script is currently being parsed and executed, maybe this is happening in a callback function or event handler instead?");
            return;
        }
    }
    if (currentScript.parentNode === null) {
        console.warn("Couldn't replace script element because it is not attached to a parent anymore, did you try to replace the same script more than once?");
        return;
    }
    currentScript.parentNode.replaceChild(applyElementArgs(document.createDocumentFragment(), args), currentScript);
}
export function applyToElement(element) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!(element instanceof Element || element instanceof DocumentFragment)) {
        console.warn("Couldn't apply to provided argument because it's not an element or DocumentFragment.");
        return element;
    }
    return applyElementArgs(element, args);
}
//# sourceMappingURL=elements-base.js.map