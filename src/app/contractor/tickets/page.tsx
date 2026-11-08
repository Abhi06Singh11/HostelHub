'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredTickets } from '@/lib/ticket-store';
import { Ticket } from '@/lib/types';
import { 
  MessageSquare, 
  Search, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2,
  Activity,
  Building2,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TicketListingPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'resolved' | 'closed'>('all');

  useEffect(() => {
    setTickets(getStoredTickets());
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.studentName.toLowerCase().includes(search.toLowerCase()) || 
                         t.hostelName.toLowerCase().includes(search.toLowerCase()) ||
                         t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    new: tickets.filter(t => t.status === 'new').length,
    active: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
  };

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight uppercase text-foreground">Support Desk</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Resolve maintenance requests and student complaints across all buildings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatMiniCard label="Pending Action" value={stats.new} color="text-primary" bg="bg-primary/5" />
          <StatMiniCard label="Active Repair" value={stats.active} color="text-amber-600" bg="bg-amber-50" />
          <StatMiniCard label="Resolved" value={stats.resolved} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="enterprise-card border bg-card shadow-none overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {['all', 'new', 'in-progress', 'resolved', 'closed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-5 py-2 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap rounded-lg shadow-sm",
                    filter === f 
                      ? "bg-primary text-white border-primary ring-2 ring-primary/20 scale-105" 
                      : "bg-card text-muted-foreground hover:border-primary/50 border-border hover:bg-muted/50"
                  )}
                >
                  {f.replace('-', ' ')}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by student, hostel or issue..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="divide-y border-t border-border">
            {filteredTickets.map(ticket => (
              <div 
                key={ticket.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/20 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                onClick={() => router.push(`/contractor/tickets/${ticket.id}`)}
              >
                <div className="flex gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                    ticket.status === 'new' ? "bg-primary/5 border-primary/20 text-primary" :
                    ticket.status === 'in-progress' ? "bg-amber-50 border-amber-200 text-amber-600" :
                    "bg-muted border-border text-muted-foreground"
                  )}>
                    {ticket.status === 'new' ? <AlertCircle className="h-7 w-7" /> : 
                     ticket.status === 'resolved' ? <CheckCircle2 className="h-7 w-7" /> :
                     <Activity className="h-7 w-7" />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-bold text-foreground leading-none">{ticket.studentName}</h3>
                      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.15em] bg-muted/50 px-3 py-1 rounded-md border border-border">
                        {ticket.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-1 max-w-2xl italic">"{ticket.description}"</p>
                    <div className="flex items-center gap-5 pt-1">
                      <span className="text-[11px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> {ticket.hostelName} (Room {ticket.roomNumber})
                      </span>
                      <span className="text-[11px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {ticket.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-5 md:mt-0">
                  <div className="text-right hidden md:block">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-4 py-1.5 rounded-lg border shadow-sm",
                      ticket.status === 'new' ? "bg-primary text-white border-primary" :
                      ticket.status === 'in-progress' ? "bg-amber-500 text-white border-amber-500" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-2 flex items-center justify-end gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> {ticket.messages.length} Replies
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="p-24 text-center bg-muted/5">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-5 border border-dashed border-border">
                  <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <h3 className="text-base font-bold text-foreground uppercase tracking-widest">Desk Empty</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-2 opacity-60">No maintenance tickets matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatMiniCard({ label, value, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center bg-card hover:shadow-md transition-all group", bg)}>
      <div>
        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.15em] mb-2">{label}</p>
        <p className={cn("text-4xl font-bold tracking-tighter", color)}>{value}</p>
      </div>
      <div className={cn("p-4 rounded-xl border border-border/10 bg-background/50 group-hover:scale-105 transition-transform", color)}>
        <MessageSquare className="h-7 w-7" />
      </div>
    </div>
  );
}