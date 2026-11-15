'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SectionHeader, DataTable } from '@/components/DashboardComponents';
import { getContractorAgents, addAgent, updateAgent, deleteAgent } from '@/lib/agent-store';
import { Agent } from '@/lib/types';
import { 
  Plus, 
  Search, 
  UserPlus, 
  Mail, 
  Smartphone, 
  Calendar, 
  ShieldCheck, 
  MoreVertical, 
  Trash2, 
  Edit,
  Save,
  XCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ManageAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Partial<Agent>>({});

  const contractorId = 'u4'; // Mock active contractor

  useEffect(() => {
    setAgents(getContractorAgents(contractorId));
  }, []);

  const handleAdd = () => {
    if (!currentAgent.name || !currentAgent.email || !currentAgent.phone) {
      toast({ variant: "destructive", title: "Incomplete Form", description: "Name, Email and Phone are mandatory." });
      return;
    }
    addAgent({
      ...currentAgent as any,
      status: 'active',
      joiningDate: new Date().toISOString().split('T')[0],
      commissionRate: currentAgent.commissionRate || '₹2500/Admission',
      contractorId
    });
    setAgents(getContractorAgents(contractorId));
    setIsAddOpen(false);
    setCurrentAgent({});
    toast({ title: "Agent Provisioned", description: "The new partner has been added to the registry." });
  };

  const handleUpdate = () => {
    if (currentAgent.id) {
      updateAgent(currentAgent.id, currentAgent);
      setAgents(getContractorAgents(contractorId));
      setIsEditOpen(false);
      setCurrentAgent({});
      toast({ title: "Agent Logic Updated", description: "Configuration has been synchronized." });
    }
  };

  const handleDelete = (id: string) => {
    deleteAgent(id);
    setAgents(getContractorAgents(contractorId));
    toast({ variant: "destructive", title: "Agent Decommissioned", description: "Record permanently purged from node." });
  };

  const filtered = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="contractor">
      <div className="space-y-8">
        <SectionHeader 
          title="Agent Registry Management" 
          subtitle="Administrative Node controls"
          action={{
            label: "Provision New Partner",
            icon: UserPlus,
            onClick: () => { setCurrentAgent({}); setIsAddOpen(true); }
          }}
        />

        <div className="enterprise-card border bg-card p-4">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search registered partners..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-11 border-2 focus-visible:ring-primary rounded-xl font-medium"
              />
           </div>
        </div>

        <DataTable>
           <thead>
              <tr className="bg-muted/10 border-b">
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Partner Identity</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Contact Intel</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Joined On</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest">Commission Logic</th>
                 <th className="text-[10px] font-bold text-muted-foreground py-4 px-6 uppercase tracking-widest text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y">
              {filtered.map(agent => (
                <tr key={agent.id} className="hover:bg-muted/20 transition-all border-l-4 border-l-transparent hover:border-l-primary group">
                   <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {agent.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{agent.name}</p>
                            <Badge variant="outline" className="text-[7px] font-black uppercase mt-1 border-primary/20 text-primary">{agent.status}</Badge>
                         </div>
                      </div>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase"><Smartphone className="h-3 w-3 opacity-50" /> {agent.phone}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{agent.email}</p>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {agent.joiningDate}</p>
                   </td>
                   <td className="py-4 px-6">
                      <p className="text-xs font-bold text-primary uppercase">{agent.commissionRate}</p>
                   </td>
                   <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="h-4 w-4" /></Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                            <DropdownMenuItem onClick={() => { setCurrentAgent(agent); setIsEditOpen(true); }} className="text-xs font-bold uppercase py-2.5 rounded-lg"><Edit className="mr-3 h-4 w-4 text-primary" /> Edit Config</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(agent.id)} className="text-xs font-bold uppercase py-2.5 rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"><Trash2 className="mr-3 h-4 w-4" /> Decommission</DropdownMenuItem>
                         </DropdownMenuContent>
                      </DropdownMenu>
                   </td>
                </tr>
              ))}
           </tbody>
        </DataTable>

        {/* Add Agent Dialog */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="max-w-md rounded-3xl border-2">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">Provision Partner Node</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Legal Name *</Label>
                <Input value={currentAgent.name} onChange={(e) => setCurrentAgent({...currentAgent, name: e.target.value})} className="h-11 border-2 font-bold focus-visible:ring-primary" placeholder="Enter name..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Node *</Label>
                  <Input value={currentAgent.email} onChange={(e) => setCurrentAgent({...currentAgent, email: e.target.value})} className="h-11 border-2 font-bold" placeholder="agent@email.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Mobile Logic *</Label>
                  <Input value={currentAgent.phone} onChange={(e) => setCurrentAgent({...currentAgent, phone: e.target.value})} className="h-11 border-2 font-bold" placeholder="+91..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Commission Rate</Label>
                <Input value={currentAgent.commissionRate} onChange={(e) => setCurrentAgent({...currentAgent, commissionRate: e.target.value})} className="h-11 border-2 font-bold" placeholder="e.g. ₹2500 per Admission" />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="font-bold uppercase text-[10px] tracking-widest">Abort</Button>
              <Button onClick={handleAdd} className="h-11 px-8 font-bold uppercase text-[10px] tracking-widest bg-primary shadow-lg">Commit Provision</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-md rounded-3xl border-2">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">Modify Partner Logic</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Partner Name</Label>
                <Input value={currentAgent.name} onChange={(e) => setCurrentAgent({...currentAgent, name: e.target.value})} className="h-11 border-2 font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Commission Structure</Label>
                <Input value={currentAgent.commissionRate} onChange={(e) => setCurrentAgent({...currentAgent, commissionRate: e.target.value})} className="h-11 border-2 font-bold" />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="font-bold uppercase text-[10px] tracking-widest">Cancel</Button>
              <Button onClick={handleUpdate} className="h-11 px-8 font-bold uppercase text-[10px] tracking-widest bg-primary shadow-lg">Save Configuration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
