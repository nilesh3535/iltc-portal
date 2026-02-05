import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Home, AlertCircle } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <AlertCircle size={40} className="text-blue-600" />
        </div>
        <h1 className="text-6xl text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate(-1)} variant="secondary">
            Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            <Home size={18} className="mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
