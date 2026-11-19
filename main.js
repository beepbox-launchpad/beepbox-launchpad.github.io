(() => {
  // imperative-html/elements-base.js
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spread = function() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
  };
  function applyElementArgs(element, args) {
    var e_12, _a2, e_22, _b2, e_3, _c2;
    try {
      for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
        var arg = args_1_1.value;
        if (arg instanceof Node) {
          element.appendChild(arg);
        } else if (typeof arg === "string") {
          element.appendChild(document.createTextNode(arg));
        } else if (typeof arg === "function") {
          applyElementArgs(element, [arg()]);
        } else if (Array.isArray(arg)) {
          applyElementArgs(element, arg);
        } else if (arg && typeof Symbol !== "undefined" && typeof arg[Symbol.iterator] === "function") {
          applyElementArgs(element, __spread(arg));
        } else if (arg && arg.constructor === Object && element instanceof Element) {
          try {
            for (var _d2 = (e_22 = void 0, __values(Object.keys(arg))), _e2 = _d2.next(); !_e2.done; _e2 = _d2.next()) {
              var key = _e2.value;
              var value = arg[key];
              if (key === "class") {
                if (typeof value === "string") {
                  element.setAttribute("class", value);
                } else if (Array.isArray(arg) || value && typeof Symbol !== "undefined" && typeof value[Symbol.iterator] === "function") {
                  element.setAttribute("class", __spread(value).join(" "));
                } else {
                  console.warn("Invalid " + key + ' value "' + value + '" on ' + element.tagName + " element.");
                }
              } else if (key === "style") {
                if (value && value.constructor === Object) {
                  try {
                    for (var _f2 = (e_3 = void 0, __values(Object.keys(value))), _g = _f2.next(); !_g.done; _g = _f2.next()) {
                      var styleKey = _g.value;
                      if (styleKey in element.style) {
                        element.style[styleKey] = value[styleKey];
                      } else {
                        element.style.setProperty(styleKey, value[styleKey]);
                      }
                    }
                  } catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                  } finally {
                    try {
                      if (_g && !_g.done && (_c2 = _f2.return)) _c2.call(_f2);
                    } finally {
                      if (e_3) throw e_3.error;
                    }
                  }
                } else {
                  element.setAttribute(key, value);
                }
              } else if (typeof value === "function") {
                element[key] = value;
              } else if (typeof value === "boolean") {
                if (value)
                  element.setAttribute(key, "");
                else
                  element.removeAttribute(key);
              } else {
                element.setAttribute(key, value);
              }
            }
          } catch (e_2_1) {
            e_22 = { error: e_2_1 };
          } finally {
            try {
              if (_e2 && !_e2.done && (_b2 = _d2.return)) _b2.call(_d2);
            } finally {
              if (e_22) throw e_22.error;
            }
          }
        } else {
          element.appendChild(document.createTextNode(arg));
        }
      }
    } catch (e_1_1) {
      e_12 = { error: e_1_1 };
    } finally {
      try {
        if (args_1_1 && !args_1_1.done && (_a2 = args_1.return)) _a2.call(args_1);
      } finally {
        if (e_12) throw e_12.error;
      }
    }
    return element;
  }
  var svgNS = "http://www.w3.org/2000/svg";
  function parseHTML() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return document.createRange().createContextualFragment(args.join());
  }
  function parseSVG() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var fragment = document.createDocumentFragment();
    var svgParser = new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + args.join() + "</svg>", "image/svg+xml").documentElement;
    while (svgParser.firstChild !== null) {
      document.importNode(svgParser.firstChild, true);
      fragment.appendChild(svgParser.firstChild);
    }
    return fragment;
  }

  // imperative-html/elements-strict.js
  var __values2 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var e_1;
  var _a;
  var e_2;
  var _b;
  var HTML = parseHTML;
  var SVG = parseSVG;
  var _loop_1 = function(name_12) {
    HTML[name_12] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return applyElementArgs(document.createElement(name_12), args);
    };
  };
  try {
    for (_c = __values2("a abbr address area article aside audio b base bdi bdo blockquote br button canvas caption cite code col colgroup datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" ")), _d = _c.next(); !_d.done; _d = _c.next()) {
      name_1 = _d.value;
      _loop_1(name_1);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  var name_1;
  var _c;
  var _d;
  var _loop_2 = function(name_22) {
    SVG[name_22] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return applyElementArgs(document.createElementNS(svgNS, name_22), args);
    };
    if (/-/.test(name_22)) {
      var snakeCaseName = name_22.replace(/-/g, "_");
      SVG[snakeCaseName] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return applyElementArgs(document.createElementNS(svgNS, name_22), args);
      };
    }
  };
  try {
    for (_e = __values2("a altGlyph altGlyphDef altGlyphItem animate animateMotion animateTransform circle clipPath color-profile cursor defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg switch symbol text textPath title tref tspan use view vkern".split(" ")), _f = _e.next(); !_f.done; _f = _e.next()) {
      name_2 = _f.value;
      _loop_2(name_2);
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  var name_2;
  var _e;
  var _f;

  // lastUpdate.ts
  function calculateNewUpdate(mod) {
    const knownModUpdateTimes = {
      AbyssBox: [7, 11, 2025],
      SlarmoosBox: [10, 22, 2026],
      UltraBox: [7, 7, 2026],
      BeepBox: [3, 12, 2025],
      LemmBox: [7, 10, 2025],
      JukeBox: [29, 7, 2026],
      EdoBox: [25, 10, 2025],
      "41Box": [30, 7, 2026],
      froupbox: [30, 7, 2026]
    };
    const modUpdateDate = knownModUpdateTimes[mod];
    if (!modUpdateDate) return "none";
    return compareDates(...modUpdateDate) ? "unset" : "none";
  }
  function compareDates(updateDay, updateMonth, updateYear) {
    const time = /* @__PURE__ */ new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    return updateYear + updateMonth / 12 + updateDay / 12 / 31 > year + month / 12 + day / 12 / 31;
  }

  // mods.ts
  var Mods = [
    {
      id: "UltraBox",
      date: {
        day: 4,
        month: 6,
        year: 2023
      },
      image: "https://github.com/ultraabox/ultrabox_typescript/blob/main/website/icon_maskable_192.png?raw=true",
      aa: false,
      website: "https://ultraabox.github.io",
      patchNotes: "https://ultraabox.github.io/patch_notes.html",
      version: "V2.2.17",
      description: `UltraBox is a mod of GoldBox that was created by <a href="https://www.youtube.com/@neputendo" target="_blank">Neptendo</a>, <a href="https://github.com/MainCharacteroftheProblem" target="_blank">Main</a>, <a href="https://www.youtube.com/@_leovoel" target="_blank">LeoV</a> and many others, it was released on June 4th of 2023. It's main appeal is its Custom Samples, which allow you to import any sound into the mod and use them as instruments. Its current version is V2.2.17.`,
      wiki: "https://beepbox.miraheze.org/wiki/UltraBox",
      alternateVersions: [
        {
          "link": "https://ultraabox.github.io/testing/",
          "name": "UltraBox Testing - V2.3"
        },
        {
          "link": "https://ultraabox.github.io/archives/ultrabox_microtonal/",
          "name": "UltraBox Microtonal - V2.1.0"
        },
        {
          "link": "https://github.com/ultraabox/ultrabox_typescript/releases",
          "name": "UltraBox Offline - V2.2.17"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox"],
      modder: ["Neptendo", "MainCharacteroftheProblem", "LeoV", "ThinkAndWander", "choptop84"],
      lookBack2: true
    },
    {
      id: "AbyssBox",
      date: {
        day: 1,
        month: 1,
        year: 2024
      },
      image: "https://github.com/choptop84/abyssbox-source/blob/2.3-porting/website/icon_maskable_192.png?raw=true",
      website: "https://choptop84.github.io/abyssbox-app/",
      patchNotes: "https://choptop84.github.io/abyssbox-app/patch-notes",
      version: "V1.7",
      description: 'AbyssBox is a mod of UltraBox that was created by <a href="https://www.youtube.com/@choptop84" target="_blank">choptop84</a> and was released on January 1st of 2024. Its main appeal is its unique themes, effects, and quality of life features. Its most recent version is V1.7.',
      wiki: "https://beepbox.miraheze.org/wiki/AbyssBox",
      alternateVersions: [
        {
          "link": "https://choptop84.github.io/abyssbox-testing/",
          "name": "AbyssBox Testing - V1.7"
        },
        {
          "link": "https://choptop84.github.io/abyssbox-experimental/",
          "name": "AbyssBox Experimental - V1.7"
        },
        {
          "link": "https://choptop84.github.io/abyssbox-archives/1.5.1/",
          "name": "AbyssBox Archives - V1.5.1"
        },
        {
          "link": "https://choptop84.github.io/abyssbox-archives/sb-envelopes/",
          "name": "AbyssBox Archives (Slarmoo's Box Envelopes) - V1.6"
        },
        {
          "link": "https://choptop84.github.io/abyssbox-alt/",
          "name": "AbyssBox Alternative - V1.7b"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: ["choptop84", "LeoV"]
    },
    {
      id: "SlarmoosBox",
      displayName: "Slarmoo's Box",
      date: {
        day: 13,
        month: 5,
        year: 2024
      },
      image: "https://static.wikitide.net/beepboxwiki/d/d6/Slarmoosbox.png",
      aa: false,
      website: "https://slarmoo.github.io/slarmoosbox/website/",
      patchNotes: "https://slarmoo.github.io/slarmoosbox/website/patch_notes.html",
      version: "V1.4.13",
      description: `Slarmoo's Box is a mod of UltraBox that was created by <a href="https://www.youtube.com/@Slarmoo" target="_blank">Slarmoo</a> and was released on May 13th of 2024. Its main appeal is its highly customizable envelopes, which make automation a lot more intuitive.`,
      wiki: "https://beepbox.miraheze.org/wiki/Slarmoo%27s_Box",
      alternateVersions: [
        {
          "link": "https://slarmoo.github.io/slarmoosboxtesting/website/",
          "name": "Slarmoo's Box Testing - V2.0"
        },
        {
          "link": "https://github.com/slarmoo/slarmoosbox/releases",
          "name": "Slarmoo's Box Offline - V1.4.15"
        },
        {
          "link": "https://slarmoo.github.io/slarmoosbox/archive/",
          "name": "Slarmoo's Box Archives - V1.3.9 & April Fools"
        },
        {
          "link": "https://box.slarmoo.com/",
          "name": "Slarmoo's Box Unblocked - V1.4.15"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "slarmoo"
    },
    {
      id: "BeepBox",
      date: {
        day: 20,
        month: 2,
        year: 2012
      },
      image: "https://github.com/johnnesky/beepbox/blob/main/website/icon_maskable_192.png?raw=true",
      aa: false,
      website: "https://beepbox.co",
      patchNotes: "https://beepbox.miraheze.org/wiki/BeepBox#Version_History",
      version: "V4.2.2",
      description: `BeepBox is a music program made by <a href="https://johnnesky.com/" target="_blank">John Nesky</a> and it was released on February 20th of 2012. It's known for being the First version of BeepBox and the originator of all other mods. Its current version is V4.2.1.`,
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox",
      alternateVersions: [
        {
          "link": "https://beepbox.co/2_3/",
          "name": "BeepBox 2.3"
        },
        {
          "link": "https://beepbox.co/3_0/",
          "name": "BeepBox 3.0"
        },
        {
          "link": "https://beepbox.co/competition/",
          "name": "BeepBox Competition - V4.2"
        },
        {
          "link": "https://www.beepbox.co/beepbox_offline.html",
          "name": "BeepBox Offline"
        }
      ],
      tree: [],
      modder: ["john nesky", "shaktool"]
    },
    {
      id: "JummBox",
      date: {
        day: 30,
        month: 7,
        year: 2019
      },
      image: "https://github.com/jummbus/jummbox/blob/main/website/icon_maskable_192.png?raw=true",
      aa: false,
      website: "https://jummb.us",
      patchNotes: "https://jummb.us/patch_notes/",
      version: "V2.6",
      description: 'JummBox is a mod of BeepBox made by <a href="https://github.com/jummbus" target="_blank">Jummbus</a> and it was released on July 30th of 2019. Its main appeal is its Modulation and limiter settings. Its current version is V2.6.',
      wiki: "https://beepbox.miraheze.org/wiki/JummBox",
      alternateVersions: [
        {
          "link": "https://jummb.us/2_4/",
          "name": "JummBox 2.4"
        },
        {
          "link": "https://jummb.us/jummbox_offline",
          "name": "JummBox Offline"
        }
      ],
      tree: ["BeepBox"],
      modder: "Jummbus"
    },
    {
      id: "ModBox",
      date: {
        day: 25,
        month: 5,
        year: 2017
      },
      image: "https://static.wikitide.net/beepboxwiki/2/25/Modbox_logo.png?20240121012328",
      aa: false,
      website: "https://moddedbeepbox.github.io/3.0/",
      patchNotes: "",
      version: "V3.2.2",
      description: "ModBox is a mod of BeepBox made by SuperPotato, ashedragon, Theepicosity, and dare DARE. and it was released on May 25th of 2017. It's known for being the first BeepBox Mod ever. Its current version is V3.2.2.",
      wiki: "https://beepbox.miraheze.org/wiki/ModBox",
      alternateVersions: [
        {
          "link": "https://thestarworld.github.io/modboxfixed/",
          "name": "ModBox Fixed"
        },
        {
          "link": "https://moddedbeepbox.github.io/3.3/",
          "name": "ModBox 3.3"
        },
        {
          "link": "https://moddedbeepbox.github.io/beta/",
          "name": "ModBox BETA"
        }
      ],
      tree: ["BeepBox"],
      modder: ["SuperPotato", "ashedragon", "Theepicosity", "DARE"]
    },
    {
      id: "Sandbox",
      date: {
        day: 15,
        month: 6,
        year: 2017
      },
      image: "https://static.wikitide.net/beepboxwiki/d/dd/Sandbox_logo.png",
      aa: false,
      website: "https://fillygroove.github.io/sandbox-3.1/",
      patchNotes: "",
      version: "V3.1.2",
      description: "Sandbox is a mod of BeepBox by Parad0x, Theepicosity, and FillyGroove. It was released on June 15, 2017. It is most known for its duty cycle instrument type, among several other smaller additions. Its current version is 3.1.2",
      wiki: "https://beepbox.miraheze.org/wiki/Sandbox",
      tree: ["BeepBox"],
      modder: ["Parad0x", "Theepicosity", "the_local_doe"]
    },
    {
      id: "GoldBox",
      date: {
        day: 16,
        month: 6,
        year: 2021
      },
      image: "https://aurysystem.github.io/goldbox/favicon.ico",
      aa: true,
      website: "https://aurysystem.github.io/goldbox/",
      patchNotes: "",
      version: "V2.5",
      description: "GoldBox is a mod of JummBox by Aury System. It was released on June 16, 2021. It is most known for its Advanced FM-O6 and other small, but notable changes. Its current version is 2.5",
      wiki: "https://beepbox.miraheze.org/wiki/GoldBox",
      alternateVersions: [
        {
          "link": "https://aurysystem.github.io/goldbox/jummbox_offline.html",
          "name": "GoldBox Offline"
        }
      ],
      tree: ["BeepBox", "JummBox"],
      modder: "Aury System"
    },
    {
      id: "HaileyBox",
      date: {
        day: 10,
        month: 7,
        year: 2017
      },
      image: "https://haileylgbt.github.io/harrybox/BeepBox_files/favicon.ico",
      aa: true,
      website: "https://haileylgbt.github.io/harrybox/",
      patchNotes: "",
      version: "Release",
      description: "HaileyBox is a mod of BeepBox by cudsys. It was released on July 10, 2017.",
      wiki: "https://beepbox.miraheze.org/wiki/HaileyBox",
      tree: ["BeepBox"],
      modder: ["Hailey", "cudsys"]
    },
    {
      id: "BruceBox",
      date: {
        day: 26,
        month: 8,
        year: 2017
      },
      image: "https://ultraabox.github.io/archives/brucebox/BeepBox_files/favicon.ico",
      aa: true,
      website: "https://ultraabox.github.io/archives/brucebox/",
      patchNotes: "",
      version: "V2.2",
      description: "BruceBox is a mod of BeepBox by the_beesh.spweesh. It's notable for being a very controversial mod. It was released on August 26, 2017.",
      wiki: "https://beepbox.miraheze.org/wiki/BruceBox",
      tree: ["BeepBox"],
      modder: ["Bruce", "the_beesh.spweesh"]
    },
    {
      id: "ZefBox",
      date: {
        day: 15,
        month: 11,
        year: 2018
      },
      image: "https://static.wikitide.net/beepboxwiki/8/8d/Zefbox_Logo.webp",
      aa: false,
      website: "https://ultraabox.github.io/archives/zefbox/",
      patchNotes: "",
      version: "BETA",
      description: "ZefBox is a mod of Sandbox by Zefyrith. It's notable for the new rhythm divisions and chipwaves. It was released on November 15, 2018.",
      wiki: "https://beepbox.miraheze.org/wiki/ZefBox",
      tree: ["BeepBox", "Sandbox"],
      modder: "Zefyrith"
    },
    {
      id: "WideBox",
      date: {
        day: 26,
        month: 6,
        year: 2019
      },
      image: "https://logn35.github.io/WideBox/favicon.ico",
      aa: true,
      website: "https://logn35.github.io/WideBox/",
      patchNotes: "",
      version: "Release",
      description: "WideBox is a mod of ModBox by Lognes. The purpose of WideBox is to improve usability by making the editor far wider than before. It was released on June 26, 2019. ",
      wiki: "https://beepbox.miraheze.org/wiki/WideBox",
      tree: ["BeepBox", "ModBox"],
      modder: "Lognes"
    },
    {
      id: "BlackBox",
      date: {
        day: 1,
        month: 7,
        year: 2019
      },
      image: "https://lihzahrd.github.io/blackbox/favicon.ico",
      aa: false,
      website: "https://lihzahrd.github.io/blackbox/",
      patchNotes: "",
      version: "V1.0",
      description: "BlackBox is a mod of BeepBox by Lihzahrd. It was released on July 1, 2019.",
      wiki: "https://beepbox.miraheze.org/wiki/BlackBox",
      tree: ["BeepBox"],
      modder: "Lihzahrd"
    },
    {
      id: "Wackybox",
      date: {
        day: 2,
        month: 1,
        year: 2021
      },
      image: "https://bluecatgamer.github.io/Wackybox/icon_32.png",
      aa: false,
      website: "https://bluecatgamer.github.io/Wackybox/",
      patchNotes: "",
      version: "Uhh",
      description: "Wackybox is a joke mod of BeepBox by Jinxamoretto. It was released on January 2, 2021. ",
      wiki: "https://beepbox.miraheze.org/wiki/Wackybox",
      tree: ["BeepBox"],
      modder: "Jinxamoretto"
    },
    {
      id: "TodBox",
      date: {
        day: 3,
        month: 4,
        year: 2021
      },
      image: "https://todbox.github.io/icon_32.png",
      aa: false,
      website: "https://todbox.github.io/",
      patchNotes: "",
      version: "Pre-Alpha",
      description: "TodBox is a mod of BeepBox by Just a Toad and Main. It was released on April 3, 2021. ",
      wiki: "https://beepbox.miraheze.org/wiki/TodBox",
      tree: ["BeepBox"],
      modder: ["Olive", "Just a Toad", "MainCharacteroftheProblem"]
    },
    {
      id: "MicroBox",
      date: {
        day: 30,
        month: 7,
        year: 2021
      },
      image: "https://thethreadsnake.github.io/microbox/icon_shadow_192.png",
      aa: true,
      website: "https://thethreadsnake.github.io/microbox/",
      patchNotes: "",
      version: "V2.3",
      description: "MicroBox is a mod of JummBox by TheThreadSnake. It was released on July 30, 2021.",
      wiki: "https://beepbox.miraheze.org/wiki/MicroBox",
      tree: ["BeepBox", "JummBox"],
      modder: "TheThreadSnake"
    },
    {
      id: "PaandorasBox",
      displayName: "Paandora's Box",
      date: {
        day: 22,
        month: 12,
        year: 2021
      },
      image: "https://paandorasbox.github.io/icon_32.png",
      aa: true,
      fontSize: "smaller",
      website: "https://paandorasbox.github.io/",
      patchNotes: "",
      version: "V3.4",
      description: "PaandorasBox is a mod of JummBox by Main and Jinxamoretto. It is notable for being the first mod to support sampling. It was released on December 22, 2021. ",
      wiki: "https://beepbox.miraheze.org/wiki/PaandorasBox",
      tree: ["BeepBox", "JummBox"],
      modder: ["MainCharacteroftheProblem", "Jinxamoretto"]
    },
    {
      id: "BlockBox",
      date: {
        day: 24,
        month: 12,
        year: 2021
      },
      image: "https://block-box.github.io/icon_32.png",
      aa: true,
      website: "https://block-box.github.io/",
      patchNotes: "",
      version: "V0.1",
      description: "BlockBox is a mod of PaandorasBox created by Romadillo. It was released on December 24, 2021.",
      wiki: "https://beepbox.miraheze.org/wiki/BlockBox",
      tree: ["BeepBox", "JummBox", "PaandorasBox"],
      modder: "Romadillo"
    },
    {
      id: "Midbox",
      date: {
        day: 12,
        month: 8,
        year: 2023
      },
      image: "https://static.wikitide.net/beepboxwiki/0/06/MidboxFavicon.png?20240210022831",
      aa: false,
      website: "https://mid-the-modder.github.io/Midbox/",
      patchNotes: "",
      version: "V0.2.6",
      description: "Midbox is a mod of JummBox created by Mid. It adds new unisons and lots of presets. It was released on August 12, 2023.",
      wiki: "https://beepbox.miraheze.org/wiki/Midbox",
      alternateVersions: [
        {
          "link": "https://mid-the-modder.github.io/Midbox-Testing/",
          "name": "Midbox Testing"
        },
        {
          "link": "https://mid-the-modder.github.io/Midbox-DISCONTINUED/",
          "name": "Old Midbox"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox"],
      modder: "Mid the Composer"
    },
    {
      id: "Dogebox2",
      date: {
        day: 9,
        month: 9,
        year: 2023
      },
      image: "https://dogeiscut.github.io/dogebox2/favicon.ico",
      aa: true,
      website: "https://dogeiscut.github.io/dogebox2/",
      patchNotes: "",
      version: "V1.4.0",
      description: "Dogebox2 is a mod of JummBox by DogeisCut. It adds custom fm operator frequencies, the note range and invert wave effects, and was the first mod to add note flashing. It was released on September 9, 2023.",
      wiki: "https://beepbox.miraheze.org/wiki/Dogebox2",
      tree: ["BeepBox", "JummBox"],
      modder: "DogeisCut"
    },
    {
      id: "Nepbox",
      date: {
        day: 11,
        month: 1,
        year: 2024
      },
      image: "https://static.wikitide.net/beepboxwiki/thumb/7/70/NepBoxIcon.png/600px-NepBoxIcon.png?20240207013111",
      aa: true,
      website: "https://neptendo.github.io/nepbox/",
      patchNotes: "",
      version: "V1.1",
      description: "Nepbox is a mod of ModBox created by Neptendo. It intends to modernize ModBox back into standing with the other mods, by adding quality of life features. It was released on January 11, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/Nepbox",
      tree: ["BeepBox", "ModBox"],
      modder: "Neptendo"
    },
    {
      id: "Unbox",
      date: {
        day: 20,
        month: 1,
        year: 2024
      },
      image: "https://un-conventional.github.io/icon_32.png",
      aa: true,
      website: "https://un-conventional.github.io",
      patchNotes: "",
      version: "V0.0.9",
      description: "Unbox is a mod of UltraBox by un_conventional. Unbox recreates the Duty Cycle from Sandbox and makes 0-100% pulse width range possible. It was released on January 20, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/Unbox",
      alternateVersions: [
        {
          "link": "https://un-conventional.github.io/Testing/",
          "name": "Unbox Testing 0.0.11"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "Unconventional"
    },
    {
      id: "shitbox4",
      date: {
        day: 13,
        month: 3,
        year: 2024
      },
      image: "https://choptop84.github.io/shitbox4/apple-touch-icon.png",
      aa: false,
      website: "https://choptop84.github.io/shitbox4",
      patchNotes: "",
      version: "Release",
      description: "shitbox4 is a joke mod of beepbox by choptop84. Shitbox4 begrudgingly aims to make BeepBox as unbearably bad as possible. It was released on March 13, 2024.",
      wiki: "https://beepbox.miraheze.org/wiki/shitbox4",
      tree: ["BeepBox"],
      modder: "choptop84"
    },
    {
      id: "BoxBeep",
      date: {
        day: 23,
        month: 3,
        year: 2024
      },
      image: "https://choptop84.github.io/boxbeep/apple-touch-icon.png",
      aa: false,
      website: "https://choptop84.github.io/boxbeep",
      patchNotes: "",
      version: "Release",
      description: "BoxBeep is a joke mod of BeepBox by choptop84. This mod flips most of the website on the horizontal axis. It was released on March 23, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/BoxBeep",
      tree: ["BeepBox"],
      modder: "choptop84"
    },
    {
      id: "AestheticBox",
      date: {
        day: 23,
        month: 3,
        year: 2024
      },
      image: "https://cnwmakescode.github.io/AestheticBox/favicon.ico",
      aa: true,
      website: "https://cnwmakescode.github.io/AestheticBox/",
      patchNotes: "",
      version: "Release",
      description: 'AestheticBox is a mod of BeepBox by CNWMakesCode. It changes the default font to "Quicksand". It was released on March 23, 2024.',
      wiki: "https://beepbox.miraheze.org/wiki/AestheticBox",
      tree: ["BeepBox"],
      modder: "CNWMakesCode"
    },
    {
      id: "AwesomeBox",
      date: {
        day: 26,
        month: 4,
        year: 2024
      },
      image: "https://mmmdonuts2008.github.io/AwesomeBox/website/appIcon.png",
      aa: true,
      website: "https://mmmdonuts2008.github.io/AwesomeBox/website/",
      patchNotes: "",
      version: "V0.1.4-b",
      description: "AwesomeBox is a mod of JummBox by mmm_donuts2008. It was released on April 26, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/AwesomeBox",
      tree: ["BeepBox", "JummBox"],
      modder: ["mmm_donuts2008", "choptop84"]
    },
    {
      id: "VoxBox",
      date: {
        day: 23,
        month: 5,
        year: 2024
      },
      image: "https://voxeldeev.github.io/voxbox/website/favicon.ico",
      aa: true,
      website: "https://voxeldeev.github.io/voxbox/website/",
      patchNotes: "",
      version: "Alpha",
      description: "VoxBox is a mod of UltraBox by Voxel. It adds the pitch envelope and an invert toggle for each envelope. It was released on May 23, 2024.",
      wiki: "https://beepbox.miraheze.org/wiki/VoxBox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "Voxel"
    },
    {
      id: "LemmBox",
      date: {
        day: 7,
        month: 1,
        year: 2025
      },
      image: "https://lemmbox.github.io/theme_resources/LemmBoxLogo.png",
      aa: false,
      website: "https://lemmbox.github.io/",
      patchNotes: "https://lemmbox.github.io/patch_notes.html",
      version: "V0.1.2-b",
      description: 'LemmBox is a mod of UltraBox that was created by <a href="https://www.youtube.com/@HappyLemonLime" target="_blank">HappyLemonLime</a> and was released on January 7th of 2025. Its main appeal is its customization of the max values found in the editor, and extra chip waves.',
      wiki: "https://beepbox.miraheze.org/wiki/LemmBox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "HappyLemonLime"
    },
    {
      id: "CardboardBox",
      date: {
        day: 9,
        month: 3,
        year: 2020
      },
      image: "https://hidden-realm.github.io/cardboardbox/favicon.ico",
      aa: true,
      website: "https://hidden-realm.github.io/cardboardbox",
      patchNotes: "",
      version: "Release",
      description: "CardboardBox is a mod of JummBox by Lihzahrd. CardboardBox increases the maximum chord size to 16. It was released on March 9, 2020. ",
      wiki: "https://beepbox.miraheze.org/wiki/CardboardBox",
      tree: ["BeepBox", "JummBox"],
      modder: "Lihzahrd"
    },
    {
      id: "BariBox",
      date: {
        day: 14,
        month: 3,
        year: 2024
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://andrebariani.github.io/baribox/",
      patchNotes: "",
      version: "Release",
      description: 'BariBox\u2122 is a mod of UltraBox by Bariani. BariBox adds a "corruption" feature, which essentially  randomizes the placement of notes, patterns, and the instrument types used. It was released on March 14, 2024.',
      wiki: "https://beepbox.miraheze.org/wiki/BariBox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "Bariani"
    },
    {
      id: "BluBox",
      date: {
        day: 15,
        month: 6,
        year: 2020
      },
      image: "https://i.imgur.com/sm62GJe.png",
      website: "https://ultraabox.github.io/archives/blubox/",
      aa: true,
      patchNotes: "",
      version: "BETA",
      description: "BluBox was a mod of JummBox by Bluto. It was released on June 15, 2020. ",
      wiki: "https://beepbox.miraheze.org/wiki/BluBox",
      tree: ["BeepBox", "JummBox"],
      modder: "Bluto"
    },
    {
      id: "Box",
      date: {
        day: 22,
        month: 8,
        year: 2024
      },
      image: "https://boxbox-app.github.io/box/box.png",
      aa: false,
      website: "https://boxbox-app.github.io/box/",
      patchNotes: "",
      version: "Release",
      description: "Box is a mod of ultrabox by boxbox (choptop84). It aims to remove everything. It was released on August 22, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#:~:text=vanilla%20for%20showcasing.-,Box,-boxbox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: ["boxbox", "choptop84"]
    },
    {
      id: "NerdBox",
      date: {
        day: 15,
        month: 2,
        year: 2018
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://ultraabox.github.io/archives/nerdbox/",
      patchNotes: "",
      version: "Release",
      description: "NerdBox is a mod of BeepBox by Green Guy. It's notable for adding new waveforms and scales. It was released on February 15, 2018.",
      wiki: "https://beepbox.miraheze.org/wiki/NerdBox",
      tree: ["BeepBox"],
      modder: "Green Guy"
    },
    {
      id: "ShitBox",
      date: {
        day: 16,
        month: 2,
        year: 2019
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://lihzahrd.github.io/shitbox3.0/",
      patchNotes: "",
      version: "V3.0",
      description: "ShitBox is a joke mod of BeepBox and ModBox by Lihzahrd. It's notable for being the first ever joke mod to be made. It was released on February 16, 2019.",
      wiki: "https://beepbox.miraheze.org/wiki/ShitBox",
      alternateVersions: [
        {
          "link": "https://lihzahrd.github.io/shitbox/",
          "name": "ShitBox v1.0.1"
        },
        {
          "link": "https://hidden-realm.github.io/shitbox2/",
          "name": "ShitBox v2.0"
        }
      ],
      tree: ["BeepBox"],
      modder: "Lihzahrd"
    },
    {
      id: "BassBox",
      date: {
        day: 1,
        month: 1,
        year: 2020
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://lihzahrd.github.io/bassbox/",
      patchNotes: "",
      version: "Release",
      description: "BassBox is a joke mod of BeepBox by Lihzahrd. It's known for removing all presets except for ones typically used as Bass. It was released on January 1, 2020.",
      wiki: "https://beepbox.miraheze.org/wiki/BassBox",
      tree: ["BeepBox"],
      modder: "Lihzahrd"
    },
    {
      id: "SliderBox",
      date: {
        day: 6,
        month: 2,
        year: 2020
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://slidecode.github.io/sliderbox.github.io/website/3_0/",
      patchNotes: "",
      version: "V3.0.13",
      description: "SliderBox is mod of BeepBox by Slidecode, and Azgam4. It was released on February 6, 2020.",
      wiki: "https://beepbox.miraheze.org/wiki/SliderBox",
      tree: ["BeepBox"],
      modder: ["Slidecode", "Azgam4"]
    },
    {
      id: "JummBox11edo",
      displayName: "JummBox 11edo",
      date: {
        day: 12,
        month: 5,
        year: 2020
      },
      image: "./placeholder.png",
      aa: false,
      fontSize: "smaller",
      website: "https://fillygroove.github.io/jummbox-microtonal/11edo/",
      patchNotes: "",
      version: "Release",
      description: "JummBox 11edo is a mod of JummBox by FillyGroove. It changes the amounts of notes per octave to be 11. It was released on May 12, 2020. ",
      wiki: "https://beepbox.miraheze.org/wiki/JummBox_11edo",
      tree: ["BeepBox", "JummBox"],
      modder: "the_local_doe"
    },
    {
      id: "TETBox",
      date: {
        day: 10,
        month: 14,
        year: 2023
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://not-without-text.github.io/tetbox/website/",
      patchNotes: "",
      version: "Release",
      description: "TETBox is a mod of BeepBox by not without text. It changes the amounts of notes per octave to be 19. It was released on April 10, 2023. ",
      wiki: "https://beepbox.miraheze.org/wiki/TETBox",
      tree: ["BeepBox"],
      modder: "not without text"
    },
    {
      id: "EdoBox",
      date: {
        day: 27,
        month: 12,
        year: 2024
      },
      image: "https://unbihexiumfan.github.io/edobox/website/favicon.ico",
      aa: true,
      website: "https://unbihexiumfan.github.io/edobox/website/",
      patchNotes: "https://beepbox.miraheze.org/wiki/EdoBox#:~:text=of%20EdoBox%201.0.-,Version%20History,-%5Bedit%5D",
      version: "V2.0.1",
      description: "EdoBox is a mod of JummBox by UnbihexiumFan. It allows support for microtonal tuning systems created by dividing the octave into equal parts. It was released on December 27, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/EdoBox",
      alternateVersions: [
        {
          "link": "https://unbihexiumfan.github.io/edobox-2.0-beta/website/",
          "name": "EdoBox Testing - V2.0"
        },
        {
          "link": "https://unbihexiumfan.github.io/edobox-archives/",
          "name": "EdoBox archives for 11edo, 14edo, and 17edo. V1.0"
        },
        {
          "link": "https://unbihexiumfan.github.io/edobox/website/jummbox_offline.html",
          "name": "EdoBox Offline"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox"],
      modder: "UnbihexiumFan"
    },
    {
      id: "FoxBox",
      date: {
        day: 2,
        month: 5,
        year: 2022
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://foxnet.neocities.org/projects/foxbox",
      patchNotes: "",
      version: "V1.2.51",
      description: "FoxBox is a mod of BeepBox created by EliTheFox. It removes the practical limits of tempo and song length. It was released on May 2, 2022.",
      wiki: "https://beepbox.miraheze.org/wiki/FoxBox",
      tree: ["BeepBox"],
      modder: "EliTheFox"
    },
    {
      id: "BeepBox1Bar",
      displayName: "BeepBox 1Bar",
      date: {
        day: 19,
        month: 2,
        year: 2020
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://hidden-realm.github.io/beepbox1bar/",
      patchNotes: "",
      version: "Release",
      description: "BeepBox 1Bar is mod of BeepBox by Lihzahrd. It's known as the first mod to set the minimum number of beats per bars from 3 to 1. It was released on February 19, 2020.",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_1Bar",
      tree: ["BeepBox"],
      modder: "Lihzahrd"
    },
    {
      id: "WeebBox",
      date: {
        day: 12,
        month: 6,
        year: 2021
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://jimothee.bitbucket.io/",
      patchNotes: "",
      version: "V1.2",
      description: "WeebBox is a mod of BeepBox by Jimothee. It's notable for being the first mod to include custom themes. It was released on June 12, 2021. ",
      wiki: "https://beepbox.miraheze.org/wiki/WeebBox",
      tree: ["BeepBox", "JummBox"],
      modder: "Jimothee"
    },
    {
      id: "MarioPaintBox",
      date: {
        day: 23,
        month: 2,
        year: 2023
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://pmpbox.glitch.me/",
      patchNotes: "",
      version: "Release",
      description: "MarioPaintBox is a mod of Paandora's Box created by thesaturnangel with contributions from mintyfresh2490, Jinxamoretto, Main, and nesquix. It removes all instruments except for samples that can be found in the game Mario Paint. It was released on February 23, 2023.",
      wiki: "https://beepbox.miraheze.org/wiki/MarioPaintBox",
      tree: ["BeepBox", "JummBox", "PaandorasBox"],
      modder: ["thesaturnangel", "mintyfresh2490", "Jinxamoretto", "MainCharacteroftheProblem", "nesquix"]
    },
    {
      id: "BirdBox",
      date: {
        day: 22,
        month: 4,
        year: 2024
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://choptop84.github.io/birdbox-app/",
      patchNotes: "",
      version: "Release",
      description: "BirdBox is a joke mod of BeepBox by choptop84. It makes everything dark, as if you were wearing a blindfold. It was released on April 22, 2024.",
      wiki: "https://beepbox.miraheze.org/wiki/BirdBox",
      tree: ["BeepBox"],
      modder: "choptop84"
    },
    {
      id: "DinoBox",
      date: {
        day: 15,
        month: 9,
        year: 2024
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://dinobox.vercel.app/",
      patchNotes: "",
      version: "Release",
      description: "DinoBox is a mod of ultrabox by MrIncredibleMaker. It was released on September 15, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/DinoBox",
      tree: ["BeepBox"],
      modder: "MrIncredibleMaker"
    },
    {
      id: "AxoBox",
      date: {
        day: 23,
        month: 10,
        year: 2024
      },
      image: "https://sxomus.neocities.org/axobox/favicon.ico",
      aa: true,
      website: "https://sxomus.neocities.org/axobox/",
      patchNotes: "",
      version: "Release",
      description: "AxoBox is a mod of ultrabox by axo. It was released on October 23, 2024. ",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: ["axo", "Ax0w0"]
    },
    {
      id: "LunariisBox",
      displayName: "Lunarii's Box",
      date: {
        day: 15,
        month: 5,
        year: 2025
      },
      image: "https://lunarriaa.github.io/lunariibox/website/favicon.ico",
      aa: true,
      website: "https://lunarriaa.github.io/lunariibox/website/",
      patchNotes: "https://lunarriaa.github.io/lunariibox/website/patch_notes.html",
      version: "V1.0.3",
      description: "Lunarii's Box is a mod of Slarmoo's Box that was created by Lunarriaa. It adds several ui adjustments. It was released on May 15th of 2025. ",
      wiki: "https://beepbox.miraheze.org/wiki/Lunarii%27s_Box",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "Lunarriaa"
    },
    {
      id: "SynthBox",
      date: {
        day: 17,
        month: 6,
        year: 2020
      },
      image: "https://synthbox.co/favicon.ico",
      website: "https://synthbox.co/",
      aa: true,
      patchNotes: "",
      version: "V2.0",
      description: "SynthBox was a mod of JummBox by Chopy61. It was the first mod to add 6 operator FM. It was released on June 17, 2020. ",
      wiki: "https://beepbox.miraheze.org/wiki/SynthBox",
      tree: ["BeepBox", "JummBox"],
      modder: "Chopy61"
    },
    {
      id: "JukeBox",
      displayName: "JukeBox",
      date: {
        day: 21,
        month: 7,
        year: 2025
      },
      image: "https://jukeebox.github.io/web-app-manifest-512x512.png",
      aa: true,
      website: "https://jukeebox.github.io/",
      patchNotes: "https://jukeebox.github.io/manual/patch_notes.html",
      version: "V1.0",
      description: "JukeBox is a mod of Slamoo's Box that was created by CoolTasDude. It adds hundreds of community made presets. It was released on June 21st, 2025. ",
      wiki: "https://beepbox.miraheze.org/wiki/JukeBox",
      alternateVersions: [
        {
          "link": "https://jukeebox.netlify.app/",
          "name": "Jukebox Netlify Port - V0.3.0"
        },
        {
          "link": "https://jukeebox.github.io/testing/",
          "name": "Jukebox Testing - 1.0.0 Beta 2"
        },
        {
          "link": "https://jukeebox.github.io/microtonal-testing/",
          "name": "Jukebox Microtonal Testing - V0.3.0"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "CoolTasDude"
    },
    {
      id: "NintariBox",
      date: {
        day: 12,
        month: 6,
        year: 2021
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://nintarigenesis.bitbucket.io/",
      patchNotes: "",
      version: "V3.3",
      description: "NintariBox is a mod of BeepBox by NintariGenesis. It was originally a joke mod of WeebBox, but later moved to Paandora's Box and added the NintariBox samples. It was released on June 12, 2021.",
      wiki: "https://beepbox.miraheze.org/wiki/NintariBox",
      tree: ["BeepBox", "JummBox", "WeebBox", "PaandorasBox"],
      modder: "NintariGenesis"
    },
    {
      id: "DsQuickBoxMod",
      displayName: "D's Quick Box Mod",
      date: {
        day: 19,
        month: 9,
        year: 2025
      },
      image: "https://me-rn-rbh.github.io/Deathmodereals-Quick-Box-Mod/favicon.ico",
      aa: true,
      fontSize: "13px",
      website: "https://me-rn-rbh.github.io/Deathmodereals-Quick-Box-Mod/",
      patchNotes: "https://me-rn-rbh.github.io/Deathmodereals-Quick-Box-Mod/patch_notes.html",
      version: "V693",
      description: "D's Quick Box Mod is a mod of UltraBox that was created by deathmodereal. It adds many UI additions, such as loop bar buttons. It released on September 19th, 2025. ",
      wiki: "https://beepbox.miraheze.org/wiki/D%27s_Quick_Box_Mod",
      alternateVersions: [
        {
          "link": "https://me-rn-rbh.github.io/Ds-Quick-Test/",
          "name": "D's Quick Test"
        }
      ],
      hasTestingVersion: true,
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "deathmodereal"
    },
    {
      id: "BloxBox",
      date: {
        day: 6,
        month: 9,
        year: 2025
      },
      image: "https://static.wikitide.net/beepboxwiki/d/d7/BloxBox_HQ.png",
      aa: true,
      website: "https://jicekonemo.github.io/BloxBox/",
      patchNotes: "https://beepbox.miraheze.org/wiki/BloxBox#Editions",
      version: "V0.1",
      description: "BloxBox is a mod of BeepBox that was created by thebloxer231. It adds four new presets, eight new chip waves and two new unison types. It released on September 6th, 2025.",
      wiki: "https://beepbox.miraheze.org/wiki/BloxBox",
      alternateVersions: [],
      tree: ["BeepBox"],
      modder: "thebloxer231"
    },
    {
      id: "BulbBox",
      date: {
        day: 7,
        month: 9,
        year: 2025
      },
      image: "https://thereallogg123.github.io/bulbbox-app/favicon.ico",
      aa: true,
      website: "https://thereallogg123.github.io/bulbbox-app/",
      patchNotes: "https://beepbox.miraheze.org/wiki/BulbBox#Editions",
      version: "V0.1",
      description: "BulbBox is a mod of BeepBox that was created by thereallogg123. BulbBox is notable for scrapping every instrument preset and replacing them with its own presets. It released on September 7th, 2025.",
      wiki: "https://beepbox.miraheze.org/wiki/BulbBox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "AbyssBox"],
      modder: "AquaticAlloy"
    },
    {
      id: "RolyBox",
      date: {
        day: 21,
        month: 7,
        year: 2025
      },
      image: "https://static.wikitide.net/beepboxwiki/5/53/RolyBox_icon.webp",
      aa: true,
      website: "https://thinkandwander.github.io/Rolybox/",
      patchNotes: "https://thinkandwander.github.io/Rolybox/patch_notes.html",
      version: "NIGHTLY_DEV",
      description: 'RolyBox is a mod of UltraBox that was created by ThinkAndWander (Eve). It adds a sophisticated "selection" menu that makes complicated note patterns easier to make. It was released on July 21st, 2025.',
      wiki: "https://beepbox.miraheze.org/wiki/RolyBox",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox"],
      modder: "ThinkAndWander"
    },
    {
      id: "BonBox",
      date: {
        day: 12,
        month: 3,
        year: 2025
      },
      image: "https://chaoticbon.com/files/bonbox%20logo.png",
      aa: false,
      website: "https://chaoticbon.com/bonbox/",
      patchNotes: "",
      version: "Release",
      description: "BonBox is a joke mod of BeepBox that was created by ChaoticBun and released on March 12th, 2025. It renames several things in the editor and changes the fonts of the site.",
      wiki: "https://beepbox.miraheze.org/wiki/BonBox",
      tree: ["BeepBox"],
      modder: "ChaoticBon"
    },
    {
      id: "41Box",
      date: {
        day: 27,
        month: 3,
        year: 2026
      },
      image: "https://41popzic.github.io/41box-app/favicon.ico",
      aa: true,
      website: "https://41popzic.github.io/41box-app/",
      patchNotes: "https://41popzic.github.io/41box-app/patch_notes.html",
      version: "V1.2",
      description: "41Box is a mod of Slarmoo's Box by 41popzic that adds quintuplets as a rhythm option. It was released on March 27th, 2026. ",
      wiki: "https://beepbox.miraheze.org/wiki/41Box",
      alternateVersions: [
        {
          "link": "https://41popzic.github.io/41box-testing/",
          "name": "41Box Testing"
        }
      ],
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "41popzic"
    },
    {
      id: "StudioBox",
      displayName: "Studio Box",
      date: {
        day: 2,
        month: 2,
        year: 2026
      },
      image: "./placeholder.png",
      aa: false,
      website: "https://kashumy.github.io/Studio-Box/",
      patchNotes: "https://kashumy.github.io/Studio-Box/patch_notes.html",
      version: "V1.0.6",
      description: "Studio Box is a mod of Slarmoo's Box by Kashumy that adds several experimental features, such as 8-op FM, the octave shift effect, and more reverb options. It was released on February 2nd, 2026. ",
      wiki: "https://beepbox.miraheze.org/wiki/Studio_Box",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox", "AbyssBox"],
      modder: "Kashumy",
      lookBack2: true
    },
    {
      id: "ModBox+",
      date: {
        day: 18,
        month: 4,
        year: 2026
      },
      image: "https://modboxplus.lognes.net/favicon.ico",
      aa: true,
      website: "https://modboxplus.lognes.net/",
      patchNotes: "https://modboxplus.lognes.net/changelog.html",
      version: "Beta 0.2",
      description: "ModBox+ is a mod of ModBox by Lognes that aims to modernize ModBox. It released on April 18th, 2026. ",
      wiki: "https://beepbox.miraheze.org/wiki/ModBox%2B",
      tree: ["BeepBox", "ModBox"],
      modder: "Lognes"
    },
    {
      id: "Tesseract",
      date: {
        day: 26,
        month: 7,
        year: 2025
      },
      image: "https://sera-ph1m.github.io/Tesseract/favicon.ico",
      aa: false,
      website: "https://sera-ph1m.github.io/Tesseract/",
      patchNotes: "",
      version: "Release",
      description: "Tesseract is a mod of Slarmoo's Box by Seraph1m that allows for different channel types to be reordered, among other smaller features. It released on July 26th, 2025. ",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#:~:text=of%20new%20presets.-,Tesseract,-Seraph1m",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "Seraph1m"
    },
    {
      id: "XenBox",
      date: {
        day: 27,
        month: 1,
        year: 2026
      },
      image: "https://ultrogmr.dev/xenbox-website/favicon.ico",
      aa: true,
      website: "https://ultrogmr.dev/xenbox-website/",
      patchNotes: "",
      version: "Release",
      description: "XenBox is a mod of JummBox by UltroGmr that allows for microtonal scales. It released on January 27th, 2026. ",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#:~:text=boring%20as%20possible.-,XenBox,-UltroGmr",
      tree: ["BeepBox", "JummBox"],
      modder: "UltroGmr"
    },
    {
      id: "froupbox",
      date: {
        day: 28,
        month: 5,
        year: 2026
      },
      image: "https://froupbox.github.io/favicon.ico",
      aa: true,
      website: "https://froupbox.github.io/",
      patchNotes: "https://froupbox.github.io/patch_notes.html",
      version: "V1.0",
      description: "froupbox is a mod of Slarmoo's Box by Pastenkopie and cyexclam that adds several new effects and allows for microtonal tunings. It was released on May 28th, 2026",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#List_of_BeepBox_Mods:~:text=noise%20instrument%20type.-,froupbox,-Pastenkopie%2C%20cyexclam",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: ["Pastenkopie", "cyexclam"]
    },
    {
      id: "Modorox",
      date: {
        day: 25,
        month: 5,
        year: 2026
      },
      image: "https://static.wikitide.net/beepboxwiki/f/f9/Modernbox.webp",
      aa: true,
      website: "https://file.garden/aKvDahW1zTw7wwmp/ModernBox",
      patchNotes: "",
      version: "Release",
      description: "Modorox is a mod of BeepBox by thebloxer231 that adds drum samples to noise channels. It released on May 25th, 2026. ",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#List_of_BeepBox_Mods:~:text=been%20taken%20down.-,Modorox,-thebloxer231",
      alternateVersions: [
        {
          "link": "https://modernbox.neocities.org/",
          "name": "ModernBox Neocities"
        }
      ],
      tree: ["BeepBox"],
      modder: "thebloxer231"
    },
    {
      id: "MidiBox",
      date: {
        day: 4,
        month: 12,
        year: 2025
      },
      image: "https://voxeldeev.github.io/midibox/website/icon_32.png",
      aa: true,
      website: "https://voxeldeev.github.io/midibox/website//",
      patchNotes: "",
      version: "V1.0",
      description: "MidiBox is a mod of Slarmoo's Box by Voxel that several features improving midi exports. It was released on December 4th, 2025",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#List_of_BeepBox_Mods:~:text=boring%20as%20possible.-,MidiBox,-Voxel",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "Voxel"
    },
    {
      id: "trixieBox",
      date: {
        day: 4,
        month: 8,
        year: 2026
      },
      image: "https://wackybox.org/box/icon_32.png",
      aa: true,
      website: "https://wackybox.org/box/",
      patchNotes: "",
      version: "Release",
      description: "trixieBox is a mod of Slarmoo's Box by hacktrixapii that adds ADSR, much more reverb customization, and a dedicated url shortener. It was released on August 4th, 2026",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#List_of_BeepBox_Mods:~:text=new%20effect%20settings.-,trixieBox,-HacktrixApii",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: ["hacktrixapii", "trixie"]
    },
    {
      id: "theepbox",
      date: {
        day: 16,
        month: 8,
        year: 2026
      },
      image: "https://theepicosity.github.io/theepbox/website/icon_32.png",
      aa: true,
      website: "https://theepicosity.github.io/theepbox/website/",
      patchNotes: "https://theepicosity.github.io/theepbox/website/patch_notes.html",
      version: "version 2",
      description: "theepbox is a mod of Slarmoo's Box by Theepicosity that adds stereo samples, channel folders, and effect reordering. It was released on August 16th, 2026",
      wiki: "https://beepbox.miraheze.org/wiki/BeepBox_Mods#List_of_BeepBox_Mods:~:text=dedicated%20url%20shortener.-,theepbox,-Theepicosity",
      tree: ["BeepBox", "JummBox", "GoldBox", "PaandorasBox", "UltraBox", "Slarmoosbox"],
      modder: "Theepicosity"
    }
  ];

  // createMods.ts
  var { div, a, button, h2, input } = HTML;
  var favoritesList = new Array();
  var storedfavoritesList = localStorage.getItem("favoritesList");
  if (storedfavoritesList != null) {
    favoritesList = JSON.parse(storedfavoritesList);
  }
  function createMods(method2, isReversed) {
    const promptContainer2 = document.getElementById("prompt");
    const modContainer = document.getElementById("modContainer");
    let Mods2 = Mods.slice();
    Mods2 = sortMods(Mods2, method2, isReversed);
    for (let modNumber in Mods2) {
      const modInfo = Mods2[modNumber];
      const modName = modInfo.displayName != void 0 ? modInfo.displayName : modInfo.id;
      const modDividerImage = modInfo.aa == true ? "modDividerImage AA" : "modDividerImage";
      const fontSize = modInfo.fontSize == void 0 ? "inherit" : modInfo.fontSize;
      let modFavoritesList = new Array();
      let modstoredfavoritesList = localStorage.getItem("favoritesList");
      if (modstoredfavoritesList != null) {
        modFavoritesList = JSON.parse(modstoredfavoritesList);
      }
      const updateButton = modInfo.patchNotes == "" ? "" : button(
        { class: "updateText", id: modInfo.id + "Update", onclick: "goToWebsite('" + modInfo.patchNotes + "')" },
        div({ style: "pointer-events: none;" }, "New Update")
      );
      if (updateButton) {
        updateButton.style.display = calculateNewUpdate(modInfo.id);
      }
      const favoriteButton = input({ type: "checkbox", class: "favoriteButton" });
      favoriteButton.checked = Boolean(modFavoritesList.indexOf(modInfo.id) != -1);
      favoriteButton.onclick = () => favoriteBeepmod(modInfo.id);
      const versionText = div(
        { class: "versionText" },
        div({ style: "margin-top: 2px;" }, modInfo.version)
      );
      const mod = div(
        { class: "modDivider", id: modInfo.id },
        div(
          { class: modDividerImage, style: "background-image: url(" + modInfo.image + ") !important;" },
          div({ class: "modDividerGradient" })
        ),
        div(
          { style: "display: flex;flex-direction: row;/*! width: 100%; */margin-right: 16px;margin-right: 16px;gap: 5px;" },
          div({ style: "text-align: center;/*! width: 100%; */ font-weight: bold; font-size: " + fontSize + "; flex: 3;" }, modName),
          button({ class: "playButton", onclick: "goToWebsite('" + modInfo.website + "')" }, "\u25B6"),
          button({ class: "descButton", onclick: "goToWebsite(`" + modInfo.id + "Prompt`, true)" }, "\u2261")
        ),
        updateButton,
        favoriteButton,
        versionText
      );
      modContainer.appendChild(mod);
      const altVersions = modInfo.alternateVersions || [];
      const alternateVersionTitle = altVersions.length > 0 ? div(
        { class: "promptTitle" },
        h2({ class: modInfo.id + "Title", style: "margin-bottom: 0.5em;" }, "Alternate " + modInfo.id + " Versions:")
      ) : "";
      let alternateVersions = "";
      if (altVersions.length > 0) {
        const altVersionList = [];
        for (let i = 0; i < altVersions.length; i++) {
          altVersionList.push(
            div(
              { style: "margin-bottom: 0.5em;" },
              a({ href: altVersions[i].link, target: "_blank" }, altVersions[i].name)
            )
          );
        }
        alternateVersions = div(
          { style: "display: flex; flex-direction: column; align-items: center; margin-bottom: 0.5em;" },
          div(...altVersionList)
        );
      }
      const testingWarning = modInfo.hasTestingVersion ? div({ style: "margin-bottom: 0.5em; font-size: 10px;" }, "Experimental and Testing sites are more likely prone to crashes, issues, and song corruptions, so use with caution.") : "";
      const prompt = div(
        { id: modInfo.id + "Prompt", style: "flex-direction: column;  display: none;" },
        div(
          { class: "promptTitle" },
          h2({ class: modInfo.id + "Title", style: "margin-bottom: 0.5em;" }, modInfo.id + ":")
        ),
        div(
          { style: "margin-bottom: 0.5em;" },
          ...parseForUrls(modInfo.description + "")
        ),
        div(
          { style: "margin-bottom: 0.5em;" },
          "You can find " + modInfo.id + "'s ",
          a({ href: modInfo.wiki, target: "_blank" }, "Wiki Page"),
          " here. Which contains extensive information about the website."
        ),
        alternateVersionTitle,
        alternateVersions,
        testingWarning,
        button({ class: "cancelButton", onclick: "closePrompt(`" + modInfo.id + "Prompt`)" })
      );
      promptContainer2.appendChild(prompt);
      if (updateButton != "") {
        updateButton.style.right = versionText.getBoundingClientRect().width + 5 + "px";
      }
    }
    modContainer.append(div({ id: "comingSoon" }, div({ style: "text-align: center;width: 100%;margin-bottom: 10px;" }, "Coming Soon!")));
    modContainer.append(div({ id: "noResults", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "No results found"));
    modContainer.append(div({ id: "noFavorites", style: "display:none; text-align: center;width: 100%; margin-bottom: 10px; font-size: 32px;" }, "You haven't favorited anything!"));
  }
  var sorterValues = ["name", "date", "order added"];
  function sortMods(Mods2, method2, isReversed) {
    let sortedMods = [];
    switch (method2) {
      case "name": {
        sortedMods = Mods2.sort((modA, modB) => +(modA.id.toLowerCase() > modB.id.toLowerCase()) * 2 - 1);
        break;
      }
      case "date": {
        sortedMods = Mods2.sort((modA, modB) => {
          return +(modA.date.year + modA.date.month / 12 + modA.date.day / 12 / 31 > modB.date.year + modB.date.month / 12 + modB.date.day / 12 / 31) * 2 - 1;
        });
        break;
      }
      case "order added": {
        sortedMods = Mods2;
        break;
      }
    }
    return isReversed ? sortedMods.reverse() : sortedMods;
  }
  function parseForUrls(text) {
    const regex1 = /< ?a href\=\"[\w\s:\/\.\@\\\+\=\"]+>(\w| )+<\/a>/gi;
    let urls = text.match(regex1);
    if (urls == null) return [text];
    let textList = text.split(regex1);
    urls = urls.filter((match) => match.length > 2);
    textList = textList.filter((match) => match.length > 2 || match.includes(","));
    let parsed = [];
    for (let i = 0; i < textList.length; i++) {
      parsed.push(textList[i]);
      if (urls[i]) {
        let url = urls[i].match(/https?:\/\/(\w|\.|\/|\@)+/i)[0];
        let link = urls[i].match(/>(\w| )+</i)[0].replace(">", "").replace("<", "");
        parsed.push(a({ href: url, target: "_blank" }, link));
      }
    }
    return parsed;
  }
  function favoriteBeepmod(modName) {
    const index = favoritesList.indexOf(modName);
    if (index > -1) {
      favoritesList.splice(index, 1);
    } else {
      favoritesList.push(modName);
    }
    window.localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  }

  // searching.ts
  var tags = [
    "#active",
    "#discontinued",
    "#hiatus",
    "#samples",
    "#modulation",
    "#songPlayer",
    "#jokeMod",
    "#microtonal",
    "#offline",
    "#2012",
    "#2017",
    "#2018",
    "#2019",
    "#2020",
    "#2021",
    "#2022",
    "#2023",
    "#2024",
    "#2025",
    "#2026"
  ];
  var modList = Mods.map((mod) => mod.id);
  var modTags = {
    "UltraBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2023"],
    "SlarmoosBox": ["#active", "#samples", "#modulation", "#songPlayer", "#offline", "#2024"],
    "AbyssBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BeepBox": ["#active", "#songPlayer", "#offline", "#2012"],
    "JummBox": ["#active", "#modulation", "#offline", "#songPlayer", "#2019"],
    "ModBox": ["#discontinued", "#2017"],
    "Sandbox": ["#discontinued", "#2017"],
    "GoldBox": ["#discontinued", "#songPlayer", "#modulation", "#offline", "#2021"],
    "HaileyBox": ["#discontinued", "#2017"],
    "BruceBox": ["#discontinued", "#2017"],
    "NerdBox": ["#discontinued", "#2018"],
    "ZefBox": ["#discontinued", "#2018"],
    "ShitBox": ["#discontinued", "#jokeMod", "#2019"],
    "WideBox": ["#discontinued", "#2019"],
    "BlackBox": ["#discontinued", "#2019"],
    "BassBox": ["#discontinued", "#jokeMod", "#2020"],
    "SliderBox": ["#discontinued", "#2020"],
    "BeepBox1Bar": ["#discontinued", "#2020"],
    "BluBox": ["#discontinued", "#modulation", "#2020"],
    //song player option exists, but takes you to a 404 page
    "SynthBox": ["#discontinued", "#modulation", "#2020"],
    //song player option exists, but takes you to a black page
    "CardboardBox": ["#discontinued", "#modulation", "#2020"],
    //song player option exists, but takes you to a 404 page
    "JummBox11edo": ["#discontinued", "#modulation", "#microtonal", "#2020"],
    //song player option exists, but takes you to a 404 page
    "Wackybox": ["#discontinued", "#jokeMod", "#2021"],
    //song player option exists, but takes you to a 404 page
    "TodBox": ["#discontinued", "#songPlayer", "#2021"],
    "WeebBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
    "NintariBox": ["#discontinued", "#samples", "#modulation", "#2021"],
    "MicroBox": ["#discontinued", "#songPlayer", "#modulation", "#2021"],
    "PaandorasBox": ["#discontinued", "#samples", "#modulation", "#2021"],
    "BlockBox": ["#discontinued", "#samples", "#modulation", "#2021"],
    //song player option exists, but takes you to a 404 page
    "FoxBox": ["#discontinued", "#2022"],
    //song player option exists, but takes you to a 404 page
    "MarioPaintBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2023"],
    "TETBox": ["#discontinued", "#microtonal", "#2023"],
    //song player option exists, but takes you to a black page
    "Midbox": ["#active", "#songPlayer", "#modulation", "#2023"],
    "Dogebox2": ["#hiatus", "#songPlayer", "#modulation", "#2023"],
    "Nepbox": ["#discontinued", "#songPlayer", "#2024"],
    //I can't find a button to go to the song player, but if you change the url you can get there
    "Unbox": ["#active", "#songPlayer", "#samples", "#modulation", "#2024"],
    "shitbox4": ["#active", "#songPlayer", "#jokeMod", "#2024"],
    "BariBox": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2024"],
    "BoxBeep": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"],
    "AestheticBox": ["#discontinued", "#2024"],
    //song player option exists, but takes you to a 404 page
    "BirdBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2024"],
    //song player option exists, but takes you to a 404 page
    "AwesomeBox": ["#discontinued", "#songPlayer", "#modulation", "#2024"],
    "VoxBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "Box": ["#discontinued", "#jokeMod", "#2024"],
    "DinoBox": ["#discontinued", "#songPlayer", "#2024"],
    "AxoBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2024"],
    "EdoBox": ["#hiatus", "#songPlayer", "#modulation", "#microtonal", "#offline", "#2024"],
    "LemmBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BonBox": ["#discontinued", "#songPlayer", "#jokeMod", "#2025"],
    "LunariisBox": ["#hiatus", "#samples", "#songPlayer", "#modulation", "#2025"],
    "RolyBox": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "JukeBox": ["#discontinued", "#samples", "#songPlayer", "#modulation", "#2025"],
    "DsQuickBoxMod": ["#active", "#samples", "#songPlayer", "#modulation", "#2025"],
    "BloxBox": ["#hiatus", "#songPlayer", "#2025"],
    "BulbBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2025"],
    "StudioBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "41Box": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "ModBox+": ["#active", "#2026"],
    "Tesseract": ["#discontinued", "#samples", "#modulation", "#songPlayer", "#2025"],
    "XenBox": ["#hiatus", "#modulation", "#microtonal", "#songPlayer", "#2026"],
    "froupbox": ["#active", "#samples", "#modulation", "#songPlayer", "#microtonal", "#2026"],
    "Modorox": ["#active", "#samples", "#2026"],
    "MidiBox": ["#hiatus", "#samples", "#modulation", "#songPlayer", "#2025"],
    "trixieBox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"],
    "theepbox": ["#active", "#samples", "#modulation", "#songPlayer", "#2026"]
  };
  function setAndReturnTagsList() {
    let setList2 = tags.slice();
    setList2 = setList2.concat(["#before:", "#after:", "#children:", "#descendants:", "#modder:"]).concat(modList);
    for (let i = 0; i < setList2.length; i++) {
      let tag = new Option();
      tag.value = setList2[i];
      document.getElementById("tags").appendChild(tag);
    }
    return setList2;
  }
  function parseTokenForFilter(token) {
    if (token.indexOf("#surprise") > -1) {
      return (mods3) => filterSurprise(mods3);
    } else if (token.indexOf("#before:") > -1) {
      let date = token.split(":")[1].replace(" ", "").replace("#", "");
      if (date.length == 0) {
        date = "9999";
      }
      return (mods3) => filterBefore(mods3, parseInt(date));
    } else if (token.indexOf("#after:") > -1) {
      let date = token.split(":")[1].replace(" ", "").replace("#", "");
      if (date.length == 0) {
        date = "0000";
      }
      return (mods3) => filterAfter(mods3, parseInt(date));
    } else if (token.indexOf("#children:") > -1) {
      let fork = token.split(":")[1].replace(" ", "").replace("#", "");
      if (fork.length == 0) {
        fork = "beepbox";
      }
      return (mods3) => filterChildren(mods3, fork.replace(" ", "").replaceAll("'", ""));
    } else if (token.indexOf("#descendants:") > -1) {
      let fork = token.split(":")[1].replace(" ", "").replace("#", "");
      if (fork.length == 0) {
        fork = "beepbox";
      }
      return (mods3) => filterDescendants(mods3, fork.replace(" ", "").replaceAll("'", ""));
    } else if (token.indexOf("#modder:") > -1) {
      let modder = token.split(":")[1].replace(" ", "").replace("#", "");
      if (modder.length == 0) {
        modder = "johnnesky";
      }
      return (mods3) => filterModder(mods3, modder.toLowerCase().replace(" ", "").replaceAll("'", ""));
    } else if (token[0] == "#") {
      return (mods3) => filterTag(mods3, token);
    } else if (token.indexOf("*") > -1) {
      return (mods3) => filterPhraseWildcard(mods3, token);
    } else if (token != "") {
      return (mods3) => filterPhrase(mods3, token);
    }
    return (mods3) => mods3;
  }
  var Or = class {
    constructor(left, right = null) {
      this.left = left;
      this.right = right;
    }
    left;
    right;
    append(token) {
      this.right = token;
      return true;
    }
    merge(fromModsStack) {
      let fromLeft = [];
      if (this.left) {
        if (typeof this.left == "string") {
          fromLeft = parseTokenForFilter(this.left)(fromModsStack[fromModsStack.length - 1]);
        } else {
          this.left.merge(fromModsStack);
          fromLeft = fromModsStack.pop();
        }
      }
      let fromRight = [];
      if (this.right) {
        if (typeof this.right == "string") {
          fromRight = parseTokenForFilter(this.right)(fromModsStack[fromModsStack.length - 1]);
        } else {
          this.right.merge(fromModsStack);
          fromRight = fromModsStack.pop();
        }
      }
      fromModsStack.push(new Array(...new Set(fromLeft).union(new Set(fromRight))));
    }
  };
  var Not = class {
    token = null;
    append(token) {
      this.token = token;
      return true;
    }
    merge(fromModsStack) {
      if (!this.token) return;
      if (typeof this.token == "string") {
        fromModsStack.push(parseTokenForFilter(this.token)(fromModsStack[fromModsStack.length - 1]));
      } else {
        this.token.merge(fromModsStack);
      }
      const fromMods = filterNot(fromModsStack[fromModsStack.length - 1], fromModsStack[fromModsStack.length - 2]);
      fromModsStack.pop();
      fromModsStack.push(fromMods);
    }
  };
  var TokenList = class {
    tokens = [];
    append(token) {
      this.tokens.push(token);
      return false;
    }
    pop() {
      return this.tokens.pop() ?? null;
    }
    merge(fromModsStack) {
      let mergeIndex = 0;
      for (; mergeIndex < this.tokens.length; mergeIndex++) {
        const token = this.tokens[mergeIndex];
        if (!token) continue;
        if (typeof token == "string") {
          fromModsStack.push(parseTokenForFilter(token)(fromModsStack[fromModsStack.length - 1]));
        } else {
          token.merge(fromModsStack);
        }
      }
      const last = fromModsStack.pop();
      for (; mergeIndex > 1; mergeIndex--) {
        fromModsStack.pop();
      }
      fromModsStack.push(last);
    }
  };
  function searchForMods(result, fromMods = modList) {
    const tokenListStack = [new TokenList()];
    const tokenList = tokenListStack[0];
    let lastIndex = -1;
    function appendThenPopIfFull(token) {
      const isFull = tokenListStack[tokenListStack.length - 1].append(token);
      if (isFull) {
        tokenListStack.pop();
      }
    }
    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const nextChar = result[i + 1] || " ";
      if (char == "(") {
        if (lastIndex != i - 1) {
          appendThenPopIfFull(result.slice(lastIndex + 1, i));
        }
        lastIndex = i;
        const newTokenList = new TokenList();
        appendThenPopIfFull(newTokenList);
        tokenListStack.push(newTokenList);
      } else if (char == ")") {
        if (lastIndex != i - 1) {
          appendThenPopIfFull(result.slice(lastIndex + 1, i));
        }
        lastIndex = i;
        tokenListStack.pop();
      } else if (char.toLowerCase() == "o" && (nextChar || " ").toLowerCase() == "r" || char == "|") {
        if (lastIndex != i - 1) {
          appendThenPopIfFull(result.slice(lastIndex + 1, i));
        }
        lastIndex = i;
        if (char.toLowerCase() == "o") {
          i++;
          lastIndex++;
        }
        const or = new Or(tokenListStack[tokenListStack.length - 1].pop());
        appendThenPopIfFull(or);
        tokenListStack.push(or);
      } else if (char == "!" || char == "-") {
        if (lastIndex != i - 1) {
          appendThenPopIfFull(result.slice(lastIndex + 1, i));
        }
        lastIndex = i;
        const not = new Not();
        appendThenPopIfFull(not);
        tokenListStack.push(not);
      } else if (char == ":") {
        if (nextChar == " ") i++;
      } else if (char == " ") {
        if (lastIndex != i - 1) {
          appendThenPopIfFull(result.slice(lastIndex + 1, i));
        }
        lastIndex = i;
      }
    }
    if (lastIndex != result.length - 1) {
      appendThenPopIfFull(result.slice(lastIndex + 1, result.length));
    }
    let mods3 = fromMods.slice();
    const modsStack = [mods3, mods3];
    tokenList.merge(modsStack);
    renderFilters(modsStack[modsStack.length - 1]);
    if (result.length == 0) {
      window.history.replaceState(null, "", location.pathname);
    }
  }
  function filterNot(mods3, prevMods = modList) {
    const foundMods = [];
    for (const mod of prevMods) {
      if (mods3.indexOf(mod) <= -1) {
        foundMods.push(mod);
      }
    }
    return foundMods;
  }
  function filterBefore(mods3, date) {
    const foundMods = [];
    for (let i = 0; i < mods3.length; i++) {
      for (let j = 0; j < modTags[mods3[i]].length; j++) {
        let dateTag = parseInt(modTags[mods3[i]][j].toLowerCase().replace("#", ""));
        if (!Number.isNaN(dateTag) && dateTag <= date) {
          foundMods.push(mods3[i]);
          break;
        }
      }
    }
    return foundMods;
  }
  function filterAfter(mods3, date) {
    const foundMods = [];
    for (let i = 0; i < mods3.length; i++) {
      for (let j = 0; j < modTags[mods3[i]].length; j++) {
        let dateTag = parseInt(modTags[mods3[i]][j].toLowerCase().replace("#", ""));
        if (!Number.isNaN(dateTag) && dateTag >= date) {
          foundMods.push(mods3[i]);
          break;
        }
      }
    }
    return foundMods;
  }
  function filterDescendants(mods3, forked) {
    const foundMods = [];
    const refMap = /* @__PURE__ */ new Map();
    for (const index in Mods) {
      const Mod3 = Mods[index];
      refMap.set(Mod3.id, Mod3);
    }
    for (let i = 0; i < mods3.length; i++) {
      const Mod3 = refMap.get(mods3[i]);
      if (Mod3.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
        foundMods.push(mods3[i]);
        continue;
      }
      for (let j = 0; j < Mod3.tree.length; j++) {
        if (Mod3.tree[j].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
          foundMods.push(mods3[i]);
          break;
        }
      }
    }
    return foundMods;
  }
  function filterChildren(mods3, forked) {
    const foundMods = [];
    const refMap = /* @__PURE__ */ new Map();
    for (const index in Mods) {
      const Mod3 = Mods[index];
      refMap.set(Mod3.id, Mod3);
    }
    for (let i = 0; i < mods3.length; i++) {
      const Mod3 = refMap.get(mods3[i]);
      if (Mod3.id.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
        foundMods.push(mods3[i]);
        continue;
      }
      const lastIndex = Mod3.tree.length - 1;
      if (lastIndex >= 0 && Mod3.tree[lastIndex].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
        foundMods.push(mods3[i]);
      }
      if (Mod3.lookBack2) {
        const twoAgo = Mod3.tree.length - 2;
        if (twoAgo >= 0 && Mod3.tree[twoAgo].toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(forked) > -1) {
          foundMods.push(mods3[i]);
        }
      }
    }
    return foundMods;
  }
  function filterModder(mods3, modder) {
    const foundMods = [];
    const refMap = /* @__PURE__ */ new Map();
    for (const index in Mods) {
      const Mod3 = Mods[index];
      refMap.set(Mod3.id, Mod3);
    }
    for (let i = 0; i < mods3.length; i++) {
      const Mod3 = refMap.get(mods3[i]);
      const modderList = typeof Mod3.modder == "string" ? [Mod3.modder] : Mod3.modder;
      for (const m of modderList) {
        if (m.toLowerCase().replaceAll(" ", "").replaceAll("'", "").indexOf(modder) > -1) {
          foundMods.push(mods3[i]);
          break;
        }
      }
    }
    return foundMods;
  }
  function filterTag(mods3, tag) {
    const foundMods = [];
    for (let i = 0; i < tags.length; i++) {
      let lowercaseThing = tags[i];
      if (lowercaseThing.indexOf(tag.toLowerCase()) > -1) {
        for (let j = 0; j < mods3.length; j++) {
          if (!modTags[mods3[j]]) {
            console.error("Tags not implemented for " + mods3[j] + " yet");
            continue;
          }
          for (let k = 0; k < modTags[mods3[j]].length; k++) {
            if (modTags[mods3[j]][k].toLowerCase() == lowercaseThing) {
              foundMods.push(mods3[j]);
              break;
            }
          }
        }
      }
    }
    return foundMods;
  }
  function filterPhrase(mods3, phrase) {
    const foundMods = [];
    for (let i = 0; i < mods3.length; i++) {
      let thing = mods3[i];
      let lowercaseThing = thing.toLowerCase();
      if (lowercaseThing.indexOf(phrase.toLowerCase()) > -1) {
        foundMods.push(mods3[i]);
      }
    }
    return foundMods;
  }
  function filterPhraseWildcard(mods3, phrase) {
    const foundMods = [];
    for (let i = 0; i < mods3.length; i++) {
      let thing = mods3[i];
      let lowercaseThing = thing.toLowerCase();
      for (let thingIndex = 0; thingIndex < lowercaseThing.length - phrase.length; thingIndex++) {
        let matches = true;
        for (let charIndex = 0; charIndex < phrase.length; charIndex++) {
          if (phrase[charIndex] != "*" && phrase[charIndex] != lowercaseThing[charIndex + thingIndex]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          foundMods.push(mods3[i]);
          break;
        }
      }
    }
    return foundMods;
  }
  function filterSurprise(mods3) {
    return [mods3[Math.floor(Math.random() * mods3.length)]];
  }
  function renderFilters(mods3) {
    for (let i = 0; i < modList.length; i++) {
      if (mods3.indexOf(modList[i]) > -1) {
        document.getElementById(modList[i]).style.display = "flex";
        document.getElementById("noResults").style.display = "none";
      } else {
        document.getElementById(modList[i]).style.display = "none";
      }
    }
    if (mods3.length == 0) {
      document.getElementById("noResults").style.display = "unset";
    } else {
      document.getElementById("noResults").style.display = "none";
    }
    if (mods3.length == modList.length) {
      document.getElementById("comingSoon").style.display = "flex";
    } else {
      document.getElementById("comingSoon").style.display = "none";
    }
  }

  // themes.ts
  var themes = {
    dark: `
	`,
    light: `
        :root {
            --page-margin: #edecf9;
            --editor-background: #a19cca;
            --primary-text: #282542;
            --secondary-text: #0b0a13;
            --inverted-text: white;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #98f;
            --ui-widget-background: #cbc8e6;
            --ui-widget-focus: #eeedf9;
            --ui-icons: #77729d;
            --play-widget-background: #6dbf96;
            --indicator-primary: #98f;
            --indicator-secondary: #444;
            --input-box-outline: #333;
            --favorited: #98f;
            --favorited-star: #efe8ff;
            --unfavorited: #6b6691;
            --unfavorited-star: #9c98bb;
            --update-bubble: #ffa033;
            --version-bubble: #f1d7fb;
            --mod-title: rgba(119, 68, 255, 0.99);
            --gradient-fade: linear-gradient(to bottom, #37364000, #67629b);
            --gradient-background: linear-gradient(to bottom, #a59df0, #514c82);
        }

        .modDivider {
            color: var(--inverted-text)
        }
	`,
    midnight: `
        :root {
            --page-margin: #070709;
            --editor-background: #070709;
            --primary-text: #9d9d9d;
            --secondary-text: #999;
            --inverted-text: black;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #98f;
            --ui-widget-background: #18181c;
            --ui-widget-focus: #27272d;
            --ui-icons: #747280;
            --play-widget-background: #486;
            --indicator-primary: #74f;
            --indicator-secondary: #444;
            --input-box-outline: #333;
            --favorited: #74f;
            --favorited-star: #efe8ff;
            --unfavorited: #1e1e1e;
            --unfavorited-star: #404040;
            --update-bubble: #b91818;
            --version-bubble: #7d2f5b;
            --mod-title: #74f;
            --gradient-fade: linear-gradient(to bottom, #37364000, #292831);
            --gradient-background: linear-gradient(to bottom, #373640, #23222b);
        }
	`,
    beepbox: `
        :root {
            --page-margin: #000;
            --editor-background: #1a1a1a;
            --primary-text: white;
            --secondary-text: #999;
            --inverted-text: black;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #98f;
            --ui-widget-background: #444;
            --ui-widget-focus: #777;
            --ui-icons: #999;
            --play-widget-background: #74f;
            --indicator-primary: #74f;
            --indicator-secondary: #444;
            --input-box-outline: #333;
            --favorited: #efe8ff;
            --favorited-star: #74f;
            --unfavorited: #444444;
            --unfavorited-star: #777777;
            --update-bubble: #FF9752;
            --version-bubble: #25F3FF;
            --mod-title:#fff;
            --gradient-fade: linear-gradient(to bottom, #5550, #222);
            --gradient-background: linear-gradient(to bottom, #555, #0f0f0f);
        }
	`,
    jummbox: `
        :root {
            --page-margin: #040410;
            --editor-background: #140f22;
            --primary-text: white;
            --secondary-text: #84859a;
            --inverted-text: black;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #98f;
            --ui-widget-background: #393e4f;
            --ui-widget-focus: #6d6886;
            --ui-icons: #7f7b95;
            --play-widget-background: #2564a4;
            --indicator-primary: #74f;
            --indicator-secondary: #444;
            --input-box-outline: #333;
            --favorited: #74f;
            --favorited-star: #efe8ff;
            --unfavorited: #2c2c62;
            --unfavorited-star: #4f4f91;
            --update-bubble: #dda85d;
            --version-bubble: #aa81d5;
            --mod-title: #9c64f7;
            --gradient-fade: linear-gradient(to bottom, #5550, #0f0f1a);
            --gradient-background: linear-gradient(to bottom, #2a2240, #040410);
        }
	`,
    abyssbox: `
        :root {
            --page-margin: #1e0915;
            --editor-background: #351427;
            --primary-text: #ffeff6;
            --secondary-text: #ffcedd;
            --inverted-text: #1e0915;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #df88ff;
            --ui-widget-background: #581b3e;
            --ui-widget-focus: #762b4c;
            --ui-icons: #b56a8b;
            --play-widget-background: #873a51;
            --indicator-primary: #bb395a;
            --indicator-secondary: #444;
            --input-box-outline: #333;
            --favorited: #bb395a;
            --favorited-star: #fb9bb3;
            --unfavorited: #511f3c;
            --unfavorited-star: #973f71;
            --update-bubble: #ff2929;
            --version-bubble: #e35069;
            --mod-title: #bf2c5d;
            --gradient-fade: linear-gradient(to bottom, #5550, #4f1a38);
            --gradient-background: linear-gradient(to bottom, #643650, #440f2e);
        }
	`,
    slarmoosbox: `
        :root {
            --page-margin: #07051a;
            --editor-background: #0a2018;
            --primary-text: white;
            --secondary-text: #999;
            --inverted-text: black;
            --text-selection: rgba(119, 68, 255, 0.99);
            --link-accent: #98f;
            --ui-widget-background: #25550c;
            --ui-widget-focus: #397719;
            --ui-icons: #55a22e;
            --play-widget-background: #3abbb2;
            --indicator-primary: #a773e5;
            --indicator-secondary: #4c1c89;
            --input-box-outline: #333;
            --favorited: #bc5fe1;
            --favorited-star: #e6ddff;
            --unfavorited: #234a3c;
            --unfavorited-star: #46826c;
            --update-bubble: #f043e6;
            --version-bubble: #a773e5;
            --mod-title: #247d1d;
            --gradient-fade: linear-gradient(to bottom, #163c2e00, #0e281f);
            --gradient-background: linear-gradient(to bottom, #163c2e, #0a2018);
        }

        .logoButton {
            --ui-widget-background: #661b7b;
            --ui-icons: #b562cc;
        }

        .prefButton {
            --ui-widget-background: #661b7b;
            --ui-icons: #b562cc;
        }
	`
  };
  var _themeStyleElement = document.head.appendChild(HTML.style({ type: "text/css" }));
  function setTheme(name) {
    let theme = themes[name];
    if (theme == void 0) theme = themes["dark"];
    _themeStyleElement.textContent = theme;
    if (window.localStorage.getItem("colorTheme") != name) {
      window.localStorage.setItem("colorTheme", name);
    }
  }

  // preferences.ts
  var { select, option, div: div2, h2: h22, button: button2, input: input2 } = HTML;
  var currentView = 1;
  function changeCurrentViewNum(value) {
    currentView = value;
  }
  function setPreferedTab(value) {
    window.localStorage.setItem("setView", value);
  }
  function setPromptOpacity(value) {
    window.localStorage.setItem("promptOpacity", value);
    document.getElementById("promptContainerBG").style.opacity = window.localStorage.getItem("promptOpacity");
  }
  var setList = setAndReturnTagsList();
  function switchView(view2) {
    switch (view2) {
      case 1:
        const search = document.getElementById("searchbar").value;
        if (search != "") {
          searchForMods(search);
        } else {
          for (let i = 0; i < setList.length; i++) {
            if (!setList[i].includes("#")) {
              document.getElementById(String(setList[i])).style.display = "";
            }
          }
        }
        document.getElementById("modsListButton").style.filter = "brightness(150%)";
        document.getElementById("favoritesListButton").style.filter = "";
        document.getElementById("comingSoon").style.display = "flex";
        document.getElementById("noFavorites").style.display = "none";
        break;
      case 2:
        if (favoritesList.length > 0) {
          for (let i = 0; i < setList.length; i++) {
            if (!setList[i].includes("#")) {
              for (let k = 0; k < favoritesList.length; k++) {
                if (favoritesList.includes(setList[i])) {
                  document.getElementById(String(setList[i])).style.display = "";
                } else {
                  document.getElementById(String(setList[i])).style.display = "none";
                }
              }
            }
          }
          document.getElementById("noFavorites").style.display = "none";
        } else {
          for (let i = 0; i < setList.length; i++) {
            if (!setList[i].includes("#")) {
              document.getElementById(String(setList[i])).style.display = "none";
            }
          }
          document.getElementById("noFavorites").style.display = "";
        }
        document.getElementById("modsListButton").style.filter = "";
        document.getElementById("favoritesListButton").style.filter = "brightness(150%)";
        document.getElementById("comingSoon").style.display = "none";
        break;
    }
    window.localStorage.setItem("previousView", String(view2));
    changeCurrentViewNum(view2);
  }
  var setViewSelect = select(
    { class: "selectRow", id: "setViewSelect", style: "width: 128px;", value: "previous" },
    option({ value: "previous" }, "Previous"),
    option({ value: "mods" }, "Mods"),
    option({ value: "favs" }, "Favorites")
  );
  setViewSelect.onchange = (event) => setPreferedTab(event.target.value);
  var setThemeSelect = select(
    { class: "selectRow", id: "themeSelect", style: "width: 128px;", value: "dark" },
    option({ value: "dark" }, "Dark"),
    option({ value: "light" }, "Light"),
    option({ value: "midnight" }, "Midnight"),
    option({ value: "beepbox" }, "BeepBox"),
    option({ value: "jummbox" }, "JummBox"),
    option({ value: "abyssbox" }, "AbyssBox"),
    option({ value: "slarmoosbox" }, "SlarmoosBox")
  );
  setThemeSelect.onchange = (event) => setTheme(event.target.value);
  var promptOpacitySlider = input2({ id: "promptOpacitySlider", style: "width: 128px;align-self: center;", type: "range", min: "0", max: "1", step: "0.1", value: 0.2 });
  promptOpacitySlider.onchange = (event) => setPromptOpacity(event.target.value);
  var preferencesPrompt = div2(
    { class: "preferences", id: "preferencesPrompt", style: "display: none; flex-direction: column;" },
    div2(
      { class: "promptTitle" },
      h22({ class: "BeepBoxTitle", style: "margin-bottom: 0.5em;" }, "Preferences:")
    ),
    div2(
      { style: "margin-bottom: 0.5em;display: flex;flex-direction: column;gap: 15px;" },
      div2(
        { style: "display: flex;flex-direction: column;" },
        "Starting Tab:",
        div2(
          { class: "selectContainer", style: "align-self: center; position: relative;" },
          setViewSelect
        )
      ),
      div2(
        { style: "display: flex;flex-direction: column;" },
        "Unfocused Prompt Opacity:",
        promptOpacitySlider
      ),
      div2(
        { style: "display: flex;flex-direction: column;" },
        "Theme:",
        div2(
          { class: "selectContainer", style: "align-self: center; position: relative;" },
          setThemeSelect
        )
      )
    ),
    button2({ class: "cancelButton", onclick: "closePrompt(`preferencesPrompt`)" })
  );

  // main.ts
  var { select: select2, option: option2, div: div3 } = HTML;
  var sorter = select2({ class: "sort", id: "sorter" });
  var header = document.getElementById("sortContainer");
  header.appendChild(buildOptions(sorter, sorterValues.slice()));
  sorter.value = "1";
  sorter.addEventListener("change", () => recreateMods());
  var reverseButton = div3({ class: "reverseButton down", id: "reverseButton" });
  header.append(reverseButton);
  reverseButton.addEventListener("click", () => {
    if (reverseButton.classList.contains("down")) {
      reverseButton.classList.remove("down");
      reverseButton.classList.add("up");
    } else {
      reverseButton.classList.remove("up");
      reverseButton.classList.add("down");
    }
    recreateMods();
  });
  createMods("date", false);
  var promptContainer = document.getElementById("prompt");
  promptContainer.appendChild(preferencesPrompt);
  var promptOpacitySlider2 = document.getElementById("promptOpacitySlider");
  var themeSelect = document.getElementById("themeSelect");
  var viewSelect = document.getElementById("setViewSelect");
  var searchbar = document.getElementById("searchbar");
  var opacity = window.localStorage.getItem("promptOpacity");
  if (opacity != null) {
    setPromptOpacity(opacity);
    promptOpacitySlider2.value = opacity;
  }
  var view = window.localStorage.getItem("setView");
  if (view != null) {
    viewSelect.value = view;
  } else {
    viewSelect.value = "previous";
    window.localStorage.setItem("setView", "previous");
  }
  var urlThing = String(window.location.hash);
  var urlThing2 = urlThing.substring(3);
  if (urlThing2.length > 0) {
    searchbar.value = decodeURIComponent(urlThing2);
    searchForMods(urlThing2);
    if (currentView == 2) {
      switchView(2);
    }
  }
  window.searchForMod = () => {
    searchForMods(searchbar.value);
    if (currentView == 2) {
      switchView(2);
    }
  };
  function recreateMods() {
    promptContainer.innerHTML = "";
    document.getElementById("modContainer").innerHTML = "";
    createMods(sorterValues[parseInt(sorter.value + "")], reverseButton.classList.contains("up"));
    promptContainer.appendChild(preferencesPrompt);
    const opacity2 = window.localStorage.getItem("promptOpacity");
    if (opacity2 != null) {
      setPromptOpacity(opacity2);
      promptOpacitySlider2.value = opacity2;
    }
    const view2 = window.localStorage.getItem("setView");
    if (view2 != null) {
      viewSelect.value = view2;
    } else {
      viewSelect.value = "previous";
      window.localStorage.setItem("setView", "previous");
    }
    searchForMods(searchbar.value);
    if (currentView == 2) {
      switchView(2);
    }
  }
  window.switchView = switchView;
  window.surpriseMod = () => {
    searchForMods(searchbar.value + " #surprise");
  };
  function buildOptions(menu, items) {
    for (let index = 0; index < items.length; index++) {
      menu.appendChild(option2({ value: index }, items[index]));
    }
    return menu;
  }
  var colorTheme = window.localStorage.getItem("colorTheme");
  if (colorTheme != null) {
    themeSelect.value = colorTheme;
    setTheme(colorTheme);
  } else {
    themeSelect.value = "dark";
    window.localStorage.setItem("colorTheme", "dark");
  }
  if (window.localStorage.getItem("setView") != null) {
    if (window.localStorage.getItem("setView") == "previous") {
      if (window.localStorage.getItem("previousView") != null) {
        switchView(Number(window.localStorage.getItem("previousView")));
      } else {
        switchView(1);
      }
    } else if (window.localStorage.getItem("setView") == "mods") {
      switchView(1);
    } else if (window.localStorage.getItem("setView") == "favs") {
      switchView(2);
    }
  } else {
    window.localStorage.setItem("setView", "previous");
    switchView(1);
  }
})();
