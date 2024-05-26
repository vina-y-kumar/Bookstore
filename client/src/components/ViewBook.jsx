import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const updateBook = async () => {
    const newTitle = prompt('Enter new title:', book.title);
    const newAuthor = prompt('Enter new author:', book.author);
    const newPublishedDate = prompt('Enter new published date:', book.publishedDate);
    const newDescription = prompt('Enter new description:', book.description);
    const newImage = prompt('Enter new image URL:', book.image);

    if (newTitle && newAuthor && newPublishedDate && newDescription && newImage) {
      try {
        await axios.put(`http://localhost:5000/api/books/${id}`, {
          title: newTitle,
          author: newAuthor,
          publishedDate: newPublishedDate,
          description: newDescription,
          image: newImage,
        });
        alert('Book updated successfully!');
        // Refresh the book details after update
        // fetchBook();
      } catch (error) {
        console.error('Error updating book:', error);
        alert('Error updating book. Please try again.');
      }
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", paddingBottom:"20px",paddingTop:"20px"}}>
      <h1 style={{textAlign:"center"}}>{book.title}</h1>
      <span style={{float:"right", marginRight:"30px"}}>
      <img src={book.image} alt={book.title} className="img-fluid mb-4" style={{height:"150px", width:"150px", borderRadius:"5px", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}} />

      </span>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Date:</strong> {new Date(book.publishedDate).toDateString()}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <button style={{marginLeft:"45%"}} className="btn btn-primary" onClick={updateBook}>Update Book</button>
    </div>
  );
};

export default ViewBook;
