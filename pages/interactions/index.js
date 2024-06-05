import React, { useState } from 'react'
import { Segment, Dropdown } from 'semantic-ui-react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

const countryOptions = [
	{
		key: 'al',
		value: 'albania',
		flag: 'al',
		text: 'Albania',
	},
	{
		key: 'dz',
		value: 'algeria',
		flag: 'dz',
		text: 'Algeria',
	},
	{
		key: 'as',
		value: 'americanSamoa',
		flag: 'as',
		text: 'American Samoa',
	},
	{
		key: 'ao',
		value: 'angola',
		flag: 'ao',
		text: 'Angola',
	},
	{
		key: 'ai',
		value: 'anguilla',
		flag: 'ai',
		text: 'Anguilla',
	},
	{
		key: 'ag',
		value: 'antiguaAndBarbuda',
		flag: 'ag',
		text: 'Antigua and Barbuda',
	},
	{
		key: 'ar',
		value: 'argentina',
		flag: 'ar',
		text: 'Argentina',
	},
	{
		key: 'am',
		value: 'armenia',
		flag: 'am',
		text: 'Armenia',
	},
	{
		key: 'aw',
		value: 'aruba',
		flag: 'aw',
		text: 'Aruba',
	},
	{
		key: 'au',
		value: 'australia',
		flag: 'au',
		text: 'Australia',
	},
	{
		key: 'at',
		value: 'austria',
		flag: 'at',
		text: 'Austria',
	},
	{
		key: 'az',
		value: 'azerbaijan',
		flag: 'az',
		text: 'Azerbaijan',
	},
	{
		key: 'bs',
		value: 'bahamas',
		flag: 'bs',
		text: 'Bahamas',
	},
	{
		key: 'bh',
		value: 'bahrain',
		flag: 'bh',
		text: 'Bahrain',
	},
	{
		key: 'bd',
		value: 'bangladesh',
		flag: 'bd',
		text: 'Bangladesh',
	},
	{
		key: 'bb',
		value: 'barbados',
		flag: 'bb',
		text: 'Barbados',
	},
	{
		key: 'by',
		value: 'belarus',
		flag: 'by',
		text: 'Belarus',
	},
	{
		key: 'be',
		value: 'belgium',
		flag: 'be',
		text: 'Belgium',
	},
	{
		key: 'bz',
		value: 'belize',
		flag: 'bz',
		text: 'Belize',
	},
	{
		key: 'bj',
		value: 'benin',
		flag: 'bj',
		text: 'Benin',
	},
	{
		key: 'bm',
		value: 'bermuda',
		flag: 'bm',
		text: 'Bermuda',
	},
	{
		key: 'bt',
		value: 'bhutan',
		flag: 'bt',
		text: 'Bhutan',
	},
	{
		key: 'bo',
		value: 'bolivia',
		flag: 'bo',
		text: 'Bolivia',
	},
	{
		key: 'ba',
		value: 'bosniaAndHerzegovina',
		flag: 'ba',
		text: 'Bosnia and Herzegovina',
	},
	{
		key: 'bw',
		value: 'botswana',
		flag: 'bw',
		text: 'Botswana',
	},
	{
		key: 'br',
		value: 'brazil',
		flag: 'br',
		text: 'Brazil',
	},
	{
		key: 'vg',
		value: 'britishVirginIslands',
		flag: 'vg',
		text: 'British Virgin Islands',
	},
	{
		key: 'bn',
		value: 'bruneiDarussalam',
		flag: 'bn',
		text: 'Brunei Darussalam',
	},
	{
		key: 'bg',
		value: 'bulgaria',
		flag: 'bg',
		text: 'Bulgaria',
	},
	{
		key: 'bf',
		value: 'burkinaFaso',
		flag: 'bf',
		text: 'Burkina Faso',
	},
	{
		key: 'bi',
		value: 'burundi',
		flag: 'bi',
		text: 'Burundi',
	},
	{
		key: 'kh',
		value: 'cambodia',
		flag: 'kh',
		text: 'Cambodia',
	},
	{
		key: 'cm',
		value: 'cameroon',
		flag: 'cm',
		text: 'Cameroon',
	},
	{
		key: 'ca',
		value: 'canada',
		flag: 'ca',
		text: 'Canada',
	},
	{
		key: 'cv',
		value: 'capeVerde',
		flag: 'cv',
		text: 'Cape Verde',
	},
	{
		key: 'ky',
		value: 'caymanIslands',
		flag: 'ky',
		text: 'Cayman Islands',
	},
	{
		key: 'cf',
		value: 'centralAfricanRepublic',
		flag: 'cf',
		text: 'Central African Republic',
	},
	{
		key: 'td',
		value: 'chad',
		flag: 'td',
		text: 'Chad',
	},
	{
		key: 'cl',
		value: 'chile',
		flag: 'cl',
		text: 'Chile',
	},
	{
		key: 'cn',
		value: 'china',
		flag: 'cn',
		text: 'China',
	},
	{
		key: 'co',
		value: 'colombia',
		flag: 'co',
		text: 'Colombia',
	},
	{
		key: 'km',
		value: 'comoros',
		flag: 'km',
		text: 'Comoros',
	},
	{
		key: 'cg',
		value: 'congo',
		flag: 'cg',
		text: 'Congo',
	},
	{
		key: 'cr',
		value: 'costaRica',
		flag: 'cr',
		text: 'Costa Rica',
	},
	{
		key: 'hr',
		value: 'croatia',
		flag: 'hr',
		text: 'Croatia',
	},
	{
		key: 'cu',
		value: 'cuba',
		flag: 'cu',
		text: 'Cuba',
	},
	{
		key: 'cw',
		value: 'curacao',
		flag: 'cw',
		text: 'Curaçao',
	},
	{
		key: 'cy',
		value: 'cyprus',
		flag: 'cy',
		text: 'Cyprus',
	},
	{
		key: 'cz',
		value: 'czechRepublic',
		flag: 'cz',
		text: 'Czech Republic',
	},
	{
		key: 'kp',
		value: 'demRepKorea',
		flag: 'kp',
		text: 'Dem. Rep. Korea',
	},
	{
		key: 'dk',
		value: 'denmark',
		flag: 'dk',
		text: 'Denmark',
	},
	{
		key: 'dj',
		value: 'djibouti',
		flag: 'dj',
		text: 'Djibouti',
	},
	{
		key: 'dm',
		value: 'dominica',
		flag: 'dm',
		text: 'Dominica',
	},
	{
		key: 'do',
		value: 'dominicanRepublic',
		flag: 'do',
		text: 'Dominican Republic',
	},
	{
		key: 'ec',
		value: 'ecuador',
		flag: 'ec',
		text: 'Ecuador',
	},
	{
		key: 'eg',
		value: 'egypt',
		flag: 'eg',
		text: 'Egypt',
	},
	{
		key: 'sv',
		value: 'elSalvador',
		flag: 'sv',
		text: 'El Salvador',
	},
	{
		key: 'gq',
		value: 'equatorialGuinea',
		flag: 'gq',
		text: 'Equatorial Guinea',
	},
	{
		key: 'er',
		value: 'eritrea',
		flag: 'er',
		text: 'Eritrea',
	},
	{
		key: 'ee',
		value: 'estonia',
		flag: 'ee',
		text: 'Estonia',
	},
	{
		key: 'et',
		value: 'ethiopia',
		flag: 'et',
		text: 'Ethiopia',
	},
	{
		key: 'fo',
		value: 'faeroeIslands',
		flag: 'fo',
		text: 'Faeroe Islands',
	},
	{
		key: 'fk',
		value: 'falklandIslands',
		flag: 'fk',
		text: 'Falkland Islands',
	},
	{
		key: 'fm',
		value: 'federatedStatesOfMicronesia',
		flag: 'fm',
		text: 'Federated States of Micronesia',
	},
	{
		key: 'fj',
		value: 'fiji',
		flag: 'fj',
		text: 'Fiji',
	},
	{
		key: 'fi',
		value: 'finland',
		flag: 'fi',
		text: 'Finland',
	},
	{
		key: 'fr',
		value: 'france',
		flag: 'fr',
		text: 'France',
	},
	{
		key: 'gf',
		value: 'frenchGuiana',
		flag: 'gf',
		text: 'French Guiana',
	},
	{
		key: 'pf',
		value: 'frenchPolynesia',
		flag: 'pf',
		text: 'French Polynesia',
	},
	{
		key: 'ga',
		value: 'gabon',
		flag: 'ga',
		text: 'Gabon',
	},
	{
		key: 'gm',
		value: 'gambia',
		flag: 'gm',
		text: 'Gambia',
	},
	{
		key: 'ge',
		value: 'georgia',
		flag: 'ge',
		text: 'Georgia',
	},
	{
		key: 'de',
		value: 'germany',
		flag: 'de',
		text: 'Germany',
	},
	{
		key: 'gh',
		value: 'ghana',
		flag: 'gh',
		text: 'Ghana',
	},
	{
		key: 'gr',
		value: 'greece',
		flag: 'gr',
		text: 'Greece',
	},
	{
		key: 'gl',
		value: 'greenland',
		flag: 'gl',
		text: 'Greenland',
	},
	{
		key: 'gd',
		value: 'grenada',
		flag: 'gd',
		text: 'Grenada',
	},
	{
		key: 'gp',
		value: 'guadeloupe',
		flag: 'gp',
		text: 'Guadeloupe',
	},
	{
		key: 'gu',
		value: 'guam',
		flag: 'gu',
		text: 'Guam',
	},
	{
		key: 'gt',
		value: 'guatemala',
		flag: 'gt',
		text: 'Guatemala',
	},
	{
		key: 'gn',
		value: 'guinea',
		flag: 'gn',
		text: 'Guinea',
	},
	{
		key: 'gw',
		value: 'guineaBissau',
		flag: 'gw',
		text: 'Guinea-Bissau',
	},
	{
		key: 'gy',
		value: 'guyana',
		flag: 'gy',
		text: 'Guyana',
	},
	{
		key: 'ht',
		value: 'haiti',
		flag: 'ht',
		text: 'Haiti',
	},
	{
		key: 'hn',
		value: 'honduras',
		flag: 'hn',
		text: 'Honduras',
	},
	{
		key: 'hu',
		value: 'hungary',
		flag: 'hu',
		text: 'Hungary',
	},
	{
		key: 'is',
		value: 'iceland',
		flag: 'is',
		text: 'Iceland',
	},
	{
		key: 'in',
		value: 'india',
		flag: 'in',
		text: 'India',
	},
	{
		key: 'id',
		value: 'indonesia',
		flag: 'id',
		text: 'Indonesia',
	},
	{
		key: 'ir',
		value: 'iran',
		flag: 'ir',
		text: 'Iran',
	},
	{
		key: 'iq',
		value: 'iraq',
		flag: 'iq',
		text: 'Iraq',
	},
	{
		key: 'ie',
		value: 'ireland',
		flag: 'ie',
		text: 'Ireland',
	},
	{
		key: 'il',
		value: 'israel',
		flag: 'il',
		text: 'Israel',
	},
	{
		key: 'it',
		value: 'italy',
		flag: 'it',
		text: 'Italy',
	},
	{
		key: 'jm',
		value: 'jamaica',
		flag: 'jm',
		text: 'Jamaica',
	},
	{
		key: 'jp',
		value: 'japan',
		flag: 'jp',
		text: 'Japan',
	},
	{
		key: 'jo',
		value: 'jordan',
		flag: 'jo',
		text: 'Jordan',
	},
	{
		key: 'kz',
		value: 'kazakhstan',
		flag: 'kz',
		text: 'Kazakhstan',
	},
	{
		key: 'ke',
		value: 'kenya',
		flag: 'ke',
		text: 'Kenya',
	},
	{
		key: 'kw',
		value: 'kuwait',
		flag: 'kw',
		text: 'Kuwait',
	},
	{
		key: 'kg',
		value: 'kyrgyzstan',
		flag: 'kg',
		text: 'Kyrgyzstan',
	},
	{
		key: 'la',
		value: 'laoPDR',
		flag: 'la',
		text: 'Lao PDR',
	},
	{
		key: 'lv',
		value: 'latvia',
		flag: 'lv',
		text: 'Latvia',
	},
	{
		key: 'lb',
		value: 'lebanon',
		flag: 'lb',
		text: 'Lebanon',
	},
	{
		key: 'ls',
		value: 'lesotho',
		flag: 'ls',
		text: 'Lesotho',
	},
	{
		key: 'lr',
		value: 'liberia',
		flag: 'lr',
		text: 'Liberia',
	},
	{
		key: 'ly',
		value: 'libya',
		flag: 'ly',
		text: 'Libya',
	},
	{
		key: 'lt',
		value: 'lithuania',
		flag: 'lt',
		text: 'Lithuania',
	},
	{
		key: 'lu',
		value: 'luxembourg',
		flag: 'lu',
		text: 'Luxembourg',
	},
	{
		key: 'mk',
		value: 'macedonia',
		flag: 'mk',
		text: 'Macedonia',
	},
	{
		key: 'mg',
		value: 'madagascar',
		flag: 'mg',
		text: 'Madagascar',
	},
	{
		key: 'mw',
		value: 'malawi',
		flag: 'mw',
		text: 'Malawi',
	},
	{
		key: 'my',
		value: 'malaysia',
		flag: 'my',
		text: 'Malaysia',
	},
	{
		key: 'mv',
		value: 'maldives',
		flag: 'mv',
		text: 'Maldives',
	},
	{
		key: 'ml',
		value: 'mali',
		flag: 'ml',
		text: 'Mali',
	},
	{
		key: 'mt',
		value: 'malta',
		flag: 'mt',
		text: 'Malta',
	},
	{
		key: 'mh',
		value: 'marshallIslands',
		flag: 'mh',
		text: 'Marshall Islands',
	},
	{
		key: 'mq',
		value: 'martinique',
		flag: 'mq',
		text: 'Martinique',
	},
	{
		key: 'mr',
		value: 'mauritania',
		flag: 'mr',
		text: 'Mauritania',
	},
	{
		key: 'mu',
		value: 'mauritius',
		flag: 'mu',
		text: 'Mauritius',
	},
	{
		key: 'yt',
		value: 'mayotte',
		flag: 'yt',
		text: 'Mayotte',
	},
	{
		key: 'mx',
		value: 'mexico',
		flag: 'mx',
		text: 'Mexico',
	},
	{
		key: 'md',
		value: 'moldova',
		flag: 'md',
		text: 'Moldova',
	},
	{
		key: 'mn',
		value: 'mongolia',
		flag: 'mn',
		text: 'Mongolia',
	},
	{
		key: 'me',
		value: 'montenegro',
		flag: 'me',
		text: 'Montenegro',
	},
	{
		key: 'ms',
		value: 'montserrat',
		flag: 'ms',
		text: 'Montserrat',
	},
	{
		key: 'ma',
		value: 'morocco',
		flag: 'ma',
		text: 'Morocco',
	},
	{
		key: 'mz',
		value: 'mozambique',
		flag: 'mz',
		text: 'Mozambique',
	},
	{
		key: 'mm',
		value: 'myanmar',
		flag: 'mm',
		text: 'Myanmar',
	},
	{
		key: 'na',
		value: 'namibia',
		flag: 'na',
		text: 'Namibia',
	},
	{
		key: 'nr',
		value: 'nauru',
		flag: 'nr',
		text: 'Nauru',
	},
	{
		key: 'np',
		value: 'nepal',
		flag: 'np',
		text: 'Nepal',
	},
	{
		key: 'nl',
		value: 'netherlands',
		flag: 'nl',
		text: 'Netherlands',
	},
	{
		key: 'nc',
		value: 'newCaledonia',
		flag: 'nc',
		text: 'New Caledonia',
	},
	{
		key: 'nz',
		value: 'newZealand',
		flag: 'nz',
		text: 'New Zealand',
	},
	{
		key: 'ni',
		value: 'nicaragua',
		flag: 'ni',
		text: 'Nicaragua',
	},
	{
		key: 'ne',
		value: 'niger',
		flag: 'ne',
		text: 'Niger',
	},
	{
		key: 'ng',
		value: 'nigeria',
		flag: 'ng',
		text: 'Nigeria',
	},
	{
		key: 'mp',
		value: 'northernMarianaIslands',
		flag: 'mp',
		text: 'Northern Mariana Islands',
	},
	{
		key: 'no',
		value: 'norway',
		flag: 'no',
		text: 'Norway',
	},
	{
		key: 'om',
		value: 'oman',
		flag: 'om',
		text: 'Oman',
	},
	{
		key: 'pk',
		value: 'pakistan',
		flag: 'pk',
		text: 'Pakistan',
	},
	{
		key: 'pw',
		value: 'palau',
		flag: 'pw',
		text: 'Palau',
	},
	{
		key: 'ps',
		value: 'palestine',
		flag: 'ps',
		text: 'Palestine',
	},
	{
		key: 'pa',
		value: 'panama',
		flag: 'pa',
		text: 'Panama',
	},
	{
		key: 'pg',
		value: 'papuaNewGuinea',
		flag: 'pg',
		text: 'Papua New Guinea',
	},
	{
		key: 'py',
		value: 'paraguay',
		flag: 'py',
		text: 'Paraguay',
	},
	{
		key: 'pe',
		value: 'peru',
		flag: 'pe',
		text: 'Peru',
	},
	{
		key: 'ph',
		value: 'philippines',
		flag: 'ph',
		text: 'Philippines',
	},
	{
		key: 'pl',
		value: 'poland',
		flag: 'pl',
		text: 'Poland',
	},
	{
		key: 'pt',
		value: 'portugal',
		flag: 'pt',
		text: 'Portugal',
	},
	{
		key: 'pr',
		value: 'puertoRico',
		flag: 'pr',
		text: 'Puerto Rico',
	},
	{
		key: 'qa',
		value: 'qatar',
		flag: 'qa',
		text: 'Qatar',
	},
	{
		key: 'kr',
		value: 'republicOfKorea',
		flag: 'kr',
		text: 'Republic of Korea',
	},
	{
		key: 're',
		value: 'reunion',
		flag: 're',
		text: 'Reunion',
	},
	{
		key: 'ro',
		value: 'romania',
		flag: 'ro',
		text: 'Romania',
	},
	{
		key: 'ru',
		value: 'russia',
		flag: 'ru',
		text: 'Russia',
	},
	{
		key: 'rw',
		value: 'rwanda',
		flag: 'rw',
		text: 'Rwanda',
	},
	{
		key: 'kn',
		value: 'saintKittsAndNevis',
		flag: 'kn',
		text: 'Saint Kitts and Nevis',
	},
	{
		key: 'lc',
		value: 'saintLucia',
		flag: 'lc',
		text: 'Saint Lucia',
	},
	{
		key: 'vc',
		value: 'saintVincentAndTheGrenadines',
		flag: 'vc',
		text: 'Saint Vincent and the Grenadines',
	},
	{
		key: 'bl',
		value: 'saintBarthelemy',
		flag: 'bl',
		text: 'Saint-Barthélemy',
	},
	{
		key: 'mf',
		value: 'saintMartin',
		flag: 'mf',
		text: 'Saint-Martin',
	},
	{
		key: 'ws',
		value: 'samoa',
		flag: 'ws',
		text: 'Samoa',
	},
	{
		key: 'st',
		value: 'saoTomeAndPrincipe',
		flag: 'st',
		text: 'São Tomé and Principe',
	},
	{
		key: 'sa',
		value: 'saudiArabia',
		flag: 'sa',
		text: 'Saudi Arabia',
	},
	{
		key: 'sn',
		value: 'senegal',
		flag: 'sn',
		text: 'Senegal',
	},
	{
		key: 'rs',
		value: 'serbia',
		flag: 'rs',
		text: 'Serbia',
	},
	{
		key: 'sc',
		value: 'seychelles',
		flag: 'sc',
		text: 'Seychelles',
	},
	{
		key: 'sl',
		value: 'sierraLeone',
		flag: 'sl',
		text: 'Sierra Leone',
	},
	{
		key: 'sx',
		value: 'sintMaarten',
		flag: 'sx',
		text: 'Sint Maarten',
	},
	{
		key: 'sk',
		value: 'slovakia',
		flag: 'sk',
		text: 'Slovakia',
	},
	{
		key: 'si',
		value: 'slovenia',
		flag: 'si',
		text: 'Slovenia',
	},
	{
		key: 'sb',
		value: 'solomonIslands',
		flag: 'sb',
		text: 'Solomon Islands',
	},
	{
		key: 'so',
		value: 'somalia',
		flag: 'so',
		text: 'Somalia',
	},
	{
		key: 'za',
		value: 'southAfrica',
		flag: 'za',
		text: 'South Africa',
	},
	{
		key: 'es',
		value: 'spain',
		flag: 'es',
		text: 'Spain',
	},
	{
		key: 'lk',
		value: 'sriLanka',
		flag: 'lk',
		text: 'Sri Lanka',
	},
	{
		key: 'bq',
		value: 'sabaNetherlands',
		flag: 'bq',
		text: 'St. Eustatius And Saba (Netherlands)',
	},
	{
		key: 'sd',
		value: 'sudan',
		flag: 'sd',
		text: 'Sudan',
	},
	{
		key: 'sr',
		value: 'suriname',
		flag: 'sr',
		text: 'Suriname',
	},
	{
		key: 'sz',
		value: 'swaziland',
		flag: 'sz',
		text: 'Swaziland',
	},
	{
		key: 'se',
		value: 'sweden',
		flag: 'se',
		text: 'Sweden',
	},
	{
		key: 'ch',
		value: 'switzerland',
		flag: 'ch',
		text: 'Switzerland',
	},
	{
		key: 'sy',
		value: 'syria',
		flag: 'sy',
		text: 'Syria',
	},
	{
		key: 'tw',
		value: 'taiwan',
		flag: 'tw',
		text: 'Taiwan',
	},
	{
		key: 'tj',
		value: 'tajikistan',
		flag: 'tj',
		text: 'Tajikistan',
	},
	{
		key: 'tz',
		value: 'tanzania',
		flag: 'tz',
		text: 'Tanzania',
	},
	{
		key: 'th',
		value: 'thailand',
		flag: 'th',
		text: 'Thailand',
	},
	{
		key: 'tl',
		value: 'timorLeste',
		flag: 'tl',
		text: 'Timor-Leste',
	},
	{
		key: 'tg',
		value: 'togo',
		flag: 'tg',
		text: 'Togo',
	},
	{
		key: 'to',
		value: 'tonga',
		flag: 'to',
		text: 'Tonga',
	},
	{
		key: 'tt',
		value: 'trinidadAndTobago',
		flag: 'tt',
		text: 'Trinidad and Tobago',
	},
	{
		key: 'tn',
		value: 'tunisia',
		flag: 'tn',
		text: 'Tunisia',
	},
	{
		key: 'tr',
		value: 'turkey',
		flag: 'tr',
		text: 'Turkey',
	},
	{
		key: 'tm',
		value: 'turkmenistan',
		flag: 'tm',
		text: 'Turkmenistan',
	},
	{
		key: 'tc',
		value: 'turksaAndCaicosIslands',
		flag: 'tc',
		text: 'Turks and Caicos Islands',
	},
	{
		key: 'tv',
		value: 'tuvalu',
		flag: 'tv',
		text: 'Tuvalu',
	},
	{
		key: 'ug',
		value: 'uganda',
		flag: 'ug',
		text: 'Uganda',
	},
	{
		key: 'ua',
		value: 'ukraine',
		flag: 'ua',
		text: 'Ukraine',
	},
	{
		key: 'ae',
		value: 'unitedArabEmirates',
		flag: 'ae',
		text: 'United Arab Emirates',
	},
	{
		key: 'gb',
		value: 'unitedKingdom',
		flag: 'gb',
		text: 'United Kingdom',
	},
	{
		key: 'us',
		value: 'unitedStates',
		flag: 'us',
		text: 'United States',
	},
	{
		key: 'vi',
		value: 'unitedStatesVirginIslands',
		flag: 'vi',
		text: 'United States Virgin Islands',
	},
	{
		key: 'uy',
		value: 'uruguay',
		flag: 'uy',
		text: 'Uruguay',
	},
	{
		key: 'uz',
		value: 'uzbekistan',
		flag: 'uz',
		text: 'Uzbekistan',
	},
	{
		key: 'vu',
		value: 'vanuatu',
		flag: 'vu',
		text: 'Vanuatu',
	},
	{
		key: 've',
		value: 'venezuela',
		flag: 've',
		text: 'Venezuela',
	},
	{
		key: 'vn',
		value: 'vietnam',
		flag: 'vn',
		text: 'Vietnam',
	},
	{
		key: 'eh',
		value: 'westernSahara',
		flag: 'eh',
		text: 'Western Sahara',
	},
	{
		key: 'ye',
		value: 'yemen',
		flag: 'ye',
		text: 'Yemen',
	},
	{
		key: 'zm',
		value: 'zambia',
		flag: 'zm',
		text: 'Zambia',
	},
	{
		key: 'zw',
		value: 'zimbabwe',
		flag: 'zw',
		text: 'Zimbabwe',
	},
]

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const barOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Interaction Bar Chart of Topics',
		},
	},
}

