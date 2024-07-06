import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider, Layout } from "antd";

const { Sider } = Layout;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
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
        layout: {
          siderWidth: 300, // Ширина Sider
          siderBgColor: "#fafafa", // Фон Sider
          contentPadding: "24px", // Отступ содержимого
          // Дополнительные настройки макета по мере необходимости
          headerHeight: "64px", // Высота заголовка
          footerHeight: "60px", // Высота подвала
        },
      }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
