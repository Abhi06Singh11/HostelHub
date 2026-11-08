'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getStoredProjects, updateProject } from '@/lib/project-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Save, Building2, ShieldCheck, ClipboardList } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const projs = getStoredProjects();
    const found = projs.find(p => p.id === id);
    if (found) {
      setFormData({
        title: found.title,
        propertyName: found.propertyName,
        address: found.address,
        totalRooms: found.totalRooms,
        totalBeds: found.totalBeds,
        ownershipType: found.ownershipType,
        ownerName: found.ownerName || '',
        ownerPhone: found.ownerPhone || '',
        ownerEmail: found.ownerEmail || '',
        monthlyRent: found.monthlyRent ? found.monthlyRent.toString() : '',
        contractStart: found.contractStart || '',
        contractEnd: found.contractEnd || '',
        priority: found.priority,
        status: found.status
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(id as string, {
      ...formData,
      totalRooms: Number(formData.totalRooms),
      totalBeds: Number(formData.totalBeds),
      monthlyRent: formData.ownershipType === 'rented' ? Number(formData.monthlyRent) : 0,
      deadline: formData.contractEnd || formData.deadline
    });
    toast({ title: "Configuration Updated", description: "Hostel operational details have been successfully synchronized." });
    router.push(`/contractor/projects/${id}`);
  };

  if (!formData) return null;

  return (
    <DashboardLayout role="contractor">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h2 className="text-2xl font-black tracking-tight uppercase">Update Management Configuration</h2>
        </div>

        <div className="enterprise-card border bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Identity */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Building Identification</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Business Management Title</Label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="h-11 font-bold rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Property Display Name</Label>
                  <Input 
                    value={formData.propertyName}
                    onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                    className="h-11 font-bold rounded-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Physical Address</Label>
                  <Input 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-11 font-bold rounded-none"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 2: Ownership Mode */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Ownership & Management Mode</h3>
              </div>
              
              <RadioGroup 
                value={formData.ownershipType} 
                onValueChange={(val: any) => setFormData({...formData, ownershipType: val})}
                className="grid grid-cols-2 gap-4"
              >
                <div className={cn(
                  "flex items-center space-x-3 p-4 border rounded-none cursor-pointer transition-colors",
                  formData.ownershipType === 'owned' ? "border-primary bg-primary/5" : "hover:bg-slate-50"
                )}>
                  <RadioGroupItem value="owned" id="owned" />
                  <Label htmlFor="owned" className="font-bold cursor-pointer">Self-Owned Property</Label>
                </div>
                <div className={cn(
                  "flex items-center space-x-3 p-4 border rounded-none cursor-pointer transition-colors",
                  formData.ownershipType === 'rented' ? "border-primary bg-primary/5" : "hover:bg-slate-50"
                )}>
                  <RadioGroupItem value="rented" id="rented" />
                  <Label htmlFor="rented" className="font-bold cursor-pointer">Rented/Managed Hub</Label>
                </div>
              </RadioGroup>

              {formData.ownershipType === 'rented' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border border-dashed animate-in fade-in duration-300">
                  <div className="md:col-span-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Building Owner Credentials</h4>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Owner Full Name</Label>
                    <Input 
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Monthly Rental (₹)</Label>
                    <Input 
                      type="number"
                      value={formData.monthlyRent}
                      onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Contact Phone</Label>
                    <Input 
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Contact Email</Label>
                    <Input 
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Agreement Start</Label>
                    <Input 
                      type="date"
                      value={formData.contractStart}
                      onChange={(e) => setFormData({...formData, contractStart: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Agreement End</Label>
                    <Input 
                      type="date"
                      value={formData.contractEnd}
                      onChange={(e) => setFormData({...formData, contractEnd: e.target.value})}
                      className="h-10 font-bold rounded-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Section 3: Capacity & Meta */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-widest">Hostel Meta Configuration</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Total Rooms</Label>
                  <Input 
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({...formData, totalRooms: e.target.value})}
                    className="h-11 font-bold rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Total Bed Capacity</Label>
                  <Input 
                    type="number"
                    value={formData.totalBeds}
                    onChange={(e) => setFormData({...formData, totalBeds: e.target.value})}
                    className="h-11 font-bold rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Operational Priority</Label>
                  <Select value={formData.priority} onValueChange={(val) => setFormData({...formData, priority: val})}>
                    <SelectTrigger className="h-11 font-bold rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase text-slate-400">Site Status</Label>
                  <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                    <SelectTrigger className="h-11 font-bold rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()} className="uppercase font-black text-[13px] rounded-none">Cancel</Button>
              <Button type="submit" className="uppercase font-black text-[13px] px-8 rounded-none">
                <Save className="h-4 w-4 mr-2" /> Commit Synchronization
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
