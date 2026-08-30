import React, { useState } from 'react';
import { HelpCircle, Sparkles, ChevronRight, Info, Check } from 'lucide-react';
import { SimNotice } from '../common/SimNotice';

interface CodeLineInfo {
  lineNum: number;
  code: string;
  explanation: string;
  category: 'syntax' | 'db' | 'form' | 'sql' | 'control';
}

export const CodeExplainerView: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<'register' | 'select'>('register');
  const [activeLine, setActiveLine] = useState<number>(2);

  const registerLines: CodeLineInfo[] = [
    {
      lineNum: 1,
      code: '<?php',
      explanation: 'Tag pembuka skrip PHP. Mesti diletakkan di awal kod supaya web server tahu ini kod PHP.',
      category: 'syntax',
    },
    {
      lineNum: 2,
      code: '$conn = mysqli_connect("localhost", "root", "", "student_db");',
      explanation: 'Fungsi untuk membina jambatan sambungan (connection) ke pelayan MySQL dengan 4 parameter (host, user, password, db name).',
      category: 'db',
    },
    {
      lineNum: 3,
      code: '$nama = $_POST[\'nama\'];',
      explanation: 'Mengambil data teks nama yang ditaip oleh pengguna dalam borang HTML melalui kaedah HTTP POST.',
      category: 'form',
    },
    {
      lineNum: 4,
      code: '$email = $_POST[\'email\'];',
      explanation: 'Mengambil data alamat email daripada borang HTML dan menyimpannya ke dalam pembolehubah $email.',
      category: 'form',
    },
    {
      lineNum: 5,
      code: '$sql = "INSERT INTO students (name, email) VALUES (\'$nama\', \'$email\')";',
      explanation: 'Membina kenyataan arahan SQL INSERT untuk menambah satu baris rekod baharu ke dalam jadual students.',
      category: 'sql',
    },
    {
      lineNum: 6,
      code: '$result = mysqli_query($conn, $sql);',
      explanation: 'Menghantar dan menjalankan kenyataan SQL ke dalam pangkalan data MySQL melalui sambungan $conn.',
      category: 'db',
    },
    {
      lineNum: 7,
      code: 'if ($result) {',
      explanation: 'Struktur kawalan pilihan: Menyemak sama ada operasi SQL INSERT berjaya dijalankan tanpa ralat.',
      category: 'control',
    },
    {
      lineNum: 8,
      code: '    echo "Data berjaya disimpan!";',
      explanation: 'Memaparkan mesej kejayaan kepada pengguna di skrin pelayar web.',
      category: 'syntax',
    },
    {
      lineNum: 9,
      code: '}',
      explanation: 'Penutup blok syarat if.',
      category: 'control',
    },
    {
      lineNum: 10,
      code: '?>',
      explanation: 'Tag penutup PHP menandakan berakhirnya skrip PHP.',
      category: 'syntax',
    },
  ];

  const selectLines: CodeLineInfo[] = [
    {
      lineNum: 1,
      code: '<?php',
      explanation: 'Tag pembuka PHP untuk memulakan pelaksanaan skrip pada pelayan.',
      category: 'syntax',
    },
    {
      lineNum: 2,
      code: '$conn = mysqli_connect("localhost", "root", "", "student_db");',
      explanation: 'Menyambungkan aplikasi ke pangkalan data student_db.',
      category: 'db',
    },
    {
      lineNum: 3,
      code: '$sql = "SELECT * FROM students";',
      explanation: 'Arahan SQL untuk mengambil SEMUA medan (*) daripada jadual students.',
      category: 'sql',
    },
    {
      lineNum: 4,
      code: '$result = mysqli_query($conn, $sql);',
      explanation: 'Menjalankan carian query SELECT dan menyimpan himpunan rekod ke dalam pembolehubah $result.',
      category: 'db',
    },
    {
      lineNum: 5,
      code: 'while ($row = mysqli_fetch_assoc($result)) {',
      explanation: 'Gelung pengulangan while: Mengambil rekod baris demi baris dalam bentuk array asosiatif selagi masih ada rekod.',
      category: 'control',
    },
    {
      lineNum: 6,
      code: '    echo "Pelajar: " . $row[\'name\'] . "<br>";',
      explanation: 'Mencetak nama pelajar bagi baris rekod semasa ke skrin pelayar.',
      category: 'syntax',
    },
    {
      lineNum: 7,
      code: '}',
      explanation: 'Penutup gelung while.',
      category: 'control',
    },
    {
      lineNum: 8,
      code: '?>',
      explanation: 'Tag penutup fail PHP.',
      category: 'syntax',
    },
  ];

  const activeLines = selectedSnippet === 'register' ? registerLines : selectLines;
  const currentLineInfo = activeLines.find((l) => l.lineNum === activeLine) || activeLines[0];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.7 • CODE EXPLAINER & LINE-BY-LINE WALKTHROUGH
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Penerangan Kod PHP Baris Demi Baris
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Klik atau arahkan kursor (hover) pada mana-mana baris kod di bawah untuk membaca penerangan maksud setiap baris dalam Bahasa Melayu yang ringkas dan padat.
        </p>
      </div>

      <SimNotice />

      {/* Snippet Selector */}
      <div className="flex flex-wrap gap-3">
        <button
          id="btn-snippet-register"
          onClick={() => {
            setSelectedSnippet('register');
            setActiveLine(2);
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedSnippet === 'register'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          1. Skrip Pendaftaran Pelajar (INSERT INTO)
        </button>

        <button
          id="btn-snippet-select"
          onClick={() => {
            setSelectedSnippet('select');
            setActiveLine(3);
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedSnippet === 'select'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          2. Skrip Membaca Rekod (SELECT & WHILE)
        </button>
      </div>

      {/* Interactive Walkthrough Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Listing Left */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm shadow-xl space-y-1">
          <div className="text-xs text-slate-500 font-sans pb-2 border-b border-slate-800 flex justify-between">
            <span>Klik baris untuk lihat penerangan:</span>
            <span className="text-indigo-400 font-bold">Baris Dipilih: #{activeLine}</span>
          </div>

          {activeLines.map((line) => {
            const isSelected = activeLine === line.lineNum;

            return (
              <div
                key={line.lineNum}
                id={`code-line-${line.lineNum}`}
                onClick={() => setActiveLine(line.lineNum)}
                onMouseEnter={() => setActiveLine(line.lineNum)}
                className={`p-2 rounded-lg cursor-pointer flex items-center space-x-3 transition-all ${
                  isSelected
                    ? 'bg-indigo-950 border border-indigo-500/80 text-white shadow-md'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <span
                  className={`w-6 text-right font-bold text-xs ${
                    isSelected ? 'text-indigo-400' : 'text-slate-600'
                  }`}
                >
                  {line.lineNum}
                </span>
                <span className="flex-1 overflow-x-auto whitespace-pre">{line.code}</span>
                {isSelected && <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Line Explanation Card Right */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl border border-indigo-500/40 bg-slate-900/90 shadow-2xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
                Penerangan Baris #{currentLineInfo.lineNum}
              </span>
              <span className="text-xs uppercase font-mono text-slate-400">
                Kategori: {currentLineInfo.category}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-yellow-300 overflow-x-auto">
              {currentLineInfo.code}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-400" />
                Maksud Kod (Bahasa Melayu):
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentLineInfo.explanation}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Tips Pelajar:</strong> Fahami fungsi setiap kata kunci sebelum menyalin kod ke dalam projek bengkel TVET anda.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
