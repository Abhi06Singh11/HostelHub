'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getSAUsers, updateSAUserStatus, logSAAction } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Mail, 
  Briefcase,
  AlertTriangle,
  User as UserIcon,
  Calendar,
  Smartphone,
  ShieldAlert,
  MoreVertical,
  History,
  Target,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function SAUserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'contractor': return Briefcase;
      case 'owner': return Layers;
      case 'agent': return Target;
      default: return ShieldCheck;
    }
  };

  const RoleIcon = getRoleIcon(user.roles[0]);

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push('/sa/users')} className="font-black uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> All Users
          </Button>
          <div className="flex gap-3">
             {user.status === 'pending' && (
               <Button onClick={() => handleStatusChange('verified')} className="h-10 font-bold uppercase text-[11px] tracking-widest bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Verify Account
               </Button>
             )}
             <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Reset Access
             </Button>
             <Button 
               variant="destructive" 
               onClick={() => handleStatusChange('suspended')}
               className="h-10 font-bold uppercase text-[11px] tracking-widest shadow-md"
             >
                <ShieldAlert className="h-4 w-4 mr-2" /> Suspend
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Identity Card */}
            <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-28 h-28 rounded-[2rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-black text-5xl shadow-xl shrink-0">
                     {user.avatar || user.name.charAt(0)}
                  </div>
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center justify-between">
                        <div>
                           <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">{user.name}</h1>
                           <div className="flex items-center gap-3 mt-1.5">
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black uppercase text-[10px] tracking-widest py-1 px-3">
                                 <RoleIcon className="h-3 w-3 mr-1.5" /> {user.roles[0]}
                              </Badge>
                              <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: {user.id}</span>
                           </div>
                        </div>
                        <Badge className={cn(
                          "font-black uppercase text-[10px] py-1.5 px-4 rounded-xl",
                          user.status === 'verified' || user.status === 'active' ? "bg-emerald-600 text-white" :
                          user.status === 'pending' ? "bg-primary text-white" : "bg-red-600 text-white"
                        )}>{user.status}</Badge>
                     </div>
                     <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6">
                        "{user.bio || `Platform ${user.roles[0]} active since ${user.joinedAt}. Account currently in ${user.status} state.`}"
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-dashed">
                        <div className="flex items-center gap-3 text-[11px] font-bold text-foreground uppercase tracking-widest">
                           <Mail className="h-4 w-4 text-primary" /> {user.email}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-bold text-foreground uppercase tracking-widest">
                           <Smartphone className="h-4 w-4 text-primary" /> +91 98XXX XXXXX
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="enterprise-card border bg-card p-8 space-y-6">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-[0.2em] border-b border-dashed pb-4 flex items-center gap-2">
                     <Activity className="h-4 w-4 text-primary" /> Operational Sync
                  </h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground">Joining Date</span>
                        <span className="text-xs font-bold text-foreground">{user.joinedAt}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground">Last Portal Access</span>
                        <span className="text-xs font-bold text-foreground">{user.lastLogin || 'N/A'}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-muted-foreground">Account Verified</span>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-emerald-200 bg-emerald-50 text-emerald-700">{user.status === 'verified' ? 'COMPLETED' : 'IN PROGRESS'}</Badge>
                     </div>
                  </div>
               </div>

               <div className="enterprise-card border bg-card p-8 space-y-6">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-[0.2em] border-b border-dashed pb-4 flex items-center gap-2">
                     <History className="h-4 w-4 text-primary" /> Workload Intelligence
                  </h3>
                  <div className="space-y-8">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                           <span className="text-muted-foreground">Focus Score</span>
                           <span className="text-primary">{user.workload || 0}%</span>
                        </div>
                        <Progress value={user.workload || 0} className="h-1.5" />
                     </div>
                     <div className="p-4 rounded-xl bg-muted/20 border-2 border-dashed">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-tight italic">
                           User is currently managing {user.assignedModules?.length || 0} active platform dependencies.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Backlog / Activity Timeline */}
            <div className="enterprise-card border bg-card overflow-hidden">
               <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                  <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                     <History className="h-4 w-4 text-primary" /> Platform Interactions
                  </h3>
                  <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">View Full Log</Button>
               </div>
               <div className="divide-y">
                  <ActivityRow action="Account Login" status="Success" time="2h ago" ip="45.112.x.x" />
                  <ActivityRow action="Profile Update" status="Success" time="1d ago" ip="45.112.x.x" />
                  <ActivityRow action="Document Upload" status="Verified" time="4d ago" ip="45.112.x.x" />
               </div>
            </div>
          </div>

          {/* Sidebar Intelligence */}
          <div className="space-y-8">
             <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Compliance Pulse</h4>
                <div className="space-y-6">
                   <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Trust Integrity Score</p>
                      <div className="flex items-center justify-between">
                         <p className="text-3xl font-black text-white">9.4</p>
                         <Badge className="bg-emerald-600 text-white font-black text-[9px]">HEALTHY</Badge>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: '94%' }} />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <DetailRow label="KYC Documents" value="Verified" icon={ShieldCheck} color="text-emerald-400" />
                      <DetailRow label="Bank Details" value="Pending" icon={AlertTriangle} color="text-amber-400" />
                      <DetailRow label="T&C Consent" value="Agreed" icon={CheckCircle2} color="text-emerald-400" />
                   </div>
                </div>
                <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
             </div>

             <div className="enterprise-card border bg-card p-8 space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Admin Protocol</h4>
                <p className="text-xs font-medium leading-relaxed text-muted-foreground opacity-90">
                   Changing this user's status will trigger an immediate system notification. All status modifications are recorded in the permanent audit ledger.
                </p>
                <Separator className="border-dashed" />
                <div className="flex flex-col gap-3">
                   <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                      <History className="h-3.5 w-3.5 mr-3 text-primary" /> View Session Audit
                   </Button>
                   <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                      <Lock className="h-3.5 w-3.5 mr-3 text-primary" /> Security Hardening
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ActivityRow({ action, status, time, ip }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors">
       <div className="flex items-center gap-4">
          <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(36,91,74,0.5)]" />
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight">{action}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">IP: {ip} • {time}</p>
          </div>
       </div>
       <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 bg-primary/5 text-primary">
          {status}
       </Badge>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" /> {label}
       </span>
       <span className={cn("text-[10px] font-black uppercase", color)}>{value}</span>
    </div>
  );
}
