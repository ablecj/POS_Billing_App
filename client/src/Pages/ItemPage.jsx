import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const ItemPage = () => {
  const [itemDatas, setItemDatas] = useState([]);
  const dispatch = useDispatch();
  // popup modal
  const [popUpModal, setPopUpModal] = useState(false);
  // usestate fro edit functionality
  const [editItem, setEditItem] = useState(null)

  // getting data from the backend
  const getAllItems = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axiosInstance.get("/api/items/get-item");
      // const { data} = await axios.get('/api/items/get-item');
      setItemDatas(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log("data from items page", data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error, "error occured!");
    }
  };

  // useEffect
  useEffect(() => {
    getAllItems();
  }, []);

    // handle DELETE
    const handleDelete = async (record)=>{
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axiosInstance.delete(`/api/items/delete-item?itemId=${record._id}`);
        // const { data} = await axios.get('/api/items/get-item');
        getAllItems();
        setPopUpModal(false);
        message.success("Item Deleted Successfully!");
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something went wrong!");
        console.log(error, "error occured in delete item!");
      }
    }

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
          <EditOutlined 
            style={{ cursor: "pointer", marginRight: "20px", color: "green" }}
            onClick={()=>{
              setEditItem(record);
              setPopUpModal(true);
            }}
          />
          <DeleteOutlined 
            style={{ cursor: "pointer", color: "red"}}
            onClick={()=>{
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // handle form submit
  const handleSubmit = async (value) => {
    if(editItem == null){
      try {
        dispatch({ type: "SHOW_LOADING" });
        const result = await axiosInstance.post("/api/items/add-item", value);
        // const { data} = await axios.get('/api/items/get-item');
        getAllItems();
        setPopUpModal(false);
        message.success("Item Added Successfully!");
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something went wrong!");
        console.log(error, "error occured!");
      }
    }else{
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axiosInstance.put("/api/items/edit-item", {...value, itemId:editItem._id});
        // const { data} = await axios.get('/api/items/get-item');
        getAllItems();
        setPopUpModal(false);
        message.success("Item Edited Successfully!");
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something went wrong!");
        console.log(error, "error occured!");
      }
    }
 
  };



  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Items Page</h1>
        <Button type="primary" onClick={() => setPopUpModal(true)}>
          Add Items
        </Button>
      </div>
      <Table columns={columns} dataSource={itemDatas} bordered />
      {
        popUpModal && (
          <Modal
          title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
          open={popUpModal}
          onCancel={() => {
            setPopUpModal(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit} initialValues={editItem}>
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
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
        )
      }
     
    </DefaultLayout>
  );
};

export default ItemPage;
