import '../styles/BookCard.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-icon">📖</div>
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-description">{book.content}</p>
      </div>
    </div>
  );
}

export default BookCard;
