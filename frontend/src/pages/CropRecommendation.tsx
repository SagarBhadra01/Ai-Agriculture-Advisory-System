import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_CROPS } from '../utils/mockData';

export const CropRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const handleProceed = () => {
    if (selectedCrop) {
      navigate('/todos');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-0 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recommended Crops</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Based on our analysis, these crops are best suited for your farm.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {MOCK_CROPS.map((crop) => (
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
                  <Badge variant={crop.suitabilityScore > 90 ? 'success' : 'warning'} size="md">
                    {crop.suitabilityScore}% Match
                  </Badge>
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
