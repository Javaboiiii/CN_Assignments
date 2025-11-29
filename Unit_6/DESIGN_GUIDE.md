# BookStore Application - Page Descriptions

## 1. Home Page (`/`)
**Layout:**
- **Navigation Bar** (Fixed at top)
  - Logo: "📚 BookStore" (left)
  - Menu items: Home, Catalogue, Login, Register (right)
  
- **Hero Section** (Gradient blue to purple background)
  - Large title: "Welcome to BookStore"
  - Subtitle: "Discover your next favorite book"
  - Two buttons: "Browse Books" (blue) and "Get Started" (orange)
  
- **Features Section** (3 cards in a row)
  1. 📚 Vast Collection - "Browse through thousands of books across all genres"
  2. 🎯 Easy to Find - "Search and filter books by author, title, or genre"
  3. 💡 Author Portal - "Authors can share their works with readers worldwide"

**Responsive:**
- Desktop: 3 feature cards in a row
- Mobile: Stacked vertically

---

## 2. Login Page (`/login`)
**Layout:**
- Centered white card on light gray background
- **Form elements:**
  - Title: "Login to BookStore"
  - Username input field
  - Password input field
  - Login button (full width, blue)
  - Footer text: "Don't have an account? Register here" (with link)

**Features:**
- Shows success message in green
- Shows error message in red
- Loading state during authentication
- Redirects to Catalogue on successful login

---

## 3. Registration Page (`/register`)
**Layout:**
- Similar card design to Login page
- **Form elements:**
  - Title: "Register for BookStore"
  - Username input field
  - Password input field
  - Confirm Password input field
  - Register button (full width, blue)
  - Footer text: "Already have an account? Login here" (with link)

**Features:**
- Password matching validation
- Success/error messages
- Redirects to Login after successful registration

---

## 4. Catalogue Page (`/catalogue`)
**Layout:**
- **Header Section** (White card)
  - Left: "Book Catalogue" title
  - Right: "Welcome, [username]!", "Add Book" button, "Logout" button

- **Search Section** (White card)
  - Search input: "Search books by author name..."
  - Blue "Search" button

- **Books Grid**
  - Responsive grid of book cards (3 columns on desktop, 1 on mobile)
  - Each card shows:
    - 📖 Book icon (gradient background)
    - Book title (large, bold)
    - Author name (blue, italic)
    - Book description (gray text, 3 lines max)

**Modal for Adding Books:**
- Overlay with centered modal
- Form fields:
  - Book Title input
  - Description textarea
  - Cancel button (orange)
  - Add Book button (blue)

**Features:**
- Search books by author
- Add new books (auto-assigns to logged-in user)
- Hover effects on cards (lift up animation)
- Protected route (requires login)

---

## Design System

### Colors:
- **Primary Blue**: `#4a90e2` (buttons, links)
- **Secondary Orange**: `#f39c12` (secondary actions)
- **Dark Navy**: `#1a1a2e` (navbar background)
- **Light Gray**: `#f5f5f5` (page background)
- **White**: `#ffffff` (cards, modals)
- **Success Green**: `#27ae60` (success messages)
- **Error Red**: `#e74c3c` (error messages)

### Typography:
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Heading sizes: 2rem - 3.5rem
- Body text: 1rem
- Line height: 1.6

### Spacing:
- Card padding: 40px (desktop), 20px (mobile)
- Button padding: 12px 24px
- Grid gap: 25px
- Border radius: 8px - 16px

### Animations:
- Fade in/out for page loads
- Slide up for cards
- Transform on hover (translateY, scale)
- Smooth transitions (0.3s ease)

### Responsive Breakpoints:
- Desktop: > 768px
- Tablet: 480px - 768px
- Mobile: < 480px

---

## User Flow

1. **New User:**
   - Home → Register → Login → Catalogue → Search/Add Books

2. **Returning User:**
   - Home → Login → Catalogue → Search/Add Books

3. **Guest User:**
   - Home → Browse features → Click "Get Started" → Login/Register

---

## Authentication Flow

- Login stores username in `localStorage`
- Catalogue checks for logged-in user
- Redirects to login if not authenticated
- Logout clears `localStorage` and redirects to login

---

## API Integration

### Frontend → Backend Communication:
- Base URL: `http://localhost:8000`
- Endpoints used:
  - `POST /register` - New user registration
  - `POST /login` - User authentication
  - `GET /books?username=[author]` - Search books by author
  - `POST /book` - Add new book (with author as current user)

### Data Flow:
1. User enters credentials → Frontend validates → API call
2. Backend processes → MongoDB query → Response
3. Frontend receives response → Update UI → Show message/redirect
