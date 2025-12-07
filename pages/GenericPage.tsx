import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const GenericPage: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="py-20 min-h-[60vh]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-8 border-b pb-4">{title}</h1>
        <div className="prose prose-lg text-gray-600 max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GenericPage;