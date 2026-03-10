"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alphabetString = exports.alphabetArray = exports.alphabet = void 0;
exports.avoidExponentialNotation = avoidExponentialNotation;
exports.beutifulCeil = beutifulCeil;
exports.beutifulFloor = beutifulFloor;
exports.beutifulRound = beutifulRound;
exports.ceil = ceil;
exports.clamp = clamp;
exports.countUnits = countUnits;
exports.createHumanizeFormat = createHumanizeFormat;
exports.dashNumbers = dashNumbers;
exports.floor = floor;
exports.fract = fract;
exports.fullyReadableNumber = fullyReadableNumber;
Object.defineProperty(exports, "getRankProperty", {
  enumerable: true,
  get: function get() {
    return _ranks.getRankProperty;
  }
});
exports.humanizeAbbr = humanizeAbbr;
exports.humanizeAlphabet = humanizeAlphabet;
exports.humanizeNumber = humanizeNumber;
exports.humanizeNumberMD = humanizeNumberMD;
exports.humanizeNumberSM = humanizeNumberSM;
exports.humanizeNumberXS = humanizeNumberXS;
exports.isTextMeansThisRank = isTextMeansThisRank;
exports.lerp = lerp;
Object.defineProperty(exports, "ranks", {
  enumerable: true,
  get: function get() {
    return _ranks.ranks;
  }
});
exports.round = round;
exports.setGlobalHumanizeOptions = setGlobalHumanizeOptions;
exports.setGlobalLocale = setGlobalLocale;
exports.textToNumbers = textToNumbers;
exports.toExponentialNotation = toExponentialNotation;
var makePlural = _interopRequireWildcard(require("make-plural"));
var _ranks = require("./ranks.js");
var _excluded = ["maxRanks"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Global settings */
var locale = 'en';
var humanizeOptions = {};
function setGlobalLocale(newLocale) {
  locale = newLocale;
}
function setGlobalHumanizeOptions(field, value) {
  if (field != null && value != null) {
    humanizeOptions[field] = value;
  } else {
    humanizeOptions = field;
  }
}

/* Calculates a number between two numbers at a specific increment */
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
/* Clamps the given value between min and max */
function clamp(min, max, num) {
  if (arguments.length === 1) {
    num = min;
    min = 0;
    max = 1;
  }
  return Math.max(min, Math.min(max, num));
}
/* Returns the fractional part of a number */
function fract(num) {
  return num % 1;
}

/* Counts the number of units in a number */
// 1000 = 3
// 1000000 = 6
function countUnits(num) {
  var posInt = Math.floor(Math.abs(num));
  var numStr = String(avoidExponentialNotation(posInt));
  return Math.max(numStr.length - 1, 0);
}

/*
 *
 * Rounds a number to a specified number of fractional digits
 *
 * number = 111111.111;
 * fraction =  0: 111111
 * fraction =  1: 111111.1
 * fraction =  2: 111111.11
 * fraction = -1: 111110
 * fraction = -2: 111100
 *
 */
function round(num) {
  var fractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var functionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'round';
  if (num === 0) return num;
  var func = Math[functionName];
  if (fractionCount === 0) return func(num);
  var unit = Math.pow(10, Math.abs(fractionCount));
  if (fractionCount > 0) {
    return func(num * unit) / unit;
  } else {
    if (Math.abs(num) < unit) {
      unit = Math.pow(10, countUnits(num));
    }
    return func(num / unit) * unit;
  }
}
function floor(num, fractionCount) {
  return round(num, fractionCount, 'floor');
}
function ceil(num, fractionCount) {
  return round(num, fractionCount, 'ceil');
}

/**
 *
 * Rounds a number to a specified number of fractional digits in a beautiful way
 *
 * number = 1111111.111 -> 1100000
 * rfraction =  0: 1000000
 * rfraction =  1: 1100000
 * rfraction =  2: 1110000
 *
 */
function beutifulRound(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var functionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'round';
  var count = countUnits(num);
  var fractionCount = -(count - reverseFractionCount);
  return round(num, fractionCount, functionName);
}
function beutifulFloor(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return beutifulRound(num, reverseFractionCount, 'floor');
}
function beutifulCeil(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return beutifulRound(num, reverseFractionCount, 'ceil');
}

/*
 *
 * Avoids exponential notation
 * 1e21 = 1000000000000000000000
 * thank https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
 *
 */
function avoidExponentialNotation(x) {
  var sign = '';
  if (Math.sign(x) === -1) {
    sign = '-';
  }
  x = Math.abs(x);
  var split = x.toString().split('e');
  var e = parseInt(split[1]);
  if (e < 0) {
    e = Math.abs(e);
    x *= Math.pow(10, e - 1);
    x = '0.' + new Array(e).join('0') + x.toString().substring(2);
  } else if (e > 0) {
    e -= 20;
    x /= Math.pow(10, e);
    x += new Array(e).join('0') + '0';
  }
  return sign + x;
}

/*
 * Convert to exponential notation
 * 1000 = 1e3
 * 1000000 = 1e6
 * 1000000000 = 1e9
 * 1000000000000 = 1e12
 * 1000000000000000 = 1e15
 * 1000000000000000000 = 1e18
 * 1000000000000000000000 = 1e21
 * Infinity = Infinity
 */
function toExponentialNotation(num) {
  var fractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$plusSign = _ref.plusSign,
    plusSign = _ref$plusSign === void 0 ? false : _ref$plusSign,
    _ref$padZeros = _ref.padZeros,
    padZeros = _ref$padZeros === void 0 ? false : _ref$padZeros;
  if (!Number.isFinite(num)) return num.toString();
  var exponentialNotation = num.toExponential(fractionCount);
  if (!padZeros) {
    exponentialNotation = exponentialNotation.replace(/(\.\d*?)0+e/i, '$1e');
    exponentialNotation = exponentialNotation.replace(/\.e/i, 'e');
  }
  if (plusSign === false) exponentialNotation = exponentialNotation.replace('+', '');
  return exponentialNotation;
}

/*
 *
 * Divides a number into a readable format
 *
 * 1000000 = 1 000 000
 * 1e15    = 1 000 000 000 000 000
 *
 */
function fullyReadableNumber(num) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  if (typeof num === 'number') num = avoidExponentialNotation(num);
  var _String$split = String(num).split('.'),
    _String$split2 = _slicedToArray(_String$split, 2),
    _String$split2$ = _String$split2[0],
    firstStr = _String$split2$ === void 0 ? '' : _String$split2$,
    secondStr = _String$split2[1];
  return firstStr.replace(/(.)(?=(\d{3})+$)/g, '$1' + separator) + (secondStr ? '.' + secondStr : '');
}

