import React, { useState, useEffect } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LogoutOutlined, ReadOutlined, SyncOutlined, TeamOutlined } from "@ant-design/icons";
import LogoutButton from "./LogoutButton";

const { Sider } = Layout;

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/books":
        setSelectedKey("1");
        break;
      case "/rental":
        setSelectedKey("2");
        break;
      case "/renters":
        setSelectedKey("3");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    Modal.confirm({
      title: "Вы уверены, что хотите выйти?",
      content: "Пожалуйста, подтвердите, что вы хотите выйти из аккаунта.",
      onOk() {
        localStorage.removeItem("user");
        window.location.href = "/login";
      },
      onCancel() {
        console.log("Отмена выхода");
      },
    });
  };

  return (
    <Sider style={{ background: "white" }} width={280}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Menu theme="light" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick} style={{backgroundColor: "white"}}>
          <Menu.Item key="1" icon={<ReadOutlined style={{ fontSize: "28px" }} />} onClick={() => setSelectedKey("1")}>
            <Link to="/books" style={{ fontSize: 18, fontWeight: "bolder", display: "block", color: "inherit" }}>
              Книги
            </Link>
          </Menu.Item>
          {!user?.isRenter && (
            <>
              <Menu.Item key="2" icon={<SyncOutlined style={{ fontSize: "28px" }} />} onClick={() => setSelectedKey("2")}>
                <Link to="/rental" style={{ fontSize: 18, fontWeight: "bolder", display: "block", color: "inherit" }}>
                  Аренда
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: "28px" }} />} onClick={() => setSelectedKey("3")}>
                <Link to="/renters" style={{ fontSize: 18, fontWeight: "bolder", display: "block", color: "inherit" }}>
                  Клиенты
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
        
        <div style={{ marginTop: "auto", marginBottom: 0 }}>
          <Menu theme="light" mode="inline" onClick={handleLogout}>
            <Menu.Item className="ant-menu-item-danger" key="4" icon={<LogoutOutlined style={{ fontSize: "28px" }} />}>
              <span style={{ fontSize: 18, fontWeight: "bolder", color: "red" }}>Выход</span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
