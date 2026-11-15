'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getStoredStudents } from '@/lib/student-management-store';
import { StudentDetail } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  History, 
  Eye, 
  Download,
  Building2,
  Phone,
  Mail,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AllStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.studentId.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Student Directory" 
          subtitle="All Residents Ledger"
          action={{
            label: "Export CSV",
            icon: Download,
            onClick: () => {}
          }}
        />

        <div className="enterprise-card border bg-card p-4 flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID or mobile..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
           </div>
           <Button variant="outline" className="h-11 border-2 font-bold uppercase text-[10px] tracking-widest px-6">
              <Filter className="h-3.5 w-3.5 mr-2" /> Advanced Filters
           </Button>
        </div>

        <DataTable>
           <thead>
              <tr className="bg-muted/10 border-b">
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student / ID</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Hostel Node</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Gov ID Sync</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Police Sync</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Status</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {filtered.map(student => (
                <tr 
                  key={student.id} 
                  onClick={() => router.push(`/contractor/students/${student.id}`)}
                  className="hover:bg-muted/20 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                >
                   <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                         <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                            {student.avatar || student.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{student.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">ID: {student.studentId} • {student.phone}</p>
                         </div>
                      </div>
                   </td>
                   <td className="py-4 px-6">
                      <div className="space-y-1">
                         <p className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase"><Building2 className="h-3 w-3 text-primary" /> {student.assignedHostelName}</p>
                         <p className="text-[10px] text-muted-foreground font-bold uppercase">Room {student.roomNumber}-{student.bedNumber}</p>
                      </div>
                   </td>
                   <td className="py-4 px-6">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border shadow-none px-3",
                        student.govIdVerified ? "bg-emerald-600 text-white border-emerald-700" : "bg-amber-500 text-white border-amber-600"
                      )}>
                        {student.govIdVerified ? 'Verified' : 'Pending'}
                      </Badge>
                   </td>
                   <td className="py-4 px-6">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border shadow-none px-3",
                        student.policeVerified ? "bg-emerald-600 text-white border-emerald-700" : "bg-muted text-muted-foreground border-border"
                      )}>
                        {student.policeVerified ? 'Verified' : 'Not Started'}
                      </Badge>
                   </td>
                   <td className="py-4 px-6">
                      <Badge variant="outline" className={cn(
                        "text-[8px] font-bold uppercase px-3 py-1",
                        student.stayStatus === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-muted text-muted-foreground border-border"
                      )}>
                        {student.stayStatus}
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
                               <DropdownMenuItem onClick={() => router.push(`/contractor/students/${student.id}`)} className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><Eye className="mr-3 h-4 w-4 text-primary" /> View Detailed Profile</DropdownMenuItem>
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><History className="mr-3 h-4 w-4 text-primary" /> Stay History</DropdownMenuItem>
                               <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><Download className="mr-3 h-4 w-4 text-primary" /> Download PDF Record</DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
