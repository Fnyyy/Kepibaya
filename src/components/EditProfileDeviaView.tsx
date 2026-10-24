import React, { useState } from 'react';
import { UserProfile } from '../types';
import { playPopSound, playSnackSound, playSparkleSound, playCapySqueak } from '../utils/zenAudio';
import {
  CapyLogo,
  CapyIconOnsen,
  CapyIconWatermelon,
  CapyIconSleeping,
  CapyIconLove,
  CapyPawBadge,
} from './CapyIcons';

interface EditProfileDeviaViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onBack: () => void;
}

const MASCOT_OPTIONS = [
  {
    id: 'chibi-devia',
    label: 'Devia Capy ❤️',
    name: 'Devia Chibi Masbro',
    img: '/assets/mascot_devia_capy.jpg',
    bgColor: 'bg-[#ffe1d8]',
  },
  {
    id: 'yuzu',
    label: 'Yuzu 🍊',
    name: 'Yuzu Soaker',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS672THyWvmj6KL8rqykMtmMbo-wN2jUhlBXLyBBORXVi6RqQvnGxt8fJu0WSiMKm2YRBHcuTRqjw6Zxc1rglEfxoK6x-jLFv7IKwkLtcV3V2AxsAitYTCVXRycvG6LJIStNKkiAfxP-xwxI3v2YPQKk1xxKlfFo-PnyEjcwRs_v82AcbIka1y1PJ1M-pwsgT_J81U2qdAwejwAzC_GyC1nMBmrvZpYZPvG_Jb6FPx',
    bgColor: 'bg-[#a3e7fd]',
  },
  {
    id: 'melon',
    label: 'Melon 🍉',
    name: 'Watermelon Snack',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaPKyXQbcNCP0tP2YsXYtQvEiyij-VioG_oPyCD2DunYvK9EVu-6M6rHXwrBTbF41izTQUcgSkFgT8imHo3z2H9AE75MMklpFTcqfMQwLv7tjfSibIMt_DmEDvAkVnSS2dQgqfRdtRxKzcUZJk_zDLpW4LxJxXC9md96pxlGQhkGDLzECriFkU55u6ca3uETVSOCxn9UROXjiBXrc1ckjBFm3U4xS98Bi17L66PQmc',
    bgColor: 'bg-[#ffdad6]',
  },
  {
    id: 'onsen',
    label: 'Onsen ♨️',
    name: 'Onsen Royalty',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa06RqQX3WfxrhuDgV1iWPw50tZDTVz0b1PxGtTIyuLcNflE9N6LdC31MBgBucFZPXu0H5K06wF_yqtoOgctXN7KgyERNRmQbNWEORBKnoBmFAKvpLRDHFYsmeXm3Fs4psTvLVxyn4vZQazBHmeiBwJbVIIv5x0m4QIR3nIVby6xo7cchZcLhQ5jqluq3Nm0bBpaUenOdNxf1IQ9rbGRaxoDf5QOiftOgotYlB_qrq',
    bgColor: 'bg-[#b1ebff]',
  },
  {
    id: 'ranger',
    label: 'Ranger 🌿',
    name: 'Grass Explorer',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDet50aZ6x_BINFOOUjCRo7hfbYfCE0sT7K7zHkUxJjLcUiA2LBY3TZbLha6AwaH5M0-gYAcF19mzejJVE0LyL768CMCJcxdh8ufq2GaUK-NK9AW5C5WTikzg3z4qRjRgKcK_935cDHFhIDwn1CH9isOXk0VSpi0rizGv_fD-pkoNJ_4aTpx_KfsleWy8SrzpHXZCZj2qpjhx6EOefv7HpVkCth-WJtBtxLgqGenv7u',
    bgColor: 'bg-[#c1eebc]',
  },
];

