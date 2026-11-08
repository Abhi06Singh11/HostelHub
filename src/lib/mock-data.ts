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
  SubscriptionPlan
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
  { id: 'u8', name: 'Suspicious Sam', email: 'sam@spam.com', roles: ['student'], activeRole: 'student', status: 'suspended', joinedAt: '2024-05-25' },
  { id: 'u9', name: 'Newbie Nick', email: 'nick@fresh.com', roles: ['owner'], activeRole: 'owner', status: 'pending', joinedAt: '2024-06-01' },
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
  { id: 'tx4', type: 'subscription', amount: 5000, date: '2024-06-03', description: 'Basic Plan - Renewal', status: 'pending', payerName: 'Garden PGs' },
];

export const mockPlans: SubscriptionPlan[] = [
  { id: 'plan1', name: 'Starter', price: 2999, billingCycle: 'monthly', features: ['5 Properties', '10 Users', 'Standard Support'], activeUsers: 150 },
  { id: 'plan2', name: 'Professional', price: 8999, billingCycle: 'monthly', features: ['20 Properties', 'Unlimited Users', 'Priority Support', 'Custom Reports'], activeUsers: 85 },
  { id: 'plan3', name: 'Enterprise', price: 24999, billingCycle: 'monthly', features: ['Unlimited Properties', 'White Label', '24/7 Dedicated Support', 'API Access'], activeUsers: 24 },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log1', actor: 'Global SuperAdmin', actorId: 'u1', action: 'Suspend User', target: 'Suspicious Sam (u8)', timestamp: '2024-06-01 14:30', category: 'security', details: 'Multiple failed login attempts detected.', ip: '192.168.1.1' },
  { id: 'log2', actor: 'Dev Lead Sarah', actorId: 'u2', action: 'Config Update', target: 'Auth Engine', timestamp: '2024-06-01 12:15', category: 'settings', details: 'Updated JWT expiry to 24 hours.' },
  { id: 'log3', actor: 'Global SuperAdmin', actorId: 'u1', action: 'Approve Client', target: 'Fresh Stay PGs', timestamp: '2024-05-31 09:00', category: 'user_management', details: 'Verified trade license and PAN.' },
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
  { id: 'ann1', title: 'Scheduled Maintenance', content: 'Platform will be down for 2 hours on Sunday for database optimization.', targetRoles: ['owner', 'contractor', 'agent'], publishedAt: '2024-06-01', status: 'published' },
  { id: 'ann2', title: 'New Commission Rates', content: 'Agent commissions for premium hostels increased by 5%.', targetRoles: ['agent'], publishedAt: '2024-05-25', status: 'published' },
];

export const mockHealth: SystemHealth[] = [
  { service: 'Cloud Firestore', status: 'healthy', latency: '45ms', lastChecked: '1 min ago' },
  { service: 'Auth Engine', status: 'healthy', latency: '12ms', lastChecked: '2 mins ago' },
  { service: 'Payment Gateway', status: 'healthy', latency: '180ms', lastChecked: '30 secs ago' },
  { service: 'Notification API', status: 'degraded', latency: '2.4s', lastChecked: '1 min ago' },
];

export const mockStudentInquiries: StudentInquiry[] = [
  { id: 'inq1', studentName: 'Priya Das', phone: '+91 98877 66554', email: 'priya.das@example.com', preferredHostel: 'StaySync Tech Wing', roomType: 'Single', joiningDate: '2024-06-01', message: 'I am looking for a single room.', status: 'new', createdAt: '2024-05-10' },
];

export const mockInvitationLinks: InvitationLink[] = [
  { id: 'inv1', hostelName: 'StaySync Tech Wing', roomType: 'Single Sharing', link: 'https://staysync.in/join/xK92Lp0', status: 'sent', createdAt: '2024-05-12', expiresAt: '2024-05-26' }
];

export const mockLeads: Lead[] = [
  { id: 'l1', studentName: 'Rohan Gupta', source: 'Instagram Ad', status: 'interested', followUpDate: '2024-05-20' },
];

export const mockCampaigns: Campaign[] = [
  { id: 'c1', name: 'Bengaluru Student Drive', channel: 'Meta', startDate: '2024-05-01', endDate: '2024-05-31', status: 'active', leadsGenerated: 450 },
];
