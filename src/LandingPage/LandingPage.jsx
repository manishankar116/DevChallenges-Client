import React from "react";

/*
 * Self-contained icons
 * ------------------------------------------------------------
 * The previous version imported icons from lucide-react. Some project
 * versions of lucide-react don't expose the same named exports, which
 * causes Vite module errors. These small SVG icons keep this page
 * dependency-free and avoid that problem.
 */
function Icon({ name, className = "", strokeWidth = 2, ...props }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };

  const paths = {
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    barChart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16v-5" /><path d="M12 16V8" /><path d="M16 16V4" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" /></>,
    fileCode: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="m10 13-2 2 2 2" /><path d="m14 13 2 2-2 2" /></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4" /><path d="m15.4 6.5-6.8 4" /></>,
    sparkles: <><path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2Z" /><path d="m19 13-.8 2.2L16 16l2.2.8L19 19l.8-2.2L22 16l-2.2-.8Z" /><path d="m5 14-.7 1.8L2.5 16.5l1.8.7L5 19l.7-1.8 1.8-.7-1.8-.7Z" /></>,
    twitter: <><path d="M18 4h3l-6.5 7.4L22 20h-6l-4.7-5.5L6.5 20H3.5l6.9-7.9L4 4h6l4.2 5Z" /></>,
    user: <><circle cx="12" cy="7" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    zap: <path d="m13 2-9 12h7l-1 8 9-12h-7Z" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    play: <path d="m8 5 11 7-11 7Z" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {paths[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

const Code2 = (props) => <Icon name="code" {...props} />;
const ArrowRight = (props) => <Icon name="arrowRight" {...props} />;
const ArrowUpRight = (props) => <Icon name="arrowUpRight" {...props} />;
const BarChart3 = (props) => <Icon name="barChart" {...props} />;
const BookOpen = (props) => <Icon name="book" {...props} />;
const Check = (props) => <Icon name="check" {...props} />;
const ChevronRight = (props) => <Icon name="chevronRight" {...props} />;
const Database = (props) => <Icon name="database" {...props} />;
const FileCode2 = (props) => <Icon name="fileCode" {...props} />;
const FileText = (props) => <Icon name="fileText" {...props} />;
const Globe2 = (props) => <Icon name="globe" {...props} />;
const Menu = (props) => <Icon name="menu" {...props} />;
const Close = (props) => <Icon name="close" {...props} />;
const Send = (props) => <Icon name="send" {...props} />;
const Share2 = (props) => <Icon name="share" {...props} />;
const Sparkles = (props) => <Icon name="sparkles" {...props} />;
const Twitter = (props) => <Icon name="twitter" {...props} />;
const User = (props) => <Icon name="user" {...props} />;
const Users = (props) => <Icon name="users" {...props} />;
const Zap = (props) => <Icon name="zap" {...props} />;
const Github = (props) => <Icon name="code" {...props} />;
const Linkedin = (props) => <Icon name="share" {...props} />;
const Youtube = (props) => <Icon name="play" {...props} />;
const Instagram = (props) => <Icon name="sparkles" {...props} />;
const LockKeyhole = (props) => <Icon name="lock" {...props} />;
const Play = (props) => <Icon name="play" {...props} />;

/**
 * Landing Page
 * ------------------------------------------------------------
 * Built to closely reproduce the supplied DevChallenges landing-page
 * reference using React + Tailwind CSS.
 *
 * Requirements:
 *   npm install lucide-react
 *
 * The page does not require any image assets. The profile/challenge
 * preview and the illustration in the About section are recreated
 * with Tailwind/CSS so the component remains self-contained.
 */

const features = [
  {
    title: "Document Challenges",
    description:
      "Write about the problems you faced, the approaches you tried, and how you solved them.",
    icon: FileText,
    iconClass: "text-blue-600",
    boxClass: "bg-blue-50",
  },
  {
    title: "Rich Content Support",
    description:
      "Add code snippets, configurations, logs, and detailed explanations with a clean editor.",
    icon: Code2,
    iconClass: "text-emerald-500",
    boxClass: "bg-emerald-50",
  },
  {
    title: "Track Your Impact",
    description:
      "See profile views and challenge performance with detailed analytics.",
    icon: BarChart3,
    iconClass: "text-violet-600",
    boxClass: "bg-violet-50",
  },
  {
    title: "Shareable Portfolio",
    description:
      "Get a public profile link to add to your resume, LinkedIn, or job applications.",
    icon: Share2,
    iconClass: "text-orange-500",
    boxClass: "bg-orange-50",
  },
];

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description: "Sign up and set up your profile in minutes.",
    icon: User,
    boxClass: "bg-blue-50",
    iconClass: "text-blue-600",
  },
  {
    number: "2",
    title: "Add Your Challenges",
    description: "Document the problems you faced and how you solved them.",
    icon: FileText,
    boxClass: "bg-violet-50",
    iconClass: "text-violet-600",
  },
  {
    number: "3",
    title: "Track Your Progress",
    description: "See views and engagement on your profile.",
    icon: BarChart3,
    boxClass: "bg-emerald-50",
    iconClass: "text-emerald-500",
  },
  {
    number: "4",
    title: "Share with the World",
    description: "Use your public profile link in resumes and job applications.",
    icon: Share2,
    boxClass: "bg-orange-50",
    iconClass: "text-orange-500",
  },
];

function Logo() {
  return (
    <a href="#home" className="flex shrink-0 items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
        <Code2 className="h-7 w-7 text-blue-600" strokeWidth={2.7} />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        DevChallenges
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navItems = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Features", "#features"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href], index) => (
            <a
              key={label}
              href={href}
              className={`relative py-6 text-sm font-semibold transition ${
                index === 0
                  ? "text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
        >
          {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-5 py-3 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 flex gap-3 border-t border-slate-100 pt-3">
              <a
                href="/login"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function FloatingLabel({ className = "", icon: Icon, children }) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-3.5 py-2.5 shadow-[0_14px_35px_rgba(30,64,175,0.14)] backdrop-blur ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
        <Icon className="h-4 w-4 text-amber-500" />
      </span>
      <span className="text-[11px] font-bold leading-tight text-slate-800">
        {children}
      </span>
    </div>
  );
}

function ChallengePreview() {
  return (
    <div className="relative mx-auto h-[470px] w-full max-w-[600px]">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />

      <FloatingLabel
        icon={Sparkles}
        className="left-3 top-1 rotate-[-5deg] sm:left-10"
      >
        <span>Real Problems</span>
        <br />
        <span>Real Solutions</span>
      </FloatingLabel>

      <FloatingLabel
        icon={Send}
        className="bottom-4 right-0 rotate-[-4deg] sm:right-3"
      >
        <span>Share your journey</span>
        <br />
        <span>with the world</span>
      </FloatingLabel>

      {/* Profile card */}
      <div className="absolute left-5 top-20 w-[190px] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.12)] sm:left-14 sm:w-[205px] lg:left-4">
        <div className="absolute -right-1 top-9 h-3 w-3 rotate-45 border-r border-t border-slate-100 bg-white" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-blue-50 bg-gradient-to-br from-slate-200 to-slate-400">
          <User className="h-9 w-9 text-slate-600" />
        </div>

        <div className="mt-2 text-center">
          <p className="text-sm font-extrabold text-slate-900">Mani Shankar</p>
          <p className="text-[10px] font-medium text-slate-500">
            Backend Developer
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-[9px] font-semibold text-blue-600">
            <Globe2 className="h-3 w-3" />
            maniDevChallenges.com
            <ArrowUpRight className="h-2.5 w-2.5" />
          </div>
        </div>

        <div className="my-4 grid grid-cols-3 divide-x divide-slate-100 text-center">
          <div>
            <p className="text-sm font-extrabold text-slate-900">12</p>
            <p className="text-[8px] text-slate-400">Challenges</p>
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900">3.2K</p>
            <p className="text-[8px] text-slate-400">Views</p>
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900">28</p>
            <p className="text-[8px] text-slate-400">Technologies</p>
          </div>
        </div>

        <p className="mb-2 text-[9px] font-bold text-slate-800">
          Top Technologies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Java", "Spring Boot", "PostgreSQL", "React"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Challenge card */}
      <div className="absolute right-0 top-24 w-[330px] rounded-2xl border border-white bg-white p-3 shadow-[0_25px_65px_rgba(15,23,42,0.14)] sm:right-4 sm:w-[380px]">
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-extrabold text-slate-900 sm:text-xs">
              Database Connection Timeout in Production
            </p>
            <div className="mt-1 flex items-center gap-3 text-[8px] text-slate-400">
              <span className="flex items-center gap-1">
                <Globe2 className="h-2.5 w-2.5" />
                421 views
              </span>
              <span>Aug 12, 2026</span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[92px_1fr] overflow-hidden rounded-xl border border-slate-100">
          <div className="bg-slate-50 p-2.5">
            {[
              ["Description", true],
              ["Expected Result", false],
              ["Actual Result", false],
              ["Attempts", false],
              ["Solution", false],
              ["Learnings", false],
            ].map(([label, active]) => (
              <div
                key={label}
                className={`mb-1 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[8px] font-semibold ${
                  active
                    ? "border-l-2 border-blue-500 bg-white text-blue-600 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                <FileCode2 className="h-3 w-3" />
                {label}
              </div>
            ))}
          </div>

          <div className="p-3">
            <p className="text-[10px] font-extrabold text-slate-800">
              Description
            </p>
            <p className="mt-2 text-[8px] leading-relaxed text-slate-500">
              The application started experiencing database connection
              timeouts when multiple requests were processed simultaneously.
              This was happening intermittently and affecting API response
              time.
            </p>

            <div className="mt-3 rounded-lg bg-slate-900 p-2.5 font-mono text-[7px] leading-relaxed text-slate-300">
              spring.datasource.url=jdbc:postgresql://
              <br />
              spring.datasource.username=****
              <br />
              spring.datasource.hikari.maximum-pool-size=10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#f5f7ff] via-white to-[#eef6ff]"
    >
      <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute right-[-80px] top-12 h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-4 px-5 pb-8 pt-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-10 lg:pt-12">
        <div className="relative z-10 max-w-[600px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Document&nbsp; · &nbsp;Learn&nbsp; · &nbsp;Share&nbsp; · &nbsp;Grow.
          </div>

          <h1 className="text-[42px] font-black leading-[1.06] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[54px]">
            Turn Your
            <br />
            Developer Journey
            <br />
            Into a{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Portfolio
            </span>
          </h1>

          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-slate-500 sm:text-base">
            DevChallenges helps developers document real coding challenges,
            solutions, and key learnings — and turn them into a beautiful,
            shareable portfolio that stands out to recruiters.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/profile/example"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-6 py-3.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              View Example Profile
            </a>
          </div>

          <div className="mt-8 grid max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Shareable Profile",
                subtitle: "Add to your resume",
                box: "bg-emerald-50",
                iconClass: "text-emerald-500",
              },
              {
                icon: FileText,
                title: "Document Real Experience",
                subtitle: "With code explanations",
                box: "bg-violet-50",
                iconClass: "text-violet-600",
              },
              {
                icon: Zap,
                title: "Get Discovered",
                subtitle: "By recruiters",
                box: "bg-orange-50",
                iconClass: "text-orange-500",
              },
            ].map(({ icon: Icon, title, subtitle, box, iconClass }) => (
              <div key={title} className="flex items-center gap-2.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${box}`}
                >
                  <Icon className={`h-5 w-5 ${iconClass}`} />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-slate-800">
                    {title}
                  </p>
                  <p className="text-[10px] text-slate-400">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-5 min-h-[470px] lg:mt-0">
          <ChallengePreview />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Everything You Need to Build Your Developer Portfolio
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            A simple and powerful platform to document, organize, and share
            your real-world development experience.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(
            ({ title, description, icon: Icon, iconClass, boxClass }) => (
              <div
                key={title}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-[0_5px_22px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_18px_40px_rgba(37,99,235,0.08)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${boxClass}`}
                >
                  <Icon className={`h-6 w-6 ${iconClass}`} />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white pb-16 pt-1 sm:pb-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            How DevChallenges Works
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Get started in minutes and build your developer portfolio.
          </p>
        </div>

        <div className="relative mt-10 grid gap-9 md:grid-cols-4 md:gap-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-slate-200 md:block" />

          {steps.map(
            ({
              number,
              title,
              description,
              icon: Icon,
              boxClass,
              iconClass,
            }) => (
              <div key={number} className="relative text-center">
                <div
                  className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full ${boxClass}`}
                >
                  <Icon className={`h-7 w-7 ${iconClass}`} />
                </div>

                <div className="mt-4">
                  <p className="text-sm font-extrabold text-slate-900">
                    {number}. {title}
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[200px] text-xs leading-5 text-slate-500">
                    {description}
                  </p>
                </div>

                {number !== "4" && (
                  <ChevronRight className="absolute -right-3 top-6 hidden h-5 w-5 text-slate-300 md:block" />
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-20">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-violet-600 px-6 py-10 text-center shadow-[0_22px_50px_rgba(37,99,235,0.22)] sm:px-10 sm:py-11">
        <div className="absolute -left-10 bottom-[-100px] h-48 w-72 rounded-[50%] bg-blue-400/30 blur-2xl" />
        <div className="absolute right-[-30px] top-[-70px] h-48 w-72 rounded-[50%] bg-purple-400/30 blur-2xl" />

        <div className="relative">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Start Your Developer Journey Today
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100 sm:text-base">
            Create your profile, share your challenges, and showcase your
            skills to the world.
          </p>

          <a
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-extrabold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
          >
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </a>

          <p className="mt-3 text-xs font-medium text-blue-100">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutIllustration() {
  return (
    <div className="relative mx-auto h-[250px] max-w-[470px] overflow-hidden">
      <div className="absolute right-0 top-1/2 h-48 w-72 -translate-y-1/2 rounded-full bg-violet-100/80 blur-3xl" />

      <div className="absolute right-8 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500 shadow-lg">
        <Code2 className="h-6 w-6 text-white" />
      </div>

      <div className="absolute right-24 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 shadow-lg">
        <Sparkles className="h-6 w-6 text-amber-500" />
      </div>

      <div className="absolute bottom-7 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 shadow-lg">
        <FileText className="h-6 w-6 text-blue-500" />
      </div>

      {/* Person */}
      <div className="absolute bottom-0 left-1/2 h-[205px] w-[245px] -translate-x-1/2">
        <div className="absolute bottom-0 left-1/2 h-[125px] w-[190px] -translate-x-1/2 rounded-t-[80px] bg-blue-600" />
        <div className="absolute bottom-[92px] left-[75px] h-[100px] w-[90px] rounded-[48%] bg-[#f2b995]" />
        <div className="absolute bottom-[165px] left-[72px] h-[53px] w-[96px] rounded-[50%_50%_45%_45%] bg-slate-900" />
        <div className="absolute bottom-[120px] left-[98px] h-2 w-2 rounded-full bg-slate-800" />
        <div className="absolute bottom-[120px] left-[133px] h-2 w-2 rounded-full bg-slate-800" />
        <div className="absolute bottom-[105px] left-[111px] h-1.5 w-7 rounded-full bg-rose-300" />

        {/* Laptop */}
        <div className="absolute bottom-0 left-[10px] h-[82px] w-[225px] -skew-x-6 rounded-t-xl border-8 border-slate-700 bg-slate-200 shadow-xl">
          <div className="m-2 h-full rounded-md bg-blue-50" />
        </div>
        <div className="absolute bottom-[-5px] left-0 h-3 w-[250px] rounded-full bg-slate-700" />
      </div>

      <div className="absolute bottom-5 left-5 h-14 w-14 rounded-full border-[6px] border-blue-100 bg-blue-50" />
      <div className="absolute bottom-3 left-20 h-5 w-5 rounded-full bg-blue-500/20" />
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="overflow-hidden border-t border-slate-100 bg-gradient-to-br from-white to-[#f7f8ff] pt-10 pb-6 sm:py-16"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            About DevChallenges
          </h2>

          <p className="mt-3 max-w-[570px] text-sm leading-6 text-slate-500 sm:text-base">
            DevChallenges is a platform for developers to document real coding
            challenges, share their problem-solving approach, and build a
            professional portfolio. Our mission is to help developers
            showcase their true skills through real experiences and make their
            journey visible to the world.
          </p>

          <div className="mt-7 flex flex-wrap gap-7">
            {[
              {
                value: "5K+",
                label: "Developers",
                icon: Users,
                box: "bg-violet-50",
                iconClass: "text-violet-600",
              },
              {
                value: "12K+",
                label: "Challenges",
                icon: FileText,
                box: "bg-emerald-50",
                iconClass: "text-emerald-500",
              },
              {
                value: "500K+",
                label: "Profile Views",
                icon: Globe2,
                box: "bg-orange-50",
                iconClass: "text-orange-500",
              },
            ].map(({ value, label, icon: Icon, box, iconClass }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${box}`}
                >
                  <Icon className={`h-5 w-5 ${iconClass}`} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <AboutIllustration />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-[#f8faff] pt-10"
    >
      <div className="mx-auto grid max-w-[1280px] gap-9 px-5 pb-9 sm:px-8 md:grid-cols-[1.7fr_1fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-slate-500">
            Document. Learn. Share. Grow.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Product</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <a className="block hover:text-blue-600" href="#home">
              Home
            </a>
            <a className="block hover:text-blue-600" href="#about">
              About
            </a>
            <a className="block hover:text-blue-600" href="#features">
              Features
            </a>
            {/*<a className="block hover:text-blue-600" href="#pricing">
              Pricing
            </a>*/}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Resources</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <a className="block hover:text-blue-600" href="#contact">
              Help Center
            </a>
            <a className="block hover:text-blue-600" href="#contact">
              Contact Us
            </a>
            <a className="block hover:text-blue-600" href="#about">
              Developer Blog
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Legal</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <a className="block hover:text-blue-600" href="/privacy">
              Privacy Policy
            </a>
            <a className="block hover:text-blue-600" href="/terms">
              Terms of Service
            </a>
            <a className="block hover:text-blue-600" href="/cookies">
              Cookie Policy
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Follow Us</h3>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-blue-600 transition hover:-translate-y-0.5"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-800 transition hover:-translate-y-0.5"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-slate-800 transition hover:-translate-y-0.5"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-red-500 transition hover:-translate-y-0.5"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 DevChallenges. All rights reserved.</p>
          <p>
            Made for developers, by developers.{" "}
            <span className="text-red-500">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <About />
      </main>
      <Footer />
    </div>
  );
}
