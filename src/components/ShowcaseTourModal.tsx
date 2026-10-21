import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X, Play, CheckCircle } from 'lucide-react';

export interface TourStep {
  title: string;
  badge: string;
  description: string;
  targetId: string;
  actionPrompt?: string;
  actionType?: 'snack' | 'nav' | 'map' | 'sound';
}

interface ShowcaseTourModalProps {
  isOpen: boolean;
  currentStepIndex: number;
  totalSteps: number;
  step: TourStep;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onTriggerAction?: (actionType: string) => void;
}

export const TOUR_STEPS: TourStep[] = [
  {
    title: 'Hero Foto & Verifikasi Status',
    badge: '1 dari 6 • Kartu Utama',
    description:
      'Foto otentik Masbro Roy berendam di onsen air hangat dengan buah yuzu di kepalanya. Dilengkapi status real-time (♨️ Sedang Berendam) dan verifikasi komunitas penjaga satwa.',
    targetId: 'tour-hero',
    actionPrompt: 'Ganti Slide Foto',
  },
  {
    title: 'Chill-o-Meter & Filosofi Zen',
    badge: '2 dari 6 • Indikator Ketenangan',
    description:
      'Skor 9.9/10 merepresentasikan tingkat ketenangan maksimal capybara. Dilengkapi deskripsi perilaku harian yang ramah dan anti rewel terhadap pengunjung.',
    targetId: 'tour-chill',
  },
  {
    title: '2x2 Grid Informasi Hayati',
    badge: '3 dari 6 • Data Ringkas',
    description:
      'Ergonomi kartu 2 kolom yang memudahkan pemindaian cepat satu tangan: Usia 3.5 Tahun, Makanan Favorit (Semangka & Kangkung), Circle Teman (Bebek & Kura), serta Status Mood Nirwana Pagi.',
    targetId: 'tour-stats',
  },
  {
    title: 'Habitat, Koordinat & Navigasi',
    badge: '4 dari 6 • Peta Lokasi',
    description:
      'Peta visual Danau Bambu Kolam 2 (±120m) dengan petunjuk fasilitas sekitar. Pengguna dapat langsung menekan tombol "Navigasi" untuk memulai panduan langkah demi langkah.',
    targetId: 'tour-habitat',
    actionPrompt: 'Uji Navigasi Rute Langsung',
    actionType: 'nav',
  },
  {
    title: 'Interaksi Beri Cemilan (142)',
    badge: '5 dari 6 • Micro-interaction',
    description:
      'Tombol aksi utama di bagian bawah layar. Setiap ketukan memicu partikel semangka melayang, getaran suara Web Audio kalimba yang menenangkan, dan penambahan counter komunitas.',
    targetId: 'tour-snack',
    actionPrompt: 'Coba Beri Cemilan Sekarang 🍉',
    actionType: 'snack',
  },
  {
    title: 'Eksplorasi Layar & Soundscape Zen',
    badge: '6 dari 6 • Multi-Screen',
    description:
      'Aplikasi juga memiliki layar Jelajah (daftar capybara lain seperti Mpok Luna & Baron), Peta Onsen interaktif dengan zoom, Galeri Kiriman Komunitas, dan pemutar Suara Onsen Alami.',
    targetId: 'tour-screens',
    actionPrompt: 'Buka Peta Onsen Interaktif 🗺️',
    actionType: 'map',
  },
];

export const ShowcaseTourModal: React.FC<ShowcaseTourModalProps> = ({
  isOpen,
  currentStepIndex,
  totalSteps,
  step,
  onNext,
  onPrev,
  onClose,
  onTriggerAction,
}) => {
  if (!isOpen) return null;

  const isLast = currentStepIndex === totalSteps - 1;
  const isFirst = currentStepIndex === 0;

  return (
    <div className="fixed inset-x-0 bottom-20 sm:bottom-6 z-50 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-3xl shadow-2xl border-2 border-[#8D5B4C]/30 p-4 sm:p-5 pointer-events-auto flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#8D5B4C] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#8D5B4C] uppercase tracking-wider block">
                {step.badge}
              </span>
              <h3 className="font-extrabold text-sm text-[#1c1c18] leading-tight">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3ECE2] text-[#514440] transition-colors"
            aria-label="Tutup tur panduan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description body */}
        <p className="text-xs text-[#2c2623] leading-relaxed">
          {step.description}
        </p>

        {/* Optional Action trigger button */}
        {step.actionPrompt && step.actionType && (
          <button
            onClick={() => onTriggerAction?.(step.actionType!)}
            className="py-2 px-3 rounded-full bg-[#E0F2F1] hover:bg-[#ccebea] text-[#17677A] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#17677A]/20 transition-all shadow-2xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{step.actionPrompt}</span>
          </button>
        )}

        {/* Footer with Step progress & Navigation buttons */}
        <div className="pt-2 border-t border-[#e6e2dc] flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <span
                key={idx}
                className={`transition-all rounded-full ${
                  currentStepIndex === idx
                    ? 'w-5 h-1.5 bg-[#8D5B4C]'
                    : 'w-1.5 h-1.5 bg-[#d6c2bd]'
                }`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={onPrev}
                className="p-2 rounded-full bg-[#f1ede7] text-[#514440] hover:bg-[#ebe8e2] transition-colors"
                aria-label="Langkah sebelumnya"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onNext}
              className="py-2 px-4 rounded-full bg-[#714436] hover:bg-[#6D4336] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{isLast ? 'Selesai Tur' : 'Lanjut'}</span>
              {isLast ? <CheckCircle className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
