'use client';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Role } from '@/lib/types';
import { mockUser } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export function DashboardLayout({ 
  children, 
  role 
}: { 
  children: React.ReactNode; 
  role: Role;
}) {
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    const roleRoutes: Record<Role, string> = {
      superadmin: '/sa',
      superdev: '/sd',
      supermarketer: '/sm',
      owner: '/owner',
      contractor: '/contractor',
      student: '/student',
      agent: '/agents'
    };
    router.push(roleRoutes[newRole]);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary/20 w-full">
        <Sidebar activeRole={role} />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header 
            activeRole={role} 
            availableRoles={mockUser.roles}
            onRoleChange={handleRoleChange}
            onExitToSelector={() => router.push('/')}
          />
          
          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-[1600px] mx-auto space-y-12">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
