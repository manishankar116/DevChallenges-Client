import React from 'react';
import { demoChallenges } from './Home';
import { useUserStore } from '../store/userStore';
import { useEffect } from 'react';
import { getChallenges } from '../api/challenge';
import {Navigate, useParams} from 'react-router-dom';
import { getUserProfile} from '../api/userProfile';
import useAuthStore from '../store/useAuthStore';
import Feed from '../Components/Feed';
import ProfileDetailsPanel from '../Components/ProfileDetailsPanel';

export default function Main() {
  const [userDetails, setUserDetails] = React.useState(null);
  const [challenges, setChallenges] = React.useState(demoChallenges);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const loggedInUsername = useAuthStore((state) => state.user?.username);
  const { username } = useParams();
  const canManageChallenges = Boolean(
    isLoggedIn && loggedInUsername && username &&
    loggedInUsername.toLowerCase() === username.toLowerCase()
  );

  const handleDeleteChallenge = (challengeId) => {
    setChallenges((currentChallenges) =>
      currentChallenges.filter((challenge) => challenge.challengeId !== challengeId)
    );
  };
  
  useEffect(() => { 
  const loadData = async () => {
    let data;
    let challengesData;
    try {
      if(!username) {
        <Navigate to={"/login"} replace />
      }
      else{
        //loggedin user profile
        data = await getUserProfile(username);
        challengesData = await getChallenges(data.username);
      }

      setChallenges(challengesData);
      setUserDetails(data ? { ...data, isLoggedIn } : null);

    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }
    
  };
  loadData();
  }, [fetchUser, isLoggedIn, username]);
  
  return (
    <div className="flex items-start">
      <Feed
        challenges={challenges ? challenges : demoChallenges}
        totalCount={12}
        pageSize={5}
        onDelete={handleDeleteChallenge}
        canManageChallenges={canManageChallenges}
        profileUsername={username}
      />
      <ProfileDetailsPanel user={userDetails} />
    </div>
  );
}