'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getOwnerProjects, addOwnerProject, getOwnerProperties } from '@/lib/owner-store';
import { MaintenanceProject, Property } from '@/lib/types';
import { 
  Plus, 
  Wrench, 
  Paintbrush, 
  Lightbulb, 
  Droplets, 
  Home, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const categories = [
  { name: 'Plumbing', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Electrical', icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Renovation', icon: Home, color: 'text-primary', bg: 'bg-primary/5' },
  { name: 'Painting', icon: Paintbrush, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Cleaning', icon: Wrench, color: 'text-slate-600', bg: 'bg-slate-50' }
];

export default function OwnerProjectsPage() {
  const [projects, setProjects] = useState<MaintenanceProject[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newProj, setNewProj] = useState({
    title: '',
    propertyId: '',
    category: 'Renovation' as any,
    description: '',
    budget: 50000,
    deadline: ''
  });

  useEffect(() => {
    const load = () => {
      setProjects(getOwnerProjects());
      setProperties(getOwnerProperties());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleAdd = () => {
    const prop = properties.find(p => p.id === newProj.propertyId);
    if (!newProj.title || !newProj.propertyId) {
      toast({ variant: "destructive", title: "Incomplete Request", description: "Please provide a title and select a property." });
      return;
    }
    addOwnerProject({
      ...newProj,
      propertyName: prop?.name || 'Unknown Building',
      spent: 0,
      status: 'planned',
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(false);
    toast({ title: "Project Initialized", description: "Maintenance activity has been scheduled." });
  };

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Maintenance & Capex</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Oversee structural improvements, renovations, and essential repairs across your building portfolio.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> New Work Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Initiate Maintenance Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Project Title *</Label>
                  <Input value={newProj.title} onChange={(e) => setNewProj({...newProj, title: e.target.value})} className="font-bold border-2 h-11" placeholder="e.g. Roof Waterproofing" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Select Building *</Label>
                  <Select onValueChange={(val) => setNewProj({...newProj, propertyId: val})}>
                    <SelectTrigger className="font-bold border-2 h-11"><SelectValue placeholder="Choose building" /></SelectTrigger>
                    <SelectContent>
                      {properties.map(p => (
                        <SelectItem key={p.id} value={p.id} className="font-bold">{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Category</Label>
                    <Select onValueChange={(val) => setNewProj({...newProj, category: val as any})}>
                      <SelectTrigger className="font-bold border-2 h-11"><SelectValue placeholder="Type" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c.name} value={c.name} className="font-bold">{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Budget (₹)</Label>
                    <Input type="number" value={newProj.budget} onChange={(e) => setNewProj({...newProj, budget: Number(e.target.value)})} className="font-bold border-2 h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Brief Description</Label>
                  <Textarea value={newProj.description} onChange={(e) => setNewProj({...newProj, description: e.target.value})} className="font-medium border-2 min-h-[80px]" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-[11px] uppercase tracking-widest">Cancel</Button>
                <Button onClick={handleAdd} className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest">Confirm Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(proj => {
            const cat = categories.find(c => c.name === proj.category) || categories[0];
            const progress = (proj.spent / proj.budget) * 100;
            return (
              <div key={proj.id} className="enterprise-card border bg-card hover:border-primary group transition-all overflow-hidden flex flex-col">
                <div className="p-6 flex-1 space-y-5">
                   <div className="flex justify-between items-start">
                      <div className={cn("p-2.5 rounded-xl border", cat.bg, cat.color)}>
                         <cat.icon className="h-5 w-5" />
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold uppercase px-3 py-1 rounded-full border shadow-sm",
                        proj.status === 'completed' ? "bg-emerald-600 text-white border-emerald-700" :
                        proj.status === 'in-progress' ? "bg-primary text-white border-primary" :
                        "bg-muted text-muted-foreground border-border"
                      )}>{proj.status}</span>
                   </div>
                   
                   <div>
                      <h3 className="text-base font-bold text-foreground leading-tight">{proj.title}</h3>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1.5 flex items-center gap-1.5"><Home className="h-3 w-3 text-primary" /> {proj.propertyName}</p>
                   </div>

                   <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                         <span>Budget Utilization</span>
                         <span className={cn(progress > 90 ? "text-red-600" : "text-primary")}>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                      <div className="flex justify-between text-[11px] font-bold">
                         <span className="text-muted-foreground">₹{proj.spent.toLocaleString()}</span>
                         <span className="text-foreground">₹{proj.budget.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 pt-4 border-t border-dashed">
                      <div className="flex items-center gap-1.5">
                         <Calendar className="h-3 w-3 text-muted-foreground" />
                         <span className="text-[10px] font-bold text-muted-foreground uppercase">{proj.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <Wrench className="h-3 w-3 text-muted-foreground" />
                         <span className="text-[10px] font-bold text-muted-foreground uppercase">{proj.category}</span>
                      </div>
                   </div>
                </div>
                <div className="p-4 bg-muted/30 border-t flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                   <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase px-0 hover:bg-transparent">View Details</Button>
                   <Button size="sm" className="h-8 text-[10px] font-bold uppercase">Update Progress</Button>
                </div>
              </div>
            );
          })}
          {projects.length === 0 && (
             <div className="col-span-full py-24 text-center border-2 border-dashed rounded-2xl bg-muted/5">
                <Wrench className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No active maintenance projects.</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-medium">Buildings in good condition don't require immediate intervention.</p>
             </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
