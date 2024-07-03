import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        {children}
    </div>
  );
}
