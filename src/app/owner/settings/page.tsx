'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  User, 
  Briefcase, 
  Wallet, 
  Bell, 
  Shield, 
  Settings as SettingsIcon, 
  FileText,
  UserCircle,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  Upload,
  Eye,
  Trash2,
  Palette,
  Accessibility,
  Monitor,
  Building2,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function SettingsContent() {
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Profile Synchronized", description: "Your property owner credentials have been updated successfully." });
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Asset Configuration</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Manage your professional owner profile, linked bank accounts, and compliance documents.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
          {isSaving ? "Syncing..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 overflow-x-auto">
          <SettingsTabTrigger value="profile" icon={User} label="Profile" />
          <SettingsTabTrigger value="appearance" icon={Palette} label="Theme" />
          <SettingsTabTrigger value="personal" icon={Briefcase} label="Personal" />
          <SettingsTabTrigger value="bank" icon={Wallet} label="Bank" />
          <SettingsTabTrigger value="documents" icon={FileText} label="Assets" />
          <SettingsTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <SettingsTabTrigger value="security" icon={Lock} label="Security" />
          <SettingsTabTrigger value="regional" icon={Globe} label="Regional" />
          <SettingsTabTrigger value="accessibility" icon={Accessibility} label="A11y" />
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <div className="enterprise-card border bg-card p-8">
                    <div className="flex items-center gap-6 mb-10 pb-6 border-b border-dashed">
                      <div className="w-24 h-24 rounded-2xl bg-muted border-2 flex items-center justify-center relative overflow-hidden group">
                         <UserCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-foreground">Vikram Estates Pvt Ltd</h3>
                         <p className="text-[12px] text-primary font-bold uppercase tracking-widest">Certified Property Owner</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SettingsField label="Entity Name" defaultValue="Vikram Estates Pvt Ltd" />
                      <SettingsField label="Primary Email" defaultValue="estates@vikram.in" />
                      <SettingsField label="Contact Phone" defaultValue="+91 98860 12345" />
                      <SettingsField label="Office Address" defaultValue="702, Prestige Tower, Residency Road, Bengaluru" />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <Card className="enterprise-card p-8 space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Compliance Matrix</h4>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-4">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Asset Trust</p>
                          <div className="flex items-center justify-between">
                             <p className="text-3xl font-bold text-foreground">9.8</p>
                             <Badge className="bg-emerald-600 text-white font-bold text-[9px]">EXCELLENT</Badge>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: '98%' }} />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <DetailItem label="Identity Verified" value="Yes" icon={ShieldCheck} color="text-emerald-600" />
                          <DetailItem label="Tax Compliance" value="Clear" icon={CheckCircle2} color="text-emerald-600" />
                          <DetailItem label="Ownership Node" value="Verified" icon={Activity} color="text-primary" />
                       </div>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function OwnerSettingsPage() {
  return (
    <DashboardLayout role="owner">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}

function SettingsTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">{label}</span>
    </TabsTrigger>
  );
}

function SettingsField({ label, value, placeholder, defaultValue, readOnly = false }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{label}</Label>
      <Input defaultValue={defaultValue || value} placeholder={placeholder} readOnly={readOnly} className={cn("h-11 border-2 font-bold", readOnly ? "bg-muted/50 text-muted-foreground" : "bg-background")} />
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-muted-foreground flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
       <span className={cn("font-bold uppercase", color)}>{value}</span>
    </div>
  );
}

function ThemeOption({ label, value, icon: Icon, active = false }: any) {
  return (
    <button className={cn(
      "p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all group",
      active ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/30"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-xl border flex items-center justify-center transition-colors",
        active ? "bg-primary text-white" : "bg-muted group-hover:bg-primary/10"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
