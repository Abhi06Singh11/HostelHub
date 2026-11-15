'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getStoredStudents } from '@/lib/student-management-store';
import { StudentDetail } from '@/lib/types';
import { Search, Building2, Eye, MoreVertical, ChevronRight, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ActiveStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getStoredStudents().filter(s => s.stayStatus === 'active'));
  }, []);

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Active Residents" 
          subtitle="Currently In-Hub Students"
        />

        <div className="enterprise-card border bg-card p-4">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Filter active students..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
           </div>
        </div>

        <DataTable>
           <thead>
              <tr className="bg-muted/10 border-b">
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Allocation</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Check-In Date</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Verification</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Node</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {filtered.map(student => (
                <tr 
                  key={student.id} 
                  onClick={() => router.push(`/contractor/students/${student.id}`)}
                  className="hover:bg-muted/20 transition-all group cursor-pointer"
                >
                   <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                            {student.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-foreground">{student.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{student.studentId}</p>
                         </div>
                      </div>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground uppercase">{student.assignedHostelName}</p>
                      <p className="text-[10px] text-primary font-bold uppercase">Room {student.roomNumber}-{student.bedNumber}</p>
                   </td>
                   <td className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase">{student.checkInDate}</td>
                   <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Badge className={cn("text-[7px] uppercase", student.govIdVerified ? "bg-emerald-600" : "bg-amber-500")}>GOV</Badge>
                        <Badge className={cn("text-[7px] uppercase", student.policeVerified ? "bg-emerald-600" : "bg-muted text-muted-foreground")}>POL</Badge>
                      </div>
                   </td>
                   <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="icon" className="group-hover:text-primary"><ChevronRight className="h-4 w-4" /></Button>
                   </td>
                </tr>
              ))}
           </tbody>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
