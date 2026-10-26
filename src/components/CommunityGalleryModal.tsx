import React, { useState } from 'react';
import { X, Heart, Camera, Send, Plus, Sparkles, Check } from 'lucide-react';
import { CommunityPost } from '../types';

interface CommunityGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: CommunityPost[];
  capybaraName: string;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes'>) => void;
}

export const CommunityGalleryModal: React.FC<CommunityGalleryModalProps> = ({
  isOpen,
  onClose,
  posts,
  capybaraName,
  onAddPost,
}) => {
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // New sighting form state
  const [authorName, setAuthorName] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState('/assets/aistudio/Image_1_89c653a7.png');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleLike = (id: string, initialLikes: number) => {
    const isLiked = likedPosts[id];
    setLikedPosts((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + (isLiked ? -1 : 1),
    }));
  };

  const handleSubmitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !caption.trim()) return;

    onAddPost({
      author: `@${authorName.trim().replace(/^@/, '')}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      timeAgo: 'Baru saja',
      image: selectedPhoto,
      caption: caption.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitForm(false);
      setAuthorName('');
      setCaption('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-xl rounded-3xl shadow-2xl border border-[#d6c2bd]/40 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-[#e6e2dc] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8D5B4C]/10 text-[#8D5B4C] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c18] text-base">Kiriman Komunitas</h3>
              <p className="text-xs text-[#514440]">Momen santai bersama {capybaraName} ({posts.length} kiriman)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#714436] text-white text-xs font-semibold hover:bg-[#6D4336] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Bagikan Foto</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f1ede7] text-[#514440]"
              aria-label="Tutup galeri"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Form (Collapsible) */}
        {showSubmitForm && (
          <form onSubmit={handleSubmitNewPost} className="p-4 bg-[#F3ECE2] border-b border-[#d6c2bd]/60 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8D5B4C]" />
                Kirim Laporan Sighting Anda
              </h4>
              <button
                type="button"
                onClick={() => setShowSubmitForm(false)}
                className="text-xs text-[#514440] hover:underline"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#514440] block mb-1">Nama / Username</label>
                <input
                  type="text"
                  required
                  placeholder="misal: petualang_capy"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl text-xs border border-[#d6c2bd] focus:outline-none focus:border-[#8D5B4C]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#514440] block mb-1">Pilih Momen Foto</label>
                <select
                  value={selectedPhoto}
                  onChange={(e) => setSelectedPhoto(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl text-xs border border-[#d6c2bd] focus:outline-none focus:border-[#8D5B4C]"
                >
                  <option value="/assets/aistudio/Image_1_89c653a7.png">Roy Berendam dengan Yuzu 🍊</option>
                  <option value="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80">Elus Dagu Masbro Santai</option>
                  <option value="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=500&q=80">Duet Berenang dengan Kura</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#514440] block mb-1">Catatan Pengamatan / Cerita</label>
              <textarea
                required
                rows={2}
                placeholder="Ceritakan apa yang sedang Roy lakukan saat Anda mengunjunginya..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl text-xs border border-[#d6c2bd] focus:outline-none focus:border-[#8D5B4C]"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 rounded-full bg-[#8D5B4C] hover:bg-[#6D4336] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4 text-[#c5f3c1]" />
                  <span>Berhasil Dikirim ke Komunitas!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Posting ke Kiriman Komunitas</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Gallery Feed */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {posts.map((post) => {
            const currentLikes = likesMap[post.id] ?? post.likes;
            const isLiked = likedPosts[post.id] ?? false;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-3 border border-[#8D5B4C]/10 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Author row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover border border-[#e6e2dc]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#1c1c18]">{post.author}</span>
                      <span className="text-[10px] text-[#84746f] block">{post.timeAgo}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLike(post.id, post.likes)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      isLiked
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#f7f3ed] text-[#514440] hover:bg-[#ebe8e2]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="tabular-nums">{currentLikes}</span>
                  </button>
                </div>

                {/* Photo */}
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-[#f1ede7] mb-2.5">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Caption */}
                <p className="text-xs text-[#2c2623] leading-relaxed">
                  {post.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
