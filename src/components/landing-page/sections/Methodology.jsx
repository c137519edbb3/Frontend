import React from "react";
import SectionComponent from '../SectionComponent';

const ModelArchitecture = () => {
  return (
       <SectionComponent 
        text="Methodology" 
        heading="Methodology" 
        subheading="We pass live camera feeds through deep learning models to predict events as catastrophic, critical, or normal, with high precision and continuous adaptation."
        >


<div
  className="
    flex 
    flex-col md:flex-row 
    items-center justify-center 
    gap-8 md:gap-12 
    p-4
  "
>
  {/* First Image (Camera) */}
  <img
    src="/images/camera.png"
    alt="Model Step 1"
    className="h-28 md:h-48 w-auto mx-2"  // Further reduced size
  />

  {/* Arrow (Down for mobile, Right for desktop) */}
  <span className="text-4xl text-gray-600 md:hidden">{"↓"}</span>
  <span className="hidden md:inline text-6xl text-gray-600">{"→"}</span>

  {/* Second Image (Rock) */}
  <div className="relative inline-block mx-2"> {/* Container for relative positioning */}
    {/* Main Image */}
    <img
      src="/videos/output-onlinegiftools.gif"
      alt="Model Step 2"
      className="h-28 md:h-48 w-auto"  // Adjust size as needed
    />

    {/* Bottom-left Overlay Image */}
    <img
      src="/images/cloud_footer.svg"
      alt="Overlay"
      className="absolute bottom-0 left-0 h-8 w-8 md:h-12 md:w-12"  // Adjust size of overlay image
    />
  </div>

  {/* Arrow (Down for mobile, Right for desktop) */}
  <span className="text-4xl text-gray-600 md:hidden">{"↓"}</span>
  <span className="hidden md:inline text-6xl text-gray-600">{"→"}</span>

  {/* Third Image (Table) */}
  <img
    src="/images/table.png"
    alt="Model Step 3"
    className="h-16 md:h-36 w-auto mx-2"  // Slight adjustment for consistency
  />
</div>



      </SectionComponent>
  );
};

export default ModelArchitecture;
