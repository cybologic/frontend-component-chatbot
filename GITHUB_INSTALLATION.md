# GitHub Installation Guide

Since this package is hosted on GitHub (not npm), here's how to install it in your Open edX MFE.

## Quick Install

```bash
cd /path/to/your-mfe  # e.g., frontend-app-learning
npm install git+https://github.com/cybologic/frontend-component-chatbot.git
```

That's it! Now configure it in `env.config.jsx` (see below).

## Installation Options

### 1. Install from Main Branch (Latest)
```bash
npm install git+https://github.com/cybologic/frontend-component-chatbot.git
```

This installs the latest code from the `main` branch.

### 2. Install from Specific Branch
```bash
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#dev
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#feature-branch
```

Useful for testing features before they're merged to main.

### 3. Install from Tag/Release (Recommended for Production)
```bash
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.1.0
```

Most stable - pins to a specific release version.

### 4. Install from Your Fork
```bash
npm install git+https://github.com/YOUR_USERNAME/frontend-component-chatbot.git
```

If you've forked the repo to make custom changes.

### 5. Install from Local Path (Development)
```bash
npm install /Users/m.sameer/Data/openedx/frontend-component-chatbot
```

For local development and testing.

### 6. Using npm link (Development)
```bash
# In the chatbot directory
cd /Users/m.sameer/Data/openedx/frontend-component-chatbot
npm link

# In your MFE directory
cd /path/to/frontend-app-learning
npm link @edx/frontend-component-chatbot
```

Creates a symlink - changes in chatbot are immediately reflected in MFE.

## What Gets Added to package.json

When you install from GitHub, your `package.json` will show:

```json
{
  "dependencies": {
    "@edx/frontend-component-chatbot": "git+https://github.com/cybologic/frontend-component-chatbot.git"
  }
}
```

Or for a specific tag:

```json
{
  "dependencies": {
    "@edx/frontend-component-chatbot": "git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0"
  }
}
```

## Complete Installation Example

Here's a full workflow for installing in `frontend-app-learning`:

```bash
# 1. Navigate to your MFE
cd /path/to/frontend-app-learning

# 2. Install from GitHub
npm install git+https://github.com/cybologic/frontend-component-chatbot.git

# 3. Verify installation
npm list @edx/frontend-component-chatbot
```

## Configuration After Installation

After installing, add to your `env.config.jsx`:

```javascript
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [{
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'openedx_chatbot',
          type: DIRECT_PLUGIN,
          priority: 50,
          RenderWidget: ChatbotPlugin,
        },
      }],
    },
  },
};

export default config;
```

## Updating the Package

### Update to Latest
```bash
npm update @edx/frontend-component-chatbot
```

Or reinstall:
```bash
npm uninstall @edx/frontend-component-chatbot
npm install git+https://github.com/cybologic/frontend-component-chatbot.git
```

### Update to Specific Version
```bash
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.1.0
```

## Private Repository

If the repository is private, you need authentication:

### Using SSH
```bash
npm install git+ssh://git@github.com/cybologic/frontend-component-chatbot.git
```

Make sure your SSH key is added to GitHub.

### Using Personal Access Token
```bash
npm install git+https://YOUR_TOKEN@github.com/cybologic/frontend-component-chatbot.git
```

Or configure in `.npmrc`:
```
//github.com/:_authToken=YOUR_TOKEN
```

## Troubleshooting

### "Command failed: git ls-remote"
- **Issue**: Can't access the repository
- **Fix**: Check repository URL, ensure it's public or you have access

### "Cannot find module '@edx/frontend-component-chatbot'"
- **Issue**: Package not properly installed
- **Fix**: Run `npm install` again, check `node_modules/@edx/frontend-component-chatbot` exists

### "Repository not found"
- **Issue**: Wrong repository URL or private repo without credentials
- **Fix**: Verify URL, add authentication if needed

### Changes not reflecting
- **Issue**: Using cached version
- **Fix**: 
  ```bash
  rm -rf node_modules/@edx/frontend-component-chatbot
  npm install git+https://github.com/cybologic/frontend-component-chatbot.git
  ```

## CI/CD Considerations

### In GitHub Actions
```yaml
- name: Install dependencies
  run: npm install
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### In package.json for CI
Pin to specific commit or tag:
```json
{
  "dependencies": {
    "@edx/frontend-component-chatbot": "git+https://github.com/cybologic/frontend-component-chatbot.git#abc123"
  }
}
```

## Production Recommendations

1. **Use tags/releases** instead of branches:
   ```bash
   npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0
   ```

2. **Lock versions** in `package-lock.json`:
   - Commit `package-lock.json` to your repo
   - Use `npm ci` instead of `npm install` in production

3. **Test before deploying**:
   - Install in staging environment first
   - Verify chatbot works as expected
   - Then deploy to production

4. **Document the version** you're using:
   ```
   # In your MFE's README
   Using chatbot plugin v1.0.0 from:
   https://github.com/cybologic/frontend-component-chatbot/tree/v1.0.0
   ```

## Advantages of GitHub Installation

✅ **No npm publishing needed** - Share code directly  
✅ **Private repos supported** - Can keep code private  
✅ **Branch-based development** - Test features easily  
✅ **Version control** - Use tags for stable releases  
✅ **Direct from source** - Always get latest builds  

## When to Use Each Method

| Method | Use Case |
|--------|----------|
| Main branch | Latest features, development |
| Specific branch | Testing features before merge |
| Tag/release | Production deployments |
| Fork | Custom modifications |
| Local path | Active development |
| npm link | Hot reloading during dev |

## Next Steps

After installation:
1. ✅ Install from GitHub
2. ✅ Configure `env.config.jsx`
3. ✅ Set environment variables (API endpoint)
4. ✅ Test in development
5. ✅ Deploy to staging
6. ✅ Deploy to production

For complete configuration examples, see [PLUGIN_EXAMPLES.md](./PLUGIN_EXAMPLES.md).
