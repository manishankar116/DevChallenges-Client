import React from 'react'


const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const Navbar = ({ user, onMenuClick  }) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">      <div className="flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-blue-600"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>

        <button
          type="button"
          onClick={onMenuClick}
          className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <span className="text-lg font-bold text-slate-900">
          DevChallenges
        </span>
      </div>

      <div className="mx-6 hidden max-w-md flex-1 sm:block">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5">
          <IconSearch className="h-4 w-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search your challenges..."
            className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="text-slate-500 hover:text-slate-700"
        >
          <IconBell className="h-5 w-5" />
        </button>

        {user.isLoggedIn ? (
          <button type="button" className="flex items-center gap-2">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=mani-shankar"
              alt={user.fullname}
              className="h-9 w-9 rounded-full object-cover"
            />

            <span className="text-sm font-medium text-slate-700">
              {user.fullname}
            </span>

            <IconChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar