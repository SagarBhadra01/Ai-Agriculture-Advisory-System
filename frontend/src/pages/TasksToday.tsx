import React from 'react';
import { Circle, CloudRain, Sun } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_TODOS, MOCK_WEATHER } from '../utils/mockData';

export const TasksToday: React.FC = () => {
  const todayTasks = MOCK_TODOS.slice(0, 3); // Just taking first 3 as "today's" tasks

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tasks for Today</h2>
        <p className="text-gray-600">Stay on top of your farming schedule.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-blue-100">Weather Today</h3>
            <Sun className="h-6 w-6 text-yellow-300" />
          </div>
          <div className="text-4xl font-bold mb-2">{MOCK_WEATHER.temp}</div>
          <p className="text-blue-100 mb-6">{MOCK_WEATHER.forecast}</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400/30">
            <div>
              <div className="text-blue-200 text-sm mb-1">Humidity</div>
              <div className="font-semibold">{MOCK_WEATHER.humidity}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1">Rainfall</div>
              <div className="font-semibold">{MOCK_WEATHER.rainfall}</div>
            </div>
          </div>
        </Card>

        {/* Tasks List */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Priority Tasks</h3>
            <Badge variant="warning">3 Pending</Badge>
          </div>
          <div className="divide-y divide-gray-100">
            {todayTasks.map((task) => (
              <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <button className="mt-1 text-gray-300 hover:text-primary-600">
                  <Circle className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{task.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="neutral" className="text-xs">{task.category}</Badge>
                    <span className="text-xs text-gray-500">Due: Today</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 text-center">
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                View All Tasks
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="p-6 border-l-4 border-l-yellow-500">
        <div className="flex gap-4">
          <div className="p-2 bg-yellow-100 rounded-lg h-fit">
            <CloudRain className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Heavy Rain Alert</h3>
            <p className="text-gray-600 text-sm">
              Heavy rainfall is expected in your region tomorrow. Ensure proper drainage in the fields.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
