import React, { useState } from 'react';
import {
  Code,
  Server,
  Play,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Info,
} from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const PhpBasicsView: React.FC = () => {
  // Simulator state
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Syntax explanation state
  const [selectedTag, setSelectedTag] = useState<string | null>('opening');

  // Embedding toggle state
  const [embedView, setEmbedView] = useState<'both' | 'html' | 'php'>('both');

  // Comments quiz state
  const [commentQuizAnswer, setCommentQuizAnswer] = useState<number | null>(null);
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    const intervals = [
      setTimeout(() => setSimStep(2), 1000),
      setTimeout(() => setSimStep(3), 2000),
      setTimeout(() => setSimStep(4), 3000),
      setTimeout(() => {
        setSimStep(5);
        setIsSimulating(false);
      }, 4000),
    ];
  };

  const syntaxItems = {
    opening: {
      tag: '<?php',
      title: 'PHP Opening Tag',
      desc: 'Tag pembuka rasmi untuk memberitahu web server bahawa kod di dalamnya adalah skrip PHP yang perlu diproses.',
      color: 'border-indigo-500 bg-indigo-500/20 text-indigo-300',
    },
    echo: {
      tag: 'echo',
      title: 'Output Statement',
      desc: 'Kenyataan arahan dalam PHP yang digunakan untuk memaparkan teks, nombor, atau kod HTML ke browser.',
      color: 'border-purple-500 bg-purple-500/20 text-purple-300',
    },
    content: {
      tag: '"Hello World"',
      title: 'String Literal',
      desc: 'Nilai data teks yang hendak dicetak. Wajib diapit dengan tanda petik tunggal (\'...\') atau tanda petik berganda ("...").',
      color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300',
    },
    semicolon: {
      tag: ';',
      title: 'Statement Terminator',
      desc: 'Simbol titik bertindih koma yang WAJIB diletakkan pada akhir setiap baris arahan PHP. Jika tiada, syntax error akan berlaku!',
      color: 'border-rose-500 bg-rose-500/20 text-rose-300',
    },
    closing: {
      tag: '?>',
      title: 'PHP Closing Tag',
      desc: 'Tag penutup bagi menandakan berakhirnya blok kod PHP. Selepas tag ini, teks akan dianggap sebagai HTML biasa.',
      color: 'border-amber-500 bg-amber-500/20 text-amber-300',
    },
  };

  const handleCommentQuiz = (selectedOption: number) => {
    setCommentQuizAnswer(selectedOption);
    if (selectedOption === 2) {
      setCommentFeedback('✓ TEPAT SEKALI! Baris echo "Selamat Datang"; adalah satu-satunya statement yang dieksekusi dan menghasilkan output.');
    } else {
      setCommentFeedback('✗ KURANG TEPAT! Baris yang dimulakan dengan //, # atau diapit /* */ adalah KOMEN dan diabaikan oleh PHP.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          4.1 & 4.2 • ASAS PHP & SINTAKS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Apa Itu PHP & PHP Execution Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Fahami bagaimana fail PHP diproses di web server sebelum dihantar sebagai HTML kepada pelayar (browser).
        </p>
      </div>

      <SimNotice />

      {/* 1. Apa itu PHP? Concept Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Konsep Server-Side Scripting</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>PHP (PHP: Hypertext Preprocessor)</strong> ialah bahasa pengaturcaraan <em>server-side</em>.
          Maksudnya, semua kod PHP dijalankan dan diproses oleh <strong>Web Server (seperti Apache)</strong> terlebih dahulu.
          Hasil akhirnya ditukarkan menjadi fail <strong>HTML bersih</strong> sebelum dihantar ke browser pengguna.
        </p>

        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-xs sm:text-sm text-yellow-900 flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <strong>Nota Penting TVET:</strong> Pengguna atau browser TIDAK PERNAH melihat kod sumber (source code) PHP sebenar apabila mereka menekan "View Page Source". Mereka hanya melihat output HTML yang telah dijana!
          </div>
        </div>
      </div>

      {/* 2. PHP Execution Simulator (5 Steps) */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">
              INTERACTIVE SIMULATOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Simulasi Kitaran Perlaksanaan PHP (5 Langkah)
            </h2>
          </div>
          <button
            id="btn-run-php-sim"
            onClick={runSimulation}
            disabled={isSimulating}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isSimulating ? 'Memproses...' : 'RUN SIMULATION'}</span>
          </button>
        </div>

        {/* 5 Steps Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: 1, title: 'STEP 1', name: 'Browser Request', desc: 'Pengguna meminta fail index.php' },
            { step: 2, title: 'STEP 2', name: 'Server Receives', desc: 'Web Server Apache terima request' },
            { step: 3, title: 'STEP 3', name: 'PHP Executes', desc: 'PHP Engine jalankan logik kod' },
            { step: 4, title: 'STEP 4', name: 'HTML Generated', desc: 'Hasil ditukar ke kod HTML' },
            { step: 5, title: 'STEP 5', name: 'Browser Display', desc: 'Browser papar teks kepada user' },
          ].map((item) => {
            const isActive = simStep === item.step;
            const isPassed = simStep > item.step;

            return (
              <div
                key={item.step}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/80 shadow-sm scale-105'
                    : isPassed
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-slate-50 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500">{item.title}</span>
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? 'bg-blue-600 animate-ping' : 'bg-slate-300'
                      }`}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulation Output Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1">
              Kod Sumber di Server (hello.php):
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="hello.php (Server)"
              code={`<?php\necho "<h1>Hello STM</h1>";\n?>`}
            />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1">
              Apa yang Diterima oleh Browser (Client):
            </span>
            <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 min-h-[120px] flex flex-col justify-center shadow-inner">
              {simStep >= 4 ? (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                    ✓ Output Browser Rendered:
                  </span>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                    <h1 className="text-2xl font-bold text-blue-300">Hello STM</h1>
                  </div>
                  <span className="text-[11px] text-slate-400 italic block">
                    Source diterima: &lt;h1&gt;Hello STM&lt;/h1&gt; (Tiada tag &lt;?php kelihatan!)
                  </span>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs py-4">
                  Tekan butang <span className="text-blue-400 font-bold">RUN SIMULATION</span> di atas untuk melihat proses.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Basic PHP Syntax (Clickable interactive tags) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sintaks Asas PHP (Klik Elemen untuk Penjelasan)</h2>
            <p className="text-xs text-slate-500">Klik pada mana-mana bahagian kod untuk mengetahui fungsinya:</p>
          </div>
        </div>

        {/* Interactive Syntax Bar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-2 text-base sm:text-lg font-mono">
          <button
            id="tag-opening"
            onClick={() => setSelectedTag('opening')}
            className={`px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
              selectedTag === 'opening' ? 'border-blue-400 bg-blue-500/30 text-blue-300 ring-2 ring-blue-400' : 'border-slate-700 hover:bg-slate-800 text-blue-400'
            }`}
          >
            &lt;?php
          </button>

          <button
            id="tag-echo"
            onClick={() => setSelectedTag('echo')}
            className={`px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
              selectedTag === 'echo' ? 'border-purple-400 bg-purple-500/30 text-purple-300 ring-2 ring-purple-400' : 'border-slate-700 hover:bg-slate-800 text-purple-400'
            }`}
          >
            echo
          </button>

          <button
            id="tag-content"
            onClick={() => setSelectedTag('content')}
            className={`px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
              selectedTag === 'content' ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400' : 'border-slate-700 hover:bg-slate-800 text-emerald-400'
            }`}
          >
            "Hello World"
          </button>

          <button
            id="tag-semicolon"
            onClick={() => setSelectedTag('semicolon')}
            className={`px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
              selectedTag === 'semicolon' ? 'border-rose-400 bg-rose-500/30 text-rose-300 ring-2 ring-rose-400' : 'border-slate-700 hover:bg-slate-800 text-rose-400'
            }`}
          >
            ;
          </button>

          <button
            id="tag-closing"
            onClick={() => setSelectedTag('closing')}
            className={`px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
              selectedTag === 'closing' ? 'border-amber-400 bg-amber-500/30 text-amber-300 ring-2 ring-amber-400' : 'border-slate-700 hover:bg-slate-800 text-amber-400'
            }`}
          >
            ?&gt;
          </button>
        </div>

        {/* Dynamic Detail Card */}
        {selectedTag && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 animate-fadeIn space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">
                {syntaxItems[selectedTag as keyof typeof syntaxItems].tag}
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                {syntaxItems[selectedTag as keyof typeof syntaxItems].title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {syntaxItems[selectedTag as keyof typeof syntaxItems].desc}
            </p>
          </div>
        )}
      </div>

      {/* 4. Embedding PHP in HTML with Toggle */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Menyisipkan PHP ke Dalam Fail HTML</h2>
            <p className="text-xs text-slate-500">PHP boleh diselitkan terus ke dalam struktur HTML biasa.</p>
          </div>

          <div className="flex p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
            <button
              id="btn-embed-both"
              onClick={() => setEmbedView('both')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                embedView === 'both' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SHOW BOTH
            </button>
            <button
              id="btn-embed-html"
              onClick={() => setEmbedView('html')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                embedView === 'html' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SHOW HTML
            </button>
            <button
              id="btn-embed-php"
              onClick={() => setEmbedView('php')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                embedView === 'php' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SHOW PHP
            </button>
          </div>
        </div>

        {/* Code viewer with color coding */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed overflow-x-auto">
          <pre>
            <span className={embedView === 'php' ? 'opacity-20' : 'text-sky-400'}>
              &lt;!DOCTYPE html&gt;{'\n'}&lt;html&gt;{'\n'}&lt;body&gt;{'\n\n'}
              {'  '}&lt;h1&gt;Website Saya&lt;/h1&gt;{'\n\n'}
            </span>
            <span className={embedView === 'html' ? 'opacity-20' : 'text-purple-300 font-bold bg-purple-950/40 px-1 py-0.5 rounded border border-purple-500/40'}>
              {'  '}&lt;?php{'\n'}
              {'    '}echo "&lt;p&gt;Selamat Datang ke Kolej Komuniti&lt;/p&gt;";{'\n'}
              {'  '}?&gt;{'\n\n'}
            </span>
            <span className={embedView === 'php' ? 'opacity-20' : 'text-sky-400'}>
              &lt;/body&gt;{'\n'}&lt;/html&gt;
            </span>
          </pre>
        </div>
      </div>

      {/* 5. Statements & Comments Interactive Activity */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-900">Aktiviti: Statements & Comments</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Komen digunakan untuk catatan programmer dan tidak akan diproses oleh server. Manakala statement menghasilkan tindakan sebenar.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-emerald-400">// Baris 1: // Single line comment guna double slash</div>
          <div className="text-emerald-400"># Baris 2: # Single line comment guna hash</div>
          <div className="text-purple-300 font-bold">Baris 3: echo "Selamat Datang";</div>
          <div className="text-emerald-400">/* Baris 4: Multiple line comment */</div>
        </div>

        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Soalan: Baris manakah yang AKAN menghasilkan output ke browser?
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Baris 1', 'Baris 2', 'Baris 3', 'Baris 4'].map((opt, idx) => (
              <button
                key={idx}
                id={`btn-comment-opt-${idx}`}
                onClick={() => handleCommentQuiz(idx)}
                className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  commentQuizAnswer === idx
                    ? idx === 2
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-rose-500 bg-rose-50 text-rose-800'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {commentFeedback && (
            <div
              className={`p-3.5 rounded-lg text-xs sm:text-sm animate-fadeIn ${
                commentQuizAnswer === 2
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {commentFeedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
