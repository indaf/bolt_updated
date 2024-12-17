import React from 'react';

interface FormSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function FormSection({ title, subtitle, children }: FormSectionProps) {
  return (
    <section className="bg-[#242424] rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#FE0032]">{title}</h2>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}