'use client';
import { Property, RentalAgreement, MaintenanceProject, LeaseInquiry, FinancialTransaction, PropertyImage } from './types';

const PROPERTIES_KEY = 'staysync_owner_properties';
const AGREEMENTS_KEY = 'staysync_owner_agreements';
const PROJECTS_KEY = 'staysync_owner_projects';
const INQUIRIES_KEY = 'staysync_owner_inquiries';
const FINANCIALS_KEY = 'staysync_owner_financials';

const MOCK_IMAGES: PropertyImage[] = [
  { id: 'img1', category: 'cover', url: 'https://picsum.photos/seed/hostel1/1200/600' },
  { id: 'img2', category: 'bedroom', url: 'https://picsum.photos/seed/hostel2/800/600' },
  { id: 'img3', category: 'bathroom', url: 'https://picsum.photos/seed/hostel3/800/600' },
  { id: 'img4', category: 'kitchen', url: 'https://picsum.photos/seed/hostel4/800/600' },
  { id: 'img5', category: 'common', url: 'https://picsum.photos/seed/hostel5/800/600' },
];

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'Green View Tower',
    description: 'A premium 5-floor building located in the heart of the Electronic City IT hub. Perfectly suited for student housing with modern facilities.',
    address: '45 IT Corridor, Electronic City, Bengaluru',
    type: 'Building',
    totalFloors: 5,
    totalRooms: 40,
    totalBeds: 120,
    occupiedBeds: 120,
    status: 'rented',
    amenities: ['Solar Power', 'Lift', 'Parking', 'Fire Safety', '24/7 Water', 'CCTV'],
    condition: 'Excellent',
    contractorId: 'con-1',
    images: MOCK_IMAGES,
    constructionYear: 2021,
    furnishingStatus: 'Fully Furnished',
    securityFeatures: ['Biometric Entry', 'CCTV Surveillance', 'Security Guard'],
    documents: [
      { id: 'doc1', name: 'Building Permit', url: '#', type: 'PDF' },
      { id: 'doc2', name: 'Sale Deed', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'prop-2',
    name: 'Sterling Residency',
    description: 'Centrally located 3-floor residential property with spacious units. Ideal for a boutique hostel or PG conversion.',
    address: '12 Garden Road, HSR Layout, Bengaluru',
    type: 'Building',
    totalFloors: 3,
    totalRooms: 20,
    totalBeds: 60,
    occupiedBeds: 0,
    status: 'available',
    amenities: ['Security', 'Water Purifier', 'Common Area', 'Power Backup'],
    condition: 'Good',
    images: [MOCK_IMAGES[0], MOCK_IMAGES[2]],
    constructionYear: 2018,
    furnishingStatus: 'Semi-Furnished'
  }
];

const MOCK_AGREEMENTS: RentalAgreement[] = [
  {
    id: 'agr-1',
    propertyId: 'prop-1',
    propertyName: 'Green View Tower',
    contractorId: 'con-1',
    contractorName: 'StaySync Operations Ltd.',
    monthlyRent: 350000,
    securityDeposit: 1000000,
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    rentDueDate: 5,
    paymentFrequency: 'Monthly',
    status: 'active',
    documents: ['lease_agreement.pdf', 'noc_cert.pdf']
  }
];

const MOCK_PROJECTS: MaintenanceProject[] = [
  {
    id: 'm-1',
    title: 'External Facade Painting',
    propertyId: 'prop-1',
    propertyName: 'Green View Tower',
    category: 'Painting',
    description: 'Fresh coat of weatherproof paint for the entire building exterior.',
    budget: 250000,
    spent: 50000,
    status: 'in-progress',
    startDate: '2024-05-01',
    deadline: '2024-05-30',
    assignedTo: 'Nippon Paints Commercial'
  }
];

const MOCK_INQUIRIES: LeaseInquiry[] = [
  {
    id: 'inq-1',
    contractorName: 'Urban Living PGs',
    contactPerson: 'Aditya Mehta',
    phone: '+91 98877 66554',
    email: 'aditya@urbanliving.in',
    propertyId: 'prop-2',
    propertyName: 'Sterling Residency',
    proposedRent: 180000,
    durationMonths: 36,
    status: 'new',
    message: 'We are expanding our footprint in HSR and this building fits our premium hostel model perfectly.',
    date: '2024-05-12'
  }
];

const MOCK_FINANCIALS: FinancialTransaction[] = [
  { id: 'f-1', type: 'income', category: 'Rent', amount: 350000, date: '2024-05-05', propertyId: 'prop-1', propertyName: 'Green View Tower', description: 'Monthly Rent - May 2024', status: 'completed' },
  { id: 'f-2', type: 'expense', category: 'Maintenance', amount: 50000, date: '2024-05-02', propertyId: 'prop-1', propertyName: 'Green View Tower', description: 'Painting Advance', status: 'completed' },
  { id: 'f-3', type: 'expense', category: 'Tax', amount: 85000, date: '2024-04-15', propertyId: 'prop-1', propertyName: 'Green View Tower', description: 'Property Tax FY24', status: 'completed' },
];

export const getStoredOwnerData = <T>(key: string, mock: T[]): T[] => {
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

export const getOwnerProperties = () => getStoredOwnerData(PROPERTIES_KEY, MOCK_PROPERTIES);
export const getOwnerAgreements = () => getStoredOwnerData(AGREEMENTS_KEY, MOCK_AGREEMENTS);
export const getOwnerProjects = () => getStoredOwnerData(PROJECTS_KEY, MOCK_PROJECTS);
export const getOwnerInquiries = () => getStoredOwnerData(INQUIRIES_KEY, MOCK_INQUIRIES);
export const getOwnerFinancials = () => getStoredOwnerData(FINANCIALS_KEY, MOCK_FINANCIALS);

export const addOwnerProperty = (prop: Omit<Property, 'id'>) => {
  const data = getOwnerProperties();
  const newItem = { ...prop, id: `prop-${Date.now()}` } as Property;
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify([newItem, ...data]));
  window.dispatchEvent(new Event('storage'));
  return newItem;
};

export const updateOwnerProperty = (id: string, updates: Partial<Property>) => {
  const data = getOwnerProperties();
  const updated = data.map(p => p.id === id ? { ...p, ...updates } : p);
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const deleteOwnerProperty = (id: string) => {
  const data = getOwnerProperties();
  const updated = data.filter(p => p.id !== id);
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const updateOwnerInquiry = (id: string, status: LeaseInquiry['status']) => {
  const data = getOwnerInquiries();
  const updated = data.map(i => i.id === id ? { ...i, status } : i);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const addOwnerProject = (project: Omit<MaintenanceProject, 'id'>) => {
  const data = getOwnerProjects();
  const newItem = { ...project, id: `m-${Date.now()}` } as MaintenanceProject;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify([newItem, ...data]));
  window.dispatchEvent(new Event('storage'));
  return newItem;
};
