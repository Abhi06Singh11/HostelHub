'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader } from '@/components/DashboardComponents';
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  Building2, 
  Code2, 
  Megaphone, 
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSAUsers, getSAOrganizations, getSAFinancials } from '@/lib/sa-store';
import { User, Organization, FinancialTransaction } from '@/lib/types';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [txns, setTxns] = useState<FinancialTransaction[]>([]);

  useEffect(() => {
    const load = () => {
      setUsers(getSAUsers());
      setOrgs(getSAOrganizations());
      setTxns(getSAFinancials());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active' || u.status === 'verified').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    contractors: users.filter(u => u.roles.includes('contractor')).length,
    owners: users.filter(u => u.roles.includes('owner')).length,
    students: users.filter(u => u.roles.includes('student')).length,
    agents: users.filter(u => u.roles.includes('agent')).length,
    devs: users.filter(u => u.roles.includes('superdev')).length,
    marketers: users.filter(u => u.roles.includes('supermarketer')).length,
    revenue: txns.filter(t => t.type === 'subscription' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0),
    activeSubs: orgs.filter(o => o.status === 'active').length
  };

  const roleData = [
    { name: 'Students', value: stats.students, color: 'hsl(var(--primary))' },
    { name: 'Contractors', value: stats.contractors, color: '#3b82f6' },
    { name: 'Owners', value: stats.owners, color: '#8b5cf6' },
    { name: 'Agents', value: stats.agents, color: '#f59e0b' },
  ];

  const revenueData = [
    { month: 'Jan', amount: 120000 },
    { month: 'Feb', amount: 150000 },
    { month: 'Mar', amount: 140000 },
    { month: 'Apr', amount: 210000 },
    { month: 'May', amount: 185000 },
    { month: 'Jun', amount: stats.revenue }
  ];

  return (
    <DashboardLayout role="superadmin">
      <SectionHeader 
        title="Platform Intelligence" 
        subtitle="Global Governance"
        action={{
          label: "Verify System",
          icon: Zap,
          onClick: () => {}
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Global Users" 
          value={stats.totalUsers} 
          sub={`${stats.activeUsers} Active • ${stats.pendingUsers} Pending`} 
          icon={Users} 
          color="text-primary" 
          onClick={() => router.push('/sa/users')}
        />
        <StatCard 
          title="Platform Revenue" 
          value={`₹${(stats.revenue/1000).toFixed(0)}k`} 
          sub="Monthly Subscription Accrual" 
          icon={TrendingUp} 
          color="text-emerald-600" 
          bg="bg-emerald-50"
          onClick={() => router.push('/sa/finance')}
          trend={{ value: "+12%", isUp: true }}
        />
        <StatCard 
          title="Active Clients" 
          value={stats.activeSubs} 
          sub={`${orgs.length} Total Registered Orgs`} 
          icon={Briefcase} 
          color="text-blue-600" 
          bg="bg-blue-50"
          onClick={() => router.push('/sa/clients')}
        />
        <StatCard 
          title="Security Alerts" 
          value="0" 
          sub="All Infrastructure Nodes Stable" 
          icon={ShieldCheck} 
          color="text-emerald-500" 
          bg="bg-emerald-50/50"
          onClick={() => router.push('/sa/audit')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="enterprise-card border bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">User Distribution by Role</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground opacity-40" />
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleData}>
                    <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      content={({active, payload}) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl border border-white/10 shadow-2xl">
                              <p className="text-[10px] font-black uppercase tracking-widest">{payload[0].name}</p>
                              <p className="text-xl font-black">{payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="enterprise-card border bg-slate-900 text-white p-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Operational Readiness</p>
                  <h3 className="text-3xl font-black tracking-tighter uppercase">Administrative Hubs</h3>
                </div>
                <Zap className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <HubStat icon={Code2} label="Devs" value={stats.devs} />
                <HubStat icon={Megaphone} label="Marketers" value={stats.marketers} />
                <HubStat icon={Building2} label="Owners" value={stats.owners} />
                <HubStat icon={ShieldCheck} label="Contractors" value={stats.contractors} />
              </div>
            </div>
            <Activity className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5" />
          </div>
        </div>

        <div className="space-y-8">
          <Card className="enterprise-card border bg-card">
            <CardHeader className="border-b bg-muted/20 px-6 py-4">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Revenue Projection</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                    <Tooltip content={() => null} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Expected Q3</span>
                  <span className="text-sm font-black text-foreground">₹24.5L</span>
                </div>
                <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest border-2" onClick={() => router.push('/sa/finance')}>Finance Hub</Button>
              </div>
            </CardContent>
          </Card>

          <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 opacity-80" />
              <span className="text-[11px] font-black uppercase tracking-widest">Compliance Pulse</span>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              2 pending client audits required for "Elite Living PGs" to maintain enterprise verification.
            </p>
            <Button className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white font-black uppercase text-[10px] tracking-widest h-12" onClick={() => router.push('/sa/approvals')}>
              Start Audit
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function HubStat({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 opacity-50">
        <Icon className="h-3 w-3" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className="text-xl font-black text-primary">{value}</p>
    </div>
  );
}
