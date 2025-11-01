// src/assets/assets.jsx (REVISED)

// 🛑 Filenames are typically PascalCase or kebab-case. 
// We use the imported variables as the keys.

import Waterfall from "./Waterfall.jpeg"; // Variable: Waterfall
import beaches from "./beaches.jpeg";     // Variable: beaches
import mountains from "./Mountains.jpeg"; // Variable: mountains (Capital M)
import historical_images from "./Historical_images.jpeg"; // Variable: historical_images (Capital H, I)

const images = {
    // 🛑 Ensure key names match variable names exactly for the next file
    Waterfall,
    beaches,
    mountains, 
    historical_images // 🛑 This key must be accessed exactly as 'historical_images'
};

export default images;