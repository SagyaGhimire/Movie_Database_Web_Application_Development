import { useState } from "react";

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-2xl md:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden bg-slate-200 p-6 md:p-10">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
            alt="Cinema"
            className="h-full w-full rounded-[32px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/90" />
          <div className="absolute left-6 top-6 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900">Movie Database</h2>
            <p className="mt-2 max-w-xs text-sm text-slate-600">
              Securely sign in and manage your movie watchlist, reviews, and dashboard in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-600">Enter your account details to continue to the movie dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />

            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />

            <button type="submit" className="mt-3 rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700">
              Submit
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Not registered?{' '}
            <button type="button" onClick={onSwitchToRegister} className="font-semibold text-sky-600 hover:text-sky-700">
              Register Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