const Interactions = () => {
	// try data with Reporter Country: Puerto Rico, Reported Country: Kuwait
	function convertDataToBar(data) {
		const topicDict = {}
		data.forEach((item) => {
			const topic =
				item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase()
			if (topic in topicDict) {
				topicDict[topic] += 1
			} else {
				topicDict[topic] = 1
			}
		})
		return {
			labels: Object.keys(topicDict),
			datasets: [
				{
					label: 'Topic',
					data: Object.values(topicDict),
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				},
			],
		}
	}
	function checkFilters(reporter, reported) {
		if (reporter !== null && reported !== null) {
			if (reporter === reported) {
				alert('Reporter and Reported countries cannot be the same')
				return false
			} else if (reporter === '' && reported !== null) {
				alert('Please select a reporter country')
				return false
			} else if (reported === '' && reporter !== null) {
				alert('Please select a reported country')
				return false
			}
		}
		return true
	}
	const [countryFilters, setCountryFilters] = useState({
		reporter: null,
		reported: null,
	})
	const [barData, setBarData] = useState({
		labels: [],
		datasets: [
			{
				label: '',
				data: [],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	})

	return (
		<div>
			<Segment
				raised
				style={{
					display: 'flex',
					gap: '20px',
					width: '95%',
					margin: 'auto',
				}}
			>
				<Dropdown
					clearable
					fluid
					search
					selection
					options={countryOptions}
					value={countryFilters.reporter}
					placeholder='Reporter Country'
					onChange={async (e, data) => {
						if (checkFilters(data.value, countryFilters.reported)) {
							setCountryFilters({
								...countryFilters,
								reporter: data.value,
							})
							try {
								const response = await fetch(
									`/api/interaction?reporter=${data.value}&reported=${countryFilters.reported}`
								)
								const jsonData = await response.json()
								console.log(jsonData)
								setBarData(convertDataToBar(jsonData))
							} catch (error) {
								console.error('Error fetching data:', error)
							}
						}
					}}
				/>

				<Dropdown
					clearable
					fluid
					search
					selection
					options={countryOptions}
					value={countryFilters.reported}
					placeholder='Reported Country'
					onChange={async (e, data) => {
						if (checkFilters(countryFilters.reporter, data.value)) {
							setCountryFilters({
								...countryFilters,
								reported: data.value,
							})
							try {
								const response = await fetch(
									`/api/interaction?reporter=${countryFilters.reporter}&reported=${data.value}`
								)
								const jsonData = await response.json()
								console.log(jsonData)
								setBarData(convertDataToBar(jsonData))
							} catch (error) {
								console.error('Error fetching data:', error)
							}
						}
					}}
				/>
			</Segment>
			<Bar options={barOptions} data={barData} />
		</div>
	)
}

export default Interactions
