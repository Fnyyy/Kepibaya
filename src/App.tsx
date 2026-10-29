import React, { useState } from 'react';
import {
  INITIAL_CAPYBARAS,
  INITIAL_SIGHTING_REPORTS,
  DEFAULT_USER_PROFILE,
} from './data/capybaras';
import { Capybara, ActiveTab, CommunityPost, SightingReport, UserProfile } from './types';
import { SightingDetailView } from './components/SightingDetailView';
import { ExploreFeedView } from './components/ExploreFeedView';
import { EditProfileDeviaView } from './components/EditProfileDeviaView';
import { InteractiveMapView } from './components/InteractiveMapView';
import { CommunityGalleryModal } from './components/CommunityGalleryModal';
import { NavigationSheet } from './components/NavigationSheet';
import { ZenSoundModal } from './components/ZenSoundModal';
import { ReportSightingModal } from './components/ReportSightingModal';
import { CapyCarePlayground } from './components/CapyCarePlayground';
import { FloatingSnackEffect, FloatingItem } from './components/FloatingSnackEffect';
import { AppNavigation } from './components/AppNavigation';
import { CapyLogo } from './components/CapyIcons';

export default function App() {
  const [capybaras, setCapybaras] = useState<Capybara[]>(INITIAL_CAPYBARAS);
  const [sightings, setSightings] = useState<SightingReport[]>(INITIAL_SIGHTING_REPORTS);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [selectedCapybaraId, setSelectedCapybaraId] = useState<string>('roy');
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');

  // Modals & Sheets
  const [navigatingCapybara, setNavigatingCapybara] = useState<Capybara | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Floating snack & hearts particles
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  const selectedCapybara =
    capybaras.find((c) => c.id === selectedCapybaraId) || capybaras[0];

  const handleSpawnSnack = (item: FloatingItem) => {
    setFloatingItems((prev) => [...prev, item]);
    setTimeout(() => {
      setFloatingItems((prev) => prev.filter((i) => i.id !== item.id));
    }, 1200);
  };

  const handleUpdateSnackCount = (id: string, newCount: number) => {
    setCapybaras((prev) =>
      prev.map((c) => (c.id === id ? { ...c, snackCount: newCount } : c))
    );
  };

  const handleToggleFavorite = (id: string) => {
    setCapybaras((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const handleAddCommunityPost = (post: Omit<CommunityPost, 'id' | 'likes'>) => {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      likes: 1,
    };

    setCapybaras((prev) =>
      prev.map((c) =>
        c.id === selectedCapybaraId
          ? { ...c, communityPosts: [newPost, ...c.communityPosts] }
          : c
      )
    );
  };

  const handleNewSightingReport = (newReport: SightingReport) => {
    setSightings((prev) => [newReport, ...prev]);
    // Award 25 CapyHearts to Devia
    setUserProfile((prev) => ({
      ...prev,
      capyHearts: prev.capyHearts + 25,
    }));
  };

  const handleAwardHearts = (pts: number) => {
    setUserProfile((prev) => ({
      ...prev,
      capyHearts: prev.capyHearts + pts,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-sans antialiased text-[#1c1c18] relative select-none">
      {/* 1. Explore Feed View (Peta / Beranda CapyFinder) */}
      {activeTab === 'explore' && (
        <ExploreFeedView
          capybaras={capybaras}
          sightings={sightings}
          userProfile={userProfile}
          onSelectCapybara={(capy) => {
            setSelectedCapybaraId(capy.id);
            setActiveTab('detail');
          }}
          onNavigate={(capy) => setNavigatingCapybara(capy)}
          onOpenProfile={() => setActiveTab('profil')}
          onOpenFullMap={() => setActiveTab('map')}
          onOpenPlayground={() => setIsPlaygroundOpen(true)}
          onUpdateSightings={(updated) => setSightings(updated)}
        />
      )}

      {/* 2. Detail Profil Capybara Masbro Roy & Teman-Teman */}
      {activeTab === 'detail' && (
        <SightingDetailView
          capybara={selectedCapybara}
          userProfile={userProfile}
          onBack={() => setActiveTab('explore')}
          onOpenNavigation={() => setNavigatingCapybara(selectedCapybara)}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenSoundscape={() => setIsZenOpen(true)}
          onOpenProfile={() => setActiveTab('profil')}
          onOpenPlayground={() => setIsPlaygroundOpen(true)}
          onToggleFavorite={handleToggleFavorite}
          onUpdateSnackCount={handleUpdateSnackCount}
          onSpawnSnack={handleSpawnSnack}
        />
      )}

      {/* 3. Edit Profil Devia */}
      {activeTab === 'profil' && (
        <EditProfileDeviaView
          profile={userProfile}
          onUpdateProfile={(updated) => setUserProfile(updated)}
          onBack={() => setActiveTab('explore')}
        />
      )}

      {/* 4. Full Interactive Map View */}
      {activeTab === 'map' && (
        <div className="w-full max-w-md mx-auto px-4 py-4 pb-24 h-[calc(100vh-80px)] min-h-[500px] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#714436] bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#8D5B4C]/10"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali</span>
            </button>
            <span className="text-xs font-black text-[#1c1c18]">Peta Radar Masbro Real-time 🗺️</span>
          </div>
          <div className="flex-1 rounded-3xl overflow-hidden shadow-sm border border-[#8D5B4C]/20 relative">
            <InteractiveMapView
              capybaras={capybaras}
              selectedCapybara={selectedCapybara}
              onSelectCapybara={(capy) => {
                setSelectedCapybaraId(capy.id);
                setActiveTab('detail');
              }}
              onNavigate={(capy) => setNavigatingCapybara(capy)}
            />
          </div>
        </div>
      )}

      {/* 5. Komunitas Galeri */}
      {activeTab === 'komunitas' && (
        <div className="w-full max-w-md mx-auto px-4 py-4 pb-28">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-[#1c1c18] tracking-tight flex items-center gap-1.5">
                <span>Galeri Komunitas Capy</span>
                <span className="text-xl">📸</span>
              </h2>
              <p className="text-xs text-[#514440] mt-0.5">
                Koleksi foto santai Masbro Roy & kawan-kawan dari para ranger
              </p>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-3.5 py-2 rounded-full bg-[#714436] text-white text-xs font-bold hover:bg-[#6D4336] transition-colors shadow-xs active:scale-95"
            >
              + Unggah Foto
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {sightings.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-3.5 border border-[#8D5B4C]/10 shadow-xs flex flex-col gap-2.5"
              >
                <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#F1EDE7]">
                  <img
                    src={s.image}
                    alt={s.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-[#1c1c18]">
                    <span>{s.author}</span>
                    {s.authorVerified && (
                      <span
                        className="material-symbols-outlined text-[#315832] text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#84746f]">{s.timeAgo}</span>
                </div>
                <p className="text-xs text-[#514440] leading-relaxed">"{s.caption}"</p>
                <div className="flex items-center justify-between pt-1 border-t border-[#8D5B4C]/10 text-xs">
                  <span className="text-[10px] text-[#714436] font-bold">📍 {s.location}</span>
                  <span className="text-[11px] font-bold text-[#ba1a1a]">❤️ {s.gemesCount} Gemes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Persistent Bottom Tab Navigation Bar - on explore, komunitas, map */}
      {activeTab !== 'detail' && activeTab !== 'profil' && (
        <AppNavigation
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          onOpenReportModal={() => setIsReportOpen(true)}
        />
      )}

      {/* Floating Snack Particles Effect */}
      <FloatingSnackEffect items={floatingItems} />

      {/* Navigation Sheet (Turn-by-turn route to capybara spot) */}
      {navigatingCapybara && (
        <NavigationSheet
          capybara={navigatingCapybara}
          isOpen={!!navigatingCapybara}
          onClose={() => setNavigatingCapybara(null)}
        />
      )}

      {/* Community Gallery Modal */}
      <CommunityGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        posts={selectedCapybara.communityPosts}
        capybaraName={selectedCapybara.name}
        onAddPost={handleAddCommunityPost}
      />

      {/* Zen Ambient Soundscape Modal */}
      <ZenSoundModal isOpen={isZenOpen} onClose={() => setIsZenOpen(false)} />

      {/* Report Sighting Modal */}
      <ReportSightingModal
        isOpen={isReportOpen}
        userProfile={userProfile}
        onClose={() => setIsReportOpen(false)}
        onSubmitReport={handleNewSightingReport}
      />

      {/* Virtual Capybara Tamagotchi Care Playground */}
      <CapyCarePlayground
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
        onSpawnSnack={handleSpawnSnack}
        onAwardHearts={handleAwardHearts}
      />
    </div>
  );
}
