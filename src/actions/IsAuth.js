export default function IsAuth () {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}