import * as makePlural from 'make-plural'
import { ranks, getRankProperty } from './ranks.js'

let locale = 'en'
export function setGlobalLocale(newLocale) {
	locale = newLocale
}

/* lerp */
export function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}
/* clamp */
export function clamp(min, max, num) {
	if (arguments.length === 1) {
		num = min
		min = 0
		max = 1
	}
	return Math.max(min, Math.min(max, num))
}
/* return fraction part of number */
export function fract(num) {
	return num % 1
}

/* units counter */
// 1000 = 3
// 1000000 = 6
export function countUnits(num) {
	return Math.max(String(Math.floor(Math.abs(num))).length - 1, 0)
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
export function round(num, fractionCount = 0, functionName = 'round') {
	if (num === 0) {
		return num
	}

	const func = Math[functionName]

	if (fractionCount === 0) {
		return func(num)
	}

	let unit = 10 ** Math.abs(fractionCount)

	if (fractionCount > 0) {
		return func(num * unit) / unit
	} else {
		if (Math.abs(num) < unit) {
			unit = 10 ** countUnits(num)
		}
		return func(num / unit) * unit
	}
}
export function floor(num, fractionCount) {
	return round(num, fractionCount, 'floor')
}
export function ceil(num, fractionCount) {
	return round(num, fractionCount, 'ceil')
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
export function beutifulRound(num, reverseFractionCount = 1, functionName = 'round') {
	const count = countUnits(num)
	const fractionCount = -(count - reverseFractionCount)
	return round(num, fractionCount, functionName)
}
export function beutifulFloor(num, reverseFractionCount = 1) {
	return beutifulRound(num, reverseFractionCount, 'floor')
}
export function beutifulCeil(num, reverseFractionCount = 1) {
	return beutifulRound(num, reverseFractionCount, 'ceil')
}

/*
 *
 * avoid exponential notation
 * 1e21 = 1000000000000000000000
 * thank https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
 *
 */
export function avoidExponentialNotation(x) {
	let sign = ''

	if (Math.sign(x) === -1) {
		sign = '-'
	}

	x = Math.abs(x)

	const split = x.toString().split('e')
	let e = parseInt(split[1])

	if (e < 0) {
		e = Math.abs(e)
		x *= Math.pow(10, e - 1)
		x = '0.' + new Array(e).join('0') + x.toString().substring(2)
	} else if (e > 0) {
		e -= 20
		x /= Math.pow(10, e)
		x += new Array(e).join('0') + '0'
	}

	return sign + x
}

/*
 *
 * division numbers
 *
 * 1000000 = 1 000 000
 * 1e15    = 1 000 000 000 000 000
 *
 */
export function fullyReadableNumber(num, separator = ' ') {
	if (typeof num === 'number') num = avoidExponentialNotation(num)

	const [firstStr = '', secondStr] = String(num).split('.')
	return (
		firstStr.replace(/(.)(?=(\d{3})+$)/g, '$1' + separator) + (secondStr ? '.' + secondStr : '')
	)
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
export function humanizeNumberXS(num, options) {
	return humanizeNumber(num, 'xs', options)
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
export function humanizeNumberSM(num, options) {
	return humanizeNumber(num, 'sm', options)
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
export function humanizeNumberMD(num, options) {
	return humanizeNumber(num, 'md', options)
}
export function humanizeNumber(num, size = 'md', options = {}) {
	if (Number.isNaN(Number(num))) {
		return '0'
	}
	if (!Number.isFinite(num)) {
		return num.toString()
	}

	const currentLocale = options.locale ?? locale
	const absNum = Math.abs(num)

	let rank = options.withUnit ? ranks.find((r) => r.unit === options.withUnit) : null
	let fractionCount = options.fractionCount ?? (size === 'xs' ? 1 : 2)

	if (!rank) {
		for (const currentRank of ranks) {
			if (currentRank.unit <= absNum) {
				rank = currentRank
			} else {
				break
			}
		}
	}

	if (!rank) {
		return String(round(num, fractionCount, options.functionName))
	}

	let readable = ''

	const units = num / rank.unit
	const unitNameValue = getRankProperty(rank, currentLocale, 'unitName')
	const abbreviationValue = getRankProperty(rank, currentLocale, 'abbreviation')
	const abbrValue = getRankProperty(rank, currentLocale, 'abbr')

	let unitName = unitNameValue
	if (typeof unitName === 'object' && unitName != null) {
		unitName = unitName[makePlural[currentLocale](units)]
	}

	let unitLabel = unitName

	if (size === 'xs') {
		unitLabel = abbrValue ?? unitName
	}
	if (size === 'sm') {
		unitLabel = abbreviationValue ?? abbrValue ?? unitName
	}

	let dividedUnits = units
	let dividedUnitLabel = unitLabel
	let separator = options.separator ?? (dividedUnitLabel.length === 1 ? '' : ' ')

	while (dividedUnits >= rank.unit) {
		dividedUnitLabel += separator + unitLabel
		dividedUnits /= rank.unit
	}

	readable += fullyReadableNumber(round(dividedUnits, fractionCount, options.functionName))
	readable += separator + dividedUnitLabel

	return readable
}

/*
 *
 * humanize with custom format
 *
 */
export function humanizeWithFormat(
	num,
	{
		format = ['K', 'M', 'B', 'T'],
		divider = 1e3,
		fractionCount = 0,
		separator = '',
		formatSeparator = '',
		roundFunctionName = 'floor',
	} = {}
) {
	if (Number.isNaN(Number(num))) return '0'

	let readable = ''
	let dividedNum = num

	for (let index = format.length - 1; index >= 0; index--) {
		const formatLabel = format[index]
		const divideTo = divider ** (index + 1)
		let divided = round(dividedNum / divideTo)
		while (divided >= 1) {
			readable += formatSeparator + formatLabel
			dividedNum = round(dividedNum / divideTo)
			divided = round(dividedNum / divideTo)
		}
	}

	readable = round(dividedNum, fractionCount, roundFunctionName) + separator + readable

	return readable
}
export function humanizeAbbr(num) {
	return humanizeWithFormat(num)
}

export const alphabetString = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'
export const alphabet = alphabetString.split(',')
export function humanizeAlphabet(num, upper = false) {
	let options = {}
	let replaceAlphabet
	if (upper) {
		replaceAlphabet = alphabetString.toUpperCase().split(',')
	}

	options.format = replaceAlphabet ?? alphabet

	return humanizeWithFormat(num, options)
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
const numbersRegexp = /(-?(?:\d+\.\d+|\d+))((?:\s+)?[а-яa-z]+)?/gi
const removeNonLettersSymbols = (t) => t.replace(/[\.,:;\(\)]/g, '')

export function textToNumbers(text, options = {}) {
	const numbers = []
	const currentLocale = options.locale ?? locale

	text = text.replace(numbersRegexp, function (allMatch, match1, match2) {
		const unitLabel = (match2 ?? '').toLowerCase().trim()
		const num = parseFloat(match1)
		const rank = ranks.find((rank) => isTextMeansThisRank(unitLabel, rank, currentLocale))

		if (rank) {
			const abbrCount = getUnitLabelAbbrCount(unitLabel, rank) ?? 1
			numbers.push(num * rank.unit ** abbrCount)
		} else {
			numbers.push(num)
		}

		return ''
	})

	return {
		numbers: numbers,
		textWithoutNumbers: text,
	}
}
export function isTextMeansThisRank(text, rank, locale) {
	let unitName = getRankProperty(rank, locale, 'unitName')
	let abbr = getRankProperty(rank, locale, 'abbr')
	let abbreviation = getRankProperty(rank, locale, 'abbreviation')

	let regexpStr = ''
	let prefixStr = ''
	if (unitName != null) {
		if (typeof unitName === 'object' && unitName != null) {
			for (const howMuch in unitName) {
				regexpStr += prefixStr + `^${removeNonLettersSymbols(unitName[howMuch])}$`
				prefixStr = '|'
			}
		} else {
			regexpStr += prefixStr + `^${removeNonLettersSymbols(unitName)}$`
			prefixStr = '|'
		}
	}
	if (abbreviation != null) {
		regexpStr += prefixStr + `^${removeNonLettersSymbols(abbreviation)}$`
		prefixStr = '|'
	}
	if (abbr != null) {
		regexpStr += prefixStr + `^(${removeNonLettersSymbols(abbr)})+$`
		prefixStr = '|'
	}

	return new RegExp(regexpStr, 'i').test(text)
}
function getUnitLabelAbbrCount(text, rank) {
	if (rank.abbr.length === 1 && text.split('').every((char) => char === rank.abbr)) {
		return text.split('').length
	}
	return null
}

/*
 *
 * connect numbers with a dash
 *
 * dashNumbers([1, 2, 3, 4, 5, 8, 31, 23]) === '1-5, 8, 23, 31'
 *
 */
export function dashNumbers(
	numbers,
	dash = '-',
	separator = ', ',
	sortFunc = (a, b) => a.number - b.number
) {
	numbers = numbers.slice(0).sort()

	const dashed = []
	for (const number of numbers) {
		if (dashed.length === 0) {
			dashed.push({ number })
			continue
		}
		const connect = dashed.find((obj) =>
			obj.lastNumber ? obj.lastNumber == number - 1 : obj.number == number - 1
		)
		if (connect != null) {
			connect.lastNumber = number
		} else {
			dashed.push({ number })
		}
	}

	return dashed
		.sort(sortFunc)
		.map((obj) => `${obj.number}${obj.lastNumber ? dash + obj.lastNumber : ''}`)
		.join(separator)
}
