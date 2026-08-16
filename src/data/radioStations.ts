import { RadioSlot } from '../types';

export const RADIO_SLOTS: RadioSlot[] = [
  {
    id: 'subah',
    nameHindi: 'सुबह की चायख़ाना',
    nameEnglish: 'Subah Ki Chaikhana',
    timeRange: '06:00 AM - 12:00 PM',
    startHour: 6,
    endHour: 12,
    tagline: 'Morning Classics, Sitar Ragas & Golden 60s/70s Chai-Tapri Radio',
    badgeColor: '#E8A838', // Mustard Yellow
    iconName: 'Sun',
    description: 'Crisp morning air, bubbling adrak chai, newspaper rustling, and soul-cleansing melodies of Lata Mangeshkar, Mohammed Rafi, Kishore Kumar, and Pandit Hariprasad Chaurasia.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'subah-1',
        title: 'Chala Jata Hoon / Kishore Kumar Retro Hits',
        artist: 'Kishore Kumar & R.D. Burman',
        era: 'Golden 70s Evergreen',
        genre: 'Retro Morning Tapri',
        youtubeId: 'CCeO-2xTCDTU', // Classic Kishore Kumar
        frequencyKhz: '640 kHz',
        duration: '4:30',
        signboardQuote: 'गरम चाय और पुराने गाने - दिन बन गया बाबूजी!'
      },
      {
        id: 'subah-2',
        title: 'Abhi Na Jao Chhod Kar (Original LP Recording)',
        artist: 'Mohammed Rafi & Asha Bhosle',
        era: '1961 Evergreen',
        genre: 'Romantic Melody',
        youtubeId: 'mfEQgoVi7P4c',
        frequencyKhz: '720 kHz',
        duration: '4:15',
        signboardQuote: 'दिल अभी भरा नहीं... थोड़ी और चाय मिले!'
      },
      {
        id: 'subah-3',
        title: 'Woh Kagaz Ki Kashti / Yeh Daulat Bhi Le Lo',
        artist: 'Jagjit Singh & Chitra Singh',
        era: 'Classic Ghazal',
        genre: 'Harmonium & Nostalgia',
        youtubeId: 'tB0hmrY_s0U',
        frequencyKhz: '810 kHz',
        duration: '4:45',
        signboardQuote: 'मुझको लौटा दो वो बचपन का सावन... वो कागज़ की कश्ती!'
      },
      {
        id: 'subah-4',
        title: 'Afreen Afreen | Mann Ki Lagan',
        artist: 'Nusrat Fateh Ali Khan & Rahat Fateh Ali Khan',
        era: 'Classical Heritage',
        genre: 'Sufi / Qawali',
        youtubeId: '0JkWrw2-3yAc',
        frequencyKhz: '590 kHz',
        duration: 'Morning Raga',
        signboardQuote: 'चित्त शांत, हाथ में ब्रश, दिल में सुर!'
      }
    ]
  },
  {
    id: 'dopehar',
    nameHindi: 'दोपहर की स्टूडियो वाइब',
    nameEnglish: 'Dopehar Ki Studio Vibe',
    timeRange: '12:00 PM - 05:00 PM',
    startHour: 12,
    endHour: 17,
    tagline: '2000s Indipop, Cassette Era Pop & Sunlit Signboard Workshop',
    badgeColor: '#3B82C4', // Sky Blue
    iconName: 'Sparkles',
    description: 'Hot midday sun over the corrugated tin roof, smell of synthetic enamel paint and turpentine, Lucky Ali, Euphoria, and Silk Route playing on the boombox.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'dop-1',
        title: 'O Sanam / Sunoh (Official Cassette Era Master)',
        artist: 'Lucky Ali',
        era: 'Indipop 90s-2000s',
        genre: 'Desert Wind Pop',
        youtubeId: 'dWqb-WqbGh8',
        frequencyKhz: '980 kHz',
        duration: '4:30',
        signboardQuote: 'ना ज़मीं ना फलक... सिर्फ़ रंग और ब्रश!'
      },
      {
        id: 'dop-2',
        title: 'Dooba Dooba Rehta Hoon / Silk Route',
        artist: 'Mohit Chauhan & Silk Route',
        era: '1998 Indipop Classic',
        genre: 'Acoustic Guitar & Whistle',
        youtubeId: 'ecPMVO7JuTo',
        frequencyKhz: '1020 kHz',
        duration: '4:45',
        signboardQuote: 'डूबा डूबा रहता हूँ आँखों में तेरी...'
      },
      {
        id: 'dop-3',
        title: 'Maaeri / Euphoria (Rock & Dholak)',
        artist: 'Euphoria (Dr. Palash Sen)',
        era: '2000 Cassette Era',
        genre: 'Hindi Rock & Dholak',
        youtubeId: 'MGMh7kYzNqo',
        frequencyKhz: '1100 kHz',
        duration: '5:10',
        signboardQuote: 'माएरी याद आवे... पेंटर बाबू की कलाकारी!'
      },
      {
        id: 'dop-4',
        title: 'Tanha Dil / Shaan (Pop Gold)',
        artist: 'Shaan',
        era: '2000s Indipop',
        genre: 'Indipop Nostalgia',
        youtubeId: '64KSVbMDr0c',
        frequencyKhz: '1180 kHz',
        duration: '4:20',
        signboardQuote: 'तन्हा दिल, तन्हा सफ़र... चलते रहे!'
      }
    ]
  },
  {
    id: 'shaam',
    nameHindi: 'शाम का दर्द व ग़ज़लें',
    nameEnglish: 'Shaam Ka Dard',
    timeRange: '05:00 PM - 09:00 PM',
    startHour: 17,
    endHour: 21,
    tagline: 'Retro 70s-90s Melodies, Jagjit Singh Ghazals & Twilight Chai',
    badgeColor: '#C8372D', // Crimson Red
    iconName: 'Sunset',
    description: 'Dusk settling over Old Delhi & Lucknow street corners, brass tea tumblers clinking, heartfelt ghazals and soulful retro radio station tuning.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'shaam-1',
        title: 'Hothon Se Chhoo Lo Tum / Prem Geet',
        artist: 'Jagjit Singh',
        era: '1981 Classic',
        genre: 'Soulful Ghazal',
        youtubeId: '1GdJS6J-fx8',
        frequencyKhz: '890 kHz',
        duration: '4:55',
        signboardQuote: 'गीत अमर कर दो... पप्पू पेंटर स्पेशल!'
      },
      {
        id: 'shaam-2',
        title: 'Woh Kagaz Ki Kashti / Daulat Bhi Le Lo',
        artist: 'Jagjit Singh & Chitra Singh',
        era: '1982 Timeless Ghazal',
        genre: 'Harmonium & Nostalgia',
        youtubeId: 'tB0hmrY_s0U',
        frequencyKhz: '940 kHz',
        duration: '5:20',
        signboardQuote: 'मुझको लौटा दो वो बचपन का सावन... वो कागज़ की कश्ती!'
      },
      {
        id: 'shaam-3',
        title: 'Chala Jata Hoon / Kishore Kumar Retro',
        artist: 'Kishore Kumar',
        era: 'Golden Era 70s',
        genre: 'Retro Classic',
        youtubeId: 'doZik4O1Dtc',
        frequencyKhz: '910 kHz',
        duration: '4:30',
        signboardQuote: 'किसी की धुन में धड़कता हुआ दिल...'
      },
      {
        id: 'shaam-4',
        title: 'O Sanam / Sunset Acoustic Memories',
        artist: 'Lucky Ali',
        era: '90s Indipop',
        genre: 'Retro Magic',
        youtubeId: 'dWqb-WqbGh8',
        frequencyKhz: '960 kHz',
        duration: '4:30',
        signboardQuote: 'शाम की ठंडी हवा और यादों का कारवां!'
      }
    ]
  },
  {
    id: 'night',
    nameHindi: 'नाईट शिफ्ट पेंटिंग',
    nameEnglish: 'Night Shift Painting',
    timeRange: '09:00 PM - 06:00 AM',
    startHour: 21,
    endHour: 6,
    tagline: 'Midnight Chill, Lofi Indian Beats & Lantern Lit Studio',
    badgeColor: '#1E6B52', // Emerald / Teal Green
    iconName: 'Moon',
    description: 'The street outside has gone quiet. Only a single hanging incandescent bulb lights the easel. Wet paint slowly drying with tranquil lo-fi Indian beats.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'night-1',
        title: 'Indian Lofi Nostalgia Radio / Midnight Chill',
        artist: 'Bollywood Lofi Chillout',
        era: 'Midnight Lofi',
        genre: 'Slowed & Reverb Lofi',
        youtubeId: 'htqPgViqagY',
        frequencyKhz: '1350 kHz',
        duration: 'Lofi Stream',
        signboardQuote: 'सन्नाटा, सिगरेट का धुआँ और रात की पेंटिंग...'
      },
      {
        id: 'night-2',
        title: 'O Sanam / Slowed Desert Night Mix',
        artist: 'Lucky Ali & Acoustic',
        era: 'Midnight Pop',
        genre: 'Tape Saturated Lofi',
        youtubeId: 'dWqb-WqbGh8',
        frequencyKhz: '1420 kHz',
        duration: '4:30',
        signboardQuote: 'आओ हुज़ूर तुमको सितारों में ले चलें...'
      },
      {
        id: 'night-3',
        title: 'Hothon Se Chhoo Lo Tum / Midnight Ghazal',
        artist: 'Jagjit Singh',
        era: 'Ambient Nostalgia',
        genre: 'Harmonium & Night Calm',
        youtubeId: '1GdJS6J-fx8',
        frequencyKhz: '1480 kHz',
        duration: '4:55',
        signboardQuote: 'शायद फिर इस जनम में मुलाक़ात हो ना हो...'
      },
      {
        id: 'night-4',
        title: 'Abhi Na Jao Chhod Kar / Vintage Acoustic',
        artist: 'Mohammed Rafi & Asha Bhosle',
        era: '1961 Gold',
        genre: 'Acoustic Rain',
        youtubeId: 'mfEQgoVi7P4',
        frequencyKhz: '1540 kHz',
        duration: '4:15',
        signboardQuote: 'बरसात और रात - रंग कभी फीके नहीं पड़ते।'
      }
    ]
  },
  {
    id: 'truck',
    nameHindi: 'ट्रक आर्ट ढाबा एक्सप्रेस',
    nameEnglish: 'Truck Art Dhaba Express',
    timeRange: 'All Highway Hours (24x7)',
    startHour: 0,
    endHour: 24,
    tagline: 'High Octane Dhaba Beats, Horn OK Please & Highway Folk',
    badgeColor: '#D9531E', // Bright Ochre Orange
    iconName: 'Truck',
    description: 'Grand Trunk Road highway vibes. Turbaned drivers drinking sweet kadak chai, colorful painted eagles, Radhe-Radhe stencils, and thunderous dholak beats.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'truck-1',
        title: 'Maaeri / Highway Dholak Fusion',
        artist: 'Euphoria (Dr. Palash Sen)',
        era: '90s Highway Anthem',
        genre: 'Punjabi Dhabha Beats',
        youtubeId: 'MGMh7kYzNqo',
        frequencyKhz: '1240 kHz',
        duration: '5:10',
        signboardQuote: 'हॉर्न ओके प्लीज़! बुरी नज़र वाले तेरा मुँह काला!'
      },
      {
        id: 'truck-2',
        title: 'Tanha Dil / GT Road Long Drive',
        artist: 'Shaan',
        era: 'Highway Indipop',
        genre: 'Speeding Truck Melody',
        youtubeId: '64KSVbMDr0c',
        frequencyKhz: '1280 kHz',
        duration: '4:20',
        signboardQuote: 'दम मस्त क़लंदर! रास्ता साफ़ रखो उस्ताद!'
      },
      {
        id: 'truck-3',
        title: 'Chala Jata Hoon / Truck Driver Special',
        artist: 'Kishore Kumar',
        era: 'Evergreen 70s',
        genre: 'Folk Rhythm Explosion',
        youtubeId: '5LTEHPbFHNY',
        frequencyKhz: '1310 kHz',
        duration: '4:30',
        signboardQuote: 'चल छैंया छैंया... मंज़िल दूर नहीं!'
      }
    ]
  },
  {
    id: 'vividh',
    nameHindi: 'विविध भारती 1984',
    nameEnglish: 'Vividh Bharati 1984',
    timeRange: 'Vintage Radio Archive',
    startHour: 0,
    endHour: 24,
    tagline: 'AIR Jingle, Ameen Sayani Binaca Geetmala & 80s Cassette Magic',
    badgeColor: '#8C3D82', // Retro Royal Purple
    iconName: 'Radio',
    description: '"यह आकाशवाणी का विविध भारती सेवा है..." Classic radio announcements, Binaca toothpaste ads, and the golden countdowns of Indian radio history.',
    defaultTrackIndex: 0,
    tracks: [
      {
        id: 'vividh-1',
        title: 'Chala Jata Hoon / Binaca Geetmala Hit',
        artist: 'Kishore Kumar / R.D. Burman',
        era: '1970s AIR Radio',
        genre: 'Vintage Radio Show',
        youtubeId: 'lED9qiOf4m0',
        frequencyKhz: '530 kHz',
        duration: '4:30',
        signboardQuote: 'बहनों और भाइयों... आपके मनपसंद गानों का गुलदस्ता!'
      },
      {
        id: 'vividh-2',
        title: 'Abhi Na Jao Chhod Kar / Sangeet Sarita',
        artist: 'Mohammed Rafi & Asha Bhosle',
        era: '1960s-1970s',
        genre: 'Violin Signature Melody',
        youtubeId: 'mfEQgoVi7P4',
        frequencyKhz: '560 kHz',
        duration: '4:15',
        signboardQuote: 'सत्यं शिवं सुन्दरम् - आकाशवाणी!'
      },
      {
        id: 'vividh-3',
        title: 'Woh Kagaz Ki Kashti / Chhaya Geet',
        artist: 'Jagjit Singh',
        era: '1980s Cassettes',
        genre: 'Late Night Radio Melodies',
        youtubeId: 'tB0hmrY_s0U',
        frequencyKhz: '610 kHz',
        duration: '5:20',
        signboardQuote: 'छाया गीत: सुरमई यादों का कारवां।'
      }
    ]
  }
];

