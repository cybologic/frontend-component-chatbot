import React from 'react';
import ReactDOM from 'react-dom/client';
import Chatbot from './Chatbot';

function App() {
  // Get these from environment or your Open edX context
  const apiEndpoint = 'http://localhost:8000/api/demo-collected';
  const userId = 'demo-user-123';
  const courseId = 'course-v1:edX+DemoX+Demo_Course';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ marginBottom: '16px', color: '#1a202c' }}>
          Open edX Course Chatbot
        </h1>
        <p style={{ marginBottom: '32px', color: '#718096', fontSize: '18px' }}>
          A minimal chatbot that connects to your backend API
        </p>

        <div style={{
          background: '#f7fafc',
          padding: '24px',
          borderRadius: '8px',
          borderLeft: '4px solid #4299e1',
          marginBottom: '24px'
        }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>🎯 How It Works</h2>
          <p style={{ lineHeight: '1.6', color: '#4a5568' }}>
            This chatbot sends messages to your backend API. Your backend handles all the AI logic,
            RAG, and course content search. The frontend just provides the UI.
          </p>
        </div>

        <div style={{
          background: '#fff3cd',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #f59e0b',
          marginBottom: '24px'
        }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>⚠️ Backend Required</h3>
          <p style={{ lineHeight: '1.6', color: '#92400e' }}>
            <strong>Current API:</strong> <code style={{ background: '#1a202c', color: '#68d391', padding: '2px 8px', borderRadius: '4px' }}>{apiEndpoint}</code>
          </p>
          <p style={{ lineHeight: '1.6', color: '#92400e', marginTop: '12px' }}>
            Make sure your backend is running and implements the <code style={{ background: '#1a202c', color: '#68d391', padding: '2px 8px', borderRadius: '4px' }}>/api/chat</code> endpoint.
          </p>
        </div>

        <div style={{
          background: '#f0fdf4',
          padding: '24px',
          borderRadius: '8px',
          borderLeft: '4px solid #10b981',
          marginBottom: '24px'
        }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>📦 API Format</h3>
          <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Request:</p>
          <pre style={{
            background: '#1a202c',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`{
  "message": "What is this course about?",
  "userId": "${userId}",
  "courseId": "${courseId}",
  "sessionId": "session-123"
}`}
          </pre>
          
          <p style={{ margin: '12px 0', fontSize: '14px', fontWeight: '600' }}>Response:</p>
          <pre style={{
            background: '#1a202c',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`{
  "message": "This course covers...",
  "sessionId": "session-123"
}`}
          </pre>
        </div>

        <div style={{
          background: '#10b981',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          👉 Click the chat icon in the bottom-right corner to get started!
        </div>
      </div>

      {/* The Chatbot Component */}
      <Chatbot
        apiEndpoint={apiEndpoint}
        userId={userId}
        courseId={courseId}
      />
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
