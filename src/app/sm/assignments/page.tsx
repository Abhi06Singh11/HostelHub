'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Zap, 
  Target, 
  Users, 
  Activity,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MarketerAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    { id: 'as1', lead: 'Rohan Gupta', source: 'Meta Ads', assignedTo: 'Marketing Mike', status: 'contacted', date: '2024-06-01' },
    { id: 'as2', lead: 'Ananya Rao', source: 'Google', assignedTo: 'Unassigned', status: 'new', date: '2024-06-02' },
    { id: 'as3', lead: 'Kabir Singh', source: 'Direct', assignedTo: 'Priya Agent', status: 'interested', date: '2024-05-30' },
  ]);

  const handleReassign = (name: string) => {
    toast({ title: "Logic Re-routed", description: `Lead for ${name} has been assigned to a secondary agent.` });
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Lead Assignment</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Coordinate lead distribution between internal marketers and admission agents.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Zap className="h-4 w-4 mr-2" /> Auto-Assign All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AssignStat label="Pending Assignment" value={assignments.filter(a => a.assignedTo === 'Unassigned').length} icon={UserPlus} color="text-amber-600" bg="bg-amber-50" />
           <AssignStat label="Active Follow-ups" value="12" icon={Activity} color="text-primary" bg="bg-primary/5" />
           <AssignStat label="Avg. Resp Time" value="14m" icon={RefreshCcw} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Lead Routing Ledger</span>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Agents</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Lead Identity / Source</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Specialist</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Funnel Status</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assignments.map(a => (
                  <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                       <p className="text-sm font-black text-foreground uppercase tracking-tight">{a.lead}</p>
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">{a.source} • Captured: {a.date}</p>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px]",
                            a.assignedTo === 'Unassigned' ? "bg-red-50 text-red-600" : "bg-primary/10 text-primary"
                          )}>
                             {a.assignedTo.charAt(0)}
                          </div>
                          <p className={cn("text-xs font-bold uppercase", a.assignedTo === 'Unassigned' ? "text-red-600" : "text-foreground")}>{a.assignedTo}</p>
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 bg-primary/5 text-primary">{a.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem onClick={() => handleReassign(a.lead)} className="text-xs font-bold uppercase py-2.5">Manual Re-assign</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Mark Priority</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Discard Lead</DropdownMenuItem>
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

function AssignStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
