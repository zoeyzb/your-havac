
export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalImage {
  url: string
  alt: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

export interface DrupalArticle extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: {
    url: string
    alt?: string
    width?: number
    height?: number
    variations?: Array<{
      name: string
      url: string
      width: number
      height: number
    }>
  }
}

export interface ArticleTeaserData {
  nodeArticles: {
    nodes: DrupalArticle[]
  }
}

export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  featuresTitle?: string
  featuresSubtitle?: string
  featuresItems?: DrupalFeature[]
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface DrupalFeature {
  id: string
  title: string
  description?: {
    processed: string
  }
  icon?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
export interface DrupalService {
  id: string
  title: string
  path?: string
  body?: { processed: string; summary?: string }
  image?: { url: string; alt: string; width?: number; height?: number; variations?: { name: string; url: string; width: number; height: number }[] }
}

export interface ServicesData {
  nodeServices: {
    nodes: DrupalService[]
  }
}

export interface DrupalServiceArea {
  id: string
  title: string
  path?: string
  body?: { processed: string; summary?: string }
  zipCodes?: string
  image?: { url: string; alt: string; width?: number; height?: number; variations?: { name: string; url: string; width: number; height: number }[] }
}

export interface ServiceAreasData {
  nodeServiceAreas: {
    nodes: DrupalServiceArea[]
  }
}

export interface DrupalTestimonial {
  id: string
  title: string
  path?: string
  body?: { processed: string; summary?: string }
  clientName?: string
  serviceReceived?: string
  rating?: number
  photo?: { url: string; alt: string; width?: number; height?: number; variations?: { name: string; url: string; width: number; height: number }[] }
}

export interface TestimonialsData {
  nodeTestimonials: {
    nodes: DrupalTestimonial[]
  }
}
