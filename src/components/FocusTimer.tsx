"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Brain, Coffee as CoffeeIcon, Repeat, Target, ArrowRight, Clock, Maximize } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface FocusTimerProps {
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

type TimerMode = 'work' | 'break';

const SOUNDS = {
  WORK_START: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  WORK_COMPLETE: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
  BREAK_START: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  TRANSITION: "https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3",
};

export function FocusTimer({ isFocusMode, onToggleFocusMode }: FocusTimerProps) {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState<TimerMode>('work');
  const [remaining, setRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [isCountingUp, setIsCountingUp] = useState(false);
  
  const [isLoopMode, setIsLoopMode] = useState(false);
  const [totalGoalMinutes, setTotalGoalMinutes] = useState(60);
  const [totalElapsedFocus, setTotalElapsedFocus] = useState(0); 
  
  const wakeLockRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vibeFocusSessions");
    if (saved) setSessions(parseInt(saved));
    
    const handleSync = () => {
      const savedPrefs = localStorage.getItem("vibeFocusPrefs");
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          if (parsed.workMinutes !== undefined) {
             setWorkMinutes(parsed.workMinutes);
             if (!isActive && mode === 'work') setRemaining(parsed.workMinutes * 60);
          }
          if (parsed.breakMinutes !== undefined) {
            setBreakMinutes(parsed.breakMinutes);
            if (!isActive && mode === 'break') setRemaining(parsed.breakMinutes * 60);
          }
        } catch (e) {}
      }
    };
    
    handleSync();
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, [isActive, mode]);

  const playSfx = useCallback((url: string) => {
    try {
      const savedPrefs = localStorage.getItem("vibeFocusPrefs");
      if (!savedPrefs) return;
      const p = JSON.parse(savedPrefs);
      if (!p.soundAtEnd) return;
      
      const audio = new Audio(url);
      audio.volume = (p.notificationVolume || 50) / 100;
      audio.play().catch(() => {});
    } catch (e) {}
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    const savedPrefs = localStorage.getItem("vibeFocusPrefs");
    if (!savedPrefs) return;
    const p = JSON.parse(savedPrefs);
    
    if (document.hidden && p.showNotifications && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "https://picsum.photos/seed/focus/128/128"
      });
    }
  }, []);

  const handleSessionComplete = useCallback(() => {
    if (mode === 'work') {
      setSessions(prev => {
        const next = prev + 1;
        localStorage.setItem("vibeFocusSessions", next.toString());
        return next;
      });
      
      let currentElapsed = 0;
      if (isLoopMode) {
        setTotalElapsedFocus(prev => {
          currentElapsed = prev + (workMinutes * 60);
          return currentElapsed;
        });
      }

      const nextElapsedLocal = isLoopMode ? (totalElapsedFocus + (workMinutes * 60)) : 0;
      const goalReached = isLoopMode && nextElapsedLocal >= (totalGoalMinutes * 60);

      if (goalReached) {
        setIsActive(false);
        toast({ title: "Goal Achieved!", description: "Total focus duration completed." });
        playSfx(SOUNDS.WORK_COMPLETE);
        showNotification("Goal Achieved!", "You've reached your focus goal for today.");
        return;
      }

      if (!isFocusMode) {
        setIsActive(false);
        toast({ title: "Focus Complete!", description: "Great work!" });
        playSfx(SOUNDS.WORK_COMPLETE);
        showNotification("Focus Session Done", "Session completed successfully.");
        setRemaining(workMinutes * 60);
        return;
      }

      toast({ title: "Focus Complete!", description: "Time for a break." });
      showNotification("Focus Session Done", "Time to step away and recharge.");
      playSfx(SOUNDS.WORK_COMPLETE);
      setMode('break');
      setRemaining(breakMinutes * 60);
      playSfx(SOUNDS.BREAK_START);
    } else {
      toast({ title: "Break Finished!", description: "Ready to work?" });
      showNotification("Break Finished", "Ready for another focus session?");
      playSfx(SOUNDS.WORK_COMPLETE);
      setMode('work');
      setRemaining(workMinutes * 60);
      playSfx(SOUNDS.WORK_START);
    }
  }, [mode, isFocusMode, isLoopMode, workMinutes, breakMinutes, totalElapsedFocus, totalGoalMinutes, playSfx, showNotification]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        if (isCountingUp) {
          setRemaining(prev => prev + 1);
        } else {
          setRemaining(prev => {
            if (prev > 0) {
              const next = prev - 1;
              if (isFocusMode && mode === 'work' && !isCountingUp) {
                if (next === 120) {
                  showNotification("2 Minutes Remaining", "Your break is approaching.");
                  playSfx(SOUNDS.TRANSITION);
                }
                if (next === 60) {
                  showNotification("1 Minute Remaining", "Final push before the break!");
                  playSfx(SOUNDS.TRANSITION);
                }
              }
              return next;
            }
            const savedPrefs = localStorage.getItem("vibeFocusPrefs");
            const p = savedPrefs ? JSON.parse(savedPrefs) : null;
            if (p?.countUp && !isLoopMode) {
              setIsCountingUp(true);
              return 1;
            }
            handleSessionComplete();
            return 0;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCountingUp, handleSessionComplete, isLoopMode, isFocusMode, mode, playSfx, showNotification]);

  useEffect(() => {
    playSfx(SOUNDS.TRANSITION);
  }, [isFocusMode, playSfx]);

  const handleStart = () => {
    setIsActive(true);
    playSfx(SOUNDS.WORK_START);
  };
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setIsCountingUp(false);
    setRemaining(workMinutes * 60);
    setTotalElapsedFocus(0);
    setMode('work');
  };

  const updateDuration = (hours: number, mins: number) => {
    const totalMinutes = (hours * 60) + mins;
    const clampedVal = Math.max(1, totalMinutes);
    const saved = localStorage.getItem("vibeFocusPrefs");
    const prefs = saved ? JSON.parse(saved) : {};
    
    setWorkMinutes(clampedVal);
    if (!isActive && mode === 'work') setRemaining(clampedVal * 60);
    localStorage.setItem("vibeFocusPrefs", JSON.stringify({...prefs, workMinutes: clampedVal}));
    window.dispatchEvent(new Event('storage'));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentTotal = (mode === 'work' ? workMinutes : breakMinutes) * 60;
  const progress = isCountingUp ? 100 : (currentTotal > 0 ? (remaining / currentTotal) * 100 : 0);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const currentHours = Math.floor(workMinutes / 60);
  const currentMins = workMinutes % 60;

  return (
    <Card className={`relative overflow-hidden transition-all duration-700 w-full ${isFocusMode ? 'border-none shadow-none bg-transparent' : 'border-2 shadow-xl bg-card rounded-[2.5rem] max-w-[840px] h-full flex flex-col justify-center'} ${isActive ? 'animate-active-pulse' : ''}`}>
      
      <CardContent className={`flex flex-col items-center transition-all duration-700 ${isFocusMode ? 'p-0 justify-center gap-12' : 'p-10 pt-16 gap-8'}`}>
        
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000">
          <div className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 backdrop-blur-md transition-colors ${mode === 'work' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-secondary/20 border-secondary/40 text-secondary-foreground'}`}>
            {mode === 'work' ? <Brain className="h-4 w-4" /> : <CoffeeIcon className="h-4 w-4" />}
            <span className="font-black uppercase tracking-[0.2em] text-[10px]">
              {mode === 'work' ? (isCountingUp ? 'Overtime' : 'Deep Work') : 'Break Time'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 animate-in slide-in-from-top-2 duration-700">
             {isFocusMode ? (
               <div className="flex flex-col items-center gap-3">
                 <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Status</span>
                  <ArrowRight className="h-3 w-3" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-foreground">{mode === 'work' ? `Deep Work | ${currentHours > 0 ? `${currentHours}h ` : ''}${currentMins}m` : `Break | ${breakMinutes}m`}</span>
                  </div>
                 </div>
                 
                 {mode === 'work' && (
                   <div className="flex flex-col items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
                     <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-foreground">
                       <CoffeeIcon className="h-3 w-3" />
                       <span className="text-[9px] font-black">NEXT: BREAK • {breakMinutes}M</span>
                     </div>
                     <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest text-center">
                       After focus, a {breakMinutes}-minute break is available.
                     </p>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Target className="h-3 w-3" /> {currentHours > 0 ? `${currentHours}h ` : ''}{currentMins}m Focus Duration</span>
               </div>
             )}
          </div>
        </div>

        <div className="relative flex items-center justify-center w-full max-w-[min(85vw,24rem)] aspect-square">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 transition-all duration-1000 overflow-visible">
            <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth={isFocusMode ? "3" : "8"} fill="transparent" className="text-muted/20" />
            <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth={isFocusMode ? "3" : "8"} fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset: strokeDashoffset, transition: isActive ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.5s ease-out' }} className={`${mode === 'work' ? (isCountingUp ? 'text-destructive' : 'text-primary') : 'text-secondary'} transition-all`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`font-headline ${isFocusMode ? 'text-6xl sm:text-8xl' : 'text-4xl sm:text-6xl'} font-black tabular-nums tracking-tighter transition-all ${isCountingUp ? 'text-destructive animate-pulse' : ''}`}>
              {formatTime(remaining)}
            </span>
          </div>
        </div>

        {!isFocusMode && (
          <div className="flex flex-col gap-6 w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Focus Duration</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                   <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                   <Input 
                    type="number" 
                    placeholder="Hr"
                    value={currentHours === 0 ? "" : currentHours} 
                    onChange={(e) => updateDuration(parseInt(e.target.value) || 0, currentMins)} 
                    className="bg-primary/5 border-2 border-primary/20 text-primary font-black text-center h-12 rounded-xl text-base focus-visible:ring-1 focus-visible:ring-primary shadow-sm pl-10" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase opacity-30">Hours</span>
                </div>
                <div className="relative group">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                  <Input 
                    type="number" 
                    placeholder="Min"
                    value={currentMins} 
                    onChange={(e) => updateDuration(currentHours, parseInt(e.target.value) || 0)} 
                    className="bg-primary/5 border-2 border-primary/20 text-primary font-black text-center h-12 rounded-xl text-base focus-visible:ring-1 focus-visible:ring-primary shadow-sm pl-10" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase opacity-30">Mins</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-2xl border-2 border-dashed border-primary/20 shadow-inner">
              <div className="space-y-0.5">
                <Label htmlFor="loop-toggle" className="text-xs font-black flex items-center gap-1.5"><Repeat className="h-4 w-4" /> LOOP MODE</Label>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Auto-repeat cycles</p>
              </div>
              <Switch id="loop-toggle" checked={isLoopMode} onCheckedChange={setIsLoopMode} className="scale-[0.9]" />
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 w-full max-w-[400px]">
          <div className="flex items-center gap-3 w-full">
            {!isActive ? (
              <Button onClick={handleStart} className="flex-1 h-14 text-sm font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all bg-primary border-2 border-primary/50" variant="default">
                <Play className="mr-2 h-5 w-5 fill-current" /> START
              </Button>
            ) : (
              <Button onClick={handlePause} className="flex-1 h-14 text-sm font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all bg-secondary text-secondary-foreground border-2" variant="secondary">
                <Pause className="mr-2 h-5 w-5 fill-current" /> PAUSE
              </Button>
            )}
            <Button onClick={handleReset} variant="outline" size="icon" className="h-14 w-14 shrink-0 rounded-2xl border-2 hover:bg-muted/60 transition-all shadow-md">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {!isFocusMode ? (
            <Button onClick={onToggleFocusMode} variant="ghost" className="w-full h-12 rounded-xl border-2 border-dashed border-primary/40 hover:bg-primary/5 font-black uppercase tracking-widest text-[10px] shadow-sm">
              <Maximize className="mr-2 h-4 w-4" /> Enter Focus Mode
            </Button>
          ) : (
            <Button onClick={onToggleFocusMode} variant="ghost" className="text-muted-foreground hover:text-foreground font-black uppercase tracking-[0.4em] text-[10px] py-4">
              Exit Session
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
