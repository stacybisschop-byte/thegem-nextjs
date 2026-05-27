import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (
    !process.env.SANITY_REVALIDATE_SECRET ||
    secret !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return Response.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/llms.txt')
  revalidatePath('/llms-full.txt')

  return Response.json({
    revalidated: true,
    paths: ['/llms.txt', '/llms-full.txt'],
    now: Date.now(),
  })
}
