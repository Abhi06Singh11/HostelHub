'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  BarChart, 
  LineChart, 
  Activity, 
  TrendingUp, 
  PieChart, 
  Download, 
  Filter, 
  Zap, 
  Target, 
  Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart as ReBar, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area } from 'recharts';

export default function MarketerAnalyticsPage() {
  const chartData = [
    { name: 'Meta', leads: 420, cpa: 450 },
    { name: 'Google', leads: 280, cpa: 680 },
    { name: 'Insta', leads: 310, cpa: 380 },
    { name: 'Affil', leads: 540, cpa: 120 },
  ];

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Marketing Analytics</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Deep-dive into cross-channel performance, conversion cohorts, and growth velocity.</p>
          </div>
          <Button variant="outline" className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest border-2">
            <Download className="h-4 w-4 mr-2" /> Export Growth Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AnalyticStat label="Overall ROI" value="4.2x" icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
           <AnalyticStat label="Market Reach" value="1.4M" icon={Activity} color="text-primary" bg="bg-primary/5" />
           <AnalyticStat label="Avg CAC" value="₹340" icon={Zap} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="enterprise-card border bg-card p-10 space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black uppercase tracking-tight">Channel Lead Volume</h3>
                 <Badge variant="outline" className="bg-primary/5 text-primary text-[8px] font-black uppercase">Live Data</Badge>
              </div>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <ReBar data={chartData}>
                       <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                       <Tooltip cursor={{fill: 'transparent'}} />
                       <Bar dataKey="leads" radius={[8, 8, 0, 0]} barSize={50} fill="hsl(var(--primary))" />
                    </ReBar>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="enterprise-card border bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-xl font-black uppercase tracking-tight text-primary mb-10">CPA Cohort Sync</h3>
                 <div className="space-y-8">
                    {chartData.map(d => (
                      <div key={d.name} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">{d.name} Channel</span>
                            <span className="text-white">₹{d.cpa} / Lead</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(d.leads/600)*100}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <PieChart className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5" />
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AnalyticStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-4xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
