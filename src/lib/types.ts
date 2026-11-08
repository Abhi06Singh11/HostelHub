export type Role = 
  | 'superadmin' 
  | 'superdev' 
  | 'supermarketer' 
  | 'owner' 
  | 'contractor' 
  | 'student' 
  | 'agent';

export type AccountStatus = 'active' | 'pending' | 'suspended' | 'rejected' | 'verified';

export interface DeveloperTask {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roles: Role[];
  activeRole: Role;
  organizationId?: string;
  avatar?: string;
  status: AccountStatus;
  joinedAt: string;
  lastLogin?: string;
  // Developer/Marketer Specific Fields
  bio?: string;
  skills?: string[];
  assignedModules?: string[];
  workload?: number; // 0-100 percentage
  progress?: number; // 0-100 percentage
  upcomingTasks?: DeveloperTask[];
}

// Marketing Specific Types
export interface MarketingLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Meta' | 'Google' | 'Instagram' | 'Referral' | 'Direct';
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'lost';
  score: number; // 0-100
  followUpDate: string;
  assignedTo?: string;
  createdAt: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: string;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  status: 'active' | 'scheduled' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
}

export interface MarketingAcquisition {
  id: string;
  month: string;
  source: string;
  count: number;
  cpa: number; // Cost Per Acquisition
}

export interface MarketingTask {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Deployment {
  id: string;
  version: string;
  environment: 'production' | 'staging' | 'development';
  status: 'success' | 'failed' | 'in-progress' | 'cancelled';
  deployedBy: string;
  timestamp: string;
  healthScore: number;
}

export interface Bug {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'open' | 'fixing' | 'verified' | 'closed';
  component: string;
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'beta';
  rolloutPercentage: number;
  description: string;
}

export interface AppModule {
  id: string;
  name: string;
  version: string;
  status: 'enabled' | 'disabled' | 'maintenance';
  health: 'healthy' | 'warning' | 'critical';
  dependencies: string[];
  lastUpdate: string;
  loadFactor: number;
}

export interface SystemHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: string;
  lastChecked: string;
}

export interface TechnicalProject {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  priority: 'p0' | 'p1' | 'p2';
  progress: number;
  lead: string;
  deadline: string;
  repo: string;
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'active' | 'deprecated' | 'beta';
  latency: number;
  requests24h: number;
  errorRate: number;
}

export interface DbInstance {
  id: string;
  name: string;
  type: 'PostgreSQL' | 'Redis' | 'ElasticSearch';
  status: 'primary' | 'replica' | 'standby';
  health: 'healthy' | 'warning' | 'critical';
  storageUsed: number;
  storageTotal: number;
  activeConnections: number;
}

export interface TechnicalDoc {
  id: string;
  title: string;
  category: 'API' | 'Infrastructure' | 'Security' | 'Guide';
  lastModified: string;
  author: string;
  content: string;
}

export interface Organization {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'archived' | 'pending';
  propertyCount: number;
  userCount: number;
  createdAt: string;
  plan: 'enterprise' | 'pro' | 'basic';
  ownerName: string;
  ownerEmail: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  category: 'cover' | 'bedroom' | 'bathroom' | 'kitchen' | 'common' | 'exterior' | 'other';
  caption?: string;
}

export interface Property {
  id: string;
  name: string;
  description?: string;
  address: string;
  type: 'Hostel' | 'PG' | 'Building' | 'Flats';
  totalFloors?: number;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  status: 'active' | 'inactive' | 'available' | 'rented' | 'maintenance';
  amenities: string[];
  ownerId?: string;
  contractorId?: string;
  condition?: 'Excellent' | 'Good' | 'Fair' | 'Needs Renovation';
  images?: PropertyImage[];
  constructionYear?: number;
  furnishingStatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  securityFeatures?: string[];
  documents?: { id: string; name: string; url: string; type: string }[];
}

export interface RentalAgreement {
  id: string;
  propertyId: string;
  propertyName: string;
  contractorId: string;
  contractorName: string;
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  rentDueDate: number; // 1-31
  paymentFrequency: 'Monthly' | 'Quarterly' | 'Yearly';
  status: 'draft' | 'active' | 'expiring_soon' | 'expired' | 'terminated';
  documents: string[];
}

export interface MaintenanceProject {
  id: string;
  title: string;
  propertyId: string;
  propertyName: string;
  category: 'Plumbing' | 'Electrical' | 'Renovation' | 'Painting' | 'Cleaning' | 'Roofing';
  description: string;
  budget: number;
  spent: number;
  status: 'planned' | 'in-progress' | 'on-hold' | 'completed';
  assignedTo?: string;
  startDate: string;
  deadline: string;
}

