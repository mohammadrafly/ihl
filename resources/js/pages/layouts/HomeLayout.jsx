import React from 'react';

export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen bg-white pb-16">
        {children}
    </div>
  );
}
