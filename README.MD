# YouTube Clone – Frontend (React)

## Description
This project is a YouTube Clone frontend built using React (Vite) as part of an academic assignment.  
It replicates the basic UI and core features of YouTube such as video listing, search, filters, video player, comments UI, authentication UI, and responsive design.

The project currently uses static/sample data. Backend integration using Node.js, Express, MongoDB, and JWT will be implemented separately.

---

## Technologies Used
- React (Vite)
- React Router DOM
- Context API
- Tailwind CSS
- React Icons
- JavaScript (ES Modules)


## Features

### Home Page
- YouTube-style header
- Toggleable sidebar using hamburger menu
- Category filter buttons
- Search bar to filter videos by title
- Video grid layout
- Each video card displays:
  - Thumbnail
  - Title
  - Channel Name
  - Views

### User Authentication (Frontend)
- Login and Register pages
- Username, Email, and Password fields
- Authentication handled using Context API
- Protected routes implemented
- Header updates based on login state


### Search and Filter
- Search videos by title
- Filter videos by category
- Multiple filter buttons implemented
- Search and filter work together



### Video Player Page
- Video player
- Video title and description
- Channel information
- Like and Dislike buttons
- Comment section (add and view comments)
- Related videos section


### Responsive Design
- Fully responsive UI
- Works on desktop, tablet, and mobile devices



## Sample Video Data


  {
    videoId: "video03",
    title: "Gaming Highlights 2024",
    thumbnailUrl: "https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg",
    channelName: "Game Zone",
    views: 45000,
    category: "Gaming",
  }
  
## How to run
- npm insatll
- npm run dev 


*******************************************BACKEND*******************************************************

# YouTube Clone – Backend (Node.js & Express)

## Description
This is the backend for the YouTube Clone project.  
It provides APIs for user authentication, channel management, video management, and comments. All data (users, channels, videos, comments) is stored and fetched from **MongoDB**.  

The backend uses **JWT-based authentication** to protect routes and allow only authenticated users to perform certain actions.  

---

## Technologies Used
- Node.js
- Express.js
- MongoDB 
- JWT (JSON Web Tokens)
- JavaScript (ES Modules)
- Axios (for frontend API calls)
- Version Control: Git

---

## Features

### User Authentication
- Register new users with **username, email, and password**
- Login with JWT authentication
- Protected routes using JWT
- Input validation (username, email, password)
- Secure password storage using hashing

### Channel Management
- Create a new channel
- Fetch channel information by ID
- Each channel associated with a user

### Video Management
- Fetch all videos or a single video by ID
- Create, update, delete videos (CRUD)
- Video metadata stored in MongoDB:
  - title
  - description
  - category
  - videoUrl
  - thumbnailUrl
  - channelId
  - views

### Comment Management
- Add, fetch, and delete comments for videos
- Each comment linked to a user and video

### Search and Filter Support
- Fetch videos by title search
- Filter videos by category
- Supports combined search and filter

## How to run 
- npm install 
- npm start 



## Git repository link 
https://github.com/vikashrao12/YouTube

## Author 
Vikash Raw
