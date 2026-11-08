'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsersByRole, logSAAction } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  Code2, 
  MoreVertical, 
  Terminal, 
  Activity, 
  Search, 
  Plus, 
  ShieldCheck, 
  Cpu,
  Layers,
  Zap
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

export default function SADevelopersPage() {
  const [devs, setDevs] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDevs(getSAUsersByRole('superdev'));
  }, []);

  const filtered = devs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Engineering Intelligence</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage core infrastructure developers, assign technical clusters, and monitor deployment actions.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Assign Dev Node
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <DevStat label="Active Engineers" value={devs.length} icon={Cpu} color="text-primary" bg="bg-primary/5" />
           <DevStat label="Ops Latency" value="14ms" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
           <DevStat label="Assigned Clusters" value="4" icon={Layers} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search engineering nodes..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Developer / Node</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Stack</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Last Deploy</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Terminal</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(dev => (
                  <tr key={dev.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-primary font-black text-xs uppercase">
                          <Terminal className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-black text-foreground">{dev.name}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">{dev.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex flex-wrap gap-1.5">
                          <Badge variant="outline" className="text-[8px] font-black uppercase bg-primary/5 border-primary/20">Auth Engine</Badge>
                          <Badge variant="outline" className="text-[8px] font-black uppercase bg-primary/5 border-primary/20">DB Cluster</Badge>
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1.5"><Activity className="h-3 w-3 text-emerald-600" /> {dev.lastLogin || '2024-06-01'}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Assign Cluster</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">View Trace Logs</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Revoke Keys</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
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

function DevStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}