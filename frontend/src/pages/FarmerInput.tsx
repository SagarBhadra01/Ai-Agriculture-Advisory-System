import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Droplets, Ruler, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const FarmerInput: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    district: '',
    area: '',
    irrigation: 'Rainfed',
  });

  const districts = [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 
    'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 
    'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 
    'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 
    'South 24 Parganas', 'Uttar Dinajpur'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/predict', { state: formData });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Start New Advisory</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Select your district and farm details to get personalized recommendations.</p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          
          {/* District Selection */}
          <div className="space-y-3 sm:space-y-4">
            <label className="block text-sm font-medium text-gray-700">Select District</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white appearance-none"
                required
              >
                <option value="">-- Choose District --</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <Input
            label="Farm Area (in Acres)"
            type="number"
            step="0.1"
            placeholder="e.g. 2.5"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            icon={<Ruler className="h-5 w-5" />}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Irrigation Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {['Borewell', 'Canal', 'Rainfed', 'Drip'].map((type) => (
                <div
                  key={type}
                  onClick={() => setFormData({ ...formData, irrigation: type })}
                  className={`
                    cursor-pointer rounded-xl border p-3 sm:p-4 text-center transition-all touch-target
                    ${formData.irrigation === type
                      ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <Droplets className={`mx-auto h-5 w-5 sm:h-6 sm:w-6 mb-1.5 sm:mb-2 ${
                    formData.irrigation === type ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className="text-xs sm:text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Analyze Farm Data <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
