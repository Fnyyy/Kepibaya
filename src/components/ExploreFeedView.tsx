import React, { useState } from 'react';
import { Capybara, SightingReport, UserProfile } from '../types';
import { playPopSound, playSnackSound, playCapySqueak } from '../utils/zenAudio';
import {
  CapyLogo,
  CapyIconOnsen,
  CapyIconWatermelon,
  CapyIconSleeping,
  CapyIconLove,
  CapyPawBadge,
} from './CapyIcons';

interface ExploreFeedViewProps {
  capybaras: Capybara[];
  sightings: SightingReport[];
  userProfile: UserProfile;
  onSelectCapybara: (capy: Capybara) => void;
  onNavigate: (capy: Capybara) => void;
  onOpenProfile: () => void;
  onOpenFullMap: () => void;
  onOpenPlayground: () => void;
  onUpdateSightings: (updated: SightingReport[]) => void;
}

interface MapPinSelected {
  id: string;
  name: string;
  status: string;
  distance: string;
  emoji: string;
  photo: string;
  sanctuary: string;
  capyObj?: Capybara;
}

export const ExploreFeedView: React.FC<ExploreFeedViewProps> = ({
  capybaras,
  sightings,
  userProfile,
  onSelectCapybara,
  onNavigate,
  onOpenProfile,
  onOpenFullMap,
  onOpenPlayground,
  onUpdateSightings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('all');
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [selectedPin, setSelectedPin] = useState<MapPinSelected | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2600);
  };

  const filterChips = [
    { id: 'all', label: 'Semua Masbro', icon: CapyLogo },
    { id: 'yuzu', label: 'Berendam Jeruk', icon: CapyIconOnsen },
    { id: 'melon', label: 'Nyam Semangka', icon: CapyIconWatermelon },
    { id: 'sleep', label: 'Bobo Siang Gemoy', icon: CapyIconSleeping },
    { id: 'friendly', label: 'Ramah Disayang', icon: CapyIconLove },
  ];

  const filteredCapybaras = capybaras.filter((capy) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      capy.name.toLowerCase().includes(q) ||
      capy.sanctuaryName.toLowerCase().includes(q) ||
      capy.favoriteFood.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeChip === 'yuzu') return capy.badgeEmoji === '🍊' || capy.status === 'Berendam Jeruk';
    if (activeChip === 'melon') return capy.badgeEmoji === '🍉' || capy.status === 'Makan Rumput';
    if (activeChip === 'sleep') return capy.badgeEmoji === '💤' || capy.status === 'Tidur Pulas';
    return true;
  });

  const filteredSightings = sightings.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.author.toLowerCase().includes(q) ||
      s.caption.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q)
    );
  });

  const handleLikeSighting = (id: string) => {
    playPopSound();
    const updated = sightings.map((s) => {
      if (s.id === id) {
        const nextLiked = !s.isLiked;
        return {
          ...s,
          isLiked: nextLiked,
          gemesCount: nextLiked ? s.gemesCount + 1 : s.gemesCount - 1,
        };
      }
      return s;
    });
    onUpdateSightings(updated);
  };

  const handleSusulMasbro = (sighting: SightingReport) => {
    const matched = capybaras.find((c) => c.id === sighting.capyId) || capybaras[0];
    onNavigate(matched);
  };

  const handleSelectMapPin = (pin: MapPinSelected) => {
    playPopSound();
    setSelectedPin(pin);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen flex flex-col antialiased text-[#1c1c18] pb-28">
      {/* Toast Notification */}
      <div
        className={`fixed top-20 inset-x-4 max-w-sm mx-auto z-50 transition-all duration-300 flex items-center gap-2.5 p-3.5 rounded-full bg-[#1c1c18] text-white shadow-2xl ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-[#a3e7fd] text-[20px]">pets</span>
        <span className="text-xs font-semibold flex-1 leading-snug">{toastText}</span>
      </div>

      {/* Header with Custom Capybara Logo & Mascot */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-xl border-b border-[#8D5B4C]/10 shadow-[0_4px_20px_-4px_rgba(109,67,54,0.06)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2.5">
            <div
              className="relative cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                playCapySqueak();
                triggerToast('Halo Devia! Masbro Roy siap nemenin santai~ 🍊🐾');
              }}
              title="Ketuk Masbro Logo!"
            >
              <CapyLogo size={42} withSparkle={true} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-black text-base text-[#714436] leading-none tracking-tight">
                  CapyFinder
                </span>
                <span className="text-[12px]">🐾</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-[#714436] font-extrabold bg-[#ffdbd0] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>{userProfile.fullName}</span>
                  <span>🌸</span>
                </span>
                <span className="text-[10px] text-[#315832] font-bold">
                  {userProfile.rangerTitle.split(' ')[0]} {userProfile.rangerTitle.split(' ')[1]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Play Mascot Button */}
            <button
              onClick={onOpenPlayground}
              className="px-2.5 py-1 rounded-full bg-[#a3e7fd]/80 hover:bg-[#a3e7fd] text-[#17677A] text-[11px] font-black shadow-xs flex items-center gap-1 active:scale-95 transition-all"
              title="Ajak Main Masbro Roy"
            >
              <span>🍊</span>
              <span className="hidden xs:inline">Main</span>
            </button>

            {/* Profile Avatar with Ribbon */}
            <button
              onClick={onOpenProfile}
              aria-label="Profil Devia"
              title="Profil Devia"
              className="relative p-1 rounded-full bg-[#F7F3ED] transition-transform active:scale-90 hover:shadow-xs inline-flex"
            >
              <div className="w-9 h-9 rounded-full bg-[#ffdbd0]/50 overflow-hidden flex items-center justify-center text-[#714436] shadow-xs ring-2 ring-[#ffdbd0]">
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Devia"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[20px]">person</span>
                )}
              </div>
              <span className="absolute -top-1 -right-1 bg-white text-[10px] rounded-full p-0.5 shadow-xs leading-none">
                🎀
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col gap-3 pt-2">
        {/* Interactive Virtual Companion Banner */}
        <section className="px-4">
          <div
            onClick={onOpenPlayground}
            className="w-full bg-gradient-to-r from-[#ffe1d8] via-[#ffdbd0] to-[#a3e7fd]/40 rounded-3xl p-3.5 shadow-xs border border-[#8D5B4C]/20 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <CapyLogo size={36} withSparkle={false} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#714436]">
                    Taman Santai Masbro Roy 🐾
                  </span>
                  <span className="text-[10px] bg-[#315832] text-white px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                    Online 🍊
                  </span>
                </div>
                <span className="text-[11px] text-[#514440] mt-0.5">
                  Suapi semangka, mandikan onsen, & elus dagu Roy bareng Devia!
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-[#714436] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="px-4 flex flex-col gap-2.5">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#714436]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari masbro gembul kesayanganmu~ ✨🐾"
              className="w-full pl-10 pr-10 py-2.5 bg-[#F7F3ED] rounded-full text-xs text-[#1c1c18] placeholder:text-[#514440]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8D5B4C]/20 shadow-xs transition-all font-medium"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#84746f] hover:text-[#1c1c18]"
              >
                ✕
              </button>
            ) : (
              <button
                aria-label="Filter Detail"
                onClick={() => triggerToast('Menampilkan semua kategori masbro santai 🍊')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8D5B4C] hover:text-[#714436] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            )}
          </div>

          {/* Filter Chips Horizontal Scroll with Custom Capy Icons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 -mx-4 px-4 scrollbar-none">
            {filterChips.map((chip) => {
              const isActive = activeChip === chip.id;
              const IconComp = chip.icon;
              return (
                <button
                  key={chip.id}
                  onClick={() => {
                    setActiveChip(chip.id);
                    playPopSound();
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#315832] text-white shadow-xs'
                      : 'bg-[#F7F3ED] text-[#514440] hover:bg-[#F1EDE7]'
                  }`}
                >
                  <IconComp size={16} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Live Pulse Status Badge */}
        <section className="px-4">
          <div className="w-full bg-[#a3e7fd]/40 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-xs border border-[#a3e7fd]/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#315832] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#315832]"></span>
              </span>
              <p className="text-xs text-[#17677A] truncate font-semibold">
                <strong className="font-extrabold text-[#315832]">
                  14 masbro lagi santai rebahan
                </strong>{' '}
                di sekitarmu, {userProfile.fullName}! 🌿💤
              </p>
            </div>
            <span className="text-[18px] shrink-0">🍊</span>
          </div>
        </section>

        {/* Interactive Map Preview Card */}
        <section className="px-4">
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-sm bg-[#EBE8E2] border border-[#8D5B4C]/10">
            {/* Natural Map Texture */}
            <div
              className="w-full h-full bg-cover bg-center cursor-pointer"
              onClick={onOpenFullMap}
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWuJZuQC3RSb9x5ddVIejBGf6YIM-Nnlbd0CnfT0SSnBeixszBbUzeQpaecePgexFjXkqiZsyRsS8QVMFJilthtcBoWe-jh4zfBqJIIq_aDlwH8vsQSHvUm0rUr_ZcD7JO_Sxex6hy8rf9T8vYArgBqEF4izxrOW9uy33VuzO_78I0eo9QhLiUpsaVG69p5gLY8dBh8OP4euwB9OkCOjvN9KOx3D1oIbtjRl-Okw9uy5f92whvSx7_Ew')`,
              }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#714436]/25 via-transparent to-[#714436]/10 pointer-events-none"></div>

            {/* Map HUD Top */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-white/60">
              <span className="material-symbols-outlined text-[#315832] text-[16px]">
                my_location
              </span>
              <span className="text-[11px] text-[#714436] font-extrabold">GPS Akurat • 5m</span>
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              <button
                aria-label="Layer Peta"
                onClick={onOpenFullMap}
                className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#714436] shadow-xs active:scale-90 transition-transform hover:bg-white"
              >
                <span className="material-symbols-outlined text-[18px]">layers</span>
              </button>
            </div>

            {/* Interactive Pin 1: Masbro Roy */}
            <div
              onClick={() =>
                handleSelectMapPin({
                  id: 'roy',
                  name: 'Masbro Roy',
                  status: 'Berendam Jeruk',
                  distance: '120m',
                  emoji: '🍊',
                  photo: capybaras[0].heroPhotos[0],
                  sanctuary: capybaras[0].sanctuaryName,
                  capyObj: capybaras[0],
                })
              }
              className="absolute top-[28%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 mb-1 transition-transform group-hover:scale-110 border border-[#8D5B4C]/10">
                <span className="text-[12px]">🍊</span>
                <span className="text-[10px] text-[#714436] font-black">Roy (120m)</span>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#8D5B4C] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                  <CapyPawBadge size={16} />
                </div>
                <div className="absolute -bottom-1 w-2 h-2 bg-[#8D5B4C] rotate-45"></div>
              </div>
            </div>

            {/* Interactive Pin 2: Oyen Chill */}
            <div
              onClick={() =>
                handleSelectMapPin({
                  id: 'oyen',
                  name: 'Oyen Chill',
                  status: 'Berendam Air Hangat',
                  distance: '450m',
                  emoji: '♨️',
                  photo:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCa06RqQX3WfxrhuDgV1iWPw50tZDTVz0b1PxGtTIyuLcNflE9N6LdC31MBgBucFZPXu0H5K06wF_yqtoOgctXN7KgyERNRmQbNWEORBKnoBmFAKvpLRDHFYsmeXm3Fs4psTvLVxyn4vZQazBHmeiBwJbVIIv5x0m4QIR3nIVby6xo7cchZcLhQ5jqluq3Nm0bBpaUenOdNxf1IQ9rbGRaxoDf5QOiftOgotYlB_qrq',
                  sanctuary: 'Kolam Air Hangat Onsen Timur',
                })
              }
              className="absolute top-[52%] right-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 mb-1 transition-transform group-hover:scale-110 border border-[#8D5B4C]/10">
                <span className="text-[12px]">♨️</span>
                <span className="text-[10px] text-[#17677A] font-black">Oyen (450m)</span>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#17677A] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                  <span className="material-symbols-outlined text-[15px]">hot_tub</span>
                </div>
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-[#17677A] rotate-45"></div>
              </div>
            </div>

            {/* Interactive Pin 3: Bimo Fam */}
            <div
              onClick={() =>
                handleSelectMapPin({
                  id: 'boba-mochi',
                  name: 'Boba & Mochi (Bimo Fam)',
                  status: 'Pesta Makan Rumput',
                  distance: '1.2km',
                  emoji: '🌿',
                  photo: capybaras[1]?.heroPhotos[0] || capybaras[0].heroPhotos[0],
                  sanctuary: 'Danau Ecopark Barat',
                  capyObj: capybaras[1],
                })
              }
              className="absolute bottom-[24%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 mb-1 transition-transform group-hover:scale-110 border border-[#8D5B4C]/10">
                <span className="text-[12px]">🌿</span>
                <span className="text-[10px] text-[#315832] font-black">Bimo Fam (1.2km)</span>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#315832] text-white flex items-center justify-center shadow-md ring-2 ring-white">
                  <span className="material-symbols-outlined text-[14px]">groups</span>
                </div>
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-[#315832] rotate-45"></div>
              </div>
            </div>

            {/* Map Action Bar Overlay */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/60">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px]">🌱</span>
                <span className="text-xs text-[#1c1c18] font-bold">Radar Masbro Gembul Aktif</span>
              </div>
              <button
                onClick={onOpenFullMap}
                className="text-xs text-[#714436] font-extrabold flex items-center gap-1 active:translate-x-0.5 transition-transform bg-[#ffdbd0]/60 px-2.5 py-1 rounded-full hover:bg-[#ffdbd0]"
              >
                <span>Intip Peta Penuh</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Selected Map Pin Quick Sheet */}
        {selectedPin && (
          <section className="px-4 animate-in slide-in-from-bottom-3 duration-200">
            <div className="bg-white rounded-3xl p-3.5 shadow-md border border-[#8D5B4C]/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#EBE8E2] shrink-0 border border-[#8D5B4C]/15">
                  <img
                    src={selectedPin.photo}
                    alt={selectedPin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-[#1c1c18] truncate">
                      {selectedPin.name}
                    </span>
                    <span className="text-sm">{selectedPin.emoji}</span>
                  </div>
                  <span className="text-[10px] text-[#714436] font-bold">
                    {selectedPin.status} • {selectedPin.distance}
                  </span>
                  <span className="text-[10px] text-[#514440] truncate">
                    {selectedPin.sanctuary}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    if (selectedPin.capyObj) {
                      onSelectCapybara(selectedPin.capyObj);
                    } else {
                      onSelectCapybara(capybaras[0]);
                    }
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#714436] text-white text-xs font-bold shadow-xs active:scale-95"
                >
                  Detail 🐾
                </button>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="w-7 h-7 rounded-full bg-[#F1EDE7] text-[#514440] flex items-center justify-center font-bold text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Popular Capybaras Section */}
        <section className="mt-2 flex flex-col">
          <div className="px-4 flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">✨</span>
              <h2 className="font-black text-base text-[#714436] tracking-tight">
                Masbro Paling Populer & Gemoy
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveChip('all');
                playPopSound();
              }}
              className="text-xs text-[#315832] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <span className="text-[12px]">🐾</span>
            </button>
          </div>

          {/* Horizontal Cards Carousel */}
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 pt-1 scrollbar-none">
            {filteredCapybaras.length === 0 ? (
              <div className="w-full bg-white rounded-3xl p-6 text-center border border-[#8D5B4C]/10">
                <span className="text-3xl">🔍</span>
                <p className="text-xs text-[#514440] font-bold mt-2">
                  Tidak ada masbro yang cocok dengan pencarianmu
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveChip('all');
                  }}
                  className="mt-2 text-xs text-[#714436] font-extrabold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredCapybaras.map((capy) => (
                <div
                  key={capy.id}
                  className="min-w-[270px] max-w-[270px] bg-white rounded-3xl p-3 shadow-sm border border-[#8D5B4C]/10 flex flex-col shrink-0 relative transition-transform active:scale-[0.99] hover:shadow-md"
                >
                  {/* Photo */}
                  <div
                    className="relative w-full h-36 rounded-2xl overflow-hidden mb-2.5 bg-[#EBE8E2] cursor-pointer"
                    onClick={() => onSelectCapybara(capy)}
                  >
                    <img
                      src={capy.heroPhotos[0]}
                      alt={capy.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#714436]/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="text-[11px]">{capy.badgeEmoji}</span>
                      <span className="text-[10px] font-bold">{capy.status}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[#714436] text-[13px]">
                        near_me
                      </span>
                      <span className="text-[10px] text-[#714436] font-bold">
                        {capy.distanceMeters}m
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3
                          className="font-extrabold text-base text-[#1c1c18] leading-tight cursor-pointer hover:text-[#714436]"
                          onClick={() => onSelectCapybara(capy)}
                        >
                          {capy.name}
                        </h3>
                        <div className="flex items-center gap-0.5 bg-[#c1eebc] text-[#002106] px-1.5 py-0.5 rounded-md">
                          <span
                            className="material-symbols-outlined text-[13px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            sentiment_satisfied
                          </span>
                          <span className="text-[11px] font-bold">{capy.chillScore}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#514440] flex items-center gap-1 mt-0.5 truncate">
                        <span className="material-symbols-outlined text-[13px] text-[#714436]">
                          location_on
                        </span>
                        <span>{capy.sanctuaryName}</span>
                      </p>
                    </div>

                    {/* Card Bottom Bar */}
                    <div className="pt-2 bg-[#F7F3ED]/70 p-2 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-[12px]">{capy.badgeEmoji}</span>
                        <span className="text-[10px] text-[#514440] font-bold truncate">
                          {capy.title?.split('si ')[1] || 'Si Paling Santuy'}
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectCapybara(capy)}
                        className="bg-[#714436] text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 hover:bg-[#6D4336]"
                      >
                        <span>Samperin Yuk!</span>
                        <span className="text-[10px]">🐾</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Verified Recent Sighting List */}
        <section className="px-4 mt-2 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">📸</span>
              <h2 className="font-black text-base text-[#714436] tracking-tight">
                Kabar Gemoy Terverifikasi
              </h2>
            </div>
            <span className="text-[10px] text-[#315832] bg-[#c1eebc]/80 px-2.5 py-0.5 rounded-full font-bold">
              Langsung dari Taman 🌸
            </span>
          </div>

          {/* Sighting Cards */}
          {filteredSightings.map((report) => (
            <div
              key={report.id}
              className="w-full bg-white rounded-3xl p-3.5 shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-3 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#EBE8E2] relative">
                  <img
                    src={report.image}
                    alt={report.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-extrabold text-xs text-[#1c1c18] truncate">
                        {report.author}
                      </span>
                      {report.authorVerified && (
                        <span
                          className="material-symbols-outlined text-[#315832] text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#84746f] shrink-0">{report.timeAgo}</span>
                  </div>

                  <p className="text-xs text-[#1c1c18] mt-1 line-clamp-2 leading-relaxed">
                    "{report.caption}"
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#714436] bg-[#ffdbd0]/60 px-2 py-0.5 rounded-full font-bold">
                      <span className="material-symbols-outlined text-[12px]">pin_drop</span>
                      <span>
                        {report.location} • {report.distance}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-1 bg-[#F7F3ED]/60 px-3 py-2 rounded-2xl">
                <button
                  onClick={() => handleLikeSighting(report.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all ${
                    report.isLiked
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-white text-[#514440] hover:text-[#714436]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[17px] ${
                      report.isLiked ? 'text-[#ba1a1a]' : 'text-[#84746f]'
                    }`}
                    style={{ fontVariationSettings: report.isLiked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{report.gemesCount} Gemes</span>
                </button>

                <button
                  onClick={() => handleSusulMasbro(report)}
                  className="flex items-center gap-1.5 bg-[#714436] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all hover:bg-[#6D4336]"
                >
                  <span>Susul Masbro</span>
                  <span className="text-[11px]">🐾</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
