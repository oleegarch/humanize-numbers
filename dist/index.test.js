import { describe, it, expect, test } from 'vitest';
import { setGlobalLocale, humanizeNumberXS, humanizeNumberSM, humanizeNumberMD, humanizeNumber, countUnits, fullyReadableNumber, textToNumbers, avoidExponentialNotation, dashNumbers, round, floor, ceil, beutifulRound, beutifulFloor, beutifulCeil, humanizeAbbr, humanizeAlphabet, alphabet, humanizeWithFormat } from './index.js';
describe('humanizeNumber', function () {
  it('en variants', function () {
    /*
     * standart size
     */
    expect(humanizeNumber(1000)).toBe('1 thousand');
    expect(humanizeNumber(10000)).toBe('10 thousand');
    expect(humanizeNumber(1000000)).toBe('1 million');
    expect(humanizeNumber(2100000)).toBe('2.1 million');
    expect(humanizeNumber(11111111)).toBe('11.11 million');
    expect(humanizeNumber(1234567890)).toBe('1.23 billion');
    expect(humanizeNumber(1234567890123)).toBe('1.23 trillion');
    expect(humanizeNumber(1.222e15)).toBe('1.22 quadrillion');
    expect(humanizeNumber(1.222e18 + 2)).toBe('1.22 quintillion');
    expect(humanizeNumber(1.222e21 + 2)).toBe('1.22 sextillion');
    expect(humanizeNumber(1e303)).toBe('1 centillion');

    /*
     * small size
     */
    expect(humanizeNumberSM(1000)).toBe('1K');
    expect(humanizeNumberSM(10000)).toBe('10K');
    expect(humanizeNumberSM(1000000)).toBe('1M');
    expect(humanizeNumberSM(11111111)).toBe('11.11M');
    expect(humanizeNumberSM(1234567890)).toBe('1.23B');
    expect(humanizeNumberSM(1234567890123)).toBe('1.23T');
    expect(humanizeNumberSM(1.222e15)).toBe('1.22 Qa');
    expect(humanizeNumberSM(1.222e18 + 2)).toBe('1.22 Qi');
    expect(humanizeNumberSM(1.222e21 + 2)).toBe('1.22 Sx');
    expect(humanizeNumberSM(1e303)).toBe('1 centillion');

    /*
     * extra small size
     */
    expect(humanizeNumberXS(1.222e21 + 2)).toBe('1.2 Sx');

    /*
     * other variants
     */
    expect(humanizeNumber(1)).toBe('1');
    expect(humanizeNumber(0)).toBe('0');
    expect(humanizeNumber(0.1)).toBe('0.1');
    expect(humanizeNumber(0.01)).toBe('0.01');
    expect(humanizeNumber(0.001)).toBe('0.001');
    expect(humanizeNumber(0.000001)).toBe('0.000001');
  });
  it('ru variants', function () {
    setGlobalLocale('ru');

    /*
     * standart size
     */
    expect(humanizeNumber(100)).toBe('100');
    expect(humanizeNumber(1000)).toBe('1 тысяча');
    expect(humanizeNumber(10000)).toBe('10 тысяч');
    expect(humanizeNumber(1000000)).toBe('1 миллион');
    expect(humanizeNumber(2100000)).toBe('2.1 миллиона');
    expect(humanizeNumber(11000000)).toBe('11 миллионов');
    expect(humanizeNumber(1234567890)).toBe('1.23 миллиарда');
    expect(humanizeNumber(1234567890123)).toBe('1.23 триллиона');
    expect(humanizeNumber(1.222e15)).toBe('1.22 квадриллиона');
    expect(humanizeNumber(1.222e18 + 2)).toBe('1.22 квинтиллиона');
    expect(humanizeNumber(1.222e21 + 2)).toBe('1.22 секстиллиона');
    expect(humanizeNumber(1e303)).toBe('1 центиллион');

    /*
     * small size
     */
    expect(humanizeNumberSM(1000)).toBe('1 тыс.');
    expect(humanizeNumberSM(10000)).toBe('10 тыс.');
    expect(humanizeNumberSM(1000000)).toBe('1 млн');
    expect(humanizeNumberSM(2100000)).toBe('2.1 млн');
    expect(humanizeNumberSM(11000000)).toBe('11 млн');
    expect(humanizeNumberSM(1234567890)).toBe('1.23 млрд');
    expect(humanizeNumberSM(1234567890123)).toBe('1.23 трлн');
    expect(humanizeNumberSM(1.222e15)).toBe('1.22 Qa');
    expect(humanizeNumberSM(1.222e18 + 2)).toBe('1.22 Qi');
    expect(humanizeNumberSM(1.222e21 + 2)).toBe('1.22 Sx');
    expect(humanizeNumberSM(1e303)).toBe('1 центиллион');

    /*
     * extra small size
     */
    expect(humanizeNumberXS(10000)).toBe('10К');
    expect(humanizeNumberXS(1000000)).toBe('1М');
    expect(humanizeNumberXS(2100000)).toBe('2.1М');
    expect(humanizeNumberXS(11000000)).toBe('11М');
    expect(humanizeNumberXS(1234567890)).toBe('1.2B');
    expect(humanizeNumberXS(1234567890123)).toBe('1.2Т');
    expect(humanizeNumberXS(1.222e15)).toBe('1.2 Qa');
    expect(humanizeNumberXS(1.222e18 + 2)).toBe('1.2 Qi');
    expect(humanizeNumberXS(1.222e21 + 2)).toBe('1.2 Sx');
    expect(humanizeNumberXS(1e303)).toBe('1 центиллион');
  });
  it('with options', function () {
    /* using certain unit rank: */
    expect(humanizeNumberXS(500, {
      withUnit: 1e3
    })).toBe('0.5К');
    expect(humanizeNumberXS(1e9, {
      withUnit: 1e3
    })).toBe('1ККК');
    expect(humanizeNumberXS(1e12, {
      withUnit: 1e3
    })).toBe('1КККК');
    expect(humanizeNumberXS(1e12, {
      withUnit: 1e6
    })).toBe('1ММ');

    /* using certain locale: */
    expect(humanizeNumberMD(1e9, {
      locale: 'ru'
    })).toBe('1 миллиард');
    expect(humanizeNumberMD(1e9, {
      locale: 'en'
    })).toBe('1 billion');

    /* using certain fraction count: */
    expect(humanizeNumberSM(1111111, {
      fractionCount: 4,
      locale: 'ru'
    })).toBe('1.1111 млн');

    /* add zeros in fraction part of the number */
    expect(humanizeNumberXS(1e9, {
      zeros: true
    })).toBe('1.0B');
    expect(humanizeNumberXS(1e9, {
      fractionCount: 5,
      zeros: true
    })).toBe('1.00000B');

    /* using certain size: */
    expect(humanizeNumber(1e9, 'sm', {
      locale: 'ru'
    })).toBe('1 млрд');
    expect(humanizeNumber(1e9, 'md', {
      locale: 'en'
    })).toBe('1 billion');
  });
});
describe('humanizeAbbr', function () {
  test('default format', function () {
    expect(humanizeAbbr(1e3)).toBe('1K');
    expect(humanizeAbbr(1e6)).toBe('1M');
    expect(humanizeAbbr(1e9)).toBe('1B');
    expect(humanizeAbbr(1e12)).toBe('1T');
    expect(humanizeAbbr(1e15)).toBe('1TK');
    expect(humanizeAbbr(1e18)).toBe('1TM');
    expect(humanizeAbbr(1e21)).toBe('1TB');
    expect(humanizeAbbr(1e24)).toBe('1TT');
    expect(humanizeAbbr(1e27)).toBe('1TTK');
    expect(humanizeAbbr(1e30)).toBe('1TTM');
    expect(humanizeAbbr(1e33)).toBe('1TTB');
    expect(humanizeAbbr(1e36)).toBe('1TTT');
    expect(humanizeAbbr(1e39)).toBe('1TTTK');
    expect(humanizeAbbr(1e42)).toBe('1TTTM');
    expect(humanizeAbbr(1e45)).toBe('1TTTB');
    expect(humanizeAbbr(1e48)).toBe('1TTTT');
    expect(humanizeAbbr(1e303)).toBe('1TTTTTTTTTTTTTTTTTTTTTTTTTK');
  });
  test('alphabet format', function () {
    for (var i = 0; i < alphabet.length; i++) {
      var letter = alphabet[i];
      expect(humanizeAlphabet(Math.pow(1000, i + 1))).toBe('1' + letter);
    }
  });
  test('alphabet * 2 format', function () {
    for (var i = alphabet.length; i < alphabet.length * 2; i++) {
      var letter = alphabet[i % alphabet.length];
      expect(humanizeAlphabet(Math.pow(1000, i + 1))).toBe('1z' + letter);
    }
    expect(humanizeAlphabet(1e303)).toBe('1zzzw');
  });
  test('custom format', function () {
    var rusAlphabet = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я'.split(',');
    expect(humanizeWithFormat(1e3, {
      format: rusAlphabet
    })).toBe('1а');
    expect(humanizeWithFormat(1e6, {
      format: rusAlphabet
    })).toBe('1б');
    expect(humanizeWithFormat(1e9, {
      format: rusAlphabet
    })).toBe('1в');
    expect(humanizeWithFormat(1e303, {
      format: rusAlphabet
    })).toBe('1яяяб');
  });
});
test('fullyReadableNumber', function () {
  expect(fullyReadableNumber(1e21)).toBe('1 000 000 000 000 000 000 000');
  expect(fullyReadableNumber(100123123123123)).toBe('100 123 123 123 123');
  expect(fullyReadableNumber(1000000000, ',')).toBe('1,000,000,000');
});
test('avoidExponentialNotation', function () {
  expect(avoidExponentialNotation(1e21)).toBe('1000000000000000000000');
});
test('countUnits', function () {
  expect(countUnits(1000)).toBe(3);
  expect(countUnits(10000)).toBe(4);
  expect(countUnits(11111)).toBe(4);
  expect(countUnits(1000000)).toBe(6);
});
test('dashNumbers', function () {
  expect(dashNumbers([1, 2, 3, 4, 5, 100, 200, 201, 202, 203])).toBe('1-5, 100, 200-203');
  expect(dashNumbers([1, 2, 3, 4, 5, 100, 200, 201, 202, 203], ' to ', ' and ')).toBe('1 to 5 and 100 and 200 to 203');
});
test('round', function () {
  expect(round(1.55)).toBe(2);
  expect(round(1.55, 1)).toBe(1.6);
  expect(floor(1.99)).toBe(1);
  expect(floor(1.99, 1)).toBe(1.9);
  expect(ceil(1.01)).toBe(2);
  expect(ceil(1.019, 2)).toBe(1.02);
  expect(beutifulRound(111111, 0)).toBe(100000);
  expect(beutifulRound(111111, 1)).toBe(110000);
  expect(beutifulRound(111111, 2)).toBe(111000);
  expect(beutifulFloor(111111)).toBe(110000);
  expect(beutifulFloor(111111, 2)).toBe(111000);
  expect(beutifulCeil(111111)).toBe(120000);
  expect(beutifulCeil(111111, 2)).toBe(112000);
});
describe('textToNumbers', function () {
  it('abbr', function () {
    expect(textToNumbers('1K')).toEqual({
      numbers: [1000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1M')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1B')).toEqual({
      numbers: [1000000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1T')).toEqual({
      numbers: [1000000000000],
      textWithoutNumbers: ''
    });
  });
  it('abbr ru', function () {
    expect(textToNumbers('1К')).toEqual({
      numbers: [1000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1М')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1B')).toEqual({
      numbers: [1000000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1Т')).toEqual({
      numbers: [1000000000000],
      textWithoutNumbers: ''
    });
  });
  it('full text', function () {
    expect(textToNumbers('user input: 10 тысяч')).toEqual({
      numbers: [10000],
      textWithoutNumbers: 'user input: '
    });
    expect(textToNumbers('1 миллион')).toEqual({
      numbers: [1000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.1 млн')).toEqual({
      numbers: [1100000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.11 млн')).toEqual({
      numbers: [1110000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.23 млрд')).toEqual({
      numbers: [1230000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.23 трлн')).toEqual({
      numbers: [1230000000000],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.22 квадриллиона')).toEqual({
      numbers: [1.22e15],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.22 квинтиллионов')).toEqual({
      numbers: [1.22e18],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1.22 секстиллионов')).toEqual({
      numbers: [1.22e21],
      textWithoutNumbers: ''
    });
    expect(textToNumbers('1000, 2000, 10 тысяч')).toEqual({
      numbers: [1000, 2000, 10000],
      textWithoutNumbers: ', , '
    });
  });
});