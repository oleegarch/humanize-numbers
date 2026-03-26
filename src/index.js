import * as makePlural from 'make-plural'
import { ranks, getRankProperty } from './ranks.js'
export { ranks, getRankProperty }

/* Global settings */
let locale = 'en'
let humanizeOptions = {}
export function setGlobalLocale(newLocale) {
	locale = newLocale
}
export function setGlobalHumanizeOptions(field, value) {
	if (field != null && value != null) {
		humanizeOptions[field] = value
	}
	else {
		humanizeOptions = field
	}
}

/* Calculates a number between two numbers at a specific increment */
export function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}
/* Clamps the given value between min and max */
export function clamp(min, max, num) {
	if (arguments.length === 1) {
		num = min
		min = 0
		max = 1
	}
	return Math.max(min, Math.min(max, num))
}
/* Returns the fractional part of a number */
export function fract(num) {
	return num % 1
}

/* Counts the number of units in a number */
// 1000 = 3
// 1000000 = 6
export function countUnits(num) {
	const posInt = Math.floor(Math.abs(num))
	const numStr = String(avoidExponentialNotation(posInt))
	return Math.max(numStr.length - 1, 0)
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
export function round(num, fractionCount = 0, functionName = 'round') {
	if (num === 0) return num

	const func = Math[functionName]
	if (fractionCount === 0) return func(num)

	let unit = 10 ** Math.abs(fractionCount)

	if (fractionCount > 0) {
		return func(num * unit) / unit
	}
	else {
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
 * Rounds a number to a specified number of fractional digits in a beautiful way
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
 * Avoids exponential notation
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
export function toExponentialNotation(
	num,
	fractionCount = 0,
	{
		plusSign = false,
		padZeros = false
	} = {}
) {
	if (!Number.isFinite(num)) return num.toString()

	let exponentialNotation = num.toExponential(fractionCount)
	if (!padZeros) {
		exponentialNotation = exponentialNotation.replace(/(\.\d*?)0+e/i, '$1e')
		exponentialNotation = exponentialNotation.replace(/\.e/i, 'e')
	}

	if(plusSign === false)
		exponentialNotation = exponentialNotation.replace('+', '')

	return exponentialNotation
}

/*
 *
 * Divides a number into a readable format
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
export function humanizeNumberXS(num, options) {
	return humanizeNumber(num, 'xs', options)
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
export function humanizeNumberSM(num, options) {
	return humanizeNumber(num, 'sm', options)
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
export function humanizeNumberMD(num, options) {
	return humanizeNumber(num, 'md', options)
}
export function humanizeNumber(
	num,
	size = 'md',
	options = {}
) {
	if (Number.isNaN(Number(num))) return '0'
	if (!Number.isFinite(num)) return num.toString()

	const {
		locale: optionsLocale,
		separator: optionsSeparator,
		maxRanks = true,
		format = typeof maxRanks === 'number' ? ranks.slice(0, maxRanks) : ranks,
		exponentialFrom = size === 'md' ? false : 1e15,
		exponentialOptions = { plusSign: false, padZeros: false },
		fractionCount = size === 'xs' ? 1 : 2,
		padZeros = false,
		functionName = 'round',
		humanizeFrom = 1e3,
		repeatableAbbr = false,
		withUnit = null,
		fullyReadable = true,
		fullyReadableSeparator = ' '
	} = {
		...humanizeOptions,
		...options
	}

	const currentLocale = optionsLocale ?? locale
	const absNum = Math.abs(num)
	if (exponentialFrom !== false && absNum >= exponentialFrom) {
		return toExponentialNotation(num, fractionCount, exponentialOptions)
	}

	const getReadableFallback = () => {
		if (fullyReadable) return fullyReadableNumber(num, fullyReadableSeparator)
		return num.toString()
	}
	const getRankLabel = (rank, unitsValue) => {
		const unitNameValue = getRankProperty(rank, currentLocale, 'unitName')
		const abbreviationValue = getRankProperty(rank, currentLocale, 'abbreviation')
		const abbrValue = getRankProperty(rank, currentLocale, 'abbr')

		let unitName = unitNameValue
		if (typeof unitName === 'object' && unitName != null) {
			unitName = unitName[makePlural[currentLocale](unitsValue)]
		}

		if (size === 'xs') return abbrValue ?? unitName
		if (size === 'sm') return abbreviationValue ?? abbrValue ?? unitName
		return unitName
	}
	const findLargestRankByValue = (value, epsilonMultiplier = 1) => {
		let foundRank = null
		const valueWithEpsilon = Math.abs(value) * epsilonMultiplier
		for (const currentRank of format) {
			if (currentRank.unit <= valueWithEpsilon) {
				foundRank = currentRank
			}
			else {
				break
			}
		}
		return foundRank
	}

	let dividedUnits
	const labels = []

	if (repeatableAbbr) {
		const repeatableThreshold = 1e3
		const repeatableEpsilon = 1e-6
		const floatingPointEpsilonMultiplier = 1 + Number.EPSILON * 10
		dividedUnits = num

		if (withUnit != null) {
			const fixedRank = format.find((r) => r.unit === withUnit)
			if (fixedRank == null) return getReadableFallback()

			const fixedLabel = getRankLabel(fixedRank, dividedUnits / fixedRank.unit)
			while (Math.abs(dividedUnits) + repeatableEpsilon >= fixedRank.unit) {
				labels.push(fixedLabel)
				dividedUnits /= fixedRank.unit
			}
		}
		else {
			if (humanizeFrom === false || absNum < humanizeFrom) return getReadableFallback()

			while (Math.abs(dividedUnits) + repeatableEpsilon >= repeatableThreshold) {
				const nextRank = findLargestRankByValue(dividedUnits, floatingPointEpsilonMultiplier)
				if (nextRank == null) break

				labels.push(getRankLabel(nextRank, dividedUnits / nextRank.unit))
				dividedUnits /= nextRank.unit
			}
		}
	}
	else {
		let rank = withUnit
			? format.find((r) => r.unit === withUnit)
			: null
		if (rank == null && humanizeFrom !== false && absNum >= humanizeFrom) {
			rank = findLargestRankByValue(absNum)
		}
		if (rank == null) return getReadableFallback()

		const unitLabel = getRankLabel(rank, num / rank.unit)
		dividedUnits = num / rank.unit

		while (Math.abs(dividedUnits) >= rank.unit) {
			labels.push(unitLabel)
			dividedUnits /= rank.unit
		}
		labels.unshift(unitLabel)
	}

	if (labels.length === 0) return getReadableFallback()

	const separator = optionsSeparator ?? (labels[0].length === 1 ? '' : ' ')
	let rounded = round(dividedUnits, fractionCount, functionName)
	if(padZeros) rounded = rounded.toFixed(fractionCount)

	return rounded + separator + labels.join(separator)
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
export function humanizeAbbr(num, { maxRanks = 4, ...options } = {}) {
	return humanizeNumber(num, 'xs', {
		repeatableAbbr: true,
		maxRanks,
		...options
	})
}

/*
 *
 * Creates a custom humanize format
 * Receives an array of letters and returns an array of rank objects:
 *
 */
export function createHumanizeFormat(format) {
	return format.map((letter, index) => ({
		letter,
		unit: 1000 ** (index + 1),
		abbr: letter,
		unitName: letter,
	}))
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
export const alphabetString = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'
export const alphabetArray = alphabetString.split(',')
export const alphabet = createHumanizeFormat(alphabetArray)
export function humanizeAlphabet(num, options = {}) {
	return humanizeNumber(num, 'xs', {
		repeatableAbbr: true,
		format: alphabet,
		...options
	})
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
const numbersRegexp = /(-?(?:\d+(?:\.\d+)?(?:e[+\-]?\d+)?))((?:\s+)?[ёа-яa-z]+)?/gi
const removeNonLettersSymbols = (t) => t.replace(/[\.,:;\(\)]/g, '')
const normalizeFloatError = (num) => Number(num.toPrecision(15))

export function textToNumbers(text, options = {}) {
	const numbers = []
	const currentLocale = options.locale ?? locale

	text = text.replace(numbersRegexp, function (allMatch, match1, match2) {
		const num = parseFloat(match1)
		let rank

		if (match2 != null) {
			const unitLabel = (match2 ?? '').toLowerCase().trim()
			rank = ranks.find((rank) => isTextMeansThisRank(unitLabel, rank, currentLocale))

			if (rank) {
				const abbrCount = getUnitLabelAbbrCount(unitLabel, rank) ?? 1
				numbers.push(normalizeFloatError(num * rank.unit ** abbrCount))
			}
		}

		if (rank == null) {
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
	let abbrDefault = rank.abbr
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
	if (abbrDefault != null && abbrDefault !== abbr) {
		regexpStr += prefixStr + `^(${removeNonLettersSymbols(abbrDefault)})+$`
		prefixStr = '|'
	}

	return new RegExp(regexpStr, 'i').test(text)
}
function getUnitLabelAbbrCount(text, rank) {
	if (rank.abbr?.length === 1 && text.split('').every((char) => char === rank.abbr.toLowerCase())) {
		return text.split('').length
	}
	return null
}

/*
 *
 * Connects numbers with a dash
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
