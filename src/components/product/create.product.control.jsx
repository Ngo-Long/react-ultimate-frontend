import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import productApi from "../../services/api.product.service";
import userApi from "../../services/api.service";

const CreateBookControl = (props) => {
    const { loadProducts } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitForm = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng chọn ảnh!"
            })
            return;
        }

        //step 1: upload file
        const resUpload = await userApi.uploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;

            //step 2: create book
            const resBook = await productApi.create({
                mainText, author,
                price, quantity, category,
                thumbnail: newThumbnail
            });

            if (resBook.data) {
                notification.success({
                    message: "Create book",
                    description: "Tạo mới sách thành công"
                })

                resetAndCloseModal()
                await loadProducts();
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPreview(null);

        setIsModalOpen(false);
        setSelectedFile(null);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="product-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table products</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create book</Button>
            </div>

            <Modal
                title="Create product"
                open={isModalOpen}
                onOk={() => handleSubmitForm()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(e) => setMainText(e.target.value)}
                        />
                    </div>

                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} />
                    </div>

                    <div>
                        <span>Giá tiền</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => { setPrice(event) }}
                        />
                    </div>

                    <div>
                        <span>Số lượng</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }}
                        />
                    </div>

                    <div>
                        <span>Thể loại</span>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(value) => { setCategory(value) }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>

                    <div>
                        <div>Ảnh thumbnail</div>
                        <div>
                            <label htmlFor='btnUpload' style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload
                            </label>
                            <input
                                type='file' hidden id='btnUpload'
                                onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateBookControl;
