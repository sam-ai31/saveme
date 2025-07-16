import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import InvoiceScanner from './InvoiceScanner';
import AIAdvisor from './AIAdvisor';
import PayrollSystem from './PayrollSystem';
import PricingPlans from './PricingPlans';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Calculator, BarChart3, CreditCard, Settings } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { sidebarOpen } = useAppContext();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPlaceholder = (title: string, icon: React.ReactNode, description: string) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-center max-w-md mb-4">{description}</p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Coming Soon
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <InvoiceScanner />;
      case 'advisor':
        return <AIAdvisor />;
      case 'payroll':
        return <PayrollSystem />;
      case 'email':
        return renderPlaceholder('Email Automation', <Mail className="h-8 w-8 text-white" />, 'Automate your client communications with AI-powered email sequences and reminders.');
      case 'tax':
        return renderPlaceholder('Tax Filing', <Calculator className="h-8 w-8 text-white" />, 'Streamline tax preparation and filing with automated calculations and compliance checks.');
      case 'reports':
        return renderPlaceholder('Financial Reports', <BarChart3 className="h-8 w-8 text-white" />, 'Generate comprehensive financial statements and custom reports for your clients.');
      case 'bank':
        return renderPlaceholder('Bank Connection', <CreditCard className="h-8 w-8 text-white" />, 'Securely connect to bank accounts for real-time transaction monitoring and reconciliation.');
      case 'whitelabel':
        return <PricingPlans />;
      case 'settings':
        return renderPlaceholder('Settings', <Settings className="h-8 w-8 text-white" />, 'Configure your application settings, user preferences, and system integrations.');
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default AppLayout;