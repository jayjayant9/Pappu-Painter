import React, { useState, useEffect, useCallback } from 'react';
import { RADIO_SLOTS, YOUTUBE_PLAYLIST_COLLECTIONS } from './data/radioStations';
import { RadioSlot, RadioTrack, TimeSlotId } from './types';
import { studioAmbientEngine } from './services/audioSynthesizer';
import { LandOverlay } from './components/LandOverlay';
import { StudioHeader } from './components/StudioHeader';
import { TransistorRadio } from './components/TransistorRadio';
import { YouTubePlayer } from './components/YouTubePlayer';
import { AmbientMixer } from './components/AmbientMixer';
import { TimeSlotBar } from './components/TimeSlotBar';
import { YouTubePlaylistHub } from './components/YouTubePlaylistHub';
import { SignboardGenerator } from './components/SignboardGenerator';
import { MarqueeTicker } from './components/MarqueeTicker';
import { StudioFooter } from './components/StudioFooter';
import { SearchModal } from './components/SearchModal';
import { HelpShortcutsModal } from './components/HelpShortcutsModal';

export default function App() {
  // Determine initial time slot based on current hour
  const getCurrentHour = () => new Date().getHours();
  
  const getInitialSlot = (): RadioSlot => {
    const hour = getCurrentHour();
    const match = RADIO_SLOTS.find(slot => {
      if (slot.id === 'truck' || slot.id === 'vividh') return false;
      if (slot.startHour < slot.endHour) {
        return hour >= slot.startHour && hour < slot.endHour;
      } else {
        return hour >= slot.startHour || hour < slot.endHour;
      }
    });
    return match || RADIO_SLOTS[0];
  };

  // Studio Gate Overlay State
  const [hasEnteredStudio, setHasEnteredStudio] = useState<boolean>(false);

  // Radio & Track State
  const [currentSlot, setCurrentSlot] = useState<RadioSlot>(getInitialSlot());
  const [currentTrack, setCurrentTrack] = useState<RadioTrack>(currentSlot.tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(85);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false);

  // Ambient Mixer Channel Volumes (0-100)
  const [brushVolume, setBrushVolume] = useState<number>(50);
  const [paintCanVolume, setPaintCanVolume] = useState<number>(40);
  const [streetVolume, setStreetVolume] = useState<number>(35);
  const [vinylVolume, setVinylVolume] = useState<number>(30);
  const [masterAmbientVolume, setMasterAmbientVolume] = useState<number>(80);
  const [isAmbientMuted, setIsAmbientMuted] = useState<boolean>(false);

  // UI Toggles
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false);
  const [isPlaylistHubOpen, setIsPlaylistHubOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isCrtEnabled, setIsCrtEnabled] = useState<boolean>(true);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [currentHour, setCurrentHour] = useState<number>(getCurrentHour());

  // Clock ticker to keep time-of-day accurate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(getCurrentHour());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Update Audio Synthesizer volumes
  useEffect(() => {
    studioAmbientEngine.setBrushVolume(brushVolume / 100);
  }, [brushVolume]);

  useEffect(() => {
    studioAmbientEngine.setPaintCanVolume(paintCanVolume / 100);
  }, [paintCanVolume]);

  useEffect(() => {
    studioAmbientEngine.setStreetVolume(streetVolume / 100);
  }, [streetVolume]);

  useEffect(() => {
    studioAmbientEngine.setVinylVolume(vinylVolume / 100);
  }, [vinylVolume]);

  // Handle entering studio (grant audio permissions & play)
  const handleEnterStudio = () => {
    setHasEnteredStudio(true);
    studioAmbientEngine.init();
    studioAmbientEngine.resume();
    setIsPlaying(true);
  };

  // Play / Pause toggle
  const handleTogglePlay = useCallback(() => {
    studioAmbientEngine.resume();
    setIsPlaying(prev => !prev);
  }, []);

  // Next Track
  const handleNextTrack = useCallback(() => {
    const currentIndex = currentSlot.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentSlot.tracks.length;
    setCurrentTrack(currentSlot.tracks[nextIndex]);
    setIsPlaying(true);
  }, [currentSlot, currentTrack]);

  // Prev Track
  const handlePrevTrack = useCallback(() => {
    const currentIndex = currentSlot.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentSlot.tracks.length) % currentSlot.tracks.length;
    setCurrentTrack(currentSlot.tracks[prevIndex]);
    setIsPlaying(true);
  }, [currentSlot, currentTrack]);

  // Select Slot
  const handleSelectSlot = (slot: RadioSlot) => {
    setCurrentSlot(slot);
    setCurrentTrack(slot.tracks[0]);
    setIsPlaying(true);
  };

  // Select Track directly
  const handleSelectTrack = (track: RadioTrack, slot?: RadioSlot) => {
    if (slot) {
      setCurrentSlot(slot);
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Custom Video or Playlist from Hub
  const handleSelectCustomVideo = (videoId: string, title: string, isPlaylist?: boolean) => {
    const customTrack: RadioTrack = {
      id: `custom-${Date.now()}`,
      title: title || (isPlaylist ? 'Custom YouTube Playlist' : 'Custom YouTube Broadcast'),
      artist: 'Studio Guest Stream',
      era: isPlaylist ? 'Playlist Vault' : 'Special Request',
      genre: isPlaylist ? 'Curated Playlist' : 'Custom Broadcast',
      youtubeId: videoId,
      isPlaylist: isPlaylist,
      frequencyKhz: '1080 kHz',
      signboardQuote: 'कला और संगीत की कोई सीमा नहीं!'
    };
    setCurrentTrack(customTrack);
    setIsPlaying(true);
    setIsVideoVisible(true);
  };

  // Mute Toggles
  const handleToggleMusicMute = () => {
    setIsMusicMuted(prev => !prev);
  };

  const handleToggleAmbientMute = () => {
    const muted = studioAmbientEngine.toggleMute();
    setIsAmbientMuted(muted);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMusicMute();
      } else if (e.key === 'n' || e.key === 'N') {
        handleNextTrack();
      } else if (e.key === 'p' || e.key === 'P') {
        handlePrevTrack();
      } else if (e.key === 'c' || e.key === 'C') {
        setIsCrtEnabled(prev => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleNextTrack, handlePrevTrack]);

  return (
    <div 
      className={`min-h-screen relative font-sans selection:bg-[#E8A838] selection:text-[#1a1a1a] transition-colors duration-300 pb-20 ${
        isNightMode ? 'bg-[#18120D] text-[#FAF7F0]' : 'bg-[#FAF7F0] text-[#1a1a1a]'
      }`}
    >
      {/* CRT Scanline & Retro Grain Overlay */}
      {isCrtEnabled && <div className="crt-overlay"></div>}

      {/* Background Vintage Enamel Splatters / Grid Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: isNightMode 
            ? 'radial-gradient(#C8372D 1px, transparent 1px), radial-gradient(#E8A838 1px, transparent 1px)'
            : 'radial-gradient(#1a1a1a 1px, transparent 1px), radial-gradient(#C8372D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      ></div>

      {/* Tactile Land Overlay Gate Screen */}
      <LandOverlay
        isOpen={!hasEnteredStudio}
        onEnter={handleEnterStudio}
      />

      {/* Main Studio Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header Facade */}
        <StudioHeader
          currentSlot={currentSlot}
          isPlaying={isPlaying}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPlaylists={() => setIsPlaylistHubOpen(true)}
          isCrtEnabled={isCrtEnabled}
          onToggleCrt={() => setIsCrtEnabled(prev => !prev)}
          isNightMode={isNightMode}
          onToggleNightMode={() => setIsNightMode(prev => !prev)}
          onTogglePlay={handleTogglePlay}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        {/* Central Visual Showcase: Transistor Radio */}
        <main className="space-y-6">
          <TransistorRadio
            currentSlot={currentSlot}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
            onSelectTrack={(tr) => {
              setCurrentTrack(tr);
              setIsPlaying(true);
            }}
            musicVolume={musicVolume}
            onMusicVolumeChange={setMusicVolume}
            isMusicMuted={isMusicMuted}
            onToggleMusicMute={handleToggleMusicMute}
            isVideoVisible={isVideoVisible}
            onToggleVideoVisible={() => setIsVideoVisible(prev => !prev)}
            onOpenPlaylistHub={() => setIsPlaylistHubOpen(true)}
          />

          {/* Embedded YouTube Player (Synchronized with responsive video drawer) */}
          <YouTubePlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onTrackEnded={handleNextTrack}
            musicVolume={isMusicMuted ? 0 : musicVolume}
            isVideoVisible={isVideoVisible}
            onToggleVideoVisible={() => setIsVideoVisible(prev => !prev)}
          />

          {/* Ambient Noise Soundboard Mixer */}
          <AmbientMixer
            brushVolume={brushVolume}
            onBrushVolumeChange={setBrushVolume}
            paintCanVolume={paintCanVolume}
            onPaintCanVolumeChange={setPaintCanVolume}
            streetVolume={streetVolume}
            onStreetVolumeChange={setStreetVolume}
            vinylVolume={vinylVolume}
            onVinylVolumeChange={setVinylVolume}
            masterAmbientVolume={masterAmbientVolume}
            onMasterAmbientVolumeChange={setMasterAmbientVolume}
            isAmbientMuted={isAmbientMuted}
            onToggleAmbientMute={handleToggleAmbientMute}
          />

          {/* Time-Based Radio Shifts (Subah, Dopehar, Shaam, Night, Truck Art, Vividh Bharati) */}
          <TimeSlotBar
            slots={RADIO_SLOTS}
            activeSlotId={currentSlot.id}
            onSelectSlot={handleSelectSlot}
            currentHour={currentHour}
          />

          {/* Interactive Indian Signboard Painter Workshop */}
          <SignboardGenerator />
        </main>
      </div>

      {/* Curated YouTube Video Playlist Drawer */}
      <YouTubePlaylistHub
        isOpen={isPlaylistHubOpen}
        onClose={() => setIsPlaylistHubOpen(false)}
        onSelectTrack={handleSelectTrack}
        onSelectCustomVideo={handleSelectCustomVideo}
      />

      {/* Track & Era Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTrack={handleSelectTrack}
      />

      {/* Help & Keyboard Shortcuts Modal */}
      <HelpShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Weathered Painted Bottom Marquee Ticker */}
      <MarqueeTicker
        currentTrack={currentTrack}
        currentSlot={currentSlot}
        isPlaying={isPlaying}
      />

      {/* Studio Footer */}
      <StudioFooter />
    </div>
  );
}
