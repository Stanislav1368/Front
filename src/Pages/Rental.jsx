import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { getRentals, createRental, updateRental } from "../api/rentals";
import { getBooks } from "../api/books";
import { getRenters } from "../api/renters";
import { getStatuses } from "../api/statuses";
import moment from "moment";

const { Option } = Select;

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [books, setBooks] = useState([]);
  const [renters, setRenters] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [currentRental, setCurrentRental] = useState(null);
  const [form] = Form.useForm();
  const [reviewForm] = Form.useForm();

  useEffect(() => {
    fetchRentals();
    fetchBooks();
    fetchRenters();
    fetchStatuses();
  }, []);

  const fetchRentals = async () => {
    const data = await getRentals();
    setRentals(data);
  };

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const fetchRenters = async () => {
    const data = await getRenters();
    setRenters(data);
  };

  const fetchStatuses = async () => {
    const data = await getStatuses();
    setStatuses(data);
  };

  const handleCreateRental = async (values) => {
    const newRental = {
      ...values,
      librarianId: JSON.parse(localStorage.getItem("user")).id,
    };
    const createdRental = await createRental(newRental);
    setRentals([...rentals, createdRental]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEditReview = async (values) => {
    const updatedFields = {
      review: values.review,
      id: currentRental.id,
    };
    const updatedRental = await updateRental(currentRental.id, updatedFields);
    setRentals(rentals.map((rental) => (rental.id === currentRental.id ? updatedRental : rental)));
    setIsReviewModalVisible(false);
    reviewForm.resetFields();
  };

  const columns = [
    {
      title: "Название книги",
      dataIndex: ["book", "title"],
      key: "bookTitle",
    },
    {
      title: "Автор(ы)",
      dataIndex: ["book", "authors"],
      key: "bookAuthors",
      render: (authors) =>
        authors.map((author) => `${author.firstName} ${author.lastName}`).join(", "),
    },
    {
      title: "Арендатор",
      dataIndex: "renter",
      key: "renter",
      render: (renter) => (renter ? `${renter.firstName} ${renter.lastName}` : "-"),
    },
    {
      title: "Библиотекарь",
      dataIndex: "librarian",
      key: "librarian",
      render: (librarian) => (librarian ? `${librarian.firstName} ${librarian.lastName}` : "-"),
    },
    {
      title: "Статус",
      dataIndex: ["status", "id"],
      key: "status",
      render: (statusId, record) => (
        <Select
          defaultValue={statusId}
          style={{ width: 120 }}
          onChange={(value) => handleEditStatus(record.id, value)}
        >
          {statuses.map((status) => (
            <Option key={status.id} value={status.id}>
              {status.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Дата аренды",
      dataIndex: "rentedAt",
      key: "rentedAt",
      render: (rentedAt) => (rentedAt ? moment(rentedAt).format("DD.MM.YYYY") : "-"),
    },
    {
      title: "Дата возврата",
      dataIndex: "returnedAt",
      key: "returnedAt",
      render: (returnedAt) => (returnedAt ? moment(returnedAt).format("DD.MM.YYYY") : "-"),
    },
    {
      title: "Отзыв",
      dataIndex: "review",
      key: "review",
      render: (review, record) => (
        <Button onClick={() => showReviewModal(record)}>Изменить отзыв</Button>
      ),
    },
  ];

  const handleEditStatus = async (rentalId, statusId) => {
    const updatedFields = {
      statusId: statusId,
      id: rentalId,
    };
    const updatedRental = await updateRental(rentalId, updatedFields);
    setRentals(rentals.map((rental) => (rental.id === rentalId ? updatedRental : rental)));
  };

  const showReviewModal = (rental) => {
    setCurrentRental(rental);
    reviewForm.setFieldsValue({
      review: rental.review,
    });
    setIsReviewModalVisible(true);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Создать аренду
      </Button>
      <Table dataSource={rentals} columns={columns} rowKey="id" />

      <Modal title="Создать аренду" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleCreateRental}>
          <Form.Item name="bookId" label="Книга" rules={[{ required: true }]}>
            <Select>
              {books.map((book) => (
                <Option key={book.id} value={book.id}>
                  {book.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="renterId" label="Арендатор" rules={[{ required: true }]}>
            <Select>
              {renters.map((renter) => (
                <Option key={renter.id} value={renter.id}>
                  {renter.firstName} {renter.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="statusId" label="Статус" rules={[{ required: true }]}>
            <Select>
              {statuses
                .filter((status) => status.name === "Активна" || status.name === "Забронирована")
                .map((status) => (
                  <Option key={status.id} value={status.id}>
                    {status.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="rentedAt" label="Дата аренды" rules={[{ required: true }]}>
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
          <Form.Item name="returnedAt" label="Дата возврата">
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Изменить отзыв" visible={isReviewModalVisible} onCancel={() => setIsReviewModalVisible(false)} footer={null}>
        <Form form={reviewForm} onFinish={handleEditReview}>
          <Form.Item name="review" label="Отзыв">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Изменить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Rental;