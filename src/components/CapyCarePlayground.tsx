import React, { useState } from 'react';
import {
  CapyLogo,
  CapyMascotFull,
  CapyIconOnsen,
  CapyIconWatermelon,
  CapyIconSleeping,
  CapyIconLove,
  CapyPawBadge,
} from './CapyIcons';
import {
  playCapySqueak,
  playSnackSound,
  playPurrSound,
  playWaterSplash,
  playSparkleSound,
} from '../utils/zenAudio';
import { FloatingItem } from './FloatingSnackEffect';

interface CapyCarePlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
  onSpawnSnack: (item: FloatingItem) => void;
  onAwardHearts: (pts: number) => void;
}

type AccessoryType = 'yuzu' | 'hat' | 'sunglasses' | 'flower' | 'towel';
type PetMood = 'idle' | 'eating' | 'bathing' | 'purring' | 'squeaking';

const QUOTES = [
  'Santai dulu gak sih masbro? Hidup jangan dibawa pusing~ 🍊',
  'Devia, makasih semangkanya yaa! Enak banget! 🍉',
  'Air onsen hari ini suhunya 39°C, pas banget buat melamun estetik ♨️',
  'Elusan Devia paling juara sedunia, bikin langsung merem hepi~ 💖',
  'Eh-eh-eh! (Roy bersuara senang melihat Devia datang) 🐾',
];

