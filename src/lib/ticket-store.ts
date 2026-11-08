'use client';
import { Ticket, TicketMessage } from './types';
import { mockTickets } from './mock-data';

const STORAGE_KEY = 'hostelhub_tickets_v2';

export const getStoredTickets = (): Ticket[] => {
  if (typeof window === 'undefined') return mockTickets;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTickets));
    return mockTickets;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockTickets;
  }
};

export const saveTickets = (tickets: Ticket[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    window.dispatchEvent(new Event('storage')); // Notify other tabs/components
  }
};

export const addTicket = (ticketData: Omit<Ticket, 'id' | 'date' | 'status' | 'messages'>) => {
  const tickets = getStoredTickets();
  const newTicket: Ticket = {
    ...ticketData,
    id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'new',
    messages: [
      {
        id: `msg-initial-${Date.now()}`,
        senderRole: 'student',
        text: ticketData.description,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      }
    ]
  };
  const updated = [newTicket, ...tickets];
  saveTickets(updated);
  return newTicket;
};

export const updateTicketStatus = (id: string, status: Ticket['status']) => {
  const tickets = getStoredTickets();
  const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
  saveTickets(updated);
};

export const addMessageToTicket = (ticketId: string, message: Omit<TicketMessage, 'id' | 'timestamp'>) => {
  const tickets = getStoredTickets();
  const updated = tickets.map(t => {
    if (t.id === ticketId) {
      const newMessage: TicketMessage = {
        id: `msg-${Date.now()}`,
        ...message,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      return { ...t, messages: [...t.messages, newMessage] };
    }
    return t;
  });
  saveTickets(updated);
};
