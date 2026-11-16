
'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-primary p-12 text-primary-foreground flex-col justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 fill-current" />
          <span className="text-2xl font-black tracking-tighter uppercase">StaySync</span>
        </div>
        <div className="space-y-6 max-w-md">
           <h2 className="text-6xl font-black leading-[0.9] uppercase tracking-tighter">Unified <br />Platform Control.</h2>
           <p className="text-lg opacity-60 uppercase font-medium tracking-tight">Access your administrative node to synchronize property, resident, and financial data.</p>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">StaySync Global Infrastructure v2.4.1</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Login</h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Provide your credentials to authenticate session.</p>
          </div>

          <form className="space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</Label>
                   <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input placeholder="name@organization.com" className="h-12 pl-11 border-2 font-bold focus-visible:ring-primary" />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                      <Link href="/forgot-password" size="sm" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot Access Key?</Link>
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input type="password" placeholder="••••••••" className="h-12 pl-11 border-2 font-bold focus-visible:ring-primary" />
                   </div>
                </div>
             </div>

             <Button className="w-full h-14 bg-primary text-white font-black uppercase tracking-[0.2em] shadow-xl text-[12px]">
                Authenticate Session <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-dashed" /></div>
             <div className="relative flex justify-center text-[9px] uppercase font-black"><span className="bg-background px-4 text-muted-foreground tracking-[0.2em]">Or Sync via Identity</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" className="h-12 font-bold uppercase text-[10px] tracking-widest border-2">
                Google
             </Button>
             <Button variant="outline" className="h-12 font-bold uppercase text-[10px] tracking-widest border-2">
                <Github className="mr-2 h-4 w-4" /> Github
             </Button>
          </div>

          <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            New to the ecosystem? <Link href="/register" className="text-primary hover:underline">Register Hub</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
