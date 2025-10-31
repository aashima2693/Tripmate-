// Note: This assumes you are running in a Node environment and have installed:
// npm install firebase-admin
import * as admin from 'firebase-admin';
import { companionData } from '../data/Companions';

// Initialize the Firebase Admin SDK (requires a service account JSON file)
// Replace './serviceAccount.json' with the actual path
const serviceAccount = require('./serviceAccount.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

const seedCompanions = async () => {
    console.log("Starting companion data seeding...");
    const batch = firestore.batch();
    const companionCollection = firestore.collection('companions');

    for (const companion of companionData) {
        // Use the numerical ID as the Firestore document ID (string converted)
        const docRef = companionCollection.doc(String(companion.id));
        
        // Remove 'id' as Firestore automatically handles it
        const { id, ...dataToSave } = companion; 
        
        batch.set(docRef, dataToSave);
    }

    await batch.commit();
    console.log(`Successfully seeded ${companionData.length} companions to Firestore.`);
};

// Execute the function
// seedCompanions().catch(console.error);