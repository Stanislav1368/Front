// src/api/books.js

import axios from 'axios';
import { BASE_URL } from './config';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (bookData) => {
  const formData = new FormData();
  formData.append("Title", bookData.title);
  formData.append("Image", bookData.image);
  formData.append("PublicationYear", bookData.publicationYear);
  formData.append("IsAvailable", bookData.isAvailable);
  bookData.authorIds.forEach(id => formData.append("AuthorIds", id));
  bookData.genreIds.forEach(id => formData.append("GenreIds", id));
  
  const response = await axios.post(`${BASE_URL}/api/Books`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const addRating = async (bookId, ratingValue, renterId) => {
  console.log(bookId, ratingValue, renterId)
  try {
    const response = await axios.post(`${BASE_URL}/api/Books/${bookId}/addRating`, {
      ratingValue,
      renterId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

export const addComment = async (bookId, commentText, renterId) => {
  const response = await axios.post(`${BASE_URL}/api/Books/${bookId}/addComment`, {
    commentText,
    renterId,
  });
  return response.data;
};
