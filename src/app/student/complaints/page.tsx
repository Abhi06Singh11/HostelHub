'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredTickets, addTicket } from '@/lib/ticket-store';
import { Ticket } from '@/lib/types';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  Filter,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function StudentComplaintsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newTicket, setNewTicket] = useState({
    category: '',
    description: ''
  });

  useEffect(() => {
    const load = () => setTickets(getStoredTickets());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleRaiseTicket = () => {
    if (!newTicket.category || !newTicket.description) {
      toast({ variant: "destructive", title: "Incomplete Request", description: "Category and description are required." });
      return;
    }

    addTicket({
      studentName: 'Amit Sharma',
      hostelId: 'proj1',
      hostelName: 'StaySync Tech Wing',
      roomNumber: '304',
      category: newTicket.category as any,
      description: newTicket.description,
    });

    setIsDialogOpen(false);
    setNewTicket({ category: '', description: '' });
    toast({ title: "Issue Logged", description: "Management has been notified via the global service desk." });
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
                         t.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Service & Complaints</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Synchronized support desk for maintenance requests and facility feedback.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Report Facility Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Open Support Ticket</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Functional Category *</Label>
                  <Select onValueChange={(val) => setNewTicket({...newTicket, category: val})}>
                    <SelectTrigger className="font-bold border-2 h-11">
                      <SelectValue placeholder="Select maintenance area" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Plumbing', 'Electricity', 'Wi-Fi', 'Cleaning', 'Food', 'Room Maintenance', 'Security', 'Other'].map(cat => (
                        <SelectItem key={cat} value={cat} className="font-bold">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Detail Description *</Label>
                  <Textarea 
                    placeholder="Provide specific details to help the contractor diagnose the issue..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    className="min-h-[120px] border-2 font-medium bg-background text-foreground"
                  />
                </div>
              </div>
              <DialogFooter className="gap-3">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold uppercase text-[11px] tracking-widest">Cancel</Button>
                <Button onClick={handleRaiseTicket} className="h-11 px-8 font-bold uppercase text-[11px] tracking-widest">Commit Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatusStat label="Open Inquiries" value={tickets.filter(t => t.status === 'new' || t.status === 'in-progress').length} icon={Clock} color="text-primary" bg="bg-primary/5" />
           <StatusStat label="Resolved Issues" value={tickets.filter(t => t.status === 'resolved').length} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <StatusStat label="Total Lifetime" value={tickets.length} icon={History} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {['all', 'new', 'in-progress', 'resolved', 'closed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap rounded-lg",
                    filter === f 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-card text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  {f.replace('-', ' ')}
                </button>
              ))}
            </div>
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Filter your tickets..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
          </div>

          <div className="divide-y">
            {filteredTickets.map(t => (
              <div 
                key={t.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-muted/20 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                onClick={() => router.push(`/student/complaints/${t.id}`)}
              >
                <div className="flex gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border",
                    t.status === 'new' ? "bg-primary/5 border-primary/20 text-primary" :
                    t.status === 'in-progress' ? "bg-amber-50 border-amber-200 text-amber-600" :
                    t.status === 'resolved' ? "bg-emerald-50 border-emerald-200 text-emerald-600" :
                    "bg-muted border-border text-muted-foreground"
                  )}>
                    {t.status === 'new' ? <AlertCircle className="h-7 w-7" /> : 
                     t.status === 'resolved' ? <CheckCircle2 className="h-7 w-7" /> :
                     <Clock className="h-7 w-7" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID: #{t.id}</span>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded border border-primary/20">
                        {t.category}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-bold text-foreground line-clamp-1 italic leading-tight">"{t.description}"</h4>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {t.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <div className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase border shadow-sm",
                    t.status === 'new' ? "bg-primary text-white border-primary" :
                    t.status === 'in-progress' ? "bg-amber-500 text-white border-amber-500" :
                    t.status === 'resolved' ? "bg-emerald-600 text-white border-emerald-600" :
                    "bg-muted text-muted-foreground border-border"
                  )}>
                    {t.status.replace('-', ' ')}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary transition-all" />
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="p-24 text-center bg-muted/5">
                <MessageSquare className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Desk Empty</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-2 opacity-60">You have no active maintenance tickets matching the filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-bold tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
