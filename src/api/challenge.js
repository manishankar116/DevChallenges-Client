import api from "./axios";

const getChallenges = async (username) => {
    const response = await api.get(`/challenge/get-challenges-by-user/${username}`);
    return response.data;
}

const getChallengeById = async (challengeId) => {
    const response = await api.get(`/challenge/get-challenge/${challengeId}`);
    return response.data;
}

const createChallenge = async (challengeData) => {
    const response = await api.post('/challenge/create-challenge', challengeData);
    return response.data;
}

const updateChallenge = async (challenge) => {
    const response = await api.patch('/challenge/update-challenge', challenge)
    return response.data
}

const deleteChallenge = async (challengeId) => {
    const response = await api.delete(`/challenge/delete-challenge/${challengeId}`);
    return response.data;
}

const recordView = async (challengeId) => {
    const response = await api.post(`/challenge/${challengeId}/view`);
    return response.data;
}

export { getChallenges, getChallengeById, createChallenge, updateChallenge, deleteChallenge, recordView};