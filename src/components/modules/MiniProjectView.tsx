import React, { useState } from 'react';
import { FolderGit2, Play, FileCode, CheckCircle2, Copy, Sparkles, Monitor, Layers } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const MiniProjectView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'index' | 'conn' | 'insert' | 'view'>('index');

  // Test Run Demo State
  const [demoName, setDemoName] = useState('Ali Bin Ahmad');
  const [demoEmail, setDemoEmail] = useState('ali@email.com');
  const [demoProgram, setDemoProgram] = useState('STM');
  const [demoRecords, setDemoRecords] = useState([
    { id: 1, name: 'Ali Bin Ahmad', email: 'ali@email.com', prog: 'STM' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', prog: 'STM' },
  ]);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName.trim() || !demoEmail.trim()) return;

    const newId = demoRecords.length + 1;
    setDemoRecords([...demoRecords, { id: newId, name: demoName, email: demoEmail, prog: demoProgram }]);
    setDemoNotice(`✓ Pendaftaran "${demoName}" berjaya disimpan ke dalam database melalui insert.php!`);
    setDemoName('');
    setDemoEmail('');
    setTimeout(() => setDemoNotice(null), 4000);
  };

  const projectFiles = {
    index: {
      name: 'index.html',
      badge: 'HTML5 Form',
      code: `<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <title>Sistem Pendaftaran Pelajar</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f6f9; padding: 20px; }
        .form-card { max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="form-card">
        <h2>Borang Pendaftaran Pelajar STM</h2>
        <form action="insert.php" method="POST">
            <div class="form-group">
                <label>Nama Pelajar:</label>
                <input type="text" name="nama" required>
            </div>
            <div class="form-group">
                <label>Alamat Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Program:</label>
                <select name="programme">
                    <option value="STM">Sijil Teknologi Maklumat (STM)</option>
                    <option value="SKE">Sijil Teknologi Elektrik (SKE)</option>
                </select>
            </div>
            <button type="submit">DAFTAR SEKARANG</button>
        </form>
    </div>
</body>
</html>`,
    },
    conn: {
      name: 'connection.php',
      badge: 'Database Bridge',
      code: `<?php
// Fail: connection.php
// Konfigurasi sambungan pelayan MySQL tempatan
$host     = "localhost";
$username = "root";
$password = "";
$database = "student_db";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Sambungan ke database gagal: " . mysqli_connect_error());
}
?>`,
    },
    insert: {
      name: 'insert.php',
      badge: 'POST & SQL INSERT',
      code: `<?php
// Fail: insert.php
// 1. Sertakan fail sambungan database
include 'connection.php';

// 2. Terima nilai input daripada borang HTML
$nama      = $_POST['nama'];
$email     = $_POST['email'];
$programme = $_POST['programme'];

// 3. Bina arahan SQL INSERT
$sql = "INSERT INTO students (name, email, programme) 
        VALUES ('$nama', '$email', '$programme')";

// 4. Laksana query dan beri maklumbalas
if (mysqli_query($conn, $sql)) {
    echo "<h3>Pendaftaran $nama berjaya disimpan!</h3>";
    echo "<a href='view.php'>Lihat Senarai Pelajar</a>";
} else {
    echo "Ralat pendaftaran: " . mysqli_error($conn);
}
?>`,
    },
    view: {
      name: 'view.php',
      badge: 'SQL SELECT & Table',
      code: `<?php
// Fail: view.php
include 'connection.php';

$sql = "SELECT * FROM students";
$result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Senarai Pelajar Berdaftar</title>
</head>
<body>
    <h2>Senarai Pelajar Kolej Komuniti</h2>
    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Program</th>
        </tr>
        <?php while($row = mysqli_fetch_assoc($result)) { ?>
        <tr>
            <td><?php echo $row['id']; ?></td>
            <td><?php echo $row['name']; ?></td>
            <td><?php echo $row['email']; ?></td>
            <td><?php echo $row['programme']; ?></td>
        </tr>
        <?php } ?>
    </table>
    <br>
    <a href="index.html">Tambah Pelajar Baharu</a>
</body>
</html>`,
    },
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.11 • PROJEK MINI (MINI PROJECT TVET)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Sistem Pendaftaran Pelajar (Student Registration System)
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Struktur lengkap 4 fail teras yang membentuk aplikasi web berasaskan pangkalan data standard untuk bengkel amali TVET.
        </p>
      </div>

      <SimNotice />

      {/* 4 Files Multi-Tab Viewer */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">4 Fail Teras Projek Web</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['index', 'conn', 'insert', 'view'] as const).map((key) => {
              const file = projectFiles[key];
              const isSelected = selectedFile === key;

              return (
                <button
                  key={key}
                  id={`btn-file-${key}`}
                  onClick={() => setSelectedFile(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {file.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code of selected file */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Fail Dipaparkan: <strong className="text-indigo-300 font-mono">{projectFiles[selectedFile].name}</strong></span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">
              {projectFiles[selectedFile].badge}
            </span>
          </div>

          <CodeBlock
            language={selectedFile === 'index' ? 'html' : 'php'}
            badgeType={selectedFile === 'index' ? 'html' : 'php'}
            title={projectFiles[selectedFile].name}
            code={projectFiles[selectedFile].code}
          />
        </div>
      </div>

      {/* Interactive Test-Run Sandbox Frame */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">
            Uji Lari Interaktif Projek Mini (Interactive Simulation Live Preview)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Uji aliran borang sebenar untuk melihat bagaimana 4 fail ini bekerjasama dalam sistem hidup:
        </p>

        {demoNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs sm:text-sm text-emerald-300 animate-fadeIn flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{demoNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Form Left */}
          <div className="md:col-span-5 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase font-mono block">
              Borang index.html &rarr; insert.php:
            </span>

            <form onSubmit={handleDemoSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400">Nama Pelajar:</label>
                <input
                  id="project-input-name"
                  type="text"
                  required
                  value={demoName}
                  onChange={(e) => setDemoName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                  placeholder="Ali Bin Ahmad"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400">Email:</label>
                <input
                  id="project-input-email"
                  type="email"
                  required
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                  placeholder="ali@email.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400">Program:</label>
                <select
                  id="project-select-prog"
                  value={demoProgram}
                  onChange={(e) => setDemoProgram(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                >
                  <option value="STM">Sijil Teknologi Maklumat (STM)</option>
                  <option value="SKE">Sijil Teknologi Elektrik (SKE)</option>
                </select>
              </div>

              <button
                id="btn-project-demo-submit"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                HANTAR BORANG (SUBMIT POST)
              </button>
            </form>
          </div>

          {/* View.php Output Right */}
          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase font-mono block">
              Hasil Paparan view.php (SELECT * FROM students):
            </span>

            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">id</th>
                    <th className="px-3 py-2">name</th>
                    <th className="px-3 py-2">email</th>
                    <th className="px-3 py-2">programme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {demoRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-900/50">
                      <td className="px-3 py-2 text-indigo-400">{r.id}</td>
                      <td className="px-3 py-2 font-sans font-medium text-white">{r.name}</td>
                      <td className="px-3 py-2 text-slate-400">{r.email}</td>
                      <td className="px-3 py-2 text-emerald-400">{r.prog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
