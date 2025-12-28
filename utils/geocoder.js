const axios = require('axios');

async function geocodeAddress(location) {
  try {
    // Return default coordinates if no location is provided
    if (!location || location.trim() === '' || location.includes('undefined')) {
      console.log("Invalid location provided:", location);
      return {
        type: "Point",
        coordinates: [0, 0]
      };
    }

    const encodedLocation = encodeURIComponent(location);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&limit=1`;

    console.log(`Geocoding location (Nominatim): ${location}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'wanderlust-app/1.0 (contact: example@example.com)'
      }
    });

    if (Array.isArray(response.data) && response.data.length > 0) {
      const first = response.data[0];
      const latitude = parseFloat(first.lat);
      const longitude = parseFloat(first.lon);
      console.log(`Geocoded ${location} to: [${longitude}, ${latitude}]`);
      return {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    } else {
      console.log(`No geocoding results for: ${location}`);
      return {
        type: "Point",
        coordinates: [0, 0]
      };
    }
  } catch (error) {
    console.error("Geocoding error for location:", location, error.message);
    return {
      type: "Point",
      coordinates: [0, 0]
    };
  }
}

module.exports = geocodeAddress;