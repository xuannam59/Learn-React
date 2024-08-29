import { Table } from 'antd';
import { fetchAllUserApi } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    loadUser()
    console.log("check 000");
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    }
  ];

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    setDataUsers(res.data);
  }


  return (
    <Table
      columns={columns}
      dataSource={dataUsers}
      rowKey={"_id"}
    />
  );
}

export default UserTable;