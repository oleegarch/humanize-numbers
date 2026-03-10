# humanize-numbers

Make large numbers human readable.

## Installation

```bash
npm install humanize-numbers
```

## Usage

```js
import { humanizeNumber } from 'humanize-numbers'

humanizeNumber(1234567890) // '1.23 billion'
```

## API Reference (aligned with `src/index.test.js`)

### Humanize numbers

```js
import {
  setGlobalLocale,
  setGlobalHumanizeOptions,
  humanizeNumber,
  humanizeNumberMD,
  humanizeNumberSM,
  humanizeNumberXS,
} from 'humanize-numbers'
```

English:

```js
humanizeNumber(1000) // '1 thousand'
humanizeNumber(1234567890) // '1.23 billion'
humanizeNumber(1e303) // '1 centillion'

humanizeNumberSM(1000) // '1K'
humanizeNumberSM(1234567890123) // '1.23T'
humanizeNumberSM(1.222e18 + 2) // '1.22e18'

humanizeNumberXS(1.222e21 + 2) // '1.2e21'
humanizeNumberXS(1.11e303) // '1.1e303'
```

Russian:

```js
setGlobalLocale('ru')

humanizeNumber(1000) // '1 тысяча'
humanizeNumber(1234567890) // '1.23 миллиарда'

humanizeNumberSM(1000) // '1 тыс.'
humanizeNumberSM(1234567890) // '1.23 млрд'

humanizeNumberXS(10000) // '10К'
humanizeNumberXS(1000000) // '1М'
humanizeNumberXS(1234567890123) // '1.2Т'
```

Options used in tests:

```js
// force unit
humanizeNumberXS(500, { withUnit: 1e3 }) // '0.5К'
humanizeNumberXS(1e12, { withUnit: 1e6 }) // '1ММ'

// locale override
humanizeNumberMD(1e9, { locale: 'ru' }) // '1 миллиард'
humanizeNumberMD(1e9, { locale: 'en' }) // '1 billion'

// fraction and zero padding
humanizeNumberSM(1111111, { fractionCount: 4, locale: 'ru' }) // '1.1111 млн'
humanizeNumberXS(1e9, { padZeros: true }) // '1.0B'
humanizeNumberXS(1e9, { fractionCount: 5, padZeros: true }) // '1.00000B'

// explicit size
humanizeNumber(1e9, 'sm', { locale: 'ru' }) // '1 млрд'
humanizeNumber(1e9, 'md', { locale: 'en' }) // '1 billion'

// exponential mode
humanizeNumber(1e9, 'sm', { exponentialFrom: 1e9 }) // '1e9'
humanizeNumber(1e9, 'md', { exponentialFrom: 1e9, exponentialOptions: { padZeros: true } }) // '1.00e9'
humanizeNumber(1e9, 'md', { exponentialFrom: 1e9, exponentialOptions: { plusSign: true, padZeros: true } }) // '1.00e+9'

// separator
humanizeNumber(1e9, 'md', { separator: '&nbsp;' }) // '1&nbsp;миллиард'

// humanize threshold
humanizeNumber(1e9, 'md', { humanizeFrom: 1e12 }) // '1 000 000 000'
humanizeNumber(1e9, 'md', { humanizeFrom: 1e12, fullyReadable: false }) // '1000000000'
humanizeNumber(1e9, 'md', { humanizeFrom: 1e12, fullyReadable: true, fullyReadableSeparator: ',' }) // '1,000,000,000'

// global options
setGlobalHumanizeOptions('locale', 'ru')
humanizeNumber(1e9, 'md') // '1 миллиард'
setGlobalHumanizeOptions('locale', 'en')

setGlobalHumanizeOptions('exponentialFrom', 1e9)
humanizeNumber(1e9, 'md') // '1e9'
setGlobalHumanizeOptions('exponentialFrom', false)

// maxRanks
humanizeNumber(1e15, 'md', { maxRanks: 4 }) // '1000 trillion'
humanizeNumber(1e18, 'sm', { maxRanks: 4 }) // '1000000T'
humanizeNumber(1.111e9, 'xs', { maxRanks: 4 }) // '1.1B'
```

