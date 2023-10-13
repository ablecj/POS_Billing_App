import React, { useEffect, useState } from 'react';
import DefaultLayout from '../Components/DefaultLayout';
import { Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

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

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
  ];


  return (
    <DefaultLayout>
        <h1>Customer Page</h1>
        <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={true}
      />
    </DefaultLayout>
  )
}

export default CustomerPage