// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"helpers/geometric/models/point.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"helpers/geometric/models/range.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"helpers/geometric/models/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./point.model"));

__export(require("./range.model"));
},{"./point.model":"helpers/geometric/models/point.model.ts","./range.model":"helpers/geometric/models/range.model.ts"}],"helpers/geometric/geometric.helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GeometricHelper =
/** @class */
function () {
  function GeometricHelper() {}

  GeometricHelper.degreeToRadian = function (degree) {
    return degree * Math.PI / 180;
  };

  return GeometricHelper;
}();

exports.GeometricHelper = GeometricHelper;
},{}],"helpers/geometric/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./models"));

__export(require("./geometric.helper"));
},{"./models":"helpers/geometric/models/index.ts","./geometric.helper":"helpers/geometric/geometric.helper.ts"}],"l-system/models/l-system-options.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"l-system/models/l-system-data.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"l-system/models/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./l-system-options.model"));

__export(require("./l-system-data.model"));
},{"./l-system-options.model":"l-system/models/l-system-options.model.ts","./l-system-data.model":"l-system/models/l-system-data.model.ts"}],"l-system/l-system-rule.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LSystemRule =
/** @class */
function () {
  function LSystemRule(source, target) {
    this.source = source;
    this.target = target;
  }

  LSystemRule.prototype.isMatch = function (char) {
    return this.source === char;
  };

  LSystemRule.prototype.apply = function () {
    return this.target;
  };

  return LSystemRule;
}();

exports.LSystemRule = LSystemRule;
},{}],"l-system/l-system-draw-rule.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LSystemDrawRule =
/** @class */
function () {
  function LSystemDrawRule(source, apply) {
    this.source = source;
    this.apply = apply;
  }

  LSystemDrawRule.prototype.isMatch = function (char) {
    return this.source === char;
  };

  return LSystemDrawRule;
}();

exports.LSystemDrawRule = LSystemDrawRule;
},{}],"l-system/l-system.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LSystem =
/** @class */
function () {
  function LSystem(data) {
    this.states = [];
    this.axiom = data.axiom;
    this.options = this.deepObjClone(data.options);
    this.rules = data.rules;
    this.drawRules = data.drawRules;
  }

  LSystem.prototype.getNext = function (iterations) {
    var _this = this;

    if (iterations === void 0) {
      iterations = 1;
    }

    while (iterations > 0) {
      this.axiom = (this.axiom || '').split('').map(function (char) {
        for (var i = 0; i < _this.rules.length; i++) {
          if (_this.rules[i].isMatch(char)) {
            return _this.rules[i].apply();
          }
        }

        return char;
      }).join('');
      iterations--;
    }

    return this.axiom;
  };

  LSystem.prototype.drawRule = function (char, context) {
    var drawRule = this.drawRules.find(function (rule) {
      return rule.isMatch(char);
    });

    if (drawRule) {
      drawRule.apply(context, this.options);
    }
  };

  LSystem.prototype.saveState = function () {
    this.states.push(this.deepObjClone(this.options));
  };

  LSystem.prototype.restoreState = function () {
    this.options = this.states.pop();
  };

  LSystem.prototype.deepObjClone = function (object) {
    return JSON.parse(JSON.stringify(object));
  };

  return LSystem;
}();

exports.LSystem = LSystem;
},{}],"l-system/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./models"));

__export(require("./l-system-rule.class"));

__export(require("./l-system-draw-rule.class"));

__export(require("./l-system.class"));
},{"./models":"l-system/models/index.ts","./l-system-rule.class":"l-system/l-system-rule.class.ts","./l-system-draw-rule.class":"l-system/l-system-draw-rule.class.ts","./l-system.class":"l-system/l-system.class.ts"}],"helpers/random/random.helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RandomHelper =
/** @class */
function () {
  function RandomHelper() {}

  RandomHelper.range = function (min, max) {
    return min + Math.random() * (max - min);
  };

  RandomHelper.rangeInteger = function (min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  return RandomHelper;
}();

exports.RandomHelper = RandomHelper;
},{}],"helpers/random/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./random.helper"));
},{"./random.helper":"helpers/random/random.helper.ts"}],"helpers/keyboard/enums/keys.enum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var KeyboardKeysEnum;

