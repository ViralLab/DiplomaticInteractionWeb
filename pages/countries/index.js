import React from 'react';
import { Divider, Header, Icon, Segment } from 'semantic-ui-react';
import WorkInProgress from '@components/WorkInProgress';
import styles from './countries.module.css';

// Define countriesData here
const countriesData = [
	// Example data
	{
		name: 'Country A',
		description: 'Description for Country A',
	},
	{
		name: 'Country B',
		description: 'Description for Country B',
	},
];

const Countries = () => {
	return (
		<div className={styles.contentContainer}>
			<WorkInProgress />
		</div>
	);
};

export default Countries;
