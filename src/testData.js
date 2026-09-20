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