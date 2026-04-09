"use client";

import { useState, useEffect } from 'react';
import ApplicantsView from '@/components/ApplicantsView';
import { Applicant } from '@/types';
import { getApplicants, updateApplicantStatus, deleteApplicant } from '@/lib/firestore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const data = await getApplicants();
        setApplicants(data);
      } catch (error) {
        console.error('Error loading applicants:', error);
        toast.error('Failed to load applicants');
      } finally {
        setLoading(false);
      }
    };
    loadApplicants();
  }, []);

  const handleUpdateStatus = async (id: string, status: Applicant['applicationStatus']) => {
    try {
      const success = await updateApplicantStatus(id, status);
      if (success) {
        setApplicants(applicants.map(app => app.id === id ? { ...app, applicationStatus: status } : app));
        toast.success(`Applicant marked as ${status}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteApplicant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this applicant?')) return;
    try {
      const success = await deleteApplicant(id);
      if (success) {
        setApplicants(applicants.filter(app => app.id !== id));
        toast.success('Applicant deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete applicant');
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#9C8653]" />
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
