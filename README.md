# Open edX Chatbot Plugin

> A minimal chatbot plugin for Open edX MFEs using frontend-plugin-framework

## 🧩 Plugin Installation (Zero-Code)

Install in any Open edX MFE **without modifying MFE code**:

```bash
# In your MFE directory (e.g., frontend-app-learning)
# Install directly from GitHub
npm install git+https://github.com/cybologic/frontend-component-chatbot.git

# Or install from a specific tag (recommended for production)
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0
```

**📘 See [GITHUB_INSTALLATION.md](./GITHUB_INSTALLATION.md) for all installation options**

Then add to your `env.config.jsx`:

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

**📚 See [PLUGIN_INSTALLATION.md](./PLUGIN_INSTALLATION.md) for complete installation guide**

## 🚀 Development Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open http://localhost:3000 in your browser!

## 📦 What's Inside

Just 3 files:
- `src/Chatbot.jsx` - The chatbot component (150 lines)
- `src/styles/chatbot.css` - Styles
- `src/main.jsx` - Demo app

## 🔌 Usage

### As a Plugin (Recommended)

See [PLUGIN_INSTALLATION.md](./PLUGIN_INSTALLATION.md) for plugin installation in Open edX MFEs.

### As a Standalone Component

```jsx
import { Chatbot } from '@edx/frontend-component-chatbot';

<Chatbot
  apiEndpoint="https://your-backend.com/api/chat"
  userId="user123"
  courseId="course-v1:edX+DemoX+Demo"
/>
```

## 📡 Backend API

Your backend needs ONE endpoint:

**POST /api/chat**

Request:
```json
{
  "message": "What is this course about?",
  "userId": "user123",
  "courseId": "course-v1:edX+DemoX+Demo",
  "sessionId": "session-123"
}
```

Response:
```json
{
  "message": "This course covers machine learning...",
  "sessionId": "session-123"
}
```

## ✨ Features

- 🧩 **Plugin-based installation** - Zero-code integration with Open edX MFEs
- ✅ Pure JavaScript (no TypeScript)
- 🔌 Backend-agnostic - works with any chat API
- 💾 LocalStorage for message history
- 📱 Responsive design
- 🎨 Clean, simple UI
- 🔧 Auto-detects user ID and course ID from context
- ~150 lines of code

## 🛠️ Backend Example (Python)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    
    # Your AI logic here
    response = your_ai_function(message)
    
    return jsonify({
        'message': response,
        'sessionId': data.get('sessionId', 'new-session')
    })

if __name__ == '__main__':
    app.run(port=8000)
```

## 📝 License

MIT
