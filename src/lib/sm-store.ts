'use client';
import { MarketingLead, MarketingCampaign, MarketingAcquisition, MarketingTask } from './types';

const LEADS_KEY = 'staysync_sm_leads';
const CAMPAIGNS_KEY = 'staysync_sm_campaigns';
const ACQUISITION_KEY = 'staysync_sm_acquisition';
const TASKS_KEY = 'staysync_sm_tasks';

const MOCK_LEADS: MarketingLead[] = [
  { id: 'lead-1', name: 'Rohan Gupta', email: 'rohan.g@gmail.com', phone: '+91 98877 11223', source: 'Meta', status: 'interested', score: 85, followUpDate: '2024-06-10', createdAt: '2024-06-01' },
  { id: 'lead-2', name: 'Ananya Rao', email: 'arao.edu@yahoo.com', phone: '+91 90088 77665', source: 'Google', status: 'new', score: 45, followUpDate: '2024-06-12', createdAt: '2024-06-02' },
  { id: 'lead-3', name: 'Kabir Singh', email: 'kabir.s@outlook.com', phone: '+91 97766 55443', source: 'Instagram', status: 'contacted', score: 62, followUpDate: '2024-06-08', createdAt: '2024-05-28' },
  { id: 'lead-4', name: 'Priya Verma', email: 'priya.v@gmail.com', phone: '+91 95544 33221', source: 'Referral', status: 'converted', score: 98, followUpDate: '2024-06-05', createdAt: '2024-05-25' },
];

const MOCK_CAMPAIGNS: MarketingCampaign[] = [
  { id: 'camp-1', name: 'Bengaluru Summer Drive', channel: 'Meta Ads', budget: 50000, spent: 32000, leads: 420, conversions: 12, status: 'active', startDate: '2024-05-01', endDate: '2024-06-30' },
  { id: 'camp-2', name: 'PG Launch - HSR Layout', channel: 'Google Search', budget: 25000, spent: 18500, leads: 180, conversions: 5, status: 'active', startDate: '2024-05-15', endDate: '2024-07-15' },
  { id: 'camp-3', name: 'Early Bird Student Bonus', channel: 'Direct Email', budget: 10000, spent: 4500, leads: 85, conversions: 22, status: 'scheduled', startDate: '2024-07-01', endDate: '2024-08-01' },
];

const MOCK_ACQUISITIONS: MarketingAcquisition[] = [
  { id: 'acq-1', month: 'June', source: 'Meta Ads', count: 45, cpa: 450 },
  { id: 'acq-2', month: 'June', source: 'Google', count: 28, cpa: 680 },
  { id: 'acq-3', month: 'June', source: 'Referrals', count: 112, cpa: 120 },
];

const MOCK_TASKS: MarketingTask[] = [
  { id: 'mt-1', title: 'Update Meta Ad Creatives', assignee: 'Marketing Mike', deadline: '2024-06-15', status: 'in-progress', priority: 'high' },
  { id: 'mt-2', title: 'Review Affiliate Commission Payouts', assignee: 'Sarah Ops', deadline: '2024-06-20', status: 'pending', priority: 'medium' },
  { id: 'mt-3', title: 'Email blast for June Rent Cycle', assignee: 'Automated', deadline: '2024-06-01', status: 'completed', priority: 'high' },
];

const getStored = <T>(key: string, mock: T[]): T[] => {
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

export const getSMLeads = () => getStored(LEADS_KEY, MOCK_LEADS);
export const getSMCampaigns = () => getStored(CAMPAIGNS_KEY, MOCK_CAMPAIGNS);
export const getSMAcquisitions = () => getStored(ACQUISITION_KEY, MOCK_ACQUISITIONS);
export const getSMTasks = () => getStored(TASKS_KEY, MOCK_TASKS);

export const updateLeadStatus = (id: string, status: MarketingLead['status']) => {
  const data = getSMLeads();
  const updated = data.map(l => l.id === id ? { ...l, status } : l);
  localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const addSMCampaign = (camp: Omit<MarketingCampaign, 'id' | 'spent' | 'leads' | 'conversions'>) => {
  const data = getSMCampaigns();
  const newCamp: MarketingCampaign = {
    ...camp,
    id: `camp-${Date.now()}`,
    spent: 0,
    leads: 0,
    conversions: 0
  };
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify([newCamp, ...data]));
  window.dispatchEvent(new Event('storage'));
  return newCamp;
};
