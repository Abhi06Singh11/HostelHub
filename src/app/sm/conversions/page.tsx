'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Activity, 
  ArrowUpRight, 
  Layers, 
  Users, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area } from 'recharts';

export default function MarketerConversionsPage() {
  const funnelData = [
    { name: 'Impressions', value: 120000, color: '#94a3b8' },
    { name: 'Clicks', value: 8500, color: '#3b82f6' },
    { name: 'Leads', value: 1200, color: '#245B4A' },
    { name: 'KYC Sync', value: 450, color: '#f59e0b' },
    { name: 'Admission', value: 112, color: '#10b981' },
  ];

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Conversion Matrix</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Deep-dive into the multi-stage marketing funnel, identify drop-off points, and optimize velocity.</p>
          </div>
          <Button variant="outline" className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest border-2">
            <TrendingUp className="h-4 w-4 mr-2" /> Funnel Optimization
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <MatrixStat label="Funnel Depth" value="L4" icon={Layers} color="text-primary" bg="bg-primary/5" />
           <MatrixStat label="Capture Velocity" value="84/day" icon={Zap} color="text-blue-600" bg="bg-blue-50" />
           <MatrixStat label="Total ROI Factor" value="4.8x" icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tight">Acquisition Funnel (Nodes)</h3>
              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ left: 40 }}>
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                       <Tooltip cursor={{fill: 'transparent'}} />
                       <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                          {funnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="enterprise-card border bg-slate-900 text-white p-10 space-y-10 relative overflow-hidden">
              <div className="relative z-10 space-y-8">
                 <h3 className="text-xl font-black uppercase tracking-tight text-primary">Stage Conversion Efficiency</h3>
                 <div className="space-y-10">
                    <StageRow label="Impression -> Click" value={7.2} />
                    <StageRow label="Click -> Lead" value={14.1} />
                    <StageRow label="Lead -> KYC" value={37.5} />
                    <StageRow label="KYC -> Admission" value={24.8} />
                 </div>
              </div>
              <Activity className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5" />
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MatrixStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-4xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}

function StageRow({ label, value }: any) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
          <span className="text-slate-400">{label}</span>
          <span className="text-primary">{value}% Efficiency</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
       </div>
    </div>
  );
}
