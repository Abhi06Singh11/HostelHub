"use client"

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings as SettingsIcon, Moon, Sun, RotateCcw, Volume2, Music, Clock as ClockIcon, Target, Coffee, Monitor } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Preferences {
  soundAtEnd: boolean;
  soundLast10: boolean;
  notificationVolume: number;
  notificationTone: 'sine' | 'square' | 'triangle' | 'sawtooth';
  countUp: boolean;
  showNotifications: boolean;
  primaryColor: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number;
  clockDisplay: 'time' | 'date' | 'dateTime';
  breakMinutes: number;
  workMinutes: number;
  hour12: boolean;
}

const DEFAULT_PREFS: Preferences = {
  soundAtEnd: true,
  soundLast10: false,
  notificationVolume: 50,
  notificationTone: 'sine',
  countUp: false,
  showNotifications: true,
  primaryColor: "#245B4A",
  bgColor: "#F5F7F6",
  textColor: "#17231E",
  accentColor: "#B9E4D0",
  fontFamily: "Inter",
  fontSize: 100,
  clockDisplay: 'time',
  breakMinutes: 5,
  workMinutes: 25,
  hour12: true,
};

const FONT_OPTIONS = [
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "System", value: "system-ui, sans-serif" },
];

const TONE_OPTIONS = [
  { name: "Classic (Sine)", value: "sine" },
  { name: "Retro (Square)", value: "square" },
  { name: "Soft (Triangle)", value: "triangle" },
  { name: "Sharp (Sawtooth)", value: "sawtooth" },
];

const CLOCK_OPTIONS = [
  { name: "Time Only", value: "time" },
  { name: "Date Only", value: "date" },
  { name: "Date + Time", value: "dateTime" },
];

const PRESET_THEMES = [
  {
    name: "Default (Forest)",
    colors: { primaryColor: "#245B4A", bgColor: "#F5F7F6", textColor: "#17231E", accentColor: "#B9E4D0" }
  },
  {
    name: "Midnight",
    colors: { primaryColor: "#8ED6B4", bgColor: "#101815", textColor: "#F1F6F3", accentColor: "#375B49" }
  },
  {
    name: "Ocean",
    colors: { primaryColor: "#0284c7", bgColor: "#f0f9ff", textColor: "#0c4a6e", accentColor: "#bae6fd" }
  },
  {
    name: "Sunset",
    colors: { primaryColor: "#f43f5e", bgColor: "#fff1f2", textColor: "#4c0519", accentColor: "#ffe4e6" }
  },
  {
    name: "Royal",
    colors: { primaryColor: "#7c3aed", bgColor: "#f5f3ff", textColor: "#1e1b4b", accentColor: "#ddd6fe" }
  },
  {
    name: "Rose",
    colors: { primaryColor: "#e11d48", bgColor: "#fff1f2", textColor: "#881337", accentColor: "#fecdd3" }
  }
];

function hexToHSL(hex: string): string {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return "0 0% 0%";
  
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const darkModeActive = savedTheme === 'dark';
    setIsDark(darkModeActive);
    if (darkModeActive) document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex items-center gap-2 bg-card/60 p-2 px-3 rounded-2xl border-2 shadow-sm border-primary/20 hover:border-primary transition-all">
      <Sun className={`h-4 w-4 ${!isDark ? 'text-primary' : 'text-muted-foreground opacity-40'}`} />
      <Switch 
        id="theme-switch"
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-primary' : 'text-muted-foreground opacity-40'}`} />
    </div>
  );
}

