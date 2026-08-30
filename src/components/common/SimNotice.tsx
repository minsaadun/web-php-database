import React from 'react';
import { Info, Server, Sparkles } from 'lucide-react';

interface SimNoticeProps {
  title?: string;
  description?: string;
}

export const SimNotice: React.FC<SimNoticeProps> = ({
  title = 'Simulasi Pembelajaran Interaktif (Client-Side)',
  description = 'Aplikasi ini menggunakan simulasi JavaScript & LocalStorage supaya anda dapat melihat aliran data secara langsung tanpa setup server. Untuk menjalankan PHP & MySQL sebenar, pasang perisian XAMPP / Laragon pada komputer anda mengikut panduan pensyarah.',
}) => {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 my-4 text-left shadow-sm">
      <div className="flex items-start space-x-3.5">
        <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5 shadow-xs">
          <Server className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-blue-950">{title}</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-blue-700 rounded border border-blue-200 shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-600" /> TVET LAB NOTE
            </span>
          </div>
          <p className="text-slate-600 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
