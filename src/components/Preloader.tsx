"use client"

import { useState, useEffect } from "react";

/**
 * @fileOverview A high-fidelity preloader component based on the brand identity.
 * Features an infinity loop animation, brand text, and a typewriter tagline.
 */
export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [tagline, setTagline] = useState("");
  const fullText = "We build you focus. Simple..!!";

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeEffect = () => {
      if (!isDeleting) {
        setTagline(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 1200);
          return;
        }
      } else {
        setTagline(fullText.substring(0, i));
        i--;
        if (i < 0) {
          isDeleting = false;
          i = 0;
        }
      }
      timeoutId = setTimeout(typeEffect, isDeleting ? 30 : 60);
    };

    typeEffect();

    // The snippet specified a 2.5s duration
    const hideTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setIsVisible(false), 600);
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] transition-opacity duration-600 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
        <svg className="w-[140px] h-auto mb-2" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
          </defs>

          {/* Animated infinity stroke */}
          <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1
            c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            stroke="url(#infinity-gradient)"
            className="animate-infinity-stroke drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]"
            style={{
              strokeDasharray: '2.42777px, 242.77666px',
              strokeDashoffset: 0
            }}
          ></path>

          {/* Static background stroke */}
          <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1
            c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            strokeWidth="5"
            stroke="#4E4FEB"
            fill="none"
            className="opacity-[0.08]"
          ></path>
        </svg>

        <div className="text-[#22d3ee] text-base font-medium tracking-[0.5px] mb-1">FocusHub</div>
        <div className="text-white text-4xl font-bold tracking-[1px] mb-2 font-headline">MyBestGuide</div>
        <div className="h-[24px] overflow-hidden whitespace-nowrap border-r-2 border-[#22d3ee] text-[#94a3b8] text-sm font-medium animate-cursor-blink px-1 flex items-center">
          {tagline}
        </div>
      </div>
    </div>
  );
}
