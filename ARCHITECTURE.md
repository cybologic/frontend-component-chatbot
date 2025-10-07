# Chatbot Plugin Architecture

## Overview

This document explains how the chatbot is structured as an Open edX plugin using the `frontend-plugin-framework`.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│         Host MFE (e.g., frontend-app-learning)          │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │          env.config.jsx                         │    │
│  │  - Imports ChatbotPlugin                        │    │
│  │  - Configures plugin slots                      │    │
│  │  - Defines DIRECT_PLUGIN insertion              │    │
│  └────────────────────┬────────────────────────────┘    │
│                       │                                   │
│  ┌────────────────────▼────────────────────────────┐    │
│  │         PluginSlot Component                    │    │
│  │  <PluginSlot id="footer_slot" />                │    │
│  └────────────────────┬────────────────────────────┘    │
│                       │                                   │
│                       │ Renders widget                    │
│                       │                                   │
│  ┌────────────────────▼────────────────────────────┐    │
│  │         ChatbotPlugin (Wrapper)                 │    │
│  │  - Receives pluginProps                         │    │
│  │  - Extracts userId, courseId from context       │    │
│  │  - Configures API endpoint                      │    │
│  └────────────────────┬────────────────────────────┘    │
│                       │                                   │
│  ┌────────────────────▼────────────────────────────┐    │
│  │         Chatbot Component                       │    │
│  │  - Renders chat UI                              │    │
│  │  - Manages state (messages, loading)            │    │
│  │  - Handles API calls                            │    │
│  └────────────────────┬────────────────────────────┘    │
│                       │                                   │
└───────────────────────┼───────────────────────────────────┘
                        │
                        │ HTTP POST
                        │
             ┌──────────▼──────────┐
             │   Backend API       │
             │  /api/chat          │
             └─────────────────────┘
```

## File Structure

```
frontend-component-chatbot/
├── src/
│   ├── Chatbot.jsx           # Core chatbot UI component
│   ├── ChatbotPlugin.jsx     # Plugin wrapper with auto-detection
│   ├── index.js              # Public API exports
│   └── styles/
│       └── chatbot.css       # Styling
├── env.config.js             # Plugin configuration example
├── package.json              # Dependencies and metadata
└── docs/
    ├── README.md             # Main documentation
    ├── PLUGIN_INSTALLATION.md # Installation guide
    └── BACKEND.md            # Backend API specification
```

## Component Hierarchy

### 1. Chatbot.jsx (Core Component)
- **Purpose**: Pure chat UI component
- **Props**:
  - `apiEndpoint` (string): Backend API URL
  - `userId` (string): Current user identifier
  - `courseId` (string): Current course identifier
- **Responsibilities**:
  - Render chat interface
  - Manage messages state
  - Handle API communication
  - Persist to localStorage
  - Show loading/error states

### 2. ChatbotPlugin.jsx (Plugin Wrapper)
- **Purpose**: Bridge between plugin framework and chatbot
- **Props**: Receives any props from PluginSlot
- **Responsibilities**:
  - Auto-detect `userId` from:
    - Plugin props
    - `window.USER_ID`
    - localStorage
  - Auto-detect `courseId` from:
    - Plugin props
    - URL patterns (`/course/course-v1:...`, `/courses/course-v1:...`)
    - Query parameters
  - Configure `apiEndpoint` from:
    - Plugin props (highest priority)
    - `process.env.CHATBOT_API_ENDPOINT`
    - `window.CHATBOT_API_ENDPOINT`
    - Default: `http://localhost:8000/api/chat`
  - Pass configuration to Chatbot component

### 3. env.config.js (Configuration)
- **Purpose**: Example plugin configuration
- **Structure**:
  ```javascript
  {
    pluginSlots: {
      'slot_id': {
        keepDefault: true/false,
        plugins: [{
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'unique_id',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin
          }
        }]
      }
    }
  }
  ```

## Plugin Framework Integration

### Plugin Types

The chatbot uses `DIRECT_PLUGIN` type, which means:
- ✅ Renders as a React component directly in the DOM
- ✅ Has access to parent MFE's React context
- ✅ Can receive props from PluginSlot
- ✅ Shares the same JavaScript bundle
- ❌ No iframe isolation (use `IFRAME_PLUGIN` if isolation needed)

### Plugin Operations

Currently uses `PLUGIN_OPERATIONS.Insert`:
- Inserts the widget into the plugin slot
- Other operations available:
  - `Wrap`: Wraps existing content
  - `Modify`: Replaces existing content
  - `Hide`: Hides slot content

### Plugin Priority

- **Priority**: 50 (default in examples)
- Higher number = rendered later
- Use for controlling order when multiple plugins target same slot

## Configuration Priority

The plugin uses a cascading configuration system:

### API Endpoint Priority
1. Plugin props (from env.config.js) - **Highest**
2. Environment variable (`process.env.CHATBOT_API_ENDPOINT`)
3. Global variable (`window.CHATBOT_API_ENDPOINT`)
4. Default (`http://localhost:8000/api/chat`) - **Lowest**

### User ID Priority
1. Plugin props
2. `window.USER_ID`
3. localStorage `userId`
4. `'anonymous'` - fallback

### Course ID Priority
1. Plugin props
2. `window.COURSE_ID`
3. URL extraction (`/course/course-v1:...`)
4. Query parameter (`?courseId=...`)
5. `'unknown'` - fallback

## Data Flow

### 1. Initialization
```
MFE loads → env.config.js parsed → Plugin framework initializes
→ PluginSlot renders → ChatbotPlugin instantiated
→ Auto-detection runs → Chatbot component rendered
```

