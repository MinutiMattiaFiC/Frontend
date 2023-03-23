const useToken = () => {
    const storedUser = localStorage.getItem('user');
    // @ts-ignore
    const user = JSON.parse(storedUser)
    return user.api_token;
}
export default useToken