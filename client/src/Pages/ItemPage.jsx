import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select } from "antd";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const ItemPage = () => {
  const [itemDatas, setItemDatas] = useState([]);
  const dispatch = useDispatch();
  // popup modal
  const [popUpModal, setPopUpModal] = useState(false);

  // useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axiosInstance.get("/api/items/get-item");
        // const { data} = await axios.get('/api/items/get-item');
        setItemDatas(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log("data from items page", data);
      } catch (error) {
        console.log(error, "error occured!");
      }
    };
    getAllItems();
  }, [dispatch]);

  // table datas
  const columns = [
    { title: "Name", dataIndex: "name" },

    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },

    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined style={{ cursor: "pointer" }} />{" "}
          <EditOutlined style={{ cursor: "pointer" }} />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Items Page</h1>
        <Button type="primary" onClick={() => setPopUpModal(true)}>
          Add Items
        </Button>
      </div>
      <Table columns={columns} dataSource={itemDatas} bordered />

      <Modal
        title="Add New Items"
        open={popUpModal}
        onCancel={() => setPopUpModal(false)}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks">Drinks</Select.Option>
              <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodels">Noodles</Select.Option>
            </Select>
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">SAVE</Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default ItemPage;
