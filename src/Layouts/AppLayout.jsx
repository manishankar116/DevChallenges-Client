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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
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

      <Navbar
        user={user ? user : demoUser}
        onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
        isMenuOpen={isSidebarOpen}
      />
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 top-16 z-30 bg-black/30 md:hidden"
        />
      )}
      <Sidebar
        user={user && user !== null ? user : demoUser}
        stats={demoStats}
        isLoggedIn={isLoggedIn}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-16 md:ml-72">
        <Outlet context={{ user }} />
      </main>
    </div>
  )
}

export default AppLayout; 