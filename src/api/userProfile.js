import api from "./axios";

const getUserProfile = async (username) => {
    const response = await api.get(`/user-profile/profile-data/${username}`);

    return response.data;
}

const updateProfile = async(data) => {
    const response = await api.patch('/user-profile/update-profile', data);
    return response.data;
}

const getStats = async(username) => {
    const response = await api.get(`/challenge/get-user-stats/${username}`);
    return response.data;
}   

/*const getProfile = async () => {
    const response = await api.get("/user-profile/profile-data");  
    return response.data;
}*/

export{ getUserProfile, getStats, updateProfile};