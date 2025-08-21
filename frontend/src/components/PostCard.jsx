import React, { useRef } from "react";

// Accent background optional hook (can be removed if not needed)
function useAccent(seed = 1) {
  const hues = [48, 210, 280];
  return `linear-gradient(135deg, hsl(${hues[seed % 3]} 90% 60%/.15), transparent 60%)`;
}

export default function PostCard({ post, index = 0 }) {
  const cardRef = useRef(null);
  const accent = useAccent(index);

  return (
    <article
      ref={cardRef}
      className="group relative overflow-hidden rounded-md border border-white/10 bg-[#101010] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] focus-within:-translate-y-1 cursor-pointer"
      style={{ backgroundImage: accent, backgroundBlendMode: "overlay" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={post.url}
          alt={post.caption}
          className="h-full w-full object-cover brightness-[0.95] grayscale transition-transform duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          loading="lazy"
        />
        

        {/* caption bar */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="mx-3 mb-3 rounded-md border border-white/10 bg-black/60 px-4 py-3 backdrop-blur w-fit">
              <p className="line-clamp-2 text-sm/5 text-neutral-200 tracking-wide w-fit">
                {post.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
