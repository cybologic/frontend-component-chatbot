# 🚀 Quick Start - GitHub Installation

## What This Is

✅ **Open edX Plugin** - Install without modifying MFE code
✅ **Pure JavaScript** - 150 lines of React code
✅ **Backend-agnostic** - Works with any chat API
✅ **Auto-detection** - Finds user ID and course ID automatically
✅ **GitHub-hosted** - Install directly from GitHub

## 📁 Project Structure

```
frontend-component-chatbot/
├── src/
│   ├── Chatbot.jsx        ← The chatbot component (150 lines)
│   ├── main.jsx           ← Demo app
│   └── styles/
│       └── chatbot.css    ← Styles
├── index.html             ← Entry point
├── backend.py             ← Test backend (Flask)
├── package.json           ← Dependencies
├── vite.config.js         ← Dev config
├── README.md              ← Usage guide
└── BACKEND.md             ← Backend examples
```

## 🚀 Install in Your MFE

### Step 1: Install from GitHub

```bash
cd /path/to/your-mfe  # e.g., frontend-app-learning

# Install latest
npm install git+https://github.com/cybologic/frontend-component-chatbot.git

# Or install specific version (recommended for production)
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0
```

### Step 2: Configure Plugin

Create or update `env.config.jsx`:

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

### Step 3: Set API Endpoint

```bash
# In your MFE's .env file
CHATBOT_API_ENDPOINT=https://your-api.com/api/chat
```

### Step 4: Run Your MFE

```bash
npm start
```

Done! The chatbot appears in your MFE's footer.

## 🧪 Test Locally First

Before installing in an MFE, test it locally:

```bash
# In this repo
npm install
npm run dev

# In another terminal, run test backend
python backend.py
```

Open http://localhost:3000 and try the chatbot!

## 🔧 Backend API

### Request
```json
POST http://localhost:8000/api/chat

{
  "message": "What is this course about?",
  "userId": "user123",
  "courseId": "course-v1:edX+DemoX+Demo",
  "sessionId": "session-123"
}
```

### Response
```json
{
  "message": "Your answer here...",
  "sessionId": "session-123"
}
```

## ✨ Features

- 💬 Clean chat UI
- 💾 Saves history to localStorage
- 📱 Mobile responsive
- ⌨️ Enter to send, Shift+Enter for new line
- 🔄 Loading indicator
- 🎨 Easy to customize

## 🎨 Customize Colors

Edit `src/styles/chatbot.css`:

```css
.chat-toggle {
  background: #0073a8;  /* Change this! */
}

.message.user {
  background: #0073a8;  /* And this! */
}
```

## 🔌 Real Backend

Replace `backend.py` with your real backend:

```python
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    
    # Your AI logic here
    response = call_openai(message)
    # or
    response = use_rag_search(message, course_id)
    
    return jsonify({
        'message': response,
        'sessionId': data.get('sessionId')
    })
```

## 📊 File Sizes

- `Chatbot.jsx`: 5KB (150 lines)
- `chatbot.css`: 4KB
- Total: **~9KB** (uncompressed)

Super lightweight! 🎈

## � Installation Options

### From GitHub (Recommended)
```bash
npm install git+https://github.com/cybologic/frontend-component-chatbot.git#v1.0.0
```

### From Local Path (Development)
```bash
npm install /path/to/frontend-component-chatbot
```

### Using npm link (Active Development)
```bash
# In chatbot directory
npm link

# In your MFE
npm link @edx/frontend-component-chatbot
```

**See [GITHUB_INSTALLATION.md](./GITHUB_INSTALLATION.md) for all options**

## 🎓 Next Steps

### 1. Install in Your MFE
- [ ] Install from GitHub
- [ ] Configure `env.config.jsx`
- [ ] Set API endpoint
- [ ] Run and test

### 2. Build Backend
- [ ] Create chat API endpoint
- [ ] Implement AI/RAG logic
- [ ] Configure CORS
- [ ] Deploy backend

### 3. Deploy
- [ ] Test in staging
- [ ] Configure production API
- [ ] Deploy to production
- [ ] Monitor and iterate

## 💡 Tips

- **Use tags for production**: `#v1.0.0` instead of `#main`
- **Test locally first**: Use `npm link` for development
- **Backend is separate**: Deploy backend anywhere
- **Auto-detection works**: User/course ID extracted automatically

## 🆘 Quick Fixes

**Chatbot not showing?**
- Check console for errors
- Make sure React is loaded

**Can't connect to backend?**
- Start backend: `python backend.py`
- Check CORS is enabled
- Verify URL in `src/main.jsx`

**Messages not sending?**
- Check backend is running on port 8000
- Check browser console
- Try the test backend first

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Overview and features |
| [GITHUB_INSTALLATION.md](./GITHUB_INSTALLATION.md) | **All installation methods** |
| [PLUGIN_EXAMPLES.md](./PLUGIN_EXAMPLES.md) | 10+ configuration examples |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical details |
| [BACKEND.md](./BACKEND.md) | Backend API specification |

## 🔍 Verification

After installation, verify it works:

1. **Check installation**:
   ```bash
   npm list @edx/frontend-component-chatbot
   ```

2. **Check in browser**:
   - Open your MFE
   - Look for chatbot button (bottom-right)
   - Click and test

3. **Check console**:
   - No errors should appear
   - Plugin should be registered

---

**You're all set!** 🎊

Install from GitHub, configure once, and it works in any Open edX MFE!
