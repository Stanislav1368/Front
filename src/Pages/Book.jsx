// src/pages/Book.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Rate, Button, message, List, Input, Form, Avatar } from "antd";
import { getBookById, addRating, addComment } from "../api/books";

const { TextArea } = Input;

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const renterId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        console.log(data);
        setBook(data);
        if (renterId) {
          const rating = data.ratings.find((r) => r.renterId === renterId);
          if (rating) {
            setUserRating(rating.ratingValue);
          }
        }
        setLoading(false);
      } catch (error) {
        message.error("Ошибка при загрузке данных о книге");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, renterId]);

  const handleRatingChange = async (value) => {
    console.log(id, value, renterId);
    try {
      await addRating(id, value, renterId);
      setUserRating(value);
      message.success("Ваша оценка была успешно добавлена");
      const updatedBook = await getBookById(id);
      setBook(updatedBook);
    } catch (error) {
      message.error("Ошибка при добавлении оценки");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      message.error("Комментарий не может быть пустым");
      return;
    }
    console.log(id, commentText, renterId);
    try {
      await addComment(id, commentText, renterId);
      message.success("Ваш комментарий был успешно добавлен");
      const updatedBook = await getBookById(id);
      setBook(updatedBook);
      setCommentText("");
    } catch (error) {
      message.error("Ошибка при добавлении комментария");
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!book) {
    return <p>Книга не найдена</p>;
  }

  return (
    <Card title={book.title}>
      <p>
        <b>Год издания:</b> {book.publicationYear}
      </p>
      <p>
        <b>Доступно:</b> {book.isAvailable ? "Да" : "Нет"}
      </p>
      <p>
        <b>Авторы:</b> {book.authors.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
      </p>
      <p>
        <b>Жанры:</b> {book.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <b>Средняя оценка:</b> {book.averageRating.toFixed(1)}
      </p>
      <p>
        <b>Ваш рейтинг:</b>
      </p>
      <Rate allowHalf value={userRating} onChange={handleRatingChange} />
      <p>
        <b>Комментарии:</b>
      </p>
      <List
        dataSource={book.comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{comment.renter.firstName.charAt(0)}{comment.renter.lastName.charAt(0)}</Avatar>}
              title={`${comment.renter.firstName} ${comment.renter.lastName}`}
              description={
                <div>
                  <p>{comment.commentText}</p>
                  <span style={{ color: 'gray' }}>{new Date(comment.commentedAt).toLocaleString()}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Form onFinish={handleCommentSubmit}>
        <Form.Item>
          <TextArea rows={4} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить комментарий
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Book;
