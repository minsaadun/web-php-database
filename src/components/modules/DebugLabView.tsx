import React, { useState } from 'react';
import { Bug, CheckCircle2, AlertOctagon, RotateCcw, Sparkles, Wrench, ArrowRight, HelpCircle, Check, X } from 'lucide-react';
import { DEBUG_CHALLENGES } from '../../data/courseData';
import { DebugChallenge } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const DebugLabView: React.FC = () => {
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [id: number]: number }>({});
  const [showSolution, setShowSolution] = useState<{ [id: number]: boolean }>({});

  const currentChallenge: DebugChallenge = DEBUG_CHALLENGES[activeChallengeIdx];

  const handleSelectOption = (challengeId: number, optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [challengeId]: optionIdx });
  };

  const handleToggleSolution = (challengeId: number) => {
    setShowSolution({ ...showSolution, [challengeId]: !showSolution[challengeId] });
  };

  const handleResetChallenge = (challengeId: number) => {
    const updatedAns = { ...selectedAnswers };
    delete updatedAns[challengeId];
    setSelectedAnswers(updatedAns);

    const updatedSol = { ...showSolution };
    delete updatedSol[challengeId];
    setShowSolution(updatedSol);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.8 • MAKMAL DEBUGGING & PENYELESAIAN MASALAH
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Debug Lab: Kesan & Baiki Ralat Lazim PHP/SQL
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Salah satu kemahiran paling penting bagi pelajar TVET ialah keupayaan membaca mesej ralat (error message) dan membaiki kod dengan pantas.
        </p>
      </div>

      <SimNotice />

      {/* Challenge Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {DEBUG_CHALLENGES.map((ch, idx) => {
          const isAnswered = selectedAnswers[ch.id] !== undefined;
          const isCorrect = selectedAnswers[ch.id] === ch.correctAnswer;
          const isSelected = activeChallengeIdx === idx;

          return (
            <button
              key={ch.id}
              id={`btn-dbg-tab-${idx}`}
              onClick={() => setActiveChallengeIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>Kes #{ch.id}: {ch.category}</span>
              {isAnswered && (
                isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Main Debug Workbench */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" />
              KES #{currentChallenge.id} • KATEGORI: {currentChallenge.category}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              {currentChallenge.title}
            </h2>
          </div>

          <button
            id="btn-reset-current-dbg"
            onClick={() => handleResetChallenge(currentChallenge.id)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Set Semula Kes</span>
          </button>
        </div>

        {/* Error Terminal Banner */}
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
            PHP Error Message (Mesej Ralat Terminal):
          </span>
          <div className="font-mono text-xs sm:text-sm text-rose-200 bg-slate-950 p-3 rounded-lg border border-rose-900/60 overflow-x-auto">
            {currentChallenge.errorDescription}
          </div>
        </div>

        {/* Code Snippet with Problem */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            Kod PHP Mengandungi Ralat (Buggy Code):
          </span>
          <CodeBlock
            language="php"
            badgeType="php"
            title="buggy_script.php"
            code={currentChallenge.codeSnippet}
          />
        </div>

        {/* Options to Diagnose the Error */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
            Pilih Punca & Cara Pembaikan yang Tepat:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentChallenge.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentChallenge.id] === idx;
              const isAnswered = selectedAnswers[currentChallenge.id] !== undefined;
              const isThisCorrect = isAnswered && idx === currentChallenge.correctAnswer;
              const isThisWrong = isAnswered && isSelected && idx !== currentChallenge.correctAnswer;

              return (
                <button
                  key={idx}
                  id={`btn-opt-${currentChallenge.id}-${idx}`}
                  onClick={() => handleSelectOption(currentChallenge.id, idx)}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start space-x-2.5 cursor-pointer ${
                    isThisCorrect
                      ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold'
                      : isThisWrong
                      ? 'border-rose-500 bg-rose-950/60 text-rose-200'
                      : isSelected
                      ? 'border-indigo-400 bg-indigo-950 text-white'
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-mono font-bold text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & Solution toggle */}
        {selectedAnswers[currentChallenge.id] !== undefined && (
          <div className="space-y-4 animate-fadeIn pt-2">
            <div
              className={`p-4 rounded-xl border flex items-start space-x-3 text-xs sm:text-sm ${
                selectedAnswers[currentChallenge.id] === currentChallenge.correctAnswer
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
              }`}
            >
              {selectedAnswers[currentChallenge.id] === currentChallenge.correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <strong className="block">
                  {selectedAnswers[currentChallenge.id] === currentChallenge.correctAnswer
                    ? '✓ Tepat Sekali! Analisis ralat anda betul.'
                    : '✗ Jawapan kurang tepat. Sila rujuk petunjuk di bawah.'}
                </strong>
                <p className="text-slate-300">{currentChallenge.explanation}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-toggle-solution"
                onClick={() => handleToggleSolution(currentChallenge.id)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {showSolution[currentChallenge.id] ? 'Sembunyi Kod Pembetulan' : 'Lihat Kod Pembetulan (Fixed Code)'}
              </button>
            </div>

            {showSolution[currentChallenge.id] && (
              <div className="space-y-2 animate-fadeIn pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Kod Selepas Dibaiki (Corrected Solution):
                </span>
                <CodeBlock
                  language="php"
                  badgeType="php"
                  title="fixed_solution.php"
                  code={currentChallenge.solution}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
