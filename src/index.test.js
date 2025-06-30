import { describe, it, expect, test } from 'vitest'
import { setGlobalLocale, humanizeNumberXS, humanizeNumberSM, humanizeNumberMD, humanizeNumber, countUnits, fullyReadableNumber, textToNumbers, avoidExponentialNotation, dashNumbers, round, floor, ceil, beutifulRound, beutifulFloor, beutifulCeil } from './index.js'

describe('humanizeNumber', () => {
    it('en variants', () => {
        /*
        * standart size
        */
        expect(humanizeNumber(1000)).toBe('1 thousand')
        expect(humanizeNumber(10000)).toBe('10 thousand')
        expect(humanizeNumber(1000000)).toBe('1 million')
        expect(humanizeNumber(2100000)).toBe('2.1 million')
        expect(humanizeNumber(11111111)).toBe('11.11 million')
        expect(humanizeNumber(1234567890)).toBe('1.23 billion')
        expect(humanizeNumber(1234567890123)).toBe('1.23 trillion')
        expect(humanizeNumber(1.222e15)).toBe('1.22 quadrillion')
        expect(humanizeNumber(1.222e18 + 2)).toBe('1.22 quintillion')
        expect(humanizeNumber(1.222e21 + 2)).toBe('1.22 sextillion')

        /*
        * small size
        */
        expect(humanizeNumberSM(1000)).toBe('1K')
        expect(humanizeNumberSM(10000)).toBe('10K')
        expect(humanizeNumberSM(1000000)).toBe('1M')
        expect(humanizeNumberSM(11111111)).toBe('11.11M')
        expect(humanizeNumberSM(1234567890)).toBe('1.23B')
        expect(humanizeNumberSM(1234567890123)).toBe('1.23T')
        expect(humanizeNumberSM(1.222e15)).toBe('1.22 QUAD')
        expect(humanizeNumberSM(1.222e18 + 2)).toBe('1.22 QUIN')
        expect(humanizeNumberSM(1.222e21 + 2)).toBe('1.22 SEX')

        /*
        * extra small size
        */
        expect(humanizeNumberXS(1.222e21 + 2)).toBe('1.2 SEX')
    })

    it('ru variants', () => {
        
        setGlobalLocale('ru')

        /*
        * standart size
        */
        expect(humanizeNumber(1000)).toBe('1 тысяча')
        expect(humanizeNumber(10000)).toBe('10 тысяч')
        expect(humanizeNumber(1000000)).toBe('1 миллион')
        expect(humanizeNumber(2100000)).toBe('2.1 миллиона')
        expect(humanizeNumber(11000000)).toBe('11 миллионов')
        expect(humanizeNumber(1234567890)).toBe('1.23 миллиарда')
        expect(humanizeNumber(1234567890123)).toBe('1.23 триллиона')
        expect(humanizeNumber(1.222e15)).toBe('1.22 квадриллиона')
        expect(humanizeNumber(1.222e18 + 2)).toBe('1.22 квинтиллиона')
        expect(humanizeNumber(1.222e21 + 2)).toBe('1.22 секстиллиона')

        /*
        * small size
        */
        expect(humanizeNumberSM(1000)).toBe('1 тыс.')
        expect(humanizeNumberSM(10000)).toBe('10 тыс.')
        expect(humanizeNumberSM(1000000)).toBe('1 млн')
        expect(humanizeNumberSM(2100000)).toBe('2.1 млн')
        expect(humanizeNumberSM(11000000)).toBe('11 млн')
        expect(humanizeNumberSM(1234567890)).toBe('1.23 млрд')
        expect(humanizeNumberSM(1234567890123)).toBe('1.23 трлн')
        expect(humanizeNumberSM(1.222e15)).toBe('1.22 QUAD')
        expect(humanizeNumberSM(1.222e18 + 2)).toBe('1.22 QUIN')
        expect(humanizeNumberSM(1.222e21 + 2)).toBe('1.22 SEX')

        /*
        * extra small size
        */
        expect(humanizeNumberXS(10000)).toBe('10K')
        expect(humanizeNumberXS(1000000)).toBe('1M')
        expect(humanizeNumberXS(2100000)).toBe('2.1M')
        expect(humanizeNumberXS(11000000)).toBe('11M')
        expect(humanizeNumberXS(1234567890)).toBe('1.2B')
        expect(humanizeNumberXS(1234567890123)).toBe('1.2T')
        expect(humanizeNumberXS(1.222e15)).toBe('1.2 QUAD')
        expect(humanizeNumberXS(1.222e18 + 2)).toBe('1.2 QUIN')
        expect(humanizeNumberXS(1.222e21 + 2)).toBe('1.2 SEX')
    })

    it('with options', () => {
        /* using certain unit rank: */
        expect(humanizeNumberXS(500, { withUnit: 1e3 })).toBe('0.5K')
        expect(humanizeNumberXS(1e9, { withUnit: 1e3 })).toBe('1KKK')
        expect(humanizeNumberXS(1e12, { withUnit: 1e3 })).toBe('1KKKK')
        expect(humanizeNumberXS(1e12, { withUnit: 1e6 })).toBe('1MM')

        /* using certain locale: */
        expect(humanizeNumberMD(1e9, { locale: 'ru' })).toBe('1 миллиард')
        expect(humanizeNumberMD(1e9, { locale: 'en' })).toBe('1 billion')

        /* using certain fraction count: */
        expect(humanizeNumberSM(1111111, { fractionCount: 4, locale: 'ru' })).toBe('1.1111 млн')

        /* using certain size: */
        expect(humanizeNumber(1e9, 'sm', { locale: 'ru' })).toBe('1 млрд')
        expect(humanizeNumber(1e9, 'md', { locale: 'en' })).toBe('1 billion')
    })
})

