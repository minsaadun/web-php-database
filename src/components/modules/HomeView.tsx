import React from 'react';
import { NavSection } from '../../types';
import {
  Code2,
  Database,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Server,
  Layers,
  Terminal,
  Cpu,
  GraduationCap,
  PlayCircle,
} from 'lucide-react';
import { SimNotice } from '../common/SimNotice';

interface HomeViewProps {
  onStartLab: () => void;
  onSelectSection: (section: NavSection) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartLab, onSelectSection }) => {
  const learningOutcomes = [
    'Menerangkan fungsi dan ciri utama PHP sebagai server-side scripting language.',
    'Menulis sintaks asas PHP, membuka dan menutup tag <?php ?> serta kenyataan echo.',
    'Menggunakan variable ($), jenis data asas, dan operators matematik/perbandingan.',
    'Menggunakan struktur kawalan pilihan (if...else) dan gelung (for loop).',
    'Membina database dan table menggunakan arahan SQL (CREATE DATABASE & CREATE TABLE).',
    'Membina database connection menggunakan fungsi mysqli_connect().',
    'Melaksanakan operasi CRUD penuh: Insert, Retrieve, Update, dan Delete.',
    'Membina fungsi carian data (Search) menggunakan klausa SQL LIKE.',
    'Membina logik asas pengesahan pengguna (User Authentication).',
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 shadow-sm border border-blue-900/20">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded bg-blue-900/60 text-blue-100 border border-blue-400/30 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-200" /> STM21673 – WEB DEVELOPMENT
            </span>
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded bg-indigo-900/60 text-indigo-100 border border-indigo-400/30">
              Kolej Komuniti Malaysia • Semester 2
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-blue-200 uppercase">
              TOPIK 4: PHP & DATABASE CONNECTIVITY
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              PHP & DATABASE LAB
            </h1>
            <p className="text-base sm:text-lg font-medium text-blue-100 flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/10">HTML Form</span>
              <span className="text-blue-300">→</span>
              <span className="px-2 py-0.5 rounded bg-white/20 font-bold">PHP Script</span>
              <span className="text-blue-300">→</span>
              <span className="px-2 py-0.5 rounded bg-white/10 font-bold">SQL Query</span>
              <span className="text-blue-300">→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 font-bold text-emerald-200">MySQL Database</span>
            </p>
          </div>

          <p className="text-blue-50 max-w-2xl text-sm sm:text-base leading-relaxed">
            Selamat datang ke makmal pembelajaran interaktif TVET. Di sini anda akan melihat
            aliran data secara visual, mencuba kod PHP & SQL secara langsung, membaiki ralat,
            dan membina sistem pengurusan pelajar yang dinamik!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="btn-start-lab-hero"
              onClick={onStartLab}
              className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-lg bg-white text-blue-800 hover:bg-blue-50 font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-blue-700" />
              <span>MULA PHP LAB</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </button>

            <button
              id="btn-goto-crud"
              onClick={() => onSelectSection('crud-lab')}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-blue-900/60 hover:bg-blue-900 border border-blue-400/40 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              <Database className="w-4 h-4 text-emerald-300" />
              <span>Terus ke CRUD Lab</span>
            </button>
          </div>
        </div>
      </div>

      <SimNotice />

      {/* CLO1 P3 Highlight Banner */}
      <div className="rounded-xl border border-blue-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                COURSE LEARNING OUTCOME 1 (CLO1)
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800">
                Domain: P3 (Psychomotor) • PLO3
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              "Construct dynamic websites using appropriate web development tools and technologies."
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Oleh kerana tahap pembelajaran ialah <strong>P3 (Hands-on Practical)</strong>,
              anda akan <strong>TYPE, RUN, TEST, CONNECT, INSERT, RETRIEVE, UPDATE, DELETE, SEARCH</strong> dan <strong>LOGIN</strong> secara interaktif!
            </p>
          </div>
        </div>
      </div>

      {/* Visual Learning Cycle */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Pendekatan Pembelajaran 6-Langkah TVET
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '1', title: 'LIHAT ALIRAN', desc: 'Visualisasikan data' },
            { step: '2', title: 'FAHAM KONSEP', desc: 'Prinsip server-side' },
            { step: '3', title: 'CUBA KOD', desc: 'Taip sintaks PHP & SQL' },
            { step: '4', title: 'UJI', desc: 'Jalankan simulator live' },
            { step: '5', title: 'DEBUG', desc: 'Kesan & baiki ralat' },
            { step: '6', title: 'BINA', desc: 'Mini projek pelajar' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mb-2 font-mono">
                {item.step}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">{item.title}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9 Learning Outcomes Checklist */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Hasil Pembelajaran (Learning Outcomes)
          </h2>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">9 Modul Utama</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Pada akhir pembelajaran topik ini, pelajar boleh:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {learningOutcomes.map((lo, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                {idx + 1}
              </div>
              <span className="text-xs sm:text-sm text-slate-700 leading-snug">{lo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
