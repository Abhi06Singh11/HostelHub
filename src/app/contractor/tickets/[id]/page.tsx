'use client';
import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStoredTickets, addMessageToTicket, updateTicketStatus } from '@/lib/ticket-store';
import { Ticket } from '@/lib/types';
import { 
  ArrowLeft, 
  Send, 
  User, 
  Building2, 
  AlertCircle,
  MoreVertical,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTicket = () => {
      const tickets = getStoredTickets();
      const found = tickets.find(t => t.id === id);
      if (found) setTicket(found);
    };
    loadTicket();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket?.messages]);

  const handleSendReply = () => {
    if (!reply.trim() || !ticket) return;

    addMessageToTicket(ticket.id, {
      senderRole: 'contractor',
      text: reply.trim()
    });

    setReply('');
    const tickets = getStoredTickets();
    const found = tickets.find(t => t.id === id);
    if (found) setTicket(found);
    
    toast({ title: "Reply Sent", description: "Your response has been dispatched to the resident." });
  };

  const handleStatusChange = (newStatus: Ticket['status']) => {
    if (!ticket) return;
    updateTicketStatus(ticket.id, newStatus);
    const tickets = getStoredTickets();
    const found = tickets.find(t => t.id === id);
    if (found) setTicket(found);
    
    toast({ title: "Status Updated", description: `Ticket state changed to ${newStatus.replace('-', ' ')}.` });
  };

  if (!ticket) return null;

  return (
    <DashboardLayout role="contractor">
      <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between shrink-0 bg-white p-4 border rounded-lg">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={() => router.push('/contractor/tickets')} className="hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight uppercase">Ticket #{ticket.id.substring(ticket.id.length - 4)}</h2>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 border bg-primary/5 text-primary tracking-widest rounded-md">{ticket.category}</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                  <User className="h-3 w-3" /> {ticket.studentName} (Room {ticket.roomNumber})
                </span>
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" /> {ticket.hostelName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              "px-3 py-1 rounded-md text-[11px] font-bold uppercase border transition-all",
              ticket.status === 'new' ? "bg-blue-600 text-white border-blue-600" :
              ticket.status === 'in-progress' ? "bg-amber-500 text-white border-amber-500" :
              "bg-slate-100 text-slate-600 border-slate-200"
            )}>
              {ticket.status.replace('-', ' ')}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange('in-progress')} className="font-bold text-xs uppercase py-2">Set In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('resolved')} className="font-bold text-xs uppercase py-2">Mark Resolved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('closed')} className="font-bold text-xs uppercase py-2 text-red-600">Close Ticket</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          <div className="lg:col-span-3 enterprise-card flex flex-col min-h-0 bg-white">
            <div className="p-5 border-b bg-slate-50 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Initial Request Description</span>
              </div>
              <div className="bg-white p-4 border border-dashed rounded-lg">
                 <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
                  "{ticket.description}"
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/20">
              {ticket.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.senderRole === 'contractor' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 text-sm font-medium border shadow-sm",
                    msg.senderRole === 'contractor' 
                      ? "bg-primary text-white border-primary rounded-l-xl rounded-tr-xl" 
                      : "bg-white text-slate-900 border-slate-200 rounded-r-xl rounded-tl-xl"
                  )}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {msg.senderRole === 'contractor' ? 'Management' : ticket.studentName}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300">•</span>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t bg-white shrink-0">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Textarea 
                    placeholder="Type your reply to the student..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="min-h-[100px] text-sm font-medium border-slate-200 focus-visible:ring-primary rounded-lg shadow-inner"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) handleSendReply();
                    }}
                  />
                </div>
                <Button 
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="h-12 px-8 font-bold uppercase text-[12px] shrink-0 tracking-widest"
                >
                  <Send className="h-4 w-4 mr-2" /> SEND REPLY
                </Button>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ctrl + Enter to send</p>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                   <span className="text-[9px] font-bold text-slate-400 uppercase">Secure Channel</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block space-y-6 overflow-y-auto">
            <div className="enterprise-card bg-white">
              <div className="p-4 border-b bg-slate-50">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Resident Intelligence</span>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg border flex items-center justify-center text-slate-400 font-bold text-xl">
                    {ticket.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{ticket.studentName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #ST-482</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Accommodation</p>
                    <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600 uppercase">
                      <Building2 className="h-3.5 w-3.5 text-slate-300" /> {ticket.hostelName}
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600 uppercase">
                      <Clock className="h-3.5 w-3.5 text-slate-300" /> Room {ticket.roomNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="enterprise-card bg-slate-900 text-white p-6">
              <h4 className="text-[11px] font-bold uppercase text-slate-400 tracking-widest mb-6">Process Audit</h4>
              <div className="space-y-5 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
                <AuditStep active={true} label="Request Received" date={ticket.date} />
                <AuditStep active={ticket.status !== 'new'} label="Acknowledged" date={ticket.messages.find(m => m.senderRole === 'contractor')?.timestamp} />
                <AuditStep active={ticket.status === 'resolved' || ticket.status === 'closed'} label="Resolved" />
                <AuditStep active={ticket.status === 'closed'} label="Archived" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AuditStep({ active, label, date }: { active: boolean, label: string, date?: string }) {
  return (
    <div className="flex items-start gap-4 relative z-10">
      <div className={cn("w-3.5 h-3.5 rounded-full border-2 mt-0.5", active ? "bg-primary border-primary" : "bg-slate-900 border-white/20")} />
      <div>
        <p className={cn("text-[11px] font-bold uppercase leading-none", active ? "text-white" : "text-white/30")}>{label}</p>
        {date && <p className="text-[9px] font-semibold text-slate-500 mt-1 uppercase">{date}</p>}
      </div>
    </div>
  );
}
