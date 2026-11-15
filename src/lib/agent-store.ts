'use client';
import { Agent } from './types';

const AGENTS_KEY = 'staysync_contractor_agents';

const MOCK_AGENTS: Agent[] = [
  {
    id: 'AGT-001',
    name: 'Global Admissions Ltd.',
    email: 'info@globaladmissions.com',
    phone: '+91 98822 33441',
    status: 'active',
    joiningDate: '2023-11-12',
    totalReferrals: 45,
    successfulAdmissions: 12,
    pendingReferrals: 8,
    totalEarnings: 30000,
    pendingCommission: 4500,
    commissionRate: '₹2500/Admission',
    contractorId: 'u4'
  },
  {
    id: 'AGT-002',
    name: 'StaySync University Hub',
    email: 'contact@ssuhub.in',
    phone: '+91 90033 44552',
    status: 'active',
    joiningDate: '2024-01-05',
    totalReferrals: 28,
    successfulAdmissions: 8,
    pendingReferrals: 4,
    totalEarnings: 20000,
    pendingCommission: 0,
    commissionRate: '15% of 1st Month',
    contractorId: 'u4'
  },
  {
    id: 'AGT-003',
    name: 'Rahul Consulting',
    email: 'rahul.ref@gmail.com',
    phone: '+91 95544 33221',
    status: 'inactive',
    joiningDate: '2024-02-20',
    totalReferrals: 12,
    successfulAdmissions: 1,
    pendingReferrals: 0,
    totalEarnings: 2500,
    pendingCommission: 0,
    commissionRate: '₹2500/Admission',
    contractorId: 'u4'
  }
];

export const getContractorAgents = (contractorId: string): Agent[] => {
  if (typeof window === 'undefined') return MOCK_AGENTS.filter(a => a.contractorId === contractorId);
  const stored = localStorage.getItem(AGENTS_KEY);
  if (!stored) {
    localStorage.setItem(AGENTS_KEY, JSON.stringify(MOCK_AGENTS));
    return MOCK_AGENTS.filter(a => a.contractorId === contractorId);
  }
  try {
    const allAgents: Agent[] = JSON.parse(stored);
    return allAgents.filter(a => a.contractorId === contractorId);
  } catch (e) {
    return MOCK_AGENTS.filter(a => a.contractorId === contractorId);
  }
};

export const updateAgentStatus = (agentId: string, status: 'active' | 'inactive') => {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(AGENTS_KEY);
  if (!stored) return;
  const agents: Agent[] = JSON.parse(stored);
  const updated = agents.map(a => a.id === agentId ? { ...a, status } : a);
  localStorage.setItem(AGENTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};
