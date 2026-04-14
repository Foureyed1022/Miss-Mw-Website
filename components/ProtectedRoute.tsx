'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange } from '@/lib/auth';
import { getUserProfile } from '@/lib/firestore';
import { UserRole, UserProfile } from '@/types';
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        setLoading(false);
        return;
      }

      const userProfile = await getUserProfile(firebaseUser.uid);

      if (!userProfile) {
        // If profile doesn't exist, user is strictly not authorized for the dashboard
        router.push('/login');
        setLoading(false);
        return;
      }


      if (allowedRoles && !allowedRoles.includes(userProfile.role)) {
        // Redirect if role is not allowed
        router.push('/dashboard'); // Or an access-denied page
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      setProfile(userProfile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#121125' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
        <p className="text-xl font-bold" style={{ color: 'white' }}>Redirecting...</p>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return <>{children}</>;
}