export const YOUTUBE_PLAYLIST_COLLECTIONS = [
  {
    id: 'cinema-handpainted',
    title: 'Vintage Cinema Posters & Hits',
    subtitle: 'Kishore Kumar, R.D. Burman & 70s Bollywood Classics',
    thumbnail: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?w=600&auto=format&fit=crop&q=80',
    videoCount: 'Golden Era Vault',
    featuredVideoId: 'uA67M0Lihz0',
    badge: 'Artisan Pick'
  },
  {
    id: 'indipop-nostalgia',
    title: '90s-2000s Indipop Tape Cassettes',
    subtitle: 'Lucky Ali, Silk Route, Euphoria & Shaan',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    videoCount: 'Indipop Vault',
    featuredVideoId: 'fKdjjCHClwA',
    badge: 'Walkman Nostalgia'
  },
  {
    id: 'ghazal-mehfil',
    title: 'Sham-e-Ghazal Live Mehfil',
    subtitle: 'Jagjit Singh, Chitra Singh & Pankaj Udhas',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    videoCount: 'Soulful Ghazals',
    featuredVideoId: 'Th6ZUEDVGa4',
    badge: 'Harmonium Soul'
  },
  {
    id: 'indian-lofi-midnight',
    title: 'Silk Route & Acoustic Nostalgia',
    subtitle: 'Dooba Dooba & Late Night Indie Melodies',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    videoCount: 'Midnight Session',
    featuredVideoId: 'm70d24MiCPA',
    badge: 'Night Shift'
  },
  {
    id: 'truck-art-express',
    title: 'Grand Trunk Road Dhaba Anthems',
    subtitle: 'Euphoria Maaeri & High-Energy Highway Folk',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    videoCount: 'Highway Bangers',
    featuredVideoId: 'nlqeTUGdMSs',
    badge: 'Horn OK Please'
  },
  {
    id: 'evergreen-harmonies',
    title: 'Abhi Na Jao Chhod Kar & Rafi Gold',
    subtitle: 'Mohammed Rafi, Asha Bhosle & Vintage Akashvani',
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&auto=format&fit=crop&q=80',
    videoCount: 'AIR Radio Gold',
    featuredVideoId: 'kNWxcffZGL0',
    badge: 'Radio Heritage'
  }
];

