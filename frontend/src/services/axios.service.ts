import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 20000,
    withCredentials: true,
});

const httpGet = async (url: string) => {
    return await instance.get(url);
};

const httpPost = async (url: string, data?: any, config?: any) => {
    return await instance.post(url, data, config);
};

export { httpGet, httpPost };
