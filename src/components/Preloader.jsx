import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const topRef   = useRef(null);
  const botRef   = useRef(null);
  const logoRef  = useRef(null);
  const lineRef  = useRef(null);
  const tagRef   = useRef(null);
  const glowRef  = useRef(null);
  const seamRef  = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl
      /* Glow pulse in */
      .to(glowRef.current,
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.1
      )
      /* Logo fades + rises in */
      .to(logoRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
        0.3
      )
      /* Orange sweep line */
      .to(lineRef.current,
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
        0.75
      )
      /* Tagline */
      .to(tagRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        1.3
      )
      /* Seam glow flash just before exit */
      .to(seamRef.current,
        { opacity: 1, duration: 0.25, ease: 'power2.out' },
        1.9
      )
      /* ── EXIT ── */
      /* Fade center content */
      .to([logoRef.current, lineRef.current, tagRef.current, glowRef.current],
        { opacity: 0, duration: 0.25, ease: 'power2.in' },
        2.15
      )
      /* Seam fades too */
      .to(seamRef.current,
        { opacity: 0, duration: 0.2 },
        2.15
      )
      /* Top panel slides UP */
      .to(topRef.current,
        { yPercent: -100, duration: 0.85, ease: 'power4.inOut' },
        2.2
      )
      /* Bottom panel slides DOWN */
      .to(botRef.current,
        { yPercent: 100, duration: 0.85, ease: 'power4.inOut' },
        2.2
      );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>

      {/* ── TOP PANEL ── */}
      <div ref={topRef} style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '50%',
        background: '#070F23',
        willChange: 'transform',
      }} />

      {/* ── BOTTOM PANEL ── */}
      <div ref={botRef} style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: '#070F23',
        willChange: 'transform',
      }} />

      {/* ── SEAM LINE (orange glow at 50%) ── */}
      <div ref={seamRef} style={{
        position: 'absolute',
        top: '50%', left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #F07920 30%, #F07920 70%, transparent 100%)',
        opacity: 0,
        zIndex: 2,
        boxShadow: '0 0 12px rgba(240,121,32,0.8)',
        pointerEvents: 'none',
      }} />

      {/* ── CENTER LOGO AREA (above both panels) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 3, pointerEvents: 'none',
      }}>

        {/* Ambient glow */}
        <div ref={glowRef} style={{
          position: 'absolute',
          width: '420px', height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,121,32,0.07) 0%, transparent 65%)',
          opacity: 0,
          transform: 'scale(0.7)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div ref={logoRef} style={{
          opacity: 0,
          transform: 'translateY(14px) scale(0.93)',
          marginBottom: '28px',
        }}>
          <img
            src="/logo.png"
            alt="XpandBharat"
            style={{
              height: '80px',
              width: 'auto',
              display: 'block',
              filter: 'brightness(0) invert(1)',
              userSelect: 'none',
            }}
          />
        </div>

        {/* Orange sweep line */}
        <div
          ref={lineRef}
          style={{
            height: '1.5px',
            width: '260px',
            background: 'linear-gradient(90deg, transparent, #F07920 20%, #F07920 80%, transparent)',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
            marginBottom: '22px',
          }}
        />

        {/* Tagline */}
        <p ref={tagRef} style={{
          opacity: 0,
          transform: 'translateY(8px)',
          color: 'rgba(255,255,255,0.38)',
          fontSize: '9px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Less noise.&nbsp;&nbsp;More execution.
        </p>
      </div>

    </div>
  );
}
