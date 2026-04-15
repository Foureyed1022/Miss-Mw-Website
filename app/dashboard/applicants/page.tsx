"use client";

import { useState, useEffect } from 'react';
import ApplicantsView from '@/components/ApplicantsView';
import { Applicant } from '@/types';
import {
  subscribeToApplicants,
  updateApplicantStatus,
  deleteApplicant,
} from '@/lib/firestore';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Real-time listener — automatically reflects additions, updates, deletes
    const unsubscribe = subscribeToApplicants(
      (data) => {
        setApplicants(data);
        setLoading(false);
      },
      (err) => {
        console.error('Applicants listener error:', err);
        setError('Failed to load applicants. Check your connection.');
        setLoading(false);
        toast.error('Failed to load applicants');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: Applicant['applicationStatus']
  ) => {
    try {
      const success = await updateApplicantStatus(id, status);
      if (success) {
        toast.success(`Applicant marked as ${status}`);
        // Snapshot listener will handle the local state update automatically
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteApplicant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this applicant?')) return;
    try {
      await deleteApplicant(id);
      // Snapshot listener will remove from state automatically
    } catch {
      toast.error('Failed to delete applicant');
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-sm text-gray-400">Connecting to live applicants…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-20 gap-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-100">
          <AlertCircle className="h-7 w-7 text-red-400" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-700">Could not load applicants</p>
          <p className="text-sm text-gray-400 mt-1">{error}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="gap-2 mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <ApplicantsView
      applicants={applicants}
      onUpdateStatus={handleUpdateStatus}
      onDelete={handleDeleteApplicant}
    />
  );
}
