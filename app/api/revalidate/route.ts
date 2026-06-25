import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return Response.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({})) as {
    pillar?: string
    slug?: string | { current?: string }
    _type?: string
  }

  const pillar = typeof body.pillar === 'string' ? body.pillar.toLowerCase() : null
  const slug =
    typeof body.slug === 'string'
      ? body.slug
      : body.slug?.current ?? null

  const paths = new Set<string>([
    '/',
    '/stories',
    '/guides',
    '/style',
    '/archive',
    '/rss',
    '/llms.txt',
    '/llms-full.txt',
  ])

  if (pillar && slug && ['stories', 'guides', 'style'].includes(pillar)) {
    paths.add(`/${pillar}/${slug}`)
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  if (process.env.INDEXNOW_KEY) {
    const key = process.env.INDEXNOW_KEY
    const urlList = Array.from(paths).map(p => `https://thegem.press${p}`)
    fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'thegem.press',
        key,
        keyLocation: `https://thegem.press/${key}.txt`,
        urlList,
      }),
    }).catch(() => {})
  }

  return Response.json({
    revalidated: true,
    paths: Array.from(paths),
    now: Date.now(),
  })
}
