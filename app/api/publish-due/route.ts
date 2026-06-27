import { createClient } from '@sanity/client'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

// This route flips `published: true` on any article whose scheduled
// `publishedAt` date has arrived but is still unpublished. It is meant to be
// driven by the daily Vercel Cron defined in vercel.json — there is no other
// scheduler in this project, so without it future-dated posts never go live.
export const dynamic = 'force-dynamic'

// Write-scoped client. The public read client in lib/sanity.ts carries no token;
// mutations need SANITY_API_TOKEN (set in Vercel env, never in the client bundle).
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

interface DueArticle {
  _id: string
  title: string
  pillar: string
  slug: { current: string }
  publishedAt: string
}

export async function GET(req: NextRequest) {
  const now = new Date().toISOString()
  console.log(`[publish-due] invoked at ${now}`)

  // Vercel Cron attaches `Authorization: Bearer $CRON_SECRET` when CRON_SECRET
  // is set in project env. Reject anything that doesn't match.
  const auth = req.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log('[publish-due] auth failed — header:', auth?.slice(0, 20) ?? 'missing')
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.log('[publish-due] SANITY_API_TOKEN not set')
    return Response.json(
      { error: 'SANITY_API_TOKEN is not configured' },
      { status: 500 }
    )
  }

  try {
    const due = await writeClient.fetch<DueArticle[]>(
      `*[_type == "article" && published == false && defined(publishedAt) && publishedAt <= now()]{
        _id, title, pillar, slug, publishedAt
      } | order(publishedAt asc)`
    )

    console.log(`[publish-due] ${due.length} due article(s):`, due.map(d => d._id))

    const published: Array<{ id: string; title: string; path: string }> = []

    for (const doc of due) {
      await writeClient.patch(doc._id).set({ published: true }).commit()
      const pillar = (doc.pillar ?? '').toLowerCase()
      const slug = doc.slug?.current ?? doc._id
      const path = `/${pillar}/${slug}`
      revalidatePath(path)
      published.push({ id: doc._id, title: doc.title, path })
      console.log(`[publish-due] published ${doc._id} → ${path}`)
    }

    // Bust the listing/index caches only when something actually changed.
    if (published.length > 0) {
      for (const path of ['/', '/stories', '/guides', '/style', '/archive', '/rss']) {
        revalidatePath(path)
      }
    }

    return Response.json({ publishedCount: published.length, published })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[publish-due] error:', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
