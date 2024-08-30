import { Drawer } from "antd"
import { useEffect, useState } from "react";


const ViewUserDetail = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

  return (
    <Drawer
      title="Basic Drawer"
      onClose={() => {
        setIsDetailOpen(false);
        setDataDetail(null);
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