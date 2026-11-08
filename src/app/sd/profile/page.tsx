
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsers } from '@/lib/sa-store';
import { 
  User, 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Github, 
  Layers, 
  Settings,
  Lock,
  Mail,
  Smartphone,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function SuperDevProfilePage() {
  const router = useRouter();
  // Get Sarah's profile data as mock current dev
  const dev = getSAUsers().find(u => u.id === 'u2')!;

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Technical Node Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Lead infrastructure engineer with L3 platform clearance.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/sd/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Preferences
             </Button>
             <Button variant="outline" onClick={() => router.push('/sd/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Keys & Auth
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Dev Info Hub */}
              <div className="enterprise-card border bg-slate-900 text-white p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary border-4 border-white/10 flex items-center justify-center text-primary-foreground font-black text-5xl shadow-2xl shrink-0">
                       {dev.name.charAt(0)}
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase">{dev.name}</h1>
                          <p className="text-primary font-black uppercase tracking-[0.2em] text-[11px] mt-1 flex items-center gap-2">
                             <Terminal className="h-3 w-3" /> NODE-DEV-4829 • LEVEL: SENIOR INFRA
                          </p>
                       </div>
                       <p className="text-slate-400 font-medium leading-relaxed italic border-l-4 border-primary/40 pl-6 text-lg">
                          "{dev.bio || 'Architecting highly-available platform modules. Specializing in Go microservices, Kubernetes orchestration, and database sharding protocols.'}"
                       </p>
                       <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                          <span className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest"><Mail className="h-4.5 w-4.5 text-primary" /> {dev.email}</span>
                          <span className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest"><Github className="h-4.5 w-4.5 text-primary" /> github.com/sarah-staysync</span>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-6 -bottom-6 h-48 w-48 text-white/5 animate-pulse" />
              </div>

              {/* Tech Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <TechStat label="Node Latency" value="12ms" icon={Zap} color="text-primary" />
                 <TechStat label="Sprint Progress" value={`${dev.progress}%`} icon={Activity} color="text-emerald-500" />
                 <TechStat label="Commit Volume" value="1.2k" icon={Code2} color="text-blue-500" />
              </div>

              {/* Responsibilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="enterprise-card border bg-card p-8 space-y-6">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                       <Layers className="h-4 w-4 text-primary" /> Owned Platform Modules
                    </h3>
                    <div className="space-y-4">
                       {dev.assignedModules?.map(mod => (
                         <div key={mod} className="flex items-center justify-between p-4 bg-muted/20 border-2 border-dashed rounded-2xl group hover:border-primary transition-all">
                            <span className="text-[11px] font-black uppercase text-foreground">{mod}</span>
                            <Badge className="bg-primary/10 text-primary text-[8px] font-black uppercase border-primary/20">Operational</Badge>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="enterprise-card border bg-card p-8 space-y-8">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                       <Cpu className="h-4 w-4 text-primary" /> Compute Resource Factor
                    </h3>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                             <span className="text-muted-foreground">Logical Workload</span>
                             <span className={cn(dev.workload && dev.workload > 80 ? "text-red-600" : "text-primary")}>{dev.workload}%</span>
                          </div>
                          <Progress value={dev.workload} className="h-1.5" />
                       </div>
                       <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <p className="text-[10px] font-bold text-primary uppercase leading-tight italic">
                             "Sarah is currently at peak capacity managing the Auth v3 migration sprint. Threshold stable."
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Stack Insight */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Internal Stack</h4>
                 <div className="flex flex-wrap gap-2">
                    {dev.skills?.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase border border-primary/10 shadow-sm">{skill}</span>
                    ))}
                 </div>
              </div>

              {/* Task Backlog */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Next Release Tasks</h4>
                 </div>
                 <div className="divide-y">
                    {dev.upcomingTasks?.map(task => (
                      <div key={task.id} className="p-5 flex flex-col gap-2 hover:bg-muted/10 transition-colors cursor-pointer">
                         <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-foreground uppercase leading-tight">{task.title}</span>
                            <Badge className="text-[7px] font-black uppercase py-0">{task.priority}</Badge>
                         </div>
                         <p className="text-[9px] text-muted-foreground font-bold uppercase">Deadline: {task.deadline}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Node Status */}
              <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 opacity-80" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">Active Node Health</h4>
                 </div>
                 <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                    This engineering node is mathematically verified. Production access is synced with secondary 2FA protocols.
                 </p>
                 <Separator className="bg-white/10" />
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span>Uptime Factor</span>
                    <span className="text-white">99.99%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TechStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="enterprise-card border bg-card p-6 flex justify-between items-center">
       <div>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
          <p className={cn("text-2xl font-black tracking-tight", color)}>{value}</p>
       </div>
       <Icon className={cn("h-5 w-5 opacity-50", color)} />
    </div>
  );
}
