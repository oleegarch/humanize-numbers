"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alphabetString = exports.alphabet = void 0;
exports.avoidExponentialNotation = avoidExponentialNotation;
exports.beutifulCeil = beutifulCeil;
exports.beutifulFloor = beutifulFloor;
exports.beutifulRound = beutifulRound;
exports.ceil = ceil;
exports.clamp = clamp;
exports.countUnits = countUnits;
exports.dashNumbers = dashNumbers;
exports.floor = floor;
exports.fract = fract;
exports.fullyReadableNumber = fullyReadableNumber;
exports.humanizeAbbr = humanizeAbbr;
exports.humanizeAlphabet = humanizeAlphabet;
exports.humanizeNumber = humanizeNumber;
exports.humanizeNumberMD = humanizeNumberMD;
exports.humanizeNumberSM = humanizeNumberSM;
exports.humanizeNumberXS = humanizeNumberXS;
exports.humanizeWithFormat = humanizeWithFormat;
exports.isTextMeansThisRank = isTextMeansThisRank;
exports.lerp = lerp;
exports.round = round;
exports.setGlobalLocale = setGlobalLocale;
exports.textToNumbers = textToNumbers;
var makePlural = _interopRequireWildcard(require("make-plural"));
var _ranks = require("./ranks.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var locale = "en";
function setGlobalLocale(newLocale) {
  locale = newLocale;
}

/* lerp */
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
/* clamp */
function clamp(min, max, num) {
  if (arguments.length === 1) {
    num = min;
    min = 0;
    max = 1;
  }
  return Math.max(min, Math.min(max, num));
}
/* return fraction part of number */
function fract(num) {
  return num % 1;
}

/* units counter */
// 1000 = 3
// 1000000 = 6
function countUnits(num) {
  return Math.max(String(Math.floor(Math.abs(num))).length - 1, 0);
}

/*
 *
 * round, floor, ceil
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
  var functionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "round";
  if (num === 0) {
    return num;
  }
  var func = Math[functionName];
  if (fractionCount === 0) {
    return func(num);
  }
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
  return round(num, fractionCount, "floor");
}
function ceil(num, fractionCount) {
  return round(num, fractionCount, "ceil");
}

/**
 *
 * Округляет цифры красиво
 *
 * number = 1111111.111 -> 1100000
 * rfraction =  0: 1000000
 * rfraction =  1: 1100000
 * rfraction =  2: 1110000
 *
 */
function beutifulRound(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var functionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "round";
  var count = countUnits(num);
  var fractionCount = -(count - reverseFractionCount);
  return round(num, fractionCount, functionName);
}
function beutifulFloor(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return beutifulRound(num, reverseFractionCount, "floor");
}
function beutifulCeil(num) {
  var reverseFractionCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return beutifulRound(num, reverseFractionCount, "ceil");
}

/*
 *
 * avoid exponential notation
 * 1e21 = 1000000000000000000000
 * thank https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
 *
 */
function avoidExponentialNotation(x) {
  var sign = "";
  if (Math.sign(x) === -1) {
    sign = "-";
  }
  x = Math.abs(x);
  var split = x.toString().split("e");
  var e = parseInt(split[1]);
  if (e < 0) {
    e = Math.abs(e);
    x *= Math.pow(10, e - 1);
    x = "0." + new Array(e).join("0") + x.toString().substring(2);
  } else if (e > 0) {
    e -= 20;
    x /= Math.pow(10, e);
    x += new Array(e).join("0") + "0";
  }
  return sign + x;
}

/*
 *
 * division numbers
 *
 * 1000000 = 1 000 000
 * 1e15    = 1 000 000 000 000 000
 *
 */
function fullyReadableNumber(num) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
  if (typeof num === "number") num = avoidExponentialNotation(num);
  var _String$split = String(num).split("."),
    _String$split2 = _slicedToArray(_String$split, 2),
    _String$split2$ = _String$split2[0],
    firstStr = _String$split2$ === void 0 ? "" : _String$split2$,
    secondStr = _String$split2[1];
  return firstStr.replace(/(.)(?=(\d{3})+$)/g, "$1" + separator) + (secondStr ? "." + secondStr : "");
}

/*
 *
 * readable numbers XS
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
 *
 */
