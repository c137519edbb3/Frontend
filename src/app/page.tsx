"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      router.push('/admin');
    } else {
      router.push('/auth/login');
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return null;
}