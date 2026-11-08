'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDApiEndpoints } from '@/lib/sd-store';
import { ApiEndpoint } from '@/lib/types';
import { 
  Webhook, 
  Search, 
  Filter, 
  MoreVertical, 
  Activity, 
  Zap, 
  Clock, 
  ShieldCheck,
  RefreshCcw,
  BarChart,
  Code2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SuperDevApiPage() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setEndpoints(getSDApiEndpoints());
  }, []);

  const filtered = endpoints.filter(e => e.path.toLowerCase().includes(search.toLowerCase()));

  const handleRotate = () => {
    toast({ title: "Security Protocols Active", description: "API master keys rotated across all clusters." });
  };

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">API Controller</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Real-time gateway monitoring, endpoint performance analytics, and technical authentication audit.</p>
          </div>
          <Button onClick={handleRotate} className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <RefreshCcw className="h-4 w-4 mr-2" /> Rotate Gateway Keys
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <ApiStat label="Endpoints Active" value={endpoints.length} icon={Webhook} color="text-primary" bg="bg-primary/5" />
           <ApiStat label="Avg Latency" value="65ms" icon={Zap} color="text-emerald-600" bg="bg-emerald-50" />
           <ApiStat label="Req Volume (24h)" value="1.2M" icon={Activity} color="text-blue-600" bg="bg-blue-50" />
           <ApiStat label="Error Threshold" value="0.04%" icon={AlertCircle} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Filter by endpoint path..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <div className="flex gap-2">
               {['all', 'v1', 'v2', 'beta'].map(v => (
                 <button key={v} className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border hover:bg-muted transition-all">{v}</button>
               ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Endpoint Path</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Method / Auth</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Performance</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Console</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(api => (
                  <tr key={api.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="py-4 px-6">
                       <p className="text-sm font-mono font-black text-foreground group-hover:text-primary transition-colors">{api.path}</p>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <Badge className={cn(
                            "text-[8px] font-black px-2",
                            api.method === 'GET' ? "bg-blue-600" : api.method === 'POST' ? "bg-emerald-600" : "bg-amber-600"
                          )}>{api.method}</Badge>
                          <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary">JWT SECURED</Badge>
                       </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="space-y-1">
                          <p className="text-[11px] font-black text-foreground uppercase">{api.latency}ms</p>
                          <p className="text-[9px] text-muted-foreground font-bold uppercase">{api.requests24h.toLocaleString()} calls • {api.errorRate}% ERR</p>
                       </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Documentation</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Mock Response</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Deprecate Route</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
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

function ApiStat({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-black tracking-tight tabular-nums", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
