import axios from "axios";
import useToken from "./useToken";
import {useCallback} from "react";

const baseUrl = 'http://localhost:8252/';
const useApi = () => {
    const apiToken = useToken()
    const fetchGet = (endPoint: string) => {
        return axios.get(`${baseUrl}${endPoint}`);
    }

    const fetchPost = useCallback ((endPoint: string,payLoad:Record<string, any>) => {
        return axios.post(`${baseUrl}${endPoint}`,{
            api_token : apiToken,
            ...payLoad
        });
    },[apiToken])

    return {fetchGet,fetchPost}
}


export default useApi