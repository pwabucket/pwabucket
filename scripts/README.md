# PWA Data Generation Script

This script automatically collects PWA repositories from your GitHub organization and fetches their manifest files.

## Usage

### Quick Start
```bash
# Using npm script (recommended)
npm run generate-data

# Or directly with node
node scripts/generate-pwa-data.js
```

### Prerequisites
You need a GitHub Personal Access Token to run this script:

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token with `public_repo` permission
3. Set it as an environment variable:

```bash
export GITHUB_TOKEN="your_token_here"
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GITHUB_TOKEN` | GitHub Personal Access Token (required) | - |
| `ORGANIZATION` | GitHub organization to scan | `pwabucket` |
| `OUTPUT_DIR` | Directory to save the data file | `public/data` |

### Example Usage

```bash
# Basic usage
GITHUB_TOKEN="ghp_xxxx" npm run generate-data

# Custom organization
GITHUB_TOKEN="ghp_xxxx" ORGANIZATION="my-org" npm run generate-data

# Custom output directory
GITHUB_TOKEN="ghp_xxxx" OUTPUT_DIR="/tmp/data" npm run generate-data
```

## What It Does

1. **Searches** for repositories in the specified organization with the "pwa" topic
2. **Fetches manifest files** from two sources:
   - **Repository files**: Searches common manifest file locations
   - **Live websites**: Fetches manifests from deployed sites (if homepage is set)
3. **Generates** a comprehensive JSON file with all collected data
4. **Provides** detailed progress output and summary statistics

## Manifest File Locations

### Repository Search Paths
- `manifest.json`
- `public/manifest.json`
- `src/manifest.json`
- `static/manifest.json`
- `assets/manifest.json`
- `app.webmanifest`
- `public/app.webmanifest`
- `manifest.webmanifest`
- `public/manifest.webmanifest`

### Live Website Paths
- `{homepage}/manifest.json`
- `{homepage}/app.webmanifest`
- `{homepage}/manifest.webmanifest`
- `{homepage}/public/manifest.json`
- `{homepage}/static/manifest.json`

## Output Format

The script generates `public/data/pwa-data.json` with the following structure:

```json
{
  "generatedAt": "2025-01-24T12:00:00.000Z",
  "organization": "pwabucket",
  "totalRepositories": 5,
  "repositories": [
    {
      "repository": {
        "name": "my-pwa",
        "fullName": "pwabucket/my-pwa",
        "description": "A sample PWA",
        "stargazersCount": 15,
        "homepage": "https://my-pwa.example.com",
        "topics": ["pwa", "javascript"],
        // ... more repository metadata
      },
      "manifests": {
        "repository": { /* manifest from repo files */ },
        "live": { /* manifest from live site */ }
      },
      "errors": [] // Any collection errors
    }
  ],
  "_meta": {
    "version": "1.0.0",
    "generator": "PWABucket Data Collector"
  }
}
```

## Rate Limiting

The script includes built-in rate limiting:
- **1 second delay** between repository processing
- **10 second timeout** for HTTP requests
- **User-Agent header** to identify requests

## Error Handling

The script gracefully handles:
- Missing manifest files
- Invalid JSON in manifests
- Network timeouts
- GitHub API rate limits
- Invalid homepage URLs

All errors are logged and included in the output for debugging.

## Integration

The generated data can be used by:
- The React application via `staticApi.js`
- External tools that need PWA repository data
- CI/CD pipelines for automated processing

## Troubleshooting

### Common Issues

**"GITHUB_TOKEN environment variable is required"**
- Make sure you've set your GitHub token as an environment variable

**"API rate limit exceeded"**
- Wait for the rate limit to reset or use a token with higher limits
- The script includes delays to minimize rate limiting

**"No repositories found"**
- Check that repositories in your organization have the "pwa" topic
- Verify the organization name is correct

**"Network timeout"**
- Some websites may be slow to respond
- The script will continue with other repositories

### Debug Mode

For verbose output, you can modify the script or check the console logs which include:
- Progress indicators for each repository
- Success/failure status for each manifest source
- Detailed error messages
- Summary statistics

## Development

The script is modular and can be extended:
- Add new manifest file paths to `config.manifestPaths`
- Modify the delay timing in `config.requestDelay`
- Add new data sources or processing steps
- Customize the output format

The script exports its main function for programmatic use:

```javascript
const { collectPWAData } = require('./scripts/generate-pwa-data.js');

collectPWAData().then(result => {
  if (result.success) {
    console.log('Data collected successfully!');
  }
});
```
