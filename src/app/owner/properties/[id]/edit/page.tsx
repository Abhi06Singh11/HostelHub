'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { getOwnerProperties, updateOwnerProperty } from '@/lib/owner-store';
import { Property } from '@/lib/types';
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  MapPin, 
  Info, 
  Zap, 
  ShieldCheck,
  Layers 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Property> | null>(null);

  useEffect(() => {
    const props = getOwnerProperties();
    const found = props.find(p => p.id === id);
    if (found) setFormData(found);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    updateOwnerProperty(id as string, formData);
    toast({ title: "Configuration Updated", description: "Property details have been synchronized." });
    router.push(`/owner/properties/${id}`);
  };

  if (!formData) return null;

  return (
    <DashboardLayout role="owner">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="h-10 px-4 font-bold uppercase text-[11px] tracking-widest">
            <ArrowLeft className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Configure Building Asset</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="flex items-center gap-3 border-b border-dashed pb-6">
                 <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Building2 className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight">Identity & Narrative</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Asset Display Name *</Label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12 rounded-xl border-2 font-bold focus-visible:ring-primary"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Property Classification</Label>
                    <Select value={formData.type} onValueChange={(val: any) => setFormData({...formData, type: val})}>
                       <SelectTrigger className="h-12 rounded-xl border-2 font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent className="border-2 shadow-xl">
                          {['Hostel', 'PG', 'Building', 'Flats'].map(t => (
                            <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Physical Address *</Label>
                    <Input 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="h-12 rounded-xl border-2 font-bold"
                    />
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Market Description</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="min-h-[120px] rounded-2xl border-2 font-medium bg-background text-lg leading-relaxed italic"
                    />
                 </div>
              </div>
           </div>

           <div className="enterprise-card border bg-card p-10 space-y-10">
              <div className="flex items-center gap-3 border-b border-dashed pb-6">
                 <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Layers className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight">Capacity & Structure</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <EditField label="Total Floors" value={formData.totalFloors} onChange={(v: string) => setFormData({...formData, totalFloors: Number(v)})} type="number" />
                 <EditField label="Unit Count" value={formData.totalRooms} onChange={(v: string) => setFormData({...formData, totalRooms: Number(v)})} type="number" />
                 <EditField label="Max Bed Cap." value={formData.totalBeds} onChange={(v: string) => setFormData({...formData, totalBeds: Number(v)})} type="number" />
                 <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Structural Condition</Label>
                    <Select value={formData.condition} onValueChange={(val: any) => setFormData({...formData, condition: val})}>
                       <SelectTrigger className="h-11 rounded-xl border-2 font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent className="border-2 shadow-xl">
                          {['Excellent', 'Good', 'Fair', 'Needs Renovation'].map(c => (
                            <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>
              </div>
           </div>

           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
              <div className="bg-slate-900 text-white rounded-[2rem] p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-xl">
                 <div className="flex items-center gap-4 pl-6">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">DRAFT SYNCHRONIZATION READY</p>
                 </div>
                 <div className="flex gap-3">
                    <Button type="button" variant="ghost" onClick={() => router.back()} className="text-white hover:bg-white/10 font-black uppercase text-[11px] tracking-widest h-14 px-8 rounded-2xl">Revert</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] tracking-[0.2em] h-14 px-10 rounded-2xl shadow-xl">
                       <Save className="h-4 w-4 mr-2" /> Commit Changes
                    </Button>
                 </div>
              </div>
           </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

function EditField({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-3">
       <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</Label>
       <Input 
         type={type}
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className="h-11 rounded-xl border-2 font-bold"
       />
    </div>
  );
}
