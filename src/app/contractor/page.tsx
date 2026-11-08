'use client';
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
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockProjects, mockTickets, mockStudentInquiries } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function ContractorDashboard() {
  const router = useRouter();

  const totalBeds = mockProjects.reduce((acc, p) => acc + p.totalBeds, 0);
  const occupiedBeds = mockProjects.reduce((acc, p) => acc + p.occupiedBeds, 0);
  const totalRented = mockProjects.filter(p => p.ownershipType === 'rented').length;
  const totalOwned = mockProjects.filter(p => p.ownershipType === 'owned').length;
  const pendingTickets = mockTickets.filter(t => t.status === 'new' || t.status === 'in-progress').length;

  return (
    <DashboardLayout role="contractor">
      <SectionHeader 
        title="Hostel Hub Operations" 
        subtitle="Property Manager" 
        action={{ label: "Add New Property", icon: Plus, onClick: () => router.push('/contractor/projects/new') }} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Properties" 
          value={mockProjects.length} 
          icon={Building2} 
          onClick={() => router.push('/contractor/projects')}
          details={`${totalOwned} Owned • ${totalRented} Rented`}
        />
        <StatCard 
          title="Bed Occupancy" 
          value={`${occupiedBeds}/${totalBeds}`} 
          icon={Users} 
          onClick={() => router.push('/contractor/projects')}
          details={`${Math.round((occupiedBeds/totalBeds)*100)}% Total Utilization`}
          progress={(occupiedBeds/totalBeds)*100}
        />
        <StatCard 
          title="Unresolved Tickets" 
          value={pendingTickets} 
          icon={MessageSquare} 
          onClick={() => router.push('/contractor/tickets')}
          details="Active maintenance requests"
          trend="urgent"
        />
        <StatCard 
          title="Pending Inquiries" 
          value={mockStudentInquiries.length} 
          icon={Search} 
          onClick={() => router.push('/contractor/inquiries')}
          details="New prospective student leads"
          trend="new"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="enterprise-card border overflow-hidden bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Financial Performance (MTD)</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Monthly Revenue</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">₹8.42L</p>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> +12%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Operational Cost</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">₹2.15L</p>
                  <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5"><TrendingDown className="h-3 w-3" /> -4%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Active Property Portfolio</span>
              <Button variant="link" size="sm" onClick={() => router.push('/contractor/projects')} className="h-auto p-0 text-[10px] uppercase font-bold">View All</Button>
            </div>
            <div className="divide-y">
              {mockProjects.slice(0, 3).map(proj => (
                <div key={proj.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between cursor-pointer group" onClick={() => router.push(`/contractor/projects/${proj.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/5 rounded border border-primary/10 group-hover:bg-primary/10 transition-colors">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{proj.propertyName}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{proj.address}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Occupancy</p>
                      <p className="text-sm font-bold text-foreground">{Math.round((proj.occupiedBeds/proj.totalBeds)*100)}%</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="enterprise-card border bg-card">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Upcoming Renewals</span>
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-4">
              {mockProjects.filter(p => p.ownershipType === 'rented').map(p => (
                <div key={p.id} className="p-3 bg-amber-500/5 border border-amber-500/20 rounded flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-foreground">{p.propertyName}</p>
                    <p className="text-[9px] font-bold text-amber-600 uppercase mt-0.5">Expires: {p.contractEnd}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-[9px] font-bold uppercase border-amber-500/30 hover:bg-amber-500/10">Renew</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="enterprise-card border bg-slate-900 text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[11px] font-bold uppercase text-primary tracking-[0.2em] mb-4">Admissions Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold">{mockStudentInquiries.length}</p>
                    <p className="text-[9px] font-bold uppercase text-muted-foreground">Total Pipeline Leads</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => router.push('/contractor/inquiries')} className="h-7 text-[9px] font-bold uppercase text-white border-white/20 hover:bg-white/10">Manage Hub</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-lg font-bold text-emerald-400">4</p>
                    <p className="text-[8px] font-bold uppercase text-muted-foreground">Interested</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">2</p>
                    <p className="text-[8px] font-bold uppercase text-muted-foreground">Converted</p>
                  </div>
                </div>
              </div>
            </div>
            <Activity className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
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
          {trend === 'new' && <span className="text-[9px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">New</span>}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-dashed border-border">
          <p className="text-[10px] font-bold text-muted-foreground">{details}</p>
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
