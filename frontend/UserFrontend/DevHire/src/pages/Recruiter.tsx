import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';

const Recruiter: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useJobStore();
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    title: '',
    requirements: '',
    benefits: '',
    durationDays: ''
  });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const inputClasses =
    'w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30';

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      setMessage('请先登录招聘者账号，然后再发布招聘信息。');
      return;
    }

    if (user.role !== 'recruiter') {
      setMessage('您不是招聘者，无法发布招聘信息。');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiter_user_id: Number(user.id),
          company_name: formData.companyName,
          address: formData.address,
          title: formData.title,
          requirements: formData.requirements,
          benefits: formData.benefits,
          duration_days: Number(formData.durationDays)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || '등록에 실패했습니다.');
      }

      setMessage('发表成功，招聘信息正在等待管理员审核。');
      setFormData({
        companyName: '',
        address: '',
        title: '',
        requirements: '',
        benefits: '',
        durationDays: ''
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '无法连接后端服务器。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 rounded-lg glass-card dark:glass-card-dark text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700"
      >
        ← 뒤로 가기
      </button>

      <section className="glass-card dark:glass-card-dark rounded-3xl border border-white/20 dark:border-gray-700/50 p-6 md:p-10 shadow-2xl">
        <div className="mb-8">
          <p className="text-primary-500 dark:text-primary-400 font-semibold mb-2">
            채용자
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
            채용정보 등록   
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              회사 이름
            </span>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(event) => updateField('companyName', event.target.value)}
              placeholder="회사 이름을 입력하세요"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              주소
            </span>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(event) => updateField('address', event.target.value)}
              placeholder="회사 또는 근무지를 입력하세요"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              채용 직무
            </span>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="채용 직무를 입력하세요"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              채용 조건
            </span>
            <textarea
              rows={4}
              required
              value={formData.requirements}
              onChange={(event) => updateField('requirements', event.target.value)}
              placeholder="경력, 기술 역량 등 채용 조건을 입력하세요"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              혜택 조건
            </span>
            <textarea
              rows={4}
              required
              value={formData.benefits}
              onChange={(event) => updateField('benefits', event.target.value)}
              placeholder="언어 능력, 자격증 또는 관련 경력 등 혜택 조건을 입력하세요"
              className={inputClasses}
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              채용 기간
            </span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="3650"
                required
                value={formData.durationDays}
                onChange={(event) => updateField('durationDays', event.target.value)}
                placeholder="예: 60, 100"
                className={inputClasses}
              />
              <span className="shrink-0 text-gray-700 dark:text-gray-200">일</span>
            </div>
          </label>

          {message && (
            <p className="rounded-xl bg-primary-500/10 px-4 py-3 text-center text-primary-600 dark:text-primary-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl gradient-bg px-6 py-4 font-semibold text-white shadow-lg"
          >
            {submitting ? '등록 중...' : '채용 공고 등록'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Recruiter;
