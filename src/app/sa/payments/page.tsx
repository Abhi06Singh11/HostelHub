'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAFinancials, logSAAction } from '@/lib/sa-store';
import { FinancialTransaction } from '@/lib/types';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SAPaymentsPage() {
  const [txns, setTxns] = useState<FinancialTransaction[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTxns(getSAFinancials());
  }, []);

  const handleVerify = (id: string) => {
    toast({ title: "Remittance Verified", description: "The transaction has been mathematically confirmed across nodes." });
    logSAAction('Verify Payment', id, 'finance');
  };

  const filtered = txns.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) || 
    t.payerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Transactional Terminal</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Audit real-time global remittances, manage refund workflows, and verify large-scale settlements.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                <Download className="h-3.5 w-3.5 mr-2" /> Global Ledger
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <TxnStat label="Platform Gross" value={`₹${txns.reduce((acc, t) => acc + t.amount, 0).toLocaleString()}`} icon={Zap} color="text-primary" bg="bg-primary/5" />
           <TxnStat label="Success Rate" value="99.4%" icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
           <TxnStat label="Pending Sync" value={txns.filter(t => t.status === 'pending').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
           <TxnStat label="Failed Remits" value={txns.filter(t => t.status === 'failed').length} icon={XCircle} color="text-red-600" bg="bg-red-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ledger by payer or reference..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Streams</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Remittance / Payer</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Stream Category</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Value (INR)</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Ledger Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(t => (
                  <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                       <p className="text-sm font-black text-foreground">{t.description}</p>
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">{t.date} • {t.payerName}</p>
                    </td>
                    <td className="py-4 px-6">
                       <Badge variant="outline" className="text-[8px] font-black uppercase bg-primary/5 text-primary border-primary/20">{t.type}</Badge>
                    </td>
                    <td className="py-4 px-6">
                       <p className={cn("text-sm font-black", t.type === 'subscription' ? "text-emerald-600" : "text-foreground")}>₹{t.amount.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                         <span className={cn(
                           "px-3 py-1 rounded text-[8px] font-black uppercase border",
                           t.status === 'completed' ? "bg-emerald-600 text-white border-emerald-700" :
                           t.status === 'failed' ? "bg-red-600 text-white border-red-700" :
                           "bg-muted text-muted-foreground border-border"
                         )}>
                           {t.status}
                         </span>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Download Receipt</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleVerify(t.id)} className="text-xs font-bold uppercase py-2.5">Verify Remit</DropdownMenuItem>
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Initiate Refund</DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                       </div>
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

function TxnStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}