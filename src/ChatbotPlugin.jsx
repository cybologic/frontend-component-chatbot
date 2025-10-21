// ChatbotPlugin.jsx - Plugin wrapper for the chatbot component
import React from 'react';
import Chatbot from './Chatbot';

/**
 * ChatbotPlugin - Wrapper component for Open edX Plugin Framework
 * 
 * This component receives props from the plugin slot context and
 * configures the chatbot appropriately.
 */
const ChatbotPlugin = ({ userId, courseId, apiEndpoint, ...pluginProps }) => {
  // Get configuration from environment or plugin props
  const config = {
    apiEndpoint: apiEndpoint || 
                 process.env.CHATBOT_API_ENDPOINT || 
                 window.CHATBOT_API_ENDPOINT ||
                 'http://134.209.254.152:5500/api/v1/mentor/query',
    userId: userId || 
            window.USER_ID || 
            localStorage.getItem('userId') || 
            'anonymous',
    courseId: courseId || 
              window.COURSE_ID || 
              extractCourseIdFromURL() || 
              'unknown',
  };

  return (
    <Chatbot
      apiEndpoint={config.apiEndpoint}
      userId={config.userId}
      courseId={config.courseId}
      {...pluginProps}
    />
  );
};

/**
 * Helper function to extract course ID from URL
 * Supports standard Open edX course URL patterns
 */
function extractCourseIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseIdFromParam = urlParams.get('courseId');
  
  if (courseIdFromParam) {
    return courseIdFromParam;
  }

  // Try to extract from path: /course/course-v1:Org+Course+Run
  const pathMatch = window.location.pathname.match(/course\/(course-v1:[^/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  // Try to extract from path: /courses/course-v1:Org+Course+Run
  const coursesMatch = window.location.pathname.match(/courses\/(course-v1:[^/]+)/);
  if (coursesMatch) {
    return coursesMatch[1];
  }

  return null;
}

export default ChatbotPlugin;
