import api from "./axios";

const getUserProfile = async (username) => {
    const response = await api.get(`/user-profile/profile-data/${username}`);

    return response.data;
}

const getProfile = async () => {
    const response = await api.get("/user-profile/profile-data");  
    return response.data;
}

export{ getUserProfile, getProfile};