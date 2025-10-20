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

**POST /api/v1/mentor/query**

Request:
```json
{
  "learnerId": "john_123",
  "courseId": "course_analytics+101",
  "message": "I don't get how bin width affects the histogram.",
  "conversationId": "conv_789"
}
```

Response:
```json
{
  "courseId": "course_analytics+101",
  "learnerId": "john_123",
  "question": "I don't get how bin width affects the histogram.",
  "mentorResponse": {
    "content": "Think of bin width as the size of buckets...",
    "citations": [
      {
        "label": "Course Notes §2.3: Histograms",
        "href": "https://openedx.example/materials/mat_204"
      }
    ],
    "followUpPrompts": [
      "Show the same dataset with bin width = 1",
      "How to pick an optimal bin rule?"
    ],
    "conversationId": "conv_789",
    "requestId": "req_b1f6c2"
  }
}
```

**See [BACKEND.md](./BACKEND.md) for complete API specification**

## ✨ Features

- 🧩 **Plugin-based installation** - Zero-code integration with Open edX MFEs
- ✅ Pure JavaScript (no TypeScript)
- 🔌 Backend-agnostic - works with any chat API
- 💾 LocalStorage for message history
- 📱 Responsive design
- 🎨 Clean, simple UI
- 🔧 Auto-detects user ID and course ID from context
- 📚 **Citations support** - Shows references with clickable links
- 💡 **Follow-up prompts** - Suggests related questions
- 💬 **Conversation threading** - Maintains conversation context
- ~200 lines of code

## 🛠️ Backend Example (Python)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/mentor/query', methods=['POST'])
def mentor_query():
    data = request.json
    message = data['message']
    
    # Your AI logic here
    response = your_ai_function(message)
    
    return jsonify({
        'courseId': data['courseId'],
        'learnerId': data['learnerId'],
        'question': message,
        'mentorResponse': {
            'content': response,
            'citations': [
                {'label': 'Course Material', 'href': 'https://...'}
            ],
            'followUpPrompts': ['Related question 1', 'Related question 2'],
            'conversationId': data.get('conversationId', f'conv_{uuid.uuid4().hex[:8]}'),
            'requestId': f'req_{uuid.uuid4().hex[:8]}'
        }
    })

if __name__ == '__main__':
    app.run(port=8000)
```

## 📝 License

MIT
