import React from 'react';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { COMMON_MISTAKES, INDUSTRY_TIPS } from '../../data/courseData';
import { SimNotice } from '../common/SimNotice';

interface ProgressTipsViewProps {
  completedSections: string[];
  onNavigate: (section: any) => void;
}

export const ProgressTipsView: React.FC<ProgressTipsViewProps> = ({
  completedSections,
  onNavigate,
}) => {
  const allSectionsList = [
    { id: 'intro-home', title: '1. Pengenalan Kursus STM21673 & CLO1' },
    { id: 'static-vs-dynamic', title: '2. Perbandingan Laman Web Statik vs Dinamik' },
    { id: 'php-basics', title: '3. Asas PHP & Pelaksanaan Kod Server-Side' },
    { id: 'variables-types', title: '4. Variable ($) & 4 Jenis Data PHP' },
    { id: 'operators', title: '5. Operator Aritmetik & Perbandingan' },
    { id: 'conditions', title: '6. Struktur Kawalan Pilihan (if...else)' },
    { id: 'loops', title: '7. Gelung Pengulangan (for Loop)' },
    { id: 'database-table', title: '8. Asas Database, Table & SQL DDL' },
    { id: 'connection', title: '9. Sambungan Database (mysqli_connect)' },
    { id: 'full-flow', title: '10. Aliran Penuh Data (Full Pipeline)' },
    { id: 'crud-lab', title: '11. Makmal CRUD (INSERT, SELECT, UPDATE, DELETE)' },
    { id: 'search', title: '12. Carian Data & SQL LIKE Clause' },
    { id: 'auth', title: '13. Konsep Log Masuk & Authentication' },
    { id: 'code-explainer', title: '14. Penerangan Kod Baris Demi Baris' },
    { id: 'debug-lab', title: '15. Makmal Debugging & Baiki Ralat' },
    { id: 'games-quiz', title: '16. Permainan Interaktif & Kuiz Penilaian' },
    { id: 'mini-challenge', title: '17. 3 Cabaran Amali TVET' },
    { id: 'mini-project', title: '18. Projek Mini: Sistem Pendaftaran Pelajar' },
  ];

  const completionPercent = Math.min(
    100,
    Math.round((completedSections.length / allSectionsList.length) * 100)
  );

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.12 • KEMAJUAN, TIPS PEPERIKSAAN & RINGKASAN VISUAL
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Progress Tracker, Exam Tips & Cheat Sheet
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Pantau kemajuan pembelajaran kursus anda, semak senarai ralat lazim pelajar, dan gunakan ringkasan visual untuk persediaan amali TVET.
        </p>
      </div>

      <SimNotice />

      {/* 1. Progress & Achievement Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Kemajuan Pembelajaran Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {completedSections.length} daripada {allSectionsList.length} topik telah diterokai
              </p>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-3xl font-black text-indigo-400">{completionPercent}%</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Selesai</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Badge Unlocked */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                Lencana Pencapaian: {completionPercent >= 80 ? '🏆 TVET Web Developer Pro' : completionPercent >= 40 ? '⭐ PHP Apprentice' : '🌱 Beginner Explorer'}
              </span>
              <span className="text-[11px] text-slate-400">
                Teruskan melengkapkan makmal amali dan kuiz untuk mencapai 100% skor.
              </span>
            </div>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {allSectionsList.map((sec) => {
            const isDone = completedSections.includes(sec.id);

            return (
              <div
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-200 hover:bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <span className="truncate pr-2">{sec.title}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Common Mistakes & Exam Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Mistakes */}
        <div className="p-6 rounded-2xl border border-rose-500/30 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              4 Ralat Lazim Pelajar (Common Mistakes)
            </h2>
          </div>

          <div className="space-y-3">
            {COMMON_MISTAKES.slice(0, 4).map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-rose-300 block font-mono">
                  ✗ {m.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Penerangan:</strong> {m.note}
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-rose-300">
                  <span className="text-rose-400 font-bold block mb-0.5">Salah:</span>
                  {m.wrong}
                </div>
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 font-mono text-[11px] text-emerald-300">
                  <span className="text-emerald-400 font-bold block mb-0.5">Betul:</span>
                  {m.correct}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Exam Tips */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Lightbulb className="w-5 h-5" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              Tips Menghadapi Ujian Amali TVET
            </h2>
          </div>

          <div className="space-y-3">
            {INDUSTRY_TIPS.map((tip, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-emerald-300 block">
                  ✓ {tip.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Final Visual Summary / Cheat Sheet Mind Map */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            Ringkasan Visual Kursus (Cheat Sheet Mind Map)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-indigo-400 block text-sm">
              1. PHP SCRIPTING
            </span>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>Tag: <code className="text-amber-300">&lt;?php ... ?&gt;</code></li>
              <li>Pembolehubah: <code className="text-amber-300">$nama</code></li>
              <li>Output: <code className="text-amber-300">echo</code></li>
              <li>Tamat baris: <code className="text-amber-300">;</code></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-purple-400 block text-sm">
              2. MYSQL DBMS
            </span>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>Connect: <code className="text-amber-300">mysqli_connect()</code></li>
              <li>Host: <code className="text-amber-300">"localhost"</code></li>
              <li>Default User: <code className="text-amber-300">"root"</code></li>
              <li>DB Name: <code className="text-amber-300">"student_db"</code></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-emerald-400 block text-sm">
              3. ARAHAN SQL
            </span>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li><code className="text-emerald-300 font-bold">INSERT</code> &rarr; Tambah rekod</li>
              <li><code className="text-sky-300 font-bold">SELECT</code> &rarr; Baca rekod</li>
              <li><code className="text-amber-300 font-bold">UPDATE</code> &rarr; Kemaskini</li>
              <li><code className="text-rose-300 font-bold">DELETE</code> &rarr; Padam</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-pink-400 block text-sm">
              4. INTEGRASI FORM
            </span>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>Borang: <code className="text-amber-300">method="POST"</code></li>
              <li>Tindakan: <code className="text-amber-300">action="fail.php"</code></li>
              <li>Ambil: <code className="text-amber-300">$_POST['nama']</code></li>
              <li>Laksana: <code className="text-amber-300">mysqli_query()</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
