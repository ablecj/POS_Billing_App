import React from 'react';
import DefaultLayout from '../Components/DefaultLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../Components/ItemList';
import { useDispatch } from 'react-redux';

// creating axios baseurl model 
const axiosInstance = axios.create({baseURL: "http://localhost:8080"});

const HomePage = () => {
  const [itemDatas, setItemDatas] = useState([]);

  const dispatch = useDispatch();
   // useEffect
   useEffect(()=>{
    const getAllItems = async()=>{

      try {
        dispatch({type: "SHOW_LOADING"})
        const {data} = await axiosInstance.get('/api/items/get-item');
        // const { data} = await axios.get('/api/items/get-item');
        setItemDatas(data);
        dispatch({type: "HIDE_LOADING"})
        console.log("data from backend", data);
      } catch (error) {
        console.log(error,"error occured!");
      }
    };
    getAllItems();
  },[dispatch]); 
  return (
 <DefaultLayout >
    <Row>
      {
        itemDatas.map((item,index) =>(
          <Col key={index} xs={24} lg={6} sm={6} md={12} >
            <ItemList item={item}  />
          </Col>
        ))
      }
    </Row>
 </DefaultLayout>
  )
}

export default HomePage