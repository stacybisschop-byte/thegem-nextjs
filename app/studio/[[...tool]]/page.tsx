/**
 * The /studio route serves the embedded Sanity Studio.
 * Visit http://localhost:3000/studio in development.
 * On Vercel, it is accessible at yourdomain.com/studio.
 *
 * Access is controlled by Sanity's own authentication.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
