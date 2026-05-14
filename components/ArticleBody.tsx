import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  body: string
}

// Strip the frontmatter markers if the body string accidentally contains them
function stripFrontmatter(md: string): string {
  const match = md.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
  return match ? match[1] : md
}

// Strip a leading H1 — the article hero already renders the title.
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+[^\n]+\n+/, '')
}

// Extract FAQ pairs for JSON-LD structured data
export function extractFAQs(body: string): Array<{ question: string; answer: string }> {
  const faqSection = body.match(/## Frequently asked questions\n([\s\S]*?)(?=\n##|$)/i)
  if (!faqSection) return []

  const pairs: Array<{ question: string; answer: string }> = []
  const questionBlocks = faqSection[1].split(/\n### /).filter(Boolean)

  for (const block of questionBlocks) {
    const lines = block.trim().split('\n')
    const question = lines[0].replace(/^### /, '').trim()
    const answer = lines.slice(1).join('\n').trim()
    if (question && answer) {
      pairs.push({ question, answer })
    }
  }
  return pairs
}

export default function ArticleBody({ body }: Props) {
  const cleaned = stripLeadingH1(stripFrontmatter(body))

  return (
    <div className="article-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Open external links in new tab
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http')
            return (
              <a
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
              >
                {children}
              </a>
            )
          },
          // Style tables
          table: ({ children, ...props }) => (
            <div style={{ overflowX: 'auto', marginBottom: '1.5em' }}>
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </div>
  )
}
