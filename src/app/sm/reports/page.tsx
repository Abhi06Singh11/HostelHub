'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  FileBarChart, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  ArrowRight, 
  FileText, 
  TrendingUp, 
  Zap, 
  Users, 
  Target,
  BarChart,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function MarketerReportsPage() {
  const reportTypes = [
    { title: 'Growth Summary', desc: 'Consolidated lead and conversion metrics for the current cycle.', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5' },
    { title: 'CPA Channel Audit', desc: 'Efficiency breakdown of every ad network and affiliate source.', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Agent Performance', desc: 'Detailed referral conversion stats for all authorized agents.', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Campaign ROI', desc: 'Spend vs Revenue analysis for all active marketing drives.', icon: Target, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleDownload = (name: string) => {
    toast({ title: "Report Generation Initiated", description: `${name} is being synthesized in CSV format.` });
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Platform Intelligence</h2>
          <p className="text-[15px] text-muted-foreground font-medium max-w-2xl">Exportable growth data, high-fidelity marketing audits, and strategic performance snapshots.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {reportTypes.map(report => (
             <div key={report.title} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div className={cn("p-3 rounded-xl border", report.bg, report.color)}>
                      <report.icon className="h-6 w-6" />
                   </div>
                   <Button variant="ghost" size="icon" onClick={() => handleDownload(report.title)} className="h-8 w-8 hover:bg-primary hover:text-white transition-all">
                      <Download className="h-4 w-4" />
                   </Button>
                </div>
                <div className="flex-1 space-y-2">
                   <h3 className="text-base font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{report.title}</h3>
                   <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">"{report.desc}"</p>
                </div>
                <div className="pt-6 mt-6 border-t border-dashed">
                   <Button onClick={() => handleDownload(report.title)} variant="ghost" size="sm" className="w-full justify-between h-9 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5">
                      Synthesize Report <ArrowRight className="h-3 w-3" />
                   </Button>
                </div>
             </div>
           ))}
        </div>

        <div className="enterprise-card border bg-slate-900 text-white p-10 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                 <h4 className="text-2xl font-black tracking-tighter uppercase">Scheduled Data Sync</h4>
                 <p className="text-sm text-slate-400 font-medium max-w-md">Automatically email weekly marketing summaries to the senior platform board.</p>
              </div>
              <div className="flex gap-4">
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest h-12 px-8">Configure Schedule</Button>
                 <Button className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest h-12 px-10 shadow-xl">Activate Sync</Button>
              </div>
           </div>
           <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5" />
        </div>
      </div>
    </DashboardLayout>
  );
}
