Wanderlust – Where Travel Meets Comfort
Wanderlust is a full-stack web application designed to help travelers find and list comfortable accommodations worldwide. It features a robust listing management system, user authentication to enhance the travel planning experience.

🔗 Live Demo: (https://travelio-journey.onrender.com/listings)

🚀 Features
Listing Management: Users can view, create, edit, and delete travel listings (CRUD functionality).

Interactive Maps: Integrated map functionality to visualize listing locations.

Image Uploads: Cloud-based image storage for high-quality property photos.

Authentication & Authorization: Secure user login/signup and permission-based access for editing/deleting listings.

Responsive Design: Fully optimized for mobile, tablet, and desktop views.

Reviews & Ratings: Community-driven feedback system for each listing.

🛠️ Tech Stack
Frontend: EJS (Embedded JavaScript Templates), CSS3, Bootstrap 5, JavaScript

Backend: Node.js, Express.js

Database: MongoDB (using Mongoose ODM)

Cloud Services: Cloudinary (Image Hosting)

Deployment: Render

📁 Folder Structure
Plaintext
├── init/           # Database initialization scripts and sample data
├── models/         # Mongoose schemas (Listing, Review, User)
├── public/         # Static files (CSS, JS, Images)
├── routes/         # Express routes for listings, reviews, and users
├── utils/          # Utility functions and error handling wrappers
├── views/          # EJS templates for the UI
├── app.js          # Main application entry point
└── cloudConfig.js  # Configuration for cloud services (Cloudinary)
🔧 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/SuryaPratapIIIT/Wanderlust.git
cd Wanderlust
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env file in the root directory and add your credentials:

Code snippet
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
Initialize the Database:

Bash
node init/index.js
Run the Application:

Bash
node app.js
The app will be live at http://localhost:8080.

🤝 Contributing
Contributions are welcome! If you have suggestions for new features or improvements, feel free to fork the repo and create a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
Distributed under the MIT License. See LICENSE for more information.

Developed by Surya Pratap
