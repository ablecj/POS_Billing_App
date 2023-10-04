import React from 'react';
import DefaultLayout from '../Components/DefaultLayout';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';


const CartPage = () => {
    const {cartItems} = useSelector(state=> state.rootReducer)

    const dispatch = useDispatch()
// handle increment
const handleIncrement = (record)=>{
  dispatch({
    type: "UPDATE",
    payload: {...record,quantity: record.quantity + 1},
  });
}

const handleDecrement = (record)=>{
  if(record.quantity !== 1){
    dispatch({
      type: "DECREMENT",
      payload: {...record, quantity: record.quantity - 1},
    }) 
  }
}

    const columns =[
        {title: "Name", dataIndex : "name"},

        {title: "Image", dataIndex: "image", 
        render:(image,record)=><img src={image} alt={record.name}
         height="60" width="60" />},

        {title: "Price", dataIndex:"price"},
        {title: "Quantity", dataIndex:"_id",
         render:(id,record)=>(
          <div>
            <PlusCircleOutlined className='mx-3'
             style={{cursor:'pointer'}} onClick={()=>handleIncrement(record)}/>
              <b>{record.quantity}</b>
             <MinusCircleOutlined className='mx-3'
               style={{cursor:'pointer'}} onClick={()=>handleDecrement(record)}/>
          </div>
         ) },

        {title: "Actions",dataIndex: "_id",
         render:(id,record)=> <DeleteOutlined 
          style={{cursor: 'pointer'}} 
          onClick={()=> dispatch({
            type:"DELETE_FROM_CART",
            payload: record,
          })}/> }
    ]

   return (
    <DefaultLayout>
        <h1>Cart Page</h1>
        <Table columns={columns} dataSource={cartItems} bordered />
    </DefaultLayout>
   )
  }

export default CartPage