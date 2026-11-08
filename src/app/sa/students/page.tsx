'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAUsersByRole } from '@/lib/sa-store';
import { User } from '@/lib/types';
import { 
  GraduationCap, 
  Search, 
  MoreVertical, 
  Users, 
  Home, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  History,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SAStudentsPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getSAUsersByRole('student'));
  }, []);

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Resident Network</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Global oversight of all student residents, monitor verification status, and handle high-level complaints.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <StudentStat label="Total Residents" value={students.length} icon={Users} color="text-primary" bg="bg-primary/5" />
           <StudentStat label="Verified Nodes" value={students.filter(s => s.status === 'verified').length} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
           <StudentStat label="Pending KYC" value={students.filter(s => s.status === 'pending').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
           <StudentStat label="Suspended" value={students.filter(s => s.status === 'suspended').length} icon={AlertCircle} color="text-red-600" bg="bg-red-50" />
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search student resident ID or email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium focus-visible:ring-primary"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> All Hostels</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Resident / Identity</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Assigned Unit</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest">Ledger Status</th>
                  <th className="text-[10px] font-black text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 font-black text-xs uppercase">
                          {student.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-sm font-black text-foreground">{student.name}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1.5"><Home className="h-3.5 w-3.5 text-primary" /> StaySync Tech Wing (304-A)</p>
                    </td>
                    <td className="py-4 px-6">
                       <span className={cn(
                         "px-2.5 py-0.5 rounded text-[8px] font-black uppercase border",
                         student.status === 'verified' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground border-border"
                       )}>{student.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Resident Profile</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5">Payment History</DropdownMenuItem>
                             <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 text-red-600">Terminate Stay</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
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

function StudentStat({ label, value, icon: Icon, color, bg }: any) {
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
