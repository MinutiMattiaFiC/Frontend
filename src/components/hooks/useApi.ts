import axios from "axios";

const baseUrl = 'http://localhost:8252/';
const useApi = () => {
    const fetchGet = (endPoint: string) => {
        return axios.get(`${baseUrl}${endPoint}`);
    }

    const fetchPost = () => {
        console.log("Eseguo chiamata api")
    }

    return {fetchGet,fetchPost}
}


export default useApi