import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JobAnnouncement {
  id: number | string;
  company: string;
  position: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits?: string;
  durationDays?: number;
}

interface ApprovedJobResponse {
  id: number;
  company_name: string;
  address: string;
  title: string;
  requirements: string;
  benefits: string;
  duration_days: number;
}

const jobAnnouncements: JobAnnouncement[] = [
  {
    id: 1,
    company: 'NAVER',
    position: 'Frontend Developer',
    location: 'Seongnam, Korea',
    employmentType: '정규직',
    experience: '경력 2년 이상',
    salary: '연봉 5,000만 원 이상',
    description: '네이버의 검색 및 콘텐츠 서비스를 함께 개발할 프론트엔드 개발자를 모집합니다.',
    requirements: [
      'React와 TypeScript를 활용한 서비스 개발 경험',
      'REST API 연동 및 반응형 웹 개발 경험',
      'Git을 활용한 협업 경험'
    ]
  },
  {
    id: 2,
    company: 'Kakao',
    position: 'Backend Developer',
    location: 'Jeju, Korea',
    employmentType: '정규직',
    experience: '경력 3년 이상',
    salary: '연봉 6,000만 원 이상',
    description: '카카오 서비스의 안정적인 운영과 성능 개선을 담당할 백엔드 개발자를 모집합니다.',
    requirements: [
      'Java 또는 Kotlin 기반 서버 개발 경험',
      'Spring Boot와 관계형 데이터베이스 사용 경험',
      '대용량 트래픽 처리 및 시스템 설계 경험'
    ]
  },
  {
    id: 3,
    company: 'Toss',
    position: 'Full Stack Developer',
    location: 'Seoul, Korea',
    employmentType: '정규직',
    experience: '경력 3년 이상',
    salary: '면접 후 결정',
    description: '사용자가 편리하고 안전하게 이용할 수 있는 핀테크 서비스를 개발할 풀스택 개발자를 찾고 있습니다.',
    requirements: [
      'React와 Node.js를 사용한 웹 서비스 개발 경험',
      'API 설계 및 데이터베이스 모델링 경험',
      '제품 개선을 위해 주도적으로 문제를 해결하는 역량'
    ]
  },
  {
    id: 4,
    company: 'Coupang',
    position: 'Software Engineer',
    location: 'Seoul, Korea',
    employmentType: '정규직',
    experience: '신입 또는 경력',
    salary: '연봉 5,500만 원 이상',
    description: '쿠팡의 주문 및 배송 시스템을 개발하고 서비스 품질을 개선할 소프트웨어 엔지니어를 모집합니다.',
    requirements: [
      'Java, Python 또는 Go 중 하나 이상의 언어 활용 능력',
      '자료구조와 알고리즘에 대한 기본 지식',
      '클라우드 환경과 분산 시스템에 대한 관심'
    ]
  }
];
const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobAnnouncement[]>(jobAnnouncements);

  useEffect(() => {
    const loadApprovedJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/jobs');

        if (!response.ok) return;

        const approvedJobs: ApprovedJobResponse[] = await response.json();
        const mappedJobs = approvedJobs.map((job) => ({
          id: `approved-${job.id}`,
          company: job.company_name,
          position: job.title,
          location: job.address,
          employmentType: '승인된 채용 공고',
          experience: '채용 조건 확인',
          salary: `${job.duration_days}일 동안 모집`,
          description: job.requirements,
          requirements: job.requirements
            .split('\n')
            .map((requirement) => requirement.trim())
            .filter(Boolean),
          benefits: job.benefits,
          durationDays: job.duration_days
        }));

        setJobs([...mappedJobs, ...jobAnnouncements]);
      } catch {
        setJobs(jobAnnouncements);
      }
    };

    loadApprovedJobs();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 rounded-lg glass-card dark:glass-card-dark text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700"
      >
        ← 뒤로 가기
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          개발자 채용 공고
        </h1>
        <p className="text-gray-400">
          개발자를 모집하고 있는 회사를 확인해 보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="glass-card dark:glass-card-dark p-6 rounded-2xl border border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-purple-400 font-semibold">
                  {job.company}
                </p>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {job.position}
                </h2>
              </div>
              <span className="text-xs text-green-400">
                Recruiting
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {job.location}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300">
                {job.employmentType}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300">
                {job.experience}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300">
                {job.salary}
              </span>
            </div>

            <p className="text-gray-300 mb-4">
              {job.description}
            </p>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2">지원 자격</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {job.requirements.map((requirement) => (
                  <li key={requirement}>• {requirement}</li>
                ))}
              </ul>
            </div>

            {job.benefits && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">우대 조건</h3>
                <p className="text-sm text-gray-400">{job.benefits}</p>
              </div>
            )}

            <button className="px-5 py-2 rounded-lg gradient-bg text-white">
              자세히 보기
            </button>
          </article>
        ))}
      </div>
    </main>
  );
};
export default Jobs;