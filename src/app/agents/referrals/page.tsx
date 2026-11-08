'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredReferrals, addReferral, saveReferrals } from '@/lib/referral-store';
import { getStoredProjects } from '@/lib/project-store';
import { Referral, Project } from '@/lib/types';
import { 
  Search, 
  UserPlus, 
  Building2, 
  Phone, 
  Mail, 
  MoreVertical,
  Plus,
  CheckCircle2,
  AlertCircle,
  Copy,
  Link as LinkIcon,
  Filter,
  Users,
  Calendar,
  ChevronRight,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function AgentReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [properties, setProperties] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newRef, setNewRef] = useState({
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    studentGender: 'Male' as any,
    hostelId: '',
    hostelName: '',
    accommodationType: 'Co-Living',
    budget: 15000,
    commissionAmount: 2500
  });

  useEffect(() => {
    const load = () => {
      setReferrals(getStoredReferrals());
      setProperties(getStoredProjects());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handlePropertyChange = (val: string) => {
    const prop = properties.find(p => p.id === val);
    if (prop) {
      setNewRef({ ...newRef, hostelId: val, hostelName: prop.propertyName });
    }
  };

  const handleSubmitReferral = () => {
    if (!newRef.studentName || !newRef.studentPhone || !newRef.hostelId) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Name, Phone and Property are mandatory." });
      return;
    }

    const isDuplicate = referrals.some(r => r.studentPhone === newRef.studentPhone && r.hostelId === newRef.hostelId);
    if (isDuplicate) {
      toast({ variant: "destructive", title: "Duplicate Referral", description: "This student is already referred to this hostel." });
      return;
    }

    addReferral({
      ...newRef,
      agentId: 'a1',
      agentName: 'Global Admissions Ltd.',
      commissionAmount: Number(newRef.commissionAmount)
    });

    setReferrals(getStoredReferrals());
    setIsDialogOpen(false);
    setNewRef({ studentName: '', studentPhone: '', studentEmail: '', studentGender: 'Male', hostelId: '', hostelName: '', accommodationType: 'Co-Living', budget: 15000, commissionAmount: 2500 });
    toast({ title: "Referral Logged", description: "The contractor has been notified of the new lead." });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://staysync.in/ref/a1-global");
    toast({ title: "Referral Link Copied", description: "Share this link with students to track automatic referrals." });
  };

  const filtered = referrals.filter(r => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) || 
    r.hostelName.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: referrals.length,
    confirmed: referrals.filter(r => r.status === 'admitted').length,
    pending: referrals.filter(r => r.status !== 'admitted' && r.status !== 'rejected').length
  };

  return (
    <DashboardLayout role="agent">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Referral Pipeline</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Manage your referred students and track their journey to admission confirmation.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={handleCopyLink} className="h-11 px-6 font-bold text-[12px] uppercase tracking-widest border-2">
                <LinkIcon className="h-4 w-4 mr-2" /> My Referral Link
             </Button>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                  <UserPlus className="h-4 w-4 mr-2" /> New Student Referral
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Submit Student for Admission</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Student Name *</Label>
                      <Input value={newRef.studentName} onChange={(e) => setNewRef({...newRef, studentName: e.target.value})} className="font-bold h-11 border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Contact Phone *</Label>
                      <Input value={newRef.studentPhone} onChange={(e) => setNewRef({...newRef, studentPhone: e.target.value})} className="font-bold h-11 border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Gender</Label>
                      <Select onValueChange={(val) => setNewRef({...newRef, studentGender: val as any})}>
                        <SelectTrigger className="font-bold border-2 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male" className="font-bold">Male</SelectItem>
                          <SelectItem value="Female" className="font-bold">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Target Property *</Label>
                      <Select onValueChange={handlePropertyChange}>
                        <SelectTrigger className="font-bold border-2 h-11"><SelectValue placeholder="Choose Hostel" /></SelectTrigger>
                        <SelectContent>
                          {properties.map(p => (
                            <SelectItem key={p.id} value={p.id} className="font-bold">{p.propertyName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Accommodation Preferred</Label>
                      <Select onValueChange={(val) => setNewRef({...newRef, accommodationType: val})}>
                        <SelectTrigger className="font-bold border-2 h-11"><SelectValue placeholder="Select Type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Boys Only" className="font-bold">Boys Only</SelectItem>
                          <SelectItem value="Co-Living" className="font-bold">Co-Living</SelectItem>
                          <SelectItem value="Flats" className="font-bold">Studio Flats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Expected Comm.</Label>
                      <Input type="number" value={newRef.commissionAmount} onChange={(e) => setNewRef({...newRef, commissionAmount: Number(e.target.value)})} className="font-bold h-11 border-2" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-[11px] uppercase tracking-widest">Cancel</Button>
                  <Button onClick={handleSubmitReferral} className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest">Confirm Referral</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox label="Total Referrals" value={stats.total} icon={Users} color="text-primary" bg="bg-primary/5" />
          <StatBox label="Active Leads" value={stats.pending} icon={Target} color="text-blue-600" bg="bg-blue-50" />
          <StatBox label="Admissions Confirmed" value={stats.confirmed} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by student or hostel..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase"><Filter className="h-3 w-3 mr-2" /> All Stages</Button>
          </div>

          <div className="divide-y">
            {filtered.map(ref => (
              <div key={ref.id} className="p-6 hover:bg-muted/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-l-4 border-l-transparent hover:border-l-primary">
                <div className="flex gap-5">
                   <div className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0",
                     ref.status === 'admitted' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-primary/5 text-primary border-primary/20"
                   )}>
                     <Users className="h-6 w-6" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-base font-bold text-foreground leading-tight">{ref.studentName}</h4>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Phone className="h-3 w-3" /> {ref.studentPhone}</span>
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {ref.createdAt}</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                   <div className="space-y-1 min-w-[140px]">
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Target Hostel</p>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-bold text-foreground">{ref.hostelName}</span>
                      </div>
                   </div>
                   
                   <div className="min-w-[120px] text-right">
                      <Badge variant="outline" className={cn(
                        "font-bold text-[9px] uppercase px-3 py-1",
                        ref.status === 'admitted' ? "bg-emerald-600 text-white border-emerald-700" :
                        ref.status === 'referred' ? "bg-primary text-white border-primary" :
                        "bg-muted text-muted-foreground border-border"
                      )}>
                        {ref.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground mt-2">Comm: ₹{ref.commissionAmount}</p>
                   </div>

                   <Button variant="ghost" size="icon" className="h-10 w-10">
                      <MoreVertical className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center bg-muted/5">
                <Search className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">No matching leads</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Try refining your search or refer a new student.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatBox({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center", bg)}>
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
