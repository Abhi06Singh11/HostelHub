'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Building2, 
  Users, 
  Plus, 
  ArrowRight, 
  Activity, 
  Calendar, 
  Search,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Zap,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockProjects, mockTickets, mockStudentInquiries } from '@/lib/mock-data';
import { getStoredStudents } from '@/lib/student-management-store';
import { StudentDetail } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function ContractorDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDetail[]>([]);

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const totalBeds = mockProjects.reduce((acc, p) => acc + p.totalBeds, 0);
  const occupiedBeds = mockProjects.reduce((acc, p) => acc + p.occupiedBeds, 0);
  const totalRented = mockProjects.filter(p => p.ownershipType === 'rented').length;
  const totalOwned = mockProjects.filter(p => p.ownershipType === 'owned').length;
  const pendingTickets = mockTickets.filter(t => t.status === 'new' || t.status === 'in-progress').length;

  const stats = {
    activeStudents: students.filter(s => s.stayStatus === 'active').length,
    leftStudents: students.filter(s => s.stayStatus === 'left').length,
    govVerified: students.filter(s => s.govIdVerified).length,
    policeVerified: students.filter(s => s.policeVerified).length,
    docsPending: students.filter(s => s.documents.some(d => d.status === 'pending')).length
  };

  return (
    <DashboardLayout role="contractor">
      <SectionHeader 
        title="Operations Control Hub" 
        subtitle="Master Facility Management" 
        action={{ label: "Add New Property", icon: Plus, onClick: () => router.push('/contractor/projects/new') }} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Properties" 
          value={mockProjects.length} 
          icon={Building2} 
          onClick={() => router.push('/contractor/projects')}
          details={`${totalOwned} Owned • ${totalRented} Managed`}
        />
        <StatCard 
          title="Resident Population" 
          value={stats.activeStudents} 
          icon={Users} 
          onClick={() => router.push('/contractor/students/active')}
          details={`${stats.leftStudents} Archived Profiles`}
          progress={(occupiedBeds/totalBeds)*100}
        />
        <StatCard 
          title="Service Queue" 
          value={pendingTickets} 
          icon={MessageSquare} 
          onClick={() => router.push('/contractor/tickets')}
          details="Active maintenance nodes"
          trend="urgent"
        />
        <StatCard 
          title="Police Syncs" 
          value={`${stats.policeVerified}/${stats.activeStudents}`} 
          icon={ShieldCheck} 
          onClick={() => router.push('/contractor/students')}
          details="Verification Compliance"
          trend={stats.policeVerified < stats.activeStudents ? "pending" : "done"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="enterprise-card border overflow-hidden bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Compliance Pulse (Resident IDs)</span>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Gov ID Verified</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">{stats.govVerified}</p>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">{(stats.govVerified/stats.activeStudents*100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Police Verified</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">{stats.policeVerified}</p>
                  <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">{(stats.policeVerified/stats.activeStudents*100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Doc Vault Audits</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">{stats.docsPending}</p>
                  <span className="text-[10px] font-bold text-red-600 flex items-center gap-0.5">Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Recent Resident Syncs</span>
              <Button variant="link" size="sm" onClick={() => router.push('/contractor/students')} className="h-auto p-0 text-[10px] uppercase font-bold">View Registry</Button>
            </div>
            <div className="divide-y">
              {students.slice(0, 3).map(student => (
                <div key={student.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between cursor-pointer group" onClick={() => router.push(`/contractor/students/${student.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/5 rounded-xl border border-primary/10 group-hover:bg-primary/10 transition-colors">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{student.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{student.assignedHostelName} • Room {student.roomNumber}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">ID Type</p>
                      <p className="text-xs font-bold text-foreground">{student.govIdType}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="enterprise-card border bg-slate-900 text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[11px] font-bold uppercase text-primary tracking-[0.2em] mb-4">Admissions summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-white">{mockStudentInquiries.length}</p>
                    <p className="text-[9px] font-bold uppercase text-white/60">Pipeline Lead Nodes</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => router.push('/contractor/inquiries')} className="h-7 text-[9px] font-bold uppercase text-white border-white/40 hover:bg-white/10 px-4">Manage Hub</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                     <p className="text-lg font-bold text-emerald-400">4</p>
                     <p className="text-[8px] font-bold uppercase text-white/40">Highly Interested</p>
                  </div>
                  <div>
                     <p className="text-lg font-bold text-primary">2</p>
                     <p className="text-[8px] font-bold uppercase text-white/40">Ready to Check-in</p>
                  </div>
                </div>
              </div>
            </div>
            <Zap className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
          </div>

          <div className="enterprise-card border bg-card p-6 space-y-4">
             <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Manager Insight</h4>
             <p className="text-xs font-medium leading-relaxed italic border-l-2 border-primary pl-4">
               "{stats.policeVerified < stats.activeStudents ? `${stats.activeStudents - stats.policeVerified} residents are awaiting police verification documentation. Please follow up today.` : 'All residents are currently compliant with police verification protocols.'}"
             </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SectionHeader({ title, subtitle, action }: any) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">{subtitle}</p>
        <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase">{title}</h2>
      </div>
      {action && (
        <Button onClick={action.onClick} className="h-10 px-6 shadow-md font-bold text-[11px] uppercase tracking-widest">
          {action.icon && <action.icon className="h-3.5 w-3.5 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, details, onClick, progress, trend }: any) {
  return (
    <Card className="enterprise-card border bg-card hover:border-primary transition-all cursor-pointer group" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-muted rounded border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          </div>
          {trend === 'urgent' && <span className="text-[9px] font-bold uppercase bg-destructive/10 text-destructive px-2 py-0.5 rounded-full border border-destructive/20 animate-pulse">Urgent</span>}
          {trend === 'pending' && <span className="text-[9px] font-bold uppercase bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber-500/20">Audit Due</span>}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-dashed border-border">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">{details}</p>
          {progress !== undefined && (
            <div className="w-full h-1 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
