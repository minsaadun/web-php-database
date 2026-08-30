import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, RotateCcw, Sparkles, Award } from 'lucide-react';
import { SimNotice } from '../common/SimNotice';

export const MiniChallengeView: React.FC = () => {
  // Task 1 State: Form Attributes
  const [task1Action, setTask1Action] = useState('');
  const [task1Method, setTask1Method] = useState('');
  const [task1Done, setTask1Done] = useState<boolean | null>(null);

  // Task 2 State: PHP Variable
  const [task2Code, setTask2Code] = useState('');
  const [task2Done, setTask2Done] = useState<boolean | null>(null);

  // Task 3 State: SQL Query
  const [task3Keyword, setTask3Keyword] = useState('');
  const [task3Table, setTask3Table] = useState('');
  const [task3Done, setTask3Done] = useState<boolean | null>(null);

  const checkTask1 = () => {
    const isAct = task1Action.trim() === 'save.php';
    const isMeth = task1Method.trim().toUpperCase() === 'POST';
    setTask1Done(isAct && isMeth);
  };

  const checkTask2 = () => {
    const clean = task2Code.trim().replace(/\s+/g, '');
    const isValid = clean === '$student_id=123;' || clean === '$student_id="123";';
    setTask2Done(isValid);
  };

  const checkTask3 = () => {
    const isKw = task3Keyword.trim().toUpperCase() === 'INSERT INTO';
    const isTb = task3Table.trim().toLowerCase() === 'students';
    setTask3Done(isKw && isTb);
  };

  const allCompleted = task1Done && task2Done && task3Done;

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.10 • CABARAN AMALI (MINI CHALLENGES)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          3 Mini Hands-On TVET Challenges
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Lengkapkan 3 tugasan amali ringkas ini untuk mengesahkan kemahiran sintaks HTML Borang, Pembolehubah PHP, dan Arahan SQL anda!
        </p>
      </div>

      <SimNotice />

      {/* Progress Counter */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-bold text-white">Status Cabaran Amali:</span>
        </div>
        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {[task1Done, task2Done, task3Done].filter(Boolean).length} / 3 Selesai
        </span>
      </div>

      <div className="space-y-6">
        {/* TASK 1: HTML Form Attributes */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              TUGASAN 1: BORANG HTML (HTML FORM)
            </span>
            {task1Done && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white">
            Isi atribut borang supaya menghantar data ke fail <code className="text-amber-300">save.php</code> menggunakan kaedah <code className="text-cyan-300">POST</code>:
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-2 text-slate-300">
            <span>&lt;form action="</span>
            <input
              id="input-task1-action"
              type="text"
              value={task1Action}
              onChange={(e) => setTask1Action(e.target.value)}
              placeholder="nama_fail.php"
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-yellow-300 w-32 text-xs focus:outline-none focus:border-indigo-500"
            />
            <span>" method="</span>
            <input
              id="input-task1-method"
              type="text"
              value={task1Method}
              onChange={(e) => setTask1Method(e.target.value)}
              placeholder="KAEDAH"
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 w-24 text-xs focus:outline-none focus:border-indigo-500 uppercase"
            />
            <span>"&gt;</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              id="btn-check-task1"
              onClick={checkTask1}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Semak Tugasan 1
            </button>

            {task1Done === true && (
              <span className="text-xs font-bold text-emerald-400">✓ Tepat sekali! (action="save.php" method="POST")</span>
            )}
            {task1Done === false && (
              <span className="text-xs font-bold text-rose-400">✗ Cuba lagi! Pastikan action="save.php" dan method="POST"</span>
            )}
          </div>
        </div>

        {/* TASK 2: PHP Variable */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              TUGASAN 2: VARIABLE PHP (PHP VARIABLE)
            </span>
            {task2Done && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white">
            Tulis satu baris pembolehubah PHP lengkap bernama <code className="text-amber-300">$student_id</code> dengan nilai integer <code className="text-cyan-300">123</code> (jangan lupa koma bertitik <code className="text-amber-300">;</code>):
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300">
            <div className="text-slate-500 mb-2">&lt;?php</div>
            <input
              id="input-task2-code"
              type="text"
              value={task2Code}
              onChange={(e) => setTask2Code(e.target.value)}
              placeholder='$student_id = 123;'
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-yellow-300 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
            <div className="text-slate-500 mt-2">?&gt;</div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              id="btn-check-task2"
              onClick={checkTask2}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Semak Tugasan 2
            </button>

            {task2Done === true && (
              <span className="text-xs font-bold text-emerald-400">✓ Tepat sekali! ($student_id = 123;)</span>
            )}
            {task2Done === false && (
              <span className="text-xs font-bold text-rose-400">✗ Cuba lagi! Pastikan bermula dengan $ dan berakhir dengan ;</span>
            )}
          </div>
        </div>

        {/* TASK 3: SQL Statement */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              TUGASAN 3: ARAHAN SQL (INSERT QUERY)
            </span>
            {task3Done && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white">
            Lengkapkan sintaks SQL untuk memasukkan data ke dalam jadual <code className="text-amber-300">students</code>:
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-2 text-slate-300">
            <input
              id="input-task3-kw"
              type="text"
              value={task3Keyword}
              onChange={(e) => setTask3Keyword(e.target.value)}
              placeholder="KATA KUNCI SQL"
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-indigo-300 w-36 text-xs focus:outline-none focus:border-indigo-500 uppercase"
            />
            <input
              id="input-task3-table"
              type="text"
              value={task3Table}
              onChange={(e) => setTask3Table(e.target.value)}
              placeholder="nama_table"
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-yellow-300 w-28 text-xs focus:outline-none focus:border-indigo-500"
            />
            <span>(name, email) VALUES ('Ali', 'ali@email.com');</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              id="btn-check-task3"
              onClick={checkTask3}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Semak Tugasan 3
            </button>

            {task3Done === true && (
              <span className="text-xs font-bold text-emerald-400">✓ Tepat sekali! (INSERT INTO students ...)</span>
            )}
            {task3Done === false && (
              <span className="text-xs font-bold text-rose-400">✗ Cuba lagi! Kata kunci ialah "INSERT INTO" dan jadual "students"</span>
            )}
          </div>
        </div>
      </div>

      {allCompleted && (
        <div className="p-6 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500 text-center space-y-2 animate-fadeIn">
          <Award className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Tahniah! Kesemua 3 Cabaran Mini Berjaya Diselesaikan!</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Anda telah membuktikan kefahaman asas sintaks web development yang kukuh. Teruskan ke Projek Mini Pelajar!
          </p>
        </div>
      )}
    </div>
  );
};
