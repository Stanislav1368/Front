import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Button, Drawer, Form, Select, Switch } from 'antd';

const { Search } = Input;
const { Option } = Select;

const Books = () => {
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [sortDirection, setSortDirection] = useState(1); // 1 for ascending, -1 for descending

  useEffect(() => {
    setBooks([
      {
        id: 1,
        name: 'Война и мир',
        genre: 'Триллер',
        publicationYear: 2021,
        isAvailable: true,
        author: 'Л. В. Толстой',
        imageUrl: 'src/images/cover.webp',
      },
      {
        id: 2,
        name: 'Анна Каренина',
        genre: 'Романтика',
        publicationYear: 2020,
        isAvailable: false,
        author: 'Л. В. Толстой',
        imageUrl: 'src/images/anna.webp',
      },
      {
        id: 3,
        name: 'Нос',
        genre: 'Жанр 3',
        publicationYear: 2019,
        isAvailable: true,
        author: 'Н. В. Гоголь',
        imageUrl: 'src/images/nos.webp',
      },
      {
        id: 4,
        name: 'Нос1',
        genre: 'Жанр 3',
        publicationYear: 2019,
        isAvailable: true,
        author: 'Н. В. Гоголь',
        imageUrl: 'src/images/nos.webp',
      },
      {
        id: 5,
        name: 'Нос1',
        genre: 'Жанр 3',
        publicationYear: 2019,
        isAvailable: true,
        author: 'Н. В. Гоголь',
        imageUrl: 'src/images/nos.webp',
      },
      
     
    ]);
  }, []);

  const showAdvancedDrawer = () => {
    setAdvancedVisible(true);
  };

  const onAdvancedClose = () => {
    setAdvancedVisible(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) =>
      a.name.localeCompare(b.name) * sortDirection
    );
    setBooks(sortedBooks);
    setSortDirection(sortDirection * -1);
  };

  const filteredData = [...books].filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) =>
    a.name.localeCompare(b.name) * sortDirection
  );

  return (
    <div>
      <h1>Книги</h1>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={10}>
        <div style={{ maxWidth: '600px' }}>
            <Search
              placeholder="Поиск книг"
              onSearch={handleSearch}
              enterButton
              style={{ width: '100%' }}
            />
          </div>
        </Col>
        <Col span={7} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={showAdvancedDrawer}>
            Расширенный поиск
          </Button>
        </Col>
        <Col span={5} style={{ textAlign: "left" }}>
          <Button type="primary" onClick={handleSort}>
            Сортировать по алфавиту
          </Button>
        </Col>
      </Row>
      <Row gutter={12}>
        {sortedData.map((book) => (
          <Col span={32} key={book.id}>
            
            <Card title={<>{book.name + ", "}<br />{book.author}</>} 
            bordered={true} style={{ height: '500px'}}>
              
              <img src={book.imageUrl} width={250}></img>
              
              {/* <p>
                <b>Жанр:</b> {book.genre}
              </p>
              <p>
                <b>Год издания:</b> {book.publicationYear}
              </p>
              <p>
                <b>Доступность:</b> {book.isAvailable ? 'Да' : 'Нет'}
              </p>
              <p>
                <b>Автор:</b> {book.author}
              </p> */}
            </Card>
          </Col>
        ))}
      </Row>
      <Drawer
        title="Расширенный поиск"
        placement="right"
        onClose={onAdvancedClose}
        visible={advancedVisible}
        width={220}
      >
        
        <Form layout="vertical">
          <Form.Item label="Жанр">
            <Select placeholder="Выберите жанр">
              <Option value="Триллер">Триллер</Option>
              <Option value="Жанр 2">Жанр 2</Option>
              <Option value="Жанр 3">Жанр 3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Год издания">
            <Input placeholder="Введите год издания" />
          </Form.Item>
          <Form.Item label="Доступность">
            <Switch />
          </Form.Item>
          <Form.Item label="Автор">
            <Input placeholder="Введите имя автора" />
          </Form.Item>
          <Button type="primary">Поиск</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Books;
