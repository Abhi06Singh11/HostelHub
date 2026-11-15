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
  ArrowRight,
  Activity,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
  Building2,
  Smartphone,
  Coins,
  ShieldCheck,
  ArrowLeft,
  Eye,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getContractorAgents } from '@/lib/agent-store';
import { getStoredReferrals, updateReferralStatus, updateCommissionStatus } from '@/lib/referral-store';
import { Agent, Referral, ReferralStatus, CommissionStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ContractorAgentsHub() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [search, setSearch] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const contractorId = 'u4'; // Mock active contractor

  useEffect(() => {
    const load = () => {
      setAgents(getContractorAgents(contractorId));
      setReferrals(getStoredReferrals(contractorId));
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
    pendingCommissions: referrals.filter(r => r.commissionStatus === 'eligible' || r.commissionStatus === 'approved').reduce((acc, r) => acc + r.commissionAmount, 0),
    paidCommissions: referrals.filter(r => r.commissionStatus === 'paid').reduce((acc, r) => acc + r.commissionAmount, 0)
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

  const handleStatusChange = (id: string, status: ReferralStatus) => {
    updateReferralStatus(id, status);
    setReferrals(getStoredReferrals(contractorId));
    toast({ title: "Status Updated", description: `Referral is now ${status.replace('_', ' ')}.` });
  };

  const handleCommissionUpdate = (id: string, status: CommissionStatus) => {
    updateCommissionStatus(id, status);
    setReferrals(getStoredReferrals(contractorId));
    toast({ title: "Commission Logic Synced", description: `Status updated to ${status}.` });
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  if (selectedAgentId && selectedAgent) {
    return (
      <DashboardLayout role="contractor">
        <AgentProfileView 
          agent={selectedAgent} 
          onBack={() => setSelectedAgentId(null)} 
          referrals={referrals.filter(r => r.agentId === selectedAgent.id)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Agents Hub Intelligence" 
          subtitle="Partnership Performance command Center"
          action={{
            label: "Manage Agent Registry",
            icon: ShieldCheck,
            onClick: () => router.push('/contractor/agents/manage')
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Partner Network" value={stats.totalAgents} sub={`${stats.activeAgents} Nodes Active`} icon={Users} color="text-primary" />
          <StatCard label="Capture Velocity" value={stats.totalReferrals} sub={`${stats.successfulAdmissions} Confirmed Adms`} icon={Target} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard label="Pending Sync" value={`₹${(stats.pendingCommissions/1000).toFixed(1)}k`} sub="Unsettled Comm." icon={Clock} color="text-amber-600" bg="bg-amber-50" />
          <StatCard label="Total Disbursed" value={`₹${(stats.paidCommissions/1000).toFixed(1)}k`} sub="Lifetime Payouts" icon={Wallet} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-muted/30 p-1.5 rounded-2xl border-2 h-auto mb-8">
            <TabsTrigger value="overview" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Overview</TabsTrigger>
            <TabsTrigger value="directory" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Agent performance</TabsTrigger>
            <TabsTrigger value="referrals" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Student tracking</TabsTrigger>
            <TabsTrigger value="commissions" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Finances</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 enterprise-card border bg-card/50 backdrop-blur-sm overflow-hidden">
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
                          <Tooltip content={({active, payload}) => {
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
                          }} />
                          <Area type="monotone" dataKey="refs" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRefs)" />
                          <Area type="monotone" dataKey="adm" stroke="#10b981" strokeWidth={3} fill="none" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-8">
                   <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
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
                             <p className="text-[10px] font-bold uppercase text-white/40">Avg Conversion</p>
                             <p className="text-2xl font-bold text-emerald-400">
                               {stats.totalReferrals > 0 ? ((stats.successfulAdmissions/stats.totalReferrals)*100).toFixed(1) : 0}%
                             </p>
                          </div>
                        </div>
                      </div>
                      <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
                   </div>
                   <div className="enterprise-card border bg-card p-6 space-y-4 shadow-none border-dashed">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Strategic Insight</h4>
                      <p className="text-xs font-medium leading-relaxed italic text-foreground bg-primary/5 p-4 rounded-xl border border-primary/10">
                        "Agent 'Global Admissions' currently holds the highest conversion rate (26.6%). Consider scaling their territory allocation for Q3."
                      </p>
                   </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="directory" className="animate-in fade-in duration-500">
             <DataTable>
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent Identity</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Performance</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Commission Logic</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Sync Status</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {agents.map(agent => (
                     <tr key={agent.id} onClick={() => setSelectedAgentId(agent.id)} className="hover:bg-muted/20 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                 {agent.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{agent.name}</p>
                                 <p className="text-[10px] text-muted-foreground font-bold uppercase">ID: {agent.id} • {agent.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-xs font-bold text-foreground">{agent.successfulAdmissions} Adm. / {agent.totalReferrals} Refs</p>
                           <p className="text-[9px] font-bold text-emerald-600 uppercase">
                              {((agent.successfulAdmissions/agent.totalReferrals)*100).toFixed(1)}% Conversion
                           </p>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-xs font-bold text-foreground">{agent.commissionRate}</p>
                        </td>
                        <td className="py-4 px-6">
                           <Badge variant="outline" className={cn(
                             "text-[8px] font-bold uppercase",
                             agent.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground"
                           )}>{agent.status}</Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100" />
                        </td>
                     </tr>
                   ))}
                </tbody>
             </DataTable>
          </TabsContent>

          <TabsContent value="referrals" className="animate-in fade-in duration-500">
             <DataTable>
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student / Lead</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Agent</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Target Property</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Funnel status</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {referrals.map(ref => (
                     <tr key={ref.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground uppercase tracking-tight">{ref.studentName}</p>
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
                             ref.status === 'admission_confirmed' || ref.status === 'checked_in' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-primary/5 text-primary border-primary/20"
                           )}>
                             {ref.status.replace('_', ' ')}
                           </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                                 {['contacted', 'interested', 'pg_allocated', 'admission_confirmed', 'checked_in', 'cancelled'].map(st => (
                                   <DropdownMenuItem key={st} onClick={() => handleStatusChange(ref.id, st as any)} className="text-xs font-bold uppercase py-2.5 rounded-lg">
                                      Mark as {st.replace('_', ' ')}
                                   </DropdownMenuItem>
                                 ))}
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </DataTable>
          </TabsContent>

          <TabsContent value="commissions" className="animate-in fade-in duration-500">
             <DataTable>
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Transaction / Student</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent Partner</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Value (INR)</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Ledger State</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {referrals.map(ref => (
                     <tr key={ref.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground uppercase tracking-tight">{ref.studentName}</p>
                           <p className="text-[9px] text-muted-foreground font-bold uppercase">{ref.createdAt}</p>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-xs font-bold text-foreground uppercase">{ref.agentName}</p>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground">₹{ref.commissionAmount.toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-6">
                           <Badge className={cn(
                             "text-[9px] font-bold uppercase shadow-none",
                             ref.commissionStatus === 'paid' ? "bg-emerald-600 text-white" :
                             ref.commissionStatus === 'eligible' ? "bg-blue-600 text-white" :
                             "bg-muted text-muted-foreground"
                           )}>
                             {ref.commissionStatus.replace('_', ' ')}
                           </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'approved')} className="text-xs font-bold uppercase py-2.5 text-emerald-600">Approve logic</DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'paid')} className="text-xs font-bold uppercase py-2.5 text-blue-600">Mark as Paid</DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'rejected')} className="text-xs font-bold uppercase py-2.5 text-red-600">Reject Comm.</DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
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

function AgentProfileView({ agent, onBack, referrals }: { agent: Agent, onBack: () => void, referrals: Referral[] }) {
  const stats = {
    total: agent.totalEarnings,
    pending: agent.pendingCommission,
    paid: agent.totalEarnings - agent.pendingCommission
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="h-10 px-4 font-bold uppercase text-[11px] tracking-widest border-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> All Agents Hub
        </Button>
        <h2 className="text-2xl font-bold uppercase tracking-tight">Agent Logic Hub</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
               <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-bold text-4xl shadow-xl shrink-0">
                  {agent.name.charAt(0)}
               </div>
               <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                     <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tighter uppercase">{agent.name}</h1>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">ID: {agent.id} • Joined: {agent.joiningDate}</p>
                     </div>
                     <Badge className={cn(
                       "font-bold uppercase text-[10px] py-1.5 px-4 rounded-xl",
                       agent.status === 'active' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                     )}>{agent.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-dashed">
                     <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><Smartphone className="h-4 w-4 text-primary" /> {agent.phone}</p>
                     <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><Target className="h-4 w-4 text-primary" /> {agent.commissionRate}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="enterprise-card border bg-card overflow-hidden">
            <div className="p-4 border-b bg-muted/20">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Recent Performance Timeline</span>
            </div>
            <div className="divide-y overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/10 border-b">
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Student</th>
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Status</th>
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 text-right uppercase tracking-widest">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {referrals.map(ref => (
                    <tr key={ref.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4 text-xs font-bold text-foreground uppercase">{ref.studentName}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-[8px] font-bold uppercase border-primary/20 bg-primary/5 text-primary tracking-tighter">{ref.status.replace('_', ' ')}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-xs font-bold text-foreground">₹{ref.commissionAmount}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">{ref.commissionStatus}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Financial Heartbeat</h4>
              <div className="space-y-6">
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Admission Conversion</p>
                    <div className="flex items-center justify-between">
                       <p className="text-3xl font-bold text-white">{((agent.successfulAdmissions/agent.totalReferrals)*100).toFixed(1)}%</p>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: `${(agent.successfulAdmissions/agent.totalReferrals)*100}%` }} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <FinancialRow label="Lifetime Earnings" value={stats.total} color="text-white" />
                    <FinancialRow label="Paid Commissions" value={stats.paid} color="text-emerald-400" />
                    <FinancialRow label="Pending Payouts" value={stats.pending} color="text-amber-400" />
                 </div>
              </div>
              <Wallet className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
           </div>
        </div>
      </div>
    </div>
  );
}

function FinancialRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
       <span className={cn("text-base font-bold", color)}>₹{value.toLocaleString()}</span>
    </div>
  );
}