### 2. User Interaction
```
User clicks toggle → Chatbot opens → User types message
→ sendMessage() called → POST to API endpoint
→ Response received → Message added to state
→ State saved to localStorage → UI updates
```

### 3. Context Detection
```
ChatbotPlugin mounts → Check plugin props
→ If not found, check window.USER_ID
→ If not found, check localStorage
→ Extract courseId from URL
→ Configure apiEndpoint from env/window
→ Pass to Chatbot component
```

## Plugin Slot Integration

### In Host MFE

The host MFE (e.g., `frontend-app-learning`) needs a PluginSlot:

```jsx
import { PluginSlot } from '@openedx/frontend-plugin-framework';

function MyComponent() {
  return (
    <div>
      {/* Your content */}
      
      <PluginSlot 
        id="footer_slot"
        pluginProps={{
          customProp: 'value'
        }}
      />
    </div>
  );
}
```

### Available Slots in Open edX MFEs

Common slots across MFEs:
- `footer_slot` - Page footer
- `header_slot` - Page header
- `sidebar_slot` - Sidebar area

Frontend-app-learning specific:
- `course_unit_content_slot` - Course content area
- `course_tab_slot` - Course tabs
- Check the MFE's documentation for complete list

## Build & Distribution

### Development
```bash
npm run dev
```
Runs Vite dev server for standalone testing.

### Production Build
```bash
npm run build
```
Creates optimized bundle in `dist/`.

### Publishing
```bash
npm publish --access public
```
Publishes to npm registry as `@edx/frontend-component-chatbot`.

### Installation
```bash
npm install @edx/frontend-component-chatbot
```
Installs in target MFE.

## Backend Integration

### API Contract

**Endpoint**: `POST /api/chat`

**Request Body**:
```json
{
  "message": "What is gradient descent?",
  "userId": "user123",
  "courseId": "course-v1:edX+ML101+2024",
  "sessionId": "session-abc-123"
}
```

**Response**:
```json
{
  "message": "Gradient descent is an optimization algorithm...",
  "sessionId": "session-abc-123"
}
```

### CORS Configuration

Backend must allow:
- **Origin**: Your MFE domain
- **Methods**: POST, OPTIONS
- **Headers**: Content-Type, Authorization

Example (Python/Flask):
```python
from flask_cors import CORS
CORS(app, origins=['https://learning.edx.org'])
```

## Security Considerations

### 1. API Endpoint Security
- Use HTTPS in production
- Implement authentication (JWT, OAuth)
- Validate `userId` server-side
- Rate limit requests

### 2. XSS Prevention
- All messages sanitized in React (automatic)
- No `dangerouslySetInnerHTML` used
- User input escaped

### 3. Data Privacy
- Chat history in localStorage (client-only)
- No sensitive data in logs
- Consider encryption for stored messages

## Testing

### Unit Testing
Test the Chatbot component independently:
```jsx
import { render, fireEvent } from '@testing-library/react';
import Chatbot from './Chatbot';

test('sends message on submit', () => {
  const { getByPlaceholderText, getByText } = render(
    <Chatbot apiEndpoint="/api/chat" userId="test" courseId="test" />
  );
  // ... test logic
});
```

### Integration Testing
Test the plugin installation:
1. Create test MFE
2. Install plugin package
3. Configure env.config.js
4. Verify chatbot appears in slot

### E2E Testing
Use Cypress/Playwright:
```javascript
cy.visit('/course/course-v1:edX+Demo+2024');
cy.get('[data-testid="chatbot-toggle"]').click();
cy.get('input[type="text"]').type('Hello{enter}');
cy.contains('response message');
```

## Performance Optimization

### Code Splitting
The plugin is loaded with the host MFE bundle. For lazy loading:
```javascript
const ChatbotPlugin = React.lazy(() => 
  import('@edx/frontend-component-chatbot').then(m => ({ default: m.ChatbotPlugin }))
);
```

### State Management
- Uses local state (useState)
- localStorage for persistence
- No external state management needed

### Bundle Size
- Current: ~10KB gzipped
- No heavy dependencies
- CSS included in bundle

## Troubleshooting Guide

### Plugin Not Appearing
1. Check console for plugin framework errors
2. Verify slot ID matches host MFE
3. Ensure `@openedx/frontend-plugin-framework` installed
4. Check env.config.js is imported

### API Errors
1. Check CORS configuration
2. Verify endpoint URL
3. Check network tab for failed requests
4. Validate request/response format

### Styling Issues
1. Check for CSS specificity conflicts
2. Ensure CSS is imported
3. Use browser DevTools to inspect styles

### Auto-Detection Failures
1. `userId`: Set `window.USER_ID` in host MFE
2. `courseId`: Check URL pattern matches expected format
3. Override via plugin props if needed

## Future Enhancements

### Potential Features
- [ ] Multi-language support (i18n)
- [ ] Voice input/output
- [ ] File attachments
- [ ] Rich message formatting (Markdown)
- [ ] Typing indicators
- [ ] Message reactions
- [ ] Export chat history
- [ ] Dark mode support
- [ ] Accessibility improvements (ARIA labels)

### Plugin Framework Features
- [ ] IFRAME_PLUGIN version for isolation
- [ ] Multiple slot targets
- [ ] Configuration UI in studio
- [ ] Analytics integration
- [ ] A/B testing support

## Resources

- [Frontend Plugin Framework](https://github.com/openedx/frontend-plugin-framework)
- [Open edX MFE Documentation](https://docs.openedx.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
