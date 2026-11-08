"use client"

import { useState, useEffect } from "react";

export function Clock() {
  const [displayText, setDisplayText] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const savedPrefs = localStorage.getItem("vibeFocusPrefs");
      let clockDisplay = 'time';
      let hour12 = true;
      
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          clockDisplay = parsed.clockDisplay || 'time';
          hour12 = parsed.hour12 ?? true;
        } catch (e) {
          console.error("Failed to parse prefs for clock", e);
        }
      }

      const now = new Date();
      let result = "";

      const timeStr = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: hour12
      });
      
      const dateStr = now.toLocaleDateString([], { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      });

      if (clockDisplay === 'time') {
        result = timeStr;
      } else if (clockDisplay === 'date') {
        result = dateStr;
      } else {
        result = `${dateStr} • ${timeStr}`;
      }

      setDisplayText(result);
    };

    const timer = setInterval(updateTime, 1000);
    updateTime();

    window.addEventListener('storage', updateTime);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', updateTime);
    };
  }, []);

  return (
    <div className="font-headline text-3xl md:text-5xl font-black tabular-nums tracking-tighter text-primary/90 animate-in fade-in slide-in-from-left-4 duration-1000">
      {displayText || "00:00:00"}
    </div>
  );
}
