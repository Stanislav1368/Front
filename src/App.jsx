import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Books from "./Pages/Books";
import Rental from "./Pages/Rental";
import Rentors from "./Pages/Rentors";


const { Header, Content } = Layout;

const App = () => {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <div style={{padding: "0px 15px"}}>
                    <Routes>
                        <Route path="/books" element={<Books />} />
                        <Route path="/rental" element={<Rental />} />
                        <Route path="/rentors" element={<Rentors />} />
                    </Routes>
                </div>
            </Layout>
        </Router>
    );
};

export default App;