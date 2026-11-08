'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getOwnerProperties, getOwnerAgreements, getOwnerFinancials, deleteOwnerProperty } from '@/lib/owner-store';
import { Property, RentalAgreement, FinancialTransaction } from '@/lib/types';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Layers, 
  Bed, 
  ShieldCheck, 
  Camera, 
  FileText, 
  History, 
  Settings, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Plus,
  Wrench,
  Clock,
  User,
  Phone,
  Mail,
  Zap,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [agreement, setAgreement] = useState<RentalAgreement | null>(null);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);

  useEffect(() => {
    const props = getOwnerProperties();
    const found = props.find(p => p.id === id);
    if (found) {
      setProperty(found);
      const agrs = getOwnerAgreements();
      setAgreement(agrs.find(a => a.propertyId === id) || null);
      const fins = getOwnerFinancials();
      setTransactions(fins.filter(f => f.propertyId === id));
    }
  }, [id]);

  if (!property) return null;

  const handleDelete = () => {
    deleteOwnerProperty(id as string);
    toast({ title: "Property Removed", description: "The asset has been deleted from your portfolio." });
    router.push('/owner/properties');
  };

  const coverImage = property.images?.find(img => img.category === 'cover')?.url || 'https://picsum.photos/seed/prop/1200/400';

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push('/owner/properties')} className="font-bold uppercase text-[11px] tracking-widest h-10 px-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Estate
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push(`/owner/properties/${id}/edit`)} className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                <Settings className="h-4 w-4 mr-2" /> Edit Property
             </Button>
             <Button className="h-10 font-bold uppercase text-[11px] tracking-widest shadow-md">
                <ExternalLink className="h-4 w-4 mr-2" /> Preview Profile
             </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-card shadow-2xl group">
           <img src={coverImage} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Badge className={cn(
                      "font-black uppercase tracking-widest text-[10px] py-1 px-4",
                      property.status === 'rented' ? "bg-emerald-500 text-white" : "bg-primary text-white"
                    )}>{property.status}</Badge>
                    <Badge variant="outline" className="border-white/50 text-white font-bold uppercase text-[10px] py-1 px-4 backdrop-blur-md">{property.type}</Badge>
                 </div>
                 <h1 className="text-5xl font-black text-white tracking-tighter uppercase">{property.name}</h1>
                 <p className="text-white/80 font-medium flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-primary" /> {property.address}</p>
              </div>
           </div>
           <Button className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 shadow-xl" size="icon">
              <Camera className="h-6 w-6" />
           </Button>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 overflow-x-auto">
            <PropTabTrigger value="overview" icon={Info} label="Overview" />
            <PropTabTrigger value="gallery" icon={Camera} label="Gallery" />
            <PropTabTrigger value="building" icon={Building2} label="Building" />
            <PropTabTrigger value="amenities" icon={Zap} label="Amenities" />
            <PropTabTrigger value="documents" icon={FileText} label="Documents" />
            <PropTabTrigger value="rental" icon={Clock} label="Rental" />
            <PropTabTrigger value="settings" icon={Settings} label="Settings" />
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                   <div className="enterprise-card border bg-card p-10 space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Property Narrative</h3>
                      <p className="text-muted-foreground leading-relaxed font-medium text-lg italic border-l-4 border-primary pl-6">
                        "{property.description || 'No description available for this property asset.'}"
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
                         <DetailStat icon={Layers} label="Total Floors" value={property.totalFloors} />
                         <DetailStat icon={ShieldCheck} label="Room Count" value={property.totalRooms} />
                         <DetailStat icon={Bed} label="Bed Capacity" value={property.totalBeds} />
                         <DetailStat icon={CheckCircle2} label="Condition" value={property.condition} />
                      </div>
                   </div>

                   <div className="enterprise-card border bg-card p-10 space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Amenity Infrastructure</h3>
                      <div className="flex flex-wrap gap-3">
                         {property.amenities.map(a => (
                           <span key={a} className="px-5 py-2.5 rounded-xl bg-primary/5 text-primary font-bold uppercase text-[11px] tracking-widest border border-primary/20 shadow-sm">
                             {a}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
                      <div className="relative z-10 space-y-6">
                         <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Financial Summary</h4>
                         <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <p className="text-[10px] font-bold uppercase text-slate-400">Accrued Rent (MTD)</p>
                               <p className="text-2xl font-black text-emerald-400">₹{agreement?.monthlyRent.toLocaleString() || '0'}</p>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <p className="text-[10px] font-bold uppercase text-slate-400">Security Deposit</p>
                               <p className="text-xl font-black">₹{agreement?.securityDeposit.toLocaleString() || '0'}</p>
                            </div>
                         </div>
                         <Button className="w-full h-12 font-black uppercase text-[11px] tracking-widest bg-primary hover:bg-primary/90">Download Ledger</Button>
                      </div>
                      <Clock className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
                   </div>

                   <div className="enterprise-card border bg-card p-8 space-y-6">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contractor Partner</h4>
                      {agreement ? (
                        <div className="space-y-4">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                 {agreement.contractorName.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-foreground">{agreement.contractorName}</p>
                                 <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Operator</p>
                              </div>
                           </div>
                           <Separator className="bg-transparent border-t border-dashed" />
                           <div className="space-y-3">
                              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                 <Phone className="h-4 w-4" />
                                 <span className="text-xs font-bold uppercase">+91 98765 43210</span>
                              </div>
                              <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                 <Mail className="h-4 w-4" />
                                 <span className="text-xs font-bold uppercase">ops@staysync.in</span>
                              </div>
                           </div>
                        </div>
                      ) : (
                        <div className="py-6 text-center border-2 border-dashed rounded-xl opacity-50">
                           <p className="text-[10px] font-bold uppercase">No Active Agreement</p>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-8 animate-in fade-in duration-500">
             <div className="enterprise-card border bg-card p-10">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-xl font-black uppercase tracking-tight">Visual Repository</h3>
                   <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                      <Camera className="h-4 w-4 mr-2" /> Upload Photos
                   </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {property.images?.map((img, idx) => (
                     <div key={img.id} className="group relative aspect-video rounded-2xl overflow-hidden border-2 shadow-sm cursor-zoom-in">
                        <img src={img.url} alt={`Property ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <Badge className="bg-white/20 backdrop-blur-md text-white font-bold uppercase text-[9px] tracking-widest">{img.category}</Badge>
                        </div>
                     </div>
                   ))}
                   <button className="aspect-video rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-3 bg-primary/5 hover:bg-primary/10 transition-colors text-primary">
                      <Plus className="h-8 w-8" />
                      <span className="text-[11px] font-black uppercase tracking-widest">Add Category</span>
                   </button>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="building" className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="enterprise-card border bg-card p-10 space-y-8">
                   <h3 className="text-xl font-black uppercase tracking-tight">Structural Integrity</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <PropField label="Construction Year" value={property.constructionYear || 'N/A'} />
                      <PropField label="Building Type" value={property.type} />
                      <PropField label="Floors Above Grade" value={property.totalFloors} />
                      <PropField label="Furnishing State" value={property.furnishingStatus || 'Unfurnished'} />
                      <PropField label="Total Unit Count" value={property.totalRooms} />
                      <PropField label="Compliance Status" value="Certified Level A" highlight />
                   </div>
                </div>
                <div className="enterprise-card border bg-card p-10 space-y-8">
                   <h3 className="text-xl font-black uppercase tracking-tight">Utility Infrastructure</h3>
                   <div className="space-y-6">
                      <UtilityRow label="Electrical Grid" status="Stable" detail="3-Phase Industrial Connection" />
                      <UtilityRow label="Water Supply" status="Redundant" detail="Municipal + Borewell System" />
                      <UtilityRow label="Internet Fiber" status="Gigabit" detail="Dual ISP Load Balancing" />
                      <UtilityRow label="Fire Suppression" status="Active" detail="Sprinkler + Hydrant System" />
                   </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-8 animate-in fade-in duration-500">
             <div className="enterprise-card border bg-card p-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-10">Provisioned Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                   {['WiFi', 'AC', 'Elevator', 'Security', 'Laundry', 'Parking', 'Kitchen', 'Gym', 'Power Backup', 'Housekeeping'].map(feat => (
                     <div key={feat} className={cn(
                       "p-6 rounded-2xl border-2 flex flex-col items-center gap-4 text-center transition-all",
                       property.amenities.includes(feat) ? "bg-primary/5 border-primary/30 text-primary shadow-sm" : "bg-muted/10 border-transparent opacity-30"
                     )}>
                        <div className="p-3 rounded-xl bg-card border shadow-inner">
                           <Zap className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest">{feat}</span>
                     </div>
                   ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-8 animate-in fade-in duration-500">
             <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-8 border-b bg-muted/20 flex items-center justify-between">
                   <h3 className="text-xl font-black uppercase tracking-tight">Legal Repository</h3>
                   <Button variant="outline" className="h-10 font-bold uppercase text-[11px] tracking-widest border-2">
                      <Plus className="h-4 w-4 mr-2" /> Upload Cert
                   </Button>
                </div>
                <div className="divide-y">
                   {property.documents?.map(doc => (
                     <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-5">
                           <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 group-hover:bg-primary/10 transition-colors">
                              <FileText className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-foreground">{doc.name}</p>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Format: {doc.type} • Verified</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-primary"><ExternalLink className="h-4 w-4" /></Button>
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                     </div>
                   ))}
                   {!property.documents?.length && (
                     <div className="py-20 text-center opacity-40">
                        <FileText className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-[11px] font-black uppercase tracking-widest">No documentation found.</p>
                     </div>
                   )}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="rental" className="space-y-8 animate-in fade-in duration-500">
             {agreement ? (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <div className="enterprise-card border bg-card p-10 space-y-10">
                        <div className="flex justify-between items-center">
                           <h3 className="text-xl font-black uppercase tracking-tight">Active Lease Configuration</h3>
                           <Badge className="bg-emerald-600 text-white font-black px-4 py-1.5 uppercase text-[10px] tracking-widest">{agreement.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                           <PropField label="Monthly Accrual" value={`₹${agreement.monthlyRent.toLocaleString()}`} highlight />
                           <PropField label="Term Commencement" value={agreement.startDate} />
                           <PropField label="Maturity Date" value={agreement.endDate} />
                           <PropField label="Security Threshold" value={`₹${agreement.securityDeposit.toLocaleString()}`} />
                           <PropField label="Remittance Frequency" value={agreement.paymentFrequency} />
                           <PropField label="Grace Period" value={`${agreement.rentDueDate} Days`} />
                        </div>
                     </div>

                     <div className="enterprise-card border bg-card overflow-hidden">
                        <div className="p-8 border-b bg-muted/20">
                           <h3 className="text-xl font-black uppercase tracking-tight">Remittance Audit</h3>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left">
                              <thead>
                                 <tr className="bg-muted/10 border-b">
                                    <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Period / ID</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Value</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Verification</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y">
                                 {transactions.slice(0, 5).map(tx => (
                                   <tr key={tx.id} className="hover:bg-muted/20 transition-colors">
                                      <td className="py-5 px-6">
                                         <p className="text-sm font-bold text-foreground">{tx.description}</p>
                                         <p className="text-[10px] font-black text-muted-foreground uppercase">{tx.date}</p>
                                      </td>
                                      <td className="py-5 px-6">
                                         <p className="text-sm font-black text-emerald-600">₹{tx.amount.toLocaleString()}</p>
                                      </td>
                                      <td className="py-5 px-6 text-right">
                                         <Badge className="bg-primary/10 text-primary font-black uppercase text-[9px] tracking-[0.2em]">{tx.status}</Badge>
                                      </td>
                                   </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="enterprise-card border bg-card p-8 space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Partner Intelligence</h4>
                        <div className="space-y-6">
                           <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                              <p className="text-[10px] font-black uppercase text-primary tracking-widest">Tenant Trust Score</p>
                              <div className="flex items-center justify-between">
                                 <p className="text-3xl font-black text-foreground">9.8</p>
                                 <Badge className="bg-emerald-600 text-white font-black">EXCELLENT</Badge>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-primary" style={{ width: '98%' }} />
                              </div>
                           </div>
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Recent Milestone</p>
                              <div className="flex items-start gap-3">
                                 <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                                 <p className="text-xs font-bold text-foreground">Contract renewed for 24 months with 8% escalation clause.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="py-32 text-center enterprise-card border bg-card max-w-xl mx-auto space-y-6">
                  <Clock className="h-16 w-16 mx-auto text-primary opacity-20" />
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black tracking-tighter uppercase">Vacant Asset</h3>
                     <p className="text-muted-foreground font-medium">This building is currently not associated with an active lease agreement.</p>
                  </div>
                  <Button className="h-11 px-8 font-black uppercase text-[11px] tracking-widest">Initialize Lease</Button>
               </div>
             )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-8 animate-in fade-in duration-500">
             <div className="max-w-2xl mx-auto space-y-8">
                <div className="enterprise-card border bg-card p-10 space-y-8">
                   <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Critical Operations</h3>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl border-2 border-dashed">
                         <div>
                            <p className="text-sm font-black uppercase tracking-widest text-foreground">Asset Visibility</p>
                            <p className="text-[11px] font-bold text-muted-foreground uppercase">Enable this property to be seen by prospective contractors.</p>
                         </div>
                         <div className="h-6 w-11 bg-primary rounded-full relative p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full absolute right-1" />
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl border-2 border-dashed">
                         <div>
                            <p className="text-sm font-black uppercase tracking-widest text-foreground">Deactivate Asset</p>
                            <p className="text-[11px] font-bold text-muted-foreground uppercase">Mark this property as temporarily inactive for all operations.</p>
                         </div>
                         <Button variant="outline" className="h-10 font-bold uppercase text-[10px] tracking-widest border-2">Suspend</Button>
                      </div>
                   </div>
                </div>

                <div className="enterprise-card border bg-destructive/5 border-destructive/20 p-10 space-y-8">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tight text-destructive">Termination Protocol</h3>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase">Permanently remove this property and all associated metadata from the global ledger.</p>
                   </div>
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="h-12 w-full font-black uppercase text-[11px] tracking-[0.2em] shadow-lg">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Building Asset
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl border-2">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">Irreversible Action</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm font-bold uppercase tracking-widest">
                          This will terminate the digital footprint of {property.name}. This action cannot be rescinded.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="rounded-xl font-bold uppercase text-[11px] tracking-widest">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 rounded-xl font-bold uppercase text-[11px] tracking-widest">Terminate</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function PropTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all">
      <Icon className="h-4 w-4" />
      <span className="hidden lg:inline">{label}</span>
    </TabsTrigger>
  );
}

function DetailStat({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em] flex items-center gap-1.5"><Icon className="h-3 w-3" /> {label}</p>
       <p className="text-lg font-black text-foreground">{value}</p>
    </div>
  );
}

function PropField({ label, value, highlight = false }: any) {
  return (
    <div className="space-y-1.5">
       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
       <p className={cn("text-base font-bold", highlight ? "text-primary text-xl font-black" : "text-foreground")}>{value}</p>
    </div>
  );
}

function UtilityRow({ label, status, detail }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-muted/10 rounded-2xl border border-dashed border-border/50">
       <div className="space-y-1">
          <p className="text-sm font-bold text-foreground leading-none">{label}</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase">{detail}</p>
       </div>
       <Badge className="bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1">{status}</Badge>
    </div>
  );
}
