interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  color?: string;
}

export default function Logo({ className = '', variant = 'full', color = '#17382B' }: LogoProps) {
  const isLight = color.toLowerCase() === '#f8f3e8';

  const image = (
    <img
      src="/logo-clean.png"
      alt="Les Volailles de Notre-Dame"
      className="h-9 w-9 flex-shrink-0 md:h-10 md:w-10"
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
    <div className={`flex items-center gap-2.5 md:gap-3 ${className}`}>
      {image}
      <div className="flex min-w-0 flex-col">
        <span
          className="max-w-[205px] truncate font-display text-base font-semibold leading-tight tracking-tight sm:max-w-none md:text-lg"
          style={{ color }}
        >
          Les Volailles de Notre-Dame
        </span>
        <span
          className="hidden font-ui text-[9px] font-medium uppercase leading-tight tracking-[0.16em] sm:block md:text-[10px]"
          style={{ color, opacity: 0.7 }}
        >
          Fraîcheur locale. Qualité de confiance.
        </span>
      </div>
    </div>
  );
}
