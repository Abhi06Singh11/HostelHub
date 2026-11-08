'use client';
import { User, Organization, FinancialTransaction, AuditLog, PlatformAnnouncement, SubscriptionPlan, AccountStatus, PlatformRole, Role, DeveloperTask } from './types';
import { mockUsers as baseMockUsers, mockOrganizations, mockFinancials, mockAuditLogs, mockAnnouncements, mockPlans } from './mock-data';

const USERS_KEY = 'staysync_sa_users';
const ORGS_KEY = 'staysync_sa_orgs';
const FIN_KEY = 'staysync_sa_financials';
const LOG_KEY = 'staysync_sa_logs';
const ANN_KEY = 'staysync_sa_announcements';
const ROLES_KEY = 'staysync_sa_roles';

const MOCK_TASKS: DeveloperTask[] = [
  { id: 't1', title: 'Fix JWT Secret Rotation bug', status: 'in-progress', deadline: '2024-06-15', priority: 'high' },
  { id: 't2', title: 'Optimize SQL Query for Rent Ledger', status: 'pending', deadline: '2024-06-20', priority: 'medium' },
  { id: 't3', title: 'Implement WebSocket Notification cluster', status: 'pending', deadline: '2024-07-01', priority: 'high' },
];

const MOCK_USERS_EXTENDED: User[] = baseMockUsers.map(u => {
  if (u.id === 'u2') { // Sarah - SuperDev
    return {
      ...u,
      bio: "Senior Infrastructure Engineer with 8+ years of experience in distributed systems. Specialist in Go, Kubernetes, and high-performance API gateways. Leading the core platform migration and security hardening efforts.",
      skills: ["Go", "Kubernetes", "PostgreSQL", "Next.js", "Redis", "Terraform", "Security Audit"],
      assignedModules: ["Auth Engine", "API Gateway", "Database Sharding"],
      workload: 82,
      progress: 74,
      upcomingTasks: MOCK_TASKS
    };
  }
  if (u.roles.includes('superdev')) {
    return {
      ...u,
      bio: "Full-stack developer focused on operational tools and frontend performance. Expertise in React and optimized rendering cycles.",
      skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
      assignedModules: ["Resident Portal", "Analytics Dash"],
      workload: 45,
      progress: 90,
      upcomingTasks: [MOCK_TASKS[1]]
    };
  }
  return u;
});

const MOCK_ROLES: PlatformRole[] = [
  { 
    id: 'r1', 
    name: 'Super Admin', 
    description: 'Platform Owner - Unlimited Access', 
    userCount: 1, 
    permissions: [{ module: 'All', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'] }] 
  },
  { 
    id: 'r2', 
    name: 'Contractor', 
    description: 'Hostel Operator Access', 
    userCount: 12, 
    permissions: [{ module: 'Properties', actions: ['view', 'edit'] }, { module: 'Tickets', actions: ['view', 'create', 'edit'] }] 
  },
];

const getStored = <T>(key: string, mock: T[]): T[] => {
  if (typeof window === 'undefined') return mock;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(mock));
    return mock;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mock;
  }
};

export const getSAUsers = () => getStored(USERS_KEY, MOCK_USERS_EXTENDED);
export const getSAUsersByRole = (role: Role) => getSAUsers().filter(u => u.roles.includes(role));
export const getSAOrganizations = () => getStored(ORGS_KEY, mockOrganizations);
export const getSAFinancials = () => getStored(FIN_KEY, mockFinancials);
export const getSAAuditLogs = () => getStored(LOG_KEY, mockAuditLogs);
export const getSAAnnouncements = () => getStored(ANN_KEY, mockAnnouncements);
export const getSAPlans = () => mockPlans;
export const getSARoles = () => getStored(ROLES_KEY, MOCK_ROLES);

export const updateSAUserStatus = (id: string, status: AccountStatus) => {
  const users = getSAUsers();
  const updated = users.map(u => u.id === id ? { ...u, status } : u);
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const deleteSAUser = (id: string) => {
  const users = getSAUsers();
  const updated = users.filter(u => u.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const updateOrgStatus = (id: string, status: Organization['status']) => {
  const orgs = getSAOrganizations();
  const updated = orgs.map(o => o.id === id ? { ...o, status } : o);
  localStorage.setItem(ORGS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const addSAAnnouncement = (ann: Omit<PlatformAnnouncement, 'id' | 'publishedAt'>) => {
  const announcements = getSAAnnouncements();
  const newAnn: PlatformAnnouncement = {
    ...ann,
    id: `ann-${Date.now()}`,
    publishedAt: new Date().toISOString().split('T')[0]
  };
  localStorage.setItem(ANN_KEY, JSON.stringify([newAnn, ...announcements]));
  window.dispatchEvent(new Event('storage'));
  return newAnn;
};

export const logSAAction = (action: string, target: string, category: AuditLog['category'], details?: string) => {
  const logs = getSAAuditLogs();
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    actor: 'Global SuperAdmin',
    actorId: 'u1',
    action,
    target,
    category,
    details,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    ip: '127.0.0.1'
  };
  localStorage.setItem(LOG_KEY, JSON.stringify([newLog, ...logs]));
  window.dispatchEvent(new Event('storage'));
};
