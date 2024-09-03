import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginUserApi(values.email, values.password);
    if (res.data) {
      message.success("Login successfully");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(res.message)
      })
    }
    setLoading(false);
  }
  return (
    <Row justify={"center"} style={{ margin: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: " 5px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}>
          <legend>Đăng nhập</legend>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password onKeyDown={(event) => {
                if (event.key === "Enter") form.submit();
              }} />
            </Form.Item>

            <Form.Item>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Button
                  loading={loading}
                  type="primary" onClick={() => form.submit()}>
                  Login</Button>
                <Link to="/">Go homepage <ArrowRightOutlined /></Link>
              </div>
            </Form.Item>

          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>Not account? <Link to={"/register"}>Register here</Link></div>
        </fieldset>
      </Col>
    </Row>
  );
}

export default LoginPage;