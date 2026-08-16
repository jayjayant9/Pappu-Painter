import React from 'react';
import { Sparkles, Radio, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandOverlayProps {
  isOpen: boolean;
  onEnter: () => void;
}

export const LandOverlay: React.FC<LandOverlayProps> = ({ isOpen, onEnter }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="studio-gate-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#F5EFE0] overflow-y-auto"
        >
          {/* CRT overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>

          {/* Paint Splatters in background */}
          <div className="absolute top-12 left-12 w-16 h-16 bg-[#C8372D] rounded-full blur-sm opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-16 right-16 w-24 h-24 bg-[#3B82C4] rounded-full blur-md opacity-20 pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-[#E8A838] rounded-full blur-sm opacity-30 pointer-events-none"></div>

          {/* Main Card Container */}
          <div className="max-w-xl w-full text-center flex flex-col items-center my-auto relative z-10">
            {/* Angled Enamel Plaque */}
            <motion.div 
              initial={{ rotate: -4, scale: 0.9 }}
              animate={{ rotate: -2, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-full sm:w-80 py-6 px-4 bg-[#E8A838] border-4 border-[#1a1a1a] shadow-[12px_12px_0px_#C8372D] flex flex-col items-center justify-center mb-8 transform"
            >
              <span className="text-xs font-mono font-black uppercase text-[#1a1a1a] tracking-widest mb-1">
                ESTD. 1984 • LUCKNOW
              </span>
              <h2 
                className="text-4xl sm:text-5xl font-black text-[#C8372D] uppercase leading-tight font-yatra" 
                style={{ textShadow: '2px 2px 0px #fff, 4px 4px 0px #1a1a1a' }}
              >
                कला मन्दिर<br/>
                <span className="text-2xl sm:text-3xl tracking-normal text-[#1a1a1a]">Arts Temple</span>
              </h2>
            </motion.div>

            {/* Instruction Banner */}
            <p className="font-bold uppercase text-xs sm:text-sm tracking-wide mb-6 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] px-4 sm:px-6 py-2.5 shadow-[4px_4px_0_#1a1a1a] font-mono max-w-md">
              Click below to enter the shop. Watch the wet paint.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2.5 w-full mb-8">
              <div className="bg-white border-2 border-[#1a1a1a] p-2 text-center shadow-[3px_3px_0px_#1a1a1a]">
                <Radio className="w-4 h-4 mx-auto text-[#C8372D] mb-1" />
                <p className="text-[11px] font-black uppercase text-[#1a1a1a]">Transistor</p>
                <p className="text-[9px] text-[#666] font-mono">60s-00s Hits</p>
              </div>
              <div className="bg-white border-2 border-[#1a1a1a] p-2 text-center shadow-[3px_3px_0px_#3B82C4]">
                <Volume2 className="w-4 h-4 mx-auto text-[#3B82C4] mb-1" />
                <p className="text-[11px] font-black uppercase text-[#1a1a1a]">Ambiance</p>
                <p className="text-[9px] text-[#666] font-mono">Brush & Street</p>
              </div>
              <div className="bg-white border-2 border-[#1a1a1a] p-2 text-center shadow-[3px_3px_0px_#E8A838]">
                <Music className="w-4 h-4 mx-auto text-[#E8A838] mb-1" />
                <p className="text-[11px] font-black uppercase text-[#1a1a1a]">Day Shifts</p>
                <p className="text-[9px] text-[#666] font-mono">24x7 Broadcast</p>
              </div>
            </div>

            {/* Open Studio CTA Button */}
            <motion.button
              id="enter-studio-btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnter}
              className="w-full sm:w-auto px-10 py-5 bg-[#C8372D] text-white font-black text-xl sm:text-2xl uppercase border-4 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] hover:bg-[#a82d25] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer font-yatra flex items-center justify-center gap-3"
            >
              <span>दुकान खोलें / Open Studio</span>
            </motion.button>

            {/* Bottom Stamp */}
            <div className="mt-8 text-[11px] font-mono font-bold uppercase opacity-60 tracking-[0.25em] text-[#1a1a1a]">
              Enamel Paint & Analog Vibes • Est. 1984
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
