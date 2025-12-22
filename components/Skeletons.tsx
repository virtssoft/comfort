
import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
      <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-[700px] w-full bg-gray-100 animate-pulse flex items-center justify-center">
    <div className="container mx-auto px-6 text-center space-y-8">
      <div className="h-6 w-40 bg-gray-200 rounded-full mx-auto"></div>
      <div className="h-16 w-3/4 bg-gray-200 rounded mx-auto"></div>
      <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto"></div>
      <div className="flex justify-center space-x-4">
        <div className="h-14 w-48 bg-gray-200 rounded"></div>
        <div className="h-14 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="py-24 bg-comfort-blue/5 animate-pulse">
    <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
      <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
      <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
      <div className="h-24 w-full bg-gray-200 rounded"></div>
      <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto"></div>
      <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
    </div>
  </div>
);
