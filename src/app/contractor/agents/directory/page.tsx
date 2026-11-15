'use client';
import { useState, useEffect, Suspense } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DataTable, SectionHeader } from '@/components/DashboardComponents';
import { getContractorAgents, updateAgentStatus } from '@/lib/agent-store';
import { getStoredReferrals } from '@/lib/referral-store';
import { Agent, Referral } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar, 
  Target, 
  TrendingUp, 
  Wallet,
  Activity,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronRight,
  ShieldCheck,
  Smartphone
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
import { Separator } from '@/components/ui/separator';

export default function AgentDirectoryPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  useEffect(() => {
    setAgents(getContractorAgents('u4'));
  }, []);

  const filtered = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusToggle = (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active';
    updateAgentStatus(agent.id, newStatus);
    setAgents(getContractorAgents('u4'));
    toast({ title: "Status Updated", description: `${agent.name} is now marked as ${newStatus}.` });
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        {!selectedAgentId ? (
          <>
            <SectionHeader 
              title="Agent Directory" 
              subtitle="Performance Registry"
              action={{
                label: "Filter Criteria",
                icon: Filter,
                onClick: () => {}
              }}
            />

            <div className="enterprise-card border bg-card p-4 flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search agent name, ID or credentials..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-11 border-2 font-bold uppercase text-[10px] tracking-widest px-6">Export Ledger</Button>
              </div>
            </div>

            <DataTable>
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent Identity</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Performance</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Commission Logic</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Sync Status</th>
                  <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(agent => (
                  <tr 
                    key={agent.id} 
                    onClick={() => setSelectedAgentId(agent.id)}
                    className="hover:bg-muted/20 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{agent.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">ID: {agent.id} • {agent.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-foreground">{agent.successfulAdmissions} Admissions / {agent.totalReferrals} Refs</p>
                        <p className="text-[9px] font-bold text-emerald-600 uppercase">
                          {((agent.successfulAdmissions/agent.totalReferrals)*100).toFixed(1)}% Conversion
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground">{agent.commissionRate}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">Base Threshold</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border shadow-none px-3",
                        agent.status === 'active' ? "bg-emerald-600 text-white border-emerald-700" : "bg-muted text-muted-foreground border-border"
                      )}>
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                         <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                               <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                               <DropdownMenuItem onClick={() => setSelectedAgentId(agent.id)} className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><Eye className="mr-3 h-4 w-4 text-primary" /> View Logic Hub</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatusToggle(agent)} className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg">
                                 {agent.status === 'active' ? <XCircle className="mr-3 h-4 w-4 text-red-600" /> : <CheckCircle2 className="mr-3 h-4 w-4 text-emerald-600" />}
                                 {agent.status === 'active' ? 'Suspend Node' : 'Activate Node'}
                               </DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </>
        ) : (
          <AgentProfileView 
            agent={selectedAgent!} 
            onBack={() => setSelectedAgentId(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}

function AgentProfileView({ agent, onBack }: { agent: Agent, onBack: () => void }) {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const allRefs = getStoredReferrals('u4');
    setReferrals(allRefs.filter(r => r.agentId === agent.id));
  }, [agent.id]);

  const stats = {
    total: agent.totalEarnings,
    pending: agent.pendingCommission,
    paid: agent.totalEarnings - agent.pendingCommission
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="h-10 px-4 font-bold uppercase text-[11px] tracking-widest border-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> All Agents
        </Button>
        <h2 className="text-2xl font-bold uppercase tracking-tight">Agent Logic Hub</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Card */}
          <div className="enterprise-card border bg-card p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
               <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border-4 border-primary/5 flex items-center justify-center text-primary font-bold text-4xl shadow-xl shrink-0">
                  {agent.name.charAt(0)}
               </div>
               <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                     <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tighter uppercase">{agent.name}</h1>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">ID: {agent.id} • Joined: {agent.joiningDate}</p>
                     </div>
                     <Badge className={cn(
                       "font-bold uppercase text-[10px] py-1.5 px-4 rounded-xl",
                       agent.status === 'active' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                     )}>{agent.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-dashed">
                     <div className="space-y-3">
                        <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><Mail className="h-4 w-4 text-primary" /> {agent.email}</p>
                        <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><Smartphone className="h-4 w-4 text-primary" /> {agent.phone}</p>
                     </div>
                     <div className="space-y-3">
                        <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><ShieldCheck className="h-4 w-4 text-primary" /> Level 2 Verified</p>
                        <p className="text-xs font-bold text-foreground flex items-center gap-2.5 uppercase tracking-tight"><Target className="h-4 w-4 text-primary" /> {agent.commissionRate}</p>
                     </div>
                  </div>
               </div>
            </div>
            <Activity className="absolute -right-6 -bottom-6 h-32 w-32 text-primary opacity-5 animate-pulse" />
          </div>

          {/* Performance Data */}
          <div className="enterprise-card border bg-card overflow-hidden">
            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Associated Student Referrals</span>
            </div>
            <div className="divide-y overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/10 border-b">
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Student</th>
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Status</th>
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest">Date</th>
                    <th className="text-[9px] font-bold text-muted-foreground py-3 px-4 uppercase tracking-widest text-right">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {referrals.map(ref => (
                    <tr key={ref.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4">
                        <p className="text-xs font-bold text-foreground uppercase">{ref.studentName}</p>
                        <p className="text-[9px] text-muted-foreground font-bold">{ref.hostelName}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-[8px] font-bold uppercase px-2 py-0 border-primary/20 bg-primary/5 text-primary tracking-tighter">{ref.status.replace('_', ' ')}</Badge>
                      </td>
                      <td className="py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase">{ref.createdAt}</td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-xs font-bold text-foreground">₹{ref.commissionAmount}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">{ref.commissionStatus}</p>
                      </td>
                    </tr>
                  ))}
                  {referrals.length === 0 && (
                    <tr><td colSpan={4} className="py-12 text-center text-[10px] font-bold uppercase opacity-40">No referrals logged yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           {/* Financial Sync */}
           <div className="enterprise-card border bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Financial Heartbeat</h4>
              <div className="space-y-6">
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Admission Conversion</p>
                    <div className="flex items-center justify-between">
                       <p className="text-3xl font-bold text-white">{((agent.successfulAdmissions/agent.totalReferrals)*100).toFixed(1)}%</p>
                       <Badge className="bg-emerald-600 text-white font-bold text-[9px]">EXCELLENT</Badge>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: `${(agent.successfulAdmissions/agent.totalReferrals)*100}%` }} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <FinancialRow label="Lifetime Earnings" value={stats.total} color="text-white" />
                    <FinancialRow label="Paid Commissions" value={stats.paid} color="text-emerald-400" />
                    <FinancialRow label="Pending Payouts" value={stats.pending} color="text-amber-400" />
                 </div>
              </div>
              <Wallet className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
           </div>

           <div className="enterprise-card border bg-card p-8 space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Admin Actions</h4>
              <div className="flex flex-col gap-3">
                 <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                    <Calendar className="h-3.5 w-3.5 mr-3 text-primary" /> View Activity Log
                 </Button>
                 <Button variant="outline" className="w-full justify-start font-bold uppercase text-[10px] tracking-widest border-2">
                    <TrendingUp className="h-3.5 w-3.5 mr-3 text-primary" /> Performance Report
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function FinancialRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
       <span className={cn("text-base font-bold", color)}>₹{value.toLocaleString()}</span>
    </div>
  );
}
