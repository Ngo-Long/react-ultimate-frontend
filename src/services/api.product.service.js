import axios from './axios.customize';

const productApi = {

    create(data) {
        const URL_BACKEND = "/api/v1/book";
        return axios.post(URL_BACKEND, data);
    },

    // const data = { _id, thumbnail, mainText, author, price, quantity, category };
    update(data) {
        const URL_BACKEND = "/api/v1/book";
        return axios.put(URL_BACKEND, data);
    },

    fetchAll(current, pageSize) {
        const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
        return axios.get(URL_BACKEND);
    },

    delete(id) {
        const URL_BACKEND = `/api/v1/book/${id}`;
        return axios.delete(URL_BACKEND);
    }

}


export default productApi;