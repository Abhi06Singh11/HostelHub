'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getOwnerInquiries, updateOwnerInquiry } from '@/lib/owner-store';
import { LeaseInquiry } from '@/lib/types';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function OwnerInquiriesPage() {
  const [inquiries, setInquiries] = useState<LeaseInquiry[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = () => setInquiries(getOwnerInquiries());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleStatus = (id: string, status: LeaseInquiry['status']) => {
    updateOwnerInquiry(id, status);
    toast({ title: "Inquiry Updated", description: `Contractor proposal has been marked as ${status}.` });
  };

  const filtered = inquiries.filter(i => 
    i.contractorName.toLowerCase().includes(search.toLowerCase()) || 
    i.propertyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Lease Proposals</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Manage inquiries from hostel contractors interested in renting your building assets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <InquiryStat label="New Proposals" value={inquiries.filter(i => i.status === 'new').length} icon={MessageSquare} color="text-primary" bg="bg-primary/5" />
           <InquiryStat label="Under Negotiation" value={inquiries.filter(i => i.status === 'negotiation').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
           <InquiryStat label="Total Pipeline" value={inquiries.length} icon={TrendingUp} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search proposals by contractor or building..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase"><Filter className="h-3 w-3 mr-2" /> All Proposals</Button>
          </div>

          <div className="divide-y">
            {filtered.map(inq => (
              <div key={inq.id} className="p-8 hover:bg-muted/30 transition-all border-l-4 border-l-transparent hover:border-l-primary flex flex-col lg:flex-row gap-8">
                 <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                          {inq.contractorName.charAt(0)}
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-foreground">{inq.contractorName}</h3>
                          <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">Interested in: <span className="text-primary">{inq.propertyName}</span></p>
                       </div>
                       <Badge variant="outline" className={cn(
                         "ml-auto lg:ml-4 font-bold text-[9px] uppercase",
                         inq.status === 'new' ? "bg-primary text-white border-primary" :
                         inq.status === 'negotiation' ? "bg-amber-500 text-white border-amber-600" :
                         "bg-muted text-muted-foreground border-border"
                       )}>{inq.status}</Badge>
                    </div>

                    <div className="bg-muted/20 p-5 rounded-2xl border-2 border-dashed">
                       <p className="text-sm text-foreground font-medium italic">"{inq.message}"</p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase text-muted-foreground">
                       <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {inq.contactPerson}</span>
                       <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {inq.phone}</span>
                       <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {inq.email}</span>
                       <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Proposal Date: {inq.date}</span>
                    </div>
                 </div>

                 <div className="lg:w-72 space-y-5 lg:border-l lg:pl-8">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Proposed Rent</span>
                          <span className="text-base font-bold text-foreground">₹{inq.proposedRent.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Duration</span>
                          <span className="text-sm font-bold text-foreground">{inq.durationMonths} Months</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 pt-2">
                       <Button onClick={() => handleStatus(inq.id, 'negotiation')} className="w-full h-10 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                          <MessageSquare className="h-3.5 w-3.5 mr-2" /> Negotiate Terms
                       </Button>
                       <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" onClick={() => handleStatus(inq.id, 'accepted')} className="h-10 text-[10px] font-bold uppercase border-2 text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                             <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> Accept
                          </Button>
                          <Button variant="outline" onClick={() => handleStatus(inq.id, 'rejected')} className="h-10 text-[10px] font-bold uppercase border-2 text-red-600 border-red-100 hover:bg-red-50">
                             <XCircle className="h-3.5 w-3.5 mr-2" /> Reject
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center bg-muted/5">
                <MessageSquare className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">No proposals found</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Contractor inquiries will appear here once they express interest.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InquiryStat({ label, value, icon: Icon, color, bg }: any) {
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
