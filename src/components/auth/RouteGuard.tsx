import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole, getRedirectPath } from '@/utils/auth-utils';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function RouteGuard({ children, allowedRoles = [] }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Authentication check
    const userRole = getUserRole();
    
    // Not authenticated at all
    if (!userRole) {
      router.push('/auth/login');
      return;
    }
    
    // Authenticated but not authorized for this specific route
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      router.push(getRedirectPath());
      return;
    }
    
    setAuthorized(true);
  }, [router, allowedRoles]);

  // Show loading or nothing while checking auth
  if (!authorized) {
    return <div>Loading...</div>;
  }

  // If authorized, render children
  return <>{children}</>;
}