import React from 'react';

interface CapyIconProps {
  className?: string;
  size?: number;
}

/**
 * Exact Match to User's Beloved Capybara Character:
 * Chubby round head, iconic dark brown muzzle patch with vertical/inverted-T mouth,
 * cute slanted half-lidded chill eyes, bright red oval blush with highlights,
 * little fur tuft on head, and round shell ears.
 */
export const CapyLogo: React.FC<CapyIconProps & { withYuzu?: boolean }> = ({
  className = '',
  size = 40,
  withYuzu = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Soft Cream Ambient Halo */}
    <circle cx="50" cy="50" r="46" fill="#FFF2EC" opacity="0.8" />

    {/* Left Ear */}
    <ellipse
      cx="35"
      cy="24"
      rx="9"
      ry="11"
      fill="#74350E"
      stroke="#3D1C06"
      strokeWidth="3.2"
      transform="rotate(-15 35 24)"
    />
    <ellipse
      cx="36"
      cy="25"
      rx="5"
      ry="6.5"
      fill="#4A2208"
      transform="rotate(-15 36 25)"
    />

    {/* Right Ear */}
    <ellipse
      cx="74"
      cy="31"
      rx="9.5"
      ry="11.5"
      fill="#74350E"
      stroke="#3D1C06"
      strokeWidth="3.2"
      transform="rotate(25 74 31)"
    />
    <ellipse
      cx="73"
      cy="32"
      rx="5.5"
      ry="7"
      fill="#4A2208"
      transform="rotate(25 73 32)"
    />

    {/* Big Round Capybara Head */}
    <path
      d="M26 50 C23 35 34 24 50 24 C53 24 54 21 56 21 C57 23 59 21 61 22 C64 24 74 30 76 46 C79 62 76 76 66 82 C54 88 34 86 26 78 C20 72 18 62 26 50 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />

    {/* Double Fur Tuft Spike on Top */}
    <path
      d="M52 24 L55 18 L58 24 L62 19 L64 24"
      stroke="#3D1C06"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Iconic Large Dark Brown Muzzle Oval Patch */}
    <path
      d="M17 52 C15 40 23 31 35 31 C47 31 54 41 54 55 C54 69 46 76 35 76 C23 76 18 64 17 52 Z"
      fill="#7E3F12"
      stroke="#3D1C06"
      strokeWidth="3.2"
    />

    {/* Left Eye (Chill Slit at the edge of muzzle patch) */}
    <path
      d="M23 44 L30 46"
      stroke="#261005"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Vertical Mouth / Nose Cleft (Inverted T: | and bottom line) */}
    <path
      d="M36 50 L36 67"
      stroke="#3D1C06"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M33 67 L39 67"
      stroke="#3D1C06"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Right Eye (Chill slanted slit) */}
    <path
      d="M60 38 L68 36"
      stroke="#261005"
      strokeWidth="3.8"
      strokeLinecap="round"
    />

    {/* Bright Red/Pink Oval Blush with highlights */}
    <ellipse cx="68" cy="52" rx="9" ry="6" fill="#FF0D2E" />
    <path
      d="M64 50 L66 54 M68 49 L70 55 M72 50 L74 54"
      stroke="#FF8DA1"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Subtle Cute Fur Texture Lines */}
    <path
      d="M33 28 L35 30 M70 42 L72 44"
      stroke="#8D4A1C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Optional signature Yuzu on head */}
    {withYuzu && (
      <g transform="translate(4,-2)">
        <circle cx="50" cy="12" r="8" fill="#FFA500" stroke="#3D1C06" strokeWidth="2.2" />
        <circle cx="48" cy="10" r="5.5" fill="#FFC107" />
        <path d="M50 4 Q52 1 55 2" stroke="#284F2A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="55" cy="2" rx="3" ry="1.8" fill="#497149" transform="rotate(-15 55 2)" />
      </g>
    )}
  </svg>
);

/**
 * Full Body Illustrated Capybara Mascot
 * Exact replica of the user's uploaded art: standing chubby body, cream tummy,
 * stubby dark paws, heart speech bubble, on green grass!
 */
