# Content Setup Guide

This guide explains how to import the starter content into your Drupal space.

## Prerequisites

Before importing content, make sure:

1. You have a Drupal space created on [dashboard.decoupled.io](https://dashboard.decoupled.io)
2. Your `.env.local` file is configured with the OAuth credentials (see your Drupal space's homepage for values)
3. The Drupal space is active and running

## Option 1: CLI Import (Recommended)

The fastest way to import content is using the Decoupled CLI. It automatically uses your `.env.local` credentials.

### Import the Content

```bash
npm run setup-content
```

That's it! The CLI reads your OAuth credentials from `.env.local` and imports directly to your Drupal site.

### Preview First (Optional)

To see what will be imported without making changes:

```bash
npm run setup-content:preview
```

## Option 2: Manual Import via Drupal Admin

If you prefer to import manually or need to customize the content:

### Step 1: Copy the JSON

Open `data/starter-content.json` in this project and copy its contents.

### Step 2: Open the Import Page

Go to your Drupal admin at:
```
https://YOUR-SPACE.decoupled.website/admin/content/import
```

Or navigate to: **Content > Import** in the Drupal admin menu.

### Step 3: Paste and Import

1. Paste the JSON into the text area
2. Click **Preview** to verify what will be created
3. Click **Import** to apply the changes

## What Gets Imported

The starter content includes:

### Content Types
- **Homepage** - Landing page with hero, features, and CTA sections
- **Article** - Blog posts with featured image and tags
- **Basic Page** - Static content pages

### Paragraph Types
- **Feature Item** - Reusable feature blocks with icon, title, and description

### Sample Content
- 1 Homepage with features section
- 2 Sample articles
- 1 About page

## Customizing the Content

The content definition lives in `data/starter-content.json`. You can:

1. **Modify existing content types** - Add/remove fields
2. **Add new content types** - Follow the same JSON structure
3. **Change sample content** - Update titles, body text, etc.

After making changes, re-run the import command. The import is idempotent - it will update existing content and create new items.

### JSON Structure

```json
{
  "model": [
    {
      "bundle": "content_type_machine_name",
      "label": "Human Readable Name",
      "body": true,  // Include body field
      "fields": [
        {
          "id": "field_machine_name",
          "label": "Field Label",
          "type": "string"  // string, text, image, bool, integer, etc.
        }
      ]
    }
  ],
  "content": [
    {
      "id": "unique-content-id",
      "type": "node.content_type_machine_name",
      "path": "/url-path",
      "values": {
        "title": "Content Title",
        "body": "<p>HTML content</p>",
        "field_machine_name": "Field value"
      }
    }
  ]
}
```

### Field Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Single-line text | Titles, names |
| `string!` | Required string | Required title |
| `string[]` | Multiple strings | Tags (simple) |
| `text` | Long text (plain) | Descriptions |
| `text_long` | Long text with format | Body content |
| `bool` | Boolean | Featured flag |
| `integer` | Whole number | Count, order |
| `image` | Image field | Featured image |
| `term(vocabulary)[]` | Taxonomy reference | `term(tags)[]` |
| `paragraph(type)[]` | Paragraph reference | `paragraph(feature_item)[]` |

## Troubleshooting

### "Authentication failed"

Make sure you're logged into the CLI:
```bash
npx decoupled-cli@latest auth login
```

### "Space not found"

Verify your space ID is correct:
```bash
npx decoupled-cli@latest spaces list
```

### "Content type already exists"

This is normal - the import is idempotent and will update existing types.

### Import succeeds but site still shows empty

1. Clear your browser cache
2. Wait a few seconds for Next.js ISR to update
3. Check that your environment variables match your Drupal space

## Need Help?

- Visit [dashboard.decoupled.io](https://dashboard.decoupled.io) for your space settings
- Check the [Decoupled CLI documentation](https://www.npmjs.com/package/decoupled-cli)
- Contact support at support@decoupled.io
