import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input,message} from "antd";
import { useDispatch} from "react-redux";  
import { useNavigate } from "react-router-dom";
import axios from "axios";

// calling Axios as an instance
const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // handle submit for login page
    const handleSubmit = async(value)=>{
        try {
          dispatch({type: "SHOW_LOADING"});
         const res = await axiosInstance.post('/api/users/login', value);
          dispatch({type: "HIDE_LOADING"});
          message.success("Login Succesfully !");
          localStorage.setItem('auth',JSON.stringify(res.data));
          navigate('/');
        } catch (error) {
          dispatch({type: "HIDE_LOADING"});
          message.error("Something Went Wrong !")
          console.log(error);
        }
    }

    // currently login user
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
          <h3>Login Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password"
              label="Password"
               rules={[
                {
                    required: true,
                    message: 'Please Enter Your Password',
                },
                {
                    min: 8,
                    message: 'password must be at least 8 characters',
                },
               ]}
               >
              <Input.Password />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Not A User Please&nbsp;
                <Link to="/register" style={{ textDecorationLine: "none" }}>
                  Register Here !
                </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