export interface LeaseInquiry {
  id: string;
  contractorName: string;
  contactPerson: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyName: string;
  proposedRent: number;
  durationMonths: number;
  status: 'new' | 'contacted' | 'negotiation' | 'accepted' | 'rejected';
  message: string;
  date: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'subscription' | 'refund' | 'payout';
  category: string;
  amount: number;
  date: string;
  propertyId?: string;
  propertyName?: string;
  description: string;
  status: 'pending' | 'completed' | 'overdue' | 'failed' | 'processing';
  payerName?: string;
  paymentMethod?: string;
  reference?: string;
}

export interface Booking {
  id: string;
  studentName: string;
  propertyName: string;
  roomNumber: string;
  bedLabel: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  amount: number;
}

export interface Project {
  id: string;
  title: string;
  address: string;
  propertyId: string;
  propertyName: string;
  contractorId?: string;
  status: 'planning' | 'bidding' | 'active' | 'completed';
  budget: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  ownershipType: 'owned' | 'rented';
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  monthlyRent?: number;
  contractStart?: string;
  contractEnd?: string;
}

export interface TicketMessage {
  id: string;
  senderRole: string;
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  studentName: string;
  hostelId: string;
  hostelName: string;
  roomNumber: string;
  category: 'Plumbing' | 'Electricity' | 'Wi-Fi' | 'Cleaning' | 'Food' | 'Maintenance' | 'Security' | 'Other';
  description: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  messages: TicketMessage[];
  priority: 'low' | 'medium' | 'high';
  assignedAgent?: string;
}

export interface Expense {
  id: string;
  category: 'cook' | 'plumbing' | 'wifi' | 'general' | 'electricity' | 'maintenance';
  amount: number;
  date: string;
  description: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  propertyId: string;
  propertyName: string;
}

export interface StudentInquiry {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  preferredHostel: string;
  roomType: 'Single' | 'Double' | 'Triple' | 'Studio';
  joiningDate: string;
  message: string;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'rejected';
  createdAt: string;
}

export interface Referral {
  id: string;
  agentId: string;
  agentName: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  studentGender?: 'Male' | 'Female' | 'Other';
  hostelId: string;
  hostelName: string;
  accommodationType: string;
  budget?: number;
  status: 'referred' | 'contacted' | 'interested' | 'admission_pending' | 'admitted' | 'rejected';
  commissionAmount: number;
  paymentStatus: 'pending' | 'eligible' | 'paid';
  createdAt: string;
  admissionDate?: string;
  followUpNotes?: string;
}

export interface InvitationLink {
  id: string;
  hostelId: string;
  hostelName: string;
  accommodationType: 'Boys Only' | 'Co-Living' | 'Flats';
  link: string;
  status: 'generated' | 'sent' | 'registered' | 'expired';
  createdAt: string;
  expiresAt: string;
  roomNumber?: string;
  startDate?: string;
}

export interface Lead {
  id: string;
  studentName: string;
  source: string;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'lost';
  followUpDate: string;
  assignedTo?: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'Google' | 'Meta' | 'Email' | 'Referral';
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'ended';
  leadsGenerated: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  actorId: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
  ip?: string;
  category: 'security' | 'user_management' | 'finance' | 'settings' | 'content';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  verificationStatus: 'pending' | 'review' | 'verified' | 'rejected';
  idDocsUploaded: boolean;
  completionPercentage: number;
  assignedHostelId: string;
  assignedHostelName: string;
  roomNumber: string;
  bedNumber: string;
  moveInDate: string;
}

export interface MonthlyInvoice {
  id: string;
  month: string;
  year: number;
  baseRent: number;
  electricity: number;
  wifi: number;
  food: number;
  maintenance: number;
  other: number;
  discounts: number;
  total: number;
  dueDate: string;
  generatedDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  category: 'rent' | 'complaint' | 'announcement' | 'system' | 'profile';
  timestamp: string;
  isRead: boolean;
  whatsappStatus?: 'sent' | 'delivered' | 'failed';
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  month: string;
  amount: number;
  date: string;
  method: 'UPI' | 'Card' | 'Cash';
  reference: string;
  status: 'completed' | 'failed' | 'pending';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'annually';
  features: string[];
  activeUsers: number;
}

export interface PlatformAnnouncement {
  id: string;
  title: string;
  content: string;
  targetRoles: Role[];
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface PlatformRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: {
    module: string;
    actions: ('view' | 'create' | 'edit' | 'delete' | 'approve' | 'export')[];
  }[];
}
