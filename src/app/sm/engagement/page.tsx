'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Target, 
  Zap, 
  PieChart, 
  ArrowUpRight, 
  Globe, 
  Smartphone, 
  Monitor,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function MarketerEngagementPage() {
  const chartData = [
    { time: '08:00', active: 124 },
    { time: '12:00', active: 450 },
    { time: '16:00', active: 620 },
    { time: '20:00', active: 890 },
    { time: '00:00', active: 310 },
  ];

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Audience Engagement</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Real-time surveillance of user sessions, retention cohorts, and platform stickiness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <EngageStat label="Live Visitors" value="124" icon={Globe} color="text-primary" bg="bg-primary/5" />
           <EngageStat label="Retention Rate" value="68%" icon={Heart} color="text-red-600" bg="bg-red-50" />
           <EngageStat label="Avg Session" value="4.2m" icon={Activity} color="text-blue-600" bg="bg-blue-50" />
           <EngageStat label="Daily Active" value="1.4k" icon={Users} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="enterprise-card border bg-card p-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black uppercase tracking-tight">Active Usage Cycle</h3>
                    <Badge variant="outline" className="bg-primary/5 text-primary text-[8px] font-black uppercase">Live Nodes</Badge>
                 </div>
                 <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <XAxis dataKey="time" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                          <Tooltip content={() => null} />
                          <Area type="monotone" dataKey="active" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">Device Origin Sync</h4>
                 <div className="space-y-6">
                    <DeviceRow label="Mobile Devices" value={78} icon={Smartphone} />
                    <DeviceRow label="Desktop Nodes" value={22} icon={Monitor} />
                 </div>
                 <Globe className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Top Content Nodes</h4>
                 <div className="space-y-4">
                    <ContentItem label="/hostels/search" views="12.4k" />
                    <ContentItem label="/amenities/wifi" views="8.2k" />
                    <ContentItem label="/student/portal" views="4.1k" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function EngageStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}

function DeviceRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
       <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-[11px] font-bold uppercase text-slate-400">{label}</span>
       </div>
       <span className="text-sm font-black text-white">{value}%</span>
    </div>
  );
}

function ContentItem({ label, views }: any) {
  return (
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground italic underline underline-offset-4 cursor-pointer hover:text-primary">{label}</span>
       <span className="text-foreground">{views}</span>
    </div>
  );
}
