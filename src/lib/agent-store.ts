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

export const getAllAgents = (): Agent[] => {
  if (typeof window === 'undefined') return MOCK_AGENTS;
  const stored = localStorage.getItem(AGENTS_KEY);
  if (!stored) {
    localStorage.setItem(AGENTS_KEY, JSON.stringify(MOCK_AGENTS));
    return MOCK_AGENTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return MOCK_AGENTS;
  }
};

export const getContractorAgents = (contractorId: string): Agent[] => {
  return getAllAgents().filter(a => a.contractorId === contractorId);
};

export const addAgent = (agent: Omit<Agent, 'id' | 'totalReferrals' | 'successfulAdmissions' | 'pendingReferrals' | 'totalEarnings' | 'pendingCommission'>) => {
  const all = getAllAgents();
  const newAgent: Agent = {
    ...agent,
    id: `AGT-${Math.floor(1000 + Math.random() * 9000)}`,
    totalReferrals: 0,
    successfulAdmissions: 0,
    pendingReferrals: 0,
    totalEarnings: 0,
    pendingCommission: 0
  };
  const updated = [newAgent, ...all];
  localStorage.setItem(AGENTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
  return newAgent;
};

export const updateAgent = (id: string, updates: Partial<Agent>) => {
  const all = getAllAgents();
  const updated = all.map(a => a.id === id ? { ...a, ...updates } : a);
  localStorage.setItem(AGENTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const deleteAgent = (id: string) => {
  const all = getAllAgents();
  const updated = all.filter(a => a.id !== id);
  localStorage.setItem(AGENTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const updateAgentStatus = (agentId: string, status: 'active' | 'inactive') => {
  updateAgent(agentId, { status });
};
