import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to BookStore</h1>
        <p className="hero-subtitle">Discover your next favorite book</p>
        <div className="hero-buttons">
          <Link to="/catalogue" className="btn btn-primary">
            Browse Books
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Get Started
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Vast Collection</h3>
          <p>Browse through thousands of books across all genres</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Easy to Find</h3>
          <p>Search and filter books by author, title, or genre</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Author Portal</h3>
          <p>Authors can share their works with readers worldwide</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
