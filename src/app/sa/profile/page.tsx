
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { 
  User, 
  ShieldCheck, 
  Activity, 
  History, 
  Mail, 
  Smartphone, 
  Globe, 
  Settings,
  Lock,
  CheckCircle2,
  Zap,
  Users,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function SuperAdminProfilePage() {
  const router = useRouter();

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">My Administrative Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Root level access node with global platform governance clearance.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/sa/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Edit Profile
             </Button>
             <Button variant="outline" onClick={() => router.push('/sa/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Change Password
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Identity Hub */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-black text-6xl shadow-2xl shrink-0">
                       {mockUser.avatar}
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">{mockUser.name}</h1>
                          <div className="flex items-center gap-3 mt-2">
                             <Badge className="bg-primary text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">GLOBAL SUPERADMIN</Badge>
                             <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">CLEARANCE: L1 ROOT</span>
                          </div>
                       </div>
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6 text-lg">
                          "Orchestrating the global HostelHub ecosystem. Leading platform evolution, financial integrity, and system-wide security policies."
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Mail className="h-4.5 w-4.5 text-primary" /> {mockUser.email}
                          </div>
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Smartphone className="h-4.5 w-4.5 text-primary" /> +91 99XXX XXXXX
                          </div>
                       </div>
                    </div>
                 </div>
                 <Globe className="absolute -right-10 -bottom-10 h-64 w-64 text-primary opacity-5 animate-spin-slow" />
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <ProfileStat label="Users Managed" value="1.4k" icon={Users} color="text-primary" bg="bg-primary/5" />
                 <ProfileStat label="System Uptime" value="99.9%" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
                 <ProfileStat label="Revenue Factor" value="4.2x" icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
              </div>

              {/* Administrative Logic */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                       <History className="h-4 w-4 text-primary" /> Immutable Action Log
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">View Audit Hub</Button>
                 </div>
                 <div className="divide-y">
                    <ActionRow action="Updated Global Verification Policy" target="Security Core" time="2h ago" />
                    <ActionRow action="Authorized Payout Cycle" target="Finance Mesh" time="5h ago" />
                    <ActionRow action="Decommissioned User Cluster" target="Node-482" time="1d ago" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">System Auth Pulse</h4>
                 <div className="space-y-8">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Root Integrity</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-black text-white">100%</p>
                          <Badge className="bg-emerald-600 text-white font-black text-[9px]">SECURE</Badge>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '100%' }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailItem label="2FA Authentication" value="ACTIVE" icon={ShieldCheck} color="text-emerald-400" />
                       <DetailItem label="Last Login IP" value="45.112.x.x" icon={Activity} color="text-primary" />
                       <DetailItem label="Administrative ID" value="NODE-SA-001" icon={User} color="text-primary" />
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Governed Responsibilities</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Global Users', 'Platform Finance', 'Infrastructure', 'Technical Teams', 'Growth Ops', 'Security Core'].map(r => (
                      <span key={r} className="px-3 py-1.5 rounded-lg bg-muted text-[10px] font-black uppercase border border-border shadow-sm">{r}</span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProfileStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
        <p className={cn("text-2xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <Icon className={cn("h-5 w-5", color)} />
    </div>
  );
}

function ActionRow({ action, target, time }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors">
       <div className="flex items-center gap-4">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight">{action}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">Target: {target} • {time}</p>
          </div>
       </div>
       <CheckCircle2 className="h-4 w-4 text-emerald-600 opacity-20" />
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-slate-500 flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
       <span className={cn("font-black", color)}>{value}</span>
    </div>
  );
}

function TrendingUp({ className }: any) {
  return <Activity className={className} />;
}
