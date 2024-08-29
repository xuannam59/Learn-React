import { Table } from 'antd';

const UserTable = (props) => {
  const { dataUsers } = props;
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

  return (
    <Table
      columns={columns}
      dataSource={dataUsers}
      rowKey={"_id"}
    />
  );
}

export default UserTable;