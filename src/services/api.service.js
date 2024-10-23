import axios from './axios.customize';

const userApi = {

    create(fullName, email, password, phone) {
        const URL_BACKEND = "/api/v1/user";
        const data = { fullName, email, password, phone };
        return axios.post(URL_BACKEND, data);
    },

    update(_id, fullName, phone) {
        const URL_BACKEND = "/api/v1/user";
        const data = { _id, fullName, phone };
        return axios.put(URL_BACKEND, data);
    },

    fetchAll(current, pageSize) {
        const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
        return axios.get(URL_BACKEND);
    },

    delete(id) {
        const URL_BACKEND = `/api/v1/user/${id}`;
        return axios.delete(URL_BACKEND);
    },

    uploadFile(file, folder) {
        const URL_BACKEND = `/api/v1/file/upload`;
        let config = {
            headers: {
                "upload-type": folder,
                "Content-Type": "multipart/form-data"
            }
        }

        const bodyFormData = new FormData();
        bodyFormData.append("fileImg", file)

        return axios.post(URL_BACKEND, bodyFormData, config);
    },

    updateAvatar(_id, fullName, phone, avatar) {
        const URL_BACKEND = "/api/v1/user";
        const data = {
            _id: _id,
            fullName: fullName,
            phone: phone,
            avatar: avatar,
        }
        return axios.put(URL_BACKEND, data);
    },

    register(fullName, email, password, phone) {
        const URL_BACKEND = "/api/v1/user/register";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone
        }
        return axios.post(URL_BACKEND, data);
    },

    login(email, password) {
        const URL_BACKEND = "/api/v1/auth/login";
        const data = {
            username: email,
            password: password,
            delay: 2000
        }
        return axios.post(URL_BACKEND, data);
    },

    getAccount() {
        const URL_BACKEND = "/api/v1/auth/account";
        return axios.get(URL_BACKEND);
    },

    logout() {
        const URL_BACKEND = "/api/v1/auth/logout";
        return axios.post(URL_BACKEND);
    }
}


export default userApi;