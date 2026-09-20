import React, { useState } from "react";

/* --------------------------------- Icons (inline SVG, no npm deps) --------------------------------- */

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

const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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

const IconEye = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* --------------------------------- Shared bits --------------------------------- */

const TAG_STYLES = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-rose-50 text-rose-600",
};

function Tag({ children, tone = "blue" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TAG_STYLES[tone]}`}>
      {children}
    </span>
  );
}

/* --------------------------------- Navbar --------------------------------- */

export function Navbar({ user }) {
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

        <span className="text-lg font-bold text-slate-900">
          DevJourney
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
  );
}
/* --------------------------------- Sidebar --------------------------------- */

export function Sidebar({ user, stats, activeItem = "My Challenges" }) {
  const navItems = [
    { label: "My Challenges", icon: IconFile },
    { label: "Edit Profile", icon: IconUser },
    { label: "Settings", icon: IconSettings },
  ];

  return (
      <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-slate-50 px-6 py-8 md:flex">      <div className="flex flex-col items-center text-center">
        <img
          src={
            user.avatarUrl ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=mani-shankar"
          }
          alt={user.name}
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
          type="button"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <IconPlus className="h-4 w-4" />
          Log a New Challenge
        </button>
      )}

      {user.isOwner && (
        <nav className="mt-6 space-y-1">
          {navItems.map(({ label, icon: Icon }) => {
            const active = label === activeItem;

            return (
              <button
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
  );
}
/* --------------------------------- Snippet preview (mock terminal / diagram) --------------------------------- */

function SnippetPreview({ snippet }) {
  if (snippet.type === "diagram") {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
        {snippet.nodes.map((node, i) => (
          <React.Fragment key={node.label}>
            <div className={`flex flex-col items-center gap-1 rounded-lg border px-2.5 py-2 text-[10px] font-semibold ${node.tone}`}>
              <span>{node.icon}</span>
              <span className="text-center leading-tight">{node.label}</span>
            </div>
            {i < snippet.nodes.length - 1 && (
              <IconArrowRight className="h-4 w-4 shrink-0 text-slate-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-xl bg-slate-900 p-3 font-mono text-[11px] leading-relaxed">
      {snippet.lines.map((line, i) => (
        <div key={i} className="flex gap-3">
          {snippet.numbered !== false && (
            <span className="w-3 shrink-0 select-none text-slate-500">{i + 1}</span>
          )}
          <span className={line.color || "text-slate-200"}>{line.text}</span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Challenge card --------------------------------- */

function ChallengeCard({ challenge }) {
  return (
<div className="flex flex-col rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:gap-8">
  
  {/* Content */}
  <div className="min-w-0 flex-1">
    <h3 className="text-lg font-bold text-slate-900">
      {challenge.title}
    </h3>

    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
      {challenge.description}
    </p>

    <div className="mt-3 flex flex-wrap gap-2">
      {challenge.environment?.map((t, i) => (
        <Tag key={i}>
          {t}
        </Tag>
      ))}
    </div>
  </div>

  {/* Right Section */}
  <div className="mt-4 flex shrink-0 items-center justify-between sm:mt-0 sm:w-36 sm:flex-col sm:items-end sm:gap-5">
    
    <div className="text-right">
      <p className="text-sm text-slate-500">
        {challenge.date}
      </p>

      <div className="mt-1.5 flex items-center justify-end gap-1.5 text-sm text-slate-400">
        <IconEye className="h-4 w-4" />
        {challenge.views}
      </div>
    </div>

    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
    >
      View
      <IconArrowRight className="h-3.5 w-3.5" />
    </button>
  </div>
</div>
  );
}

/* --------------------------------- Pagination --------------------------------- */

function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
        aria-label="Previous page"
      >
        <IconChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${
            p === page
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
        aria-label="Next page"
      >
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* --------------------------------- Feed --------------------------------- */

export function Feed({ challenges, totalCount, pageSize = 5 }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("Latest");
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex-1 px-6 py-8 sm:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Challenges</h1>
          <p className="mt-1 text-slate-500">A collection of real-world problems I faced and how I solved them.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none"
            >
              <option>Latest</option>
              <option>Oldest</option>
              <option>Most viewed</option>
            </select>
            <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {challenges?.map((c, i) => (
          <ChallengeCard key={i} challenge={c} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-slate-500">
          Showing {challenges?.length} of {totalCount} challenges
        </p>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

/* --------------------------------- Demo data --------------------------------- */

export const demoUser = {
  name: "Mani Shankar",
  role: "Backend Developer",
  bio: "I document the real-world engineering challenges I face and how I solve them.",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mani-shankar",
};

export const demoStats = [
  { value: "12", label: "Challenges" },
  { value: "3.25K", label: "Views" },
  { value: "28", label: "Tags" },
];

export const demoChallenges = [
  {
    title: "Optimizing a Slow SQL Query in Production",
    description:
      "The orders API was taking 4+ seconds in production. I analyzed the query, added the right index, and reduced the response time to 180ms.",
    date: "Aug 22, 2024",
    views: "1.2K",
    tags: [
      { label: "Java", tone: "blue" },
      { label: "Spring Boot", tone: "green" },
      { label: "MySQL", tone: "purple" },
      { label: "Performance", tone: "orange" },
    ],
    snippet: {
      type: "code",
      lines: [
        { text: "SELECT * FROM orders", color: "text-sky-300" },
        { text: "WHERE user_id = ?", color: "text-sky-300" },
        { text: "ORDER BY created_at DESC", color: "text-sky-300" },
        { text: "LIMIT 10;", color: "text-sky-300" },
      ],
    },
  },
  {
    title: "Fixing Database Connection Issues in Docker",
    description:
      "The Spring Boot application was throwing connection errors when running in a Docker container. I identified the networking issue and fixed it using Docker Compose configuration.",
    date: "Aug 10, 2024",
    views: "980",
    tags: [
      { label: "Docker", tone: "blue" },
      { label: "Spring Boot", tone: "green" },
      { label: "MySQL", tone: "purple" },
      { label: "DevOps", tone: "orange" },
    ],
    snippet: {
      type: "code",
      numbered: false,
      lines: [
        { text: "org.springframework.dao.Da", color: "text-slate-300" },
        { text: "Caused by: com.mysql.cj.jdb", color: "text-rose-400" },
        { text: "Communications link failure", color: "text-rose-400" },
        { text: "", color: "text-slate-300" },
        { text: "The last packet sent success", color: "text-slate-300" },
      ],
    },
  },
  {
    title: "Implementing JWT Authentication",
    description:
      "Implemented secure JWT authentication with access and refresh tokens. Handled token expiration and implemented a custom filter in Spring Security.",
    date: "Jul 28, 2024",
    views: "860",
    tags: [
      { label: "Java", tone: "blue" },
      { label: "Spring Boot", tone: "green" },
      { label: "JWT", tone: "purple" },
      { label: "Security", tone: "orange" },
    ],
    snippet: {
      type: "diagram",
      nodes: [
        { label: "Client", icon: "\u{1F5A5}", tone: "border-rose-200 bg-rose-50 text-rose-500" },
        { label: "API Gateway", icon: "\u{1F517}", tone: "border-emerald-200 bg-emerald-50 text-emerald-600" },
        { label: "User Service", icon: "\u{1F464}", tone: "border-blue-200 bg-blue-50 text-blue-600" },
      ],
    },
  },
  {
    title: "Solving Redis Cache Returning Stale Data",
    description:
      "The application was returning old data even after updates. Investigated the cache configuration, found the TTL issue, and fixed it with proper eviction strategy.",
    date: "Jul 15, 2024",
    views: "1.5K",
    tags: [
      { label: "Redis", tone: "blue" },
      { label: "Spring Boot", tone: "green" },
      { label: "Cache", tone: "purple" },
      { label: "Troubleshooting", tone: "orange" },
    ],
    snippet: {
      type: "code",
      lines: [
        { text: "@Bean", color: "text-amber-300" },
        { text: "public RedisCacheManager", color: "text-sky-300" },
        { text: "  return RedisCacheManage", color: "text-slate-200" },
        { text: "    .cacheDefaults(confi", color: "text-slate-200" },
        { text: "    .build();", color: "text-slate-200" },
        { text: "}", color: "text-slate-200" },
      ],
    },
  },
  {
    title: "Docker Container Couldn't Connect to MySQL",
    description:
      "While running the application using Docker Compose, the backend container couldn't connect to MySQL. Fixed the issue by updating the network configuration and using service names.",
    date: "Jul 02, 2024",
    views: "720",
    tags: [
      { label: "Docker", tone: "blue" },
      { label: "MySQL", tone: "purple" },
      { label: "Networking", tone: "green" },
      { label: "Troubleshooting", tone: "orange" },
    ],
    snippet: {
      type: "code",
      numbered: false,
      lines: [
        { text: "Error response from daemon", color: "text-slate-200" },
        { text: "dial tcp 172.17.0.2:3306:", color: "text-slate-200" },
        { text: "connect: connection refused", color: "text-rose-400" },
      ],
    },
  },
];

/* --------------------------------- Page --------------------------------- */

