import React from 'react';
import { Radio, Sparkles, Disc } from 'lucide-react';
import { RadioTrack, RadioSlot } from '../types';

interface MarqueeTickerProps {
  currentTrack: RadioTrack;
  currentSlot: RadioSlot;
  isPlaying: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  currentTrack,
  currentSlot,
  isPlaying
}) => {
  return (
    <div 
      id="retro-marquee-ticker"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] text-[#F5EFE0] border-t-4 border-[#C8372D] shadow-[0_-4px_10px_rgba(0,0,0,0.5)] overflow-hidden py-1.5"
    >
      <div className="flex items-center">
        {/* Left Fixed Badge */}
        <div className="z-10 bg-[#C8372D] text-white px-3 sm:px-4 py-1 text-xs font-mono font-black tracking-wider uppercase flex items-center gap-1.5 border-r-2 border-[#1a1a1a] shrink-0">
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>ON AIR:</span>
        </div>

        {/* Continuous Scrolling Banner */}
        <div className="relative flex overflow-x-hidden whitespace-nowrap flex-1 font-mono text-xs">
          <div className="animate-marquee-smooth flex items-center gap-8 font-bold tracking-wide">
            <span className="flex items-center gap-2">
              <strong className="font-yatra text-base text-[#E8A838]">{currentTrack.title}</strong>
              <span className="text-[#F5EFE0]">— {currentTrack.artist}</span>
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="bg-[#E8A838] text-[#1a1a1a] px-2 py-0.5 font-bold">
              FREQ: {currentTrack.frequencyKhz}
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="font-kalam text-sm text-[#3B82C4] font-black">
              "{currentTrack.signboardQuote}"
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="text-[#A89684]">
              पप्पू पेंटर & Sons: चौक लखनऊ • 100% Hand-Painted Signboards & High Fidelity Audio
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="text-[#E8A838]">
              SHIFT: {currentSlot.nameEnglish.toUpperCase()} ({currentSlot.timeRange})
            </span>

            {/* Repeat block for seamless infinite loop */}
            <span className="text-[#E8A838]">★</span>

            <span className="flex items-center gap-2">
              <strong className="font-yatra text-base text-[#E8A838]">{currentTrack.title}</strong>
              <span className="text-[#F5EFE0]">— {currentTrack.artist}</span>
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="bg-[#E8A838] text-[#1a1a1a] px-2 py-0.5 font-bold">
              FREQ: {currentTrack.frequencyKhz}
            </span>

            <span className="text-[#E8A838]">★</span>

            <span className="font-kalam text-sm text-[#3B82C4] font-black">
              "{currentTrack.signboardQuote}"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
