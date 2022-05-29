export default function authHeader() {
    const user = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('user') : null);
    if (user && user.token) {
        console.log(user.token)
        return user.token
    } else {
        return {};
    }
}