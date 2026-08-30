import React, { useState } from 'react';
import { Lock, User, Key, CheckCircle2, XCircle, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const AuthView: React.FC = () => {
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('1234');
  const [authStatus, setAuthStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        if (username === 'student' && password === '1234') {
          setAuthStatus('success');
        } else {
          setAuthStatus('failed');
        }
      }, 700);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.6.6 • PENGESAHAN PENGGUNA (USER AUTHENTICATION)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          User Authentication Concept & Login Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Ketahui konsep asas bagaimana sistem web menyemak identiti pengguna (Username & Password) dengan mencocokkan rekod di dalam database.
        </p>
      </div>

      <SimNotice />

      {/* 1. Visual Flowchart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          Aliran Logik Log Masuk (Authentication Flow)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          {[
            { step: '1. USER', desc: 'Isi Borang Login' },
            { step: '2. PHP', desc: 'Terima POST User/Pass' },
            { step: '3. SQL QUERY', desc: 'SELECT * FROM users' },
            { step: '4. DATABASE', desc: 'Cari padanan rekod' },
            { step: '5. KEPUTUSAN', desc: 'Padan (YES) / Gagal (NO)' },
            { step: '6. SESI / OUTPUT', desc: 'Buka Dashboard' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
            >
              <span className="font-bold text-indigo-300 font-mono">{item.step}</span>
              <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Login Simulator */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              INTERACTIVE SIMULATOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Login Form & Verification Visualizer
            </h2>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
            Akaun Demo: <code className="text-amber-300 font-bold">student</code> / <code className="text-amber-300 font-bold">1234</code>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Login Form Left */}
          <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              Borang Log Masuk Pelajar (HTML Form)
            </h3>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Username:
                </label>
                <input
                  id="auth-input-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setAuthStatus('idle');
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="student"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5" /> Password:
                </label>
                <input
                  id="auth-input-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthStatus('idle');
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="1234"
                />
              </div>

              <button
                id="btn-auth-submit"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                LOGIN KE SISTEM
              </button>
            </form>

            {/* Auth Response Banner */}
            {authStatus === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 animate-fadeIn flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <strong>✓ Login Successful!</strong> Selamat datang, <strong>{username}</strong>. Padanan pengguna dijumpai dalam pangkalan data.
                </div>
              </div>
            )}

            {authStatus === 'failed' && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-300 animate-fadeIn flex items-center space-x-2">
                <XCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <div>
                  <strong>✗ Invalid Username or Password!</strong> Rekod tidak dijumpai dalam table <code>users</code>.
                </div>
              </div>
            )}
          </div>

          {/* PHP Backend Script Right */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              PHP Authentication Script (login_process.php):
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="login_process.php"
              code={`<?php
// 1. Terima data borang POST
$username = $_POST['username'];
$password = $_POST['password'];

// 2. Query untuk mencari padanan pengguna
$sql = "SELECT * FROM users 
        WHERE username = '$username' 
          AND password = '$password'";

$result = mysqli_query($conn, $sql);

// 3. Semak jika terdapat rekod sepadan
if (mysqli_num_rows($result) > 0) {
    // Pengguna sah
    echo "✓ Login Berjaya! Selamat datang.";
} else {
    // Pengguna tidak sah
    echo "✗ Ralat: Username atau password salah.";
}
?>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
