'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader } from '@/components/DashboardComponents';
import { 
  Target, 
  Activity, 
  Megaphone, 
  TrendingUp, 
  Zap, 
  Calendar, 
  BarChart as BarChartIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSMLeads, getSMCampaigns } from '@/lib/sm-store';
import { MarketingLead, MarketingCampaign } from '@/lib/types';
import { ResponsiveContainer, XAxis, Tooltip, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function SuperMarketerDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<MarketingLead[]>([]);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);

  useEffect(() => {
    const load = () => {
      setLeads(getSMLeads());
      setCampaigns(getSMCampaigns());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    totalLeads: leads.length,
    conversions: leads.filter(l => l.status === 'converted').length,
    activeCamps: campaigns.filter(c => c.status === 'active').length,
    expenditure: campaigns.reduce((acc, c) => acc + c.spent, 0).toLocaleString()
  };

  const performanceData = [
    { day: 'Mon', leads: 42, conversions: 8 },
    { day: 'Tue', leads: 58, conversions: 12 },
    { day: 'Wed', leads: 45, conversions: 15 },
    { day: 'Thu', leads: 72, conversions: 22 },
    { day: 'Fri', leads: 90, conversions: 28 },
    { day: 'Sat', leads: 35, conversions: 10 },
    { day: 'Sun', leads: 25, conversions: 5 },
  ];

  return (
    <DashboardLayout role="supermarketer">
      <SectionHeader 
        title="Marketing Intelligence" 
        subtitle="Growth Engine"
        action={{
          label: "Launch Drive",
          icon: Megaphone,
          onClick: () => router.push('/sm/campaigns')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Captured" 
          value={stats.totalLeads} 
          sub="+12% from last week" 
          icon={Target} 
          color="text-primary" 
          onClick={() => router.push('/sm/leads')}
          trend={{ value: "+12%", isUp: true }}
        />
        <StatCard 
          title="Conversions" 
          value={stats.conversions} 
          sub="14.2% Success Rate" 
          icon={Zap} 
          color="text-emerald-600" 
          bg="bg-emerald-50"
          onClick={() => router.push('/sm/conversions')}
        />
        <StatCard 
          title="Ad Expenditure" 
          value={`₹${stats.expenditure}`} 
          sub="Monthly Budget Used" 
          icon={TrendingUp} 
          color="text-blue-600" 
          bg="bg-blue-50"
          onClick={() => router.push('/sm/ads')}
        />
        <StatCard 
          title="Active Drives" 
          value={stats.activeCamps} 
          sub="Across 3 Channels" 
          icon={Megaphone} 
          color="text-orange-600" 
          bg="bg-orange-50"
          onClick={() => router.push('/sm/campaigns')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="enterprise-card border bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Growth Funnel Velocity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground opacity-40" />
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                    <Tooltip content={() => null} />
                    <Area type="monotone" dataKey="leads" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                    <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Active Marketing Streams</span>
              <Button variant="link" className="text-[10px] uppercase font-black" onClick={() => router.push('/sm/campaigns')}>View All Drives</Button>
            </div>
            <div className="divide-y">
              {campaigns.map(c => (
                <div key={c.id} className="p-5 flex items-center justify-between hover:bg-muted/20 transition-all cursor-pointer" onClick={() => router.push('/sm/campaigns')}>
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                      <BarChartIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-foreground uppercase tracking-tight">{c.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{c.channel} • Budget: ₹{c.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-600">{c.leads} Leads</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{(c.conversions/c.leads*100).toFixed(1)}% Conv.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Channel Efficiency</h4>
                <TrendingUp className="h-5 w-5 text-primary opacity-50" />
              </div>
              <div className="space-y-6">
                <ChannelEfficiency label="Meta Ads" value={82} color="bg-primary" />
                <ChannelEfficiency label="Google Search" value={65} color="bg-blue-500" />
                <ChannelEfficiency label="Instagram" value={94} color="bg-emerald-500" />
              </div>
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={() => router.push('/sm/analytics')}>
                Optimization Center
              </Button>
            </div>
          </div>

          <div className="enterprise-card border bg-card p-8 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Market Pulse</h4>
            <div className="space-y-4">
              <FeedbackItem text="Conversion rate for 'Double Sharing' is up by 24%." trend="up" />
              <FeedbackItem text="Meta CPA increased by ₹120 in Pune region." trend="down" />
              <FeedbackItem text="3 new affiliate agents registered today." trend="up" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ChannelEfficiency({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={cn("h-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FeedbackItem({ text, trend }: { text: string, trend: 'up' | 'down' }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-muted/20 border border-dashed rounded-xl">
      {trend === 'up' ? <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5" /> : <TrendingUp className="h-4 w-4 text-red-600 mt-0.5 rotate-180" />}
      <p className="text-[11px] font-bold text-foreground leading-tight italic">"{text}"</p>
    </div>
  );
}
