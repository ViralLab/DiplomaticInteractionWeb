// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5gtlBR2DajUsA78d81W1PhzKBsfAod64",
  authDomain: "globaldiplomacynet.firebaseapp.com",
  projectId: "globaldiplomacynet",
  storageBucket: "globaldiplomacynet.firebasestorage.app",
  messagingSenderId: "665653027700",
  appId: "1:665653027700:web:bfd3a6f7f46e5b11c8c221",
  measurementId: "G-E3J0S8EPMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database with correct region
const db = getDatabase(
  app,
  "https://globaldiplomacynet-default-rtdb.europe-west1.firebasedatabase.app"
);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, analytics };

// ============================
// Country ID <-> Code Mappings
// ============================

const codeToIdMap = {
  "AFG": 101,
  "ALB": 102,
  "DZA": 103,
  "ASM": 104,
  "AND": 105,
  "AGO": 106,
  "AIA": 107,
  "ATG": 108,
  "ARG": 109,
  "ARM": 110,
  "ABW": 111,
  "AUS": 112,
  "AUT": 113,
  "AZE": 115,
  "BHR": 116,
  "BGD": 117,
  "BRB": 118,
  "BLR": 120,
  "BEL": 121,
  "BLZ": 122,
  "BEN": 123,
  "BMU": 124,
  "BTN": 125,
  "BOL": 126,
  "BIH": 127,
  "BWA": 128,
  "BRA": 129,
  "VGB": 130,
  "BRN": 131,
  "BGR": 132,
  "BFA": 133,
  "BDI": 134,
  "KHM": 135,
  "CMR": 136,
  "CAN": 137,
  "CPV": 139,
  "BES": 140,
  "CYM": 142,
  "CAF": 143,
  "TCD": 144,
  "CHL": 147,
  "COL": 149,
  "COM": 150,
  "COK": 151,
  "CRI": 152,
  "HRV": 153,
  "CUB": 154,
  "CUW": 155,
  "CZE": 158,
  "COD": 160,
  "DNK": 161,
  "DJI": 162,
  "DMA": 163,
  "DOM": 164,
  "ECU": 166,
  "EGY": 167,
  "SLV": 168,
  "GNQ": 169,
  "ERI": 170,
  "EST": 171,
  "SWZ": 172,
  "ETH": 173,
  "FLK": 174,
  "FRO": 175,
  "FSM": 176,
  "FJI": 177,
  "FIN": 178,
  "FRA": 179,
  "GUF": 181,
  "PYF": 182,
  "GAB": 183,
  "GEO": 184,
  "DEU": 186,
  "GHA": 187,
  "GIB": 188,
  "GRC": 189,
  "GRL": 190,
  "GRD": 191,
  "GUM": 192,
  "GTM": 193,
  "GGY": 194,
  "GIN": 195,
  "GNB": 196,
  "GUY": 197,
  "HTI": 198,
  "HND": 199,
  "HKG": 200,
  "HUN": 201,
  "ISL": 202,
  "IND": 203,
  "IDN": 204,
  "IRN": 205,
  "IRQ": 206,
  "IRL": 207,
  "IMN": 208,
  "ISR": 209,
  "ITA": 210,
  "CIV": 211,
  "JAM": 212,
  "JPN": 213,
  "JEY": 214,
  "JOR": 215,
  "KAZ": 216,
  "KEN": 217,
  "KIR": 218,
  "XKX": 219,
  "KWT": 221,
  "KGZ": 222,
  "LAO": 223,
  "LVA": 224,
  "LBN": 225,
  "LSO": 226,
  "LBR": 227,
  "LBY": 228,
  "LIE": 229,
  "LUX": 232,
  "MAC": 233,
  "MDG": 234,
  "MWI": 235,
  "MYS": 236,
  "MDV": 237,
  "MLI": 238,
  "MLT": 239,
  "MHL": 240,
  "MRT": 241,
  "MUS": 242,
  "MEX": 243,
  "MCO": 244,
  "MNG": 245,
  "MNE": 246,
  "MSR": 247,
  "MAR": 248,
  "MOZ": 249,
  "MMR": 250,
  "NAM": 251,
  "NRU": 252,
  "NPL": 253,
  "NLD": 254,
  "NCL": 255,
  "NZL": 256,
  "NIC": 257,
  "NER": 258,
  "NGA": 259,
  "NIU": 260,
  "PRK": 261,
  "MKD": 262,
  "CYP": 263,
  "MNP": 264,
  "NOR": 265,
  "OMN": 266,
  "PAK": 268,
  "PLW": 269,
  "PAN": 270,
  "PNG": 271,
  "PRY": 272,
  "CHN": 273,
  "PER": 274,
  "PHL": 275,
  "PCN": 276,
  "POL": 277,
  "PRT": 279,
  "PRI": 280,
  "QAT": 281,
  "COG": 291,
  "MDA": 292,
  "ROU": 295,
  "RUS": 296,
  "RWA": 297,
  "KNA": 299,
  "LCA": 300,
  "VCT": 301,
  "MAF": 302,
  "WSM": 303,
  "SMR": 304,
  "SAU": 305,
  "SEN": 306,
  "SRB": 307,
  "SYC": 309,
  "SLE": 310,
  "SGP": 311,
  "SXM": 312,
  "SVK": 313,
  "SVN": 314,
  "SLB": 316,
  "SOM": 317,
  "ZAF": 318,
  "KOR": 319,
  "SSD": 321,
  "ESP": 323,
  "LKA": 324,
  "PSE": 325,
  "SDN": 326,
  "SUR": 327,
  "SWE": 328,
  "CHE": 329,
  "SYR": 330,
  "STP": 331,
  "TWN": 332,
  "TJK": 333,
  "TZA": 334,
  "THA": 336,
  "BHS": 337,
  "GMB": 338,
  "TLS": 339,
  "TGO": 340,
  "TKL": 341,
  "TON": 342,
  "TTO": 344,
  "TUN": 346,
  "TUR": 347,
  "TKM": 348,
  "TCA": 349,
  "TUV": 350,
  "UGA": 351,
  "UKR": 352,
  "ARE": 353,
  "GBR": 354,
  "USA": 355,
  "VIR": 356,
  "URY": 357,
  "UZB": 358,
  "VUT": 359,
  "VAT": 360,
  "VEN": 361,
  "VNM": 362,
  "WLF": 364,
  "ESH": 365,
  "YEM": 366,
  "ZMB": 368,
  "ZWE": 369
};

