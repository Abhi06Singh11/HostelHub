'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Terminal, 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  Database, 
  Cpu, 
  Download,
  Trash2,
  PlayCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SuperDevLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Generate some mock technical logs
    const mockLogs = [
      { id: 1, service: 'AUTH-ENG', type: 'INFO', msg: 'JWT generation successful for cluster AS-1', time: '10:45:12' },
      { id: 2, service: 'DB-SYNC', type: 'WARN', msg: 'Replication latency threshold exceeded: 45ms', time: '10:44:55' },
      { id: 3, service: 'IMG-PROC', type: 'ERROR', msg: 'Canvas context initialization failed on node L8', time: '10:43:20' },
      { id: 4, service: 'GATEWAY', type: 'INFO', msg: 'Incoming request routed to Org-Cluster-9', time: '10:42:01' },
      { id: 5, service: 'AUTH-ENG', type: 'INFO', msg: '2FA challenge resolved for user UID-482', time: '10:41:45' },
    ];
    setLogs(mockLogs);
  }, []);

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Technical Logstream</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Immutable stream of platform kernel events, runtime errors, and resource allocation logs.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Stream
             </Button>
             <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
                <Download className="h-4 w-4 mr-2" /> Export JSON
             </Button>
          </div>
        </div>

        <div className="enterprise-card border bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[700px]">
           <div className="p-4 border-b border-white/10 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Live Kernel Listen</span>
                 </div>
                 <Separator orientation="vertical" className="h-4 bg-white/10" />
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input 
                      placeholder="Grep stream..."
                      className="bg-slate-900 border border-white/5 rounded-lg h-8 pl-9 pr-4 text-[11px] font-bold text-white outline-none focus:border-primary/50 transition-all w-64"
                    />
                 </div>
              </div>
              <div className="flex gap-2">
                 <Button variant="ghost" size="sm" className="h-8 text-white/50 hover:text-white uppercase text-[9px] font-black tracking-widest"><Filter className="h-3 w-3 mr-2" /> Level: All</Button>
                 <Button variant="ghost" size="sm" className="h-8 text-white/50 hover:text-white uppercase text-[9px] font-black tracking-widest"><PlayCircle className="h-3 w-3 mr-2" /> Pause Stream</Button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 font-mono text-[13px] space-y-2 selection:bg-primary/40">
              {logs.map(log => (
                <div key={log.id} className="flex gap-6 group hover:bg-white/5 p-1 rounded transition-colors">
                   <span className="text-slate-600 shrink-0">[{log.time}]</span>
                   <span className={cn(
                     "font-bold shrink-0 w-24",
                     log.type === 'ERROR' ? "text-red-500" : log.type === 'WARN' ? "text-amber-500" : "text-emerald-500"
                   )}>{log.type}</span>
                   <span className="text-primary/70 shrink-0 w-20">[{log.service}]</span>
                   <span className="text-slate-300 group-hover:text-white transition-colors">{log.msg}</span>
                </div>
              ))}
              <div className="text-slate-500 italic pt-4">_ Waiting for incoming data nodes...</div>
           </div>

           <div className="p-2 px-6 bg-slate-950 border-t border-white/5 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IO Load: 420 events/sec</p>
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kernel v6.4.1</span>
                 <Separator orientation="vertical" className="h-3 bg-white/10" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Buffers Clear</span>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Separator({ orientation, className }: any) {
  return <div className={cn(orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full', 'bg-border', className)} />;
}
