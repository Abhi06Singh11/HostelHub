'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Layers,
  Layout,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MarketerBannersPage() {
  const [banners, setBanners] = useState([
    { id: 'b1', name: 'Early Bird Discount 20%', location: 'Homepage Hero', status: 'active', schedule: 'May 01 - June 30', views: '14.2k' },
    { id: 'b2', name: 'Refer & Earn Program', location: 'Dashboard Sidebar', status: 'active', schedule: 'Permanent', views: '8.4k' },
    { id: 'b3', name: 'Pune Opening Special', location: 'Search Results Top', status: 'inactive', schedule: 'Expired', views: '2.1k' },
  ]);

  const handleDeactivate = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, status: 'inactive' } : b));
    toast({ title: "Promotion Deactivated", description: "Banner has been removed from the live site." });
  };

  return (
    <DashboardLayout role="supermarketer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-foreground">Promotional Content</h2>
            <p className="text-[15px] text-muted-foreground font-medium">Coordinate on-site banners, notification badges, and in-app promotional placements.</p>
          </div>
          <Button className="h-11 px-8 font-bold text-[11px] uppercase tracking-widest shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Upload Creative
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {banners.map(banner => (
            <div key={banner.id} className="enterprise-card border bg-card hover:border-primary group transition-all overflow-hidden flex flex-col">
               <div className="aspect-video bg-muted relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                     <Button variant="outline" className="text-white border-white/50 hover:bg-white/20 font-black uppercase text-[9px] tracking-widest">
                        <Eye className="h-3 w-3 mr-2" /> Preview Live
                     </Button>
                  </div>
                  <Badge className={cn(
                    "absolute top-3 right-3 text-[8px] font-black uppercase",
                    banner.status === 'active' ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                  )}>{banner.status}</Badge>
               </div>
               
               <div className="p-6 flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight line-clamp-1">{banner.name}</h3>
                    <p className="text-[10px] text-primary font-bold uppercase mt-1 flex items-center gap-1.5"><Layout className="h-3 w-3" /> {banner.location}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-dashed">
                     <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {banner.schedule}</span>
                        <span className="flex items-center gap-1.5"><Activity className="h-3 w-3" /> {banner.views} Views</span>
                     </div>
                  </div>
               </div>

               <div className="p-3 bg-muted/30 border-t flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">Edit Design</Button>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-3.5 w-3.5" /></Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="text-xs font-bold uppercase">Clone Promotion</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeactivate(banner.id)} className="text-xs font-bold uppercase text-red-600">Deactivate</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
          ))}
          <button className="h-full min-h-[200px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
             <Plus className="h-8 w-8" />
             <span className="text-[10px] font-black uppercase tracking-widest">Add Promotion Node</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
