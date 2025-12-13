import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Plus, Calendar, ChevronRight, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import api from '../services/api';

export const AdvisoryHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisories = async () => {
      if (!isLoaded) return; // Wait for Clerk to load

      try {
        const userEmail = user?.primaryEmailAddress?.emailAddress || 'demo@agriculture.com'; // Fallback for dev/demo if auth skipped
        
        const response = await api.get('/advisories', { 
          params: { userEmail } 
        });
        
        // Map backend data to frontend structure
        const mappedData = response.data.map((item: any) => ({
          id: item.id,
          date: item.date,
          crop: item.crop?.name || 'Unknown Crop',
          location: item.location,
          status: item.status,
          stage: item.stage,
        }));
        setHistory(mappedData);
      } catch (error) {
        console.error('Failed to fetch advisories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisories();
  }, [isLoaded, user]);

  if (loading) {
    return <div className="text-center py-10">Loading history...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advisory History</h1>
          <p className="text-gray-600">View your past and current crop advisories.</p>
        </div>
        <button
          onClick={() => navigate('/input')}
          className="btn bg-primary-600 text-white hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Advisory
        </button>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <Card key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.crop} Advisory</h3>
                <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant={item.status === 'active' ? 'success' : 'neutral'}>
                {item.status === 'active' ? 'Active' : 'Completed'}
              </Badge>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
