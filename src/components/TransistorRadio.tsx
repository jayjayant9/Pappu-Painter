import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Radio as RadioIcon, 
  Shuffle, 
  Video, 
  VideoOff, 
  Music, 
  Sparkles,
  Disc,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { RadioTrack, RadioSlot } from '../types';

interface TransistorRadioProps {
  currentSlot: RadioSlot;
  currentTrack: RadioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectTrack: (track: RadioTrack) => void;
  musicVolume: number;
  onMusicVolumeChange: (vol: number) => void;
  isMusicMuted: boolean;
  onToggleMusicMute: () => void;
  isVideoVisible: boolean;
  onToggleVideoVisible: () => void;
  onOpenPlaylistHub: () => void;
}

export const TransistorRadio: React.FC<TransistorRadioProps> = ({
  currentSlot,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSelectTrack,
  musicVolume,
  onMusicVolumeChange,
  isMusicMuted,
  onToggleMusicMute,
  isVideoVisible,
  onToggleVideoVisible,
  onOpenPlaylistHub
}) => {
  const [isTuning, setIsTuning] = useState<boolean>(false);

  // Map frequency to dial position percentage (approx 530 kHz to 1600 kHz)
  const calculateDialPercentage = (freqStr: string) => {
    const num = parseInt(freqStr.replace(/\D/g, ''), 10) || 800;
    const min = 530;
    const max = 1600;
    const pct = ((num - min) / (max - min)) * 80 + 10;
    return Math.max(5, Math.min(95, pct));
  };

  const needlePosition = calculateDialPercentage(currentTrack.frequencyKhz);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-4 sm:my-6">
      {/* Decorative Paint Splatters behind Radio */}
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#C8372D] rounded-full blur-sm opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#3B82C4] rounded-full blur-md opacity-25 pointer-events-none"></div>

      {/* Top Shop Placard Sitting on Radio */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#E8A838] text-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] mb-2 transform -rotate-0.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C8372D] animate-pulse"></div>
          <span className="font-teko text-xl sm:text-2xl text-[#1a1a1a] tracking-wider uppercase font-black">
            {currentSlot.nameHindi} • {currentSlot.nameEnglish}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono font-bold">
          <span className="hidden sm:inline bg-white px-2.5 py-1 border border-[#1a1a1a] text-[#1a1a1a]">
            FREQ: {currentTrack.frequencyKhz}
          </span>
          <span className="bg-[#C8372D] text-white px-2 py-0.5 text-xs font-mono uppercase">
            {currentTrack.era}
          </span>
        </div>
      </div>

      {/* Main Vintage Transistor Radio Chassis (Solid Wood Bezel & Enamel Inlay) */}
      <div 
        id="vintage-transistor-chassis"
        className="relative bg-[#1a1a1a] p-4 sm:p-7 rounded-2xl border-[10px] border-[#8b4513] shadow-[8px_8px_0px_#1a1a1a] overflow-hidden"
      >
        {/* Metal handle strap on top */}
        <div className="mx-auto w-36 sm:w-48 h-3 bg-[#E8A838] rounded-t-lg border-2 border-[#1a1a1a] shadow-inner mb-3"></div>

        {/* Section 1: Frequency Station Dial Bar */}
        <div 
          className="relative bg-[#1a1a1a] rounded-xl border-4 border-[#1a1a1a] shadow-inner overflow-hidden mb-4"
        >
          {/* Dial Header */}
          <div className="h-10 bg-[#E8A838] border-b-4 border-[#1a1a1a] flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="font-teko text-lg text-[#1a1a1a] tracking-widest font-black uppercase">
                PAPPU HI-FI SOLID STATE • 1984
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1a1a1a]">
              <span className="hidden sm:inline">MW / SW / FM</span>
              <span className={`w-3 h-3 rounded-full border border-[#1a1a1a] ${isPlaying ? 'bg-[#32CD32] animate-pulse' : 'bg-[#C8372D]'}`}></span>
            </div>
          </div>

          {/* Analog Station Scale Glass */}
          <div className="p-3 bg-[#241A12] flex flex-col gap-2">
            {/* Station scale names */}
            <div className="flex justify-between text-[10px] sm:text-xs font-mono font-bold text-[#E8A838] uppercase select-none px-2">
              <span>Vividh Bharati</span>
              <span>Delhi A</span>
              <span>Bombay Gold</span>
              <span>Calcutta</span>
              <span>Ceylon Air</span>
              <span>Studio 6</span>
            </div>

            {/* Glowing Needle Track */}
            <div className="relative w-full h-8 bg-[#f0d080] border-2 border-[#1a1a1a] flex items-center justify-between px-2 overflow-hidden shadow-inner">
              {[530, 600, 700, 800, 900, 1000, 1200, 1400, 1600].map((khz) => (
                <div key={khz} className="flex flex-col items-center">
                  <div className="w-[1.5px] h-3 bg-[#1a1a1a]"></div>
                  <span className="text-[8px] font-mono font-bold text-[#1a1a1a] mt-0.5">{khz}</span>
                </div>
              ))}

              {/* Glowing Red Needle Indicator */}
              <motion.div
                className="absolute top-0 bottom-0 w-1.5 bg-[#C8372D] shadow-[0_0_8px_#C8372D] z-10 pointer-events-none"
                animate={{ left: `${needlePosition}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                <div className="absolute -top-1 -left-1 w-3.5 h-2 bg-[#1a1a1a]"></div>
              </motion.div>
            </div>

            {/* Track metadata badge strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 px-1 text-xs">
              <div className="truncate text-center sm:text-left">
                <span className="font-yatra text-base text-[#F5EFE0] tracking-wide block truncate">
                  {currentTrack.title}
                </span>
                <span className="font-mono text-xs text-[#E8A838]">
                  {currentTrack.artist} • <span className="text-[#A89684]">{currentTrack.genre}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onToggleVideoVisible}
                  className={`px-3 py-1 text-xs font-mono font-black uppercase border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                    isVideoVisible 
                      ? 'bg-[#C8372D] text-white' 
                      : 'bg-[#E8A838] text-[#1a1a1a] hover:bg-[#d99727]'
                  }`}
                  title="Toggle Video Display"
                >
                  {isVideoVisible ? 'Hide Video' : 'Watch Video'}
                </button>

                <button
                  onClick={onOpenPlaylistHub}
                  className="px-3 py-1 text-xs font-mono font-black uppercase bg-[#3B82C4] text-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#2A6BA5] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  title="Open Curated YouTube Playlists"
                >
                  Playlist Hub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Speaker Grille & Controls Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Slotted Speaker Grill (6 cols) */}
          <div className="md:col-span-6 bg-[#2a2a2a] rounded-xl border-4 border-[#1a1a1a] p-4 flex flex-col gap-2 shadow-inner">
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            <div className="h-2 bg-[#3a3a3a] rounded"></div>
            
            {/* Center Monogram in Grill */}
            <div className="text-center mt-1">
              <span className="font-yatra text-lg text-[#E8A838] font-bold">
                पप्पू स्टीरियो • High Fidelity
              </span>
            </div>
          </div>

          {/* Central Big "बजाओ / Play" Button (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center py-2">
            <button
              id="radio-play-pause-btn"
              onClick={onTogglePlay}
              className="w-24 h-24 rounded-full bg-[#C8372D] border-4 border-[#1a1a1a] flex flex-col items-center justify-center text-white font-black text-xs uppercase shadow-[0_6px_0_#1a1a1a] hover:bg-[#a82d25] active:translate-y-1 active:shadow-none transition-all cursor-pointer select-none"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="block transform rotate-[-5deg] text-center leading-tight font-yatra text-base">
                {isPlaying ? 'रोको' : 'बजाओ'} <br/>
                <span className="text-xs font-mono font-bold tracking-wider">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </span>
            </button>

            {/* Next / Prev buttons underneath */}
            <div className="flex items-center gap-2 mt-3">
              <button
                id="radio-prev-btn"
                onClick={onPrevTrack}
                className="px-3 py-1 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-bold shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#F5EFE0] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-1"
                title="Previous Track"
              >
                <SkipBack className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                id="radio-next-btn"
                onClick={onNextTrack}
                className="px-3 py-1 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-bold shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#F5EFE0] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-1"
                title="Next Track"
              >
                <span>Next</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Volume & Track Selection (3 cols) */}
          <div className="md:col-span-3 bg-[#241A12] border-4 border-[#1a1a1a] rounded-xl p-3.5 flex flex-col justify-between gap-3 shadow-inner text-white">
            {/* Volume Control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#E8A838]">
                <span>VOLUME</span>
                <button onClick={onToggleMusicMute} className="cursor-pointer hover:text-white">
                  {isMusicMuted ? <VolumeX className="w-4 h-4 text-[#C8372D]" /> : <span>{musicVolume}%</span>}
                </button>
              </div>
              <input
                id="music-volume-slider"
                type="range"
                min="0"
                max="100"
                value={isMusicMuted ? 0 : musicVolume}
                onChange={(e) => onMusicVolumeChange(Number(e.target.value))}
                className="w-full retro-slider h-2 cursor-pointer"
              />
            </div>

            {/* Quick Track Switcher */}
            <div className="pt-2 border-t border-[#3A291A]">
              <div className="text-[10px] font-mono uppercase text-[#A89684] mb-1">
                Track Switcher ({currentSlot.tracks.length} tracks)
              </div>
              <div className="grid grid-cols-4 gap-1">
                {currentSlot.tracks.map((tr, idx) => (
                  <button
                    key={tr.id}
                    onClick={() => onSelectTrack(tr)}
                    className={`py-1 text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                      tr.id === currentTrack.id 
                        ? 'bg-[#E8A838] text-[#1a1a1a] border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a]' 
                        : 'bg-[#1a1a1a] text-[#C8B8A6] border-[#3A291A] hover:bg-[#332215]'
                    }`}
                    title={tr.title}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hand-painted Quote Placard Under Radio */}
        <div className="mt-4 p-2.5 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] text-center">
          <p className="font-kalam text-sm sm:text-base font-bold text-[#C8372D] leading-snug">
            "{currentTrack.signboardQuote}"
          </p>
        </div>
      </div>
    </div>
  );
};
