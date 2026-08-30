import React, { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const OperatorsView: React.FC = () => {
  // Mini Calculator State
  const [numA, setNumA] = useState<number>(10);
  const [numB, setNumB] = useState<number>(5);
  const [operator, setOperator] = useState<string>('+');

  // Challenge State
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  const calculateResult = () => {
    switch (operator) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        return numB !== 0 ? (numA / numB).toFixed(2) : 'Error (Bahagi dengan 0)';
      case '%':
        return numB !== 0 ? numA % numB : 'Error';
      case '==':
        return numA === numB ? 'true (1)' : 'false (0)';
      case '!=':
        return numA !== numB ? 'true (1)' : 'false (0)';
      case '>':
        return numA > numB ? 'true (1)' : 'false (0)';
      case '<':
        return numA < numB ? 'true (1)' : 'false (0)';
      case '>=':
        return numA >= numB ? 'true (1)' : 'false (0)';
      case '<=':
        return numA <= numB ? 'true (1)' : 'false (0)';
      default:
        return 0;
    }
  };

  const handleChallenge = (selected: number) => {
    setChallengeAnswer(selected);
    if (selected === 50) {
      setChallengeFeedback('✓ TAHNIAH! Tepat sekali. Operator * ialah pendaraban: 10 * 5 = 50.');
    } else {
      setChallengeFeedback(`✗ Pilihan ${selected} kurang tepat. Simbol * dalam PHP mewakili pendaraban (multiplication), bukan penambahan atau cantuman.`);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.2.5 • OPERATORS DALAM PHP
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          PHP Operators & Mini Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Uji operator aritmetik dan perbandingan secara interaktif dengan kalkulator mini live!
        </p>
      </div>

      <SimNotice />

      {/* 1. Mini Calculator Interactive Lab */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">PHP Mini Calculator Lab</h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Live PHP Generator
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Left */}
          <div className="lg:col-span-6 space-y-4 p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Number A ($a):</label>
                <input
                  id="input-calc-a"
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-white text-base focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Number B ($b):</label>
                <input
                  id="input-calc-b"
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-white text-base focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Operator Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Pilih Operator (Arithmetic & Comparison):
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { op: '+', label: '+ (Tambah)' },
                  { op: '-', label: '- (Tolak)' },
                  { op: '*', label: '* (Darab)' },
                  { op: '/', label: '/ (Bahagi)' },
                  { op: '%', label: '% (Modulus)' },
                  { op: '==', label: '== (Sama)' },
                  { op: '!=', label: '!= (Tidak Sama)' },
                  { op: '>', label: '> (Lebih Besar)' },
                  { op: '<', label: '< (Lebih Kecil)' },
                  { op: '>=', label: '>= (Lebih/Sama)' },
                ].map((item) => (
                  <button
                    key={item.op}
                    id={`btn-op-${item.op}`}
                    onClick={() => setOperator(item.op)}
                    className={`py-2 px-1 rounded-lg font-mono font-bold text-xs sm:text-sm transition-all ${
                      operator === item.op
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                    title={item.label}
                  >
                    {item.op}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Display */}
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Hasil Output ($result):
              </span>
              <span className="text-2xl font-mono font-extrabold text-emerald-400">
                {calculateResult()}
              </span>
            </div>
          </div>

          {/* Generated PHP Right */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              PHP Code Padanan:
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="operator_calc.php"
              code={`<?php
$a = ${numA};
$b = ${numB};

$result = $a ${operator} $b;

echo "Hasil: " . $result;
?>`}
            />

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="text-slate-300 font-semibold block">Penerangan:</span>
              <p>
                Operasi <code className="text-amber-300">{numA} {operator} {numB}</code> diproses oleh PHP engine dan nilai akhir disimpan ke dalam variable <code className="text-indigo-300">$result</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Operator Challenge */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 shadow-xl">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Operator Challenge (Uji Kefahaman)</h2>
        </div>

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-300">
            Perhatikan kod PHP di bawah dan teka apakah output yang akan dipaparkan:
          </p>

          <CodeBlock
            language="php"
            badgeType="php"
            title="challenge.php"
            code={`<?php
$a = 10;
$b = 5;

echo $a * $b;
?>`}
          />

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Pilih Jawapan:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[10, 15, 50, 105].map((val) => (
                <button
                  key={val}
                  id={`btn-challenge-${val}`}
                  onClick={() => handleChallenge(val)}
                  className={`py-3 px-4 rounded-xl border font-mono font-bold text-sm transition-all cursor-pointer ${
                    challengeAnswer === val
                      ? val === 50
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                        : 'border-rose-500 bg-rose-950/60 text-rose-300'
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {challengeFeedback && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm animate-fadeIn flex items-center space-x-2 ${
                  challengeAnswer === 50
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950/40 text-rose-300 border border-rose-500/40'
                }`}
              >
                {challengeAnswer === 50 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{challengeFeedback}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
