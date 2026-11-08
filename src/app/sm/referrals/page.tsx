'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Target, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Activity,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MarketerReferralsPage() {
  const [agents, setAgents] = useState([
    { id: 'a1', name: 'Global Admissions Ltd.', referrals: 42, conversions: 12, commission: 30000, status: 'active' },
    { id: 'a2', name: 'StaySync University Hub', referrals: 28, conversions: 8, commission: 20000, status: 'active' },
    { id: 'a3', name: 'Independent Agent - Rahul', referrals: 12, conversions: 1, commission: 2500, status: 'pending' },
  ]);

  const handlePay = (name: string) => {
    toast({ title: "Commission Dispatched", description: `Payout for ${name} has been initiated.` });
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Referral Intelligence</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage affiliate agents, verify commission accruals, and monitor partner acquisition performance.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Register Partner
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <RefStat label="Active Partners" value={agents.length} icon={Users} color="text-primary" bg="bg-primary/5" />
           <RefStat label="Partner Leads" value="112" icon={Target} color="text-blue-600" bg="bg-blue-50" />
           <RefStat label="Avg Conversion" value="12.4%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50" />
           <RefStat label="Total Payouts" value="₹2.4L" icon={CreditCard} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Partner Performance Ledger</span>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Tiers</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Partner / Entity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Referral Volume</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Commission Accrued</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {agents.map(a => (
                  <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 font-black text-xs uppercase">
                          {a.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">{a.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">ID: {a.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-sm font-black text-foreground">{a.referrals} Leads</p>
                       <p className="text-[10px] text-emerald-600 font-bold uppercase">{a.conversions} Admissions Confirmed</p>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-sm font-black text-foreground">₹{a.commission.toLocaleString()}</p>
                       <Badge variant="outline" className={cn(
                         "text-[8px] font-black uppercase mt-1",
                         a.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground"
                       )}>{a.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem onClick={() => handlePay(a.name)} className="text-xs font-bold uppercase py-2.5">Settle Payout</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">View Lead Flow</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Suspend Partner</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RefStat({ label, value, icon: Icon, color, bg }: any) {
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
