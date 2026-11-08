'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredReferrals, updateReferralPayment } from '@/lib/referral-store';
import { Referral } from '@/lib/types';
import { 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  Download,
  Filter,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AgentFinancialsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const load = () => setReferrals(getStoredReferrals());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleMarkPaid = (id: string) => {
    updateReferralPayment(id, 'paid');
    setReferrals(getStoredReferrals());
    toast({ title: "Payment Recorded", description: "Commission has been marked as settled." });
  };

  const admittedReferrals = referrals.filter(r => r.status === 'admitted');
  
  const stats = {
    pending: admittedReferrals
      .filter(r => r.paymentStatus === 'eligible')
      .reduce((acc, r) => acc + r.commissionAmount, 0),
    paid: admittedReferrals
      .filter(r => r.paymentStatus === 'paid')
      .reduce((acc, r) => acc + r.commissionAmount, 0),
    totalEligible: admittedReferrals.reduce((acc, r) => acc + r.commissionAmount, 0)
  };

  return (
    <DashboardLayout role="agent">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Commission & Earnings</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Track your referral income and verify admission-based payouts.</p>
          </div>
          <Button variant="outline" className="h-10 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
            <Download className="h-3.5 w-3.5 mr-2" /> Download Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinanceCard label="Available for Payout" value={`₹${stats.pending.toLocaleString()}`} icon={CreditCard} color="text-primary" bg="bg-primary/5" />
          <FinanceCard label="Total Paid Out" value={`₹${stats.paid.toLocaleString()}`} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
          <FinanceCard label="Total Lifetime Earnings" value={`₹${stats.totalEligible.toLocaleString()}`} icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Earnings Breakdown</span>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase">
              <Filter className="h-3 w-3 mr-2" /> Filter List
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student / Admission Date</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Property Details</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Commission</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {admittedReferrals.map(ref => (
                  <tr key={ref.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-foreground">{ref.studentName}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">Admitted: {ref.admissionDate}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground">{ref.hostelName}</p>
                      <p className="text-[10px] text-primary font-bold uppercase">{ref.accommodationType}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-foreground">₹{ref.commissionAmount}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">Rate: Fixed</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Badge variant="outline" className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-bold uppercase border",
                          ref.paymentStatus === 'paid' ? "bg-emerald-600 text-white border-emerald-700" :
                          ref.paymentStatus === 'eligible' ? "bg-primary text-white border-primary shadow-md" :
                          "bg-muted text-muted-foreground border-border"
                        )}>
                          {ref.paymentStatus}
                        </Badge>
                        {ref.paymentStatus === 'eligible' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleMarkPaid(ref.id)}
                            className="h-8 text-[9px] font-bold uppercase hover:bg-emerald-50 hover:text-emerald-600 border border-transparent hover:border-emerald-100"
                          >
                            Recv. Payment
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {admittedReferrals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-24 text-center">
                      <DollarSign className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">No eligible commissions found yet.</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase font-medium">Earnings unlock after contractor confirms student admission.</p>
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

function FinanceCard({ label, value, icon: Icon, color, bg }: any) {
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
