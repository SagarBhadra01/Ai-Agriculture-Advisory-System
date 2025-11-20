import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus, Search, ArrowUpDown } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_MARKET_PRICES } from '../utils/mockData';

export const MarketPrices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = MOCK_MARKET_PRICES.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      // @ts-expect-error - Dynamic key access on typed object
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      // @ts-expect-error - Dynamic key access on typed object
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Market Prices</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time mandi prices for crops near you.</p>
      </div>

      <Card padding="none" className="overflow-hidden animate-slide-up">
        <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
          <Input
            placeholder="Search crops or markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5" />}
            className="max-w-full sm:max-w-md bg-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Crop', 'Market', 'Price (₹/Qtl)', 'Trend'].map((header, index) => {
                  const key = ['crop', 'market', 'price', 'trend'][index];
                  return (
                    <th
                      key={header}
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors touch-target"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center gap-1">
                        <span className="truncate">{header}</span>
                        <ArrowUpDown className="h-3 w-3 shrink-0" />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.crop}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {item.market}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                    {item.trend === 'up' && (
                      <Badge variant="success" size="sm" className="gap-1">
                        <ArrowUp className="h-3 w-3" /> Up
                      </Badge>
                    )}
                    {item.trend === 'down' && (
                      <Badge variant="error" size="sm" className="gap-1">
                        <ArrowDown className="h-3 w-3" /> Down
                      </Badge>
                    )}
                    {item.trend === 'stable' && (
                      <Badge variant="neutral" size="sm" className="gap-1">
                        <Minus className="h-3 w-3" /> Stable
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedData.length === 0 && (
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <p className="text-sm sm:text-base">No results found for "{searchTerm}"</p>
          </div>
        )}
      </Card>
    </div>
  );
};
