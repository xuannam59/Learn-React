import { Button, Col, Form, Input, notification, Row, Divider } from "antd";
import { registerUserApi } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";


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
        description: JSON.stringify(res.message)
      })
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ margin: "30px" }}
    // style={{ margin: "10px" }}
    // onFinishFailed={onFinishFailed}
    >
      <h3 style={{ textAlign: "center" }}> Đăng ký tài khoản </h3>
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
            <Button
              onClick={() => form.submit()}
              type="primary">Register</Button>
          </div>
          <Divider />
          <div>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></div>
        </Col>
      </Row>
    </Form>
  );
}

export default RegisterPage;