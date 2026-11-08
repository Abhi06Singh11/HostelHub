'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredTickets, updateTicketStatus, logSAAction } from '@/lib/ticket-store';
import { Ticket } from '@/lib/types';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Building2, 
  User,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SASupportDeskPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTickets(getStoredTickets());
  }, []);

  const filtered = tickets.filter(t => 
    t.studentName.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.hostelName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Service Intelligence</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Platform-wide support orchestration. Oversee contractor-resident disputes and technical infrastructure issues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <SupportStat label="Unresolved Incidents" value={tickets.filter(t => t.status !== 'closed').length} icon={Zap} color="text-red-600" bg="bg-red-50" />
           <SupportStat label="Resolved (24h)" value="14" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <SupportStat label="Avg Response" value="1.8h" icon={Clock} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ticket ledger by user or issue..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> Filter Categories</Button>
          </div>

          <div className="divide-y">
            {filtered.map(t => (
              <div key={t.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-all border-l-4 border-l-transparent hover:border-l-primary cursor-pointer group">
                 <div className="flex gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-colors",
                      t.status === 'new' ? "bg-red-50 border-red-200 text-red-600" : "bg-primary/5 border-primary/20 text-primary"
                    )}>
                       <Activity className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-3">
                          <h4 className="text-[14px] font-black uppercase tracking-tight text-foreground">{t.studentName}</h4>
                          <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 bg-primary/5 text-primary tracking-widest">{t.category}</Badge>
                       </div>
                       <p className="text-sm font-medium text-muted-foreground leading-tight line-clamp-1 italic">"{t.description}"</p>
                       <div className="flex items-center gap-5 pt-1">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground/60 flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {t.hostelName}</span>
                          <span className="text-[10px] font-bold uppercase text-muted-foreground/60 flex items-center gap-1.5"><Clock className="h-3 w-3" /> {t.date}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                       <span className={cn(
                         "px-3 py-1 rounded-lg text-[9px] font-black uppercase border shadow-sm",
                         t.status === 'new' ? "bg-red-600 text-white border-red-700" :
                         t.status === 'in-progress' ? "bg-amber-500 text-white border-amber-600" :
                         "bg-muted text-muted-foreground border-border"
                       )}>
                         {t.status}
                       </span>
                       <p className="text-[9px] font-black text-muted-foreground mt-2 uppercase tracking-widest">ID: #{t.id}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                 </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center opacity-40">
                 <HelpCircle className="h-10 w-10 mx-auto mb-4" />
                 <p className="text-[11px] font-black uppercase tracking-widest">Incident Ledger Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SupportStat({ label, value, icon: Icon, color, bg }: any) {
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