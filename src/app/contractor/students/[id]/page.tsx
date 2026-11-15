'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStudentById, updateStudentVerification } from '@/lib/student-management-store';
import { StudentDetail, VerificationLevel } from '@/lib/types';
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  History, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Mail, 
  MapPin, 
  Building2, 
  Clock,
  Download,
  Upload,
  UserCircle,
  MoreVertical,
  Activity,
  Zap,
  Info,
  Calendar,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function StudentProfileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'gov' | 'pol'>('gov');
  const [confirmState, setConfirmState] = useState(true);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const data = getStudentById(id as string);
    if (data) setStudent(data);
  }, [id]);

  if (!student) return null;

  const handleToggle = (type: 'gov' | 'pol', currentState: boolean) => {
    setConfirmType(type);
    setConfirmState(!currentState);
    setReason('');
    setIsConfirmOpen(true);
  };

  const commitVerification = () => {
    const vType = confirmType === 'gov' ? 'government_id' : 'police';
    updateStudentVerification(student.id, vType, confirmState, 'John Contractor', reason);
    setStudent(getStudentById(student.id)!);
    setIsConfirmOpen(false);
    toast({ 
      title: "Ledger Updated", 
      description: `${confirmType === 'gov' ? 'Government ID' : 'Police Verification'} is now ${confirmState ? 'Verified' : 'Pending'}.` 
    });
  };

  const overallStatus = student.govIdVerified && student.policeVerified ? 'Fully Verified' : 
                       student.govIdVerified || student.policeVerified ? 'Partially Verified' : 'Unverified';

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="font-bold uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> All Students
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                <Download className="h-4 w-4 mr-2" /> Download Dossier
             </Button>
             <Button className="h-10 font-bold uppercase text-[11px] tracking-widest shadow-md">
                Edit Identification
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-black text-5xl shadow-2xl shrink-0">
                       {student.avatar || student.name.charAt(0)}
                    </div>
                    <div className="space-y-5 flex-1">
                       <div className="flex justify-between items-start">
                          <div>
                             <h1 className="text-4xl font-bold tracking-tighter uppercase text-foreground">{student.name}</h1>
                             <div className="flex items-center gap-3 mt-2">
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">RESIDENT</Badge>
                                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ID: {student.studentId}</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Overall Trust Node</p>
                             <Badge className={cn(
                               "mt-1 font-bold uppercase text-[11px] py-1.5 px-6 rounded-xl shadow-sm",
                               overallStatus === 'Fully Verified' ? "bg-emerald-600 text-white" : "bg-primary text-white"
                             )}>{overallStatus}</Badge>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-dashed">
                          <div className="space-y-3">
                             <ProfileRow icon={Mail} label="Official Email" value={student.email} />
                             <ProfileRow icon={Smartphone} label="Mobile Logic" value={student.phone} />
                             <ProfileRow icon={Calendar} label="Date of Birth" value={student.dob} />
                          </div>
                          <div className="space-y-3">
                             <ProfileRow icon={Building2} label="Hostel Asset" value={student.assignedHostelName} />
                             <ProfileRow icon={Home} label="Unit Allocation" value={`Room ${student.roomNumber} (Bed ${student.bedNumber})`} />
                             <ProfileRow icon={Clock} label="Resident Since" value={student.checkInDate} />
                          </div>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-10 -bottom-10 h-64 w-64 text-primary opacity-5 animate-pulse" />
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="identity" className="w-full">
                 <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 h-auto">
                    <TabsTrigger value="identity" className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Identity Hub</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Stay Ledger</TabsTrigger>
                    <TabsTrigger value="documents" className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Doc Vault</TabsTrigger>
                    <TabsTrigger value="guardian" className="rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Contacts</TabsTrigger>
                 </TabsList>

                 <TabsContent value="identity" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Card className="enterprise-card p-8 space-y-6">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Credential Sync</h3>
                          <div className="space-y-4">
                             <DetailField label="Government ID Type" value={student.govIdType} />
                             <DetailField label="ID Reference Number" value={student.govIdNumber} />
                             <DetailField label="Nationality" value={student.nationality} />
                             <DetailField label="Address Origin" value={student.permanentAddress} />
                          </div>
                       </Card>

                       <Card className="enterprise-card p-8 space-y-6">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Regional Logic</h3>
                          <div className="space-y-4">
                             <DetailField label="State / Province" value={student.state} />
                             <DetailField label="District / Hub" value={student.district} />
                             <DetailField label="City Node" value={student.city} />
                             <DetailField label="PIN Access" value={student.pincode} />
                          </div>
                       </Card>
                    </div>
                 </TabsContent>

                 <TabsContent value="history" className="animate-in fade-in duration-500">
                    <Card className="enterprise-card overflow-hidden">
                       <div className="p-4 border-b bg-muted/20">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Historical Stay Nodes</span>
                       </div>
                       <div className="divide-y">
                          {student.stayHistory.map(stay => (
                            <div key={stay.id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
                               <div className="flex items-center gap-5">
                                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary">
                                     <Building2 className="h-5 w-5" />
                                  </div>
                                  <div>
                                     <p className="text-sm font-bold text-foreground uppercase">{stay.propertyName}</p>
                                     <p className="text-[10px] text-muted-foreground font-bold uppercase">Room {stay.roomNumber}-{stay.bedNumber}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <Badge className={cn("text-[8px] uppercase", stay.status === 'ongoing' ? "bg-emerald-600" : "bg-muted text-muted-foreground")}>{stay.status}</Badge>
                                  <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Check-in: {stay.checkInDate}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </Card>
                 </TabsContent>

                 <TabsContent value="documents" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {student.documents.map(doc => (
                         <Card key={doc.id} className="enterprise-card p-6 flex flex-col gap-5 group hover:border-primary transition-all">
                            <div className="flex justify-between items-start">
                               <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/5 transition-colors">
                                  <FileText className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                               </div>
                               <Badge className="text-[7px] uppercase tracking-widest">{doc.status}</Badge>
                            </div>
                            <div>
                               <p className="text-xs font-bold text-foreground uppercase truncate">{doc.name}</p>
                               <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1">{doc.type.replace('_', ' ')} • {doc.uploadDate}</p>
                            </div>
                            <div className="flex gap-2 mt-auto">
                               <Button variant="ghost" size="sm" className="flex-1 h-8 text-[9px] font-bold uppercase tracking-widest border border-border">Preview</Button>
                               <Button variant="ghost" size="sm" className="flex-1 h-8 text-[9px] font-bold uppercase tracking-widest border border-border">Swap</Button>
                            </div>
                         </Card>
                       ))}
                       <button className="aspect-square rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-3 text-primary hover:bg-primary/10 transition-all">
                          <Upload className="h-8 w-8" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Transmit Document</span>
                       </button>
                    </div>
                 </TabsContent>

                 <TabsContent value="guardian" className="animate-in fade-in duration-500">
                    <Card className="enterprise-card p-10 space-y-10">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Parent / Kin Logic</h4>
                             <div className="space-y-4">
                                <DetailField label="Father Identity" value={student.fatherName} />
                                <DetailField label="Mother Identity" value={student.motherName} />
                                <DetailField label="Guardian Node" value={student.guardianPhone} />
                             </div>
                          </div>
                          <div className="space-y-6">
                             <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Emergency Response</h4>
                             <div className="space-y-4">
                                <DetailField label="Contact Alias" value={student.emergencyName} />
                                <DetailField label="Emergency Phone" value={student.emergencyPhone} />
                                <DetailField label="Kin Relationship" value={student.emergencyRelation} />
                             </div>
                          </div>
                       </div>
                    </Card>
                 </TabsContent>
              </Tabs>
           </div>

           <div className="space-y-8">
              {/* CRITICAL: INDEPENDENT VERIFICATION TOGGLES */}
              <Card className="enterprise-card p-8 space-y-8">
                 <div className="space-y-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Verification Gateway</h3>
                    <p className="text-[11px] text-muted-foreground font-medium">Independent compliance synchronization.</p>
                 </div>

                 <div className="space-y-10">
                    {/* Toggle 1: Government ID */}
                    <div className="flex items-center justify-between gap-6 p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
                       <div className="space-y-1 flex-1">
                          <Label className="text-xs font-bold uppercase tracking-tight flex items-center gap-2">
                             <ShieldCheck className={cn("h-4 w-4", student.govIdVerified ? "text-emerald-600" : "text-muted-foreground")} />
                             Government ID Verified
                          </Label>
                          <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Identity document sync state.</p>
                       </div>
                       <Switch 
                         checked={student.govIdVerified} 
                         onCheckedChange={() => handleToggle('gov', student.govIdVerified)}
                         className="data-[state=checked]:bg-emerald-600"
                       />
                    </div>

                    {/* Toggle 2: Police Verification */}
                    <div className="flex items-center justify-between gap-6 p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
                       <div className="space-y-1 flex-1">
                          <Label className="text-xs font-bold uppercase tracking-tight flex items-center gap-2">
                             <Zap className={cn("h-4 w-4", student.policeVerified ? "text-emerald-600" : "text-muted-foreground")} />
                             Police Verification Done
                          </Label>
                          <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Legal law-enforcement ledger state.</p>
                       </div>
                       <Switch 
                         checked={student.policeVerified} 
                         onCheckedChange={() => handleToggle('pol', student.policeVerified)}
                         className="data-[state=checked]:bg-emerald-600"
                       />
                    </div>
                 </div>

                 {/* Audit Brief */}
                 <div className="space-y-4 pt-6 border-t border-dashed">
                    <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Metadata Ledger</h4>
                    <div className="space-y-2">
                       {student.govIdVerified && (
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                            <span className="text-muted-foreground/60">ID Verified By</span>
                            <span className="text-foreground">{student.govIdVerifiedBy}</span>
                         </div>
                       )}
                       {student.policeVerified && (
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                            <span className="text-muted-foreground/60">Pol Verified By</span>
                            <span className="text-foreground">{student.policeVerifiedBy}</span>
                         </div>
                       )}
                    </div>
                 </div>
              </Card>

              {/* Interaction Insight */}
              <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">Compliance Heartbeat</h4>
                    <div className="space-y-4">
                       <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                          <p className="text-[9px] font-bold text-white/50 uppercase">Verification Audit Log</p>
                          {student.verificationLogs.slice(0, 3).map(log => (
                            <div key={log.id} className="flex justify-between items-center border-b border-white/5 py-1.5 last:border-0">
                               <span className="text-[10px] font-bold uppercase text-white">{log.type.replace('_', ' ')}</span>
                               <span className="text-[10px] font-bold text-emerald-400 uppercase">{log.newStatus}</span>
                            </div>
                          ))}
                          {student.verificationLogs.length === 0 && (
                            <p className="text-[10px] text-white/30 italic uppercase">No sync logs found.</p>
                          )}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <DetailRowInSlate label="KYC Document" value="Verified" icon={FileText} color="text-emerald-400" />
                       <DetailRowInSlate label="Rent History" value="STABLE" icon={CheckCircle2} color="text-emerald-400" />
                       <DetailRowInSlate label="Rule Adherence" value="A+" icon={ShieldCheck} color="text-blue-400" />
                    </div>
                 </div>
                 <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>
           </div>
        </div>
      </div>

      {/* Verification Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md rounded-3xl border-2">
           <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">
                 {confirmState ? 'Authorize Verification' : 'Rollback Verification'}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                 This action will be recorded in the immutable compliance ledger.
              </DialogDescription>
           </DialogHeader>
           <div className="space-y-6 py-6">
              <div className="p-4 bg-muted/30 border-2 border-dashed rounded-2xl flex items-start gap-4">
                 <Info className="h-5 w-5 text-primary mt-0.5" />
                 <p className="text-xs font-bold text-foreground leading-relaxed uppercase">
                    {confirmState 
                      ? `I confirm that the ${confirmType === 'gov' ? 'Government ID' : 'Police Verification'} documentation for ${student.name} has been manually inspected and matches our records.`
                      : `Please provide a reason for reversing the verification status for this resident.`
                    }
                 </p>
              </div>
              {!confirmState && (
                <div className="space-y-2">
                   <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Reason for Reversal *</Label>
                   <Textarea 
                     value={reason}
                     onChange={(e) => setReason(e.target.value)}
                     placeholder="e.g. Identity discrepancy detected during periodic audit."
                     className="min-h-[100px] border-2 font-medium"
                   />
                </div>
              )}
           </div>
           <DialogFooter>
              <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} className="font-bold uppercase text-[11px] tracking-widest">Cancel</Button>
              <Button onClick={commitVerification} className={cn("h-11 px-8 font-bold uppercase text-[11px] tracking-widest", confirmState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700")}>
                 {confirmState ? 'Commit Verified Status' : 'Decommission Status'}
              </Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

function ProfileRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
       <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
       <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
          <p className="text-sm font-bold text-foreground truncate">{value}</p>
       </div>
    </div>
  );
}

function DetailField({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{label}</p>
       <p className="text-sm font-bold text-foreground uppercase">{value}</p>
    </div>
  );
}

function DetailRowInSlate({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-white/60 flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" /> {label}
       </span>
       <span className={cn("font-bold uppercase", color)}>{value}</span>
    </div>
  );
}
