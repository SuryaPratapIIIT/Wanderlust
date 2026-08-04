# Wanderlust 🌍

Wanderlust is a full-stack web application designed for travelers to discover, explore, and share unique accommodations and travel experiences around the world. It works similarly to Airbnb, allowing users to list their properties, leave reviews, and view locations on an interactive map.

## 🚀 Features

- **User Authentication:** Secure signup, login, and logout using Passport.js.
- **Listing Management:** Users can create, edit, view, and delete their property listings.
- **Review System:** Authenticated users can leave star ratings and comments on listings.
- **Image Uploads:** Seamless image uploading and cloud storage via Cloudinary.
- **Interactive Maps:** View property locations dynamically using OpenStreetMap & Leaflet.js (No API key required).
- **Responsive Design:** Beautiful, mobile-friendly UI built with Bootstrap.
- **Authorization:** Protection against unauthorized edits/deletions of listings and reviews.

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- [EJS](https://ejs.co/) (Embedded JavaScript templates)
- [Bootstrap 5](https://getbootstrap.com/) (Styling and layout)
- [Leaflet.js](https://leafletjs.com/) (Interactive Maps)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- RESTful Routing architecture

**Database:**
- [MongoDB](https://www.mongodb.com/) (NoSQL Database)
- [Mongoose](https://mongoosejs.com/) (Object Data Modeling)
- [Cloudinary](https://cloudinary.com/) (Image Storage)

## 💻 Running Locally

To run this project on your local machine, follow these steps:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally (or an Atlas URI)

### 2. Clone the repository
```bash
git clone https://github.com/SuryaPratapIIIT/Wanderlust.git
cd Wanderlust
```

### 3. Install dependencies
```bash
npm install
```

### 4. Set up Environment Variables
Create a `.env` file in the root directory and add your Cloudinary credentials:
```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_secret_code
```

### 5. Start the server
```bash
npm run dev
```
The application will start on `http://localhost:8080`.

## 🌐 Deployment
This project is configured to be easily deployed on platforms like **Render**, **Heroku**, or **Railway**. Ensure you provide the `MONGO_URL` environment variable representing your MongoDB Atlas cluster in your host's environment settings.

## 📄 License
This project is licensed under the MIT License.
