import React, { useState, useEffect } from 'react';
import { StudentRecord } from '../../types';
import { INITIAL_STUDENTS } from '../../data/courseData';
import {
  Table,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react';
import { CodeBlock } from '../common/CodeBlock';
import { SimNotice } from '../common/SimNotice';

export const CrudLabView: React.FC = () => {
  // CRUD LocalStorage persistence
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('php_lab_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'create' | 'read' | 'update' | 'delete' | 'simulator'>('simulator');

  // Form State
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [programmeInput, setProgrammeInput] = useState('STM');
  const [editId, setEditId] = useState<number | null>(null);

  // Status & live code tracking
  const [lastAction, setLastAction] = useState<string>('SELECT * FROM students;');
  const [lastPhpCode, setLastPhpCode] = useState<string>(`<?php
// Paparkan semua rekod pelajar
$sql = "SELECT * FROM students";
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)) {
    echo $row['name'] . " - " . $row['programme'] . "<br>";
}
?>`);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('php_lab_students', JSON.stringify(students));
  }, [students]);

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;

    if (editId !== null) {
      // UPDATE
      const updated = students.map((s) =>
        s.id === editId
          ? { ...s, name: nameInput, email: emailInput, programme: programmeInput }
          : s
      );
      setStudents(updated);
      setLastAction(`UPDATE students\nSET name = '${nameInput}', email = '${emailInput}', programme = '${programmeInput}'\nWHERE id = ${editId};`);
      setLastPhpCode(`<?php
// Kemaskini rekod pelajar sedia ada
$id = ${editId};
$name = "${nameInput}";
$email = "${emailInput}";
$programme = "${programmeInput}";

$sql = "UPDATE students 
        SET name='$name', email='$email', programme='$programme' 
        WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo "Rekod pelajar ID $id berjaya dikemaskini!";
}
?>`);
      setActionNotice(`✓ Rekod pelajar ID #${editId} berjaya dikemaskini (UPDATE)!`);
      setEditId(null);
    } else {
      // INSERT
      const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      const newRecord: StudentRecord = {
        id: newId,
        name: nameInput,
        email: emailInput,
        programme: programmeInput,
      };
      setStudents([...students, newRecord]);
      setLastAction(`INSERT INTO students (name, email, programme)\nVALUES ('${nameInput}', '${emailInput}', '${programmeInput}');`);
      setLastPhpCode(`<?php
// Masukkan data pelajar baru
$name = "${nameInput}";
$email = "${emailInput}";
$programme = "${programmeInput}";

$sql = "INSERT INTO students (name, email, programme) 
        VALUES ('$name', '$email', '$programme')";

if (mysqli_query($conn, $sql)) {
    echo "Pelajar baharu berjaya didaftarkan!";
}
?>`);
      setActionNotice(`✓ Pelajar baharu "${nameInput}" berjaya ditambah (INSERT)!`);
    }

    setNameInput('');
    setEmailInput('');
    setProgrammeInput('STM');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleStartEdit = (student: StudentRecord) => {
    setEditId(student.id);
    setNameInput(student.name);
    setEmailInput(student.email);
    setProgrammeInput(student.programme);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNameInput('');
    setEmailInput('');
    setProgrammeInput('STM');
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    const target = students.find((s) => s.id === deleteTargetId);
    setStudents(students.filter((s) => s.id !== deleteTargetId));
    setLastAction(`DELETE FROM students\nWHERE id = ${deleteTargetId};`);
    setLastPhpCode(`<?php
// Padam rekod pelajar daripada database
$id = ${deleteTargetId};

$sql = "DELETE FROM students WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo "Rekod pelajar ID $id telah dipadam!";
}
?>`);
    setActionNotice(`✓ Rekod pelajar "${target?.name || deleteTargetId}" berjaya dipadam (DELETE)!`);
    setDeleteTargetId(null);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleResetData = () => {
    setStudents(INITIAL_STUDENTS);
    localStorage.removeItem('php_lab_students');
    setLastAction('SELECT * FROM students;');
    setActionNotice('Data jadual pelajar telah dikembalikan kepada rekod asal.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          4.6 • OPERASI CRUD (CREATE, READ, UPDATE, DELETE)
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          CRUD Lab & Interactive Database Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Lakukan operasi Tambah (Insert), Papar (Retrieve), Kemaskini (Update), dan Padam (Delete) pada jadual pangkalan data secara langsung!
        </p>
      </div>

      <SimNotice />

      {/* 1. 4 Interactive CRUD Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            letter: 'C',
            op: 'CREATE',
            sql: 'INSERT',
            desc: 'Menambah data baru ke dalam database table.',
            cardBg: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
            badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
          },
          {
            letter: 'R',
            op: 'READ',
            sql: 'SELECT',
            desc: 'Membaca atau mengambil semula data daripada database.',
            cardBg: 'border-blue-200 bg-blue-50/60 text-blue-900',
            badge: 'bg-blue-100 text-blue-800 border border-blue-200',
          },
          {
            letter: 'U',
            op: 'UPDATE',
            sql: 'UPDATE',
            desc: 'Mengubah suai rekod data yang sedia ada.',
            cardBg: 'border-amber-200 bg-amber-50/60 text-amber-900',
            badge: 'bg-amber-100 text-amber-800 border border-amber-200',
          },
          {
            letter: 'D',
            op: 'DELETE',
            sql: 'DELETE',
            desc: 'Membuang atau menghapuskan rekod tertentu.',
            cardBg: 'border-rose-200 bg-rose-50/60 text-rose-900',
            badge: 'bg-rose-100 text-rose-800 border border-rose-200',
          },
        ].map((item) => (
          <div
            key={item.letter}
            className={`p-4 rounded-xl border ${item.cardBg} flex flex-col justify-between space-y-2 shadow-xs`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black font-mono">{item.letter}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${item.badge}`}>
                SQL: {item.sql}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm">{item.op}</h3>
              <p className="text-xs opacity-90 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Full Integrated CRUD Simulator (Split Screen) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">
              SPLIT-SCREEN SIMULATOR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Student Information System (CRUD Workbench)
            </h2>
          </div>

          <button
            id="btn-reset-crud-data"
            onClick={handleResetData}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Set Semula Data Asal</span>
          </button>
        </div>

        {actionNotice && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 animate-fadeIn flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form & Live Database Table */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form Section */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                  {editId !== null ? `Kemaskini Pelajar (ID #${editId})` : 'Pendaftaran Pelajar Baharu'}
                </h3>
                {editId !== null && (
                  <button
                    id="btn-cancel-edit"
                    onClick={handleCancelEdit}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveStudent} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Nama Pelajar (name):</label>
                    <input
                      id="crud-input-name"
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Contoh: Muhammad Haziq"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email (email):</label>
                    <input
                      id="crud-input-email"
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Contoh: haziq@email.com"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Program (programme):</label>
                  <select
                    id="crud-select-programme"
                    value={programmeInput}
                    onChange={(e) => setProgrammeInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="STM">Sijil Teknologi Maklumat (STM)</option>
                    <option value="SKE">Sijil Teknologi Elektrik (SKE)</option>
                    <option value="SKM">Sijil Teknologi Mekanikal (SKM)</option>
                  </select>
                </div>

                <button
                  id="btn-crud-submit"
                  type="submit"
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm text-white shadow-sm transition-all cursor-pointer ${
                    editId !== null
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {editId !== null ? 'UPDATE PELAJAR' : 'SIMPAN (INSERT PELAJAR)'}
                </button>
              </form>
            </div>

            {/* Table Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  Jadual MySQL: <code className="text-emerald-700 font-mono bg-emerald-50 px-1 py-0.5 rounded">students</code>
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">
                  {students.length} Rekod
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-mono border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5 font-bold">id</th>
                        <th className="px-3 py-2.5 font-bold">name</th>
                        <th className="px-3 py-2.5 font-bold">email</th>
                        <th className="px-3 py-2.5 font-bold">programme</th>
                        <th className="px-3 py-2.5 text-right font-bold">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                      {students.map((student) => (
                        <tr
                          key={student.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            editId === student.id ? 'bg-amber-50/70 border-l-2 border-amber-500' : ''
                          }`}
                        >
                          <td className="px-3 py-2.5 text-blue-600 font-bold">{student.id}</td>
                          <td className="px-3 py-2.5 font-sans font-medium text-slate-900">
                            {student.name}
                          </td>
                          <td className="px-3 py-2.5 text-slate-500">{student.email}</td>
                          <td className="px-3 py-2.5">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                              {student.programme}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right space-x-1 whitespace-nowrap">
                            <button
                              id={`btn-edit-student-${student.id}`}
                              onClick={() => handleStartEdit(student)}
                              className="p-1.5 rounded hover:bg-slate-100 text-amber-600 transition-colors cursor-pointer"
                              title="Kemaskini Rekod (Edit)"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`btn-del-student-${student.id}`}
                              onClick={() => setDeleteTargetId(student.id)}
                              className="p-1.5 rounded hover:bg-slate-100 text-rose-600 transition-colors cursor-pointer"
                              title="Padam Rekod (Delete)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-3 py-6 text-center text-slate-500 font-sans text-xs">
                            Tiada rekod pelajar dalam table. Sila tambah pelajar baharu menggunakan borang di atas.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Live Code & SQL Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                SQL Statement Terkini:
              </span>
              <CodeBlock
                language="sql"
                badgeType="sql"
                title="live_query.sql"
                code={lastAction}
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                PHP Backend Code Padanan:
              </span>
              <CodeBlock
                language="php"
                badgeType="php"
                title="crud_controller.php"
                code={lastPhpCode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Adakah anda pasti? (Are you sure?)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tindakan ini akan memadam rekod pelajar (ID #{deleteTargetId}) daripada pangkalan data MySQL secara kekal.
            </p>

            <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 border border-slate-800">
              DELETE FROM students WHERE id = {deleteTargetId};
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                id="btn-cancel-delete"
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Batal (CANCEL)
              </button>
              <button
                id="btn-confirm-delete"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Ya, Padam (YES, DELETE)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
