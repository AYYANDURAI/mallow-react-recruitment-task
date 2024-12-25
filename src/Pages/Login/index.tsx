import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated) 
      navigate("/home");
  }, [isAuthenticated, navigate]);

  const onFinish = (values: any) => {
    const { email, password } = values;
    if (email && password) {
      dispatch(loginRequest({ values }));
    } else {
      message.error("Please enter both email and password");
    }
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
