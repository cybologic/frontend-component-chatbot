# Plugin Configuration Examples

This document provides ready-to-use configuration examples for different deployment scenarios.

## Installing from GitHub

Since this package is hosted on GitHub, install it directly:

```bash
# Latest from main branch
npm install git+https://github.com/cybologic/frontend-component-chatbot.git

# Specific branch
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#dev

# Specific tag/release
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0

# From your fork
npm install git+https://github.com/YOUR_USERNAME/frontend-component-chatbot.git
```

## Example 1: Basic Footer Installation

Install chatbot in the footer of all pages:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 2: Course Unit Page Only

Install chatbot only on course unit pages (Learning MFE):

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'course_unit_content_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'course_chatbot',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 3: Custom API Endpoint

Override the default API endpoint via plugin props:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
            props: {
              apiEndpoint: 'https://chatbot-api.example.com/api/chat',
            },
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 4: Multiple Slots

Install chatbot in multiple locations:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    // Footer on all pages
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'chatbot_footer',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
    // Course unit page
    'course_unit_content_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'chatbot_course',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 5: Development Environment

Configuration for local development with mock API:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
            props: {
              apiEndpoint: 'http://localhost:8000/api/chat',
              userId: 'dev-user',
              courseId: 'course-v1:edX+DemoX+Demo',
            },
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 6: Production with Authentication

Production setup with secure API and authentication:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const CHATBOT_API = process.env.CHATBOT_API_URL || 'https://api.example.com/chat';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
            props: {
              apiEndpoint: CHATBOT_API,
            },
          },
        },
      ],
    },
  },
};

export default config;
```

With environment variables in `.env.production`:
```env
CHATBOT_API_URL=https://api.example.com/chat
```

## Example 7: Conditional Installation

Install chatbot only for specific users or courses:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

// Helper function to check if chatbot should be enabled
function shouldEnableChatbot() {
  // Check feature flag
  if (window.FEATURES?.ENABLE_CHATBOT === false) {
    return false;
  }
  
  // Only enable for beta users
  const isBetaUser = window.USER_GROUPS?.includes('beta_testers');
  return isBetaUser;
}

const config = {
  pluginSlots: shouldEnableChatbot() ? {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  } : {},
};

export default config;
```

## Example 8: Custom Styling via Props

Pass custom props to modify behavior:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
            props: {
              apiEndpoint: 'https://api.example.com/chat',
              // Custom props that ChatbotPlugin can handle
              theme: 'dark',
              position: 'bottom-right',
              welcomeMessage: 'Hi! How can I help you today?',
            },
          },
        },
      ],
    },
  },
};

export default config;
```

Note: The current implementation doesn't use these custom props, but you can extend `ChatbotPlugin.jsx` to handle them.

## Example 9: Replace Existing Widget

Replace an existing widget instead of inserting:

```javascript
// env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    'help_widget_slot': {
      keepDefault: false, // Remove default help widget
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify, // Replace instead of Insert
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
```

## Example 10: Wrapped Installation

Wrap chatbot with additional UI elements:

```javascript
// env.config.jsx
import React from 'react';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

// Create a wrapper component
const ChatbotWithHeader = () => (
  <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
    <h3>Course Assistant</h3>
    <p>Ask me anything about this course!</p>
    <ChatbotPlugin />
  </div>
);

const config = {
  pluginSlots: {
    'sidebar_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot_wrapped',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotWithHeader,
          },
        },
      ],
    },
  },
};

export default config;
```

## Environment-Specific Configuration

### Local Development
```javascript
// env.config.development.jsx
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
          props: {
            apiEndpoint: 'http://localhost:8000/api/chat',
            userId: 'dev-user',
          },
        },
      }],
    },
  },
};
```

### Staging
```javascript
// env.config.staging.jsx
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
          props: {
            apiEndpoint: 'https://staging-chatbot.example.com/api/chat',
          },
        },
      }],
    },
  },
};
```

### Production
```javascript
// env.config.production.jsx
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
          props: {
            apiEndpoint: 'https://chatbot.example.com/api/chat',
          },
        },
      }],
    },
  },
};
```

## Complete MFE Integration Example

Here's a complete example showing how to integrate into `frontend-app-learning`:

### 1. Install Package
```bash
cd /path/to/frontend-app-learning

# Install from GitHub
npm install git+https://github.com/cybologic/frontend-component-chatbot.git

# This adds to package.json:
# "@edx/frontend-component-chatbot": "git+https://github.com/cybologic/frontend-component-chatbot.git"
```

### 2. Create env.config.jsx
```javascript
// frontend-app-learning/env.config.jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    // Add to footer
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'learning_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
```

### 3. Configure Environment
```bash
# .env.development
CHATBOT_API_ENDPOINT=http://localhost:8000/api/chat

# .env.production
CHATBOT_API_ENDPOINT=https://api.example.com/api/chat
```

### 4. Add to HTML (Optional)
```html
<!-- public/index.html -->
<script>
  window.CHATBOT_API_ENDPOINT = 'https://api.example.com/api/chat';
</script>
```

### 5. Run the MFE
```bash
npm start
```

The chatbot will now appear in the footer of all pages in the Learning MFE!

## Testing Configurations

### Test Basic Installation
1. Install plugin
2. Add minimal config to env.config.jsx
3. Run `npm start`
4. Check browser console for errors
5. Verify chatbot button appears

### Test API Integration
1. Start your backend API
2. Configure apiEndpoint
3. Open chatbot
4. Send a test message
5. Verify response appears

### Test Auto-Detection
1. Navigate to a course page
2. Open browser console
3. Type: `localStorage.getItem('chat-messages')`
4. Verify courseId is detected correctly

## Troubleshooting

### Plugin Not Loading
- Check `env.config.jsx` is imported in your MFE
- Verify plugin framework is installed
- Check browser console for errors

### API Errors
- Verify CORS is configured on backend
- Check network tab for failed requests
- Confirm endpoint URL is correct

### Styling Issues
- Check for CSS conflicts
- Use browser DevTools to inspect
- Adjust z-index if needed

## Next Steps

After configuration:
1. Test in development environment
2. Deploy to staging
3. Monitor for errors
4. Collect user feedback
5. Iterate on configuration

For more details, see:
- [PLUGIN_INSTALLATION.md](./PLUGIN_INSTALLATION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [BACKEND.md](./BACKEND.md)
