import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  path?: string;
}

export function SEOHelmet({ 
  title = 'CDTARGET - Générateur d\'exercices de tir',
  description = 'Plateforme professionnelle pour la gestion et le suivi des exercices de tir.',
  path = ''
}: SEOHelmetProps) {
  const baseUrl = 'https://cdtarget.com';
  const url = `${baseUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}