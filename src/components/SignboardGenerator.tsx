import React, { useState, useRef } from 'react';
import { 
  Paintbrush, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Palette, 
  RotateCcw,
  Type,
  Frame
} from 'lucide-react';
import { SIGNBOARD_TEMPLATES } from '../data/radioStations';

export const SignboardGenerator: React.FC = () => {
  const [headlineHindi, setHeadlineHindi] = useState<string>('हॉर्न ओके प्लीज़');
  const [subtext, setSubtext] = useState<string>('आवाज़ दो | धीरे चलो | फिर मिलेंगे');
  const [colorTheme, setColorTheme] = useState<'mustard' | 'crimson' | 'sky' | 'teal' | 'cream'>('mustard');
  const [selectedFont, setSelectedFont] = useState<'yatra' | 'rozha' | 'kalam' | 'caveat'>('yatra');
  const [borderStyle, setBorderStyle] = useState<'tin' | 'flourish' | 'truck' | 'minimal'>('truck');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const applyTemplate = (tmpl: typeof SIGNBOARD_TEMPLATES[0]) => {
    setHeadlineHindi(tmpl.textHindi);
    setSubtext(tmpl.subtext);
    if (tmpl.id === 'horn-ok') setColorTheme('mustard');
    if (tmpl.id === 'buri-nazar') setColorTheme('crimson');
    if (tmpl.id === 'pappu-shop') setColorTheme('cream');
    if (tmpl.id === 'chai-nukkad') setColorTheme('sky');
    if (tmpl.id === 'shubh-labh') setColorTheme('teal');
  };

  const getThemeStyles = () => {
    switch (colorTheme) {
      case 'crimson':
        return {
          bg: 'bg-[#C8372D]',
          text: 'text-[#FFF9EE]',
          sub: 'text-[#FFE599]',
          border: 'border-[#1E1B18]',
          shadowClass: 'signboard-crimson-shadow',
          badge: 'bg-[#E8A838] text-[#1E1B18]'
        };
      case 'sky':
        return {
          bg: 'bg-[#3B82C4]',
          text: 'text-[#FFF9EE]',
          sub: 'text-[#FFE599]',
          border: 'border-[#1E1B18]',
          shadowClass: 'signboard-blue-shadow',
          badge: 'bg-[#C8372D] text-white'
        };
      case 'teal':
        return {
          bg: 'bg-[#1E6B52]',
          text: 'text-[#FFF9EE]',
          sub: 'text-[#E8A838]',
          border: 'border-[#1E1B18]',
          shadowClass: 'signboard-yellow-shadow',
          badge: 'bg-[#E8A838] text-[#1E1B18]'
        };
      case 'cream':
        return {
          bg: 'bg-[#F5EFE0]',
          text: 'text-[#C8372D]',
          sub: 'text-[#1E1B18]',
          border: 'border-[#1E1B18]',
          shadowClass: 'signboard-title-shadow',
          badge: 'bg-[#1E1B18] text-[#E8A838]'
        };
      case 'mustard':
      default:
        return {
          bg: 'bg-[#E8A838]',
          text: 'text-[#1E1B18]',
          sub: 'text-[#C8372D]',
          shadowClass: 'signboard-yellow-shadow',
          border: 'border-[#1E1B18]',
          badge: 'bg-[#C8372D] text-white'
        };
    }
  };

  const currentTheme = getThemeStyles();

  const handleCopyText = () => {
    navigator.clipboard.writeText(`${headlineHindi}\n${subtext}\n— Hand-painted at Pappu Painter Studio`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div id="signboard-workshop-section" className="w-full my-8 bg-white text-[#1a1a1a] p-4 sm:p-7 border-4 border-[#1a1a1a] shadow-[8px_8px_0px_#C8372D]">
      {/* Workshop Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b-4 border-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E8A838] text-[#1a1a1a] border-2 border-[#1a1a1a] flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]">
            <Paintbrush className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-yatra text-2xl sm:text-3xl text-[#C8372D] leading-tight">
              पप्पू की साइनबोर्ड कार्यशाला (Artisan Sign Workshop)
            </h3>
            <p className="text-xs text-[#666] font-mono font-bold">
              Customize retro hand-painted Indian signboards, truck art stencils & shop placards.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {SIGNBOARD_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => applyTemplate(tmpl)}
              className="px-2.5 py-1 bg-white border-2 border-[#1a1a1a] text-xs font-mono font-bold text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#E8A838] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none whitespace-nowrap cursor-pointer"
            >
              {tmpl.icon} {tmpl.textHindi.slice(0, 10)}...
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Live Signboard Rendered Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div 
            ref={boardRef}
            className={`relative w-full p-6 sm:p-10 ${currentTheme.bg} ${currentTheme.border} border-4 shadow-[8px_8px_0px_#1a1a1a] overflow-hidden transition-all duration-300`}
            style={{
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 15%, transparent 16%)',
              backgroundSize: '16px 16px'
            }}
          >
            {/* Inner Border Flourish */}
            <div className={`border-4 border-dashed ${colorTheme === 'cream' ? 'border-[#C8372D]' : 'border-[#1a1a1a]'} p-4 sm:p-6 text-center`}>
              {/* Top Mini Header */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`px-3 py-1 font-mono text-xs font-black uppercase tracking-widest border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] ${currentTheme.badge}`}>
                  ESTD. 1984 • GENUINE HAND-PAINTED
                </span>
              </div>

              {/* Main Headline */}
              <h2 
                className={`text-3xl sm:text-5xl my-3 tracking-wide leading-tight ${currentTheme.text} ${currentTheme.shadowClass} ${
                  selectedFont === 'yatra' ? 'font-yatra' :
                  selectedFont === 'rozha' ? 'font-rozha' :
                  selectedFont === 'kalam' ? 'font-kalam' : 'font-caveat'
                }`}
              >
                {headlineHindi || 'पप्पू पेंटर'}
              </h2>

              {/* Subtext */}
              <p className={`font-kalam text-base sm:text-2xl font-bold mt-2 ${currentTheme.sub} tracking-wide`}>
                {subtext}
              </p>

              {/* Bottom Decorative Wing / Truck Motif */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono font-bold opacity-90">
                <span>✦ ॐ ✦</span>
                <span>LUCKNOW ENAMEL STUDIO</span>
                <span>✦ ॐ ✦</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#C8372D] text-white border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#a82d25] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-[#32CD32]" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'COPIED SLOGAN' : 'COPY SLOGAN'}</span>
            </button>

            <button
              onClick={() => {
                const canvas = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 480;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Background
                const bgColors: Record<string, string> = {
                  mustard: '#E8A838',
                  crimson: '#C8372D',
                  sky: '#3B82C4',
                  teal: '#1E6B52',
                  cream: '#F5EFE0'
                };
                ctx.fillStyle = bgColors[colorTheme] || '#E8A838';
                ctx.fillRect(0, 0, 800, 480);

                // Outer border
                ctx.lineWidth = 12;
                ctx.strokeStyle = '#1a1a1a';
                ctx.strokeRect(10, 10, 780, 460);

                // Dashed Inner Border
                ctx.lineWidth = 4;
                ctx.setLineDash([8, 8]);
                ctx.strokeStyle = colorTheme === 'cream' ? '#C8372D' : '#1a1a1a';
                ctx.strokeRect(30, 30, 740, 420);
                ctx.setLineDash([]);

                // ESTD Header Badge
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(250, 45, 300, 32);
                ctx.fillStyle = '#E8A838';
                ctx.font = 'bold 14px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('ESTD. 1984 • GENUINE HAND-PAINTED', 400, 67);

                // Main Headline
                const textColors: Record<string, string> = {
                  mustard: '#1a1a1a',
                  crimson: '#FFF9EE',
                  sky: '#FFF9EE',
                  teal: '#FFF9EE',
                  cream: '#C8372D'
                };
                ctx.fillStyle = textColors[colorTheme] || '#1a1a1a';
                ctx.font = 'bold 52px serif';
                ctx.fillText(headlineHindi || 'पप्पू पेंटर', 400, 210);

                // Subtext
                const subColors: Record<string, string> = {
                  mustard: '#C8372D',
                  crimson: '#FFE599',
                  sky: '#FFE599',
                  teal: '#E8A838',
                  cream: '#1a1a1a'
                };
                ctx.fillStyle = subColors[colorTheme] || '#C8372D';
                ctx.font = 'bold 26px sans-serif';
                ctx.fillText(subtext, 400, 290);

                // Footer Motif
                ctx.fillStyle = colorTheme === 'crimson' || colorTheme === 'sky' || colorTheme === 'teal' ? '#FFF9EE' : '#1a1a1a';
                ctx.font = 'bold 16px monospace';
                ctx.fillText('✦ ॐ ✦  PAPPU PAINTER STUDIO • LUCKNOW  ✦ ॐ ✦', 400, 390);

                // Download link trigger
                const link = document.createElement('a');
                link.download = `pappu-signboard-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E8A838] text-[#1a1a1a] border-2 border-[#1a1a1a] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#d99727] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD SIGNBOARD (.PNG)</span>
            </button>
          </div>
        </div>

        {/* Right 5 cols: Customization Controls */}
        <div className="lg:col-span-5 bg-[#FAF7F0] p-4 sm:p-5 border-4 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] space-y-4">
          <h4 className="font-mono text-base font-black text-[#1a1a1a] tracking-wider uppercase flex items-center gap-2 border-b-2 border-[#1a1a1a] pb-2">
            <Palette className="w-4 h-4 text-[#C8372D]" /> WORKSHOP CONTROLS
          </h4>

          {/* Text Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1a1a1a]">MAIN TEXT (मुख्य नाम / नारा):</label>
            <input
              type="text"
              value={headlineHindi}
              onChange={(e) => setHeadlineHindi(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-[#1a1a1a] text-sm text-[#1a1a1a] font-yatra focus:outline-none focus:bg-[#FFF9EE] shadow-[2px_2px_0px_#1a1a1a]"
              placeholder="e.g. बुरी नज़र वाले तेरा मुँह काला"
            />
          </div>

          {/* Subtext Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1a1a1a]">SUBTEXT (उप-शीर्षक / पता):</label>
            <input
              type="text"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-[#1a1a1a] text-xs text-[#1a1a1a] font-kalam focus:outline-none focus:bg-[#FFF9EE] shadow-[2px_2px_0px_#1a1a1a]"
              placeholder="e.g. आवाज़ दो | धीरे चलो"
            />
          </div>

          {/* Color Palette Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1a1a1a]">ENAMEL COLOR (रंग):</label>
            <div className="flex gap-2">
              {[
                { id: 'mustard', label: 'Mustard Yellow', hex: '#E8A838' },
                { id: 'crimson', label: 'Crimson Red', hex: '#C8372D' },
                { id: 'sky', label: 'Sky Blue', hex: '#3B82C4' },
                { id: 'teal', label: 'Emerald Teal', hex: '#1E6B52' },
                { id: 'cream', label: 'Vintage Cream', hex: '#F5EFE0' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorTheme(c.id as any)}
                  className={`w-8 h-8 rounded-full border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                    colorTheme === c.id ? 'scale-115 border-4 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Font Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1a1a1a]">SIGN LETTERING (लिखाई):</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedFont('yatra')}
                className={`px-3 py-1.5 font-yatra text-xs border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                  selectedFont === 'yatra' ? 'bg-[#E8A838] text-[#1a1a1a] font-bold shadow-[2px_2px_0px_#1a1a1a]' : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
                }`}
              >
                Yatra One (यात्रा)
              </button>
              <button
                onClick={() => setSelectedFont('rozha')}
                className={`px-3 py-1.5 font-rozha text-xs border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                  selectedFont === 'rozha' ? 'bg-[#E8A838] text-[#1a1a1a] font-bold shadow-[2px_2px_0px_#1a1a1a]' : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
                }`}
              >
                Rozha One (सिनेमा)
              </button>
              <button
                onClick={() => setSelectedFont('kalam')}
                className={`px-3 py-1.5 font-kalam text-xs border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                  selectedFont === 'kalam' ? 'bg-[#E8A838] text-[#1a1a1a] font-bold shadow-[2px_2px_0px_#1a1a1a]' : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
                }`}
              >
                Kalam (कलम)
              </button>
              <button
                onClick={() => setSelectedFont('caveat')}
                className={`px-3 py-1.5 font-caveat text-xs border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                  selectedFont === 'caveat' ? 'bg-[#E8A838] text-[#1a1a1a] font-bold shadow-[2px_2px_0px_#1a1a1a]' : 'bg-white text-[#1a1a1a] hover:bg-[#F5EFE0]'
                }`}
              >
                Caveat (हस्तकला)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
