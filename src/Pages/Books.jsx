import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Drawer, Form, Select, Switch, message, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../api/books";
import { getGenres } from "../api/genres"; // Импортируйте функцию getGenres
import { BASE_URL } from "../api/config";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const Books = () => {
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [sortIcon, setSortIcon] = useState(<SortAscendingOutlined />);
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]); // Добавьте состояние для всех жанров
  const [publicationYear, setPublicationYear] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [author, setAuthor] = useState("");
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortDirection, setSortDirection] = useState(1); // 1 for ascending, -1 for descending

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        message.error("Ошибка при загрузке книг");
      }
    };

    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setAllGenres(genresData);
      } catch (error) {
        message.error("Ошибка при загрузке жанров");
      }
    };

    fetchBooks();
    fetchGenres();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const genreMatch = isAdvancedSearchActive ? genres.length === 0 || book.genres.some((g) => genres.includes(g.name)) : true;
      const yearMatch = isAdvancedSearchActive
        ? publicationYear === null || new Date(book.publicationYear).getFullYear() === Number(publicationYear)
        : true;
      const availabilityMatch = isAdvancedSearchActive ? isAvailable === null || book.isAvailable === isAvailable : true;
      const authorMatch = isAdvancedSearchActive
        ? author === "" || book.authors.some((a) => `${a.firstName} ${a.lastName}`.toLowerCase().includes(author.toLowerCase()))
        : true;
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
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title) * sortDirection);
    setBooks(sortedBooks);
    setSortDirection(sortDirection * -1);
    setSortIcon(sortIcon === "SortAscendingOutlined" ? "SortDescendingOutlined" : "SortAscendingOutlined");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1>Книги</h1>
      <div style={{ margin: "0px 0px 15px 0px", display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
      <Flex style={{gap: "10px"}}>
          <Search placeholder="Поиск книг" onSearch={handleSearch} size="large" enterButton style={{ width: "100%", fontSize: "40px" }} />

          <Button size="large" type="primary" onClick={showAdvancedDrawer}>
            Расширенный поиск
          </Button>

          <Button  size="large" type="primary" onClick={handleSort}>
            {sortIcon === "SortAscendingOutlined" ? <SortAscendingOutlined /> : <SortDescendingOutlined />} Сортировать по алфавиту
          </Button>
        </Flex>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Row gutter={12}>
          {filteredBooks.map((book) => (
            <Col span={32} key={book.id}>
              <Card title={book.title} bordered={true} onClick={() => navigate(`/books/${book.id}`)}>
                {book.imagePath && <img alt={book.title} src={`${BASE_URL}${book.imagePath}`} width={200} />}
                <p>
                  <b>Жанры:</b> {book.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <b>Год издания:</b> {book.publicationYear ? new Date(book.publicationYear).getFullYear() : "N/A"}
                </p>
                <p>
                  <b>Доступно:</b> {book.isAvailable ? "Да" : "Нет"}
                </p>
                <p>
                  <b>Авторы:</b> {book.authors.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
                </p>
                <p>
                  <b>Средняя оценка:</b> {book.averageRating.toFixed(1)}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Drawer title="Расширенный поиск" placement="right" onClose={onAdvancedClose} visible={advancedVisible} width={720}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="author" label="Автор">
                <Input placeholder="Введите имя автора" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="publicationYear" label="Год публикации">
                <Input placeholder="Введите год публикации" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="genres" label="Жанры">
                <Select mode="multiple" placeholder="Выберите жанры" value={genres} onChange={(value) => setGenres(value)} style={{ width: "100%" }}>
                  {allGenres.map((genre) => (
                    <Option key={genre.id} value={genre.name}>
                      {genre.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isAvailable" label="Доступность">
                <Switch
                  checkedChildren="Доступно"
                  unCheckedChildren="Недоступно"
                  checked={isAvailable}
                  onChange={(checked) => setIsAvailable(checked)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  setIsAdvancedSearchActive(true);
                  setAdvancedVisible(false);
                }}>
                Применить фильтры
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Books;