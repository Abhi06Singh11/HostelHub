'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  Terminal, 
  Megaphone, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Target,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/types';

export default function LoginPage() {
  const [isDevMode, setIsDevMode] = useState(false);

  const devRoles = [
    { id: 'superadmin' as Role, name: 'Super Admin', icon: Shield, color: 'text-primary', bg: 'bg-primary/5', href: '/sa' },
    { id: 'owner' as Role, name: 'Owner', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50', href: '/owner' },
    { id: 'contractor' as Role, name: 'Contractor', icon: Briefcase, color: 'text-slate-600', bg: 'bg-slate-50', href: '/contractor' },
    { id: 'student' as Role, name: 'Student', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/student' },
    { id: 'agent' as Role, name: 'Agent', icon: Target, color: 'text-cyan-600', bg: 'bg-cyan-50', href: '/agents' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Brand Side Panel */}
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

      {/* Auth Interaction Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background relative overflow-y-auto">
        <div className="w-full max-w-sm space-y-10 my-12">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Authenticate</h1>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Provide your administrative credentials to initialize a secure session.</p>
            </div>
          </div>

          {/* Dev Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
            <div className="space-y-0.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Developer Walkthrough</Label>
              <p className="text-[9px] text-muted-foreground font-bold uppercase">Bypass Auth to explore roles</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn("text-[9px] font-black uppercase transition-colors", isDevMode ? "text-primary" : "text-muted-foreground")}>DEV MODE</span>
              <Switch checked={isDevMode} onCheckedChange={setIsDevMode} />
            </div>
          </div>

          {!isDevMode ? (
            <div className="space-y-10 animate-in fade-in duration-500">
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
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
               <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" /> Select Identity Node
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Access role-specific dashboards instantly in development mode.</p>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                  {devRoles.map((role) => (
                    <Link key={role.id} href={role.href} className="block w-full">
                       <Button 
                         variant="outline" 
                         className="w-full h-auto py-4 px-6 justify-between border-2 hover:border-primary/40 hover:bg-primary/5 transition-all group rounded-2xl"
                       >
                          <div className="flex items-center gap-4">
                             <div className={cn("p-2.5 rounded-xl border transition-transform group-hover:scale-110", role.bg, role.color)}>
                                <role.icon className="h-5 w-5" />
                             </div>
                             <span className="text-sm font-black uppercase tracking-widest text-foreground">{role.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                       </Button>
                    </Link>
                  ))}
               </div>

               <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                  <p className="text-[9px] font-bold text-primary uppercase text-center leading-relaxed tracking-wider italic">
                    "Dev Mode bypasses standard authentication and security rules for rapid functional prototyping."
                  </p>
               </div>
            </div>
          )}

          <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            {isDevMode ? "Return to Secure Port?" : "New to the ecosystem?"} 
            <button 
              onClick={() => setIsDevMode(!isDevMode)} 
              className="ml-1 text-primary hover:underline decoration-secondary font-black"
            >
              {isDevMode ? "Authenticate Now" : "Initialize Hub"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
