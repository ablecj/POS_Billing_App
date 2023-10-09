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
  // useState for selecting catagory
  const [selectedCatagory, setSelectedCatagory] = useState('')
// creating an array for catagory
const catagories = [
  {
    name: 'Drinks',
    imageUrl: 'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32438-tropical-drink-icon.png'
  },
  {
    name: 'Rice',
    imageUrl: 'https://icons.iconarchive.com/icons/zakar/japanicons/256/bol-de-riz-plein-icon.png'
  },
  {
    name: 'Noodles',
    imageUrl: 'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32404-steaming-bowl-icon.png'
  }
]

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
  <div className='catagory-container'>
    {catagories.map(catagory=>(
      <div key={catagory.name} className={`d-flex catagory
       ${selectedCatagory === catagory.name.toLowerCase() && 'catagory-active'}`}
       onClick={()=> setSelectedCatagory(catagory.name.toLowerCase())}
       >
        <p className='catagory-name'>{catagory.name}</p>
        <img src={catagory.imageUrl} alt={catagory.name} 
          height="40" width="40"
        />
      </div>
    ))}
  </div>
    <Row>
      {
        itemDatas.filter((item)=>item.category === selectedCatagory)
        .map((item,index) =>(
          <Col key={index} xs={24} lg={6} sm={6} md={12} >
            <ItemList key={item.id} item={item}  />
            {console.log("items filtered", item)}
          </Col>
        ))
      }
    </Row>
 </DefaultLayout>
  )
}

export default HomePage