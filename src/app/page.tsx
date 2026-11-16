
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
  PlayCircle
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
              <Link href="#features" className="text-[13px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="#solutions" className="text-[13px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-[13px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/roles" className="text-[11px] font-black uppercase tracking-[0.2em] bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10">Demo Hub</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" asChild className="font-bold text-[13px] uppercase tracking-widest">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="h-11 px-8 font-bold text-[13px] uppercase tracking-widest shadow-xl">
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
      <section className="pt-40 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="py-1 px-4 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Next-Gen Hostel Ecosystem
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
              Smarter Hostel <br />
              <span className="text-primary">Management.</span> <br />
              Better Living.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
              Manage properties, residents, bookings, payments, and daily operations from one intelligent, role-based platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="h-14 px-10 text-[14px] font-black uppercase tracking-[0.2em] shadow-2xl rounded-2xl">
              <Link href="/register">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-[14px] font-black uppercase tracking-[0.2em] border-2 rounded-2xl">
              <PlayCircle className="mr-2 h-5 w-5" /> Book a Demo
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mt-20 max-w-6xl mx-auto">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-3xl" />
            <div className="relative border-4 border-card rounded-[2.5rem] overflow-hidden shadow-3xl bg-card">
              <img 
                src="https://picsum.photos/seed/staysync-dash/1600/900" 
                alt="StaySync Dashboard Preview" 
                className="w-full h-auto opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            
            {/* Float Stats */}
            <div className="hidden lg:block absolute -left-10 top-1/4 animate-bounce duration-[3000ms]">
               <div className="bg-card border-2 p-6 rounded-2xl shadow-2xl space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Occupancy</p>
                  <p className="text-3xl font-black text-primary">94.2%</p>
               </div>
            </div>
            <div className="hidden lg:block absolute -right-10 bottom-1/4 animate-pulse">
               <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl space-y-2">
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Daily Revenue</p>
                  <p className="text-3xl font-black">₹2.4L</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Messaging */}
      <section className="py-20 border-y bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <p className="text-sm font-black uppercase tracking-[0.4em]">Integrated with Firebase</p>
           <p className="text-sm font-black uppercase tracking-[0.4em]">Powered by Google AI</p>
           <p className="text-sm font-black uppercase tracking-[0.4em]">Next.js Enterprise</p>
           <p className="text-sm font-black uppercase tracking-[0.4em]">Real-time Sync</p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Platform Capabilities</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest max-w-xl mx-auto text-sm">Engineered for operational excellence and resident satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Bed} 
              title="Inventory Engine" 
              desc="Granular bed-level tracking. Manage vacancies, maintenance cycles, and room allocations with real-time accuracy."
            />
            <FeatureCard 
              icon={Wallet} 
              title="Automated Billing" 
              desc="Dynamic rent generation, late-fee logic, and instant UPI remittance links with automated digital receipts."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Verification Gateway" 
              desc="Integrated ID audit and police verification workflow. Maintain a 100% compliant resident registry."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Smart Support Desk" 
              desc="High-fidelity maintenance ticketing system with direct communication between residents and contractors."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Intelligent Analytics" 
              desc="AI-powered revenue forecasting, occupancy heatmaps, and operational cost auditing for owners."
            />
            <FeatureCard 
              icon={Target} 
              title="Lead Pipeline" 
              desc="Connect agents to vacancies. Track referrals, manage admissions, and automate commission payouts."
            />
          </div>
        </div>
      </section>

      {/* Role-Based Solutions */}
      <section id="solutions" className="py-32 bg-primary text-primary-foreground">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="lg:w-1/2 space-y-12">
                  <div className="space-y-4">
                    <Badge className="bg-secondary text-secondary-foreground font-black uppercase text-[10px] tracking-widest">Tailored Experience</Badge>
                    <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">One Platform. <br />Every Stakeholder.</h2>
                  </div>
                  
                  <div className="space-y-10">
                     <SolutionItem role="Hostel Owners" detail="Monitor portfolio yields, oversee CAPEX projects, and audit contractor performance remotely." />
                     <SolutionItem role="Facility Operators" detail="Manage daily ground operations, staff roster, resident safety, and facility maintenance nodes." />
                     <SolutionItem role="Student Residents" detail="A frictionless home experience. Pay rent, report issues, and verify documents in one place." />
                     <SolutionItem role="Admission Agents" detail="High-conversion referral tracking with real-time bed availability and automated earnings hub." />
                  </div>
               </div>
               <div className="lg:w-1/2 relative">
                  <div className="absolute -inset-10 bg-white/5 rounded-full blur-3xl animate-pulse" />
                  <div className="relative border border-white/10 rounded-[3rem] p-10 bg-white/5 backdrop-blur-xl">
                     <div className="space-y-6">
                        <div className="h-4 w-1/3 bg-white/10 rounded-full" />
                        <div className="space-y-3">
                           <div className="h-10 w-full bg-white/5 rounded-xl border border-white/10" />
                           <div className="h-10 w-full bg-white/5 rounded-xl border border-white/10" />
                           <div className="h-10 w-full bg-white/5 rounded-xl border border-white/10" />
                        </div>
                        <div className="h-40 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                           <Zap className="h-12 w-12 opacity-20" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-4 bg-muted/10">
         <div className="max-w-5xl mx-auto space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-black tracking-tighter uppercase">The StaySync Path</h2>
               <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">From discovery to global operations in simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
               <Step num="01" title="Register" desc="Sign up your organization and verify credentials." />
               <Step num="02" title="Onboard" desc="Add properties, configure rooms and beds." />
               <Step num="03" title="Sync Team" desc="Invite contractors, agents, and staff nodes." />
               <Step num="04" title="Go Live" desc="Accept residents and automate your revenue." />
            </div>
         </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-4 bg-background">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Flexible Tiers</h2>
               <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Scale your hostel empire with predictable pricing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <PriceCard name="Starter" price="2.4k" desc="Ideal for single-building owners starting their digital journey." features={['Up to 20 Beds', 'Resident Registry', 'Basic Billing', 'Standard Support']} />
               <PriceCard name="Professional" price="8.2k" desc="For growth-focused operators managing multiple properties." features={['Up to 100 Beds', 'Advanced Billing', 'Agent Pipeline', 'Staff Management']} highlighted />
               <PriceCard name="Enterprise" price="Custom" desc="Full-scale platform governance for corporate housing networks." features={['Unlimited Beds', 'Custom AI Insights', 'White Label API', 'Dedicated Ops Head']} />
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-4 bg-muted/20">
         <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase text-center">Frequently Audited</h2>
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1" className="border-b-2 border-dashed">
                  <AccordionTrigger className="text-sm font-bold uppercase py-6 hover:no-underline">How fast is the onboarding process?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-xs leading-relaxed">
                     Organizations can be operational within 24 hours. The process involves identity verification, property configuration, and team invitation cycles.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className="border-b-2 border-dashed">
                  <AccordionTrigger className="text-sm font-bold uppercase py-6 hover:no-underline">Is resident data secure and compliant?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-xs leading-relaxed">
                     Yes. StaySync utilizes role-based access control and high-fidelity encryption. Document verification nodes are independent to ensure strict compliance.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3" className="border-b-2 border-dashed">
                  <AccordionTrigger className="text-sm font-bold uppercase py-6 hover:no-underline">Can I manage properties across different cities?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-medium uppercase text-xs leading-relaxed">
                     Absolutely. StaySync is built for regional clusters. Owners can oversee multiple cities, and Contractors can assign wardens to specific building nodes.
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center space-y-12">
         <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-foreground">
            Ready to <span className="text-primary">Sync?</span>
         </h2>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-12 text-[15px] font-black uppercase tracking-[0.2em] shadow-2xl rounded-2xl">
              Launch Your Platform
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 text-[15px] font-black uppercase tracking-[0.2em] border-2 rounded-2xl">
              Contact Growth Team
            </Button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
               <div className="flex items-center gap-2">
                 <Zap className="h-6 w-6 fill-current" />
                 <span className="text-2xl font-black uppercase tracking-tighter">StaySync</span>
               </div>
               <p className="text-xs font-medium opacity-60 uppercase leading-relaxed tracking-wider">
                  Global governance for the student housing ecosystem. Building better living through intelligence.
               </p>
            </div>
            <FooterList title="Product" links={['Features', 'Solutions', 'Pricing', 'Roadmap']} />
            <FooterList title="Company" links={['About Us', 'Contact', 'Privacy', 'Legal']} />
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Operational Node</h4>
               <p className="text-[10px] font-black uppercase tracking-widest text-secondary">v2.4.1 Production</p>
               <p className="text-[10px] font-medium opacity-40 uppercase">© 2026 StaySync Core. All nodes active.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="enterprise-card border bg-card p-10 space-y-6 group hover:border-primary transition-all duration-500">
      <div className="h-14 w-14 rounded-2xl bg-primary/5 border-2 border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium leading-relaxed uppercase tracking-tight">{desc}</p>
    </div>
  );
}

function SolutionItem({ role, detail }: any) {
  return (
    <div className="space-y-2 border-l-2 border-white/10 pl-6 hover:border-secondary transition-all cursor-default group">
       <h4 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-secondary transition-colors">{role}</h4>
       <p className="text-xs font-medium opacity-60 uppercase tracking-widest leading-relaxed">{detail}</p>
    </div>
  );
}

function Step({ num, title, desc }: any) {
  return (
    <div className="space-y-4">
       <span className="text-4xl font-black text-primary/10 block">{num}</span>
       <h4 className="text-sm font-black uppercase tracking-widest">{title}</h4>
       <p className="text-[10px] text-muted-foreground font-bold uppercase leading-relaxed">{desc}</p>
    </div>
  );
}

function PriceCard({ name, price, desc, features, highlighted = false }: any) {
  return (
    <div className={cn(
      "enterprise-card border p-10 flex flex-col gap-10 transition-all duration-500",
      highlighted ? "border-primary bg-primary/5 shadow-2xl scale-105 z-10" : "bg-card hover:border-primary/40"
    )}>
       <div className="space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter">{name}</h3>
          <div className="flex items-baseline gap-1">
             <span className="text-4xl font-black">₹{price}</span>
             <span className="text-xs font-bold text-muted-foreground uppercase">/ Month</span>
          </div>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">{desc}</p>
       </div>
       
       <div className="space-y-4 flex-1">
          {features.map((f: string) => (
            <div key={f} className="flex items-center gap-3">
               <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
               <span className="text-[11px] font-bold uppercase text-foreground/80 tracking-widest">{f}</span>
            </div>
          ))}
       </div>

       <Button variant={highlighted ? 'default' : 'outline'} className="h-14 font-black uppercase tracking-[0.2em] rounded-xl">
          Deploy {name}
       </Button>
    </div>
  );
}

function FooterList({ title, links }: any) {
  return (
    <div className="space-y-6">
       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{title}</h4>
       <ul className="space-y-3">
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
