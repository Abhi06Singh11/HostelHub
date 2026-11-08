'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { getStoredProjects } from '@/lib/project-store';
import { addReferral } from '@/lib/referral-store';
import { Project } from '@/lib/types';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Building2, 
  Users, 
  CheckCircle2, 
  Target, 
  ArrowRight,
  Filter,
  UserPlus,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function AgentMatchmakingPage() {
  const [hostels, setHostels] = useState<Project[]>([]);
  const [criteria, setCurrentCriteria] = useState({
    gender: 'Any',
    location: '',
    budget: 15000,
    accommodation: 'Any'
  });

  useEffect(() => {
    setHostels(getStoredProjects());
  }, []);

  const matches = hostels.map(h => {
    let score = 100;
    const reasons = [];

    if (criteria.location && !h.address.toLowerCase().includes(criteria.location.toLowerCase())) {
      score -= 30;
      reasons.push("Location mismatch");
    }
    
    const rent = h.monthlyRent || 12000;
    if (rent > criteria.budget) {
      score -= 20;
      reasons.push("Above budget");
    }

    if (h.totalBeds - h.occupiedBeds < 1) {
      score -= 50;
      reasons.push("No vacant beds");
    }

    return { ...h, score: Math.max(0, score), reasons: reasons.length ? reasons : ["Perfect fit for criteria"] };
  }).sort((a, b) => b.score - a.score);

  const handleQuickRefer = (hostel: Project) => {
    toast({
      title: "Generating Referral",
      description: `Initiating admission process for ${hostel.propertyName}.`
    });
  };

  return (
    <DashboardLayout role="agent">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground">Intelligent Matchmaking</h2>
          <p className="text-[15px] text-muted-foreground font-medium">Find the perfect hostel for your prospective students using real-time availability and budget mapping.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Match Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="enterprise-card border bg-card p-6 space-y-6">
              <div className="flex items-center gap-2 border-b pb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Student Criteria</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Preferred Location</Label>
                  <Input 
                    placeholder="e.g. Whitefield" 
                    value={criteria.location}
                    onChange={(e) => setCurrentCriteria({...criteria, location: e.target.value})}
                    className="h-10 border-2 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Max Monthly Budget (₹)</Label>
                  <Input 
                    type="number" 
                    value={criteria.budget}
                    onChange={(e) => setCurrentCriteria({...criteria, budget: Number(e.target.value)})}
                    className="h-10 border-2 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-muted-foreground">Accommodation Type</Label>
                  <Select onValueChange={(val) => setCurrentCriteria({...criteria, accommodation: val})}>
                    <SelectTrigger className="h-10 font-bold border-2">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any" className="font-bold">Any Type</SelectItem>
                      <SelectItem value="Boys Only" className="font-bold">Boys Only</SelectItem>
                      <SelectItem value="Co-Living" className="font-bold">Co-Living</SelectItem>
                      <SelectItem value="Flats" className="font-bold">Studio Flats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="enterprise-card border bg-primary text-primary-foreground p-6">
               <div className="flex items-center gap-2 mb-3">
                 <ShieldCheck className="h-4 w-4 opacity-80" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Agent Tip</span>
               </div>
               <p className="text-xs font-medium leading-relaxed opacity-90">
                 Referrals for "Co-Living" hostels generally have a 25% faster conversion rate this month.
               </p>
            </div>
          </div>

          {/* Match Results */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
               <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">Showing Top Matches ({matches.length})</span>
               <div className="flex gap-2">
                 <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase"><Filter className="h-3 w-3 mr-2" /> Sort By Score</Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((hostel) => (
                <Card key={hostel.id} className="enterprise-card border hover:border-primary group transition-all overflow-hidden bg-card">
                  <CardContent className="p-0">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h3 className="text-base font-bold text-foreground">{hostel.propertyName}</h3>
                             {hostel.score > 80 && <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {hostel.address.split(',')[1] || hostel.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">₹{(hostel.monthlyRent || 12000).toLocaleString()}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase">Per Month</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-border">
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-muted-foreground uppercase">Availability</p>
                           <p className="text-xs font-bold flex items-center gap-1.5">
                             <Users className="h-3 w-3 text-primary" /> {hostel.totalBeds - hostel.occupiedBeds} Vacant Beds
                           </p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-muted-foreground uppercase">Ownership</p>
                           <p className="text-xs font-bold uppercase">{hostel.ownershipType}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Match Compatibility</span>
                          <span className={cn("text-[10px] font-bold", hostel.score > 70 ? "text-emerald-600" : "text-amber-600")}>{hostel.score}%</span>
                        </div>
                        <Progress value={hostel.score} className="h-1.5" />
                        <div className="flex flex-wrap gap-2 pt-1">
                          {hostel.reasons.map((r, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-muted text-muted-foreground border uppercase">{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 border-t flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <Coins className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] font-bold uppercase text-foreground">Comm: Fixed ₹2.5k</span>
                      </div>
                      <Button onClick={() => handleQuickRefer(hostel)} size="sm" className="h-9 px-4 font-bold text-[10px] uppercase tracking-widest">
                        Submit Referral <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
