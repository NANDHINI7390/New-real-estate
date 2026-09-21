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
  ApprovalStatus,
  LeadStatus,
  VisitStatus,
  ListingType,
  UserRole,
  UserProfile,
  ListingPackage,
  PackagePurchase,
  SellerTab,
  AgentTab,
  AdminTab,
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_AGENTS,
  INITIAL_INQUIRIES,
  INITIAL_SITE_VISITS,
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  INITIAL_PACKAGES,
  INITIAL_PURCHASES,
  DEMO_USERS,
  DEFAULT_FILTER_STATE,
  formatINR,
} from '../data/mockData';
import { auth, db, signInWithGoogle, signOutUser, testFirestoreConnection } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  seedInitialFirestoreData,
  saveUserProfile,
  getUserProfile,
  addPropertyToFirestore,
  updatePropertyInFirestore,
  deletePropertyFromFirestore,
  savePackageToFirestore,
  deletePackageFromFirestore,
  addPurchaseToFirestore,
  addInquiryToFirestore,
  updateInquiryInFirestore,
  addSiteVisitToFirestore,
  updateSiteVisitInFirestore,
} from '../services/marketplaceService';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export type ViewMode = 'customer' | 'seller' | 'agent' | 'admin';

interface RealEstateContextType {
  // Navigation & View Mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  customerPage: string;
  setCustomerPage: (page: string) => void;
  sellerTab: SellerTab;
  setSellerTab: (tab: SellerTab) => void;
  agentTab: AgentTab;
  setAgentTab: (tab: AgentTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  navigateToProperty: (id: string) => void;

  // User Profile & Authentication
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  switchDemoRole: (role: UserRole) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;

  // Data Collections
  properties: Property[];
  packages: ListingPackage[];
  purchases: PackagePurchase[];
  agents: Agent[];
  inquiries: Inquiry[];
  siteVisits: SiteVisit[];
  clients: Client[];
  projects: Project[];

  // Marketplace & Package Flows
  submitListing: (propertyData: Partial<Property>, packageId?: string) => Promise<string>;
  purchasePackage: (packageId: string, propertyTitle?: string) => Promise<PackagePurchase>;
  upgradePropertyListing: (propertyId: string, targetPackageId: string) => Promise<void>;
  renewPropertyListing: (propertyId: string) => Promise<void>;

  // Admin Approval & Moderation Actions
  approveProperty: (propertyId: string) => Promise<void>;
  rejectProperty: (propertyId: string, reason: string) => Promise<void>;
  requestPropertyChanges: (propertyId: string, notes: string) => Promise<void>;
  suspendProperty: (propertyId: string) => Promise<void>;
  markPropertySold: (propertyId: string) => Promise<void>;
  markPropertyRented: (propertyId: string) => Promise<void>;

  // Admin Package Config
  savePackage: (pkg: ListingPackage) => Promise<void>;
  deletePackage: (packageId: string) => Promise<void>;

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

export const RealEstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [viewMode, setViewMode] = useState<ViewMode>('customer');
  const [customerPage, setCustomerPage] = useState<string>('home');
  const [sellerTab, setSellerTab] = useState<SellerTab>('properties');
  const [agentTab, setAgentTab] = useState<AgentTab>('properties');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Authentication & Current User
  // Default to demo seller or loaded user
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('pr_auth_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[1]; // Venkatesh Raman (Seller)
    } catch {
      return DEMO_USERS[1];
    }
  });

  // Core Data loaded from Firestore with fallback to rich seed
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [packages, setPackages] = useState<ListingPackage[]>(INITIAL_PACKAGES);
  const [purchases, setPurchases] = useState<PackagePurchase[]>(INITIAL_PURCHASES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(INITIAL_SITE_VISITS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [agents] = useState<Agent[]>(INITIAL_AGENTS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  const [favorites, setFavorites] = useState<string[]>(['prop-1']);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Initialize Firestore listeners & verify connection
  useEffect(() => {
    testFirestoreConnection();
    seedInitialFirestoreData();

    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const profile = await getUserProfile(fbUser.uid);
        if (profile) {
          setCurrentUser(profile);
          localStorage.setItem('pr_auth_user', JSON.stringify(profile));
        } else {
          const isBootstrappedAdmin = fbUser.email === 'nandygavas@gmail.com';
          const newProfile: UserProfile = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Marketplace Member',
            role: isBootstrappedAdmin ? 'admin' : 'seller',
            photoURL: fbUser.photoURL || undefined,
            createdAt: new Date().toISOString(),
          };
          await saveUserProfile(newProfile);
          setCurrentUser(newProfile);
          localStorage.setItem('pr_auth_user', JSON.stringify(newProfile));
        }
      }
    });

    // Real-time Firestore Listeners
    const unsubProps = onSnapshot(collection(db, 'properties'), (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as Property);
        setProperties(list);
      }
    }, (err) => console.warn('Firestore properties snapshot note:', err.message));

    const unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as ListingPackage);
        setPackages(list);
      }
    }, (err) => console.warn('Firestore packages snapshot note:', err.message));

    const unsubPurchases = onSnapshot(collection(db, 'package_purchases'), (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as PackagePurchase);
        setPurchases(list);
      }
    }, (err) => console.warn('Firestore purchases snapshot note:', err.message));

    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as Inquiry);
        setInquiries(list);
      }
    }, (err) => console.warn('Firestore inquiries snapshot note:', err.message));

    const unsubVisits = onSnapshot(collection(db, 'site_visits'), (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as SiteVisit);
        setSiteVisits(list);
      }
    }, (err) => console.warn('Firestore visits snapshot note:', err.message));

    return () => {
      unsubscribeAuth();
      unsubProps();
      unsubPackages();
      unsubPurchases();
      unsubInquiries();
      unsubVisits();
    };
  }, []);

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

  // Switch demo roles seamlessly (Buyer, Seller, Agent, Admin)
  const switchDemoRole = (role: UserRole) => {
    const matched = DEMO_USERS.find((u) => u.role === role) || {
      uid: `demo-${role}`,
      email: `${role}@pondicherryrealty.com`,
      displayName: role.toUpperCase() + ' User',
      role,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(matched);
    localStorage.setItem('pr_auth_user', JSON.stringify(matched));

    if (role === 'admin') {
      setViewMode('admin');
      setAdminTab('overview');
    } else if (role === 'seller') {
      setViewMode('seller');
      setSellerTab('properties');
    } else if (role === 'agent') {
      setViewMode('agent');
      setAgentTab('properties');
    } else {
      setViewMode('customer');
      setCustomerPage('home');
    }

    showToast(
      'Role Switched',
      `Active role set to ${role.toUpperCase()} (${matched.displayName}). Navigation updated.`,
      'info'
    );
  };

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      showToast('Logged In', `Welcome back, ${user.displayName || 'Member'}!`, 'success');
    } catch (error) {
      showToast('Sign-In Notice', 'You can also switch roles anytime using the Demo Role switcher in the top bar.', 'info');
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
    } catch {}
    // Reset to demo buyer
    const defaultBuyer = DEMO_USERS[0];
    setCurrentUser(defaultBuyer);
    localStorage.setItem('pr_auth_user', JSON.stringify(defaultBuyer));
    setViewMode('customer');
    setCustomerPage('home');
    showToast('Signed Out', 'You are now browsing as a Guest Buyer.', 'info');
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);
    localStorage.setItem('pr_auth_user', JSON.stringify(updated));
    await saveUserProfile(updated);
    showToast('Profile Saved', 'Your account details have been updated.', 'success');
  };

  // Nav helper
  const navigateToProperty = (id: string) => {
    setSelectedPropertyId(id);
    setViewMode('customer');
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
    setViewMode('customer');
    setCustomerPage(type === 'BUY' ? 'buy' : 'rent');
  };

  const applyQuickPropertyType = (type: string) => {
    setFilters((prev) => ({ ...prev, propertyType: type }));
    setViewMode('customer');
    setCustomerPage('properties');
  };

  // --- MARKETPLACE LISTING SUBMISSION FLOW ---
  const submitListing = async (
    propertyData: Partial<Property>,
    packageId: string = 'pkg-basic'
  ): Promise<string> => {
    const selectedPkg = packages.find((p) => p.id === packageId) || packages[0];
    const id = 'prop-' + Date.now();
    const cleanTitle = propertyData.title || 'Untitled Coastal Property';
    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const rawPrice = propertyData.price || 5000000;
    const isRent = propertyData.listingType === 'RENT';

    const newProperty: Property = {
      id,
      title: cleanTitle,
      slug,
      tagline: propertyData.tagline || 'Exclusive verified property in Puducherry',
      location: propertyData.location || 'Pondicherry, India',
      subLocation: propertyData.subLocation || propertyData.location || 'Pondicherry',
      locality: propertyData.locality || 'Central Puducherry',
      price: rawPrice,
      displayPrice: formatINR(rawPrice) + (isRent ? ' / mo' : ''),
      priceNegotiable: propertyData.priceNegotiable ?? true,
      pricePerSqFt: propertyData.pricePerSqFt || Math.round(rawPrice / (propertyData.specs?.areaSqFt || 1200)),
      propertyType: propertyData.propertyType || 'Villa',
      listingType: propertyData.listingType || 'BUY',
      status: 'PENDING',
      approvalStatus: 'PENDING_APPROVAL',
      isFeatured: selectedPkg?.isFeaturedPlacement || false,
      isPremium: selectedPkg?.isPremiumPlacement || false,
      isNew: true,
      heroImage:
        propertyData.heroImage ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      gallery: propertyData.gallery && propertyData.gallery.length > 0
        ? propertyData.gallery
        : [
            propertyData.heroImage ||
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
          ],
      videoUrl: propertyData.videoUrl || '',
      specs: {
        bedrooms: propertyData.specs?.bedrooms || 3,
        bathrooms: propertyData.specs?.bathrooms || 3,
        areaSqFt: propertyData.specs?.areaSqFt || 1800,
        furnishing: propertyData.specs?.furnishing || 'Semi-Furnished',
        facing: propertyData.specs?.facing || 'East',
        floor: propertyData.specs?.floor || 'G+1',
        totalFloors: propertyData.specs?.totalFloors || '2 Floors',
        carParking: propertyData.specs?.carParking || 1,
        possession: propertyData.specs?.possession || 'Ready to Move',
        ageOfProperty: propertyData.specs?.ageOfProperty || 'New',
        ownership: propertyData.specs?.ownership || 'Freehold',
      },
      description:
        propertyData.description ||
        'Prime residential and investment opportunity in Puducherry. Clean legal title documents and prime connectivity.',
      highlights: propertyData.highlights || [
        'DTCP Approved & Clear Title',
        'Direct road access with high-appreciation locality',
        'Abundant sweet water and 3-phase EB connection',
      ],
      amenities: propertyData.amenities || ['24/7 Security', 'Power Backup', 'Car Parking'],
      nearbyFacilities: propertyData.nearbyFacilities || [
        { name: 'Promenade Beach', distance: '10 Mins', category: 'Beach' },
        { name: 'ECR Highway', distance: '5 Mins', category: 'Transit' },
      ],
      ownerId: currentUser?.uid || 'seller-demo',
      ownerName: currentUser?.displayName || 'Owner',
      ownerEmail: currentUser?.email || 'owner@example.com',
      ownerPhone: currentUser?.phone || '+91 98765 00000',
      agentId: currentUser?.role === 'agent' ? currentUser.uid : 'agent-1',
      listingPackageId: selectedPkg?.id || 'pkg-basic',
      viewsCount: 1,
      inquiriesCount: 0,
      mapCoordinates: propertyData.mapCoordinates || { lat: 11.9338, lng: 79.8297 },
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Save locally and persist to Firestore
    setProperties((prev) => [newProperty, ...prev]);
    await addPropertyToFirestore(newProperty);

    showToast(
      'Listing Submitted for Approval!',
      `"${newProperty.title}" is currently pending verification. Admin review is in progress.`,
      'success'
    );

    return id;
  };

  // --- PACKAGE PURCHASES & MONETIZATION ---
  const purchasePackage = async (
    packageId: string,
    propertyTitle?: string
  ): Promise<PackagePurchase> => {
    const pkg = packages.find((p) => p.id === packageId) || packages[0];
    const purchaseId = 'pur-' + Date.now();
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + (pkg?.durationDays || 30));

    const newPurchase: PackagePurchase = {
      id: purchaseId,
      userId: currentUser?.uid || 'seller-demo',
      userName: currentUser?.displayName || 'Member',
      userEmail: currentUser?.email || 'user@example.com',
      userRole: currentUser?.role || 'seller',
      packageId: pkg.id,
      packageName: pkg.name,
      amount: pkg.price,
      durationDays: pkg.durationDays,
      status: 'ACTIVE',
      paymentMethod: 'UPI / Card Gateway',
      transactionRef: 'TXN-PND-' + Math.floor(10000 + Math.random() * 90000),
      propertyTitle: propertyTitle || 'Account Package Plan',
      createdAt: now.toISOString().split('T')[0],
      expiresAt: expires.toISOString().split('T')[0],
    };

    setPurchases((prev) => [newPurchase, ...prev]);
    await addPurchaseToFirestore(newPurchase);

    // Update user active package
    if (currentUser) {
      await updateUserProfile({
        activePackageId: pkg.id,
        packageExpiresAt: expires.toISOString().split('T')[0],
      });
    }

    showToast(
      'Package Activated!',
      `Successfully purchased "${pkg.name}" for ₹${pkg.price.toLocaleString('en-IN')}. Receipt ID: ${newPurchase.transactionRef}.`,
      'success'
    );

    return newPurchase;
  };

  const upgradePropertyListing = async (propertyId: string, targetPackageId: string) => {
    const pkg = packages.find((p) => p.id === targetPackageId);
    if (!pkg) return;

    // Record purchase
    const prop = properties.find((p) => p.id === propertyId);
    await purchasePackage(targetPackageId, prop?.title);

    // Update property with features
    const updates: Partial<Property> = {
      listingPackageId: targetPackageId,
      isFeatured: pkg.isFeaturedPlacement,
      isPremium: pkg.isPremiumPlacement,
      status: pkg.isFeaturedPlacement ? 'FEATURED' : 'AVAILABLE',
    };

    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);

    showToast(
      'Listing Upgraded!',
      `"${prop?.title}" upgraded to ${pkg.name}. Placement boost active immediately.`,
      'success'
    );
  };

  const renewPropertyListing = async (propertyId: string) => {
    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) return;

    const updates: Partial<Property> = {
      status: 'AVAILABLE',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);

    showToast('Listing Renewed', `"${prop.title}" renewal cycle extended.`, 'success');
  };

  // --- ADMIN APPROVAL & MODERATION ---
  const approveProperty = async (propertyId: string) => {
    const updates: Partial<Property> = {
      approvalStatus: 'APPROVED',
      status: 'AVAILABLE',
      rejectionReason: '',
    };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Listing Approved!', 'Property is now LIVE on the public marketplace.', 'success');
  };

  const rejectProperty = async (propertyId: string, reason: string) => {
    const updates: Partial<Property> = {
      approvalStatus: 'REJECTED',
      status: 'INACTIVE',
      rejectionReason: reason || 'Listing does not comply with verification criteria.',
    };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Listing Rejected', 'Rejection feedback dispatched to listing owner.', 'info');
  };

  const requestPropertyChanges = async (propertyId: string, notes: string) => {
    const updates: Partial<Property> = {
      approvalStatus: 'CHANGES_REQUESTED',
      rejectionReason: notes || 'Please update property photographs and clear ownership details.',
    };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Changes Requested', 'Seller notified to edit and resubmit their listing.', 'info');
  };

  const suspendProperty = async (propertyId: string) => {
    const updates: Partial<Property> = { status: 'INACTIVE' };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Listing Suspended', 'Property hidden from marketplace search.', 'warning');
  };

  const markPropertySold = async (propertyId: string) => {
    const updates: Partial<Property> = { status: 'SOLD' };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Marked as Sold', 'Listing status updated to SOLD.', 'success');
  };

  const markPropertyRented = async (propertyId: string) => {
    const updates: Partial<Property> = { status: 'RENTED' };
    setProperties((prev) => prev.map((p) => (p.id === propertyId ? { ...p, ...updates } : p)));
    await updatePropertyInFirestore(propertyId, updates);
    showToast('Marked as Rented', 'Listing status updated to RENTED.', 'success');
  };

  // --- ADMIN PACKAGE CONFIGURATION ---
  const savePackage = async (pkg: ListingPackage) => {
    setPackages((prev) => {
      const idx = prev.findIndex((p) => p.id === pkg.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = pkg;
        return next;
      }
      return [...prev, pkg];
    });
    await savePackageToFirestore(pkg);
    showToast('Package Saved', `Package "${pkg.name}" pricing & features updated in Firestore.`, 'success');
  };

  const deletePackage = async (packageId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== packageId));
    await deletePackageFromFirestore(packageId);
    showToast('Package Deleted', 'Listing package removed from marketplace catalog.', 'info');
  };

  // Customer Inquiries Flow
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
    const prop = properties.find((p) => p.id === data.propertyId);

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
      assignedAgentId: prop?.agentId || 'agent-1',
      ownerId: prop?.ownerId || 'seller-demo',
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
    addInquiryToFirestore(newInquiry);

    // Also update CRM client
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
      `Reference ID: ${refNumber}. Synced directly to Owner & Agent Dashboards.`,
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
    const prop = properties.find((p) => p.id === data.propertyId);

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
      assignedAgentId: prop?.agentId || 'agent-1',
      ownerId: prop?.ownerId || 'seller-demo',
      notes: data.notes || 'Visit requested by client online.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSiteVisits((prev) => [newVisit, ...prev]);
    addSiteVisitToFirestore(newVisit);

    showToast(
      'Site Visit Requested!',
      `Reference ID: ${refNumber} for ${data.date} at ${data.timeSlot}. Synced to Owner & Agent Site Visits.`,
      'success'
    );

    return refNumber;
  };

  // Property Actions
  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const id = 'prop-' + Date.now();
    const newProp: Property = {
      ...propertyData,
      id,
      approvalStatus: 'APPROVED',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProperties((prev) => [newProp, ...prev]);
    addPropertyToFirestore(newProp);
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
    updatePropertyInFirestore(id, updates);
    showToast('Property Updated', 'Modifications saved and synced to database.', 'success');
  };

  const deleteProperty = (id: string) => {
    const item = properties.find((p) => p.id === id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
    deletePropertyFromFirestore(id);
    showToast('Property Removed', `"${item?.title || 'Listing'}" deleted.`, 'info');
  };

  const setPropertyStatus = (id: string, status: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, isFeatured: status === 'FEATURED' } : p))
    );
    updatePropertyInFirestore(id, { status, isFeatured: status === 'FEATURED' });
    showToast('Status Updated', `Property marked as ${status}.`, 'success');
  };

  const toggleFeaturedProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFeatured = !p.isFeatured;
          const nextStatus = nextFeatured ? 'FEATURED' : p.status === 'FEATURED' ? 'AVAILABLE' : p.status;
          updatePropertyInFirestore(id, { isFeatured: nextFeatured, status: nextStatus });
          return {
            ...p,
            isFeatured: nextFeatured,
            status: nextStatus,
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

  // Inquiries
  const updateInquiryStatus = (id: string, status: LeadStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const updated = {
            ...inq,
            status,
            notes: [
              ...inq.notes,
              {
                id: 'n-' + Date.now(),
                text: `Status moved to "${status}".`,
                author: currentUser?.displayName || 'Action',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
          updateInquiryInFirestore(id, { status });
          return updated;
        }
        return inq;
      })
    );
    showToast('Lead Status Updated', `Pipeline moved to ${status}.`, 'success');
  };

  const addInquiryNote = (inquiryId: string, noteText: string, author: string = 'Consultant') => {
    if (!noteText.trim()) return;
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          const updated = {
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
          updateInquiryInFirestore(inquiryId, { notes: updated.notes });
          return updated;
        }
        return inq;
      })
    );
    showToast('Note Added', 'Note logged to inquiry timeline.', 'info');
  };

  const assignInquiryAgent = (inquiryId: string, agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          const updated = {
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
          updateInquiryInFirestore(inquiryId, { assignedAgentId: agentId, notes: updated.notes });
          return updated;
        }
        return inq;
      })
    );
    showToast('Agent Assigned', `Lead successfully reassigned to ${agent?.name}.`, 'success');
  };

  // Visits
  const updateVisitStatus = (visitId: string, status: VisitStatus) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status } : v))
    );
    updateSiteVisitInFirestore(visitId, { status });
    showToast('Site Visit Updated', `Visit status marked as ${status}.`, 'success');
  };

  const assignVisitAgent = (visitId: string, agentId: string) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, assignedAgentId: agentId } : v))
    );
    updateSiteVisitInFirestore(visitId, { assignedAgentId: agentId });
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
    setPackages(INITIAL_PACKAGES);
    setPurchases(INITIAL_PURCHASES);
    setInquiries(INITIAL_INQUIRIES);
    setSiteVisits(INITIAL_SITE_VISITS);
    setClients(INITIAL_CLIENTS);
    setFavorites(['prop-1']);
    setComparisonList([]);
    setFilters(DEFAULT_FILTER_STATE);
    showToast('Data Restored', 'Marketplace restored to default initial catalog.', 'info');
  };

  return (
    <RealEstateContext.Provider
      value={{
        viewMode,
        setViewMode,
        customerPage,
        setCustomerPage,
        sellerTab,
        setSellerTab,
        agentTab,
        setAgentTab,
        adminTab,
        setAdminTab,
        selectedPropertyId,
        setSelectedPropertyId,
        navigateToProperty,
        currentUser,
        setCurrentUser,
        switchDemoRole,
        loginWithGoogle,
        logout,
        updateUserProfile,
        properties,
        packages,
        purchases,
        agents,
        inquiries,
        siteVisits,
        clients,
        projects,
        submitListing,
        purchasePackage,
        upgradePropertyListing,
        renewPropertyListing,
        approveProperty,
        rejectProperty,
        requestPropertyChanges,
        suspendProperty,
        markPropertySold,
        markPropertyRented,
        savePackage,
        deletePackage,
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
