import { NextRequest, NextResponse } from 'next/server'

const PUB_ID = 'pub_eec7898d-1b41-452a-965a-69c83fdcb6b9'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, reactivate_existing: true, send_welcome_email: true }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error('Beehiiv error', res.status, text)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
