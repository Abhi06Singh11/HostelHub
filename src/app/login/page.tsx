'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex flex-1 bg-primary p-12 text-primary-foreground flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hostel-night/1920/1080')] opacity-10 grayscale mix-blend-overlay" />
        <div className="relative z-10 flex items-center gap-2">
          <Zap className="h-8 w-8 fill-current" />
          <span className="text-2xl font-black tracking-tighter uppercase">StaySync</span>
        </div>
        <div className="relative z-10 space-y-6 max-w-md">
           <Badge className="bg-secondary text-secondary-foreground font-black uppercase text-[10px] tracking-[0.3em] mb-4">Secured Session</Badge>
           <h2 className="text-7xl font-black leading-[0.85] uppercase tracking-tighter">Unified <br />Platform Control.</h2>
           <p className="text-lg opacity-60 uppercase font-medium tracking-tight leading-relaxed">Access your administrative node to synchronize property, resident, and financial data across the cluster.</p>
        </div>
        <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">StaySync Global Infrastructure v2.4.1</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background relative">
        <div className="w-full max-w-sm space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Authenticate</h1>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Provide your administrative credentials to initialize a secure session.</p>
          </div>

          <form className="space-y-8">
             <div className="space-y-5">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity Mesh (Email)</Label>
                   <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-40" />
                      <Input placeholder="name@organization.com" className="h-12 pl-11 border-2 font-bold focus-visible:ring-primary rounded-xl" />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Key</Label>
                      <Link href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-dashed underline-offset-4">Forgot Key?</Link>
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-40" />
                      <Input type="password" placeholder="••••••••" className="h-12 pl-11 border-2 font-bold focus-visible:ring-primary rounded-xl" />
                   </div>
                </div>
             </div>

             <Button className="w-full h-14 bg-primary text-white font-black uppercase tracking-[0.3em] shadow-2xl text-[12px] rounded-2xl group">
                Enter Cluster <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Button>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-dashed" /></div>
             <div className="relative flex justify-center text-[9px] uppercase font-black"><span className="bg-background px-6 text-muted-foreground tracking-[0.3em]">Or Sync via OAuth</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" className="h-12 font-bold uppercase text-[10px] tracking-widest border-2 rounded-xl">
                Google Node
             </Button>
             <Button variant="outline" className="h-12 font-bold uppercase text-[10px] tracking-widest border-2 rounded-xl">
                Github Auth
             </Button>
          </div>

          <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            New to the ecosystem? <Link href="/register" className="text-primary hover:underline decoration-secondary">Initialize Hub</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Badge } from '@/components/ui/badge';
