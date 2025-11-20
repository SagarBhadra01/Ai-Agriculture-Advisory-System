import React, { useState } from 'react';
import { Upload, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MOCK_DISEASE_RESULT } from '../utils/mockData';

export const DiseaseDetect: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof MOCK_DISEASE_RESULT | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(MOCK_DISEASE_RESULT);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Disease Detection</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Upload a photo of your crop to identify diseases and get remedies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[280px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden">
            {image ? (
              <>
                <img src={image} alt="Uploaded crop" className="w-full h-full object-cover absolute inset-0" />
                <button
                  onClick={() => { setImage(null); setResult(null); }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 touch-target"
                  aria-label="Remove image"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors p-6 touch-target">
                <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3" />
                <span className="text-sm sm:text-base font-medium text-gray-600 text-center">Click to upload image</span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 text-center">JPG, PNG up to 5MB</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
          </div>

          <Button
            className="w-full mt-4"
            disabled={!image || isAnalyzing}
            isLoading={isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? 'Analyzing...' : 'Detect Disease'}
          </Button>
        </Card>

        {result && (
          <Card padding="md" className="border-red-100 bg-red-50 animate-slide-in-right">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-red-900 break-words">{result.diseaseName}</h3>
                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                  Severity: {result.severity}
                </span>
              </div>
            </div>

            <p className="text-red-800 text-sm sm:text-base mb-4">
              {result.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base text-red-900">Recommended Actions:</h4>
              <ul className="space-y-2">
                {result.remedy.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-red-800">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0 text-red-600" />
                    <span className="flex-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
