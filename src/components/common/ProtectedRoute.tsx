// "use client";

// import { ReactNode, useEffect } from "react";
// import { useAuth } from "@/context/authContext";
// import { useRouter } from "next/navigation";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/auth/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return null; // Optionally return a loading spinner here
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
