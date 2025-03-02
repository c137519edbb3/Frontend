export const dynamic = 'force-dynamic';

import CameraWidget from "@/components/admin/CameraScreen";
import { authOptions } from "@/lib/auth";
import { Camera } from "@/types/camera"; 
import { fetchCameras } from "@/utils/camera-api";
import { getServerSession } from "next-auth";
 
interface PageProps {
  params: {};
  searchParams: {};
}

export default async function CameraPage(props: PageProps) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.organization?.id || !session?.user?.token) {
      console.error("Session not found or missing required details");
      throw new Error("Session not found or missing required details");
    }

    const organizationId = session.user.organization.id;
    const token = session.user.token;

    const cameras: Camera[] = await fetchCameras(organizationId, token);
    return <CameraWidget initialCameras={cameras} />;
  } catch (error) {
    console.error("Error fetching cameras:", error);
    
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load camera data. Please try again later.</p>
      </div>
    );
  }
}
