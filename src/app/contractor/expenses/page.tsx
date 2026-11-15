'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockExpenses } from '@/lib/mock-data';
import { Plus, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ContractorExpensesPage() {
  const categories = [
    { id: 'all', label: 'All Expenses' },
    { id: 'cook', label: 'Kitchen/Cook' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'wifi', label: 'IT & Wi-Fi' },
    { id: 'maintenance', label: 'General' },
  ];

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase text-foreground">Expense Claims</h2>
            <p className="text-sm text-muted-foreground font-medium uppercase">Track operational costs and submit new claims for reimbursement.</p>
          </div>
          <Button size="sm" className="h-9 px-4 font-black text-[10px] uppercase tracking-widest shadow-md">
            <Plus className="h-3 w-3 mr-2" /> Submit Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Submitted" value="₹25,200" icon={FileText} />
          <StatCard title="Approved" value="₹18,500" icon={CreditCard} color="text-emerald-600" />
          <StatCard title="Pending" value="₹6,700" icon={CreditCard} color="text-amber-600" />
          <StatCard title="Rejected" value="₹0" icon={CreditCard} color="text-red-600" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={cn(
                "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap rounded-lg",
                cat.id === 'all' ? "bg-primary text-white border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:bg-muted"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <div className="enterprise-card border bg-card overflow-hidden">
          <table className="w-full text-left border-collapse data-table-compact">
            <thead>
              <tr className="bg-muted/20 border-b">
                <th className="text-[10px] font-black uppercase text-muted-foreground py-3 pl-4">Category / Date</th>
                <th className="text-[10px] font-black uppercase text-muted-foreground py-3">Property</th>
                <th className="text-[10px] font-black uppercase text-muted-foreground py-3">Description</th>
                <th className="text-[10px] font-black uppercase text-muted-foreground py-3">Amount</th>
                <th className="text-[10px] font-black uppercase text-muted-foreground py-3 text-right pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 pl-4">
                    <p className="text-xs font-bold text-foreground uppercase">{exp.category}</p>
                    <p className="text-[9px] text-muted-foreground font-bold">{exp.date}</p>
                  </td>
                  <td className="py-3 text-[10px] font-black uppercase text-muted-foreground">
                    {exp.propertyName}
                  </td>
                  <td className="py-3">
                    <p className="text-xs text-foreground/80 font-medium italic">"{exp.description}"</p>
                  </td>
                  <td className="py-3 text-xs font-bold text-foreground">
                    ₹{exp.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right pr-4">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-black uppercase border",
                      exp.status === 'approved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      exp.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      exp.status === 'rejected' ? "bg-red-50 text-red-700 border-red-100" :
                      "bg-blue-50 text-blue-700 border-blue-100"
                    )}>
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon: Icon, color = "text-foreground" }: any) {
  return (
    <div className="enterprise-card border p-4 bg-card">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>
        <Icon className={cn("h-3.5 w-3.5 opacity-50", color)} />
      </div>
      <p className={cn("text-xl font-bold tracking-tight", color)}>{value}</p>
    </div>
  );
}
