'use client';
import { Referral, ReferralStatus, CommissionStatus } from './types';

const STORAGE_KEY = 'hostelhub_referrals_v2';

const MOCK_REFERRALS: Referral[] = [
  {
    id: 'REF-10001',
    agentId: 'AGT-001',
    agentName: 'Global Admissions Ltd.',
    studentName: 'Rahul Khanna',
    studentPhone: '+91 98822 33441',
    studentEmail: 'rahul.k@student.in',
    hostelId: 'proj1',
    hostelName: 'StaySync Tech Wing',
    accommodationType: 'Single Sharing',
    status: 'admission_confirmed',
    commissionAmount: 2500,
    commissionStatus: 'eligible',
    paymentStatus: 'pending',
    createdAt: '2024-05-01',
    admissionDate: '2024-05-15',
    contractorId: 'u4'
  },
  {
    id: 'REF-10002',
    agentId: 'AGT-001',
    agentName: 'Global Admissions Ltd.',
    studentName: 'Sanya Mirza',
    studentPhone: '+91 90033 44552',
    studentEmail: 'sanya.m@gmail.com',
    hostelId: 'proj1',
    hostelName: 'StaySync Tech Wing',
    accommodationType: 'Double Sharing',
    status: 'interested',
    commissionAmount: 2500,
    commissionStatus: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-05-10',
    contractorId: 'u4'
  },
  {
    id: 'REF-10003',
    agentId: 'AGT-002',
    agentName: 'StaySync University Hub',
    studentName: 'Amit Sharma',
    studentPhone: '+91 98765 43210',
    studentEmail: 'amit.s@edu.in',
    hostelId: 'proj1',
    hostelName: 'StaySync Tech Wing',
    accommodationType: 'Double Sharing',
    status: 'checked_in',
    commissionAmount: 2500,
    commissionStatus: 'paid',
    paymentStatus: 'paid',
    createdAt: '2024-04-12',
    admissionDate: '2024-04-20',
    paymentDate: '2024-05-02',
    transactionRef: 'TXN-948201',
    contractorId: 'u4'
  }
];

export const getStoredReferrals = (contractorId?: string): Referral[] => {
  if (typeof window === 'undefined') return MOCK_REFERRALS.filter(r => !contractorId || r.contractorId === contractorId);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_REFERRALS));
    return MOCK_REFERRALS.filter(r => !contractorId || r.contractorId === contractorId);
  }
  try {
    const all: Referral[] = JSON.parse(stored);
    return all.filter(r => !contractorId || r.contractorId === contractorId);
  } catch (e) {
    return MOCK_REFERRALS.filter(r => !contractorId || r.contractorId === contractorId);
  }
};

export const saveReferrals = (referrals: Referral[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
    window.dispatchEvent(new Event('storage'));
  }
};

export const addReferral = (refData: Omit<Referral, 'id' | 'createdAt' | 'commissionStatus' | 'paymentStatus'>) => {
  const referrals = getStoredReferrals();
  const newRef: Referral = {
    ...refData,
    id: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
    commissionStatus: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newRef, ...referrals];
  saveReferrals(updated);
  return newRef;
};

export const updateReferralStatus = (id: string, status: ReferralStatus) => {
  const referrals = getStoredReferrals();
  const updated = referrals.map(r => {
    if (r.id === id) {
      const commissionStatus = status === 'admission_confirmed' || status === 'checked_in' ? 'eligible' : r.commissionStatus;
      const admissionDate = (status === 'admission_confirmed' || status === 'checked_in') && !r.admissionDate 
        ? new Date().toISOString().split('T')[0] 
        : r.admissionDate;
      return { ...r, status, commissionStatus, admissionDate };
    }
    return r;
  });
  saveReferrals(updated);
};

export const updateCommissionStatus = (id: string, commissionStatus: CommissionStatus) => {
  const referrals = getStoredReferrals();
  const updated = referrals.map(r => {
    if (r.id === id) {
      let paymentStatus = r.paymentStatus;
      let paymentDate = r.paymentDate;
      if (commissionStatus === 'paid') {
        paymentStatus = 'paid';
        paymentDate = new Date().toISOString().split('T')[0];
      }
      return { ...r, commissionStatus, paymentStatus, paymentDate };
    }
    return r;
  });
  saveReferrals(updated);
};
