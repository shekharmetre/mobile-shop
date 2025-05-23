import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
         href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-blue-100 mt-2">Last Updated: {lastUpdated}</p>
          </div>
          
          <div className="p-6 md:p-8 prose prose-blue max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;