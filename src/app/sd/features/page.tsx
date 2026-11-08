'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDFeatures, toggleFeatureFlag } from '@/lib/sd-store';
import { FeatureFlag } from '@/lib/types';
import { 
  Flag, 
  Plus, 
  MoreVertical, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Settings,
  Search,
  Filter,
  RefreshCcw,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export default function SuperDevFeaturesPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    setFlags(getSDFeatures());
  }, []);

  const handleToggle = (id: string, name: string) => {
    toggleFeatureFlag(id);
    setFlags(getSDFeatures());
    toast({ title: "Feature Updated", description: `${name} flag state has been toggled across the platform.` });
  };

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Feature Control</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate platform-wide feature rollouts, manage beta cohorts, and toggle critical application capabilities.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Define New Flag
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FeatureStat label="Active Flags" value={flags.filter(f => f.status === 'active').length} icon={Zap} color="text-primary" bg="bg-primary/5" />
           <FeatureStat label="Beta Rollouts" value={flags.filter(f => f.status === 'beta').length} icon={Activity} color="text-blue-600" bg="bg-blue-50" />
           <FeatureStat label="System Safety" value="100%" icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flags.map(flag => (
            <div key={flag.id} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{flag.name}</h3>
                        <Badge variant="outline" className={cn(
                          "text-[8px] font-black uppercase py-0 border-primary/30",
                          flag.status === 'active' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                        )}>{flag.status}</Badge>
                     </div>
                     <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Key: {flag.key}</p>
                  </div>
                  <Switch 
                    checked={flag.status === 'active' || flag.status === 'beta'} 
                    onCheckedChange={() => handleToggle(flag.id, flag.name)}
                  />
               </div>
               
               <div className="bg-muted/20 p-5 rounded-2xl border-2 border-dashed mb-8 flex-1">
                  <p className="text-sm font-medium text-foreground leading-relaxed italic">"{flag.description}"</p>
               </div>

               <div className="space-y-4 pt-4 border-t border-dashed">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Rollout Velocity</span>
                     <span className="text-[10px] font-black text-primary">{flag.rolloutPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: `${flag.rolloutPercentage}%` }} />
                  </div>
                  <div className="flex justify-between pt-2">
                     <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest"><Settings className="h-3 w-3 mr-2" /> Config</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest"><BarChart className="h-3 w-3 mr-2" /> Analytics</Button>
                     </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function FeatureStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tighter tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
