'use client'

import { useRouter } from 'next/navigation'
import { useState, type CSSProperties } from 'react'
import { Github } from '@/components/icons'
import { signInWithGitHub } from '@/app/(payload)/admin/login/actions'

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  } satisfies CSSProperties,
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    padding: '2rem',
  } satisfies CSSProperties,
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  } satisfies CSSProperties,
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
    marginBottom: '0.5rem',
  } satisfies CSSProperties,
  description: {
    color: '#6b7280',
    margin: 0,
    fontSize: '0.875rem',
  } satisfies CSSProperties,
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    padding: '0.75rem',
    marginBottom: '1rem',
    color: '#dc2626',
    fontSize: '0.875rem',
  } satisfies CSSProperties,
  success: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '6px',
    padding: '0.75rem',
    marginBottom: '1rem',
    color: '#16a34a',
    fontSize: '0.875rem',
  } satisfies CSSProperties,
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  } satisfies CSSProperties,
  outlineButton: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    color: '#374151',
  } satisfies CSSProperties,
  primaryButton: {
    backgroundColor: '#4f46e5',
    border: '1px solid #4f46e5',
    color: '#fff',
  } satisfies CSSProperties,
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  } satisfies CSSProperties,
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    gap: '0.75rem',
  } satisfies CSSProperties,
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
  } satisfies CSSProperties,
  dividerText: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
  } satisfies CSSProperties,
  formGroup: {
    marginBottom: '1rem',
  } satisfies CSSProperties,
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '0.375rem',
    color: '#374151',
  } satisfies CSSProperties,
  input: {
    width: '100%',
    padding: '0.625rem 0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  toggleLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#4f46e5',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
  } satisfies CSSProperties,
}

export function CustomLoginForm() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
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

  async function handleEmailRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })

      if (res.ok) {
        setSuccess('Account created! You can now sign in.')
        setMode('login')
        setPassword('')
        setConfirmPassword('')
      } else {
        const data = await res.json()
        setError(data.errors?.[0]?.message || 'Registration failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setSuccess('')
    setName('')
    setPassword('')
    setConfirmPassword('')
  }

  const isLogin = mode === 'login'

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{isLogin ? 'Admin Login' : 'Create Account'}</h1>
          <p style={styles.description}>
            {isLogin ? 'Sign in to access the admin panel' : 'Register for a new account'}
          </p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {isLogin && (
          <>
            <form action={signInWithGitHub}>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.outlineButton }}
              >
                <Github style={{ width: 20, height: 20 }} />
                Continue with GitHub
              </button>
            </form>

            <div style={styles.divider}>
              <div style={styles.dividerLine} />
              <span style={styles.dividerText}>or sign in with email</span>
              <div style={styles.dividerLine} />
            </div>
          </>
        )}

        <form onSubmit={isLogin ? handleEmailLogin : handleEmailRegister}>
          {!isLogin && (
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={8}
            />
          </div>

          {!isLogin && (
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
                minLength={8}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(loading ? styles.disabledButton : {}),
            }}
          >
            {loading
              ? isLogin
                ? 'Signing in...'
                : 'Creating account...'
              : isLogin
                ? 'Sign in'
                : 'Create Account'}
          </button>
        </form>

        <button type="button" onClick={toggleMode} style={styles.toggleLink}>
          {isLogin ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
