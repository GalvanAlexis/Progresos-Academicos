'use client';

export default function GatoChef({ size = 80, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-label="Gato chef"
    >
      {/* Cuerpo */}
      <ellipse cx="40" cy="58" rx="16" ry="18" fill="#1a1a1a" />
      {/* Delantal */}
      <path d="M30 46c0-4 4-8 10-8s10 4 10 8v18H30V46z" fill="#E86A33" />
      <path d="M36 46h8v4h-8z" fill="#E86A33" />
      {/* Brazos */}
      <rect x="22" y="44" width="6" height="16" rx="3" fill="#1a1a1a" />
      <rect x="52" y="44" width="6" height="16" rx="3" fill="#1a1a1a" />
      {/* Cabeza */}
      <circle cx="40" cy="26" r="14" fill="#1a1a1a" />
      {/* Orejas */}
      <polygon points="30,16 26,4 36,12" fill="#1a1a1a" />
      <polygon points="50,16 54,4 44,12" fill="#1a1a1a" />
      {/* Ojos */}
      <circle cx="34" cy="24" r="3" fill="#4CAF50" />
      <circle cx="46" cy="24" r="3" fill="#4CAF50" />
      <circle cx="34" cy="24" r="1.2" fill="#fff" />
      <circle cx="46" cy="24" r="1.2" fill="#fff" />
      {/* Nariz */}
      <ellipse cx="40" cy="30" rx="2" ry="1.5" fill="#f472b6" />
      {/* Bozo */}
      <path d="M36 33c2 2 6 2 8 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Bigotes */}
      <line x1="26" y1="28" x2="18" y2="26" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="26" y1="30" x2="18" y2="32" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="54" y1="28" x2="62" y2="26" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="54" y1="30" x2="62" y2="32" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      {/* Gorro de chef */}
      <rect x="33" y="5" width="14" height="10" rx="2" fill="#fff" />
      <rect x="30" y="2" width="20" height="6" rx="3" fill="#fff" />
      <circle cx="35" cy="2" r="3" fill="#fff" />
      <circle cx="40" cy="0" r="3" fill="#fff" />
      <circle cx="45" cy="2" r="3" fill="#fff" />
      {/* Cola */}
      <path d="M56 62c6-2 8-8 4-12" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
