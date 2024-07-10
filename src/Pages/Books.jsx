import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Drawer, Form, Select, Switch, message, Upload, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../api/books";
import { getGenres } from "../api/genres";
import { addBook } from "../api/books";
import { BASE_URL } from "../api/config";
import { SortAscendingOutlined, SortDescendingOutlined, PlusOutlined } from "@ant-design/icons";
import { getAuthors } from "../api/authors";

const { Search } = Input;
const { Option } = Select;

const Books = () => {
  const placeholderImage = "https://vitapharm.ru/static/assets/img/catalog/no-product.jpg";
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [addBookVisible, setAddBookVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [sortIcon, setSortIcon] = useState(<SortAscendingOutlined />);
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [publicationYear, setPublicationYear] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [author, setAuthor] = useState("");
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortDirection, setSortDirection] = useState(1);
  const [newBook, setNewBook] = useState({
    title: "",
    image: null,
    publicationYear: "",
    isAvailable: true,
    authorIds: [],
    genreIds: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        const updatedBooks = data.map((book) => {
          const isInActiveRental = book.rentals.some((rental) => {
            return (
              new Date() >= new Date(rental.rentedAt) &&
              (!rental.returnedAt || new Date() <= new Date(rental.returnedAt)) &&
              rental.status.name !== "Закрыта"
            );
          });
          return { ...book, isInActiveRental };
        });
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
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

    const fetchAuthors = async () => {
      try {
        const authorsData = await getAuthors();
        setAllAuthors(authorsData);
      } catch (error) {
        message.error("Ошибка при загрузке авторов");
      }
    };

    fetchBooks();
    fetchGenres();
    fetchAuthors();
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

  const showAddBookModal = () => {
    setAddBookVisible(true);
  };

  const onAddBookClose = () => {
    setAddBookVisible(false);
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

  const handleAddBook = async () => {
    try {
      newBook.isAvailable = true;
      await addBook(newBook);
      message.success("Книга успешно добавлена");
      onAddBookClose();
      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
    } catch (error) {
      message.error("Ошибка при добавлении книги");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1>Книги</h1>
      <div style={{ margin: "0px 0px 15px 0px", display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Search placeholder="Поиск книг" onSearch={handleSearch} size="large" enterButton style={{ width: "100%" }} />
          <Button size="large" type="primary" onClick={showAdvancedDrawer}>
            Расширенный поиск
          </Button>
          <Button size="large" type="primary" onClick={handleSort}>
            {sortIcon === "SortAscendingOutlined" ? <SortAscendingOutlined /> : <SortDescendingOutlined />} Сортировать по алфавиту
          </Button>
          <Button size="large" type="primary" onClick={showAddBookModal}>
            <PlusOutlined /> Добавить книгу
          </Button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="grid-container">
          {filteredBooks.map((book) => (
            <div className="grid-item" key={book.id}>
              <Card
                title={book.title}
                bordered={true}
                onClick={() => navigate(`/books/${book.id}`)}
                style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <img
                    alt={book.title}
                    src={book.imagePath ? `${BASE_URL}${book.imagePath}` : placeholderImage}
                    style={{ maxWidth: "100%", height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p>
                    <b>Жанры:</b> {book.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p>
                    <b>Год издания:</b> {book.publicationYear ? new Date(book.publicationYear).getFullYear() : "N/A"}
                  </p>
                  <p>
                    <b>Авторы:</b> {book.authors.map((author) => `${author.firstName} ${author.lastName}`).join(", ")}
                  </p>
                  <p>
                    <b>Средняя оценка:</b> {book.averageRating.toFixed(1)}
                  </p>
                  {book.isInActiveRental && <p style={{ color: "red", fontWeight: "bold" }}>В АРЕНДЕ</p>}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Drawer title="Расширенный поиск" placement="right" onClose={onAdvancedClose} visible={advancedVisible} width={400}>
        <Form layout="vertical" hideRequiredMark>
          <Form.Item name="author" label="Автор">
            <Input placeholder="Введите имя автора" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Item>

          <Form.Item name="genres" label="Жанры">
            <Select mode="multiple" placeholder="Выберите жанры" value={genres} onChange={(values) => setGenres(values)} style={{ width: "100%" }}>
              {allGenres.map((genre) => (
                <Option key={genre.id}>{genre.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="publicationYear" label="Год издания">
            <Input placeholder="Введите год" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
          </Form.Item>

          <Form.Item name="availability" label="Доступность">
            <Select placeholder="Выберите доступность" value={isAvailable} onChange={(value) => setIsAvailable(value)} style={{ width: "100%" }}>
              <Option value={true}>Доступно</Option>
              <Option value={false}>Не доступно</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item>
            <Switch checked={isAdvancedSearchActive} onChange={(checked) => setIsAdvancedSearchActive(checked)} /> Активировать расширенный поиск
          </Form.Item> */}
          <Button type="primary" onClick={() => setIsAdvancedSearchActive(true)}>
            Применить
          </Button>
        </Form>
      </Drawer>
      <Modal title="Добавить книгу" visible={addBookVisible} onOk={handleAddBook} onCancel={onAddBookClose}>
        <Form layout="vertical">
          <Form.Item label="Название книги">
            <Input placeholder="Введите название книги" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
          </Form.Item>
          <Form.Item label="Год издания">
            <Input
              placeholder="Введите год издания"
              value={newBook.publicationYear}
              onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Авторы">
            <Select
              mode="multiple"
              placeholder="Выберите авторов"
              value={newBook.authorIds}
              onChange={(values) => setNewBook({ ...newBook, authorIds: values })}
              style={{ width: "100%" }}>
              {allAuthors.map((author) => (
                <Option key={author.id}>{`${author.firstName} ${author.lastName}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Жанры">
            <Select
              mode="multiple"
              placeholder="Выберите жанры"
              value={newBook.genreIds}
              onChange={(values) => setNewBook({ ...newBook, genreIds: values })}
              style={{ width: "100%" }}>
              {allGenres.map((genre) => (
                <Option key={genre.id}>{genre.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Изображение">
            <Upload
              accept="image/*"
              beforeUpload={(file) => {
                setNewBook({ ...newBook, image: file });
                return false;
              }}
              fileList={newBook.image ? [newBook.image] : []}>
              <Button>Выберите файл</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Books;
