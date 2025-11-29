import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import '../styles/Catalogue.css';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState('');
  const navigate = useNavigate();

  const currentUser = localStorage.getItem('user');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchAuthor.trim()) {
      setMessage('Please enter an author name');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8000/books?username=${encodeURIComponent(searchAuthor)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setBooks(data.books);
        if (data.books.length === 0) {
          setMessage('No books found for this author');
        }
      } else {
        setMessage(data.message || 'Failed to fetch books');
        setBooks([]);
      }
    } catch (error) {
      setMessage('Error connecting to server');
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch('http://localhost:8000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookData,
          author: currentUser
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setMessage('Book added successfully!');
        setShowModal(false);
        // Refresh books if searching for current user
        if (searchAuthor.toLowerCase() === currentUser.toLowerCase()) {
          handleSearch({ preventDefault: () => {} });
        }
      } else {
        setMessage(data.message || 'Failed to add book');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <div className="header-content">
          <h1>Book Catalogue</h1>
          <div className="header-actions">
            <span className="user-welcome">Welcome, {currentUser}!</span>
            <button onClick={() => setShowModal(true)} className="btn btn-primary">
              Add Book
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search books by author name..."
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'info'}`}>
          {message}
        </div>
      )}

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        ) : (
          !isLoading && <p className="no-books">Search for books by author to see results</p>
        )}
      </div>

      {showModal && (
        <AddBookModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddBook}
        />
      )}
    </div>
  );
}

export default Catalogue;
