'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, User, Mail, Lock, ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex flex-1 bg-secondary p-12 text-secondary-foreground flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hostel-build/1920/1080')] opacity-20 grayscale mix-blend-overlay" />
        <div className="relative z-10 flex items-center gap-2">
          <Zap className="h-8 w-8 fill-current" />
          <span className="text-2xl font-black tracking-tighter uppercase">StaySync</span>
        </div>
        <div className="relative z-10 space-y-6 max-w-md">
           <Badge className="bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-[0.3em] mb-4">Protocol Initialization</Badge>
           <h2 className="text-7xl font-black leading-[0.85] uppercase tracking-tighter text-secondary-foreground">Scale Your <br />Empire Today.</h2>
           <p className="text-lg opacity-80 uppercase font-medium tracking-tight leading-relaxed">Join the global mesh of top-tier hostel operators. Initialize your organizational node and automate your operational lifecycle.</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-secondary-foreground animate-pulse shadow-[0_0_15px_white]" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">1,400+ Active Nodes in Sync</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background relative overflow-y-auto">
        <div className="w-full max-w-sm space-y-10 my-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Register Hub</h1>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Map your organizational identity to the StaySync global grid.</p>
          </div>

          <form className="space-y-8">
             <div className="space-y-5">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Legal Representative</Label>
                   <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary opacity-50" />
                      <Input placeholder="Full Name" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary rounded-xl" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Entity / Organization</Label>
                   <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary opacity-50" />
                      <Input placeholder="StaySync Premium Ltd." className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary rounded-xl" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Operational Email</Label>
                   <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary opacity-50" />
                      <Input placeholder="admin@organization.com" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary rounded-xl" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Generate Master Key</Label>
                   <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary opacity-50" />
                      <Input type="password" placeholder="••••••••" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary rounded-xl" />
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-xl border-2 border-dashed flex gap-4">
                  <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed tracking-wider">
                    By initializing this node, you agree to the <span className="text-secondary underline cursor-pointer decoration-dashed underline-offset-4">Governance Protocol</span> and <span className="text-secondary underline cursor-pointer decoration-dashed underline-offset-4">Security Standards</span>.
                  </p>
                </div>
                <Button className="w-full h-14 bg-secondary text-white font-black uppercase tracking-[0.3em] shadow-2xl text-[12px] rounded-2xl group">
                   Initialize Hub <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
             </div>
          </form>

          <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            Existing Node? <Link href="/login" className="text-secondary hover:underline font-black decoration-primary">Authenticate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
