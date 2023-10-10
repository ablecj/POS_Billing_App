import React, { useState,useEffect } from 'react';
import DefaultLayout from '../Components/DefaultLayout';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const CartPage = () => {
  const navigate = useNavigate()
  // state for bill amount 
    const [subTotal, setSubTotal] = useState(0)
    // state for bill popup
    const [billPopUp, setBillPopUp] = useState(false)

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

    // useEffect adding
    useEffect(()=>{
      let temp = 0;
      cartItems.forEach((item)=>{temp = temp + (item.price * item.quantity)})
      setSubTotal(temp);
    },[cartItems])

    // invoice handle submit function
    const handleSubmit = async(value)=>{
      
      try {
         const newObject = {
          ...value,
          cartItems,
          subTotal,
          tax: Number(((subTotal/100)*18).toFixed(2)),
          totalAmount: Number(Number(subTotal) + Number(((subTotal/100)*18).toFixed(2))),
          userId: JSON.parse(localStorage.getItem("auth"))._id,
        };
        await axiosInstance.post('/api/bills/add-bills', newObject);
        message.success("Bill Generated Successfuly !")
        console.log("new Object",newObject);
        navigate('/bills')
      } catch (error) {
       message.error("Something Went Wromg !");
       console.log(error); 
      }      
    }

   return (
    <DefaultLayout>
        <h1>Cart Page</h1>
        <Table columns={columns} dataSource={cartItems} bordered />
        <div className="d-flex align-items-end flex-column">
          <hr />
          <h3>SUB TOTAL: $ <b>{subTotal}</b> /-{" "}</h3>
          <Button type='primary' onClick={()=> setBillPopUp(true)}>Create Invoice</Button>
        </div>
        <Modal 
         open={billPopUp} 
         onCancel={()=> setBillPopUp(false)}
         footer={false}
        >
           <Form layout="vertical" onFinish={handleSubmit} >
            <Form.Item name="customerName" label="customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="customerNumber" label="customer Number">
              <Input />
            </Form.Item>
       
            <Form.Item name="PaymentMode" label="Payment Mode">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Credit Card</Select.Option>
                <Select.Option value="UPI">UPI</Select.Option>
              </Select>
            </Form.Item>
  
              <div className="bill-it">
                <h5>
                  TAX {" "}
                  <b>{((subTotal/100)*18).toFixed(2)}</b>
                </h5>
                <h3>
                  GRAND TOTAL - <b>{" "}
                    {Number(subTotal) + Number(((subTotal/100)*18).toFixed(2))}
                  </b>
                </h3>
              </div>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
    </DefaultLayout>
   )
  }

export default CartPage