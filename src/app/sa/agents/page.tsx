'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader, DataTable } from '@/components/DashboardComponents';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Wallet, 
  Target, 
  Activity,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Smartphone
} from 'lucide-react';
import { getAllAgents } from '@/lib/agent-store';
import { getStoredReferrals } from '@/lib/referral-store';
import { Agent, Referral } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SAAgentsHub() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const load = () => {
      setAgents(getAllAgents());
      setReferrals(getStoredReferrals());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalReferrals: referrals.length,
    successfulAdmissions: referrals.filter(r => r.status === 'admission_confirmed' || r.status === 'checked_in').length,
    totalVolume: referrals.reduce((acc, r) => acc + r.commissionAmount, 0)
  };

  const chartData = [
    { name: 'W1', refs: 24, adm: 8 },
    { name: 'W2', refs: 32, adm: 12 },
    { name: 'W3', refs: 28, adm: 10 },
    { name: 'W4', refs: 45, adm: 18 },
  ];

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <SectionHeader 
          title="Global Agent Ecosystem" 
          subtitle="Platform-wide Partnership Governance"
          action={{
            label: "Administrative Registry",
            icon: ShieldCheck,
            onClick: () => router.push('/sa/agents/manage')
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Network" value={stats.totalAgents} sub="Global Certified Agents" icon={Users} color="text-primary" />
          <StatCard label="Total Traffic" value={stats.totalReferrals} sub="Students Referred" icon={Target} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard label="Admissions" value={stats.successfulAdmissions} sub="Conversion Performance" icon={CheckCircle2} color="text-blue-600" bg="bg-blue-50" />
          <StatCard label="Platform Gross" value={`₹${(stats.totalVolume/1000).toFixed(0)}k`} sub="Accrued Commissions" icon={Wallet} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <Tabs defaultValue="overview" className="w-full">
           <TabsList className="bg-muted/30 p-1.5 rounded-2xl border-2 h-auto mb-8">
              <TabsTrigger value="overview" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="referrals" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Global Referrals</TabsTrigger>
           </TabsList>

           <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <Card className="lg:col-span-2 enterprise-card border bg-card overflow-hidden">
                    <CardHeader className="border-b bg-muted/20 px-6 py-4">
                       <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Rolling Network Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10">
                       <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={chartData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                                <Tooltip content={() => null} />
                                <Area type="monotone" dataKey="refs" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={0.1} fill="hsl(var(--primary))" />
                                <Area type="monotone" dataKey="adm" stroke="#10b981" strokeWidth={3} fill="none" />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </CardContent>
                 </Card>
                 <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-6">Governance Pulse</h4>
                    <div className="space-y-6">
                       <div className="flex justify-between items-end border-b border-white/5 pb-4">
                          <p className="text-[10px] font-bold uppercase text-white/40">Total Active Nodes</p>
                          <p className="text-2xl font-bold">{stats.activeAgents}</p>
                       </div>
                       <div className="flex justify-between items-end border-b border-white/5 pb-4">
                          <p className="text-[10px] font-bold uppercase text-white/40">Global Success Rate</p>
                          <p className="text-2xl font-bold text-emerald-400">{((stats.successfulAdmissions/stats.totalReferrals)*100).toFixed(1)}%</p>
                       </div>
                    </div>
                    <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
                 </div>
              </div>
           </TabsContent>

           <TabsContent value="referrals" className="animate-in fade-in duration-500">
              <DataTable>
                 <thead>
                    <tr className="bg-muted/10 border-b">
                       <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student</th>
                       <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent</th>
                       <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Target Hostel</th>
                       <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {referrals.map(ref => (
                      <tr key={ref.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                         <td className="py-4 px-6">
                            <p className="text-sm font-bold text-foreground uppercase">{ref.studentName}</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{ref.studentPhone}</p>
                         </td>
                         <td className="py-4 px-6">
                            <p className="text-xs font-bold text-foreground uppercase">{ref.agentName}</p>
                         </td>
                         <td className="py-4 px-6">
                            <p className="text-xs font-bold text-foreground uppercase flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-primary" /> {ref.hostelName}</p>
                         </td>
                         <td className="py-4 px-6">
                            <Badge variant="outline" className={cn(
                              "text-[9px] font-bold uppercase",
                              ref.status === 'admission_confirmed' || ref.status === 'checked_in' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-primary/5 text-primary"
                            )}>{ref.status.replace('_', ' ')}</Badge>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </DataTable>
           </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
