import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedDate: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/books', formData);
      alert('Book added successfully!');
      // Optionally redirect to the book list page or clear the form
      setFormData({
        title: '',
        author: '',
        publishedDate: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{paddingBottom:"50px"}}>
      <h1 style={{textAlign:"center"}}>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="publishedDate" className="form-label">Published Date</label>
          <input type="date" className="form-control" id="publishedDate" name="publishedDate" value={formData.publishedDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <button style={{marginLeft:"45%"}} type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
