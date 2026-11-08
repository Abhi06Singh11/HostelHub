'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredInquiries, updateInquiryStatus, getStoredInvitations, addInvitation, deactivateInvitation } from '@/lib/inquiry-store';
import { getStoredReferrals, updateReferralStatus } from '@/lib/referral-store';
import { getStoredProjects } from '@/lib/project-store';
import { StudentInquiry, InvitationLink, Project, Referral } from '@/lib/types';
import { 
  Search, 
  UserPlus, 
  Link as LinkIcon, 
  Phone, 
  Mail, 
  Building2, 
  Calendar,
  MoreVertical,
  Copy,
  TrendingUp,
  UserCheck,
  Share2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ContractorInquiriesPage() {
  const [inquiries, setInquiries] = useState<StudentInquiry[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [invitations, setInvitations] = useState<InvitationLink[]>([]);
  const [properties, setProperties] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  
  const [newInv, setNewInv] = useState({ 
    hostelId: '', 
    hostelName: '', 
    accommodationType: 'Co-Living',
    startDate: '',
    roomNumber: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setInquiries(getStoredInquiries());
      setReferrals(getStoredReferrals());
      setInvitations(getStoredInvitations());
      setProperties(getStoredProjects());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleStatusChange = (id: string, status: StudentInquiry['status']) => {
    updateInquiryStatus(id, status);
    setInquiries(getStoredInquiries());
    toast({ title: "Inquiry Updated", description: `Student marked as ${status}.` });
  };

  const handleReferralStatusChange = (id: string, status: Referral['status']) => {
    updateReferralStatus(id, status);
    setReferrals(getStoredReferrals());
    toast({ title: "Referral Updated", description: `Agent lead marked as ${status}.` });
  };

  const handleGenerateLink = () => {
    if (!newInv.hostelId || !newInv.accommodationType) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please select a target property and accommodation type." });
      return;
    }
    
    addInvitation({
      hostelId: newInv.hostelId,
      hostelName: newInv.hostelName,
      accommodationType: newInv.accommodationType as any,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      roomNumber: newInv.roomNumber,
      startDate: newInv.startDate
    } as any);

    setInvitations(getStoredInvitations());
    setIsDialogOpen(false);
    toast({ title: "Invitation Ready", description: "Secure joining link generated and registered." });
  };

  const stats = {
    totalLeads: inquiries.length + referrals.length,
    conversions: inquiries.filter(i => i.status === 'converted').length + referrals.filter(r => r.status === 'admitted').length,
    agentReferrals: referrals.length
  };

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Admissions Hub</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Manage prospective students from public inquiries and authorized agent referrals.</p>
          </div>
          <div className="flex gap-3">
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                  <LinkIcon className="h-4 w-4 mr-2" /> Generate Invitation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Create Secure Invitation</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Select Target Property *</Label>
                    <Select onValueChange={(val) => {
                      const p = properties.find(x => x.id === val);
                      setNewInv({...newInv, hostelId: val, hostelName: p?.propertyName || ''});
                    }}>
                      <SelectTrigger className="font-bold border-2 h-11">
                        <SelectValue placeholder="Choose a building..." />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map(p => (
                          <SelectItem key={p.id} value={p.id} className="font-bold">{p.propertyName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Accommodation Type *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Boys Only', 'Co-Living', 'Flats'].map(type => (
                        <button
                          key={type}
                          onClick={() => setNewInv({...newInv, accommodationType: type as any})}
                          className={cn(
                            "px-2 py-3 rounded text-[10px] font-bold uppercase border-2 transition-all",
                            newInv.accommodationType === type ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-3">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-[11px] uppercase tracking-widest">Cancel</Button>
                  <Button onClick={handleGenerateLink} className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest">Generate & Commit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickStat label="Total Pipeline" value={stats.totalLeads} icon={TrendingUp} color="text-primary" bg="bg-primary/5" />
          <QuickStat label="Agent Referrals" value={stats.agentReferrals} icon={Users} color="text-blue-600" bg="bg-blue-50" />
          <QuickStat label="Success Conversions" value={stats.conversions} icon={UserCheck} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="public" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="public" className="font-bold uppercase text-[11px] tracking-widest rounded-lg">Public Inquiries ({inquiries.length})</TabsTrigger>
                <TabsTrigger value="agents" className="font-bold uppercase text-[11px] tracking-widest rounded-lg">Agent Leads ({referrals.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="public" className="space-y-6">
                <div className="enterprise-card border bg-card">
                  <div className="divide-y">
                    {inquiries.map(inq => (
                      <LeadCard key={inq.id} lead={inq} onStatusChange={(s) => handleStatusChange(inq.id, s as any)} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="agents" className="space-y-6">
                <div className="enterprise-card border bg-card">
                  <div className="divide-y">
                    {referrals.map(ref => (
                      <AgentReferralCard key={ref.id} referral={ref} onStatusChange={(s) => handleReferralStatusChange(ref.id, s as any)} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="enterprise-card border bg-card">
              <div className="p-4 border-b bg-muted/30">
                <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Active Invitations</span>
              </div>
              <div className="divide-y">
                {invitations.map(inv => (
                  <div key={inv.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-foreground leading-tight">{inv.hostelName}</p>
                        <p className="text-[10px] font-bold uppercase text-primary tracking-widest mt-0.5">{inv.accommodationType}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase border bg-primary/10 text-primary">{inv.status}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 border-2 border-dashed rounded overflow-hidden">
                      <span className="text-[10px] font-mono text-muted-foreground truncate flex-1">{inv.link}</span>
                      <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(inv.link); toast({title: "Copied!"}); }} className="h-7 w-7"><Copy className="h-3.5 w-3.5" /></Button>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Exp: {inv.expiresAt}</p>
                      <Button variant="ghost" size="sm" onClick={() => deactivateInvitation(inv.id)} className="h-6 text-[9px] font-bold uppercase text-destructive">Deactivate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function LeadCard({ lead, onStatusChange }: any) {
  return (
    <div className="p-5 hover:bg-muted/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-base font-bold text-foreground">{lead.studentName}</h4>
          <p className="text-[11px] text-muted-foreground font-bold uppercase">{lead.phone} • {lead.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onStatusChange('contacted')} className="h-8 text-[10px] font-bold uppercase">Contacted</Button>
          <Button onClick={() => onStatusChange('converted')} className="h-8 text-[10px] font-bold uppercase">Confirm</Button>
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-lg text-sm text-foreground italic">"{lead.message}"</div>
    </div>
  );
}

function AgentReferralCard({ referral, onStatusChange }: any) {
  return (
    <div className="p-5 hover:bg-muted/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h4 className="text-base font-bold text-foreground">{referral.studentName}</h4>
             <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">Agent Lead</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-bold uppercase">From: {referral.agentName}</p>
        </div>
        <div className="text-right">
           <p className="text-xs font-bold text-foreground">Comm: ₹{referral.commissionAmount}</p>
           <span className={cn(
             "text-[9px] font-bold uppercase px-2 py-0.5 rounded border inline-block mt-1",
             referral.status === 'admitted' ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"
           )}>{referral.status}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {referral.hostelName}</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Phone className="h-3 w-3" /> {referral.studentPhone}</span>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onStatusChange('contacted')} className="h-8 text-[10px] font-bold uppercase">Mark Contacted</Button>
        <Button onClick={() => onStatusChange('admitted')} className="h-8 text-[10px] font-bold uppercase">Confirm Admission</Button>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon: Icon, color, bg }: any) {
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