// Build reverse lookup for id -> code
const idToCodeMap = Object.fromEntries(
  Object.entries(codeToIdMap).map(([code, id]) => [id, code])
);

// ============================
// Mentions Service
// ============================

export class MentionsService {
  constructor() {
    this.db = db;
    this.cachedCountriesData = null;
    this.countriesCacheExpiry = null;
    this.interactionsCountCache = {};
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    try {
      await this.getCountries();
      this.isInitialized = true;
    } catch (err) {
      console.error("Error initializing MentionsService:", err);
    }
  }

  getCountryIdFromCode(code) {
    return codeToIdMap[code] || null;
  }

  getCountryCodeFromId(id) {
    return idToCodeMap[id] || null;
  }

  // ============================
  // Countries
  // ============================
  async getCountries() {
    if (
      this.cachedCountriesData &&
      this.countriesCacheExpiry &&
      Date.now() < this.countriesCacheExpiry
    ) {
      return this.cachedCountriesData;
    }

    const dbRef = ref(this.db, "countries");
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firebase timeout after 15s")), 15000)
    );

    const snapshot = await Promise.race([get(dbRef), timeoutPromise]);

    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    const countries = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));

    this.cachedCountriesData = countries;
    this.countriesCacheExpiry = Date.now() + 5 * 60 * 1000;

    return countries;
  }

  // ============================
  // Interactions
  // ============================
  async getInteractions(filters = {}, pagination = {}) {
    const {
      country,
      year,
      type,
      limitNum = 1000,
      offset = 0,
      sort = "date",
      order = "desc",
    } = { ...filters, ...pagination };

    const interactionsRef = ref(this.db, "interactions");
    const snapshot = await get(interactionsRef);

    if (!snapshot.exists()) return { data: [], total: 0, hasMore: false };

    let all = Object.entries(snapshot.val()).map(([id, value]) => ({
      id,
      ...value,
    }));

    // Filters
    if (country) {
      const countryId = this.getCountryIdFromCode(country);
      all = all.filter(
        (i) => i.reporting === countryId || i.reported === countryId
      );
    }
    if (type) all = all.filter((i) => i.type === type);
    if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      all = all.filter((i) => i.date >= startDate && i.date <= endDate);
    }

    // Sort
    if (sort === "date") {
      all.sort((a, b) =>
        order === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
    }

    const total = all.length;
    const paginated = all.slice(offset, offset + limitNum);

    return { data: paginated, total, hasMore: offset + limitNum < total };
  }

  // ============================
  // Interactions for a Country
  // ============================
  async getInteractionsForCountry(countryCode, limitNum = 50, offset = 0) {
    const result = await this.tryIndexedQuery(countryCode, limitNum, offset);
    if (!result.success) {
      return { data: [], total: 0, hasMore: false };
    }

    const countriesData = await this.getCountries();
    const enrichedData = result.data.map((interaction) => {
      const reporterId = interaction.reporting;
      const reportedId = interaction.reported;

      const reporterCode = this.getCountryCodeFromId(reporterId);
      const reportedCode = this.getCountryCodeFromId(reportedId);

      return {
        ...interaction,
        reporterId,
        reportedId,
        reporterCode,
        reportedCode,
        reporterName: countriesData.find(c => c.id === reporterId)?.name,
        reportedName: countriesData.find(c => c.id === reportedId)?.name,
      };
    });

    return { ...result, data: enrichedData };
  }

  // ============================
  // Indexed Query
  // ============================

