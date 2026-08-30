import React, { useState } from 'react';
import {
  FileCode,
  Server,
  Database,
  ArrowRight,
  User,
  Layers,
  Sparkles,
  Check,
  RefreshCw,
} from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const StaticVsDynamicView: React.FC = () => {
  const [mode, setMode] = useState<'static' | 'dynamic'>('static');
  const [studentId, setStudentId] = useState<'1' | '2' | '3'>('1');
  const [isAnimating, setIsAnimating] = useState(false);

  const studentsMock = {
    '1': { name: 'Ali Bin Ahmad', programme: 'Sijil Teknologi Maklumat', gpa: '3.85', status: 'Aktif' },
    '2': { name: 'Siti Nurhaliza', programme: 'Sijil Teknologi Maklumat', gpa: '3.92', status: 'Aktif' },
    '3': { name: 'Muhammad Danish', programme: 'Sijil Teknologi Maklumat', gpa: '3.70', status: 'Aktif' },
  };

  const handleSimulate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          4.1 & 4.2 • KONSEP LAMAN WEB
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Laman Web Statik vs Laman Web Dinamik
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Ketahui perbezaan antara laman web HTML biasa (Statik) dengan laman web berasaskan PHP & Database (Dinamik).
        </p>
      </div>

      <SimNotice />

      {/* Mode Selector Toggle */}
      <div className="flex items-center justify-center p-1 bg-slate-200/80 rounded-xl border border-slate-300 max-w-md mx-auto shadow-inner">
        <button
          id="btn-toggle-static"
          onClick={() => {
            setMode('static');
            handleSimulate();
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            mode === 'static'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-amber-500" />
          <span>STATIC WEBSITE</span>
        </button>

        <button
          id="btn-toggle-dynamic"
          onClick={() => {
            setMode('dynamic');
            handleSimulate();
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            mode === 'dynamic'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Server className="w-4 h-4 text-blue-200" />
          <span>DYNAMIC WEBSITE (PHP)</span>
        </button>
      </div>

      {/* Interactive Visual Comparison Flow */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                mode === 'static' ? 'bg-amber-500' : 'bg-blue-600'
              } animate-pulse`}
            />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {mode === 'static'
                ? 'Aliran Laman Web Statik (HTML & CSS Sahaja)'
                : 'Aliran Laman Web Dinamik (PHP + MySQL Database)'}
            </h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            {mode === 'static' ? 'Contoh: Halaman "About Us"' : 'Contoh: Sistem Maklumat Pelajar (SPMP)'}
          </span>
        </div>

        {/* Dynamic Pipeline Visualization */}
        {mode === 'static' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
            {/* Step 1: User */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 border border-amber-200">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">1. Pengguna (Browser)</h3>
              <p className="text-xs text-slate-500">Meminta fail about.html</p>
            </div>

            {/* Step 2: HTML File */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 border border-amber-200">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">2. Fail HTML Tetap</h3>
              <p className="text-xs text-slate-500">Kandungan statik yang dikod keras (Hardcoded)</p>
            </div>

            {/* Step 3: Result */}
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-amber-900 text-sm">3. Kandungan Sama (Same Content)</h3>
              <p className="text-xs text-slate-600">Semua pengguna melihat teks yang sama persis sepanjang masa.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 border border-blue-200">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">1. Pengguna Request</h3>
              <p className="text-xs text-slate-500">Pelajar pilih ID Pelajar yang ingin dilihat</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-indigo-900 text-sm">2. PHP Execution</h3>
              <p className="text-xs text-slate-500">Server menjalankan skrip PHP & bina query SQL</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 border border-purple-200">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-purple-900 text-sm">3. Database Query</h3>
              <p className="text-xs text-slate-500">MySQL pulangkan rekod pelajar</p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-emerald-900 text-sm">4. Different Content</h3>
              <p className="text-xs text-slate-600">HTML dinamik dibina mengikut profil pelajar semasa!</p>
            </div>
          </div>
        )}

        {/* Live Interactive Preview Box */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live Preview Hasil Web:
            </span>

            {mode === 'dynamic' && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Pilih ID Pelajar:</span>
                {(['1', '2', '3'] as const).map((id) => (
                  <button
                    key={id}
                    id={`btn-select-student-${id}`}
                    onClick={() => {
                      setStudentId(id);
                      handleSimulate();
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                      studentId === id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ID #{id}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Browser Window Simulation */}
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300 pl-2">
                {mode === 'static' ? 'http://localhost/about.html' : `http://localhost/student.php?id=${studentId}`}
              </span>
            </div>

            {mode === 'static' ? (
              <div className="space-y-2 p-3 bg-slate-900 rounded border border-slate-800">
                <h3 className="text-lg font-bold text-amber-400">Tentang Kolej Komuniti</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kolej Komuniti menyediakan latihan TVET berkualiti tinggi bagi melahirkan graduan berkemahiran dalam bidang Teknologi Maklumat.
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  *Teks ini ditulis kekal dalam fail .html dan tidak akan berubah melainkan fail disunting semula secara manual.
                </p>
              </div>
            ) : (
              <div className="space-y-3 p-3 bg-slate-900 rounded border border-blue-500/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-blue-300">Profil Pelajar Kolej Komuniti</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Status: {studentsMock[studentId].status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Nama Pelajar:</span>
                    <span className="font-bold text-white text-sm">{studentsMock[studentId].name}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Program:</span>
                    <span className="font-bold text-slate-200">{studentsMock[studentId].programme}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px]">Purata Nilai Gred (HPNM):</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{studentsMock[studentId].gpa}</span>
                  </div>
                </div>
                <p className="text-[11px] text-blue-300/80 italic">
                  *Kandungan ini dibaca terus daripada MySQL Database melalui PHP berdasarkan ID pilihan anda!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Code comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 block mb-1">
              Static Code (about.html):
            </span>
            <CodeBlock
              language="html"
              badgeType="html"
              title="about.html"
              code={`<!DOCTYPE html>
<html>
<body>
  <h1>Tentang Kolej Komuniti</h1>
  <p>Latihan TVET berkualiti tinggi.</p>
</body>
</html>`}
            />
          </div>

          <div>
            <span className="text-xs font-bold text-blue-700 block mb-1">
              Dynamic Code (student.php):
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="student.php"
              code={`<?php
$conn = mysqli_connect("localhost", "root", "", "student_db");
$id = $_GET['id'];
$sql = "SELECT * FROM students WHERE id = $id";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

echo "<h1>Profil: " . $row['name'] . "</h1>";
echo "<p>Program: " . $row['programme'] . "</p>";
?>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
