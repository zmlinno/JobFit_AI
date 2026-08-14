interface JSearchJob {
  job_id: string;
  employer_name: string;
  employer_logo?: string;
  job_title: string;
  job_description: string;
  job_apply_link: string;
  job_city?: string;
  job_state?: string;
  job_country: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_required_skills?: string[];
  job_benefits?: string[];
}

interface RemoteOKJob {
  id: string;
  epoch: number;
  date: string;
  company: string;
  company_logo?: string;
  position: string;
  tags: string[];
  logo?: string;
  description: string;
  location: string;
  apply: string;
  salary?: string;
  url: string;
}

interface ReedJob {
  jobId: number;
  employerId: number;
  employerName: string;
  employerProfileId?: number;
  employerProfileName?: string;
  jobTitle: string;
  locationName: string;
  minimumSalary?: number;
  maximumSalary?: number;
  currency: string;
  expirationDate: string;
  date: string;
  jobDescription: string;
  applications: number;
  jobUrl: string;
}

interface JobSearchParams {
  query?: string;
  location?: string;
  employment_type?: string;
  remote_jobs_only?: boolean;
  page?: number;
  num_pages?: number;
}

class JobApiService {
  private rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  private rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  private remoteOkUrl = import.meta.env.VITE_REMOTEOK_API_URL || 'https://remoteok.io/api';
  private reedApiKey = import.meta.env.VITE_REED_API_KEY;
  private reedApiUrl = import.meta.env.VITE_REED_API_URL || 'https://www.reed.co.uk/api/1.0';

  // Check if API keys are configured
  private hasJSearchConfig(): boolean {
    return !!(this.rapidApiKey && this.rapidApiHost);
  }

  private hasReedConfig(): boolean {
    return !!this.reedApiKey;
  }

