'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getOwnerProperties } from '@/lib/owner-store';
import { Property } from '@/lib/types';
import { 
  Building2, 
  Plus, 
  MapPin, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Layers,
  Bed,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function OwnerPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = () => setProperties(getOwnerProperties());
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filtered = properties.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="owner">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Estate Portfolio</h2>
            <p className="text-[15px] text-muted-foreground font-medium max-w-xl">Manage your physical hostel buildings, track availability, and oversee structural condition.</p>
          </div>
          <Button onClick={() => router.push('/owner/properties/new')} className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Register New Asset
          </Button>
        </div>

        <div className="enterprise-card border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by building name or location..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 text-[12px] h-11 rounded-xl border-border bg-background font-medium"
              />
            </div>
            <div className="flex gap-3">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase"><Filter className="h-3 w-3 mr-2" /> All Areas</Button>
            </div>
          </div>

          <div className="divide-y">
            {filtered.map(p => (
              <div 
                key={p.id} 
                onClick={() => router.push(`/owner/properties/${p.id}`)}
                className="p-6 hover:bg-muted/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-l-4 border-l-transparent hover:border-l-primary cursor-pointer group"
              >
                <div className="flex gap-6">
                   <div className={cn(
                     "w-16 h-16 rounded-xl flex items-center justify-center border shrink-0 transition-colors overflow-hidden bg-muted",
                     p.status === 'rented' ? "border-emerald-200" : "border-blue-200"
                   )}>
                     {p.images && p.images[0] ? (
                       <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                     ) : (
                       <Building2 className="h-8 w-8 text-muted-foreground opacity-50" />
                     )}
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                         <span className={cn(
                           "text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border",
                           p.condition === 'Excellent' ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-border"
                         )}>{p.condition}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-bold uppercase flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary/50" /> {p.address}</p>
                      <div className="flex items-center gap-6 pt-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5"><Layers className="h-3 w-3" /> {p.totalFloors} Floors</span>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> {p.totalRooms} Units</span>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground/70 flex items-center gap-1.5"><Bed className="h-3 w-3" /> {p.totalBeds} Bed Cap.</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-bold uppercase border shadow-sm inline-block",
                        p.status === 'rented' ? "bg-emerald-600 text-white border-emerald-700" :
                        p.status === 'available' ? "bg-primary text-white border-primary" :
                        "bg-muted text-muted-foreground border-border"
                      )}>
                        {p.status}
                      </span>
                      {p.status === 'rented' && <p className="text-[9px] font-bold text-muted-foreground uppercase mt-2">Active Lease Agreement</p>}
                   </div>
                   
                   <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button onClick={() => router.push(`/owner/properties/${p.id}/edit`)} variant="ghost" size="icon" className="h-10 w-10"><Settings className="h-4 w-4" /></Button>
                      <Button onClick={() => router.push(`/owner/properties/${p.id}`)} variant="ghost" size="icon" className="h-10 w-10"><ExternalLink className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10"><MoreVertical className="h-4 w-4" /></Button>
                   </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-24 text-center bg-muted/5">
                <Search className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">No matching properties</h3>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Refine your search or register a new building asset.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
