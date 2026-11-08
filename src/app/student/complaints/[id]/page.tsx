'use client';
import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStoredTickets, addMessageToTicket, updateTicketStatus } from '@/lib/ticket-store';
import { Ticket } from '@/lib/types';
import { 
  ArrowLeft, 
  Send, 
  Building2, 
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function StudentComplaintDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      const tickets = getStoredTickets();
      const found = tickets.find(t => t.id === id);
      if (found) setTicket(found);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket?.messages]);

  const handleSendReply = () => {
    if (!reply.trim() || !ticket) return;

    addMessageToTicket(ticket.id, {
      senderRole: 'student',
      text: reply.trim()
    });

    setReply('');
    toast({ title: "Reply Dispatched", description: "The hostel contractor has been notified of your message." });
  };

  const handleCloseTicket = () => {
    if (!ticket) return;
    updateTicketStatus(ticket.id, 'closed');
    toast({ title: "Ticket Archived", description: "This maintenance request has been marked as completed." });
  };

  if (!ticket) return null;

  return (
    <DashboardLayout role="student">
      <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between shrink-0 bg-card p-4 border rounded-xl shadow-sm">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={() => router.push('/student/complaints')} className="hover:bg-muted rounded-lg">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight uppercase text-foreground">Ticket #{ticket.id}</h2>
                <Badge variant="outline" className="text-[10px] font-bold uppercase border bg-primary/5 text-primary tracking-widest">{ticket.category}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" /> {ticket.hostelName} (Room {ticket.roomNumber})
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-bold uppercase border",
              ticket.status === 'new' ? "bg-primary text-white border-primary" :
              ticket.status === 'in-progress' ? "bg-amber-500 text-white border-amber-500" :
              ticket.status === 'resolved' ? "bg-emerald-600 text-white border-emerald-600" :
              "bg-muted text-muted-foreground border-border"
            )}>
              {ticket.status.replace('-', ' ')}
            </div>
            {ticket.status === 'resolved' && (
              <Button onClick={handleCloseTicket} className="h-9 px-6 text-[10px] font-bold uppercase bg-emerald-600 hover:bg-emerald-700 shadow-md">
                Confirm & Close
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          <div className="lg:col-span-3 enterprise-card flex flex-col min-h-0 bg-card">
            <div className="p-5 border-b bg-muted/10 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Original Problem Statement</span>
              </div>
              <div className="bg-muted/20 p-4 border-2 border-dashed rounded-xl">
                 <p className="text-sm font-medium text-foreground italic leading-relaxed">
                  "{ticket.description}"
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-muted/5">
              {ticket.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.senderRole === 'student' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 text-sm font-bold border shadow-sm",
                    msg.senderRole === 'student' 
                      ? "bg-primary text-white border-primary rounded-l-2xl rounded-tr-2xl" 
                      : "bg-background text-foreground border-border rounded-r-2xl rounded-tl-2xl"
                  )}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      {msg.senderRole === 'student' ? 'Resident (You)' : 'Hostel Management'}
                    </span>
                    <span className="text-[9px] font-bold text-border">•</span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {ticket.status !== 'closed' && (
              <div className="p-5 border-t bg-card shrink-0">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Enter your message for the facility manager..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="min-h-[100px] text-sm font-bold border-2 focus-visible:ring-primary rounded-xl shadow-inner bg-background text-foreground"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) handleSendReply();
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleSendReply}
                    disabled={!reply.trim()}
                    className="h-12 px-8 font-bold uppercase text-[11px] shrink-0 tracking-widest rounded-xl shadow-lg"
                  >
                    <Send className="h-4 w-4 mr-2" /> DISPATCH
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block space-y-6">
            <div className="enterprise-card bg-card p-6 space-y-8">
              <h4 className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Operational Sync</h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-bold uppercase text-muted-foreground/60 tracking-widest">Ownership</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted/20 border-2 border-dashed rounded-xl">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">H</div>
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-tight">StaySync Operations</p>
                  </div>
                </div>
                <Separator className="border-dashed" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Reported On</span>
                    <span className="text-foreground">{ticket.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Last Update</span>
                    <span className="text-foreground">{ticket.messages[ticket.messages.length - 1]?.timestamp.split(' ')[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="enterprise-card bg-primary text-primary-foreground p-6 space-y-4">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="h-4 w-4 opacity-80" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest">SLA Guarantee</h4>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed font-medium">
                Facility issues are triaged within 2 hours. Our mobile maintenance team aims for same-day resolution for critical plumbing and electrical issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
