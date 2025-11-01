// This file is used for front-end integration (React)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBAQb4dbbiq0eWN1CYUHE1Z9qZN9sFgzKc",
  authDomain: "tripmate-61d4e.firebaseapp.com",
  projectId: "tripmate-61d4e",
  storageBucket: "tripmate-61d4e.firebasestorage.app",
  messagingSenderId: "936955632467",
  appId: "1:936955632467:web:f90ada1a75cb62160c1fa6",
  measurementId: "G-KJJBSVQZWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
// ---------------- Additional Code for Backend ----------------

// Create __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to backend/firebaseConfig.json
const backendConfigPath = path.resolve(__dirname, '../backend/firebaseConfig.json');

// Load backend Firebase config if available
let backendFirebaseConfig = null;

try {
  if (fs.existsSync(backendConfigPath)) {
    const configData = fs.readFileSync(backendConfigPath, 'utf-8');
    backendFirebaseConfig = JSON.parse(configData);
    console.log('✅ Backend Firebase config loaded successfully');
  } else {
    console.warn('⚠️ Backend Firebase config file not found at:', backendConfigPath);
  }
} catch (error) {
  console.error('❌ Error loading backend Firebase config:', error);
}

// Export backend config
export { backendFirebaseConfig };