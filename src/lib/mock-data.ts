import { 
  User, 
  Organization, 
  Property, 
  Booking, 
  Project, 
  Lead, 
  Campaign, 
  AuditLog, 
  SystemHealth, 
  Expense, 
  StudentInquiry, 
  Ticket, 
  InvitationLink,
  FinancialTransaction,
  PlatformAnnouncement,
  SubscriptionPlan,
  MarketingLead,
  MarketingCampaign,
  MarketingAcquisition,
  MarketingTask
} from './types';

export const mockUser: User = {
  id: 'u1',
  name: 'Global SuperAdmin',
  email: 'super@staysync.com',
  roles: ['superadmin', 'superdev', 'supermarketer', 'owner', 'contractor', 'student', 'agent'],
  activeRole: 'superadmin',
  organizationId: 'org1',
  avatar: 'SA',
  status: 'verified',
  joinedAt: '2023-01-01',
  lastLogin: '2024-06-01 10:45'
};

export const mockUsers: User[] = [
  { id: 'u1', name: 'Global SuperAdmin', email: 'super@staysync.com', roles: ['superadmin'], activeRole: 'superadmin', status: 'verified', joinedAt: '2023-01-01' },
  { id: 'u2', name: 'Dev Lead Sarah', email: 'sarah.dev@staysync.com', roles: ['superdev'], activeRole: 'superdev', status: 'verified', joinedAt: '2023-02-15' },
  { id: 'u3', name: 'Marketing Mike', email: 'mike.m@staysync.com', roles: ['supermarketer'], activeRole: 'supermarketer', status: 'active', joinedAt: '2023-03-10' },
  { id: 'u4', name: 'John Contractor', email: 'ops@staysync.com', roles: ['contractor'], activeRole: 'contractor', status: 'verified', joinedAt: '2023-01-15' },
  { id: 'u5', name: 'Vikram Reddy', email: 'vikram.reddy@realestate.in', roles: ['owner'], activeRole: 'owner', status: 'verified', joinedAt: '2023-01-10' },
  { id: 'u6', name: 'Amit Sharma', email: 'amit.sharma@edu.in', roles: ['student'], activeRole: 'student', status: 'verified', joinedAt: '2024-03-01' },
  { id: 'u7', name: 'Priya Agent', email: 'priya.ref@global.com', roles: ['agent'], activeRole: 'agent', status: 'active', joinedAt: '2024-01-20' },
];

export const mockOrganizations: Organization[] = [
  { id: 'org1', name: 'StaySync Premium Networks', status: 'active', propertyCount: 12, userCount: 45, createdAt: '2023-01-15', plan: 'enterprise', ownerName: 'John Admin', ownerEmail: 'admin@staysync.com' },
  { id: 'org2', name: 'Elite Living PGs', status: 'active', propertyCount: 5, userCount: 12, createdAt: '2023-06-20', plan: 'pro', ownerName: 'Alice Green', ownerEmail: 'alice@elite.com' },
  { id: 'org3', name: 'Urban Shelter Group', status: 'suspended', propertyCount: 8, userCount: 22, createdAt: '2022-11-05', plan: 'basic', ownerName: 'Robert Dow', ownerEmail: 'robert@urban.com' },
];

export const mockProperties: Property[] = [
  { id: 'p1', name: 'StaySync Premium Boys Hostel', address: '123 Tech Park, Bengaluru', type: 'Hostel', totalRooms: 50, totalBeds: 150, occupiedBeds: 120, status: 'rented', amenities: ['WiFi', 'AC', 'Laundry'] },
  { id: 'p2', name: 'Elite PG for Women', address: '456 Garden City, Pune', type: 'PG', totalRooms: 30, totalBeds: 60, occupiedBeds: 45, status: 'rented', amenities: ['WiFi', 'Food', 'Security'] },
];

export const mockFinancials: FinancialTransaction[] = [
  { id: 'tx1', type: 'subscription', amount: 45000, date: '2024-06-01', description: 'Enterprise Monthly Plan - org1', status: 'completed', payerName: 'StaySync Premium' },
  { id: 'tx2', type: 'subscription', amount: 12000, date: '2024-06-02', description: 'Pro Monthly Plan - org2', status: 'completed', payerName: 'Elite Living' },
  { id: 'tx3', type: 'refund', amount: 2500, date: '2024-05-28', description: 'Partial Refund - Incorrect Tier', status: 'completed', payerName: 'Urban Shelter' },
];

