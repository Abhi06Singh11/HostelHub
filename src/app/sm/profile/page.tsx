
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsers } from '@/lib/sa-store';
import { 
  User, 
  Megaphone, 
  Target, 
  TrendingUp, 
  Zap, 
  Activity, 
  BarChart, 
  PieChart, 
  Settings,
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  Users,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function MarketerProfilePage() {
  const router = useRouter();
  // Get Mike's profile as mock current marketer
  const marketer = getSAUsers().find(u => u.id === 'u3')!;

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Growth Strategist Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Head of digital acquisition and platform scaling operations.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/sm/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Growth Tools
             </Button>
             <Button variant="outline" onClick={() => router.push('/sm/settings?tab=maintenance')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Security Node
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Marketer Info Hub */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-orange-100 border-4 border-orange-50 flex items-center justify-center text-orange-600 font-black text-5xl shadow-2xl shrink-0">
                       {marketer.name.charAt(0)}
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">{marketer.name}</h1>
                          <div className="flex items-center gap-3 mt-2">
                             <Badge className="bg-orange-600 text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">SUPER MARKETER</Badge>
                             <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">DEPT: ACQUISITION</span>
                          </div>
                       </div>
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-orange-500/20 pl-6 text-lg">
                          "{marketer.bio || 'Driving high-velocity growth for the global StaySync ecosystem. Specialist in multi-channel performance marketing and conversion funnel optimization.'}"
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Mail className="h-4.5 w-4.5 text-orange-600" /> {marketer.email}
                          </div>
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Smartphone className="h-4.5 w-4.5 text-orange-600" /> +91 97XXX XXXXX
                          </div>
                       </div>
                    </div>
                 </div>
                 <PieChart className="absolute -right-10 -bottom-10 h-64 w-64 text-orange-600 opacity-5" />
              </div>

              {/* Growth Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <GrowthStat label="Leads Generated" value="4.2k" icon={Target} color="text-orange-600" />
                 <GrowthStat label="ROI Factor" value="4.8x" icon={TrendingUp} color="text-emerald-600" />
                 <GrowthStat label="Market Reach" value="1.4M" icon={Activity} color="text-blue-600" />
              </div>

              {/* Campaign Control */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                       <Megaphone className="h-4 w-4 text-orange-600" /> Active Marketing Drives
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">Launch New</Button>
                 </div>
                 <div className="divide-y">
                    <CampaignRow name="Bengaluru Student Blitz" channel="Meta Ads" leads="1,240" roi="5.2x" />
                    <CampaignRow name="Pune PG Launch" channel="Google Search" leads="850" roi="3.8x" />
                    <CampaignRow name="Referral Bonus July" channel="Affiliates" leads="412" roi="8.4x" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Specialized Skills */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Execution Stack</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Meta Ads', 'Google Ads', 'Funnel Analytics', 'Copywriting', 'SEO/SEM', 'Brand Growth', 'CPA Optimization'].map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase border border-orange-100 shadow-sm">{s}</span>
                    ))}
                 </div>
              </div>

              {/* Channel Efficiency */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Channel Health Sync</h4>
                 <div className="space-y-6">
                    <ChannelEfficiency label="Meta Network" value={82} />
                    <ChannelEfficiency label="Google Ecosystem" value={65} />
                    <ChannelEfficiency label="Affiliate Mesh" value={94} />
                 </div>
                 <BarChart className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              {/* Strategic Tip */}
              <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                 <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 opacity-80" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest">Growth Pulse</h4>
                 </div>
                 <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                    "Conversion rates for 'Double Sharing' units are trending 14% higher in South Bengaluru. Recommend budget reallocation to Meta Ad Set #4."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function GrowthStat({ label, value, icon: Icon, color }: any) {
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

function CampaignRow({ name, channel, leads, roi }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-black text-xs">
             {name.charAt(0)}
          </div>
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-orange-600 transition-colors">{name}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">{channel}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-sm font-black text-foreground">{leads}</p>
          <Badge className="bg-emerald-600 text-white text-[8px] font-black py-0">{roi} ROI</Badge>
       </div>
    </div>
  );
}

function ChannelEfficiency({ label, value }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className="text-slate-400">{label}</span>
          <span className="text-white">{value}% Strength</span>
       </div>
       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
       </div>
    </div>
  );
}
