# Open edX Chatbot Component

> A minimal chatbot component in pure JavaScript/React

## 🚀 Quick Start

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

```jsx
import Chatbot from './Chatbot';

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

- ✅ Pure JavaScript (no TypeScript)
- ✅ Single component file
- ✅ LocalStorage for message history
- ✅ Responsive design
- ✅ Clean, simple UI
- ✅ ~150 lines of code

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

AGPL-3.0
