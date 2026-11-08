'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDModules } from '@/lib/sd-store';
import { AppModule } from '@/lib/types';
import { 
  Layers, 
  Plus, 
  Search, 
  MoreVertical, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Database,
  ArrowRight,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SuperDevModulesPage() {
  const [modules, setModules] = useState<AppModule[]>([]);

  useEffect(() => {
    setModules(getSDModules());
  }, []);

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">App Architect</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate platform microservices, manage internal libraries, and monitor modular health.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Register Module
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <ModuleStat label="Total Modules" value={modules.length} icon={Layers} color="text-primary" bg="bg-primary/5" />
           <ModuleStat label="Healthy" value={modules.filter(m => m.health === 'healthy').length} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <ModuleStat label="Warnings" value={modules.filter(m => m.health === 'warning').length} icon={AlertTriangle} color="text-amber-600" bg="bg-amber-50" />
           <ModuleStat label="SDK Version" value="v1.12" icon={ShieldCheck} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {modules.map(mod => (
             <div key={mod.id} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-xl border group-hover:bg-primary/5 transition-colors",
                        mod.health === 'healthy' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      )}>
                         <Layers className="h-5 w-5" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{mod.name}</h3>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase">Version: {mod.version} • Sync: {mod.lastUpdate}</p>
                      </div>
                   </div>
                   <Badge className={cn(
                     "text-[8px] font-black uppercase px-3 py-1",
                     mod.status === 'enabled' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                   )}>{mod.status}</Badge>
                </div>

                <div className="space-y-6 flex-1">
                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                         <span>Compute Load Factor</span>
                         <span className={cn(mod.loadFactor > 80 ? "text-red-600" : "text-primary")}>{mod.loadFactor}%</span>
                      </div>
                      <Progress value={mod.loadFactor} className="h-1" />
                   </div>

                   <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Module Dependencies</p>
                      <div className="flex flex-wrap gap-2">
                         {mod.dependencies.map(d => (
                           <span key={d} className="px-2 py-1 rounded bg-muted/50 border text-[8px] font-black uppercase text-muted-foreground">{d}</span>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-6 mt-6 border-t border-dashed">
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">View API</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">Trace Logs</Button>
                   </div>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2">Update Version</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2">Dependency Audit</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2 text-red-600">Disable Module</DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ModuleStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
