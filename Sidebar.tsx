import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  Mail, 
  Calculator, 
  BarChart3, 
  CreditCard, 
  Settings,
  Crown,
  Users
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Invoice Scanner', id: 'scanner' },
  { icon: Brain, label: 'AI Advisor', id: 'advisor' },
  { icon: Users, label: 'Payroll System', id: 'payroll' },
  { icon: Mail, label: 'Email Automation', id: 'email' },
  { icon: Calculator, label: 'Tax Filing', id: 'tax' },
  { icon: BarChart3, label: 'Financial Reports', id: 'reports' },
  { icon: CreditCard, label: 'Bank Connection', id: 'bank' },
  { icon: Crown, label: 'White Label', id: 'whitelabel' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { sidebarOpen } = useAppContext();

  return (
    <aside className={cn(
      'bg-gray-900 text-white w-64 min-h-screen transition-transform duration-300',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    )}>
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-left',
                activeTab === item.id 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;