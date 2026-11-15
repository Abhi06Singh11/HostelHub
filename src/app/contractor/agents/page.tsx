'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader } from '@/components/DashboardComponents';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  Wallet, 
  Target, 
  ArrowRight,
  PieChart,
  Activity,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getContractorAgents } from '@/lib/agent-store';
import { getStoredReferrals } from '@/lib/referral-store';
import { Agent, Referral } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContractorAgentsDashboard() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const contractorId = 'u4'; // Mock current contractor
    setAgents(getContractorAgents(contractorId));
    setReferrals(getStoredReferrals(contractorId));
  }, []);

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalReferrals: referrals.length,
    successfulAdmissions: referrals.filter(r => r.status === 'admission_confirmed' || r.status === 'checked_in').length,
    totalEarnings: agents.reduce((acc, a) => acc + a.totalEarnings, 0),
    pendingCommissions: agents.reduce((acc, a) => acc + a.pendingCommission, 0),
    paidCommissions: agents.reduce((acc, a) => acc + a.totalEarnings, 0)
  };

  const performanceData = [
    { name: 'Mon', refs: 4, adm: 1 },
    { name: 'Tue', refs: 7, adm: 2 },
    { name: 'Wed', refs: 5, adm: 3 },
    { name: 'Thu', refs: 8, adm: 4 },
    { name: 'Fri', refs: 12, adm: 5 },
    { name: 'Sat', refs: 6, adm: 2 },
    { name: 'Sun', refs: 3, adm: 1 },
  ];

  return (
    <DashboardLayout role="contractor">
      <SectionHeader 
        title="Agents Hub Intelligence" 
        subtitle="Referral Partnership Management"
        action={{
          label: "Agent Directory",
          icon: Users,
          onClick: () => router.push('/contractor/agents/directory')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Partner Network" 
          value={stats.totalAgents} 
          sub={`${stats.activeAgents} Nodes Active`} 
          icon={Users} 
          color="text-primary" 
        />
        <StatCard 
          label="Capture Velocity" 
          value={stats.totalReferrals} 
          sub={`${stats.successfulAdmissions} Confirmed Adms`} 
          icon={Target} 
          color="text-emerald-600" 
          bg="bg-emerald-50"
        />
        <StatCard 
          label="Pending Sync" 
          value={`₹${(stats.pendingCommissions/1000).toFixed(1)}k`} 
          sub="Unsettled Commissions" 
          icon={Clock} 
          color="text-amber-600" 
          bg="bg-amber-50"
        />
        <StatCard 
          label="Total Disbursed" 
          value={`₹${(stats.paidCommissions/1000).toFixed(1)}k`} 
          sub="Lifetime Payouts" 
          icon={Wallet} 
          color="text-blue-600" 
          bg="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="enterprise-card border bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
              <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Admission Pulse</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground opacity-40" />
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorRefs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" fontSize={10} fontWeight="600" axisLine={false} tickLine={false} />
                    <Tooltip 
                      content={({active, payload}) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl border border-white/10 shadow-2xl">
                              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                              <p className="text-sm font-bold">Refs: {payload[0].value}</p>
                              <p className="text-sm font-bold text-emerald-400">Adms: {payload[1].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="refs" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRefs)" />
                    <Area type="monotone" dataKey="adm" stroke="#10b981" strokeWidth={3} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="enterprise-card border bg-card overflow-hidden">
            <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Top Performance Nodes</span>
              <Button variant="link" size="sm" onClick={() => router.push('/contractor/agents/directory')} className="h-auto p-0 text-[10px] font-bold uppercase">View All</Button>
            </div>
            <div className="divide-y">
              {agents.slice(0, 3).map(agent => (
                <div key={agent.id} className="p-5 flex items-center justify-between hover:bg-muted/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold border">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground uppercase tracking-tight">{agent.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{agent.successfulAdmissions} Admissions • {agent.totalReferrals} Referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">₹{agent.totalEarnings.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Lifetime Earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-primary">Conversion Logic</h4>
                <TrendingUp className="h-5 w-5 text-primary opacity-50" />
              </div>
              <div className="space-y-5">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                   <p className="text-[10px] font-bold uppercase text-white/40">Total Leads Sync</p>
                   <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                   <p className="text-[10px] font-bold uppercase text-white/40">Conversion Rate</p>
                   <p className="text-2xl font-bold text-emerald-400">
                     {stats.totalReferrals > 0 ? ((stats.successfulAdmissions/stats.totalReferrals)*100).toFixed(1) : 0}%
                   </p>
                </div>
              </div>
              <Button onClick={() => router.push('/contractor/agents/referrals')} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[10px] tracking-widest border-none">
                Audit Referrals
              </Button>
            </div>
            <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
          </Card>

          <div className="enterprise-card border bg-card p-6 space-y-5 shadow-none border-dashed">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Strategic Insight</h4>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
               <p className="text-[12px] font-medium leading-relaxed italic text-foreground">
                 "Agent 'Global Admissions' currently holds the highest conversion rate (26.6%). Consider scaling their territory allocation for Q3."
               </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-bold text-muted-foreground uppercase">Real-time metrics active</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
