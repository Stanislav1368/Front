import React, { useState, useEffect } from 'react';
import { Table, Drawer, Form, Input, DatePicker, Select, Row, Col, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { Search } = Input;

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = () => {
    // Реализуйте свою логику для получения данных об аренде
    const data = [
      {
        Id: 1,
        BookId: 1,
        Book: { id: 1, title: 'Книга 1' },
        UserId: 1,
        User: { id: 1, name: 'Пользователь 1' },
        StatusId: 1,
        Status: { id: 1, name: 'В ожидании' },
        StartDate: new Date(),
        EndDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        Review: 'Отличная книга!',
      },
      {
        Id: 2,
        BookId: 2,
        Book: { id: 2, title: 'Книга 2' },
        UserId: 2,
        User: { id: 2, name: 'Пользователь 2' },
        StatusId: 2,
        Status: { id: 2, name: 'Возвращена' },
        StartDate: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
        EndDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        Review: 'Нормальная книга',
      },
    ];
    setRentals(data);
  };

  const showDrawer = (record) => {
    setSelectedRental(record);
    form.setFieldsValue({
      BookId: record.BookId,
      UserId: record.UserId,
      StatusId: record.StatusId,
      StartDate: moment(record.StartDate),
      EndDate: moment(record.EndDate),
      Review: record.Review,
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSave = () => {
    form.submit();
    setVisible(false);
  };

  const showAdvancedDrawer = () => {
    setAdvancedVisible(true);
  };

  const onAdvancedClose = () => {
    setAdvancedVisible(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredRentals = rentals.filter((rental) =>
    rental.Book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: 'ID', dataIndex: 'Id', key: 'Id' },
    { title: 'Книга', dataIndex: ['Book', 'title'], key: 'Book' },
    { title: 'Пользователь', dataIndex: ['User', 'name'], key: 'User' },
    { title: 'Статус', dataIndex: ['Status', 'name'], key: 'Status' },
    { title: 'Дата начала', dataIndex: 'StartDate', key: 'StartDate', render: (date) => moment(date).format('YYYY-MM-DD') },
    { title: 'Дата окончания', dataIndex: 'EndDate', key: 'EndDate', render: (date) => moment(date).format('YYYY-MM-DD') },
    { title: 'Отзыв', dataIndex: 'Review', key: 'Review' },
    {
      title: 'Действие',
      key: 'action',
      render: (_, record) => <a onClick={() => showDrawer(record)}>Просмотр</a>,
    },
  ];

  return (
    <div>
      <h1>Аренда</h1>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Search placeholder="Поиск аренды" onSearch={handleSearch} enterButton style={{ width: '100%' }} />
        </Col>
        <Col span={1} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={showAdvancedDrawer}>
            Расширенный поиск
          </Button>
        </Col>
      </Row>
      <Table dataSource={filteredRentals} columns={columns} />
      <Drawer
        title={selectedRental?.Book.title}
        
        placement="right"
        onClose={onClose}
        visible={visible}
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID Книги" name="BookId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="ID Пользователя" name="UserId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Статус" name="StatusId">
            <Select disabled>
              <Option value={1}>В ожидании</Option>
              <Option value={2}>Возвращена</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Дата начала" name="StartDate">
            <DatePicker format="YYYY-MM-DD" disabled />
          </Form.Item>
          <Form.Item label="Дата окончания" name="EndDate">
            <DatePicker format="YYYY-MM-DD" disabled />
          </Form.Item>
          <Form.Item label="Отзыв" name="Review">
            <Input.TextArea />
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <button onClick={onClose}>Отменить</button>
            <button onClick={handleSave}>Сохранить</button>
          </div>
        </Form>
      </Drawer>
      <Drawer
        title="Расширенный поиск"
        placement="right"
        onClose={onAdvancedClose}
        visible={advancedVisible}
        width={320}
      >
        <Form layout="vertical">
          <Form.Item label="Название книги">
            <Input placeholder="Введите название книги" />
          </Form.Item>
          <Form.Item label="Имя пользователя">
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>
          <Form.Item label="Статус">
            <Select placeholder="Выберите статус">
              <Option value={1}>В ожидании</Option>
              <Option value={2}>Возвращена</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Дата начала">
            <DatePicker format="YYYY-MM-DD" placeholder="Выберите дату начала" />
          </Form.Item>
          <Form.Item label="Дата окончания">
            <DatePicker format="YYYY-MM-DD" placeholder="Выберите дату окончания" />
          </Form.Item>
          <Button type="primary">Поиск</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Rental;
