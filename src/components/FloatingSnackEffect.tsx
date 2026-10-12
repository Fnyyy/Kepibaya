import React from 'react';

export interface FloatingItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface FloatingSnackEffectProps {
  items: FloatingItem[];
}

export const FloatingSnackEffect: React.FC<FloatingSnackEffectProps> = ({ items }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            animation: 'floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          className="absolute text-3xl select-none"
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};
