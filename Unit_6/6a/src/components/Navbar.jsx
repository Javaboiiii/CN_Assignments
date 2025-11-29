import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const currentUser = localStorage.getItem('user');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 BookStore
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/catalogue" 
              className={`nav-link ${location.pathname === '/catalogue' ? 'active' : ''}`}
            >
              Catalogue
            </Link>
          </li>
          {!currentUser ? (
            <>
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/register" 
                  className={`nav-link btn-nav ${location.pathname === '/register' ? 'active' : ''}`}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <span className="nav-user">👤 {currentUser}</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
