import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal } from "antd";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const BillsPage = () => {
  const dispatch = useDispatch();
  // popup modal
  const [popUpModal, setPopUpModal] = useState(false);
  // usestate for Billing 
  const [selectBill, setSelectBill] = useState(null)

  // usestate for edit functionality
  const [billsData, setBillsData] = useState([]);

  console.log(billsData,"billsData state")

  // getting data from the backend
  const getAllIBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axiosInstance.get("/api/bills/get-bills");
      const { bills } = data;
      setBillsData(bills);
      console.log("Bills Data:", bills);
      // setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      // console.log("data from items page", data);
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
          <EyeOutlined 
            style={{cursor: 'pointer'}}
            onClick={()=>{
              setSelectBill(record)
              setPopUpModal(true);
            }} 
          />
          
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      {Array.isArray(billsData) ? (
        <Table columns={columns} dataSource={billsData} bordered />
      ) : (
        <p>No data available</p>
      )}
      {popUpModal && (
        <Modal
          title="Invoice Details"
          open={popUpModal}
          onCancel={() => {
            setPopUpModal(false);
          }}
          footer={false}
        >
          {/* Your modal content */}
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
