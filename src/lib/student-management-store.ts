'use client';
import { StudentDetail, VerificationAuditLog, VerificationLevel } from './types';

const STORAGE_KEY = 'staysync_contractor_students_v1';

const MOCK_STUDENTS: StudentDetail[] = [
  {
    id: 'u6',
    studentId: 'ST-1001',
    name: 'Amit Sharma',
    email: 'amit.sharma@edu.in',
    phone: '+91 98765 43210',
    roles: ['student'],
    activeRole: 'student',
    status: 'verified',
    joinedAt: '2024-03-01',
    dob: '2002-08-15',
    gender: 'Male',
    nationality: 'Indian',
    permanentAddress: 'H-42, Civil Lines, Jaipur, Rajasthan',
    currentAddress: 'Room 304, StaySync Tech Wing, Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    pincode: '560100',
    fatherName: 'Rajesh Sharma',
    motherName: 'Sunita Sharma',
    guardianPhone: '+91 99887 76655',
    emergencyName: 'Rajesh Sharma',
    emergencyPhone: '+91 99887 76655',
    emergencyRelation: 'Father',
    assignedHostelId: 'proj1',
    assignedHostelName: 'StaySync Tech Wing',
    roomNumber: '304',
    bedNumber: 'A',
    stayStatus: 'active',
    checkInDate: '2024-03-01',
    registrationDate: '2024-02-25',
    govIdType: 'Aadhaar',
    govIdNumber: 'XXXX-XXXX-4829',
    govIdVerified: true,
    govIdVerifiedAt: '2024-03-02',
    govIdVerifiedBy: 'John Contractor',
    policeVerified: false,
    documents: [
      { id: 'doc1', name: 'Aadhaar_Card.pdf', type: 'id_proof', url: '#', uploadDate: '2024-02-25', status: 'verified' },
      { id: 'doc2', name: 'Photo.jpg', type: 'photo', url: '#', uploadDate: '2024-02-25', status: 'verified' }
    ],
    stayHistory: [
      { id: 's1', propertyId: 'proj1', propertyName: 'StaySync Tech Wing', roomNumber: '304', bedNumber: 'A', checkInDate: '2024-03-01', status: 'ongoing' }
    ],
    verificationLogs: [
      { id: 'log1', type: 'government_id', oldStatus: 'pending', newStatus: 'verified', changedBy: 'John Contractor', timestamp: '2024-03-02 10:00' }
    ]
  },
  {
    id: 'u10',
    studentId: 'ST-1002',
    name: 'Sanya Mirza',
    email: 'sanya.m@gmail.com',
    phone: '+91 90033 44552',
    roles: ['student'],
    activeRole: 'student',
    status: 'pending',
    joinedAt: '2024-05-10',
    dob: '2003-04-22',
    gender: 'Female',
    nationality: 'Indian',
    permanentAddress: 'Sector 5, Gomti Nagar, Lucknow, UP',
    currentAddress: 'StaySync Premium, Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    pincode: '560101',
    fatherName: 'Aslam Mirza',
    motherName: 'Farida Mirza',
    guardianPhone: '+91 98822 11002',
    emergencyName: 'Aslam Mirza',
    emergencyPhone: '+91 98822 11002',
    emergencyRelation: 'Father',
    assignedHostelId: 'proj1',
    assignedHostelName: 'StaySync Tech Wing',
    roomNumber: '102',
    bedNumber: 'B',
    stayStatus: 'active',
    checkInDate: '2024-05-15',
    registrationDate: '2024-05-10',
    govIdType: 'Passport',
    govIdNumber: 'XXXX-XX-592',
    govIdVerified: false,
    policeVerified: false,
    documents: [
      { id: 'doc3', name: 'Passport_Copy.pdf', type: 'id_proof', url: '#', uploadDate: '2024-05-10', status: 'pending' }
    ],
    stayHistory: [
      { id: 's2', propertyId: 'proj1', propertyName: 'StaySync Tech Wing', roomNumber: '102', bedNumber: 'B', checkInDate: '2024-05-15', status: 'ongoing' }
    ],
    verificationLogs: []
  }
];

export const getStoredStudents = (): StudentDetail[] => {
  if (typeof window === 'undefined') return MOCK_STUDENTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STUDENTS));
    return MOCK_STUDENTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return MOCK_STUDENTS;
  }
};

export const saveStudents = (students: StudentDetail[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    window.dispatchEvent(new Event('storage'));
  }
};

export const getStudentById = (id: string): StudentDetail | undefined => {
  return getStoredStudents().find(s => s.id === id || s.studentId === id);
};

export const updateStudentVerification = (
  studentId: string, 
  verificationType: 'government_id' | 'police', 
  isVerified: boolean,
  verifier: string,
  reason?: string
) => {
  const students = getStoredStudents();
  const updated = students.map(s => {
    if (s.id === studentId) {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const newLog: VerificationAuditLog = {
        id: `vlog-${Date.now()}`,
        type: verificationType,
        oldStatus: verificationType === 'government_id' ? (s.govIdVerified ? 'verified' : 'pending') : (s.policeVerified ? 'verified' : 'pending'),
        newStatus: isVerified ? 'verified' : 'pending',
        changedBy: verifier,
        timestamp,
        reason
      };

      if (verificationType === 'government_id') {
        return {
          ...s,
          govIdVerified: isVerified,
          govIdVerifiedAt: isVerified ? timestamp : undefined,
          govIdVerifiedBy: isVerified ? verifier : undefined,
          verificationLogs: [newLog, ...s.verificationLogs]
        };
      } else {
        return {
          ...s,
          policeVerified: isVerified,
          policeVerifiedAt: isVerified ? timestamp : undefined,
          policeVerifiedBy: isVerified ? verifier : undefined,
          verificationLogs: [newLog, ...s.verificationLogs]
        };
      }
    }
    return s;
  });
  saveStudents(updated);
};

export const updateStudentProfile = (id: string, updates: Partial<StudentDetail>) => {
  const students = getStoredStudents();
  const updated = students.map(s => s.id === id ? { ...s, ...updates } : s);
  saveStudents(updated);
};
