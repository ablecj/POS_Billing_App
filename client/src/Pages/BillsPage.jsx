import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import {  EyeOutlined } from "@ant-design/icons";
import {  Table, Modal} from "antd";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const BillsPage = () => {

  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  // popup modal
  const [popUpModal, setPopUpModal] = useState(false);
  // usestate fro edit functionality
  const [editItem, setEditItem] = useState(null)

  // getting data from the backend
  const getAllIBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axiosInstance.get("/api/bills/get-bills");
      // const { data} = await axios.get('/api/items/get-item');
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log("data from items page", data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error, "error occured!");
    }
  };

  // useEffect
  useEffect(() => {
    getAllIBills();
  }, []);

 

  // table datas
  const columns = [
    { title: "ID", dataIndex: "_id" },

    {
      title: "Customer Name",
      dataIndex: "customerName",
     
    },

    { title: "Contact Number", dataIndex: "customerNumber" },
    { title: "Sub Total", dataIndex: "subTotal" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    { title: "Tax", dataIndex: "tax" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined />
        </div>
      ),
    },
  ];

  // handle form submit
  // const handleSubmit = async (value) => {
  //  console.log(value)
 
  // };

  return (
    <DefaultLayout>
       <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {
        popUpModal && (
          <Modal
          title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
          visible={popUpModal}
          onCancel={() => {
            setPopUpModal(false);
            setEditItem(null);
          }}
          footer={false}
        >
      
        </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default BillsPage