'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsersByRole } from '@/lib/sa-store';
import { User as UserType } from '@/lib/types';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  Activity,
  User,
  Mail,
  Smartphone,
  Globe,
  Database,
  Layers,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function SuperDevTeamPage() {
  const router = useRouter();
  const [devs, setDevs] = useState<UserType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDevs(getSAUsersByRole('superdev'));
  }, []);

  const filtered = devs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Engineering Roster</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage technical cluster access, assign developer permissions, and monitor technical login sessions.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Onboard Developer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <TeamStat label="Total Engineers" value={devs.length} icon={Users} color="text-primary" bg="bg-primary/5" />
           <TeamStat label="Access Levels" value="3" icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
           <TeamStat label="Active Now" value="2" icon={Activity} color="text-blue-600" bg="bg-blue-50" />
           <TeamStat label="Code Reviews" value="12" icon={Code2} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email or node ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Engineer Identity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Cluster Assignments</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Session Logic</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Node Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(dev => (
                  <tr 
                    key={dev.id} 
                    onClick={() => router.push(`/sd/team/${dev.id}`)}
                    className="hover:bg-muted/20 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-primary font-black text-xs uppercase shadow-sm group-hover:scale-105 transition-transform">
                          <Terminal className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase">{dev.name}</p>
                           <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase"><Mail className="h-2.5 w-2.5" /> {dev.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex flex-wrap gap-1.5">
                          {dev.assignedModules?.slice(0, 2).map(mod => (
                            <Badge key={mod} variant="outline" className="text-[8px] font-black uppercase py-0 border-primary/20 bg-primary/5 text-primary">
                              {mod}
                            </Badge>
                          ))}
                          {(dev.assignedModules?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-[8px] font-black uppercase py-0">+{dev.assignedModules!.length - 2}</Badge>
                          )}
                          {(!dev.assignedModules || dev.assignedModules.length === 0) && (
                            <span className="text-[9px] text-muted-foreground uppercase italic">Unassigned</span>
                          )}
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] font-black text-foreground uppercase flex items-center gap-1.5"><Activity className="h-3 w-3 text-emerald-600" /> Active Session</p>
                       <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1">Workload: {dev.workload || 0}%</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                         <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                               <DropdownMenuItem onClick={() => router.push(`/sd/team/${dev.id}`)} className="text-xs font-bold uppercase py-2.5">View Intelligence</DropdownMenuItem>
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Assign Cluster</DropdownMenuItem>
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Revoke Auth</DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TeamStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
