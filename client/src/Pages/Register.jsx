import { Button, Form, Input } from "antd";
import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // form sumbiting function
  const handleSubmit = async(value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axiosInstance.post('/api/users/register', value);
      message.success('Registered Successfuly !');
      dispatch({type: "HIDE_LOADING"});
      navigate('/login')
    } catch (error) {
      dispatch({type: "HIDE_LOADING"});
      message.error('Something Went Wrong !') 
      console.log(error);
    }
  };

     // currently register user
     useEffect(()=>{
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth');
        navigate('/');
      }
    },[navigate]);

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>BILLING APP</h1>
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" 
             label="Password"
              rules={
                [
                  {
                    required: true,
                    message: 'Please Enter Your Password ! '
                  },
                  {
                    min: 8,
                    message: 'Password Must Be atleast 8 characters !'

                  }
                ]
              }
              >
              <Input.Password />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Already Register Please&nbsp;
                <Link to="/login" style={{ textDecorationLine: "none" }}>
                  Login Here !
                </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
