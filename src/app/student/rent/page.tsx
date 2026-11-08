'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentInvoices } from '@/lib/student-store';
import { MonthlyInvoice } from '@/lib/types';
import { 
  Wallet, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ArrowRight,
  FileText,
  CreditCard,
  Zap,
  Wifi,
  Utensils,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function StudentRentPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<MonthlyInvoice[]>([]);

  useEffect(() => {
    setInvoices(getStudentInvoices());
  }, []);

  const activeInvoice = invoices.find(inv => inv.status !== 'paid');

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Rent & Remittance</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Detailed breakdown of monthly operational charges and payment status.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[12px] uppercase tracking-widest border-2">
                <Download className="h-4 w-4 mr-2" /> All Receipts
             </Button>
             <Button onClick={() => router.push('/student/pay')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Wallet className="h-4 w-4 mr-2" /> Pay Outstanding
             </Button>
          </div>
        </div>

        {activeInvoice ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-8">
                {/* Detailed Breakdown */}
                <div className="enterprise-card border bg-card overflow-hidden">
                   <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                      <div>
                         <h3 className="text-lg font-bold text-foreground uppercase">Statement for {activeInvoice.month} {activeInvoice.year}</h3>
                         <p className="text-[10px] text-muted-foreground font-bold uppercase">Ref ID: {activeInvoice.id}</p>
                      </div>
                      <Badge className={cn(
                        "font-black uppercase px-3 py-1",
                        activeInvoice.status === 'pending' ? "bg-amber-500 text-white" : "bg-red-600 text-white"
                      )}>{activeInvoice.status}</Badge>
                   </div>
                   <div className="p-8 space-y-6">
                      <BillRow icon={Wallet} label="Base Room Rent" value={activeInvoice.baseRent} />
                      <BillRow icon={Zap} label="Electricity (Metered)" value={activeInvoice.electricity} />
                      <BillRow icon={Wifi} label="High-Speed Wi-Fi" value={activeInvoice.wifi} />
                      <BillRow icon={Utensils} label="Mess/Food Charges" value={activeInvoice.food} />
                      <BillRow icon={Wrench} label="Unit Maintenance" value={activeInvoice.maintenance} />
                      {activeInvoice.discounts > 0 && (
                        <BillRow icon={CheckCircle2} label="Discounts / Referrals" value={-activeInvoice.discounts} color="text-emerald-600" />
                      )}
                      <div className="pt-6 border-t-2 border-dashed flex justify-between items-center">
                         <span className="text-base font-bold text-foreground uppercase tracking-widest">Total Remittance</span>
                         <span className="text-3xl font-bold text-primary">₹{activeInvoice.total.toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                {/* Important Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="enterprise-card border bg-card p-6 flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                         <Clock className="h-6 w-6" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Payment Deadline</p>
                         <p className="text-sm font-bold text-foreground uppercase">{activeInvoice.dueDate}</p>
                      </div>
                   </div>
                   <div className="enterprise-card border bg-card p-6 flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-xl text-muted-foreground">
                         <FileText className="h-6 w-6" />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Invoice Generated</p>
                         <p className="text-sm font-bold text-foreground uppercase">{activeInvoice.generatedDate}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-6">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Quick Remittance</h4>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">
                     Settle your dues instantly via UPI. Receipts are automatically generated and synced with your payment history.
                   </p>
                   <Button onClick={() => router.push('/student/pay')} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[11px] tracking-widest">
                      <CreditCard className="h-4 w-4 mr-2" /> Proceed to Pay
                   </Button>
                   <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                         <span className="text-slate-500">Security Deposit</span>
                         <span className="text-emerald-400">Paid (₹10,000)</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                         <span className="text-slate-500">Last Payment</span>
                         <span>May 03, 2024</span>
                      </div>
                   </div>
                </div>

                <div className="enterprise-card border bg-card p-6">
                   <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Remittance Policy</h4>
                   <ul className="space-y-4">
                      <PolicyItem text="Rent is due on the 5th of every month." />
                      <PolicyItem text="Late fee of ₹100/day applies after the 10th." />
                      <PolicyItem text="UPI is the preferred method for instant verification." />
                   </ul>
                </div>
             </div>
          </div>
        ) : (
          <div className="py-32 text-center enterprise-card border bg-card max-w-xl mx-auto space-y-6">
             <CheckCircle2 className="h-16 w-16 mx-auto text-emerald-600 opacity-20" />
             <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tighter uppercase">All Clear!</h3>
                <p className="text-muted-foreground font-medium">You have no outstanding rent or operational dues for the current cycle.</p>
             </div>
             <Button variant="outline" onClick={() => router.push('/student/history')} className="h-11 px-8 font-bold uppercase text-[11px] tracking-widest border-2">
                View Past Payments
             </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function BillRow({ icon: Icon, label, value, color = "text-foreground" }: any) {
  return (
    <div className="flex justify-between items-center">
       <div className="flex items-center gap-3">
          <div className="p-2 bg-muted/50 rounded-lg">
             <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">{label}</span>
       </div>
       <span className={cn("text-sm font-bold uppercase", color)}>₹{value.toLocaleString()}</span>
    </div>
  );
}

function PolicyItem({ text }: any) {
  return (
    <li className="flex items-start gap-3">
       <div className="h-1 w-1 rounded-full bg-primary mt-1.5" />
       <p className="text-[11px] text-muted-foreground font-medium uppercase leading-tight">{text}</p>
    </li>
  );
}
