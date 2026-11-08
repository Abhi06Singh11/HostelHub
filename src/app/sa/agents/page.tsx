'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsersByRole } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  Target, 
  Search, 
  Plus, 
  MoreVertical, 
  UserCheck, 
  TrendingUp, 
  Users, 
  ShieldCheck,
  Briefcase,
  Filter
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

export default function SAAgentsPage() {
  const [agents, setAgents] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setAgents(getSAUsersByRole('agent'));
  }, []);

  const filtered = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Admission Partners</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Verify referral agent credentials, manage commission thresholds, and monitor admission performance.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Provision Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <AgentStat label="Auth Agents" value={agents.length} icon={Target} color="text-primary" bg="bg-primary/5" />
           <AgentStat label="Successful Refs" value="412" icon={UserCheck} color="text-emerald-600" bg="bg-emerald-50" />
           <AgentStat label="Pending Comm." value="₹2.4L" icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
           <AgentStat label="Audit Rating" value="A+" icon={ShieldCheck} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search agent network..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> Filter Verified</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent / Identity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Organization</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Performance</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(agent => (
                  <tr key={agent.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 font-black text-xs uppercase">
                          {agent.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-black text-foreground">{agent.name}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">{agent.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-primary" /> Global Admissions Ltd.</p>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">42 Admissions • 12.4% Conv.</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Commission Ledger</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Verification Docs</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Restrict Ref-Links</DropdownMenuItem>
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

function AgentStat({ label, value, icon: Icon, color, bg }: any) {
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
