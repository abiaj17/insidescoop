"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EpisodeBannerProps {
  episodeNum?: string;
  title?: string;
  href?: string;
  onClose?: () => void;
  className?: string;
}

const PlayDot = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="8" opacity="0.15" />
    <polygon points="6,4.5 12,8 6,11.5" />
  </svg>
);

const iconVariants = {
  hidden: { x: 0, y: 0, opacity: 0, scale: 0.5 },
  visible: (custom: { x: number; y: number }) => ({
    x: custom.x,
    y: custom.y,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.35, ease: "easeOut" },
      y: { duration: 0.35, ease: "easeOut" },
      opacity: { duration: 0.25 },
      scale: { type: "spring", stiffness: 200, damping: 14 },
    },
  }),
};

export function EpisodeBanner({
  episodeNum = "13",
  title = "Michael Redd on Aviation & Building Avera",
  href = "https://open.spotify.com/episode/4fevZAABemYMmqts8mSuan",
  onClose,
  className,
}: EpisodeBannerProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className={cn("mx-auto flex items-center justify-center", className)}>
      <AnimatePresence>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {/* floating play dots on hover */}
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={iconVariants}
            custom={{ x: -8, y: -8 }}
            className="pointer-events-none absolute left-1 top-1"
          >
            <PlayDot className="text-white" />
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={iconVariants}
            custom={{ x: 8, y: 8 }}
            className="pointer-events-none absolute bottom-1 right-6"
          >
            <PlayDot className="text-white" />
          </motion.div>

          <div className="relative flex items-center gap-3 rounded-full border border-white/25 text-sm" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '14px', paddingBottom: '14px' }}>
            {/* clickable episode link */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Ep {episodeNum} — {title}
            </a>

            <span className="text-white/40 text-[13px] shrink-0">→</span>

            {onClose && (
              <button
                onClick={onClose}
                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
