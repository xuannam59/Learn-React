import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserApi } from '../../services/api.service';

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDeleteUser = async (id) => {
    const res = await deleteUserApi(id);
    if (res.data) {
      notification.success({
        message: "Delete User",
        description: "Success"
      })
      await loadUser();
    } else {
      notification.error({
        message: "Delete User",
        description: "Error"
      })
    }

  }

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

              <Popconfirm
                placement="leftTop"
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleDeleteUser(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "red", cursor: "pointer", fontSize: "18px" }} />
              </Popconfirm>


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
        loadUser={loadUser}
      />
    </>
  );
}

export default UserTable;