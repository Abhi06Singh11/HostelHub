'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getStoredStudents } from '@/lib/student-management-store';
import { StudentDetail } from '@/lib/types';
import { Search, History, Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function PreviouslyLeftPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getStoredStudents().filter(s => s.stayStatus === 'left'));
  }, []);

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Past Residents" 
          subtitle="Historical Stay Ledger"
        />

        <div className="enterprise-card border bg-card p-4">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search archive..." 
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
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Last PG Node</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Check-In</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Check-Out</th>
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
                   <td className="py-4 px-6 text-sm font-bold text-foreground uppercase">{student.name}</td>
                   <td className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase">{student.assignedHostelName}</td>
                   <td className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase">{student.checkInDate}</td>
                   <td className="py-4 px-6 text-xs font-bold text-primary uppercase">{student.checkOutDate || '2024-01-01'}</td>
                   <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                   </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-24 text-center">
                      <History className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">No historical records found</p>
                   </td>
                </tr>
              )}
           </tbody>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
