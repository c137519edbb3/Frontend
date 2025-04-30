import React, { useState } from "react";
import "./Accordian.css"; // Import your custom styles

// FAQ data
const faqData = [
  {
    question: "What alerts can I receive?",
    answer: "Notifications are available via SMS, email, push notifications, and webhooks.",
  },
  {
    question: "Is there support for integrations?",
    answer: "Yes, we offer integration with tools like CCTV, live cameras, IoT sensors.",
  },
  {
    question: "How are anomalies grouped?",
    answer: "Detected anomalies are automatically categorized by type for better analysis.",
  },
  {
    question: "What happens if an anomaly is detected?",
    answer: "Workflow triggers can automate responses and corrective actions.",
  },
  {
    question: "Can I train the AI with my own data?",
    answer: "Yes, the platform allows custom AI training with proprietary datasets.",
  },
  {
    question: "What languages are supported?",
    answer: "The platform includes multi-language interfaces for global accessibility.",
  },
  {
    question: "What security features are included?",
    answer: "Multi-factor authentication and data encryption ensure enhanced security.",
  },
];

// SVG Icons for Plus and Minus
const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Accordion = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to toggle an FAQ item
  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-full lg:w-full mx-auto px-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item bg-gray-100 rounded-lg pt-16 border border-black border-opacity-10${
              expandedIndex === index ? "border-black border-opacity-10" : "border-black border-opacity-10"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              {expandedIndex === index ? <MinusIcon /> : <PlusIcon />}
            </button>
  
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Accordion;
