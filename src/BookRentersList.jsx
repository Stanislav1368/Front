import React, { useState } from 'react';
import { Layout, Menu, Input, Drawer, Button, Modal, Card, Form, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const App = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showModal = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Rented book:', selectedBook, 'Client ID:', values.clientId);
  };

  const books = [
    { id: 1, title: 'Book 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Book 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Book 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Book 4', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Layout>
      <Sider>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Rented Books</Menu.Item>
          <Menu.Item key="3">Users</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Search placeholder="Search books" style={{ width: 300 }} />
          <Button type="primary" onClick={showDrawer}>
            Advanced Search
          </Button>
        </Header>
        <Content style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {books.map((book) => (
              <Card
                key={book.id}
                hoverable
                cover={<img alt={book.title} src={book.image} />}
                onClick={() => showModal(book)}
              >
                <Card.Meta title={book.title} />
              </Card>
            ))}
          </div>
        </Content>
      </Layout>

      <Drawer
        title="Advanced Search"
        placement="right"
        onClose={onClose}
        visible={visible}
        key="right"
      >
        {/* Advanced search form */}
      </Drawer>

      <Modal
        title={selectedBook?.title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: 'flex' }}>
          <img src={selectedBook?.image} alt={selectedBook?.title} style={{ marginRight: '16px' }} />
          <Form form={form} onFinish={onFinish}>
            <Form.Item label="Client ID" name="clientId" rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Rent
            </Button>
          </Form>
        </div>
      </Modal>
    </Layout>
  );
};

export default App;