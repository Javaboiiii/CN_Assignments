# Online Bookstore Application

A responsive full-stack online bookstore application built with React (frontend) and Express/MongoDB (backend).

## Features

- **Home Page**: Welcome page with features showcase
- **User Authentication**: Login and Registration pages
- **Book Catalogue**: Browse and search books by author
- **Add Books**: Authenticated users can add new books
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Project Structure

```
6a/                     # Frontend (React + Vite)
├── src/
│   ├── components/    # Reusable components (Navbar, BookCard, Modal)
│   ├── pages/         # Page components (Home, Login, Register, Catalogue)
│   ├── styles/        # CSS files for styling
│   └── App.jsx        # Main app component with routing
│
6b/                     # Backend (Express + MongoDB)
├── controllers/       # Business logic
├── models/           # Database models
└── index.js          # Server entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup (6b directory)

1. Navigate to the backend directory:
   ```bash
   cd 6b
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `6b` directory:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`

### Frontend Setup (6a directory)

1. Navigate to the frontend directory:
   ```bash
   cd 6a
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### User Routes
- `POST /register` - Register a new user
- `POST /login` - Login user

### Book Routes
- `GET /books` - Get all books
- `POST /book` - Add a new book (requires authentication)

## Usage

1. **Start the Backend**: Make sure MongoDB is running and start the backend server first
2. **Start the Frontend**: Run the React development server
3. **Register/Login**: Create a new account or login with existing credentials
4. **Browse Catalogue**: Search for books by author name
5. **Add Books**: Click "Add Book" button to create new book entries

## Technologies Used

### Frontend
- React 19
- React Router DOM (for navigation)
- Vite (build tool)
- CSS3 (responsive styling)

### Backend
- Express.js
- MongoDB with Mongoose
- CORS (for cross-origin requests)
- dotenv (environment variables)

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Features Breakdown

### Home Page
- Hero section with call-to-action buttons
- Features showcase with animations
- Gradient backgrounds and hover effects

### Authentication Pages
- Clean form design with validation
- Error/success message display
- Smooth animations

### Catalogue Page
- Search functionality by author
- Grid layout for book cards
- Add book modal
- User profile display
- Logout functionality

### Navigation
- Fixed navbar with active route highlighting
- Responsive menu for mobile devices
- User authentication state display

## Color Scheme

- Primary Color: `#4a90e2` (Blue)
- Secondary Color: `#f39c12` (Orange)
- Dark Background: `#1a1a2e`
- Light Background: `#f5f5f5`

## Development

To make changes:
1. Frontend changes: Edit files in `6a/src/`
2. Backend changes: Edit files in `6b/`
3. Both servers support hot-reload during development

## Notes

- Make sure MongoDB is running before starting the backend
- The frontend expects the backend to be running on port 8000
- User sessions are managed using localStorage
- Book search filters books by author name (case-insensitive)
