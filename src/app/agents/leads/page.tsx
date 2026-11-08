'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredReferrals, addReferral } from '@/lib/referral-store';
import { getStoredProjects } from '@/lib/project-store';
import { Referral, Project } from '@/lib/types';
import { 
  Search, 
  UserPlus, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MoreVertical,
  Plus,
  CheckCircle2,
  AlertCircle
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

export default function AgentLeadsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [properties, setProperties] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newRef, setNewRef] = useState({
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    hostelId: '',
    hostelName: '',
    accommodationType: 'Co-Living',
    commissionAmount: 2000
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
      toast({ variant: "destructive", title: "Missing Information", description: "Student name, phone, and property selection are required." });
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
    setNewRef({ studentName: '', studentPhone: '', studentEmail: '', hostelId: '', hostelName: '', accommodationType: 'Co-Living', commissionAmount: 2000 });
    toast({ title: "Referral Submitted", description: "Student details have been shared with the contractor." });
  };

  const filtered = referrals.filter(r => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) || 
    r.hostelName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="agent">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Admission Leads</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Manage prospective students and refer them to active hostel partners.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> New Admission Referral
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-bold uppercase tracking-tight text-xl text-foreground">Refer Student to Hostel</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Student Information *</Label>
                  <Input 
                    placeholder="Full Name" 
                    value={newRef.studentName}
                    onChange={(e) => setNewRef({...newRef, studentName: e.target.value})}
                    className="border-2 font-bold h-11"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      placeholder="Phone (+91...)" 
                      value={newRef.studentPhone}
                      onChange={(e) => setNewRef({...newRef, studentPhone: e.target.value})}
                      className="border-2 font-bold h-11"
                    />
                    <Input 
                      placeholder="Email" 
                      value={newRef.studentEmail}
                      onChange={(e) => setNewRef({...newRef, studentEmail: e.target.value})}
                      className="border-2 font-bold h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Select Target Property *</Label>
                  <Select onValueChange={handlePropertyChange}>
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

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Accommodation</Label>
                    <Select onValueChange={(val) => setNewRef({...newRef, accommodationType: val})}>
                      <SelectTrigger className="font-bold border-2 h-11">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Boys Only', 'Co-Living', 'Flats'].map(t => (
                          <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Expected Comm.</Label>
                    <Input 
                      type="number"
                      value={newRef.commissionAmount}
                      onChange={(e) => setNewRef({...newRef, commissionAmount: Number(e.target.value)})}
                      className="border-2 font-bold h-11"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-3">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-[11px] uppercase tracking-widest">Cancel</Button>
                <Button onClick={handleSubmitReferral} className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest">Submit Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads by student or hostel..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Admitted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">In Progress</span>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filtered.map(ref => (
              <div key={ref.id} className="p-6 hover:bg-muted/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-transparent hover:border-l-primary">
                <div className="flex gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                    ref.status === 'admitted' ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-primary/5 border-primary/20 text-primary"
                  )}>
                    {ref.status === 'admitted' ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground">{ref.studentName}</h3>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-[11px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase"><Phone className="h-3 w-3 opacity-50" /> {ref.studentPhone}</span>
                      <span className="text-[11px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase"><Mail className="h-3 w-3 opacity-50" /> {ref.studentEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Target Property</p>
                    <div className="flex items-center justify-end gap-2">
                      <Building2 className="h-3.5 w-3.5 text-primary opacity-50" />
                      <span className="text-sm font-bold text-foreground">{ref.hostelName}</span>
                    </div>
                  </div>

                  <div className="min-w-[120px] text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm",
                      ref.status === 'admitted' ? "bg-emerald-600 text-white border-emerald-700" :
                      ref.status === 'referred' ? "bg-primary text-white border-primary" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {ref.status}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-2">Comm: ₹{ref.commissionAmount}</p>
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
