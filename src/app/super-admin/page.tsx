"use client";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Header } from "@/components/common/header";
import VideoPlayer from "@/components/VideoPlayer"; // Import your VideoPlayer component

function Dashboard() {
  return (
    <RouteGuard allowedRoles={['Admin']}>
      <div className="flex flex-col gap-6 p-4 pr-20 bg-background min-h-screen w-full">
        <Header pageName="Super Admin Dashboard" userName="Admin User" userEmail="admin@example.com" />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-medium">Total Organizations</h3>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-medium">Active Admins</h3>
            <p className="text-2xl font-bold mt-2">18</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-medium">Total Users</h3>
            <p className="text-2xl font-bold mt-2">342</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-medium">System Status</h3>
            <p className="text-2xl font-bold mt-2 text-green-500">Online</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <div className="p-2 bg-secondary rounded flex justify-between items-center">
              <span>New organization registered</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="p-2 bg-secondary rounded flex justify-between items-center">
              <span>Admin user updated settings</span>
              <span className="text-sm text-muted-foreground">5 hours ago</span>
            </div>
            <div className="p-2 bg-secondary rounded flex justify-between items-center">
              <span>System backup completed</span>
              <span className="text-sm text-muted-foreground">Yesterday</span>
            </div>
          </div>
        </div>

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
    </RouteGuard>
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