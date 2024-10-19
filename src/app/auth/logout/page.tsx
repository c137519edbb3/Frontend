"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();  // Trigger the logout process
    router.push("/login");  // Redirect to login page after logging out
  }, [logout, router]);

  return (
    <div>
      <h1>Logging out...</h1>
      {/* You can add a loading spinner or some visual feedback here */}
    </div>
  );
}
