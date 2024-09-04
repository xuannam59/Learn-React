import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAllBookApi } from "../../services/api.service";

const BookTable = (props) => {
  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    const res = await fetchAllBookApi(current, pageSize);
    if (res.data) {
      setDataBooks(res.data.result);
      setCurrent(res.data.meta.current)
      setPageSize(res.data.meta.pageSize)
      setTotal(res.data.meta.total)
    }
  }
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => <p>{(index + 1) + (current - 1) * pageSize}</p>
    },
    {
      title: 'id',
      dataIndex: '_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'mainText',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      render: (text, record, index, action) => {
        if (text)
          return new Intl.NumberFormat('vi-VN',
            { style: 'currency', currency: 'VND' }).format(text);
      }
    },
    {
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <div style={{ display: "flex", gap: "20px" }}>
              <EditOutlined />
              <DeleteOutlined />
            </div>
          </>
        )
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        <h3>Table book</h3>
        <Button type="primary"> Create</Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) },
        }}
        onChange={onChange}
      />
    </>
  );
}

export default BookTable;