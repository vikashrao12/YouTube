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
  