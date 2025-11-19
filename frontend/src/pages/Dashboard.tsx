import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  ScanLine, 
  ClipboardList, 
  History,
  ArrowRight,
  Sun,
  CloudRain,
  Wind
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useUser } from '@clerk/clerk-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const features = [
    {
      title: 'All Advisory',
      description: 'View your past and current crop advisories.',
      icon: History,
      path: '/advisory-history',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'My Tasks',
      description: 'Track your farming activities and to-do lists.',
      icon: ClipboardList,
      path: '/todos',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Disease Detect',
      description: 'Upload plant photos to detect diseases and get remedies.',
      icon: ScanLine,
      path: '/disease',
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Chatbot',
      description: 'Ask our AI assistant anything about farming.',
      icon: MessageSquare,
      path: '/chatbot',
      color: 'bg-teal-50 text-teal-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white shadow-xl sm:p-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Welcome back, {user?.firstName || 'Farmer'}! 🌾
            </h2>
            <p className="text-primary-100 text-lg max-w-xl">
              Here's what's happening on your farm today. The conditions are optimal for sowing wheat.
            </p>
            <button 
              onClick={() => navigate('/input')}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 transition-all"
            >
              Start New Advisory
            </button>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Weather Today</h3>
              <Sun className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-primary-100">Temperature</span>
                <span className="font-bold text-xl">28°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary-100">Humidity</span>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-300" />
                  <span className="font-bold">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary-100">Wind Speed</span>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-300" />
                  <span className="font-bold">12 km/h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card 
              key={feature.title}
              className="group cursor-pointer hover:border-primary-200 transition-all duration-300"
              onClick={() => navigate(feature.path)}
            >
              <div className="p-6 space-y-4">
                <div className={`inline-flex rounded-xl p-3 ring-4 ring-white ${feature.color} bg-opacity-20`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {feature.description}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-primary-600 group-hover:translate-x-1 transition-transform">
                  Open <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
