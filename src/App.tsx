import React, { useState } from 'react';
import { RealEstateProvider, useRealEstate } from './context/RealEstateContext';
import { ToastContainer } from './components/common/ToastContainer';

// Customer Components
import { Navbar } from './components/customer/Navbar';
import { HeroSection } from './components/customer/HeroSection';
import { StatsSection } from './components/customer/StatsSection';
import { FeaturedProperties } from './components/customer/FeaturedProperties';
import { PropertyTypesSection } from './components/customer/PropertyTypesSection';
import { FeaturedProjects } from './components/customer/FeaturedProjects';
import { WhyChooseUs } from './components/customer/WhyChooseUs';
import { ServicesSection } from './components/customer/ServicesSection';
import { AreasWeServe } from './components/customer/AreasWeServe';
import { TestimonialsSection } from './components/customer/TestimonialsSection';
import { CTASection } from './components/customer/CTASection';
import { Footer } from './components/customer/Footer';
import { PropertiesListingView } from './components/customer/PropertiesListingView';
import { BuyView } from './components/customer/BuyView';
import { RentView } from './components/customer/RentView';
import { PropertyDetailView } from './components/customer/PropertyDetailView';
import { PropertyComparisonView } from './components/customer/PropertyComparisonView';
import { ProjectsView } from './components/customer/ProjectsView';
import { ServicesView } from './components/customer/ServicesView';
import { AboutView } from './components/customer/AboutView';
import { ContactView } from './components/customer/ContactView';
import { InquiryModal } from './components/customer/InquiryModal';
import { ScheduleVisitModal } from './components/customer/ScheduleVisitModal';

// Admin Components
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminOverviewTab } from './components/admin/AdminOverviewTab';
import { AdminPropertiesTab } from './components/admin/AdminPropertiesTab';
import { AdminInquiriesTab } from './components/admin/AdminInquiriesTab';
import { AdminVisitsTab } from './components/admin/AdminVisitsTab';
import { AdminAgentsTab } from './components/admin/AdminAgentsTab';
import { AdminClientsTab } from './components/admin/AdminClientsTab';
import { AdminAnalyticsTab } from './components/admin/AdminAnalyticsTab';
import { AdminSettingsTab } from './components/admin/AdminSettingsTab';
import { AdminApprovalsTab } from './components/admin/AdminApprovalsTab';
import { AdminPackagesTab } from './components/admin/AdminPackagesTab';
import { AdminPaymentsTab } from './components/admin/AdminPaymentsTab';
import { AdminUsersTab } from './components/admin/AdminUsersTab';
import { AddPropertyModal } from './components/admin/AddPropertyModal';

// Seller & Agent Components
import { SellerDashboard } from './components/seller/SellerDashboard';
import { AgentDashboard } from './components/agent/AgentDashboard';
import { ListPropertyFlow } from './components/seller/ListPropertyFlow';

