'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  MapPin, 
  Wallet, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Home,
  UserCheck,
  Calendar,
  PhoneCall,
  UserCircle,
  FileText,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getStudentProfile, getStudentInvoices, getStudentNotifications } from '@/lib/student-store';
import { getStoredTickets } from '@/lib/ticket-store';
import { StudentProfile, MonthlyInvoice, Ticket, StudentNotification } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export default function StudentDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [invoices, setInvoices] = useState<MonthlyInvoice[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);

  useEffect(() => {
    const load = () => {
      setProfile(getStudentProfile());
      setInvoices(getStudentInvoices());
      setTickets(getStoredTickets());
      setNotifications(getStudentNotifications());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  if (!profile) return null;

  const currentInvoice = invoices.find(inv => inv.status !== 'paid');
  const activeTickets = tickets.filter(t => t.status !== 'closed');
  const infoRequests = notifications.filter(n => n.category === 'information_request' && n.status !== 'closed');
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-1">Resident Portal</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase">Welcome Home, {profile.name.split(' ')[0]}</h2>
          </div>
          <div className="flex gap-3">
             <Button onClick={() => router.push('/student/pay')} className="h-11 px-8 font-semibold text-[13px] uppercase tracking-widest shadow-lg">
                <Wallet className="h-4 w-4 mr-2" /> Pay Rent
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Assigned Bed" value={`${profile.roomNumber}-${profile.bedNumber}`} details={profile.assignedHostelName} icon={Home} color="text-primary" />
          <StatCard title="Monthly Rent" value={`₹${invoices[0]?.baseRent.toLocaleString()}`} details="Next due: June 5th" icon={Wallet} color="text-emerald-600" />
          <StatCard title="Active Issues" value={activeTickets.length} details="Unresolved complaints" icon={AlertTriangle} color="text-amber-600" />
          <StatCard title="Profile State" value={profile.verificationStatus} details={`${profile.completionPercentage}% Complete`} icon={UserCheck} color="text-blue-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-8">
             {/* Profile Completion Widget */}
             <Card className={cn(
               "enterprise-card border overflow-hidden",
               profile.completionPercentage < 100 ? "border-amber-200 bg-amber-50/30" : "bg-card"
             )}>
                <div className="p-8 space-y-8">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                         <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Complete Your Resident Profile</h3>
                         <p className="text-sm text-muted-foreground font-medium">Your profile is {profile.completionPercentage < 100 ? 'incomplete' : 'complete'}. Ensure all details are accurate for verification.</p>
                      </div>
                      <div className="text-center w-full md:w-32">
                         <p className="text-3xl font-bold text-primary">{profile.completionPercentage}%</p>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Dossier Health</p>
                         <Progress value={profile.completionPercentage} className="h-1.5 mt-3" />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-dashed">
                      <CompletionItem label="Personal Info" done={!!profile.dob && !!profile.gender} />
                      <CompletionItem label="Contact Info" done={!!profile.phone && !!profile.email} />
                      <CompletionItem label="Guardian Node" done={!!profile.fatherName && !!profile.guardianName} />
                      <CompletionItem label="ID Document" done={profile.idDocsUploaded} />
                   </div>

                   <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => router.push('/student/profile')} className="h-11 px-8 font-semibold text-[12px] uppercase tracking-widest border-2">
                        View Dossier
                      </Button>
                      {profile.completionPercentage < 100 && (
                        <Button onClick={() => router.push('/student/profile')} className="h-11 px-10 font-semibold text-[12px] uppercase tracking-widest shadow-md">
                          Complete Now
                        </Button>
                      )}
                   </div>
                </div>
             </Card>

             {/* Information Requests */}
             {infoRequests.length > 0 && (
               <div className="space-y-4">
                  <h4 className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                    <Info className="h-4 w-4 text-amber-600" /> Pending Contractor Requests
                  </h4>
                  {infoRequests.map(req => (
                    <Card key={req.id} className="enterprise-card border-amber-200 bg-amber-50/50 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="flex gap-4">
                          <div className="p-3 bg-amber-100 rounded-xl text-amber-700 shrink-0 h-fit">
                             <FileText className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="text-base font-bold text-foreground uppercase tracking-tight">{req.title}</h4>
                             <p className="text-sm text-muted-foreground font-medium mt-1">Please provide: <span className="text-amber-700 font-bold">{req.requestedFields?.join(', ')}</span></p>
                          </div>
                       </div>
                       <Button onClick={() => router.push('/student/profile')} className="bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-[11px] tracking-widest h-10 px-8 shrink-0">
                          Fix Now
                       </Button>
                    </Card>
                  ))}
               </div>
             )}

             {/* Recent Activity */}
             <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Recent Complaints</span>
                  <Button variant="link" size="sm" onClick={() => router.push('/student/complaints')} className="h-auto p-0 text-[10px] font-bold uppercase">View Desk</Button>
                </div>
                <div className="divide-y">
                   {activeTickets.length > 0 ? activeTickets.slice(0, 3).map(t => (
                     <div key={t.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => router.push(`/student/complaints/${t.id}`)}>
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-10 h-10 rounded-lg border flex items-center justify-center",
                             t.status === 'new' ? "bg-primary/5 text-primary border-primary/20" : "bg-amber-50 text-amber-600 border-amber-200"
                           )}>
                              <AlertTriangle className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-foreground leading-tight">{t.category}</p>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase">{t.date}</p>
                           </div>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold uppercase border",
                          t.status === 'new' ? "bg-primary/10 text-primary border-primary/20" : "bg-amber-50 text-amber-600 border-amber-200"
                        )}>{t.status}</span>
                     </div>
                   )) : (
                     <div className="py-12 text-center opacity-40">
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-[10px] font-bold uppercase">No active complaints</p>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="space-y-8">
             {/* Rent Summary */}
             <div className="enterprise-card border bg-slate-900 text-white p-6 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                   <div className="flex justify-between items-center">
                      <h4 className="text-[11px] font-bold uppercase text-primary tracking-widest">Rent Status</h4>
                      {currentInvoice?.status === 'pending' && <span className="text-[9px] font-bold text-amber-400 animate-pulse">ACTION REQUIRED</span>}
                   </div>
                   <div className="space-y-1">
                      <p className="text-3xl font-bold tracking-tight">₹{currentInvoice?.total.toLocaleString() || '0'}</p>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Amount Due for {currentInvoice?.month}</p>
                   </div>
                   <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                         <span className="text-white/30">Due Date</span>
                         <span>{currentInvoice?.dueDate || 'N/A'}</span>
                      </div>
                      <Button onClick={() => router.push('/student/pay')} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[11px] tracking-widest border-none">
                         Make Payment Now
                      </Button>
                   </div>
                </div>
                <Wallet className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
             </div>

             {/* Profile Pulse */}
             <Card className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Compliance Pulse</h4>
                 <div className="space-y-8">
                    <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-4">
                       <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Verification Node</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-bold text-foreground">9.2</p>
                          <Badge className={cn("font-bold text-[9px]", profile.verificationStatus === 'verified' ? "bg-emerald-600 text-white" : "bg-amber-500 text-white")}>
                            {profile.verificationStatus.toUpperCase()}
                          </Badge>
                       </div>
                       <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full bg-primary")} style={{ width: '92%' }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailRow label="KYC Document" value={profile.idDocsUploaded ? 'Verified' : 'Pending'} icon={FileText} color={profile.idDocsUploaded ? "text-emerald-600" : "text-amber-600"} />
                       <DetailRow label="Stay Registry" value="ACTIVE" icon={CheckCircle2} color="text-emerald-600" />
                       <DetailRow label="Police Status" value={profile.verificationStatus === 'verified' ? 'STABLE' : 'PENDING'} icon={ShieldCheck} color="text-primary" />
                    </div>
                 </div>
              </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, details, icon: Icon, color }: any) {
  return (
    <div className="enterprise-card border p-6 flex flex-col justify-between hover:border-primary/30 transition-all bg-card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-muted rounded border border-border">
          <Icon className={cn("h-5 w-5", color)} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
        <p className={cn("text-2xl font-bold tracking-tight", color)}>{value}</p>
        <div className="h-px w-full bg-border/50 my-2" />
        <p className="text-[10px] font-medium text-muted-foreground uppercase">{details}</p>
      </div>
    </div>
  );
}

function CompletionItem({ label, done }: { label: string, done: boolean }) {
  return (
    <div className="flex items-center gap-3">
       <div className={cn(
         "w-5 h-5 rounded-full flex items-center justify-center border",
         done ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "bg-muted border-border text-muted-foreground"
       )}>
          {done ? <CheckCircle2 className="h-3 w-3" /> : <div className="h-1 w-1 bg-current rounded-full" />}
       </div>
       <span className={cn("text-[11px] font-bold uppercase tracking-tight", done ? "text-foreground" : "text-muted-foreground")}>{label}</span>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest">
       <span className="text-muted-foreground flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" /> {label}
       </span>
       <span className={cn("font-semibold uppercase", color)}>{value}</span>
    </div>
  );
}