/*
 *
 * Readable numbers XS
 *
 * 10000           = 10K
 * 1000000         = 1M
 * 1100000         = 1.1M
 * 1111111         = 1.1M
 * 1234567890      = 1.2B
 * 1234567890123   = 1.2T
 * 1.222e15        = 1.2 Qa
 * 1.222e18 + 2    = 1.2 Qi
 * 1.222e21 + 2    = 1.2 Sx
 * NaN             = 0
 * Infinity        = Infinity
 *
 */
function humanizeNumberXS(num, options) {
  return humanizeNumber(num, 'xs', options);
}

/*
 *
 * Readable numbers SM
 *
 * 10000           = 10 тыс.
 * 1000000         = 1 млн
 * 1100000         = 1.1 млн
 * 1111111         = 1.11 млн
 * 1234567890      = 1.23 млрд
 * 1234567890123   = 1.23 трлн
 * 1.222e15        = 1.22 Qa
 * 1.222e18 + 2    = 1.22 Qi
 * 1.222e21 + 2    = 1.22 Sx
 * NaN             = 0
 * Infinity        = Infinity
 *
 */
function humanizeNumberSM(num, options) {
  return humanizeNumber(num, 'sm', options);
}

/*
 *
 * Readable numbers MD
 *
 * 0.000001        = 0.000001
 * 0.01            = 0.01
 * 0               = 0
 * 10000           = 10 тысяч
 * 1000000         = 1 миллион
 * 1100000         = 1.1 миллион
 * 1111111         = 1.11 миллионов
 * 1234567890      = 1.23 миллиардов
 * 1234567890123   = 1.23 триллионов
 * 1.222e15        = 1.22 квадриллион
 * 1.222e18 + 2    = 1.22 квинтиллион
 * 1.222e21 + 2    = 1.22 секстиллион
 * NaN             = 0
 * Infinity        = Infinity
 *
 */
