import React from 'react'
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
const Profile = () => {

  const userToken = useAuthStore((state) => state.token);

  React.useEffect(() => {
    console.log("User Token:", userToken);
    axios.get('http://localhost:8080/api/user-profile/profile-data', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
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