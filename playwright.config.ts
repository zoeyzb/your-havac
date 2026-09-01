import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3001',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'NODE_TLS_REJECT_UNAUTHORIZED=0 PORT=3001 npx next start -p 3001',
    port: 3001,
    reuseExistingServer: true,
    timeout: 30000,
  },
})
