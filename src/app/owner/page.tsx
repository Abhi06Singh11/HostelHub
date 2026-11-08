'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Building2, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  AlertCircle, 
  ArrowRight,
  ArrowUpRight,
  Wallet,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getOwnerProperties, getOwnerAgreements, getOwnerFinancials } from '@/lib/owner-store';
import { Property, RentalAgreement, FinancialTransaction } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function OwnerDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [transactions, setFinancials] = useState<FinancialTransaction[]>([]);

  useEffect(() => {
    const load = () => {
      setProperties(getOwnerProperties());
      setAgreements(getOwnerAgreements());
      setFinancials(getOwnerFinancials());
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const stats = {
    total: properties.length,
    rented: properties.filter(p => p.status === 'rented').length,
    available: properties.filter(p => p.status === 'available').length,
    monthlyIncome: agreements.reduce((acc, a) => acc + a.monthlyRent, 0),
    overdue: transactions.filter(t => t.status === 'overdue').length,
    expiring: agreements.filter(a => a.status === 'expiring_soon').length
  };

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Building Owner</p>
            <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase">Property Estate Summary</h2>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push('/owner/financials')} className="h-11 px-6 font-bold text-[12px] uppercase tracking-widest border-2">
                <Wallet className="h-4 w-4 mr-2" /> Track Payments
             </Button>
             <Button onClick={() => router.push('/owner/properties')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Add Property
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Owned Assets" value={stats.total} details={`${stats.rented} Rented • ${stats.available} Empty`} icon={Building2} color="text-primary" />
          <StatCard title="Monthly Rental" value={`₹${(stats.monthlyIncome/100000).toFixed(1)}L`} details="Total Monthly Accrual" icon={TrendingUp} color="text-emerald-600" />
          <StatCard title="Pending Rent" value={stats.overdue} details="Units with Overdue Payments" icon={AlertCircle} color="text-amber-600" />
          <StatCard title="Agreements" value={agreements.length} details={`${stats.expiring} Expiring This Quarter`} icon={ShieldCheck} color="text-blue-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-8">
             <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Portfolio Inventory</span>
                  <Button variant="link" size="sm" onClick={() => router.push('/owner/properties')} className="h-auto p-0 text-[10px] font-bold uppercase">Manage All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-muted/10 border-b">
                        <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Building / Address</th>
                        <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Capacity</th>
                        <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Rent Status</th>
                        <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {properties.map(p => (
                        <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-6">
                            <p className="text-sm font-bold text-foreground">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase">{p.address.split(',')[1] || p.address}</p>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-xs font-bold text-foreground">{p.totalRooms} Rooms</p>
                            <p className="text-[10px] text-primary font-bold uppercase">{p.totalBeds} Bed Cap.</p>
                          </td>
                          <td className="py-4 px-6">
                             <span className={cn(
                               "px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase border",
                               p.status === 'rented' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                               p.status === 'available' ? "bg-blue-50 text-blue-700 border-blue-100" :
                               "bg-muted text-muted-foreground border-border"
                             )}>
                               {p.status}
                             </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><ArrowRight className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>

             <div className="enterprise-card border bg-slate-900 text-white p-8 relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Financial Snapshot</p>
                      <h3 className="text-4xl font-bold tracking-tight">₹1.24Cr</h3>
                      <p className="text-sm text-slate-400 font-medium">Estimated Annualized Gross Rental Income from current active agreements.</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                         <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">Tax Accrual</p>
                         <p className="text-lg font-bold">₹8.4L</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                         <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">Maintenance</p>
                         <p className="text-lg font-bold text-primary">₹3.2L</p>
                      </div>
                   </div>
                </div>
                <TrendingUp className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
             </div>
          </div>

          <div className="space-y-8">
             <div className="enterprise-card border bg-card">
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Active Contractors</span>
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="p-4 space-y-4">
                   {agreements.map(a => (
                     <div key={a.id} className="p-3 bg-muted/10 border border-dashed rounded-lg flex items-center justify-between">
                        <div>
                           <p className="text-xs font-bold text-foreground">{a.contractorName}</p>
                           <p className="text-[9px] text-muted-foreground font-bold uppercase mt-0.5">{a.propertyName}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-primary uppercase">Rent: ₹{(a.monthlyRent/1000).toFixed(0)}k</p>
                           <p className="text-[8px] text-muted-foreground font-bold uppercase mt-0.5">Due: {a.rentDueDate}th</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="enterprise-card border bg-primary text-primary-foreground p-6">
                <div className="flex items-center gap-2 mb-4">
                   <ShieldCheck className="h-4 w-4 opacity-80" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Compliance Tip</span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed font-medium">
                  Ensure all commercial building permits and fire safety certificates are uploaded in the documents tab to avoid rental disruptions.
                </p>
                <Button variant="outline" className="w-full mt-6 bg-white/10 border-white/20 text-white hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest">
                  View T&C
                </Button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, details, icon: Icon, color }: any) {
  return (
    <div className="enterprise-card border p-6 flex flex-col justify-between hover:border-primary/30 transition-all bg-card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-muted rounded border border-border">
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <ArrowUpRight className="h-3 w-3 text-muted-foreground/30" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
        <p className={cn("text-3xl font-bold tracking-tight", color)}>{value}</p>
        <div className="h-px w-full bg-border/50 my-2" />
        <p className="text-[10px] font-medium text-muted-foreground">{details}</p>
      </div>
    </div>
  );
}
