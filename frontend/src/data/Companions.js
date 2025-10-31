// src/data/Companions.js

// --- Companion Data (8 Users) ---
export const companionData = [
  {
    id: 1,
    name: 'Aisha Khan',
    age: 24,
    gender: 'Female',
    destination: 'Japan (Tokyo & Kyoto)',
    startingLocation: 'Mumbai',
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
    destination: 'Jammu & Kashmir (Trek)',
    startingLocation: 'Delhi',
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
    destination: 'Jammu & Kashmir (Leisure)',
    startingLocation: 'Delhi',
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
    destination: 'Europe (Museum Tour)',
    startingLocation: 'Bangalore',
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
    destination: 'Maldives (Relaxation)',
    startingLocation: 'Mumbai',
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
    destination: 'South Korea (K-Culture)',
    startingLocation: 'Kolkata',
    interests: ['Culture', 'Nightlife', 'Food'],
    availableMonths: ['June', 'July'],
    bio: 'Looking for K-Pop fans to explore Seoul, try street food, and visit historical sites...',
    image: 'https://picsum.photos/seed/fiona/150',
    verified: true
  },
  {
    id: 7,
    name: 'George Hall',
    age: 45,
    gender: 'Male',
    destination: 'Patagonia (Photography)',
    startingLocation: 'Chennai',
    interests: ['Photography', 'Hiking', 'Nature'],
    availableMonths: ['March', 'April', 'November'],
    bio: 'Professional photographer planning a long excursion in Patagonia...',
    image: 'https://picsum.photos/seed/george/150',
    verified: true
  },
  {
    id: 8,
    name: 'Hannah Iyer',
    age: 29,
    gender: 'Female',
    destination: 'Jammu & Kashmir (Trek)',
    startingLocation: 'Delhi',
    interests: ['Adventure', 'Budget Travel', 'History'],
    availableMonths: ['September', 'October'],
    bio: 'Recent university graduate keen on challenging treks...',
    image: 'https://picsum.photos/seed/hannah/150',
    verified: false
  }
];

// --- Helper Function ---
export const getAgeRange = (age) => {
  if (age >= 18 && age <= 25) return '18-25';
  if (age >= 26 && age <= 30) return '26-30';
  if (age >= 31 && age <= 40) return '31-40';
  return '40+';
};

// --- Filter Lists ---
export const interestsList = ['Adventure', 'Photography', 'Food', 'Culture', 'Hiking', 'History', 'Budget Travel', 'Nightlife', 'Art', 'Relaxation', 'Beaches'];
export const ageRanges = ['18-25', '26-30', '31-40', '40+'];
export const availableMonths = ['January', 'February', 'March', 'April', 'June', 'July', 'September', 'October', 'November', 'December'];

export const destinationList = [
    'Jammu & Kashmir (Trek)', 
    'Jammu & Kashmir (Leisure)', 
    'Japan (Tokyo & Kyoto)', 
    'Europe (Museum Tour)', 
    'Maldives (Relaxation)',
    'South Korea (K-Culture)', 
    'Patagonia (Photography)'
];

export const locationList = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'London (Mock International)'];