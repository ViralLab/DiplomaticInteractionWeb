import React, { useState, useMemo, useEffect } from 'react';
import CountryFlag from '@/components/countries/countryFlag';
import { useCountries } from '@/utils/dataService';
import countriesData from '@/data/countries.js';
import styles from './countries.module.css';

const CountriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { countries: mentionsCountries, loading } = useCountries();

  // Set default selected country when countries data is loaded
  useEffect(() => {
    if (!selectedCountry && mentionsCountries.length > 0) {
      const defaultCountry = mentionsCountries[0]; // Turkey
      const fullCountryData = countriesData.find(c => c.countryCode === defaultCountry.code);
      setSelectedCountry({
        ...defaultCountry,
        ...fullCountryData
      });
    }
  }, [selectedCountry, mentionsCountries]);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    const countriesInMentions = mentionsCountries.map(mentionCountry => {
      const fullCountryData = countriesData.find(c => c.countryCode === mentionCountry.code);
      return {
        ...mentionCountry,
        ...fullCountryData
      };
    });

    if (!searchTerm) return countriesInMentions;
    
    return countriesInMentions.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, mentionsCountries]);

  // Get country interactions data
  const getCountryData = (countryId) => {
    const countryIndex = mentionsData.index.byCountry[countryId.toString()];
    if (!countryIndex) return null;

    const asReporterInteractions = countryIndex.asReporter.map(id => 
      mentionsData.interactions.find(interaction => interaction.id === id)
    );
    const asReportedInteractions = countryIndex.asReported.map(id => 
      mentionsData.interactions.find(interaction => interaction.id === id)
    );

    return {
      asReporter: asReporterInteractions,
      asReported: asReportedInteractions,
      totalInteractions: asReporterInteractions.length + asReportedInteractions.length
    };
  };

  const selectedCountryData = selectedCountry ? getCountryData(selectedCountry.id) : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Explore the diplomatic interactions for <span className={styles.highlight}>160 countries</span>
        </h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.flagsContainer}>
          <h2 className={styles.sectionTitle}>Select a Country</h2>
          <div className={styles.flagsGrid}>
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className={`${styles.flagItem} ${selectedCountry?.id === country.id ? styles.selected : ''}`}
                onClick={() => setSelectedCountry(country)}
              >
                <CountryFlag 
                  countryCode={country.code} 
                  fontSize={32}
                  name={country.name}
                />
                <span className={styles.countryName}>{country.name}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedCountry && selectedCountryData && (
          <div className={styles.countryData}>
            <div className={styles.countryHeader}>
              <CountryFlag 
                countryCode={selectedCountry.code} 
                fontSize={48}
                name={selectedCountry.name}
              />
              <h2 className={styles.countryTitle}>{selectedCountry.name}</h2>
              <p className={styles.totalInteractions}>
                Total Interactions: {selectedCountryData.totalInteractions}
              </p>
            </div>

            <div className={styles.interactionsContainer}>
              <div className={styles.interactionSection}>
                <h3 className={styles.interactionTitle}>
                  As Reporter ({selectedCountryData.asReporter.length})
                </h3>
                <div className={styles.interactionsList}>
                  {selectedCountryData.asReporter.map((interaction) => {
                    const reportedCountry = mentionsData.countries.find(c => c.id === interaction.reported);
                    return (
                      <div key={interaction.id} className={styles.interactionItem}>
                        <div className={styles.interactionType}>
                          {interaction.type.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={styles.interactionDetails}>
                          <span className={styles.interactionDate}>{interaction.date}</span>
                          <span className={styles.interactionTarget}>
                            → {reportedCountry?.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.interactionSection}>
                <h3 className={styles.interactionTitle}>
                  As Reported ({selectedCountryData.asReported.length})
                </h3>
                <div className={styles.interactionsList}>
                  {selectedCountryData.asReported.map((interaction) => {
                    const reportingCountry = mentionsData.countries.find(c => c.id === interaction.reporting);
                    return (
                      <div key={interaction.id} className={styles.interactionItem}>
                        <div className={styles.interactionType}>
                          {interaction.type.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={styles.interactionDetails}>
                          <span className={styles.interactionDate}>{interaction.date}</span>
                          <span className={styles.interactionTarget}>
                            ← {reportingCountry?.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesPage;
