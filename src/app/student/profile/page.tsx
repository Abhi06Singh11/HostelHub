'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentProfile, updateStudentProfile } from '@/lib/student-store';
import { StudentProfile } from '@/lib/types';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Camera, 
  Upload, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Users,
  FileText,
  Home,
  MapPin,
  Settings,
  Lock,
  History,
  Activity,
  Smartphone,
  Info,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function StudentProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [sameAsPerm, setSameAsPerm] = useState(false);
  const [isDigiOpen, setIsDigiOpen] = useState(false);

  useEffect(() => {
    setProfile(getStudentProfile());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    setTimeout(() => {
      updateStudentProfile(profile);
      setIsSaving(false);
      toast({ title: "Profile Synchronized", description: "Your details have been updated successfully." });
    }, 800);
  };

  const handleSameAddress = (checked: boolean) => {
    setSameAsPerm(checked);
    if (checked && profile) {
      setProfile({ ...profile, currentAddress: profile.permanentAddress });
    }
  };

  if (!profile) return null;

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto space-y-8 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Resident Identity Node</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage your personal identification, stay history, and verification credentials.</p>
          </div>
          <div className="flex gap-3">
             <Button onClick={handleSave} disabled={isSaving} className="h-11 px-10 font-bold text-[13px] uppercase tracking-widest shadow-xl">
                {isSaving ? "Syncing..." : <><Save className="h-4 w-4 mr-2" /> Commit Changes</>}
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Header Info */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl shrink-0">
                       <User className="h-14 w-14 text-primary" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Camera className="h-7 w-7 text-white" />
                       </div>
                    </div>
                    <div className="space-y-5 flex-1">
                       <div className="flex justify-between items-start">
                          <div>
                             <h1 className="text-4xl font-bold tracking-tighter uppercase text-foreground">{profile.name}</h1>
                             <div className="flex items-center gap-3 mt-2">
                                <Badge className="bg-primary text-white font-bold uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">ACTIVE RESIDENT</Badge>
                                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ST-ID: {profile.id}</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Dossier Health</p>
                             <p className="text-2xl font-bold text-primary">{profile.completionPercentage}%</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                          <ProfileItem label="Unit" value={`Room ${profile.roomNumber}`} icon={Home} />
                          <ProfileItem label="Mobile" value={profile.phone} icon={Smartphone} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Editable Sections */}
              <Tabs defaultValue="personal" className="w-full">
                 <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 h-auto">
                    <TabsTrigger value="personal" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Personal</TabsTrigger>
                    <TabsTrigger value="address" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Address</TabsTrigger>
                    <TabsTrigger value="guardian" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Family</TabsTrigger>
                    <TabsTrigger value="identity" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Identity</TabsTrigger>
                 </TabsList>

                 <TabsContent value="personal" className="space-y-8 animate-in fade-in duration-500">
                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Personal Intelligence</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Full Legal Name *</Label>
                             <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Date of Birth *</Label>
                             <Input type="date" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Gender *</Label>
                             <Select value={profile.gender} onValueChange={(val: any) => setProfile({...profile, gender: val})}>
                                <SelectTrigger className="h-11 border-2 font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                   {['Male', 'Female', 'Other'].map(g => <SelectItem key={g} value={g} className="font-bold">{g}</SelectItem>)}
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Nationality *</Label>
                             <Input value={profile.nationality} onChange={(e) => setProfile({...profile, nationality: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                       </div>
                    </div>

                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Contact Nodes</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Primary Mobile *</Label>
                             <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Authenticated Email (Read Only)</Label>
                             <Input value={profile.email} readOnly className="h-11 border-2 font-bold bg-muted/30" />
                          </div>
                       </div>
                    </div>
                 </TabsContent>

                 <TabsContent value="address" className="space-y-8 animate-in fade-in duration-500">
                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Permanent Origin</h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Permanent Residential Address *</Label>
                             <Input value={profile.permanentAddress} onChange={(e) => setProfile({...profile, permanentAddress: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">State *</Label>
                                <Input value={profile.state} onChange={(e) => setProfile({...profile, state: e.target.value})} className="h-11 border-2 font-bold" />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">City *</Label>
                                <Input value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} className="h-11 border-2 font-bold" />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><Home className="h-5 w-5 text-primary" /> Current Residency</h3>
                          <div className="flex items-center space-x-2 bg-muted/20 px-3 py-1.5 rounded-lg border">
                             <Checkbox id="same" checked={sameAsPerm} onCheckedChange={handleSameAddress} />
                             <Label htmlFor="same" className="text-[10px] font-bold uppercase cursor-pointer">Same as Permanent</Label>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Current Residential Address *</Label>
                          <Input value={profile.currentAddress} onChange={(e) => setProfile({...profile, currentAddress: e.target.value})} className="h-11 border-2 font-bold" />
                       </div>
                    </div>
                 </TabsContent>

                 <TabsContent value="guardian" className="space-y-8 animate-in fade-in duration-500">
                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Kinship Data</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Father's Full Name *</Label>
                             <Input value={profile.fatherName} onChange={(e) => setProfile({...profile, fatherName: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Mother's Full Name *</Label>
                             <Input value={profile.motherName} onChange={(e) => setProfile({...profile, motherName: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Primary Guardian Name *</Label>
                             <Input value={profile.guardianName} onChange={(e) => setProfile({...profile, guardianName: e.target.value})} className="h-11 border-2 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Emergency Mobile *</Label>
                             <Input value={profile.emergencyContact.phone} onChange={(e) => setProfile({...profile, emergencyContact: {...profile.emergencyContact, phone: e.target.value}})} className="h-11 border-2 font-bold" />
                          </div>
                       </div>
                    </div>
                 </TabsContent>

                 <TabsContent value="identity" className="space-y-8 animate-in fade-in duration-500">
                    <div className="enterprise-card border bg-card p-10 space-y-8">
                       <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Identity Credentials</h3>
                          <Dialog open={isDigiOpen} onOpenChange={setIsDigiOpen}>
                             <DialogTrigger asChild>
                                <Button variant="outline" className="h-10 border-2 font-bold uppercase text-[10px] tracking-widest text-primary hover:bg-primary/5">
                                   Verify with DigiLocker
                                </Button>
                             </DialogTrigger>
                             <DialogContent className="max-w-md rounded-3xl border-2 p-10">
                                <DialogHeader className="flex flex-col items-center text-center">
                                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                      <ShieldCheck className="h-8 w-8 text-blue-600" />
                                   </div>
                                   <DialogTitle className="text-2xl font-bold uppercase tracking-tight">DigiLocker Sync</DialogTitle>
                                </DialogHeader>
                                <div className="py-6 text-center space-y-4">
                                   <p className="text-sm font-medium text-muted-foreground leading-relaxed uppercase tracking-wider">
                                      Secure identity verification via DigiLocker integration is coming soon.
                                   </p>
                                   <div className="p-4 bg-muted/30 border-2 border-dashed rounded-2xl italic text-[11px] font-bold text-primary">
                                      Development Mode: This module is currently a high-fidelity placeholder for future ecosystem expansion.
                                   </div>
                                </div>
                                <DialogFooter>
                                   <Button onClick={() => setIsDigiOpen(false)} className="w-full h-12 font-bold uppercase tracking-widest">Close Gateway</Button>
                                </DialogFooter>
                             </DialogContent>
                          </Dialog>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Government ID Type *</Label>
                             <Select value={profile.govIdType} onValueChange={(val) => setProfile({...profile, govIdType: val})}>
                                <SelectTrigger className="h-11 border-2 font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                   {['Aadhaar', 'Passport', 'Voter ID', 'Driving Licence'].map(t => <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>)}
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Masked ID Number *</Label>
                             <Input 
                               value={profile.govIdNumber} 
                               onChange={(e) => setProfile({...profile, govIdNumber: e.target.value})} 
                               placeholder="XXXX-XXXX-1234"
                               className="h-11 border-2 font-bold tracking-widest" 
                             />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-dashed">
                          <UploadBox label="Identity Proof Scan" icon={FileText} done={profile.idDocsUploaded} />
                          <UploadBox label="Address Proof Scan" icon={MapPin} done={profile.idDocsUploaded} />
                       </div>
                    </div>
                 </TabsContent>
              </Tabs>
           </div>

           <div className="space-y-8">
              {/* Compliance Heartbeat */}
              <div className="enterprise-card border bg-card p-8 space-y-6">
                 <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Compliance Heartbeat</h4>
                 <div className="space-y-8">
                    <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-4">
                       <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Trust Integrity</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-bold text-foreground">{profile.completionPercentage}%</p>
                          <Badge className={cn("font-bold text-[9px]", profile.completionPercentage === 100 ? "bg-emerald-600 text-white" : "bg-amber-500 text-white")}>
                            {profile.completionPercentage === 100 ? 'COMPLETE' : 'INCOMPLETE'}
                          </Badge>
                       </div>
                       <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full", profile.completionPercentage === 100 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${profile.completionPercentage}%` }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailRow label="KYC Documents" value={profile.idDocsUploaded ? 'Verified' : 'Pending'} icon={FileText} color={profile.idDocsUploaded ? "text-emerald-600" : "text-amber-600"} />
                       <DetailRow label="Police Status" value={profile.verificationStatus === 'verified' ? 'CONFIRMED' : 'PENDING'} icon={ShieldCheck} color={profile.verificationStatus === 'verified' ? "text-emerald-600" : "text-primary"} />
                    </div>
                 </div>
              </div>

              {/* Hostel Identity */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                 <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Unit Node</h4>
                 <div className="space-y-5">
                    <div className="space-y-1">
                       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Assigned Asset</p>
                       <p className="text-sm font-bold">{profile.assignedHostelName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                       <div>
                          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Unit</p>
                          <p className="text-base font-bold text-primary">{profile.roomNumber}</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Bed</p>
                          <p className="text-base font-bold text-primary">{profile.bedNumber}</p>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProfileItem({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-start gap-3">
       <Icon className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
       <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{label}</p>
          <p className="text-sm font-bold text-foreground truncate">{value}</p>
       </div>
    </div>
  );
}

function UploadBox({ label, icon: Icon, done }: { label: string, icon: any, done: boolean }) {
  return (
    <div className={cn(
      "p-6 rounded-2xl border-2 border-dashed flex flex-col items-center gap-4 transition-all group cursor-pointer",
      done ? "bg-emerald-50 border-emerald-200" : "bg-muted/30 border-border hover:border-primary/40"
    )}>
       <div className={cn(
         "p-3 rounded-xl border transition-colors",
         done ? "bg-emerald-100 text-emerald-700" : "bg-card text-muted-foreground group-hover:text-primary"
       )}>
          <Icon className="h-6 w-6" />
       </div>
       <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">{label}</p>
          <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{done ? 'Uploaded' : 'Action Required'}</p>
       </div>
       <Button variant="ghost" size="sm" className="h-7 text-[8px] font-bold uppercase border">Replace File</Button>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest">
       <span className="text-muted-foreground flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" /> {label}
       </span>
       <span className={cn("font-semibold uppercase", color)}>{value}</span>
    </div>
  );
}
