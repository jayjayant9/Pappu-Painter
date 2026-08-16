import React from 'react';
import { Sun, Sparkles, Sunset, Moon, Truck, Radio, Clock } from 'lucide-react';
import { RadioSlot, TimeSlotId } from '../types';

interface TimeSlotBarProps {
  slots: RadioSlot[];
  activeSlotId: TimeSlotId;
  onSelectSlot: (slot: RadioSlot) => void;
  currentHour: number;
}

export const TimeSlotBar: React.FC<TimeSlotBarProps> = ({
  slots,
  activeSlotId,
  onSelectSlot,
  currentHour
}) => {
  const getSlotIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Sunset': return <Sunset className="w-4 h-4" />;
      case 'Moon': return <Moon className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Radio': return <Radio className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  // Determine which slot is the real-time active one based on local clock
  const isRealTimeMatch = (slot: RadioSlot) => {
    if (slot.id === 'truck' || slot.id === 'vividh') return false;
    if (slot.startHour < slot.endHour) {
      return currentHour >= slot.startHour && currentHour < slot.endHour;
    } else {
      // Night shift wraps around midnight (e.g. 21 to 6)
      return currentHour >= slot.startHour || currentHour < slot.endHour;
    }
  };

  return (
    <div id="radio-time-slots-section" className="w-full my-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
        <div>
          <h2 className="font-yatra text-2xl sm:text-3xl text-[#E8A838] flex items-center gap-2">
            <span>समय चक्र व रेडियो शिफ्ट (Broadcast Slots)</span>
          </h2>
          <p className="text-xs text-[#B8A693] font-kalam">
            Select a studio shift or let the time-based rotation transport you across eras.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#1E1711] px-3 py-1.5 rounded-lg border border-[#E8A838]/30 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-[#E8A838] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-[#D4A359]">LOCAL STUDIO TIME:</span>
          <span className="text-white font-bold">
            {String(currentHour).padStart(2, '0')}:00 HRS
          </span>
        </div>
      </div>

      {/* Slots Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => {
          const isActive = slot.id === activeSlotId;
          const isRealTime = isRealTimeMatch(slot);

          return (
            <button
              key={slot.id}
              onClick={() => onSelectSlot(slot)}
              className={`relative text-left p-4 border-4 border-[#1a1a1a] transition-all duration-150 cursor-pointer overflow-hidden group ${
                isActive
                  ? 'bg-[#E8A838] text-[#1a1a1a] shadow-[6px_6px_0px_#C8372D] -translate-y-1'
                  : 'bg-white text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:bg-[#FFF9EE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1a1a1a]'
              }`}
            >
              {/* Slot Header */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center shadow-[1px_1px_0px_#1a1a1a]"
                    style={{ 
                      backgroundColor: slot.badgeColor, 
                      color: '#ffffff'
                    }}
                  >
                    {getSlotIcon(slot.iconName)}
                  </div>
                  <div>
                    <h4 className={`font-yatra text-xl leading-snug tracking-wide ${isActive ? 'text-[#C8372D]' : 'text-[#1a1a1a]'}`}>
                      {slot.nameHindi}
                    </h4>
                    <p className="font-mono text-xs tracking-wider uppercase font-black text-[#1a1a1a] opacity-80">
                      {slot.nameEnglish}
                    </p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col items-end gap-1">
                  {isActive && (
                    <span className="px-2 py-0.5 bg-[#C8372D] text-white border border-[#1a1a1a] font-mono text-[10px] font-black tracking-wider uppercase shadow-[1px_1px_0px_#1a1a1a]">
                      NOW TUNED
                    </span>
                  )}
                  {isRealTime && !isActive && (
                    <span className="px-2 py-0.5 bg-[#3B82C4] text-white border border-[#1a1a1a] font-mono text-[9px] font-bold">
                      LIVE TIME
                    </span>
                  )}
                </div>
              </div>

              {/* Time Range Tag */}
              <div className="my-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 border border-[#1a1a1a] bg-white text-[#1a1a1a]">
                  {slot.timeRange}
                </span>
              </div>

              {/* Slot Description */}
              <p className="text-xs line-clamp-2 mt-1.5 font-kalam text-[#3E2F22] font-semibold">
                {slot.tagline}
              </p>

              {/* Track count indicator */}
              <div className="mt-3 pt-2 border-t-2 border-[#1a1a1a] flex justify-between items-center text-[10px] font-mono text-[#1a1a1a]">
                <span className="font-bold">{slot.tracks.length} Handpicked Tracks</span>
                <span className="bg-[#1a1a1a] text-[#E8A838] px-1.5 py-0.5 font-black">{slot.tracks[0]?.genre}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
