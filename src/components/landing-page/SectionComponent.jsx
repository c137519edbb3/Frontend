import React from 'react';

const SectionComponent = ({ text, heading, subheading, children }) => {
  return (
    <div className="flex flex-col items-center   ">
      <div className="mb-5 border border-[#445cd8]/50 rounded-lg p-2 bg-gray-100/40 text-xs">
        <p className="px-2   font-light">{text}</p>
      </div>

      <div>
        <p className="text-4xl md:text-5xl text-center px-4">{heading}</p>
      </div>

      <div className="mb-10 max-w-md text-center ">
        <h3 className=" px-4 pt-4 break-words">{subheading}</h3>
      </div>

      <div className="w-full mb-40 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SectionComponent;
