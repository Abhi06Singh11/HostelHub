'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Activity, 
  TrendingUp, 
  Zap, 
  Play, 
  Pause, 
  Trash2,
  BarChart3,
  MousePointer2,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MarketerAdsPage() {
  const [ads, setAds] = useState([
    { id: 'ad1', name: 'Summer Intake 2024', platform: 'Meta', status: 'active', spend: 12500, clicks: 3200, ctr: 4.2, impressions: 85000 },
    { id: 'ad2', name: 'PG Search Keywords', platform: 'Google', status: 'active', spend: 8400, clicks: 1100, ctr: 2.8, impressions: 42000 },
    { id: 'ad3', name: 'Re-targeting BHU Students', platform: 'Instagram', status: 'paused', spend: 2200, clicks: 450, ctr: 5.1, impressions: 12000 },
  ]);

  const toggleStatus = (id: string) => {
    setAds(ads.map(ad => {
      if (ad.id === id) {
        const newStatus = ad.status === 'active' ? 'paused' : 'active';
        toast({ title: "Ad Status Updated", description: `Campaign is now ${newStatus}.` });
        return { ...ad, status: newStatus };
      }
      return ad;
    }));
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Advertisement Terminal</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage cross-platform ad creatives, monitor CPC/CTR, and optimize spend.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Create Ad Set
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <AdStat label="Avg CTR" value="3.4%" icon={MousePointer2} color="text-primary" bg="bg-primary/5" />
           <AdStat label="Total Spend" value="₹23.1k" icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" />
           <AdStat label="Conversions" value="112" icon={Zap} color="text-blue-600" bg="bg-blue-50" />
           <AdStat label="RoAS" value="4.2x" icon={TrendingUp} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search ad campaigns..." className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium" />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase"><Filter className="h-3.5 w-3.5 mr-2" /> All Platforms</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Ad Identity / Platform</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Performance (CTR)</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Spend History</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ads.map(ad => (
                  <tr key={ad.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground uppercase">{ad.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">{ad.platform} Network</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-black text-foreground">{ad.ctr}% CTR</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{ad.clicks.toLocaleString()} Clicks • {ad.impressions.toLocaleString()} Imp.</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-black text-foreground">₹{ad.spend.toLocaleString()}</p>
                      <Badge variant="outline" className={cn(
                        "text-[8px] font-black uppercase mt-1",
                        ad.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground"
                      )}>{ad.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem onClick={() => toggleStatus(ad.id)} className="text-xs font-bold uppercase py-2.5">
                               {ad.status === 'active' ? <Pause className="mr-2 h-3.5 w-3.5" /> : <Play className="mr-2 h-3.5 w-3.5" />}
                               {ad.status === 'active' ? 'Pause Ad' : 'Resume Ad'}
                             </DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Adjust Budget</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Delete Ad Set</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
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

function AdStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
