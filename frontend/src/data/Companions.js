// src/data/companions.js (Modified)

export const companionData = [
  {
    id: 1,
    name: 'Aisha Khan',
    age: 24,
    gender: 'Female',
    startinglocation: 'Delhi, India',
    destination: 'Japan (Tokyo & Kyoto)', // <--- NEW FIELD
    interests: ['Photography', 'Food', 'Culture'],
    availableMonths: ['October', 'November'],
    bio: 'Looking for a travel buddy for a culinary tour in Southeast Asia. I love capturing moments and finding the best street food!',
    image: 'https://picsum.photos/seed/aisha/150',
    verified: true
  },
  {
    id: 2,
    name: 'Ben Carter',
    age: 32,
    gender: 'Male',
    startinglocation: 'New York, USA',
    destination: 'Jammu & Kashmir (Trek)', // <--- NEW FIELD
    interests: ['Adventure', 'Hiking', 'History'],
    availableMonths: ['September', 'October'],
    bio: 'Seeking someone to join me on a challenging trek in the Himalayas. History enthusiast and always up for an adventure.',
    image: 'https://picsum.photos/seed/ben/150',
    verified: true
  },
  {
    id: 3,
    name: 'Chris Lee',
    age: 27,
    gender: 'Male',
    startinglocation: 'London, UK',
    destination: 'Jammu & Kashmir (Leisure)', // <--- NEW FIELD
    interests: ['Food', 'Budget Travel', 'Nightlife'],
    availableMonths: ['November', 'December'],
    bio: 'Traveling on a shoestring budget and looking for fun-loving people to explore urban centers and local pubs.',
    image: 'https://picsum.photos/seed/chris/150',
    verified: false
  },
  {
    id: 4,
    name: 'Dana Smith',
    age: 38,
    gender: 'Female',
    startinglocation: 'Sydney, Australia',
    destination: 'Europe (Museum Tour)', // <--- NEW FIELD
    interests: ['Culture', 'Photography', 'Art'],
    availableMonths: ['January', 'February'],
    bio: 'Planning a relaxed trip focused on museums, art galleries, and local crafts. Patient and great with itineraries.',
    image: 'https://picsum.photos/seed/dana/150',
    verified: true
  },
  {
    id: 5,
    name: 'Eve Jones',
    age: 42,
    gender: 'Female',
    startinglocation: 'Toronto, Canada',
    destination: 'Maldives (Relaxation)', // <--- NEW FIELD
    interests: ['Relaxation', 'Beaches', 'Culture'],
    availableMonths: ['March', 'April'],
    bio: 'Seeking peace and sun. Preferably someone who enjoys long walks on the beach and local markets.',
    image: 'https://picsum.photos/seed/eve/150',
    verified: true
  },
  {
    id: 6,
    name: 'Fiona Green',
    age: 21,
    gender: 'Female',
    startinglocation: 'Singapore',
    destination: 'South Korea (K-Culture)',
    interests: ['Culture', 'Nightlife', 'Food'],
    availableMonths: ['June', 'July'],
    bio: 'Looking for K-Pop fans to explore Seoul, try street food, and visit historical sites during the summer festival season!',
    image: 'https://picsum.photos/seed/fiona/150',
    verified: true
  },
  {
    id: 7,
    name: 'George Hall',
    age: 45,
    gender: 'Male',
    startinglocation: 'Berlin, Germany',
    destination: 'Patagonia (Photography)',
    interests: ['Photography', 'Hiking', 'Nature'],
    availableMonths: ['March', 'April', 'November'],
    bio: 'Professional photographer planning a long excursion in Patagonia. Seeking a quiet, reliable partner for stunning landscape shots.',
    image: 'https://picsum.photos/seed/george/150',
    verified: true
  },
  {
    id: 8,
    name: 'Hannah Iyer',
    age: 29,
    gender: 'Female',
    startinglocation: 'Bangalore, India',
    destination: 'Jammu & Kashmir (Trek)', // Matches Ben Carter (ID 2) for effective filtering demo
    interests: ['Adventure', 'Budget Travel', 'History'],
    availableMonths: ['September', 'October'],
    bio: 'Recent university graduate keen on challenging treks. Great at finding deals and researching local history.',
    image: 'https://picsum.photos/seed/hannah/150',
    verified: false
  }
];

export const locationList = [
    'Delhi', 
    'Mumbai', 
    'Bangalore', 
    'Kolkata', 
    'Chennai',
    'London (Mock International)' // Example of diverse location
];

// --- Constants (Updated with Destinations) ---
export const getAgeRange = (age) => { /* ... (Same as before) ... */ }; 
export const interestsList = ['Adventure', 'Photography', 'Food', 'Culture', 'Hiking', 'History', 'Budget Travel', 'Nightlife', 'Art', 'Relaxation', 'Beaches'];
export const ageRanges = ['18-25', '26-30', '31-40', '40+'];
export const availableMonths = ['January', 'February', 'March', 'April', 'September', 'October', 'November', 'December'];

// New list of destinations for the filter dropdown
export const destinationList = [
    'Jammu & Kashmir (Trek)', 
    'Jammu & Kashmir (Leisure)', 
    'Japan (Tokyo & Kyoto)', 
    'Europe (Museum Tour)', 
    'Maldives (Relaxation)'
];