export const CapyMascotFull: React.FC<CapyIconProps & { showHeart?: boolean }> = ({
  className = '',
  size = 120,
  showHeart = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Green Grass Ground Oval */}
    <ellipse cx="80" cy="138" rx="60" ry="14" fill="#58C913" />
    <path
      d="M45 130 L48 124 L51 130 M118 128 L122 120 L126 128"
      stroke="#358E06"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Plump Pear-Shaped Body */}
    <path
      d="M62 76 C55 86 52 100 52 116 C52 128 62 136 78 136 C96 136 112 126 112 108 C112 90 102 78 92 72 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3.2"
    />

    {/* Cream Belly Patch */}
    <path
      d="M66 100 C64 112 68 128 78 132 C88 132 94 122 92 110 C90 98 78 92 66 100 Z"
      fill="#F5E5DC"
    />

    {/* Left Arm & Chubby Paw */}
    <path
      d="M66 84 C58 84 52 90 54 98 C56 102 62 103 66 100 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3"
    />
    <path
      d="M54 94 C53 96 56 101 60 100 C62 99 64 96 62 94 Z"
      fill="#612C09"
    />

    {/* Right Arm & Chubby Paw */}
    <path
      d="M94 86 C98 86 104 90 102 98 C100 102 94 104 90 100 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3"
    />
    <path
      d="M96 95 C98 96 101 98 102 96 C103 94 101 92 98 92 Z"
      fill="#612C09"
    />

    {/* Left Hind Foot */}
    <path
      d="M60 120 C58 126 58 134 66 136 C72 136 72 130 68 124 Z"
      fill="#612C09"
      stroke="#3D1C06"
      strokeWidth="3"
    />

    {/* Right Hind Leg & Foot */}
    <path
      d="M98 116 C92 126 94 136 104 140 C110 142 116 138 112 128 C108 120 102 114 98 116 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3"
    />
    <ellipse cx="104" cy="136" rx="6" ry="4" fill="#612C09" stroke="#3D1C06" strokeWidth="2.5" />

    {/* Left Ear */}
    <ellipse
      cx="56"
      cy="28"
      rx="10"
      ry="12"
      fill="#74350E"
      stroke="#3D1C06"
      strokeWidth="3.4"
      transform="rotate(-15 56 28)"
    />
    <ellipse
      cx="57"
      cy="29"
      rx="5.5"
      ry="7"
      fill="#4A2208"
      transform="rotate(-15 57 29)"
    />

    {/* Right Ear */}
    <ellipse
      cx="98"
      cy="36"
      rx="10.5"
      ry="12.5"
      fill="#74350E"
      stroke="#3D1C06"
      strokeWidth="3.4"
      transform="rotate(25 98 36)"
    />
    <ellipse
      cx="97"
      cy="37"
      rx="6"
      ry="7.5"
      fill="#4A2208"
      transform="rotate(25 97 37)"
    />

    {/* Big Round Head */}
    <path
      d="M44 58 C40 40 52 28 72 28 C75 28 76 25 78 25 C79 27 82 25 84 26 C88 28 100 36 102 54 C105 72 101 88 88 94 C74 100 52 98 44 88 C36 80 34 70 44 58 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />

    {/* Fur Tuft on Head */}
    <path
      d="M74 28 L77 20 L81 28 L85 22 L87 28"
      stroke="#3D1C06"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Large Dark Brown Muzzle Oval Patch */}
    <path
      d="M34 60 C32 46 41 36 54 36 C68 36 76 47 76 63 C76 79 66 87 54 87 C41 87 35 73 34 60 Z"
      fill="#7E3F12"
      stroke="#3D1C06"
      strokeWidth="3.4"
    />

    {/* Left Slit Eye */}
    <path d="M41 51 L49 53" stroke="#261005" strokeWidth="3.8" strokeLinecap="round" />

    {/* Vertical Mouth / Cleft Line (Inverted T) */}
    <path d="M55 58 L55 76" stroke="#3D1C06" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M51 76 L59 76" stroke="#3D1C06" strokeWidth="3.4" strokeLinecap="round" />

    {/* Right Eye (Chill slanted slit) */}
    <path d="M84 44 L93 42" stroke="#261005" strokeWidth="4.2" strokeLinecap="round" />

    {/* Bright Red/Pink Oval Blush */}
    <ellipse cx="91" cy="60" rx="10" ry="7" fill="#FF0D2E" />
    <path
      d="M86 58 L89 63 M91 57 L94 63 M96 58 L98 62"
      stroke="#FF8DA1"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Speech Bubble with Heart */}
    {showHeart && (
      <g transform="translate(18, 92)">
        <ellipse cx="14" cy="14" rx="13" ry="11" fill="#FFFFFF" stroke="#3D1C06" strokeWidth="2.5" />
        <path d="M22 21 L26 26 L17 23 Z" fill="#FFFFFF" stroke="#3D1C06" strokeWidth="2" />
        {/* Red Heart */}
        <path
          d="M14 18 C11 15 8 13 8 10.5 C8 8.5 10 7 12 7.5 C13 7.8 13.8 8.6 14 9.2 C14.2 8.6 15 7.8 16 7.5 C18 7 20 8.5 20 10.5 C20 13 17 15 14 18 Z"
          fill="#FF0033"
        />
      </g>
    )}
  </svg>
);

