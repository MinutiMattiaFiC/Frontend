const useUser = () => {
    const storedUser = localStorage.getItem('user');
    let user = null;

    try {
        // @ts-ignore
        user = JSON.parse(storedUser);
    } catch (error) {
        console.error('Error parsing user data:', error);
    }

    return user
}
export default useUser