test('fullyReadableNumber', () => {
    expect(fullyReadableNumber(1e21)).toBe('1 000 000 000 000 000 000 000')
    expect(fullyReadableNumber(100123123123123)).toBe('100 123 123 123 123')
    expect(fullyReadableNumber(1000000000, ',')).toBe('1,000,000,000')
})

test('avoidExponentialNotation', () => {
    expect(avoidExponentialNotation(1e21)).toBe('1000000000000000000000')
})
test('countUnits', () => {
    expect(countUnits(1000)).toBe(3)
    expect(countUnits(10000)).toBe(4)
    expect(countUnits(11111)).toBe(4)
    expect(countUnits(1000000)).toBe(6)
})
test('dashNumbers', () => {
    expect(dashNumbers([1,2,3,4,5, 100, 200,201,202,203])).toBe('1-5, 100, 200-203')
    expect(dashNumbers([1,2,3,4,5, 100, 200,201,202,203], ' to ', ' and ')).toBe('1 to 5 and 100 and 200 to 203')
})
test('round', () => {
    expect(round(1.55)).toBe(2)
    expect(round(1.55, 1)).toBe(1.6)
    expect(floor(1.99)).toBe(1)
    expect(floor(1.99, 1)).toBe(1.9)
    expect(ceil(1.01)).toBe(2)
    expect(ceil(1.019, 2)).toBe(1.02)

    expect(beutifulRound(111111, 0)).toBe(100000)
    expect(beutifulRound(111111, 1)).toBe(110000)
    expect(beutifulRound(111111, 2)).toBe(111000)
    expect(beutifulFloor(111111)).toBe(110000)
    expect(beutifulFloor(111111, 2)).toBe(111000)
    expect(beutifulCeil(111111)).toBe(120000)
    expect(beutifulCeil(111111, 2)).toBe(112000)
})
test('textToNumbers', () => {
    expect(textToNumbers('user input: 10 тысяч')).toEqual({ numbers: [10000], textWithoutNumbers: 'user input: ' })
    expect(textToNumbers('1 миллион')).toEqual({ numbers: [1000000], textWithoutNumbers: '' })
    expect(textToNumbers('1.1 млн')).toEqual({ numbers: [1100000], textWithoutNumbers: '' })
    expect(textToNumbers('1.11 млн')).toEqual({ numbers: [1110000], textWithoutNumbers: '' })
    expect(textToNumbers('1.23 млрд')).toEqual({ numbers: [1230000000], textWithoutNumbers: '' })
    expect(textToNumbers('1.23 трлн')).toEqual({ numbers: [1230000000000], textWithoutNumbers: '' })
    expect(textToNumbers('1.22 квадриллиона')).toEqual({ numbers: [1.22e15], textWithoutNumbers: '' })
    expect(textToNumbers('1.22 квинтиллионов')).toEqual({ numbers: [1.22e18], textWithoutNumbers: '' })
    expect(textToNumbers('1.22 секстиллионов')).toEqual({ numbers: [1.22e21], textWithoutNumbers: '' })
    expect(textToNumbers('1000, 2000, 10 тысяч')).toEqual({ numbers: [1000, 2000, 10000], textWithoutNumbers: ', , ' })
})