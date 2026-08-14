export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  remote: boolean;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  techStack: string[];
  benefits: string[];
  postedAt: Date;
  aiMatchScore?: number;
  isHot?: boolean;
  noWhiteboard?: boolean;
  diversityFriendly?: boolean;
  featured?: boolean;
  externalUrl?: string; // For Adzuna redirect URLs
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  size: string;
  industry: string;
  techStack: string[];
  benefits: string[];
  culture: string[];
  openJobs: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'jobseeker' | 'recruiter';
  skills: string[];
  experience: number;
  location: string;
  remoteOnly: boolean;
  salaryExpectation: {
    min: number;
    max: number;
    currency: string;
  };
  githubProfile?: string;
  portfolio?: string;
}

export interface Filter {
  location: string[];
  remote: boolean;
  type: string[];
  techStack: string[];
  salaryRange: [number, number];
  noWhiteboard: boolean;
  diversityFriendly: boolean;
  experience: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}