/**
 * Capybara Soaking in Hot Spring Onsen (matching user's drawing style)
 */
export const CapyIconOnsen: React.FC<CapyIconProps> = ({ className = '', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Water */}
    <ellipse cx="40" cy="62" rx="36" ry="14" fill="#A3E7FD" stroke="#17677A" strokeWidth="2" />
    <ellipse cx="40" cy="65" rx="30" ry="9" fill="#8CD0E6" />

    {/* Ears */}
    <ellipse cx="28" cy="27" rx="6" ry="8" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(-15 28 27)" />
    <ellipse cx="58" cy="32" rx="6.5" ry="8.5" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(25 58 32)" />

    {/* Head */}
    <path
      d="M24 48 C20 36 28 28 42 28 C45 28 46 25 48 26 C54 28 62 34 64 48 C66 60 62 68 52 70 C42 72 26 70 24 48 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="2.8"
    />

    {/* Dark Muzzle Patch */}
    <path
      d="M17 50 C16 41 22 34 31 34 C40 34 45 42 45 52 C45 63 39 68 31 68 C22 68 18 59 17 50 Z"
      fill="#7E3F12"
      stroke="#3D1C06"
      strokeWidth="2.6"
    />

    {/* Inverted T mouth */}
    <path d="M31 48 L31 60 M28 60 L34 60" stroke="#3D1C06" strokeWidth="2.4" strokeLinecap="round" />

    {/* Eyes */}
    <path d="M22 44 L27 45" stroke="#261005" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M50 40 L56 38" stroke="#261005" strokeWidth="3" strokeLinecap="round" />

    {/* Red Blush */}
    <ellipse cx="55" cy="50" rx="6.5" ry="4.5" fill="#FF0D2E" />

    {/* Onsen Towel on Head */}
    <rect x="36" y="22" width="16" height="6.5" rx="3" fill="#FFFFFF" stroke="#3D1C06" strokeWidth="2" />
    <line x1="38" y1="25.5" x2="50" y2="25.5" stroke="#E6E2DC" strokeWidth="1.5" />

    {/* Steam Curls */}
    <path d="M18 20 Q16 14 20 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    <path d="M64 22 Q66 16 62 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
  </svg>
);

/**
 * Capybara Munching Watermelon (matching user's drawing style)
 */
export const CapyIconWatermelon: React.FC<CapyIconProps> = ({ className = '', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Ears */}
    <ellipse cx="28" cy="24" rx="6" ry="8" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(-15 28 24)" />
    <ellipse cx="58" cy="28" rx="6.5" ry="8.5" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(25 58 28)" />

    {/* Head */}
    <path
      d="M24 44 C20 32 28 24 42 24 C45 24 46 21 48 22 C54 24 62 30 64 44 C66 56 62 64 52 66 C42 68 26 66 24 44 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="2.8"
    />

    {/* Dark Muzzle Patch */}
    <path
      d="M17 46 C16 37 22 30 31 30 C40 30 45 38 45 48 C45 59 39 64 31 64 C22 64 18 55 17 46 Z"
      fill="#7E3F12"
      stroke="#3D1C06"
      strokeWidth="2.6"
    />

    {/* Inverted T mouth */}
    <path d="M31 44 L31 56 M28 56 L34 56" stroke="#3D1C06" strokeWidth="2.4" strokeLinecap="round" />

    {/* Eyes */}
    <path d="M22 40 L27 41" stroke="#261005" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M50 36 L56 34" stroke="#261005" strokeWidth="3" strokeLinecap="round" />

    {/* Red Blush */}
    <ellipse cx="55" cy="46" rx="6.5" ry="4.5" fill="#FF0D2E" />

    {/* Watermelon Slice */}
    <path
      d="M14 54 Q36 72 58 54 Z"
      fill="#FF0D2E"
      stroke="#315832"
      strokeWidth="3"
    />
    <path d="M16 55 Q36 68 56 55" stroke="#C1EEBC" strokeWidth="1.6" fill="none" />
    {/* Seeds */}
    <circle cx="28" cy="59" r="1.1" fill="#331107" />
    <circle cx="36" cy="62" r="1.1" fill="#331107" />
    <circle cx="44" cy="59" r="1.1" fill="#331107" />

    {/* Paws holding melon */}
    <ellipse cx="18" cy="52" rx="3.5" ry="4" fill="#612C09" stroke="#3D1C06" strokeWidth="1.8" />
    <ellipse cx="54" cy="52" rx="3.5" ry="4" fill="#612C09" stroke="#3D1C06" strokeWidth="1.8" />
  </svg>
);

