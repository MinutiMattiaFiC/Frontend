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

    const fetchDelete = useCallback ((endPoint: string) => {
        return axios.delete(`${baseUrl}${endPoint}`,{
            data:
                {api_token : apiToken}
        });
    },[apiToken])

    return {fetchGet,fetchPost,fetchDelete}
}


export default useApi