function humanizeNumberXS(num, options) {
  return humanizeNumber(num, "xs", options);
}

/*
 *
 * readable numbers SM
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
 *
 */
function humanizeNumberSM(num, options) {
  return humanizeNumber(num, "sm", options);
}

/*
 *
 * readable numbers MD
 *
 * 10000           = 10 тысяч
 * 1000000         = 1 миллион
 * 1100000         = 1.1 миллион
 * 1111111         = 1.11 миллионов
 * 1234567890      = 1.23 миллиардов
 * 1234567890123   = 1.23 триллионов
 * 1.222e15        = 1.22 квадриллион
 * 1.222e18 + 2    = 1.22 квинтиллион
 * 1.222e21 + 2    = 1.22 секстиллион
 *
 */
function humanizeNumberMD(num, options) {
  return humanizeNumber(num, "md", options);
}
function humanizeNumber(num) {
  var _options$locale, _options$separator;
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "md";
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (Number.isNaN(Number(num))) {
    return "0";
  }
  if (!Number.isFinite(num)) {
    return num.toString();
  }
  var currentLocale = (_options$locale = options.locale) !== null && _options$locale !== void 0 ? _options$locale : locale;
  var absNum = Math.abs(num);
  var rank = options.withUnit ? _ranks.ranks.find(function (r) {
    return r.unit === options.withUnit;
  }) : null;
  if (!rank) {
    var _iterator = _createForOfIteratorHelper(_ranks.ranks),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var currentRank = _step.value;
        if (currentRank.unit <= absNum) {
          rank = currentRank;
        } else {
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  if (!rank) {
    return String(num);
  }
  var readable = "";
  var units = num / rank.unit;
  var unitNameValue = (0, _ranks.getRankProperty)(rank, currentLocale, "unitName");
  var abbreviationValue = (0, _ranks.getRankProperty)(rank, currentLocale, "abbreviation");
  var abbrValue = (0, _ranks.getRankProperty)(rank, currentLocale, "abbr");
  var unitName = unitNameValue;
  if (_typeof(unitName) === "object" && unitName != null) {
    unitName = unitName[makePlural[currentLocale](units)];
  }
  var unitLabel = unitName;
  var fractionCount = 2;
  if (size === "xs") {
    fractionCount = 1;
    unitLabel = abbrValue !== null && abbrValue !== void 0 ? abbrValue : unitName;
  }
  if (size === "sm") {
    var _ref;
    unitLabel = (_ref = abbreviationValue !== null && abbreviationValue !== void 0 ? abbreviationValue : abbrValue) !== null && _ref !== void 0 ? _ref : unitName;
  }
  var dividedUnits = units;
  var dividedUnitLabel = unitLabel;
  var separator = (_options$separator = options.separator) !== null && _options$separator !== void 0 ? _options$separator : dividedUnitLabel.length === 1 ? "" : " ";
  while (dividedUnits >= rank.unit) {
    dividedUnitLabel += separator + unitLabel;
    dividedUnits /= rank.unit;
  }
  if (typeof options.fractionCount === "number") {
    fractionCount = options.fractionCount;
  }
  readable += fullyReadableNumber(round(dividedUnits, fractionCount, options.functionName));
  readable += separator + dividedUnitLabel;
  return readable;
}

/*
 *
 * humanize with custom format
 *
 */
function humanizeWithFormat(num) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$format = _ref2.format,
    format = _ref2$format === void 0 ? ["K", "M", "B", "T"] : _ref2$format,
    _ref2$divider = _ref2.divider,
    divider = _ref2$divider === void 0 ? 1e3 : _ref2$divider,
    _ref2$fractionCount = _ref2.fractionCount,
    fractionCount = _ref2$fractionCount === void 0 ? 0 : _ref2$fractionCount,
    _ref2$separator = _ref2.separator,
    separator = _ref2$separator === void 0 ? "" : _ref2$separator,
    _ref2$formatSeparator = _ref2.formatSeparator,
    formatSeparator = _ref2$formatSeparator === void 0 ? "" : _ref2$formatSeparator,
    _ref2$roundFunctionNa = _ref2.roundFunctionName,
    roundFunctionName = _ref2$roundFunctionNa === void 0 ? "floor" : _ref2$roundFunctionNa;
  if (Number.isNaN(Number(num))) return "0";
  var readable = "";
  var dividedNum = num;
  for (var index = format.length - 1; index >= 0; index--) {
    var formatLabel = format[index];
    var divideTo = Math.pow(divider, index + 1);
    var divided = round(dividedNum / divideTo);
    while (divided >= 1) {
      readable += formatSeparator + formatLabel;
      dividedNum = round(dividedNum / divideTo);
      divided = round(dividedNum / divideTo);
    }
  }
  readable = round(dividedNum, fractionCount, roundFunctionName) + separator + readable;
  return readable;
}
function humanizeAbbr(num) {
  return humanizeWithFormat(num);
}
var alphabetString = exports.alphabetString = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
var alphabet = exports.alphabet = alphabetString.split(",");
function humanizeAlphabet(num) {
  var upper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = {};
  var replaceAlphabet;
  if (upper) {
    replaceAlphabet = alphabetString.toUpperCase().split(",");
  }
  options.format = replaceAlphabet !== null && replaceAlphabet !== void 0 ? replaceAlphabet : alphabet;
  return humanizeWithFormat(num, options);
}

/*
 *
 * textToNumbers
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
var numbersRegexp = /(-?(?:\d+\.\d+|\d+))((?:\s+)?[а-яa-z]+)?/gi;
var removeNonLettersSymbols = function removeNonLettersSymbols(t) {
  return t.replace(/[\.,:;\(\)]/g, "");
};
function textToNumbers(text) {
  var _options$locale2;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var numbers = [];
  var currentLocale = (_options$locale2 = options.locale) !== null && _options$locale2 !== void 0 ? _options$locale2 : locale;
  text = text.replace(numbersRegexp, function (allMatch, match1, match2) {
    var unitLabel = (match2 !== null && match2 !== void 0 ? match2 : "").toLowerCase().trim();
    var num = parseFloat(match1);
    var rank = _ranks.ranks.find(function (rank) {
      return isTextMeansThisRank(unitLabel, rank, currentLocale);
    });
    if (rank) {
      var _getUnitLabelAbbrCoun;
      var abbrCount = (_getUnitLabelAbbrCoun = getUnitLabelAbbrCount(unitLabel, rank)) !== null && _getUnitLabelAbbrCoun !== void 0 ? _getUnitLabelAbbrCoun : 1;
      numbers.push(num * Math.pow(rank.unit, abbrCount));
    } else {
      numbers.push(num);
    }
    return "";
  });
  return {
    numbers: numbers,
    textWithoutNumbers: text
  };
}
function isTextMeansThisRank(text, rank, locale) {
  var unitName = (0, _ranks.getRankProperty)(rank, locale, "unitName");
  var abbr = (0, _ranks.getRankProperty)(rank, locale, "abbr");
  var abbreviation = (0, _ranks.getRankProperty)(rank, locale, "abbreviation");
  var regexpStr = "";
  var prefixStr = "";
  if (unitName != null) {
    if (_typeof(unitName) === "object" && unitName != null) {
      for (var howMuch in unitName) {
        regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(unitName[howMuch]), "$");
        prefixStr = "|";
      }
    } else {
      regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(unitName), "$");
      prefixStr = "|";
    }
  }
  if (abbreviation != null) {
    regexpStr += prefixStr + "^".concat(removeNonLettersSymbols(abbreviation), "$");
    prefixStr = "|";
  }
  if (abbr != null) {
    regexpStr += prefixStr + "^(".concat(removeNonLettersSymbols(abbr), ")+$");
    prefixStr = "|";
  }
  return new RegExp(regexpStr, "i").test(text);
}
function getUnitLabelAbbrCount(text, rank) {
  if (rank.abbr.length === 1 && text.split("").every(function (_char) {
    return _char === rank.abbr;
  })) {
    return text.split("").length;
  }
  return null;
}

/*
 *
 * connect numbers with a dash
 *
 * dashNumbers([1, 2, 3, 4, 5, 8, 31, 23]) === '1-5, 8, 23, 31'
 *
 */
function dashNumbers(numbers) {
  var dash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ", ";
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
    return "".concat(obj.number).concat(obj.lastNumber ? dash + obj.lastNumber : "");
  }).join(separator);
}