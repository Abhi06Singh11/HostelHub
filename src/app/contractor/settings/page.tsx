'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Settings, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  UserCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Briefcase,
  Palette,
  Accessibility,
  Monitor,
  User,
  Layout,
  Settings as SettingsIcon,
  CheckCircle2,
  FileText,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Operational Configuration</h2>
        <p className="text-[15px] text-muted-foreground font-medium">Manage your professional service profile, notifications, and technical preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 overflow-x-auto">
          <SettingsTabTrigger value="profile" icon={User} label="Profile" />
          <SettingsTabTrigger value="appearance" icon={Palette} label="Theme" />
          <SettingsTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <SettingsTabTrigger value="security" icon={Shield} label="Security" />
          <SettingsTabTrigger value="regional" icon={Globe} label="Regional" />
          <SettingsTabTrigger value="accessibility" icon={Accessibility} label="A11y" />
          <SettingsTabTrigger value="account" icon={SettingsIcon} label="Account" />
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-6">
                <div className="enterprise-card border bg-card">
                  <div className="p-4 border-b bg-muted/20">
                    <span className="text-[12px] font-bold uppercase text-muted-foreground tracking-widest">Business Information</span>
                  </div>
                  <div className="p-8 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-muted border-2 rounded-2xl flex items-center justify-center">
                        <UserCircle className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">John Contractor</h3>
                        <p className="text-[12px] font-bold text-primary tracking-widest uppercase">Master Service Provider</p>
                        <Button size="sm" variant="outline" className="mt-2 text-[11px] font-bold uppercase h-8 border-2">Update Logo</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <ProfileField icon={Briefcase} label="Company Name" value="StaySync Operations Ltd." />
                      <ProfileField icon={Mail} label="Business Email" value="ops@staysync.com" />
                      <ProfileField icon={Phone} label="Primary Contact" value="+91 98765 43210" />
                      <ProfileField icon={MapPin} label="Service Area" value="Bengaluru South & Central" />
                    </div>
                  </div>
                </div>
             </div>

             <div className="space-y-6">
                <Card className="enterprise-card p-8 space-y-6">
                   <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Compliance Pulse</h4>
                   <div className="space-y-6">
                      <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-4">
                         <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Trust Index</p>
                         <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold text-foreground">9.6</p>
                            <Badge className="bg-emerald-600 text-white font-bold text-[9px]">EXCELLENT</Badge>
                         </div>
                         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '96%' }} />
                         </div>
                      </div>
                      <div className="space-y-4">
                         <DetailItem label="Identity Sync" value="Verified" icon={ShieldCheck} color="text-emerald-600" />
                         <DetailItem label="GST Compliance" value="Stable" icon={CheckCircle2} color="text-emerald-600" />
                         <DetailItem label="License Node" value="Active" icon={FileText} color="text-primary" />
                      </div>
                   </div>
                </Card>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <h3 className="text-xl font-bold uppercase tracking-tight">Ops Terminal Theme</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ThemeOption label="Daylight" icon={Layout} value="light" />
              <ThemeOption label="Night Ops" icon={Monitor} value="dark" active />
              <ThemeOption label="System Sync" icon={SettingsIcon} value="system" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ContractorSettingsPage() {
  return (
    <DashboardLayout role="contractor">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}

function SettingsTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">{label}</span>
    </TabsTrigger>
  );
}

function ProfileField({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-sm font-bold text-foreground">{value}</p>
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
