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
  Calendar
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

export default function StudentTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
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
      toast({ variant: "destructive", title: "Missing Info", description: "Please select a category and describe the issue." });
      return;
    }

    addTicket({
      studentName: 'Amit Sharma', // Mock current student
      hostelId: 'proj1',
      hostelName: 'StaySync Tech Wing',
      roomNumber: '304',
      category: newTicket.category as any,
      description: newTicket.description,
    });

    setIsDialogOpen(false);
    setNewTicket({ category: '', description: '' });
    toast({ title: "Ticket Raised", description: "Contractor has been notified of your request." });
  };

  const filteredTickets = tickets.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Service Desk</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Raise maintenance requests and track resolution progress for your room.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Raise New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Report an Issue</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Issue Category *</Label>
                  <Select onValueChange={(val) => setNewTicket({...newTicket, category: val})}>
                    <SelectTrigger className="font-bold border-2 h-11 bg-background text-foreground">
                      <SelectValue placeholder="What needs fixing?" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Plumbing', 'Electricity', 'Wi-Fi', 'Cleaning', 'Food', 'Room Maintenance', 'Security', 'Other'].map(cat => (
                        <SelectItem key={cat} value={cat} className="font-bold">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Describe the Problem *</Label>
                  <Textarea 
                    placeholder="Provide details about the issue (e.g. room number, exact location, symptoms)..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    className="min-h-[120px] border-2 font-medium bg-background text-foreground"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold uppercase text-[11px] tracking-widest">Cancel</Button>
                <Button onClick={handleRaiseTicket} className="h-11 px-8 font-bold uppercase text-[11px] tracking-widest">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search your tickets..." 
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
                onClick={() => router.push(`/student/tickets/${t.id}`)}
              >
                <div className="flex gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                    t.status === 'new' ? "bg-primary/5 border-primary/20 text-primary" :
                    t.status === 'in-progress' ? "bg-amber-50 border-amber-200 text-amber-600" :
                    t.status === 'resolved' ? "bg-emerald-50 border-emerald-200 text-emerald-600" :
                    "bg-muted border-border text-muted-foreground"
                  )}>
                    {t.status === 'new' ? <AlertCircle className="h-6 w-6" /> : 
                     t.status === 'resolved' ? <CheckCircle2 className="h-6 w-6" /> :
                     <Clock className="h-6 w-6" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">#{t.id}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground line-clamp-1 italic">"{t.description}"</p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-[11px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {t.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <div className={cn(
                    "px-4 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm",
                    t.status === 'new' ? "bg-primary text-white border-primary" :
                    t.status === 'in-progress' ? "bg-amber-500 text-white border-amber-500" :
                    t.status === 'resolved' ? "bg-emerald-600 text-white border-emerald-600" :
                    "bg-muted text-muted-foreground border-border"
                  )}>
                    {t.status.replace('-', ' ')}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-all" />
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="p-20 text-center bg-muted/5">
                <MessageSquare className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">No active tickets</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">If you have a problem, raise a ticket to notify management.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
