export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative flex flex-col items-center">
        {/* Text */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-white relative">
          <span className="animate-pulse">Gen</span>
          <span className="text-gray-400 animate-pulse delay-150">Frame</span>

          {/* Glitch layers */}
          <span className="absolute left-0 top-0 text-white opacity-40 animate-glitch1">
            GenFrame
          </span>
          <span className="absolute left-0 top-0 text-gray-500 opacity-40 animate-glitch2">
            GenFrame
          </span>
        </h1>
      </div>
    </div>
  );
}
