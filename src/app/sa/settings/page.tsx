
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Shield, 
  Bell, 
  Lock, 
  Database, 
  Zap, 
  CreditCard, 
  Mail, 
  Smartphone,
  Save,
  CheckCircle2,
  Trash2,
  RefreshCcw,
  Server,
  User,
  UserCircle,
  Accessibility,
  Palette,
  Eye,
  Search,
  ShieldCheck,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function SettingsContent() {
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Configuration Committed", description: "Global platform settings have been successfully synchronized." });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Platform Settings</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Control platform-wide behavioral policies, infrastructure hooks, and security thresholds.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl">
          {isSaving ? "Syncing..." : <><Save className="h-4 w-4 mr-2" /> Save Global Sync</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-10 overflow-x-auto">
          <SettingsTabTrigger value="account" icon={User} label="Account" />
          <SettingsTabTrigger value="appearance" icon={Palette} label="Appearance" />
          <SettingsTabTrigger value="security" icon={Lock} label="Security" />
          <SettingsTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <SettingsTabTrigger value="privacy" icon={ShieldCheck} label="Privacy" />
          <SettingsTabTrigger value="regional" icon={Globe} label="Regional" />
          <SettingsTabTrigger value="api" icon={Database} label="Infra" />
        </TabsList>

        <TabsContent value="account" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10">
              <div className="flex items-center gap-6 mb-10 pb-6 border-b border-dashed">
                <div className="w-24 h-24 rounded-2xl bg-muted border-2 flex items-center justify-center relative overflow-hidden group">
                   <UserCircle className="h-12 w-12 text-muted-foreground" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                      <span className="text-[9px] font-bold text-white uppercase">Upload</span>
                   </div>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-foreground">Global SuperAdmin</h3>
                   <p className="text-[12px] text-primary font-bold uppercase tracking-widest">Platform Governance Lead</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <SettingsField label="Full Name" defaultValue="Global SuperAdmin" />
                 <SettingsField label="Email Address" defaultValue="super@staysync.com" />
                 <SettingsField label="Emergency Phone" defaultValue="+91 98XXX XXXXX" />
                 <SettingsField label="Admin ID" defaultValue="NODE-SA-001" readOnly />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <h3 className="text-xl font-black uppercase tracking-tight">Interface Personalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ThemeOption label="Light Mode" value="light" active />
              <ThemeOption label="Dark Mode" value="dark" />
              <ThemeOption label="System Sync" value="system" />
            </div>
            <Separator className="border-dashed" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-black uppercase text-foreground">Compact Mode</p>
                <p className="text-[11px] text-muted-foreground">Reduce UI padding for higher information density.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <SettingsField label="Update Password" placeholder="••••••••" type="password" />
                 <SettingsField label="Confirm Password" placeholder="••••••••" type="password" />
              </div>
              <Separator className="border-dashed" />
              <div className="space-y-6">
                 <ToggleRow title="Two-Factor Authentication" description="Enforce mandatory 2FA for this root node." defaultChecked />
                 <ToggleRow title="Session Hardening" description="Auto-expire sessions after 30 minutes of inactivity." />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <div className="space-y-6">
              <ToggleRow title="Email Alerts" description="Receive digests of critical platform activity." defaultChecked />
              <ToggleRow title="Critical SMS" description="Emergency alerts for infrastructure failure." defaultChecked />
              <ToggleRow title="Internal Slack Sync" description="Post system alerts to the #ops-bridge channel." />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <ToggleRow title="Mask Root Email" description="Hide your primary admin email from the team roster." defaultChecked />
              <ToggleRow title="Stealth Login" description="Do not record your login activity in the public audit trail." />
           </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Platform Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-11 border-2 font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="in">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="h-11 border-2 font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">(GMT+05:30) IST</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SAProfileSettingsPage() {
  return (
    <DashboardLayout role="superadmin">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}

function SettingsTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
      <Icon className="h-4 w-4" />
      <span className="hidden lg:inline">{label}</span>
    </TabsTrigger>
  );
}

function SettingsField({ label, value, defaultValue, placeholder, readOnly = false, type = "text" }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</Label>
      <Input type={type} defaultValue={defaultValue || value} placeholder={placeholder} readOnly={readOnly} className={cn("h-11 border-2 font-bold focus-visible:ring-primary", readOnly ? "bg-muted/50 text-muted-foreground" : "bg-background")} />
    </div>
  );
}

function ToggleRow({ title, description, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="space-y-1">
        <p className="text-sm font-black text-foreground uppercase tracking-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground font-medium">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function ThemeOption({ label, value, active = false }: any) {
  return (
    <button className={cn(
      "p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all group",
      active ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/30"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-xl border flex items-center justify-center transition-colors",
        active ? "bg-primary text-white" : "bg-muted group-hover:bg-primary/10"
      )}>
        {value === 'light' ? <Palette className="h-6 w-6" /> : value === 'dark' ? <Shield className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
      </div>
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
