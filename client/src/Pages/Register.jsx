import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // form sumbiting function
  const handleSubmit = (value) => {
    console.log("value", value);
  };

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
            <Form.Item name="password" label="Password">
              <Input type="password" />
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
