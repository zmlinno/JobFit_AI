import { useState, useEffect, useCallback } from 'react';
import { jobApi, JobSearchParams } from '../services/jobApi';
import { Job } from '../types';
import { useJobStore } from '../store/jobStore';

interface UseJobsOptions {
  autoFetch?: boolean;
  searchParams?: JobSearchParams;
}

export const useJobs = (options: UseJobsOptions = {}) => {
  const { autoFetch = true, searchParams = {} } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { setJobs } = useJobStore();

  const fetchJobs = useCallback(async (params: JobSearchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const mergedParams = { ...searchParams, ...params };
      console.log('🔍 Fetching jobs with params:', mergedParams);
      
      const response = await jobApi.searchJobs(mergedParams);
      
      console.log(`✅ Successfully fetched ${response.data.length} jobs from multiple sources`);
      setJobs(response.data);
      setTotalCount(response.count);
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
      setError(errorMessage);
      console.error('❌ Error fetching jobs:', err);
      
      // Enhanced fallback with more jobs
      console.warn('🔄 Using enhanced fallback data');
      const { mockJobs } = await import('../data/mockData');
      setJobs(mockJobs);
      setTotalCount(mockJobs.length);
      
      return mockJobs;
    } finally {
      setLoading(false);
    }
  }, [searchParams, setJobs]);

  const searchJobs = useCallback(async (query: string, location?: string) => {
    const searchParams: JobSearchParams = {
      query: query || 'software developer',
      location: location || '',
      remote_jobs_only: false,
      num_pages: 1
    };
    
    console.log('🔍 Searching jobs with query:', query, 'location:', location);
    return fetchJobs(searchParams);
  }, [fetchJobs]);

  const searchRemoteJobs = useCallback(async (query: string) => {
    return fetchJobs({
      query: query || 'software developer',
      remote_jobs_only: true,
      num_pages: 1
    });
  }, [fetchJobs]);

  const fetchMoreJobs = useCallback(async (page: number) => {
    return fetchJobs({
      ...searchParams,
      page
    });
  }, [fetchJobs, searchParams]);

  // Auto-fetch comprehensive job data on mount
  useEffect(() => {
    if (autoFetch) {
      console.log('🚀 Auto-fetching comprehensive job data...');
      fetchJobs({
        query: 'software developer OR frontend developer OR backend developer OR full stack developer OR devops engineer OR data scientist',
        remote_jobs_only: false,
        num_pages: 1
      });
    }
  }, [autoFetch, fetchJobs]);

  return {
    loading,
    error,
    totalCount,
    fetchJobs,
    searchJobs,
    searchRemoteJobs,
    fetchMoreJobs,
    refetch: useCallback(() => fetchJobs(searchParams), [fetchJobs, searchParams])
  };
};