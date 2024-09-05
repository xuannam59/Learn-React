import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const EditBook = (props) => {
  const {
    loadBook,
    dataUpdate, setDataUpdate,
    isModalEditOpen, setIsModalEditOpen
  } = props
  // Data
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  // Preview
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(`${import.meta.env.VITE_URL_BACKEND}/images/book/${dataUpdate.thumbnail}`);
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail) => {

    console.log(newThumbnail);
    const resBook = await updateBookApi(id, newThumbnail, mainText, author, price, quantity, category);
    if (resBook.data) {
      handleCancel();
      await loadBook();
      notification.success({
        message: "Success",
        description: "Update book success!"
      });
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(resBook.message)
      });
    }
  }

  const handleOnChangeFile = (event) => {
    if (!event.target.files || !event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(`${import.meta.env.VITE_URL_BACKEND}/images/book/${dataUpdate.thumbnail}`);
    }

    const fileUpload = event.target.files[0];
    setSelectedFile(fileUpload);
    setPreview(URL.createObjectURL(fileUpload));
  }

  const handleCancel = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setPreview(null);
    setSelectedFile(null);
    setDataUpdate(null);
    setIsModalEditOpen(false);
  }

  const handleOk = async () => {
    // không có ảnh preview + không có file => return
    if (!preview && !selectedFile) {
      notification.error({
        message: "Error",
        description: "Please upload image files"
      })
      return;
    }

    // có ảnh và không có file => không upload file
    let newThumbnail = dataUpdate.thumbnail;

    // có ảnh preview và có file => upload file
    if (preview && selectedFile) {
      const resUpdate = await handleUploadFile(selectedFile, "book");
      if (resUpdate.data) {
        //success
        newThumbnail = resUpdate.data.fileUploaded;
      } else {
        notification.error({
          message: "Error",
          description: JSON.stringify(resUpdate.message)
        })
        return;
      }
    }

    // update book
    await updateBook(newThumbnail);
  }

  return (
    <>
      <Modal
        title="Create Book"
        open={isModalEditOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="UPDATE"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Id</label>
            <Input
              value={id}
              disabled
            />
          </div>
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
  );
}

export default EditBook;