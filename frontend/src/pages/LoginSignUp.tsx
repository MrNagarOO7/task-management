// SignUpCard.tsx
import React from "react";
import { Card, Form, Input, Button, Row, Col } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signUp, setUserDetails } from "../helpers";
import { useDispatch } from "react-redux";

const LoginSignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const onFinish = async (values: any) => {
    if (isLogin) {
      const loginResp = await login(values);
      if (loginResp?.success) {
        toast.success(loginResp.msg);
        dispatch(setUserDetails(loginResp.data));
        navigate("/dashboard");
      } else {
        toast.error(loginResp.msg);
      }
    } else {
      const signUpResp = await signUp(values);
      if (signUpResp?.success) {
        toast.success(signUpResp.msg);
        setIsLogin(true);
      } else {
        toast.error(signUpResp.msg);
      }
    }
  };

  return (
    <div className="loginSignup">
      <Row justify="center" align="middle" style={{ minHeight: "90vh" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card
            title="Task Management"
            style={{ width: "100%", maxWidth: 400, color: "#9ef01a" }}
          >
            <Form onFinish={onFinish} layout="vertical">
              {!isLogin && (
                <Form.Item label="First Name" name="fname">
                  <Input />
                </Form.Item>
              )}
              {!isLogin && (
                <Form.Item label="Last Name" name="lname">
                  <Input />
                </Form.Item>
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {isLogin ? "Login" : "SignUp"}
                </Button>
              </Form.Item>
              {isLogin ? "Create new account?" : "Already have an account?"}
              <Button
                style={{ color: "#9ef01a" }}
                type="link"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginSignUp;
