'use client';
import { Referral } from './types';

const STORAGE_KEY = 'hostelhub_referrals_v1';

const MOCK_REFERRALS: Referral[] = [
  {
    id: 'ref-1',
    agentId: 'a1',
    agentName: 'Global Admissions Ltd.',
    studentName: 'Rahul Khanna',
    studentPhone: '+91 98822 33441',
    studentEmail: 'rahul.k@student.in',
    hostelId: 'proj1',
    hostelName: 'StaySync Tech Wing',
    accommodationType: 'Single Sharing',
    status: 'admitted',
    commissionAmount: 2500,
    paymentStatus: 'eligible',
    createdAt: '2024-05-01',
    admissionDate: '2024-05-15'
  },
  {
    id: 'ref-2',
    agentId: 'a1',
    agentName: 'Global Admissions Ltd.',
    studentName: 'Sanya Mirza',
    studentPhone: '+91 90033 44552',
    studentEmail: 'sanya.m@gmail.com',
    hostelId: 'proj2',
    hostelName: 'Elite Student Manor',
    accommodationType: 'Double Sharing',
    status: 'interested',
    commissionAmount: 1800,
    paymentStatus: 'pending',
    createdAt: '2024-05-10'
  }
];

export const getStoredReferrals = (): Referral[] => {
  if (typeof window === 'undefined') return MOCK_REFERRALS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_REFERRALS));
    return MOCK_REFERRALS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return MOCK_REFERRALS;
  }
};

export const saveReferrals = (referrals: Referral[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
    window.dispatchEvent(new Event('storage'));
  }
};

export const addReferral = (refData: Omit<Referral, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => {
  const referrals = getStoredReferrals();
  const newRef: Referral = {
    ...refData,
    id: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'referred',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newRef, ...referrals];
  saveReferrals(updated);
  return newRef;
};

export const updateReferralStatus = (id: string, status: Referral['status']) => {
  const referrals = getStoredReferrals();
  const updated = referrals.map(r => {
    if (r.id === id) {
      const paymentStatus = status === 'admitted' ? 'eligible' : r.paymentStatus;
      const admissionDate = status === 'admitted' ? new Date().toISOString().split('T')[0] : r.admissionDate;
      return { ...r, status, paymentStatus, admissionDate };
    }
    return r;
  });
  saveReferrals(updated);
};

export const updateReferralPayment = (id: string, paymentStatus: Referral['paymentStatus']) => {
  const referrals = getStoredReferrals();
  const updated = referrals.map(r => r.id === id ? { ...r, paymentStatus } : r);
  saveReferrals(updated);
};