/**
 * Capybara Sleeping / Bobo Siang (matching user's drawing style)
 */
export const CapyIconSleeping: React.FC<CapyIconProps> = ({ className = '', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Plump Body */}
    <ellipse cx="42" cy="52" rx="26" ry="16" fill="#C68652" stroke="#3D1C06" strokeWidth="2.6" />
    <ellipse cx="38" cy="57" rx="14" ry="9" fill="#F5E5DC" />

    {/* Head */}
    <path
      d="M18 56 C16 46 22 40 32 40 C40 40 46 47 46 56 C46 63 40 66 30 66 C20 66 18 62 18 56 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="2.6"
    />
    <ellipse cx="18" cy="55" rx="7" ry="9" fill="#7E3F12" stroke="#3D1C06" strokeWidth="2.2" />

    {/* Ear */}
    <ellipse cx="38" cy="38" rx="4.5" ry="6.5" fill="#74350E" stroke="#3D1C06" strokeWidth="2" transform="rotate(20 38 38)" />

    {/* Closed Eye */}
    <path d="M26 49 L32 48" stroke="#261005" strokeWidth="2.6" strokeLinecap="round" />
    <ellipse cx="34" cy="55" rx="4.5" ry="3.5" fill="#FF0D2E" />

    {/* Zzz floating */}
    <text x="56" y="26" fill="#315832" fontSize="13" fontWeight="900" fontFamily="sans-serif">
      Z
    </text>
    <text x="64" y="19" fill="#315832" fontSize="10" fontWeight="800" fontFamily="sans-serif">
      z
    </text>
  </svg>
);

/**
 * Capybara Loving / Peluk Hati (matching user's drawing style)
 */
export const CapyIconLove: React.FC<CapyIconProps> = ({ className = '', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Ears */}
    <ellipse cx="28" cy="24" rx="6" ry="8" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(-15 28 24)" />
    <ellipse cx="58" cy="28" rx="6.5" ry="8.5" fill="#74350E" stroke="#3D1C06" strokeWidth="2.5" transform="rotate(25 58 28)" />

    {/* Head */}
    <path
      d="M24 44 C20 32 28 24 42 24 C45 24 46 21 48 22 C54 24 62 30 64 44 C66 56 62 64 52 66 C42 68 26 66 24 44 Z"
      fill="#C68652"
      stroke="#3D1C06"
      strokeWidth="2.8"
    />

    {/* Dark Muzzle Patch */}
    <path
      d="M17 46 C16 37 22 30 31 30 C40 30 45 38 45 48 C45 59 39 64 31 64 C22 64 18 55 17 46 Z"
      fill="#7E3F12"
      stroke="#3D1C06"
      strokeWidth="2.6"
    />

    {/* Inverted T mouth */}
    <path d="M31 44 L31 56 M28 56 L34 56" stroke="#3D1C06" strokeWidth="2.4" strokeLinecap="round" />

    {/* Winking happy eye */}
    <path d="M22 40 L27 41" stroke="#261005" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M50 36 L56 34" stroke="#261005" strokeWidth="3" strokeLinecap="round" />

    {/* Red Blush */}
    <ellipse cx="55" cy="46" rx="6.5" ry="4.5" fill="#FF0D2E" />

    {/* Glowing Heart hugged tightly */}
    <path
      d="M44 68 C34 60 24 52 24 42 C24 35 30 31 36 33 C40 34 43 37 44 39 C45 37 48 34 52 33 C58 31 64 35 64 42 C64 52 54 60 44 68 Z"
      fill="#FF0D2E"
      stroke="#FFFFFF"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Capybara Paw Print Badge
 */
export const CapyPawBadge: React.FC<CapyIconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Big Heel Pad */}
    <ellipse cx="20" cy="27" rx="9" ry="7" fill="currentColor" />
    {/* 4 Webbed Round Toes */}
    <circle cx="9" cy="18" r="3.5" fill="currentColor" />
    <circle cx="16" cy="12" r="3.8" fill="currentColor" />
    <circle cx="24" cy="12" r="3.8" fill="currentColor" />
    <circle cx="31" cy="18" r="3.5" fill="currentColor" />
  </svg>
);