function humanizeNumberMD(num, options) {
  return humanizeNumber(num, 'md', options);
}
function humanizeNumber(num) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'md';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (Number.isNaN(Number(num))) return '0';
  if (!Number.isFinite(num)) return num.toString();
  var _options$humanizeOpti = _objectSpread(_objectSpread({}, options), humanizeOptions),
    optionsLocale = _options$humanizeOpti.locale,
    optionsSeparator = _options$humanizeOpti.separator,
    _options$humanizeOpti2 = _options$humanizeOpti.maxRanks,
    maxRanks = _options$humanizeOpti2 === void 0 ? true : _options$humanizeOpti2,
    _options$humanizeOpti3 = _options$humanizeOpti.format,
    format = _options$humanizeOpti3 === void 0 ? typeof maxRanks === 'number' ? _ranks.ranks.slice(0, maxRanks) : _ranks.ranks : _options$humanizeOpti3,
    _options$humanizeOpti4 = _options$humanizeOpti.exponentialFrom,
    exponentialFrom = _options$humanizeOpti4 === void 0 ? size === 'md' ? false : 1e15 : _options$humanizeOpti4,
    _options$humanizeOpti5 = _options$humanizeOpti.exponentialOptions,
    exponentialOptions = _options$humanizeOpti5 === void 0 ? {
      plusSign: false,
      padZeros: false
    } : _options$humanizeOpti5,
    _options$humanizeOpti6 = _options$humanizeOpti.fractionCount,
    fractionCount = _options$humanizeOpti6 === void 0 ? size === 'xs' ? 1 : 2 : _options$humanizeOpti6,
    _options$humanizeOpti7 = _options$humanizeOpti.padZeros,
    padZeros = _options$humanizeOpti7 === void 0 ? false : _options$humanizeOpti7,
    _options$humanizeOpti8 = _options$humanizeOpti.functionName,
    functionName = _options$humanizeOpti8 === void 0 ? 'round' : _options$humanizeOpti8,
    _options$humanizeOpti9 = _options$humanizeOpti.humanizeFrom,
    humanizeFrom = _options$humanizeOpti9 === void 0 ? 1e3 : _options$humanizeOpti9,
    _options$humanizeOpti0 = _options$humanizeOpti.repeatableAbbr,
    repeatableAbbr = _options$humanizeOpti0 === void 0 ? false : _options$humanizeOpti0,
    _options$humanizeOpti1 = _options$humanizeOpti.withUnit,
    withUnit = _options$humanizeOpti1 === void 0 ? null : _options$humanizeOpti1,
    _options$humanizeOpti10 = _options$humanizeOpti.fullyReadable,
    fullyReadable = _options$humanizeOpti10 === void 0 ? true : _options$humanizeOpti10,
    _options$humanizeOpti11 = _options$humanizeOpti.fullyReadableSeparator,
    fullyReadableSeparator = _options$humanizeOpti11 === void 0 ? ' ' : _options$humanizeOpti11;
  var currentLocale = optionsLocale !== null && optionsLocale !== void 0 ? optionsLocale : locale;
  var absNum = Math.abs(num);
  if (exponentialFrom !== false && absNum >= exponentialFrom) {
    return toExponentialNotation(num, fractionCount, exponentialOptions);
  }
  var getReadableFallback = function getReadableFallback() {
    if (fullyReadable) return fullyReadableNumber(num, fullyReadableSeparator);
    return num.toString();
  };
  var getRankLabel = function getRankLabel(rank, unitsValue) {
    var _ref2;
    var unitNameValue = (0, _ranks.getRankProperty)(rank, currentLocale, 'unitName');
    var abbreviationValue = (0, _ranks.getRankProperty)(rank, currentLocale, 'abbreviation');
    var abbrValue = (0, _ranks.getRankProperty)(rank, currentLocale, 'abbr');
    var unitName = unitNameValue;
    if (_typeof(unitName) === 'object' && unitName != null) {
      unitName = unitName[makePlural[currentLocale](unitsValue)];
    }
    if (size === 'xs') return abbrValue !== null && abbrValue !== void 0 ? abbrValue : unitName;
    if (size === 'sm') return (_ref2 = abbreviationValue !== null && abbreviationValue !== void 0 ? abbreviationValue : abbrValue) !== null && _ref2 !== void 0 ? _ref2 : unitName;
    return unitName;
  };
  var findLargestRankByValue = function findLargestRankByValue(value) {
    var epsilonMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var foundRank = null;
    var valueWithEpsilon = Math.abs(value) * epsilonMultiplier;
    var _iterator = _createForOfIteratorHelper(format),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var currentRank = _step.value;
        if (currentRank.unit <= valueWithEpsilon) {
          foundRank = currentRank;
        } else {
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return foundRank;
  };
  var dividedUnits;
  var labels = [];
  if (repeatableAbbr) {
    var repeatableThreshold = 1e3;
    var repeatableEpsilon = 1e-6;
    var floatingPointEpsilonMultiplier = 1 + Number.EPSILON * 10;
    dividedUnits = num;
    if (withUnit != null) {
      var fixedRank = format.find(function (r) {
        return r.unit === withUnit;
      });
      if (fixedRank == null) return getReadableFallback();
      var fixedLabel = getRankLabel(fixedRank, dividedUnits / fixedRank.unit);
      while (Math.abs(dividedUnits) + repeatableEpsilon >= fixedRank.unit) {
        labels.push(fixedLabel);
        dividedUnits /= fixedRank.unit;
      }
    } else {
      if (humanizeFrom === false || absNum < humanizeFrom) return getReadableFallback();
      while (Math.abs(dividedUnits) + repeatableEpsilon >= repeatableThreshold) {
        var nextRank = findLargestRankByValue(dividedUnits, floatingPointEpsilonMultiplier);
        if (nextRank == null) break;
        labels.push(getRankLabel(nextRank, dividedUnits / nextRank.unit));
        dividedUnits /= nextRank.unit;
      }
    }
  } else {
    var rank = withUnit ? format.find(function (r) {
      return r.unit === withUnit;
    }) : null;
    if (rank == null && humanizeFrom !== false && absNum >= humanizeFrom) {
      rank = findLargestRankByValue(absNum);
    }
    if (rank == null) return getReadableFallback();
    var unitLabel = getRankLabel(rank, num / rank.unit);
    dividedUnits = num / rank.unit;
    while (Math.abs(dividedUnits) >= rank.unit) {
      labels.push(unitLabel);
      dividedUnits /= rank.unit;
    }
    labels.unshift(unitLabel);
  }
  if (labels.length === 0) return getReadableFallback();
  var separator = optionsSeparator !== null && optionsSeparator !== void 0 ? optionsSeparator : labels[0].length === 1 ? '' : ' ';
  var rounded = round(dividedUnits, fractionCount, functionName);
  if (padZeros) rounded = rounded.toFixed(fractionCount);
  return rounded + separator + labels.join(separator);
}

