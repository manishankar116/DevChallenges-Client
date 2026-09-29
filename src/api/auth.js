import api from "./axios";

const register = async (fullname, username, email, password) => {
    const response = await api.post("/auth/register", {fullname, username, email, password});
    return response.data;
}

const login = async (username, password) => {
    const response = await api.post("/auth/login", {username, password});
    return response.data;
}

const googleAuth = () => {
    window.location.assign("http://localhost:8080/oauth2/authorization/google");
}

export {register, login, googleAuth};