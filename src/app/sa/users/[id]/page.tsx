'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getSAUsers, updateSAUserStatus, logSAAction, updateSAVerification } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Mail, 
  Briefcase,
  Smartphone,
  ShieldAlert,
  Target,
  GraduationCap,
  Zap,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

export default function SAUserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'identity' | 'compliance'>('identity');
  const [confirmState, setConfirmState] = useState(true);

  useEffect(() => {
    const load = () => {
      const users = getSAUsers();
      const found = users.find(u => u.id === id);
      if (found) setUser(found);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, [id]);

  if (!user) return null;

  const handleStatusChange = (status: User['status']) => {
    updateSAUserStatus(user.id, status);
    logSAAction('Update User Status', `${user.name} -> ${status}`, 'user_management');
    toast({ title: "Ledger Updated", description: `${user.name} is now ${status}.` });
  };

  const handleToggle = (type: 'identity' | 'compliance', currentState: boolean) => {
    setConfirmType(type);
    setConfirmState(!currentState);
    setIsConfirmOpen(true);
  };

  const commitVerification = () => {
    updateSAVerification(user.id, confirmType, confirmState, 'Global Admin');
    logSAAction('Verification Update', `${user.name} - ${confirmType} set to ${confirmState}`, 'security');
    setIsConfirmOpen(false);
    toast({ title: "Verification Synced", description: "The compliance ledger has been updated." });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'contractor': return Briefcase;
      case 'owner': return Layers;
      case 'agent': return Target;
      default: return ShieldCheck;
    }
  };

  const role = user.roles[0];
  const RoleIcon = getRoleIcon(role);
  const overallVerified = user.identityVerified && user.complianceVerified;

  const complianceLabel = role === 'contractor' ? 'Business License Verified' : 
                         role === 'owner' ? 'Asset Ownership Verified' :
                         role === 'student' ? 'Police Verification Done' : 'Certification Verified';

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => router.push('/sa/users')} className="font-semibold uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Users
          </Button>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
             <Button variant="outline" className="flex-1 sm:flex-none h-10 font-bold uppercase text-[10px] md:text-[11px] tracking-widest border-2">
                <Lock className="h-3.5 w-3.5 mr-1.5 md:mr-2" /> Reset Access
             </Button>
             <Button 
               variant="destructive" 
               onClick={() => handleStatusChange('suspended')}
               className="flex-1 sm:flex-none h-10 font-bold uppercase text-[10px] md:text-[11px] tracking-widest shadow-md"
             >
                <ShieldAlert className="h-3.5 w-3.5 mr-1.5 md:mr-2" /> Suspend Account
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Identity Card */}
            <div className="enterprise-card border bg-card p-6 md:p-10 relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-bold text-3xl md:text-5xl shadow-xl shrink-0 uppercase">
                     {user.avatar || user.name.charAt(0)}
                  </div>
                  <div className="space-y-4 flex-1 w-full">
                     <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                           <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-foreground">{user.name}</h1>
                           <div className="flex flex-wrap items-center gap-3 mt-1.5">
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold uppercase text-[9px] md:text-[10px] tracking-widest py-0.5 md:py-1 px-2 md:px-3">
                                 <RoleIcon className="h-3 w-3 mr-1.5" /> {user.roles[0]}
                              </Badge>
                              <span className="text-[10px] md:text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: {user.id}</span>
                           </div>
                        </div>
                        <Badge className={cn(
                          "font-bold uppercase text-[10px] py-1.5 px-4 rounded-xl shadow-sm",
                          overallVerified ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
                        )}>{overallVerified ? 'Fully Verified' : 'Partially Verified'}</Badge>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-dashed">
                        <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold text-foreground uppercase tracking-widest">
                           <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" /> <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold text-foreground uppercase tracking-widest">
                           <Smartphone className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" /> {user.phone || 'NO CONTACT'}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
               <Card className="enterprise-card p-6 md:p-8 space-y-6">
                  <h3 className="text-[12px] md:text-sm font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <Lock className="h-4 w-4 text-primary" /> Session Intelligence
                  </h3>
                  <div className="space-y-4">
                     <DetailRow label="Joining Date" value={user.joinedAt} />
                     <DetailRow label="Last Port Access" value={user.lastLogin || 'N/A'} />
                     <DetailRow label="Account State" value={user.status} />
                  </div>
               </Card>

               <Card className="enterprise-card p-6 md:p-8 space-y-6">
                  <h3 className="text-[12px] md:text-sm font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <ShieldCheck className="h-4 w-4 text-primary" /> Security Matrix
                  </h3>
                  <div className="space-y-4">
                     <DetailRow label="2FA Enabled" value="Yes" />
                     <DetailRow label="Auth Method" value="OAuth / LDAP" />
                     <DetailRow label="Clearance" value="Level 3" />
                  </div>
               </Card>
            </div>
          </div>

          <div className="space-y-8">
             {/* Verification Gateway */}
             <Card className="enterprise-card p-6 md:p-8 space-y-8">
                <div className="space-y-1">
                   <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">Verification Gateway</h3>
                   <p className="text-[10px] md:text-[11px] text-muted-foreground font-medium">Independent compliance synchronization.</p>
                </div>

                <div className="space-y-6 md:space-y-8">
                   <div className="flex items-center justify-between gap-4 md:gap-6 p-3 md:p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
                      <div className="space-y-1 flex-1">
                         <Label className="text-[11px] md:text-xs font-semibold uppercase tracking-tight flex items-center gap-2 text-foreground leading-tight">
                            <ShieldCheck className={cn("h-4 w-4", user.identityVerified ? "text-emerald-600" : "text-muted-foreground")} />
                            Identity Verified
                         </Label>
                         <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Docs Checked.</p>
                      </div>
                      <Switch 
                        checked={user.identityVerified} 
                        onCheckedChange={() => handleToggle('identity', user.identityVerified)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                   </div>

                   <div className="flex items-center justify-between gap-4 md:gap-6 p-3 md:p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
                      <div className="space-y-1 flex-1">
                         <Label className="text-[11px] md:text-xs font-semibold uppercase tracking-tight flex items-center gap-2 text-foreground leading-tight">
                            <Zap className={cn("h-4 w-4", user.complianceVerified ? "text-emerald-600" : "text-muted-foreground")} />
                            Compliance
                         </Label>
                         <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">{complianceLabel}</p>
                      </div>
                      <Switch 
                        checked={user.complianceVerified} 
                        onCheckedChange={() => handleToggle('compliance', user.complianceVerified)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-dashed">
                   <h4 className="text-[10px] font-semibold uppercase text-muted-foreground tracking-widest">Metadata Ledger</h4>
                   <div className="space-y-3">
                      <AuditMeta label="ID Status" value={user.identityVerified ? 'Verified' : 'Pending'} />
                      <AuditMeta label="Comp. Status" value={user.complianceVerified ? 'Verified' : 'Pending'} />
                      <AuditMeta label="Audit Cycle" value="Weekly" />
                   </div>
                </div>
             </Card>

             <div className="enterprise-card border bg-primary text-primary-foreground p-6 md:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                   <Info className="h-5 w-5 opacity-80" />
                   <h4 className="text-[10px] font-bold uppercase tracking-widest">Governance Tip</h4>
                </div>
                <p className="text-[11px] opacity-90 leading-relaxed font-medium uppercase tracking-tight">
                   Ensure all legal documents are manually inspected before committing verified status.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Verification Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md rounded-3xl border-2 p-6 md:p-10">
           <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">
                 {confirmState ? 'Authorize Status' : 'Rollback Status'}
              </DialogTitle>
              <DialogDescription className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Action will be logged in security audit.
              </DialogDescription>
           </DialogHeader>
           <div className="space-y-6 py-4 text-center">
              <p className="text-[12px] md:text-sm font-semibold text-foreground leading-relaxed uppercase">
                 {confirmState 
                   ? `Confirm ${confirmType} status for ${user.name}.`
                   : `Confirm reversal of ${confirmType} status for this node.`
                 }
              </p>
              {!confirmState && (
                <Textarea placeholder="Reason for reversal..." className="min-h-[100px] border-2 font-medium" />
              )}
           </div>
           <DialogFooter className="gap-2">
              <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} className="font-semibold uppercase text-[11px] tracking-widest flex-1">Cancel</Button>
              <Button onClick={commitVerification} className={cn("h-11 px-6 md:px-8 font-semibold uppercase text-[11px] tracking-widest flex-1", confirmState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700")}>
                 {confirmState ? 'Commit' : 'Decommission'}
              </Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

function DetailRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between items-center text-[10px] md:text-[11px]">
       <span className="text-muted-foreground uppercase tracking-widest font-bold">
          {label}
       </span>
       <span className={cn("font-bold uppercase", color || "text-foreground")}>{value}</span>
    </div>
  );
}

function AuditMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground">{label}</span>
       <span className="text-foreground">{value}</span>
    </div>
  );
}
