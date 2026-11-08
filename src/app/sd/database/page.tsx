'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDDbInstances } from '@/lib/sd-store';
import { DbInstance } from '@/lib/types';
import { 
  Database, 
  Search, 
  Plus, 
  MoreVertical, 
  Activity, 
  Zap, 
  ShieldCheck, 
  HardDrive,
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  History,
  Lock
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

export default function SuperDevDatabasePage() {
  const [instances, setInstances] = useState<DbInstance[]>([]);

  useEffect(() => {
    setInstances(getSDDbInstances());
  }, []);

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Data Persistence</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Global database cluster surveillance, storage optimization, and backup lifecycle management.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                <History className="h-4 w-4 mr-2" /> Backup History
             </Button>
             <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
                <Lock className="h-4 w-4 mr-2" /> DB Maintenance
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <DbStat label="Active Shards" value={instances.length} icon={Database} color="text-primary" bg="bg-primary/5" />
           <DbStat label="Storage Used" value="462GB" icon={HardDrive} color="text-blue-600" bg="bg-blue-50" />
           <DbStat label="Primary Health" value="100%" icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
           <DbStat label="Replica Lag" value="4ms" icon={Zap} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {instances.map(db => (
             <div key={db.id} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 space-y-8">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-xl border group-hover:bg-primary/5 transition-colors",
                        db.health === 'healthy' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                         <Database className="h-5 w-5" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{db.name}</h3>
                         <Badge variant="outline" className="text-[8px] font-black uppercase mt-1 border-primary/20 text-primary">{db.type} • {db.status}</Badge>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><RefreshCcw className="h-4 w-4" /></Button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                         <span>Storage Utilization</span>
                         <span>{Math.round((db.storageUsed/db.storageTotal)*100)}%</span>
                      </div>
                      <Progress value={(db.storageUsed/db.storageTotal)*100} className="h-1.5" />
                      <p className="text-[10px] font-bold text-foreground text-right">{db.storageUsed}GB / {db.storageTotal}GB</p>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                         <span>Active Connections</span>
                         <span>{db.activeConnections}</span>
                      </div>
                      <Progress value={(db.activeConnections/500)*100} className="h-1.5 bg-muted" />
                      <p className="text-[10px] font-bold text-foreground text-right">Limit: 500</p>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-dashed">
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">Slow Queries</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">Metrics</Button>
                   </div>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2">Run Diagnostics</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2">Snapshot Backup</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs font-bold uppercase py-2 text-red-600">Force Restart</DropdownMenuItem>
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

function DbStat({ label, value, icon: Icon, color, bg }: any) {
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
