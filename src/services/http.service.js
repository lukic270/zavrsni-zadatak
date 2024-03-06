import axios from 'axios';

export default class HttpServices {

    static client = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            Accept: 'application/json'
        }

    });

    static async request({ method, url, data, params }) {
        let headers = {};

        const token = localStorage.getItem('token');

        if (token) {
            headers = {
                Authorization: 'Bearer ' + token
            };
        }

        const response = await this.client.request({
            method, url, data, params, headers
        });

        return response?.data;
    }
}
