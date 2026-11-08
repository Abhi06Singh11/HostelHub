'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAPlans, logSAAction } from '@/lib/sa-store';
import { SubscriptionPlan } from '@/lib/types';
import { 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  MoreVertical, 
  Plus, 
  Edit, 
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SASubscriptionsPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    setPlans(getSAPlans());
  }, []);

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Revenue Configuration</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Control platform monetization tiers, configure billing cycles, and monitor active subscriptions.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Provision Tier
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.id} className="enterprise-card border bg-card hover:border-primary group transition-all flex flex-col relative overflow-hidden">
               {plan.name === 'Enterprise' && <div className="absolute top-0 right-0 p-3 bg-primary text-white text-[8px] font-black uppercase tracking-[0.2em] transform rotate-0">Elite Choice</div>}
               <div className="p-8 flex-1 space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{plan.name} Tier</p>
                     <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-foreground">₹{(plan.price/1000).toFixed(1)}k</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">/ {plan.billingCycle}</span>
                     </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-dashed">
                     {plan.features.map(f => (
                       <div key={f} className="flex items-center gap-3">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-[11px] font-bold text-foreground uppercase">{f}</span>
                       </div>
                     ))}
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-primary">Market Reach</span>
                        <span className="text-foreground">{plan.activeUsers} Active Nodes</span>
                     </div>
                     <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(plan.activeUsers/200)*100}%` }} />
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-muted/30 border-t flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">Configure Tier</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}