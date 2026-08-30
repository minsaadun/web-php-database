export type NavSection =
  | 'home'
  | 'static-dynamic'
  | 'php-basics'
  | 'variables'
  | 'operators'
  | 'conditions'
  | 'loops'
  | 'database-table'
  | 'connection'
  | 'data-flow'
  | 'crud-lab'
  | 'search'
  | 'auth'
  | 'code-explainer'
  | 'debug-lab'
  | 'games'
  | 'quiz'
  | 'mini-challenge'
  | 'mini-project'
  | 'best-practices'
  | 'progress';

export interface StudentRecord {
  id: number;
  name: string;
  email: string;
  programme: string;
}

export interface DebugChallenge {
  id: number;
  title: string;
  category: string;
  codeSnippet: string;
  options: string[];
  correctAnswer: number;
  errorDescription: string;
  hint: string;
  solution: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  type: 'mcq' | 'tf' | 'predict' | 'find-error';
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface OutputPredictQuestion {
  id: number;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MatchingItem {
  id: string;
  term: string;
  description: string;
  matchedWith?: string;
}

export interface CrudScenario {
  id: number;
  scenario: string;
  correctAction: 'INSERT' | 'SELECT' | 'UPDATE' | 'DELETE';
  explanation: string;
}

export interface ProgressState {
  completedSections: string[];
  quizScore: number | null;
  quizTotal: number;
  debugCompleted: number[];
  predictCompleted: number[];
  crudCompleted: boolean;
  miniChallengeCompleted: boolean;
  lastActive: string;
}
