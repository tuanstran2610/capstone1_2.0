'use client'

import { useState, useEffect } from 'react';

interface MembershipData {
  id: string;
  email: string;
  fullName: string;
  membershipPlan: 'standard' | 'premium' | null;
  membershipStatus: 'active' | 'expired' | 'pending';
  membershipStartDate: string | null;
  membershipEndDate: string | null;
  isActive: boolean;
}

interface UseMembershipReturn {
  membershipData: MembershipData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMembership(): UseMembershipReturn {
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembershipData = async () => {
    // Attempt to read user email from local storage or other app state
    let email = '';
    if (typeof window !== 'undefined') {
      email = window.localStorage.getItem('userEmail') || '';
    }

    if (!email) {
      setIsLoading(false);
      setMembershipData(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/membership/${encodeURIComponent(email)}`);
      
      if (response.ok) {
        const data = await response.json();
        setMembershipData(data.user);
      } else if (response.status === 404) {
        // User not found in backend database - they haven't purchased membership yet
        setMembershipData(null);
      } else {
        throw new Error(`Failed to fetch membership: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching membership data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMembershipData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipData();
  }, []);

  const refetch = () => {
    fetchMembershipData();
  };

  return {
    membershipData,
    isLoading,
    error,
    refetch
  };
} 