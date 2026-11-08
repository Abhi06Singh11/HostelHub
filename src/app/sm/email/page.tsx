'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Mail, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Smartphone,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MarketerEmailPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 'e1', subject: 'Rent Cycle Reminder - June 2024', status: 'sent', recipients: 450, openRate: 82.4, type: 'Email' },
    { id: 'e2', subject: 'Special Referral Bonus for Students', status: 'scheduled', recipients: 1200, openRate: 0, type: 'WhatsApp' },
    { id: 'e3', subject: 'Welcome to StaySync!', status: 'automated', recipients: 84, openRate: 94.2, type: 'Email' },
  ]);

  const handleResend = (id: string) => {
    toast({ title: "Re-transmission Queued", description: "The message cycle has been restarted for failed nodes." });
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Email & Notifications</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate automated communication flows, template management, and open-rate analytics.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> New Broadcast
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <CommStat label="Open Velocity" value="84.2%" icon={Eye} color="text-primary" bg="bg-primary/5" />
           <CommStat label="Messages Dispatched" value="4.2k" icon={Send} color="text-blue-600" bg="bg-blue-50" />
           <CommStat label="Delivery Success" value="99.8%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Broadcast History</span>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Streams</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Message Subject / Type</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Reach (Open Rate)</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Logic Status</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {campaigns.map(c => (
                  <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center text-primary">
                          {c.type === 'Email' ? <Mail className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">{c.subject}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">{c.type} Campaign</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-sm font-black text-foreground">{c.recipients} Recipients</p>
                       <p className="text-[10px] text-emerald-600 font-bold uppercase">{c.openRate}% Open Rate</p>
                    </td>
                    <td className="py-4 px-6">
                       <Badge className={cn(
                         "text-[8px] font-black uppercase",
                         c.status === 'sent' ? "bg-emerald-600 text-white" : 
                         c.status === 'scheduled' ? "bg-primary text-white" :
                         "bg-blue-600 text-white"
                       )}>{c.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem onClick={() => handleResend(c.id)} className="text-xs font-bold uppercase py-2.5">Resend Broadcast</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Edit Template</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Archive Log</DropdownMenuItem>
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

function CommStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
