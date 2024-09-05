import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserApi } from '../../services/api.service';

const UserTable = (props) => {
  const { dataUsers, loadUser,
    current, setCurrent,
    pageSize, setPageSize,
    total
  } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDeleteUser = async (id) => {
    const res = await deleteUserApi(id);
    if (res.data) {
      notification.success({
        message: "Delete Success",
        description: "Delete user success"
      })
      await loadUser();
    } else {
      notification.error({
        message: "Error Delete",
        description: "Error"
      })
    }

  }

  const columns = [
    {
      title: "Index",
      render: (_, record, index) => {
        return (
          <>
            <p>{(current - 1) * pageSize + index + 1}</p>
          </>
        )
      }
    },
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

  const onChange = async (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
    console.log({ pagination, filters, sorter, extra });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={
          {
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
          }}
        onChange={onChange}
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