import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  Property,
  ListingPackage,
  PackagePurchase,
  Inquiry,
  SiteVisit,
  UserProfile,
  ApprovalStatus,
  PropertyStatus,
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_PACKAGES,
  INITIAL_PURCHASES,
  INITIAL_INQUIRIES,
  INITIAL_SITE_VISITS,
} from '../data/mockData';

const COLLECTIONS = {
  USERS: 'users',
  PROPERTIES: 'properties',
  PACKAGES: 'packages',
  PURCHASES: 'package_purchases',
  INQUIRIES: 'inquiries',
  VISITS: 'site_visits',
};

// Seed initial data to Firestore if empty
export async function seedInitialFirestoreData() {
  try {
    // 1. Packages
    const pkgSnap = await getDocs(collection(db, COLLECTIONS.PACKAGES));
    if (pkgSnap.empty) {
      for (const pkg of INITIAL_PACKAGES) {
        await setDoc(doc(db, COLLECTIONS.PACKAGES, pkg.id), {
          ...pkg,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // 2. Properties
    const propSnap = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
    if (propSnap.empty) {
      for (const prop of INITIAL_PROPERTIES) {
        await setDoc(doc(db, COLLECTIONS.PROPERTIES, prop.id), {
          ...prop,
          approvalStatus: prop.approvalStatus || 'APPROVED',
          ownerId: prop.ownerId || 'seller-demo',
          ownerName: prop.ownerName || 'Heritage Estates Puducherry',
          ownerEmail: prop.ownerEmail || 'contact@pondicherryrealty.com',
          viewsCount: prop.viewsCount || 240,
          inquiriesCount: prop.inquiriesCount || 6,
        });
      }
    }

    // 3. Purchases
    const purSnap = await getDocs(collection(db, COLLECTIONS.PURCHASES));
    if (purSnap.empty) {
      for (const pur of INITIAL_PURCHASES) {
        await setDoc(doc(db, COLLECTIONS.PURCHASES, pur.id), pur);
      }
    }

    // 4. Inquiries
    const inqSnap = await getDocs(collection(db, COLLECTIONS.INQUIRIES));
    if (inqSnap.empty) {
      for (const inq of INITIAL_INQUIRIES) {
        await setDoc(doc(db, COLLECTIONS.INQUIRIES, inq.id), {
          ...inq,
          ownerId: 'seller-demo',
        });
      }
    }

    // 5. Site Visits
    const visSnap = await getDocs(collection(db, COLLECTIONS.VISITS));
    if (visSnap.empty) {
      for (const vis of INITIAL_SITE_VISITS) {
        await setDoc(doc(db, COLLECTIONS.VISITS, vis.id), {
          ...vis,
          ownerId: 'seller-demo',
        });
      }
    }
  } catch (error) {
    console.warn('Firestore initial seeding note (using defaults):', error);
  }
}

// User Profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${COLLECTIONS.USERS}/${uid}`);
    return null;
  }
}

export async function saveUserProfile(user: UserProfile): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
      ...user,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.USERS}/${user.uid}`);
  }
}

// Properties
export async function addPropertyToFirestore(property: Property): Promise<string> {
  try {
    await setDoc(doc(db, COLLECTIONS.PROPERTIES, property.id), property);
    return property.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTIONS.PROPERTIES}/${property.id}`);
    return property.id;
  }
}

export async function updatePropertyInFirestore(id: string, updates: Partial<Property>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.PROPERTIES, id), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTIONS.PROPERTIES}/${id}`);
  }
}

export async function deletePropertyFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PROPERTIES, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.PROPERTIES}/${id}`);
  }
}

// Packages
export async function savePackageToFirestore(pkg: ListingPackage): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.PACKAGES, pkg.id), {
      ...pkg,
      createdAt: pkg.createdAt || new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.PACKAGES}/${pkg.id}`);
  }
}

export async function deletePackageFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PACKAGES, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.PACKAGES}/${id}`);
  }
}

// Purchases
export async function addPurchaseToFirestore(purchase: PackagePurchase): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.PURCHASES, purchase.id), purchase);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTIONS.PURCHASES}/${purchase.id}`);
  }
}

// Inquiries
export async function addInquiryToFirestore(inquiry: Inquiry): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.INQUIRIES, inquiry.id), inquiry);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTIONS.INQUIRIES}/${inquiry.id}`);
  }
}

export async function updateInquiryInFirestore(id: string, updates: Partial<Inquiry>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.INQUIRIES, id), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTIONS.INQUIRIES}/${id}`);
  }
}

// Visits
export async function addSiteVisitToFirestore(visit: SiteVisit): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.VISITS, visit.id), visit);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTIONS.VISITS}/${visit.id}`);
  }
}

export async function updateSiteVisitInFirestore(id: string, updates: Partial<SiteVisit>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.VISITS, id), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTIONS.VISITS}/${id}`);
  }
}
