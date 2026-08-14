import { useCallback, useEffect, useState } from 'react'
import './App.css'

interface PendingJob {
  id: number
  company_name: string
  address: string
  title: string
  requirements: string
  benefits: string
  duration_days: number
  created_at: string
}

function App() {
  const [jobs, setJobs] = useState<PendingJob[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadPendingJobs = useCallback(async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://127.0.0.1:8000/jobs/pending')

      if (!response.ok) {
        throw new Error('待审核内容加载失败')
      }

      setJobs(await response.json())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '无法连接后端服务器')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPendingJobs()
  }, [loadPendingJobs])

  const reviewJob = async (jobId: number, decision: 'approved' | 'rejected') => {
    setMessage('')

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/jobs/${jobId}/review`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ decision }),
        },
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.detail || '审核操作失败')
      }

      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId))
      setMessage(decision === 'approved' ? '已接受该招聘公告' : '已拒绝该招聘公告')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '无法连接后端服务器')
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">JobFit Admin</p>
          <h1>招聘公告审核</h1>
          <p className="subtitle">审核招聘者新发布的职位信息</p>
        </div>
        <button className="refresh-button" type="button" onClick={loadPendingJobs}>
          刷新
        </button>
      </header>

      {message && <div className="message">{message}</div>}

      {loading ? (
        <div className="empty-state">正在加载待审核内容...</div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">目前没有待审核的招聘公告</div>
      ) : (
        <section className="review-grid">
          {jobs.map((job) => (
            <article className="review-card" key={job.id}>
              <div className="card-heading">
                <div>
                  <span className="status">待审核</span>
                  <h2>{job.title}</h2>
                  <p className="company">{job.company_name}</p>
                </div>
                <span className="duration">{job.duration_days} 天</span>
              </div>

              <dl>
                <div>
                  <dt>地址</dt>
                  <dd>{job.address}</dd>
                </div>
                <div>
                  <dt>招聘条件</dt>
                  <dd>{job.requirements}</dd>
                </div>
                <div>
                  <dt>优待条件</dt>
                  <dd>{job.benefits}</dd>
                </div>
                <div>
                  <dt>发布时间</dt>
                  <dd>{new Date(job.created_at).toLocaleString()}</dd>
                </div>
              </dl>

              <div className="actions">
                <button
                  className="reject-button"
                  type="button"
                  onClick={() => reviewJob(job.id, 'rejected')}
                >
                  拒绝
                </button>
                <button
                  className="approve-button"
                  type="button"
                  onClick={() => reviewJob(job.id, 'approved')}
                >
                  接受
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
