'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSARoles, logSAAction } from '@/lib/sa-store';
import { PlatformRole } from '@/lib/types';
import { 
  Lock, 
  ShieldCheck, 
  Users, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Settings,
  Eye,
  FileBarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SARolesPage() {
  const [roles, setRoles] = useState<PlatformRole[]>([]);

  useEffect(() => {
    setRoles(getSARoles());
  }, []);

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Access Control Matrix</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Define platform-wide roles and configure granular permissions across all administrative modules.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Define New Role
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map(role => (
            <div key={role.id} className="enterprise-card border bg-card hover:border-primary group transition-all flex flex-col">
               <div className="p-6 flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                        <Lock className="h-6 w-6" />
                     </div>
                     <Badge variant="outline" className="text-[9px] font-black uppercase">{role.userCount} Users</Badge>
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{role.name}</h3>
                     <p className="text-[11px] text-muted-foreground font-medium mt-1 leading-relaxed italic">"{role.description}"</p>
                  </div>
                  <div className="space-y-3 pt-2">
                     <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Active Permissions</p>
                     <div className="flex flex-wrap gap-2">
                        {role.permissions[0].actions.map(a => (
                          <span key={a} className="px-2 py-0.5 rounded-lg bg-muted text-[8px] font-black uppercase border border-border">{a}</span>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-muted/30 border-t flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">Manage Matrix</Button>
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
               </div>
            </div>
          ))}
          <button className="h-full min-h-[250px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
             <Plus className="h-10 w-10" />
             <span className="text-[11px] font-black uppercase tracking-widest">Custom Role Node</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}