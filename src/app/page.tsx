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
      bg: 'bg-blue-50',
      href: '/sa'
    },
    { 
      id: 'superdev' as Role, 
      name: 'Super Developer', 
      desc: 'Infrastructure Health & Technical Ops', 
      icon: Terminal, 
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      href: '/sd'
    },
    { 
      id: 'supermarketer' as Role, 
      name: 'Super Marketer', 
      desc: 'Campaign Engine & Lead Matchmaking', 
      icon: Megaphone, 
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      href: '/sm'
    },
    { 
      id: 'owner' as Role, 
      name: 'Building Owner', 
      desc: 'Property Estate & Financial Oversight', 
      icon: Building2, 
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      href: '/owner'
    },
    { 
      id: 'contractor' as Role, 
      name: 'Contractor', 
      desc: 'Project Execution & Service Expenses', 
      icon: Briefcase, 
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      href: '/contractor'
    },
    { 
      id: 'student' as Role, 
      name: 'Student', 
      desc: 'Accommodation Search & Career Portal', 
      icon: GraduationCap, 
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      href: '/student'
    },
    { 
      id: 'agent' as Role, 
      name: 'Authorized Agent', 
      desc: 'Referral Pipeline & Student Matchmaking', 
      icon: Target, 
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      href: '/agents'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span className="text-[12px] font-black uppercase tracking-widest">Development Mode</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">HostelHub StaySync</h1>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">Select an operational role to enter the dashboard. No authentication required during development.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devRoles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className="group hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer bg-white h-full">
                <CardHeader className="space-y-4">
                  <div className={cn("p-3 w-fit rounded-lg border", role.bg, role.color)}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black tracking-tight">{role.name}</CardTitle>
                    <CardDescription className="text-sm font-medium leading-relaxed">{role.desc}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white justify-between text-sm font-black uppercase tracking-widest transition-all">
                    Launch Dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center opacity-40">
          <p className="text-[12px] font-black uppercase tracking-[0.4em]">© 2026 MYBESTGUIDE.IN. ALL RIGHTS RESERVED.</p>
          <p className="text-[12px] font-bold text-slate-400 mt-2">Website developed by mybestguide — Your trusted development service provider.</p>
        </div>
      </div>
    </div>
  );
}
