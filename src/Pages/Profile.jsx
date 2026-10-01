import React from 'react'
import useAuthStore from '../store/useAuthStore';
import api from '../api/axios';
const Profile = () => {

  const userToken = useAuthStore((state) => state.token);

  React.useEffect(() => {
    api.get('/user-profile/profile-data')
    .then((response) => {
      console.log("User Profile:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  }, [userToken]);

  return (
    <div>
        <p>{userToken}</p>
    </div>
  )
}

export default Profile