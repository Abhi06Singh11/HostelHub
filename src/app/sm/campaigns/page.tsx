'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Megaphone, 
  Plus, 
  Search, 
  TrendingUp, 
  Users, 
  BarChart, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Calendar,
  MoreVertical,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SuperMarketerCampaignsPage() {
  const campaigns = [
    { id: 'c1', name: 'Bengaluru Student Drive', channel: 'Meta Ads', budget: 50000, leads: 1240, conv: 4.2, status: 'active', end: '2024-06-30' },
    { id: 'c2', name: 'Pune PG Launch', channel: 'Google Search', budget: 25000, leads: 850, conv: 3.8, status: 'active', end: '2024-07-15' },
    { id: 'c3', name: 'Referral Bonus July', channel: 'Direct/Agent', budget: 10000, leads: 120, conv: 12.5, status: 'scheduled', end: '2024-07-31' },
  ];

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Campaign Hub</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate cross-channel marketing drives, manage promotional budgets, and track lead quality.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Launch Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <CampaignStat label="Live Campaigns" value="4" icon={Megaphone} color="text-primary" bg="bg-primary/5" />
           <CampaignStat label="Ad Conversion" value="4.8%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50" />
           <CampaignStat label="Gross Spend" value="₹85k" icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
           <CampaignStat label="Leads Generated" value="2.2k" icon={Users} color="text-orange-600" bg="bg-orange-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
                   <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Active Marketing Streams</span>
                   <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Channels</Button>
                </div>
                <div className="divide-y">
                   {campaigns.map(c => (
                     <div key={c.id} className="p-6 hover:bg-muted/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                        <div className="flex gap-6 items-start">
                           <div className="w-12 h-12 rounded-xl flex items-center justify-center border bg-card shadow-sm group-hover:border-primary transition-colors">
                              <BarChart className="h-6 w-6 text-primary" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-base font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{c.name}</h4>
                              <div className="flex items-center gap-4">
                                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Megaphone className="h-3 w-3" /> {c.channel}</span>
                                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Ends: {c.end}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-xs font-black text-foreground">₹{c.budget.toLocaleString()}</p>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Budget Allocation</p>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-black text-emerald-600">{c.leads} Leads</p>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{c.conv}% Conversion</p>
                           </div>
                           <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">Channel Efficiency</h4>
                    <div className="space-y-6">
                       <ChannelRow label="Meta Ads" value={82} color="bg-primary" />
                       <ChannelRow label="Google Ads" value={65} color="bg-blue-500" />
                       <ChannelRow label="Direct Agent" value={94} color="bg-emerald-500" />
                       <ChannelRow label="Email Marketing" value={12} color="bg-amber-500" />
                    </div>
                 </div>
                 <ArrowUpRight className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
              </div>

              <div className="enterprise-card border bg-card p-8 space-y-4">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Marketing Tip</h4>
                 <p className="text-sm font-medium leading-relaxed italic border-l-2 border-primary pl-4">
                   "Conversion rates for 'PG/Hostel' searches are 20% higher on mobile devices after 7:00 PM IST."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CampaignStat({ label, value, icon: Icon, color, bg }: any) {
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

function ChannelRow({ label, value, color }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className="text-slate-400">{label}</span>
          <span className="text-white">{value}%</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={cn("h-full", color)} style={{ width: `${value}%` }} />
       </div>
    </div>
  );
}
