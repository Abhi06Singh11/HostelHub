'use client';
import { StudentProfile, MonthlyInvoice, StudentNotification, PaymentRecord } from './types';

const PROFILE_KEY = 'staysync_student_profile';
const INVOICES_KEY = 'staysync_student_invoices';
const NOTIFICATIONS_KEY = 'staysync_student_notifications';
const PAYMENTS_KEY = 'staysync_student_payments';

const MOCK_PROFILE: StudentProfile = {
  id: 'st-101',
  name: 'Amit Sharma',
  email: 'amit.sharma@edu.in',
  phone: '+91 98765 43210',
  gender: 'Male',
  dob: '2002-08-15',
  emergencyContact: {
    name: 'Rajesh Sharma',
    relationship: 'Father',
    phone: '+91 99887 76655'
  },
  verificationStatus: 'verified',
  idDocsUploaded: true,
  completionPercentage: 85,
  assignedHostelId: 'proj1',
  assignedHostelName: 'StaySync Tech Wing',
  roomNumber: '304',
  bedNumber: 'A',
  moveInDate: '2024-03-01'
};

const MOCK_INVOICES: MonthlyInvoice[] = [
  {
    id: 'inv-may-24',
    month: 'May',
    year: 2024,
    baseRent: 12000,
    electricity: 850,
    wifi: 500,
    food: 3500,
    maintenance: 200,
    other: 0,
    discounts: 0,
    total: 17050,
    dueDate: '2024-05-05',
    generatedDate: '2024-05-01',
    status: 'paid'
  },
  {
    id: 'inv-jun-24',
    month: 'June',
    year: 2024,
    baseRent: 12000,
    electricity: 920,
    wifi: 500,
    food: 3500,
    maintenance: 200,
    other: 0,
    discounts: 0,
    total: 17120,
    dueDate: '2024-06-05',
    generatedDate: '2024-06-01',
    status: 'pending'
  }
];

const MOCK_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'not-1',
    title: 'Rent Invoice Generated',
    message: 'Your invoice for June 2024 is ready. Please pay by the 5th to avoid late fees.',
    category: 'rent',
    timestamp: '2024-06-01 09:00',
    isRead: false,
    whatsappStatus: 'delivered'
  },
  {
    id: 'not-2',
    title: 'Complaint Resolved',
    message: 'The Wi-Fi issue you reported for the 1st floor has been resolved by the ISP.',
    category: 'complaint',
    timestamp: '2024-05-28 14:30',
    isRead: true,
    whatsappStatus: 'delivered'
  }
];

const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-may-24',
    month: 'May 2024',
    amount: 17050,
    date: '2024-05-03',
    method: 'UPI',
    reference: 'T240503112233',
    status: 'completed'
  }
];

export const getStudentProfile = (): StudentProfile => {
  if (typeof window === 'undefined') return MOCK_PROFILE;
  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(MOCK_PROFILE));
    return MOCK_PROFILE;
  }
  return JSON.parse(stored);
};

export const updateStudentProfile = (updates: Partial<StudentProfile>) => {
  const current = getStudentProfile();
  const updated = { ...current, ...updates };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const getStudentInvoices = (): MonthlyInvoice[] => {
  if (typeof window === 'undefined') return MOCK_INVOICES;
  const stored = localStorage.getItem(INVOICES_KEY);
  if (!stored) {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(MOCK_INVOICES));
    return MOCK_INVOICES;
  }
  return JSON.parse(stored);
};

export const updateInvoiceStatus = (id: string, status: MonthlyInvoice['status']) => {
  const data = getStudentInvoices();
  const updated = data.map(inv => inv.id === id ? { ...inv, status } : inv);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const getStudentNotifications = (): StudentNotification[] => {
  if (typeof window === 'undefined') return MOCK_NOTIFICATIONS;
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(MOCK_NOTIFICATIONS));
    return MOCK_NOTIFICATIONS;
  }
  return JSON.parse(stored);
};

export const markNotificationRead = (id: string) => {
  const data = getStudentNotifications();
  const updated = data.map(n => n.id === id ? { ...n, isRead: true } : n);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const getStudentPayments = (): PaymentRecord[] => {
  if (typeof window === 'undefined') return MOCK_PAYMENTS;
  const stored = localStorage.getItem(PAYMENTS_KEY);
  if (!stored) {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(MOCK_PAYMENTS));
    return MOCK_PAYMENTS;
  }
  return JSON.parse(stored);
};

export const addPaymentRecord = (record: Omit<PaymentRecord, 'id'>) => {
  const data = getStudentPayments();
  const newRec = { ...record, id: `pay-${Date.now()}` };
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify([newRec, ...data]));
  window.dispatchEvent(new Event('storage'));
};
