
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

import { Dashboard } from './pages/Dashboard';
import { FarmerInput } from './pages/FarmerInput';
import { SystemPredicts } from './pages/SystemPredicts';
import { CropRecommendation } from './pages/CropRecommendation';
import { ToDoList } from './pages/ToDoList';
import { Chatbot } from './pages/Chatbot';
import { Schemes } from './pages/Schemes';
import { DiseaseDetect } from './pages/DiseaseDetect';
import { MarketPrices } from './pages/MarketPrices';
import { TasksToday } from './pages/TasksToday';



import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <SignIn routing="path" path="/login" signUpUrl="/signup" />
          </div>
        } />
        <Route path="/signup" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <SignUp routing="path" path="/signup" signInUrl="/login" />
          </div>
        } />
        
        <Route path="/" element={
          <>
            <SignedIn>
              <MainLayout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="input" element={<FarmerInput />} />
          <Route path="predict" element={<SystemPredicts />} />
          <Route path="recommendations" element={<CropRecommendation />} />
          <Route path="todos" element={<ToDoList />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="disease" element={<DiseaseDetect />} />
          <Route path="market" element={<MarketPrices />} />
          <Route path="daily-tasks" element={<TasksToday />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
