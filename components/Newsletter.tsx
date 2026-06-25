'use client'

import { useState } from 'react'
export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="kicker">The Gem, in your inbox · every Friday</div>
      <h2>One letter from <em>Florence</em>, every Friday morning.</h2>
      <p>
        A long piece worth reading, three things worth knowing, one thing worth buying.
        Free. No nonsense. Roughly twelve minutes of your week.
      </p>
      {submitted ? (
        <p style={{ fontSize: 18, color: 'var(--gold)' }}>You&rsquo;re in. See you Friday.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="your@email.com" aria-label="Email address" required />
            <button type="submit" disabled={loading}>{loading ? 'Subscribing…' : 'Subscribe'}</button>
          </form>
          {error && <p style={{ color: 'var(--error, #c0392b)', marginTop: 8 }}>{error}</p>}
        </>
      )}
      <small>No spam. Unsubscribe whenever.</small>
    </section>
  )
}
