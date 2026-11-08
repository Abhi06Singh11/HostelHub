'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentProfile } from '@/lib/student-store';
import { StudentProfile } from '@/lib/types';
import { 
  Home, 
  MapPin, 
  Users, 
  Zap, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  Info,
  Calendar,
  Building2,
  Wind,
  Wifi,
  Trash2,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function StudentRoomPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setProfile(getStudentProfile());
  }, []);

  if (!profile) return null;

  const facilities = ['Wi-Fi Enabled', 'Attached Bathroom', 'Power Backup', 'Biometric Entry', 'Daily Housekeeping'];

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Accommodation Intelligence</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Verify your assigned inventory and property operational details.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[12px] uppercase tracking-widest border-2">
                <Info className="h-4 w-4 mr-2" /> Room T&C
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Core Room Card */}
              <div className="enterprise-card border bg-card p-10 space-y-10">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                       <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                          <Home className="h-8 w-8" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assigned Unit</p>
                          <h3 className="text-3xl font-bold text-foreground">Room {profile.roomNumber}</h3>
                          <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">Bed {profile.bedNumber} • Double Sharing</p>
                       </div>
                    </div>
                    <Badge className="bg-emerald-600 text-white font-black px-4 py-1.5 uppercase text-[10px] tracking-widest">Active Stay</Badge>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-dashed">
                    <DetailStat label="Hostel" value={profile.assignedHostelName} />
                    <DetailStat label="Floor" value="3rd Floor" />
                    <DetailStat label="Check In" value={profile.moveInDate} />
                    <DetailStat label="Agreement" value="11 Months" />
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Provisioned Inventory</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                       {facilities.map(f => (
                         <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border shadow-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span className="text-[11px] font-bold uppercase text-foreground">{f}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Roommates */}
              <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/20">
                  <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Room Directory</span>
                </div>
                <div className="divide-y">
                   <RoommateRow name="You" bed="Bed A" status="Active" isYou />
                   <RoommateRow name="Rohan Das" bed="Bed B" status="Active" />
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Support Contacts</h4>
                    <div className="space-y-6">
                       <ContactPoint role="Hostel Contractor" name="StaySync Ops" phone="+91 98765 43210" />
                       <ContactPoint role="Admission Agent" name="Global Admissions" phone="+91 99887 76655" />
                    </div>
                 </div>
                 <PhoneCall className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
              </div>

              <div className="enterprise-card border bg-card p-6 space-y-6">
                 <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground">Unit Amenities</h4>
                 </div>
                 <div className="space-y-4">
                    <UtilityIcon icon={Wifi} label="Gigabit Wi-Fi" value="Connected" />
                    <UtilityIcon icon={Wind} label="AC Unit" value="Service Ready" />
                    <UtilityIcon icon={Trash2} label="Waste Collect" value="9:00 AM Daily" />
                    <UtilityIcon icon={Utensils} label="Mess Service" value="3 Meals/Day" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DetailStat({ label, value }: any) {
  return (
    <div className="space-y-1">
       <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">{label}</p>
       <p className="text-sm font-bold text-foreground uppercase">{value}</p>
    </div>
  );
}

function RoommateRow({ name, bed, status, isYou = false }: any) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-muted/20 transition-colors">
       <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm", isYou ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
             {name.charAt(0)}
          </div>
          <div>
             <p className={cn("text-sm font-bold", isYou ? "text-primary" : "text-foreground")}>{name} {isYou && "(You)"}</p>
             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{bed}</p>
          </div>
       </div>
       <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-bold uppercase">{status}</Badge>
    </div>
  );
}

function ContactPoint({ role, name, phone }: any) {
  return (
    <div className="space-y-2">
       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{role}</p>
       <div className="flex justify-between items-center">
          <div>
             <p className="text-sm font-bold text-white uppercase">{name}</p>
             <p className="text-xs text-primary font-bold">{phone}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-white/10">
             <PhoneCall className="h-4 w-4" />
          </Button>
       </div>
    </div>
  );
}

function UtilityIcon({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted border border-border">
             <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-[11px] font-bold uppercase text-foreground">{label}</span>
       </div>
       <span className="text-[10px] font-bold text-emerald-600 uppercase">{value}</span>
    </div>
  );
}
