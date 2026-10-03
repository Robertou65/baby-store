import { memo } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo = memo<BrandLogoProps>(function BrandLogo({
  size = 'md',
  className = '',
}) {
  const dimensionMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const dim = dimensionMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${dim} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-200"
      >
        {/* Playroom Wooden Block Base with child-safe rounded corners */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          fill="#FFB800"
        />
        {/* Gentle top highlight mimicking smooth lacquered wood */}
        <path
          d="M7 14C7 9.58172 10.5817 6 15 6H33C37.4183 6 41 9.58172 41 14C41 12 37.4183 8 33 8H15C10.5817 8 7 12 7 14Z"
          fill="#FFE082"
          fillOpacity="0.8"
        />
        {/* Playroom Teddy Silhouette in deep warm amber */}
        {/* Left Ear */}
        <circle cx="17" cy="17" r="4.5" fill="#451a03" />
        <circle cx="17" cy="17" r="2.5" fill="#FFB800" />
        {/* Right Ear */}
        <circle cx="31" cy="17" r="4.5" fill="#451a03" />
        <circle cx="31" cy="17" r="2.5" fill="#FFB800" />
        {/* Head */}
        <circle cx="24" cy="24" r="10.5" fill="#451a03" />
        {/* Snout Muzzle */}
        <ellipse cx="24" cy="26" rx="5" ry="4" fill="#FFD54F" />
        {/* Nose */}
        <ellipse cx="24" cy="24.5" rx="1.8" ry="1.2" fill="#451a03" />
        {/* Smiling Mouth */}
        <path
          d="M22.5 26.5C23 27.5 25 27.5 25.5 26.5"
          stroke="#451a03"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Eyes */}
        <circle cx="20.5" cy="22" r="1.3" fill="#FFE082" />
        <circle cx="27.5" cy="22" r="1.3" fill="#FFE082" />
      </svg>
    </div>
  );
});
