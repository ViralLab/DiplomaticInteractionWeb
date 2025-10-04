import React, { useState, useMemo, useEffect } from 'react';
import { Input, Card, Grid, Header, Icon, Loader, Dimmer } from 'semantic-ui-react';
import CountryFlag from '@/components/countries/countryFlag';
import countriesData from '@/data/countries';
import styles from './countries.module.css';

const CountriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  // Fetch countries data and interaction counts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get overview data which includes countries and interaction counts
        const response = await fetch('/api/mentions?overview=true');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Set countries from Firebase data
        if (data.countries) {
          setCountries(data.countries);
        }
      } catch (error) {
        console.error('Error fetching countries data:', error);
        // Fallback to static countries data
        setCountries(countriesData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) {
      return countries;
    }

    const searchLower = searchTerm.toLowerCase();
    return countries.filter(country => {
      const countryName = country.name || country.countryName || '';
      const countryCode = country.countryCode || country.code || '';
      
      return (
        countryName.toLowerCase().includes(searchLower) ||
        countryCode.toLowerCase().includes(searchLower)
      );
    });
  }, [countries, searchTerm]);

  // Get interaction count for a country
  const getInteractionCount = (countryId) => {
    return interactionCounts[countryId] || 0;
  };

  // Handle country click - navigate to country detail page
  const handleCountryClick = (country) => {
    const countryCode = country.countryCode || country.code;
    if (countryCode) {
      window.location.href = `/interactions-mentions/${countryCode}`;
    }
  };

  return (
    <div className={styles.contentContainer}>
      <Dimmer active={loading} inverted>
        <Loader size='large'>Loading countries...</Loader>
      </Dimmer>

      <div className={styles.headerSection}>
        <Header as='h1' className={styles.pageTitle}>
          <Icon name='exchange' />
          Interactions and Mentions
        </Header>
        <p className={styles.pageDescription}>
          Explore diplomatic interactions and mentions by selecting countries
        </p>
      </div>

      <div className={styles.searchSection}>
        <Input
          icon='search'
          iconPosition='left'
          placeholder='Search countries by name or code...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          size='large'
        />
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <span className={styles.resultsCount}>
            {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'} found
          </span>
        </div>
 
        <Grid className={styles.countriesGrid}>
          {filteredCountries.map((country) => {
            const countryCode = country.countryCode || country.code;
            const countryName = country.name || country.countryName;

            return (
              <Grid.Column key={country.id || countryCode} mobile={16} tablet={8} computer={4}>
                <Card 
                  className={styles.countryCard}
                  onClick={() => handleCountryClick(country)}
                >
                  <Card.Content className={styles.cardContent}>
                    <div className={styles.flagContainer}>
                      <CountryFlag 
                        countryCode={countryCode} 
                        name={countryName}
                        fontSize={32}
                      />
                    </div>
                    <div className={styles.countryInfo}>
                      <Card.Header className={styles.countryName}>
                        {countryName}
                      </Card.Header>
                      <Card.Meta className={styles.countryCode}>
                        {countryCode}
                      </Card.Meta>
                      <div className={styles.interactionMentionContainer}>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid>

        {filteredCountries.length === 0 && !loading && (
          <div className={styles.noResults}>
            <Icon name='search' size='huge' />
            <p>No countries found matching "{searchTerm}"</p>
            <p>Try searching with a different term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesPage;
