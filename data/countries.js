const countries = [
  {
    name: 'Afghanistan',
    countryCode: 'AF',
  },
  {
    name: 'Aland Islands',
    countryCode: 'AX',
  },
  {
    name: 'Albania',
    countryCode: 'AL',
  },
  {
    name: 'Algeria',
    countryCode: 'DZ',
  },
  {
    name: 'American Samoa',
    countryCode: 'AS',
  },
  {
    name: 'Andorra',
    countryCode: 'AD',
  },
  {
    name: 'Angola',
    countryCode: 'AO',
  },
  {
    name: 'Anguilla',
    countryCode: 'AI',
  },
  {
    name: 'Antigua',
    countryCode: 'AG',
  },
  {
    name: 'Argentina',
    countryCode: 'AR',
  },
  {
    name: 'Armenia',
    countryCode: 'AM',
  },
  {
    name: 'Aruba',
    countryCode: 'AW',
  },
  {
    name: 'Australia',
    countryCode: 'AU',
  },
  {
    name: 'Austria',
    countryCode: 'AT',
  },
  {
    name: 'Azerbaijan',
    countryCode: 'AZ',
  },
  {
    name: 'Bahamas',
    countryCode: 'BS',
  },
  {
    name: 'Bahrain',
    countryCode: 'BH',
  },
  {
    name: 'Bangladesh',
    countryCode: 'BD',
  },
  {
    name: 'Barbados',
    countryCode: 'BB',
  },
  {
    name: 'Belarus',
    countryCode: 'BY',
  },
  {
    name: 'Belgium',
    countryCode: 'BE',
  },
  {
    name: 'Belize',
    countryCode: 'BZ',
  },
  {
    name: 'Benin',
    countryCode: 'BJ',
  },
  {
    name: 'Bermuda',
    countryCode: 'BM',
  },
  {
    name: 'Bhutan',
    countryCode: 'BT',
  },
  {
    name: 'Bolivia',
    countryCode: 'BO',
  },
  {
    name: 'Bosnia',
    countryCode: 'BA',
  },
  {
    name: 'Botswana',
    countryCode: 'BW',
  },
  {
    name: 'Bouvet Island',
    countryCode: 'BV',
  },
  {
    name: 'Brazil',
    countryCode: 'BR',
  },
  {
    name: 'British Virgin Islands',
    countryCode: 'VG',
  },
  {
    name: 'Brunei',
    countryCode: 'BN',
  },
  {
    name: 'Bulgaria',
    countryCode: 'BG',
  },
  {
    name: 'Burkina Faso',
    countryCode: 'BF',
  },
  {
    name: 'Burma',
    countryCode: 'MM',
  },
  {
    name: 'Burundi',
    countryCode: 'BI',
  },
  {
    name: 'Caicos Islands',
    countryCode: 'TC',
  },
  {
    name: 'Cambodia',
    countryCode: 'KH',
  },
  {
    name: 'Cameroon',
    countryCode: 'CM',
  },
  {
    name: 'Canada',
    countryCode: 'CA',
  },
  {
    name: 'Cape Verde',
    countryCode: 'CV',
  },
  {
    name: 'Cayman Islands',
    countryCode: 'KY',
  },
  {
    name: 'Central African Republic',
    countryCode: 'CF',
  },
  {
    name: 'Chad',
    countryCode: 'TD',
  },
  {
    name: 'Chile',
    countryCode: 'CL',
  },
  {
    name: 'China',
    countryCode: 'CN',
  },
  {
    name: 'Christmas Island',
    countryCode: 'CX',
  },
  {
    name: 'Cocos Islands',
    countryCode: 'CC',
  },
  {
    name: 'Colombia',
    countryCode: 'CO',
  },
  {
    name: 'Comoros',
    countryCode: 'KM',
  },
  {
    name: 'Congo',
    countryCode: 'CD',
  },
  {
    name: 'Congo Brazzaville',
    countryCode: 'CG',
  },
  {
    name: 'Cook Islands',
    countryCode: 'CK',
  },
  {
    name: 'Costa Rica',
    countryCode: 'CR',
  },
  {
    name: 'Cote Divoire',
    countryCode: 'CI',
  },
  {
    name: 'Croatia',
    countryCode: 'HR',
  },
  {
    name: 'Cuba',
    countryCode: 'CU',
  },
  {
    name: 'Cyprus',
    countryCode: 'CY',
  },
  {
    name: 'Czech Republic',
    countryCode: 'CZ',
  },
  {
    name: 'Denmark',
    countryCode: 'DK',
  },
  {
    name: 'Djibouti',
    countryCode: 'DJ',
  },
  {
    name: 'Dominica',
    countryCode: 'DM',
  },
  {
    name: 'Dominican Republic',
    countryCode: 'DO',
  },
  {
    name: 'Ecuador',
    countryCode: 'EC',
  },
  {
    name: 'Egypt',
    countryCode: 'EG',
  },
  {
    name: 'El Salvador',
    countryCode: 'SV',
  },
  {
    name: 'England',
    countryCode: 'GB ENG',
  },
  {
    name: 'Equatorial Guinea',
    countryCode: 'GQ',
  },
  {
    name: 'Eritrea',
    countryCode: 'ER',
  },
  {
    name: 'Estonia',
    countryCode: 'EE',
  },
  {
    name: 'Ethiopia',
    countryCode: 'ET',
  },
  {
    name: 'Europeanunion',
    countryCode: 'EU',
  },
  {
    name: 'Falkland Islands',
    countryCode: 'FK',
  },
  {
    name: 'Faroe Islands',
    countryCode: 'FO',
  },
  {
    name: 'Fiji',
    countryCode: 'FJ',
  },
  {
    name: 'Finland',
    countryCode: 'FI',
  },
  {
    name: 'France',
    countryCode: 'FR',
  },
  {
    name: 'French Guiana',
    countryCode: 'GF',
  },
  {
    name: 'French Polynesia',
    countryCode: 'PF',
  },
  {
    name: 'French Territories',
    countryCode: 'TF',
  },
  {
    name: 'Gabon',
    countryCode: 'GA',
  },
  {
    name: 'Gambia',
    countryCode: 'GM',
  },
  {
    name: 'Georgia',
    countryCode: 'GE',
  },
  {
    name: 'Germany',
    countryCode: 'DE',
  },
  {
    name: 'Ghana',
    countryCode: 'GH',
  },
  {
    name: 'Gibraltar',
    countryCode: 'GI',
  },
  {
    name: 'Greece',
    countryCode: 'GR',
  },
  {
    name: 'Greenland',
    countryCode: 'GL',
  },
  {
    name: 'Grenada',
    countryCode: 'GD',
  },
  {
    name: 'Guadeloupe',
    countryCode: 'GP',
  },
  {
    name: 'Guam',
    countryCode: 'GU',
  },
  {
    name: 'Guatemala',
    countryCode: 'GT',
  },
  {
    name: 'Guinea',
    countryCode: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    countryCode: 'GW',
  },
  {
    name: 'Guyana',
    countryCode: 'GY',
  },
  {
    name: 'Haiti',
    countryCode: 'HT',
  },
  {
    name: 'Heard Island',
    countryCode: 'HM',
  },
  {
    name: 'Honduras',
    countryCode: 'HN',
  },
  {
    name: 'Hong Kong',
    countryCode: 'HK',
  },
  {
    name: 'Hungary',
    countryCode: 'HU',
  },
  {
    name: 'Iceland',
    countryCode: 'IS',
  },
  {
    name: 'India',
    countryCode: 'IN',
  },
  {
    name: 'Indian Ocean Territory',
    countryCode: 'IO',
  },
  {
    name: 'Indonesia',
    countryCode: 'ID',
  },
  {
    name: 'Iran',
    countryCode: 'IR',
  },
  {
    name: 'Iraq',
    countryCode: 'IQ',
  },
  {
    name: 'Ireland',
    countryCode: 'IE',
  },
  {
    name: 'Israel',
    countryCode: 'IL',
  },
  {
    name: 'Italy',
    countryCode: 'IT',
  },
  {
    name: 'Jamaica',
    countryCode: 'JM',
  },
  {
    name: 'Jan Mayen',
    countryCode: 'SJ',
  },
  {
    name: 'Japan',
    countryCode: 'JP',
  },
  {
    name: 'Jordan',
    countryCode: 'JO',
  },
  {
    name: 'Kazakhstan',
    countryCode: 'KZ',
  },
  {
    name: 'Kenya',
    countryCode: 'KE',
  },
  {
    name: 'Kiribati',
    countryCode: 'KI',
  },
  {
    name: 'Kuwait',
    countryCode: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    countryCode: 'KG',
  },
  {
    name: 'Laos',
    countryCode: 'LA',
  },
  {
    name: 'Latvia',
    countryCode: 'LV',
  },
  {
    name: 'Lebanon',
    countryCode: 'LB',
  },
  {
    name: 'Lesotho',
    countryCode: 'LS',
  },
  {
    name: 'Liberia',
    countryCode: 'LR',
  },
  {
    name: 'Libya',
    countryCode: 'LY',
  },
  {
    name: 'Liechtenstein',
    countryCode: 'LI',
  },
  {
    name: 'Lithuania',
    countryCode: 'LT',
  },
  {
    name: 'Luxembourg',
    countryCode: 'LU',
  },
  {
    name: 'Macau',
    countryCode: 'MO',
  },
  {
    name: 'Macedonia',
    countryCode: 'MK',
  },
  {
    name: 'Madagascar',
    countryCode: 'MG',
  },
  {
    name: 'Malawi',
    countryCode: 'MW',
  },
  {
    name: 'Malaysia',
    countryCode: 'MY',
  },
  {
    name: 'Maldives',
    countryCode: 'MV',
  },
  {
    name: 'Mali',
    countryCode: 'ML',
  },
  {
    name: 'Malta',
    countryCode: 'MT',
  },
  {
    name: 'Marshall Islands',
    countryCode: 'MH',
  },
  {
    name: 'Martinique',
    countryCode: 'MQ',
  },
  {
    name: 'Mauritania',
    countryCode: 'MR',
  },
  {
    name: 'Mauritius',
    countryCode: 'MU',
  },
  {
    name: 'Mayotte',
    countryCode: 'YT',
  },
  {
    name: 'Mexico',
    countryCode: 'MX',
  },
  {
    name: 'Micronesia',
    countryCode: 'FM',
  },
  {
    name: 'Moldova',
    countryCode: 'MD',
  },
  {
    name: 'Monaco',
    countryCode: 'MC',
  },
  {
    name: 'Mongolia',
    countryCode: 'MN',
  },
  {
    name: 'Montenegro',
    countryCode: 'ME',
  },
  {
    name: 'Montserrat',
    countryCode: 'MS',
  },
  {
    name: 'Morocco',
    countryCode: 'MA',
  },
  {
    name: 'Mozambique',
    countryCode: 'MZ',
  },
  {
    name: 'Namibia',
    countryCode: 'NA',
  },
  {
    name: 'Nauru',
    countryCode: 'NR',
  },
  {
    name: 'Nepal',
    countryCode: 'NP',
  },
  {
    name: 'Netherlands',
    countryCode: 'NL',
  },
  {
    name: 'Netherlandsantilles',
    countryCode: 'AN',
  },
  {
    name: 'New Caledonia',
    countryCode: 'NC',
  },
  {
    name: 'New Guinea',
    countryCode: 'PG',
  },
  {
    name: 'New Zealand',
    countryCode: 'NZ',
  },
  {
    name: 'Nicaragua',
    countryCode: 'NI',
  },
  {
    name: 'Niger',
    countryCode: 'NE',
  },
  {
    name: 'Nigeria',
    countryCode: 'NG',
  },
  {
    name: 'Niue',
    countryCode: 'NU',
  },
  {
    name: 'Norfolk Island',
    countryCode: 'NF',
  },
  {
    name: 'North Korea',
    countryCode: 'KP',
  },
  {
    name: 'Northern Mariana Islands',
    countryCode: 'MP',
  },
  {
    name: 'Norway',
    countryCode: 'NO',
  },
  {
    name: 'Oman',
    countryCode: 'OM',
  },
  {
    name: 'Pakistan',
    countryCode: 'PK',
  },
  {
    name: 'Palau',
    countryCode: 'PW',
  },
  {
    name: 'Palestine',
    countryCode: 'PS',
  },
  {
    name: 'Panama',
    countryCode: 'PA',
  },
  {
    name: 'Paraguay',
    countryCode: 'PY',
  },
  {
    name: 'Peru',
    countryCode: 'PE',
  },
  {
    name: 'Philippines',
    countryCode: 'PH',
  },
  {
    name: 'Pitcairn Islands',
    countryCode: 'PN',
  },
  {
    name: 'Poland',
    countryCode: 'PL',
  },
  {
    name: 'Portugal',
    countryCode: 'PT',
  },
  {
    name: 'Puerto Rico',
    countryCode: 'PR',
  },
  {
    name: 'Qatar',
    countryCode: 'QA',
  },
  {
    name: 'Reunion',
    countryCode: 'RE',
  },
  {
    name: 'Romania',
    countryCode: 'RO',
  },
  {
    name: 'Russia',
    countryCode: 'RU',
  },
  {
    name: 'Rwanda',
    countryCode: 'RW',
  },
  {
    name: 'Saint Helena',
    countryCode: 'SH',
  },
  {
    name: 'Saint Kitts and Nevis',
    countryCode: 'KN',
  },
  {
    name: 'Saint Lucia',
    countryCode: 'LC',
  },
  {
    name: 'Saint Pierre',
    countryCode: 'PM',
  },
  {
    name: 'Saint Vincent',
    countryCode: 'VC',
  },
  {
    name: 'Samoa',
    countryCode: 'WS',
  },
  {
    name: 'San Marino',
    countryCode: 'SM',
  },
  {
    name: 'Sandwich Islands',
    countryCode: 'GS',
  },
  {
    name: 'Sao Tome',
    countryCode: 'ST',
  },
  {
    name: 'Saudi Arabia',
    countryCode: 'SA',
  },
  {
    name: 'Scotland',
    countryCode: 'GB SCT',
  },
  {
    name: 'Senegal',
    countryCode: 'SN',
  },
  {
    name: 'Serbia',
    countryCode: 'CS',
  },
  {
    name: 'Serbia',
    countryCode: 'RS',
  },
  {
    name: 'Seychelles',
    countryCode: 'SC',
  },
  {
    name: 'Sierra Leone',
    countryCode: 'SL',
  },
  {
    name: 'Singapore',
    countryCode: 'SG',
  },
  {
    name: 'Slovakia',
    countryCode: 'SK',
  },
  {
    name: 'Slovenia',
    countryCode: 'SI',
  },
  {
    name: 'Solomon Islands',
    countryCode: 'SB',
  },
  {
    name: 'Somalia',
    countryCode: 'SO',
  },
  {
    name: 'South Africa',
    countryCode: 'ZA',
  },
  {
    name: 'South Korea',
    countryCode: 'KR',
  },
  {
    name: 'Spain',
    countryCode: 'ES',
  },
  {
    name: 'Sri Lanka',
    countryCode: 'LK',
  },
  {
    name: 'Sudan',
    countryCode: 'SD',
  },
  {
    name: 'Suriname',
    countryCode: 'SR',
  },
  {
    name: 'Swaziland',
    countryCode: 'SZ',
  },
  {
    name: 'Sweden',
    countryCode: 'SE',
  },
  {
    name: 'Switzerland',
    countryCode: 'CH',
  },
  {
    name: 'Syria',
    countryCode: 'SY',
  },
  {
    name: 'Taiwan',
    countryCode: 'TW',
  },
  {
    name: 'Tajikistan',
    countryCode: 'TJ',
  },
  {
    name: 'Tanzania',
    countryCode: 'TZ',
  },
  {
    name: 'Thailand',
    countryCode: 'TH',
  },
  {
    name: 'Timorleste',
    countryCode: 'TL',
  },
  {
    name: 'Togo',
    countryCode: 'TG',
  },
  {
    name: 'Tokelau',
    countryCode: 'TK',
  },
  {
    name: 'Tonga',
    countryCode: 'TO',
  },
  {
    name: 'Trinidad',
    countryCode: 'TT',
  },
  {
    name: 'Tunisia',
    countryCode: 'TN',
  },
  {
    name: 'Turkey',
    countryCode: 'TR',
  },
  {
    name: 'Turkmenistan',
    countryCode: 'TM',
  },
  {
    name: 'Tuvalu',
    countryCode: 'TV',
  },
  {
    name: 'U.A.E.',
    countryCode: 'AE',
  },
  {
    name: 'Uganda',
    countryCode: 'UG',
  },
  {
    name: 'Ukraine',
    countryCode: 'UA',
  },
  {
    name: 'United Kingdom',
    countryCode: 'GB',
  },
  {
    name: 'United States',
    countryCode: 'US',
  },
  {
    name: 'Uruguay',
    countryCode: 'UY',
  },
  {
    name: 'US Minor Islands',
    countryCode: 'UM',
  },
  {
    name: 'US Virgin Islands',
    countryCode: 'VI',
  },
  {
    name: 'Uzbekistan',
    countryCode: 'UZ',
  },
  {
    name: 'Vanuatu',
    countryCode: 'VU',
  },
  {
    name: 'Vatican City',
    countryCode: 'VA',
  },
  {
    name: 'Venezuela',
    countryCode: 'VE',
  },
  {
    name: 'Vietnam',
    countryCode: 'VN',
  },
  {
    name: 'Wales',
    countryCode: 'GB WLS',
  },
  {
    name: 'Wallis and Futuna',
    countryCode: 'WF',
  },
  {
    name: 'Western Sahara',
		name: 'Afghanistan',
		countryCode: 'AF',
	},
	{
		name: 'Aland Islands',
		countryCode: 'AX',
	},
	{
		name: 'Albania',
		countryCode: 'AL',
	},
	{
		name: 'Algeria',
		countryCode: 'DZ',
	},
	{
		name: 'American Samoa',
		countryCode: 'AS',
	},
	{
		name: 'Andorra',
		countryCode: 'AD',
	},
	{
		name: 'Angola',
		countryCode: 'AO',
	},
	{
		name: 'Anguilla',
		countryCode: 'AI',
	},
	{
		name: 'Antigua',
		countryCode: 'AG',
	},
	{
		name: 'Argentina',
		countryCode: 'AR',
	},
	{
		name: 'Armenia',
		countryCode: 'AM',
	},
	{
		name: 'Aruba',
		countryCode: 'AW',
	},
	{
		name: 'Australia',
		countryCode: 'AU',
	},
	{
		name: 'Austria',
		countryCode: 'AT',
	},
	{
		name: 'Azerbaijan',
		countryCode: 'AZ',
	},
	{
		name: 'Bahamas',
		countryCode: 'BS',
	},
	{
		name: 'Bahrain',
		countryCode: 'BH',
	},
	{
		name: 'Bangladesh',
		countryCode: 'BD',
	},
	{
		name: 'Barbados',
		countryCode: 'BB',
	},
	{
		name: 'Belarus',
		countryCode: 'BY',
	},
	{
		name: 'Belgium',
		countryCode: 'BE',
	},
	{
		name: 'Belize',
		countryCode: 'BZ',
	},
	{
		name: 'Benin',
		countryCode: 'BJ',
	},
	{
		name: 'Bermuda',
		countryCode: 'BM',
	},
	{
		name: 'Bhutan',
		countryCode: 'BT',
	},
	{
		name: 'Bolivia',
		countryCode: 'BO',
	},
	{
		name: 'Bosnia',
		countryCode: 'BA',
	},
	{
		name: 'Botswana',
		countryCode: 'BW',
	},
	{
		name: 'Bouvet Island',
		countryCode: 'BV',
	},
	{
		name: 'Brazil',
		countryCode: 'BR',
	},
	{
		name: 'British Virgin Islands',
		countryCode: 'VG',
	},
	{
		name: 'Brunei',
		countryCode: 'BN',
	},
	{
		name: 'Bulgaria',
		countryCode: 'BG',
	},
	{
		name: 'Burkina Faso',
		countryCode: 'BF',
	},
	{
		name: 'Burma',
		countryCode: 'MM',
	},
	{
		name: 'Burundi',
		countryCode: 'BI',
	},
	{
		name: 'Caicos Islands',
		countryCode: 'TC',
	},
	{
		name: 'Cambodia',
		countryCode: 'KH',
	},
	{
		name: 'Cameroon',
		countryCode: 'CM',
	},
	{
		name: 'Canada',
		countryCode: 'CA',
	},
	{
		name: 'Cape Verde',
		countryCode: 'CV',
	},
	{
		name: 'Cayman Islands',
		countryCode: 'KY',
	},
	{
		name: 'Central African Republic',
		countryCode: 'CF',
	},
	{
		name: 'Chad',
		countryCode: 'TD',
	},
	{
		name: 'Chile',
		countryCode: 'CL',
	},
	{
		name: 'China',
		countryCode: 'CN',
	},
	{
		name: 'Christmas Island',
		countryCode: 'CX',
	},
	{
		name: 'Cocos Islands',
		countryCode: 'CC',
	},
	{
		name: 'Colombia',
		countryCode: 'CO',
	},
	{
		name: 'Comoros',
		countryCode: 'KM',
	},
	{
		name: 'Congo',
		countryCode: 'CD',
	},
	{
		name: 'Congo Brazzaville',
		countryCode: 'CG',
	},
	{
		name: 'Cook Islands',
		countryCode: 'CK',
	},
	{
		name: 'Costa Rica',
		countryCode: 'CR',
	},
	{
		name: 'Cote Divoire',
		countryCode: 'CI',
	},
	{
		name: 'Croatia',
		countryCode: 'HR',
	},
	{
		name: 'Cuba',
		countryCode: 'CU',
	},
	{
		name: 'Cyprus',
		countryCode: 'CY',
	},
	{
		name: 'Czech Republic',
		countryCode: 'CZ',
	},
	{
		name: 'Denmark',
		countryCode: 'DK',
	},
	{
		name: 'Djibouti',
		countryCode: 'DJ',
	},
	{
		name: 'Dominica',
		countryCode: 'DM',
	},
	{
		name: 'Dominican Republic',
		countryCode: 'DO',
	},
	{
		name: 'Ecuador',
		countryCode: 'EC',
	},
	{
		name: 'Egypt',
		countryCode: 'EG',
	},
	{
		name: 'El Salvador',
		countryCode: 'SV',
	},
	{
		name: 'England',
		countryCode: 'GB ENG',
	},
	{
		name: 'Equatorial Guinea',
		countryCode: 'GQ',
	},
	{
		name: 'Eritrea',
		countryCode: 'ER',
	},
	{
		name: 'Estonia',
		countryCode: 'EE',
	},
	{
		name: 'Ethiopia',
		countryCode: 'ET',
	},
	{
		name: 'Europeanunion',
		countryCode: 'EU',
	},
	{
		name: 'Falkland Islands',
		countryCode: 'FK',
	},
	{
		name: 'Faroe Islands',
		countryCode: 'FO',
	},
	{
		name: 'Fiji',
		countryCode: 'FJ',
	},
	{
		name: 'Finland',
		countryCode: 'FI',
	},
	{
		name: 'France',
		countryCode: 'FR',
	},
	{
		name: 'French Guiana',
		countryCode: 'GF',
	},
	{
		name: 'French Polynesia',
		countryCode: 'PF',
	},
	{
		name: 'French Territories',
		countryCode: 'TF',
	},
	{
		name: 'Gabon',
		countryCode: 'GA',
	},
	{
		name: 'Gambia',
		countryCode: 'GM',
	},
	{
		name: 'Georgia',
		countryCode: 'GE',
	},
	{
		name: 'Germany',
		countryCode: 'DE',
	},
	{
		name: 'Ghana',
		countryCode: 'GH',
	},
	{
		name: 'Gibraltar',
		countryCode: 'GI',
	},
	{
		name: 'Greece',
		countryCode: 'GR',
	},
	{
		name: 'Greenland',
		countryCode: 'GL',
	},
	{
		name: 'Grenada',
		countryCode: 'GD',
	},
	{
		name: 'Guadeloupe',
		countryCode: 'GP',
	},
	{
		name: 'Guam',
		countryCode: 'GU',
	},
	{
		name: 'Guatemala',
		countryCode: 'GT',
	},
	{
		name: 'Guinea',
		countryCode: 'GN',
	},
	{
		name: 'Guinea-Bissau',
		countryCode: 'GW',
	},
	{
		name: 'Guyana',
		countryCode: 'GY',
	},
	{
		name: 'Haiti',
		countryCode: 'HT',
	},
	{
		name: 'Heard Island',
		countryCode: 'HM',
	},
	{
		name: 'Honduras',
		countryCode: 'HN',
	},
	{
		name: 'Hong Kong',
		countryCode: 'HK',
	},
	{
		name: 'Hungary',
		countryCode: 'HU',
	},
	{
		name: 'Iceland',
		countryCode: 'IS',
	},
	{
		name: 'India',
		countryCode: 'IN',
	},
	{
		name: 'Indian Ocean Territory',
		countryCode: 'IO',
	},
	{
		name: 'Indonesia',
		countryCode: 'ID',
	},
	{
		name: 'Iran',
		countryCode: 'IR',
	},
	{
		name: 'Iraq',
		countryCode: 'IQ',
	},
	{
		name: 'Ireland',
		countryCode: 'IE',
	},
	{
		name: 'Israel',
		countryCode: 'IL',
	},
	{
		name: 'Italy',
		countryCode: 'IT',
	},
	{
		name: 'Jamaica',
		countryCode: 'JM',
	},
	{
		name: 'Jan Mayen',
		countryCode: 'SJ',
	},
	{
		name: 'Japan',
		countryCode: 'JP',
	},
	{
		name: 'Jordan',
		countryCode: 'JO',
	},
	{
		name: 'Kazakhstan',
		countryCode: 'KZ',
	},
	{
		name: 'Kenya',
		countryCode: 'KE',
	},
	{
		name: 'Kiribati',
		countryCode: 'KI',
	},
	{
		name: 'Kuwait',
		countryCode: 'KW',
	},
	{
		name: 'Kyrgyzstan',
		countryCode: 'KG',
	},
	{
		name: 'Laos',
		countryCode: 'LA',
	},
	{
		name: 'Latvia',
		countryCode: 'LV',
	},
	{
		name: 'Lebanon',
		countryCode: 'LB',
	},
	{
		name: 'Lesotho',
		countryCode: 'LS',
	},
	{
		name: 'Liberia',
		countryCode: 'LR',
	},
	{
		name: 'Libya',
		countryCode: 'LY',
	},
	{
		name: 'Liechtenstein',
		countryCode: 'LI',
	},
	{
		name: 'Lithuania',
		countryCode: 'LT',
	},
	{
		name: 'Luxembourg',
		countryCode: 'LU',
	},
	{
		name: 'Macau',
		countryCode: 'MO',
	},
	{
		name: 'Macedonia',
		countryCode: 'MK',
	},
	{
		name: 'Madagascar',
		countryCode: 'MG',
	},
	{
		name: 'Malawi',
		countryCode: 'MW',
	},
	{
		name: 'Malaysia',
		countryCode: 'MY',
	},
	{
		name: 'Maldives',
		countryCode: 'MV',
	},
	{
		name: 'Mali',
		countryCode: 'ML',
	},
	{
		name: 'Malta',
		countryCode: 'MT',
	},
	{
		name: 'Marshall Islands',
		countryCode: 'MH',
	},
	{
		name: 'Martinique',
		countryCode: 'MQ',
	},
	{
		name: 'Mauritania',
		countryCode: 'MR',
	},
	{
		name: 'Mauritius',
		countryCode: 'MU',
	},
	{
		name: 'Mayotte',
		countryCode: 'YT',
	},
	{
		name: 'Mexico',
		countryCode: 'MX',
	},
	{
		name: 'Micronesia',
		countryCode: 'FM',
	},
	{
		name: 'Moldova',
		countryCode: 'MD',
	},
	{
		name: 'Monaco',
		countryCode: 'MC',
	},
	{
		name: 'Mongolia',
		countryCode: 'MN',
	},
	{
		name: 'Montenegro',
		countryCode: 'ME',
	},
	{
		name: 'Montserrat',
		countryCode: 'MS',
	},
	{
		name: 'Morocco',
		countryCode: 'MA',
	},
	{
		name: 'Mozambique',
		countryCode: 'MZ',
	},
	{
		name: 'Namibia',
		countryCode: 'NA',
	},
	{
		name: 'Nauru',
		countryCode: 'NR',
	},
	{
		name: 'Nepal',
		countryCode: 'NP',
	},
	{
		name: 'Netherlands',
		countryCode: 'NL',
	},
	{
		name: 'Netherlandsantilles',
		countryCode: 'AN',
	},
	{
		name: 'New Caledonia',
		countryCode: 'NC',
	},
	{
		name: 'New Guinea',
		countryCode: 'PG',
	},
	{
		name: 'New Zealand',
		countryCode: 'NZ',
	},
	{
		name: 'Nicaragua',
		countryCode: 'NI',
	},
	{
		name: 'Niger',
		countryCode: 'NE',
	},
	{
		name: 'Nigeria',
		countryCode: 'NG',
	},
	{
		name: 'Niue',
		countryCode: 'NU',
	},
	{
		name: 'Norfolk Island',
		countryCode: 'NF',
	},
	{
		name: 'North Korea',
		countryCode: 'KP',
	},
	{
		name: 'Northern Mariana Islands',
		countryCode: 'MP',
	},
	{
		name: 'Norway',
		countryCode: 'NO',
	},
	{
		name: 'Oman',
		countryCode: 'OM',
	},
	{
		name: 'Pakistan',
		countryCode: 'PK',
	},
	{
		name: 'Palau',
		countryCode: 'PW',
	},
	{
		name: 'Palestine',
		countryCode: 'PS',
	},
	{
		name: 'Panama',
		countryCode: 'PA',
	},
	{
		name: 'Paraguay',
		countryCode: 'PY',
	},
	{
		name: 'Peru',
		countryCode: 'PE',
	},
	{
		name: 'Philippines',
		countryCode: 'PH',
	},
	{
		name: 'Pitcairn Islands',
		countryCode: 'PN',
	},
	{
		name: 'Poland',
		countryCode: 'PL',
	},
	{
		name: 'Portugal',
		countryCode: 'PT',
	},
	{
		name: 'Puerto Rico',
		countryCode: 'PR',
	},
	{
		name: 'Qatar',
		countryCode: 'QA',
	},
	{
		name: 'Reunion',
		countryCode: 'RE',
	},
	{
		name: 'Romania',
		countryCode: 'RO',
	},
	{
		name: 'Russia',
		countryCode: 'RU',
	},
	{
		name: 'Rwanda',
		countryCode: 'RW',
	},
	{
		name: 'Saint Helena',
		countryCode: 'SH',
	},
	{
		name: 'Saint Kitts and Nevis',
		countryCode: 'KN',
	},
	{
		name: 'Saint Lucia',
		countryCode: 'LC',
	},
	{
		name: 'Saint Pierre',
		countryCode: 'PM',
	},
	{
		name: 'Saint Vincent',
		countryCode: 'VC',
	},
	{
		name: 'Samoa',
		countryCode: 'WS',
	},
	{
		name: 'San Marino',
		countryCode: 'SM',
	},
	{
		name: 'Sandwich Islands',
		countryCode: 'GS',
	},
	{
		name: 'Sao Tome',
		countryCode: 'ST',
	},
	{
		name: 'Saudi Arabia',
		countryCode: 'SA',
	},
	{
		name: 'Scotland',
		countryCode: 'GB SCT',
	},
	{
		name: 'Senegal',
		countryCode: 'SN',
	},
	{
		name: 'Serbia',
		countryCode: 'CS',
	},
	{
		name: 'Serbia',
		countryCode: 'RS',
	},
	{
		name: 'Seychelles',
		countryCode: 'SC',
	},
	{
		name: 'Sierra Leone',
		countryCode: 'SL',
	},
	{
		name: 'Singapore',
		countryCode: 'SG',
	},
	{
		name: 'Slovakia',
		countryCode: 'SK',
	},
	{
		name: 'Slovenia',
		countryCode: 'SI',
	},
	{
		name: 'Solomon Islands',
		countryCode: 'SB',
	},
	{
		name: 'Somalia',
		countryCode: 'SO',
	},
	{
		name: 'South Africa',
		countryCode: 'ZA',
	},
	{
		name: 'South Korea',
		countryCode: 'KR',
	},
	{
		name: 'Spain',
		countryCode: 'ES',
	},
	{
		name: 'Sri Lanka',
		countryCode: 'LK',
	},
	{
		name: 'Sudan',
		countryCode: 'SD',
	},
	{
		name: 'Suriname',
		countryCode: 'SR',
	},
	{
		name: 'Swaziland',
		countryCode: 'SZ',
	},
	{
		name: 'Sweden',
		countryCode: 'SE',
	},
	{
		name: 'Switzerland',
		countryCode: 'CH',
	},
	{
		name: 'Syria',
		countryCode: 'SY',
	},
	{
		name: 'Taiwan',
		countryCode: 'TW',
	},
	{
		name: 'Tajikistan',
		countryCode: 'TJ',
	},
	{
		name: 'Tanzania',
		countryCode: 'TZ',
	},
	{
		name: 'Thailand',
		countryCode: 'TH',
	},
	{
		name: 'Timorleste',
		countryCode: 'TL',
	},
	{
		name: 'Togo',
		countryCode: 'TG',
	},
	{
		name: 'Tokelau',
		countryCode: 'TK',
	},
	{
		name: 'Tonga',
		countryCode: 'TO',
	},
	{
		name: 'Trinidad',
		countryCode: 'TT',
	},
	{
		name: 'Tunisia',
		countryCode: 'TN',
	},
	{
		name: 'Turkey',
		countryCode: 'TR',
	},
	{
		name: 'Turkmenistan',
		countryCode: 'TM',
	},
	{
		name: 'Tuvalu',
		countryCode: 'TV',
	},
	{
		name: 'U.A.E.',
		countryCode: 'AE',
	},
	{
		name: 'Uganda',
		countryCode: 'UG',
	},
	{
		name: 'Ukraine',
		countryCode: 'UA',
	},
	{
		name: 'United Kingdom',
		countryCode: 'GB',
	},
	{
		name: 'United States',
		countryCode: 'US',
	},
	{
		name: 'Uruguay',
		countryCode: 'UY',
	},
	{
		name: 'US Minor Islands',
		countryCode: 'UM',
	},
	{
		name: 'US Virgin Islands',
		countryCode: 'VI',
	},
	{
		name: 'Uzbekistan',
		countryCode: 'UZ',
	},
	{
		name: 'Vanuatu',
		countryCode: 'VU',
	},
	{
		name: 'Vatican City',
		countryCode: 'VA',
	},
	{
		name: 'Venezuela',
		countryCode: 'VE',
	},
	{
		name: 'Vietnam',
		countryCode: 'VN',
	},
	{
		name: 'Wales',
		countryCode: 'GB WLS',
	},
	{
		name: 'Wallis and Futuna',
		countryCode: 'WF',
	},
	{
		name: 'Western Sahara',
		countryCode: 'EH',
	},
	{
		name: 'Yemen',
		countryCode: 'YE',
	},
	{
		name: 'Zambia',
		countryCode: 'ZM',
	},
	{
		name: 'Zimbabwe',
		countryCode: 'ZW',
	},
]

export default countries 