"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Coffee, Heart, QrCode, Minus, Plus, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CoffeeSupport() {
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullText = "Buy a coffee for me. !!";
  const upiId = "abhi8900singh@oksbi";
  const basePrice = 99;
  const totalAmount = quantity * basePrice;
  
  const upiUri = `upi://pay?pa=${upiId}&pn=Abhi&am=${totalAmount}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUri)}`;

  useEffect(() => {
    let i = 0;
    setIsTypingComplete(false);
    setTypewriterText("");
    
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsTypingComplete(true), 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setShowQR(false);
    }}>
      <DialogTrigger asChild>
        <div className="fixed bottom-8 right-8 z-50 group">
          <div className="absolute inset-[-40px] pointer-events-none animate-spin-slow">
            <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
              <path
                id="textPath"
                d="M 80, 80 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
                fill="none"
              />
              <text className="text-[11px] font-black uppercase tracking-[0.2em] fill-primary/70 dark:fill-primary/50">
                <textPath href="#textPath" startOffset="0%">
                  {typewriterText}
                </textPath>
              </text>
            </svg>
          </div>

          <Button 
            className="h-16 w-16 rounded-full shadow-3xl bg-[#f59e0b] hover:bg-[#d97706] text-white border-4 border-background transition-all hover:scale-110 active:scale-95 animate-coffee-pulse group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]" 
            size="icon"
            aria-label="Support the developer by buying a coffee"
          >
            <Coffee className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:max-w-[650px] lg:max-w-[700px] h-[90vh] sm:h-[85vh] rounded-[2.5rem] p-0 overflow-hidden border-2 shadow-3xl bg-background flex flex-col animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6 sm:p-8 bg-muted/40 border-b-2 shrink-0">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl sm:text-3xl font-black flex items-center gap-3">
              Support Project <Heart className="h-6 w-6 text-red-500 fill-red-500 animate-pulse" />
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 sm:p-10 pb-16">
            {!showQR ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Choose Coffee Quantity</Label>
                  <div className="flex items-center gap-6 bg-muted/30 p-4 sm:p-6 rounded-[2rem] border-2 border-dashed shadow-inner">
                    <Button variant="outline" size="icon" onClick={decrement} className="rounded-full h-14 w-14 sm:h-16 sm:w-16 border-2 shadow-md bg-background hover:scale-105 transition-transform">
                      <Minus className="h-6 w-6" />
                    </Button>
                    <div className="flex-1 text-center">
                       <span className="text-5xl sm:text-6xl font-black tabular-nums tracking-tighter">{quantity}</span>
                    </div>
                    <Button variant="outline" size="icon" onClick={increment} className="rounded-full h-14 w-14 sm:h-16 sm:w-16 border-2 shadow-md bg-background hover:scale-105 transition-transform">
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-[2.5rem] border-2 border-primary/10 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex-1 flex flex-row items-center justify-between w-full gap-4">
                    <div className="text-left space-y-1">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block">Price Per Cup</span>
                      <span className="text-2xl font-black text-foreground/80 tabular-nums">₹{basePrice}</span>
                    </div>
                    <div className="w-px h-12 bg-primary/10 hidden sm:block" />
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest block">Total Contribution</span>
                      <span className="text-5xl font-black text-primary tabular-nums leading-none">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-20 text-xl font-black gap-4 rounded-[2rem] shadow-2xl transition-all border-2 border-primary/50 hover:scale-[1.01] active:scale-95 mt-4" 
                  onClick={() => setShowQR(true)}
                  variant="default"
                >
                  <QrCode className="h-7 w-7" /> GENERATE SECURE QR
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 py-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white p-8 rounded-[3rem] shadow-3xl border-4 border-primary/20 relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-xl group-hover:blur-2xl transition-all opacity-50" />
                  <Image 
                    src={qrUrl} 
                    alt="UPI QR Code" 
                    width={260} 
                    height={260}
                    className="rounded-2xl relative z-10"
                  />
                </div>
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 px-8 py-2 rounded-full border-2 border-primary/20 inline-block">
                    <p className="text-3xl font-black text-primary tabular-nums">₹{totalAmount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Scan with any UPI App</p>
                    <p className="text-[11px] font-black text-primary/60 tracking-[0.2em] bg-muted/50 py-2 px-6 rounded-full border-2 border-dashed">{upiId}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setShowQR(false)} className="text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 text-muted-foreground transition-all rounded-full px-8 h-10 border border-transparent hover:border-primary/20">
                  <RotateCcw className="mr-2 h-3 w-3" /> Modify Contribution
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 sm:p-8 bg-muted/50 border-t-2 shrink-0 mt-auto">
          <DialogFooter className="sm:justify-center text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-60">
              Thank you for your generous support
            </p>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
