'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSMAcquisitions } from '@/lib/sm-store';
import { MarketingAcquisition } from '@/lib/types';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Users, 
  Zap, 
  PieChart,
  Activity,
  CheckCircle2,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function MarketerAcquisitionPage() {
  const [data, setData] = useState<MarketingAcquisition[]>([]);

  useEffect(() => {
    setData(getSMAcquisitions());
  }, []);

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Client Acquisition</h2>
          <p className="text-[15px] text-muted-foreground font-medium">High-altitude surveillance of platform onboarding velocity and multi-channel acquisition efficiency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AcqStat label="Total Onboarded" value="184" icon={Users} color="text-primary" bg="bg-primary/5" />
           <AcqStat label="CPA Velocity" value="-8.4%" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
           <AcqStat label="Funnel Depth" value="L4" icon={Activity} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Monthly Acquisition Ledger</span>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">June 2024 Cycle</Button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Acquisition Stream</th>
                      <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Node Count</th>
                      <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Efficiency (CPA)</th>
                      <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {data.map(item => (
                     <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                        <td className="py-5 px-6">
                           <p className="text-sm font-black text-foreground uppercase">{item.source}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">{item.month} Cycle</p>
                        </td>
                        <td className="py-5 px-6">
                           <p className="text-base font-black text-foreground">{item.count}</p>
                        </td>
                        <td className="py-5 px-6">
                           <p className={cn("text-sm font-black", item.cpa < 300 ? "text-emerald-600" : "text-primary")}>₹{item.cpa} / Node</p>
                        </td>
                        <td className="py-5 px-6 text-right">
                           <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 bg-primary/5 text-primary">Synchronized</Badge>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AcqStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
