
'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, User, Mail, Lock, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-secondary p-12 text-secondary-foreground flex-col justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 fill-current" />
          <span className="text-2xl font-black tracking-tighter uppercase">StaySync</span>
        </div>
        <div className="space-y-6 max-w-md">
           <h2 className="text-6xl font-black leading-[0.9] uppercase tracking-tighter">Scale Your <br />Empire Today.</h2>
           <p className="text-lg opacity-60 uppercase font-medium tracking-tight">Join the network of top-tier hostel operators and property managers worldwide.</p>
        </div>
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary-foreground shadow-[0_0_8px_white]" />
              <span className="text-[10px] font-black uppercase tracking-widest">1,400+ Active Nodes</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm space-y-8 my-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Register</h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Initialize your organizational node in the ecosystem.</p>
          </div>

          <form className="space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Legal Name</Label>
                   <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input placeholder="John Doe" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Organization Name</Label>
                   <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input placeholder="StaySync Premium Ltd." className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</Label>
                   <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input placeholder="admin@organization.com" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary" />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Create Access Key</Label>
                   <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                      <Input type="password" placeholder="••••••••" className="h-12 pl-11 border-2 font-bold focus-visible:ring-secondary" />
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed text-center px-4">
                  By initializing this node, you agree to the <span className="text-secondary underline cursor-pointer">Protocol Terms</span> and <span className="text-secondary underline cursor-pointer">Security Standards</span>.
                </p>
                <Button className="w-full h-14 bg-secondary text-white font-black uppercase tracking-[0.2em] shadow-xl text-[12px]">
                   Initialize Hub <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </div>
          </form>

          <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            Already have an account? <Link href="/login" className="text-secondary hover:underline font-black">Login Authenticator</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
