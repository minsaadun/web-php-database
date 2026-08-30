import React from 'react';
import { NavSection } from '../types';
import {
  Home,
  ArrowLeftRight,
  Code,
  DollarSign,
  Calculator,
  GitFork,
  Repeat,
  Database,
  Link,
  Share2,
  Table,
  Search,
  Lock,
  FileCode2,
  Bug,
  Gamepad2,
  HelpCircle,
  Award,
  FolderGit2,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Flame,
} from 'lucide-react';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  completedSections: string[];
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: NavSection;
  label: string;
  badge?: string;
  icon: React.ElementType;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  completedSections,
  isOpen,
  onClose,
}) => {
  const groups: NavGroup[] = [
    {
      groupTitle: '1. Pengenalan & Asas Web',
      items: [
        { id: 'home', label: 'Home & CLO1', icon: Home },
        { id: 'static-dynamic', label: 'Static vs Dynamic', icon: ArrowLeftRight },
        { id: 'php-basics', label: 'PHP Basics & Simulator', icon: Code },
      ],
    },
    {
      groupTitle: '2. Pengaturcaraan PHP',
      items: [
        { id: 'variables', label: 'Variables & Data Types', icon: DollarSign },
        { id: 'operators', label: 'Operators & Calculator', icon: Calculator },
        { id: 'conditions', label: 'Conditional (if...else)', icon: GitFork },
        { id: 'loops', label: 'Loops & Visualizer', icon: Repeat },
      ],
    },
    {
      groupTitle: '3. Database & SQL (DBMS)',
      items: [
        { id: 'database-table', label: 'Database & Table Builder', icon: Database },
        { id: 'connection', label: 'Database Connection', icon: Link },
        { id: 'data-flow', label: 'Full Data Flow Pipeline', icon: Share2 },
      ],
    },
    {
      groupTitle: '4. Form & Operasi Data (CRUD)',
      items: [
        { id: 'crud-lab', label: 'CRUD Simulator (C-R-U-D)', badge: 'P3 Core', icon: Table },
        { id: 'search', label: 'Search Data (LIKE %)', icon: Search },
        { id: 'auth', label: 'User Authentication', icon: Lock },
        { id: 'code-explainer', label: 'PHP Form + SQL Explainer', icon: FileCode2 },
      ],
    },
    {
      groupTitle: '5. Hands-on Lab & Cabaran',
      items: [
        { id: 'debug-lab', label: 'Debug Lab (8 Cases)', badge: 'Uji Ralat', icon: Bug },
        { id: 'games', label: 'Predict Output & Games', icon: Gamepad2 },
        { id: 'quiz', label: 'Quick Quiz (15 Soalan)', badge: 'Kuiz', icon: HelpCircle },
        { id: 'mini-challenge', label: 'Mini Challenge & Kumpulan', icon: Award },
        { id: 'mini-project', label: 'Mini Project (Student App)', badge: 'Hands-on', icon: FolderGit2 },
      ],
    },
    {
      groupTitle: '6. Tips & Pencapaian',
      items: [
        { id: 'best-practices', label: 'Common Mistakes & Tips', icon: AlertTriangle },
        { id: 'progress', label: 'Progress & Sijil', icon: BarChart3 },
      ],
    },
  ];

  const handleSelect = (id: NavSection) => {
    onSelectSection(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto flex flex-col ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Module Header Pill */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-base tracking-tight uppercase">PHP & Database Lab</h1>
              <p className="text-[10px] font-bold text-blue-400 mt-0.5 uppercase tracking-widest">STM21673 • Semester 2</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-700/50">
              TVET P3
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-5 flex-1 text-left">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1.5">
                {group.groupTitle}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  const isCompleted = completedSections.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      id={`nav-item-${item.id}`}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-blue-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-blue-900/40 text-blue-300 border border-blue-700/40'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {isCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & Sidebar Progress */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
          <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-1.5 text-[10px] uppercase tracking-wider">
              <span className="text-slate-400 font-bold">Progress Pembelajaran</span>
              <span className="text-blue-400 font-bold font-mono">
                {Math.round((completedSections.length / 21) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((completedSections.length / 21) * 100))}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Kolej Komuniti Malaysia</span>
            <span className="text-amber-400 font-mono flex items-center gap-1">
              <Flame className="w-3 h-3" /> CLO1 P3
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
