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
          <p style={styles.description}>Sign in to access the admin panel</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

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

        <form onSubmit={handleEmailLogin}>
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
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(loading ? styles.disabledButton : {}),
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
