import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const EditBookUnControl = (props) => {
    const {
        loadBook,
        dataUpdate, setDataUpdate,
        isModalEditOpen, setIsModalEditOpen
    } = props;
    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            });
            setPreview(`${import.meta.env.VITE_URL_BACKEND}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

    const updateBook = async (newThumbnail, values) => {
        const resBook = await updateBookApi(values.id, newThumbnail, values.mainText, values.author, values.price, values.quantity, values.category);
        if (resBook.data) {
            handleCancel();
            await loadBook();
            notification.success({
                message: "Update Success",
                description: "Update book success!"
            });
        } else {
            notification.error({
                message: "Update Error",
                description: JSON.stringify(resBook.message)
            });
        }
    }

    const handleCancel = () => {
        form.resetFields();
        setPreview(null);
        setDataUpdate(null);
        setIsModalEditOpen(false);
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

    const onFinish = async (values) => {
        if (!preview && !selectedFile) {
            notification.error({
                message: "Error",
                description: "Please upload image files"
            });
            return;
        }

        // có preview + không có file => không upload file
        let newThumbnail = dataUpdate.thumbnail;
        // có preview + có file => upload file
        if (preview && selectedFile) {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }

        // Update book
        await updateBook(newThumbnail, values);
    }


    return (
        <>
            <Modal
                title="Update Book (UnControl)"
                open={isModalEditOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                maskClosable={false}
                okText="UPDATE"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Id"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>

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
    );
}


export default EditBookUnControl;