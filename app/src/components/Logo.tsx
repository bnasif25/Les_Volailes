interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  color?: string;
}

export default function Logo({ className = '', variant = 'full', color = '#17382B' }: LogoProps) {
  const isLight = color.toLowerCase() === '#f8f3e8' || color.toLowerCase() === '#f8f3e8';

  const image = (
    <img
      src="/logo-clean.png"
      alt="Les Volailles de Notre-Dame"
      className={variant === 'icon' ? 'w-10 h-10 flex-shrink-0' : 'w-10 h-10 flex-shrink-0'}
      style={{
        filter: isLight
          ? 'brightness(0) invert(0.96) sepia(0.15) saturate(2) drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
      }}
    />
  );

  if (variant === 'icon') {
    return image;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {image}
      <div className="flex flex-col">
        <span
          className="font-display text-lg font-semibold leading-tight tracking-tight"
          style={{ color }}
        >
          Les Volailles de Notre-Dame
        </span>
        <span
          className="font-ui text-[10px] font-medium tracking-[0.2em] uppercase leading-tight"
          style={{ color, opacity: 0.7 }}
        >
          Fraîcheur locale. Qualité de confiance.
        </span>
      </div>
    </div>
  );
}
