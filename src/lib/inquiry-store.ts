'use client';
import { StudentInquiry, InvitationLink } from './types';
import { mockStudentInquiries, mockInvitationLinks } from './mock-data';

const INQUIRY_KEY = 'hostelhub_student_inquiries';
const INVITATION_KEY = 'hostelhub_invitation_links';

// Inquiries
export const getStoredInquiries = (): StudentInquiry[] => {
  if (typeof window === 'undefined') return mockStudentInquiries;
  const stored = localStorage.getItem(INQUIRY_KEY);
  if (!stored) {
    localStorage.setItem(INQUIRY_KEY, JSON.stringify(mockStudentInquiries));
    return mockStudentInquiries;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockStudentInquiries;
  }
};

export const updateInquiryStatus = (id: string, status: StudentInquiry['status']) => {
  const inquiries = getStoredInquiries();
  const updated = inquiries.map(i => i.id === id ? { ...i, status } : i);
  localStorage.setItem(INQUIRY_KEY, JSON.stringify(updated));
};

// Invitations
export const getStoredInvitations = (): InvitationLink[] => {
  if (typeof window === 'undefined') return mockInvitationLinks;
  const stored = localStorage.getItem(INVITATION_KEY);
  if (!stored) {
    localStorage.setItem(INVITATION_KEY, JSON.stringify(mockInvitationLinks));
    return mockInvitationLinks;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockInvitationLinks;
  }
};

export const addInvitation = (inv: Omit<InvitationLink, 'id' | 'link' | 'createdAt' | 'status'>) => {
  const invitations = getStoredInvitations();
  const newInv: InvitationLink = {
    ...inv,
    id: `inv-${Date.now()}`,
    link: `https://staysync.in/join/${Math.random().toString(36).substring(7)}`,
    status: 'generated',
    createdAt: new Date().toISOString().split('T')[0]
  } as InvitationLink;
  const updated = [newInv, ...invitations];
  localStorage.setItem(INVITATION_KEY, JSON.stringify(updated));
  return newInv;
};

export const deactivateInvitation = (id: string) => {
  const invitations = getStoredInvitations();
  const updated = invitations.map(i => i.id === id ? { ...i, status: 'expired' as const } : i);
  localStorage.setItem(INVITATION_KEY, JSON.stringify(updated));
};
