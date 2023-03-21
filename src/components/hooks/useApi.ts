import axios from "axios";

const baseUrl = 'http://localhost:8252/';
const useApi = () => {
    const fetchGet = (endPoint: string) => {
        return axios.get(`${baseUrl}${endPoint}`);
    }

    const fetchPost = (endPoint: string,payLoad:string) => {
        return axios.post(`${baseUrl}${endPoint}`,`${payLoad}`);
    }

    return {fetchGet,fetchPost}
}


export default useApi