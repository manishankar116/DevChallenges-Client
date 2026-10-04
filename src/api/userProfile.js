import api, { API_BASE_URL } from "./axios";

const getUserProfile = async (username) => {
  const response = await api.get(`/user-profile/profile-data/${username}`);
  return response.data;
};

const updateProfile = async (profile) => {
  const data = new FormData();

  const profileFields = {
    fullname: profile.fullName,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    currentCompany: profile.currentCompany,
    currentRole: profile.currentRole,
    website: profile.website,
  };
  Object.entries(profileFields).forEach(([field, value]) => {
    if (value !== undefined && value !== null) {
      data.append(field, value);
    }
  });

  if (profile.profileImage) {
    data.append("profileImage", profile.profileImage);
  }

  const response = await api.patch("/user-profile/update-profile", data);
  return response.data;
};

const getStats = async (username) => {
  const response = await api.get(`/challenge/get-user-stats/${username}`);
  return response.data;
};

const resolveProfileImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  return new URL(imageUrl, API_BASE_URL).toString();
};

export { getUserProfile, getStats, updateProfile, resolveProfileImageUrl };
