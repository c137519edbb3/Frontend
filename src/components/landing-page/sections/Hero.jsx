"use client";
import React from "react";
import "./Hero.css";
import SectionComponent from '../SectionComponent';
import { ContainerScroll } from "../ui/container-scroll-animation";

const Hero = () => {

  const images = [
    { src: "/images/org01.png", alt: "Organization 1" },
    { src: "/images/org02.png", alt: "Organization 2" },
    { src: "/images/org03.png", alt: "Organization 3" },
    { src: "/images/org04.png", alt: "Organization 4" },
  ];

  return (
    <div>
        <SectionComponent 
          text="Stay Safe Today" 
          heading="Context Changes Everything" 
          subheading="Context-based Detection of Mixed-Criticality Events using Computer Vision."
        >

          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-row items-center justify-center space-x-4">

            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-lg p-px text-sm font-medium leading-6 text-white inline-flex items-center justify-center">
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-lg bg-zinc-950 py-2.5 px-5 ring-1 ring-white/10">
                <span>
                  Book a Demo
                </span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>

            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 px-5 text-sm font-medium text-center text-gray-700 border border-gray-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300"
            >
              Live Demo
            </button>
            </div>




              <ContainerScroll>
                <img
                  src="/images/dashboard.avif"
                  alt="hero"
                  // height={720}
                  // width={1400}
                  className="mt-32 mb-20" 
                  draggable={false}
                />
              </ContainerScroll>



            <div className="flex flex-col items-center overflow-hidden">
              <div className="scroll-container">
                <ScrollingImageList images={images} />
              </div>
            </div>
          </div>

        </SectionComponent>

    </div>
  );
};

export default Hero;



const ScrollingImageList = ({ images }) => {
  return (
    <div className="flex flex-col items-center overflow-hidden">
       {/* Left shadow overlay */}
       <div className="absolute top-0 left-0 bottom-0 w-64 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        
        {/* Right shadow overlay */}
        <div className="absolute top-0 right-0 bottom-0 w-64 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

      <div className="scroll-container">
        <div className="scrolling-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="scrolling-image"
            />
          ))}
          
          {images.map((image, index) => (
            <img
              key={`repeat-${index}`}
              src={image.src}
              alt={image.alt}
              className="scrolling-image"
            />
          ))}
        
        </div>
      </div>
      
    </div>
  );
};

