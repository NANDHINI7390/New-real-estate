import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Agent,
  Inquiry,
  SiteVisit,
  Client,
  Project,
  FilterState,
  PropertyStatus,
  LeadStatus,
  VisitStatus,
  ListingType,
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_AGENTS,
  INITIAL_INQUIRIES,
  INITIAL_SITE_VISITS,
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  DEFAULT_FILTER_STATE,
  formatINR,
} from '../data/mockData';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface RealEstateContextType {
  // Navigation & View Mode
  viewMode: 'customer' | 'admin';
  setViewMode: (mode: 'customer' | 'admin') => void;
  customerPage: string;
  setCustomerPage: (page: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  navigateToProperty: (id: string) => void;

  // Data Collections
  properties: Property[];
  agents: Agent[];
  inquiries: Inquiry[];
  siteVisits: SiteVisit[];
  clients: Client[];
  projects: Project[];

  // Favorites & Comparison
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  comparisonList: string[];
  toggleComparison: (propertyId: string) => void;
  clearComparison: () => void;

  // Filter State
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  applyQuickListingType: (type: ListingType) => void;
  applyQuickPropertyType: (type: string) => void;

  // Customer Interactions
  submitInquiry: (data: {
    name: string;
    phone: string;
    email: string;
    propertyId: string;
    propertyTitle: string;
    listingType: ListingType;
    budget: string;
    preferredDate?: string;
    preferredTime?: string;
    message: string;
  }) => string;

  scheduleVisit: (data: {
    name: string;
    phone: string;
    email: string;
    propertyId: string;
    propertyTitle: string;
    propertyLocation: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => string;

  // Admin Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => string;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setPropertyStatus: (id: string, status: PropertyStatus) => void;
  updatePropertyStatus: (id: string, status: PropertyStatus) => void;
  toggleFeaturedProperty: (id: string) => void;
  updatePropertyPrice: (id: string, newPrice: number, displayPrice?: string) => void;

  updateInquiryStatus: (id: string, status: LeadStatus) => void;
  addInquiryNote: (inquiryId: string, noteText: string, author?: string) => void;
  assignInquiryAgent: (inquiryId: string, agentId: string) => void;

  updateVisitStatus: (visitId: string, status: VisitStatus) => void;
  updateSiteVisitStatus: (visitId: string, status: VisitStatus) => void;
  assignVisitAgent: (visitId: string, agentId: string) => void;

  addClientNote: (clientId: string, noteText: string) => void;
  updateClientStatus: (clientId: string, status: LeadStatus) => void;

  // Reset Demo Data
  resetAllDemoData: () => void;
  resetDemoData: () => void;

  // Toast
  toasts: Toast[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const RealEstateContext = createContext<RealEstateContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROPERTIES: 'pr_properties_v2',
  INQUIRIES: 'pr_inquiries_v2',
  VISITS: 'pr_visits_v2',
  CLIENTS: 'pr_clients_v2',
  FAVORITES: 'pr_favorites_v2',
  COMPARISON: 'pr_comparison_v2',
};

export const RealEstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [customerPage, setCustomerPage] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Core Data loaded from localStorage if present
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITS);
      return saved ? JSON.parse(saved) : INITIAL_SITE_VISITS;
    } catch {
      return INITIAL_SITE_VISITS;
    }
  });

  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [agents] = useState<Agent[]>(INITIAL_AGENTS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARISON);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist core state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(siteVisits));
  }, [siteVisits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARISON, JSON.stringify(comparisonList));
  }, [comparisonList]);

  // Toast Helper
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Nav helper
  const navigateToProperty = (id: string) => {
    setSelectedPropertyId(id);
    setCustomerPage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favorites
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(propertyId);
      const updated = isFav ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      showToast(
        isFav ? 'Removed from Saved' : 'Saved to Favorites',
        isFav ? 'Property removed from your shortlist.' : 'Property added to your shortlist for quick review.',
        'info'
      );
      return updated;
    });
  };

  // Compare
  const toggleComparison = (propertyId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(propertyId)) {
        showToast('Removed from Comparison', 'Property removed from side-by-side comparison.', 'info');
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 3) {
        showToast('Comparison Limit Reached', 'You can compare up to 3 properties at a time.', 'warning');
        return prev;
      }
      showToast('Added to Comparison', 'Compare specifications side-by-side in the Comparison tab.', 'success');
      return [...prev, propertyId];
    });
  };

  const clearComparison = () => {
    setComparisonList([]);
    showToast('Comparison Cleared', 'All properties removed from comparison matrix.', 'info');
  };

  // Filter Updates
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTER_STATE);
    showToast('Filters Cleared', 'All search criteria have been reset to defaults.', 'info');
  };

  const applyQuickListingType = (type: ListingType) => {
    setFilters((prev) => ({ ...prev, listingType: type }));
    setCustomerPage(type === 'BUY' ? 'buy' : 'rent');
  };

  const applyQuickPropertyType = (type: string) => {
    setFilters((prev) => ({ ...prev, propertyType: type }));
    setCustomerPage('properties');
  };

  // Inquiries Flow
  const submitInquiry = (data: {
    name: string;
    phone: string;
    email: string;
    propertyId: string;
    propertyTitle: string;
    listingType: ListingType;
    budget: string;
    preferredDate?: string;
    preferredTime?: string;
    message: string;
  }) => {
    const nextSeq = inquiries.length + 46;
    const refNumber = `INQ-${String(nextSeq).padStart(5, '0')}`;
    const newInquiry: Inquiry = {
      id: 'inq-' + Date.now(),
      refNumber,
      customerName: data.name,
      phone: data.phone,
      email: data.email,
      propertyId: data.propertyId,
      propertyTitle: data.propertyTitle,
      listingType: data.listingType,
      budget: data.budget || 'Market Rate',
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      assignedAgentId: 'agent-1',
      notes: [
        {
          id: 'note-' + Date.now(),
          text: `Inquiry received through Customer Portal for ${data.propertyTitle}.`,
          author: 'System Auto-Lead',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Also upsert client in CRM
    setClients((prev) => {
      const existing = prev.find((c) => c.phone === data.phone || c.email === data.email);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                interestedPropertyTitles: Array.from(new Set([...c.interestedPropertyTitles, data.propertyTitle])),
                inquiryCount: c.inquiryCount + 1,
                lastContactDate: new Date().toISOString().split('T')[0],
              }
            : c
        );
      } else {
        const newClient: Client = {
          id: 'cli-' + Date.now(),
          name: data.name,
          phone: data.phone,
          email: data.email,
          interestedPropertyTitles: [data.propertyTitle],
          budget: data.budget || 'Flexible',
          requirements: `Inquired about ${data.propertyTitle}`,
          leadStatus: 'NEW',
          inquiryCount: 1,
          visitCount: 0,
          lastContactDate: new Date().toISOString().split('T')[0],
          assignedAgent: 'Arun Kumar',
          notes: data.message,
        };
        return [newClient, ...prev];
      }
    });

    showToast(
      'Inquiry Dispatched!',
      `Reference ID: ${refNumber}. Synced directly to Admin Dashboard.`,
      'success'
    );

    return refNumber;
  };

  // Schedule Visit Flow
  const scheduleVisit = (data: {
    name: string;
    phone: string;
    email: string;
    propertyId: string;
    propertyTitle: string;
    propertyLocation: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => {
    const nextSeq = siteVisits.length + 13;
    const refNumber = `VIS-${String(nextSeq).padStart(5, '0')}`;
    const newVisit: SiteVisit = {
      id: 'vis-' + Date.now(),
      refNumber,
      customerName: data.name,
      phone: data.phone,
      email: data.email,
      propertyId: data.propertyId,
      propertyTitle: data.propertyTitle,
      propertyLocation: data.propertyLocation,
      date: data.date,
      timeSlot: data.timeSlot,
      status: 'REQUESTED',
      assignedAgentId: 'agent-1',
      notes: data.notes || 'Visit requested by client online.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSiteVisits((prev) => [newVisit, ...prev]);

    showToast(
      'Site Visit Requested!',
      `Reference ID: ${refNumber} for ${data.date} at ${data.timeSlot}. Synced to Admin Site Visits.`,
      'success'
    );

    return refNumber;
  };

  // Admin Property Actions
  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const id = 'prop-' + Date.now();
    const newProp: Property = {
      ...propertyData,
      id,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProperties((prev) => [newProp, ...prev]);
    showToast('Property Published', `"${propertyData.title}" is now live on the customer website.`, 'success');
    return id;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.price !== undefined) {
            updated.displayPrice = formatINR(updates.price) + (updated.listingType === 'RENT' ? ' / mo' : '');
            if (updated.specs.areaSqFt > 0) {
              updated.pricePerSqFt = Math.round(updates.price / updated.specs.areaSqFt);
            }
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Property Updated', 'Modifications saved and live across customer portal.', 'success');
  };

  const deleteProperty = (id: string) => {
    const item = properties.find((p) => p.id === id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast('Property Removed', `"${item?.title || 'Listing'}" has been unpublished.`, 'info');
  };

  const setPropertyStatus = (id: string, status: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, isFeatured: status === 'FEATURED' } : p))
    );
    showToast('Status Updated', `Property marked as ${status}. Immediately updated for customers.`, 'success');
  };

  const toggleFeaturedProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFeatured = !p.isFeatured;
          return {
            ...p,
            isFeatured: nextFeatured,
            status: nextFeatured ? 'FEATURED' : p.status === 'FEATURED' ? 'AVAILABLE' : p.status,
          };
        }
        return p;
      })
    );
    showToast('Featured Status Toggled', 'Homepage featured carousel updated.', 'info');
  };

  const updatePropertyPrice = (id: string, newPrice: number, displayPrice?: string) => {
    updateProperty(id, {
      price: newPrice,
      ...(displayPrice ? { displayPrice } : {}),
    });
  };

  // Lead / Inquiry Pipeline
  const updateInquiryStatus = (id: string, status: LeadStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          return {
            ...inq,
            status,
            notes: [
              ...inq.notes,
              {
                id: 'n-' + Date.now(),
                text: `Status moved to "${status}".`,
                author: 'Admin Action',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return inq;
      })
    );
    showToast('Lead Status Updated', `Pipeline moved to ${status}.`, 'success');
  };

  const addInquiryNote = (inquiryId: string, noteText: string, author: string = 'Arun Kumar') => {
    if (!noteText.trim()) return;
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            notes: [
              ...inq.notes,
              {
                id: 'n-' + Date.now(),
                text: noteText.trim(),
                author,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return inq;
      })
    );
    showToast('Note Added', 'Internal audit note logged to lead timeline.', 'info');
  };

  const assignInquiryAgent = (inquiryId: string, agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            assignedAgentId: agentId,
            notes: [
              ...inq.notes,
              {
                id: 'n-' + Date.now(),
                text: `Assigned to ${agent?.name || 'Agent'}.`,
                author: 'System',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return inq;
      })
    );
    showToast('Agent Assigned', `Lead successfully reassigned to ${agent?.name}.`, 'success');
  };

  // Visit Status
  const updateVisitStatus = (visitId: string, status: VisitStatus) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status } : v))
    );
    showToast('Site Visit Updated', `Visit status marked as ${status}.`, 'success');
  };

  const assignVisitAgent = (visitId: string, agentId: string) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, assignedAgentId: agentId } : v))
    );
    showToast('Agent Assigned', 'Site visit guide assigned.', 'info');
  };

  const addClientNote = (clientId: string, noteText: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, notes: `${c.notes}\n• ${noteText}` } : c))
    );
    showToast('CRM Updated', 'Client record updated.', 'info');
  };

  const updateClientStatus = (clientId: string, status: LeadStatus) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, leadStatus: status } : c))
    );
    showToast('Client Status Updated', `Client stage set to ${status}.`, 'success');
  };

  const resetAllDemoData = () => {
    setProperties(INITIAL_PROPERTIES);
    setInquiries(INITIAL_INQUIRIES);
    setSiteVisits(INITIAL_SITE_VISITS);
    setClients(INITIAL_CLIENTS);
    setFavorites(['prop-1']);
    setComparisonList([]);
    setFilters(DEFAULT_FILTER_STATE);
    localStorage.clear();
    showToast('Demo Data Reset', 'All properties, inquiries, and visits restored to default state.', 'info');
  };

  return (
    <RealEstateContext.Provider
      value={{
        viewMode,
        setViewMode,
        customerPage,
        setCustomerPage,
        adminTab,
        setAdminTab,
        selectedPropertyId,
        setSelectedPropertyId,
        navigateToProperty,
        properties,
        agents,
        inquiries,
        siteVisits,
        clients,
        projects,
        favorites,
        toggleFavorite,
        comparisonList,
        toggleComparison,
        clearComparison,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        applyQuickListingType,
        applyQuickPropertyType,
        submitInquiry,
        scheduleVisit,
        addProperty,
        updateProperty,
        deleteProperty,
        setPropertyStatus,
        updatePropertyStatus: setPropertyStatus,
        toggleFeaturedProperty,
        updatePropertyPrice,
        updateInquiryStatus,
        addInquiryNote,
        assignInquiryAgent,
        updateVisitStatus,
        updateSiteVisitStatus: updateVisitStatus,
        assignVisitAgent,
        addClientNote,
        updateClientStatus,
        resetAllDemoData,
        resetDemoData: resetAllDemoData,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};
