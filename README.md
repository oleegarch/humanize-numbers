## 🚀 Installation

```bash
npm install humanize-numbers
```

---

## 📦 Usage Example
#### humanizeNumber - a method that converts the value of a number into a value that is as readable as possible for humans

```js
import { humanizeNumberXS, humanizeNumberSM, humanizeNumber } from 'humanize-numbers'

/*
* standart size
*/
humanizeNumber(1000) // 1 thousand
humanizeNumber(10000) // 10 thousand
humanizeNumber(1000000) // 1 million
humanizeNumber(2100000) // 2.1 million
humanizeNumber(11111111) // 11.11 million
humanizeNumber(1234567890) // 1.23 billion
humanizeNumber(1234567890123) // 1.23 trillion
humanizeNumber(1.222e15) // 1.22 quadrillion
humanizeNumber(1.222e18 + 2) // 1.22 quintillion
humanizeNumber(1.222e21 + 2) // 1.22 sextillion

/*
* small size
*/
humanizeNumberSM(1000) // 1K
humanizeNumberSM(10000) // 10K
humanizeNumberSM(1000000) // 1M
humanizeNumberSM(11111111) // 11.11M
humanizeNumberSM(1234567890) // 1.23B
humanizeNumberSM(1234567890123) // 1.23T
humanizeNumberSM(1.222e15) // 1.22 QUAD
humanizeNumberSM(1.222e18 + 2) // 1.22 QUIN
humanizeNumberSM(1.222e21 + 2) // 1.22 SEX

/*
* extra small size
*/
// xs and sm in english version difference:
humanizeNumberXS(1.222e21 + 2) // 1.2 SEX (not 1.22 SEX)
```

##### Change locale to russian:
```js
import { setGlobalLocale, humanizeNumberXS, humanizeNumberSM, humanizeNumberMD, humanizeNumber } from 'humanize-numbers'

setGlobalLocale('ru')

/*
* standart size
*/
humanizeNumber(1000) // 1 тысяча
humanizeNumber(10000) // 10 тысяч
humanizeNumber(1000000) // 1 миллион
humanizeNumber(2100000) // 2.1 миллиона
humanizeNumber(11000000) // 11 миллионов
humanizeNumber(1234567890) // 1.23 миллиарда
humanizeNumber(1234567890123) // 1.23 триллиона
humanizeNumber(1.222e15) // 1.22 квадриллиона
humanizeNumber(1.222e18 + 2) // 1.22 квинтиллиона
humanizeNumber(1.222e21 + 2) // 1.22 секстиллиона

/*
* small size
*/
humanizeNumberSM(1000) // 1 тыс.
humanizeNumberSM(10000) // 10 тыс.
humanizeNumberSM(1000000) // 1 млн
humanizeNumberSM(2100000) // 2.1 млн
humanizeNumberSM(11000000) // 11 млн
humanizeNumberSM(1234567890) // 1.23 млрд
humanizeNumberSM(1234567890123) // 1.23 трлн
humanizeNumberSM(1.222e15) // 1.22 QUAD
humanizeNumberSM(1.222e18 + 2) // 1.22 QUIN
humanizeNumberSM(1.222e21 + 2) // 1.22 SEX

/*
* extra small size
*/
humanizeNumberXS(10000) // 10K
humanizeNumberXS(1000000) // 1M
humanizeNumberXS(2100000) // 2.1M
humanizeNumberXS(11000000) // 11M
humanizeNumberXS(1234567890) // 1.2B
humanizeNumberXS(1234567890123) // 1.2T
humanizeNumberXS(1.222e15) // 1.2 QUAD
humanizeNumberXS(1.222e18 + 2) // 1.2 QUIN
humanizeNumberXS(1.222e21 + 2) // 1.2 SEX
```

