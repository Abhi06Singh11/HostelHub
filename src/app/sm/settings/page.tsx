'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Settings as SettingsIcon, 
  Megaphone, 
  Target, 
  Zap, 
  BarChart, 
  Save, 
  Lock, 
  Smartphone, 
  Globe, 
  Database, 
  Mail, 
  RefreshCcw,
  User,
  UserCircle,
  Palette,
  Accessibility,
  Bell,
  Monitor,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

function SettingsContent() {
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('pixels');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Preferences Updated", description: "Marketing engine configuration has been synchronized." });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Marketing Config</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Manage campaign pixel tracking, lead distribution policies, and promotional tool access.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl">
          {isSaving ? "Syncing..." : <><Save className="h-4 w-4 mr-2" /> Commit Workspace Sync</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-10 overflow-x-auto">
          <MarketerTabTrigger value="profile" icon={User} label="Profile" />
          <MarketerTabTrigger value="appearance" icon={Palette} label="Appearance" />
          <MarketerTabTrigger value="pixels" icon={Target} label="Tracking" />
          <MarketerTabTrigger value="distribution" icon={Zap} label="Leads" />
          <MarketerTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <MarketerTabTrigger value="regional" icon={Globe} label="Region" />
          <MarketerTabTrigger value="accessibility" icon={Accessibility} label="A11y" />
          <MarketerTabTrigger value="maintenance" icon={SettingsIcon} label="Account" />
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
                   <h3 className="text-xl font-bold text-foreground">Marketing Mike</h3>
                   <p className="text-[12px] text-primary font-bold uppercase tracking-widest">Growth Operations Specialist</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <SettingsField label="Full Name" defaultValue="Marketing Mike" />
                 <SettingsField label="Work Email" defaultValue="mike.m@staysync.com" />
                 <SettingsField label="Marketer ID" defaultValue="MKT-8821" readOnly />
                 <SettingsField label="Growth Goal" defaultValue="1.2k Leads/Month" />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <h3 className="text-xl font-black uppercase tracking-tight">Growth Dashboard GUI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ThemeOption label="Light Canvas" icon={Layout} value="light" />
              <ThemeOption label="Night Mode" icon={Monitor} value="dark" active />
              <ThemeOption label="Default Logic" icon={SettingsIcon} value="system" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pixels" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="flex justify-between items-center">
                 <div className="space-y-1">
                    <h4 className="text-sm font-black uppercase text-foreground">Global Tracking Pixels</h4>
                    <p className="text-[11px] text-muted-foreground">Pixel IDs for automated remarketing and attribution.</p>
                 </div>
                 <Button variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest border-2"><RefreshCcw className="h-3 w-3 mr-2" /> Verify Pixels</Button>
              </div>
              <div className="space-y-6">
                 <SettingsField label="Meta Pixel ID" defaultValue="PIXEL-8492-XXX" />
                 <SettingsField label="Google Analytics G4" defaultValue="G-XXXXXXXXX" />
                 <SettingsField label="TikTok Event ID" defaultValue="TT-XXX-XXX" />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-8 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <ToggleRow title="Auto-Distribute Leads" description="Instantly assign incoming leads to active contractors in the region." defaultChecked />
              <Separator className="border-dashed" />
              <ToggleRow title="Enable AI Matchmaking" description="Allow the system to suggest the best hostel based on lead profile automatically." defaultChecked />
              <Separator className="border-dashed" />
              <ToggleRow title="Priority Agent Routing" description="Route premium leads directly to Level 2 agents." />
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SuperMarketerSettingsPage() {
  return (
    <DashboardLayout role="supermarketer">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </DashboardLayout>
  );
}

function MarketerTabTrigger({ value, icon: Icon, label }: any) {
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
