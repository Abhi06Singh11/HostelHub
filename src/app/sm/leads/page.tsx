'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Target, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  UserCheck, 
  Phone, 
  Mail, 
  Clock, 
  Activity, 
  ShieldCheck,
  TrendingUp,
  Download,
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getSMLeads, updateLeadStatus } from '@/lib/sm-store';
import { MarketingLead } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SuperMarketerLeadsPage() {
  const [leads, setLeads] = useState<MarketingLead[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLeads(getSMLeads());
  }, []);

  const handleStatus = (id: string, status: MarketingLead['status']) => {
    updateLeadStatus(id, status);
    setLeads(getSMLeads());
    toast({ title: "Lead Synchronized", description: `Status updated to ${status} across the funnel.` });
  };

  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.source.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Lead Pipeline</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Surveillance of prospective resident capture, source attribution, and conversion velocity.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                <Download className="h-4 w-4 mr-2" /> Export CSV
             </Button>
             <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Register Lead
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <LeadStat label="Total Captured" value={leads.length} icon={Target} color="text-primary" bg="bg-primary/5" />
           <LeadStat label="Success Rate" value="14.2%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <LeadStat label="Pending Sync" value={leads.filter(l => l.status === 'new').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
           <LeadStat label="ROI Factor" value="4.8x" icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads by name or channel..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
               {['all', 'new', 'contacted', 'interested', 'converted', 'lost'].map(f => (
                 <button key={f} className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-card hover:bg-muted transition-all whitespace-nowrap">{f}</button>
               ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Lead Identity / Source</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Quality Score</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Last Activity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs uppercase shadow-sm group-hover:scale-105 transition-transform">
                             {lead.name.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{lead.name}</p>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase">{lead.source} • {lead.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-foreground">{lead.score}%</span>
                          <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                             <div className={cn("h-full", lead.score > 80 ? "bg-emerald-500" : lead.score > 50 ? "bg-primary" : "bg-amber-500")} style={{ width: `${lead.score}%` }} />
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] font-black text-foreground uppercase flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> Follow-up: {lead.followUpDate}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                         <Badge variant="outline" className={cn(
                           "text-[8px] font-black uppercase py-0 border-primary/30",
                           lead.status === 'converted' ? "bg-emerald-600 text-white" : 
                           lead.status === 'lost' ? "bg-red-600 text-white" :
                           "bg-muted text-muted-foreground"
                         )}>{lead.status}</Badge>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                               <DropdownMenuItem onClick={() => handleStatus(lead.id, 'contacted')} className="text-xs font-bold uppercase py-2.5">Mark Contacted</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatus(lead.id, 'interested')} className="text-xs font-bold uppercase py-2.5">Confirm Interest</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatus(lead.id, 'converted')} className="text-xs font-bold uppercase py-2.5 text-emerald-600">Mark Converted</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatus(lead.id, 'lost')} className="text-xs font-bold uppercase py-2.5 text-red-600">Close Lead</DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                       </div>
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

function LeadStat({ label, value, icon: Icon, color, bg }: any) {
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
