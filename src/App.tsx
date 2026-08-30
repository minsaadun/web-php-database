import React, { useState, useEffect } from 'react';
import { NavSection } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// View Modules
import { HomeView } from './components/modules/HomeView';
import { StaticVsDynamicView } from './components/modules/StaticVsDynamicView';
import { PhpBasicsView } from './components/modules/PhpBasicsView';
import { VariablesTypesView } from './components/modules/VariablesTypesView';
import { OperatorsView } from './components/modules/OperatorsView';
import { ConditionsView } from './components/modules/ConditionsView';
import { LoopsView } from './components/modules/LoopsView';
import { DatabaseTableView } from './components/modules/DatabaseTableView';
import { ConnectionView } from './components/modules/ConnectionView';
import { FullDataFlowView } from './components/modules/FullDataFlowView';
import { CrudLabView } from './components/modules/CrudLabView';
import { SearchView } from './components/modules/SearchView';
import { AuthView } from './components/modules/AuthView';
import { CodeExplainerView } from './components/modules/CodeExplainerView';
import { DebugLabView } from './components/modules/DebugLabView';
import { GamesQuizView } from './components/modules/GamesQuizView';
import { MiniChallengeView } from './components/modules/MiniChallengeView';
import { MiniProjectView } from './components/modules/MiniProjectView';
import { ProgressTipsView } from './components/modules/ProgressTipsView';

import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const SECTIONS_SEQUENCE: NavSection[] = [
  'home',
  'static-dynamic',
  'php-basics',
  'variables',
  'operators',
  'conditions',
  'loops',
  'database-table',
  'connection',
  'data-flow',
  'crud-lab',
  'search',
  'auth',
  'code-explainer',
  'debug-lab',
  'games',
  'quiz',
  'mini-challenge',
  'mini-project',
  'best-practices',
  'progress',
];

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>(() => {
    const saved = localStorage.getItem('php_lab_current_section');
    return (saved as NavSection) || 'home';
  });

  const [completedSections, setCompletedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('php_lab_completed_sections');
    return saved ? JSON.parse(saved) : ['home'];
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('php_lab_current_section', currentSection);

    // Auto mark visited section as completed
    if (!completedSections.includes(currentSection)) {
      const updated = [...completedSections, currentSection];
      setCompletedSections(updated);
      localStorage.setItem('php_lab_completed_sections', JSON.stringify(updated));
    }

    // Scroll to top on section change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    setSidebarOpen(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('Adakah anda ingin set semula rekod kemajuan pembelajaran anda?')) {
      const reset = ['home'];
      setCompletedSections(reset);
      localStorage.setItem('php_lab_completed_sections', JSON.stringify(reset));
      setCurrentSection('home');
    }
  };

  const currentIndex = SECTIONS_SEQUENCE.indexOf(currentSection);
  const prevSection = currentIndex > 0 ? SECTIONS_SEQUENCE[currentIndex - 1] : null;
  const nextSection =
    currentIndex < SECTIONS_SEQUENCE.length - 1 ? SECTIONS_SEQUENCE[currentIndex + 1] : null;

  const renderCurrentView = () => {
    switch (currentSection) {
      case 'home':
        return <HomeView onStart={() => handleNavigate('static-dynamic')} />;
      case 'static-dynamic':
        return <StaticVsDynamicView />;
      case 'php-basics':
        return <PhpBasicsView />;
      case 'variables':
        return <VariablesTypesView />;
      case 'operators':
        return <OperatorsView />;
      case 'conditions':
        return <ConditionsView />;
      case 'loops':
        return <LoopsView />;
      case 'database-table':
        return <DatabaseTableView />;
      case 'connection':
        return <ConnectionView />;
      case 'data-flow':
        return <FullDataFlowView />;
      case 'crud-lab':
        return <CrudLabView />;
      case 'search':
        return <SearchView />;
      case 'auth':
        return <AuthView />;
      case 'code-explainer':
        return <CodeExplainerView />;
      case 'debug-lab':
        return <DebugLabView />;
      case 'games':
      case 'quiz':
        return <GamesQuizView />;
      case 'mini-challenge':
        return <MiniChallengeView />;
      case 'mini-project':
        return <MiniProjectView />;
      case 'best-practices':
      case 'progress':
        return (
          <ProgressTipsView
            completedSections={completedSections}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomeView onStart={() => handleNavigate('static-dynamic')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={handleNavigate}
        completedCount={completedSections.length}
        totalSections={SECTIONS_SEQUENCE.length}
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onResetProgress={handleResetProgress}
      />

      {/* Main App Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 gap-6 sm:gap-8">
        {/* Sidebar Navigation (Desktop + Mobile Drawer) */}
        <Sidebar
          currentSection={currentSection}
          onSelectSection={handleNavigate}
          completedSections={completedSections}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col justify-between lg:pl-72">
          <div className="pb-10">{renderCurrentView()}</div>

          {/* Bottom Pagination Bar */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4 mt-6">
            {prevSection ? (
              <button
                id="btn-prev-section"
                onClick={() => handleNavigate(prevSection)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <div />
            )}

            {nextSection ? (
              <button
                id="btn-next-section"
                onClick={() => handleNavigate(nextSection)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>Seterusnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-finish-course"
                onClick={() => handleNavigate('progress')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Semak Lencana & Kemajuan</span>
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Status Bar / Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 py-4 text-center text-xs text-slate-500 lg:pl-72">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span>Server: <strong className="text-emerald-700 font-semibold">Simulator Active</strong></span>
            <span className="text-slate-300">|</span>
            <span>Database: <strong className="text-blue-700 font-semibold font-mono">local_db_sim</strong></span>
          </div>
          <div className="text-[11px] text-slate-500">
            <strong>STM21673 Web Development</strong> • Kolej Komuniti Malaysia © 2024 Lab Virtual
          </div>
        </div>
      </footer>
    </div>
  );
}
