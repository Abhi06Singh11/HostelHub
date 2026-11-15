'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getAllAgents, updateAgent, deleteAgent } from '@/lib/agent-store';
import { Agent } from '@/lib/types';
import { 
  Search, 
  ShieldCheck, 
  MoreVertical, 
  Trash2, 
  Edit,
  Smartphone,
  Calendar,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SAManageAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setAgents(getAllAgents());
  }, []);

  const handleDelete = (id: string) => {
    deleteAgent(id);
    setAgents(getAllAgents());
    toast({ variant: "destructive", title: "Record Purged", description: "Agent node permanently removed from global registry." });
  };

  const filtered = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.contractorId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <SectionHeader 
          title="Global Agent Registry" 
          subtitle="Administrative Node Control"
        />

        <div className="enterprise-card border bg-card p-4">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search global partners or contractors..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
           </div>
        </div>

        <DataTable>
           <thead>
              <tr className="bg-muted/10 border-b">
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent Identity</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Contractor</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Contact Intel</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Joined On</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {filtered.map(agent => (
                <tr key={agent.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary">
                   <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {agent.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-foreground">{agent.name}</p>
                            <Badge variant="outline" className="text-[7px] font-black uppercase mt-1 border-primary/20 text-primary">{agent.status}</Badge>
                         </div>
                      </div>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase"><Building2 className="h-3 w-3 opacity-50" /> CID: {agent.contractorId}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Master Operator</p>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase"><Smartphone className="h-3 w-3 opacity-50" /> {agent.phone}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{agent.email}</p>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {agent.joiningDate}</p>
                   </td>
                   <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                            <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 rounded-lg"><Edit className="mr-3 h-4 w-4 text-primary" /> Modify Permissions</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(agent.id)} className="text-xs font-bold uppercase py-2.5 rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"><Trash2 className="mr-3 h-4 w-4" /> Global Purge</DropdownMenuItem>
                         </DropdownMenuContent>
                      </DropdownMenu>
                   </td>
                </tr>
              ))}
           </tbody>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
