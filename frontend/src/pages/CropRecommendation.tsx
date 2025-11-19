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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Recommended Crops</h2>
        <p className="text-gray-600">Based on our analysis, these crops are best suited for your farm.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {MOCK_CROPS.map((crop) => (
          <Card
            key={crop.id}
            className={`
              relative overflow-hidden transition-all cursor-pointer
              ${selectedCrop === crop.id ? 'ring-2 ring-primary-500 shadow-md' : 'hover:shadow-md'}
            `}
            onClick={() => setSelectedCrop(crop.id)}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="h-48 sm:h-auto sm:w-48 shrink-0">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                  <Badge variant={crop.suitabilityScore > 90 ? 'success' : 'warning'}>
                    {crop.suitabilityScore}% Match
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {crop.reason}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current opacity-50" />
                    <span className="ml-1 text-xs text-gray-500">(4.5)</span>
                  </div>
                  
                  <div className={`
                    h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${selectedCrop === crop.id
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 text-transparent'
                    }
                  `}>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
        <Button
          className="w-full"
          disabled={!selectedCrop}
          onClick={handleProceed}
        >
          Generate Farming Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

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
