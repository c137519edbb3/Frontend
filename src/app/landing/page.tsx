"use client";

import React from 'react';

// Import your landing page components
import Hero from '@/components/landing-page/sections/Hero';
import Methodology from '@/components/landing-page/sections/Methodology';
import WhyChooseUs from '@/components/landing-page/sections/WhyChooseUs';
import WhoFor from '@/components/landing-page/sections/WhoFor';
import Team from '@/components/landing-page/sections/Team';
import FAQ from '@/components/landing-page/sections/FAQ';
import BookDemo from '@/components/landing-page/sections/BookDemo';
import Footer from '@/components/landing-page/sections/Footer';

export default function LandingPage() {
  return (
    <div className="landing-page relative min-h-screen flex flex-col items-center justify-center">
      {/* Fluid Background */}
      <div 
        className="absolute top-[300px] left-0 right-0 bottom-0 bg-no-repeat bg-cover opacity-80 z-[1] pointer-events-none"
        style={{ 
          backgroundImage: "url('/images/fluid_bg_1.avif')",
          backgroundSize: "100% auto",
          filter: "hue-rotate(80deg)"
        }} 
      />
      
      {/* Grid Overlay */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-repeat opacity-50 mix-blend-multiply pointer-events-none z-0"
        style={{ 
          backgroundImage: "url('/images/grid.svg')",
          backgroundSize: "100% auto",
          filter: "brightness(0.9)"
        }} 
      />
      
      {/* Shadows Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-full bg-no-repeat z-1 pointer-events-none"
        style={{ 
          backgroundImage: "url('/images/shadows_bg.png')",
          backgroundSize: "100% auto"
        }} 
      />
      
      {/* Background Image for ChooseUs section */}
      <div 
        className="absolute left-0 right-0 bg-no-repeat bg-cover z-[-10]"
        style={{ 
          backgroundImage: "url('/images/bg_img.png')",
          top: "calc(200vh - 3136px)",
          height: "3136px",
          filter: "brightness(1.3) contrast(0.9) opacity(0.5) saturate(0.5)"
        }} 
      />
      
      {/* Content */}
      <div className="relative z-[2] w-full flex flex-col items-center">
        <Hero />
        <Methodology />
        <WhyChooseUs />
        <WhoFor />
        <Team />
        <FAQ />
        <BookDemo />
        <Footer />
      </div>
    </div>
  );
}