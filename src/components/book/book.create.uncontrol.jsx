import { Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const CreateBookUnControl = (props) => {
  const {
    loadBook,
    isModalCreateOpen, setIsModalCreateOpen
  } = props

  const [form] = Form.useForm();

  // preview image
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPreview(null);
      setSelectedFile(null);
    }

    const fileUpload = event.target.files[0];
    setSelectedFile(fileUpload);
    setPreview(URL.createObjectURL(fileUpload));
  }

  const handleCancel = () => {
    setIsModalCreateOpen(false);
    setSelectedFile(null);
    setPreview(null);
    form.resetFields();
  }

  const onFinish = async (values) => {
    if (selectedFile === null) {
      notification.error({
        message: "Error",
        description: "Please upload image files"
      });
      return;
    }


    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      const file = resUpload.data.fileUploaded;
      const resCreate = await createBookApi(
        file, values.mainText,
        values.author,
        values.price, values.quantity,
        values.category
      );
      if (resCreate.data) {
        handleCancel();
        await loadBook();
        notification.success({
          message: "Create Success",
          description: " Create book success"
        });
      } else {
        notification.error({
          message: "Create Error",
          description: JSON.stringify(resCreate.message)
        });
      }

    }
    else {
      notification.error({
        message: "Error",
        description: JSON.stringify(resUpload.message)
      });
    }
  }

  return (
    <>
      <Modal
        title="Create Book (UnControl)"
        open={isModalCreateOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        okText="CREATE"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[
              {
                required: true,
                message: 'Please input your mainText!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please input your author!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <InputNumber addonAfter="đ" style={{ width: "100%" }} />
          </Form.Item>


          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Please input your quantity!',
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>


          <Form.Item
            label="Thể loại"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input your mainText!',
              },
            ]}
          >
            <Select
              placeholder="Please select"
              style={{ width: "100%" }}
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Business', label: 'Business' },
                { value: 'Comics', label: 'Comics' },
                { value: 'Cooking', label: 'Cooking' },
                { value: 'Entertainment', label: 'Entertainment' },
                { value: 'History', label: 'History' },
                { value: 'Music', label: 'Music' },
                { value: 'Sports', label: 'Sports' },
                { value: 'Teen', label: 'Teen' },
                { value: 'Travel', label: 'Travel' },
              ]}
            />
          </Form.Item>

          <div>
            <span>Ảnh thumbnail : </span>
            {preview &&
              <>
                <div style={{
                  height: "100px",
                  width: "150px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "16px 0"
                }}>
                  <img
                    src={preview}
                    alt="Avatar"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              </>
            }

            <label
              htmlFor="btnUpload"
              style={{
                display: "block",
                width: "fit-content",
                background: "#2cae6b",
                color: "#fff",
                padding: "6px 8px",
                borderRadius: "6px",
                cursor: "pointer",
                margin: "8px 8px 8px 0"
              }}
            >Upload Image</label>

            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="btnUpload"
              hidden
              onChange={(event) => handleOnChangeFile(event)}
              onClick={(event) => event.target.value = null}
            />
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default CreateBookUnControl;
