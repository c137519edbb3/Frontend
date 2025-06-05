"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

// Import your landing page components
import Hero from '@/components/landing-page/sections/Hero';
import Methodology from '@/components/landing-page/sections/Methodology';
import WhyChooseUs from '@/components/landing-page/sections/WhyChooseUs';
import WhoFor from '@/components/landing-page/sections/WhoFor';
import Team from '@/components/landing-page/sections/Team';
import FAQ from '@/components/landing-page/sections/FAQ';
import BookDemo from '@/components/landing-page/sections/BookDemo';
import Footer from '@/components/landing-page/sections/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [buttonText, setButtonText] = useState("Login");
  const [buttonLink, setButtonLink] = useState("/auth/login");

  useEffect(() => {
    if (isAuthenticated) {
      setButtonText("My Dashboard");
      setButtonLink("/admin");
    } else {
      setButtonText("Login");
      setButtonLink("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <SmoothScrollProvider>
      <div className="landing-page relative min-h-screen flex flex-col items-center justify-center" data-scroll>
        {/* Navigation Button (Login/Dashboard) */}
        <div className="fixed top-4 right-4 z-50">
          <Link href={buttonLink}>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-indigo-300 hover:bg-indigo-50">
              {buttonText} 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Fluid Background */}
        <div 
          className="absolute top-[300px] left-0 right-0 bottom-0 bg-no-repeat bg-cover opacity-80 z-[1] pointer-events-none"
          style={{ 
            backgroundImage: "url('/images/fluid_bg_1.avif')",
            backgroundSize: "100% auto",
            filter: "hue-rotate(80deg)"
          }} 
          data-scroll
          data-scroll-speed="-1"
        />
        
        {/* Grid Overlay */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 bg-repeat opacity-50 mix-blend-multiply pointer-events-none z-0"
          style={{ 
            backgroundImage: "url('/images/grid.svg')",
            backgroundSize: "100% auto",
            filter: "brightness(0.9)"
          }} 
          data-scroll
          data-scroll-speed="-2"
        />
        
        {/* Shadows Background */}
        <div 
          className="absolute top-0 left-0 right-0 h-full bg-no-repeat z-10 pointer-events-none"
          style={{ 
            backgroundImage: "url('/images/shadows_bg.png')",
            backgroundSize: "100% auto"
          }} 
          data-scroll
          data-scroll-speed="-1"
        />
        
        {/* Background Image for ChooseUs section */}
        {/* <div 
          className="absolute left-0 right-0 bg-no-repeat bg-cover z-[-10]"
          style={{ 
            backgroundImage: "url('/images/bg_img.png')",
            top: "calc(200vh - 3136px)",
            height: "3136px",
            filter: "brightness(1.3) contrast(0.9) opacity(0.5) saturate(0.5)"
          }} 
          data-scroll
          data-scroll-speed="-3"
        /> */}
        
        {/* Content */}
        <div className="relative z-[2] w-full flex flex-col items-center">
          <div data-scroll data-scroll-speed="1">
            <Hero />
          </div>
          {/* <Methodology /> */}
          <div data-scroll data-scroll-speed="1">
            <WhyChooseUs />
          </div>
          <div data-scroll data-scroll-speed="1">
            <WhoFor />
          </div>
          {/* <Team /> */}
          <div data-scroll data-scroll-speed="1">
            <FAQ />
          </div>
          <div data-scroll data-scroll-speed="1" className='w-full'>
            <BookDemo />
          </div>
          <div data-scroll data-scroll-speed="1" className='w-full bg-gray-200'>
            <Footer />
          </div>
        </div>
      </div>
    </SmoothScrollProvider>
  );
}