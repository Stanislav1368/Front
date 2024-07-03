import React, { useState, useEffect } from 'react';
import { Table, Drawer, Form, Input, Row, Col, Button } from 'antd';
import moment from 'moment';

const Rentors = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // Реализуйте свою логику для получения данных о пользователях
    const data = [
      {
        Id: 1,
        Name: 'Иван',
        Surname: 'Иванов',
        Patronymic: 'Иванович',
        Address: 'ул. Пушкина, д. 10, кв. 5',
        ContactNumber: '+7 (123) 456-78-90',
        Rentals: [
          {
            Id: 1,
            BookId: 1,
            Book: { id: 1, title: 'Книга 1' },
            UserId: 1,
            StatusId: 1,
            Status: { id: 1, name: 'В ожидании' },
            StartDate: new Date(),
            EndDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            Review: 'Отличная книга!',
          },
          
        ],
      },
      {
        Id: 2,
        Name: 'Петр',
        Surname: 'Петров',
        Patronymic: 'Петрович',
        Address: 'ул. Ленина, д. 20, кв. 15',
        ContactNumber: '+7 (987) 654-32-10',
        Rentals: [
          {
            Id: 3,
            BookId: 3,
            Book: { id: 3, title: 'Книга 3' },
            UserId: 2,
            StatusId: 1,
            Status: { id: 1, name: 'В ожидании' },
            StartDate: new Date(),
            EndDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
            Review: 'Интересная книга',
          },
        ],
      },
    ];
    setUsers(data);
  };

  const showDrawer = (record) => {
    setSelectedUser(record);
    form.setFieldsValue({
      Name: record.Name,
      Surname: record.Surname,
      Patronymic: record.Patronymic,
      Address: record.Address,
      ContactNumber: record.ContactNumber,
      Rentals: record.Rentals,
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.Name} ${user.Surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: 'ID', dataIndex: 'Id', key: 'Id' },
    { title: 'Имя', dataIndex: 'Name', key: 'Name' },
    { title: 'Фамилия', dataIndex: 'Surname', key: 'Surname' },
    { title: 'Отчество', dataIndex: 'Patronymic', key: 'Patronymic' },
    { title: 'Адрес', dataIndex: 'Address', key: 'Address' },
    { title: 'Контактный номер', dataIndex: 'ContactNumber', key: 'ContactNumber' },
    
    {
      title: 'Действие',
      key: 'action',
      render: (_, record) => <a onClick={() => showDrawer(record)}>Просмотр</a>,
    },
  ];

  return (
    <div>
      <h1>Клиенты</h1>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input.Search
            placeholder="Поиск клиентов"
            onSearch={handleSearch}
            enterButton
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Table dataSource={filteredUsers} columns={columns} />
      <Drawer
        title={`${selectedUser?.Name} ${selectedUser?.Surname} ${selectedUser?.Patronymic}`}
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Имя" name="Name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Фамилия" name="Surname">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Отчество" name="Patronymic">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Адрес" name="Address">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Контактный номер" name="ContactNumber">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Аренды" name="Rentals">
            <div>
              {selectedUser?.Rentals?.map((rental) => (
                <div key={rental.Id}>
                  <p>Книга: {rental.Book.title}</p>
                  <p>Статус: {rental.Status.name}</p>
                  <p>Дата начала: {moment(rental.StartDate).format('YYYY-MM-DD')}</p>
                  <p>Дата окончания: {moment(rental.EndDate).format('YYYY-MM-DD')}</p>
                  <p>Отзыв: {rental.Review}</p>
                </div>
              ))}
            </div>
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <button onClick={onClose}>Закрыть</button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default Rentors;

