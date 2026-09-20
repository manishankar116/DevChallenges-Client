import React from 'react';
import { demoChallenges, demoStats, demoUser } from './Home';
import { useUserStore } from '../store/userStore';
import { useEffect } from 'react';
import { getChallenges } from '../api/challenge';
import {useParams} from 'react-router-dom';
import {getUserProfile, getProfile} from '../api/userProfile';
import useAuthStore from '../store/useAuthStore';
import Feed from '../Components/Feed';

export default function Main() {
  const [userDetails, setUserDetails] = React.useState(null);
  const [challenges, setChallenges] = React.useState(demoChallenges);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const { username } = useParams();
  
  useEffect(() => { 
  const loadData = async () => {
    let data;
    let challengesData;
    try {
      if(username) {
        data = await getUserProfile(username);
        challengesData = await getChallenges(username);
        
      }
      else{
        //loggedin user profile
        data = await fetchUser();
        challengesData = await getChallenges(data.username);
      }
    }
    catch (error) {
      console.error("Error fetching user data:", error);
    }

    setChallenges(challengesData);
    setUserDetails(data ? { ...data, isLoggedIn } : null);
    
  };
  loadData();
  }, [fetchUser, isLoggedIn, username]);

  console.log("User Details:", userDetails);
  
  return (
    <div>
      <Feed challenges={challenges ? challenges : demoChallenges} totalCount={12} pageSize={5} />
    </div>
  );
}