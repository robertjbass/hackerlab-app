'use client'

import { useRouter } from 'next/navigation'
import { useState, type CSSProperties } from 'react'
import { Github } from 'lucide-react'
import { signInWithGitHub } from '@/app/(payload)/admin/login/actions'

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '320px',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
  },
  subtitle: {
    marginTop: '6px',
    fontSize: '13px',
    color: '#a1a1aa',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '14px',
    color: '#f87171',
    marginBottom: '16px',
  },
  githubButton: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  divider: {
    position: 'relative',
    margin: '20px 0',
    textAlign: 'center',
  },
  dividerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: '#3f3f46',
  },
  dividerText: {
    position: 'relative',
    display: 'inline-block',
    padding: '0 12px',
    backgroundColor: 'var(--theme-bg, #141414)',
    color: '#71717a',
    fontSize: '13px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#d4d4d8',
  },
  input: {
    width: '100%',
    padding: '9px 11px',
    backgroundColor: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '100%',
    padding: '9px 14px',
    backgroundColor: '#059669',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '4px',
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

export function CustomLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.errors?.[0]?.message || 'Invalid credentials')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Sign in to access the admin panel</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form action={signInWithGitHub}>
          <button
            type="submit"
            style={styles.githubButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#3f3f46')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#27272a')
            }
          >
            <Github size={20} />
            Continue with GitHub
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or sign in with email</span>
        </div>

        <form onSubmit={handleEmailLogin} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="you@example.com"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#059669')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#3f3f46')}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#059669')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#3f3f46')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {}),
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#10b981'
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#059669'
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
