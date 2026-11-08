'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSMTasks } from '@/lib/sm-store';
import { MarketingTask } from '@/lib/types';
import { 
  Calendar, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Activity, 
  User, 
  Users,
  Target,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function MarketerTeamPage() {
  const [tasks, setTasks] = useState<MarketingTask[]>([]);

  useEffect(() => {
    setTasks(getSMTasks());
  }, []);

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Marketing Ops Team</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate internal marketing workflows, assign campaign responsibilities, and monitor task completion.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Assign Growth Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <TeamStat label="Active Members" value="4" icon={Users} color="text-primary" bg="bg-primary/5" />
           <TeamStat label="Open Tasks" value={tasks.filter(t => t.status !== 'completed').length} icon={Zap} color="text-blue-600" bg="bg-blue-50" />
           <TeamStat label="Sprint Progress" value="82%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50" />
           <TeamStat label="Auth Nodes" value="Stable" icon={ShieldCheck} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Growth Sprint Backlog</span>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Tasks</Button>
          </div>
          <div className="divide-y">
             {tasks.map(task => (
               <div key={task.id} className="p-6 hover:bg-muted/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group border-l-4 border-l-transparent hover:border-l-primary">
                  <div className="flex gap-6 items-start">
                     <div className={cn(
                       "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors shadow-sm",
                       task.status === 'completed' ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-primary/5 border-primary/20 text-primary"
                     )}>
                        <Activity className="h-6 w-6" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-base font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {task.assignee}</span>
                           <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Deadline: {task.deadline}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                        <Badge variant="outline" className={cn(
                          "text-[8px] font-black uppercase py-0 border-primary/30",
                          task.status === 'completed' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                        )}>{task.status}</Badge>
                        <p className="text-[9px] font-black text-muted-foreground mt-2 uppercase tracking-widest">Priority: {task.priority}</p>
                     </div>
                     <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
               </div>
             ))}
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
        <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
