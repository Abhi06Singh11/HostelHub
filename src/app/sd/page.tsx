'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader } from '@/components/DashboardComponents';
import { 
  Server, 
  Cpu, 
  Zap, 
  Rocket, 
  Bug, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  RefreshCcw,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getSDHealth, getSDDeployments, getSDBugs } from '@/lib/sd-store';
import { Deployment, Bug as BugType, SystemHealth } from '@/lib/types';
import { ResponsiveContainer, XAxis, Tooltip, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SuperDevDashboard() {
  const router = useRouter();
  const [health, setHealth] = useState<SystemHealth[]>([]);
  const [deploys, setDeploys] = useState<Deployment[]>([]);
  const [bugs, setBugs] = useState<BugType[]>([]);

  useEffect(() => {
    const load = () => {
      setHealth(getSDHealth());
      setDeploys(getSDDeployments());
      setBugs(getSDBugs());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    uptime: '99.99%',
    avgLatency: '42ms',
    activeBugs: bugs.filter(b => b.status !== 'closed').length,
    lastDeploy: deploys[0]?.version || 'N/A'
  };

  const performanceData = [
    { time: '00:00', cpu: 12, ram: 45 },
    { time: '04:00', cpu: 15, ram: 48 },
    { time: '08:00', cpu: 42, ram: 62 },
    { time: '12:00', cpu: 65, ram: 82 },
    { time: '16:00', cpu: 58, ram: 78 },
    { time: '20:00', cpu: 22, ram: 55 },
  ];

  return (
    <DashboardLayout role="superdev">
      <SectionHeader 
        title="Operations Intelligence" 
        subtitle="Technical Command Center"
        action={{
          label: "Sync Node",
          icon: RefreshCcw,
          onClick: () => {}
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Global Uptime" 
          value={stats.uptime} 
          sub="24h Platform Cycle" 
          icon={Globe} 
          color="text-emerald-500" 
          bg="bg-emerald-50"
          onClick={() => router.push('/sd/infra')}
        />
        <StatCard 
          title="Service Latency" 
          value={stats.avgLatency} 
          sub="Avg Node Response" 
          icon={Zap} 
          color="text-primary" 
          bg="bg-primary/5"
          onClick={() => router.push('/sd/api')}
        />
        <StatCard 
          title="Active Incidents" 
          value={stats.activeBugs} 
          sub="Unresolved Technical Bugs" 
          icon={Bug} 
          color="text-red-500" 
          bg="bg-red-50"
          onClick={() => router.push('/sd/bugs')}
          trend={{ value: "Urgent", isUp: false }}
        />
        <StatCard 
          title="Release Cycle" 
          value={stats.lastDeploy} 
          sub="Current Production Version" 
          icon={Rocket} 
          color="text-blue-500" 
          bg="bg-blue-50"
          onClick={() => router.push('/sd/releases')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="enterprise-card border bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Cluster Performance Loop</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground opacity-40" />
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                    <Tooltip content={() => null} />
                    <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="ram" stroke="#3b82f6" strokeWidth={3} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">System Node Health</span>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div className="divide-y">
              {health.map(h => (
                <div key={h.service} className="p-5 flex items-center justify-between hover:bg-muted/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      h.status === 'healthy' ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-red-50 border-red-200 text-red-600"
                    )}>
                      {h.status === 'healthy' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-foreground uppercase tracking-tight">{h.service}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Latency: {h.latency} • {h.lastChecked}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase border",
                    h.status === 'healthy' ? "bg-emerald-600 text-white border-emerald-700" : "bg-red-600 text-white border-red-700"
                  )}>{h.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Deployment Hub</h4>
                <Rocket className="h-5 w-5 text-primary opacity-50" />
              </div>
              <div className="space-y-5">
                {deploys.slice(0, 3).map(d => (
                  <div key={d.id} className="flex justify-between items-center border-l-2 border-primary/20 pl-4 py-1">
                    <div>
                      <p className="text-xs font-black uppercase">{d.version}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">{d.environment} • {d.timestamp}</p>
                    </div>
                    <Badge className="bg-emerald-600 text-white text-[8px] font-black uppercase">{d.status}</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={() => router.push('/sd/releases')}>
                Pipeline Manager
              </Button>
            </div>
          </div>

          <div className="enterprise-card border bg-card p-8 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Resource Pool</h4>
            <div className="space-y-6">
              <ResourceRow label="SSD Persistence" value={72} color="bg-primary" />
              <ResourceRow label="Compute Nodes" value={24} color="bg-blue-500" />
              <ResourceRow label="Cache Memory" value={88} color="bg-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ResourceRow({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
