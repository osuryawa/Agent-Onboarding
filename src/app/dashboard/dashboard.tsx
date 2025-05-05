'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

function DashBoard() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'User';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h2>
        <p className="text-lg text-gray-600">
          Hello, <span className="font-semibold text-gray-800">{email}</span> 👋
        </p>
      </div>
    </div>
  );
}

export default DashBoard;
