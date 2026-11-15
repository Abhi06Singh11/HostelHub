'use client';
import { useState, useEffect } from 'react';
import { Role } from '@/lib/types';
import { 
  Building2, 
  Megaphone, 
  Briefcase, 
  Shield, 
  Terminal, 
  Target, 
  GraduationCap, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function EntryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <RoleSelector />;
}

function RoleSelector() {
  const devRoles = [
    { 
      id: 'superadmin' as Role, 
      name: 'Super Admin', 
      desc: 'Platform Intelligence & Global Governance', 
      icon: Shield, 
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      href: '/sa'
    },
    { 
      id: 'superdev' as Role, 
      name: 'Super Developer', 
      desc: 'Infrastructure Health & Technical Ops', 
      icon: Terminal, 
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      href: '/sd'
    },
    { 
      id: 'supermarketer' as Role, 
      name: 'Super Marketer', 
      desc: 'Campaign Engine & Lead Matchmaking', 
      icon: Megaphone, 
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-950/20',
      href: '/sm'
    },
    { 
      id: 'owner' as Role, 
      name: 'Building Owner', 
      desc: 'Property Estate & Financial Oversight', 
      icon: Building2, 
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      href: '/owner'
    },
    { 
      id: 'contractor' as Role, 
      name: 'Contractor', 
      desc: 'Project Execution & Service Expenses', 
      icon: Briefcase, 
      color: 'text-slate-600',
      bg: 'bg-slate-50 dark:bg-slate-900/20',
      href: '/contractor'
    },
    { 
      id: 'student' as Role, 
      name: 'Student', 
      desc: 'Accommodation Search & Career Portal', 
      icon: GraduationCap, 
      color: 'text-pink-600',
      bg: 'bg-pink-50 dark:bg-pink-950/20',
      href: '/student'
    },
    { 
      id: 'agent' as Role, 
      name: 'Authorized Agent', 
      desc: 'Referral Pipeline & Student Matchmaking', 
      icon: Target, 
      color: 'text-cyan-600',
      bg: 'bg-cyan-50 dark:bg-cyan-950/20',
      href: '/agents'
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center relative">
      <div className="max-w-6xl w-full space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span className="text-[12px] font-black uppercase tracking-widest">Development Node</span>
          </div>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase">StaySync Hub</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium uppercase text-[12px] tracking-widest">Select an operational identity cluster to initialize the dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devRoles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className="group hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer bg-card h-full border-2 border-border/40">
                <CardHeader className="space-y-4">
                  <div className={cn("p-3 w-fit rounded-xl border-2 transition-transform group-hover:scale-110", role.bg, role.color)}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-black tracking-tight uppercase text-foreground">{role.name}</CardTitle>
                    <CardDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-relaxed">{role.desc}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground justify-between text-[11px] font-black uppercase tracking-widest transition-all rounded-xl border-2 border-transparent group-hover:border-primary/20">
                    Access Cluster
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">© 2026 HOSTELHUB CORE. GLOBAL OPERATIONS.</p>
          <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Managed Cluster: v2.4.1 Production Node</p>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}