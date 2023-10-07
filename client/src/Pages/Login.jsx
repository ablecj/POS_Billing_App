import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Login = () => {
    // handle submit for login page
    const handleSubmit =(value)=>{
        console.log(value);
    }

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
