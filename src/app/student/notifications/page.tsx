'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStudentNotifications, markNotificationRead } from '@/lib/student-store';
import { StudentNotification } from '@/lib/types';
import { 
  Bell, 
  Wallet, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Mail, 
  MessageSquare,
  Search,
  Filter,
  Megaphone,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const catIcons: any = {
  rent: { icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  complaint: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  announcement: { icon: Megaphone, color: 'text-primary', bg: 'bg-primary/5' },
  system: { icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  profile: { icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' }
};

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setNotifications(getStudentNotifications());
  }, []);

  const handleRead = (id: string) => {
    markNotificationRead(id);
    setNotifications(getStudentNotifications());
  };

  const filtered = notifications.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Alert Hub</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Real-time updates on rent, facility issues, and hostel announcements.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="h-11 px-6 font-bold text-[11px] uppercase tracking-widest border-2">
                Mark All Read
             </Button>
          </div>
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search notifications..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest"><Filter className="h-3.5 w-3.5 mr-2" /> Filter Category</Button>
            </div>
          </div>

          <div className="divide-y">
            {filtered.map(n => {
              const cat = catIcons[n.category] || catIcons.system;
              return (
                <div 
                  key={n.id} 
                  onClick={() => handleRead(n.id)}
                  className={cn(
                    "p-6 flex items-start gap-6 transition-all border-l-4 cursor-pointer",
                    n.isRead ? "border-transparent bg-card" : "border-primary bg-primary/5 shadow-inner"
                  )}
                >
                  <div className={cn("p-3 rounded-xl border shrink-0", cat.bg, cat.color)}>
                     <cat.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                     <div className="flex justify-between items-start">
                        <h4 className={cn("text-[15px] font-bold uppercase tracking-tight", n.isRead ? "text-muted-foreground" : "text-foreground")}>{n.title}</h4>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><Clock className="h-3 w-3" /> {n.timestamp}</span>
                     </div>
                     <p className={cn("text-sm font-medium leading-relaxed", n.isRead ? "text-muted-foreground/60" : "text-foreground/80")}>{n.message}</p>
                     
                     <div className="flex items-center gap-6 pt-3">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{n.category}</span>
                        {n.whatsappStatus && (
                          <div className="flex items-center gap-1.5">
                             <Smartphone className="h-3 w-3 text-emerald-600" />
                             <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">WhatsApp: {n.whatsappStatus}</span>
                          </div>
                        )}
                     </div>
                  </div>
                  {!n.isRead && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(36,91,74,0.5)] mt-2" />}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="p-24 text-center opacity-40">
                 <Bell className="h-10 w-10 mx-auto mb-4" />
                 <p className="text-[11px] font-bold uppercase tracking-widest">Your inbox is clear</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
