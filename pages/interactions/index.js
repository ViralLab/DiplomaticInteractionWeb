import React from 'react';
import WorkInProgress from '@components/WorkInProgress';
import styles from './interactions.module.css';

const Interactions = () => {
	return (
		<div className={styles.contentContainer}>
			<WorkInProgress />
		</div>
	);
};

export default Interactions;
