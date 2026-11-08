'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { mockExpenses } from '@/lib/mock-data';
import { Plus, Filter, FileText, CreditCard } from 'lucide-react';
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
            <h2 className="text-2xl font-black tracking-tight">Expense Claims</h2>
            <p className="text-sm text-slate-500 font-medium">Track operational costs and submit new claims for reimbursement.</p>
          </div>
          <Button size="sm" className="h-9 px-4 font-black text-[10px] uppercase tracking-widest shadow-none rounded-none">
            <Plus className="h-3 w-3 mr-2" /> Submit Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Submitted" value="₹25,200" icon={FileText} />
          <StatCard title="Approved" value="₹18,500" icon={CreditCard} color="text-green-600" />
          <StatCard title="Pending" value="₹6,700" icon={CreditCard} color="text-amber-600" />
          <StatCard title="Rejected" value="₹0" icon={CreditCard} color="text-red-600" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={cn(
                "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                cat.id === 'all' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <div className="enterprise-card border">
          <table className="w-full text-left border-collapse data-table-compact">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-[10px] font-black uppercase text-slate-400 py-3 pl-4">Category / Date</th>
                <th className="text-[10px] font-black uppercase text-slate-400 py-3">Property</th>
                <th className="text-[10px] font-black uppercase text-slate-400 py-3">Description</th>
                <th className="text-[10px] font-black uppercase text-slate-400 py-3">Amount</th>
                <th className="text-[10px] font-black uppercase text-slate-400 py-3 text-right pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pl-4">
                    <p className="text-xs font-bold text-slate-900 uppercase">{exp.category}</p>
                    <p className="text-[9px] text-slate-400 font-bold">{exp.date}</p>
                  </td>
                  <td className="py-3 text-[10px] font-black uppercase text-slate-500">
                    {exp.propertyName}
                  </td>
                  <td className="py-3">
                    <p className="text-xs text-slate-600 font-medium">{exp.description}</p>
                  </td>
                  <td className="py-3 text-xs font-bold text-slate-900">
                    ₹{exp.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right pr-4">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-black uppercase",
                      exp.status === 'approved' ? "bg-green-100 text-green-700" :
                      exp.status === 'pending' ? "bg-amber-100 text-amber-700" :
                      exp.status === 'rejected' ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
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

function StatCard({ title, value, icon: Icon, color = "text-slate-600" }: any) {
  return (
    <div className="enterprise-card border p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <Icon className={cn("h-3.5 w-3.5", color)} />
      </div>
      <p className={cn("text-xl font-bold tracking-tight", color)}>{value}</p>
    </div>
  );
}
