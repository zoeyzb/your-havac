# Decoupled HVAC

An HVAC company website starter template for Decoupled Drupal + Next.js. Built for heating and cooling contractors, HVAC service companies, and mechanical contractors.

![Decoupled HVAC Screenshot](docs/screenshot.png)

## Features

- **Services** - HVAC services including air conditioning, heating, preventive maintenance, and duct cleaning
- **Service Areas** - Geographic coverage areas with zip codes and local service descriptions
- **Testimonials** - Client reviews with ratings, service details, and photos
- **Modern Design** - Clean, accessible UI optimized for home service businesses

## Quick Start

### 1. Clone the template

```bash
npx degit nextagencyio/decoupled-hvac my-hvac
cd my-hvac
npm install
```

### 2. Run interactive setup

```bash
npm run setup
```

This interactive script will:
- Authenticate with Decoupled.io (opens browser)
- Create a new Drupal space
- Wait for provisioning (~90 seconds)
- Configure your `.env.local` file
- Import sample content

### 3. Start development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Manual Setup

If you prefer to run each step manually:

<details>
<summary>Click to expand manual setup steps</summary>

### Authenticate with Decoupled.io

```bash
npx decoupled-cli@latest auth login
```

### Create a Drupal space

```bash
npx decoupled-cli@latest spaces create "My HVAC"
```

Note the space ID returned. Wait ~90 seconds for provisioning.

### Configure environment

```bash
npx decoupled-cli@latest spaces env 1234 --write .env.local
```

### Import content

```bash
npm run setup-content
```

This imports:
- Homepage with hero, features (24/7 Emergency Service, Licensed & Insured, Satisfaction Guaranteed, Flexible Financing), and service scheduling CTA
- 4 services: Air Conditioning, Heating Systems, Preventive Maintenance, Duct Cleaning & Sealing
- 3 service areas: North County, South County, East Metro
- 4 testimonials: Fast AC Repair, Excellent Furnace Installation, Great Maintenance Program, Noticeable Air Quality Improvement
- 2 static pages: About ComfortPro HVAC, Contact Us

</details>

## Content Types

### Service
- **image**: Service image

### Service Area
- **zip_codes**: Zip codes served in the area
- **image**: Area image

### Testimonial
- **client_name**: Name of the reviewing client
- **service_received**: Which service was performed
- **rating**: Star rating (1-5)
- **photo**: Client photo

### Homepage
- **hero_title**: Main headline (e.g., "Your Comfort Is Our Priority")
- **hero_subtitle**: Tagline (e.g., "Expert Heating & Cooling Solutions")
- **hero_description**: Introductory paragraph
- **features_items**: Key feature highlights (emergency service, licensing, guarantees, financing)
- **cta_title / cta_description**: Service scheduling call-to-action

### Basic Page
- General-purpose static content pages (About, Contact, etc.)

## Customization

### Colors & Branding
Edit `tailwind.config.js` to customize colors, fonts, and spacing.

### Content Structure
Modify `data/hvac-content.json` to add or change content types and sample content.

### Components
React components are in `app/components/`. Update them to match your design needs.

## Demo Mode

Demo mode allows you to showcase the application without connecting to a Drupal backend.

### Enable Demo Mode

```bash
NEXT_PUBLIC_DEMO_MODE=true
```

### Removing Demo Mode

1. Delete `lib/demo-mode.ts`
2. Delete `data/mock/` directory
3. Delete `app/components/DemoModeBanner.tsx`
4. Remove `DemoModeBanner` from `app/layout.tsx`
5. Remove demo mode checks from `app/api/graphql/route.ts`

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextagencyio/decoupled-hvac)

### Other Platforms
Works with any Node.js hosting platform that supports Next.js.

## Documentation

- [Decoupled.io Docs](https://www.decoupled.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drupal GraphQL](https://www.decoupled.io/docs/graphql)

## License

MIT
