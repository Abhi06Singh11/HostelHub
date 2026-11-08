
'use client';
import { Role } from '@/lib/types';
import { 
  Search, 
  Bell, 
  LogOut,
  Monitor,
  LayoutDashboard,
  UserCircle,
  Settings,
  User,
  Palette
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header({ 
  activeRole, 
  onExitToSelector
}: { 
  activeRole: Role;
  availableRoles: Role[];
  onRoleChange: (role: Role) => void;
  onExitToSelector: () => void;
}) {
  const router = useRouter();

  const roleRoutes: Record<Role, string> = {
    superadmin: '/sa',
    superdev: '/sd',
    supermarketer: '/sm',
    owner: '/owner',
    contractor: '/contractor',
    student: '/student',
    agent: '/agents'
  };

  const handleSettingsClick = () => {
    const settingsPath = `${roleRoutes[activeRole]}/settings`;
    router.push(settingsPath);
  };

  const handlePreferencesClick = () => {
    const settingsPath = `${roleRoutes[activeRole]}/settings?tab=appearance`;
    router.push(settingsPath);
  };

  const handleProfileClick = () => {
    const profilePath = `${roleRoutes[activeRole]}/profile`;
    router.push(profilePath);
  };

  return (
    <header className="h-20 glass-header flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="h-10 w-10 hover:bg-primary/5 hover:text-primary transition-colors border border-border rounded-lg shrink-0" />
        <div className="relative w-full max-w-lg hidden md:flex items-center">
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search commands (⌘+K)..."
            className="h-11 w-full pl-12 pr-5 text-[14px] border bg-background/50 rounded-xl focus:ring-1 focus:ring-primary focus:bg-background transition-all outline-none border-border font-medium"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 lg:space-x-5 h-11">
        <ThemeToggle />

        <div className="hidden lg:flex items-center h-full gap-2 px-4 bg-muted/30 rounded-xl border border-border shadow-none">
          <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest whitespace-nowrap">Node: v2.4.1</span>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={onExitToSelector}
          className="h-11 px-5 border-primary/20 bg-primary/5 text-primary font-bold text-[12px] uppercase tracking-widest hover:bg-primary/10 shadow-none hidden sm:flex rounded-xl"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Exit Ops
        </Button>

        <div className="h-8 w-px bg-border hidden sm:block" />

        <button className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all relative group bg-background/50 border border-border rounded-xl">
          <Bell className="h-5 w-5 group-hover:scale-105 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-background" />
        </button>
        
        <div className="h-8 w-px bg-border hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1 pl-3 pr-1 hover:bg-muted/50 rounded-xl transition-all border border-border bg-background/50">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold uppercase text-foreground leading-tight">Admin User</p>
                <p className="text-[9px] font-bold text-primary uppercase leading-tight tracking-[0.1em] mt-0.5">{activeRole}</p>
              </div>
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center border border-border shadow-sm overflow-hidden group">
                <UserCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl rounded-xl border bg-card">
            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground px-3 py-2 tracking-widest">Management</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick} className="text-[14px] font-semibold py-3 rounded-lg cursor-pointer">
              <User className="mr-3 h-4 w-4 text-primary" />
              Profile View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePreferencesClick} className="text-[14px] font-semibold py-3 rounded-lg cursor-pointer">
              <Palette className="mr-3 h-4 w-4 text-primary" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick} className="text-[14px] font-semibold py-3 rounded-lg cursor-pointer">
              <Settings className="mr-3 h-4 w-4 text-primary" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onExitToSelector}
              className="text-[14px] font-semibold py-3 text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg cursor-pointer"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
