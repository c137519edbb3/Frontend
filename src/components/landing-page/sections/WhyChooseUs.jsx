import React from 'react';
import SectionComponent from '../SectionComponent';
import {
  FaArrowRight,
  FaAlignRight,
  FaAlignLeft,
  FaClipboard,
  FaFileAlt,
  FaPenFancy,
  FaTable,
} from 'react-icons/fa';


const a = "/images/a.jpg";
const b = "/images/b.jpg";
const c = "/images/c.jpg";
const d = "/images/d.jpg";
const e = "/images/e.jpg";
const f = "/images/f.jpg";
const g = "/images/g.jpg";


import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}>
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  backgroundImage,
}) => {
  return (
    <div
      className={cn(
        "relative row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-white dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden",
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-200 group-hover/bento:scale-105"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {header}
      </div>
      <div className="relative z-10 group-hover/bento:translate-x-2 transition duration-200">
        <div className="text-white">{icon}</div>
        <div className="font-sans font-bold text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-white/90 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};


const ChooseUs = () => {
  return (
    <div>
      <SectionComponent 
        text="Product" 
        heading="Why Choose Us?" 
        subheading="Transform security management with context-aware AI, providing real-time anomaly detection and tailored insights to enhance safety and efficiency across industries."
      >
        <BentoGridWidget />
      </SectionComponent>
    </div>
  );
};

export default ChooseUs;





function BentoGridWidget() {
  console.log("Image paths:", { a, b, c, d, e, f, g });
  return (
    (<BentoGrid className="relative w-[720px]  h-full overflow-hidden bg-transparent rounded-lg">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          backgroundImage={item.backgroundImage} 
          className={i === 3 || i === 6 ? "md:col-span-2" : ""} />
      ))}
    </BentoGrid>)
  );
}
const Skeleton = () => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-transparent from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: 'Real-Time Reporting',
    description: 'Support for multiple alert channels such as SMS, email, push notifications.',
    header: <Skeleton />,
    icon: <FaClipboard className="h-4 w-4 text-neutral-500" />,
    backgroundImage: a, // Add image here
  },
  {
    title: 'Context-Aware Detection',
    description: "Detect anomalies with an understanding of environmental context.",
    header: <Skeleton />,
    icon: <FaFileAlt className="h-4 w-4 text-neutral-500" />,
    backgroundImage: b, // Add image here
  },
  {
    title: 'Cloud and Edge Processing',
    description: 'Process data on cloud or edge for low latency and cost efficiency.',
    header: <Skeleton />,
    icon: <FaPenFancy className="h-4 w-4 text-neutral-500" />,
    backgroundImage: c, // Add image here
  },
  {
    title: 'Advanced Visual Analytics',
    description: 'Solutions tailored for diverse industries like safety, public spaces, and retail stores.',
    header: <Skeleton />,
    icon: <FaTable className="h-4 w-4 text-neutral-500" />,
    backgroundImage: d, // Add image here
  },
  {
    title: 'AI Training on Custom Datasets',
    description: 'Enable customers to train models on their proprietary datasets.',
    header: <Skeleton />,
    icon: <FaArrowRight className="h-4 w-4 text-neutral-500" />,
    backgroundImage: e, // Add image here
  },
  {
    title: '24/7 Support',
    description: 'Ensure round-the-clock customer service and monitoring.',
    header: <Skeleton />,
    icon: <FaAlignLeft className="h-4 w-4 text-neutral-500" />,
    backgroundImage: f, // Add image here
  },
  {
    title: 'Low-Latency Detection',
    description: 'Report anomalies almost instantly.',
    header: <Skeleton />,
    icon: <FaAlignRight className="h-4 w-4 text-neutral-500" />,
    backgroundImage: g, // Add image here
  },
];

