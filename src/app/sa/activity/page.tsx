'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAAuditLogs } from '@/lib/sa-store';
import { AuditLog } from '@/lib/types';
import { 
  Activity, 
  Search, 
  Filter, 
  Terminal, 
  User, 
  Clock, 
  ArrowRight,
  Database,
  Globe,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SAActivityMonitorPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLogs(getSAAuditLogs());
  }, []);

  const filtered = logs.filter(l => 
    l.actor.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Activity Monitor</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Real-time surveillance of platform-wide user interactions, login cycles, and system-level events.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <MonitorStat label="Active Sessions" value="24" icon={Globe} color="text-primary" bg="bg-primary/5" />
           <MonitorStat label="Log Ingestion" value="1.2k/hr" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
           <MonitorStat label="Infrastructure" value="Stable" icon={ShieldCheck} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search real-time event stream..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filtered.map(log => (
              <div key={log.id} className="p-5 flex items-start gap-5 hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                 <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-primary shrink-0">
                    <Terminal className="h-4 w-4" />
                 </div>
                 <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                       <h4 className="text-sm font-black uppercase text-foreground group-hover:text-primary transition-colors">{log.action}</h4>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><Clock className="h-3 w-3" /> {log.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium italic">"{log.details}"</p>
                    <div className="flex items-center gap-4 pt-2">
                       <span className="text-[9px] font-black uppercase text-muted-foreground/60 flex items-center gap-1.5"><User className="h-3 w-3" /> {log.actor}</span>
                       <span className="text-[9px] font-black uppercase text-muted-foreground/60 flex items-center gap-1.5"><ArrowRight className="h-3 w-3" /> {log.target}</span>
                       <Badge variant="outline" className="text-[7px] font-black uppercase py-0 border-border">{log.category}</Badge>
                    </div>
                 </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center opacity-40">
                 <Database className="h-10 w-10 mx-auto mb-4" />
                 <p className="text-[11px] font-black uppercase tracking-widest">Stream Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MonitorStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}