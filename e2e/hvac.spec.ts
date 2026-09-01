import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with CMS content', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Your Comfort Is Our Priority')
    await expect(page.locator('text=Expert Heating & Cooling Solutions')).toBeVisible()
  })

  test('renders CTA section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Need HVAC Service?')).toBeVisible()
  })

  test('has navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/services"]').first()).toBeVisible()
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible()
  })
})

test.describe('Services', () => {
  test('listing page shows services from Drupal', async ({ page }) => {
    await page.goto('/services')
    await expect(page.locator('h1')).toContainText('Our Services')
    await expect(page.getByRole('heading', { name: 'Air Conditioning' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Heating Systems' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Preventive Maintenance' })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Duct Cleaning/ })).toBeVisible()
  })

  test('detail page renders service content', async ({ page }) => {
    await page.goto('/services/air-conditioning')
    await expect(page.locator('h1')).toContainText('Air Conditioning')
    await expect(page.locator('text=Stay cool all summer')).toBeVisible()
  })
})

test.describe('Service Areas', () => {
  test('listing page shows areas from Drupal', async ({ page }) => {
    await page.goto('/service-areas')
    await expect(page.locator('h1')).toContainText('Service Areas')
    await expect(page.getByRole('heading', { name: 'North County' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'South County' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'East Metro' })).toBeVisible()
  })

  test('detail page renders area content', async ({ page }) => {
    await page.goto('/service-areas/north-county')
    await expect(page.locator('h1')).toContainText('North County')
  })
})

test.describe('Testimonials', () => {
  test('listing page shows testimonials from Drupal', async ({ page }) => {
    await page.goto('/testimonials')
    await expect(page.locator('h1')).toContainText('Customer Testimonials')
    await expect(page.locator('text=Jennifer Walsh')).toBeVisible()
    await expect(page.locator('text=Robert Martinez')).toBeVisible()
  })

  test('detail page renders testimonial content', async ({ page }) => {
    await page.goto('/testimonials/fast-ac-repair')
    await expect(page.locator('h1')).toContainText('Fast AC Repair')
  })
})

test.describe('Static Pages', () => {
  test('contact page renders', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1')).toContainText('Contact Us')
    await expect(page.locator('text=service@summitclimate.com')).toBeVisible()
  })

  test('about page renders content from Drupal', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText('About ComfortPro HVAC')
    await expect(page.locator('text=Our Mission')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('navigating from homepage to services', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/services"]').first().click()
    await expect(page).toHaveURL('/services')
    await expect(page.locator('h1')).toContainText('Our Services')
  })
})
