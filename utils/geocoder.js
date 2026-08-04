const axios = require('axios');

async function geocodeAddress(location) {
  try {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}&limit=1`;
    
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'WanderlustApp/1.0' }
    });
    
    if (response.data && response.data.length > 0) {
      const longitude = parseFloat(response.data[0].lon);
      const latitude = parseFloat(response.data[0].lat);
      return {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    } else {
      return {
        type: "Point",
        coordinates: [0, 0]
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      type: "Point",
      coordinates: [0, 0]
    };
  }
}

module.exports = geocodeAddress;