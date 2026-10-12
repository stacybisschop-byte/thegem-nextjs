'use client'

import { useEffect, useState } from 'react'
import styles from './ArticleTools.module.css'

interface Props {
  author: string
  title: string
  url: string
  // Pre-formatted on the server in Europe/London so the date matches the byline.
  publishedYear: string
  publishedDayMonth: string
}

function CopyRow({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — the text is still selectable by hand.
    }
  }

  return (
    <div className={styles.citeRow}>
      <div className={styles.citeRowHead}>
        <span className={styles.citeLabel}>{label}</span>
        <button type="button" className={styles.copyButton} onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className={styles.citeText}>{text}</p>
    </div>
  )
}

export default function CiteArticle({ author, title, url, publishedYear, publishedDayMonth }: Props) {
  // "Accessed" is the reader's today. The page is statically cached, so this
  // must be computed in the browser, after hydration, to avoid a stale date.
  const [accessed, setAccessed] = useState('')
  useEffect(() => {
    setAccessed(
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    )
  }, [])

  const harvard =
    `${author} (${publishedYear}) '${title}', The Gem, ${publishedDayMonth}. ` +
    `Available at: ${url}` +
    (accessed ? ` (Accessed: ${accessed}).` : '.')
  const htmlLink = `<a href="${url}">${title}</a>`

  return (
    <section className={styles.cite} aria-labelledby="cite-heading">
      <h2 id="cite-heading" className={styles.citeHeading}>Cite this article</h2>
      <p className={styles.citeIntro}>
        Referencing this piece in your own writing, coursework or blog? Copy a ready-made
        citation or link.
      </p>
      <CopyRow label="Harvard" text={harvard} />
      <CopyRow label="HTML link" text={htmlLink} />
    </section>
  )
}
