
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Terminal, 
  Shield, 
  Cpu, 
  Database, 
  Lock, 
  Save, 
  RefreshCcw,
  Zap,
  Globe,
  Settings as SettingsIcon,
  Server,
  User,
  UserCircle,
  Palette,
  Monitor,
  Accessibility,
  Bell,
  Mail
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
  const [activeTab, setActiveTab] = useState('access');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Environment Updated", description: "Node configuration has been successfully deployed." });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Dev Environment</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Manage your technical cluster access, API keys, and deployment thresholds.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl">
          {isSaving ? "Deploying..." : <><Save className="h-4 w-4 mr-2" /> Commit Node Configuration</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-10 overflow-x-auto">
          <DevTabTrigger value="profile" icon={User} label="Profile" />
          <DevTabTrigger value="appearance" icon={Palette} label="Appearance" />
          <DevTabTrigger value="access" icon={Lock} label="Access" />
          <DevTabTrigger value="api" icon={Database} label="Keys" />
          <DevTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <DevTabTrigger value="regional" icon={Globe} label="Regional" />
          <DevTabTrigger value="performance" icon={Zap} label="Thresholds" />
          <DevTabTrigger value="accessibility" icon={Accessibility} label="A11y" />
          <DevTabTrigger value="maintenance" icon={Server} label="Kernel" />
        </TabsList>

        <TabsContent value="profile" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10">
              <div className="flex items-center gap-6 mb-10 pb-6 border-b border-dashed">
                <div className="w-24 h-24 rounded-2xl bg-muted border-2 flex items-center justify-center relative overflow-hidden group">
                   <UserCircle className="h-12 w-12 text-muted-foreground" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                      <span className="text-[9px] font-bold text-white uppercase">Upload</span>
                   </div>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-foreground">Sarah Developer</h3>
                   <p className="text-[12px] text-primary font-bold uppercase tracking-widest">Lead Infrastructure Engineer</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <SettingsField label="Full Name" defaultValue="Sarah Developer" />
                 <SettingsField label="Professional Email" defaultValue="sarah.dev@staysync.com" />
                 <SettingsField label="Technical ID" defaultValue="NODE-DEV-4829" readOnly />
                 <SettingsField label="Assigned Cluster" defaultValue="Asia-South1 (Primary)" readOnly />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <h3 className="text-xl font-black uppercase tracking-tight">Technical GUI Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ThemeOption label="Light Terminal" icon={Terminal} value="light" />
              <ThemeOption label="Dark IDE" icon={Shield} value="dark" active />
              <ThemeOption label="Kernel Default" icon={Monitor} value="system" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <SettingsField label="Technical ID" defaultValue="NODE-DEV-4829" readOnly />
                 <SettingsField label="Assigned Cluster" defaultValue="Asia-South1 (Primary)" readOnly />
                 <SettingsField label="Auth Level" defaultValue="L3 - Core Infrastructure" readOnly />
                 <SettingsField label="Last Key Rotation" defaultValue="May 15, 2024" readOnly />
              </div>
              <Separator className="border-dashed" />
              <div className="space-y-6">
                 <ToggleRow title="Force Debug Headers" description="Attach platform trace IDs to every outgoing API response." defaultChecked />
                 <ToggleRow title="Kernel Surveillance" description="Record high-resolution performance metrics for this node." />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-8">
              <div className="flex justify-between items-center">
                 <h4 className="text-sm font-black uppercase text-foreground">Cluster Integration Keys</h4>
                 <Button variant="outline" className="h-8 text-[9px] font-black uppercase border-2"><RefreshCcw className="h-3 w-3 mr-2" /> Rotate Cluster Keys</Button>
              </div>
              <div className="space-y-4">
                 <KeyRow label="Primary Gateway Secret" value="sk_test" />
                 <KeyRow label="Storage Mesh Token" value="mesh_ak_XXXXXXXXXXXXXX" />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <ToggleRow title="CI/CD Status Alerts" description="Notify via Slack/Email on build success or failure." defaultChecked />
            <Separator className="border-dashed" />
            <ToggleRow title="Metric Threshold Alerts" description="Alert when CPU/RAM usage exceeds 85%." defaultChecked />
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Local SDK Region</Label>
                <Select defaultValue="asia">
                  <SelectTrigger className="h-11 border-2 font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia">Asia-South1</SelectItem>
                    <SelectItem value="us">US-East1</SelectItem>
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

export default function SuperDevSettingsPage() {
  return (
    <DashboardLayout role="superdev">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}

function DevTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger value={value} className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
      <Icon className="h-4 w-4" />
      <span className="hidden lg:inline">{label}</span>
    </TabsTrigger>
  );
}

function SettingsField({ label, value, defaultValue, readOnly = false }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</Label>
      <Input defaultValue={defaultValue || value} readOnly={readOnly} className={cn("h-11 border-2 font-bold focus-visible:ring-primary", readOnly ? "bg-muted/50 text-muted-foreground" : "bg-background")} />
    </div>
  );
}

function ToggleRow({ title, description, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="space-y-1">
        <p className="text-sm font-black text-foreground uppercase tracking-tight">{title}</p>
        <p className={cn("text-[11px] text-muted-foreground font-medium")}>{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function KeyRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/20 border border-dashed rounded-xl group hover:border-primary transition-all">
       <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
          <p className="text-xs font-mono font-bold text-foreground opacity-60 group-hover:opacity-100 transition-opacity">{value}</p>
       </div>
       <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><Lock className="h-4 w-4" /></Button>
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
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
