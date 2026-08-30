import React, { useState } from 'react';
import { Repeat, Play, RotateCcw, ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const LoopsView: React.FC = () => {
  const [currentI, setCurrentI] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loopOutput, setLoopOutput] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<string>('idle');

  const maxLimit = 5;

  const runLoopAnimation = () => {
    setIsRunning(true);
    setLoopOutput([]);
    setCurrentI(1);
    setActiveStep('init');

    let i = 1;
    const outputArr: number[] = [];

    const interval = setInterval(() => {
      if (i <= maxLimit) {
        setCurrentI(i);
        setActiveStep('condition-true');
        outputArr.push(i);
        setLoopOutput([...outputArr]);
        i++;
      } else {
        setActiveStep('condition-false');
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 900);
  };

  const resetLoop = () => {
    setCurrentI(0);
    setLoopOutput([]);
    setActiveStep('idle');
    setIsRunning(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.2.6 • GELUNG PENGULANGAN (LOOPS)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          PHP Loops (for Loop) & Visualizer
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Gelung (loop) digunakan untuk mengulang baris kod yang sama berkali-kali secara automatik tanpa perlu menulisnya berulang kali.
        </p>
      </div>

      <SimNotice />

      {/* 1. Loop Code & Structure breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Repeat className="w-5 h-5 text-indigo-400" />
          Anatomi Struktur for Loop
        </h2>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          <div className="text-slate-400">
            for (<span className="text-indigo-400 font-bold">$i = 1</span>;{' '}
            <span className="text-purple-400 font-bold">$i &lt;= 5</span>;{' '}
            <span className="text-emerald-400 font-bold">$i++</span>) {'{'}
          </div>
          <div className="pl-6 text-yellow-300">echo $i . " ";</div>
          <div className="text-slate-400">{'}'}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
            <span className="font-bold text-indigo-300 block mb-1">1. Initialization ($i = 1)</span>
            <p className="text-slate-300">Tetapkan nilai pembolehubah permulaan.</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
            <span className="font-bold text-purple-300 block mb-1">2. Condition ($i &lt;= 5)</span>
            <p className="text-slate-300">Semak syarat sebelum setiap kitaran berjalan.</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <span className="font-bold text-emerald-300 block mb-1">3. Increment ($i++)</span>
            <p className="text-slate-300">Tambah 1 pada nilai $i selepas setiap pusingan.</p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Counter & Flowchart Visualizer */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              ANIMATED LOOP VISUALIZER
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Kitaran Gelung Langkah Demi Langkah
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-run-loop"
              onClick={runLoopAnimation}
              disabled={isRunning}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'Gelung Berjalan...' : 'RUN LOOP'}</span>
            </button>

            <button
              id="btn-reset-loop"
              onClick={resetLoop}
              disabled={isRunning}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Set Semula"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Counter Circles */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Kitaran Counter ($i):
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const isPrinted = loopOutput.includes(num);
              const isCurrent = currentI === num;

              return (
                <div
                  key={num}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${
                    isCurrent
                      ? 'border-indigo-400 bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/40 animate-pulse'
                      : isPrinted
                      ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-600'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{num}</span>
                  <span className="text-[9px] font-sans opacity-70">
                    {isPrinted ? '✓' : `$i=${num}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Output Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold font-mono uppercase text-emerald-400 block">
            Output Layar Browser (echo $i):
          </span>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-base text-white min-h-[44px] flex items-center">
            {loopOutput.length > 0 ? (
              <span className="text-emerald-300 font-bold">
                {loopOutput.join('  ')}
              </span>
            ) : (
              <span className="text-slate-400 text-xs italic">
                Tekan "RUN LOOP" untuk melihat output dijana satu persatu.
              </span>
            )}
          </div>
        </div>

        {/* Visual Flowchart steps */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
          <span className="font-bold text-slate-300 uppercase tracking-wider block">
            Aliran Carta Alir (Loop Flow):
          </span>
          <div className="flex flex-wrap items-center gap-2 font-mono text-slate-300">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200">MULA</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              $i = 1
            </span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              $i &lt;= 5 ? (YES)
            </span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              PRINT $i
            </span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              $i++
            </span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
              TAMAT ($i &gt; 5)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
