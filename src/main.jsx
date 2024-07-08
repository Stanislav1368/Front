import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider, Layout } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import "moment/locale/ru";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: "#ff6347", // Основной цвет
          colorSecondary: "#ffa500", // Вторичный цвет
          colorText: "#555555", // Цвет текста
          colorBgContainer: "#fafafa", // Фон контейнера
          spacingSmall: "8px", // Отступы
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSizeBase: "16px",
          // Дополнительные токены по мере необходимости
          colorLink: "#1890ff", // Цвет ссылок
          borderColor: "#e8e8e8", // Цвет рамок
        },
      }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
