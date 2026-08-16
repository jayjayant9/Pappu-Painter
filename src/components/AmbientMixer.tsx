import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Paintbrush, 
  Sparkles, 
  Coffee, 
  Radio, 
  RotateCcw,
  Zap,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { studioAmbientEngine } from '../services/audioSynthesizer';

interface AmbientMixerProps {
  brushVolume: number;
  onBrushVolumeChange: (vol: number) => void;
  paintCanVolume: number;
  onPaintCanVolumeChange: (vol: number) => void;
  streetVolume: number;
  onStreetVolumeChange: (vol: number) => void;
  vinylVolume: number;
  onVinylVolumeChange: (vol: number) => void;
  masterAmbientVolume: number;
  onMasterAmbientVolumeChange: (vol: number) => void;
  isAmbientMuted: boolean;
  onToggleAmbientMute: () => void;
}

export const AmbientMixer: React.FC<AmbientMixerProps> = ({
  brushVolume,
  onBrushVolumeChange,
  paintCanVolume,
  onPaintCanVolumeChange,
  streetVolume,
  onStreetVolumeChange,
  vinylVolume,
  onVinylVolumeChange,
  masterAmbientVolume,
  onMasterAmbientVolumeChange,
  isAmbientMuted,
  onToggleAmbientMute
}) => {
  const [activePreset, setActivePreset] = useState<string>('balanced');

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    studioAmbientEngine.resume();

    switch (presetName) {
      case 'quiet-night':
        onBrushVolumeChange(75);
        onPaintCanVolumeChange(30);
        onStreetVolumeChange(10);
        onVinylVolumeChange(40);
        break;
      case 'busy-bazaar':
        onBrushVolumeChange(50);
        onPaintCanVolumeChange(60);
        onStreetVolumeChange(80);
        onVinylVolumeChange(25);
        break;
      case 'chai-tapri':
        onBrushVolumeChange(40);
        onPaintCanVolumeChange(45);
        onStreetVolumeChange(65);
        onVinylVolumeChange(50);
        break;
      case 'balanced':
      default:
        onBrushVolumeChange(50);
        onPaintCanVolumeChange(40);
        onStreetVolumeChange(35);
        onVinylVolumeChange(30);
        break;
    }
  };

  const handleManualBrush = () => {
    studioAmbientEngine.playManualStroke();
  };

  const handleManualClink = () => {
    studioAmbientEngine.playManualClink();
  };

  const handleManualHorn = () => {
    studioAmbientEngine.playManualHorn();
  };

  return (
    <div 
      id="ambient-sound-mixer"
      className="bg-white text-[#1a1a1a] p-4 sm:p-6 border-4 border-[#1a1a1a] shadow-[6px_6px_0px_#3B82C4] relative overflow-hidden"
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b-4 border-[#1a1a1a] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#3B82C4] text-white border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-yatra text-xl sm:text-2xl text-[#1a1a1a] leading-tight">
              स्टूडियो ध्वनि मंडल (Ambient Audio Mixer)
            </h3>
            <p className="text-xs text-[#666] font-mono">
              Live generative soundscape: brush on tin, clinking paint cans, bazaar chatter
            </p>
          </div>
        </div>

        <button
          onClick={onToggleAmbientMute}
          className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-black uppercase border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
            isAmbientMuted 
              ? 'bg-[#C8372D] text-white' 
              : 'bg-[#E8A838] text-[#1a1a1a]'
          }`}
          title={isAmbientMuted ? 'Unmute Ambient' : 'Mute Ambient'}
        >
          {isAmbientMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isAmbientMuted ? 'MUTED' : 'LIVE'}</span>
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
        <span className="text-xs font-mono font-black uppercase text-[#1a1a1a] shrink-0">PRESETS:</span>
        <button
          onClick={() => applyPreset('balanced')}
          className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-[#1a1a1a] transition-all cursor-pointer ${
            activePreset === 'balanced'
              ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]'
              : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
          }`}
        >
          🎨 Balanced Studio
        </button>
        <button
          onClick={() => applyPreset('quiet-night')}
          className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-[#1a1a1a] transition-all cursor-pointer ${
            activePreset === 'quiet-night'
              ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]'
              : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
          }`}
        >
          🌙 Quiet Midnight
        </button>
        <button
          onClick={() => applyPreset('chai-tapri')}
          className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-[#1a1a1a] transition-all cursor-pointer ${
            activePreset === 'chai-tapri'
              ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]'
              : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
          }`}
        >
          ☕ Chai Tapri
        </button>
        <button
          onClick={() => applyPreset('busy-bazaar')}
          className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-[#1a1a1a] transition-all cursor-pointer ${
            activePreset === 'busy-bazaar'
              ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]'
              : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
          }`}
        >
          🛺 2000s Bazaar
        </button>
      </div>

      {/* 4 Interactive Volume Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Channel 1: Brush Strokes */}
        <div className="bg-[#FAF7F0] p-3.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#1a1a1a] flex items-center gap-1.5">
              <Paintbrush className="w-4 h-4 text-[#C8372D]" />
              ब्रश की कूची (Brush on Tin)
            </span>
            <span className="bg-[#1a1a1a] text-[#E8A838] px-1.5 py-0.5">{brushVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brushVolume}
            onChange={(e) => {
              setActivePreset('custom');
              onBrushVolumeChange(Number(e.target.value));
            }}
            className="w-full retro-slider h-2 cursor-pointer"
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-[#666] pt-1">
            <span>Subtle canvas friction</span>
            <button
              onClick={handleManualBrush}
              className="font-mono text-xs bg-white text-[#1a1a1a] px-2 py-0.5 border border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a] hover:bg-[#E8A838] cursor-pointer"
            >
              ▶ Tap Stroke
            </button>
          </div>
        </div>

        {/* Channel 2: Paint Can Clinking */}
        <div className="bg-[#FAF7F0] p-3.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#1a1a1a] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#3B82C4]" />
              रंग का डिब्बा (Paint Cans)
            </span>
            <span className="bg-[#1a1a1a] text-[#E8A838] px-1.5 py-0.5">{paintCanVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={paintCanVolume}
            onChange={(e) => {
              setActivePreset('custom');
              onPaintCanVolumeChange(Number(e.target.value));
            }}
            className="w-full retro-slider h-2 cursor-pointer"
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-[#666] pt-1">
            <span>Tin lid & stick stirring</span>
            <button
              onClick={handleManualClink}
              className="font-mono text-xs bg-white text-[#1a1a1a] px-2 py-0.5 border border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a] hover:bg-[#3B82C4] hover:text-white cursor-pointer"
            >
              ▶ Clink Can
            </button>
          </div>
        </div>

        {/* Channel 3: 2000s Street / Chai Tapri */}
        <div className="bg-[#FAF7F0] p-3.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#1a1a1a] flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#E8A838]" />
              सड़क व चाय टपरी (Street Ambience)
            </span>
            <span className="bg-[#1a1a1a] text-[#E8A838] px-1.5 py-0.5">{streetVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={streetVolume}
            onChange={(e) => {
              setActivePreset('custom');
              onStreetVolumeChange(Number(e.target.value));
            }}
            className="w-full retro-slider h-2 cursor-pointer"
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-[#666] pt-1">
            <span>Distant traffic & boiling kettle</span>
            <button
              onClick={handleManualHorn}
              className="font-mono text-xs bg-white text-[#1a1a1a] px-2 py-0.5 border border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a] hover:bg-[#E8A838] cursor-pointer"
            >
              ▶ Rickshaw Horn
            </button>
          </div>
        </div>

        {/* Channel 4: Vintage Tape Hiss & Vinyl */}
        <div className="bg-[#FAF7F0] p-3.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#1a1a1a] flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#8C3D82]" />
              टेप खड़खड़ाहट (Tape Warmth)
            </span>
            <span className="bg-[#1a1a1a] text-[#E8A838] px-1.5 py-0.5">{vinylVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vinylVolume}
            onChange={(e) => {
              setActivePreset('custom');
              onVinylVolumeChange(Number(e.target.value));
            }}
            className="w-full retro-slider h-2 cursor-pointer"
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-[#666] pt-1">
            <span>1980s analog warmth</span>
            <span className="text-[10px] font-mono font-bold text-[#1a1a1a]">44.1 kHz Lo-Fi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
