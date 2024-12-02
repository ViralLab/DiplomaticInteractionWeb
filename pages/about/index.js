import React from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>Global Diplomatic Interaction Project</p>
      </header>
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Project Overview</h2>
          <p className={styles.text}>
            This research project aims to record the global diplomatic relations of over 200 sovereign 
            states using advanced computational techniques and investigate the inter-state interaction 
            networks. The project is essential in suggesting an innovative perspective to International 
            Relations and Political Science, stemming from its potential to address various political, 
            economic, and security-related questions.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Methodology</h2>
          <p className={styles.text}>
            With state-of-art computational methods in natural language processing and machine learning, 
            it is now possible to extract this valuable information from textual sources. This project 
            will involve the collection of data, network analysis, and three distinct empirical findings 
            relating to the dynamics of global diplomatic relations.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Expected Outcomes</h2>
          <p className={styles.text}>
            The project will demonstrate how computational methods can be applied to the discipline and 
            illuminate how central concepts such as "power", "Distribution of Power", "balance of power", 
            and "multipolarity" can be interpreted with the new data. The diplomatic dataset, which is a 
            project outcome, will allow scholars in the field to ask their own unique questions.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Support</h2>
          <p className={styles.text}>
            This project is supported by TÜBİTAK 3501 Career Development Program for the Principal 
            Investigator Nihat Muğurtay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
