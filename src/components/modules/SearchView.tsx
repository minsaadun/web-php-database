import React, { useState } from 'react';
import { Search, Database, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const SearchView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('Ali');

  const allRecords = [
    { id: 1, name: 'Ali Bin Ahmad', email: 'ali@email.com', programme: 'STM' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', programme: 'STM' },
    { id: 3, name: 'Muhammad Danish', email: 'danish@email.com', programme: 'STM' },
    { id: 4, name: 'Nurul Izzah', email: 'izzah@email.com', programme: 'SKE' },
    { id: 5, name: 'Aliya Natasha', email: 'aliya@email.com', programme: 'STM' },
    { id: 6, name: 'Amirul Hakim', email: 'amirul@email.com', programme: 'SKM' },
  ];

  const filteredRecords = allRecords.filter((record) => {
    const term = searchTerm.toLowerCase();
    return (
      record.name.toLowerCase().includes(term) ||
      record.email.toLowerCase().includes(term) ||
      record.programme.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.6.5 • CARIAN DATA (SEARCH DATA)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Search Data & SQL LIKE Clause
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Ketahui bagaimana klausa SQL <code className="text-amber-300 font-bold">WHERE name LIKE '%...%'</code> digunakan bersama simbol peratus (<code className="text-amber-300 font-bold">%</code>) untuk mencari padanan nama atau teks.
        </p>
      </div>

      <SimNotice />

      {/* 1. Wildcard Explanation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-400" />
          Konsep Wildcard (%) dalam SQL LIKE
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Simbol <code className="text-amber-300 font-bold">%</code> bertindak sebagai pengganti untuk mana-mana huruf sebelum atau selepas perkataan carian:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-indigo-300">%Ali%</span>
            <p className="text-slate-300">Mengandungi "Ali" di mana-mana posisi teks.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-purple-300">Ali%</span>
            <p className="text-slate-300">Mesti bermula dengan perkataan "Ali".</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-pink-300">%Ali</span>
            <p className="text-slate-300">Mesti berakhir dengan perkataan "Ali".</p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search Workbench */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              INTERACTIVE SEARCH ENGINE
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Live Student Search Simulator</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Kata Kunci Pantas:</span>
            {['Ali', 'Siti', 'STM', 'SKE'].map((kw) => (
              <button
                key={kw}
                id={`btn-kw-${kw}`}
                onClick={() => setSearchTerm(kw)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-indigo-300 transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Search Box & Table Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                id="input-search-student"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, email, atau program..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Hasil Padanan: <strong className="text-white">{filteredRecords.length}</strong> rekod dijumpai</span>
              <span>Jumlah Keseluruhan: 6 rekod</span>
            </div>

            {/* Results Table */}
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5">id</th>
                    <th className="px-3 py-2.5">name</th>
                    <th className="px-3 py-2.5">email</th>
                    <th className="px-3 py-2.5">programme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-3 py-2 text-indigo-400 font-bold">{record.id}</td>
                      <td className="px-3 py-2 font-sans font-medium text-white">{record.name}</td>
                      <td className="px-3 py-2 text-slate-400">{record.email}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                          {record.programme}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-slate-500 font-sans text-xs">
                        Tiada padanan rekod ditemui untuk carian "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Realtime SQL & PHP Right */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Generated SQL Query:
            </span>
            <CodeBlock
              language="sql"
              badgeType="sql"
              title="search_query.sql"
              code={`SELECT * FROM students 
WHERE name LIKE '%${searchTerm}%' 
   OR email LIKE '%${searchTerm}%' 
   OR programme LIKE '%${searchTerm}%';`}
            />

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              PHP Backend Code:
            </span>
            <CodeBlock
              language="php"
              badgeType="php"
              title="search.php"
              code={`<?php
$carian = $_GET['search']; // "${searchTerm}"

$sql = "SELECT * FROM students 
        WHERE name LIKE '%$carian%'";
$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($result)) {
    echo "<li>" . $row['name'] . "</li>";
}
?>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
