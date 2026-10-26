import React, { useState } from 'react';
import { X, Waves, Volume2, Sparkles, Bell } from 'lucide-react';
import { toggleAmbientSound, isAmbientActive, playZenBell } from '../utils/zenAudio';

interface ZenSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZenSoundModal: React.FC<ZenSoundModalProps> = ({ isOpen, onClose }) => {
  const [ambientPlaying, setAmbientPlaying] = useState(isAmbientActive());

  if (!isOpen) return null;

  const handleToggleAmbient = () => {
    toggleAmbientSound((active) => {
      setAmbientPlaying(active);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-3xl shadow-2xl border border-[#d6c2bd]/40 overflow-hidden flex flex-col p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e6e2dc]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#17677A]/10 text-[#17677A] flex items-center justify-center">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c18] text-base">Soundscape Onsen Alami</h3>
              <p className="text-xs text-[#514440]">Suara riam air & ketenangan Masbro Roy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1ede7] text-[#514440]"
            aria-label="Tutup suara onsen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient controls */}
        <div className="py-6 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#8D5B4C]/10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E0F2F1] text-[#17677A] mx-auto flex items-center justify-center mb-3">
              <Waves className={`w-8 h-8 ${ambientPlaying ? 'animate-pulse text-[#3B8296]' : ''}`} />
            </div>
            <h4 className="font-bold text-sm text-[#1c1c18]">Gemericik Air Onsen Lembah Hijau</h4>
            <p className="text-xs text-[#514440] mt-1 max-w-xs mx-auto">
              Simulasi tetesan air hangat alami dan semilir angin bambu yang membantu Roy mencapai skor Chill 9.9 / 10.
            </p>

            <button
              onClick={handleToggleAmbient}
              className={`mt-4 px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mx-auto ${
                ambientPlaying
                  ? 'bg-[#17677A] text-white shadow-[#17677A]/20'
                  : 'bg-[#714436] text-white hover:bg-[#6D4336]'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{ambientPlaying ? 'Jeda Suara Onsen' : 'Putar Suara Damai'}</span>
            </button>
          </div>

          {/* Singing Bowl Bell chime button */}
          <div className="bg-[#E9F5EC] rounded-2xl p-3.5 border border-[#315832]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#315832] flex items-center justify-center shadow-xs">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1c1c18] block">Lonceng Singing Bowl Zen</span>
                <span className="text-[11px] text-[#514440]">Getaran relaksasi frekuensi 440-880Hz</span>
              </div>
            </div>
            <button
              onClick={() => playZenBell()}
              className="px-3 py-1.5 rounded-full bg-white text-[#315832] text-xs font-semibold hover:bg-[#c5f3c1] transition-colors border border-[#315832]/20"
            >
              Dentangkan
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#e6e2dc] flex items-center justify-center gap-1.5 text-xs text-[#84746f]">
          <Sparkles className="w-3.5 h-3.5 text-[#8D5B4C]" />
          <span>Dihasilkan secara real-time melalui Web Audio API</span>
        </div>
      </div>
    </div>
  );
};
