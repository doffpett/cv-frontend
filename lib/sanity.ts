import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'dftazm12', // ← bytt ut med ditt faktiske prosjekt-ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
})
