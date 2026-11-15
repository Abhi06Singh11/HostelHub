'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/types';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  Megaphone, 
  HelpCircle,
  Server,
  Webhook,
  Database,
  Flag,
  Layers,
  Rocket,
  Bug,
  BookText,
  Terminal,
  ShieldAlert,
  BarChart,
  Target,
  Share2,
  Sparkles,
  Mail,
  Zap,
  ClipboardList,
  Wrench,
  CreditCard,
  Search,
  LayoutDashboard,
  MessageSquare,
  Wallet,
  Home,
  Bed,
  History,
  AlertCircle,
  Bell,
  UserPlus,
  Coins,
  Settings,
  LogOut,
  ChevronRight,
  Zap as ZapIcon
} from 'lucide-react';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

const ALL_GROUPS = [
  {
    label: 'Administration',
    roles: ['superadmin'],
    items: [
      { name: 'User Management', href: '/sa/users', icon: Users },
      { name: 'Client Network', href: '/sa/clients', icon: Building2 },
      { name: 'Platform Finance', href: '/sa/finance', icon: TrendingUp },
      { name: 'Verification Gateway', href: '/sa/approvals', icon: ShieldCheck },
      { name: 'Access Control', href: '/sa/roles', icon: Lock },
      { name: 'Global Signals', href: '/sa/notifications', icon: Megaphone },
      { name: 'Support Desk', href: '/sa/support', icon: HelpCircle },
      { name: 'Audit Trail', href: '/sa/audit', icon: ShieldCheck },
    ]
  },
  {
    label: 'Engineering',
    roles: ['superdev'],
    items: [
      { name: 'Technical Infra', href: '/sd/infra', icon: Server },
      { name: 'API Gateway', href: '/sd/api', icon: Webhook },
      { name: 'Data Mesh', href: '/sd/database', icon: Database },
      { name: 'Feature Flags', href: '/sd/features', icon: Flag },
      { name: 'System Modules', href: '/sd/modules', icon: Layers },
      { name: 'Release Cycle', href: '/sd/releases', icon: Rocket },
      { name: 'Sprint Roadmap', href: '/sd/projects', icon: Rocket },
      { name: 'Incident Logs', href: '/sd/bugs', icon: Bug },
      { name: 'Internal Docs', href: '/sd/docs', icon: BookText },
      { name: 'Technical Logs', href: '/sd/logs', icon: Terminal },
      { name: 'Security Audit', href: '/sd/audit', icon: ShieldAlert },
    ]
  },
  {
    label: 'Growth',
    roles: ['supermarketer'],
    items: [
      { name: 'Campaign Engine', href: '/sm/campaigns', icon: Megaphone },
      { name: 'Lead Pipeline', href: '/sm/leads', icon: Target },
      { name: 'Ad Terminal', href: '/sm/ads', icon: Share2 },
      { name: 'Promotion Nodes', href: '/sm/banners', icon: Sparkles },
      { name: 'Broadcast Ops', href: '/sm/email', icon: Mail },
      { name: 'Partner Network', href: '/sm/referrals', icon: Users },
      { name: 'Acquisition Stats', href: '/sm/acquisition', icon: TrendingUp },
      { name: 'Conversion Matrix', href: '/sm/conversions', icon: Zap },
      { name: 'Team Backlog', href: '/sm/team', icon: ClipboardList },
    ]
  },
  {
    label: 'Estate Management',
    roles: ['owner'],
    items: [
      { name: 'Portfolio View', href: '/owner/properties', icon: Building2 },
      { name: 'Capex Projects', href: '/owner/projects', icon: Wrench },
      { name: 'Lease Inquiries', href: '/owner/inquiries', icon: Search },
      { name: 'Financial Ledger', href: '/owner/financials', icon: CreditCard },
    ]
  },
  {
    label: 'Facility Operations',
    roles: ['contractor'],
    items: [
      { name: 'Work Dashboard', href: '/contractor', icon: ClipboardList },
      { name: 'Hostel Portfolio', href: '/contractor/projects', icon: Building2 },
      { name: 'Admissions Hub', href: '/contractor/inquiries', icon: Search },
      { name: 'Support Tickets', href: '/contractor/tickets', icon: MessageSquare },
      { name: 'Expense Ledger', href: '/contractor/expenses', icon: Wallet },
    ]
  },
  {
    label: 'My Residency',
    roles: ['student'],
    items: [
      { name: 'Home Node', href: '/student', icon: Home },
      { name: 'Room Details', href: '/student/room', icon: Bed },
      { name: 'Rent & Dues', href: '/student/rent', icon: CreditCard },
      { name: 'Remittance Archive', href: '/student/history', icon: History },
      { name: 'Support Desk', href: '/student/complaints', icon: AlertCircle },
      { name: 'Alert Hub', href: '/student/notifications', icon: Bell },
    ]
  },
  {
    label: 'Admissions Ops',
    roles: ['agent'],
    items: [
      { name: 'Hostel Matchmaking', href: '/agents/matchmaking', icon: Search },
      { name: 'Lead Pipeline', href: '/agents/leads', icon: UserPlus },
      { name: 'Referral Track', href: '/agents/referrals', icon: Users },
      { name: 'Commissions', href: '/agents/commission', icon: Coins },
      { name: 'Financials', href: '/agents/financials', icon: CreditCard },
    ]
  }
];

export function Sidebar({ activeRole }: { activeRole: Role }) {
  const pathname = usePathname();

  const filteredGroups = ALL_GROUPS.filter(group => group.roles.includes(activeRole));

  return (
    <SidebarBase className="border-r border-border bg-sidebar">
      <SidebarHeader className="h-20 flex items-center px-6 border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <ZapIcon className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-black tracking-tighter uppercase leading-none text-sidebar-foreground">StaySync</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Enterprise Hub</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 gap-6">
        {filteredGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-3 px-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={cn(
                        "h-11 px-4 rounded-xl transition-all duration-200",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90" 
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("h-4.5 w-4.5", isActive ? "text-primary-foreground" : "text-inherit")} />
                        <span className="text-[13px] font-bold tracking-tight">{item.name}</span>
                        {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className={cn(
                "h-11 px-4 rounded-xl transition-all duration-200",
                pathname.includes('/settings') 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <Link href={`/${activeRole === 'agent' ? 'agents' : activeRole}/settings`} className="flex items-center gap-3">
                <Settings className="h-4.5 w-4.5" />
                <span className="text-[13px] font-bold tracking-tight">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="h-11 px-4 rounded-xl text-destructive hover:bg-destructive/5 hover:text-destructive transition-all"
            >
              <Link href="/" className="flex items-center gap-3">
                <LogOut className="h-4.5 w-4.5" />
                <span className="text-[13px] font-bold tracking-tight">Exit Node</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarBase>
  );
}
