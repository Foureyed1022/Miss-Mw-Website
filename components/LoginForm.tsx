'use client';

import { Lock, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, onAuthStateChange } from '@/lib/auth';
import { useEffect } from 'react';

import Image from 'next/image';
import logo from "@/public/logo.png";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        setIsInitializing(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { user, profile, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    if (!profile) {
      setError('Your account is not authorized to access the Admin Portal.');
      setLoading(false);
      return;
    }

    // Redirect to dashboard on success
    router.push('/dashboard');
  };


  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#121125' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
        <p className="text-xl font-bold" style={{ color: 'white' }}>Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #3D3B48 0%, #2D2B36 100%)' }}>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-[#7C3AED]enter mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <Image
                src={logo}
                alt="Miss Malawi Logo"
                width={100}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </div>
            <p className="text-xl font-bold" style={{ color: '#3D3B48' }}>Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
                  placeholder="admin@missmw.org"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#7C3AED' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
