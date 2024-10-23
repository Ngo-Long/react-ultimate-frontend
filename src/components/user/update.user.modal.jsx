import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import userApi from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const {
        loadUser,
        dataUpdate,
        setDataUpdate,
        isModalUpdateOpen,
        setIsModalUpdateOpen,
    } = props;

    //next dataUpdate != prev dataUpdate
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])


    const handleSubmitForm = async () => {
        const res = await userApi.update(id, fullName, phone);
        if (res?.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully!"
            })

            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setPhone("");
        setFullName("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitForm()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>

                <div>
                    <span>Full Name</span>
                    <Input value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal;