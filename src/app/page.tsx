'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare, 
  Target,
  ChevronDown,
  Menu,
  X,
  PlayCircle,
  LayoutDashboard,
  Smartphone,
  Globe,
  Activity,
  Heart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-header border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">StaySync</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="#solutions" className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/roles" className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10">Demo Hub</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" asChild className="font-bold text-[12px] uppercase tracking-widest">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="h-11 px-8 font-bold text-[12px] uppercase tracking-widest shadow-xl">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b p-6 space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-sm font-bold uppercase tracking-widest">Features</Link>
              <Link href="#solutions" className="text-sm font-bold uppercase tracking-widest">Solutions</Link>
              <Link href="#pricing" className="text-sm font-bold uppercase tracking-widest">Pricing</Link>
            </div>
            <div className="flex flex-col gap-3 pt-4 border-t border-dashed">
              <Button variant="outline" asChild className="w-full uppercase font-bold text-[11px] tracking-widest">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full uppercase font-bold text-[11px] tracking-widest">
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Badge variant="outline" className="py-1 px-4 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Enterprise Hostel Management
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-foreground">
              Smarter Living.<br />
              <span className="text-secondary italic">Mastered</span> Ops.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
              A complete multi-role ecosystem for managing student housing, residents, billing, and automated compliance in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <Button size="lg" asChild className="h-16 px-12 text-[14px] font-black uppercase tracking-[0.2em] shadow-2xl rounded-2xl">
              <Link href="/register">Initialize Node <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-[14px] font-black uppercase tracking-[0.2em] border-2 rounded-2xl">
              <PlayCircle className="mr-2 h-5 w-5" /> View Protocol
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mt-20 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute -inset-10 bg-primary/5 rounded-[3rem] blur-[120px] pointer-events-none" />
            <div className="relative border-4 border-card rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] bg-card group">
              <img 
                src="https://picsum.photos/seed/staysync-ops/1600/900" 
                alt="StaySync Master Control" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Intelligence Cards */}
            <div className="hidden lg:block absolute -left-12 top-1/4 animate-bounce duration-[4000ms]">
               <div className="bg-card border-2 p-6 rounded-2xl shadow-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Occupancy</p>
                  </div>
                  <p className="text-4xl font-black text-primary">96.8%</p>
               </div>
            </div>
            <div className="hidden lg:block absolute -right-12 bottom-1/4">
               <div className="bg-primary text-primary-foreground p-7 rounded-[2rem] shadow-2xl space-y-3 border-4 border-white/10">
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Monthly Remittance</p>
                  <p className="text-4xl font-black tabular-nums">₹4.2M</p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-secondary">
                    <TrendingUp className="h-3 w-3" /> +14.2% Growth
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <p className="text-xs font-black uppercase tracking-[0.4em]">Multi-Tenancy Mesh</p>
           <p className="text-xs font-black uppercase tracking-[0.4em]">Real-time Sync Node</p>
           <p className="text-xs font-black uppercase tracking-[0.4em]">Verification Gateway</p>
           <p className="text-xs font-black uppercase tracking-[0.4em]">Automated Ledger</p>
           <p className="text-xs font-black uppercase tracking-[0.4em]">Genkit Powered</p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="features" className="py-32 px-4 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Operational Core</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">Engineered for <br />Ecosystem Health</h2>
            </div>
            <p className="text-muted-foreground font-medium uppercase tracking-widest max-w-sm text-xs leading-relaxed">
              Standardizing the chaotic world of student housing into a structured, profitable business model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Bed} 
              title="Bed Inventory Node" 
              desc="Granular ID-level tracking for every bed. Manage Vacant, Cleaning, and Maintenance states with biometric-ready logic."
            />
            <FeatureCard 
              icon={Wallet} 
              title="Billing Automation" 
              desc="Pro-rata rent cycles, automated late fee triggers, and instant digital receipting via UPI remittance nodes."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Compliance Gateway" 
              desc="Integrated Gov ID audit and Police verification pipeline. Maintain an immutable digital dossier for every resident."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Triage Support" 
              desc="High-fidelity maintenance ticketing system. Direct encrypted communication between residents and building contractors."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Yield Intelligence" 
              desc="AI-powered revenue forecasting, occupancy heatmaps, and granular operational cost auditing for property owners."
            />
            <FeatureCard 
              icon={Target} 
              title="Admissions Funnel" 
              desc="Connect authorized agents to vacancies. Track referral velocity, handle admissions, and automate partner commissions."
            />
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="solutions" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/texture/1920/1080')] opacity-5 mix-blend-overlay" />
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <div className="space-y-6">
                    <Badge className="bg-secondary text-secondary-foreground font-black uppercase text-[10px] tracking-[0.3em] py-1 px-4">Role-Based Intelligence</Badge>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">Unified Protocol. <br /><span className="text-secondary">Unique</span> Access.</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-12">
                     <SolutionItem role="Property Owners" detail="Monitor estate yields, oversee CAPEX renovations, and audit contractor performance remotely." />
                     <SolutionItem role="Facility Operators" detail="Execute daily site operations, manage staff roster, ensure resident safety, and optimize expenses." />
                     <SolutionItem role="Resident Students" detail="A frictionless home experience. Pay rent, report unit issues, and manage KYC documents in seconds." />
                     <SolutionItem role="Certified Agents" detail="High-conversion referral tracking with real-time availability sync and an automated earnings terminal." />
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute -inset-20 bg-emerald-500/10 rounded-full blur-[160px] animate-pulse" />
                  <div className="relative border-2 border-white/10 rounded-[3rem] p-12 bg-white/5 backdrop-blur-2xl shadow-3xl">
                     <div className="space-y-10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-6">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Active Stay Node</p>
                              <p className="text-2xl font-black">Room 304-A</p>
                           </div>
                           <Badge className="bg-secondary text-secondary-foreground font-black">VERIFIED</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Rent Status</p>
                              <p className="text-lg font-bold text-emerald-400">Current</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Compliance</p>
                              <p className="text-lg font-bold text-white">100%</p>
                           </div>
                        </div>
                        <div className="h-40 w-full bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
                           <Zap className="h-10 w-10 text-secondary group-hover:scale-110 transition-transform" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">System Heartbeat: Nominal</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Onboarding Path */}
      <section className="py-32 px-4 bg-muted/20">
         <div className="max-w-6xl mx-auto space-y-20">
            <div className="text-center space-y-6">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Deployment Sequence</h2>
               <p className="text-muted-foreground font-bold uppercase tracking-widest text-[11px]">Go live with StaySync in four structured phases.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
               <Step num="01" title="Node Auth" desc="Initialize your organizational identity and verify legal credentials." />
               <Step num="02" title="Asset Registry" desc="Map buildings, configure rooms, and define bed-level availability." />
               <Step num="03" title="Sync Teams" desc="Onboard contractors, wardens, and marketing agents to your cluster." />
               <Step num="04" title="Activate Operations" desc="Open portals for residents and begin automated revenue capture." />
            </div>
         </div>
      </section>

      {/* Commercial Tiers */}
      <section id="pricing" className="py-32 px-4 bg-background">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-6">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Commercial Licensing</h2>
               <p className="text-muted-foreground font-bold uppercase tracking-widest text-[11px]">Scale your hostel footprint with predictable infrastructure costs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <PriceCard 
                 name="Starter" 
                 price="2.4k" 
                 desc="Single building owners starting their digital journey." 
                 features={['Up to 25 Beds', 'Resident Registry', 'Basic Billing', 'Support Tickets']} 
               />
               <PriceCard 
                 name="Professional" 
                 price="8.8k" 
                 desc="Scaling operators managing multiple regional hubs." 
                 features={['Up to 150 Beds', 'Full Agent Pipeline', 'Late Fee Logic', 'Police Sync']} 
                 highlighted 
               />
               <PriceCard 
                 name="Network" 
                 price="Custom" 
                 desc="Corporate housing groups with high-volume nodes." 
                 features={['Unlimited Beds', 'Custom AI Analytics', 'White Label API', 'Dedicated TAM']} 
               />
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-4 bg-muted/30">
         <div className="max-w-3xl mx-auto space-y-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-center">Audited Inquiries</h2>
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1" className="border-b-2 border-dashed border-border/60">
                  <AccordionTrigger className="text-[13px] font-black uppercase py-8 hover:no-underline text-left tracking-wider">How secure is resident identity data?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-[11px] leading-relaxed tracking-wide pb-8">
                     StaySync utilizes AES-256 encryption at rest. Document nodes are isolated from general operations access, ensuring that only verified compliance officers can audit resident KYC data.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className="border-b-2 border-dashed border-border/60">
                  <AccordionTrigger className="text-[13px] font-black uppercase py-8 hover:no-underline text-left tracking-wider">Can I manage multiple regional clusters?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-[11px] leading-relaxed tracking-wide pb-8">
                     Yes. Our multi-tenancy architecture allows Property Owners to define multiple buildings across different cities, with role-based assignments for local contractors in each region.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3" className="border-b-2 border-dashed border-border/60">
                  <AccordionTrigger className="text-[13px] font-black uppercase py-8 hover:no-underline text-left tracking-wider">What payment methods are supported for rent?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-[11px] leading-relaxed tracking-wide pb-8">
                     We prioritize UPI for instant verification, but our remittance nodes also support Card and Net Banking. All transactions are automatically reconciled in the organization's central ledger.
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-4 text-center space-y-16 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
         <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase text-foreground relative z-10">
            Ready to <br /><span className="text-secondary">Sync?</span>
         </h2>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Button size="lg" className="h-20 px-16 text-[18px] font-black uppercase tracking-[0.3em] shadow-3xl rounded-3xl">
              Initialize Portal
            </Button>
            <Button size="lg" variant="outline" className="h-20 px-16 text-[18px] font-black uppercase tracking-[0.3em] border-2 rounded-3xl">
              Contact Growth
            </Button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-24 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="space-y-8">
               <div className="flex items-center gap-2">
                 <Zap className="h-8 w-8 fill-current" />
                 <span className="text-3xl font-black uppercase tracking-tighter">StaySync</span>
               </div>
               <p className="text-[11px] font-medium opacity-50 uppercase leading-relaxed tracking-[0.1em]">
                  The industry standard for student housing governance. Building smarter living through operational intelligence.
               </p>
               <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" />
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" />
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" />
               </div>
            </div>
            <FooterList title="Platform" links={['Engine', 'Inventory', 'Compliance', 'Roadmap']} />
            <FooterList title="Governance" links={['Privacy Policy', 'Protocol Terms', 'License', 'Contact']} />
            <div className="space-y-8">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Operational Node</h4>
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-secondary">v2.4.1 Production</p>
                  </div>
                  <p className="text-[11px] font-medium opacity-40 uppercase tracking-widest">© 2026 StaySync Core. All Nodes Active.</p>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="enterprise-card border bg-card p-12 space-y-8 group hover:border-primary transition-all duration-500 rounded-[2.5rem]">
      <div className="h-16 w-16 rounded-2xl bg-primary/5 border-2 border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
        <Icon className="h-8 w-8" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  );
}

