import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import api from '../services/api';
import type { Crop } from '../types';

export const CropRecommendation: React.FC = () => {
  const navigate = useNavigate();
  // Retrieve passed state (district)
  const location = useLocation();
  const district = location.state?.district;

  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        // Pass district as query param if available
        const response = await api.get('/crops', { 
          params: { district: district } 
        });

        // Backend now returns enriched data if district matched
        const mappedData = response.data.map((crop: any) => ({
          ...crop,
          suitabilityScore: crop.suitabilityScore || 85, 
          reason: crop.reason || 'General recommendation based on season.',
          imageUrl: crop.imageUrl || 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
        }));
        setCrops(mappedData);
      } catch (error) {
        console.error('Failed to fetch crops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [district]);

  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  const handleProceed = async () => {
    if (selectedCrop) {
      setIsSaving(true);
      try {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        
        if (userEmail) {
           await api.post('/advisories', {
             cropId: selectedCrop,
             location: district || 'Unknown',
             stage: 'Preparation',
             status: 'active',
             message: 'New advisory generated based on your district selection.',
             userEmail
           });
        }
        navigate('/todos');
      } catch (error) {
        console.error('Failed to create advisory:', error);
        // Navigate anyway for UX
        navigate('/todos');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading recommendations...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-0 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recommended Crops</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Based on our analysis, these crops are best suited for your farm.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {crops.map((crop) => (
          <Card
            key={crop.id}
            className={`
              relative overflow-hidden transition-all cursor-pointer
              ${selectedCrop === crop.id ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'}
            `}
            onClick={() => setSelectedCrop(crop.id)}
            padding="none"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="h-48 sm:h-auto sm:w-48 lg:w-56 shrink-0 relative">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">{crop.name}</h3>
                  <Badge variant={(crop.suitabilityScore || 0) > 90 ? 'success' : 'warning'} size="md">
                    {crop.suitabilityScore || 0}% Match
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {crop.cropType && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                      {crop.cropType}
                    </span>
                  )}
                  {crop.durationDays && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                      {crop.durationDays} Days
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 flex-1">
                  {crop.reason}
                </p>

                <div className="flex items-center justify-between mt-auto gap-3">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < 4 ? 'fill-current' : 'fill-current opacity-50'}`} 
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">(4.5)</span>
                  </div>
                  
                  <div className={`
                    h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                    ${selectedCrop === crop.id
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 text-transparent'
                    }
                  `}>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden z-20 shadow-lg">
        <Button
          className="w-full"
          disabled={!selectedCrop}
          onClick={handleProceed}
        >
          Generate Farming Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Desktop button */}
      <div className="hidden sm:flex justify-end">
        <Button
          size="lg"
          disabled={!selectedCrop}
          onClick={handleProceed}
        >
          Generate Farming Plan <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
