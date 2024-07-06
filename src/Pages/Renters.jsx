// src/components/Renters.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, message } from "antd";
import { createRenter, getRenters } from "../api/renters";

const Renters = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
    <div>
      <h2>Список арендаторов</h2>
      <Table columns={columns} dataSource={renters} loading={loading} rowKey="id" />

      <h2>Добавить арендатора</h2>
      <Form form={form} onFinish={handleAddRenter} layout="inline">
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
        <Form.Item
          name="contactNumber"
          label="Контактный номер"
          rules={[{ required: true, message: "Введите контактный номер" }]}
        >
          <Input /> 
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Renters;