### Format-based helpers

```js
import {
  humanizeAbbr,
  humanizeAlphabet,
  alphabet,
  createHumanizeFormat,
  humanizeNumberXS,
} from 'humanize-numbers'
```

```js
humanizeAbbr(1e3) // '1K'
humanizeAbbr(1e12) // '1T'
humanizeAbbr(1e15) // '1TK'
humanizeAbbr(1e303) // '1TTTTTTTTTTTTTTTTTTTTTTTTTK'

for (let i = 0; i < alphabet.length; i++) {
  const letter = alphabet[i].letter
  humanizeAlphabet(Math.pow(1000, i + 1)) // `1${letter}`
}

humanizeAlphabet(1e303) // '1zzzw'

const rusAlphabet = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я'.split(',')
const rusAlphabetFormat = createHumanizeFormat(rusAlphabet)

humanizeNumberXS(1e3, { repeatableAbbr: true, format: rusAlphabetFormat }) // '1а'
humanizeNumberXS(1e303, { repeatableAbbr: true, format: rusAlphabetFormat }) // '1яяяб'
```

### Number formatting helpers

```js
import {
  fullyReadableNumber,
  avoidExponentialNotation,
  toExponentialNotation,
  countUnits,
  dashNumbers,
  round,
  floor,
  ceil,
  beutifulRound,
  beutifulFloor,
  beutifulCeil,
} from 'humanize-numbers'

fullyReadableNumber(1e21) // '1 000 000 000 000 000 000 000'
fullyReadableNumber(1000000000, ',') // '1,000,000,000'

avoidExponentialNotation(1e21) // '1000000000000000000000'
avoidExponentialNotation(1e60) // '1000000000000000000000000000000000000000000000000000000000000'

toExponentialNotation(10) // '1e1'
toExponentialNotation(1.1e+21, 1) // '1.1e21'
toExponentialNotation(1.1e+21, 3, { padZeros: true }) // '1.100e21'
toExponentialNotation(1e+21, 1, { plusSign: true }) // '1e+21'

countUnits(1000) // 3
countUnits(1000000) // 6

dashNumbers([1, 2, 3, 4, 5, 100, 200, 201, 202, 203]) // '1-5, 100, 200-203'

round(1.55) // 2
floor(1.99, 1) // 1.9
ceil(1.019, 2) // 1.02

beutifulRound(111111, 1) // 110000
beutifulFloor(111111, 2) // 111000
beutifulCeil(111111, 2) // 112000
```

### `textToNumbers`

```js
import { setGlobalLocale, textToNumbers } from 'humanize-numbers'

setGlobalLocale('en')
textToNumbers('1K') // { numbers: [1000], textWithoutNumbers: '' }
textToNumbers('1KK') // { numbers: [1e6], textWithoutNumbers: '' }
textToNumbers('1TT') // { numbers: [1e24], textWithoutNumbers: '' }

setGlobalLocale('ru')
textToNumbers('1К') // { numbers: [1000], textWithoutNumbers: '' }
textToNumbers('1М') // { numbers: [1000000], textWithoutNumbers: '' }
textToNumbers('1Т') // { numbers: [1000000000000], textWithoutNumbers: '' }

textToNumbers('user input: 10 тысяч') // { numbers: [10000], textWithoutNumbers: 'user input: ' }
textToNumbers('666e+6') // { numbers: [666000000], textWithoutNumbers: '' }
textToNumbers('1e-21') // { numbers: [1e-21], textWithoutNumbers: '' }
textToNumbers('1000, 2000, 10 тысяч') // { numbers: [1000, 2000, 10000], textWithoutNumbers: ', , ' }
```

### Extra helpers

```js
import { lerp, clamp, fract, ranks, getRankProperty } from 'humanize-numbers'
```

## License

MIT

