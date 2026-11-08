
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  User, 
  Briefcase, 
  Activity, 
  ShieldCheck, 
  Mail, 
  Smartphone, 
  MapPin, 
  Settings, 
  Lock, 
  ClipboardList, 
  History, 
  CheckCircle2, 
  Wrench, 
  Zap, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function ContractorProfilePage() {
  const router = useRouter();

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Operational Partner Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Master facility operator and platform service provider.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/contractor/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Ops Settings
             </Button>
             <Button variant="outline" onClick={() => router.push('/contractor/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Auth Keys
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Identity Hub */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-slate-400 font-black text-5xl shadow-2xl shrink-0">
                       J
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">John Contractor</h1>
                          <div className="flex items-center gap-3 mt-2">
                             <Badge className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">MASTER OPERATOR</Badge>
                             <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: HOST-CON-482 • VERIFIED</span>
                          </div>
                       </div>
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6 text-lg">
                          "Delivering end-to-end facility management for StaySync. Specialist in rapid-response maintenance, kitchen operations, and operational cost optimization."
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Mail className="h-4.5 w-4.5 text-primary" /> ops@staysync.com
                          </div>
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Smartphone className="h-4.5 w-4.5 text-primary" /> +91 98XXX XXXXX
                          </div>
                       </div>
                    </div>
                 </div>
                 <Briefcase className="absolute -right-10 -bottom-10 h-64 w-64 text-primary opacity-5" />
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <OpsStat label="Sites Managed" value="24" icon={Layers} color="text-primary" />
                 <OpsStat label="SLA Compliance" value="98%" icon={CheckCircle2} color="text-emerald-600" />
                 <OpsStat label="Avg Resolution" value="2.4h" icon={Zap} color="text-blue-600" />
              </div>

              {/* Operational Ledger */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                       <ClipboardList className="h-4 w-4 text-primary" /> Recent Site Milestones
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">Work Orders</Button>
                 </div>
                 <div className="divide-y">
                    <MilestoneRow site="StaySync Tech Wing" action="Biometric Sync Completed" status="Verified" time="2d ago" />
                    <MilestoneRow site="Elite PG Manor" action="HVAC System Restored" status="Success" time="4d ago" />
                    <MilestoneRow site="South Hub 4" action="New Kitchen Team Onboarded" status="In Progress" time="1w ago" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Expertise Categories */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Service Expertise</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Kitchen Ops', 'Plumbing', 'Electrical', 'HVAC', 'Networking', 'Facility Audit', 'Procurement'].map(e => (
                      <span key={e} className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase border border-primary/10 shadow-sm">{e}</span>
                    ))}
                 </div>
              </div>

              {/* Business Info */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Compliance Pulse</h4>
                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Operator Trust Score</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-black text-white">9.6</p>
                          <Badge className="bg-emerald-600 text-white font-black text-[9px]">EXCELLENT</Badge>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '96%' }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailItem label="Service Area" value="Bengaluru South" icon={MapPin} color="text-slate-400" />
                       <DetailItem label="GST Registration" value="VERIFIED" icon={ShieldCheck} color="text-emerald-400" />
                       <DetailItem label="Liability Ins." value="ACTIVE" icon={CheckCircle2} color="text-emerald-400" />
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              {/* Management Tip */}
              <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                 <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 opacity-80" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">Ops Insight</h4>
                 </div>
                 <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                    "Weekly plumbing audits in 'Tech Wing' have reduced emergency tickets by 40%. Recommend replicating protocol across all Tier-1 assets."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function OpsStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="enterprise-card border bg-card p-6 flex justify-between items-center">
       <div>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
          <p className={cn("text-2xl font-black tracking-tight", color)}>{value}</p>
       </div>
       <Icon className={cn("h-5 w-5 opacity-50", color)} />
    </div>
  );
}

function MilestoneRow({ site, action, status, time }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{action}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">{site}</p>
          </div>
       </div>
       <div className="text-right">
          <Badge variant="outline" className="text-[8px] font-black uppercase py-0 border-primary/20 bg-primary/5 text-primary">{status}</Badge>
          <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1">{time}</p>
       </div>
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-slate-500 flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
       <span className={cn("font-black uppercase", color)}>{value}</span>
    </div>
  );
}
