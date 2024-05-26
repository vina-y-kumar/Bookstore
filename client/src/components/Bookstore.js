import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BookList from './BookList';

const Bookstore = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${updatedBook.id}`, updatedBook);
      setBooks(books.map(book => (book.id === updatedBook.id ? response.data : book)));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter(book => book.cid !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-5" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingBottom:"50px",paddingTop:"30px"}}>
      <h1 className="text-center mb-4">Bookstore</h1>
      {/* <BookForm addBook={addBook} /> */}
      <BookList books={books} updateBook={updateBook} deleteBook={deleteBook} />
    </div>
  );
};

export default Bookstore;
