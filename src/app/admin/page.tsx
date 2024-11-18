"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import VideoPlayer from "@/components/VideoPlayer"; // Import your VideoPlayer component

function Dashboard() {
  return (
    <div>
      <div>
        <h1 className="mx-auto text-4xl">Eyecon AI</h1>
      </div>
    <BentoGrid className="max-w-4xl mx-auto ml-8 mt-4">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          // description={item.description}
          header={item.header} // Render the video player here
          // icon={item.icon}
          className="bg-gray-50"
        />
      ))}
    </BentoGrid>
    </div>
  );
}

const items = [
  {
    title: "Philpines",
    header: <iframe src="https://www.youtube.com/embed/p0Qhe4vhYLQ" title="🔴PHILIPPINES Street View Live Cam 2, Soliman Street Davao City, Agdao #philippines #livestream" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>, // Replace with your live video URL,
  },
  {
    title: "Philpines",
    header: <iframe src="https://www.youtube.com/embed/KY4Yd5QR570" title="Elbo Room Band WebCam" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>, // Replace with your live video URL,
  }
];

export default Dashboard;