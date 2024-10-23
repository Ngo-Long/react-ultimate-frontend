import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';

const ViewProductDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer
            width={"40vw"}
            title="Chi tiết sách"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Tiêu đề: {dataDetail.mainText}</p>
                <br />
                <p>Tác giả: {dataDetail.author}</p>
                <br />
                <p>Thể loại: {dataDetail.category}</p>
                <br />
                <p>Giá tiền: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
                <br />
                <p>Số lượng: {dataDetail.quantity}</p>
                <br />
                <p>Đã bán: {dataDetail.sold}</p>
                <br />
                <p>Ảnh bìa: </p>
                <div style={{
                    marginTop: "10px",
                    height: "100px", width: "150px",
                    border: "1px solid #ccc"
                }}>
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
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

export default ViewProductDetail;