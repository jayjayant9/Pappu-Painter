import React from 'react';
import { X, Keyboard, Sparkles, HelpCircle, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HelpShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpShortcutsModal: React.FC<HelpShortcutsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="help-shortcuts-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white text-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b-4 border-[#1a1a1a] pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#C8372D] text-white border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-yatra text-xl text-[#C8372D]">
                    स्टूडियो शॉर्टकट्स व टिप्स
                  </h3>
                  <p className="text-xs text-[#666] font-mono font-bold">
                    Keyboard shortcuts & studio controls
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#C8372D] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">Play / Pause:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">Space</kbd>
                </div>
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">Next Track:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">N</kbd>
                </div>
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">Prev Track:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">P</kbd>
                </div>
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">Mute Music:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">M</kbd>
                </div>
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">CRT Scanlines:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">C</kbd>
                </div>
                <div className="bg-[#FAF7F0] p-2.5 border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a]">Search Vault:</span>
                  <kbd className="px-2 py-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] font-bold">/</kbd>
                </div>
              </div>

              <div className="p-3 bg-[#FFF9EE] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] space-y-1.5">
                <p className="text-[#C8372D] font-bold flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> Studio Tip:
                </p>
                <p className="text-xs text-[#555] leading-relaxed font-mono">
                  You can use the <strong>Studio Ambient Mixer</strong> sliders to blend real-time brush strokes on tin sheet, paint can clinking, and distant Indian street traffic with the music track for maximum immersion.
                </p>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#E8A838] text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#d89626] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                समझ गया (GOT IT)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
