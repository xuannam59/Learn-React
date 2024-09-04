import { Drawer } from "antd";

const DetailBook = (props) => {
  const {
    isOpenDetail, setIsOpenDetail,
    dataDetail, setDataDetail
  } = props;

  return (
    <>
      <Drawer
        width={450}
        title="Basic Drawer"
        onClose={() => setIsOpenDetail(false)}
        open={isOpenDetail}
      >
        <p>id: {dataDetail._id}</p>
        <br />
        <p>Tiêu đề: {dataDetail.mainText}</p>
        <br />
        <p>Tác giả: {dataDetail.author}</p>
        <br />
        <p>Thể loại: {dataDetail.category}</p>
        <br />
        <p>Giá tiền: {new Intl.NumberFormat('vi-VN',
          { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
        <br />
        <p>Số lượng: {dataDetail.quantity}</p>
        <br />
        <p>Đã bán: {dataDetail.sold}</p>
        <br />
        <div style={{
          height: "200px",
          width: "250px",
          marginTop: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          padding: "16px 0"
        }}>
          <img
            src={`http://localhost:8080/images/book/${dataDetail.thumbnail}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </Drawer >
    </>
  );
}

export default DetailBook;