export function Settings() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);

  const applyTheme = useCallback((p: Preferences) => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    
    const primary = p.primaryColor || DEFAULT_PREFS.primaryColor;
    const bg = p.bgColor || DEFAULT_PREFS.bgColor;
    const text = p.textColor || DEFAULT_PREFS.textColor;
    const accent = p.accentColor || DEFAULT_PREFS.accentColor;
    
    const selectedFont = FONT_OPTIONS.find(f => f.name === p.fontFamily)?.value || DEFAULT_PREFS.fontFamily;
    root.style.setProperty("--font-body", selectedFont);
    root.style.fontSize = `18px`; // Locked to 18px base
    root.style.setProperty("--primary", hexToHSL(primary));
    root.style.setProperty("--ring", hexToHSL(primary));

    if (isDark) {
      // Use exact Night Theme tokens for dark mode if settings aren't customized
      if (bg === DEFAULT_PREFS.bgColor) {
        root.style.setProperty("--background", "160 20% 7.8%");
        root.style.setProperty("--foreground", "144 13.8% 95.7%");
        root.style.setProperty("--card", "154.3 17.1% 11.8%");
        root.style.setProperty("--accent", "150 24.7% 28.8%");
        root.style.setProperty("--border", "154.3 17.1% 26%");
      } else {
        root.style.setProperty("--background", hexToHSL(bg));
        root.style.setProperty("--foreground", hexToHSL(text));
      }
    } else {
      root.style.setProperty("--background", hexToHSL(bg));
      root.style.setProperty("--foreground", hexToHSL(text));
      root.style.setProperty("--accent", hexToHSL(accent));
      root.style.setProperty("--card", hexToHSL("#FFFFFF"));
      root.style.setProperty("--border", hexToHSL("#D2DCD6"));
    }
  }, []);

  useEffect(() => {
    const savedPrefs = localStorage.getItem("vibeFocusPrefs");
    let currentPrefs = DEFAULT_PREFS;
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        currentPrefs = { ...DEFAULT_PREFS, ...parsed };
        setPrefs(currentPrefs);
      } catch (e) {}
    }
    applyTheme(currentPrefs);
    
    const handleSync = () => {
      const refreshedPrefs = localStorage.getItem("vibeFocusPrefs");
      if (refreshedPrefs) {
        applyTheme(JSON.parse(refreshedPrefs));
      } else {
        applyTheme(DEFAULT_PREFS);
      }
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, [applyTheme]);

  const updatePref = (key: keyof Preferences, value: any) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    localStorage.setItem("vibeFocusPrefs", JSON.stringify(newPrefs));
    applyTheme(newPrefs);
    window.dispatchEvent(new Event('storage')); 
  };

  const applyPreset = (colors: Partial<Preferences>) => {
    const newPrefs = { ...prefs, ...colors };
    setPrefs(newPrefs);
    localStorage.setItem("vibeFocusPrefs", JSON.stringify(newPrefs));
    applyTheme(newPrefs);
    window.dispatchEvent(new Event('storage'));
  };

  const resetDefaults = () => {
    setPrefs(DEFAULT_PREFS);
    localStorage.setItem("vibeFocusPrefs", JSON.stringify(DEFAULT_PREFS));
    applyTheme(DEFAULT_PREFS);
    window.dispatchEvent(new Event('storage'));
  };

  const workHours = Math.floor(prefs.workMinutes / 60);
  const workMins = prefs.workMinutes % 60;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:max-w-[700px] lg:max-w-[800px] h-[85vh] sm:h-[80vh] rounded-[2rem] sm:rounded-[2.5rem] p-0 overflow-hidden border-2 shadow-3xl bg-background flex flex-col animate-in fade-in zoom-in-95 duration-300">
        <Tabs defaultValue="general" className="flex-1 flex flex-col min-h-0">
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 bg-muted/40 border-b-2 shrink-0">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl sm:text-3xl font-black mb-4">Settings</DialogTitle>
            </DialogHeader>
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1.5 shadow-inner border-2">
              <TabsTrigger value="general" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:shadow-md data-[state=active]:bg-background">General</TabsTrigger>
              <TabsTrigger value="theme" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:shadow-md data-[state=active]:bg-background">Appearance</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-6 sm:px-8 py-8">
              <TabsContent value="general" className="mt-0 space-y-10 animate-in fade-in duration-300 outline-none">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Timer Durations</h3>
                  </div>
                  <Card className="border-2 bg-muted/20 shadow-none border-dashed">
                    <CardContent className="p-4 sm:p-5 space-y-8">
                       <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Work Duration</Label>
                          </div>
                          <span className="text-sm font-black text-primary">{workHours > 0 ? `${workHours}h ` : ''}{workMins}m</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <Label className="text-[9px] uppercase tracking-widest font-black opacity-40">Hours</Label>
                             <Input 
                              type="number" 
                              value={workHours} 
                              onChange={(e) => updatePref('workMinutes', (parseInt(e.target.value) || 0) * 60 + workMins)} 
                              className="h-10 rounded-xl bg-background border-2 font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[9px] uppercase tracking-widest font-black opacity-40">Minutes</Label>
                             <Input 
                              type="number" 
                              value={workMins} 
                              onChange={(e) => updatePref('workMinutes', workHours * 60 + (parseInt(e.target.value) || 0))} 
                              className="h-10 rounded-xl bg-background border-2 font-bold"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coffee className="h-4 w-4 text-secondary-foreground" />
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Break Duration</Label>
                          </div>
                          <span className="text-sm font-black text-secondary-foreground">{prefs.breakMinutes}m</span>
                        </div>
                        <Slider 
                          value={[prefs.breakMinutes]} 
                          onValueChange={([val]) => updatePref('breakMinutes', val)} 
                          min={1} 
                          max={60} 
                          step={1}
                          className="py-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">System</h3>
                  </div>
                  <Card className="border-2 bg-muted/20 shadow-none border-dashed">
                    <CardContent className="p-4 sm:p-5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="browser-notify" className="text-sm font-bold">Browser Notifications</Label>
                          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Alerts when app is in background</p>
                        </div>
                        <Switch 
                          id="browser-notify" 
                          checked={prefs.showNotifications} 
                          onCheckedChange={(val) => updatePref('showNotifications', val)} 
                        />
                      </div>
                      <Separator className="bg-border/50" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="hour-format" className="text-sm font-bold">12-Hour Format</Label>
                          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Toggle AM/PM or 24-hour time</p>
                        </div>
                        <Switch 
                          id="hour-format" 
                          checked={prefs.hour12} 
                          onCheckedChange={(val) => updatePref('hour12', val)} 
                        />
                      </div>
                      <Separator className="bg-border/50" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Clock Display Mode</Label>
                        </div>
                        <Select value={prefs.clockDisplay} onValueChange={(val: any) => updatePref('clockDisplay', val)}>
                          <SelectTrigger className="h-12 rounded-xl bg-background border-2 shadow-sm font-bold">
                            <SelectValue placeholder="Select Display Mode" />
                          </SelectTrigger>
                          <SelectContent className="border-2 shadow-xl">
                            {CLOCK_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value} className="font-bold">
                                {opt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Sound Options</h3>
                  </div>
                  <Card className="border-2 bg-muted/20 shadow-none border-dashed">
                    <CardContent className="p-4 sm:p-5 space-y-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-end" className="text-sm font-bold">Enable Alert Sounds</Label>
                        <Switch 
                          id="sound-end" 
                          checked={prefs.soundAtEnd} 
                          onCheckedChange={(val) => updatePref('soundAtEnd', val)} 
                        />
                      </div>
                      
                      <Separator className="bg-border/50" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4 text-muted-foreground" />
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Volume</Label>
                          </div>
                          <span className="text-xs font-black text-primary">{prefs.notificationVolume}%</span>
                        </div>
                        <Slider 
                          value={[prefs.notificationVolume]} 
                          onValueChange={([val]) => updatePref('notificationVolume', val)} 
                          min={0} 
                          max={100} 
                          step={5}
                          className="py-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Music className="h-4 w-4 text-muted-foreground" />
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Notification Tone</Label>
                        </div>
                        <Select value={prefs.notificationTone} onValueChange={(val: any) => updatePref('notificationTone', val)}>
                          <SelectTrigger className="h-12 rounded-xl bg-background border-2 shadow-sm font-bold">
                            <SelectValue placeholder="Select Tone" />
                          </SelectTrigger>
                          <SelectContent className="border-2 shadow-xl">
                            {TONE_OPTIONS.map(tone => (
                              <SelectItem key={tone.value} value={tone.value} className="font-bold">
                                {tone.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="theme" className="mt-0 space-y-10 animate-in fade-in duration-300 outline-none">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Typography</h3>
                  </div>
                  <Card className="border-2 bg-muted/20 shadow-none border-dashed">
                    <CardContent className="p-4 sm:p-5 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Font Family</Label>
                        <Select value={prefs.fontFamily} onValueChange={(val) => updatePref('fontFamily', val)}>
                          <SelectTrigger className="h-12 rounded-xl bg-background border-2 shadow-sm font-bold">
                            <SelectValue placeholder="Select Font" />
                          </SelectTrigger>
                          <SelectContent className="border-2 shadow-xl">
                            {FONT_OPTIONS.map(font => (
                              <SelectItem key={font.name} value={font.name} style={{ fontFamily: font.value }} className="font-bold">
                                {font.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Scale (Reference Only)</Label>
                          <span className="text-xs font-black text-primary">18px Root</span>
                        </div>
                        <Slider 
                          value={[prefs.fontSize]} 
                          onValueChange={([val]) => updatePref('fontSize', val)} 
                          min={80} 
                          max={120} 
                          step={5}
                          disabled
                          className="py-2 opacity-50"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Preset Themes</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRESET_THEMES.map((theme) => (
                      <Button
                        key={theme.name}
                        variant="outline"
                        onClick={() => applyPreset(theme.colors)}
                        className={`h-auto py-3 sm:py-4 px-2 flex flex-col gap-2 rounded-xl border-2 hover:border-primary/50 hover:bg-primary/10 transition-all shadow-md group ${prefs.primaryColor === theme.colors.primaryColor ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}`}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 shadow-sm" style={{ backgroundColor: theme.colors.primaryColor }} />
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 shadow-sm" style={{ backgroundColor: theme.colors.bgColor }} />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">{theme.name}</span>
                      </Button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-4 bg-primary rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Custom Colors</h3>
                  </div>
                  <Card className="border-2 bg-muted/20 shadow-none border-dashed">
                    <CardContent className="p-4 sm:p-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary</Label>
                          <div className="flex gap-2">
                            <Input 
                              type="color" 
                              value={prefs.primaryColor || DEFAULT_PREFS.primaryColor} 
                              onChange={(e) => updatePref('primaryColor', e.target.value)}
                              className="w-11 h-11 p-1 rounded-lg bg-background border-2 cursor-pointer shadow-sm"
                            />
                            <Input 
                              value={prefs.primaryColor || DEFAULT_PREFS.primaryColor} 
                              onChange={(e) => updatePref('primaryColor', e.target.value)}
                              className="flex-1 font-mono text-xs font-bold uppercase h-11 border-2"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Background</Label>
                          <div className="flex gap-2">
                            <Input 
                              type="color" 
                              value={prefs.bgColor || DEFAULT_PREFS.bgColor} 
                              onChange={(e) => updatePref('bgColor', e.target.value)}
                              className="w-11 h-11 p-1 rounded-lg bg-background border-2 cursor-pointer shadow-sm"
                            />
                            <Input 
                              value={prefs.bgColor || DEFAULT_PREFS.bgColor} 
                              onChange={(e) => updatePref('bgColor', e.target.value)}
                              className="flex-1 font-mono text-xs font-bold uppercase h-11 border-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                <div className="h-20" />
              </TabsContent>
            </div>
          </ScrollArea>

          <div className="p-6 sm:p-8 bg-muted/50 border-t-2 flex gap-4 mt-auto shrink-0">
            <Button 
              variant="outline" 
              className="flex-1 rounded-2xl border-dashed border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all font-black uppercase tracking-[0.2em] text-[10px] h-12 sm:h-14 shadow-md"
              onClick={resetDefaults}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Workspace
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
