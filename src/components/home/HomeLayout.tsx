"use client";

import React, { useState, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/home/FAQSection';

import RevealObserver from '@/components/home/RevealObserver';
import ReadingProgress from '@/components/home/ReadingProgress';

const ScrollBackground = dynamic(() => import('@/components/home/ScrollBackground'), { ssr: false });
const CursorGlow = dynamic(() => import('@/components/home/CursorGlow'), { ssr: false });
const ParallaxDecor = dynamic(() => import('@/components/home/ParallaxDecor'), { ssr: false });

export default function HomeLayout() {
  return (
    <>
      {/* Skip-to-content link para accesibilidad */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          padding: '12px 24px',
          background: 'var(--accent)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '14px',
          borderRadius: '0 0 8px 8px',
          textDecoration: 'none',
          transition: 'top 0.2s',
        }}
        onFocus={e => { e.currentTarget.style.top = '0'; }}
        onBlur={e => { e.currentTarget.style.top = '-100%'; }}
      >
        Saltar al contenido principal
      </a>

      <RevealObserver />
      <ScrollBackground />
      <CursorGlow />
      <ReadingProgress />
      <ParallaxDecor />

      <Navbar />

      <Sidebar />



      <main
        id="main-content"
        role="main"
        style={{
          paddingTop: '56px',
          overflowX: 'hidden',
        }}
      >
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <SkillsSection />
        <FAQSection />
        <ContactSection />

        <footer
          style={{
            borderTop: '1px solid var(--border)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
            &copy; {new Date().getFullYear()} Alexis Galv&aacute;n &middot; Portfolio Blado &middot;{' '}
            <a
              href="https://github.com/GalvanAlexis/bladoPC"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none' }}
            >
              GitHub ↗
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
