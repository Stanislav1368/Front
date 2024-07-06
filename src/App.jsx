import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Rentors from "./pages/Rentors";
import Rental from "./pages/Rental";
import Books from "./pages/Books";
import LibrarianAuth from "./pages/LibrarianAuth";
import ZoomController from './components/ZoomController';
import ReadingMode from './components/ReadingMode';

const { Content } = Layout;

const PrivateRoute = ({ element }) => {
  const user = localStorage.getItem("user");
  return user ? element : <Navigate to="/login" />;
};

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Страница не найдена.</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LibrarianAuth />} />
          <Route
            path="*"
            element={
              <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Content style={{ padding: "0 15px" }}>
                  <Routes>
                    <Route path="/books" element={<PrivateRoute element={<Books />} />} />
                    <Route path="/rental" element={<PrivateRoute element={<Rental />} />} />
                    <Route path="/rentors" element={<PrivateRoute element={<Rentors />} />} />
                    <Route path="*" element={<NotFound />} /> {/* Добавленный маршрут */}
                  </Routes>
                </Content>
              </Layout>
            }
          />
        </Routes>
      </Router>
      <ZoomController />
     
    </div>
  );
};

export default App;
