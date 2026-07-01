'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const HERO_VIDEO_SRC = '/videos/hero-bg.mp4';

interface VideoBackgroundProps {
  overlay?: 'default' | 'auth';
}

export function VideoBackground({ overlay = 'default' }: VideoBackgroundProps) {
  const { scrollYProgress } = useScroll();

  const videoY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '14%']),
    { stiffness: 28, damping: 28, mass: 1.2 }
  );

  const videoScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.14, 1.22]),
    { stiffness: 28, damping: 28, mass: 1.2 }
  );

  const overlayOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.58, 0.66, 0.76]),
    { stiffness: 32, damping: 30, mass: 1 }
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-0 origin-center" style={{ y: videoY, scale: videoScale }}>
        <video
          className="h-full w-full object-cover object-center"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />

      {overlay === 'default' ? (
        <>
          <div className="absolute inset-0 hero-gradient mix-blend-screen opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-bgMain/95" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(79,124,255,0.15),_transparent_40%),radial-gradient(circle_at_100%_50%,_rgba(0,229,255,0.1),_transparent_30%)] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-bgMain" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </>
      )}
    </div>
  );
}
