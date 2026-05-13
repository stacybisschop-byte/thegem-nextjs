'use client'

import { useState } from 'react'

// Wire BEEHIIV_PUBLICATION_ID in .env.local and update the action URL.
// Current: demo only.

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: POST to Beehiiv embed endpoint.
    // fetch(`https://embeds.beehiiv.com/subscriptions`, { method: 'POST', ... })
    setSubmitted(true)
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
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="your@email.com" aria-label="Email address" required />
          <button type="submit">Subscribe</button>
        </form>
      )}
      <small>No spam. Unsubscribe whenever.</small>
    </section>
  )
}
