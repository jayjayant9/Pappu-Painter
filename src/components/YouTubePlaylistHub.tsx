import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Tv, 
  Music, 
  Sparkles, 
  ExternalLink, 
  Search, 
  Plus, 
  Film, 
  Disc3,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YOUTUBE_PLAYLIST_COLLECTIONS } from '../data/radioStations';
import { RadioTrack } from '../types';

interface YouTubePlaylistHubProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (track: RadioTrack) => void;
  onSelectCustomVideo: (videoId: string, title: string, isPlaylist?: boolean) => void;
}

export const YouTubePlaylistHub: React.FC<YouTubePlaylistHubProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
  onSelectCustomVideo
}) => {
  const [customInput, setCustomInput] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Robust YouTube URL / ID & Playlist Parser
  const extractYouTubeInfo = (input: string): { id: string; isPlaylist: boolean } | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Check for playlist parameter first if "list=" is present
    const playlistMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    
    // Check if whole input is a pure Playlist ID (e.g. PL... or RD...)
    if (/^(PL|RD|LL|UU|FL)[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return { id: trimmed, isPlaylist: true };
    }

    // Check for standard video ID in URL parameters (v=...)
    const vMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (vMatch) {
      return { id: vMatch[1], isPlaylist: false };
    }

    // Check for youtu.be/VIDEO_ID
    const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (youtuBeMatch) {
      return { id: youtuBeMatch[1], isPlaylist: false };
    }

    // Check for youtube.com/embed/VIDEO_ID or youtube.com/shorts/VIDEO_ID or youtube.com/live/VIDEO_ID
    const pathMatch = trimmed.match(/youtube\.com\/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/);
    if (pathMatch) {
      return { id: pathMatch[1], isPlaylist: false };
    }

    // If it's a playlist URL without a specific v=
    if (playlistMatch && (trimmed.includes('playlist') || !trimmed.includes('watch'))) {
      return { id: playlistMatch[1], isPlaylist: true };
    }

    // If exact 11 characters, treat as video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return { id: trimmed, isPlaylist: false };
    }

    return null;
  };

  const handlePlayCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const parsed = extractYouTubeInfo(customInput);
    if (parsed) {
      onSelectCustomVideo(
        parsed.id, 
        customTitle.trim() || (parsed.isPlaylist ? 'Custom YouTube Playlist' : 'Custom YouTube Broadcast'),
        parsed.isPlaylist
      );
      setCustomInput('');
      setCustomTitle('');
      onClose();
    } else {
      setErrorMessage('Please enter a valid YouTube Video URL, Short, Playlist link, or 11-char ID.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="youtube-playlist-hub-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-end bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl h-full bg-[#FAF7F0] text-[#1a1a1a] border-l-8 border-[#1a1a1a] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header with Retro Indian Signboard Styling */}
            <div className="p-4 sm:p-6 bg-[#E8A838] border-b-4 border-[#1a1a1a] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8372D] text-white border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-yatra text-2xl text-[#1a1a1a] leading-tight">
                    यूट्यूब प्लेलिस्ट हब
                  </h3>
                  <p className="font-mono text-xs font-black uppercase text-[#1a1a1a] tracking-wider">
                    YOUTUBE VIDEO & PLAYLIST ARCHIVE
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#C8372D] hover:text-white transition-all cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legal / Copyright Badge Note */}
            <div className="px-4 py-2 bg-[#1a1a1a] text-[#F5EFE0] flex items-center gap-2 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#32CD32] shrink-0" />
              <span>
                <strong className="text-[#E8A838]">Copyright Compliant:</strong> Official YouTube API. 100% views, ads & attribution credit artists.
              </span>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Custom YouTube URL Loader Form */}
              <div className="bg-white p-4 border-4 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#1a1a1a] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#C8372D]" /> PLAY CUSTOM YOUTUBE VIDEO
                  </span>
                  <span className="text-xs font-mono font-bold bg-[#E8A838] px-1.5 py-0.5 border border-[#1a1a1a]">LIVE SYNC</span>
                </div>
                <form onSubmit={handlePlayCustom} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Paste YouTube Video URL, Playlist URL, or Video ID (e.g. youtu.be/...)"
                    value={customInput}
                    onChange={(e) => {
                      setCustomInput(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    className="w-full px-3 py-2 bg-white border-2 border-[#1a1a1a] text-xs font-mono text-[#1a1a1a] placeholder-[#888] focus:outline-none focus:bg-[#FFF9EE] shadow-[2px_2px_0px_#1a1a1a]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Custom Title / Display Name (Optional)"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border-2 border-[#1a1a1a] text-xs font-mono text-[#1a1a1a] placeholder-[#888] focus:outline-none focus:bg-[#FFF9EE] shadow-[2px_2px_0px_#1a1a1a]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C8372D] text-white border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#A62B22] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all shrink-0 cursor-pointer"
                    >
                      PLAY IN STUDIO
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-xs font-mono text-[#C8372D] font-bold mt-1">
                      ⚠️ {errorMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Curated Playlist Collections */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-yatra text-xl text-[#C8372D] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8A838]" />
                    <span>क्यूरेटेड प्लेलिस्ट संग्रह (Curated Collections)</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#666]">6 THEMED VAULTS</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {YOUTUBE_PLAYLIST_COLLECTIONS.map((col) => (
                    <div
                      key={col.id}
                      className="bg-white border-4 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] p-3 flex flex-col sm:flex-row gap-3 group"
                    >
                      {/* Thumbnail with Overlay */}
                      <div className="relative sm:w-36 h-24 border-2 border-[#1a1a1a] overflow-hidden shrink-0">
                        <img
                          src={col.thumbnail}
                          alt={col.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                          <span className="bg-[#C8372D] text-white text-[10px] font-mono px-1.5 py-0.5 border border-[#1a1a1a] font-bold">
                            {col.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content & Action */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="font-rozha text-base text-[#1a1a1a] group-hover:text-[#C8372D] transition-colors leading-snug">
                              {col.title}
                            </h5>
                          </div>
                          <p className="text-xs text-[#666] font-kalam mt-0.5">
                            {col.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t-2 border-[#1a1a1a]">
                          <span className="text-xs font-mono font-bold text-[#C8372D]">
                            {col.videoCount}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                onSelectTrack({
                                  id: col.id,
                                  title: col.title,
                                  artist: col.subtitle,
                                  era: col.badge,
                                  genre: 'YouTube Playlist',
                                  youtubeId: col.featuredVideoId,
                                  frequencyKhz: '980 kHz',
                                  signboardQuote: `पप्पू पेंटर स्पेशल: ${col.title}`
                                });
                                onClose();
                              }}
                              className="flex items-center gap-1 px-3 py-1 bg-[#E8A838] text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#d89626] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>PLAY NOW</span>
                            </button>

                            <a
                              href={`https://www.youtube.com/watch?v=${col.featuredVideoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a] hover:bg-[#3B82C4] hover:text-white transition-all cursor-pointer"
                              title="Open on YouTube"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="p-3 bg-[#1a1a1a] border-t-2 border-[#1a1a1a] text-center text-xs font-mono font-bold text-[#E8A838]">
              PAPPU PAINTER STUDIO • RETRO VIDEO & AUDIO PRESERVATION
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
