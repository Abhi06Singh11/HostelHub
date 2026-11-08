'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getSAUsers, updateSAUserStatus, logSAAction, deleteSAUser } from '@/lib/sa-store';
import { User, AccountStatus, Role } from '@/lib/types';
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2, 
  Mail,
  Calendar,
  Lock,
  Eye,
  Trash2,
  ShieldAlert,
  Download,
  Users,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
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
import { useRouter } from 'next/navigation';

export default function SAUserManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const load = () => setUsers(getSAUsers());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const handleStatus = (id: string, name: string, status: AccountStatus) => {
    updateSAUserStatus(id, status);
    logSAAction('Update User Status', `${name} -> ${status}`, 'user_management');
    toast({ title: "Status Updated", description: `${name} is now ${status}.` });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const user = users.find(u => u.id === deleteId);
    deleteSAUser(deleteId);
    logSAAction('Decommission User', `${user?.name || deleteId}`, 'user_management');
    setDeleteId(null);
    toast({ title: "Account Decommissioned", description: "The user has been permanently removed from the ledger." });
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.roles.includes(roleFilter as Role);
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout role="superadmin">
      <SectionHeader 
        title="User Orchestration" 
        subtitle="Global Administration"
        action={{
          label: "Provision User",
          icon: UserPlus,
          onClick: () => {}
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Global Users" value={users.length} icon={Users} color="text-primary" />
        <StatCard label="Verified Nodes" value={users.filter(u => u.status === 'verified').length} icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard label="Pending Audit" value={users.filter(u => u.status === 'pending').length} icon={Calendar} color="text-amber-600" bg="bg-amber-50" />
        <StatCard label="Suspended" value={users.filter(u => u.status === 'suspended').length} icon={ShieldAlert} color="text-red-600" bg="bg-red-50" />
      </div>

      <div className="space-y-8 mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 enterprise-card border bg-card p-4">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by identity or contact..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-hide">
            {['all', 'superadmin', 'owner', 'contractor', 'student', 'agent'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                  roleFilter === r ? "bg-primary text-white border-primary shadow-sm" : "bg-card text-muted-foreground hover:bg-muted border-border"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <DataTable>
          <thead>
            <tr className="bg-muted/10 border-b">
              <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Profile Identity</th>
              <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Platform Roles</th>
              <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Audit Info</th>
              <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Compliance</th>
              <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(u => (
              <tr 
                key={u.id} 
                onClick={() => router.push(`/sa/users/${u.id}`)}
                className="hover:bg-muted/20 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs uppercase shadow-sm group-hover:scale-105 transition-transform">
                      {u.avatar || u.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{u.name}</p>
                       <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase"><Mail className="h-2.5 w-2.5" /> {u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                   <div className="flex flex-wrap gap-1.5">
                      {u.roles.map(r => (
                        <Badge key={r} variant="outline" className="text-[8px] font-black uppercase py-0 px-2 border-primary/30 bg-primary/5 text-primary tracking-tighter">
                          {r}
                        </Badge>
                      ))}
                   </div>
                </td>
                <td className="py-4 px-6">
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase"><Calendar className="h-2.5 w-2.5" /> Joined: {u.joinedAt}</p>
                      <p className="text-[9px] text-muted-foreground font-bold opacity-60 uppercase">Last Sync: {u.lastLogin || 'N/A'}</p>
                   </div>
                </td>
                <td className="py-4 px-6">
                   <span className={cn(
                     "px-3 py-1 rounded-lg text-[9px] font-black uppercase border shadow-sm",
                     u.status === 'verified' || u.status === 'active' ? "bg-emerald-600 text-white border-emerald-700" :
                     u.status === 'pending' ? "bg-primary text-white border-primary" :
                     u.status === 'suspended' ? "bg-red-600 text-white border-red-700" :
                     "bg-muted text-muted-foreground border-border"
                   )}>
                     {u.status}
                   </span>
                </td>
                <td className="py-4 px-6 text-right">
                   <div className="flex items-center justify-end gap-3">
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                           <DropdownMenuLabel className="text-[9px] font-black uppercase text-muted-foreground px-3 py-2 tracking-widest">Orchestration</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={() => router.push(`/sa/users/${u.id}`)} className="text-[12px] font-bold py-2.5 cursor-pointer rounded-lg"><Eye className="mr-3 h-4 w-4 text-primary" /> View Intelligence</DropdownMenuItem>
                           <DropdownMenuItem className="text-[12px] font-bold py-2.5 cursor-pointer rounded-lg"><Lock className="mr-3 h-4 w-4 text-primary" /> Modify Permissions</DropdownMenuItem>
                           <DropdownMenuSeparator />
                           {u.status !== 'suspended' ? (
                             <DropdownMenuItem 
                               onClick={() => handleStatus(u.id, u.name, 'suspended')}
                               className="text-[12px] font-bold py-2.5 cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 rounded-lg"
                             >
                               <ShieldAlert className="mr-3 h-4 w-4" /> Suspend Access
                             </DropdownMenuItem>
                           ) : (
                             <DropdownMenuItem 
                               onClick={() => handleStatus(u.id, u.name, 'active')}
                               className="text-[12px] font-bold py-2.5 cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 rounded-lg"
                             >
                               <CheckCircle2 className="mr-3 h-4 w-4" /> Restore Access
                             </DropdownMenuItem>
                           )}
                           <DropdownMenuItem onClick={() => setDeleteId(u.id)} className="text-[12px] font-bold py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg">
                              <Trash2 className="mr-3 h-4 w-4" /> Decommission
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-2">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">Decommission Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-bold uppercase tracking-widest leading-relaxed">
              This will permanently terminate the digital footprint of this user across all platform nodes. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-xl font-bold uppercase text-[10px] tracking-widest border-2">Abort</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg">Confirm Termination</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
