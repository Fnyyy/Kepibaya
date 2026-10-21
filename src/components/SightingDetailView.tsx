import React, { useState } from 'react';
import { Capybara, UserProfile } from '../types';
import {
  playSnackSound,
  playPopSound,
  playPurrSound,
  playCapySqueak,
} from '../utils/zenAudio';
import { FloatingItem } from './FloatingSnackEffect';
import { CapyLogo, CapyIconLove, CapyPawBadge } from './CapyIcons';

interface SightingDetailViewProps {
  capybara: Capybara;
  userProfile?: UserProfile;
  onBack: () => void;
  onOpenNavigation: () => void;
  onOpenGallery: () => void;
  onOpenSoundscape: () => void;
  onOpenProfile: () => void;
  onOpenPlayground?: () => void;
  onToggleFavorite: (id: string) => void;
  onUpdateSnackCount: (id: string, newCount: number) => void;
  onSpawnSnack: (item: FloatingItem) => void;
}

export const SightingDetailView: React.FC<SightingDetailViewProps> = ({
  capybara,
  userProfile,
  onBack,
  onOpenNavigation,
  onOpenGallery,
  onOpenSoundscape,
  onOpenProfile,
  onOpenPlayground,
  onToggleFavorite,
  onUpdateSnackCount,
  onSpawnSnack,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSavedSpot, setIsSavedSpot] = useState(false);
  const [isHearted, setIsHearted] = useState(capybara.isFavorite);
  const [snackToast, setSnackToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [petCount, setPetCount] = useState(0);

  const photos =
    capybara.heroPhotos && capybara.heroPhotos.length > 0
      ? capybara.heroPhotos
      : [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCoRqqnw705UWG2F03OeYSggqbrOkrI5py5EgpVm3AYV7oK345diPtRoDXD6D-F_am5Y3lBOBhcreHYpE38gl5w4Pi8zNosBgbf7Xj-eYGXGlzqdPzuHbP6kxBsODKyfsXKZVgRUgXhajjDTjDawY5eqnDT2HkfPYZrmDaX4o7Q7amB6evs2NIFv_qihJazNOG32Md8w0aDT3DlyhA1lkqJd3V7x10LcYTi-KlgZsaYMZjSzeKRhQ3thQ',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDkGOg-QUh8s-zqQfw-tRFs6JCdvCobD_4px57ofbb_nMA1cLeplPMQEatLhGFJqPBYYncSReLvpATZE9VdWfKR6tDAoKleXqiJ-Q7WkwkuBA9WIoj9-WxCsXn32BB0v4dux9J1keqI5tpVlQUEyYbNoOGN_k63U08N4ZoQ_gLk4qzNqF2kHpG1ZGoXq4Iw1jwBOHsNhYAA6Mo5tARCkeLZvxuvWEJ4jTfLLvPnw_MAsO0X2CS5mBgTjQ',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCQv0mmZ4OjGel1rwFBwSArYxIBplSWsQ_vIQl7baq050lenGPg6nLwKLGvdlt8_bxqhKhug62gsEVz4etTafTjsofK_WGLH_Iboo6aETOYOJkbQMGcf7Rrg7QxvLw07EG-YFuOUZviIcTrfWYuIvJotJB7iELpuM0mZhaZEq3kXPG0TZNUzcQrKdYjFw0Fhr1JwNn9GzfRp5PppxiYGDQjDfNg-bzzN4jfbfwxFyG4sz2sVCNV5LgJtQ',
        ];

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setSnackToast(true);
    setTimeout(() => {
      setSnackToast(false);
    }, 2600);
  };

  const handleFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
    const y = rect.top;

    onSpawnSnack({
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: Math.random() > 0.4 ? '🍉' : Math.random() > 0.5 ? '🍊' : '🌿',
    });

    playSnackSound();
    const newCount = capybara.snackCount + 1;
    onUpdateSnackCount(capybara.id, newCount);
    triggerToast(
      `🍉✨ ${capybara.name} ngunyah hepi banget! Devia dapat peluk hangat capy 🐾`
    );
  };

  const handlePet = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 40;
    const y = rect.top;

    onSpawnSnack({
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: Math.random() > 0.5 ? '💖' : '✨',
    });

    playPurrSound();
    setPetCount((prev) => prev + 1);
    triggerToast(
      `Purrrr~ ${capybara.name} merem merem manja pas Devia elus dagunya! 🥰 (${
        petCount + 1
      }x dielus)`
    );
  };

  const handleToggleHeart = () => {
    const next = !isHearted;
    setIsHearted(next);
    onToggleFavorite(capybara.id);
    playPopSound();
    if (next) {
      triggerToast('Ditambahkan ke Capybara Favorit Devia! 💖');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${capybara.name} si Capybara Santai`,
        text: `Lihat Masbro Roy yang lagi berendam santai di Onsen Lembah Hijau!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      triggerToast('🐾 Tautan spot Masbro Roy berhasil disalin!');
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen flex flex-col antialiased text-[#1c1c18] pb-28">
      {/* Toast Notification */}
      <div
        className={`fixed top-20 inset-x-4 max-w-sm mx-auto z-50 transition-all duration-300 flex items-center gap-2.5 p-3.5 rounded-full bg-[#315832] text-white shadow-xl ${
          snackToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <span className="text-xl">🌸</span>
        <span className="text-xs font-semibold flex-1 leading-snug">{toastText}</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-xl border-b border-[#8D5B4C]/10 shadow-[0_4px_20px_-4px_rgba(109,67,54,0.06)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <button
              aria-label="Kembali"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#1c1c18] hover:bg-[#8D5B4C]/10 active:scale-95 transition-all"
              onClick={onBack}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  playCapySqueak();
                  triggerToast('Roy bersuara lembut memanggil Devia! 🐾');
                }}
                className="cursor-pointer active:scale-95 transition-transform"
                title="Panggil Roy"
              >
                <CapyLogo size={36} withSparkle={false} />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm text-[#1c1c18] flex items-center gap-1 leading-tight">
                  {capybara.name} <span className="text-[13px]">✨</span>
                </h1>
                <span className="text-[10px] text-[#714436] font-bold tracking-tight flex items-center gap-1">
                  <span>💖</span> Devia Imup's Favorite Capy
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSoundscape}
              className="w-8 h-8 rounded-full bg-[#17677A]/15 text-[#17677A] flex items-center justify-center hover:bg-[#17677A]/25 transition-colors"
              title="Suara Zen Onsen"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>
            <button
              onClick={onOpenProfile}
              aria-label="Profil Devia"
              className="w-8 h-8 rounded-full bg-[#EBE8E2] overflow-hidden flex items-center justify-center text-[#514440] shadow-xs active:scale-95 hover:bg-[#8D5B4C]/20 transition-all border border-[#8D5B4C]/20"
            >
              {userProfile?.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt="Devia"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[18px]">person</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-3 flex flex-col gap-4">
        {/* Hero Carousel & Identity Card */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#EBE8E2] shadow-sm border border-[#8D5B4C]/10">
          {/* Carousel Images */}
          <div
            className="flex transition-transform duration-500 ease-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {photos.map((src, i) => (
              <div key={i} className="min-w-full relative aspect-4/3 bg-[#E6E2DC]">
                <img
                  src={src}
                  alt={`${capybara.name} slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Verified Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md shadow-xs text-[#714436]">
            <span className="text-[13px]">🌸</span>
            <span className="text-[11px] font-bold tracking-wide">Bestie Devia Imup 🐾</span>
          </div>

          {/* Live Status Mood Pill */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#a3e7fd] text-[#17677A] shadow-xs">
            <span className="text-[11px] font-bold flex items-center gap-1">
              {capybara.moodStatus || '♨️🫧 Lagi Berendam Air Hangat'}
            </span>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Foto ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Capy Main Title Info */}
        <div className="bg-white p-4 rounded-3xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#673b2e] text-[10px] font-bold tracking-wide">
                  Status: 100% Lembut & Gembul ✨
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-[#1c1c18] flex items-center gap-2">
                {capybara.title || `${capybara.name} si Paling Zen`}
                <span className="text-xl select-none">{capybara.badgeEmoji}</span>
              </h2>
              <p className="text-xs text-[#514440] flex items-center gap-1 mt-0.5 font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#17677A]">park</span>
                {capybara.sanctuaryName}
              </p>
            </div>
            <button
              aria-label="Sukai Profil"
              className="w-10 h-10 rounded-full bg-[#F1EDE7] flex items-center justify-center text-[#714436] active:scale-90 transition-all shadow-xs hover:bg-[#ffdbd0]"
              onClick={handleToggleHeart}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-colors ${
                  isHearted ? 'text-[#ba1a1a]' : 'text-[#714436]'
                }`}
                style={{ fontVariationSettings: isHearted ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Level Santuy Masbro meter */}
          <div className="mt-2 p-3.5 rounded-2xl bg-[#F7F3ED] flex flex-col gap-2 border border-[#8D5B4C]/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px]">🍊</span>
                <span className="text-xs font-bold text-[#1c1c18]">Level Santuy Masbro</span>
              </div>
              <span className="text-xs font-black text-[#315832]">
                {capybara.chillScore} / 10 • {capybara.chillVerdict}
              </span>
            </div>
            <div className="w-full bg-[#E6E2DC] h-2.5 rounded-full overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-[#315832] to-[#a5d2a2] h-full rounded-full transition-all duration-1000"
                style={{ width: `${capybara.chillScore * 10}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-[#514440] italic">
              "{capybara.quote || 'Tidak ada masalah duniawi yang tidak bisa diselesaikan dengan berendam dan jeruk hangat.'} — {capybara.name} 🐾"
            </p>
          </div>
        </div>

        {/* Quick Tamagotchi Playground Shortcut Card */}
        {onOpenPlayground && (
          <div
            onClick={onOpenPlayground}
            className="w-full bg-gradient-to-r from-[#a3e7fd]/60 via-[#ffdbd0]/50 to-[#FAF6F0] rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/15 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                <CapyIconLove size={34} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#714436] flex items-center gap-1">
                  Masuk ke Taman Bermain Roy 🍊
                </span>
                <span className="text-[11px] text-[#514440]">
                  Mandikan, ganti topi pantai, & dengar kicauannya!
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#714436] text-[20px]">
              arrow_forward
            </span>
          </div>
        )}

        {/* Key Stats Bento Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#17677A]">
              <span className="text-[16px]">🎂</span>
              <span className="text-[10px] text-[#514440] uppercase tracking-wider font-extrabold">
                Umur
              </span>
            </div>
            <span className="font-extrabold text-sm text-[#1c1c18] mt-1">{capybara.age}</span>
            <span className="text-[11px] text-[#514440]">{capybara.ageCategory}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#714436]">
              <span className="text-[16px]">🍉</span>
              <span className="text-[10px] text-[#514440] uppercase tracking-wider font-extrabold">
                Cemilan Favorit
              </span>
            </div>
            <span className="font-extrabold text-sm text-[#1c1c18] mt-1">
              {capybara.favoriteFood}
            </span>
            <span className="text-[11px] text-[#514440]">{capybara.favoriteSecondary}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#315832]">
              <span className="text-[16px]">🦆🐢</span>
              <span className="text-[10px] text-[#514440] uppercase tracking-wider font-extrabold">
                Circle Nongkrong
              </span>
            </div>
            <span className="font-extrabold text-sm text-[#1c1c18] mt-1">
              {capybara.companionCircle}
            </span>
            <span className="text-[11px] text-[#514440]">{capybara.circleNote}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#17677A]">
              <span className="text-[16px]">✨</span>
              <span className="text-[10px] text-[#514440] uppercase tracking-wider font-extrabold">
                Hobi Utama
              </span>
            </div>
            <span className="font-extrabold text-sm text-[#1c1c18] mt-1">Melamun Estetik</span>
            <span className="text-[11px] text-[#514440]">0% overthinking, 100% damai</span>
          </div>
        </div>

        {/* Interactive Petting Playground Card */}
        <div
          onClick={handlePet}
          className="bg-gradient-to-r from-[#ffe1d8] to-[#ffdbd0] rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/20 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-xs">
              <CapyIconLove size={36} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-[#714436] flex items-center gap-1">
                Elus Dagu Masbro Roy 🐾 <span className="text-[12px]">✨</span>
              </span>
              <span className="text-[11px] text-[#514440]">
                Ketuk di sini untuk manjain Roy! Sudah dielus {petCount} kali
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#714436] text-[20px]">touch_app</span>
        </div>

        {/* Habitat & Interactive Coordinates Section */}
        <div className="bg-white p-4 rounded-3xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[20px] text-[#714436]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pin_drop
              </span>
              <h3 className="font-extrabold text-sm text-[#1c1c18]">Habitat & Koordinat</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F1EDE7] text-[#514440]">
              {capybara.accuracyTime || 'Akurat 2 Jam Lalu'}
            </span>
          </div>

          {/* Map Preview */}
          <div
            className="w-full h-40 bg-[#EBE8E2] rounded-2xl relative overflow-hidden flex items-end p-3 shadow-inner bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA33XP8eCfVyYUB7L30Cwh3PAqhDzYF_F8ApVowV3JR8_OD0079dl4ipVzMPk30P5V8JLP6baOh7bVU0YBGkkuy39nghkoYx8I05-9ymxeJmzNBl391i_EIujER5hI7OMriYs-x3HoO7IDJwNqpPdWdEqMilvP48Ye1fTs1eV2ND8Qp-ri3oH5Oa5XkyOc7xFnHxEX0uIb_1FL_XgGvb3g9t_QWpVK2OT_PoEFcmCQ4sQEL4uWdZAOkNg')`,
            }}
          >
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md flex items-center justify-between w-full border border-white/50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-[#714436]">
                  water_drop
                </span>
                <span className="text-xs font-bold text-[#1c1c18] truncate">
                  {capybara.habitatZone}
                </span>
              </div>
              <span className="text-xs font-black text-[#17677A] whitespace-nowrap">
                ±{capybara.distanceMeters}m
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={onOpenNavigation}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#714436] text-white font-bold text-xs active:scale-95 transition-all shadow-xs hover:bg-[#6D4336]"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <span>Navigasi</span>
            </button>
            <button
              onClick={() => {
                setIsSavedSpot(!isSavedSpot);
                triggerToast(
                  !isSavedSpot
                    ? 'Spot Masbro Roy disimpan ke daftar kunjungan Devia! 📍'
                    : 'Spot dihapus dari simpanan'
                );
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#F1EDE7] text-[#1c1c18] font-bold text-xs active:scale-95 transition-all hover:bg-[#E6E2DC]"
            >
              <span
                className="material-symbols-outlined text-[18px] text-[#714436]"
                style={{ fontVariationSettings: isSavedSpot ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isSavedSpot ? 'bookmark' : 'bookmark_border'}
              </span>
              <span>{isSavedSpot ? 'Tersimpan' : 'Simpan Spot'}</span>
            </button>
          </div>
        </div>

        {/* Fakta Gemas Roy (Catatan untuk Devia 💖) */}
        <div className="bg-white p-4 rounded-3xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">✨</span>
              <h3 className="font-extrabold text-sm text-[#1c1c18]">Fakta Gemas Roy</h3>
            </div>
            <span className="text-[10px] font-bold text-[#714436] bg-[#ffdbd0] px-2.5 py-0.5 rounded-full">
              Catatan untuk Devia 💖
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F3ED] flex items-start gap-3 border border-[#8D5B4C]/10">
            <div className="w-8 h-8 rounded-full bg-[#ffe1d8] text-[#714436] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </div>
            <p className="text-xs text-[#1c1c18] leading-relaxed">
              {capybara.deviaNote ||
                'Paling manja kalau dielus dagunya! Kalau Devia datang dan panggil namanya lembut-lembut, Roy suka langsung pejam mata dan rebahan santai di dekat tepian kolam. 🌸'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F3ED] flex items-start gap-3 border border-[#8D5B4C]/10">
            <div className="w-8 h-8 rounded-full bg-[#a3e7fd] text-[#17677A] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </div>
            <p className="text-xs text-[#1c1c18] leading-relaxed">
              {capybara.deviaSchedule ||
                'Jadwal me-time berendam air hangat favoritnya: pukul 09.30 - 11.30 WIB dengan yuzu segar di kepala 🍊🫧'}
            </p>
          </div>
        </div>

        {/* Foto Kiriman Komunitas */}
        <div className="bg-white p-4 rounded-3xl shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#17677A]">
                photo_camera
              </span>
              <h3 className="font-extrabold text-sm text-[#1c1c18]">Kiriman Komunitas</h3>
            </div>
            <button
              onClick={onOpenGallery}
              className="text-xs font-bold text-[#714436] hover:underline"
            >
              Lihat Semua ({capybara.communityPosts?.length || 24})
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {capybara.communityPosts?.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={onOpenGallery}
                className="flex flex-col gap-1.5 cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#EBE8E2] shadow-xs group-hover:ring-2 group-hover:ring-[#714436] transition-all">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col px-0.5">
                  <span className="text-[11px] font-bold text-[#1c1c18] truncate">
                    {post.author}
                  </span>
                  <span className="text-[10px] text-[#84746f]">{post.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom Island Actions */}
      <div className="fixed bottom-3 inset-x-0 px-4 z-40 max-w-md mx-auto pointer-events-none">
        <div className="bg-[#FAF6F0]/90 backdrop-blur-xl p-2 rounded-full shadow-[0_8px_24px_-4px_rgba(109,67,54,0.2)] flex items-center justify-between gap-2 pointer-events-auto border border-[#8D5B4C]/20">
          <button
            onClick={handleFeed}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#714436] text-white font-bold text-xs active:scale-95 transition-all shadow-xs hover:bg-[#6D4336]"
          >
            <span className="text-[18px]">🍉</span>
            <span>Suapi Semangka Potong 🍉 ({capybara.snackCount}x)</span>
          </button>
          <button
            aria-label="Kirim Peluk Virtual & Bagikan"
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-[#a3e7fd] text-[#17677A] flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-xs hover:bg-[#8cd0e6]"
            title="Kirim Peluk Virtual 🐾"
          >
            <CapyPawBadge size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
