'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentPayments } from '@/lib/student-store';
import { PaymentRecord } from '@/lib/types';
import { 
  History, 
  Search, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function StudentHistoryPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPayments(getStudentPayments());
  }, []);

  const filtered = payments.filter(p => 
    p.month.toLowerCase().includes(search.toLowerCase()) || 
    p.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Remittance Archive</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Historical month-wise payment logs and digital receipts.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[12px] uppercase tracking-widest border-2">
                <Download className="h-4 w-4 mr-2" /> Full Ledger
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <RecordStat label="Lifetime Paid" value={`₹${payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}`} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <RecordStat label="Total Payments" value={payments.length} icon={History} color="text-primary" bg="bg-primary/5" />
           <RecordStat label="Average Remittance" value={`₹${payments.length > 0 ? (payments.reduce((acc, p) => acc + p.amount, 0) / payments.length).toFixed(0) : '0'}`} icon={CreditCard} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by month or txn ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest"><Calendar className="h-3.5 w-3.5 mr-2" /> Sort by Date</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Billing Month / Date</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Remittance ID</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Amount</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-5 px-6">
                       <p className="text-sm font-bold text-foreground uppercase">{p.month}</p>
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">Paid: {p.date}</p>
                    </td>
                    <td className="py-5 px-6">
                       <p className="text-xs font-bold text-foreground font-mono">{p.reference}</p>
                       <p className="text-[9px] text-muted-foreground font-bold uppercase">{p.method} Remittance</p>
                    </td>
                    <td className="py-5 px-6">
                       <p className="text-sm font-bold text-emerald-600">₹{p.amount.toLocaleString()}</p>
                       <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[8px] font-bold uppercase mt-1">Confirmed</Badge>
                    </td>
                    <td className="py-5 px-6 text-right">
                       <Button variant="outline" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest border-2">
                          <Download className="h-3 w-3 mr-2" /> Receipt
                       </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-24 text-center">
                       <History className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                       <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">No payment records found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RecordStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-bold tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
