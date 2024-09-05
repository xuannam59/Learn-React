import { Button, Input, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserApi } from '../../services/api.service';

const UserForm = (props) => {
  const { loadUser } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalCreateOpen, setisModalCreateOpen] = useState(false);


  const handleSubmitBtn = async () => {
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Success "
      })
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message)
      });
    }
  }

  const resetAndCloseModal = () => {
    setisModalCreateOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }

  return (
    <div className='user-form' style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <h3>Table User</h3>
        <Button
          type="primary"
          onClick={() => setisModalCreateOpen(true)}
        >Create User</Button>
      </div>
      <Modal
        title="Create User"
        open={isModalCreateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        okText={"CREATE"}
        maskClosable={false}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(event) => { setFullName(event.target.value) }}
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={email}
              onChange={(event) => { setEmail(event.target.value) }}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => { setPassword(event.target.value) }}
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
    </div>
  );
}

export default UserForm;