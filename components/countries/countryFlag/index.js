import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import countries from '../../../data/countries.js'

// Mapping from 3-letter ISO codes to 2-letter ISO codes
const iso3ToIso2Map = {
	'AFG': 'AF', 'ALB': 'AL', 'DZA': 'DZ', 'ASM': 'AS', 'AND': 'AD', 'AGO': 'AO',
	'AIA': 'AI', 'ATG': 'AG', 'ARG': 'AR', 'ARM': 'AM', 'ABW': 'AW', 'AUS': 'AU',
	'AUT': 'AT', 'AZE': 'AZ', 'BHS': 'BS', 'BHR': 'BH', 'BGD': 'BD', 'BRB': 'BB',
	'BLR': 'BY', 'BEL': 'BE', 'BLZ': 'BZ', 'BEN': 'BJ', 'BMU': 'BM', 'BTN': 'BT',
	'BOL': 'BO', 'BIH': 'BA', 'BWA': 'BW', 'BRA': 'BR', 'VGB': 'VG', 'BRN': 'BN',
	'BGR': 'BG', 'BFA': 'BF', 'BDI': 'BI', 'KHM': 'KH', 'CMR': 'CM', 'CAN': 'CA',
	'CPV': 'CV', 'CYM': 'KY', 'CAF': 'CF', 'TCD': 'TD', 'CHL': 'CL', 'CHN': 'CN',
	'COL': 'CO', 'COM': 'KM', 'COK': 'CK', 'CRI': 'CR', 'CIV': 'CI', 'HRV': 'HR',
	'CUB': 'CU', 'CYP': 'CY', 'CZE': 'CZ', 'COD': 'CD', 'DNK': 'DK', 'DJI': 'DJ',
	'DMA': 'DM', 'DOM': 'DO', 'ECU': 'EC', 'EGY': 'EG', 'SLV': 'SV', 'GNQ': 'GQ',
	'ERI': 'ER', 'EST': 'EE', 'SWZ': 'SZ', 'ETH': 'ET', 'FLK': 'FK', 'FRO': 'FO',
	'FJI': 'FJ', 'FIN': 'FI', 'FRA': 'FR', 'GUF': 'GF', 'PYF': 'PF', 'GAB': 'GA',
	'GMB': 'GM', 'GEO': 'GE', 'DEU': 'DE', 'GHA': 'GH', 'GIB': 'GI', 'GRC': 'GR',
	'GRL': 'GL', 'GRD': 'GD', 'GLP': 'GP', 'GUM': 'GU', 'GTM': 'GT', 'GGY': 'GG',
	'GIN': 'GN', 'GNB': 'GW', 'GUY': 'GY', 'HTI': 'HT', 'HND': 'HN', 'HKG': 'HK',
	'HUN': 'HU', 'ISL': 'IS', 'IND': 'IN', 'IDN': 'ID', 'IRN': 'IR', 'IRQ': 'IQ',
	'IRL': 'IE', 'IMN': 'IM', 'ISR': 'IL', 'ITA': 'IT', 'JAM': 'JM', 'JPN': 'JP',
	'JEY': 'JE', 'JOR': 'JO', 'KAZ': 'KZ', 'KEN': 'KE', 'KIR': 'KI', 'XKX': 'XK',
	'KWT': 'KW', 'KGZ': 'KG', 'LAO': 'LA', 'LVA': 'LV', 'LBN': 'LB', 'LSO': 'LS',
	'LBR': 'LR', 'LBY': 'LY', 'LIE': 'LI', 'LTU': 'LT', 'LUX': 'LU', 'MAC': 'MO',
	'MKD': 'MK', 'MDG': 'MG', 'MWI': 'MW', 'MYS': 'MY', 'MDV': 'MV', 'MLI': 'ML',
	'MLT': 'MT', 'MHL': 'MH', 'MRT': 'MR', 'MUS': 'MU', 'MEX': 'MX', 'FSM': 'FM',
	'MDA': 'MD', 'MCO': 'MC', 'MNG': 'MN', 'MNE': 'ME', 'MSR': 'MS', 'MAR': 'MA',
	'MOZ': 'MZ', 'MMR': 'MM', 'NAM': 'NA', 'NRU': 'NR', 'NPL': 'NP', 'NLD': 'NL',
	'NCL': 'NC', 'NZL': 'NZ', 'NIC': 'NI', 'NER': 'NE', 'NGA': 'NG', 'NIU': 'NU',
	'PRK': 'KP', 'MNP': 'MP', 'NOR': 'NO', 'OMN': 'OM', 'PAK': 'PK', 'PLW': 'PW',
	'PSE': 'PS', 'PAN': 'PA', 'PNG': 'PG', 'PRY': 'PY', 'PER': 'PE', 'PHL': 'PH',
	'PCN': 'PN', 'POL': 'PL', 'PRT': 'PT', 'PRI': 'PR', 'QAT': 'QA', 'REU': 'RE',
	'ROU': 'RO', 'RUS': 'RU', 'RWA': 'RW', 'SHN': 'SH', 'KNA': 'KN', 'LCA': 'LC',
	'MAF': 'MF', 'SPM': 'PM', 'VCT': 'VC', 'WSM': 'WS', 'SMR': 'SM', 'STP': 'ST',
	'SAU': 'SA', 'SEN': 'SN', 'SRB': 'RS', 'SYC': 'SC', 'SLE': 'SL', 'SGP': 'SG',
	'SVK': 'SK', 'SVN': 'SI', 'SLB': 'SB', 'SOM': 'SO', 'ZAF': 'ZA', 'KOR': 'KR',
	'SSD': 'SS', 'ESP': 'ES', 'LKA': 'LK', 'SDN': 'SD', 'SUR': 'SR', 'SWE': 'SE',
	'CHE': 'CH', 'SYR': 'SY', 'TWN': 'TW', 'TJK': 'TJ', 'TZA': 'TZ', 'THA': 'TH',
	'TLS': 'TL', 'TGO': 'TG', 'TKL': 'TK', 'TON': 'TO', 'TTO': 'TT', 'TUN': 'TN',
	'TUR': 'TR', 'TKM': 'TM', 'TCA': 'TC', 'TUV': 'TV', 'UGA': 'UG', 'UKR': 'UA',
	'ARE': 'AE', 'GBR': 'GB', 'USA': 'US', 'VIR': 'VI', 'URY': 'UY', 'UZB': 'UZ',
	'VUT': 'VU', 'VAT': 'VA', 'VEN': 'VE', 'VNM': 'VN', 'WLF': 'WF', 'ESH': 'EH',
	'YEM': 'YE', 'ZMB': 'ZM', 'ZWE': 'ZW'
}

const CountryFlag = ({ fontSize = 24, name, countryCode }) => {
	// Convert 3-letter code to 2-letter code if needed
	let twoLetterCode = countryCode
	
	// If it's a 3-letter code, convert it
	if (countryCode && countryCode.length === 3) {
		twoLetterCode = iso3ToIso2Map[countryCode]
	}
	
	// If no countryCode provided, try to find it by name
	if (!twoLetterCode && name) {
		const country = countries.find((country) => country.name === name)
		if (country?.countryCode) {
			// Convert 3-letter code to 2-letter code
			twoLetterCode = iso3ToIso2Map[country.countryCode] || country.countryCode
		}
	}

	return (
		<ReactCountryFlag
			svg
			countryCode={twoLetterCode || ''}
			style={{
				fontSize: fontSize,
			}}
			aria-label={name}
		/>
	)
}

export default CountryFlag
