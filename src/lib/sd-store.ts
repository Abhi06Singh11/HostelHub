'use client';
import { Deployment, Bug, FeatureFlag, AppModule, SystemHealth, TechnicalProject, ApiEndpoint, DbInstance, TechnicalDoc } from './types';

const DEPLOY_KEY = 'staysync_sd_deployments';
const BUGS_KEY = 'staysync_sd_bugs';
const FEATURES_KEY = 'staysync_sd_features';
const MODULES_KEY = 'staysync_sd_modules';
const PROJECTS_KEY = 'staysync_sd_projects';
const API_KEY = 'staysync_sd_api';
const DB_KEY = 'staysync_sd_db';
const DOCS_KEY = 'staysync_sd_docs';

const MOCK_HEALTH: SystemHealth[] = [
  { service: 'API Gateway', status: 'healthy', latency: '12ms', lastChecked: 'Just now' },
  { service: 'PostgreSQL Cluster', status: 'healthy', latency: '4ms', lastChecked: '1 min ago' },
  { service: 'Redis Cache', status: 'healthy', latency: '1ms', lastChecked: 'Just now' },
  { service: 'Image Processor', status: 'degraded', latency: '2.4s', lastChecked: '3 mins ago' },
  { service: 'Notification Engine', status: 'healthy', latency: '45ms', lastChecked: 'Just now' },
];

const MOCK_DEPLOYMENTS: Deployment[] = [
  { id: 'dep-1', version: 'v2.4.1', environment: 'production', status: 'success', deployedBy: 'sarah.dev', timestamp: '2024-06-01 10:00', healthScore: 98 },
  { id: 'dep-2', version: 'v2.4.2-rc1', environment: 'staging', status: 'in-progress', deployedBy: 'mike.dev', timestamp: '2024-06-01 14:20', healthScore: 0 },
  { id: 'dep-3', version: 'v2.3.9', environment: 'production', status: 'success', deployedBy: 'sarah.dev', timestamp: '2024-05-28 09:00', healthScore: 95 },
];

const MOCK_BUGS: Bug[] = [
  { id: 'bug-101', title: 'Payment timeout on mobile safari', severity: 'critical', status: 'fixing', component: 'Payment Gateway', reportedBy: 'QA Team', assignedTo: 'sarah.dev', createdAt: '2024-06-01 08:30' },
  { id: 'bug-102', title: 'Incorrect rent calc for single sharing', severity: 'high', status: 'new', component: 'Rent Engine', reportedBy: 'Contractor Hub', createdAt: '2024-06-01 11:45' },
  { id: 'bug-103', title: 'Logo blur on high-res displays', severity: 'low', status: 'open', component: 'UI/UX', reportedBy: 'Marketing', createdAt: '2024-05-30 15:20' },
];

const MOCK_FEATURES: FeatureFlag[] = [
  { id: 'ff-1', name: 'Dark Mode Dashboard', key: 'ui_dark_mode', status: 'active', rolloutPercentage: 100, description: 'Enables dark mode across all role dashboards.' },
  { id: 'ff-2', name: 'AI Rent Prediction', key: 'ai_rent_model', status: 'beta', rolloutPercentage: 15, description: 'Predicts optimal rent based on market trends.' },
  { id: 'ff-3', name: 'WhatsApp Payout Alerts', key: 'payout_whatsapp', status: 'inactive', rolloutPercentage: 0, description: 'Send payout confirmations via WhatsApp.' },
];

const MOCK_MODULES: AppModule[] = [
  { id: 'mod-1', name: 'Auth Engine', version: 'v1.4.2', status: 'enabled', health: 'healthy', dependencies: ['PostgreSQL'], lastUpdate: '2024-05-20', loadFactor: 12 },
  { id: 'mod-2', name: 'Inventory Sync', version: 'v2.0.1', status: 'enabled', health: 'healthy', dependencies: ['PostgreSQL', 'Redis'], lastUpdate: '2024-05-25', loadFactor: 45 },
  { id: 'mod-3', name: 'Invoice Generator', version: 'v1.1.0', status: 'enabled', health: 'warning', dependencies: ['AWS S3'], lastUpdate: '2024-05-18', loadFactor: 88 },
];

const MOCK_PROJECTS: TechnicalProject[] = [
  { id: 'tp-1', name: 'Platform Migration v3', status: 'active', priority: 'p0', progress: 65, lead: 'sarah.dev', deadline: '2024-08-01', repo: 'github.com/staysync/core' },
  { id: 'tp-2', name: 'Analytics Engine Revamp', status: 'planning', priority: 'p1', progress: 12, lead: 'mike.dev', deadline: '2024-09-15', repo: 'github.com/staysync/analytics' },
];

const MOCK_API_ENDPOINTS: ApiEndpoint[] = [
  { id: 'api-1', path: '/v1/auth/login', method: 'POST', status: 'active', latency: 45, requests24h: 12400, errorRate: 0.02 },
  { id: 'api-2', path: '/v1/payments/verify', method: 'POST', status: 'active', latency: 180, requests24h: 3200, errorRate: 0.15 },
  { id: 'api-3', path: '/v1/hostels/search', method: 'GET', status: 'beta', latency: 65, requests24h: 45000, errorRate: 0.01 },
];

const MOCK_DB_INSTANCES: DbInstance[] = [
  { id: 'db-1', name: 'Primary Cluster (Prod)', type: 'PostgreSQL', status: 'primary', health: 'healthy', storageUsed: 450, storageTotal: 1024, activeConnections: 124 },
  { id: 'db-2', name: 'Search Cache', type: 'Redis', status: 'primary', health: 'healthy', storageUsed: 12, storageTotal: 64, activeConnections: 42 },
];

const MOCK_DOCS: TechnicalDoc[] = [
  { id: 'doc-1', title: 'Onboarding System Architecture', category: 'Infrastructure', author: 'sarah.dev', lastModified: '2024-05-10', content: 'Detailed diagram of user registration and verification flows...' },
  { id: 'doc-2', title: 'Payment Gateway Integration', category: 'API', author: 'mike.dev', lastModified: '2024-05-22', content: 'Step-by-step guide for adding new payment providers...' },
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

export const getSDHealth = () => MOCK_HEALTH;
export const getSDDeployments = () => getStored(DEPLOY_KEY, MOCK_DEPLOYMENTS);
export const getSDBugs = () => getStored(BUGS_KEY, MOCK_BUGS);
export const getSDFeatures = () => getStored(FEATURES_KEY, MOCK_FEATURES);
export const getSDModules = () => getStored(MODULES_KEY, MOCK_MODULES);
export const getSDProjects = () => getStored(PROJECTS_KEY, MOCK_PROJECTS);
export const getSDApiEndpoints = () => getStored(API_KEY, MOCK_API_ENDPOINTS);
export const getSDDbInstances = () => getStored(DB_KEY, MOCK_DB_INSTANCES);
export const getSDDocs = () => getStored(DOCS_KEY, MOCK_DOCS);

export const updateDeploymentStatus = (id: string, status: Deployment['status']) => {
  const data = getSDDeployments();
  const updated = data.map(d => d.id === id ? { ...d, status } : d);
  localStorage.setItem(DEPLOY_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const updateBugStatus = (id: string, status: Bug['status']) => {
  const data = getSDBugs();
  const updated = data.map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem(BUGS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};

export const toggleFeatureFlag = (id: string) => {
  const data = getSDFeatures();
  const updated = data.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f);
  localStorage.setItem(FEATURES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage'));
};
