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
  bio?: string;
  skills?: string[];
  assignedModules?: string[];
  workload?: number;
  progress?: number;
  upcomingTasks?: DeveloperTask[];
}

export interface MarketingLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Meta' | 'Google' | 'Instagram' | 'Referral' | 'Direct';
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'lost';
  score: number;
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
  cpa: number;
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
  rentDueDate: number;
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

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joiningDate: string;
  totalReferrals: number;
  successfulAdmissions: number;
  pendingReferrals: number;
  totalEarnings: number;
  pendingCommission: number;
  commissionRate: string;
  contractorId: string;
}

export type ReferralStatus = 
  | 'new' 
  | 'contacted' 
  | 'interested' 
  | 'pg_allocated' 
  | 'admission_confirmed' 
  | 'checked_in' 
  | 'cancelled';

export type CommissionStatus = 
  | 'pending' 
  | 'eligible' 
  | 'approved' 
  | 'paid' 
  | 'rejected' 
  | 'on_hold';

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
  status: ReferralStatus;
  commissionAmount: number;
  commissionStatus: CommissionStatus;
  paymentStatus: 'pending' | 'eligible' | 'paid';
  createdAt: string;
  admissionDate?: string;
  paymentDate?: string;
  transactionRef?: string;
  followUpNotes?: string;
  contractorId?: string;
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

// Resident/Student Management Types
export type StayStatus = 'active' | 'left' | 'upcoming';
export type VerificationLevel = 'none' | 'pending' | 'verified' | 'rejected';

export interface StudentDocument {
  id: string;
  name: string;
  type: 'id_proof' | 'address_proof' | 'photo' | 'police_ack' | 'guardian_id' | 'other';
  url: string;
  uploadDate: string;
  status: VerificationLevel;
}

export interface StayRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  bedNumber: string;
  checkInDate: string;
  checkOutDate?: string;
  status: 'completed' | 'ongoing' | 'cancelled';
}

export interface VerificationAuditLog {
  id: string;
  type: 'government_id' | 'police';
  oldStatus: VerificationLevel;
  newStatus: VerificationLevel;
  changedBy: string;
  timestamp: string;
  reason?: string;
}

export interface StudentDetail extends User {
  studentId: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
  alternatePhone?: string;
  permanentAddress: string;
  currentAddress: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;

  assignedHostelId: string;
  assignedHostelName: string;
  roomNumber: string;
  bedNumber: string;
  stayStatus: StayStatus;
  checkInDate: string;
  checkOutDate?: string;
  registrationDate: string;

  govIdType: 'Aadhaar' | 'Passport' | 'Voter ID' | 'Driving Licence' | 'Other';
  govIdNumber: string; // Masked in UI
  govIdVerified: boolean;
  govIdVerifiedAt?: string;
  govIdVerifiedBy?: string;
  
  policeVerified: boolean;
  policeVerifiedAt?: string;
  policeVerifiedBy?: string;
  policeRefNumber?: string;
  policeStation?: string;

  documents: StudentDocument[];
  stayHistory: StayRecord[];
  verificationLogs: VerificationAuditLog[];
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
