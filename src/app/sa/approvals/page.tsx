'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsers, updateSAUserStatus, logSAAction } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  Zap, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  Clock, 
  AlertCircle,
  Building2,
  ShieldCheck,
  UserCheck,
  Smartphone,
  Mail,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SAApprovalsPage() {
  const [pending, setPending] = useState<User[]>([]);

  useEffect(() => {
    const load = () => {
      const users = getSAUsers();
      setPending(users.filter(u => u.status === 'pending'));
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleApprove = (id: string, name: string) => {
    updateSAUserStatus(id, 'verified');
    logSAAction('Approve User', `${name} - Verification Successful`, 'user_management');
    toast({ title: "Account Verified", description: `${name} has been granted platform access.` });
  };

  const handleReject = (id: string, name: string) => {
    updateSAUserStatus(id, 'rejected');
    logSAAction('Reject User', `${name} - Compliance Failure`, 'user_management');
    toast({ variant: "destructive", title: "Registration Rejected", description: "The registration request has been decommissioned." });
  };

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Verification Gateway</h2>
          <p className="text-[15px] text-muted-foreground font-medium max-w-2xl">Manual identity audit and credential verification for new platform clients and contractors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <ApprovalStat label="Awaiting Audit" value={pending.length} icon={Clock} color="text-primary" bg="bg-primary/5" />
           <ApprovalStat label="Audit Latency" value="1.4h" icon={Zap} color="text-blue-600" bg="bg-blue-50" />
           <ApprovalStat label="Verified Today" value="12" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {pending.map(u => (
             <div key={u.id} className="enterprise-card border bg-card hover:border-primary transition-all p-8 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-muted border-2 flex items-center justify-center text-muted-foreground font-black text-xl uppercase">
                         {u.name.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                         <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{u.name}</h3>
                         <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[8px] font-black uppercase px-2 py-0 border-primary/30 text-primary">{u.roles[0]}</Badge>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">ID: {u.id}</span>
                         </div>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Request Date</p>
                      <p className="text-sm font-black text-foreground">{u.joinedAt}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-dashed border-border mb-8">
                   <div className="space-y-3">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Contact Intelligence</p>
                      <div className="space-y-1.5">
                         <p className="text-xs font-bold text-foreground flex items-center gap-2"><Mail className="h-3 w-3 text-primary" /> {u.email}</p>
                         <p className="text-xs font-bold text-foreground flex items-center gap-2"><Smartphone className="h-3 w-3 text-primary" /> +91 98XXX XXXXX</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Document Payload</p>
                      <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg border border-border">
                         <FileText className="h-4 w-4 text-primary" />
                         <span className="text-[10px] font-black uppercase text-foreground">KYC_IDENTITY.PDF</span>
                         <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto hover:text-primary"><ArrowRight className="h-3 w-3" /></Button>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 mt-auto">
                   <Button onClick={() => handleApprove(u.id, u.name)} className="flex-1 h-12 font-black uppercase text-[11px] tracking-widest bg-primary hover:bg-primary/90 shadow-lg">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Commit Approval
                   </Button>
                   <Button onClick={() => handleReject(u.id, u.name)} variant="outline" className="flex-1 h-12 font-black uppercase text-[11px] tracking-widest border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100">
                      <XCircle className="h-4 w-4 mr-2" /> Reject Entry
                   </Button>
                </div>
             </div>
           ))}

           {pending.length === 0 && (
             <div className="col-span-full py-32 text-center border-2 border-dashed rounded-3xl bg-muted/5">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground/20 mb-6" />
                <h3 className="text-xl font-black uppercase tracking-widest text-muted-foreground">Clear Queue</h3>
                <p className="text-[11px] font-black text-muted-foreground uppercase mt-2 tracking-[0.1em]">All registration requests have been audited.</p>
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ApprovalStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}