export const CapyCarePlayground: React.FC<CapyCarePlaygroundProps> = ({
  isOpen,
  onClose,
  onSpawnSnack,
  onAwardHearts,
}) => {
  const [hunger, setHunger] = useState(85);
  const [zenMood, setZenMood] = useState(95);
  const [hygiene, setHygiene] = useState(90);
  const [accessory, setAccessory] = useState<AccessoryType>('yuzu');
  const [petMood, setPetMood] = useState<PetMood>('idle');
  const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);
  const [soapBubbles, setSoapBubbles] = useState<{ id: number; x: number; y: number }[]>([]);

  if (!isOpen) return null;

  const triggerReaction = (
    mood: PetMood,
    quoteIdx: number,
    durationMs: number = 2200
  ) => {
    setPetMood(mood);
    setCurrentQuote(QUOTES[quoteIdx]);
    setTimeout(() => {
      setPetMood('idle');
    }, durationMs);
  };

  const handleFeed = (foodEmoji: string, foodName: string) => {
    playSnackSound();
    setHunger((prev) => Math.min(100, prev + 15));
    setZenMood((prev) => Math.min(100, prev + 5));
    onAwardHearts(10);

    // Spawn floating food
    const x = window.innerWidth / 2 + (Math.random() - 0.5) * 80;
    const y = window.innerHeight / 2 - 60;
    onSpawnSnack({ id: Date.now() + Math.random(), x, y, emoji: foodEmoji });

    triggerReaction('eating', 1);
  };

  const handleBath = () => {
    playWaterSplash();
    setHygiene(100);
    setZenMood((prev) => Math.min(100, prev + 10));
    onAwardHearts(15);

    // Add soap bubbles
    const newBubbles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 30,
    }));
    setSoapBubbles(newBubbles);
    setTimeout(() => setSoapBubbles([]), 2000);

    triggerReaction('bathing', 2);
  };

  const handlePet = (e: React.MouseEvent) => {
    playPurrSound();
    setZenMood((prev) => Math.min(100, prev + 15));
    onAwardHearts(8);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
    const y = rect.top + 20;
    onSpawnSnack({ id: Date.now() + Math.random(), x, y, emoji: '💖' });

    triggerReaction('purring', 3);
  };

  const handleSqueak = () => {
    playCapySqueak();
    playSparkleSound();
    onAwardHearts(12);
    triggerReaction('squeaking', 4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#8D5B4C]/20 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CapyLogo size={34} />
            <div>
              <h3 className="font-black text-base text-[#1c1c18] flex items-center gap-1.5">
                <span>Taman Santai Masbro Roy</span>
                <span className="text-sm">✨</span>
              </h3>
              <p className="text-[11px] text-[#514440]">
                Rawat, ajak main, & beri makan Masbro kesayangan Devia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EBE8E2] text-[#514440] hover:bg-[#E6E2DC] flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Speech Bubble from Masbro Roy */}
        <div className="relative bg-white rounded-2xl p-3 shadow-xs border border-[#8D5B4C]/15 flex items-start gap-2.5 animate-in slide-in-from-top-2">
          <span className="text-xl">💬</span>
          <p className="text-xs text-[#1c1c18] font-bold leading-relaxed flex-1">
            "{currentQuote}"
          </p>
          <div className="absolute -bottom-2 left-12 w-4 h-4 bg-white border-b border-r border-[#8D5B4C]/15 rotate-45"></div>
        </div>

        {/* Main Interactive Capybara Avatar Arena */}
        <div className="relative bg-gradient-to-b from-[#ffdbd0]/50 via-[#a3e7fd]/30 to-[#FAF6F0] rounded-3xl p-6 flex flex-col items-center justify-center min-h-[220px] shadow-inner border border-[#8D5B4C]/10 overflow-hidden">
          {/* Floating Soap Bubbles when Bathing */}
          {soapBubbles.map((b) => (
            <div
              key={b.id}
              className="absolute text-xl pointer-events-none animate-bounce"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              🫧
            </div>
          ))}

          {/* Interactive Capybara Character Representation */}
          <div
            onClick={handlePet}
            className="relative cursor-pointer group active:scale-95 transition-transform"
            title="Klik untuk elus dagu & kepala Roy!"
          >
            {/* Visual Capy according to Pet Mood */}
            {petMood === 'eating' ? (
              <div className="scale-125 transition-transform animate-pulse">
                <CapyIconWatermelon size={130} />
              </div>
            ) : petMood === 'bathing' ? (
              <div className="scale-125 transition-transform">
                <CapyIconOnsen size={130} />
              </div>
            ) : petMood === 'purring' ? (
              <div className="scale-125 transition-transform">
                <CapyIconLove size={130} />
              </div>
            ) : petMood === 'squeaking' ? (
              <div className="scale-110 transition-transform animate-bounce">
                <CapyMascotFull size={150} showHeart={true} />
              </div>
            ) : (
              <div className="transition-transform group-hover:scale-105 duration-300">
                <CapyMascotFull size={150} showHeart={true} />
              </div>
            )}

            {/* Accessory Overlay */}
            {accessory === 'sunglasses' && (
              <div className="absolute top-[52px] left-[62px] text-2xl select-none pointer-events-none">
                🕶️
              </div>
            )}
            {accessory === 'hat' && (
              <div className="absolute top-[8px] left-[62px] text-2xl select-none pointer-events-none">
                👒
              </div>
            )}
            {accessory === 'flower' && (
              <div className="absolute top-[28px] right-[40px] text-xl select-none pointer-events-none">
                🌸
              </div>
            )}
            {accessory === 'towel' && (
              <div className="absolute top-[16px] left-[64px] text-xl select-none pointer-events-none">
                🧖
              </div>
            )}

            {/* Tap Hint Badge */}
            <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-[10px] font-black text-[#714436] flex items-center gap-1 border border-[#8D5B4C]/20 pointer-events-none">
              <span>💆‍♂️ Elus Daguku</span>
            </div>
          </div>
        </div>

        {/* Vital Health / Care Meters */}
        <div className="grid grid-cols-3 gap-2">
          {/* Lapar */}
          <div className="bg-white p-2.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#514440]">
              <span className="flex items-center gap-1">🍉 Kenyang</span>
              <span className="text-[#714436] font-extrabold">{hunger}%</span>
            </div>
            <div className="w-full bg-[#E6E2DC] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#BA1A1A] h-full rounded-full transition-all duration-500"
                style={{ width: `${hunger}%` }}
              ></div>
            </div>
          </div>

          {/* Zen / Mood */}
          <div className="bg-white p-2.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#514440]">
              <span className="flex items-center gap-1">♨️ Zen</span>
              <span className="text-[#315832] font-extrabold">{zenMood}%</span>
            </div>
            <div className="w-full bg-[#E6E2DC] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#315832] h-full rounded-full transition-all duration-500"
                style={{ width: `${zenMood}%` }}
              ></div>
            </div>
          </div>

          {/* Kebersihan */}
          <div className="bg-white p-2.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#514440]">
              <span className="flex items-center gap-1">🫧 Bersih</span>
              <span className="text-[#17677A] font-extrabold">{hygiene}%</span>
            </div>
            <div className="w-full bg-[#E6E2DC] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#17677A] h-full rounded-full transition-all duration-500"
                style={{ width: `${hygiene}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Controls Tabs / Buttons */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-black text-[#1c1c18]">Pilihan Aksi Bareng Masbro:</span>

          {/* Row 1: Food choices */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleFeed('🍉', 'Semangka Manis')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-[#1c1c18] font-bold text-xs shadow-xs border border-[#8D5B4C]/10 active:scale-95 hover:bg-[#ffdad6] transition-all whitespace-nowrap"
            >
              <span>🍉 Semangka (+15%)</span>
            </button>
            <button
              onClick={() => handleFeed('🍊', 'Yuzu Hangat')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-[#1c1c18] font-bold text-xs shadow-xs border border-[#8D5B4C]/10 active:scale-95 hover:bg-[#ffe1d8] transition-all whitespace-nowrap"
            >
              <span>🍊 Yuzu (+12%)</span>
            </button>
            <button
              onClick={() => handleFeed('🌿', 'Kangkung Renyah')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-[#1c1c18] font-bold text-xs shadow-xs border border-[#8D5B4C]/10 active:scale-95 hover:bg-[#c1eebc] transition-all whitespace-nowrap"
            >
              <span>🌿 Kangkung (+10%)</span>
            </button>
            <button
              onClick={() => handleFeed('🌽', 'Jagung Rebus')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-[#1c1c18] font-bold text-xs shadow-xs border border-[#8D5B4C]/10 active:scale-95 hover:bg-[#ffdbd0] transition-all whitespace-nowrap"
            >
              <span>🌽 Jagung (+10%)</span>
            </button>
          </div>

          {/* Row 2: Care actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBath}
              className="py-2.5 px-3 rounded-2xl bg-[#a3e7fd] hover:bg-[#8cd0e6] text-[#17677A] font-extrabold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="text-base">♨️</span>
              <span>Bilas Air Hangat Onsen</span>
            </button>
            <button
              onClick={handleSqueak}
              className="py-2.5 px-3 rounded-2xl bg-[#ffdbd0] hover:bg-[#f7b8a5] text-[#714436] font-extrabold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="text-base">📢</span>
              <span>Dengar Kicau Masbro!</span>
            </button>
          </div>

          {/* Row 3: Accessories */}
          <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-[#8D5B4C]/10">
            <span className="text-[11px] font-bold text-[#514440] flex items-center gap-1">
              <span>👒 Aksesori:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'yuzu' as AccessoryType, label: '🍊 Yuzu' },
                { id: 'hat' as AccessoryType, label: '👒 Topi' },
                { id: 'sunglasses' as AccessoryType, label: '😎 Kacamata' },
                { id: 'flower' as AccessoryType, label: '🌸 Bunga' },
                { id: 'towel' as AccessoryType, label: '🧖 Handuk' },
              ].map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setAccessory(acc.id);
                    playSparkleSound();
                  }}
                  className={`px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
                    accessory === acc.id
                      ? 'bg-[#714436] text-white shadow-xs'
                      : 'bg-[#F7F3ED] text-[#514440] hover:bg-[#EBE8E2]'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-1">
          <span className="text-[10px] text-[#84746f] font-semibold">
            Semua interaksi memberi Devia poin CapyHeart tambahan 💖
          </span>
        </div>
      </div>
    </div>
  );
};

