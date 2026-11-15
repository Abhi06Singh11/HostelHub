'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DataTable, SectionHeader } from '@/components/DashboardComponents';
import { getStoredReferrals, updateReferralStatus, updateCommissionStatus } from '@/lib/referral-store';
import { Referral, ReferralStatus, CommissionStatus } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  Wallet,
  TrendingUp,
  Coins,
  ShieldCheck,
  Smartphone,
  Mail,
  Building2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Filter as FilterIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ReferralsCommissionsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('referrals');

  useEffect(() => {
    setReferrals(getStoredReferrals('u4'));
  }, []);

  const handleStatusChange = (id: string, status: ReferralStatus) => {
    updateReferralStatus(id, status);
    setReferrals(getStoredReferrals('u4'));
    toast({ title: "Status Updated", description: `Student referral status is now ${status.replace('_', ' ')}.` });
  };

  const handleCommissionUpdate = (id: string, status: CommissionStatus) => {
    updateCommissionStatus(id, status);
    setReferrals(getStoredReferrals('u4'));
    toast({ title: "Commission Logic Synced", description: `Commission status updated to ${status}.` });
  };

  const filtered = referrals.filter(r => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) || 
    r.agentName.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    totalGenerated: referrals.reduce((acc, r) => acc + r.commissionAmount, 0),
    approved: referrals.filter(r => r.commissionStatus === 'approved' || r.commissionStatus === 'paid').reduce((acc, r) => acc + r.commissionAmount, 0),
    paid: referrals.filter(r => r.commissionStatus === 'paid').reduce((acc, r) => acc + r.commissionAmount, 0),
    outstanding: referrals.filter(r => r.commissionStatus === 'eligible' || r.commissionStatus === 'approved').reduce((acc, r) => acc + r.commissionAmount, 0)
  };

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Referral & Commission Hub" 
          subtitle="Partnership Financial Terminal"
          action={{
            label: "Export Ledger",
            icon: Coins,
            onClick: () => {}
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <FinanceCard label="Total Accrued" value={`₹${(stats.totalGenerated/1000).toFixed(1)}k`} icon={TrendingUp} color="text-primary" bg="bg-primary/5" />
           <FinanceCard label="Total Paid" value={`₹${(stats.paid/1000).toFixed(1)}k`} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <FinanceCard label="Outstanding" value={`₹${(stats.outstanding/1000).toFixed(1)}k`} icon={Wallet} color="text-blue-600" bg="bg-blue-50" />
           <FinanceCard label="Pending Audit" value={referrals.filter(r => r.commissionStatus === 'pending').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <TabsList className="bg-muted/30 p-1.5 rounded-2xl border-2 h-auto">
              <TabsTrigger value="referrals" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Student Referrals</TabsTrigger>
              <TabsTrigger value="commissions" className="rounded-xl px-8 py-2.5 font-bold text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Commission Registry</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by student or agent identity..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
            </div>
          </div>

          <TabsContent value="referrals" className="space-y-6 animate-in fade-in duration-500">
             <DataTable>
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student / Lead Info</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Partner</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Target Property</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Funnel status</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Terminal</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {filtered.map(ref => (
                     <tr key={ref.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground uppercase tracking-tight">{ref.studentName}</p>
                           <div className="flex items-center gap-3 mt-1 opacity-60">
                              <span className="text-[9px] font-bold uppercase flex items-center gap-1"><Smartphone className="h-3 w-3" /> {ref.studentPhone}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                                 {ref.agentName.charAt(0)}
                              </div>
                              <p className="text-xs font-bold text-foreground uppercase tracking-tight">{ref.agentName}</p>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-xs font-bold text-foreground uppercase flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-primary" /> {ref.hostelName}</p>
                           <p className="text-[9px] font-bold text-muted-foreground uppercase">{ref.accommodationType}</p>
                        </td>
                        <td className="py-4 px-6">
                           <Badge variant="outline" className={cn(
                             "text-[9px] font-bold uppercase px-3 py-1 border-primary/20",
                             ref.status === 'checked_in' || ref.status === 'admission_confirmed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-primary/5 text-primary"
                           )}>
                             {ref.status.replace('_', ' ')}
                           </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-2xl">
                                 {['contacted', 'interested', 'pg_allocated', 'admission_confirmed', 'checked_in', 'cancelled'].map(st => (
                                   <DropdownMenuItem key={st} onClick={() => handleStatusChange(ref.id, st as any)} className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg">
                                      Mark as {st.replace('_', ' ')}
                                   </DropdownMenuItem>
                                 ))}
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </DataTable>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6 animate-in fade-in duration-500">
             <DataTable>
                <thead>
                   <tr className="bg-muted/10 border-b">
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Transaction / Student</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Agent Partner</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Value (INR)</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Ledger State</th>
                      <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {filtered.map(ref => (
                     <tr key={ref.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground uppercase tracking-tight">{ref.studentName}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">Cycle: {ref.createdAt}</p>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-xs font-bold text-foreground uppercase">{ref.agentName}</p>
                           <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Verified Partner</p>
                        </td>
                        <td className="py-4 px-6">
                           <p className="text-sm font-bold text-foreground">₹{ref.commissionAmount.toLocaleString()}</p>
                           <p className="text-[9px] font-bold text-muted-foreground uppercase">Base Rate: Fixed</p>
                        </td>
                        <td className="py-4 px-6">
                           <div className="flex flex-col gap-1.5">
                              <Badge className={cn(
                                "text-[9px] font-bold uppercase shadow-none border px-3 w-fit",
                                ref.commissionStatus === 'paid' ? "bg-emerald-600 text-white border-emerald-700" :
                                ref.commissionStatus === 'eligible' ? "bg-blue-600 text-white border-blue-700" :
                                "bg-muted text-muted-foreground border-border"
                              )}>
                                {ref.commissionStatus.replace('_', ' ')}
                              </Badge>
                              {ref.paymentDate && <span className="text-[8px] font-bold text-muted-foreground uppercase">Disbursed: {ref.paymentDate}</span>}
                           </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-2xl">
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'approved')} className="text-xs font-bold uppercase py-2.5 rounded-lg text-emerald-600 focus:bg-emerald-50">Approve Logic</DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'paid')} className="text-xs font-bold uppercase py-2.5 rounded-lg text-blue-600 focus:bg-blue-50">Mark as Paid</DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'on_hold')} className="text-xs font-bold uppercase py-2.5 rounded-lg text-amber-600 focus:bg-amber-50">Place On Hold</DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleCommissionUpdate(ref.id, 'rejected')} className="text-xs font-bold uppercase py-2.5 rounded-lg text-red-600 focus:bg-red-50">Reject Commission</DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </DataTable>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function FinanceCard({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className={cn("enterprise-card border p-6 flex justify-between items-center transition-all hover:shadow-md", bg)}>
      <div>
        <p className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest mb-1.5">{label}</p>
        <p className={cn("text-2xl font-bold tracking-tight", color)}>{value}</p>
      </div>
      <div className="p-3 bg-card rounded-lg shadow-sm border border-border">
        <Icon className={cn("h-6 w-6", color)} />
      </div>
    </div>
  );
}
