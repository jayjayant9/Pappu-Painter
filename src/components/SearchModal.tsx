import React, { useState, useMemo } from 'react';
import { Search, X, Play, Music, Radio, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RADIO_SLOTS } from '../data/radioStations';
import { RadioTrack, RadioSlot } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (track: RadioTrack, slot?: RadioSlot) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack
}) => {
  const [query, setQuery] = useState<string>('');

  // Collect all tracks across slots
  const allTracks = useMemo(() => {
    const list: { track: RadioTrack; slot: RadioSlot }[] = [];
    RADIO_SLOTS.forEach(slot => {
      slot.tracks.forEach(track => {
        list.push({ track, slot });
      });
    });
    return list;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return allTracks.slice(0, 8);
    const q = query.toLowerCase();
    return allTracks.filter(({ track, slot }) => 
      track.title.toLowerCase().includes(q) ||
      track.artist.toLowerCase().includes(q) ||
      track.genre.toLowerCase().includes(q) ||
      track.era.toLowerCase().includes(q) ||
      track.signboardQuote.toLowerCase().includes(q) ||
      slot.nameEnglish.toLowerCase().includes(q) ||
      slot.nameHindi.toLowerCase().includes(q)
    );
  }, [query, allTracks]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="search-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white text-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header / Input Box */}
            <div className="p-4 bg-[#FAF7F0] border-b-4 border-[#1a1a1a] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#C8372D] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tracks, eras (70s, 90s, Lofi), artists (Kishore, Lucky Ali)..."
                className="w-full bg-transparent border-none text-sm sm:text-base text-[#1a1a1a] placeholder-[#888] focus:outline-none font-mono font-bold"
              />
              <button
                onClick={onClose}
                className="p-1.5 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#C8372D] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Era Filter Pills */}
            <div className="px-4 py-2 bg-[#FAF7F0] border-b-2 border-[#1a1a1a] flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              <span className="text-xs font-mono font-bold text-[#1a1a1a] uppercase">Filter:</span>
              {['Kishore Kumar', 'Jagjit Singh', '90s Indipop', 'Lofi', '70s', 'Raga', 'Highway Dhaba'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold border-2 border-[#1a1a1a] transition-all whitespace-nowrap cursor-pointer ${
                    query === tag 
                      ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]' 
                      : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
              {searchResults.length === 0 ? (
                <div className="text-center py-10 text-[#666]">
                  <p className="font-yatra text-xl text-[#C8372D]">कोई गाना नहीं मिला (No tracks found)</p>
                  <p className="text-xs font-mono mt-1">Try searching "Ghazal", "Lucky Ali", or "Morning"</p>
                </div>
              ) : (
                searchResults.map(({ track, slot }) => (
                  <div
                    key={track.id}
                    className="p-3 bg-[#FAF7F0] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#FFF9EE] transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <button
                        onClick={() => {
                          onSelectTrack(track, slot);
                          onClose();
                        }}
                        className="w-9 h-9 bg-[#C8372D] text-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] flex items-center justify-center shrink-0 hover:bg-[#A62B22] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                        title="Play Track"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>

                      <div className="truncate">
                        <h5 className="font-yatra text-sm sm:text-base text-[#1a1a1a] truncate group-hover:text-[#C8372D] transition-colors leading-tight">
                          {track.title}
                        </h5>
                        <p className="text-xs text-[#555] font-mono truncate">
                          {track.artist} • <span className="text-[#C8372D] font-bold">{track.era}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 text-xs font-mono font-bold bg-[#E8A838] text-[#1a1a1a] border border-[#1a1a1a]">
                        {slot.nameHindi}
                      </span>
                      <p className="text-[10px] font-mono text-[#666] mt-0.5">
                        {track.frequencyKhz}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#1a1a1a] border-t-2 border-[#1a1a1a] flex justify-between items-center text-xs font-mono text-[#E8A838]">
              <span>Press ESC to close</span>
              <span className="font-bold">{searchResults.length} Tracks Available</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
