import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import userApi from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitForm = async () => {
        const res = await userApi.create(fullName, email, password, phone);
        if (res?.data) {
            notification.success({
                message: "Create user",
                description: "Create user successfully!"
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
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table users</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create User</Button>
            </div>

            <Modal
                title="Create user"
                open={isModalOpen}
                onOk={() => handleSubmitForm()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <span>Phone number</span>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm;
