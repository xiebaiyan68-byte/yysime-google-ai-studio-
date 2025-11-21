import React from 'react';
import { Power, Menu, Mic, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface RemoteProps {
  onMenu: () => void;
  onSelect: () => void;
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onMicClick: () => void;
  onPlayPause: () => void;
  isMicActive: boolean;
}

const Remote: React.FC<RemoteProps> = ({ onMenu, onSelect, onNavigate, onMicClick, onPlayPause, isMicActive }) => {
  return (
    <div className="w-64 bg-neutral-800 rounded-[3rem] p-4 shadow-2xl border border-neutral-700 flex flex-col items-center gap-8 relative select-none">
      {/* Texture overlay */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-white/5 to-black/20 pointer-events-none" />

      {/* Top Touch Surface Area */}
      <div className="w-full aspect-square bg-neutral-900 rounded-3xl border border-neutral-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-50" />
        
        {/* Navigation D-Pad Visual */}
        <div className="relative z-10 grid grid-cols-3 grid-rows-3 w-full h-full">
            <button onClick={() => onNavigate('up')} className="col-start-2 row-start-1 flex justify-center items-center hover:bg-white/5 active:bg-white/10 transition-colors rounded-t-lg text-neutral-500">
               <ChevronUp size={20} />
            </button>
            <button onClick={() => onNavigate('left')} className="col-start-1 row-start-2 flex justify-center items-center hover:bg-white/5 active:bg-white/10 transition-colors rounded-l-lg text-neutral-500">
               <ChevronLeft size={20} />
            </button>
            <button onClick={onSelect} className="col-start-2 row-start-2 flex justify-center items-center bg-neutral-800 rounded-full shadow-lg border border-neutral-700 active:scale-95 transition-transform">
               <div className="w-8 h-8 rounded-full bg-neutral-700" />
            </button>
             <button onClick={() => onNavigate('right')} className="col-start-3 row-start-2 flex justify-center items-center hover:bg-white/5 active:bg-white/10 transition-colors rounded-r-lg text-neutral-500">
               <ChevronRight size={20} />
            </button>
            <button onClick={() => onNavigate('down')} className="col-start-2 row-start-3 flex justify-center items-center hover:bg-white/5 active:bg-white/10 transition-colors rounded-b-lg text-neutral-500">
               <ChevronDown size={20} />
            </button>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full px-4 mb-4 z-10">
        <button 
            onClick={onMenu}
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg border border-neutral-600">
            <Menu size={20} />
          </div>
          <span className="text-[10px] font-medium tracking-widest uppercase">Menu</span>
        </button>

        <button 
            onClick={() => {}} // TV Power usually just sleeps, illustrative
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg border border-neutral-600">
             <Tv size={20} />
          </div>
           <span className="text-[10px] font-medium tracking-widest uppercase">TV</span>
        </button>

         <button 
            onClick={onPlayPause}
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg border border-neutral-600">
            <Play size={20} className="ml-1" />
          </div>
          <span className="text-[10px] font-medium tracking-widest uppercase">Play/Pause</span>
        </button>

        <button 
            onClick={onMicClick}
            className={`flex flex-col items-center gap-1 transition-colors active:scale-95 ${isMicActive ? 'text-blue-400' : 'text-neutral-400 hover:text-white'}`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 ${isMicActive ? 'bg-blue-600 border-blue-400 shadow-blue-900/50' : 'bg-neutral-700 border-neutral-600'}`}>
            <Mic size={20} className={isMicActive ? 'text-white' : ''} />
          </div>
           <span className="text-[10px] font-medium tracking-widest uppercase">Siri</span>
        </button>
      </div>

       {/* Side Volume (Visual only for now) */}
       <div className="absolute -right-1 top-40 w-1 h-24 bg-neutral-700 rounded-l-md" />
    </div>
  );
};

// Simple visual helper
function Tv({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
    )
}

export default Remote;