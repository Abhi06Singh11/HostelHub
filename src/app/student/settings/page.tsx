
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  Settings as SettingsIcon, 
  Save, 
  Lock,
  MessageSquare,
  History,
  Eye,
  UserCircle,
  CheckCircle2,
  Palette,
  Accessibility,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Preferences Updated", description: "Your workspace configuration has been synchronized." });
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Workspace Config</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Manage notifications, language, and security preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
          {isSaving ? "Syncing..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto bg-muted/30 p-1.5 rounded-2xl border-2 mb-8 overflow-x-auto">
          <SettingsTabTrigger value="profile" icon={User} label="Profile" />
          <SettingsTabTrigger value="appearance" icon={Palette} label="Theme" />
          <SettingsTabTrigger value="notifications" icon={Bell} label="Alerts" />
          <SettingsTabTrigger value="security" icon={Lock} label="Security" />
          <SettingsTabTrigger value="regional" icon={Globe} label="Region" />
          <SettingsTabTrigger value="accessibility" icon={Accessibility} label="A11y" />
          <SettingsTabTrigger value="account" icon={SettingsIcon} label="Account" />
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-8 text-center flex flex-col items-center">
              <UserCircle className="h-24 w-24 text-muted-foreground opacity-20" />
              <div className="space-y-2">
                 <h3 className="text-xl font-bold uppercase">Resident Identification</h3>
                 <p className="text-sm text-muted-foreground max-w-sm">Complete your student profile to access all premium hostel facilities and digital amenities.</p>
              </div>
              <Button onClick={() => router.push('/student/profile')} className="h-12 px-10 font-black uppercase text-[11px] tracking-widest shadow-xl">
                 Go to Verified Profile <History className="ml-2 h-4 w-4" />
              </Button>
           </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-8 animate-in fade-in duration-500">
          <div className="enterprise-card border bg-card p-10 space-y-10">
            <h3 className="text-xl font-black uppercase tracking-tight">Resident UI Themes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ThemeOption label="Daylight" icon={Palette} value="light" active />
              <ThemeOption label="Night Study" icon={Monitor} value="dark" />
              <ThemeOption label="Automatic" icon={SettingsIcon} value="system" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h4 className="text-[12px] font-bold uppercase text-foreground border-b border-dashed pb-2">Operational Alerts</h4>
                    <ToggleRow title="Rent Reminders" description="SMS/Email 3 days before rent due date." defaultChecked />
                    <ToggleRow title="Payment Success" description="Receive instant digital receipts via WhatsApp." defaultChecked />
                    <ToggleRow title="Complaint Status" description="Get notified when a contractor replies to your ticket." defaultChecked />
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-[12px] font-bold uppercase text-foreground border-b border-dashed pb-2">Hostel Updates</h4>
                    <ToggleRow title="Announcements" description="Notifications about mess menu or facility maintenance." defaultChecked />
                    <ToggleRow title="Community Alerts" description="Messages from the property warden regarding events." />
                 </div>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 animate-in fade-in duration-500">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="max-w-md space-y-8">
                 <div className="space-y-6">
                    <h4 className="text-[12px] font-bold uppercase text-foreground">Update Password</h4>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Current Password</Label>
                          <Input type="password" underline className="h-11 border-2 rounded-xl" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">New Password</Label>
                          <Input type="password" underline className="h-11 border-2 rounded-xl" />
                       </div>
                       <Button variant="outline" className="h-10 text-[10px] font-bold uppercase tracking-widest w-full">Change Password</Button>
                    </div>
                 </div>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function StudentSettingsPage() {
  return (
    <DashboardLayout role="student">
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

function ToggleRow({ title, description, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground leading-none">{title}</p>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{description}</p>
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
