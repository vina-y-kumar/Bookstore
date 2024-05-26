import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* <h1>Bookstore</h1> */}
      <Link to="/add-book" style={{marginLeft:"85%"}} className="btn btn-primary mb-3">Add Book</Link>
      <ul className="list-group">
        {books.map(book => (
          <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
            <Link to={`/book/${book._id}`} className="text-decoration-none">{book.title}</Link> By {book.author}
            </span>
            {/* <button className="btn btn-primary" onClick={() => deleteBook(book._id)}>View</button> */}
            <button className="btn btn-danger" onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