function SolutionItem({ role, detail }: any) {
  return (
    <div className="space-y-3 border-l-4 border-white/10 pl-8 hover:border-secondary transition-all cursor-default group">
       <h4 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-secondary transition-colors">{role}</h4>
       <p className="text-[11px] font-medium opacity-60 uppercase tracking-[0.2em] leading-relaxed">{detail}</p>
    </div>
  );
}

function Step({ num, title, desc }: any) {
  return (
    <div className="space-y-6 group">
       <span className="text-6xl font-black text-primary/10 block group-hover:text-primary/20 transition-colors">{num}</span>
       <h4 className="text-sm font-black uppercase tracking-[0.2em]">{title}</h4>
       <p className="text-[10px] text-muted-foreground font-bold uppercase leading-relaxed tracking-wider">{desc}</p>
    </div>
  );
}

function PriceCard({ name, price, desc, features, highlighted = false }: any) {
  return (
    <div className={cn(
      "enterprise-card border p-12 flex flex-col gap-12 transition-all duration-700 rounded-[3rem]",
      highlighted ? "border-primary bg-primary/5 shadow-3xl scale-105 z-10" : "bg-card hover:border-primary/40"
    )}>
       <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-3xl font-black uppercase tracking-tighter">{name}</h3>
             {highlighted && <Badge className="bg-secondary text-secondary-foreground font-black">MOST ACTIVE</Badge>}
          </div>
          <div className="flex items-baseline gap-1">
             <span className="text-5xl font-black">₹{price}</span>
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">/ MONTH</span>
          </div>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed italic">"{desc}"</p>
       </div>
       
       <div className="space-y-5 flex-1">
          {features.map((f: string) => (
            <div key={f} className="flex items-center gap-4">
               <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
               <span className="text-[11px] font-black uppercase text-foreground/80 tracking-[0.15em]">{f}</span>
            </div>
          ))}
       </div>

       <Button variant={highlighted ? 'default' : 'outline'} className="h-16 font-black uppercase tracking-[0.3em] rounded-2xl shadow-lg">
          Sync {name}
       </Button>
    </div>
  );
}

function FooterList({ title, links }: any) {
  return (
    <div className="space-y-8">
       <h4 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">{title}</h4>
       <ul className="space-y-4">
          {links.map((link: string) => (
            <li key={link} className="text-[11px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-secondary cursor-pointer transition-all">
               {link}
            </li>
          ))}
       </ul>
    </div>
  );
}

const Bed = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 16 8.5 11 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
