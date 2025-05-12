"use client";
import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fingerprint, Shield, AlertCircle, Terminal } from "lucide-react";

const FeatureCard = ({ icon, title, description, highlight = false }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`rounded-xl p-6 shadow-lg ${highlight ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' : 'bg-white border border-gray-200'}`}
    >
      <div className={`p-3 rounded-full w-fit mb-4 ${highlight ? 'bg-white/20' : 'bg-purple-100'}`}>
        {React.cloneElement(icon, { className: `h-6 w-6 ${highlight ? 'text-white' : 'text-purple-600'}` })}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${highlight ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm ${highlight ? 'text-white/90' : 'text-gray-600'}`}>{description}</p>
    </motion.div>
  );
};

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const images = [
    { src: "/images/org01.png", alt: "Organization 1" },
    { src: "/images/org02.png", alt: "Organization 2" },
    { src: "/images/org03.png", alt: "Organization 3" },
    { src: "/images/org04.png", alt: "Organization 4" },
  ];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (    <div className="w-full min-h-[90vh] flex items-center justify-center bg-transparent" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16 bg-transparent">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 relative">
            {/* Subtle backdrop for better text contrast */}
            <div className="absolute -inset-8 bg-white/25 blur-xl rounded-3xl -z-10"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="space-y-2"
            ><div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-purple-800 border border-purple-300 shadow-sm">
                <Shield className="h-4 w-4 mr-2" />
                AI-Powered Security
              </div>
            </motion.div>            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 hero-heading"
            >
              Intelligent <span className="text-purple-800">Security Surveillance</span> for the Modern World
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } }
              }}
              className="text-lg text-slate-800 max-w-xl font-medium hero-description"
            >
              Eyecon AI transforms your security with context-aware monitoring, smart anomaly detection, and natural language commands.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } }
              }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="lg">
                Live Demo
              </Button>
            </motion.div>
          </div>
          
          {/* Right Content - Animation */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.4 } }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl"></div>
              <ContainerScroll>
                <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                  <div className="relative p-2">
                    <div className="flex items-center gap-2 px-2 py-2 border-b border-gray-700/50">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-gray-400">Eyecon AI Monitoring</div>
                    </div>
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full rounded-b-lg shadow-lg"
                    >
                      <source src="/videos/output-onlinegiftools.gif" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="text-white text-sm font-medium">Anomaly detected: Unauthorized person in restricted area</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ContainerScroll>
            </motion.div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <FeatureCard 
            icon={<Terminal />}
            title="Natural Language Commands"
            description="Control your security system with simple, conversational commands"
          />
          <FeatureCard 
            icon={<Fingerprint />}
            title="Context-Aware Monitoring"
            description="Smart detection that understands the environment and situation"
            highlight={true}
          />
          <FeatureCard 
            icon={<AlertCircle />}
            title="Smart Anomaly Detection"
            description="Proactively identify potential security threats in real-time"
          />
        </motion.div>
        
        {/* Partner Logos */}        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { duration: 1, delay: 0.8 } }
          }}
          className="mt-16 bg-transparent"
        >
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by leading organizations</p>          <div className="flex flex-col items-center overflow-hidden bg-transparent">
            <div className="scroll-container bg-transparent">
              <ScrollingImageList images={images} />
            </div>
          </div>
        </motion.div>
      </div>    </div>
  );
};

export default Hero;

const ScrollingImageList = ({ images }) => {
  return (    <div className="flex flex-col items-center overflow-hidden bg-transparent">
       {/* Left and right shadow overlays removed for transparency */}      <div className="scroll-container bg-transparent">
        <div className="scrolling-images bg-transparent">
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

