import React from 'react';
import { 
  Sparkles, 
  Search, 
  Tv, 
  Moon, 
  Sun, 
  Radio, 
  Volume2, 
  VolumeX, 
  Film, 
  Paintbrush,
  HelpCircle,
  Clock
} from 'lucide-react';
import { RadioSlot, RadioTrack } from '../types';

interface StudioHeaderProps {
  currentSlot: RadioSlot;
  isPlaying: boolean;
  onOpenSearch: () => void;
  onOpenPlaylists: () => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onTogglePlay: () => void;
  onOpenHelp: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentSlot,
  isPlaying,
  onOpenSearch,
  onOpenPlaylists,
  isCrtEnabled,
  onToggleCrt,
  isNightMode,
  onToggleNightMode,
  onTogglePlay,
  onOpenHelp
}) => {
  return (
    <header 
      id="pappu-studio-header"
      className="w-full relative z-30 mb-6"
    >
      {/* Top Shop Telephone & Address Ticker Bar */}
      <div className="bg-[#1a1a1a] text-[#E8A838] border-b-2 border-[#1a1a1a] py-1.5 px-4 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#32CD32] animate-pulse"></span>
            <strong className="tracking-wide">दुकान चालू है (STUDIO OPEN 24x7)</strong>
          </span>
          <span className="hidden md:inline text-[#7A6B5D]">|</span>
          <span className="hidden md:inline text-[#D4A359]">
            पता: चौक बाजार, लखनऊ / चांदनी चौक • PHONE: 98110-PAPPU
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#F5EFE0] font-bold">
            SHIFT: <span className="text-[#E8A838]">{currentSlot.nameHindi} ({currentSlot.nameEnglish})</span>
          </span>
          <span className="hidden sm:inline text-[#7A6B5D]">|</span>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 text-[#F5EFE0] hover:text-[#E8A838] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">SHORTCUTS (C, M, N, /)</span>
          </button>
        </div>
      </div>

      {/* Main Hand-Painted Workshop Signboard Header Banner */}
      <div 
        className="bg-[#E8A838] border-b-8 border-[#C8372D] border-x-4 border-t-4 border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-5 shadow-[0_6px_0_rgba(0,0,0,0.25)] gap-4"
      >
        {/* Left Monogram & Signboard Typography */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 bg-[#C8372D] rounded-full border-3 border-white flex items-center justify-center text-white font-black text-2xl shadow-[2px_2px_0px_#1a1a1a] shrink-0 font-yatra">
            PP
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#C8372D] tracking-tighter uppercase font-yatra"
                style={{ textShadow: '2px 2px 0px #fff, 4px 4px 0px #1a1a1a' }}
              >
                Pappu Painter & Sons
              </h1>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-[#1a1a1a] opacity-80 mt-0.5 font-sans">
              Est. 1984 • Hand Painted High Fidelity • कला मन्दिर
            </p>
          </div>
        </div>

        {/* Right Badges and Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="px-3.5 py-1.5 bg-white border-2 border-[#1a1a1a] text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] text-[#1a1a1a]">
            Lucknow Studio
          </div>
          <div className="px-3.5 py-1.5 bg-[#3B82C4] text-white border-2 border-[#1a1a1a] text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Live on Air</span>
          </div>

          {/* Search Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#F5EFE0] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title="Search Archives (Press /)"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search ( / )</span>
          </button>

          {/* Playlists Hub */}
          <button
            id="header-playlists-btn"
            onClick={onOpenPlaylists}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C8372D] text-white border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#A62B22] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title="Open YouTube Video Playlists"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Playlist Hub</span>
          </button>

          {/* CRT Toggle */}
          <button
            id="crt-toggle-btn"
            onClick={onToggleCrt}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
              isCrtEnabled 
                ? 'bg-[#1E6B52] text-white' 
                : 'bg-white text-[#1a1a1a]'
            }`}
            title="Toggle Retro CRT TV Scanlines (Press C)"
          >
            <Film className="w-3.5 h-3.5" />
            <span>CRT: {isCrtEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleNightMode}
            className="p-1.5 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#F5EFE0] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title={isNightMode ? 'Switch to Vintage Cream Day Mode' : 'Switch to Dark Workshop Mode'}
          >
            {isNightMode ? <Sun className="w-4 h-4 text-[#C8372D]" /> : <Moon className="w-4 h-4 text-[#1a1a1a]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
