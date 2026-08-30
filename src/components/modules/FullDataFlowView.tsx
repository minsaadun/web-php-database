import React, { useState } from 'react';
import {
  Share2,
  Play,
  RotateCcw,
  User,
  FileCode,
  Server,
  Database,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const FullDataFlowView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isFlowing, setIsFlowing] = useState<boolean>(false);
  const [dataName, setDataName] = useState<string>('Ali Bin Ahmad');
  const [dataEmail, setDataEmail] = useState<string>('ali@email.com');
  const [dataProg, setDataProg] = useState<string>('STM');

  const steps = [
    {
      id: 1,
      title: '1. USER & HTML FORM',
      subtitle: 'Pengguna isi borang',
      desc: 'Pengguna memasukkan data (Nama: Ali, Email: ali@email.com) ke dalam borang HTML dan menekan butang Submit.',
      icon: User,
      color: 'border-sky-500 bg-sky-950/40 text-sky-300',
    },
    {
      id: 2,
      title: '2. HTTP POST & PHP',
      subtitle: 'Data dihantar ke PHP',
      desc: 'Borang dihantar melalui kaedah HTTP POST ke fail register.php. PHP menerima nilai melalui superglobal array $_POST["nama"].',
      icon: Server,
      color: 'border-indigo-500 bg-indigo-950/40 text-indigo-300',
    },
    {
      id: 3,
      title: '3. SQL QUERY GENERATION',
      subtitle: 'PHP bina arahan SQL',
      desc: 'PHP menggabungkan data ke dalam kenyataan SQL INSERT INTO students (name, email, programme) VALUES ("Ali", ...)',
      icon: FileCode,
      color: 'border-purple-500 bg-purple-950/40 text-purple-300',
    },
    {
      id: 4,
      title: '4. MYSQL EXECUTION',
      subtitle: 'Query dihantar ke DBMS',
      desc: 'Fungsi mysqli_query($conn, $sql) menghantar arahan SQL kepada pelayan MySQL Database.',
      icon: Database,
      color: 'border-pink-500 bg-pink-950/40 text-pink-300',
    },
    {
      id: 5,
      title: '5. DATABASE TABLE STORED',
      subtitle: 'Rekod disimpan dalam table',
      desc: 'MySQL menambah satu baris rekod (Row) baharu ke dalam table students dengan ID automatik.',
      icon: TableIcon,
      color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
    },
    {
      id: 6,
      title: '6. PHP RESPONSE TO USER',
      subtitle: 'HTML maklumbalas dihantar',
      desc: 'PHP menjana HTML "Pendaftaran Berjaya!" dan menghantarnya semula ke skrin pelayar pengguna.',
      icon: Sparkles,
      color: 'border-amber-500 bg-amber-950/40 text-amber-300',
    },
  ];

  const handleStartFlow = () => {
    setIsFlowing(true);
    setActiveStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current <= 6) {
        setActiveStep(current);
      } else {
        setIsFlowing(false);
        clearInterval(interval);
      }
    }, 1500);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsFlowing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.6 • ALIRAN PENUH DATA (FULL PIPELINE)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Full Data Flow: Form → PHP → SQL → Database
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Visualisasi lengkap bagaimana data bergerak daripada jari pengguna pada borang HTML, merentasi skrip PHP, diolah menjadi SQL, dan disimpan kekal ke dalam MySQL database.
        </p>
      </div>

      <SimNotice />

      {/* Interactive Control & Animation Canvas */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Data Movement Animator
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-start-full-flow"
              onClick={handleStartFlow}
              disabled={isFlowing}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isFlowing ? 'Data Sedang Bergerak...' : 'MULA ANIMASI ALIRAN'}</span>
            </button>

            <button
              id="btn-reset-flow"
              onClick={handleReset}
              disabled={isFlowing}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Set Semula"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input Customizer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Nama Pelajar:</label>
            <input
              id="flow-input-name"
              type="text"
              value={dataName}
              onChange={(e) => setDataName(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-white text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Email:</label>
            <input
              id="flow-input-email"
              type="text"
              value={dataEmail}
              onChange={(e) => setDataEmail(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-white text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Program:</label>
            <input
              id="flow-input-prog"
              type="text"
              value={dataProg}
              onChange={(e) => setDataProg(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-white text-xs"
            />
          </div>
        </div>

        {/* 6 Step Interactive Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.id;
            const isDone = activeStep > step.id;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isCurrent
                    ? `${step.color} ring-2 ring-indigo-400 scale-[1.03] shadow-xl`
                    : isDone
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-300'
                    : 'border-slate-800 bg-slate-950/60 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isCurrent
                          ? 'bg-white/20 text-white'
                          : isDone
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold font-mono text-white">
                      {step.title}
                    </span>
                  </div>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>

                <div className="space-y-1 my-2">
                  <h4 className="text-xs font-bold text-slate-200">{step.subtitle}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{step.desc}</p>
                </div>

                {isCurrent && (
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-amber-300 truncate">
                    Paket Data: {`{ name: "${dataName}", email: "${dataEmail}" }`}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Code Snippet of Current Step */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Kod yang Terlibat Pada Aliran Ini:
          </span>

          <CodeBlock
            language="php"
            badgeType="php"
            title="register_process.php"
            code={`<?php
// 1. Terima data borang POST
$nama = $_POST['nama'];         // "${dataName}"
$email = $_POST['email'];       // "${dataEmail}"
$prog = $_POST['programme'];    // "${dataProg}"

// 2. Bina SQL statement
$sql = "INSERT INTO students (name, email, programme) 
        VALUES ('$nama', '$email', '$prog')";

// 3. Jalankan query ke MySQL
mysqli_query($conn, $sql);

// 4. Paparkan maklumbalas kepada pengguna
echo "<h3>Pendaftaran Berjaya: $nama</h3>";
?>`}
          />
        </div>
      </div>
    </div>
  );
};