export const EditProfileDeviaView: React.FC<EditProfileDeviaViewProps> = ({
  profile,
  onUpdateProfile,
  onBack,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [showMascotPicker, setShowMascotPicker] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Profil imut Devia & Masbro sudah diupdate 🍊');
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const triggerToast = (msg?: string) => {
    if (msg) setToastMessage(msg);
    setShowToast(true);
    playPopSound();
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    playSparkleSound();
    triggerToast('Yuhuu tersimpan! ✨ Profil imut Devia & Masbro sudah diupdate 🍊🌸');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
        playSparkleSound();
        triggerToast('Foto cantik Devia berhasil dipasang! 📸✨');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectMascot = (mascot: (typeof MASCOT_OPTIONS)[0]) => {
    setFormData((prev) => ({ ...prev, avatarUrl: mascot.img }));
    playSnackSound();
    triggerToast(`Avatar ${mascot.label} Masbro gemoy dipilih! 🐾`);
  };

  const handleResetAvatar = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: null }));
    triggerToast('Foto profil dikosongkan kembali! ✨');
  };

  const foodChips = [
    { id: 'semangka', label: 'Semangka Manis', emoji: '🍉' },
    { id: 'yuzu', label: 'Yuzu Hangat', emoji: '🍊' },
    { id: 'kangkung', label: 'Kangkung Kriuk', emoji: '🌿' },
    { id: 'jagung', label: 'Jagung Rebus', emoji: '🌽' },
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen flex flex-col antialiased text-[#1c1c18] pb-12">
      {/* Interactive Toast Notification */}
      <div
        className={`fixed top-20 inset-x-4 max-w-sm mx-auto z-50 transition-all duration-300 flex items-center justify-between p-4 rounded-2xl bg-[#315832] text-white shadow-2xl ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-28 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[26px]">verified</span>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Yuhuu berhasil! ✨</span>
            <span className="text-xs opacity-90">{toastMessage}</span>
          </div>
        </div>
        <span className="text-xl">🌸</span>
      </div>

      {/* Header with CapyLogo */}
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
                  triggerToast('Halo Devia! 🐾');
                }}
                className="cursor-pointer active:scale-95 transition-transform"
              >
                <CapyLogo size={36} withSparkle={false} />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm text-[#1c1c18] flex items-center gap-1 leading-tight">
                  Masbro Roy <span className="text-[13px]">✨</span>
                </h1>
                <span className="text-[10px] text-[#714436] font-bold tracking-tight flex items-center gap-1">
                  <span>💖</span> Devia Imup's Favorite Capy
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#EBE8E2] overflow-hidden flex items-center justify-center text-[#514440] shadow-xs">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Devia" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[20px]">person</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-3 flex flex-col gap-4">
        {/* Screen Sub-Header Action Bar */}
        <section className="flex items-center justify-between pt-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-[#1c1c18]">Edit Profil Devia</span>
            <span className="text-[20px] animate-bounce">🌸</span>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-full bg-[#8D5B4C] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 hover:bg-[#714436]"
          >
            <span>Simpan</span>
            <span className="text-[13px]">✨</span>
          </button>
        </section>

        {/* Section: Avatar & Photo Customizer */}
        <section className="w-full">
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#8D5B4C]/10 flex flex-col items-center text-center relative overflow-hidden">
            {/* Decorative Backdrop Circles */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#a3e7fd]/20 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#ffdbd0]/30 blur-xl pointer-events-none"></div>

            {/* Avatar Preview Frame */}
            <div className="relative group my-2">
              <div className="w-32 h-32 rounded-full bg-[#EBE8E2] p-1 shadow-md flex items-center justify-center relative">
                {/* Inner Picture Container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-[#ffdbd0] flex items-center justify-center transition-all duration-300 relative">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Foto Devia"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Profil dikosongkan dulu seperti permintaan user:
                    <div className="w-full h-full bg-[#F7F3ED] flex flex-col items-center justify-center relative">
                      <span className="material-symbols-outlined text-[54px] text-[#714436]/50">
                        person
                      </span>
                      <div className="flex items-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] text-[#514440] font-bold shadow-xs">
                        <span>✨</span>
                        <span>Belum ada foto</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Cam Floating Pill */}
                <button
                  aria-label="Ubah Foto Profil"
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#714436] text-white shadow-lg flex items-center justify-center active:scale-90 transition-transform hover:bg-[#6D4336]"
                  onClick={() => setShowMascotPicker((prev) => !prev)}
                >
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute -top-1 right-0 bg-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-[#8D5B4C]/10">
                <span className="text-[12px]">🍊</span>
                <span className="text-[11px] text-[#714436] font-extrabold">Imup</span>
              </div>
            </div>

            {/* User Status Info */}
            <h2 className="font-black text-lg text-[#1c1c18] mt-2 flex items-center gap-1.5">
              {formData.fullName} <span className="text-[15px]">💖</span>
            </h2>
            <p className="text-xs text-[#514440] max-w-[280px] mt-0.5 leading-relaxed">
              Foto profil utama akan terlihat di papan temu Masbro & radar teman santai.
            </p>

            {/* Action Buttons for Photos */}
            <div className="w-full grid grid-cols-1 gap-2.5 mt-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded-full bg-[#F1EDE7] hover:bg-[#E6E2DC] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[#1c1c18] text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[18px] text-[#714436]">
                  photo_library
                </span>
                <span>Pilih Foto Cantik Devia 📸</span>
              </button>

              <button
                onClick={() => setShowMascotPicker((prev) => !prev)}
                className="w-full py-2.5 px-4 rounded-full bg-[#a3e7fd]/70 hover:bg-[#a3e7fd] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[#17677A] text-xs font-black shadow-xs"
              >
                <span className="text-[16px]">🍊</span>
                <span>Pilih Avatar Masbro Gemoy</span>
              </button>

              {formData.avatarUrl && (
                <button
                  onClick={handleResetAvatar}
                  className="text-[11px] text-[#ba1a1a] hover:underline font-semibold mt-1"
                >
                  Kosongkan Foto Profil Kembali
                </button>
              )}
            </div>

            {/* Friendly Tips Banner */}
            <div className="mt-4 w-full bg-[#F7F3ED] rounded-2xl p-3 flex items-start gap-2.5 text-left border border-[#8D5B4C]/10">
              <span className="material-symbols-outlined text-[18px] text-[#714436] mt-0.5 shrink-0">
                lightbulb
              </span>
              <p className="text-xs text-[#514440] leading-snug">
                Format JPG / PNG maksimal 5MB. Foto senyum paling manis bareng masbro yaa~ ✨
              </p>
            </div>
          </div>
        </section>

        {/* Mascot Capybara Avatar Quick Selector Drawer */}
        {showMascotPicker && (
          <section className="w-full animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-[#EBE8E2] rounded-3xl p-4 shadow-sm border border-[#8D5B4C]/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#1c1c18]">Pilihan Maskot Masbro</span>
                  <span className="text-[14px]">🐾</span>
                </div>
                <button
                  onClick={() => setShowMascotPicker(false)}
                  className="text-[#514440] text-sm font-bold w-6 h-6 rounded-full hover:bg-white/60 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {MASCOT_OPTIONS.map((mascot) => (
                  <button
                    key={mascot.id}
                    onClick={() => handleSelectMascot(mascot)}
                    className="flex flex-col items-center p-2 rounded-2xl bg-white hover:ring-2 hover:ring-[#714436] active:scale-95 transition-all shadow-xs"
                  >
                    <div
                      className={`w-12 h-12 rounded-full overflow-hidden mb-1 ${mascot.bgColor} flex items-center justify-center p-0.5`}
                    >
                      <img
                        src={mascot.img}
                        alt={mascot.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#1c1c18]">{mascot.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section: Paspor Capy Explorer Devia (Statistik Jelas & Lengkap) */}
        <section className="w-full">
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CapyPawBadge size={22} className="text-[#714436]" />
                <h3 className="font-extrabold text-sm text-[#1c1c18]">
                  Paspor Sahabat Capy Devia
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#315832] bg-[#c1eebc] px-2 py-0.5 rounded-full">
                Terverifikasi ✨
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#FAF6F0] p-3 rounded-2xl flex items-center gap-2.5 border border-[#8D5B4C]/10">
                <CapyIconOnsen size={32} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#514440] font-bold uppercase">Waktu Santai</span>
                  <span className="text-xs font-black text-[#1c1c18]">450 Menit Onsen</span>
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-2xl flex items-center gap-2.5 border border-[#8D5B4C]/10">
                <CapyIconWatermelon size={32} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#514440] font-bold uppercase">Cemilan Disuap</span>
                  <span className="text-xs font-black text-[#1c1c18]">180+ Potong</span>
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-2xl flex items-center gap-2.5 border border-[#8D5B4C]/10">
                <CapyIconLove size={32} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#514440] font-bold uppercase">Capy Disapa</span>
                  <span className="text-xs font-black text-[#1c1c18]">5 Ekor Gembul</span>
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-2xl flex items-center gap-2.5 border border-[#8D5B4C]/10">
                <CapyIconSleeping size={32} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#514440] font-bold uppercase">Tidur Bareng</span>
                  <span className="text-xs font-black text-[#1c1c18]">100% Bebas Cemas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Form Data Pengguna Gemoy */}
        <section className="w-full flex flex-col gap-3">
          {/* Ranger Level Showcase Card */}
          <div className="bg-gradient-to-r from-[#ffdbd0] to-[#F1EDE7] rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                <CapyLogo size={36} withSparkle={false} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#714436] font-black uppercase tracking-wider">
                  Gelar Ranger Saat Ini
                </span>
                <span className="font-extrabold text-base text-[#1c1c18] leading-tight">
                  {formData.rangerTitle}
                </span>
                <span className="text-xs text-[#514440] flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-[#315832]">✨ Capy Bestie</span>
                  <span>•</span>
                  <span className="font-black text-[#714436]">
                    {formData.capyHearts} CapyHeart
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowBadgeModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#714436] font-bold text-xs shadow-xs active:scale-95 hover:bg-[#FAF6F0] transition-all"
            >
              Lihat Badge
            </button>
          </div>

          {/* Main Input Fields Container */}
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-4">
            {/* Field 1: Nama Lengkap */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-xs text-[#1c1c18] flex items-center gap-1"
                htmlFor="input-fullname"
              >
                <span>Nama Lengkap</span>
                <span className="text-[13px]">🌸</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="input-fullname"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nama lengkap Devia..."
                  className="w-full bg-[#F7F3ED] rounded-2xl px-4 py-2.5 text-[#1c1c18] text-sm font-semibold placeholder-[#84746f] outline-none focus:bg-[#F1EDE7] focus:ring-2 focus:ring-[#8D5B4C]/20 transition-all pr-10"
                />
                <span className="material-symbols-outlined absolute right-3 text-[#714436] text-[20px]">
                  sentiment_satisfied
                </span>
              </div>
            </div>

            {/* Field 2: Nickname Ranger */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-xs text-[#1c1c18] flex items-center gap-1"
                htmlFor="input-nickname"
              >
                <span>Nama Panggilan / Nickname Ranger</span>
                <span className="text-[13px]">🐾</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="input-nickname"
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="Nickname ranger santai..."
                  className="w-full bg-[#F7F3ED] rounded-2xl px-4 py-2.5 text-[#1c1c18] text-sm font-semibold placeholder-[#84746f] outline-none focus:bg-[#F1EDE7] focus:ring-2 focus:ring-[#8D5B4C]/20 transition-all pr-10"
                />
                <span className="text-[18px] absolute right-3">🍊</span>
              </div>
            </div>

            {/* Field 3: Bio Santai */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="font-bold text-xs text-[#1c1c18] flex items-center gap-1"
                  htmlFor="input-bio"
                >
                  <span>Bio / Status Santai</span>
                  <span className="text-[13px]">🍉</span>
                </label>
                <span
                  className={`text-[11px] font-bold ${
                    formData.bio.length >= 140 ? 'text-[#ba1a1a]' : 'text-[#84746f]'
                  }`}
                >
                  {formData.bio.length}/150
                </span>
              </div>
              <textarea
                id="input-bio"
                rows={3}
                maxLength={150}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tuliskan kecintaanmu pada capybara..."
                className="w-full bg-[#F7F3ED] rounded-2xl p-3 text-[#1c1c18] text-xs font-normal placeholder-[#84746f] outline-none focus:bg-[#F1EDE7] focus:ring-2 focus:ring-[#8D5B4C]/20 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Field 4: Camilan Favorit Masbro (Chips Selector) */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-xs text-[#1c1c18] flex items-center gap-1">
                <span>Camilan Masbro Favorit</span>
                <span className="text-[13px]">✨</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {foodChips.map((chip) => {
                  const isSelected = formData.favoriteSnack === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, favoriteSnack: chip.id });
                        playSnackSound();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#714436] text-white shadow-xs'
                          : 'bg-[#F7F3ED] text-[#1c1c18] hover:bg-[#F1EDE7]'
                      }`}
                    >
                      <span>{chip.label}</span>
                      <span>{chip.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 5: Akun Sosial Media */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-xs text-[#1c1c18] flex items-center gap-1"
                htmlFor="input-social"
              >
                <span>Akun Sosial / Kontak Explorer</span>
                <span className="text-[13px]">💬</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-bold text-[#84746f]">
                  IG/TikTok:
                </span>
                <input
                  id="input-social"
                  type="text"
                  value={formData.socialContact}
                  onChange={(e) => setFormData({ ...formData, socialContact: e.target.value })}
                  className="w-full bg-[#F7F3ED] rounded-2xl pl-24 pr-4 py-2.5 text-[#1c1c18] text-sm font-semibold placeholder-[#84746f] outline-none focus:bg-[#F1EDE7] focus:ring-2 focus:ring-[#8D5B4C]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Preferensi Privasi & Kenyamanan (Toggles) */}
        <section className="w-full">
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#8D5B4C]/10 flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#714436] text-[20px]">tune</span>
              <h3 className="font-extrabold text-sm text-[#1c1c18]">
                Preferensi Privasi & Kenyamanan
              </h3>
            </div>

            {/* Toggle 1: Sembunyikan Lokasi */}
            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#c1eebc] flex items-center justify-center text-[#002106] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">location_off</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs text-[#1c1c18] flex items-center gap-1">
                    Sembunyikan Lokasi Rumah 🌿
                  </span>
                  <span className="text-[11px] text-[#514440] truncate">
                    Hanya koordinat area umum yang tampak saat sighting
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.hideHomeLocation}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    hideHomeLocation: !prev.hideHomeLocation,
                  }))
                }
                className={`w-12 h-7 rounded-full p-1 transition-colors relative shrink-0 ${
                  formData.hideHomeLocation ? 'bg-[#315832]' : 'bg-[#E6E2DC]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] transform transition-transform ${
                    formData.hideHomeLocation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  🐾
                </div>
              </button>
            </div>

            {/* Toggle 2: Notifikasi Masbro Dekat */}
            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#a3e7fd] flex items-center justify-center text-[#17677A] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs text-[#1c1c18] flex items-center gap-1">
                    Notifikasi Masbro Dekat Sini 🔔
                  </span>
                  <span className="text-[11px] text-[#514440] truncate">
                    Getar lembut saat ada capybara santai dalam 1km
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.nearbyNotification}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    nearbyNotification: !prev.nearbyNotification,
                  }))
                }
                className={`w-12 h-7 rounded-full p-1 transition-colors relative shrink-0 ${
                  formData.nearbyNotification ? 'bg-[#17677a]' : 'bg-[#E6E2DC]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] transform transition-transform ${
                    formData.nearbyNotification ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  🔔
                </div>
              </button>
            </div>

            {/* Toggle 3: Mode Zen */}
            <div className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#F1EDE7] flex items-center justify-center text-[#514440] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">volume_off</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs text-[#1c1c18] flex items-center gap-1">
                    Mode Zen Tanpa Suara 🤫
                  </span>
                  <span className="text-[11px] text-[#514440] truncate">
                    Semua efek riak air & kicau burung diredam
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.zenMode}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    zenMode: !prev.zenMode,
                  }))
                }
                className={`w-12 h-7 rounded-full p-1 transition-colors relative shrink-0 ${
                  formData.zenMode ? 'bg-[#714436]' : 'bg-[#E6E2DC]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] transform transition-transform ${
                    formData.zenMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  💤
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Section: Bottom Primary Actions & Log Out */}
        <section className="flex flex-col items-center gap-3 pt-2">
          {/* Big Cute Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-3xl bg-[#714436] hover:bg-[#6D4336] text-white font-extrabold text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Simpan Perubahan Gemoy</span>
            <span className="text-[18px]">🌸✨</span>
          </button>

          {/* Friendly Session Exit */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Sudah cukup santainya hari ini bareng Masbro? Devia mau istirahat? 🌸'
                )
              ) {
                onBack();
              }
            }}
            className="py-2 px-4 rounded-full text-[#514440] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors text-xs font-bold flex items-center gap-1.5 opacity-80"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar Sesi Santai</span>
          </button>

          <div className="text-center pt-2">
            <span className="text-[11px] text-[#84746f] tracking-wide font-medium">
              CapyFinder v2.4 • Dibuat dengan cinta untuk Devia Imup 🐾
            </span>
          </div>
        </section>
      </main>

      {/* Badge Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-[#8D5B4C]/20 flex flex-col items-center animate-in zoom-in-95 duration-200">
            <span className="text-4xl mb-2">🏆</span>
            <h3 className="font-black text-lg text-[#1c1c18]">Badge Devia & Masbro</h3>
            <p className="text-xs text-[#514440] mt-1 mb-4">
              Devia sudah menemani Masbro Roy berendam dan makan semangka selama 450 menit!
            </p>
            <div className="grid grid-cols-3 gap-2 w-full mb-5">
              <div className="p-3 rounded-2xl bg-[#ffdbd0] flex flex-col items-center gap-1">
                <CapyLogo size={32} withSparkle={false} />
                <span className="text-[10px] font-bold">Penjaga Yuzu</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#a3e7fd] flex flex-col items-center gap-1">
                <CapyIconOnsen size={32} />
                <span className="text-[10px] font-bold">Master Onsen</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#c1eebc] flex flex-col items-center gap-1">
                <CapyIconWatermelon size={32} />
                <span className="text-[10px] font-bold">Kawan Semangka</span>
              </div>
            </div>
            <button
              onClick={() => setShowBadgeModal(false)}
              className="w-full py-2.5 rounded-full bg-[#714436] text-white font-bold text-xs"
            >
              Tutup & Lanjut Santai 🐾
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
