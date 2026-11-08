'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getSAAnnouncements, addSAAnnouncement, logSAAction } from '@/lib/sa-store';
import { PlatformAnnouncement, Role } from '@/lib/types';
import { 
  Megaphone, 
  Plus, 
  Send, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Users, 
  Search,
  CheckCircle2,
  Calendar,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

export default function SAAnnouncementsPage() {
  const [anns, setAnns] = useState<PlatformAnnouncement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnn, setNewAnn] = useState({ title: '', content: '', targetRoles: [] as Role[] });

  useEffect(() => {
    setAnns(getSAAnnouncements());
  }, []);

  const handlePublish = () => {
    if (!newAnn.title || !newAnn.content) return;
    addSAAnnouncement({ ...newAnn, status: 'published' });
    setAnns(getSAAnnouncements());
    logSAAction('Publish Announcement', newAnn.title, 'content');
    setIsDialogOpen(false);
    setNewAnn({ title: '', content: '', targetRoles: [] });
    toast({ title: "Broadcast Dispatched", description: "All targeted platform nodes have been synchronized." });
  };

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Global Broadcasts</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Synchronize information across platform roles, schedule critical updates, and manage the administrative feed.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
                <Plus className="h-4 w-4 mr-2" /> Dispatch Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-3xl border-2">
              <DialogHeader>
                <DialogTitle className="text-xl font-black uppercase tracking-tight">Compose Global Signal</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Broadcast Header *</Label>
                   <Input value={newAnn.title} onChange={(e) => setNewAnn({...newAnn, title: e.target.value})} placeholder="Signal Identity..." className="h-11 border-2 font-bold focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payload Content *</Label>
                   <Textarea value={newAnn.content} onChange={(e) => setNewAnn({...newAnn, content: e.target.value})} placeholder="Enter detail narrative..." className="min-h-[120px] border-2 font-medium" />
                </div>
                <div className="space-y-3">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Role Clusters</Label>
                   <div className="grid grid-cols-3 gap-2">
                      {['owner', 'contractor', 'student', 'agent'].map(r => (
                        <button
                          key={r}
                          onClick={() => {
                            const current = [...newAnn.targetRoles];
                            const idx = current.indexOf(r as any);
                            if (idx > -1) current.splice(idx, 1);
                            else current.push(r as any);
                            setNewAnn({...newAnn, targetRoles: current});
                          }}
                          className={cn(
                            "px-3 py-2 rounded-xl text-[9px] font-black uppercase border-2 transition-all",
                            newAnn.targetRoles.includes(r as any) ? "bg-primary text-white border-primary shadow-md" : "bg-card text-muted-foreground border-border hover:bg-muted"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-black text-[10px] uppercase tracking-widest">Abort</Button>
                <Button onClick={handlePublish} className="h-11 px-10 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl">
                   <Send className="h-4 w-4 mr-2" /> Transmit Signal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AnnStat label="Live Broadcasts" value={anns.filter(a => a.status === 'published').length} icon={Globe} color="text-emerald-600" bg="bg-emerald-50" />
           <AnnStat label="Draft Cycles" value={anns.filter(a => a.status === 'draft').length} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
           <AnnStat label="Platform Reach" value="1.4k Nodes" icon={Users} color="text-primary" bg="bg-primary/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {anns.map(ann => (
             <div key={ann.id} className="enterprise-card border bg-card hover:border-primary group transition-all p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <h3 className="text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{ann.title}</h3>
                         <Badge className={cn(
                           "text-[8px] font-black uppercase border",
                           ann.status === 'published' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                         )}>{ann.status}</Badge>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Calendar className="h-3 w-3" /> Transmitted: {ann.publishedAt}</p>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </div>
                <div className="bg-muted/20 p-5 rounded-2xl border-2 border-dashed mb-6 flex-1">
                   <p className="text-sm font-medium text-foreground leading-relaxed italic">"{ann.content}"</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dashed">
                   <div className="flex gap-2">
                      {ann.targetRoles.map(r => (
                        <span key={r} className="px-2.5 py-0.5 rounded-lg bg-primary/5 text-primary text-[8px] font-black uppercase border border-primary/20 tracking-tighter">{r}</span>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">Edit Payload</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-red-600">Decommission</Button>
                   </div>
                </div>
             </div>
           ))}
           {anns.length === 0 && (
             <div className="col-span-full py-24 text-center border-2 border-dashed rounded-3xl bg-muted/5 opacity-40">
                <Megaphone className="h-10 w-10 mx-auto mb-4" />
                <p className="text-[11px] font-black uppercase tracking-widest">Signal Feed Clear</p>
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function AnnStat({ label, value, icon: Icon, color, bg }: any) {
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