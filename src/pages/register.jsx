import { Button, Col, Form, Input, notification, Row } from "antd";
import { registerUserApi } from "../services/api.service";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onFinish = async (values) => {
    const res = await registerUserApi(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Success",
        description: "Register Success"
      });
      navigate('/login');
    } else {
      notification.error({
        message: "Error",
        description: res.message.join(", ")
      })
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
    // style={{ margin: "10px" }}
    // onFinishFailed={onFinishFailed}
    >
      <div style={{ margin: "20px" }}>
        <Row justify="center">
          <Col xs={24} md={6}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullName!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={6}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={6}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password strength!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} md={6}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  // required: true,
                  pattern: new RegExp(/\d+/g),
                  message: "Wrong format!"
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} md={6}>
            <div>
              <Button type="primary" htmlType="submit">Register</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default RegisterPage;