/*
 *
 * Humanizes a number with only abbreviation format (1000T instead of 1 quadrillion)
 * 1000 = 1 thousand
 * 1000000 = 1 million
 * 1000000000 = 1 billion
 * 1000000000000 = 1 trillion
 * 1000000000000000 = 1000 trillion
 * 1000000000000000000 = 1000000 trillion
 *
 */
function humanizeAbbr(num) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref3$maxRanks = _ref3.maxRanks,
    maxRanks = _ref3$maxRanks === void 0 ? 4 : _ref3$maxRanks,
    options = _objectWithoutProperties(_ref3, _excluded);
  return humanizeNumber(num, 'xs', _objectSpread({
    repeatableAbbr: true,
    maxRanks: maxRanks
  }, options));
}

/*
 *
 * Creates a custom humanize format
 * Receives an array of letters and returns an array of rank objects:
 *
 */
function createHumanizeFormat(format) {
  return format.map(function (letter, index) {
    return {
      letter: letter,
      unit: Math.pow(1000, index + 1),
      abbr: letter,
      unitName: letter
    };
  });
}

/*
 *
 * Humanizes a number with alphabet format
 * 1000 = 1a
 * 1000000 = 1b
 * 1000000000 = 1c
 * 1000000000000 = 1d
 * 1000000000000000 = 1e
 * 1000000000000000000 = 1f
 *
 */
var alphabetString = exports.alphabetString = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
var alphabetArray = exports.alphabetArray = alphabetString.split(',');
var alphabet = exports.alphabet = createHumanizeFormat(alphabetArray);
function humanizeAlphabet(num) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return humanizeNumber(num, 'xs', _objectSpread({
    repeatableAbbr: true,
    format: alphabet
  }, options));
}

