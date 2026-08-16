import React from 'react';
import { 
  Music2, 
  Tv, 
  ExternalLink, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Radio,
  Disc3,
  Coffee
} from 'lucide-react';

export const StudioFooter: React.FC = () => {
  return (
    <footer 
      id="studio-footer-section"
      className="w-full bg-[#1a1a1a] text-[#F5EFE0] border-t-8 border-[#C8372D] pt-8 pb-16 px-4 sm:px-6 relative z-20 mt-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Studio Story & Heritage */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-yatra text-2xl text-[#E8A838]">
              पप्पू पेंटर & Sons
            </span>
          </div>
          <p className="font-mono text-xs text-[#C8B8A6] leading-relaxed">
            A digital tribute to the artisans of Indian street art, hand-painted cinema hoardings, truck typography, and golden era radio broadcasts.
          </p>
          <div className="inline-block bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] px-2.5 py-1 text-xs font-mono font-bold shadow-[2px_2px_0px_#E8A838]">
            ESTD. 1984 • LUCKNOW & DELHI 6
          </div>
        </div>

        {/* Col 2: Curated External Playlists */}
        <div className="space-y-3">
          <h4 className="font-mono text-base text-[#E8A838] tracking-wider uppercase font-black flex items-center gap-1.5 border-b border-[#3A291A] pb-1">
            <Music2 className="w-4 h-4 text-[#C8372D]" /> CURATED AUDIO LINKS
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a
                href="https://open.spotify.com/genre/0JQ5DAqbMKFDk5C5zZk86x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:bg-[#E8A838] hover:text-[#1a1a1a] transition-all p-2 bg-[#261E18] border border-[#3A291A]"
              >
                <span>Spotify • Retro Bollywood 70s</span>
                <ExternalLink className="w-3 h-3 text-[#1DB954]" />
              </a>
            </li>
            <li>
              <a
                href="https://music.youtube.com/playlist?list=PL4fGSI1pDJn5n4eXwJt9xK4m2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:bg-[#E8A838] hover:text-[#1a1a1a] transition-all p-2 bg-[#261E18] border border-[#3A291A]"
              >
                <span>YouTube Music • 90s Indipop</span>
                <ExternalLink className="w-3 h-3 text-[#FF0000]" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/results?search_query=vintage+indian+radio+vividh+bharati"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:bg-[#E8A838] hover:text-[#1a1a1a] transition-all p-2 bg-[#261E18] border border-[#3A291A]"
              >
                <span>YouTube • Vividh Bharati Gold</span>
                <ExternalLink className="w-3 h-3 text-[#C8372D]" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Copyright & Preservation Ethos */}
        <div className="space-y-3">
          <h4 className="font-mono text-base text-[#E8A838] tracking-wider uppercase font-black flex items-center gap-1.5 border-b border-[#3A291A] pb-1">
            <ShieldCheck className="w-4 h-4 text-[#32CD32]" /> COPYRIGHT & SAFETY
          </h4>
          <p className="text-xs text-[#A89684] leading-relaxed font-mono">
            No audio files are hosted locally. All songs stream directly through the official YouTube IFrame Embed API, ensuring full view counts and monetization for the original creators.
          </p>
          <div className="text-[11px] font-mono text-[#32CD32] font-bold">
            ✓ 100% Legal YouTube API Embed
          </div>
        </div>

        {/* Col 4: Artisan Wisdom & Keyboard Shortcuts */}
        <div className="space-y-3">
          <h4 className="font-mono text-base text-[#E8A838] tracking-wider uppercase font-black flex items-center gap-1.5 border-b border-[#3A291A] pb-1">
            <Coffee className="w-4 h-4 text-[#E8A838]" /> QUICK SHORTCUTS
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-[#261E18] p-1.5 border border-[#3A291A]">
              <kbd className="px-1.5 py-0.5 bg-white text-[#1a1a1a] font-bold text-[10px]">SPACE</kbd> Play/Pause
            </div>
            <div className="bg-[#261E18] p-1.5 border border-[#3A291A]">
              <kbd className="px-1.5 py-0.5 bg-white text-[#1a1a1a] font-bold text-[10px]">M</kbd> Mute Audio
            </div>
            <div className="bg-[#261E18] p-1.5 border border-[#3A291A]">
              <kbd className="px-1.5 py-0.5 bg-white text-[#1a1a1a] font-bold text-[10px]">N</kbd> Next Track
            </div>
            <div className="bg-[#261E18] p-1.5 border border-[#3A291A]">
              <kbd className="px-1.5 py-0.5 bg-white text-[#1a1a1a] font-bold text-[10px]">C</kbd> CRT Scanlines
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Signboard Tag */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#3A291A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A89684]">
        <p>
          © 1984–2026 PAPPU PAINTER RETRO STUDIO • HIGH FIDELITY STREET ART
        </p>
        <p className="flex items-center gap-1 text-[#E8A838]">
          <span>Made for lovers of Indian signboards</span>
          <Heart className="w-3.5 h-3.5 text-[#C8372D] fill-current inline" />
        </p>
      </div>
    </footer>
  );
};
