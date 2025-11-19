import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Droplets, Ruler, ArrowRight, Navigation } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const FarmerInput: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    pincode: '',
    area: '',
    irrigation: 'Rainfed',
  });

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
              pincode: '560001'
            }));
            setIsLoading(false);
          }, 1000);
        },
        (error) => {
          console.error(error);
          setIsLoading(false);
          alert('Unable to retrieve your location');
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/predict');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Start New Advisory</h2>
        <p className="text-gray-600">Enter your farm details to get personalized recommendations.</p>
      </div>

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Location Details</label>
            <div className="flex gap-4">
              <Input
                placeholder="Enter Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="flex-1"
                required
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleLocateMe}
                disabled={isLoading}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Locate Me
              </Button>
            </div>
            {formData.location && (
              <p className="text-sm text-green-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Location detected: {formData.location}
              </p>
            )}
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Irrigation Type
            </label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {['Borewell', 'Canal', 'Rainfed', 'Drip'].map((type) => (
                <div
                  key={type}
                  onClick={() => setFormData({ ...formData, irrigation: type })}
                  className={`
                    cursor-pointer rounded-xl border p-4 text-center transition-all
                    ${formData.irrigation === type
                      ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <Droplets className={`mx-auto h-6 w-6 mb-2 ${
                    formData.irrigation === type ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
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
