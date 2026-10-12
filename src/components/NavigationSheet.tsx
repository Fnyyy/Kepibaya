import React, { useState, useEffect } from 'react';
import { X, Navigation, Compass, Footprints, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { Capybara } from '../types';
import { playZenBell } from '../utils/zenAudio';

interface NavigationSheetProps {
  capybara: Capybara;
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationSheet: React.FC<NavigationSheetProps> = ({ capybara, isOpen, onClose }) => {
  const [distanceRemaining, setDistanceRemaining] = useState(capybara.distanceMeters);
  const [currentStep, setCurrentStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const steps = [
    { instruction: 'Mulai berjalan dari Gazebo Informasi Utama ke arah Timur Laut', distance: 40 },
    { instruction: 'Lewati Jembatan Kayu Bambu di atas Sungai Onsen kecil', distance: 50 },
    { instruction: 'Belok sedikit ke kanan menuju Tepian Kolam 2 (Masbro Roy sedang berendam)', distance: 30 },
    { instruction: 'Anda telah sampai di Kolam 2! Harap menyapa Roy dengan suara lembut 🍊', distance: 0 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setDistanceRemaining(capybara.distanceMeters);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setDistanceRemaining((prev) => {
        if (prev <= 10) {
          if (soundEnabled && prev > 5) playZenBell();
          return 0;
        }
        const next = Math.max(0, prev - 15);
        if (next <= 30) setCurrentStep(2);
        else if (next <= 70) setCurrentStep(1);
        else setCurrentStep(0);
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isOpen, capybara.distanceMeters, soundEnabled]);

  if (!isOpen) return null;

  const isArrived = distanceRemaining === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#d6c2bd]/40 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-4 bg-white border-b border-[#e6e2dc] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8D5B4C]/10 text-[#8D5B4C] flex items-center justify-center">
              <Navigation className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c18] text-sm">Navigasi Langsung</h3>
              <p className="text-xs text-[#514440]">{capybara.name} • {capybara.habitatZone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-[#f1ede7] text-[#514440]"
              aria-label="Toggle suara navigasi"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f1ede7] text-[#514440]"
              aria-label="Tutup navigasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Distance Banner */}
        <div className="p-5 bg-gradient-to-r from-[#714436] to-[#8d5b4c] text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ffe1d8]">Sisa Jarak Jalan Kaki</span>
              <div className="text-3xl font-extrabold flex items-baseline gap-2 mt-0.5">
                <span>{distanceRemaining}m</span>
                <span className="text-sm font-normal text-[#ffe1d8]">
                  {isArrived ? 'Tiba di Lokasi!' : `±${Math.max(1, Math.ceil(distanceRemaining / 60))} menit santai`}
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Compass className={`w-6 h-6 text-white ${!isArrived ? 'animate-pulse' : ''}`} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-black/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#c5f3c1] h-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.round(((capybara.distanceMeters - distanceRemaining) / capybara.distanceMeters) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Step-by-Step Directions */}
        <div className="p-4 space-y-3 overflow-y-auto max-h-64">
          <div className="text-xs font-bold uppercase tracking-wider text-[#514440]">Petunjuk Arah Real-time</div>
          {steps.map((step, idx) => {
            const isCompleted = isArrived || idx < currentStep;
            const isCurrent = !isArrived && idx === currentStep;

            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-white border-[#8D5B4C] shadow-sm'
                    : isCompleted
                    ? 'bg-[#E9F5EC] border-[#588157]/20 text-[#315832]'
                    : 'bg-[#f7f3ed] border-transparent text-[#84746f]'
                }`}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#315832]" />
                  ) : (
                    <Footprints className={`w-5 h-5 ${isCurrent ? 'text-[#8D5B4C] animate-bounce' : 'text-[#84746f]'}`} />
                  )}
                </div>
                <div className="flex-1 text-xs">
                  <p className={`font-semibold ${isCurrent ? 'text-[#1c1c18]' : ''}`}>{step.instruction}</p>
                  {step.distance > 0 && (
                    <span className="text-[11px] opacity-75 font-mono">Jarak petunjuk: {step.distance}m</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom action */}
        <div className="p-4 bg-white border-t border-[#e6e2dc] flex items-center justify-between gap-3">
          <p className="text-xs text-[#514440] leading-tight">
            💡 <span className="font-semibold">Tips Sanctuary:</span> Jangan membuat gerakan mendadak saat mendekati kolam onsen.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-[#714436] text-white text-xs font-semibold hover:bg-[#6D4336] shrink-0"
          >
            {isArrived ? 'Mulai Sapa Roy' : 'Selesai Navigasi'}
          </button>
        </div>
      </div>
    </div>
  );
};
