import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserApi } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser } = props;

  useEffect(() => {
    console.log(">>>>Check data", dataUpdate);
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);



  const handleSubmitBtn = async () => {
    const res = await updateUserApi(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Success "
      })
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message)
      });
    }
  }

  const resetAndCloseModal = () => {
    setId("");
    setFullName("");
    setPhone("");
    setIsModalUpdateOpen(false);
    setDataUpdate(null);
  }

  return (
    <>
      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        okText={"SAVE"}
        maskClosable={false}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>id</span>
            <Input
              value={id}
              disabled
            />
          </div>
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(event) => { setFullName(event.target.value) }}
            />
          </div>
          <div>
            <span>Phone number</span>
            <Input
              value={phone}
              onChange={(event) => { setPhone(event.target.value) }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UpdateUserModal;