'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getSAUsers, updateSAUserStatus, logSAAction } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  ArrowLeft, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Mail, 
  Briefcase,
  AlertTriangle,
  Github,
  Cpu,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function DeveloperProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [dev, setDev] = useState<User | null>(null);

  useEffect(() => {
    const users = getSAUsers();
    const found = users.find(u => u.id === id);
    if (found) setDev(found);
  }, [id]);

  if (!dev) return null;

  const handleRevoke = () => {
    updateSAUserStatus(dev.id, 'suspended');
    logSAAction('Revoke Dev Access', dev.name, 'security');
    toast({ variant: "destructive", title: "Access Revoked", description: "Technical credentials have been de-provisioned." });
    router.back();
  };

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="font-black uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Team
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                <Code2 className="h-4 w-4 mr-2" /> Assign Project
             </Button>
             <Button variant="destructive" onClick={handleRevoke} className="h-10 font-bold uppercase text-[11px] tracking-widest shadow-md">
                <Lock className="h-4 w-4 mr-2" /> Revoke Auth
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Profile Header */}
            <div className="enterprise-card border bg-slate-900 text-white p-10 relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-24 h-24 rounded-2xl bg-primary border-4 border-white/10 flex items-center justify-center text-primary-foreground font-black text-4xl shadow-2xl shrink-0">
                     {dev.name.charAt(0)}
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase">{dev.name}</h1>
                        <p className="text-primary font-black uppercase tracking-[0.2em] text-[11px] mt-1 flex items-center gap-2">
                           <Terminal className="h-3 w-3" /> NODE ID: {dev.id} • {dev.status}
                        </p>
                     </div>
                     <p className="text-slate-400 font-medium leading-relaxed italic max-w-2xl">
                        "{dev.bio || 'Core engineering node contributing to platform infrastructure and modular architecture.'}"
                     </p>
                     <div className="flex flex-wrap gap-4 pt-2">
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest"><Mail className="h-3 w-3" /> {dev.email}</span>
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest"><Github className="h-3 w-3" /> github.com/staysync</span>
                     </div>
                  </div>
               </div>
               <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
            </div>

            {/* Assignments & Workload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="enterprise-card border bg-card p-8 space-y-8">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                     <Layers className="h-4 w-4 text-primary" /> Owned Micro-Services
                  </h3>
                  <div className="space-y-4">
                     {dev.assignedModules?.map(mod => (
                       <div key={mod} className="flex items-center justify-between p-4 bg-muted/20 border border-dashed rounded-xl group hover:border-primary transition-all">
                          <span className="text-[11px] font-black uppercase text-foreground">{mod}</span>
                          <Badge className="bg-primary/10 text-primary text-[8px] font-black uppercase">Active</Badge>
                       </div>
                     ))}
                     {(!dev.assignedModules || dev.assignedModules.length === 0) && (
                       <p className="text-[10px] text-muted-foreground uppercase py-8 text-center italic">No modules assigned.</p>
                     )}
                  </div>
               </div>

               <div className="enterprise-card border bg-card p-8 space-y-8">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                     <Cpu className="h-4 w-4 text-primary" /> Compute Load Factor
                  </h3>
                  <div className="space-y-8">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                           <span className="text-muted-foreground">Current Workload</span>
                           <span className={cn(dev.workload && dev.workload > 80 ? "text-red-600" : "text-primary")}>{dev.workload}%</span>
                        </div>
                        <Progress value={dev.workload} className="h-1.5" />
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                           <span className="text-muted-foreground">Sprint Velocity</span>
                           <span className="text-primary">{dev.progress}%</span>
                        </div>
                        <Progress value={dev.progress} className="h-1.5" />
                     </div>
                     <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-[10px] font-bold text-primary uppercase leading-tight italic">
                           "Capacity threshold is nominal. Eligible for upcoming P0 sprints."
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Backlog / Upcoming Tasks */}
            <div className="enterprise-card border bg-card overflow-hidden">
               <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                     <Target className="h-4 w-4 text-primary" /> Sprint Backlog
                  </h3>
                  <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">View History</Button>
               </div>
               <div className="divide-y">
                  {dev.upcomingTasks?.map(task => (
                    <div key={task.id} className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            task.priority === 'high' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-primary"
                          )} />
                          <div>
                             <p className="text-sm font-black text-foreground uppercase tracking-tight">{task.title}</p>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">Deadline: {task.deadline}</p>
                          </div>
                       </div>
                       <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 bg-primary/5 text-primary">
                          {task.status}
                       </Badge>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-8">
             {/* Tech Stack / Skills */}
             <div className="enterprise-card border bg-card p-8 space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Technical Stack</h4>
                <div className="flex flex-wrap gap-2">
                   {dev.skills?.map(skill => (
                     <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase border border-primary/10 shadow-sm">
                        {skill}
                     </span>
                   ))}
                </div>
             </div>

             {/* Audit Intelligence */}
             <div className="enterprise-card border bg-card p-8 space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Session Audit</h4>
                <div className="space-y-4">
                   <AuditRow label="Last Deploy" value="2h ago" icon={Activity} />
                   <AuditRow label="Review Status" value="A+" icon={CheckCircle2} />
                   <AuditRow label="Node Latency" value="12ms" icon={Briefcase} />
                </div>
             </div>

             {/* Compliance Box */}
             <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                   <ShieldCheck className="h-5 w-5 opacity-80" />
                   <h4 className="text-[11px] font-black uppercase tracking-widest">Auth Integrity</h4>
                </div>
                <p className="text-xs font-medium leading-relaxed opacity-90">
                   This developer has L3 clearance. All production deployments require secondary approval from Sarah.dev.
                </p>
                <Separator className="bg-white/10" />
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                   <span>2FA Status</span>
                   <span className="text-white">Active</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AuditRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
       <span className="text-foreground">{value}</span>
    </div>
  );
}
