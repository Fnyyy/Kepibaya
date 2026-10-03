export type ActivityStatus =
  | 'Sedang Berendam'
  | 'Sedang Nyemil'
  | 'Tidur Siang'
  | 'Santai di Rumput'
  | 'Berendam Jeruk'
  | 'Makan Rumput'
  | 'Tidur Pulas';

export interface FunFact {
  id: string;
  icon: 'heart' | 'clock' | 'sparkle' | 'music';
  text: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar?: string;
  timeAgo: string;
  image: string;
  caption: string;
  likes: number;
}

export interface Capybara {
  id: string;
  name: string;
  title?: string;
  badgeEmoji: string;
  sanctuaryName: string;
  verificationBadge: string;
  status: ActivityStatus;
  chillScore: number;
  chillVerdict: string;
  chillDescription: string;
  age: string;
  ageCategory: string;
  favoriteFood: string;
  favoriteSecondary: string;
  companionCircle: string;
  circleNote: string;
  moodStatus: string;
  moodNote: string;
  habitatZone: string;
  poolDetail: string;
  distanceMeters: number;
  accuracyTime: string;
  quote?: string;
  deviaNote?: string;
  deviaSchedule?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  funFacts: FunFact[];
  heroPhotos: string[];
  communityPosts: CommunityPost[];
  snackCount: number;
  isFavorite: boolean;
  isSavedSpot?: boolean;
}

export interface SightingReport {
  id: string;
  author: string;
  authorVerified?: boolean;
  timeAgo: string;
  image: string;
  caption: string;
  location: string;
  distance: string;
  gemesCount: number;
  isLiked?: boolean;
  capyId?: string;
}

export interface UserProfile {
  fullName: string;
  nickname: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  rangerLevel: number;
  rangerTitle: string;
  capyHearts: number;
  favoriteSnack: string;
  socialContact: string;
  hideHomeLocation: boolean;
  nearbyNotification: boolean;
  zenMode: boolean;
}

export type ActiveTab = 'explore' | 'detail' | 'map' | 'komunitas' | 'profil' | 'zen';
