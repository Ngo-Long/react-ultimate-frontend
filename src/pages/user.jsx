import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from "react";
import userApi from "../services/api.service";


const UserPage = () => {

    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [dataUsers, setDataUsers] = useState([]);

    //empty array => run once
    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        const res = await userApi.fetchAll(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                loadUser={loadUser}
                dataUsers={dataUsers}

                current={current}
                setCurrent={setCurrent}

                pageSize={pageSize}
                setPageSize={setPageSize}

                total={total}
            />
        </div>
    )
}

export default UserPage;