export type TimeSlotId = 'subah' | 'dopehar' | 'shaam' | 'night' | 'truck' | 'vividh';

export interface RadioTrack {
  id: string;
  title: string;
  artist: string;
  era: string;
  genre: string;
  youtubeId: string; // YouTube video ID or playlist ID
  isPlaylist?: boolean;
  frequencyKhz: string;
  duration?: string;
  signboardQuote: string;
}

export interface RadioSlot {
  id: TimeSlotId;
  nameHindi: string;
  nameEnglish: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  tagline: string;
  badgeColor: string;
  iconName: string;
  description: string;
  tracks: RadioTrack[];
  defaultTrackIndex: number;
}

export interface AmbientSoundState {
  brushVolume: number;
  paintCanVolume: number;
  streetAmbienceVolume: number;
  vinylHissVolume: number;
  masterAmbientVolume: number;
  isMuted: boolean;
}

export interface SignboardStyle {
  id: string;
  name: string;
  bgHex: string;
  textHex: string;
  shadowHex: string;
  accentHex: string;
  borderStyle: string;
  fontFamily: 'yatra' | 'rozha' | 'kalam' | 'caveat' | 'teko';
}
