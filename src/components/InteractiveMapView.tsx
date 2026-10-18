import React, { useState } from 'react';
import { Navigation, ZoomIn, ZoomOut, Compass, Info, Check, Sparkles } from 'lucide-react';
import { Capybara } from '../types';

interface InteractiveMapViewProps {
  capybaras: Capybara[];
  selectedCapybara: Capybara;
  onSelectCapybara: (capy: Capybara) => void;
  onNavigate: (capy: Capybara) => void;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  capybaras,
  selectedCapybara,
  onSelectCapybara,
  onNavigate,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterOnsenOnly, setFilterOnsenOnly] = useState(false);

  const displayedCapybaras = filterOnsenOnly
    ? capybaras.filter((c) => c.status === 'Sedang Berendam')
    : capybaras;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#8D5B4C]/10 flex flex-col h-full">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#1c1c18] flex items-center gap-2">
            <span>Peta Interaktif Sanctuary & Onsen</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E0F2F1] text-[#17677A] font-semibold">
              Live Tracker
            </span>
          </h2>
          <p className="text-xs text-[#514440] mt-0.5">
            Taman Rekreasi Lembah Hijau • 3 Zona Kolam & Padang Rumput
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOnsenOnly(!filterOnsenOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filterOnsenOnly
                ? 'bg-[#17677A] text-white shadow-xs'
                : 'bg-[#F3ECE2] text-[#2C2623] hover:bg-[#EBE8E2]'
            }`}
          >
            <span>♨️ Khusus Sedang Berendam</span>
            {filterOnsenOnly && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SVG Map Canvas Container */}
      <div className="relative flex-1 min-h-[380px] bg-[#EAF2E8] rounded-2xl overflow-hidden border border-[#d6c2bd]/60 shadow-inner select-none">
        {/* Floating Zoom Controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-xs p-1.5 rounded-2xl shadow-md border border-[#8D5B4C]/10">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F3ECE2] text-[#514440] transition-colors"
            aria-label="Perbesar peta"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F3ECE2] text-[#514440] transition-colors"
            aria-label="Perkecil peta"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F3ECE2] text-[#514440] transition-colors"
            title="Reset Zoom"
            aria-label="Reset zoom peta"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Interactive Canvas */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-h-[500px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grass & terrain */}
            <rect x="0" y="0" width="800" height="500" fill="#E8F1E5" />

            {/* Top Road (Jl. Raya Natar / Lingkungan) */}
            <path
              d="M 20 60 Q 250 40 450 70 T 780 50"
              fill="none"
              stroke="#D4DFD0"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 20 60 Q 250 40 450 70 T 780 50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* Surrounding Landmarks Text */}
            <g className="text-[11px] font-bold fill-[#84746f]">
              <circle cx="160" cy="45" r="4" fill="#ba1a1a" />
              <text x="170" y="48">Natar Medika Hospital</text>

              <circle cx="340" cy="50" r="4" fill="#3B8296" />
              <text x="350" y="53">Masjid An-Nubuuwwah</text>

              <circle cx="620" cy="45" r="4" fill="#8D5B4C" />
              <text x="630" y="48">MITRA BANGUNAN SUPERMARKET</text>
            </g>

            {/* Bamboo Forest Area */}
            <path
              d="M 120 160 Q 180 130 290 150 Q 320 220 280 290 Q 200 320 130 270 Z"
              fill="#D9EAD4"
              stroke="#B7D7B0"
              strokeWidth="2"
            />
            <text x="150" y="180" className="text-[12px] font-bold fill-[#315832]">
              Hutan Bambu Rimbun
            </text>

            {/* Onsen River Stream */}
            <path
              d="M 60 420 C 220 380 260 270 420 260 C 580 250 630 350 760 380"
              fill="none"
              stroke="#BDE3EB"
              strokeWidth="38"
              strokeLinecap="round"
            />
            <path
              d="M 60 420 C 220 380 260 270 420 260 C 580 250 630 350 760 380"
              fill="none"
              stroke="#80CED7"
              strokeWidth="28"
              strokeLinecap="round"
            />

            {/* Onsen Pool 1 (Lotus Pond) */}
            <ellipse
              cx="580"
              cy="230"
              rx="75"
              ry="50"
              fill="#A3E7FD"
              stroke="#3B8296"
              strokeWidth="3"
            />
            <text x="540" y="235" className="text-[11px] font-bold fill-[#17677A]">
              Kolam 1 Lotus
            </text>

            {/* Onsen Pool 2 (Zona Danau Bambu - Roy's Home!) */}
            <ellipse
              cx="260"
              cy="250"
              rx="90"
              ry="65"
              fill="#A3E7FD"
              stroke="#17677A"
              strokeWidth="3.5"
            />
            {/* Water Ripple Circles */}
            <ellipse
              cx="260"
              cy="250"
              rx="60"
              ry="42"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text x="205" y="245" className="text-[12px] font-extrabold fill-[#17677A]">
              Kolam 2 (Danau Bambu)
            </text>
            <text x="215" y="262" className="text-[10px] font-medium fill-[#3B8296]">
              Suhu Air: 38.5°C Hangat
            </text>

            {/* Walking Path from entrance to Roy */}
            <path
              d="M 100 370 Q 140 330 200 300 Q 230 285 245 270"
              fill="none"
              stroke="#8D5B4C"
              strokeWidth="3"
              strokeDasharray="6 4"
            />

            {/* User Location Pin */}
            <g transform="translate(100, 370)">
              <circle r="14" fill="#8D5B4C" opacity="0.25" className="animate-ping" />
              <circle r="9" fill="#8D5B4C" stroke="#ffffff" strokeWidth="2" />
              <text x="-25" y="22" className="text-[10px] font-bold fill-[#714436]">Posisi Anda</text>
            </g>

            {/* Watermelon Gazebo Snack Point */}
            <g transform="translate(420, 340)">
              <rect x="-24" y="-18" width="48" height="36" rx="8" fill="#FFFFFF" stroke="#8D5B4C" strokeWidth="1.5" />
              <text x="-16" y="5" className="text-base">🍉</text>
              <text x="-40" y="28" className="text-[10px] font-semibold fill-[#514440]">Gazebo Semangka</text>
            </g>

            {/* Capybara Marker Pins */}
            {displayedCapybaras.map((capy) => {
              // Custom map coords for our SVG layout
              const coordsMap: Record<string, { x: number; y: number }> = {
                roy: { x: 260, y: 220 },
                luna: { x: 420, y: 310 },
                baron: { x: 580, y: 215 },
              };
              const pos = coordsMap[capy.id] ?? { x: 300, y: 300 };
              const isSelected = selectedCapybara.id === capy.id;

              return (
                <g
                  key={capy.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer group"
                  onClick={() => onSelectCapybara(capy)}
                >
                  {/* Outer pulsating ring if selected */}
                  {isSelected && (
                    <circle r="32" fill="#714436" opacity="0.2" className="animate-ping" />
                  )}

                  {/* Marker Pin Bubble */}
                  <rect
                    x="-60"
                    y="-48"
                    width="120"
                    height="32"
                    rx="16"
                    fill={isSelected ? '#714436' : '#FFFFFF'}
                    stroke={isSelected ? '#331107' : '#8D5B4C'}
                    strokeWidth="2"
                    className="filter drop-shadow-md transition-all group-hover:scale-105"
                  />

                  <text
                    x="-48"
                    y="-28"
                    className={`text-[11px] font-bold ${
                      isSelected ? 'fill-white' : 'fill-[#1c1c18]'
                    }`}
                  >
                    {capy.badgeEmoji} {capy.name.split(' ')[0]}
                  </text>
                  <text
                    x="25"
                    y="-28"
                    className={`text-[10px] font-bold ${
                      isSelected ? 'fill-[#ffe1d8]' : 'fill-[#315832]'
                    }`}
                  >
                    ★{capy.chillScore}
                  </text>

                  {/* Pin Pointer triangle */}
                  <polygon
                    points="0,-16 -8,-24 8,-24"
                    fill={isSelected ? '#714436' : '#FFFFFF'}
                  />
                  <circle r="4" fill={isSelected ? '#ffe1d8' : '#8D5B4C'} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Capybara Mini Floating Card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#8D5B4C]/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={selectedCapybara.heroPhotos[0]}
              alt={selectedCapybara.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/extracted/hero_roy.png';
              }}
              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#e6e2dc]"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-[#1c1c18] truncate flex items-center gap-1">
                <span>{selectedCapybara.name}</span>
                <span>{selectedCapybara.badgeEmoji}</span>
              </h4>
              <p className="text-[11px] text-[#514440] truncate">
                {selectedCapybara.habitatZone}
              </p>
              <span className="text-[10px] font-semibold text-[#17677A]">
                {selectedCapybara.status} • ±{selectedCapybara.distanceMeters}m
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate(selectedCapybara)}
            className="px-3 py-2 rounded-full bg-[#714436] hover:bg-[#6D4336] text-white text-xs font-semibold flex items-center gap-1 shrink-0 shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Rute</span>
          </button>
        </div>
      </div>

      {/* Map Legend Footer */}
      <div className="mt-3 pt-3 border-t border-[#f1ede7] flex flex-wrap items-center justify-between text-xs text-[#514440] gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#A3E7FD] border border-[#3B8296] inline-block" />
            <span>Kolam Onsen Hangat</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#8D5B4C] inline-block" />
            <span>Titik Anda</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">🍉</span>
            <span>Titik Cemilan Komunitas</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#84746f]">
          <Info className="w-3.5 h-3.5" />
          <span>Akurasi GPS ±2 meter dalam sanctuary</span>
        </div>
      </div>
    </div>
  );
};