export const mockPlans: SubscriptionPlan[] = [
  { id: 'plan1', name: 'Starter', price: 2999, billingCycle: 'monthly', features: ['5 Properties', '10 Users', 'Standard Support'], activeUsers: 150 },
  { id: 'plan2', name: 'Professional', price: 8999, billingCycle: 'monthly', features: ['20 Properties', 'Unlimited Users', 'Priority Support', 'Custom Reports'], activeUsers: 85 },
  { id: 'plan3', name: 'Enterprise', price: 24999, billingCycle: 'monthly', features: ['Unlimited Properties', 'White Label', '24/7 Dedicated Support', 'API Access'], activeUsers: 24 },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log1', actor: 'Global SuperAdmin', actorId: 'u1', action: 'Suspend User', target: 'Suspicious Sam (u8)', timestamp: '2024-06-01 14:30', category: 'security', details: 'Multiple failed login attempts detected.', ip: '192.168.1.1' },
  { id: 'log2', actor: 'Dev Lead Sarah', actorId: 'u2', action: 'Config Update', target: 'Auth Engine', timestamp: '2024-06-01 12:15', category: 'settings', details: 'Updated JWT expiry to 24 hours.' },
];

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    studentName: 'Amit Sharma',
    hostelId: 'proj1',
    hostelName: 'StaySync Tech Wing',
    roomNumber: '304',
    category: 'Plumbing',
    description: 'Leaking faucet in the attached bathroom since morning.',
    date: '2024-05-15 09:30',
    status: 'new',
    priority: 'medium',
    messages: [
      { id: 'm1', senderRole: 'student', text: 'Hi, the tap in room 304 is leaking heavily.', timestamp: '2024-05-15 09:30' }
    ]
  },
];

export const mockAnnouncements: PlatformAnnouncement[] = [
  { id: 'ann1', title: 'Scheduled Maintenance', content: 'Platform will be down for 2 hours on Sunday.', targetRoles: ['owner', 'contractor'], publishedAt: '2024-06-01', status: 'published' },
];

export const mockHealth: SystemHealth[] = [
  { service: 'Cloud Firestore', status: 'healthy', latency: '45ms', lastChecked: '1 min ago' },
  { service: 'Auth Engine', status: 'healthy', latency: '12ms', lastChecked: '2 mins ago' },
];

export const mockStudentInquiries: StudentInquiry[] = [
  { id: 'inq1', studentName: 'Priya Das', phone: '+91 98877 66554', email: 'priya.das@example.com', preferredHostel: 'StaySync Tech Wing', roomType: 'Single', joiningDate: '2024-06-01', message: 'I am looking for a single room.', status: 'new', createdAt: '2024-05-10' },
];

export const mockInvitationLinks: InvitationLink[] = [
  { id: 'inv1', hostelName: 'StaySync Tech Wing', roomType: 'Single Sharing', link: 'https://staysync.in/join/xK92Lp0', status: 'sent', createdAt: '2024-05-12', expiresAt: '2024-05-26' }
];

export const mockLeads: MarketingLead[] = [
  { id: 'lead-1', name: 'Rohan Gupta', email: 'rohan.g@gmail.com', phone: '+91 98877 11223', source: 'Meta', status: 'interested', score: 85, followUpDate: '2024-06-10', createdAt: '2024-06-01' },
];

export const mockCampaigns: MarketingCampaign[] = [
  { id: 'camp-1', name: 'Bengaluru Summer Drive', channel: 'Meta Ads', budget: 50000, spent: 32000, leads: 420, conversions: 12, status: 'active', startDate: '2024-05-01', endDate: '2024-06-30' },
];

export const mockExpenses: Expense[] = [
  { id: 'exp1', category: 'cook', amount: 5000, date: '2024-06-01', description: 'Monthly Cook Salary', status: 'approved', propertyId: 'p1', propertyName: 'StaySync Premium Boys Hostel' },
];

export const mockProjects: Project[] = [
  { 
    id: 'proj1', 
    title: 'StaySync Tech Wing', 
    address: 'Plot 42, Electronic City, Bengaluru', 
    propertyId: 'p1', 
    propertyName: 'StaySync Tech Wing', 
    status: 'active', 
    budget: 8500000, 
    deadline: '2025-12-31', 
    priority: 'high', 
    ownershipType: 'rented', 
    totalRooms: 40, 
    totalBeds: 80, 
    occupiedBeds: 72,
    ownerName: 'Vikram Reddy',
    ownerPhone: '+91 98860 12345',
    ownerEmail: 'estates@vikram.in',
    monthlyRent: 350000,
    contractStart: '2024-01-01',
    contractEnd: '2026-12-31'
  },
];
