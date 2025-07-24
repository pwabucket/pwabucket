# PWABucket

Your go-to app store for discovering, accessing, and enjoying a wide range of Progressive Web Apps (PWAs).

## Features

- **Lightweight Apps** - Discover PWAs that offer native-like experiences
- **Mobile and Desktop Support** - Works seamlessly across all devices
- **Automated Data Collection** - Daily updates from GitHub repositories with PWA manifests
- **Smart Fallback** - Uses cached data for speed, falls back to live API when needed

## Installing an App

You will be prompted to install the app once it loads, prompt will appear as a popup (Mobile) or around the address bar (Desktop).

## Automated PWA Data Collection

PWABucket automatically collects PWA data from GitHub repositories with the "pwa" topic. This process:

- Runs daily at 6:00 AM UTC
- Scans the organization for repositories tagged with "pwa"
- Fetches manifest files from both repository sources and live deployments
- Stores everything in a single JSON file for fast loading
- Provides detailed metadata about each PWA

### Benefits

- **⚡ Fast Loading** - Pre-collected data loads instantly
- **🔄 Auto-Updates** - Fresh data collected daily
- **📊 Rich Metadata** - Includes repository stats, manifest data, and deployment info
- **🛡️ Reliable** - Graceful fallback to live API if cached data is unavailable

For technical details, see [PWA Data Collection Documentation](./docs/PWA-DATA-COLLECTION.md).