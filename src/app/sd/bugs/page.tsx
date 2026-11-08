'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDBugs, updateBugStatus } from '@/lib/sd-store';
import { Bug as BugType } from '@/lib/types';
import { 
  Bug, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  User, 
  Layers,
  ArrowRight,
  ShieldAlert
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

export default function SuperDevBugsPage() {
  const [bugs, setBugs] = useState<BugType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setBugs(getSDBugs());
  }, []);

  const handleStatus = (id: string, status: BugType['status']) => {
    updateBugStatus(id, status);
    setBugs(getSDBugs());
    toast({ title: "Incident Updated", description: `Bug marked as ${status}.` });
  };

  const filtered = bugs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.component.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Defect Tracking</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Surveillance and triage of high-severity technical incidents and platform defects.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Log Incident
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <StatusStat label="Critical Bugs" value={bugs.filter(b => b.severity === 'critical').length} icon={ShieldAlert} color="text-red-600" bg="bg-red-50" />
           <StatusStat label="Active Issues" value={bugs.filter(b => b.status !== 'closed').length} icon={AlertCircle} color="text-amber-600" bg="bg-amber-50" />
           <StatusStat label="Fixing Now" value={bugs.filter(b => b.status === 'fixing').length} icon={Clock} color="text-primary" bg="bg-primary/5" />
           <StatusStat label="Resolved (MTD)" value="24" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bugs by title or component..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <div className="flex gap-2">
               {['all', 'new', 'open', 'fixing', 'verified'].map(f => (
                 <button key={f} className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border hover:bg-muted transition-all">{f}</button>
               ))}
            </div>
          </div>

          <div className="divide-y">
            {filtered.map(bug => (
              <div key={bug.id} className="p-6 hover:bg-muted/30 transition-all border-l-4 border-l-transparent hover:border-l-primary flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                <div className="flex gap-6 items-start">
                   <div className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors shadow-sm",
                     bug.severity === 'critical' ? "bg-red-50 border-red-200 text-red-600" : "bg-primary/5 border-primary/20 text-primary"
                   )}>
                     <Bug className="h-6 w-6" />
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                         <h4 className="text-[15px] font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{bug.title}</h4>
                         <Badge variant="outline" className={cn(
                           "text-[7px] font-black uppercase py-0 border-border",
                           bug.severity === 'critical' ? "bg-red-600 text-white border-red-700" : "bg-muted text-muted-foreground"
                         )}>{bug.severity}</Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground leading-tight italic">Component: {bug.component}</p>
                      <div className="flex items-center gap-4 pt-1">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><User className="h-3 w-3" /> {bug.reportedBy}</span>
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Clock className="h-3 w-3" /> {bug.createdAt}</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right hidden md:block">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase border shadow-sm",
                        bug.status === 'fixing' ? "bg-primary text-white border-primary" :
                        bug.status === 'new' ? "bg-amber-500 text-white border-amber-600" :
                        "bg-muted text-muted-foreground border-border"
                      )}>{bug.status}</span>
                      <p className="text-[9px] font-black text-muted-foreground mt-2 uppercase tracking-widest">Assignee: {bug.assignedTo || 'Unassigned'}</p>
                   </div>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                         <DropdownMenuItem onClick={() => handleStatus(bug.id, 'fixing')} className="text-xs font-bold uppercase py-2.5">Start Fixing</DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleStatus(bug.id, 'verified')} className="text-xs font-bold uppercase py-2.5">Verify Resolution</DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleStatus(bug.id, 'closed')} className="text-xs font-bold uppercase py-2.5 text-emerald-600">Close Bug</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Delete Record</DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusStat({ label, value, icon: Icon, color, bg }: any) {
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
