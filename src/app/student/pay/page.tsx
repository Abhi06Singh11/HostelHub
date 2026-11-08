'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentInvoices, getStudentProfile, addPaymentRecord, updateInvoiceStatus } from '@/lib/student-store';
import { MonthlyInvoice, StudentProfile } from '@/lib/types';
import { 
  Wallet, 
  QrCode, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck,
  Copy,
  Info,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function StudentPayPage() {
  const router = useRouter();
  const [invoice, setInvoice] = useState<MonthlyInvoice | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [step, setStep] = useState<'details' | 'process' | 'confirm' | 'success'>('details');
  const [txnId, setTxnId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const invs = getStudentInvoices();
    setInvoice(invs.find(i => i.status !== 'paid') || null);
    setProfile(getStudentProfile());
  }, []);

  const upiId = "staysync.ops@oksbi";
  const upiLink = `upi://pay?pa=${upiId}&pn=StaySyncOps&am=${invoice?.total}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

  const handleVerify = () => {
    if (!txnId.trim()) {
      toast({ variant: "destructive", title: "Missing Reference", description: "Please enter the 12-digit UPI Transaction ID." });
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (invoice) {
        addPaymentRecord({
          invoiceId: invoice.id,
          month: `${invoice.month} ${invoice.year}`,
          amount: invoice.total,
          date: new Date().toISOString().split('T')[0],
          method: 'UPI',
          reference: txnId,
          status: 'completed'
        });
        updateInvoiceStatus(invoice.id, 'paid');
      }
      setIsVerifying(false);
      setStep('success');
      toast({ title: "Payment Recorded", description: "Remittance has been queued for verification." });
    }, 2000);
  };

  if (!invoice || !profile) {
    return (
      <DashboardLayout role="student">
        <div className="py-32 text-center space-y-6">
           <CheckCircle2 className="h-16 w-16 mx-auto text-emerald-600 opacity-20" />
           <h3 className="text-2xl font-bold uppercase tracking-tighter">No Pending Dues</h3>
           <Button variant="ghost" onClick={() => router.push('/student')} className="uppercase font-bold text-[11px] tracking-widest">Return to Home</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="h-10 px-4 font-bold uppercase text-[11px] tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Remittance Terminal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {/* Summary Section */}
           <div className="space-y-6">
              <div className="enterprise-card border bg-card p-8 space-y-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Remittance Summary</p>
                    <h3 className="text-2xl font-bold text-foreground uppercase">{invoice.month} {invoice.year} Cycle</h3>
                 </div>
                 
                 <div className="space-y-4">
                    <SummaryRow label="Monthly Rent" value={invoice.baseRent} />
                    <SummaryRow label="Utilities & Mess" value={invoice.electricity + invoice.wifi + invoice.food + invoice.maintenance} />
                    <div className="pt-4 border-t-2 border-dashed flex justify-between items-center">
                       <span className="text-sm font-bold uppercase tracking-widest text-primary">Payable Amount</span>
                       <span className="text-2xl font-bold text-primary">₹{invoice.total.toLocaleString()}</span>
                    </div>
                 </div>
                 
                 <div className="p-4 bg-primary/5 border-2 border-dashed rounded-xl space-y-2">
                    <p className="text-[10px] font-bold text-primary uppercase flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> SECURE REMITTANCE</p>
                    <p className="text-[9px] text-muted-foreground font-medium uppercase leading-relaxed">
                      All payments made via this terminal are instantly logged and linked to your resident ID ST-101.
                    </p>
                 </div>
              </div>

              <div className="enterprise-card border bg-muted/10 p-6 space-y-4">
                 <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instructions</span>
                 </div>
                 <ol className="space-y-3">
                    <StepItem num="1" text="Scan the QR code with any UPI app." />
                    <StepItem num="2" text={`Complete the payment of ₹${invoice.total.toLocaleString()}`} />
                    <StepItem num="3" text="Enter the 12-digit Ref ID below." />
                 </ol>
              </div>
           </div>

           {/* Payment Interaction */}
           <div className="space-y-6">
              {step !== 'success' ? (
                <div className="enterprise-card border bg-card p-10 space-y-8 animate-in fade-in duration-500">
                   <div className="flex flex-col items-center text-center space-y-6">
                      <div className="p-4 bg-white rounded-[2rem] border-4 border-primary/20 shadow-2xl relative group">
                         <img src={qrUrl} alt="UPI QR" className="w-48 h-48 rounded-xl" />
                         <div className="absolute inset-0 bg-primary/5 rounded-[2rem] animate-pulse pointer-events-none" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">{upiId}</p>
                         <Button variant="ghost" className="h-7 text-[9px] font-bold uppercase tracking-widest" onClick={() => { navigator.clipboard.writeText(upiId); toast({title: "Copied!"}); }}>
                            <Copy className="h-3 w-3 mr-1.5" /> Copy VPA
                         </Button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">UPI Transaction ID (12 Digits) *</Label>
                         <Input 
                           placeholder="e.g. 412233445566" 
                           value={txnId}
                           onChange={(e) => setTxnId(e.target.value)}
                           className="h-12 rounded-xl border-2 font-bold text-center text-lg tracking-widest focus-visible:ring-primary"
                         />
                      </div>
                      <Button onClick={handleVerify} disabled={isVerifying} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[12px] tracking-[0.2em] shadow-xl rounded-2xl">
                         {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Commit Remittance"}
                      </Button>
                   </div>
                </div>
              ) : (
                <div className="enterprise-card border bg-card p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-emerald-50 rounded-full border-2 border-emerald-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-bold uppercase tracking-tighter text-foreground">Remittance Success</h3>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Transaction ID: {txnId}</p>
                   </div>
                   <Separator className="bg-transparent border-t border-dashed" />
                   <div className="space-y-3">
                      <Button onClick={() => router.push('/student/history')} className="w-full h-11 font-bold uppercase text-[11px] tracking-widest">View History</Button>
                      <Button variant="ghost" onClick={() => router.push('/student')} className="w-full h-11 font-bold uppercase text-[11px] tracking-widest">Return to Home</Button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground">{label}</span>
       <span className="text-foreground">₹{value.toLocaleString()}</span>
    </div>
  );
}

function StepItem({ num, text }: any) {
  return (
    <li className="flex items-center gap-3">
       <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0">{num}</span>
       <p className="text-[11px] font-bold uppercase text-foreground tracking-widest">{text}</p>
    </li>
  );
}
