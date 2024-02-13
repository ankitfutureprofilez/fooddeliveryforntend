import React from 'react';

export default function LoadingPage() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-200">
      <div className="w-14 h-14 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-solid border-blue-600 border-opacity-25 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-solid border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
