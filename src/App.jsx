import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Renters from "./pages/Renters";
import Rental from "./pages/Rental";
import Books from "./pages/Books";
import ZoomController from "./components/ZoomController";
import ReadingMode from "./components/ReadingMode";
import Login from "./pages/Login";

const { Content } = Layout;

const PrivateRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes("renter") && user.isRenter) {
    return element;
  }

  if (allowedRoles.includes("librarian") && !user.isRenter) {
    return element;
  }

  return <Navigate to="/books" />;
};

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
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
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Content style={{ padding: "0 15px" }}>
                  <Routes>
                    <Route path="/" element={<PrivateRoute element={<Navigate to="/books" />} allowedRoles={["renter", "librarian"]} />} />
                    <Route path="/books" element={<PrivateRoute element={<Books />} allowedRoles={["renter", "librarian"]} />} />
                    <Route path="/rental" element={<PrivateRoute element={<Rental />} allowedRoles={["librarian"]} />} />
                    <Route path="/renters" element={<PrivateRoute element={<Renters />} allowedRoles={["librarian"]} />} />
                    <Route path="*" element={<NotFound />} />
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
