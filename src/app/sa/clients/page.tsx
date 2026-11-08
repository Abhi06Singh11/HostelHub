'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAOrganizations, updateOrgStatus } from '@/lib/sa-store';
import { Organization } from '@/lib/types';
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert,
  ArrowRight,
  Briefcase,
  Users,
  CreditCard
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

export default function SAClientsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setOrgs(getSAOrganizations());
  }, []);

  const handleStatus = (id: string, status: Organization['status']) => {
    updateOrgStatus(id, status);
    setOrgs(getSAOrganizations());
    toast({ title: "Organization Updated", description: `Client node marked as ${status}.` });
  };

  const filtered = orgs.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase()) || 
    o.ownerEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Client Ecosystem</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Orchestrate enterprise organizations, monitor subscription health, and verify business credentials.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Register Organization
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <OrgStat label="Active Clients" value={orgs.filter(o => o.status === 'active').length} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <OrgStat label="Total Orgs" value={orgs.length} icon={Briefcase} color="text-primary" bg="bg-primary/5" />
           <OrgStat label="Users Managed" value={orgs.reduce((acc, o) => acc + o.userCount, 0)} icon={Users} color="text-blue-600" bg="bg-blue-50" />
           <OrgStat label="Suspended" value={orgs.filter(o => o.status === 'suspended').length} icon={ShieldAlert} color="text-red-600" bg="bg-red-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search organizations..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Client Name / Owner</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Subscription</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Asset Volume</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(org => (
                  <tr key={org.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center text-primary font-black text-xs uppercase">
                          {org.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-black text-foreground">{org.name}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">{org.ownerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <Badge variant="outline" className="text-[8px] font-black uppercase bg-primary/5 text-primary border-primary/20">{org.plan} tier</Badge>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">{org.propertyCount} Properties • {org.userCount} Users</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                         <span className={cn(
                           "px-2.5 py-0.5 rounded text-[8px] font-black uppercase border",
                           org.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"
                         )}>
                           {org.status}
                         </span>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Organization Details</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatus(org.id, 'suspended')} className="text-xs font-bold uppercase py-2.5 text-red-600">Suspend Org</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatus(org.id, 'active')} className="text-xs font-bold uppercase py-2.5 text-emerald-600">Reactivate</DropdownMenuItem>
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

function OrgStat({ label, value, icon: Icon, color, bg }: any) {
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