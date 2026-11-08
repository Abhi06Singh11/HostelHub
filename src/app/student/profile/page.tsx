
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
  Activity
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

export default function StudentProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  if (!profile) return null;

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Resident Identity Node</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage your personal identification, stay history, and verification credentials.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/student/settings?tab=profile')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Workspace
             </Button>
             <Button variant="outline" onClick={() => router.push('/student/settings?tab=security')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest border-2">
                <Lock className="h-4 w-4 mr-2" /> Security
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Main Info Hub */}
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
                             <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">{profile.name}</h1>
                             <div className="flex items-center gap-3 mt-2">
                                <Badge className="bg-primary text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">ACTIVE RESIDENT</Badge>
                                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ST-ID: {profile.id}</span>
                             </div>
                          </div>
                          <Badge className={cn(
                            "font-black uppercase text-[10px] py-1.5 px-4 rounded-xl",
                            profile.verificationStatus === 'verified' ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
                          )}>{profile.verificationStatus}</Badge>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-dashed">
                          <div className="space-y-4">
                             <ProfileItem label="Primary Email" value={profile.email} icon={Mail} />
                             <ProfileItem label="Contact Node" value={profile.phone} icon={Smartphone} />
                          </div>
                          <div className="space-y-4">
                             <ProfileItem label="Assigned Unit" value={`Room ${profile.roomNumber} (Bed ${profile.bedNumber})`} icon={Home} />
                             <ProfileItem label="Hostel Asset" value={profile.assignedHostelName} icon={MapPin} />
                          </div>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-10 -bottom-10 h-64 w-64 text-primary opacity-5 animate-pulse" />
              </div>

              {/* Details & History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="enterprise-card border bg-card p-8 space-y-8">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                       <Users className="h-4 w-4 text-primary" /> Community & Profile
                    </h3>
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                             <span className="text-muted-foreground">Identity strength</span>
                             <span className="text-primary">{profile.completionPercentage}%</span>
                          </div>
                          <Progress value={profile.completionPercentage} className="h-1.5" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <InfoBit label="Gender" value={profile.gender} />
                          <InfoBit label="Date of Birth" value={profile.dob} />
                          <InfoBit label="Joined Hub" value={profile.moveInDate} />
                          <InfoBit label="Agreement" value="11 Months" />
                       </div>
                    </div>
                 </div>

                 <div className="enterprise-card border bg-card p-8 space-y-8">
                    <h3 className="text-[12px] font-black uppercase text-muted-foreground tracking-widest border-b border-dashed pb-4 flex items-center gap-2">
                       <ShieldCheck className="h-4 w-4 text-primary" /> Guardian Matrix
                    </h3>
                    <div className="space-y-6">
                       <ProfileItem label="Guardian Name" value={profile.emergencyContact.name} icon={User} />
                       <ProfileItem label="Relationship" value={profile.emergencyContact.relationship} icon={Users} />
                       <ProfileItem label="Emergency Phone" value={profile.emergencyContact.phone} icon={Smartphone} />
                       <div className="p-4 rounded-xl bg-primary/5 border-2 border-dashed border-primary/20">
                          <p className="text-[10px] font-bold text-primary uppercase leading-tight italic">
                             "Guardian details are verified. This node is eligible for night-out pass requests."
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              {/* Verification Status */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Compliance Heartbeat</h4>
                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Trust Integrity</p>
                       <div className="flex items-center justify-between">
                          <p className="text-3xl font-black text-white">9.2</p>
                          <Badge className="bg-emerald-600 text-white font-black text-[9px]">HEALTHY</Badge>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '92%' }} />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailRow label="KYC Document" value="VERIFIED" icon={FileText} color="text-emerald-400" />
                       <DetailRow label="Rent History" value="STABLE" icon={CheckCircle2} color="text-emerald-400" />
                       <DetailRow label="Rule Adherence" value="A+" icon={ShieldCheck} color="text-primary" />
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              {/* Interaction Logs */}
              <div className="enterprise-card border bg-card overflow-hidden">
                 <div className="p-6 border-b bg-muted/20 flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Portal Syncs</h4>
                 </div>
                 <div className="divide-y">
                    <ActivityLog action="Rent Remittance" status="Confirmed" time="2d ago" />
                    <ActivityLog action="Profile Update" status="Manual" time="1w ago" />
                    <ActivityLog action="WiFi Access Request" status="Fulfilled" time="2w ago" />
                 </div>
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
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
          <p className="text-sm font-bold text-foreground truncate">{value}</p>
       </div>
    </div>
  );
}

function InfoBit({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
       <p className="text-sm font-bold text-foreground uppercase">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-slate-500 flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
       <span className={cn("font-black", color)}>{value}</span>
    </div>
  );
}

function ActivityLog({ action, status, time }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/10 transition-colors">
       <div className="flex flex-col gap-0.5">
          <span className="text-xs font-black text-foreground uppercase tracking-tight">{action}</span>
          <span className="text-[9px] text-muted-foreground font-bold uppercase">{time}</span>
       </div>
       <Badge variant="outline" className="text-[7px] font-black uppercase py-0 border-primary/20 bg-primary/5 text-primary">{status}</Badge>
    </div>
  );
}
