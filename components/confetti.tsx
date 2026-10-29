export function Confetti({ className = "w-full max-w-[260px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 120" className={className} fill="none" strokeWidth="1.75" strokeLinecap="round">
      <path d="M4 92c18-22 34 18 54-4s30-30 50-8 34 16 52-6 34-20 56-4" stroke="#237A32" />
      <rect x="30" y="18" width="10" height="10" transform="rotate(18 35 23)" stroke="#F5B800" />
      <path d="M92 12l9 14h-18z" stroke="#FF6633" />
      <circle cx="150" cy="30" r="5" stroke="#3366CC" />
      <path d="M186 58l10 4" stroke="#237A32" />
      <rect x="118" y="54" width="7" height="7" transform="rotate(-24 121 57)" stroke="#237A32" />
      <circle cx="64" cy="54" r="3.5" stroke="#FF6633" />
      <path d="M200 16l-6 10" stroke="#F5B800" />
    </svg>
  );
}

export function Serpentina() {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 12" preserveAspectRatio="none" className="w-full h-3" fill="none">
      <path
        d="M0 6c20-8 30 8 50 0s30-8 50 0 30 8 50 0 30-8 50 0 30 8 50 0 30-8 50 0 30 8 50 0 30-8 50 0"
        stroke="#237A32"
        strokeWidth="1.5"
      />
    </svg>
  );
}