/*
 *
 * Converts text to numbers
 *
 * 10 тысяч            = 10000
 * 1 миллион           = 1000000
 * 1.1 миллион         = 1100000
 * 1.11 миллионов      = 1110000
 * 1.23 миллиардов     = 1230000000
 * 1.23 триллионов     = 1230000000000
 * 1.22 квадриллиона   = 1.22e15
 * 1.22 квинтиллиона   = 1.22e18
 * 1.22 секстиллиона   = 1.22e21
 *
 */
var numbersRegexp = /(-?(?:\d+(?:\.\d+)?(?:e[+\-]?\d+)?))((?:\s+)?[ёа-яa-z]+)?/gi;
var removeNonLettersSymbols = function removeNonLettersSymbols(t) {
  return t.replace(/[\.,:;\(\)]/g, '');
};
function textToNumbers(text) {
  var _options$locale;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var numbers = [];
  var currentLocale = (_options$locale = options.locale) !== null && _options$locale !== void 0 ? _options$locale : locale;
  text = text.replace(numbersRegexp, function (allMatch, match1, match2) {
    var num = parseFloat(match1);
    var rank;
    if (match2 != null) {
      var unitLabel = (match2 !== null && match2 !== void 0 ? match2 : '').toLowerCase().trim();
      rank = _ranks.ranks.find(function (rank) {
        return isTextMeansThisRank(unitLabel, rank, currentLocale);
      });
      if (rank) {
        var _getUnitLabelAbbrCoun;
        var abbrCount = (_getUnitLabelAbbrCoun = getUnitLabelAbbrCount(unitLabel, rank)) !== null && _getUnitLabelAbbrCoun !== void 0 ? _getUnitLabelAbbrCoun : 1;
        numbers.push(num * Math.pow(rank.unit, abbrCount));
      }
    }
    if (rank == null) {
      numbers.push(num);
    }
    return '';
  });
  return {
    numbers: numbers,
    textWithoutNumbers: text
  };
}
function isTextMeansThisRank(text, rank, locale) {
  var unitName = (0, _ranks.getRankProperty)(rank, locale, 'unitName');
  var abbr = (0, _ranks.getRankProperty)(rank, locale, 'abbr');
  var abbrDefault = rank.abbr;
  var abbreviation = (0, _ranks.getRankProperty)(rank, locale, 'abbreviation');
  var regexpStr = '';
  var prefixStr = '';
  if (unitName != null) {
    if (_typeof(unitName) === 'object' && unitName != null) {
      for (var howMuch in unitName) {
        regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(unitName[howMuch]), "$");
        prefixStr = '|';
      }
    } else {
      regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(unitName), "$");
      prefixStr = '|';
    }
  }
  if (abbreviation != null) {
    regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(abbreviation), "$");
    prefixStr = '|';
  }
  if (abbr != null) {
    regexpStr += prefixStr + "^(".concat(removeNonLettersSymbols(abbr), ")+$");
    prefixStr = '|';
  }
  if (abbrDefault != null && abbrDefault !== abbr) {
    regexpStr += prefixStr + "^(".concat(removeNonLettersSymbols(abbrDefault), ")+$");
    prefixStr = '|';
  }
  return new RegExp(regexpStr, 'i').test(text);
}
function getUnitLabelAbbrCount(text, rank) {
  if (rank.abbr.length === 1 && text.split('').every(function (_char) {
    return _char === rank.abbr.toLowerCase();
  })) {
    return text.split('').length;
  }
  return null;
}

/*
 *
 * Connects numbers with a dash
 *
 * dashNumbers([1, 2, 3, 4, 5, 8, 31, 23]) === '1-5, 8, 23, 31'
 *
 */
function dashNumbers(numbers) {
  var dash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ', ';
  var sortFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (a, b) {
    return a.number - b.number;
  };
  numbers = numbers.slice(0).sort();
  var dashed = [];
  var _iterator2 = _createForOfIteratorHelper(numbers),
    _step2;
  try {
    var _loop = function _loop() {
      var number = _step2.value;
      if (dashed.length === 0) {
        dashed.push({
          number: number
        });
        return 1; // continue
      }
      var connect = dashed.find(function (obj) {
        return obj.lastNumber ? obj.lastNumber == number - 1 : obj.number == number - 1;
      });
      if (connect != null) {
        connect.lastNumber = number;
      } else {
        dashed.push({
          number: number
        });
      }
    };
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      if (_loop()) continue;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return dashed.sort(sortFunc).map(function (obj) {
    return "".concat(obj.number).concat(obj.lastNumber ? dash + obj.lastNumber : '');
  }).join(separator);
}