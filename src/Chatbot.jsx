import React, { useState, useEffect, useRef } from 'react';
import './styles/chatbot.css';

export default function Chatbot({ apiEndpoint, userId, courseId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatbot-messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load messages:', e);
      }
    } else {
      // Add welcome message
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: 'Hi! I\'m Mentor, your course assistant. How can I help you today?',
        time: new Date().toLocaleTimeString()
      }]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learnerId: userId,
          courseId: courseId,
          message: currentInput,
          conversationId: localStorage.getItem('chatbot-conversation-id') || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.mentorResponse.content,
        time: new Date().toLocaleTimeString(),
        citations: data.mentorResponse.citations || [],
        followUpPrompts: data.mentorResponse.followUpPrompts || []
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save conversation ID
      if (data.mentorResponse.conversationId) {
        localStorage.setItem('chatbot-conversation-id', data.mentorResponse.conversationId);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}`,
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Toggle Button */}
      <button 
        className="chat-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? '' : 'hidden'}`}>
        {/* Header */}
        <div className="chat-header">
          <h3>Mentor</h3>
          <button 
            className="close-button" 
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
              
              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="message-citations">
                  <div className="citations-label">📚 References:</div>
                  {msg.citations.map((citation, idx) => (
                    <a 
                      key={idx} 
                      href={citation.href} 
                      className="citation-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {citation.label}
                    </a>
                  ))}
                </div>
              )}
              
              {/* Follow-up Prompts */}
              {msg.followUpPrompts && msg.followUpPrompts.length > 0 && (
                <div className="message-prompts">
                  <div className="prompts-label">💡 Related questions:</div>
                  {msg.followUpPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="prompt-button"
                      onClick={() => {
                        setInput(prompt);
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="message-time">{msg.time}</div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message assistant">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            className="send-button" 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Send"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
