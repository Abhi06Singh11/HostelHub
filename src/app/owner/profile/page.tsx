
'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  User, 
  Building2, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Settings, 
  Lock, 
  Mail, 
  Smartphone, 
  MapPin, 
  Layers, 
  History, 
  CheckCircle2, 
  Briefcase,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function BuildingOwnerProfilePage() {
  const router = useRouter();

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Asset Owner Identity</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Certified property owner and estate management lead.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/owner/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Asset Config
             </Button>
             <Button variant="outline" onClick={() => router.push('/owner/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Secure Keys
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Owner Info Hub */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-100 border-4 border-indigo-50 flex items-center justify-center text-indigo-600 font-black text-5xl shadow-2xl shrink-0">
                       V
                    </div>
                    <div className="space-y-5 flex-1">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">Vikram Estates Pvt Ltd</h1>
                          <div className="flex items-center gap-3 mt-2">
                             <Badge className="bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">CERTIFIED OWNER</Badge>
                             <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: OWN-84920 • PORTFOLIO: L2</span>
                          </div>
                       </div>
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-indigo-500/20 pl-6 text-lg">
                          "Developing sustainable student living environments across Bengaluru. Focused on structural integrity, high rental yields, and premium resident experiences."
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Mail className="h-4.5 w-4.5 text-indigo-600" /> estates@vikram.in
                          </div>
                          <div className="flex items-center gap-3 text-[12px] font-bold text-foreground uppercase tracking-widest">
                             <Smartphone className="h-4.5 w-4.5 text-indigo-600" /> +91 98860 12345
                          </div>
                       </div>
                    </div>
                 </div>
                 <Building2 className="absolute -right-10 -bottom-10 h-64 w-64 text-indigo-600 opacity-5" />
              </div>

              {/* Portfolio Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <PortfolioStat label="Asset Volume" value="12" icon={Layers} color="text-indigo-600" />
                 <PortfolioStat label="Rental Yield" value="₹1.4Cr" icon={TrendingUp} color="text-emerald-600" />
                 <PortfolioStat label="Occupancy" value="94%" icon={Activity} color="text-blue-600" />
              </div>

              {/* Active Holdings */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-indigo-600" /> High-Performing Assets
                    </h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">View All Properties</Button>
                 </div>
                 <div className="divide-y">
                    <PropertyRow name="Green View Tower" units="40 Units" status="Rented" revenue="₹3.5L/mo" />
                    <PropertyRow name="Sterling Residency" units="20 Units" status="Available" revenue="₹1.8L/mo" />
                    <PropertyRow name="Tech Park Wing A" units="55 Units" status="Rented" revenue="₹4.2L/mo" />
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Compliance Hub */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Compliance Matrix</h4>
                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Trust Integrity</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-black text-white">9.8</p>
                          <Badge className="bg-emerald-600 text-white font-black text-[9px]">EXCELLENT</Badge>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '98%' }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailItem label="Building Permits" value="VERIFIED" icon={ShieldCheck} color="text-emerald-400" />
                       <DetailItem label="Tax Compliance" value="UP TO DATE" icon={CheckCircle2} color="text-emerald-400" />
                       <DetailItem label="Contractor Pulse" value="STABLE" icon={Briefcase} color="text-primary" />
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              {/* Quick Actions */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Estate Operations</h4>
                 <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                       <Wallet className="h-3.5 w-3.5 mr-3 text-indigo-600" /> Download Tax Ledger
                    </Button>
                    <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                       <History className="h-3.5 w-3.5 mr-3 text-indigo-600" /> Property Audit Trail
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PortfolioStat({ label, value, icon: Icon, color }: any) {
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

function PropertyRow({ name, units, status, revenue }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">
             {name.charAt(0)}
          </div>
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{name}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">{units}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-sm font-black text-foreground">{revenue}</p>
          <Badge variant="outline" className={cn(
            "text-[8px] font-black uppercase py-0 border-indigo-200 bg-indigo-50 text-indigo-700",
            status === 'Rented' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : ""
          )}>{status}</Badge>
       </div>
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
