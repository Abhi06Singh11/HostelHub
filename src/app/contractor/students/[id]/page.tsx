'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStudentById, updateStudentVerification, calculateCompletion, getMissingFields, sendInformationRequest } from '@/lib/student-management-store';
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
  Activity,
  Zap,
  Info,
  Calendar,
  Home,
  MessageSquare,
  Send,
  Plus,
  ArrowRight
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

export default function StudentProfileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'gov' | 'pol'>('gov');
  const [confirmState, setConfirmState] = useState(true);
  const [reason, setReason] = useState('');

  // Request Information Dialog State
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [customMsg, setCustomMsg] = useState('');

  const requestOptions = [
    { id: 'personal', label: 'Complete Personal Information' },
    { id: 'phone', label: 'Add Mobile Number' },
    { id: 'perm_addr', label: 'Add Permanent Address' },
    { id: 'curr_addr', label: 'Add Current Address' },
    { id: 'guardian', label: 'Add Guardian Details' },
    { id: 'emergency', label: 'Add Emergency Contact' },
    { id: 'gov_id', label: 'Upload Government ID' },
    { id: 'addr_proof', label: 'Upload Address Proof' },
    { id: 'photo', label: 'Upload Student Photograph' },
  ];

  useEffect(() => {
    const data = getStudentById(id as string);
    if (data) setStudent(data);
  }, [id]);

  if (!student) return null;

  const completion = calculateCompletion(student);
  const missing = getMissingFields(student);

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

  const handleSendRequest = () => {
    if (selectedFields.length === 0) {
      toast({ variant: "destructive", title: "Empty Selection", description: "Please select at least one item to request." });
      return;
    }
    
    sendInformationRequest(student.id, selectedFields, customMsg);
    setIsRequestOpen(false);
    setSelectedFields([]);
    setCustomMsg('');
    toast({ title: "Request Transmitted", description: "The student has been notified via their portal." });
  };

  const overallStatus = student.govIdVerified && student.policeVerified ? 'Fully Verified' : 
                       student.govIdVerified || student.policeVerified ? 'Partially Verified' : 'Unverified';

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="font-semibold uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
          </Button>
          <div className="flex gap-3">
             <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2 text-primary hover:bg-primary/5">
                    <MessageSquare className="h-4 w-4 mr-2" /> Request Information
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-3xl border-2">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold uppercase tracking-tight">Request Missing Data</DialogTitle>
                    <DialogDescription className="text-xs font-medium uppercase text-muted-foreground">Select required profile elements to notify the resident.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-6">
                    <div className="grid grid-cols-2 gap-3">
                      {requestOptions.map(opt => (
                        <div key={opt.id} className="flex items-center space-x-2 p-2 rounded-xl bg-muted/20 border border-transparent hover:border-primary/20 transition-all">
                          <Checkbox 
                            id={opt.id} 
                            checked={selectedFields.includes(opt.label)} 
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedFields([...selectedFields, opt.label]);
                              else setSelectedFields(selectedFields.filter(f => f !== opt.label));
                            }}
                          />
                          <Label htmlFor={opt.id} className="text-[11px] font-bold uppercase cursor-pointer">{opt.label}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Custom Message (Optional)</Label>
                      <Textarea 
                        placeholder="e.g. Please update your guardian mobile number as the previous one is unreachable."
                        value={customMsg}
                        onChange={(e) => setCustomMsg(e.target.value)}
                        className="min-h-[80px] border-2 font-medium"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsRequestOpen(false)} className="font-bold uppercase text-[11px] tracking-widest">Abort</Button>
                    <Button onClick={handleSendRequest} className="h-11 px-8 font-bold uppercase text-[11px] tracking-widest bg-primary shadow-lg">
                      <Send className="h-4 w-4 mr-2" /> Send Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
             </Dialog>
             <Button variant="outline" className="h-10 font-semibold uppercase text-[11px] tracking-widest border-2">
                <Download className="h-4 w-4 mr-2" /> Download Record
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-bold text-5xl shadow-2xl shrink-0">
                       {student.avatar || student.name.charAt(0)}
                    </div>
                    <div className="space-y-5 flex-1">
                       <div className="flex justify-between items-start">
                          <div>
                             <h1 className="text-3xl font-bold tracking-tighter uppercase text-foreground">{student.name}</h1>
                             <div className="flex items-center gap-3 mt-2">
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold uppercase text-[10px] tracking-widest py-1.5 px-4 rounded-xl">RESIDENT</Badge>
                                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">ST-ID: {student.studentId}</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">Overall Trust State</p>
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
                             <ProfileRow icon={Clock} label="Check-in Date" value={student.checkInDate} />
                          </div>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-10 -bottom-10 h-64 w-64 text-primary opacity-5 animate-pulse" />
              </div>

              {/* Completion Logic Summary */}
              {missing.length > 0 && (
                <Card className="enterprise-card border-amber-200 bg-amber-50/50 p-8 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                        <h3 className="text-lg font-bold uppercase tracking-tight text-amber-800">Incomplete Profile Dossier</h3>
                      </div>
                      <p className="text-xs font-medium text-amber-800/70 leading-relaxed uppercase">
                        This resident is missing {missing.length} critical information nodes required for the commercial stay ledger.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {missing.map(m => (
                          <Badge key={m} variant="outline" className="text-[8px] font-bold uppercase border-amber-300 text-amber-800 bg-amber-100">{m}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-48 space-y-3 text-center">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-amber-800">
                          <span>Health</span>
                          <span>{completion}%</span>
                       </div>
                       <Progress value={completion} className="h-1.5 bg-amber-200" />
                       <Button 
                        size="sm" 
                        onClick={() => setIsRequestOpen(true)}
                        className="w-full h-9 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-[9px] tracking-widest mt-2"
                      >
                         Notify Resident
                       </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Main Content Tabs */}
              <Tabs defaultValue="identity" className="w-full">
                 <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 h-auto">
                    <TabsTrigger value="identity" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Identification</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Stay History</TabsTrigger>
                    <TabsTrigger value="documents" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Document Vault</TabsTrigger>
                    <TabsTrigger value="guardian" className="rounded-xl py-3 font-semibold text-[10px] uppercase tracking-widest">Emergency</TabsTrigger>
                 </TabsList>

                 <TabsContent value="identity" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Card className="enterprise-card p-8 space-y-6">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 text-foreground"><ShieldCheck className="h-5 w-5 text-primary" /> Credential Sync</h3>
                          <div className="space-y-4">
                             <DetailField label="Government ID Type" value={student.govIdType} />
                             <DetailField label="ID Reference Number" value={student.govIdNumber} />
                             <DetailField label="Nationality" value={student.nationality} />
                             <DetailField label="Permanent Origin" value={student.permanentAddress} />
                          </div>
                       </Card>

                       <Card className="enterprise-card p-8 space-y-6">
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 text-foreground"><Zap className="h-5 w-5 text-primary" /> Regional Logic</h3>
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
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Historical Stay Ledger</span>
                       </div>
                       <div className="divide-y">
                          {student.stayHistory.map(stay => (
                            <div key={stay.id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
                               <div className="flex items-center gap-5">
                                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary">
                                     <Building2 className="h-5 w-5" />
                                  </div>
                                  <div>
                                     <p className="text-sm font-semibold text-foreground uppercase">{stay.propertyName}</p>
                                     <p className="text-[10px] text-muted-foreground font-semibold uppercase">Room {stay.roomNumber}-{stay.bedNumber}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <Badge className={cn("text-[8px] uppercase", stay.status === 'ongoing' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground")}>{stay.status}</Badge>
                                  <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-1">Check-in: {stay.checkInDate}</p>
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
                               <Badge className="text-[8px] font-bold uppercase tracking-widest border">{doc.status}</Badge>
                            </div>
                            <div>
                               <p className="text-xs font-semibold text-foreground uppercase truncate">{doc.name}</p>
                               <p className="text-[9px] text-muted-foreground font-semibold uppercase mt-1">{doc.type.replace('_', ' ')} • {doc.uploadDate}</p>
                            </div>
                            <div className="flex gap-2 mt-auto">
                               <Button variant="outline" size="sm" className="flex-1 h-8 text-[9px] font-semibold uppercase tracking-widest border-2">Preview</Button>
                               <Button variant="outline" size="sm" className="flex-1 h-8 text-[9px] font-semibold uppercase tracking-widest border-2">Replace</Button>
                            </div>
                         </Card>
                       ))}
                       <button className="aspect-square rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-3 text-primary hover:bg-primary/10 transition-all">
                          <Upload className="h-8 w-8" />
                          <span className="text-[10px] font-semibold uppercase tracking-widest">Upload New</span>
                       </button>
                    </div>
                 </TabsContent>

                 <TabsContent value="guardian" className="animate-in fade-in duration-500">
                    <Card className="enterprise-card p-10 space-y-10">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Guardian Node</h4>
                             <div className="space-y-4">
                                <DetailField label="Father's Identity" value={student.fatherName} />
                                <DetailField label="Mother's Identity" value={student.motherName} />
                                <DetailField label="Guardian Phone" value={student.guardianPhone} />
                             </div>
                          </div>
                          <div className="space-y-6">
                             <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Emergency Response</h4>
                             <div className="space-y-4">
                                <DetailField label="Contact Alias" value={student.emergencyName} />
                                <DetailField label="Emergency Phone" value={student.emergencyPhone} />
                                <DetailField label="Relationship" value={student.emergencyRelation} />
                             </div>
                          </div>
                       </div>
                    </Card>
                 </TabsContent>
              </Tabs>
           </div>

           <div className="space-y-8">
              {/* Verification Matrix */}
              <Card className="enterprise-card p-8 space-y-8">
                 <div className="space-y-1">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">Verification Gateway</h3>
                    <p className="text-[11px] text-muted-foreground font-medium">Independent compliance synchronization.</p>
                 </div>

                 <div className="space-y-8">
                    {/* Toggle 1: Government ID */}
                    <div className="flex items-center justify-between gap-6 p-4 bg-muted/20 border-2 border-dashed rounded-2xl">
                       <div className="space-y-1 flex-1">
                          <Label className="text-xs font-semibold uppercase tracking-tight flex items-center gap-2 text-foreground">
                             <ShieldCheck className={cn("h-4 w-4", student.govIdVerified ? "text-emerald-600" : "text-muted-foreground")} />
                             Government ID Verified
                          </Label>
                          <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Identity document checked.</p>
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
                          <Label className="text-xs font-semibold uppercase tracking-tight flex items-center gap-2 text-foreground">
                             <Zap className={cn("h-4 w-4", student.policeVerified ? "text-emerald-600" : "text-muted-foreground")} />
                             Police Verification Done
                          </Label>
                          <p className="text-[9px] text-muted-foreground font-medium uppercase leading-tight">Authority confirmation logged.</p>
                       </div>
                       <Switch 
                         checked={student.policeVerified} 
                         onCheckedChange={() => handleToggle('pol', student.policeVerified)}
                         className="data-[state=checked]:bg-emerald-600"
                       />
                    </div>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-dashed">
                    <h4 className="text-[10px] font-semibold uppercase text-muted-foreground tracking-widest">Metadata Ledger</h4>
                    <div className="space-y-3">
                       <AuditMeta label="Completion" value={`${completion}%`} />
                       <AuditMeta label="ID Verified By" value={student.govIdVerifiedBy || 'Pending'} />
                       <AuditMeta label="Sync Date" value={student.lastUpdated?.split(' ')[0] || 'N/A'} />
                    </div>
                 </div>
              </Card>

              {/* Strategic Insights */}
              <div className="enterprise-card border bg-primary text-primary-foreground p-8 space-y-4 shadow-xl">
                 <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 opacity-80" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Admin Tip</h4>
                 </div>
                 <p className="text-[11px] opacity-90 leading-relaxed font-medium uppercase tracking-tight">
                    Residents with 100% complete dossiers clear police verification 3x faster than partially complete profiles.
                 </p>
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
                 <p className="text-xs font-semibold text-foreground leading-relaxed uppercase">
                    {confirmState 
                      ? `I confirm that the ${confirmType === 'gov' ? 'Government ID' : 'Police Verification'} documentation for ${student.name} has been manually inspected and matches our records.`
                      : `Please provide a reason for reversing the verification status for this resident.`
                    }
                 </p>
              </div>
              {!confirmState && (
                <div className="space-y-2">
                   <Label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground ml-1">Reason for Reversal *</Label>
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
              <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} className="font-semibold uppercase text-[11px] tracking-widest">Cancel</Button>
              <Button onClick={commitVerification} className={cn("h-11 px-8 font-semibold uppercase text-[11px] tracking-widest", confirmState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700")}>
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
          <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
          <p className="text-sm font-semibold text-foreground truncate">{value}</p>
       </div>
    </div>
  );
}

function DetailField({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest opacity-60">{label}</p>
       <p className="text-sm font-semibold text-foreground uppercase">{value}</p>
    </div>
  );
}

function AuditMeta({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground">{label}</span>
       <span className="text-foreground">{value}</span>
    </div>
  );
}
