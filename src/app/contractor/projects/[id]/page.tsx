'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStoredProjects } from '@/lib/project-store';
import { Project } from '@/lib/types';
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  Users, 
  Activity, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projs = getStoredProjects();
    const found = projs.find(p => p.id === id);
    if (found) setProject(found);
  }, [id]);

  if (!project) return null;

  const occupancyRate = project.totalBeds > 0 ? (project.occupiedBeds / project.totalBeds) * 100 : 0;

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/contractor/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> All Hostels
            </Button>
            <h2 className="text-2xl font-black tracking-tighter uppercase">{project.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/contractor/projects/${id}/edit`)}
              className="font-black text-[13px] uppercase tracking-widest"
            >
              Edit Management
            </Button>
            <Button className="font-black text-[13px] uppercase tracking-widest">
              Assign Staff
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="enterprise-card border bg-white p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-50 border rounded">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase text-slate-400">Hostel Identity</p>
                    <p className="text-xl font-bold text-slate-900">{project.propertyName}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-bold uppercase"><MapPin className="h-3 w-3" /> {project.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-black uppercase text-slate-400">Ownership Mode</p>
                  <span className={cn(
                    "inline-block px-3 py-1 rounded text-[14px] font-black uppercase border mt-1",
                    project.ownershipType === 'owned' ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-blue-100 text-blue-700 border-blue-200"
                  )}>{project.ownershipType === 'owned' ? 'Self-Owned' : 'Rented/Managed'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <SummaryStat icon={Building2} label="Total Rooms" value={project.totalRooms} />
                <SummaryStat icon={Users} label="Total Beds" value={project.totalBeds} />
                <SummaryStat icon={Activity} label="Occupied" value={project.occupiedBeds} highlight />
                <SummaryStat icon={CheckCircle2} label="Status" value={project.status} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-[13px] font-black uppercase text-slate-500 tracking-wider">Occupancy Performance</p>
                  <p className="text-[13px] font-black text-primary">{occupancyRate.toFixed(1)}% Capacity</p>
                </div>
                <Progress value={occupancyRate} className="h-3 bg-slate-100" />
              </div>
            </div>

            {project.ownershipType === 'rented' && (
              <div className="enterprise-card border bg-white">
                <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-slate-500" />
                    <span className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Building Owner Information</span>
                  </div>
                  <Button variant="link" size="sm" className="text-[11px] font-black uppercase">View Agreement</Button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded border flex items-center justify-center text-slate-300 font-black text-xl">
                        {project.ownerName?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{project.ownerName}</h4>
                        <p className="text-[11px] font-black uppercase text-primary tracking-widest">Property Asset Owner</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <p className="text-sm font-bold flex items-center gap-2 text-slate-700"><Phone className="h-3.5 w-3.5 text-slate-400" /> {project.ownerPhone}</p>
                      <p className="text-sm font-bold flex items-center gap-2 text-slate-700"><Mail className="h-3.5 w-3.5 text-slate-400" /> {project.ownerEmail}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 border rounded space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Monthly Rent</p>
                      <p className="text-lg font-black text-slate-900">₹{project.monthlyRent?.toLocaleString()}</p>
                    </div>
                    <Separator className="bg-slate-200" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Agreement Start</p>
                        <p className="text-xs font-bold">{project.contractStart}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Agreement End</p>
                        <p className="text-xs font-bold">{project.contractEnd}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {project.ownershipType === 'owned' && (
              <div className="enterprise-card border bg-emerald-50 border-emerald-100 p-6 flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-black uppercase text-emerald-900">Contractor-Owned Property</h4>
                  <p className="text-[11px] font-bold text-emerald-700 uppercase">No external rental obligations for this building asset.</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="enterprise-card border bg-slate-900 text-white p-6">
              <h4 className="text-[12px] font-black uppercase text-slate-400 tracking-widest mb-6">Hostel Financial Snapshot</h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[12px] text-slate-400 font-bold uppercase">Revenue (MTD)</span>
                  <span className="text-[12px] font-black uppercase text-green-400">₹2.8L</span>
                </div>
                {project.ownershipType === 'rented' && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[12px] text-slate-400 font-bold uppercase">Building Rent</span>
                    <span className="text-[12px] font-black uppercase text-red-400">₹{((project.monthlyRent || 0)/100000).toFixed(2)}L</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[12px] text-slate-400 font-bold uppercase">Operational Cost</span>
                  <span className="text-[12px] font-black uppercase text-amber-400">₹0.6L</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-[13px] text-white font-black uppercase">Estimated Net Profit</span>
                  <span className="text-[13px] font-black uppercase text-primary">₹1.4L</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-[12px] font-black uppercase tracking-widest">
                Download P&L Report
              </Button>
            </div>
            
            <div className="enterprise-card border bg-white">
              <div className="p-4 border-b bg-slate-50 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-slate-500" />
                <span className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Active Site Issues</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-[11px] font-black text-slate-400 uppercase py-8">No critical maintenance alerts for this hostel.</p>
                <Button variant="outline" size="sm" className="w-full text-[11px] font-black uppercase" onClick={() => router.push('/contractor/tickets')}>View Support Desk</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryStat({ icon: Icon, label, value, highlight = false }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 opacity-50">
        <Icon className="h-3.5 w-3.5" />
        <p className="text-[11px] font-black uppercase tracking-widest">{label}</p>
      </div>
      <p className={cn("text-base font-bold", highlight ? "text-primary uppercase" : "text-slate-900")}>{value}</p>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-slate-100", className)} />;
}
