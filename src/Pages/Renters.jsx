import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, message, Modal, Flex } from "antd";
import { createRenter, getRenters } from "../api/renters";
import { PlusCircleFilled } from "@ant-design/icons";

const Renters = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // State для видимости модального окна

  useEffect(() => {
    fetchRenters();
  }, []);

  const fetchRenters = async () => {
    setLoading(true);
    try {
      const data = await getRenters();
      setRenters(data);
    } catch (error) {
      console.error("Failed to fetch renters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRenter = async (values) => {
    setLoading(true);
    try {
      await createRenter(values);
      message.success("Арендатор успешно добавлен");
      fetchRenters();
      form.resetFields();
      setIsModalVisible(false); // Закрытие модального окна после успешного добавления
    } catch (error) {
      console.error("Failed to add renter:", error);
      message.error("Ошибка при добавлении арендатора");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Фамилия",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Отчество",
      dataIndex: "patronymic",
      key: "patronymic",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Контактный номер",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1>Арендаторы</h1>
      <div style={{ margin: "0px 0px 15px 0px", display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
        <Button size="large" type="primary" onClick={() => setIsModalVisible(true)} icon={<PlusCircleFilled></PlusCircleFilled>}>
          Добавить арендатора
        </Button>

        <Flex style={{ gap: "10px" }}>
          <Button size="large" type="default">
            Фильтр 1
          </Button>
          <Button size="large" type="default">
            Фильтр 2
          </Button>
        </Flex>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Table columns={columns} dataSource={renters} loading={loading} rowKey="id" />
      </div>
      <Modal title="Добавить арендатора" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleAddRenter} layout="vertical">
          <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: "Введите имя" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: "Введите фамилию" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="patronymic" label="Отчество">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Адрес">
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Контактный номер" rules={[{ required: true, message: "Введите контактный номер" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Renters;