export const SIGNBOARD_TEMPLATES = [
  {
    id: 'horn-ok',
    textHindi: 'हॉर्न ओके प्लीज़',
    textEnglish: 'HORN OK PLEASE',
    subtext: 'आवाज़ दो | धीरे चलो | फिर मिलेंगे',
    styleId: 'truck-yellow-red',
    icon: '🚚'
  },
  {
    id: 'buri-nazar',
    textHindi: 'बुरी नज़र वाले तेरा मुँह काला',
    textEnglish: 'BURI NAZAR WALE TERA MUNH KAALA',
    subtext: 'हँसो मत पगली प्यार हो जाएगा',
    styleId: 'crimson-white',
    icon: '🧿'
  },
  {
    id: 'pappu-shop',
    textHindi: 'पप्पू पेंटर आर्ट स्टूडियो',
    textEnglish: 'PAPPU PAINTER SIGNBOARDS',
    subtext: 'यहाँ सिनेमा पोस्टर, ट्रक आर्ट व नेमप्लेट बनते हैं',
    styleId: 'enamel-cream-blue',
    icon: '🖌️'
  },
  {
    id: 'chai-nukkad',
    textHindi: 'गर्म चाय व बिस्कुट',
    textEnglish: 'KADAK CHAI & CHARCHA',
    subtext: 'उधार बंद है | कृपया शांति बनाए रखें',
    styleId: 'mustard-vintage',
    icon: '☕'
  },
  {
    id: 'shubh-labh',
    textHindi: 'शुभ लाभ | स्वागतम',
    textEnglish: 'SHUBH LAABH & WELCOME',
    subtext: 'सत्यमेव जयते | ॐ नमः शिवाय',
    styleId: 'gold-crimson',
    icon: '🪔'
  }
];
