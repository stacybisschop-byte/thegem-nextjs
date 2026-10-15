import Image from 'next/image'
import { parse } from 'yaml'
import styles from './ProductGrid.module.css'

// Rendered from a ```products fenced block in article markdown. The block
// holds a YAML list of items; anything malformed is skipped rather than
// allowed to break the article page.

export interface ProductItem {
  name: string
  price: string
  image: string
  url: string
  maker?: string
  alt?: string
}

function warn(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') console.warn('[ProductGrid]', ...args)
}

function text(value: unknown): string | undefined {
  if (typeof value === 'string') return value.trim() || undefined
  if (typeof value === 'number') return String(value)
  return undefined
}

// Only images next/image can serve: files in public/ or the Sanity CDN
// (already in next.config remotePatterns). Anything else would throw.
function isAllowedImage(src: string): boolean {
  return (src.startsWith('/') && !src.startsWith('//')) || src.startsWith('https://cdn.sanity.io/')
}

function toItem(raw: unknown, index: number): ProductItem | null {
  if (!raw || typeof raw !== 'object') {
    warn(`item ${index} is not an object, skipped`)
    return null
  }
  const r = raw as Record<string, unknown>
  const item = {
    name: text(r.name),
    price: text(r.price),
    image: text(r.image),
    url: text(r.url),
    maker: text(r.maker),
    alt: text(r.alt),
  }
  const missing = (['name', 'price', 'image', 'url'] as const).filter((k) => !item[k])
  if (missing.length) {
    warn(`item ${index} missing ${missing.join(', ')}, skipped`)
    return null
  }
  if (!isAllowedImage(item.image!)) {
    warn(`item ${index} image must be a /public path or cdn.sanity.io URL, skipped`)
    return null
  }
  if (!/^https?:\/\//.test(item.url!)) {
    warn(`item ${index} url must be http(s), skipped`)
    return null
  }
  return item as ProductItem
}

export function parseProducts(source: string): ProductItem[] {
  let data: unknown
  try {
    data = parse(source)
  } catch (err) {
    warn('YAML did not parse, block skipped:', err instanceof Error ? err.message : err)
    return []
  }
  if (!Array.isArray(data)) {
    warn('block is not a YAML list, skipped')
    return []
  }
  return data.map(toItem).filter((item): item is ProductItem => item !== null)
}

export default function ProductGrid({ items }: { items: ProductItem[] }) {
  if (!items.length) return null

  return (
    <div className={items.length === 1 ? `${styles.grid} ${styles.single}` : styles.grid}>
      {items.map((item) => (
        <figure key={`${item.url}-${item.name}`} className={styles.item}>
          <a
            href={item.url}
            target="_blank"
            rel="sponsored noopener"
            className={styles.image}
          >
            <Image
              src={item.image}
              alt={item.alt ?? item.name}
              fill
              sizes="(max-width: 720px) 50vw, 320px"
              style={{ objectFit: 'contain' }}
            />
          </a>
          <figcaption>
            <a href={item.url} target="_blank" rel="sponsored noopener" className={styles.name}>
              — {item.name}
            </a>
            <span className={styles.meta}>
              {item.maker ? `${item.maker} · ${item.price}` : item.price}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
