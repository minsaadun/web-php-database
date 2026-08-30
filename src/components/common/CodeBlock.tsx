import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: 'php' | 'sql' | 'html' | 'javascript';
  title?: string;
  badgeType?: 'php' | 'sql' | 'simulation' | 'html';
  clickableLines?: boolean;
  onLineClick?: (lineIndex: number, lineContent: string) => void;
  activeLine?: number | null;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'php',
  title,
  badgeType = 'php',
  clickableLines = false,
  onLineClick,
  activeLine,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  const getBadge = () => {
    switch (badgeType) {
      case 'php':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
            PHP CODE EXAMPLE
          </span>
        );
      case 'sql':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            SQL STATEMENT
          </span>
        );
      case 'simulation':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            SIMULATION ONLY
          </span>
        );
      case 'html':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
            HTML FORM
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md my-3 text-left">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono font-medium text-slate-300">
            {title || (language === 'php' ? 'script.php' : language === 'sql' ? 'query.sql' : 'index.html')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {getBadge()}
          <button
            id={`btn-copy-${Math.random().toString(36).substring(7)}`}
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Salin Kod"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-3.5 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d131f]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const isCurrent = activeLine === idx;
              return (
                <tr
                  key={idx}
                  onClick={() => clickableLines && onLineClick && onLineClick(idx, line)}
                  className={`group transition-colors ${
                    clickableLines ? 'cursor-pointer hover:bg-blue-950/50' : ''
                  } ${isCurrent ? 'bg-blue-900/40 border-l-2 border-blue-400' : ''}`}
                >
                  <td className="w-10 select-none pr-3 text-right text-xs text-slate-600 font-mono align-top py-0.5 group-hover:text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-0.5 pl-2 text-slate-200 break-all whitespace-pre">
                    <span
                      className={
                        line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('/*')
                          ? 'text-emerald-400 italic'
                          : line.includes('mysqli_')
                          ? 'text-cyan-300 font-semibold'
                          : line.includes('$_POST') || line.includes('$conn') || line.includes('$sql') || line.startsWith('$')
                          ? 'text-amber-300'
                          : line.includes('SELECT') || line.includes('INSERT') || line.includes('UPDATE') || line.includes('DELETE') || line.includes('CREATE')
                          ? 'text-rose-300 font-bold'
                          : line.includes('echo') || line.includes('if') || line.includes('else') || line.includes('for')
                          ? 'text-purple-300 font-semibold'
                          : 'text-slate-200'
                      }
                    >
                      {line || ' '}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
