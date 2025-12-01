"use strict";

var _vitest = require("vitest");
var _index = require("./index.js");
(0, _vitest.describe)('humanizeNumber', function () {
  (0, _vitest.it)('en variants', function () {
    /*
     * standart size
     */
    (0, _vitest.expect)((0, _index.humanizeNumber)(1000)).toBe('1 thousand');
    (0, _vitest.expect)((0, _index.humanizeNumber)(10000)).toBe('10 thousand');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1000000)).toBe('1 million');
    (0, _vitest.expect)((0, _index.humanizeNumber)(2100000)).toBe('2.1 million');
    (0, _vitest.expect)((0, _index.humanizeNumber)(11111111)).toBe('11.11 million');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1234567890)).toBe('1.23 billion');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1234567890123)).toBe('1.23 trillion');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e15)).toBe('1.22 quadrillion');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e18 + 2)).toBe('1.22 quintillion');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e21 + 2)).toBe('1.22 sextillion');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1e303)).toBe('1 centillion');

    /*
     * small size
     */
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1000)).toBe('1K');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(10000)).toBe('10K');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1000000)).toBe('1M');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(11111111)).toBe('11.11M');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1234567890)).toBe('1.23B');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1234567890123)).toBe('1.23T');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e15)).toBe('1.22 Qa');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e18 + 2)).toBe('1.22 Qi');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e21 + 2)).toBe('1.22 Sx');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1e303)).toBe('1 centillion');

    /*
     * extra small size
     */
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1.222e21 + 2)).toBe('1.2 Sx');
  });
  (0, _vitest.it)('ru variants', function () {
    (0, _index.setGlobalLocale)('ru');

    /*
     * standart size
     */
    (0, _vitest.expect)((0, _index.humanizeNumber)(100)).toBe('100');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1000)).toBe('1 тысяча');
    (0, _vitest.expect)((0, _index.humanizeNumber)(10000)).toBe('10 тысяч');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1000000)).toBe('1 миллион');
    (0, _vitest.expect)((0, _index.humanizeNumber)(2100000)).toBe('2.1 миллиона');
    (0, _vitest.expect)((0, _index.humanizeNumber)(11000000)).toBe('11 миллионов');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1234567890)).toBe('1.23 миллиарда');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1234567890123)).toBe('1.23 триллиона');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e15)).toBe('1.22 квадриллиона');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e18 + 2)).toBe('1.22 квинтиллиона');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1.222e21 + 2)).toBe('1.22 секстиллиона');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1e303)).toBe('1 центиллион');

    /*
     * small size
     */
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1000)).toBe('1 тыс.');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(10000)).toBe('10 тыс.');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1000000)).toBe('1 млн');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(2100000)).toBe('2.1 млн');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(11000000)).toBe('11 млн');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1234567890)).toBe('1.23 млрд');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1234567890123)).toBe('1.23 трлн');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e15)).toBe('1.22 Qa');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e18 + 2)).toBe('1.22 Qi');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1.222e21 + 2)).toBe('1.22 Sx');
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1e303)).toBe('1 центиллион');

    /*
     * extra small size
     */
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(10000)).toBe('10К');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1000000)).toBe('1М');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(2100000)).toBe('2.1М');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(11000000)).toBe('11М');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1234567890)).toBe('1.2B');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1234567890123)).toBe('1.2Т');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1.222e15)).toBe('1.2 Qa');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1.222e18 + 2)).toBe('1.2 Qi');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1.222e21 + 2)).toBe('1.2 Sx');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1e303)).toBe('1 центиллион');
  });
  (0, _vitest.it)('with options', function () {
    /* using certain unit rank: */
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(500, {
      withUnit: 1e3
    })).toBe('0.5К');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1e9, {
      withUnit: 1e3
    })).toBe('1ККК');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1e12, {
      withUnit: 1e3
    })).toBe('1КККК');
    (0, _vitest.expect)((0, _index.humanizeNumberXS)(1e12, {
      withUnit: 1e6
    })).toBe('1ММ');

    /* using certain locale: */
    (0, _vitest.expect)((0, _index.humanizeNumberMD)(1e9, {
      locale: 'ru'
    })).toBe('1 миллиард');
    (0, _vitest.expect)((0, _index.humanizeNumberMD)(1e9, {
      locale: 'en'
    })).toBe('1 billion');

    /* using certain fraction count: */
    (0, _vitest.expect)((0, _index.humanizeNumberSM)(1111111, {
      fractionCount: 4,
      locale: 'ru'
    })).toBe('1.1111 млн');

    /* using certain size: */
    (0, _vitest.expect)((0, _index.humanizeNumber)(1e9, 'sm', {
      locale: 'ru'
    })).toBe('1 млрд');
    (0, _vitest.expect)((0, _index.humanizeNumber)(1e9, 'md', {
      locale: 'en'
    })).toBe('1 billion');
  });
});
(0, _vitest.describe)('humanizeAbbr', function () {
  (0, _vitest.test)('default format', function () {
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e3)).toBe('1K');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e6)).toBe('1M');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e9)).toBe('1B');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e12)).toBe('1T');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e15)).toBe('1TK');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e18)).toBe('1TM');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e21)).toBe('1TB');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e24)).toBe('1TT');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e27)).toBe('1TTK');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e30)).toBe('1TTM');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e33)).toBe('1TTB');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e36)).toBe('1TTT');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e39)).toBe('1TTTK');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e42)).toBe('1TTTM');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e45)).toBe('1TTTB');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e48)).toBe('1TTTT');
    (0, _vitest.expect)((0, _index.humanizeAbbr)(1e303)).toBe('1TTTTTTTTTTTTTTTTTTTTTTTTTK');
  });
  (0, _vitest.test)('alphabet format', function () {
    for (var i = 0; i < _index.alphabet.length; i++) {
      var letter = _index.alphabet[i];
      (0, _vitest.expect)((0, _index.humanizeAlphabet)(Math.pow(1000, i + 1))).toBe('1' + letter);
    }
  });
  (0, _vitest.test)('alphabet * 2 format', function () {
    for (var i = _index.alphabet.length; i < _index.alphabet.length * 2; i++) {
      var letter = _index.alphabet[i % _index.alphabet.length];
      (0, _vitest.expect)((0, _index.humanizeAlphabet)(Math.pow(1000, i + 1))).toBe('1z' + letter);
    }
    (0, _vitest.expect)((0, _index.humanizeAlphabet)(1e303)).toBe('1zzzw');
  });
  (0, _vitest.test)('custom format', function () {
    var rusAlphabet = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я'.split(',');
    (0, _vitest.expect)((0, _index.humanizeWithFormat)(1e3, {
      format: rusAlphabet
    })).toBe('1а');
    (0, _vitest.expect)((0, _index.humanizeWithFormat)(1e6, {
      format: rusAlphabet
    })).toBe('1б');
    (0, _vitest.expect)((0, _index.humanizeWithFormat)(1e9, {
      format: rusAlphabet
    })).toBe('1в');
    (0, _vitest.expect)((0, _index.humanizeWithFormat)(1e303, {
      format: rusAlphabet
    })).toBe('1яяяб');
  });
});
(0, _vitest.test)('fullyReadableNumber', function () {
  (0, _vitest.expect)((0, _index.fullyReadableNumber)(1e21)).toBe('1 000 000 000 000 000 000 000');
  (0, _vitest.expect)((0, _index.fullyReadableNumber)(100123123123123)).toBe('100 123 123 123 123');
  (0, _vitest.expect)((0, _index.fullyReadableNumber)(1000000000, ',')).toBe('1,000,000,000');
});
(0, _vitest.test)('avoidExponentialNotation', function () {
  (0, _vitest.expect)((0, _index.avoidExponentialNotation)(1e21)).toBe('1000000000000000000000');
});
(0, _vitest.test)('countUnits', function () {
  (0, _vitest.expect)((0, _index.countUnits)(1000)).toBe(3);
  (0, _vitest.expect)((0, _index.countUnits)(10000)).toBe(4);
  (0, _vitest.expect)((0, _index.countUnits)(11111)).toBe(4);
  (0, _vitest.expect)((0, _index.countUnits)(1000000)).toBe(6);
});
(0, _vitest.test)('dashNumbers', function () {
  (0, _vitest.expect)((0, _index.dashNumbers)([1, 2, 3, 4, 5, 100, 200, 201, 202, 203])).toBe('1-5, 100, 200-203');
  (0, _vitest.expect)((0, _index.dashNumbers)([1, 2, 3, 4, 5, 100, 200, 201, 202, 203], ' to ', ' and ')).toBe('1 to 5 and 100 and 200 to 203');
});
(0, _vitest.test)('round', function () {
  (0, _vitest.expect)((0, _index.round)(1.55)).toBe(2);
  (0, _vitest.expect)((0, _index.round)(1.55, 1)).toBe(1.6);
  (0, _vitest.expect)((0, _index.floor)(1.99)).toBe(1);
  (0, _vitest.expect)((0, _index.floor)(1.99, 1)).toBe(1.9);
  (0, _vitest.expect)((0, _index.ceil)(1.01)).toBe(2);
  (0, _vitest.expect)((0, _index.ceil)(1.019, 2)).toBe(1.02);
  (0, _vitest.expect)((0, _index.beutifulRound)(111111, 0)).toBe(100000);
  (0, _vitest.expect)((0, _index.beutifulRound)(111111, 1)).toBe(110000);
  (0, _vitest.expect)((0, _index.beutifulRound)(111111, 2)).toBe(111000);
  (0, _vitest.expect)((0, _index.beutifulFloor)(111111)).toBe(110000);
  (0, _vitest.expect)((0, _index.beutifulFloor)(111111, 2)).toBe(111000);
  (0, _vitest.expect)((0, _index.beutifulCeil)(111111)).toBe(120000);
  (0, _vitest.expect)((0, _index.beutifulCeil)(111111, 2)).toBe(112000);
});
(0, _vitest.describe)('textToNumbers', function () {
  (0, _vitest.it)('abbr', function () {
    (0, _vitest.expect)((0, _index.textToNumbers)('1K')).toEqual({
      numbers: [1000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1M')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1B')).toEqual({
      numbers: [1000000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1T')).toEqual({
      numbers: [1000000000000],
      textWithoutNumbers: ''
    });
  });
  (0, _vitest.it)('abbr ru', function () {
    (0, _vitest.expect)((0, _index.textToNumbers)('1К')).toEqual({
      numbers: [1000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1М')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1B')).toEqual({
      numbers: [1000000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1Т')).toEqual({
      numbers: [1000000000000],
      textWithoutNumbers: ''
    });
  });
  (0, _vitest.it)('full text', function () {
    (0, _vitest.expect)((0, _index.textToNumbers)('user input: 10 тысяч')).toEqual({
      numbers: [10000],
      textWithoutNumbers: 'user input: '
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1 миллион')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.1 млн')).toEqual({
      numbers: [1100000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.11 млн')).toEqual({
      numbers: [1110000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.23 млрд')).toEqual({
      numbers: [1230000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.23 трлн')).toEqual({
      numbers: [1230000000000],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.22 квадриллиона')).toEqual({
      numbers: [1.22e15],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.22 квинтиллионов')).toEqual({
      numbers: [1.22e18],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1.22 секстиллионов')).toEqual({
      numbers: [1.22e21],
      textWithoutNumbers: ''
    });
    (0, _vitest.expect)((0, _index.textToNumbers)('1000, 2000, 10 тысяч')).toEqual({
      numbers: [1000, 2000, 10000],
      textWithoutNumbers: ', , '
    });
  });
});