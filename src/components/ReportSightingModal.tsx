import React, { useState } from 'react';
import { SightingReport, UserProfile } from '../types';
import { playPopSound, playSnackSound, playCapySqueak, playSparkleSound } from '../utils/zenAudio';
import { CapyLogo, CapyPawBadge } from './CapyIcons';

interface ReportSightingModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onSubmitReport: (report: SightingReport) => void;
}

export const ReportSightingModal: React.FC<ReportSightingModalProps> = ({
  isOpen,
  userProfile,
  onClose,
  onSubmitReport,
}) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Kolam Onsen Lembah Hijau');
  const [activity, setActivity] = useState('Berendam Jeruk');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAzXxsJCOwwGSPfCjUYjv-vLuRdJFo-SbEfrrRwmMuR8xW0Frnt9NB1Uyws21K3k28zlO00CIC52JIkN21bG-Mo0_gwQWoWxzXTSBG5kIC0hImIRW5Xwet5jOrKAd3dnosmHehAWfV4MoxNpXCCcyw4bj-zp3BNA9RKePBSz--WY2jCYHEmg6aFR6dlJZelW3qkf4-e6pNte5YO57EPaZ6tggltmXiNb-ZSMQiVhzzq3qnWa87qUZqmxQ'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    playPopSound();
    playSnackSound();
    playCapySqueak();
    playSparkleSound();

    const newReport: SightingReport = {
      id: `sight-${Date.now()}`,
      author: userProfile.username || '@devia.imup',
      authorVerified: true,
      timeAgo: 'Baru saja',
      image: selectedPhoto,
      caption: caption.trim(),
      location: location,
      distance: '100m',
      gemesCount: 1,
      isLiked: true,
      capyId: 'roy',
    };

    onSubmitReport(newReport);
    onClose();
  };

  const samplePhotos = [
    {
      label: 'Roy Nyelam 🤿',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzXxsJCOwwGSPfCjUYjv-vLuRdJFo-SbEfrrRwmMuR8xW0Frnt9NB1Uyws21K3k28zlO00CIC52JIkN21bG-Mo0_gwQWoWxzXTSBG5kIC0hImIRW5Xwet5jOrKAd3dnosmHehAWfV4MoxNpXCCcyw4bj-zp3BNA9RKePBSz--WY2jCYHEmg6aFR6dlJZelW3qkf4-e6pNte5YO57EPaZ6tggltmXiNb-ZSMQiVhzzq3qnWa87qUZqmxQ',
    },
    {
      label: 'Keluarga Bimo 🌿',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEt1AvkKixF0dRQudvLzZg5doX0CSoY2EY2bKFCE4iwJVW4-zJl-mPUayMRWSCexqDsYXGqhiW22Y6Zmq8P5TyXLh0P4VdzTEiW55BqAAE0qalhTU1HocSrvWtMuuBlWasYDpYKtQ45vOyU_sJ3Oo5pGlLGPdzjc-Mpr2Cms6Uo8xLnfnDJ3b2ebOvypWjFPnGHIbS5PgcbjCiSE1PzpHo0N-spf1JE9dXIYM0FV7C9KCJOQQCmA7CLg',
    },
    {
      label: 'Mochi Nyam 🍉',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmN82U-f3ciIPvhnahIvbv7buunAvWlIgWfGiMpNR8-y1LkYDuYAq4SWLUhN2YPljRDK9VDvuUcfbUQknyQFqg_dUFpWH8wH6AxA3YDLx1ocMiqKZKht2rgaDI7Pxzbr8NRSriaNK9yoxJOqh4DLc0JMDAiMjhTRHt75oCtLnehTlGdhUz7iXvEX95eLPLxzAHQo35OdQqitAJzDdVRd79RH5SzuSYlJiZYjBUstUsbzDE50i6hiO0oA',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#8D5B4C]/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CapyLogo size={34} withSparkle={true} />
            <div>
              <h3 className="font-extrabold text-base text-[#1c1c18]">Lapor Temuan Masbro 🐾</h3>
              <p className="text-[11px] text-[#514440]">
                Bagikan momen lucu capybara yang Devia temui hari ini
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Photo Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1c1c18]">Pilih Foto Dokumentasi</label>
            <div className="grid grid-cols-3 gap-2">
              {samplePhotos.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(p.url)}
                  className={`rounded-2xl overflow-hidden aspect-square relative cursor-pointer border-2 transition-all ${
                    selectedPhoto === p.url
                      ? 'border-[#714436] ring-2 ring-[#714436]/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 inset-x-1 text-center bg-black/60 text-white text-[9px] rounded-md py-0.5 truncate px-1">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1c1c18]">Apa yang Lagi Dilakukan Masbro?</label>
            <textarea
              required
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Contoh: Roy lagi berendam yuzu sambil bobo siang tenang banget~ ✨"
              className="w-full bg-white rounded-2xl p-3 text-xs text-[#1c1c18] border border-[#8D5B4C]/20 focus:outline-none focus:ring-2 focus:ring-[#8D5B4C]/30 resize-none font-medium"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1c1c18]">Lokasi Kolam / Habitat</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white rounded-2xl px-3.5 py-2.5 text-xs text-[#1c1c18] border border-[#8D5B4C]/20 focus:outline-none focus:ring-2 focus:ring-[#8D5B4C]/30 font-medium"
            />
          </div>

          {/* Activity selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1c1c18]">Aktivitas Utama</label>
            <div className="flex flex-wrap gap-2">
              {['Berendam Jeruk 🍊', 'Makan Semangka 🍉', 'Bobo Siang 💤', 'Berenang Bebek 🦆'].map(
                (act) => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => setActivity(act)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activity === act
                        ? 'bg-[#315832] text-white shadow-xs'
                        : 'bg-white text-[#514440] border border-[#8D5B4C]/15 hover:bg-[#F1EDE7]'
                    }`}
                  >
                    {act}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Bonus CapyHeart note */}
          <div className="bg-[#ffdbd0]/50 rounded-2xl p-3 flex items-center gap-2 border border-[#8D5B4C]/10 text-xs text-[#714436]">
            <span className="text-xl">💖</span>
            <span className="font-semibold">
              Laporanmu akan memberi Devia +25 CapyHeart untuk menaikkan level Ranger!
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#714436] hover:bg-[#6D4336] text-white font-extrabold text-sm shadow-md active:scale-95 transition-all mt-1"
          >
            Kirim Laporan Gemoy 🐾
          </button>
        </form>
      </div>
    </div>
  );
};

