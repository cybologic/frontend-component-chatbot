# Plugin Installation Guide

## Overview

This chatbot component is now structured as an Open edX plugin using the `frontend-plugin-framework`. This means you can install it in any MFE without modifying the MFE's code.

## Installation Methods

### Method 1: Using the Plugin in an MFE (Recommended)

1. **Install the plugin package** in your target MFE (e.g., `frontend-app-learning`):

```bash
cd /path/to/frontend-app-learning
npm install @edx/frontend-component-chatbot
```

2. **Configure the plugin** in your MFE's `env.config.jsx`:

```javascript
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ChatbotPlugin } from '@edx/frontend-component-chatbot';

const config = {
  pluginSlots: {
    // Add chatbot to the footer slot
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

3. **Configure environment variables** (optional):

Create a `.env` file in your MFE:

```env
CHATBOT_API_ENDPOINT=https://your-chatbot-api.com/api/chat
```

Or set the global variable in your MFE's HTML:

```html
<script>
  window.CHATBOT_API_ENDPOINT = 'https://your-chatbot-api.com/api/chat';
</script>
```

### Method 2: Local Development / Testing

1. **Link the package locally**:

```bash
# In this directory (frontend-component-chatbot)
npm link

# In your MFE directory
cd /path/to/frontend-app-learning
npm link @edx/frontend-component-chatbot
```

2. **Follow the same configuration steps** as Method 1.

## Plugin Slots

The chatbot can be inserted into various plugin slots:

### Available Slots

| Slot ID | Location | Description |
|---------|----------|-------------|
| `footer_slot` | Page footer | Appears at the bottom of all pages |
| `course_unit_content_slot` | Course unit page | Appears in the learning experience |
| Custom slots | Any MFE-defined slot | Check your MFE's documentation |

### Example: Course Unit Slot

To add the chatbot to the course unit page:

```javascript
pluginSlots: {
  'course_unit_content_slot': {
    keepDefault: true,
    plugins: [
      {
        op: PLUGIN_OPERATIONS.Insert,
        widget: {
          id: 'openedx_chatbot',
          type: DIRECT_PLUGIN,
          priority: 10,
          RenderWidget: ChatbotPlugin,
        },
      },
    ],
  },
}
```

## Configuration Options

### Props Passed to ChatbotPlugin

The plugin can receive configuration from the plugin slot:

```javascript
{
  op: PLUGIN_OPERATIONS.Insert,
  widget: {
    id: 'openedx_chatbot',
    type: DIRECT_PLUGIN,
    priority: 50,
    RenderWidget: ChatbotPlugin,
    props: {
      apiEndpoint: 'https://custom-api.com/chat',
      userId: null,  // Will auto-detect
      courseId: null, // Will auto-detect from URL
    }
  },
}
```

### Automatic Detection

The plugin automatically detects:

1. **User ID**: From `window.USER_ID` or localStorage
2. **Course ID**: From URL patterns:
   - `/course/course-v1:Org+Course+Run`
   - `/courses/course-v1:Org+Course+Run`
   - Query parameter: `?courseId=...`

## API Endpoint Configuration

The chatbot backend endpoint can be configured in priority order:

1. **Plugin props** (highest priority)
2. **Environment variable**: `process.env.CHATBOT_API_ENDPOINT`
3. **Global variable**: `window.CHATBOT_API_ENDPOINT`
4. **Default**: `http://localhost:8000/api/chat`

## Verifying Installation

1. **Check plugin registration**: Open browser console and look for the plugin framework logs
2. **Inspect the DOM**: The chatbot button should appear in the configured slot
3. **Test functionality**: Click the chatbot button and verify it opens

## Troubleshooting

### Plugin Not Appearing

1. Verify the plugin slot ID matches the MFE's slot
2. Check that `@openedx/frontend-plugin-framework` is installed
3. Ensure `env.config.jsx` is properly imported

### API Errors

1. Check that the `apiEndpoint` is configured correctly
2. Verify CORS is enabled on your backend
3. Check browser console for error messages

### Styling Issues

1. The CSS is included automatically
2. If styles conflict, you may need to adjust specificity
3. Check for CSS module conflicts in the parent MFE

## Advanced Configuration

### Custom Plugin Slot

If your MFE defines a custom plugin slot:

```javascript
// In your MFE component
import { PluginSlot } from '@openedx/frontend-plugin-framework';

<PluginSlot
  id="my_custom_slot"
  pluginProps={{
    apiEndpoint: 'https://api.example.com/chat',
    customProp: 'value'
  }}
/>
```

Then configure the chatbot for that slot:

```javascript
pluginSlots: {
  'my_custom_slot': {
    keepDefault: false,
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
}
```

### Multiple Instances

You can add the chatbot to multiple slots:

```javascript
pluginSlots: {
  'footer_slot': {
    keepDefault: true,
    plugins: [{
      op: PLUGIN_OPERATIONS.Insert,
      widget: {
        id: 'openedx_chatbot_footer',
        type: DIRECT_PLUGIN,
        priority: 50,
        RenderWidget: ChatbotPlugin,
      },
    }],
  },
  'sidebar_slot': {
    keepDefault: true,
    plugins: [{
      op: PLUGIN_OPERATIONS.Insert,
      widget: {
        id: 'openedx_chatbot_sidebar',
        type: DIRECT_PLUGIN,
        priority: 20,
        RenderWidget: ChatbotPlugin,
      },
    }],
  },
}
```

## Publishing

To publish your chatbot plugin to npm:

```bash
npm login
npm publish --access public
```

Then others can install it with:

```bash
npm install @edx/frontend-component-chatbot
```

## Resources

- [Frontend Plugin Framework Documentation](https://github.com/openedx/frontend-plugin-framework)
- [Open edX MFE Documentation](https://docs.openedx.org/)
- [Backend API Specification](./BACKEND.md)