##### options:
```js
/* using certain unit rank: */
humanizeNumberXS(500, { withUnit: 1e3 }) // 0.5K
humanizeNumberXS(1e9, { withUnit: 1e3 }) // 1KKK
humanizeNumberXS(1e12, { withUnit: 1e3 }) // 1KKKK
humanizeNumberXS(1e12, { withUnit: 1e6 }) // 1MM

/* using certain locale: */
humanizeNumberMD(1e9, { locale: 'ru' }) // 1 миллиард
humanizeNumberMD(1e9, { locale: 'en' }) // 1 billion

/* using certain fraction count: */
humanizeNumberSM(1111111, { fractionCount: 4, locale: 'ru' }) // 1.1111 млн

/* using certain size: */
humanizeNumber(1e9, 'sm', { locale: 'ru' }) // 1 млрд
humanizeNumber(1e9, 'md', { locale: 'en' }) // 1 billion
```

#### fullyReadableNumber - make the number readable and display it completely

```js
import { fullyReadableNumber } from 'humanize-numbers'

fullyReadableNumber(1e21) // 1 000 000 000 000 000 000 000
fullyReadableNumber(100123123123123) // 100 123 123 123 123
fullyReadableNumber(1000000000, ',') // 1,000,000,000
```

#### avoidExponentialNotation - fullyReadableNumber is based on it.

```js
import { avoidExponentialNotation } from 'humanize-numbers'

avoidExponentialNotation(1e21) // 1000000000000000000000
```

#### countUnits - count the number of digits after the first digit of the number

```js
import { countUnits } from 'humanize-numbers'

countUnits(1000) // 3
countUnits(10000) // 4
countUnits(11111) // 4
countUnits(1000000) // 6
```

#### dashNumbers - connect the numbers if they come in sequence

```js
import { dashNumbers } from 'humanize-numbers'

dashNumbers([1,2,3,4,5, 100, 200,201,202,203]) // 1-5, 100, 200-203
dashNumbers([1,2,3,4,5, 100, 200,201,202,203], ' to ', ' and ') // 1 to 5 and 100 and 200 to 203
```

#### round and beutifulRound - round up the number

```js
import { round, floor, ceil, beutifulRound, beutifulFloor, beutifulCeil } from 'humanize-numbers'

round(1.55) // 2
round(1.55, 1) // 1.6
floor(1.99) // 1
floor(1.99, 1) // 1.9
ceil(1.01) // 2
ceil(1.019, 2) // 1.02

beutifulRound(111111, 0) // 100000
beutifulRound(111111, 1) // 110000 /* by default */
beutifulRound(111111, 2) // 111000
beutifulFloor(111111) // 110000
beutifulFloor(111111, 2) // 111000
beutifulCeil(111111) // 120000
beutifulCeil(111111, 2) // 112000
```

#### textToNumbers - get numbers from text string

```js
import { textToNumbers } from 'humanize-numbers'

textToNumbers('user input: 10 тысяч') // { numbers: [10000], textWithoutNumbers: 'user input: ' }
textToNumbers('1 миллион') // { numbers: [1000000], textWithoutNumbers: '' }
textToNumbers('1.1 млн') // { numbers: [1100000], textWithoutNumbers: '' }
textToNumbers('1.11 млн') // { numbers: [1110000], textWithoutNumbers: '' }
textToNumbers('1.23 млрд') // { numbers: [1230000000], textWithoutNumbers: '' }
textToNumbers('1.23 трлн') // { numbers: [1230000000000], textWithoutNumbers: '' }
textToNumbers('1.22 квадриллиона') // { numbers: [1.22e15], textWithoutNumbers: '' }
textToNumbers('1.22 квинтиллионов') // { numbers: [1.22e18], textWithoutNumbers: '' }
textToNumbers('1.22 секстиллионов') // { numbers: [1.22e21], textWithoutNumbers: '' }
textToNumbers('1000, 2000, 10 тысяч') // { numbers: [1000, 2000, 10000], textWithoutNumbers: ', , ' }
```

#### includes some more important well-known methods: lerp, clamp, fract
```js
import { lerp, clamp, fract } from 'humanize-numbers'
```