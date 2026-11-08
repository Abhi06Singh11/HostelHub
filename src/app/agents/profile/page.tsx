
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  User, 
  Target, 
  TrendingUp, 
  CreditCard, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Users, 
  Settings,
  Lock,
  Mail,
  Smartphone,
  MapPin,
  Briefcase,
  History,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function AgentProfilePage() {
  const router = useRouter();

  return (
    <DashboardLayout role="agent">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Partner Agent Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Certified admission agent managing regional referral pipelines.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/agents/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Agent Config
             </Button>
             <Button variant="outline" onClick={() => router.push('/agents/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Secure Node
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Agent Identity Hub */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-cyan-100 border-4 border-cyan-50 flex items-center justify-center text-cyan-600 font-black text-5xl shadow-2xl shrink-0">
                       J
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">John Administrator</h1>
                          <div className="flex items-center gap-3 mt-2">
                             <Badge className="bg-cyan-600 text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">CERTIFIED AGENT</Badge>
                             <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: HOST-AGT-4829 • LEVEL 2</span>
                          </div>
                       </div>
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-cyan-500/20 pl-6 text-lg">
                          "Connecting students with premium living spaces. Specialist in South Bengaluru student housing market with a focus on high-conversion leads."
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Mail className="h-4.5 w-4.5 text-cyan-600" /> john.admin@hostelhub.com
                          </div>
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Smartphone className="h-4.5 w-4.5 text-cyan-600" /> +91 98XXX XXXXX
                          </div>
                       </div>
                    </div>
                 </div>
                 <Target className="absolute -right-10 -bottom-10 h-64 w-64 text-cyan-600 opacity-5" />
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <RefStat label="Total Referrals" value="112" icon={Users} color="text-primary" />
                 <RefStat label="Conversion Rate" value="12.4%" icon={Zap} color="text-emerald-600" />
                 <RefStat label="Unpaid Comm." value="₹24.5k" icon={CreditCard} color="text-blue-600" />
              </div>

              {/* Referral Pipeline */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                       <History className="h-4 w-4 text-cyan-600" /> Recent Success Nodes
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">Full Pipeline</Button>
                 </div>
                 <div className="divide-y">
                    <PipelineRow name="Rahul Khanna" property="StaySync Tech Wing" status="Admitted" date="12 May" />
                    <PipelineRow name="Sanya Mirza" property="Elite Student Manor" status="Interested" date="14 May" />
                    <PipelineRow name="Amit Sharma" property="StaySync Premium" status="Admitted" date="10 May" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Territory */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Assigned Territory</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/20 border border-dashed rounded-2xl">
                       <MapPin className="h-5 w-5 text-cyan-600" />
                       <span className="text-[11px] font-black uppercase text-foreground">South Bengaluru Cluster</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/20 border border-dashed rounded-2xl">
                       <Briefcase className="h-5 w-5 text-cyan-600" />
                       <span className="text-[11px] font-black uppercase text-foreground">Global Admissions Ltd.</span>
                    </div>
                 </div>
              </div>

              {/* Commission Tier */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Commission Threshold</h4>
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">Level 2 Path</span>
                          <span className="text-white">82%</span>
                       </div>
                       <Progress value={82} className="h-1.5" />
                       <p className="text-[9px] text-slate-500 uppercase font-bold text-center">8 more admissions to reach Level 3 (Premium Rates)</p>
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              {/* Action Tip */}
              <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                 <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 opacity-80" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">Agent Insight</h4>
                 </div>
                 <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                    "Referrals for 'Co-Living' formats are converting 25% faster this cycle. Target leads looking for long-term academic stays."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RefStat({ label, value, icon: Icon, color }: any) {
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

function PipelineRow({ name, property, status, date }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-cyan-600 transition-colors">{name}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">{property}</p>
          </div>
       </div>
       <div className="text-right">
          <Badge variant="outline" className={cn(
            "text-[8px] font-black uppercase py-0 border-cyan-200 bg-cyan-50 text-cyan-700",
            status === 'Admitted' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : ""
          )}>{status}</Badge>
          <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1">{date}</p>
       </div>
    </div>
  );
}
