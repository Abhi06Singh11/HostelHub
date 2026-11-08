'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAFinancials, getSAPlans } from '@/lib/sa-store';
import { FinancialTransaction, SubscriptionPlan } from '@/lib/types';
import { 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  DollarSign, 
  Download, 
  Filter, 
  ArrowUpRight,
  PieChart,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Area, AreaChart } from 'recharts';

export default function SAFinanceHubPage() {
  const [txns, setTxns] = useState<FinancialTransaction[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    const load = () => {
      setTxns(getSAFinancials());
      setPlans(getSAPlans());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    gross: txns.filter(t => t.type !== 'expense').reduce((acc, t) => acc + t.amount, 0),
    net: txns.reduce((acc, t) => t.type === 'expense' ? acc - t.amount : acc + t.amount, 0),
    refunds: txns.filter(t => t.type === 'refund').reduce((acc, t) => acc + t.amount, 0),
    failed: txns.filter(t => t.status === 'failed').length
  };

  const chartData = [
    { day: 'Mon', revenue: 12000 },
    { day: 'Tue', revenue: 19000 },
    { day: 'Wed', revenue: 15000 },
    { day: 'Thu', revenue: 22000 },
    { day: 'Fri', revenue: 30000 },
    { day: 'Sat', revenue: 10000 },
    { day: 'Sun', revenue: 8000 },
  ];

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Revenue Intelligence</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Consolidated financial overview, subscription management, and global transactional audit.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                <Download className="h-3.5 w-3.5 mr-2" /> Global Statement
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <FinanceStat label="Total Gross" value={`₹${stats.gross.toLocaleString()}`} icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
           <FinanceStat label="Net Platform Profit" value={`₹${stats.net.toLocaleString()}`} icon={DollarSign} color="text-primary" bg="bg-primary/5" />
           <FinanceStat label="Subscription Volume" value={txns.filter(t => t.type === 'subscription').length} icon={CreditCard} color="text-blue-600" bg="bg-blue-50" />
           <FinanceStat label="Failed Remittances" value={stats.failed} icon={AlertCircle} color="text-red-600" bg="bg-red-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="enterprise-card border bg-card p-10 space-y-8">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Rolling Revenue Velocity</p>
                    <Badge variant="outline" className="text-[9px] font-black uppercase bg-primary/5 text-primary border-primary/20">+12% Growth</Badge>
                 </div>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                          <Tooltip content={() => null} />
                          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Platform Ledger</span>
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3 w-3 mr-2" /> Filter Stream</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-muted/10 border-b">
                        <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Transaction / Payer</th>
                        <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Stream</th>
                        <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Value</th>
                        <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {txns.map(t => (
                        <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-6">
                            <p className="text-sm font-black text-foreground">{t.description}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{t.date} • {t.payerName}</p>
                          </td>
                          <td className="py-4 px-6">
                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest bg-primary/5 text-primary border-primary/10">{t.type}</Badge>
                          </td>
                          <td className="py-4 px-6">
                            <p className={cn("text-sm font-black", t.type === 'expense' || t.type === 'refund' ? "text-red-600" : "text-emerald-600")}>
                              {t.type === 'expense' || t.type === 'refund' ? '-' : '+'} ₹{t.amount.toLocaleString()}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-right">
                             <span className={cn(
                               "px-2 py-0.5 rounded text-[8px] font-black uppercase border",
                               t.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                               t.status === 'failed' ? "bg-red-50 text-red-700 border-red-100" :
                               "bg-amber-50 text-amber-700 border-amber-100"
                             )}>{t.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">Subscription Matrix</h4>
                    <Activity className="h-4 w-4 text-primary opacity-50" />
                 </div>
                 <div className="space-y-6">
                    {plans.map(p => (
                      <div key={p.id} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-400">{p.name} Tier</span>
                            <span className="text-white">{p.activeUsers} Active</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(p.activeUsers/260)*100}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
                 <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">
                    Configure Plans
                 </Button>
              </div>

              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Compliance Alerts</h4>
                 <div className="space-y-4">
                    <FinanceAlert icon={AlertCircle} text="3 Subscription renewals failing for 'Urban Shelter'" color="text-red-600" />
                    <FinanceAlert icon={CheckCircle2} text="TDS compliance audit completed for May 2024" color="text-emerald-600" />
                    <FinanceAlert icon={Activity} text="Anomalous payment volume from IP 45.x.x.x" color="text-amber-600" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FinanceStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-5 w-5", color)} />
      </div>
    </div>
  );
}

function FinanceAlert({ icon: Icon, text, color }: any) {
  return (
    <div className="flex items-start gap-3 p-4 bg-muted/20 border border-dashed rounded-xl">
       <Icon className={cn("h-4 w-4 mt-0.5", color)} />
       <p className="text-[11px] font-bold text-foreground leading-tight">{text}</p>
    </div>
  );
}