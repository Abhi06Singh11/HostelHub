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
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getStudentProfile, getStudentInvoices } from '@/lib/student-store';
import { getStoredTickets } from '@/lib/ticket-store';
import { StudentProfile, MonthlyInvoice, Ticket } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function StudentDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [invoices, setInvoices] = useState<MonthlyInvoice[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const load = () => {
      setProfile(getStudentProfile());
      setInvoices(getStudentInvoices());
      setTickets(getStoredTickets());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  if (!profile) return null;

  const currentInvoice = invoices.find(inv => inv.status !== 'paid');
  const activeTickets = tickets.filter(t => t.status !== 'closed');
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Resident Portal</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase">Welcome Home, {profile.name.split(' ')[0]}</h2>
          </div>
          <div className="flex gap-3">
             <Button onClick={() => router.push('/student/pay')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Current Stay & Quick Actions */}
             <div className="enterprise-card border bg-card p-8">
                <div className="flex justify-between items-start mb-8">
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">Accommodation Details</h3>
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> StaySync Tech Wing, Plot 42, Bengaluru</p>
                   </div>
                   <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] uppercase">Active Resident</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-dashed">
                   <InfoBit label="Check In" value={profile.moveInDate} />
                   <InfoBit label="Room Type" value="Double Sharing" />
                   <InfoBit label="Floor" value="3rd Floor" />
                   <InfoBit label="Bed Category" value="Premium Single" />
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                   <Button variant="outline" onClick={() => router.push('/student/room')} className="flex-1 min-w-[150px] h-11 font-bold text-[11px] uppercase tracking-widest border-2">
                      View My Room
                   </Button>
                   <Button variant="outline" onClick={() => router.push('/student/complaints')} className="flex-1 min-w-[150px] h-11 font-bold text-[11px] uppercase tracking-widest border-2">
                      Report Issue
                   </Button>
                   <Button variant="outline" className="flex-1 min-w-[150px] h-11 font-bold text-[11px] uppercase tracking-widest border-2">
                      <PhoneCall className="h-4 w-4 mr-2" /> Contact Admin
                   </Button>
                </div>
             </div>

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
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Amount Due for {currentInvoice?.month}</p>
                   </div>
                   <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                         <span className="text-slate-500">Due Date</span>
                         <span>{currentInvoice?.dueDate || 'N/A'}</span>
                      </div>
                      <Button onClick={() => router.push('/student/pay')} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[11px] tracking-widest">
                         Make Payment Now
                      </Button>
                   </div>
                </div>
                <Wallet className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
             </div>

             {/* Profile Progress */}
             <div className="enterprise-card border bg-card p-6 space-y-5">
                <h4 className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Profile Integrity</h4>
                <div className="space-y-3">
                   <div className="flex justify-between text-[11px] font-bold uppercase">
                      <span>Verification</span>
                      <span className="text-primary">{profile.completionPercentage}%</span>
                   </div>
                   <Progress value={profile.completionPercentage} className="h-1.5" />
                </div>
                <div className="p-3 bg-muted/20 border border-dashed rounded-lg">
                   <p className="text-[10px] text-muted-foreground font-medium leading-relaxed italic">
                     "Your identity documents are under review. Full verification allows for faster service requests."
                   </p>
                </div>
                <Button variant="ghost" onClick={() => router.push('/student/profile')} className="w-full h-9 text-[10px] font-bold uppercase tracking-widest border border-border hover:bg-muted">
                   Complete Profile <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
             </div>
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

function InfoBit({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">{label}</p>
       <p className="text-xs font-bold text-foreground uppercase">{value}</p>
    </div>
  );
}
