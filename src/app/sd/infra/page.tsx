'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Server, 
  Activity, 
  ShieldCheck, 
  Zap, 
  RefreshCcw, 
  Database, 
  Globe, 
  Cpu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SuperDevInfraPage() {
  const [uptime, setUptime] = useState(99.99);

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Infrastructure Control</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Real-time surveillance of platform cloud nodes, database clusters, and API gateway health.</p>
          </div>
          <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
            <RefreshCcw className="h-4 w-4 mr-2" /> Global Health Sync
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <InfraStat label="Core API Status" value="Healthy" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
           <InfraStat label="Global Uptime" value={`${uptime}%`} icon={Globe} color="text-primary" bg="bg-primary/5" />
           <InfraStat label="Active Containers" value="42" icon={Server} color="text-blue-600" bg="bg-blue-50" />
           <InfraStat label="DB Replication" value="Stable" icon={Database} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="enterprise-card border bg-card p-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black uppercase tracking-tight">Active Node Clusters</h3>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[8px] font-black uppercase">Load Balanced</Badge>
                 </div>
                 <div className="space-y-6">
                    <ClusterRow name="API Gateway (v2.4)" load={12} status="optimal" />
                    <ClusterRow name="Asset Management DB" load={45} status="optimal" />
                    <ClusterRow name="Image Processing Node" load={82} status="heavy" />
                    <ClusterRow name="Notification Engine" load={5} status="optimal" />
                 </div>
              </div>

              <div className="enterprise-card border bg-slate-900 text-white p-10 relative overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Deployment Manifest</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       <ManifestItem label="Current Version" value="v1.12.8" />
                       <ManifestItem label="SDK Target" value="ES2022" />
                       <ManifestItem label="Region" value="Asia-South1" />
                       <ManifestItem label="Environment" value="Production" />
                    </div>
                 </div>
                 <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>
           </div>

           <div className="space-y-6">
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Resource Utilization</h4>
                 <div className="space-y-5">
                    <ResourceBar label="CPU Compute" value={24} />
                    <ResourceBar label="Memory Pool" value={68} />
                    <ResourceBar label="SSD Storage" value={42} />
                    <ResourceBar label="Network IO" value={12} />
                 </div>
              </div>

              <div className="enterprise-card border bg-destructive/5 border-destructive/20 p-8 space-y-6">
                 <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-red-600">Ops Warning</span>
                 </div>
                 <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                   Image processing node in 'Asia-East1' is reporting high latency (2.4s). Scaler group triggered.
                 </p>
                 <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-widest h-11">
                    Route Traffic
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfraStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}

function ClusterRow({ name, load, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/20 border border-dashed rounded-xl">
       <div className="space-y-1">
          <p className="text-sm font-black text-foreground uppercase">{name}</p>
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-muted-foreground uppercase">Load: {load}%</span>
             <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${load}%` }} />
             </div>
          </div>
       </div>
       <Badge className={cn(
         "font-black uppercase text-[8px] px-3",
         status === 'optimal' ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
       )}>{status}</Badge>
    </div>
  );
}

function ManifestItem({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
       <p className="text-sm font-black text-white">{value}</p>
    </div>
  );
}

function ResourceBar({ label, value }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-foreground">{value}%</span>
       </div>
       <Progress value={value} className="h-1" />
    </div>
  );
}
