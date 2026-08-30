import React, { useState } from 'react';
import {
  Database,
  Table as TableIcon,
  Layers,
  Play,
  CheckCircle2,
  FolderTree,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

interface FieldDef {
  name: string;
  type: string;
  length?: string;
}

export const DatabaseTableView: React.FC = () => {
  // DB Simulator State
  const [dbCreated, setDbCreated] = useState<boolean>(false);
  const [tableCreated, setTableCreated] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<string>('students');

  // Interactive Table Builder State
  const [customTableName, setCustomTableName] = useState<string>('students');
  const [fields, setFields] = useState<FieldDef[]>([
    { name: 'id', type: 'INT', length: '' },
    { name: 'name', type: 'VARCHAR', length: '100' },
    { name: 'email', type: 'VARCHAR', length: '100' },
    { name: 'programme', type: 'VARCHAR', length: '50' },
  ]);
  const [generatedSql, setGeneratedSql] = useState<string>('');

  const sampleRecords = [
    { id: 1, name: 'Ali Bin Ahmad', email: 'ali@email.com', programme: 'STM' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', programme: 'STM' },
    { id: 3, name: 'Muhammad Danish', email: 'danish@email.com', programme: 'STM' },
  ];

  const handleAddField = () => {
    setFields([...fields, { name: 'phone', type: 'VARCHAR', length: '20' }]);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, idx) => idx !== index));
  };

  const handleFieldChange = (index: number, key: keyof FieldDef, value: string) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleGenerateSql = () => {
    const fieldLines = fields.map((f) => {
      if (f.type === 'VARCHAR' || f.type === 'CHAR') {
        return `    ${f.name || 'medan'} ${f.type}(${f.length || '100'})`;
      }
      return `    ${f.name || 'medan'} ${f.type}`;
    });

    const sql = `CREATE TABLE ${customTableName || 'students'} (\n${fieldLines.join(',\n')}\n);`;
    setGeneratedSql(sql);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
          4.3 & 4.4 • PANGKALAN DATA (DBMS) & JADUAL
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Database & Table Builder Lab
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Ketahui konsep pangkalan data MySQL, struktur jadual (table), jenis medan data, dan bina arahan SQL secara interaktif.
        </p>
      </div>

      <SimNotice />

      {/* 1. Analogi Filing Cabinet */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Analogi Database: "Kabinet Fail Pejabat"
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Bagi memahami struktur DBMS dengan mudah, bayangkan sebuah almari fail (Filing Cabinet) di pejabat:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase font-mono">
              1. DATABASE
            </span>
            <h3 className="font-bold text-white text-sm">Filing Cabinet (Almari)</h3>
            <p className="text-xs text-slate-400">
              Tempat menyimpan semua maklumat (Contoh: <code className="text-amber-300">student_db</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono">
              2. TABLE
            </span>
            <h3 className="font-bold text-white text-sm">Folder Fail</h3>
            <p className="text-xs text-slate-400">
              Kategori fail tertentu dalam almari (Contoh: <code className="text-amber-300">students</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
              3. ROW (RECORD)
            </span>
            <h3 className="font-bold text-white text-sm">Sekeping Borang Rekod</h3>
            <p className="text-xs text-slate-400">
              Satu baris data milik seorang pelajar (Ali, Siti, Danish).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase font-mono">
              4. COLUMN (FIELD)
            </span>
            <h3 className="font-bold text-white text-sm">Ruangan Medan Data</h3>
            <p className="text-xs text-slate-400">
              Ciri maklumat spesifik (<code className="text-amber-300">id, name, email</code>).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Visual Database Tree & Sample Records */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 shadow-xl">
        <div className="flex items-center space-x-2">
          <FolderTree className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            Visual Database Schema Tree (Klik Table Untuk Lihat Data)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tree Structure Left */}
          <div className="md:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold">
              <Database className="w-4 h-4" />
              <span>student_db</span>
            </div>
            <div className="pl-5 border-l border-slate-700 space-y-2 ml-2">
              <div
                onClick={() => setSelectedTable('students')}
                className="flex items-center space-x-2 p-2 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 cursor-pointer hover:bg-indigo-900/50 transition-colors"
              >
                <TableIcon className="w-4 h-4 text-indigo-400" />
                <span className="font-bold">└── students (Table)</span>
              </div>
              <div className="pl-6 space-y-1 text-slate-400 text-xs">
                <div>├── id (INT, Primary Key)</div>
                <div>├── name (VARCHAR)</div>
                <div>├── email (VARCHAR)</div>
                <div>└── programme (VARCHAR)</div>
              </div>
            </div>
          </div>

          {/* Sample Table View Right */}
          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Sample Records dalam Table: <code className="text-indigo-400">{selectedTable}</code>
            </span>

            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">id</th>
                    <th className="px-3 py-2">name</th>
                    <th className="px-3 py-2">email</th>
                    <th className="px-3 py-2">programme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  {sampleRecords.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-900/60">
                      <td className="px-3 py-2 text-indigo-400 font-bold">{row.id}</td>
                      <td className="px-3 py-2 font-sans font-medium text-white">{row.name}</td>
                      <td className="px-3 py-2 text-slate-400">{row.email}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                          {row.programme}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SQL Simulator: CREATE DATABASE & CREATE TABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create DB */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">1. CREATE DATABASE SQL</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">SQL DDL</span>
          </div>

          <CodeBlock
            language="sql"
            badgeType="sql"
            title="create_database.sql"
            code={`CREATE DATABASE student_db;`}
          />

          <button
            id="btn-run-create-db"
            onClick={() => setDbCreated(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RUN SQL (CREATE DATABASE)</span>
          </button>

          {dbCreated && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs sm:text-sm text-emerald-300 animate-fadeIn flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>DATABASE CREATED ✓:</strong> Pangkalan data <code>student_db</code> berjaya dicipta dalam DBMS!
              </span>
            </div>
          )}
        </div>

        {/* Create Table */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">2. CREATE TABLE SQL</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">SQL DDL</span>
          </div>

          <CodeBlock
            language="sql"
            badgeType="sql"
            title="create_table.sql"
            code={`CREATE TABLE students (
    id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    programme VARCHAR(50)
);`}
          />

          <button
            id="btn-run-create-table"
            onClick={() => setTableCreated(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RUN SQL (CREATE TABLE)</span>
          </button>

          {tableCreated && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs sm:text-sm text-emerald-300 animate-fadeIn flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>TABLE CREATED ✓:</strong> Jadual <code>students</code> sedia untuk menyimpan rekod data.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Interactive Database Table Builder */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              INTERACTIVE TOOL
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Database Table Builder & SQL Generator
            </h2>
          </div>

          <button
            id="btn-add-field"
            onClick={handleAddField}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Medan (Field)</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="max-w-xs space-y-1">
            <label className="text-xs font-bold text-slate-300">Table Name:</label>
            <input
              id="input-table-name"
              type="text"
              value={customTableName}
              onChange={(e) => setCustomTableName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Contoh: students"
            />
          </div>

          {/* Fields list */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Senarai Medan (Columns):
            </span>
            {fields.map((field, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800"
              >
                <div className="flex-1 min-w-[120px]">
                  <input
                    id={`field-name-${idx}`}
                    type="text"
                    value={field.name}
                    onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                    placeholder="Field Name"
                  />
                </div>

                <div className="w-32">
                  <select
                    id={`field-type-${idx}`}
                    value={field.type}
                    onChange={(e) => handleFieldChange(idx, 'type', e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                  >
                    <option value="INT">INT (Nombor)</option>
                    <option value="VARCHAR">VARCHAR (Teks)</option>
                    <option value="TEXT">TEXT (Teks Panjang)</option>
                    <option value="DATE">DATE (Tarikh)</option>
                  </select>
                </div>

                {field.type === 'VARCHAR' && (
                  <div className="w-20">
                    <input
                      id={`field-len-${idx}`}
                      type="text"
                      value={field.length}
                      onChange={(e) => handleFieldChange(idx, 'length', e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs text-center"
                      placeholder="Panjang"
                    />
                  </div>
                )}

                <button
                  id={`btn-del-field-${idx}`}
                  onClick={() => handleRemoveField(idx)}
                  disabled={fields.length <= 1}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors disabled:opacity-30"
                  title="Padam Medan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            id="btn-generate-table-sql"
            onClick={handleGenerateSql}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            GENERATE SQL DDL
          </button>

          {generatedSql && (
            <div className="space-y-2 animate-fadeIn pt-2">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono block">
                Generated CREATE TABLE Statement:
              </span>
              <CodeBlock
                language="sql"
                badgeType="sql"
                title="generated_create_table.sql"
                code={generatedSql}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
