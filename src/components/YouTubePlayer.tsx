import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Video, VideoOff, Play, Pause, ExternalLink, Radio, Sparkles } from 'lucide-react';
import { RadioTrack } from '../types';

interface YouTubePlayerProps {
  currentTrack: RadioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onTrackEnded?: () => void;
  musicVolume: number;
  isVideoVisible: boolean;
  onToggleVideoVisible: () => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onTrackEnded,
  musicVolume,
  isVideoVisible,
  onToggleVideoVisible
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [hasPlaybackError, setHasPlaybackError] = useState<boolean>(false);

  // Determine the correct embed URL based on whether it's a playlist or video
  const getEmbedSrc = () => {
    const isPlaylist = currentTrack.isPlaylist || 
      currentTrack.youtubeId.startsWith('PL') || 
      currentTrack.youtubeId.startsWith('RD') ||
      currentTrack.youtubeId.startsWith('UU');

    const base = isPlaylist
      ? `https://www.youtube.com/embed/videoseries?list=${currentTrack.youtubeId}`
      : `https://www.youtube.com/embed/${currentTrack.youtubeId}`;

    const params = new URLSearchParams({
      autoplay: isPlaying ? '1' : '0',
      enablejsapi: '1',
      playsinline: '1',
      rel: '0',
      modestbranding: '1',
      controls: '1'
    });

    return `${base}?${params.toString()}`;
  };

  // Re-mount iframe when the youtube track ID changes
  useEffect(() => {
    setHasPlaybackError(false);
    setIframeKey(prev => prev + 1);
  }, [currentTrack.youtubeId, currentTrack.isPlaylist]);

  // Send postMessage commands to YouTube IFrame API
  const sendIframeCommand = (command: string, args: any[] = []) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: args
        }),
        '*'
      );
    } catch (e) {
      console.warn('IFrame postMessage failed:', e);
    }
  };

  // Sync play / pause state
  useEffect(() => {
    if (isPlaying) {
      sendIframeCommand('playVideo');
    } else {
      sendIframeCommand('pauseVideo');
    }
  }, [isPlaying]);

  // Sync volume state
  useEffect(() => {
    sendIframeCommand('setVolume', [musicVolume]);
  }, [musicVolume]);

  return (
    <div className="w-full">
      {/* Video Display Container (Visible when isVideoVisible is true) */}
      <div 
        id="youtube-player-container"
        className={`transition-all duration-300 relative overflow-hidden border-4 border-[#1a1a1a] bg-[#120F0D] shadow-[6px_6px_0px_#1a1a1a] ${
          isVideoVisible 
            ? 'w-full aspect-video max-h-[380px] my-4 block' 
            : 'fixed -top-[9999px] left-0 w-[320px] h-[240px] opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Floating Control Bar in Video Mode */}
        {isVideoVisible && (
          <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between bg-[#1a1a1a]/90 backdrop-blur-sm px-3 py-1.5 border-2 border-[#E8A838] shadow-[2px_2px_0px_#1a1a1a] text-xs">
            <div className="flex items-center gap-2 truncate max-w-[70%]">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-[#32CD32] animate-ping' : 'bg-[#E8A838]'}`}></span>
              <span className="font-yatra text-xs sm:text-sm text-[#E8A838] tracking-wider truncate">
                {currentTrack.title}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onTogglePlay}
                className="p-1 bg-[#C8372D] text-white border border-[#1a1a1a] hover:bg-[#A62B22] cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#E8A838] cursor-pointer"
                title="Open on YouTube"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onToggleVideoVisible}
                className="p-1 bg-white text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#E8A838] cursor-pointer"
                title="Hide Video (Return to Radio Dial)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Resilient Iframe with direct player embedding */}
        <iframe
          key={`yt-iframe-${iframeKey}-${currentTrack.youtubeId}`}
          ref={iframeRef}
          id="pappu-yt-player-iframe"
          src={getEmbedSrc()}
          title={currentTrack.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
          onError={() => setHasPlaybackError(true)}
        />

        {/* Fallback Overlay if Video Has Restrictions */}
        {hasPlaybackError && isVideoVisible && (
          <div className="absolute inset-0 bg-[#1a1a1a]/95 flex flex-col items-center justify-center p-4 text-center z-30">
            <p className="text-sm font-yatra text-[#E8A838] mb-1">
              External Playback Protected by Creator
            </p>
            <p className="text-xs font-mono text-[#C8B8A6] max-w-sm mb-3">
              This specific track can be played directly on YouTube while your studio ambient synthesizer continues.
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C8372D] text-white border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#A62B22] flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch Video on YouTube</span>
            </a>
          </div>
        )}
      </div>

      {/* Audio Mode Track Visualizer Strip when Video is Hidden */}
      {!isVideoVisible && (
        <div className="mt-3 p-2 bg-[#120F0D] border-2 border-[#1a1a1a] flex items-center justify-between shadow-[2px_2px_0px_#1a1a1a]">
          <div className="flex items-center gap-2 truncate">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#32CD32] animate-ping' : 'bg-[#E8A838]'}`}></span>
            <span className="font-mono text-[11px] text-[#C8B8A6] uppercase tracking-wider truncate">
              {currentTrack.title}
            </span>
          </div>
          <button
            onClick={onToggleVideoVisible}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#E8A838] text-[#1a1a1a] border border-[#1a1a1a] text-[10px] font-mono font-black uppercase hover:bg-[#d89626] cursor-pointer shrink-0"
          >
            <Video className="w-3 h-3" />
            <span>Watch Video</span>
          </button>
        </div>
      )}
    </div>
  );
};
