'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getStoredStudents, calculateCompletion, getCompletionStatus, getMissingFields } from '@/lib/student-management-store';
import { StudentDetail } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Download,
  Building2,
  Phone,
  ChevronRight,
  AlertCircle,
  FileText
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
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AllStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [search, setSearch] = useState('');
  const [stayFilter, setStayFilter] = useState<'all' | 'active' | 'left'>('all');

  useEffect(() => {
    const data = getStoredStudents();
    if (stayFilter === 'all') setStudents(data);
    else setStudents(data.filter(s => s.stayStatus === stayFilter));
  }, [stayFilter]);

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 enterprise-card border bg-card p-4">
           <div className="relative flex-1 w-full md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID or mobile..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
           </div>
           <div className="flex gap-2 w-full md:col-span-2">
              {['all', 'active', 'left'].map(f => (
                <button
                  key={f}
                  onClick={() => setStayFilter(f as any)}
                  className={cn(
                    "flex-1 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                    stayFilter === f ? "bg-primary text-white border-primary shadow-md" : "bg-card text-muted-foreground hover:bg-muted border-border"
                  )}
                >
                  {f}
                </button>
              ))}
              <Button variant="outline" className="h-11 border-2 font-bold uppercase text-[10px] tracking-widest px-6 shrink-0">
                 <Filter className="h-3.5 w-3.5" />
              </Button>
           </div>
        </div>

        <DataTable>
           <thead>
              <tr className="bg-muted/10 border-b">
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Student / ID</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Profile Completion</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Gov ID</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Police Verification</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Stay Status</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {filtered.map(student => {
                const completion = calculateCompletion(student);
                const status = getCompletionStatus(student);
                const missing = getMissingFields(student);
                
                return (
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
                              <p className="text-[10px] text-muted-foreground font-bold uppercase">ID: {student.studentId} • {student.assignedHostelName}</p>
                          </div>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col gap-1.5 w-32 cursor-help">
                                <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                    <span className={cn(completion === 100 ? "text-emerald-600" : "text-muted-foreground")}>{status.replace('_', ' ')}</span>
                                    <span className="text-primary">{completion}%</span>
                                </div>
                                <Progress value={completion} className={cn("h-1", completion === 100 ? "bg-emerald-100" : "bg-muted")} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="p-4 max-w-[240px] rounded-2xl border-2">
                              {missing.length > 0 ? (
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold uppercase text-amber-600 flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> Missing Elements:</p>
                                  <ul className="text-[10px] font-medium uppercase list-disc pl-3 text-muted-foreground leading-relaxed">
                                    {missing.map(m => <li key={m}>{m}</li>)}
                                  </ul>
                                </div>
                              ) : (
                                <p className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" /> Profile Dossier 100% Complete</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
                          {student.policeVerified ? 'Verified' : 'Pending'}
                        </Badge>
                    </td>
                    <td className="py-4 px-6">
                        <Badge variant="outline" className={cn(
                            "text-[8px] font-bold uppercase px-3 py-0.5 border-primary/20",
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
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border shadow-2xl">
                                <DropdownMenuItem onClick={() => router.push(`/contractor/students/${student.id}`)} className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><Eye className="mr-3 h-4 w-4 text-primary" /> View Intelligence</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><FileText className="mr-3 h-4 w-4 text-primary" /> Review Docs</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-xs font-bold uppercase py-2.5 cursor-pointer rounded-lg"><Download className="mr-3 h-4 w-4 text-primary" /> Export Dossier</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={6} className="py-24 text-center">
                      <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-border">
                         <Search className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">No matching residents found</p>
                   </td>
                </tr>
              )}
           </tbody>
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
