'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';
import { addOwnerProperty } from '@/lib/owner-store';
import { Property } from '@/lib/types';
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  Plus,
  Info,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export default function NewPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Property>>({
    name: '',
    description: '',
    address: '',
    type: 'Hostel',
    totalFloors: 3,
    totalRooms: 10,
    totalBeds: 30,
    status: 'available',
    condition: 'Excellent',
    amenities: ['Security', 'Water Purifier']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      toast({ variant: "destructive", title: "Incomplete Request", description: "Asset name and address are mandatory fields." });
      return;
    }
    addOwnerProperty(formData as any);
    toast({ title: "Asset Registered", description: "New building has been added to your estate portfolio." });
    router.push('/owner/properties');
  };

  return (
    <DashboardLayout role="owner">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="h-10 px-4 font-bold uppercase text-[11px] tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Initialize New Building</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="flex items-center gap-3 border-b border-dashed pb-6">
                 <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Building2 className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight">Identity Definition</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Asset Display Name *</Label>
                    <Input 
                      placeholder="e.g. Skyline Residency"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Property classification</Label>
                    <Select value={formData.type} onValueChange={(val: any) => setFormData({...formData, type: val})}>
                       <SelectTrigger className="h-12 rounded-xl border-2 font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent>
                          {['Hostel', 'PG', 'Building', 'Flats'].map(t => (
                            <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Physical Address *</Label>
                    <Input 
                      placeholder="Full geographical location..."
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="h-12 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Building Description</Label>
                    <Textarea 
                      placeholder="Key highlights and location benefits..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="min-h-[120px] rounded-2xl border-2 font-medium"
                    />
                 </div>
              </div>
           </div>

           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="flex items-center gap-3 border-b border-dashed pb-6">
                 <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Layers className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight">Capacity & Baseline</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Total Floors</Label>
                    <Input 
                      type="number"
                      value={formData.totalFloors}
                      onChange={(e) => setFormData({...formData, totalFloors: Number(e.target.value)})}
                      className="h-11 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Room Count</Label>
                    <Input 
                      type="number"
                      value={formData.totalRooms}
                      onChange={(e) => setFormData({...formData, totalRooms: Number(e.target.value)})}
                      className="h-11 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Bed Capacity</Label>
                    <Input 
                      type="number"
                      value={formData.totalBeds}
                      onChange={(e) => setFormData({...formData, totalBeds: Number(e.target.value)})}
                      className="h-11 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Initial status</Label>
                    <Select value={formData.status} onValueChange={(val: any) => setFormData({...formData, status: val})}>
                       <SelectTrigger className="h-11 rounded-xl border-2 font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent>
                          <SelectItem value="available" className="font-bold">Available</SelectItem>
                          <SelectItem value="maintenance" className="font-bold">Under Maintenance</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
              </div>
           </div>

           <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="h-14 px-10 rounded-2xl font-black uppercase text-[11px] tracking-widest border-2">Cancel</Button>
              <Button type="submit" className="h-14 px-12 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl">
                 <Save className="h-4 w-4 mr-2" /> Register Asset
              </Button>
           </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
