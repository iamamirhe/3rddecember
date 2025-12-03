interface OverlayProps {
  onStart: () => void;
  visible: boolean;
}

const Overlay = ({ onStart, visible }: OverlayProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="text-center space-y-8 pointer-events-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide leading-relaxed">
          I still remember...
          <br />
          <span className="text-4xl md:text-6xl opacity-90">3rd of December</span>
        </h1>

        <button
          onClick={onStart}
          className="group relative px-12 py-4 bg-transparent border-2 border-white/60 text-white text-xl font-light tracking-widest overflow-hidden transition-all duration-500 hover:border-white hover:scale-105"
        >
          <span className="relative z-10 group-hover:text-gray-900 transition-colors duration-500">
            REMEMBER
          </span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </div>
    </div>
  );
};

export { Overlay };
export type { OverlayProps };
