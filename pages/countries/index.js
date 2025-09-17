import React, { useState, useMemo, useEffect } from 'react';
import WorkInProgress from '@/components/utils/workInProgress/WorkInProgress';
import styles from './countries.module.css';

const CountriesPage = () => {
  return (
      <div className={styles.contentContainer}>
        <WorkInProgress />
      </div>
  );
};

export default CountriesPage;
