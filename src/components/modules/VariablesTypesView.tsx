import React, { useState } from 'react';
import { DollarSign, Layers, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const VariablesTypesView: React.FC = () => {
  // Live Variable Lab State
  const [studentName, setStudentName] = useState('Ali');
  const [studentAge, setStudentAge] = useState('20');
  const [studentProgram, setStudentProgram] = useState('STM');
  const [showAge, setShowAge] = useState(true);

  // Matching Game State
  const pairs = [
    { id: '1', val: '"Ali"', type: 'String (Teks)' },
    { id: '2', val: '25', type: 'Integer (Nombor Bulat)' },
    { id: '3', val: '10.5', type: 'Float / Double (Nombor Perpuluhan)' },
    { id: '4', val: 'true', type: 'Boolean (Nilai Benar / Palsu)' },
  ];

  const [selectedVal, setSelectedVal] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [gameMessage, setGameMessage] = useState<string | null>(null);

  const handleSelectVal = (val: string) => {
    setSelectedVal(val);
  };

  const handleSelectType = (type: string) => {
    if (!selectedVal) return;

    // Check match
    const currentPair = pairs.find((p) => p.val === selectedVal);
    if (currentPair && currentPair.type === type) {
      const newMatches = { ...matches, [selectedVal]: type };
      setMatches(newMatches);
      setSelectedVal(null);

      if (Object.keys(newMatches).length === pairs.length) {
        setGameMessage(' Tahniah! Anda berjaya memadankan kesemua 4 Jenis Data PHP dengan betul!');
      } else {
        setGameMessage(`✓ Betul! ${selectedVal} ialah ${type}`);
      }
    } else {
      setGameMessage(`✗ Kurang tepat. Cuba padankan ${selectedVal} dengan jenis data yang betul.`);
    }
  };

  const resetGame = () => {
    setMatches({});
    setSelectedVal(null);
    setGameMessage(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.2.4 • VARIABLE & JENIS DATA
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          PHP Variables & Data Types Lab
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Semua pembolehubah (variables) dalam PHP bermula dengan simbol <code className="text-amber-300 font-bold">$</code>. Ubah nilai secara live dan lihat kod dijana secara masa nyata!
        </p>
      </div>

      <SimNotice />

      {/* 1. Variable Concept Visual */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber-400" />
          Konsep Variable dalam PHP ($)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Variable bertindak sebagai <strong>bekas simpanan memori</strong> untuk menyimpan data sementara.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                NAMA VARIABLE (VARIABLE NAME)
              </span>
              <span className="text-xl font-bold font-mono text-amber-300">$nama</span>
            </div>
            <span className="text-2xl font-bold text-slate-600">=</span>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                NILAI (VALUE)
              </span>
              <span className="text-xl font-bold font-mono text-emerald-300">"Ali"</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                NAMA VARIABLE (VARIABLE NAME)
              </span>
              <span className="text-xl font-bold font-mono text-amber-300">$umur</span>
            </div>
            <span className="text-2xl font-bold text-slate-600">=</span>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                NILAI (VALUE)
              </span>
              <span className="text-xl font-bold font-mono text-cyan-300">20</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Variable Lab */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              HANDS-ON PLAYGROUND
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Live Variable Generator</h2>
          </div>
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Realtime Generator
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Input Left */}
          <div className="lg:col-span-5 space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              1. Masukkan Nilai Input:
            </span>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Nama Pelajar ($nama):</label>
              <input
                id="input-var-nama"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Contoh: Ali"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Umur ($umur):</label>
              <input
                id="input-var-umur"
                type="number"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Contoh: 20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Program ($program):</label>
              <input
                id="input-var-program"
                type="text"
                value={studentProgram}
                onChange={(e) => setStudentProgram(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Contoh: STM"
              />
            </div>
          </div>

          {/* Generated Code & Output Right */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                2. Generated PHP Code:
              </span>
              <CodeBlock
                language="php"
                badgeType="php"
                title="variables_demo.php"
                code={`<?php
$nama = "${studentName || 'Ali'}";
$umur = ${studentAge || 20};
$program = "${studentProgram || 'STM'}";

echo "Nama Pelajar: " . $nama . "<br>";
echo "Umur: " . $umur . " tahun<br>";
echo "Program: " . $program;
?>`}
              />
            </div>

            {/* Output Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                3. Browser Rendered Output:
              </span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-sm space-y-1 text-slate-200">
                <div>Nama Pelajar: <span className="font-bold text-indigo-300">{studentName || 'Ali'}</span></div>
                <div>Umur: <span className="font-bold text-cyan-300">{studentAge || 20}</span> tahun</div>
                <div>Program: <span className="font-bold text-purple-300">{studentProgram || 'STM'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Data Types Interactive Matching Game */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Permainan Padanan Jenis Data (Data Types Matching Game)
            </h2>
            <p className="text-xs text-slate-400">
              Pilih satu nilai di lajur kiri, kemudian klik jenis data yang sepadan di lajur kanan:
            </p>
          </div>

          <button
            id="btn-reset-matching"
            onClick={resetGame}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Set Semula</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Values Left */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              Nilai Contoh (PHP Value):
            </span>
            {pairs.map((item) => {
              const isMatched = matches[item.val];
              const isSelected = selectedVal === item.val;

              return (
                <button
                  key={item.id}
                  id={`btn-val-${item.id}`}
                  disabled={!!isMatched}
                  onClick={() => handleSelectVal(item.val)}
                  className={`w-full p-3.5 rounded-xl border text-left font-mono font-bold text-sm transition-all flex items-center justify-between ${
                    isMatched
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 opacity-70'
                      : isSelected
                      ? 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-500'
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span>{item.val}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Types Right */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
              Jenis Data (Data Type):
            </span>
            {pairs.map((item) => {
              const matchedVal = Object.keys(matches).find((k) => matches[k] === item.type);

              return (
                <button
                  key={item.id}
                  id={`btn-type-${item.id}`}
                  disabled={!!matchedVal}
                  onClick={() => handleSelectType(item.type)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                    matchedVal
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 opacity-70'
                      : selectedVal
                      ? 'border-slate-700 bg-slate-950 hover:border-cyan-400 hover:bg-cyan-950/30 text-white cursor-pointer'
                      : 'border-slate-800 bg-slate-950 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{item.type}</span>
                  {matchedVal && (
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ✓ {matchedVal}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {gameMessage && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 animate-fadeIn flex items-center justify-between">
            <span>{gameMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
