import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Sprout, 
  ClipboardList, 
  MessageSquare, 
  BookOpen, 
  ScanLine, 
  TrendingUp, 
  CalendarCheck,
  X
} from 'lucide-react';
import { cn } from '../../utils/helpers';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Start Advisory', href: '/input', icon: MapPin },
  { name: 'Crop Recommendations', href: '/recommendations', icon: Sprout },
  { name: 'My Tasks', href: '/todos', icon: ClipboardList },
  { name: 'Chatbot', href: '/chatbot', icon: MessageSquare },
  { name: 'Schemes', href: '/schemes', icon: BookOpen },
  { name: 'Disease Detect', href: '/disease', icon: ScanLine },
  { name: 'Market Prices', href: '/market', icon: TrendingUp },
  { name: 'Daily Tasks', href: '/daily-tasks', icon: CalendarCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white px-6 pb-4 overflow-y-auto border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:w-72 lg:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between lg:justify-center">
          <div className="flex items-center gap-2 font-bold text-xl text-primary-700">
            <Sprout className="h-8 w-8" />
            <span>AgriAdvisor</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-1 flex-col mt-4">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      onClick={() => onClose()} // Close sidebar on mobile click
                      className={({ isActive }) => cn(
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
