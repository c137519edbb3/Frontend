"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsDesktop(window.innerWidth > 1024);

      // Add resize listener
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 1024);
      };

      window.addEventListener('resize', handleResize);

      // Initialize scroll only if desktop
      if (window.innerWidth > 1024) {
        import('locomotive-scroll').then((LocomotiveScroll) => {
          const scroll = new LocomotiveScroll.default({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            smartphone: {
              smooth: false,
            },
            tablet: {
              smooth: false,
            }
          });

          return () => {
            if (scroll) {
              scroll.destroy();
            }
          };
        });
      }

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Don't render anything until client-side
  if (!isClient) {
    return <div>{children}</div>;
  }

  return (
    <div 
      ref={scrollRef} 
      data-scroll-container
      className={isDesktop ? 'has-scroll-smooth' : ''}
    >
      {children}
    </div>
  );
};

export default SmoothScrollProvider; 