  async searchJobsReed(params: JobSearchParams = {}): Promise<{ data: ReedJob[], count: number }> {
    if (!this.hasReedConfig()) {
      console.warn('Reed API key not configured');
      return { data: [], count: 0 };
    }

    try {
      const { query = 'software developer', location = '', page = 1 } = params;
      const url = new URL(`${this.reedApiUrl}/search`);
      
      url.searchParams.append('keywords', query);
      if (location) {
        url.searchParams.append('locationName', location);
      }
      url.searchParams.append('resultsToTake', '100');
      url.searchParams.append('resultsToSkip', ((page - 1) * 100).toString());
      url.searchParams.append('minimumSalary', '30000');
      url.searchParams.append('permanent', 'true');

      console.log('🇬🇧 Fetching from Reed API:', url.toString().replace(this.reedApiKey, '[HIDDEN]'));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(this.reedApiKey + ':')}`,
          'User-Agent': 'DevHire Job Board',
        },
      });

      if (!response.ok) {
        throw new Error(`Reed API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Reed API returned ${data.results?.length || 0} jobs`);
      
      return { data: data.results || [], count: data.totalResults || 0 };
    } catch (error) {
      console.error('❌ Reed API failed:', error);
      return { data: [], count: 0 };
    }
  }

  async searchJobsJSearch(params: JobSearchParams = {}): Promise<{ data: JSearchJob[], count: number }> {
    if (!this.hasJSearchConfig()) {
      console.warn('JSearch API credentials not configured');
      return { data: [], count: 0 };
    }

    try {
      const {
        query = 'software developer',
        location = '',
        employment_type = '',
        remote_jobs_only = false,
        page = 1,
        num_pages = 1
      } = params;

      const url = new URL('https://jsearch.p.rapidapi.com/search');
      
      let searchQuery = query;
      if (location) {
        searchQuery += ` in ${location}`;
      }
      
      url.searchParams.append('query', searchQuery);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('num_pages', num_pages.toString());
      url.searchParams.append('date_posted', 'month');
      
      if (employment_type) {
        url.searchParams.append('employment_types', employment_type.toUpperCase());
      }
      
      if (remote_jobs_only) {
        url.searchParams.append('remote_jobs_only', 'true');
      }

      console.log('🚀 Fetching from JSearch API:', url.toString().replace(this.rapidApiKey, '[HIDDEN]'));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': this.rapidApiHost,
        },
      });

      if (!response.ok) {
        throw new Error(`JSearch API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ JSearch API returned ${data.data?.length || 0} jobs`);
      
      return { data: data.data || [], count: data.data?.length || 0 };
    } catch (error) {
      console.error('❌ JSearch API failed:', error);
      return { data: [], count: 0 };
    }
  }

  async searchJobsRemoteOK(): Promise<{ data: RemoteOKJob[], count: number }> {
    try {
      console.log('🌐 Fetching from RemoteOK API...');
      
      const response = await fetch(`${this.remoteOkUrl}?tags=dev,javascript,react,python,nodejs`, {
        method: 'GET',
        headers: {
          'User-Agent': 'DevHire Job Board',
        },
      });

      if (!response.ok) {
        throw new Error(`RemoteOK API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const jobs = Array.isArray(data) ? data.slice(1) : []; // First item is metadata
      
      console.log(`✅ RemoteOK API returned ${jobs.length} jobs`);
      return { data: jobs.slice(0, 50), count: Math.min(jobs.length, 50) };
    } catch (error) {
      console.error('❌ RemoteOK API failed:', error);
      return { data: [], count: 0 };
    }
  }

  async searchJobs(params: JobSearchParams = {}): Promise<{ data: import('../types').Job[], count: number }> {
    const results: import('../types').Job[] = [];
    let totalCount = 0;
    let apiSuccessCount = 0;

    console.log('🔍 Starting comprehensive job search...');
    console.log('📊 API Configuration Status:');
    console.log(`  - JSearch (RapidAPI): ${this.hasJSearchConfig() ? '✅ Configured' : '❌ Missing'}`);
    console.log(`  - Reed API: ${this.hasReedConfig() ? '✅ Configured' : '❌ Missing'}`);
    console.log(`  - RemoteOK: ✅ Available (no auth required)`);

    // Strategy: Try all APIs in parallel for maximum job coverage
    const apiPromises = [];

    // Priority 1: JSearch API (Primary source with your RapidAPI key)
    if (this.hasJSearchConfig()) {
      apiPromises.push(
        this.searchJobsJSearch(params)
          .then(result => ({ source: 'JSearch', ...result }))
          .catch(error => {
            console.warn('⚠️ JSearch API failed:', error);
            return { source: 'JSearch', data: [], count: 0 };
          })
      );
    }

    // Priority 2: Reed API (UK-focused, excellent for tech jobs)
    if (this.hasReedConfig()) {
      apiPromises.push(
        this.searchJobsReed(params)
          .then(result => ({ source: 'Reed', ...result }))
          .catch(error => {
            console.warn('⚠️ Reed API failed:', error);
            return { source: 'Reed', data: [], count: 0 };
          })
      );
    }

    // Priority 3: RemoteOK (Free, reliable for remote jobs)
    apiPromises.push(
      this.searchJobsRemoteOK()
        .then(result => ({ source: 'RemoteOK', ...result }))
        .catch(error => {
          console.warn('⚠️ RemoteOK API failed:', error);
          return { source: 'RemoteOK', data: [], count: 0 };
        })
    );

    // Execute all API calls in parallel
    const apiResults = await Promise.all(apiPromises);

    // Process results from all APIs
    for (const result of apiResults) {
      if (result.data.length > 0) {
        let transformedJobs: import('../types').Job[] = [];
        
        switch (result.source) {
          case 'JSearch':
            transformedJobs = result.data.map(job => this.transformJSearchJob(job as JSearchJob));
            break;
          case 'Reed':
            transformedJobs = result.data.map(job => this.transformReedJob(job as ReedJob));
            break;
          case 'RemoteOK':
            transformedJobs = result.data.map(job => this.transformRemoteOKJob(job as RemoteOKJob));
            break;
        }
        
        results.push(...transformedJobs);
        totalCount += result.count;
        apiSuccessCount++;
        console.log(`✅ ${result.source} contributed ${result.data.length} jobs`);
      }
    }

    // Enhanced fallback strategy
    if (results.length < 20) {
      console.log(`📈 API results (${results.length}) below threshold, supplementing with enhanced mock data`);
      const { mockJobs } = await import('../data/mockData');
      
      // Add mock jobs to reach at least 50 total jobs
      const neededJobs = Math.max(50 - results.length, 30);
      const supplementJobs = mockJobs.slice(0, neededJobs);
      results.push(...supplementJobs);
      totalCount += supplementJobs.length;
      
      console.log(`📊 Added ${supplementJobs.length} mock jobs for better user experience`);
    }

    // Remove duplicates based on title and company (more sophisticated matching)
    const uniqueJobs = results.filter((job, index, self) => {
      const normalizeString = (str: string) => str.toLowerCase().trim().replace(/[^\w\s]/g, '');
      const jobKey = `${normalizeString(job.title)}_${normalizeString(job.company)}`;
      
      return index === self.findIndex(j => {
        const jKey = `${normalizeString(j.title)}_${normalizeString(j.company)}`;
        return jKey === jobKey;
      });
    });

    // Enhanced sorting algorithm
    uniqueJobs.sort((a, b) => {
      // 1. Prioritize API jobs over mock jobs
      const aIsApi = !a.id.startsWith('mock_');
      const bIsApi = !b.id.startsWith('mock_');
      
      if (aIsApi && !bIsApi) return -1;
      if (!aIsApi && bIsApi) return 1;
      
      // 2. Featured jobs first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // 3. Hot jobs next
      if (a.isHot && !b.isHot) return -1;
      if (!a.isHot && b.isHot) return 1;
      
      // 4. AI match score (higher is better)
      if (a.aiMatchScore && b.aiMatchScore) {
        if (a.aiMatchScore !== b.aiMatchScore) return b.aiMatchScore - a.aiMatchScore;
      }
      
      // 5. Salary (higher is better)
      const aSalary = a.salary.max || a.salary.min || 0;
      const bSalary = b.salary.max || b.salary.min || 0;
      if (aSalary !== bSalary) return bSalary - aSalary;
      
      // 6. Date posted (newer is better)
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

    const apiJobsCount = uniqueJobs.filter(job => !job.id.startsWith('mock_')).length;
    const mockJobsCount = uniqueJobs.filter(job => job.id.startsWith('mock_')).length;

    console.log('📊 Final Results Summary:');
    console.log(`  - Total unique jobs: ${uniqueJobs.length}`);
    console.log(`  - API jobs: ${apiJobsCount}`);
    console.log(`  - Mock jobs: ${mockJobsCount}`);
    console.log(`  - APIs that succeeded: ${apiSuccessCount}/${apiPromises.length}`);
    console.log(`  - Job sources: ${apiResults.filter(r => r.data.length > 0).map(r => r.source).join(', ')}`);

    return { data: uniqueJobs, count: uniqueJobs.length };
  }

  transformReedJob(reedJob: ReedJob): import('../types').Job {
    const description = reedJob.jobDescription.toLowerCase();
    const title = reedJob.jobTitle.toLowerCase();
    
    const relevantTechs = ['react', 'javascript', 'typescript', 'node', 'python', 'java', 'go', 'rust', 'angular', 'vue'];
    const matchCount = relevantTechs.filter(tech => 
      description.includes(tech) || title.includes(tech)
    ).length;
    
    const salaryBonus = reedJob.minimumSalary ? Math.min(10, reedJob.minimumSalary / 5000) : 0;
    const locationBonus = reedJob.locationName.toLowerCase().includes('london') ? 3 : 0;
    const aiMatchScore = Math.min(96, 60 + (matchCount * 6) + salaryBonus + locationBonus + Math.floor(Math.random() * 8));

    const noWhiteboard = description.includes('no whiteboard') || 
                        description.includes('practical coding') ||
                        description.includes('take home') ||
                        description.includes('pair programming') ||
                        description.includes('code review');
    
    const diversityFriendly = description.includes('diversity') ||
                             description.includes('inclusive') ||
                             description.includes('equal opportunity') ||
                             description.includes('underrepresented') ||
                             description.includes('belonging');

    const techKeywords = [
      'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript',
      'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'C#', 'Swift', 'Kotlin',
      'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'AWS', 'Azure', 'GCP',
      'Docker', 'Kubernetes', 'Git', 'Linux', 'GraphQL', 'REST', 'Next.js',
      'Express', 'Django', 'Flask', 'Spring', 'Laravel', '.NET'
    ];

    const detectedTech = techKeywords.filter(tech => 
      description.includes(tech.toLowerCase()) || title.includes(tech.toLowerCase())
    );

    const commonBenefits = [
      'Health insurance', 'Pension scheme', 'Flexible working', 
      'Professional development', 'Bonus scheme', 'Stock options',
      'Remote work', 'Cycle to work', 'Private healthcare', 'Life insurance'
    ];
    
    const detectedBenefits = commonBenefits.filter(benefit =>
      description.includes(benefit.toLowerCase())
    );

    const benefits = detectedBenefits.length 
      ? detectedBenefits 
      : ['Competitive package', 'Professional development', 'Flexible working'];

    return {
      id: `reed_${reedJob.jobId}`,
      title: reedJob.jobTitle,
      company: reedJob.employerName,
      companyLogo: undefined,
      location: reedJob.locationName,
      remote: reedJob.locationName.toLowerCase().includes('remote') || description.includes('remote'),
      type: 'full-time',
      salary: {
        min: reedJob.minimumSalary || 0,
        max: reedJob.maximumSalary || 0,
        currency: reedJob.currency || 'GBP'
      },
      description: reedJob.jobDescription,
      requirements: this.extractRequirements(reedJob.jobDescription),
      techStack: detectedTech.slice(0, 8),
      benefits: benefits.slice(0, 6),
      postedAt: new Date(reedJob.date),
      aiMatchScore,
      isHot: aiMatchScore > 85 && (reedJob.minimumSalary || 0) > 50000,
      noWhiteboard,
      diversityFriendly,
      featured: aiMatchScore > 90,
      externalUrl: reedJob.jobUrl
    };
  }

  transformRemoteOKJob(remoteOkJob: RemoteOKJob): import('../types').Job {
    let salaryMin = 0;
    let salaryMax = 0;
    
    if (remoteOkJob.salary) {
      const salaryMatch = remoteOkJob.salary.match(/\$?(\d+)k?-?\$?(\d+)?k?/i);
      if (salaryMatch) {
        salaryMin = parseInt(salaryMatch[1]) * (salaryMatch[1].length <= 2 ? 1000 : 1);
        salaryMax = salaryMatch[2] ? parseInt(salaryMatch[2]) * (salaryMatch[2].length <= 2 ? 1000 : 1) : salaryMin + 20000;
      }
    }

    const relevantTechs = ['react', 'javascript', 'typescript', 'node', 'python'];
    const jobTechs = remoteOkJob.tags.map(tag => tag.toLowerCase());
    const matchCount = relevantTechs.filter(tech => 
      jobTechs.some(jobTech => jobTech.includes(tech))
    ).length;
    const aiMatchScore = Math.min(95, 60 + (matchCount * 7) + Math.floor(Math.random() * 10));

    const description = remoteOkJob.description.toLowerCase();
    const noWhiteboard = description.includes('no whiteboard') || 
                        description.includes('practical coding') ||
                        description.includes('take home') ||
                        description.includes('pair programming');
    
    const diversityFriendly = description.includes('diversity') ||
                             description.includes('inclusive') ||
                             description.includes('equal opportunity') ||
                             description.includes('underrepresented');

    return {
      id: `remoteok_${remoteOkJob.id}`,
      title: remoteOkJob.position,
      company: remoteOkJob.company,
      companyLogo: remoteOkJob.company_logo || remoteOkJob.logo,
      location: 'Remote',
      remote: true,
      type: 'full-time',
      salary: {
        min: salaryMin,
        max: salaryMax || salaryMin + 30000,
        currency: 'USD'
      },
      description: remoteOkJob.description,
      requirements: this.extractRequirements(remoteOkJob.description),
      techStack: remoteOkJob.tags || [],
      benefits: ['Remote work', 'Flexible hours', 'Global team'],
      postedAt: new Date(remoteOkJob.epoch * 1000),
      aiMatchScore,
      isHot: aiMatchScore > 85,
      noWhiteboard,
      diversityFriendly,
      featured: aiMatchScore > 90,
      externalUrl: remoteOkJob.apply || remoteOkJob.url
    };
  }

  transformJSearchJob(jSearchJob: JSearchJob): import('../types').Job {
    const description = jSearchJob.job_description.toLowerCase();
    const title = jSearchJob.job_title.toLowerCase();
    
    const relevantTechs = ['react', 'javascript', 'typescript', 'node', 'python', 'java', 'go', 'rust'];
    const matchCount = relevantTechs.filter(tech => 
      description.includes(tech) || title.includes(tech)
    ).length;
    
    const salaryBonus = jSearchJob.job_min_salary ? Math.min(10, jSearchJob.job_min_salary / 10000) : 0;
    const remoteBonus = jSearchJob.job_is_remote ? 5 : 0;
    const aiMatchScore = Math.min(98, 65 + (matchCount * 5) + salaryBonus + remoteBonus + Math.floor(Math.random() * 8));

    const noWhiteboard = description.includes('no whiteboard') || 
                        description.includes('practical coding') ||
                        description.includes('take home') ||
                        description.includes('pair programming') ||
                        description.includes('code review');
    
    const diversityFriendly = description.includes('diversity') ||
                             description.includes('inclusive') ||
                             description.includes('equal opportunity') ||
                             description.includes('underrepresented') ||
                             description.includes('belonging');

    const techKeywords = [
      'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'JavaScript',
      'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'C#', 'Swift', 'Kotlin',
      'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'AWS', 'Azure', 'GCP',
      'Docker', 'Kubernetes', 'Git', 'Linux', 'GraphQL', 'REST', 'Next.js',
      'Express', 'Django', 'Flask', 'Spring', 'Laravel'
    ];

    const detectedTech = techKeywords.filter(tech => 
      description.includes(tech.toLowerCase()) || title.includes(tech.toLowerCase())
    );

    const allTechStack = [...new Set([
      ...(jSearchJob.job_required_skills || []),
      ...detectedTech
    ])];

    let jobType: 'full-time' | 'part-time' | 'contract' | 'internship' = 'full-time';
    const employmentType = jSearchJob.job_employment_type?.toLowerCase();
    if (employmentType?.includes('part')) jobType = 'part-time';
    else if (employmentType?.includes('contract') || employmentType?.includes('freelance')) jobType = 'contract';
    else if (employmentType?.includes('intern')) jobType = 'internship';

    const locationParts = [jSearchJob.job_city, jSearchJob.job_state, jSearchJob.job_country]
      .filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(', ') : 'Location not specified';

    const commonBenefits = [
      'Health insurance', 'Dental insurance', 'Vision insurance', 
      '401(k)', 'Paid time off', 'Flexible schedule', 'Remote work',
      'Professional development', 'Stock options', 'Bonus opportunities'
    ];
    
    const detectedBenefits = commonBenefits.filter(benefit =>
      description.includes(benefit.toLowerCase())
    );

    const benefits = jSearchJob.job_benefits?.length 
      ? jSearchJob.job_benefits 
      : detectedBenefits.length 
        ? detectedBenefits 
        : ['Competitive benefits package'];

    return {
      id: `jsearch_${jSearchJob.job_id}`,
      title: jSearchJob.job_title,
      company: jSearchJob.employer_name,
      companyLogo: jSearchJob.employer_logo,
      location: location,
      remote: jSearchJob.job_is_remote,
      type: jobType,
      salary: {
        min: jSearchJob.job_min_salary || 0,
        max: jSearchJob.job_max_salary || 0,
        currency: jSearchJob.job_salary_currency || 'USD'
      },
      description: jSearchJob.job_description,
      requirements: this.extractRequirements(jSearchJob.job_description),
      techStack: allTechStack.slice(0, 8),
      benefits: benefits.slice(0, 6),
      postedAt: new Date(jSearchJob.job_posted_at_timestamp * 1000),
      aiMatchScore,
      isHot: aiMatchScore > 85 && (jSearchJob.job_min_salary || 0) > 100000,
      noWhiteboard,
      diversityFriendly,
      featured: aiMatchScore > 90,
      externalUrl: jSearchJob.job_apply_link
    };
  }

  private extractRequirements(description: string): string[] {
    const requirements: string[] = [];
    const lines = description.split('\n');
    
    const requirementPatterns = [
      /(\d+\+?\s*years?\s+(?:of\s+)?experience)/i,
      /(bachelor'?s?\s+degree)/i,
      /(master'?s?\s+degree)/i,
      /(proficiency\s+in\s+[\w\s,]+)/i,
      /(experience\s+with\s+[\w\s,]+)/i,
      /(knowledge\s+of\s+[\w\s,]+)/i,
      /(familiar\s+with\s+[\w\s,]+)/i,
      /(strong\s+[\w\s]+\s+skills)/i
    ];

    lines.forEach(line => {
      requirementPatterns.forEach(pattern => {
        const match = line.match(pattern);
        if (match && requirements.length < 5) {
          const requirement = match[0].trim();
          if (requirement.length > 10 && requirement.length < 100) {
            requirements.push(requirement);
          }
        }
      });
    });

    if (requirements.length === 0) {
      requirements.push(
        'Strong problem-solving skills',
        'Excellent communication abilities',
        'Team collaboration experience'
      );
    }

    return requirements.slice(0, 5);
  }
}

export const jobApi = new JobApiService();
export type { JobSearchParams, JSearchJob, RemoteOKJob, ReedJob };