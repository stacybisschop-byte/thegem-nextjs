import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'the-gem',
  title: 'The Gem',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('All Articles')
              .child(S.documentList().title('All Articles').filter('_type == "article"')),
            S.divider(),
            S.listItem()
              .title('Stories')
              .child(S.documentList().title('Stories').filter('_type == "article" && pillar == "Stories"')),
            S.listItem()
              .title('Guides')
              .child(S.documentList().title('Guides').filter('_type == "article" && pillar == "Guides"')),
            S.listItem()
              .title('Style')
              .child(S.documentList().title('Style').filter('_type == "article" && pillar == "Style"')),
            S.divider(),
            S.listItem()
              .title('Drafts')
              .child(S.documentList().title('Drafts').filter('_type == "article" && published == false')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
