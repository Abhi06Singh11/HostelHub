'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSDDocs } from '@/lib/sd-store';
import { TechnicalDoc } from '@/lib/types';
import { 
  BookText, 
  Search, 
  Plus, 
  MoreVertical, 
  FileText, 
  Clock, 
  User, 
  Filter,
  ExternalLink,
  ChevronRight,
  Code2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function SuperDevDocsPage() {
  const [docs, setDocs] = useState<TechnicalDoc[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDocs(getSDDocs());
  }, []);

  const filtered = docs.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="superdev">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Knowledge Base</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Internal technical documentation, API specifications, and infrastructure blueprints.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Write Doc
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1 space-y-6">
              <div className="enterprise-card border bg-card p-6 space-y-4">
                 <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Library Sections</p>
                 <nav className="space-y-1">
                    <DocNav icon={Zap} label="Getting Started" active />
                    <DocNav icon={Code2} label="API Specification" />
                    <DocNav icon={ShieldCheck} label="Security Policies" />
                    <DocNav icon={BookText} label="Dev Guidelines" />
                 </nav>
              </div>

              <div className="enterprise-card border bg-primary text-primary-foreground p-6 space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">Doc Pulse</h4>
                 <p className="text-xs font-medium leading-relaxed">3 technical docs were updated this week. Keep the specifications synchronized with the release cycle.</p>
              </div>
           </div>

           <div className="lg:col-span-3 space-y-6">
              <div className="enterprise-card border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
                   <div className="relative w-96">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search knowledge base..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
                    />
                  </div>
                </div>
                <div className="divide-y">
                   {filtered.map(doc => (
                     <div key={doc.id} className="p-6 hover:bg-muted/30 transition-all flex items-center justify-between group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                        <div className="flex gap-6">
                           <div className="p-3 rounded-xl bg-muted border group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                              <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-base font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{doc.title}</h4>
                              <div className="flex items-center gap-4">
                                 <Badge variant="outline" className="text-[8px] font-black uppercase border-border">{doc.category}</Badge>
                                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><User className="h-3 w-3" /> {doc.author}</span>
                                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Clock className="h-3 w-3" /> {doc.lastModified}</span>
                              </div>
                           </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DocNav({ icon: Icon, label, active = false }: any) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all",
      active ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-muted"
    )}>
       <Icon className="h-4 w-4" />
       {label}
    </button>
  );
}
