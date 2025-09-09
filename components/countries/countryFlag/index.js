import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import countries from '../../../data/countries.js'

const CountryFlag = ({ fontSize = 24, name, countryCode }) => (
	<ReactCountryFlag
		svg
		countryCode={
			countryCode ??
			countries.find((country) => country.name === name)?.countryCode ??
			''
		}
		style={{
			fontSize: fontSize,
		}}
		aria-label={name}
	/>
)

export default CountryFlag
