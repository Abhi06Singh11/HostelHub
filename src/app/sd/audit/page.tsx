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
  Terminal, 
  Clock, 
  ShieldCheck, 
  Lock,
  Database,
  ArrowRight,
  Download,
  Code2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SuperDevAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // For technical audit, we filter global logs for settings/security/dev actions
    const allLogs = getSAAuditLogs();
    setLogs(allLogs.filter(l => l.category === 'settings' || l.category === 'security'));
  }, []);

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Technical Audit Ledger</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Immutable trace of technical configuration changes, API key rotations, and cluster modifications.</p>
          </div>
          <Button variant="outline" className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest border-2">
            <Download className="h-4 w-4 mr-2" /> Export JSON Ledger
          </Button>
        </div>

        <div className="enterprise-card border bg-slate-900 overflow-hidden rounded-2xl border-white/5">
          <div className="p-4 border-b border-white/10 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Grep audit ledger..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[11px] h-10 border-white/5 bg-slate-900 font-mono text-white focus-visible:ring-primary focus-visible:border-primary/50"
              />
            </div>
            <div className="flex items-center gap-3">
               <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black uppercase text-[8px] tracking-widest">Immutability Active</Badge>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {filtered.map(log => (
              <div key={log.id} className="p-5 hover:bg-white/5 transition-all border-l-4 border-l-transparent hover:border-l-primary flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                <div className="flex gap-6 items-start">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-slate-800 text-primary shadow-lg">
                      <Terminal className="h-4 w-4" />
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                         <h4 className="text-[13px] font-black uppercase tracking-tight text-slate-200 font-mono group-hover:text-primary transition-colors">{log.action}</h4>
                         <Badge className="bg-slate-800 text-slate-400 text-[7px] font-black uppercase border-white/5">{log.category}</Badge>
                      </div>
                      <p className="text-xs font-medium text-slate-400 leading-tight italic">"{log.details || 'System event recorded.'}"</p>
                      <div className="flex flex-wrap gap-4 pt-1">
                         <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><User className="h-3 w-3" /> Actor: {log.actor}</span>
                         <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><ArrowRight className="h-3 w-3" /> Target: {log.target}</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                      <Clock className="h-3 w-3" /> {log.timestamp}
                   </div>
                   <span className="text-[8px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-tighter">Origin: {log.ip || '127.0.0.1'}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center">
                 <Database className="h-10 w-10 mx-auto mb-4 text-slate-700" />
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No entries found in Grep</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
