import api, { API_BASE_URL } from "./axios";

const register = async (fullname, username, email, password) => {
    const response = await api.post("/auth/register", {fullname, username, email, password});
    return response.data;
}

const checkUsernameAvailability = async (username) => {
    const response = await api.get("/auth/username-availability", {params: {username}});
    return response.data.available;
}

const login = async (username, password) => {
    const response = await api.post("/auth/login", {username, password});
    return response.data;
}

const googleAuth = () => {
    window.location.assign(`${API_BASE_URL}/oauth2/authorization/google`);
}

const usernames = async () => {
    const response = await api.get("/auth/usernames");
    return response.data;
};

export {register, checkUsernameAvailability, login, googleAuth, usernames};