(function (KeyboardKeysEnum) {
  KeyboardKeysEnum["P"] = "KeyP";
  KeyboardKeysEnum["T"] = "KeyT";
  KeyboardKeysEnum["W"] = "KeyW";
})(KeyboardKeysEnum = exports.KeyboardKeysEnum || (exports.KeyboardKeysEnum = {}));
},{}],"helpers/keyboard/enums/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./keys.enum"));
},{"./keys.enum":"helpers/keyboard/enums/keys.enum.ts"}],"helpers/keyboard/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./enums"));
},{"./enums":"helpers/keyboard/enums/index.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var geometric_1 = require("./helpers/geometric");

var l_system_1 = require("./l-system");

var random_1 = require("./helpers/random");

var keyboard_1 = require("./helpers/keyboard");

var textElement = document.getElementById('text');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width = document.body.clientWidth;
var height = 400;
canvas.width = width;
canvas.height = height;
var groundCenterPoint = {
  x: width / 2,
  y: height
};
var pifagorLSystemData = {
  axiom: '0',
  options: {
    length: 5,
    iterations: 6,
    angle: geometric_1.GeometricHelper.degreeToRadian(45)
  },
  rules: [new l_system_1.LSystemRule('1', '11'), new l_system_1.LSystemRule('0', '1[0]0')],
  drawRules: [new l_system_1.LSystemDrawRule('0', function (context, options) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, options.length);
    context.stroke();
  }), new l_system_1.LSystemDrawRule('1', function (context, options) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, options.length);
    context.stroke();
    context.translate(0, options.length);
  }), new l_system_1.LSystemDrawRule('[', function (context, options) {
    context.save();
    context.rotate(-options.angle);
  }), new l_system_1.LSystemDrawRule(']', function (context, options) {
    context.restore();
    context.rotate(options.angle);
  })]
};
var weedLSystemData = {
  axiom: 'X',
  options: {
    length: 2.5,
    iterations: 6,
    angleRange: {
      min: 20,
      max: 30
    }
  },
  rules: [new l_system_1.LSystemRule('X', 'F-[[X]+X]+F[+FX]-X'), new l_system_1.LSystemRule('F', 'FF')],
  drawRules: [new l_system_1.LSystemDrawRule('F', function (context, options) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, options.length);
    context.stroke();
    context.translate(0, options.length);
  }), new l_system_1.LSystemDrawRule('+', function (context, options) {
    var angle = random_1.RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
    context.rotate(geometric_1.GeometricHelper.degreeToRadian(angle));
  }), new l_system_1.LSystemDrawRule('-', function (context, options) {
    var angle = random_1.RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
    context.rotate(-geometric_1.GeometricHelper.degreeToRadian(angle));
  }), new l_system_1.LSystemDrawRule('[', function (context) {
    context.save();
  }), new l_system_1.LSystemDrawRule(']', function (context) {
    context.restore();
  })]
};
var treeLSystemData = {
  axiom: 'X',
  options: {
    iterations: 12,
    length: 70,
    lengthDecreaseRatio: 0.79,
    width: 6,
    widthDecreaseRatio: 0.87,
    color: 51,
    colorDecreaseRatio: 1.12,
    angleRange: {
      min: 5,
      max: 45
    }
  },
  rules: [new l_system_1.LSystemRule('X', 'F[@[-X]+X]')],
  drawRules: [new l_system_1.LSystemDrawRule('X', function (context, options) {
    context.strokeStyle = '#27FF18';
    context.lineWidth = options.width;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, options.length);
    context.stroke();
  }), new l_system_1.LSystemDrawRule('F', function (context, options) {
    context.strokeStyle = "rgb(" + options.color + ", " + options.color + ", " + options.color + ")";
    context.lineWidth = options.width;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, options.length);
    context.stroke();
    context.translate(0, options.length);
  }), new l_system_1.LSystemDrawRule('+', function (context, options) {
    var angle = random_1.RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
    var radianAngle = geometric_1.GeometricHelper.degreeToRadian(angle);
    context.rotate(radianAngle);
  }), new l_system_1.LSystemDrawRule('-', function (context, options) {
    var angle = random_1.RandomHelper.rangeInteger(options.angleRange.min, options.angleRange.max);
    var radianAngle = geometric_1.GeometricHelper.degreeToRadian(angle);
    context.rotate(-radianAngle);
  }), new l_system_1.LSystemDrawRule('[', function (context) {
    context.save();
    currentLSystem.saveState();
  }), new l_system_1.LSystemDrawRule(']', function (context) {
    context.restore();
    currentLSystem.restoreState();
  }), new l_system_1.LSystemDrawRule('@', function (_, options) {
    options.length *= options.lengthDecreaseRatio;
    options.width = Math.max(1, options.width * options.widthDecreaseRatio);
    options.color *= options.colorDecreaseRatio;
  })]
};
var lSystemsMap = new Map([[keyboard_1.KeyboardKeysEnum.P, pifagorLSystemData], [keyboard_1.KeyboardKeysEnum.W, weedLSystemData], [keyboard_1.KeyboardKeysEnum.T, treeLSystemData]]);
var currentLSystem;
var lSystemText;
document.addEventListener('keypress', function (event) {
  if (lSystemsMap.has(event.code)) {
    setCurrentLSystem(lSystemsMap.get(event.code));
  }
});
setCurrentLSystem(treeLSystemData);

function setCurrentLSystem(lSystemData) {
  currentLSystem = new l_system_1.LSystem(lSystemData);
  update();
}

function update() {
  lSystemText = currentLSystem.getNext(currentLSystem.options.iterations);
  clear();
  drawAxiom(lSystemText);
}

function drawAxiom(axiom) {
  context.save();
  context.translate(groundCenterPoint.x, groundCenterPoint.y);
  context.rotate(Math.PI);
  (axiom || '').split('').forEach(function (char) {
    return currentLSystem.drawRule(char, context);
  });
  context.restore();
}

function clear() {
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
}

function setContentText(text) {
  textElement.innerText = text;
}
},{"./helpers/geometric":"helpers/geometric/index.ts","./l-system":"l-system/index.ts","./helpers/random":"helpers/random/index.ts","./helpers/keyboard":"helpers/keyboard/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58568" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.map