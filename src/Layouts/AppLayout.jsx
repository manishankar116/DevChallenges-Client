import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar';
import { demoUser } from '../Pages/Home';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { getStats } from '../api/userProfile';

const AppLayout = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const authUser = useAuthStore((state) => state.user);
  const [user, setUser] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const {username} = useParams();
  const profileUsername = username || (isLoggedIn ? authUser?.username : undefined);
  const fallbackUser = authUser &&
    (!username || authUser.username?.toLowerCase() === username.toLowerCase())
      ? { ...authUser, isOwner: Boolean(isLoggedIn) }
      : demoUser;
  const [userStats, setUserStats] = React.useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!profileUsername) {
        setUser(null);
        return;
      }

      try {
        const userData = await fetchUser(profileUsername);
        const isOwner = Boolean(
          isLoggedIn && authUser?.username &&
          authUser.username.toLowerCase() === profileUsername.toLowerCase()
        );
        setUser(userData ? { ...userData, isOwner } : null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUser();
  }, [authUser?.username, fetchUser, isLoggedIn, profileUsername]);

  useEffect(() => {
    let isCurrent = true;

    const loadStats = async () => {
      if (!profileUsername) {
        setUserStats(null);
        return;
      }

      setUserStats(null);
      try {
        const stats = await getStats(profileUsername);
        if (isCurrent) setUserStats(stats);
      } catch (error) {
        console.error("Error fetching user stats:", error);
        if (isCurrent) setUserStats(null);
      }
    };

    loadStats();
    return () => {
      isCurrent = false;
    };
  }, [profileUsername]);

  const sidebarStats = userStats
    ? [
        { value: userStats.challengeCount ?? 0, label: "Challenges" },
        { value: userStats.totalViews ?? 0, label: "Views" },
        { value: userStats.uniqueTagCount ?? 0, label: "Tags" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white">

      <Navbar
        user={user || fallbackUser}
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
        user={user || fallbackUser}
        stats={sidebarStats}
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