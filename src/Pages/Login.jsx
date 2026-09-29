import React from 'react';
import { googleAuth, login as loginUser } from '../api/auth';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = await loginUser(email, password);
      login(userData, userData.token);
      localStorage.setItem('token', userData.token);
      window.location.href = '/profile';
    } catch {
      window.alert('Login failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
  const labelClassName = 'mb-1.5 block text-sm font-semibold text-slate-700';

  return (
    <main className="min-h-screen bg-[#f5f7fc] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] max-w-6xl items-center justify-center sm:min-h-[calc(100svh-5rem)]">
        <section className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(30,41,59,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="hidden flex-col justify-between bg-gradient-to-br from-blue-50 via-white to-violet-50 p-10 lg:flex xl:p-12">
            <a href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
                </svg>
              </span>
              <span className="text-lg font-extrabold text-slate-900">DevChallenges</span>
            </a>

            <div className="my-12">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Welcome back</p>
              <h2 className="mt-4 max-w-sm text-4xl font-black leading-tight text-slate-950">
                Pick up where your story left off.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">
                Keep documenting the challenges you solve and the skills you build along the way.
              </p>

              <div className="mt-9 space-y-4 text-sm font-medium text-slate-700">
                <p className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">1</span>
                  Continue sharing real-world solutions
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">2</span>
                  Keep your developer portfolio up to date
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-700">3</span>
                  Share what you learn with the community
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500">Document. Learn. Share. Grow.</p>
          </aside>

          <div className="p-6 sm:p-10 lg:p-12">
            <a href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
                </svg>
              </span>
              <span className="text-lg font-extrabold text-slate-900">DevChallenges</span>
            </a>

            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-700">Your portfolio is waiting</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Sign in to DevChallenges</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access your profile, challenges, and developer journey.
              </p>
            </div>

            <button
              type="button"
              onClick={googleAuth}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
                <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z" />
                <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z" />
                <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z" />
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">or sign in with email</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={labelClassName}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClassName}>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <a href="/register" className="font-semibold text-blue-700 hover:text-blue-800 hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;