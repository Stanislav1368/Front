import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Button, Drawer, Form, Select, Switch } from 'antd';
import { getBooks } from '../api/books';
const { Search } = Input;
const { Option } = Select;
const Books = () => {
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  
  const [genres, setGenres] = useState([]);
  const [publicationYear, setPublicationYear] = useState(null);
  const onAdvancedSearch = () => {
    setIsAdvancedSearchActive(true);
    onAdvancedClose();
  };
  const onPublicationYearChange = (value) => {
    if (value === '') {
      setPublicationYear(null);
    } else {
      setPublicationYear(value);
    }
  };
  const [isAvailable, setIsAvailable] = useState(null);
  const onAvailabilityChange = (checked) => {
    setIsAvailable(checked);
  };
  const onAuthorChange = (value) => {
    setAuthor(value);
    setIsAdvancedSearchActive(false);
  };
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
  const [author, setAuthor] = useState('');
  const onGenreChange = (values) => {
    setGenres(values);
  };
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortDirection, setSortDirection] = useState(1); // 1 for ascending, -1 for descending



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
  const filtered = books.filter((book) => {
    const genreMatch = isAdvancedSearchActive ? (genres.length === 0 || book.genres.some(g => genres.includes(g.name))) : true;
    const yearMatch = isAdvancedSearchActive
      ? (publicationYear === null || new Date(book.publicationYear).getFullYear() === Number(publicationYear))
      : true;
    const availabilityMatch = isAdvancedSearchActive ? (isAvailable === null || book.isAvailable === isAvailable) : true;
    const authorMatch = isAdvancedSearchActive ? (author === '' || book.authors.some(a => `${a.firstName} ${a.lastName}`.toLowerCase().includes(author.toLowerCase()))) : true;
    const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return genreMatch && yearMatch && availabilityMatch && authorMatch && titleMatch;
  });
  setFilteredBooks(filtered);
}, [books, genres, publicationYear, isAvailable, author, searchTerm, isAdvancedSearchActive]);

  

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
      a.title.localeCompare(b.title) * sortDirection
    );
    setBooks(sortedBooks);
    setSortDirection(sortDirection * -1);
  };

  const filteredData = [...books].filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) =>
    a.title.localeCompare(b.title) * sortDirection
  );

  return (

    <div style={{ width: '100%' }}>
      <h1>Книги</h1>
      <Row>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem' }}>
          <div style={{ maxWidth: '800px' }}>
            <Search
              placeholder="Поиск книг"
              onSearch={handleSearch}
              size='large'
              enterButton
              style={{ width: '100%', fontSize: '40px' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Button style={{ margin: '0px 5px' }} size='large' type="primary" onClick={showAdvancedDrawer}>
              
              Расширенный поиск
            </Button>
            <Button style={{ margin: '0px 5px' }} size='large' type="primary" onClick={handleSort}>
              Сортировать по алфавиту
            </Button>
          </div>
        </div>
      </Row>
      <div>
        <h1></h1>
        <Row gutter={12}>
          {filteredBooks.map((book) => (
            <Col span={32} key={book.id}>
              <Card title={book.title} bordered={true}>
                <img src={book.imageUrl} width={200}></img>
                <p>
                  <b>Genre:</b> {book.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <b>Publication Year:</b> {book.publicationYear ? new Date(book.publicationYear).getFullYear() : "N/A"}
                </p>
                <p>
                  <b>Available:</b> {book.isAvailable ? "Yes" : "No"}
                </p>
                <p>
                  <b>Author:</b> {book.authors.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Drawer
        title="Расширенный поиск"
        placement="right"
        onClose={onAdvancedClose}
        visible={advancedVisible}
        width={280}
      >
        <Form layout="vertical">
          <Form.Item label="Жанр">
            <Select
              mode="multiple"
              placeholder="Выберите жанр"
              value={genres}
              onChange={onGenreChange}
            >
              <Option value="Триллер">Триллер</Option>
              <Option value="Жанр 2">Жанр 2</Option>
              <Option value="Жанр 3">Жанр 3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Год издания">
            <Input
              placeholder="Введите год издания"
              value={publicationYear}
              onChange={(e) => onPublicationYearChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Доступность">
            <Switch
              checked={isAvailable}
              onChange={onAvailabilityChange}
            />
          </Form.Item>
          <Form.Item label="Автор">
            <Input
              placeholder="Введите имя автора"
              value={author}
              onChange={(e) => onAuthorChange(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" onClick={onAdvancedSearch}>Поиск</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Books;
