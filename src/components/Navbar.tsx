import React from 'react';
import { NavSection } from '../types';
import {
  Code2,
  Database,
  Layers,
  Award,
  Menu,
  X,
  BookOpen,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface NavbarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  completedCount: number;
  totalSections: number;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  completedCount,
  totalSections,
  isSidebarOpen,
  onToggleSidebar,
  onResetProgress,
}) => {
  const percentage = Math.round((completedCount / totalSections) * 100);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Left */}
          <div className="flex items-center space-x-3">
            <button
              id="btn-sidebar-toggle"
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none lg:hidden"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => onSelectSection('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
                    PHP & DATABASE LAB
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-700">
                    STM21673
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden xs:block">
                  Form → PHP → SQL → Database
                </span>
              </div>
            </div>
          </div>

          {/* Quick shortcuts & Progress stats */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Links */}
            <nav className="hidden md:flex items-center space-x-1 text-xs">
              <button
                id="nav-quick-crud"
                onClick={() => onSelectSection('crud-lab')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentSection === 'crud-lab'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                CRUD Lab
              </button>
              <button
                id="nav-quick-debug"
                onClick={() => onSelectSection('debug-lab')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentSection === 'debug-lab'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Debug Lab
              </button>
              <button
                id="nav-quick-quiz"
                onClick={() => onSelectSection('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentSection === 'quiz'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Quick Quiz
              </button>
              <button
                id="nav-quick-project"
                onClick={() => onSelectSection('mini-project')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentSection === 'mini-project'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Mini Project
              </button>
            </nav>

            {/* Reset Lab Button */}
            <button
              id="btn-nav-reset"
              onClick={onResetProgress}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition-all shadow-sm cursor-pointer"
              title="Reset Semua Kemajuan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Lab</span>
            </button>

            {/* Progress pill button */}
            <button
              id="btn-nav-progress"
              onClick={() => onSelectSection('progress')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Award className="w-3 h-3" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-800">{percentage}%</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">Progress</span>
              </div>
              <div className="w-12 sm:w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
