import React from 'react';
import Header from './partials/home/Header';
import Footer from './partials/home/Footer';

export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
        <Header />
            <div className="pb-10 min-h-screen">
                {children}
            </div>
        <Footer />
    </div>
  );
}
