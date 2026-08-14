import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Job, Filter, User } from '../types';

type ThemeMode = 'light' | 'dark';

interface JobStore {
  jobs: Job[];
  filteredJobs: Job[];
  selectedJob: Job | null;
  filters: Filter;
  searchQuery: string;
  themeMode: ThemeMode;
  user: User | null;
  savedJobs: string[];
  likedJobs: string[];
  
  // Actions
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilters: (filters: Partial<Filter>) => void;
  setSearchQuery: (query: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  filterJobs: () => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  likeJob: (jobId: string) => void;
  unlikeJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  isJobLiked: (jobId: string) => boolean;
}

const defaultFilters: Filter = {
  location: [],
  remote: false,
  type: [],
  techStack: [],
  salaryRange: [0, 300000],
  noWhiteboard: false,
  diversityFriendly: false,
  experience: [],
};

const applyTheme = (mode: ThemeMode) => {
  const html = document.documentElement;
  
  // Remove all theme classes
  html.classList.remove('dark');
  
  // Apply new theme
  if (mode === 'dark') {
    html.classList.add('dark');
  }
};

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      filteredJobs: [],
      selectedJob: null,
      filters: defaultFilters,
      searchQuery: '',
      themeMode: 'dark', // Default to dark mode
      user: null,
      savedJobs: [],
      likedJobs: [],

      setJobs: (jobs) => {
        set({ jobs });
        get().filterJobs();
      },

      setSelectedJob: (job) => set({ selectedJob: job }),

      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
        get().filterJobs();
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterJobs();
      },

      setThemeMode: (mode) => {
        set({ themeMode: mode });
        applyTheme(mode);
      },

      toggleTheme: () => {
        const currentMode = get().themeMode;
        const nextMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
        get().setThemeMode(nextMode);
      },

      setUser: (user) => set({ user }),

      filterJobs: () => {
        const { jobs, filters, searchQuery } = get();
        
        let filtered = jobs.filter(job => {
          // Search query filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesQuery = 
              job.title.toLowerCase().includes(query) ||
              job.company.toLowerCase().includes(query) ||
              job.techStack.some(tech => tech.toLowerCase().includes(query));
            if (!matchesQuery) return false;
          }

          // Location filter
          if (filters.location.length > 0) {
            const matchesLocation = filters.location.some(loc => 
              job.location.toLowerCase().includes(loc.toLowerCase())
            );
            if (!matchesLocation && !job.remote) return false;
          }

          // Remote filter
          if (filters.remote && !job.remote) return false;

          // Job type filter
          if (filters.type.length > 0 && !filters.type.includes(job.type)) return false;

          // Tech stack filter
          if (filters.techStack.length > 0) {
            const matchesTech = filters.techStack.some(tech => 
              job.techStack.some(jobTech => 
                jobTech.toLowerCase().includes(tech.toLowerCase())
              )
            );
            if (!matchesTech) return false;
          }

          // Salary range filter
          const [minSalary, maxSalary] = filters.salaryRange;
          if (job.salary.max < minSalary || job.salary.min > maxSalary) return false;

          // Special filters
          if (filters.noWhiteboard && !job.noWhiteboard) return false;
          if (filters.diversityFriendly && !job.diversityFriendly) return false;

          return true;
        });

        // Sort by relevance (AI match score, then featured, then date)
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.aiMatchScore && b.aiMatchScore) return b.aiMatchScore - a.aiMatchScore;
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        });

        set({ filteredJobs: filtered });
      },

      saveJob: (jobId) => {
        const { savedJobs } = get();
        if (!savedJobs.includes(jobId)) {
          set({ savedJobs: [...savedJobs, jobId] });
        }
      },

      unsaveJob: (jobId) => {
        const { savedJobs } = get();
        set({ savedJobs: savedJobs.filter(id => id !== jobId) });
      },

      likeJob: (jobId) => {
        const { likedJobs } = get();
        if (!likedJobs.includes(jobId)) {
          set({ likedJobs: [...likedJobs, jobId] });
        }
      },

      unlikeJob: (jobId) => {
        const { likedJobs } = get();
        set({ likedJobs: likedJobs.filter(id => id !== jobId) });
      },

      isJobSaved: (jobId) => {
        return get().savedJobs.includes(jobId);
      },

      isJobLiked: (jobId) => {
        return get().likedJobs.includes(jobId);
      },
    }),
    {
      name: 'devhire-storage',
      partialize: (state) => ({
        themeMode: state.themeMode,
        user: state.user,
        savedJobs: state.savedJobs,
        likedJobs: state.likedJobs,
        filters: state.filters,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.themeMode);
        }
      },
    }
  )
);