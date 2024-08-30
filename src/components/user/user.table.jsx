import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);


  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      render: (_, record) => {
        return <a
          href='#'
          onClick={() => {
            setDataDetail(record);
            setIsDetailOpen(true);
          }}
        >{record._id}</a>
      }
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <div style={{ display: "flex", gap: "20px" }}>
              <EditOutlined
                style={{
                  color: "orange",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
                onClick={() => {
                  setDataUpdate(record);
                  setIsModalUpdateOpen(true);
                }}
              />
              <DeleteOutlined style={{ color: "red", cursor: "pointer", fontSize: "18px" }} />
            </div>
          </>
        );
      }
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
      />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUserDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      />
    </>
  );
}

export default UserTable;