const AppContent: React.FC = () => {
  const { viewMode, customerPage, setCustomerPage, adminTab } = useRealEstate();

  // Modals state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPropertyId, setInquiryPropertyId] = useState<string | undefined>(undefined);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [schedulePropertyId, setSchedulePropertyId] = useState<string | undefined>(undefined);

  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const [mobileAdminSidebarOpen, setMobileAdminSidebarOpen] = useState(false);

  const handleOpenInquiry = (propId?: string) => {
    setInquiryPropertyId(propId);
    setInquiryModalOpen(true);
  };

  const handleOpenSchedule = (propId?: string) => {
    setSchedulePropertyId(propId);
    setScheduleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#20252B] font-sans flex flex-col selection:bg-[#102A43] selection:text-white">
      {/* 1. BUYER / CUSTOMER VIEW */}
      {viewMode === 'customer' && (
        <div className="flex-1 flex flex-col">
          <Navbar
            onOpenScheduleModal={() => handleOpenSchedule()}
            onOpenInquiryModal={() => handleOpenInquiry()}
          />

          <main className="flex-1">
            {customerPage === 'home' && (
              <>
                <HeroSection
                  onOpenScheduleModal={() => handleOpenSchedule()}
                  onOpenInquiryModal={() => handleOpenInquiry()}
                />
                <StatsSection />
                <FeaturedProperties />
                <PropertyTypesSection />
                <FeaturedProjects />
                <WhyChooseUs />
                <ServicesSection />
                <AreasWeServe />
                <TestimonialsSection />
                <CTASection
                  onOpenScheduleModal={() => handleOpenSchedule()}
                  onOpenInquiryModal={() => handleOpenInquiry()}
                />
              </>
            )}

            {customerPage === 'buy' && <BuyView />}

            {customerPage === 'rent' && <RentView />}

            {customerPage === 'properties' && <PropertiesListingView />}

            {customerPage === 'property-detail' && (
              <PropertyDetailView
                onOpenScheduleModal={(id) => handleOpenSchedule(id)}
                onOpenInquiryModal={(id) => handleOpenInquiry(id)}
              />
            )}

            {customerPage === 'compare' && (
              <PropertyComparisonView
                onOpenScheduleModal={(id) => handleOpenSchedule(id)}
              />
            )}

            {customerPage === 'projects' && (
              <ProjectsView
                onOpenInquiryModal={(id) => handleOpenInquiry(id)}
              />
            )}

            {customerPage === 'services' && (
              <ServicesView
                onOpenInquiryModal={() => handleOpenInquiry()}
              />
            )}

            {customerPage === 'list-property' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <ListPropertyFlow
                  onCancel={() => {
                    setCustomerPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSuccess={() => {
                    setCustomerPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {customerPage === 'about' && <AboutView />}

            {customerPage === 'contact' && <ContactView />}

            {customerPage === 'about-contact' && <AboutView />}
          </main>

          <Footer />
        </div>
      )}

      {/* 2. PROPERTY OWNER / SELLER DASHBOARD */}
      {viewMode === 'seller' && (
        <SellerDashboard />
      )}

      {/* 3. REAL ESTATE AGENT / BROKER PORTAL */}
      {viewMode === 'agent' && (
        <AgentDashboard />
      )}

      {/* 4. ADMIN & MODERATION DASHBOARD */}
      {viewMode === 'admin' && (
        <div className="flex-1 flex min-h-screen bg-[#F7F5F0]">
          <AdminSidebar
            mobileOpen={mobileAdminSidebarOpen}
            onCloseMobile={() => setMobileAdminSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col min-w-0 bg-[#F7F5F0] w-full">
            <AdminHeader
              onOpenAddPropertyModal={() => setAddPropertyModalOpen(true)}
              onToggleMobileSidebar={() => setMobileAdminSidebarOpen((prev) => !prev)}
            />

            <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8">
              {adminTab === 'overview' && (
                <AdminOverviewTab
                  onOpenAddPropertyModal={() => setAddPropertyModalOpen(true)}
                />
              )}
              {adminTab === 'approvals' && <AdminApprovalsTab />}
              {adminTab === 'properties' && (
                <AdminPropertiesTab
                  onOpenAddPropertyModal={() => setAddPropertyModalOpen(true)}
                />
              )}
              {adminTab === 'packages' && <AdminPackagesTab />}
              {adminTab === 'payments' && <AdminPaymentsTab />}
              {adminTab === 'users' && <AdminUsersTab />}
              {adminTab === 'inquiries' && <AdminInquiriesTab />}
              {adminTab === 'visits' && <AdminVisitsTab />}
              {adminTab === 'agents' && <AdminAgentsTab />}
              {adminTab === 'clients' && <AdminClientsTab />}
              {adminTab === 'analytics' && <AdminAnalyticsTab />}
              {adminTab === 'settings' && <AdminSettingsTab />}
            </main>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialPropertyId={inquiryPropertyId}
      />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        initialPropertyId={schedulePropertyId}
      />

      <AddPropertyModal
        isOpen={addPropertyModalOpen}
        onClose={() => setAddPropertyModalOpen(false)}
      />

      {/* Global Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <RealEstateProvider>
      <AppContent />
    </RealEstateProvider>
  );
}
