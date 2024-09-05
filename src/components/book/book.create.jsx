import { Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const CreateBook = (props) => {
  const {
    loadBook,
    isModalOpen, setIsModalOpen } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  // preview image 
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    setIsModalOpen(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setPreview(null);
    setSelectedFile(null);
  }

  const handleOk = async () => {
    if (selectedFile === null) {
      notification.error({
        message: "Error",
        description: "Please upload image files"
      })
      return;
    }
    setIsModalOpen(false);
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data.fileUploaded) {
      const file = resUpload.data.fileUploaded;
      const resCreate = await createBookApi(file, mainText, author, price, quantity, category);
      if (resCreate.data) {
        notification.success({
          message: "Success",
          description: "Create book Success"
        })
        await loadBook();
        handleCancel();
      } else {
        notification.error({
          message: "Error",
          description: JSON.stringify(resCreate.message)
        })
      }
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(resUpload.message)
      })
    }
  }

  return (
    <>
      <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="CREATE"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Tiêu đề</label>
            <Input
              value={mainText}
              onChange={(event) => setMainText(event.target.value)}
              placeholder="Main Text"
            />
          </div>
          <div>
            <label>Tác giả</label>
            <Input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Author"
            />
          </div>
          <div>
            <label>Giá</label>
            <InputNumber
              style={{ width: '100%' }}
              value={price}
              addonAfter="đ"
              onChange={(value) => setPrice(value)}
              placeholder="Price"
            />
          </div>
          <div>
            <label>Số lượng</label>
            <InputNumber
              style={{ width: '100%' }}
              value={quantity}
              onChange={(value) => setQuantity(value)}
              placeholder="Quantity"
            />
          </div>
          <div>
            <label>Thể loại</label>
            <Select
              value={category}
              placeholder="Please select"
              style={{ width: "100%" }}
              onChange={(value) => setCategory(value)}
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
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: " 8px" }}>
            <span>Ảnh thumbnail : </span>
            {preview &&
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
                margin: "8px"
              }}
            >Upload Image</label>

            <input
              type="file"
              accept="image/*"
              id="btnUpload"
              onChange={(event) => handleOnChangeFile(event)}
              onClick={(event) => { event.target.value = null }}
              hidden
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CreateBook;