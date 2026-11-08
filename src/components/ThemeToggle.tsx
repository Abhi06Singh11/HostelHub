'use client';

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="h-11 w-11 rounded-xl border border-border bg-background/50 hover:bg-muted/50 hover:border-primary/20 transition-all flex items-center justify-center shrink-0"
    >
      {theme === 'light' ? (
        <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all text-primary" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all text-primary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}