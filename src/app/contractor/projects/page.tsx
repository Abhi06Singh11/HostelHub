'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredProjects, deleteProject, updateProject } from '@/lib/project-store';
import { Project } from '@/lib/types';
import { 
  Briefcase, 
  Plus, 
  MoreVertical, 
  Edit, 
  Pause, 
  Play, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function ContractorProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
      setProjects(getStoredProjects());
      setDeleteId(null);
      toast({ title: "Project Deleted", description: "The project has been removed successfully." });
    }
  };

  const toggleStatus = (proj: Project) => {
    const newStatus = proj.status === 'planning' ? 'active' : 'planning';
    updateProject(proj.id, { status: newStatus });
    setProjects(getStoredProjects());
    toast({ 
      title: proj.status === 'planning' ? "Project Resumed" : "Project on Hold", 
      description: `Project ${proj.title} is now ${newStatus}.` 
    });
  };

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">Project Portfolio</h2>
            <p className="text-sm text-muted-foreground font-medium uppercase">Global construction and maintenance management.</p>
          </div>
          <Button 
            onClick={() => router.push('/contractor/projects/new')}
            className="h-11 px-8 font-black text-[13px] uppercase tracking-widest shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" /> Initialize Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              className="enterprise-card border p-6 bg-card space-y-4 group hover:border-primary transition-all cursor-pointer"
              onClick={() => router.push(`/contractor/projects/${proj.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-muted rounded-xl border border-border group-hover:bg-primary/5 transition-colors">
                  <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border shadow-sm",
                    proj.status === 'active' ? "bg-emerald-500 text-white border-emerald-600" :
                    proj.status === 'planning' ? "bg-amber-500 text-white border-amber-600" :
                    "bg-muted text-muted-foreground border-border"
                  )}>
                    {proj.status}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 border-2 shadow-2xl rounded-2xl">
                      <DropdownMenuItem onClick={() => router.push(`/contractor/projects/${proj.id}/edit`)} className="text-[12px] font-bold py-2.5 rounded-xl cursor-pointer">
                        <Edit className="mr-3 h-4 w-4 text-primary" /> Edit Configuration
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(proj)} className="text-[12px] font-bold py-2.5 rounded-xl cursor-pointer">
                        {proj.status === 'planning' ? <Play className="mr-3 h-4 w-4 text-primary" /> : <Pause className="mr-3 h-4 w-4 text-primary" />}
                        {proj.status === 'planning' ? 'Resume Operations' : 'Hold Operations'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeleteId(proj.id)}
                        className="text-[12px] font-bold py-2.5 rounded-xl text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="mr-3 h-4 w-4" /> Terminate Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground leading-tight tracking-tight uppercase">{proj.title}</h3>
                <p className="text-[11px] font-black uppercase text-muted-foreground flex items-center gap-1.5 tracking-widest">
                  {proj.propertyName} <ExternalLink className="h-3 w-3 opacity-50" />
                </p>
              </div>

              <div className="pt-6 border-t border-dashed flex justify-between items-center bg-muted/30 -mx-6 px-6 py-5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">CapEx Budget</p>
                  <p className="text-lg font-black text-foreground tabular-nums">₹{(proj.budget/100000).toFixed(1)}L</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">Target Date</p>
                  <p className="text-lg font-black text-foreground tabular-nums">{proj.deadline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="enterprise-card border p-20 text-center bg-card rounded-[2rem]">
            <Briefcase className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">No active projects found</h3>
            <p className="text-sm text-muted-foreground mb-8 uppercase font-medium max-w-sm mx-auto leading-relaxed">Initialize a new project node to start tracking your construction and facility operations.</p>
            <Button onClick={() => router.push('/contractor/projects/new')} variant="outline" className="h-12 px-10 font-black uppercase tracking-widest border-2 rounded-xl shadow-lg">
               Initialize First Project
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2rem] border-2 p-10 shadow-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight text-foreground">Decommission Project Node?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-bold uppercase tracking-widest leading-relaxed text-muted-foreground">
              This will permanently terminate the digital ledger for this project. All associated operational data will be purged. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-10">
            <AlertDialogCancel className="h-14 px-10 rounded-2xl font-black uppercase text-[11px] tracking-widest border-2">Abort</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="h-14 px-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[11px] tracking-widest shadow-xl"
            >
              Terminate Node
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}