import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar';
import { demoStats, demoUser } from '../Pages/Home';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const AppLayout = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-white">

      <Navbar user={user ? user : demoUser} />
      <Sidebar user={user && user !== null ? user : demoUser} stats={demoStats} activeItem="My Challenges" />

      <main className="pt-16 md:ml-72">
        <Outlet />
      </main>
      
    </div>
  )
}

export default AppLayout; 