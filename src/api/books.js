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
