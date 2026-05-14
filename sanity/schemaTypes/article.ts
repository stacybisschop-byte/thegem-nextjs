import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL-safe identifier. No pillar prefix — just the article slug (e.g. princess-diana-jewellery).',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Stories', value: 'Stories' },
          { title: 'Guides', value: 'Guides' },
          { title: 'Style', value: 'Style' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Florence',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed',
      type: 'date',
    }),

    // SEO
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Keep under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Meta title should be under 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Keep under 160 characters.',
      validation: (Rule) => Rule.max(160).warning('Meta description should be under 160 characters.'),
    }),

    // Hero
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL (placeholder)',
      type: 'url',
      description: 'Temporary external image URL. Overridden once licensed photography is uploaded above.',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt (placeholder)',
      type: 'string',
      description: 'Alt text for the placeholder image URL.',
    }),
    defineField({
      name: 'heroImageBrief',
      title: 'Photography Brief',
      type: 'text',
      rows: 3,
      description: 'Brief for the photo editor or licensed image selection. Not published.',
    }),

    // Kicker
    defineField({
      name: 'kickerExtra',
      title: 'Kicker Subtitle',
      type: 'string',
      description: 'Shown as "Pillar · Kicker" in the article header (e.g. "Royal Jewellery", "Considered Buying", "A Reclamation").',
    }),

    // Body — stored as Markdown. The frontend renders via react-markdown.
    // This makes migration of the existing 26 Markdown files trivial.
    // You can migrate to Portable Text later for a richer editing experience.
    defineField({
      name: 'body',
      title: 'Body (Markdown)',
      type: 'text',
      rows: 40,
      description: 'Article body in Markdown. Paste from the .md source files. Rendered on the frontend via react-markdown.',
      validation: (Rule) => Rule.required(),
    }),

    // Affiliate disclosure
    defineField({
      name: 'affiliateDisclosure',
      title: 'Affiliate Disclosure',
      type: 'boolean',
      initialValue: false,
      description: 'Show the affiliate disclosure note on this article.',
    }),

    // Homepage featuring
    defineField({
      name: 'featured',
      title: 'Featured (Homepage Latest)',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this article in the homepage Latest grid.',
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      description: '1 = large card, 2 and 3 = medium cards. Only relevant when Featured is true.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      pillar: 'pillar',
      published: 'published',
      media: 'heroImage',
    },
    prepare({ title, pillar, published, media }) {
      return {
        title,
        subtitle: `${pillar}${published ? '' : ' · Draft'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Pillar',
      name: 'pillarAsc',
      by: [{ field: 'pillar', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