async tryIndexedQuery(countryCode, limitNum, offset) {
  const countryId = this.getCountryIdFromCode(countryCode);
  if (!countryId) return { success: false };

  const reportedRef = ref(
    this.db,
    `index/byCountry/${countryId}/asReported`
  );

  const [reportedSnap] = await Promise.all([
    get(reportedRef).catch(() => null),
  ]);

  let interactionIds = [];
  if (reportedSnap?.exists()) {
    const arr = reportedSnap.val();
    if (Array.isArray(arr)) {
      interactionIds.push(...arr.map((id) => ({ id })));
    }
  }

  if (interactionIds.length === 0) return { success: false };

  // 🔑 Option B: Query by child field "id" instead of path
  const interactionPromises = interactionIds.map(async ({ id }) => {
    try {
      const q = query(ref(this.db, "interactions"), orderByChild("id"), equalTo(id));
      const snap = await get(q);

      if (!snap.exists()) return null;

      // Firebase returns an object keyed by auto IDs → take the first value
      const val = snap.val();
      const first = Object.values(val)[0];

      return { id, ...first };
    } catch (err) {
      console.error(`Failed to fetch interaction ${id}:`, err);
      return null;
    }
  });

  const allInteractions = (await Promise.all(interactionPromises)).filter(Boolean);

  console.log("allInteractions", allInteractions);

  const sorted = allInteractions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const paginated = sorted.slice(offset, offset + limitNum);

  return {
    success: true,
    data: paginated,
    total: allInteractions.length,
    hasMore: offset + limitNum < allInteractions.length,
  };
  }
}

export const mentionsService = new MentionsService();