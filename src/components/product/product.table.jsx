import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';
import productApi from '../../services/api.product.service';
import ViewProductDetail from './view.product.detail';
import { useEffect, useState } from "react";
import CreateProductUncontrol from './create.product.uncontrol';
import UpdateProductControl from './update.product.controll';

const ProductTable = () => {

    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [dataProducts, setDataProducts] = useState([]);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    //empty array => run once
    useEffect(() => {
        loadProducts();
    }, [current, pageSize]);

    const loadProducts = async () => {
        setLoadingTable(true)

        const res = await productApi.fetchAll(current, pageSize);
        if (res.data) {
            setDataProducts(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }

        setLoadingTable(false)
    }

    const handleDeleteProduct = async (id) => {
        const res = await productApi.delete(id);
        if (res?.data) {
            notification.success({
                message: "Delete product",
                description: "Delete product successfully!"
            })

            await loadProducts();
        } else {
            notification.error({
                message: "Error product",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination) => {
        // setCurrent, setPageSize
        //nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) //"5" => 5
            }
        }

        //nếu thay đổi tổng số phần tử : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) //"5" => 5
            }
        }

    };

    const columns = [
        {
            title: '#',
            render: (_, record, index) => (index + 1) + (current - 1) * pageSize
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)

            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                    />

                    <Popconfirm
                        title="Xóa sách"
                        description="Bạn chắc chắn xóa sách này?"
                        onConfirm={() => handleDeleteProduct(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Popconfirm>
                </div>
            ),
        }
    ];

    return (
        <>
            <div style={{
                margin: "10px 0",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataProducts}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />

            {/* <UpdateProductModal
                loadProducts={loadProducts}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            /> */}

            <ViewProductDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />

            <CreateProductUncontrol
                loadProducts={loadProducts}
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
            />

            <UpdateProductControl
                dataUpdate={dataUpdate}
                loadProducts={loadProducts}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />

        </>

    )
}

export default ProductTable;