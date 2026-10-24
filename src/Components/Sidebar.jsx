import { useLocation, useNavigate } from 'react-router-dom';
import { getActiveSidebarItem } from '../utilities';
import { resolveProfileImageUrl } from '../api/userProfile';


const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconFile = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const IconSettings = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const Sidebar = ({ user, stats, isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { label: "View profile", icon: IconUser, link: `/profile/${user.username}/view`},
    { label: "My Challenges", icon: IconFile, link: `/profile/${user.username}`},
    { label: "Edit Profile", icon: IconUser, link: `/profile/${user.username}/update-profile`},
    { label: "Settings", icon: IconSettings },
  ];

  const activeItem = getActiveSidebarItem(
    location.pathname, user?.username
  );
  
  return (
    <aside
      id="profile-sidebar"
      className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-72 max-w-[calc(100vw-3rem)] shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-slate-50 px-6 py-8 transition-transform md:z-40 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
    <div className="flex flex-col items-center text-center">
        <img
          src={
            resolveProfileImageUrl(user.profileImageUrl) ||
            user.avatarUrl ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=mani-shankar"
          }
          alt={user.fullname || user.fullName || user.name || user.username}
          className="mb-4 h-28 w-28 rounded-full object-cover"
        />

        <p className="text-sm text-slate-500">@{user.username}</p>
        <p className="text-sm text-slate-500">{user.currentRole}</p>
        <p className="text-sm leading-relaxed text-slate-500">
          {user.bio}
        </p>
      </div>

      <div className="mt-6 flex divide-x divide-slate-200 border-y border-slate-200 py-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center">
            <span className="text-lg font-bold text-slate-900">
              {s.value}
            </span>
            <span className="text-xs text-slate-500">{s.label}</span>
          </div>
        ))}
      </div>

      {user.isOwner && (
        <button
          onClick={() => {
            navigate("/create-challenge");
            onClose();
          }}
          type="button"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <IconPlus className="h-4 w-4" />
          Log a New Challenge
        </button>
      )}

      {user.isOwner && (
        <nav className="mt-6 space-y-1">
          {navItems.map(({ label, icon: Icon, link }) => {
            const active = label === activeItem;

            return (
              <button
                onClick={() => {
                  navigate(link);
                  onClose();
                }}
                key={label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </button>
            );
          })}
        </nav>
      )}
    </aside>
  )
}

export default Sidebar