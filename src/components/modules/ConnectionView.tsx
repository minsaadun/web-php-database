import React, { useState } from 'react';
import { Link2, CheckCircle2, XCircle, Server, Database, ShieldAlert, Sparkles } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const ConnectionView: React.FC = () => {
  const [host, setHost] = useState('localhost');
  const [username, setUsername] = useState('root');
  const [password, setPassword] = useState('');
  const [dbName, setDbName] = useState('student_db');

  const [connStatus, setConnStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnect = () => {
    // Validation logic for simulation
    if (host !== 'localhost' && host !== '127.0.0.1') {
      setConnStatus('error');
      setErrorMessage(`mysqli_connect(): (HY000/2002): Host '${host}' tidak sah atau pelayan MySQL tidak aktif.`);
      return;
    }

    if (username !== 'root') {
      setConnStatus('error');
      setErrorMessage(`mysqli_connect(): (HY000/1045): Access denied for user '${username}'@'localhost'.`);
      return;
    }

    if (dbName !== 'student_db') {
      setConnStatus('error');
      setErrorMessage(`mysqli_connect(): (HY000/1049): Unknown database '${dbName}'. Sila semak ejaan nama pangkalan data.`);
      return;
    }

    setConnStatus('success');
    setErrorMessage('');
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          4.5 • SAMBUNGAN DATABASE (DATABASE CONNECTION)
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          PHP & MySQL Database Connection
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Sebelum data boleh dimasukkan atau diambil, fail PHP mesti membina jambatan komunikasi (connection) ke pelayan MySQL menggunakan fungsi <code className="text-blue-700 font-bold bg-blue-50 px-1 py-0.5 rounded">mysqli_connect()</code>.
        </p>
      </div>

      <SimNotice />

      {/* 1. Connection Concept & 4 Parameters */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-600" />
          4 Parameter Wajib Dalam mysqli_connect()
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase">
              PARAMETER 1
            </span>
            <h3 className="font-bold text-slate-900 font-mono text-sm">"localhost"</h3>
            <p className="text-xs text-slate-600">
              Nama pelayan/host di mana pangkalan data MySQL sedang beroperasi (Server Name).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-indigo-700 uppercase">
              PARAMETER 2
            </span>
            <h3 className="font-bold text-slate-900 font-mono text-sm">"root"</h3>
            <p className="text-xs text-slate-600">
              Nama pengguna default untuk pelayan MySQL tempatan seperti XAMPP / Laragon (Username).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase">
              PARAMETER 3
            </span>
            <h3 className="font-bold text-slate-900 font-mono text-sm">"" (Kosong)</h3>
            <p className="text-xs text-slate-600">
              Kata laluan (Password). Dalam XAMPP default, kata laluan bagi user root ialah kosong ("").
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">
              PARAMETER 4
            </span>
            <h3 className="font-bold text-slate-900 font-mono text-sm">"student_db"</h3>
            <p className="text-xs text-slate-600">
              Nama pangkalan data spesifik yang telah anda cipta di dalam phpMyAdmin (DB Name).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Connection Simulator */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">
              INTERACTIVE SIMULATOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Database Connection Simulator & Code Preview
            </h2>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
            mysqli_connect Lab
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Left */}
          <div className="lg:col-span-5 space-y-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Parameter Sambungan (Configuration):
            </span>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">1. Host Name:</label>
              <input
                id="input-conn-host"
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="localhost"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">2. MySQL Username:</label>
              <input
                id="input-conn-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="root"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">3. MySQL Password:</label>
              <input
                id="input-conn-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Default XAMPP ialah kosong"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">4. Database Name:</label>
              <input
                id="input-conn-db"
                type="text"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 font-mono text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="student_db"
              />
            </div>

            <button
              id="btn-test-connect"
              onClick={handleConnect}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
            >
              <Link2 className="w-4 h-4" />
              <span>TEST CONNECT DATABASE</span>
            </button>

            {/* Status Alert */}
            {connStatus === 'success' && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 animate-fadeIn flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <div>
                  <strong>✓ Sambungan Berjaya (Connected successfully):</strong> PHP berjaya berhubung dengan database <code>{dbName}</code>!
                </div>
              </div>
            )}

            {connStatus === 'error' && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 animate-fadeIn flex items-start space-x-2">
                <XCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <strong>✗ Connection Failed:</strong> {errorMessage}
                </div>
              </div>
            )}
          </div>

          {/* Generated PHP Code Right */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              PHP Connection Script (connection.php):
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="connection.php"
              code={`<?php
// 1. Membina sambungan ke MySQL DBMS
$conn = mysqli_connect(
    "${host || 'localhost'}",
    "${username || 'root'}",
    "${password}",
    "${dbName || 'student_db'}"
);

// 2. Semak status sambungan
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully to ${dbName}!";
?>`}
            />

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-blue-700 block">Fungsi die():</span>
              <p>
                Fungsi <code className="text-amber-800 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">die()</code> digunakan untuk menghentikan serta-merta seluruh pelaksanaan skrip PHP jika sambungan database gagal, mengelakkan ralat susulan pada arahan query.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
