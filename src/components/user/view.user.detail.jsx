import { Button, Drawer, notification } from "antd"
import { useEffect, useState } from "react";
import { handleUploadFile, updateUserAvatarApi } from "../../services/api.service";


const ViewUserDetail = (props) => {
  const {
    isDetailOpen,
    setIsDetailOpen,
    dataDetail,
    setDataDetail,
    loadUser
  } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleUpLoadIamge = async () => {
    // step 1 : Upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      // step 2 : Upload user
      const resUpdateAvatar = await updateUserAvatarApi(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );

      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();

        notification.success({
          message: "Success ",
          description: "Updated avatar successfully"
        });
      } else {
        notification.error({
          message: "Error",
          description: JSON.stringify(resUpdateAvatar.message)
        });
      }

    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(resUpload.message)
      });
    }

  }

  return (
    <Drawer
      width="40vw"
      title="Basic Drawer"
      onClose={() => {
        setIsDetailOpen(false);
        setDataDetail(null);
        setPreview(null);
      }}
      open={isDetailOpen}
    >
      {dataDetail ?
        <>
          <p>Id: {dataDetail._id}</p>
          <br />
          <p>Full name: {dataDetail.fullName}</p>
          <br />
          <p>Email: {dataDetail.email}</p>
          <br />
          <p>Phone number: {dataDetail.phone}</p>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "15px" }}>
            <p>Avatar : </p>
            <div style={{
              height: "100px",
              width: "150px",
              marginTop: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "16px 0"
            }}>
              <img
                src={`${import.meta.env.VITE_URL_BACKEND}/images/avatar/${dataDetail.avatar}`}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            {preview &&
              <>
                <p>Preview Avatar : </p>
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
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <label
              htmlFor="btnUpload"
              style={{
                display: "block",
                width: "fit-content",
                background: "#2cae6b",
                color: "#fff",
                padding: "6px 8px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >Upload</label>
            {preview &&
              <Button
                type="primary"
                onClick={() => handleUpLoadIamge()}
              >Save</Button>
            }
            <input
              type="file"
              id="btnUpload"
              accept="image/*"
              hidden
              onChange={(event) => handleOnChangeFile(event)}
            />
          </div>
        </>
        :
        <>
          <p>Không có dữ liệu</p>
        </>
      }

    </Drawer>
  )
}

export default ViewUserDetail