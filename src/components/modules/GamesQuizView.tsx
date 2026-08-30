import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/courseData';
import { QuizQuestion } from '../../types';
import { SimNotice } from '../common/SimNotice';

export const GamesQuizView: React.FC = () => {
  // Tab State: Game 1, Game 2, or 10-Question Quiz
  const [activeTab, setActiveTab] = useState<'match' | 'order' | 'quiz'>('match');

  // Game 1: Match SQL Command
  const sqlPairs = [
    { cmd: 'INSERT', purpose: 'Menambah rekod data baharu (Create)' },
    { cmd: 'SELECT', purpose: 'Mengambil dan membaca rekod (Read)' },
    { cmd: 'UPDATE', purpose: 'Mengubah suai rekod sedia ada (Update)' },
    { cmd: 'DELETE', purpose: 'Memadam rekod daripada jadual (Delete)' },
  ];
  const [selectedCmd, setSelectedCmd] = useState<string | null>(null);
  const [matchedSql, setMatchedSql] = useState<{ [cmd: string]: string }>({});
  const [sqlMessage, setSqlMessage] = useState<string | null>(null);

  const handleSelectCmd = (cmd: string) => setSelectedCmd(cmd);
  const handleSelectPurpose = (purpose: string) => {
    if (!selectedCmd) return;
    const pair = sqlPairs.find((p) => p.cmd === selectedCmd);
    if (pair && pair.purpose === purpose) {
      const updated = { ...matchedSql, [selectedCmd]: purpose };
      setMatchedSql(updated);
      setSelectedCmd(null);
      if (Object.keys(updated).length === sqlPairs.length) {
        setSqlMessage('🎉 Hebat! Anda berjaya memadankan kesemua 4 Arahan SQL CRUD dengan betul!');
      } else {
        setSqlMessage(`✓ Betul! ${selectedCmd} -> ${purpose}`);
      }
    } else {
      setSqlMessage(`✗ Kurang tepat. Sila cuba padankan ${selectedCmd} dengan fungsi yang betul.`);
    }
  };

  // Game 2: Code Ordering
  const initialSteps = [
    { id: '3', text: '3. Bina kenyataan SQL ($sql = "INSERT...")', correctOrder: 3 },
    { id: '1', text: '1. Sambung ke database ($conn = mysqli_connect...)', correctOrder: 1 },
    { id: '5', text: '5. Paparkan maklumbalas (echo "Berjaya!")', correctOrder: 5 },
    { id: '2', text: '2. Terima data borang ($_POST[\'nama\'])', correctOrder: 2 },
    { id: '4', text: '4. Laksana query ke MySQL (mysqli_query)', correctOrder: 4 },
  ];
  const [orderedItems, setOrderedItems] = useState(initialSteps);
  const [orderFeedback, setOrderFeedback] = useState<string | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...orderedItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setOrderedItems(newItems);
  };

  const checkOrder = () => {
    const isCorrect = orderedItems.every((item, idx) => item.correctOrder === idx + 1);
    if (isCorrect) {
      setOrderFeedback('🎉 TAHNIAH! Susunan aliran PHP & Database anda 100% TEPAT & SEMPURNA!');
    } else {
      setOrderFeedback('✗ Susunan belum tepat. Petunjuk: Sambung DB dahulu, kemudian ambil POST data, bina SQL, laksana query, dan akhir sekali paparkan output.');
    }
  };

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectQuiz = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qId]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.9 • PERMAINAN & KUIZ PENGUKUHAN
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Mini Games & Interactive Quiz (10 Soalan)
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Uji kefahaman konsep PHP & Database connectivity anda menerusi permainan padanan interaktif dan kuiz format penilaian TVET.
        </p>
      </div>

      <SimNotice />

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          id="btn-tab-game1"
          onClick={() => setActiveTab('match')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'match'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Game 1: Padanan SQL</span>
        </button>

        <button
          id="btn-tab-game2"
          onClick={() => setActiveTab('order')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'order'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Game 2: Susun Urutan Kod</span>
        </button>

        <button
          id="btn-tab-quiz"
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Kuiz Penilaian (10 Soalan)</span>
        </button>
      </div>

      {/* GAME 1: SQL MATCHING */}
      {activeTab === 'match' && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
              Game 1: Padankan Arahan SQL Dengan Fungsinya
            </h2>
            <button
              id="btn-reset-match-game"
              onClick={() => {
                setMatchedSql({});
                setSelectedCmd(null);
                setSqlMessage(null);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Set Semula</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Commands Left */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Arahan SQL (SQL Command):
              </span>
              {sqlPairs.map((pair) => {
                const isMatched = matchedSql[pair.cmd];
                const isSelected = selectedCmd === pair.cmd;

                return (
                  <button
                    key={pair.cmd}
                    id={`btn-sql-cmd-${pair.cmd}`}
                    disabled={!!isMatched}
                    onClick={() => handleSelectCmd(pair.cmd)}
                    className={`w-full p-4 rounded-xl border text-left font-mono font-bold text-base transition-all flex items-center justify-between ${
                      isMatched
                        ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 opacity-60'
                        : isSelected
                        ? 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-500'
                        : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{pair.cmd}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* Purposes Right */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
                Fungsi Operasi (Purpose):
              </span>
              {sqlPairs.map((pair) => {
                const matchedCmd = Object.keys(matchedSql).find(
                  (cmd) => matchedSql[cmd] === pair.purpose
                );

                return (
                  <button
                    key={pair.cmd}
                    id={`btn-sql-purpose-${pair.cmd}`}
                    disabled={!!matchedCmd}
                    onClick={() => handleSelectPurpose(pair.purpose)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      matchedCmd
                        ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 opacity-60'
                        : selectedCmd
                        ? 'border-slate-700 bg-slate-950 hover:border-cyan-400 hover:bg-cyan-950/30 text-white cursor-pointer'
                        : 'border-slate-800 bg-slate-950 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{pair.purpose}</span>
                    {matchedCmd && (
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ✓ {matchedCmd}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {sqlMessage && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 animate-fadeIn">
              {sqlMessage}
            </div>
          )}
        </div>
      )}

      {/* GAME 2: CODE ORDERING */}
      {activeTab === 'order' && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
              Game 2: Susun Urutan Aliran Kod PHP & Database
            </h2>
            <button
              id="btn-reset-order-game"
              onClick={() => {
                setOrderedItems(initialSteps);
                setOrderFeedback(null);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Set Semula</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            Gunakan butang <strong>▲ Atas</strong> dan <strong>▼ Bawah</strong> untuk menyusun 5 langkah ini mengikut urutan logik yang betul:
          </p>

          <div className="space-y-2">
            {orderedItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-slate-200">{item.text}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    id={`btn-up-${idx}`}
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 text-xs"
                  >
                    ▲
                  </button>
                  <button
                    id={`btn-down-${idx}`}
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === orderedItems.length - 1}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 text-xs"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            id="btn-check-order"
            onClick={checkOrder}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            SEMAK JAWAPAN URUTAN
          </button>

          {orderFeedback && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 animate-fadeIn">
              {orderFeedback}
            </div>
          )}
        </div>
      )}

      {/* QUIZ (10 QUESTIONS) */}
      {activeTab === 'quiz' && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Kuiz Penilaian Topik 4.0 (10 Soalan Aneka Pilihan)
            </h2>
            {isSubmitted && (
              <button
                id="btn-reset-quiz-all"
                onClick={handleResetQuiz}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Kuiz</span>
              </button>
            )}
          </div>

          {/* Questions list */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = isSubmitted && selectedOpt === q.correctAnswer;
              const isWrong = isSubmitted && selectedOpt !== undefined && selectedOpt !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-rose-500/50 bg-rose-950/20'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {qIndex + 1}. {q.question}
                    </h3>
                    {isSubmitted && (
                      <span className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selectedOpt === optIndex;
                      const isThisCorrect = isSubmitted && q.correctAnswer === optIndex;

                      return (
                        <button
                          key={optIndex}
                          id={`btn-q${q.id}-opt${optIndex}`}
                          disabled={isSubmitted}
                          onClick={() => handleSelectQuiz(q.id, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                            isThisCorrect
                              ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold'
                              : isOptionSelected
                              ? isSubmitted
                                ? 'border-rose-500 bg-rose-950/60 text-rose-200'
                                : 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-500'
                              : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-mono font-bold mr-2 text-slate-500">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      💡 <strong>Penerangan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted ? (
            <button
              id="btn-submit-quiz"
              onClick={() => setIsSubmitted(true)}
              disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
              className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
            >
              HANTAR & SEMAK MARKAH KUIZ ({Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length} Dijawab)
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-indigo-950/50 border-2 border-indigo-500 text-center space-y-3 animate-fadeIn">
              <Award className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-xl font-extrabold text-white">Keputusan Kuiz Anda</h3>
              <div className="text-3xl font-black text-amber-300 font-mono">
                {calculateScore()} / {QUIZ_QUESTIONS.length} ({((calculateScore() / QUIZ_QUESTIONS.length) * 100).toFixed(0)}%)
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {calculateScore() >= 8
                  ? ' Tahniah! Anda telah menguasai konsep Topic 4.0 PHP & Database Connectivity dengan cemerlang!'
                  : calculateScore() >= 5
                  ? ' Bagus! Anda lulus kuiz ini. Sila semak semula soalan yang kurang tepat untuk pengukuhan.'
                  : ' Jangan putus asa! Sila ulangi modul makmal dan cuba lagi untuk mencapai gred cemerlang.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
