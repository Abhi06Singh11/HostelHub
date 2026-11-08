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
            <h2 className="text-2xl font-black tracking-tight">Project Portfolio</h2>
            <p className="text-sm text-slate-500 font-medium">Global construction and maintenance management.</p>
          </div>
          <Button 
            onClick={() => router.push('/contractor/projects/new')}
            className="h-10 px-4 font-black text-[14px] uppercase tracking-widest shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" /> Initialize Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              className="enterprise-card border p-6 bg-white space-y-4 group hover:border-primary transition-all cursor-pointer"
              onClick={() => router.push(`/contractor/projects/${proj.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-slate-50 rounded border group-hover:bg-primary/5 transition-colors">
                  <Briefcase className="h-5 w-5 text-slate-600 group-hover:text-primary" />
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className={cn(
                    "text-[12px] font-black uppercase px-2 py-0.5 rounded border",
                    proj.status === 'active' ? "bg-green-100 text-green-700 border-green-200" :
                    proj.status === 'planning' ? "bg-amber-100 text-amber-700 border-amber-200" :
                    "bg-slate-100 text-slate-700 border-slate-200"
                  )}>
                    {proj.status}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => router.push(`/contractor/projects/${proj.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Configuration
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(proj)}>
                        {proj.status === 'planning' ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                        {proj.status === 'planning' ? 'Resume Operations' : 'Hold Operations'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeleteId(proj.id)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Terminate Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{proj.title}</h3>
                <p className="text-[12px] font-black uppercase text-slate-400 flex items-center gap-1">
                  {proj.propertyName} <ExternalLink className="h-2.5 w-2.5" />
                </p>
              </div>

              <div className="pt-4 border-t border-dashed flex justify-between items-center bg-slate-50/50 -mx-6 px-6 py-4">
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">CapEx Budget</p>
                  <p className="text-base font-bold text-slate-900">₹{(proj.budget/100000).toFixed(1)}L</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Target Date</p>
                  <p className="text-base font-bold text-slate-900">{proj.deadline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="enterprise-card border p-12 text-center bg-white">
            <Briefcase className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No active projects found</h3>
            <p className="text-sm text-slate-500 mb-6">Initialize a new project to start tracking your construction operations.</p>
            <Button onClick={() => router.push('/contractor/projects/new')} variant="outline">Create First Project</Button>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project Termination Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the project and all associated operational data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="uppercase font-black text-[13px]">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 uppercase font-black text-[13px]"
            >
              Terminate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
