import React, { useState } from 'react';
import { GitFork, Check, X, ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const ConditionsView: React.FC = () => {
  const [markah, setMarkah] = useState<number>(70);

  const isLulus = markah >= 50;

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.2.6 • STRUKTUR KAWALAN PILIHAN
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Conditional Statements (if...else)
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Struktur kawalan membolehkan kod PHP membuat keputusan logik berdasarkan syarat (condition) tertentu.
        </p>
      </div>

      <SimNotice />

      {/* 1. Visual Flowchart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <GitFork className="w-5 h-5 text-indigo-400" />
          Carta Alir Logik (Flowchart Decision)
        </h2>

        {/* Interactive Flowchart Diagram */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center space-y-4">
          {/* Start / Input */}
          <div className="px-6 py-2.5 rounded-full bg-slate-800 text-white font-mono font-bold text-xs border border-slate-700">
            MARKAH = {markah}
          </div>

          <ArrowDown className="w-4 h-4 text-slate-500" />

          {/* Decision Rhombus */}
          <div className="p-4 rounded-2xl bg-indigo-950 border-2 border-indigo-500 text-indigo-200 font-mono font-bold text-sm text-center shadow-lg shadow-indigo-500/20">
            $markah &gt;= 50 ?
          </div>

          {/* Branches */}
          <div className="w-full grid grid-cols-2 gap-4 pt-2">
            {/* YES Branch */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-bold text-emerald-400">YES (BENAR)</span>
              <ArrowDown className="w-4 h-4 text-emerald-400" />
              <div
                className={`w-full p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  isLulus
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                ✓ LULUS
              </div>
            </div>

            {/* NO Branch */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-bold text-rose-400">NO (PALSU)</span>
              <ArrowDown className="w-4 h-4 text-rose-400" />
              <div
                className={`w-full p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  !isLulus
                    ? 'border-rose-400 bg-rose-500/20 text-rose-300 ring-2 ring-rose-400 shadow-lg shadow-rose-500/20'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                ✗ GAGAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive If-Else Simulator */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              INTERACTIVE SIMULATOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Live Markah Grading Simulator</h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Realtime Condition
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slider Left */}
          <div className="lg:col-span-5 space-y-6 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Tukar Nilai Markah ($markah):
                </label>
                <span className="font-mono text-2xl font-black text-indigo-400">{markah}</span>
              </div>

              <input
                id="slider-markah"
                type="range"
                min="0"
                max="100"
                value={markah}
                onChange={(e) => setMarkah(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 (Min)</span>
                <span className="text-amber-400 font-bold">50 (Had Lulus)</span>
                <span>100 (Max)</span>
              </div>
            </div>

            {/* Decision Status Badge */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                isLulus
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                  : 'border-rose-500/50 bg-rose-950/40 text-rose-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    isLulus ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                  }`}
                >
                  {isLulus ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">
                    Keputusan PHP:
                  </span>
                  <span className="text-lg font-black">
                    {isLulus ? '✓ LULUS' : '✗ GAGAL'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-900">
                {isLulus ? 'markah >= 50' : 'markah < 50'}
              </span>
            </div>
          </div>

          {/* Generated Code Right */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              PHP Execution Code:
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="grade_check.php"
              code={`<?php
$markah = ${markah};

if ($markah >= 50) {
    echo "Keputusan: Lulus";
} else {
    echo "Keputusan: Gagal";
}
?>`}
            />

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-indigo-300 block">Penjelasan Logik:</span>
              <p>
                Nilai semasa <code className="text-amber-300">$markah = {markah}</code>{' '}
                {isLulus
                  ? 'memenuhi syarat ($markah >= 50), oleh itu baris echo "Lulus" dijalankan.'
                  : 'tidak memenuhi syarat ($markah >= 50), maka PHP beralih ke blok else dan menjalankan echo "Gagal".'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
