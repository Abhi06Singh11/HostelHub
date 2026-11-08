'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Clock, 
  RefreshCcw, 
  Play, 
  Pause, 
  Terminal,
  AlertCircle,
  CheckCircle2,
  Settings,
  MoreVertical,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

export default function SuperDevOpsPage() {
  const services = [
    { name: 'Cron: Rent Invoice Gen', status: 'idle', interval: '1st of Month', lastRun: '12h ago' },
    { name: 'Worker: Image Optimizer', status: 'running', load: '12%', lastRun: 'Just now' },
    { name: 'Worker: Email Dispatcher', status: 'running', load: '5%', lastRun: '2 mins ago' },
    { name: 'Backup: Daily SQL Dump', status: 'scheduled', interval: 'Daily 03:00', lastRun: '21h ago' },
  ];

  const handleAction = (name: string, action: string) => {
    toast({ title: "Ops Command Dispatched", description: `${name} has been ${action}.` });
  };

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Technical Operations</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Manage platform background services, automated tasks, and technical maintenance cycles.</p>
          </div>
          <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
            <ShieldCheck className="h-4 w-4 mr-2" /> Maintenance Mode
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <OpsStat label="Active Workers" value="4" icon={Zap} color="text-primary" bg="bg-primary/5" />
           <OpsStat label="Avg Load" value="8.4%" icon={Cpu} color="text-blue-600" bg="bg-blue-50" />
           <OpsStat label="Success Rate" value="99.9%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <OpsStat label="Incidents" value="0" icon={AlertCircle} color="text-emerald-500" bg="bg-muted/50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20">
             <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Background Service Registry</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Service Identity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Process State</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Schedule / Frequency</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {services.map(service => (
                  <tr key={service.name} className="hover:bg-muted/20 transition-colors group">
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-primary border border-white/5">
                             <Terminal className="h-4 w-4" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-foreground uppercase">{service.name}</p>
                             <p className="text-[10px] text-muted-foreground font-bold uppercase">Last Success: {service.lastRun}</p>
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-6">
                       <Badge className={cn(
                         "font-black uppercase text-[8px] px-3",
                         service.status === 'running' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                       )}>{service.status}</Badge>
                       {service.load && <span className="ml-3 text-[10px] font-bold text-muted-foreground">Load: {service.load}</span>}
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] font-black text-foreground uppercase flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> {service.interval || 'On Demand'}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleAction(service.name, 'restarted')} className="h-8 w-8 hover:text-primary"><RefreshCcw className="h-4 w-4" /></Button>
                          <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Worker Logs</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Adjust Resource Pool</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Terminate PID</DropdownMenuItem>
                             </DropdownMenuContent>
                          </DropdownMenu>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function OpsStat({ label, value, icon: Icon, color, bg }: any) {
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
