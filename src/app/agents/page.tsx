'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Users, 
  Target, 
  CreditCard, 
  Plus, 
  Building2, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  UserPlus,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredReferrals } from '@/lib/referral-store';
import { getStoredProjects } from '@/lib/project-store';
import { Referral, Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AgentDashboard() {
  const router = useRouter();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [properties, setProperties] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = () => {
      setReferrals(getStoredReferrals());
      setProperties(getStoredProjects());
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const stats = {
    active: referrals.filter(r => r.status !== 'admitted' && r.status !== 'rejected').length,
    admitted: referrals.filter(r => r.status === 'admitted').length,
    commission: referrals
      .filter(r => r.status === 'admitted' && r.paymentStatus !== 'paid')
      .reduce((acc, r) => acc + r.commissionAmount, 0)
      .toLocaleString(),
    totalEarned: referrals
      .filter(r => r.paymentStatus === 'paid')
      .reduce((acc, r) => acc + r.commissionAmount, 0)
      .toLocaleString()
  };

  return (
    <DashboardLayout role="agent">
      <SectionHeader 
        title="Hostel Matchmaking Hub" 
        subtitle="Authorized Admission Agent" 
        action={{ 
          label: "Refer New Student", 
          icon: UserPlus, 
          onClick: () => router.push('/agents/leads') 
        }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Referrals" value={stats.active} icon={Target} color="text-primary" />
        <StatCard title="Confirmed Admissions" value={stats.admitted} icon={CheckCircle2} color="text-emerald-600" />
        <StatCard title="Pending Commission" value={`₹${stats.commission}`} icon={CreditCard} color="text-amber-600" />
        <StatCard title="Total Payouts" value={`₹${stats.totalEarned}`} icon={TrendingUp} color="text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Referral Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Admission Pipeline</span>
              <Button variant="link" size="sm" onClick={() => router.push('/agents/leads')} className="h-auto p-0 text-[10px] font-bold uppercase">View All</Button>
            </div>
            <div className="divide-y overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-muted/10 border-b">
                    <th className="text-[10px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Student</th>
                    <th className="text-[10px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Target Hostel</th>
                    <th className="text-[10px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Status</th>
                    <th className="text-[10px] font-bold text-muted-foreground py-3 px-4 text-right uppercase tracking-widest">Comm.</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {referrals.slice(0, 5).map(ref => (
                    <tr key={ref.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <p className="text-sm font-bold text-foreground">{ref.studentName}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">{ref.studentPhone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-xs font-bold text-foreground">{ref.hostelName}</p>
                        <p className="text-[10px] text-primary font-bold uppercase">{ref.accommodationType}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold uppercase border",
                          ref.status === 'admitted' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          ref.status === 'referred' ? "bg-primary/10 text-primary border-primary/20" :
                          "bg-muted text-muted-foreground border-border"
                        )}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-xs font-bold text-foreground">₹{ref.commissionAmount}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">{ref.paymentStatus}</p>
                      </td>
                    </tr>
                  ))}
                  {referrals.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-muted-foreground text-xs uppercase font-bold tracking-widest opacity-50">No referrals found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Opportunities */}
          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Hostel Opportunities (Live Beds)</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map(p => (
                <div key={p.id} className="p-4 border rounded-xl hover:border-primary transition-all group bg-background/50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {p.totalBeds - p.occupiedBeds} Vacant
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground leading-tight">{p.propertyName}</h4>
                  <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1 mb-4">
                    <MapPin className="h-3 w-3" /> {p.address.split(',')[1] || p.address}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-dashed">
                    <div>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">Rent Starts</p>
                      <p className="text-xs font-bold text-foreground">₹{p.monthlyRent ? (p.monthlyRent/p.totalRooms).toFixed(0) : '12,000'}+</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/agents/leads')} className="h-7 text-[9px] font-bold uppercase tracking-widest group-hover:bg-primary group-hover:text-white">
                      Refer Student <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="enterprise-card border bg-slate-900 text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[11px] font-bold uppercase text-primary tracking-[0.2em] mb-4">Earnings Goal</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold">₹1.2L</p>
                    <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">MTD Commission Goal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">₹34,400</p>
                    <p className="text-[8px] font-bold uppercase text-muted-foreground">Current Progress</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '28%' }} />
                </div>
              </div>
            </div>
            <Clock className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
          </div>

          <div className="enterprise-card border bg-card p-6">
            <h4 className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest mb-6">Recent Contractor Feedback</h4>
            <div className="space-y-4">
              <FeedbackItem 
                student="Rahul Khanna" 
                msg="Admission Confirmed. Commission unlocked." 
                type="success"
              />
              <FeedbackItem 
                student="Sanya Mirza" 
                msg="Student contacted. Visiting property on Monday." 
                type="info"
              />
            </div>
          </div>

          <div className="enterprise-card border bg-primary text-primary-foreground p-6">
            <h4 className="text-[11px] font-bold uppercase opacity-80 tracking-widest mb-3">Admission Guide</h4>
            <p className="text-xs opacity-90 leading-relaxed font-medium">
              Always verify bed availability before promising a room. Admitted students stay for a minimum of 11 months to qualify for full commission.
            </p>
            <Button variant="outline" className="w-full mt-6 bg-white/10 border-white/20 text-white hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest">
              View Agent T&C
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SectionHeader({ title, subtitle, action }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">{subtitle}</p>
        <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase">{title}</h2>
      </div>
      {action && (
        <Button onClick={action.onClick} className="h-11 px-8 shadow-md font-bold text-[11px] uppercase tracking-widest">
          {action.icon && <action.icon className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="enterprise-card border p-6 flex flex-col justify-between hover:border-primary/30 transition-all bg-card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-muted rounded border border-border">
          <Icon className={cn("h-5 w-5", color)} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
        <p className={cn("text-3xl font-bold tracking-tight", color)}>{value}</p>
      </div>
    </div>
  );
}

function FeedbackItem({ student, msg, type }: any) {
  return (
    <div className="space-y-1.5 pb-4 border-b border-dashed last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-foreground">{student}</p>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          type === 'success' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        )} />
      </div>
      <p className="text-[11px] text-muted-foreground leading-tight italic font-medium">"{msg}"</p>
    </div>
  );
}
