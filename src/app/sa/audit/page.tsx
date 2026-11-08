'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAAuditLogs } from '@/lib/sa-store';
import { AuditLog } from '@/lib/types';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Activity, 
  User, 
  Terminal, 
  Clock, 
  ShieldCheck, 
  Lock,
  Globe,
  Database,
  ArrowRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SAAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = () => setLogs(getSAAuditLogs());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.actor.toLowerCase().includes(search.toLowerCase()) ||
    l.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Immutable Audit Trail</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Cryptographically aware logs of every administrative interaction and system configuration change.</p>
          </div>
          <Button variant="outline" className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest border-2">
            <Download className="h-4 w-4 mr-2" /> Export Audit Log
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AuditStat label="Logged Events (24h)" value={logs.length} icon={Activity} color="text-primary" bg="bg-primary/5" />
           <AuditStat label="Critical Actions" value={logs.filter(l => l.category === 'security').length} icon={ShieldAlert} color="text-red-600" bg="bg-red-50" />
           <AuditStat label="Active Sessions" value="14" icon={Globe} color="text-blue-600" bg="bg-blue-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search audit ledger by actor or event..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> Filter Category</Button>
            </div>
          </div>

          <div className="divide-y">
            {filtered.map(log => (
              <div key={log.id} className="p-6 hover:bg-muted/30 transition-all border-l-4 border-l-transparent hover:border-l-primary flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                <div className="flex gap-6 items-start">
                   <div className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors shadow-sm",
                     log.category === 'security' ? "bg-red-50 border-red-200 text-red-600" : "bg-primary/5 border-primary/20 text-primary"
                   )}>
                     {log.category === 'security' ? <Lock className="h-5 w-5" /> : <Terminal className="h-5 w-5" />}
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                         <h4 className="text-[14px] font-black uppercase tracking-tight text-foreground">{log.action}</h4>
                         <Badge className="bg-muted text-muted-foreground text-[8px] font-black uppercase border-border">{log.category}</Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground leading-tight italic">"{log.details || 'System event recorded without specific metadata.'}"</p>
                      <div className="flex flex-wrap gap-4 pt-1">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5 group-hover:text-primary transition-colors"><User className="h-3 w-3" /> Actor: {log.actor}</span>
                         <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5 group-hover:text-primary transition-colors"><ArrowRight className="h-3 w-3" /> Target: {log.target}</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <Clock className="h-3 w-3" /> {log.timestamp}
                   </div>
                   <span className="text-[9px] font-mono text-muted-foreground/60 bg-muted px-2 py-0.5 rounded uppercase tracking-tighter">Origin: {log.ip}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center opacity-40">
                 <Database className="h-10 w-10 mx-auto mb-4" />
                 <p className="text-[11px] font-black uppercase tracking-widest">Ledger Entry Not Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AuditStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-3xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}