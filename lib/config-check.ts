import { isDemoMode } from './demo-mode'

export interface ConfigStatus {
  isConfigured: boolean
  missingVars: string[]
  allVars: string[]
  isDemoMode: boolean
}

export function checkConfiguration(): ConfigStatus {
  // Check if demo mode is enabled (remove this check for production-only builds)
  if (isDemoMode()) {
    return {
      isConfigured: true,
      missingVars: [],
      allVars: [],
      isDemoMode: true
    }
  }

  const requiredVars = [
    'NEXT_PUBLIC_DRUPAL_BASE_URL',
    'DRUPAL_CLIENT_ID', 
    'DRUPAL_CLIENT_SECRET',
    'DRUPAL_REVALIDATE_SECRET'
  ]

  const missingVars = requiredVars.filter(varName => {
    const value = process.env[varName]
    return !value || value.includes('your-') || value === 'your-site.ddev.site'
  })

  return {
    isConfigured: missingVars.length === 0,
    missingVars,
    allVars: requiredVars,
    isDemoMode: false
  }
}