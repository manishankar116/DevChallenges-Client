import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar';
import { demoStats, demoUser } from '../Pages/Home';
import Sidebar from '../Components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AppLayout = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const [user, setUser] = React.useState(null);
  const {username} = useParams() // Get the username from the URL parameters

  useEffect(() => {
    const loadUser = async () => {
      try {
        if(username){
          const userData = await fetchUser(username); 
          setUser(userData);
        }
        else{
          return <Navigate to={"/login"} replace />
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-white">

      <Navbar user={user ? user : demoUser} />
      <Sidebar user={user && user !== null ? user : demoUser} stats={demoStats} isLoggedIn = {isLoggedIn} />

      <main className="pt-16 md:ml-72">
        <Outlet context={{ user }} />
      </main>
    </div>
  )
}

export default AppLayout; 