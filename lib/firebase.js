// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getDatabase, ref, get
} from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA5gtlBR2DajUsA78d81W1PhzKBsfAod64",
  authDomain: "globaldiplomacynet.firebaseapp.com",
  projectId: "globaldiplomacynet",
  storageBucket: "globaldiplomacynet.firebasestorage.app",
  messagingSenderId: "665653027700",
  appId: "1:665653027700:web:bfd3a6f7f46e5b11c8c221",
  measurementId: "G-E3J0S8EPMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database with correct region
const db = getDatabase(app, 'https://globaldiplomacynet-default-rtdb.europe-west1.firebasedatabase.app');

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { db, analytics };

// Firebase service functions for mentions data
export class MentionsService {
  constructor() {
    this.db = db;
    this.countriesCache = null;
  }

  // Helper method to convert numeric ID to country code
  getCountryCodeById(id) {
    if (!this.countriesCache) {
      // Create a mapping from the countries data we know exists
      this.countriesCache = {
        1: 'TR',   // Turkey
        2: 'US',   // United States
        3: 'DE',   // Germany
        4: 'FR',   // France
        5: 'GB',   // United Kingdom
        6: 'RU',   // Russia
        7: 'CN',   // China
        8: 'JP',   // Japan
        9: 'CA',   // Canada
        10: 'AU',  // Australia
        11: 'BR',  // Brazil
        12: 'IN',  // India
        13: 'IT',  // Italy
        14: 'ES',  // Spain
        15: 'NL'   // Netherlands
      };
    }
    return this.countriesCache[id] || null;
  }

  // Get all countries with timeout
  async getCountries() {
    try {
      console.log('Attempting to connect to Firebase countries collection...')
      const dbRef = ref(this.db, 'countries');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase timeout after 5 seconds')), 5000)
      );
      
      const snapshotPromise = get(dbRef);
      const snapshot = await Promise.race([snapshotPromise, timeoutPromise]);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const countries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        console.log('Successfully retrieved countries from Firebase:', countries.length)
        return countries;
      } else {
        console.log('No countries data found in Firebase database')
        return [];
      }
    } catch (error) {
      console.error('Error getting countries from Firebase:', error);
      console.error('Error details:', error.message, error.code);
      throw error;
    }
  }

  // Get interactions with filtering and pagination
  async getInteractions(filters = {}, pagination = {}) {
    try {
      const {
        country,
        year,
        type,
        limitNum = 1000,
        offset = 0,
        sort = 'date',
        order = 'desc'
      } = { ...filters, ...pagination };

      // Fetch all interactions and filter in memory to avoid indexing issues
      const interactionsRef = ref(this.db, 'interactions');
      const snapshot = await get(interactionsRef);
      
      if (!snapshot.exists()) {
        return { data: [], total: 0, hasMore: false };
      }

      let all = Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }));

      // Apply filters
      if (country) {
        all = all.filter(i => i.reporter === country || i.reported === country);
      }

      if (type) {
        all = all.filter(i => i.type === type);
      }

      if (year) {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        all = all.filter(i => i.date >= startDate && i.date <= endDate);
      }

      // Sort manually
      if (sort) {
        all.sort((a, b) => {
          if (sort === 'date') {
            return order === 'desc'
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date);
          } else {
            return order === 'desc'
              ? (b[sort] ?? '').localeCompare(a[sort] ?? '')
              : (a[sort] ?? '').localeCompare(b[sort] ?? '');
          }
        });
      }

      // Apply pagination manually
      const total = all.length;
      const paginated = all.slice(offset, offset + limitNum);

      return {
        data: paginated,
        total,
        hasMore: offset + limitNum < total
      };
    } catch (error) {
      console.error('Error getting interactions:', error);
      throw error;
    }
  }

  // Get interactions for a specific country
  async getInteractionsForCountry(countryCode, limitNum = 50, offset = 0) {
    try {
      // Instead of using indexed queries, fetch all interactions and filter in memory
      // This avoids the indexing requirement but may be slower for large datasets
      console.log('Attempting to connect to Firebase interactions collection...')
      const interactionsRef = ref(this.db, 'interactions');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase interactions timeout after 5 seconds')), 5000)
      );
      
      const snapshotPromise = get(interactionsRef);
      const snapshot = await Promise.race([snapshotPromise, timeoutPromise]);
      
      if (!snapshot.exists()) {
        return { data: [], total: 0, hasMore: false };
      }

      const allInteractions = Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }));
      
      console.log('Total interactions in database:', allInteractions.length)
      console.log('Sample interaction:', allInteractions[0])
      console.log('Looking for country code:', countryCode)
      
      // Filter interactions where the country is either reporter or reported
      // The Firebase data uses numeric IDs, so we need to map country codes to IDs
      const filteredInteractions = allInteractions.filter(interaction => {
        // Convert numeric IDs to country codes for comparison
        const reporterCode = this.getCountryCodeById(interaction.reporting);
        const reportedCode = this.getCountryCodeById(interaction.reported);
        
        return reporterCode === countryCode || reportedCode === countryCode;
      });
      
      console.log('Filtered interactions for', countryCode, ':', filteredInteractions.length)

      // Add role information and convert numeric IDs to country codes
      const enrichedInteractions = filteredInteractions.map(interaction => ({
        ...interaction,
        reporter: this.getCountryCodeById(interaction.reporting),
        reported: this.getCountryCodeById(interaction.reported),
        role: this.getCountryCodeById(interaction.reporting) === countryCode ? 'reporter' : 'reported'
      }));

      // Sort by date (newest first)
      const sortedInteractions = enrichedInteractions.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      const total = sortedInteractions.length;
      const paginated = sortedInteractions.slice(offset, offset + limitNum);

      return {
        data: paginated,
        total,
        hasMore: offset + limitNum < total
      };
    } catch (error) {
      console.error('Error getting interactions for country:', error);
      throw error;
    }
  }

  // Get overview data
  async getOverviewData() {
    try {
      const [countriesSnap, interactionsSnap] = await Promise.all([
        get(ref(this.db, 'countries')),
        get(ref(this.db, 'interactions'))
      ]);

      const countries = countriesSnap.exists()
        ? Object.entries(countriesSnap.val()).map(([id, value]) => ({ id, ...value }))
        : [];

      const interactions = interactionsSnap.exists()
        ? Object.entries(interactionsSnap.val()).map(([id, value]) => ({ id, ...value }))
        : [];

      const index = this.createCountryIndex(interactions);

      return {
        countries,
        interactions,
        index,
        totalInteractions: interactions.length
      };
    } catch (error) {
      console.error('Error getting overview data:', error);
      throw error;
    }
  }

  // Build index
  createCountryIndex(interactions) {
    const index = { byCountry: {} };

    interactions.forEach(interaction => {
      const reporter = interaction.reporter;
      const reported = interaction.reported;

      if (!index.byCountry[reporter]) {
        index.byCountry[reporter] = { asReporter: [], asReported: [] };
      }
      if (!index.byCountry[reported]) {
        index.byCountry[reported] = { asReporter: [], asReported: [] };
      }

      index.byCountry[reporter].asReporter.push(interaction.id);
      index.byCountry[reported].asReported.push(interaction.id);
    });

    return index;
  }

  // Get a specific interaction by ID
  async getInteractionById(interactionId) {
    try {
      const snap = await get(ref(this.db, `interactions/${interactionId}`));
      if (snap.exists()) {
        return { id: interactionId, ...snap.val() };
      }
      return null;
    } catch (error) {
      console.error('Error getting interaction by ID:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const mentionsService = new MentionsService();
