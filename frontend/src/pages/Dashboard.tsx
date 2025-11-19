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
      <div className="relative overflow-hidden rounded-3xl bg-primary-900 text-white shadow-xl min-h-[400px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop" 
            alt="Farm field" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-transparent" />
        </div>
        
        <div className="relative z-10 grid gap-8 lg:grid-cols-3 lg:gap-12 p-8 sm:p-12 w-full">
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary-800/50 px-3 py-1 text-sm font-medium text-primary-100 backdrop-blur-sm border border-primary-700/50">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              Optimal Sowing Conditions
            </div>
            <h2 className="text-4xl font-bold sm:text-5xl leading-tight tracking-tight">
              Good Morning, <br/>
              <span className="text-primary-200">{user?.firstName || 'Farmer'}!</span> 🌾
            </h2>
            <p className="text-primary-100 text-lg sm:text-xl max-w-xl leading-relaxed">
              The soil moisture levels are perfect for wheat sowing today. We've analyzed your field data and have new recommendations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('/input')}
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-primary-900 shadow-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900 transition-all transform hover:scale-105"
              >
                Start New Advisory
              </button>
              <button 
                onClick={() => navigate('/todos')}
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                View Tasks
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-center">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white text-lg">Weather Today</h3>
                <Sun className="h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-primary-100">Temperature</span>
                  <span className="font-bold text-2xl">28°C</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-primary-100">Humidity</span>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-blue-300" />
                    <span className="font-bold text-lg">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-100">Wind Speed</span>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-300" />
                    <span className="font-bold text-lg">12 km/h</span>
                  </div>
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
