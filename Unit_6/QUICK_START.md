# 🚀 Quick Start Guide - BookStore Application

## Prerequisites Check
✅ Node.js installed (v14+)
✅ MongoDB installed and running
✅ npm installed

---

## 🏃 Fast Setup (3 Steps)

### Step 1: Configure Backend Environment
Create `.env` file in `6b/` directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/bookstore
```

### Step 2: Start Backend Server
```powershell
cd 6b
npm install
npm start
```
✅ Backend running at: http://localhost:8000

### Step 3: Start Frontend Application
Open a **NEW** terminal:
```powershell
cd 6a
npm install
npm run dev
```
✅ Frontend running at: http://localhost:5173

---

## 🎯 Test the Application

1. **Open Browser**: Navigate to `http://localhost:5173`

2. **Register New User**:
   - Click "Register" in navbar
   - Enter username: `john`
   - Enter password: `password123`
   - Click "Register"

3. **Login**:
   - Click "Login here" link
   - Enter same credentials
   - Click "Login"

4. **Add a Book**:
   - Click "Add Book" button
   - Title: `The Great Gatsby`
   - Description: `A classic American novel about the Jazz Age`
   - Click "Add Book"

5. **Search Books**:
   - Enter author name: `john` (your username)
   - Click "Search"
   - Your book should appear!

---

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with features |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Catalogue | `/catalogue` | Browse and add books |

---

## 🔧 Troubleshooting

### Backend won't start?
- Check if MongoDB is running: `mongod`
- Verify PORT is not in use
- Check `.env` file exists in `6b/` directory

### Frontend can't connect to backend?
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify CORS is enabled in backend (`6b/index.js`)

### Books not showing?
- Make sure you're logged in
- Search by the author's username (the person who added the book)
- Check backend terminal for errors

---

## 🎨 Features to Try

✨ **Responsive Design**: Resize your browser window to see mobile view
✨ **Animations**: Hover over book cards and buttons
✨ **Search**: Find books by author name
✨ **Modal**: Click "Add Book" to see the modal popup
✨ **Navigation**: Click through all pages using the navbar

---

## 📊 Database Structure

### Users Collection:
```javascript
{
  username: String,
  password: String
}
```

### Books Collection:
```javascript
{
  title: String,
  author: String,  // Username of creator
  content: String  // Description
}
```

---

## 🌐 API Testing (Optional)

Use Postman or curl to test endpoints:

**Register User:**
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

**Get Books:**
```bash
curl "http://localhost:8000/books?username=testuser"
```

**Add Book:**
```bash
curl -X POST http://localhost:8000/book \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My Book\",\"author\":\"testuser\",\"content\":\"Description\"}"
```

---

## 🎓 Project Structure Reference

```
6a/ (Frontend - React)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── BookCard.jsx         # Individual book display
│   │   └── AddBookModal.jsx     # Add book popup
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login form
│   │   ├── Register.jsx        # Registration form
│   │   └── Catalogue.jsx       # Books listing
│   ├── styles/                 # CSS files
│   └── App.jsx                 # Main app with routing

6b/ (Backend - Express)
├── controllers/
│   ├── user_controllers.js     # User auth logic
│   └── book_controllers.js     # Book CRUD logic
├── models/
│   ├── user_model.js           # User schema
│   └── book_model.js           # Book schema
├── middlewares/
│   └── connection.js           # MongoDB connection
└── index.js                    # Server entry point
```

---

## 💡 Next Steps

- ✅ Application is running
- 🔍 Explore all pages
- 📚 Add multiple books
- 👥 Register multiple users
- 🔎 Search for different authors

**Enjoy your BookStore application!** 📚✨
