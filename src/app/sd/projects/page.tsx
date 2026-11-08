'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDProjects } from '@/lib/sd-store';
import { TechnicalProject } from '@/lib/types';
import { 
  Rocket, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Activity, 
  Calendar, 
  User, 
  Github,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SuperDevProjectsPage() {
  const [projects, setProjects] = useState<TechnicalProject[]>([]);

  useEffect(() => {
    setProjects(getSDProjects());
  }, []);

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Technical Roadmap</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Monitor core engineering sprints, track feature development, and oversee codebase health.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Start Sprint
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(proj => (
            <div key={proj.id} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary">
                     <Rocket className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[8px] font-black uppercase border",
                    proj.priority === 'p0' ? "bg-red-50 text-red-600 border-red-200" : "bg-muted text-muted-foreground"
                  )}>{proj.priority}</Badge>
               </div>

               <div className="space-y-1 mb-8">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{proj.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1.5"><Github className="h-3 w-3" /> {proj.repo}</p>
               </div>

               <div className="space-y-6 flex-1">
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Build Progress</span>
                        <span className="text-[10px] font-black text-primary">{proj.progress}%</span>
                     </div>
                     <Progress value={proj.progress} className="h-1.5" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-border">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Sprint Lead</p>
                        <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-primary" /> {proj.lead}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Target Ship</p>
                        <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {proj.deadline}</p>
                     </div>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-6 mt-6">
                  <Badge className="bg-primary/5 text-primary text-[8px] font-black uppercase px-3 py-1 border-primary/10">{proj.status}</Badge>
                  <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">View Repo <ArrowRight className="h-3 w-3 ml-2" /></Button>
               </div>
            </div>
          ))}
          <button className="h-full min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
             <Plus className="h-10 w-10" />
             <span className="text-[11px] font-black uppercase tracking-widest">Initialize New Project</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
