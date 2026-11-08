'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role } from '@/lib/types';
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  ShieldCheck,
  Code2,
  Megaphone,
  Activity,
  CreditCard,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Users,
  Target,
  Sparkles,
  Home,
  Wallet,
  Bell,
  History,
  AlertTriangle,
  Lock,
  PieChart,
  ShieldAlert,
  Server,
  Zap,
  HelpCircle,
  FileBarChart,
  BarChart,
  Cpu,
  Webhook,
  Bug,
  Flag,
  Rocket,
  BookText,
  Layers,
  Database,
  TrendingUp,
  UserCheck,
  Calendar,
  Layout,
  Monitor,
  ChevronRight,
  Globe,
  ClipboardList,
  Search,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getStoredTickets } from '@/lib/ticket-store';
import { getStudentNotifications } from '@/lib/student-store';
import { getSAUsers } from '@/lib/sa-store';
import { getSDBugs } from '@/lib/sd-store';
import { getSMLeads } from '@/lib/sm-store';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
  roles?: Role[];
}

const ALL_GROUPS: NavGroup[] = [
  // Super Admin Groups
  {
    label: 'Intelligence',
    roles: ['superadmin'],
    items: [
      { name: 'Intelligence', href: '/sa', icon: LayoutDashboard },
      { name: 'Finance Analytics', href: '/sa/finance', icon: FileBarChart },
      { name: 'Activity Monitor', href: '/sa/activity', icon: Activity },
    ]
  },
  {
    label: 'Administration',
    roles: ['superadmin'],
    items: [
      { name: 'Users Control', href: '/sa/users', icon: Users },
      { name: 'Developers', href: '/sa/devs', icon: Code2 },
      { name: 'Marketers', href: '/sa/marketers', icon: Megaphone },
      { name: 'Clients (Orgs)', href: '/sa/clients', icon: Briefcase },
      { name: 'Contractors', href: '/sa/contractors', icon: ShieldCheck },
      { name: 'Building Owners', href: '/sa/owners', icon: Building2 },
      { name: 'Students', href: '/sa/students', icon: GraduationCap },
      { name: 'Agents', href: '/sa/agents', icon: Target },
    ]
  },
  {
    label: 'Operations',
    roles: ['superadmin'],
    items: [
      { name: 'Approvals Queue', href: '/sa/approvals', icon: Zap },
      { name: 'Subscriptions', href: '/sa/subscriptions', icon: PieChart },
      { name: 'Transactions', href: '/sa/payments', icon: CreditCard },
      { name: 'Announcements', href: '/sa/notifications', icon: Bell },
      { name: 'Support Desk', href: '/sa/support', icon: HelpCircle },
    ]
  },
  // Super Dev Groups
  {
    label: 'Technical',
    roles: ['superdev'],
    items: [
      { name: 'Ops Dashboard', href: '/sd', icon: LayoutDashboard },
      { name: 'Infrastructure', href: '/sd/infra', icon: Server },
      { name: 'Tech Ops', href: '/sd/ops', icon: Cpu },
    ]
  },
  {
    label: 'Engineering',
    roles: ['superdev'],
    items: [
      { name: 'App Modules', href: '/sd/modules', icon: Layers },
      { name: 'Projects', href: '/sd/projects', icon: Rocket },
      { name: 'Dev Team', href: '/sd/team', icon: Users },
    ]
  },
  {
    label: 'Surveillance',
    roles: ['superdev'],
    items: [
      { name: 'API Monitor', href: '/sd/api', icon: Webhook },
      { name: 'Database Health', href: '/sd/database', icon: Database },
      { name: 'Bug Tracking', href: '/sd/bugs', icon: Bug },
      { name: 'System Logs', href: '/sd/logs', icon: Activity },
    ]
  },
  // Super Marketer Groups
  {
    label: 'Performance',
    roles: ['supermarketer'],
    items: [
      { name: 'Marketing Hub', href: '/sm', icon: LayoutDashboard },
      { name: 'Analytics', href: '/sm/analytics', icon: Activity },
      { name: 'Conversion Matrix', href: '/sm/conversions', icon: Zap },
    ]
  },
  {
    label: 'Growth',
    roles: ['supermarketer'],
    items: [
      { name: 'Campaigns', href: '/sm/campaigns', icon: BarChart },
      { name: 'Leads Pipeline', href: '/sm/leads', icon: Target },
      { name: 'Acquisition', href: '/sm/acquisition', icon: TrendingUp },
    ]
  },
  {
    label: 'Channels',
    roles: ['supermarketer'],
    items: [
      { name: 'Advertisement', href: '/sm/ads', icon: Share2 },
      { name: 'Promotions', href: '/sm/banners', icon: Sparkles },
      { name: 'Email Ops', href: '/sm/email', icon: Bell },
      { name: 'Referrals', href: '/sm/referrals', icon: Users },
    ]
  },
  // Owner Groups
  {
    label: 'Assets',
    roles: ['owner'],
    items: [
      { name: 'Dashboard', href: '/owner', icon: LayoutDashboard },
      { name: 'My Properties', href: '/owner/properties', icon: Building2 },
    ]
  },
  {
    label: 'Operations',
    roles: ['owner'],
    items: [
      { name: 'Lease Inquiries', href: '/owner/inquiries', icon: Search },
      { name: 'Financial Ledger', href: '/owner/financials', icon: CreditCard },
    ]
  },
  // Contractor Groups
  {
    label: 'Ops Hub',
    roles: ['contractor'],
    items: [
      { name: 'Work Dashboard', href: '/contractor', icon: ClipboardList },
      { name: 'My Hostels', href: '/contractor/projects', icon: Building2 },
    ]
  },
  {
    label: 'Facility Care',
    roles: ['contractor'],
    items: [
      { name: 'Support Tickets', href: '/contractor/tickets', icon: MessageSquare },
      { name: 'New Inquiries', href: '/contractor/inquiries', icon: Search },
      { name: 'Expense Claims', href: '/contractor/expenses', icon: CreditCard },
    ]
  },
  // Student Groups
  {
    label: 'Stay',
    roles: ['student'],
    items: [
      { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
      { name: 'My Unit', href: '/student/room', icon: Home },
    ]
  },
  {
    label: 'Financials',
    roles: ['student'],
    items: [
      { name: 'Rent & Bills', href: '/student/rent', icon: Wallet },
      { name: 'Payment History', href: '/student/history', icon: History },
    ]
  },
  {
    label: 'Support',
    roles: ['student'],
    items: [
      { name: 'Support Desk', href: '/student/complaints', icon: AlertTriangle },
      { name: 'Notification Feed', href: '/student/notifications', icon: Bell },
    ]
  },
  // Agent Groups
  {
    label: 'Pipeline',
    roles: ['agent'],
    items: [
      { name: 'Matchmaking', href: '/agents/matchmaking', icon: Sparkles },
      { name: 'Referral Pipeline', href: '/agents/referrals', icon: Target },
      { name: 'Commission Ledger', href: '/agents/commission', icon: CreditCard },
    ]
  },
  // Unified Config (Bottom)
  {
    label: 'Configuration',
    items: [
      { name: 'Settings', href: 'SETTINGS', icon: Settings },
    ]
  }
];

export function Sidebar({ activeRole }: { activeRole: Role }) {
  const pathname = usePathname();
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [activeBugs, setActiveBugs] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const { setOpenMobile, isMobile } = useSidebar();

  const roleRoutes: Record<Role, string> = {
    superadmin: '/sa',
    superdev: '/sd',
    supermarketer: '/sm',
    owner: '/owner',
    contractor: '/contractor',
    student: '/student',
    agent: '/agents'
  };

  useEffect(() => {
    const load = () => {
      const tickets = getStoredTickets();
      if (activeRole === 'contractor') {
        setUnresolvedCount(tickets.filter(t => t.status === 'new' || t.status === 'in-progress').length);
      } else if (activeRole === 'student') {
        setUnresolvedCount(tickets.filter(t => t.status === 'resolved').length);
        const notifs = getStudentNotifications();
        setNotifCount(notifs.filter(n => !n.isRead).length);
      } else if (activeRole === 'superadmin') {
        const users = getSAUsers();
        setPendingApprovals(users.filter(u => u.status === 'pending').length);
      } else if (activeRole === 'superdev') {
        const bugs = getSDBugs();
        setActiveBugs(bugs.filter(b => b.status !== 'closed').length);
      } else if (activeRole === 'supermarketer') {
        const leads = getSMLeads();
        setNewLeads(leads.filter(l => l.status === 'new').length);
      }
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, [activeRole]);

  const groups = ALL_GROUPS.filter(g => !g.roles || g.roles.includes(activeRole));

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarUI collapsible="icon" className="border-r bg-background">
      <SidebarHeader className="h-20 px-6 border-b bg-card flex flex-row items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shrink-0">
          <ShieldCheck className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="text-base font-black text-foreground tracking-tight leading-none uppercase">HostelHub</span>
          <span className="text-[12px] font-black text-primary uppercase tracking-widest mt-1">StaySync</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6 overflow-x-hidden">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="mb-4">
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {group.items.map((item) => {
                  const prefix = roleRoutes[activeRole];
                  const resolvedHref = item.href === 'PROFILE' ? `${prefix}/profile` : 
                                      item.href === 'SETTINGS' ? `${prefix}/settings` : 
                                      item.href;

                  const isActive = pathname === resolvedHref || (resolvedHref !== '/sa' && resolvedHref !== '/contractor' && resolvedHref !== '/student' && resolvedHref !== '/agents' && resolvedHref !== '/sd' && resolvedHref !== '/sm' && pathname.startsWith(resolvedHref));
                  
                  let badge = 0;
                  if (item.name === 'Support Tickets' || (item.name === 'Support Desk' && activeRole === 'student')) {
                    badge = unresolvedCount;
                  } else if (item.name === 'Notification Feed' || item.name === 'Notifications') {
                    badge = notifCount;
                  } else if (item.name === 'Approvals Queue') {
                    badge = pendingApprovals;
                  } else if (item.name === 'Bug Tracking') {
                    badge = activeBugs;
                  } else if (item.name === 'Leads Pipeline') {
                    badge = newLeads;
                  }

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={cn(
                          "h-11 px-4 transition-all rounded-xl",
                          isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Link href={resolvedHref} onClick={handleLinkClick}>
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0 mr-3",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          <span className="text-[14px] font-bold group-data-[collapsible=icon]:hidden">
                            {item.name}
                          </span>
                          {badge > 0 && (
                            <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm group-data-[collapsible=icon]:hidden">
                              {badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-muted/5">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-black text-[10px] uppercase shrink-0 border border-primary/20">
            {activeRole.charAt(0)}
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
            <span className="text-[11px] font-black text-foreground truncate uppercase leading-none tracking-wider">{activeRole.replace('_', ' ')}</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Admin Node</span>
          </div>
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
}
