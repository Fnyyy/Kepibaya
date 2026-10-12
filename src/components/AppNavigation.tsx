import React from 'react';
import { ActiveTab } from '../types';
import { CapyPawBadge } from './CapyIcons';

interface AppNavigationProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onOpenReportModal: () => void;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  activeTab,
  onChangeTab,
  onOpenReportModal,
}) => {
  return (
    <nav
      aria-label="Navigasi Utama CapyFinder"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-xl border-t border-[#8D5B4C]/10 shadow-[0_-8px_24px_-4px_rgba(109,67,54,0.08)]"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {/* Tab 1: Peta */}
        <button
          onClick={() => onChangeTab('explore')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-all duration-200 ${
            activeTab === 'explore'
              ? 'text-[#315832] font-extrabold'
              : 'text-[#514440] hover:text-[#714436]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="text-[11px] font-bold">Peta</span>
        </button>

        {/* Tab 2: Komunitas */}
        <button
          onClick={() => onChangeTab('komunitas')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-all duration-200 ${
            activeTab === 'komunitas'
              ? 'text-[#315832] font-extrabold'
              : 'text-[#514440] hover:text-[#714436]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'komunitas' ? "'FILL' 1" : "'FILL' 0" }}
          >
            diversity_1
          </span>
          <span className="text-[11px] font-bold">Komunitas</span>
        </button>

        {/* Center Floating Action Button: Lapor */}
        <button
          onClick={onOpenReportModal}
          className="flex flex-col items-center justify-center -mt-6 min-w-[56px] min-h-[44px] group"
        >
          <div className="w-13 h-13 rounded-full bg-[#714436] text-white flex items-center justify-center shadow-[0_8px_20px_-2px_rgba(113,68,54,0.35)] group-active:scale-95 transition-all p-3 hover:bg-[#6D4336] ring-4 ring-[#FAF6F0]">
            <span className="material-symbols-outlined text-[26px]">add_a_photo</span>
          </div>
          <span className="text-[11px] text-[#714436] font-extrabold mt-1">Lapor</span>
        </button>

        {/* Tab 3: Koleksi / Masbro Roy */}
        <button
          onClick={() => onChangeTab('detail')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-all duration-200 ${
            activeTab === 'detail'
              ? 'text-[#315832] font-extrabold'
              : 'text-[#514440] hover:text-[#714436]'
          }`}
        >
          <CapyPawBadge size={22} className={activeTab === 'detail' ? 'text-[#315832]' : 'text-[#514440]'} />
          <span className="text-[11px] font-bold">Koleksi</span>
        </button>

        {/* Tab 4: Profil Devia */}
        <button
          onClick={() => onChangeTab('profil')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-all duration-200 ${
            activeTab === 'profil'
              ? 'text-[#315832] font-extrabold'
              : 'text-[#514440] hover:text-[#714436]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'profil' ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          <span className="text-[11px] font-bold">Profil</span>
        </button>
      </div>
    </nav>
  );
};
