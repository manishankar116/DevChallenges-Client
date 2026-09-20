import api from "./axios";

const getChallenges = async (username) => {
    const response = await api.get(`/challenge/get-challenges-by-user/${username}`);
    return response.data;
}

const getChallengeById = async (challengeId) => {
    const response = await api.get(`/challenge/get-challenge-by-id/${challengeId}`);
    return response.data;
}

const createChallenge = async (challengeData) => {
    const response = await api.post('/challenge/create-challenge', challengeData);
    return response.data;
}

export { getChallenges, getChallengeById, createChallenge };