import { MetadataRoute } from 'next'
import { generateSitemapData } from '../utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapData()
} 